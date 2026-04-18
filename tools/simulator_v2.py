# tools/simulator_v2.py — 이브닝 챗 + 플레이 전략 포함한 확장 시뮬
# 사용: python tools/simulator_v2.py [N_RUNS] [strategy]
#   strategy: random | neutral | resist
#     random  — v1과 동일 (랜덤 스와이프)
#     neutral — 스탯 낮은 쪽 보호 (자원 관리 기본형)
#     resist  — GI 감소 쪽 선택 (B/D/F 엔딩 노림)
#
# 추가 기능:
#  1. 매일 이브닝 시뮬: 랜덤 캐릭터 1~2명 trust ±(3~10) 변동 + GI 변동
#  2. 플레이 전략 — 스와이프 선택이 더 현실적
#  3. Act별 카드 pool 크기 통계 (부족 구간 진단)

import os, re, sys, random, collections

try: sys.stdout.reconfigure(encoding='utf-8')
except Exception: pass

ROOT = os.path.normpath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.insert(0, os.path.dirname(__file__))

# v1 파서 재사용
from simulator import (
    CARDS, card_log_rules, CARDS_PER_DAY, DECAY, ACT_BOUNDS,
    get_act, chk_game_over, eval_req,
)

N_RUNS = int(sys.argv[1]) if len(sys.argv) > 1 else 500
STRATEGY = sys.argv[2] if len(sys.argv) > 2 else 'neutral'
random.seed(42)

# ═══════════ chkSpecialEnding (수정된 G 조건 반영) ═══════════

def chk_special_ending(s, gi, act, trust, logs):
    if act < 3: return None
    def t(v): return 1 if v >= 65 else 0
    def m(v): return 1 if v >= 60 else 0
    high = t(trust['haeun']) + t(trust['doyun']) + t(trust['sejin']) + t(trust['jaehyuk'])
    mid = m(trust['haeun']) + m(trust['doyun']) + m(trust['sejin']) + m(trust['jaehyuk'])
    any55 = sum(1 for v in trust.values() if v >= 55)
    lc = len(logs)
    hL12 = 'LOG-012' in logs
    hL13 = 'LOG-013' in logs
    hObs = 'LOG-OBSERVER-APPROVED' in logs
    if hL12 and hL13 and hObs and s['day'] >= 30 and gi <= 0: return 'F'
    if gi <= -30 and mid >= 3 and lc >= 8 and s['day'] >= 32: return 'D'
    if gi <= -15 and high >= 2 and lc >= 6 and s['day'] >= 28: return 'B'
    if 0 <= gi <= 20 and any55 >= 1 and lc >= 7 and s['day'] >= 30: return 'G'
    return None

# ═══════════ 전략별 선택 ═══════════

def choose_side(card, s, gi, strategy):
    """플레이 전략에 따라 left/right 선택."""
    L, R = card['left'], card['right']
    if not L or not R: return random.choice(['left', 'right'])
    if strategy == 'random':
        return random.choice(['left', 'right'])
    if strategy == 'neutral':
        # 가장 낮은 스탯을 방어: 해당 스탯 델타가 덜 나쁜 쪽 선택
        lowest = min(('c', s['c']), ('r', s['r']), ('t', s['t']), ('o', s['o']), key=lambda x: x[1])[0]
        lscore = L['fx'].get(lowest, 0)
        rscore = R['fx'].get(lowest, 0)
        if lscore > rscore: return 'left'
        if rscore > lscore: return 'right'
        return random.choice(['left', 'right'])
    if strategy == 'resist':
        # GI 감소 쪽 선호 (GI 낮을수록 저항적 플레이)
        lg = L['g']
        rg = R['g']
        if lg < rg: return 'left'
        if rg < lg: return 'right'
        return random.choice(['left', 'right'])
    return random.choice(['left', 'right'])

# ═══════════ 이브닝 챗 시뮬 ═══════════

CHAR_KEYS = ['haeun', 'doyun', 'sejin', 'jaehyuk']

def simulate_evening(trust, gi, strategy, day):
    """매일 이브닝 한 번. 전략에 따라 trust/GI 변동."""
    # 1~2 캐릭터와 인터랙션
    targets = random.sample(CHAR_KEYS, random.choice([1, 2]))
    gi_delta = 0
    for ch in targets:
        if strategy == 'random':
            t_delta = random.randint(-3, 8)
            g_delta = random.randint(-2, 2)
        elif strategy == 'neutral':
            # 약간 긍정 편향 (대부분 플레이어는 우호적 선택)
            t_delta = random.choice([3, 5, 5, 7, 8, 10, 0, -3])
            g_delta = random.choice([0, 0, 1, -1, 2])
        elif strategy == 'resist':
            # 친밀 추구 + 반항적 선택
            t_delta = random.choice([5, 8, 10, 12, 0])
            g_delta = random.choice([-2, -3, -5, -1, 0])
        trust[ch] = max(0, min(100, trust[ch] + t_delta))
        gi_delta += g_delta
    return gi_delta

# ═══════════ 시뮬 본체 ═══════════

def simulate_one():
    s = {'c': 50, 'r': 65, 't': 50, 'o': 40, 'day': 1}
    gi = 0
    logs = []
    trust = {'haeun': 50, 'doyun': 50, 'sejin': 50, 'jaehyuk': 50}
    recent = collections.deque(maxlen=60)  # app.js와 동일
    tag_cd = {}
    card_freq = collections.Counter()
    pool_per_day = []  # (day, act, pool_size) — 부족 진단용
    ending = None
    max_days = 50

    while s['day'] <= max_days and ending is None:
        act = get_act(s['day'])
        for k, v in DECAY[act].items(): s[k] += v
        go = chk_game_over(s)
        if go: ending = go; break

        n = CARDS_PER_DAY[act]
        day_pools = []
        for _ in range(n):
            pool = []
            for c in CARDS:
                if c['id'] in recent: continue
                if act not in c['act']: continue
                if c['tag'] and tag_cd.get(c['tag'], -99) >= s['day'] - 3: continue
                if not c['tag']:
                    is_generic = c['act'] and len(c['act']) >= 3
                    if is_generic:
                        if c['id'] in tag_cd: continue
                    elif tag_cd.get(c['id'], -99) >= s['day'] - 15: continue
                if c['once'] and ('ONCE-' + c['id']) in logs: continue
                if not eval_req(c['req'], s, gi, logs): continue
                pool.append(c)
            day_pools.append(len(pool))
            if not pool: break
            c = random.choice(pool)
            dir_choice = choose_side(c, s, gi, STRATEGY)
            side = c[dir_choice]
            if side:
                for k, v in side['fx'].items(): s[k] += v
                gi += side['g']
                for L in side['logs']:
                    if L not in logs: logs.append(L)
            for rd, rl in card_log_rules.get(c['id'], []):
                if rd is None or rd == dir_choice:
                    if rl not in logs: logs.append(rl)
            if c['once']:
                if ('ONCE-' + c['id']) not in logs: logs.append('ONCE-' + c['id'])
            recent.append(c['id'])
            if c['tag']: tag_cd[c['tag']] = s['day']
            else: tag_cd[c['id']] = s['day']
            card_freq[c['id']] += 1
            go = chk_game_over(s)
            if go: ending = go; break
        if ending: break
        pool_per_day.append((s['day'], act, sum(day_pools)/max(len(day_pools),1)))

        # 이브닝 — trust & gi 변동
        gi_evening = simulate_evening(trust, gi, STRATEGY, s['day'])
        gi += gi_evening

        # 특수 엔딩 체크
        se = chk_special_ending(s, gi, act, trust, logs)
        if se: ending = se; break

        s['day'] += 1

    if ending is None:
        # Act4 종료(day≥35) 시 A(GI≥60) 체크
        if gi >= 60: ending = 'A'
        else: ending = 'TIMEOUT'

    return {
        'ending': ending, 'day': s['day'], 'gi': gi,
        'stats': dict(s), 'trust': dict(trust), 'logs': list(logs),
        'card_freq': card_freq, 'pool_per_day': pool_per_day,
    }

# ═══════════ 집계 ═══════════

print(f'\nTIU-CARD v2 시뮬 ({N_RUNS}회, strategy={STRATEGY})')
print(f'  카드 pool: {len(CARDS)}장  / app-logic 규칙: {sum(len(v) for v in card_log_rules.values())}건')
print(f'  이브닝 챗 trust 시뮬 ON / 엔딩 G 조건: day≥30, trust55+ 1명, log≥7\n')

ending_count = collections.Counter()
day_reached = []
card_total_freq = collections.Counter()
runs_with_dup = 0
pool_by_act = collections.defaultdict(list)
trust_at_end = {ch: [] for ch in CHAR_KEYS}
gi_at_end = []
low_pool_days = 0  # 일일 평균 pool < 3인 일수
for _ in range(N_RUNS):
    r = simulate_one()
    ending_count[r['ending']] += 1
    day_reached.append(r['day'])
    for cid, n in r['card_freq'].items():
        card_total_freq[cid] += n
    if any(n >= 2 for n in r['card_freq'].values()): runs_with_dup += 1
    for d, a, ps in r['pool_per_day']:
        pool_by_act[a].append(ps)
        if ps < 3: low_pool_days += 1
    for ch in CHAR_KEYS: trust_at_end[ch].append(r['trust'][ch])
    gi_at_end.append(r['gi'])

def section(t): print('\n' + '='*64 + '\n ' + t + '\n' + '='*64)

section('엔딩 도달률')
endings_order = ['A','B','C_cs','C_cst','D','F','G','C_c','C_r','C_t','C_o','TIMEOUT']
for e in endings_order:
    n = ending_count.get(e, 0)
    pct = 100 * n / N_RUNS
    bar = '#' * int(pct / 2)
    kind = '서사' if e in ('A','B','C_cs','C_cst','D','F','G') else '즉사'
    if e == 'TIMEOUT': kind = '엔딩 미도달'
    print(f'  {e:8s}  {kind:12s}  {n:4d}  ({pct:5.1f}%)  {bar}')

section('생존/스탯 분포')
day_reached.sort()
print(f'  생존 일수: min {day_reached[0]}  /  median {day_reached[len(day_reached)//2]}  /  max {day_reached[-1]}  /  평균 {sum(day_reached)/len(day_reached):.1f}')
for ch in CHAR_KEYS:
    vs = sorted(trust_at_end[ch])
    print(f'  Trust {ch:8s}: median {vs[len(vs)//2]:3d}  /  65+달성률 {100*sum(1 for v in vs if v>=65)/len(vs):.1f}%')
gi_sorted = sorted(gi_at_end)
print(f'  GI 최종: median {gi_sorted[len(gi_sorted)//2]}  /  min {gi_sorted[0]}  /  max {gi_sorted[-1]}')

section('Act별 일일 카드 pool 크기 (평균)')
for a in sorted(pool_by_act.keys()):
    vs = pool_by_act[a]
    vs_sorted = sorted(vs)
    p10 = vs_sorted[len(vs_sorted)//10] if vs_sorted else 0
    req = CARDS_PER_DAY.get(a, 0)
    print(f'  Act{a} (요구 {req}장/일):  평균 {sum(vs)/len(vs):.1f}  중간 {vs_sorted[len(vs_sorted)//2]:.1f}  하위10% {p10:.1f}')
print(f'  pool < 3인 일수: {low_pool_days}회 (500판 합산)')

section('중복 / 카드 사용')
print(f'  한 판 중복 등장: {runs_with_dup}/{N_RUNS} ({100*runs_with_dup/N_RUNS:.1f}%)')
top_draw = card_total_freq.most_common(10)
print(f'  판당 평균 출현 상위 10:')
for cid, n in top_draw:
    print(f'    {cid:14s}  {n/N_RUNS:.2f}회/판')

never = [c['id'] for c in CARDS if card_total_freq.get(c['id'], 0) == 0]
print(f'  미출현 카드: {len(never)}/{len(CARDS)} ({100*len(never)/len(CARDS):.1f}%)')

section('요약')
narrative = sum(ending_count[e] for e in ('A','B','C_cs','C_cst','D','F','G'))
instant = sum(ending_count[e] for e in ('C_c','C_r','C_t','C_o'))
timeout = ending_count.get('TIMEOUT', 0)
print(f'  서사 엔딩 {narrative} ({100*narrative/N_RUNS:.1f}%)  |  즉사 {instant} ({100*instant/N_RUNS:.1f}%)  |  미도달 {timeout} ({100*timeout/N_RUNS:.1f}%)')
print()
