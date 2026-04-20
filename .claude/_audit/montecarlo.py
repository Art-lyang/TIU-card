# -*- coding: utf-8 -*-
"""
TIU_CARD 몬테카를로 시뮬레이션
-----------------------------------------------------------
목표: 난이도/밸런스/엔딩 분포 검증

시뮬레이션 규칙 (단순화 모델):
  - 초기 스탯 c=50, r=65, t=50, o=40, day=1, gi=0
  - 하루당 카드 swipe 10회 (기본 cpd=10)
  - 각 카드는 REWARDS 풀에서 임의 선택된 fx(×5)를 +/- 확률로 적용
    (실제 카드 fx 분포의 근사: mean ±1.5 per stat per swipe)
  - day 종료 시 보상 1개 선택 (6개 중 최선; 정책별 4가지):
      P1 "탐욕" — 가장 높은 스탯 합 증가
      P2 "약점보강" — 최저 스탯을 가장 많이 올리는 것
      P3 "충성" — gi 증가량이 가장 큰 것 (ORACLE 친화 = r+,o+)
      P4 "저항" — gi 감소량이 가장 큰 것 (인간 편 = t+, o-)
  - 스탯 하락 규칙 (Act3 c-2,r-3 / Act4 c-3,r-5,t-2)
  - Act 전환: day 5/14/29
  - 게임오버: c<=0/c>=100/r<=0/t<=0/o<=0
  - 엔딩 판정: gi>=60 → A, gi<=-30 & Act3+ → D, gi<=-15 & Act3+ → B, else 생존
-----------------------------------------------------------
"""
import random, json, os, re, sys, statistics
from collections import Counter
sys.stdout.reconfigure(encoding='utf-8')

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))

# REWARDS 파싱 (data-core.js에서)
core = open(os.path.join(ROOT, 'data-core.js'), 'r', encoding='utf-8').read()
rw_pat = re.compile(r"""fx:\s*\{\s*c:\s*(-?\d+)[^}]*r:\s*(-?\d+)[^}]*t:\s*(-?\d+)[^}]*o:\s*(-?\d+)\s*\}""")
REWARDS = []
rw_block = re.search(r'REWARDS\s*=\s*\[(.*?)\];\s*\nvar\s+DIALOGUES', core, re.DOTALL)
if rw_block:
    for m in rw_pat.finditer(rw_block.group(1)):
        REWARDS.append({'c': int(m.group(1))*5, 'r': int(m.group(2))*5,
                        't': int(m.group(3))*5, 'o': int(m.group(4))*5, 'g': 0})
# gi 효과는 REWARDS에 없음 → 보조 추정: o↑ = gi↑, t↑ = gi↓
for r in REWARDS:
    r['g'] = r['o']*0.3 - r['t']*0.2  # 대략치

# 카드 fx 분포 — 카드별 left/right 페어로 수집 (플레이어 선택 시뮬용)
import glob
card_pairs = []
card_files = sorted(set(glob.glob(os.path.join(ROOT, 'data-cards-*.js'))))
# left: {..fx..} ... right: {..fx..} 한 카드 내 페어 추출
card_block_pat = re.compile(
    r"""left\s*:\s*\{[^{}]*?fx\s*:\s*\{\s*c:\s*(-?\d+)[^}]*r:\s*(-?\d+)[^}]*t:\s*(-?\d+)[^}]*o:\s*(-?\d+)\s*\}[^{}]*?\}[^{}]*?"""
    r"""right\s*:\s*\{[^{}]*?fx\s*:\s*\{\s*c:\s*(-?\d+)[^}]*r:\s*(-?\d+)[^}]*t:\s*(-?\d+)[^}]*o:\s*(-?\d+)\s*\}""",
    re.DOTALL)
for f in card_files:
    content = open(f, 'r', encoding='utf-8').read()
    for m in card_block_pat.finditer(content):
        L = {'c': int(m.group(1))*5, 'r': int(m.group(2))*5,
             't': int(m.group(3))*5, 'o': int(m.group(4))*5}
        R = {'c': int(m.group(5))*5, 'r': int(m.group(6))*5,
             't': int(m.group(7))*5, 'o': int(m.group(8))*5}
        card_pairs.append((L, R))
card_fxs = [fx for pair in card_pairs for fx in pair]  # backward compat

def clamp(v, lo=0, hi=100): return max(lo, min(hi, v))

def play_once(policy='P1', seed=None):
    if seed is not None: random.seed(seed)
    s = {'c':50, 'r':65, 't':50, 'o':40}
    day = 1
    gi = 0
    act = 1
    # 최대 60일 (안전)
    for day in range(1, 61):
        # Act 전환
        if day >= 5: act = max(act, 2)
        if day >= 14: act = max(act, 3)
        if day >= 29: act = max(act, 4)

        # 하루 카드 10회 — 플레이어는 스탯 위험을 피하는 쪽을 고름
        for _ in range(10):
            if not card_pairs: break
            L, R = random.choice(card_pairs)
            # 각 선택지 예상 위험도 계산 (스탯이 극단에 가까운 쪽으로 밀면 위험)
            def risk(fx):
                risk_score = 0
                ns = {k: clamp(s[k]+fx[k]) for k in 'crto'}
                for k in 'crto':
                    if ns[k] <= 0: risk_score += 10000  # 즉사
                    elif ns[k] <= 15: risk_score += (15-ns[k])*5
                if ns['c'] >= 100: risk_score += 5000
                elif ns['c'] >= 85: risk_score += (ns['c']-85)*3
                # policy 별 추가 편향
                if policy == 'P1':
                    risk_score -= (fx['c']+fx['r']+fx['t']+fx['o'])
                elif policy == 'P2':
                    wk = min('crto', key=lambda k: s[k])
                    risk_score -= fx[wk]*3
                elif policy == 'P3':
                    risk_score -= (fx['o']*1.5 - fx['t']*0.8)
                elif policy == 'P4':
                    risk_score -= (fx['t']*1.5 - fx['o']*0.8)
                return risk_score
            fx = L if risk(L) <= risk(R) else R
            s['c'] = clamp(s['c'] + fx['c'])
            s['r'] = clamp(s['r'] + fx['r'])
            s['t'] = clamp(s['t'] + fx['t'])
            s['o'] = clamp(s['o'] + fx['o'])
            gi += fx['o'] * 0.15 - fx['t'] * 0.1
            # 중도 GO?
            if s['c'] <= 0 or s['c'] >= 100 or s['r'] <= 0 or s['t'] <= 0 or s['o'] <= 0:
                return {'ending': 'GO_mid', 'day': day, 'act': act, 'stats': s, 'gi': round(gi,1)}

        # 보상 선택 (6개 샘플에서 policy별 선택)
        n = 6
        if any(s[k] < 40 for k in 'crto'): n = 5
        if any(s[k] < 30 for k in 'crto'): n = 4
        if any(s[k] < 20 for k in 'crto'): n = 3
        if any(s[k] < 10 for k in 'crto'): n = 2
        pool = random.sample(REWARDS, min(n, len(REWARDS))) if REWARDS else []
        if pool:
            if policy == 'P1':  # 탐욕 — 합이 최대
                pick = max(pool, key=lambda r: r['c']+r['r']+r['t']+r['o'])
            elif policy == 'P2':  # 약점 보강
                weakest = min('crto', key=lambda k: s[k])
                pick = max(pool, key=lambda r: r[weakest])
            elif policy == 'P3':  # 충성 (gi↑)
                pick = max(pool, key=lambda r: r['g'])
            else:  # P4 저항 (gi↓)
                pick = min(pool, key=lambda r: r['g'])
            s['c'] = clamp(s['c'] + pick['c'])
            s['r'] = clamp(s['r'] + pick['r'])
            s['t'] = clamp(s['t'] + pick['t'])
            s['o'] = clamp(s['o'] + pick['o'])
            gi += pick['g']

        # Act별 일일 감쇠
        if act == 3:
            s['c'] = max(5, s['c']-2); s['r'] = max(5, s['r']-3)
        if act == 4:
            s['c'] = max(5, s['c']-3); s['r'] = max(5, s['r']-5); s['t'] = max(5, s['t']-2)

        # 보상 후 GO?
        if s['c'] <= 0 or s['c'] >= 100 or s['r'] <= 0 or s['t'] <= 0 or s['o'] <= 0:
            return {'ending': 'GO_rew', 'day': day, 'act': act, 'stats': s, 'gi': round(gi,1)}

    # 60일 생존
    ending = 'survive'
    if gi >= 60: ending = 'A'
    elif gi <= -30 and act >= 3: ending = 'D'
    elif gi <= -15 and act >= 3: ending = 'B'
    return {'ending': ending, 'day': day, 'act': act, 'stats': s, 'gi': round(gi,1)}

def run(N=5000):
    policies = ['P1','P2','P3','P4']
    results = {p: [] for p in policies}
    for p in policies:
        for i in range(N):
            results[p].append(play_once(p, seed=None))
    return results

print("="*60)
print(f"TIU_CARD 몬테카를로 시뮬레이션  (N=3000 per policy)")
print(f"카드 fx 샘플: {len(card_fxs)}개  |  REWARDS: {len(REWARDS)}개")
print("="*60)

N = 3000
random.seed(42)
results = run(N)

for p, runs in results.items():
    endings = Counter([r['ending'] for r in runs])
    days = [r['day'] for r in runs]
    gis = [r['gi'] for r in runs]
    go_rate = (endings['GO_mid'] + endings['GO_rew']) / N * 100
    name = {'P1':'탐욕(합산 최대)','P2':'약점보강(최저 스탯)',
            'P3':'충성(ORACLE 친화)','P4':'저항(인간 편)'}[p]
    print(f"\n[{p}] {name}")
    print(f"  평균 생존일: {statistics.mean(days):.1f}일  (중앙값 {statistics.median(days):.0f})")
    print(f"  평균 GI:    {statistics.mean(gis):+.1f}  (min {min(gis):.0f}, max {max(gis):.0f})")
    print(f"  게임오버율: {go_rate:.1f}%")
    print(f"  엔딩 분포:")
    for k in sorted(endings.keys(), key=lambda x: -endings[x]):
        pct = endings[k]/N*100
        print(f"     {k:<10} {endings[k]:>5}  ({pct:.1f}%)")

# 밸런스 평가
print("\n" + "="*60)
print("밸런스 평가")
print("="*60)
flatline_p1 = [r for r in results['P1'] if r['ending'] not in ('GO_mid','GO_rew')]
if flatline_p1:
    print(f"  ▸ 탐욕 정책 성공 완주율: {len(flatline_p1)/N*100:.1f}%  "
          f"(엔딩 다양성: {len(set(r['ending'] for r in flatline_p1))}가지)")
loyalty_A = [r for r in results['P3'] if r['ending']=='A']
rebel_BD = [r for r in results['P4'] if r['ending'] in ('B','D')]
print(f"  ▸ 충성 정책 → 엔딩A 도달률: {len(loyalty_A)/N*100:.1f}%")
print(f"  ▸ 저항 정책 → 엔딩B/D 도달률: {len(rebel_BD)/N*100:.1f}%")
print(f"  ▸ 즉사 급사율 (P1, 절반 이전): "
      f"{sum(1 for r in results['P1'] if r['ending']=='GO_mid' and r['day']<15)/N*100:.1f}%")
