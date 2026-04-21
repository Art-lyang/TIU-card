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
  - Act 전환: day 5/13/24 (35일 캡)
  - 게임오버: c<=0/c>=100/r<=0/t<=0/o<=0
  - 엔딩 판정 (35캡 기준):
      A 정상형: Act4+day>=30+GI>=55+c>=70+o>=60
      A 파탄형: c>=100+GI>=60 (doGO)
      B 정상: day>=25+GI<=-15+highTrust>=2+log>=6 / 변형: day>=28+GI<=-25+highTrust<=1+log>=10
      D 정상: day>=28+GI<=-30+midTrust>=3+log>=8 / 변형: day>=30+GI<=-35+r>=35+anyTrust70>=1+log>=10
      F 정상: day>=28+LOG12+13+OBS + GI<=0 / 변형: day>=33+LOG12+13+GI<=-20+highTrust>=2
      G 정상: day>=28+GI 0~20+anyTrust55>=1+log>=7 / 변형: day>=31+GI -5~25+anyTrust55>=2+log>=9
      TIME_UP: day>35 강제 — GI>=40→A / GI<=-20&highT>=1→D / GI<=-15→B / else→G
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
    # trust 및 logs 근사값 (신뢰는 policy 편향 + 무작위, logs는 day 기반 카운트)
    trust = {'haeun':50,'doyun':50,'sejin':50,'jaehyuk':50}
    logs = 1  # LOG-001 기본
    day = 1
    gi = 0
    act = 1
    # 35일 캡 — day 36 진입 시 TIME_UP
    for day in range(1, 37):
        # Act 전환 (35일 캡 스케줄)
        if day >= 5: act = max(act, 2)
        if day >= 13: act = max(act, 3)
        if day >= 24: act = max(act, 4)
        # day 36 = TIME_UP 강제
        if day > 35:
            highT = sum(1 for k in trust if trust[k] >= 65)
            if gi >= 40: te = 'A'
            elif gi <= -20 and highT >= 1: te = 'D'
            elif gi <= -15: te = 'B'
            else: te = 'G'
            return {'ending': te + '_timeup', 'day': day, 'act': act, 'stats': s, 'gi': round(gi,1)}

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

        # trust/logs 근사 업데이트 — policy/gi 기반 편향 + 무작위
        logs = min(15, 1 + day // 3)
        for k in trust:
            drift = 0
            if policy == 'P3': drift = 1  # 충성 → 전원 친화
            elif policy == 'P4': drift = 1 if k in ('jaehyuk','haeun') else 0  # 저항 → 저항 계열만
            elif policy == 'P2': drift = 1 if k in ('haeun','sejin') else 0
            trust[k] = max(0, min(100, trust[k] + drift + random.randint(-1,2)))

        # chkSpecialEnding 근사 (Act 3+)
        if act >= 3:
            highT = sum(1 for k in trust if trust[k] >= 65)
            midT  = sum(1 for k in trust if trust[k] >= 60)
            any55 = sum(1 for k in trust if trust[k] >= 55)
            any70 = sum(1 for k in trust if trust[k] >= 70)
            # A 정상형
            if act >= 4 and day >= 30 and gi >= 55 and s['c'] >= 70 and s['o'] >= 60:
                return {'ending':'A','day':day,'act':act,'stats':s,'gi':round(gi,1)}
            # D 정상/변형
            if gi <= -30 and midT >= 3 and logs >= 8 and day >= 28:
                return {'ending':'D','day':day,'act':act,'stats':s,'gi':round(gi,1)}
            if gi <= -35 and s['r'] >= 35 and any70 >= 1 and logs >= 10 and day >= 30:
                return {'ending':'D','day':day,'act':act,'stats':s,'gi':round(gi,1)}
            # B 정상/변형
            if gi <= -15 and highT >= 2 and logs >= 6 and day >= 25:
                return {'ending':'B','day':day,'act':act,'stats':s,'gi':round(gi,1)}
            if gi <= -25 and highT <= 1 and logs >= 10 and day >= 28:
                return {'ending':'B','day':day,'act':act,'stats':s,'gi':round(gi,1)}
            # G 정상/변형
            if 0 <= gi <= 20 and any55 >= 1 and logs >= 7 and day >= 28:
                return {'ending':'G','day':day,'act':act,'stats':s,'gi':round(gi,1)}
            if -5 <= gi <= 25 and any55 >= 2 and logs >= 9 and day >= 31:
                return {'ending':'G','day':day,'act':act,'stats':s,'gi':round(gi,1)}

    # 35일 생존 — TIME_UP 디스패치가 위에서 처리됨
    ending = 'survive'
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
