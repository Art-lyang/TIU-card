# tools/diagnose_act4.py — Act 4 카드 풀 세부 진단
# 목적: "어떤 종류 카드를 몇 장 추가해야 하는가" 산출
import os, sys, re, collections
try: sys.stdout.reconfigure(encoding='utf-8')
except Exception: pass
sys.path.insert(0, os.path.dirname(__file__))
from simulator import CARDS

def bucket(c):
    # 카드 카테고리 분류 (추가 리스트업용)
    if c['tag'] and c['tag'].startswith('spec-'): return '이변체(spec-*)'
    if c['tag']: return f"태그:{c['tag']}"
    if c['req'] or 'cond' in c['body']: return '조건부(req/cond)'
    gen = c['act'] and len(c['act']) >= 3
    if gen: return '범용 데일리(한판1회)'
    return '제한 데일리'

# Act별 분류
act_buckets = {1: collections.Counter(), 2: collections.Counter(), 3: collections.Counter(), 4: collections.Counter()}
act_cards = {1: [], 2: [], 3: [], 4: []}
for c in CARDS:
    for a in (c['act'] or []):
        if a in act_buckets:
            act_buckets[a][bucket(c)] += 1
            act_cards[a].append(c)

print('\n═══ Act별 카드 분포 ═══')
for a in (1, 2, 3, 4):
    total = sum(act_buckets[a].values())
    print(f'\nAct {a}  총 {total}장:')
    for cat, n in act_buckets[a].most_common():
        print(f'    {n:4d}  {cat}')

# Act 4 세부: "아무 조건 없이 뽑히는 카드" 추출
print('\n═══ Act 4 — 조건 없이 항상 뽑히는 카드 (진짜 데일리 필러) ═══')
act4_fillers = [c for c in act_cards[4] if not c['req'] and not c['tag'] and not c['once']]
for c in act4_fillers:
    is_gen = c['act'] and len(c['act']) >= 3
    marker = '범용(한판1회)' if is_gen else '제한(15일쿨)'
    print(f"  {c['id']:12s}  {marker:14s}  {c['file']}")
print(f'\n총 {len(act4_fillers)}장')

# Act 4에 act 속하지만 범용 아닌 카드 (조건 풀리면 뽑힘)
print('\n═══ Act 4 — 조건부 카드 (랜덤 플레이에선 거의 안 뽑힘) ═══')
act4_cond = [c for c in act_cards[4] if (c['req'] or 'cond' in c['body'])]
print(f'총 {len(act4_cond)}장')
by_file = collections.Counter(c['file'] for c in act4_cond)
for f, n in by_file.most_common():
    print(f'  {n:3d}  {f}')

# Act 4 전용(오직 act=[4])
print('\n═══ Act 4 전용 카드 (act=[4]만) ═══')
act4_only = [c for c in act_cards[4] if c['act'] == [4]]
print(f'총 {len(act4_only)}장')
for c in act4_only[:20]:
    print(f"  {c['id']:12s}  tag={c.get('tag') or '-':10s}  {c['file']}")

# 사전 진단: day 35+ 에 pool이 고갈되는 이유 추정
# - Act 4 기간 day 30~50 (20일), 7장/일 = 140장 드래프트 필요
# - 범용 카드(act≥3개)는 한 판 1회 → 이미 Act 2~3에서 소진
# - 남는 건 Act 4 전용 / 조건부 카드
# - 조건부 중 LOG 없어서 트리거 안 되는 카드가 많음

print('\n═══ 권고 계산 ═══')
# 한 판에 Act 4 만에 필요한 새 카드: 140
# 이미 소진된 "범용" 카드 제외하면:
act4_non_generic = [c for c in act_cards[4] if not (c['act'] and len(c['act']) >= 3 and not c['tag'])]
print(f'  Act4에 등록된 "비범용" 카드 (제한데일리+태그+조건부): {len(act4_non_generic)}장')
act4_only_non_generic = [c for c in act_cards[4] if c['act'] == [4] and not c['tag'] and not c['req']]
print(f'  Act4 전용 무조건 데일리: {len(act4_only_non_generic)}장')
print(f'  → Act 4 기간(약 20일 × 7장 = 140 draw)에 비해 "즉시 뽑힘 가능한 Act4 카드"가 적음')
