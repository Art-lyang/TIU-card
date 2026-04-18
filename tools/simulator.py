# tools/simulator.py — TIU-card 간이 몬테카를로 시뮬레이터
# 사용: python tools/simulator.py [N_RUNS]
#
# 목적:
#  - 랜덤 스와이프 N회 플레이로 10엔딩 도달률 추정
#  - 카드 중복 출현 빈도 측정 (한 판에 같은 카드 몇 번)
#  - Game Over 원인 분포 (스탯 0 도달 비율)
#  - 평균 생존 일수, Act 도달률
#  - act별 pool 부족 / 드래프트 실패 감지
#
# 제한:
#  - req/cond 함수는 간이 변환기로 평가 (복잡한 함수는 True 취급 → 약간 낙관적)
#  - app-logic.js의 id별 tryUnlock은 반영 (C-* / CH-* 특수 처리)
#  - mission 노드, 체인 브랜칭, 이브닝 선택지는 시뮬 안 함 (랜덤 스와이프만)
#  - 엔딩 F 특수 로그(LOG-OBSERVER-APPROVED)는 OBS 접근 플로우 생략 → 0건 기대

import os, re, sys, random, collections, json

try: sys.stdout.reconfigure(encoding='utf-8')
except Exception: pass

ROOT = os.path.normpath(os.path.join(os.path.dirname(__file__), '..'))
N_RUNS = int(sys.argv[1]) if len(sys.argv) > 1 else 500
random.seed(42)

# ═══════════ 데이터 로드 & 카드 파싱 ═══════════

CARD_FILES = [
    'data-cards-prologue.js',
] + [f'data-cards-{i}.js' for i in range(1, 17)] + [
    'data-cards-act4.js', 'data-cards-act4-ext.js', 'data-cards-resist-hint.js',
    'data-cards-crisis.js', 'data-cards-neutral.js',
]

def read(p):
    with open(os.path.join(ROOT, p), 'r', encoding='utf-8') as f: return f.read()

def extract_card_objects(src):
    """중괄호 깊이 추적으로 { id: "...", ... } 추출."""
    cards = []
    i = 0
    while i < len(src):
        m = re.search(r'\{\s*id:\s*"([A-Z0-9_\-]+)"', src[i:])
        if not m: break
        cid = m.group(1)
        start = i + m.start()
        depth, end, in_s, sc, esc = 0, start, False, '', False
        for j in range(start, len(src)):
            ch = src[j]
            if esc: esc = False; continue
            if ch == '\\': esc = True; continue
            if in_s:
                if ch == sc: in_s = False
                continue
            if ch in '"\'': in_s = True; sc = ch; continue
            if ch == '{': depth += 1
            elif ch == '}':
                depth -= 1
                if depth == 0: end = j + 1; break
        cards.append((cid, src[start:end]))
        i = end
    return cards

def parse_act(body):
    m = re.search(r'\bact:\s*\[([0-9,\s]*)\]', body)
    if not m: return None
    xs = [int(x) for x in re.findall(r'\d+', m.group(1))]
    return xs or None

def parse_tag(body):
    m = re.search(r'\btag:\s*"([^"]+)"', body)
    return m.group(1) if m else None

def parse_once(body):
    return bool(re.search(r'\bonce:\s*true\b', body))

def parse_bg(body):
    m = re.search(r'\bbg:\s*"([^"]+)"', body)
    return m.group(1) if m else None

def parse_req_or_cond(body):
    """req / cond 함수 본문을 Python eval 가능한 식으로 변환."""
    m = re.search(r'\b(?:req|cond):\s*function\s*\([^)]*\)\s*\{([^}]*?)\}', body, re.S)
    if not m:
        m = re.search(r'\b(?:req|cond):\s*\([^)]*\)\s*=>\s*(?:\{([^}]*?)\}|([^,\n]+))', body, re.S)
    if not m: return None
    body_src = (m.group(1) or (m.group(2) if m.lastindex >= 2 else '') or '').strip()
    body_src = re.sub(r'^\s*return\s+', '', body_src)
    body_src = body_src.rstrip(';').strip()
    # JS → Python 변환
    py = body_src
    py = py.replace('&&', ' and ').replace('||', ' or ')
    py = re.sub(r'!\s*([a-zA-Z_])', r'not \1', py)
    py = re.sub(r'\bs\.([a-zA-Z_]+)', r's["\1"]', py)
    py = re.sub(r'logs\.includes\(\s*"([^"]+)"\s*\)', r'("\1" in logs)', py)
    py = re.sub(r'logs\.indexOf\(\s*[\'"]([^\'"]+)[\'"]\s*\)\s*>=\s*0', r'("\1" in logs)', py)
    py = re.sub(r'logs\.indexOf\(\s*[\'"]([^\'"]+)[\'"]\s*\)\s*<\s*0', r'("\1" not in logs)', py)
    # gi 변수는 두 번째 인자 g
    py = re.sub(r'\bg\b(?!\w|["\']\])', 'gi', py)
    return py

def parse_side(body, side):
    """left/right 블록 추출."""
    m = re.search(side + r':\s*\{([^{}]*(?:\{[^}]*\}[^{}]*)*)\}', body)
    if not m: return None
    b = m.group(1)
    fx = {'c': 0, 'r': 0, 't': 0, 'o': 0}
    fxm = re.search(r'fx:\s*\{([^}]*)\}', b)
    if fxm:
        for km in re.finditer(r'([crto]):\s*(-?\d+)', fxm.group(1)):
            fx[km.group(1)] = int(km.group(2))
    gm = re.search(r'\bg:\s*(-?\d+)', b)
    g = int(gm.group(1)) if gm else 0
    logs = []
    lm = re.search(r'\blog:\s*"([^"]+)"', b)
    if lm: logs.append(lm.group(1))
    else:
        lam = re.search(r'\blog:\s*\[([^\]]+)\]', b)
        if lam:
            logs.extend(re.findall(r'"([^"]+)"', lam.group(1)))
    mission = re.search(r'\bmission:\s*"([^"]+)"', b)
    trust_val = None
    tm = re.search(r'\btrust:\s*(-?\d+)', b)
    if tm: trust_val = int(tm.group(1))
    return {'fx': fx, 'g': g, 'logs': logs, 'mission': mission.group(1) if mission else None, 'trust': trust_val}

# ═══════════ 카드 로드 ═══════════

ALL_CARDS = []
for f in CARD_FILES:
    src = read(f)
    for cid, body in extract_card_objects(src):
        if cid.startswith(('LOG-', 'EV-', 'SCENE-', 'FAC-')): continue
        card = {
            'id': cid, 'file': f, 'body': body,
            'act': parse_act(body) or [2, 3, 4],
            'tag': parse_tag(body),
            'once': parse_once(body),
            'bg': parse_bg(body),
            'req': parse_req_or_cond(body),
            'left': parse_side(body, 'left'),
            'right': parse_side(body, 'right'),
        }
        ALL_CARDS.append(card)

# 중복 id 제거 (validator에서 0이지만 안전망)
seen_ids = set()
CARDS = []
for c in ALL_CARDS:
    if c['id'] in seen_ids: continue
    seen_ids.add(c['id'])
    CARDS.append(c)

# ═══════════ app-logic.js 하드코딩된 LOG 규칙 ═══════════
APP_LOGIC = read('app-logic.js')
APP_JS = read('app.js')
# 패턴: if(cid==='C-179'&&dir==='left')tryUnlock('LOG-063')
RULE_DIR_RX = re.compile(r"cid\s*===?\s*['\"]([A-Z0-9_\-]+)['\"]\s*&&\s*dir\s*===?\s*['\"](left|right)['\"]\s*\)\s*tryUnlock\s*\(\s*['\"](LOG-[A-Z0-9_\-]+)['\"]\s*\)")
# 패턴: if(cid==='C-180')tryUnlock('LOG-063-DONE')
RULE_ANY_RX = re.compile(r"cid\s*===?\s*['\"]([A-Z0-9_\-]+)['\"]\s*\)\s*tryUnlock\s*\(\s*['\"](LOG-[A-Z0-9_\-]+)['\"]\s*\)")

card_log_rules = collections.defaultdict(list)  # cid -> [(direction_or_None, log)]
for m in RULE_DIR_RX.finditer(APP_LOGIC + APP_JS):
    card_log_rules[m.group(1)].append((m.group(2), m.group(3)))
for m in RULE_ANY_RX.finditer(APP_LOGIC + APP_JS):
    # DIR_RX가 잡은 것과 겹치지 않는 것만 추가
    if any(x[1] == m.group(2) for x in card_log_rules[m.group(1)]): continue
    card_log_rules[m.group(1)].append((None, m.group(2)))

# ═══════════ 게임 규칙 ═══════════

ACT_BOUNDS = [(1, 5, 1), (6, 19, 2), (20, 29, 3), (30, 999, 4)]  # day_from, day_to, act
CARDS_PER_DAY = {1: 4, 2: 5, 3: 6, 4: 7}
DECAY = {1: {}, 2: {}, 3: {'c': -1, 'r': -1}, 4: {'c': -2, 'r': -2, 't': -1}}

def get_act(day):
    for lo, hi, a in ACT_BOUNDS:
        if lo <= day <= hi: return a
    return 4

def chk_game_over(s):
    if s['c'] <= 0: return 'C_c'     # 봉쇄 붕괴
    if s['c'] >= 100: return 'C_cs'  # 봉쇄 성공
    if s['r'] <= 0: return 'C_r'     # 자원 고갈
    if s['t'] <= 0: return 'C_t'     # 신뢰 붕괴
    if s['o'] <= 0: return 'C_o'     # ORACLE 차단
    return None

def chk_special_ending(s, gi, act, trust, logs):
    """data-endings.js chkSpecialEnding 포팅."""
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

def chk_gi_ending(gi, act):
    """Act 4 종료 시점(day>=35)에 A(GI≥60) 또는 F 계열 판정."""
    if gi >= 60: return 'A'
    return None

def eval_req(expr, s, gi, logs):
    if not expr: return True
    try:
        return bool(eval(expr, {'__builtins__': {}}, {'s': s, 'gi': gi, 'logs': logs}))
    except Exception:
        return True  # 파싱 실패는 낙관적으로 통과

# ═══════════ 한 판 시뮬 ═══════════

def simulate_one():
    s = {'c': 50, 'r': 65, 't': 50, 'o': 40, 'day': 1}
    gi = 0
    logs = []
    trust = {'haeun': 50, 'doyun': 50, 'sejin': 50, 'jaehyuk': 50}
    recent = collections.deque(maxlen=60)  # app.js:96 과 동일 (60장 버퍼)
    tag_cd = {}  # tag -> day first used
    card_freq = collections.Counter()
    draws_per_day = []
    ending = None
    max_days = 45

    while s['day'] <= max_days and ending is None:
        act = get_act(s['day'])
        # 감쇠
        for k, v in DECAY[act].items(): s[k] += v
        go = chk_game_over(s)
        if go: ending = go; break

        # 일일 카드
        n = CARDS_PER_DAY[act]
        drawn = 0
        for _ in range(n):
            pool = []
            for c in CARDS:
                if c['id'] in recent: continue
                if act not in c['act']: continue
                if c['tag'] and tag_cd.get(c['tag'], -99) >= s['day'] - 3: continue
                if not c['tag']:  # 무태그: 범용 데일리(act≥3개)면 한 판 1회, 아니면 15일 쿨다운
                    is_generic = c['act'] and len(c['act']) >= 3
                    if is_generic:
                        if c['id'] in tag_cd: continue
                    elif tag_cd.get(c['id'], -99) >= s['day'] - 15: continue
                if c['once'] and ('ONCE-' + c['id']) in logs: continue
                if not eval_req(c['req'], s, gi, logs): continue
                pool.append(c)
            if not pool:
                draws_per_day.append(drawn); break
            c = random.choice(pool)
            dir_choice = random.choice(['left', 'right'])
            side = c[dir_choice]
            if side:
                for k, v in side['fx'].items(): s[k] += v
                gi += side['g']
                for L in side['logs']:
                    if L not in logs: logs.append(L)
            # app-logic 하드코딩 규칙
            for rd, rl in card_log_rules.get(c['id'], []):
                if rd is None or rd == dir_choice:
                    if rl not in logs: logs.append(rl)
            if c['once']:
                if ('ONCE-' + c['id']) not in logs: logs.append('ONCE-' + c['id'])
            recent.append(c['id'])
            if c['tag']: tag_cd[c['tag']] = s['day']
            else: tag_cd[c['id']] = s['day']  # 일상카드 id별 last-seen 기록
            card_freq[c['id']] += 1
            drawn += 1
            go = chk_game_over(s)
            if go: ending = go; break
        if ending: break
        draws_per_day.append(drawn)

        # 하루 종료: 특수 엔딩 체크
        se = chk_special_ending(s, gi, act, trust, logs)
        if se: ending = se; break

        s['day'] += 1

    # 마지막 GI 엔딩 체크 (Act4 30일+이면 A 가능)
    if ending is None:
        se = chk_gi_ending(gi, act)
        ending = se or 'TIMEOUT'

    return {
        'ending': ending, 'day': s['day'], 'gi': gi,
        'stats': dict(s), 'trust': dict(trust), 'logs': list(logs),
        'card_freq': card_freq, 'draws_per_day': draws_per_day,
    }

# ═══════════ 집계 (메인 실행 시에만) ═══════════

def _run_main():
    print(f'\nTIU-CARD 몬테카를로 시뮬레이션 ({N_RUNS}회)')
    print(f'  카드 pool: {len(CARDS)}장  / app-logic 하드코딩 규칙: {sum(len(v) for v in card_log_rules.values())}건\n')

    ending_count = collections.Counter()
    day_reached = []
    card_total_freq = collections.Counter()
    card_runs_with_dup = collections.Counter()
    runs_with_any_dup = 0
    for i in range(N_RUNS):
        r = simulate_one()
        ending_count[r['ending']] += 1
        day_reached.append(r['day'])
        for cid, n in r['card_freq'].items():
            card_total_freq[cid] += n
            if n >= 2: card_runs_with_dup[cid] += 1
        if any(n >= 2 for n in r['card_freq'].values()): runs_with_any_dup += 1

    def section(t): print('\n' + '='*64 + '\n ' + t + '\n' + '='*64)
    section('엔딩 도달률')
    endings_order = ['A','B','C_cs','C_cst','D','F','G','C_c','C_r','C_t','C_o','TIMEOUT']
    for e in endings_order:
        n = ending_count.get(e, 0)
        pct = 100 * n / N_RUNS
        bar = '#' * int(pct / 2)
        kind = '서사' if e in ('A','B','C_cs','C_cst','D','F','G') else '즉사'
        if e == 'TIMEOUT': kind = 'Day45 도달 엔딩 없음'
        print(f'  {e:8s}  {kind:18s}  {n:4d}  ({pct:5.1f}%)  {bar}')

    section('생존 일수')
    day_reached.sort()
    print(f'  min {day_reached[0]}  /  median {day_reached[len(day_reached)//2]}  /  max {day_reached[-1]}  /  평균 {sum(day_reached)/len(day_reached):.1f}일')
    act_hit = collections.Counter()
    for d in day_reached:
        for lo, hi, a in ACT_BOUNDS:
            if d >= lo: act_hit[a] += 1
    for a in (1,2,3,4):
        print(f'  Act{a} 진입률: {100*act_hit[a]/N_RUNS:.1f}%')

    section('카드 중복 출현')
    print(f'  한 판에 중복 등장 발생: {runs_with_any_dup}/{N_RUNS} runs ({100*runs_with_any_dup/N_RUNS:.1f}%)')
    top_dup = sorted(card_runs_with_dup.items(), key=lambda x: -x[1])[:15]
    if top_dup:
        print(f'  중복 빈도 상위 15장:')
        for cid, n in top_dup:
            print(f'    {cid:12s}  {n:4d} runs ({100*n/N_RUNS:.1f}%)')

    section('가장 자주 뽑힌 TOP 20')
    for cid, n in card_total_freq.most_common(20):
        print(f'    {cid:12s}  {n:5d}회  (판당 {n/N_RUNS:.2f})')

    section('미출현 카드')
    never = [c['id'] for c in CARDS if card_total_freq.get(c['id'], 0) == 0]
    print(f'  {len(never)}/{len(CARDS)} ({100*len(never)/len(CARDS):.1f}%)')

    section('요약')
    narrative = sum(ending_count[e] for e in ('A','B','C_cs','C_cst','D','F','G'))
    instant = sum(ending_count[e] for e in ('C_c','C_r','C_t','C_o'))
    timeout = ending_count.get('TIMEOUT', 0)
    print(f'  서사 {narrative} ({100*narrative/N_RUNS:.1f}%)  즉사 {instant} ({100*instant/N_RUNS:.1f}%)  TIMEOUT {timeout} ({100*timeout/N_RUNS:.1f}%)')

if __name__ == '__main__':
    _run_main()
