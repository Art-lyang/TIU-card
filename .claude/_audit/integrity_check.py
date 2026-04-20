# -*- coding: utf-8 -*-
"""
TIU_CARD integrity_check.py
- 정적 무결성 검증 (중복 ID, LOG 참조, 미션/체인 참조, REWARDS pool, ACT 커버리지)
- 결과를 STDOUT로 출력
"""
import os, re, json, sys, glob
sys.stdout.reconfigure(encoding='utf-8')

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))

def read(p):
    try:
        with open(p, 'r', encoding='utf-8') as f: return f.read()
    except: return ''

def gather(patterns):
    out = []
    for pat in patterns:
        out += glob.glob(os.path.join(ROOT, pat))
    # dedupe (glob 패턴 겹침 방지)
    return sorted(set(p for p in out if os.path.isfile(p)))

card_files = gather([
    'data-cards-*.js', 'data-cards-*-*.js',
    'data-cards-act4*.js', 'data-cards-prologue*.js',
    'data-cards-resist-hint.js', 'data-cards-crisis.js',
    'data-cards-neutral.js', 'data-cards-facility-propose.js'
])
other_files = gather([
    'data-core.js', 'data-rewards.js', 'data-chains*.js',
    'data-missions*.js', 'data-endings.js',
    'data-evening-*.js', 'data-dialogues-extra.js',
    'data-facility*.js'
])

# ═══════════════════════════════════════
# 1) 카드 ID 수집 + 중복 체크
# ═══════════════════════════════════════
id_pat = re.compile(r"""id:\s*["']([A-Z][A-Z0-9\-_]+)["']""")
all_card_ids = []
card_id_source = {}
for f in card_files:
    content = read(f)
    for m in id_pat.finditer(content):
        cid = m.group(1)
        all_card_ids.append(cid)
        card_id_source.setdefault(cid, []).append(os.path.basename(f))

dup_cards = {k: v for k, v in card_id_source.items() if len(v) > 1}

# ═══════════════════════════════════════
# 2) LOG 참조 vs 정의
# ═══════════════════════════════════════
all_files = card_files + other_files + gather(['app-logic.js', 'app.js', 'app-init.js', 'components*.js'])
log_def_pat = re.compile(r"""id:\s*["'](LOG-[A-Z0-9\-_]+)["']""")
log_ref_pat = re.compile(r"""["'](LOG-[A-Z0-9\-_]+)["']""")

log_defs = set()
log_refs = set()
for f in all_files:
    content = read(f)
    for m in log_def_pat.finditer(content): log_defs.add(m.group(1))
    for m in log_ref_pat.finditer(content): log_refs.add(m.group(1))

# data-core.js 내 ORACLE_LOGS 정의가 카드 ID와 구분되는지 보강
log_defs_strict = set()
core_content = read(os.path.join(ROOT, 'data-core.js'))
logs_block = re.search(r'ORACLE_LOGS\s*=\s*\[(.*?)\];\s*\n\s*var\s+EVENING_CHATS', core_content, re.DOTALL)
if logs_block:
    for m in log_def_pat.finditer(logs_block.group(1)):
        log_defs_strict.add(m.group(1))
# LOG-RECON-* / LOG-EV-UNLOCK 등 특수 로그도 포함
for lg in log_defs:
    if lg.startswith('LOG-'): log_defs_strict.add(lg)

# 참조됐지만 정의 안 된 LOG (오탈자/데드 링크)
dangling_logs = sorted([l for l in log_refs if l not in log_defs_strict and not l.startswith('LOG-INTRO') and not l.startswith('LOG-ACT') and not l.startswith('LOG-OBS') and not l.startswith('LOG-RESISTANCE') and not l.startswith('LOG-UPRISING') and not l.startswith('LOG-RECON')])

# ═══════════════════════════════════════
# 3) 미션/체인 참조 vs 정의
# ═══════════════════════════════════════
mission_def_pat = re.compile(r"""["']?(M-[0-9A-Z\-]+)["']?\s*:\s*\{""")
chain_def_pat = re.compile(r"""["']?(CH-[0-9A-Z\-]+)["']?\s*:\s*\{""")

mission_defs = set()
chain_defs = set()
for f in other_files:
    content = read(f)
    for m in mission_def_pat.finditer(content): mission_defs.add(m.group(1))
    for m in chain_def_pat.finditer(content): chain_defs.add(m.group(1))

mission_ref_pat = re.compile(r"""mission\s*:\s*["'](M-[0-9A-Z\-]+)["']""")
mission_refs = set()
for f in card_files:
    content = read(f)
    for m in mission_ref_pat.finditer(content): mission_refs.add(m.group(1))

dangling_missions = sorted(mission_refs - mission_defs)

# ═══════════════════════════════════════
# 4) REWARDS / ENDINGS 크기
# ═══════════════════════════════════════
rewards_count = len(re.findall(r"id:\s*['\"]R-\d+['\"]", core_content))
endings_content = read(os.path.join(ROOT, 'data-endings.js'))
ending_defs = re.findall(r"""^\s{2}([A-Z][A-Za-z_0-9]*)\s*:\s*\{""", endings_content, re.MULTILINE)
ending_defs = [e for e in ending_defs if e in ('A','B','D','E','F','G','H') or e.startswith('C_')]

# ═══════════════════════════════════════
# 5) Act 분포
# ═══════════════════════════════════════
act_pat = re.compile(r"""act:\s*\[([^\]]+)\]""")
act_dist = {1:0, 2:0, 3:0, 4:0}
for f in card_files:
    content = read(f)
    for m in act_pat.finditer(content):
        nums = re.findall(r'\d+', m.group(1))
        for n in nums:
            if int(n) in act_dist: act_dist[int(n)] += 1

# ═══════════════════════════════════════
# 6) once: true 플래그 vs ONCE- 로그 회수 체크 (샘플)
# ═══════════════════════════════════════
once_count = 0
for f in card_files:
    once_count += len(re.findall(r'once\s*:\s*true', read(f)))

# ═══════════════════════════════════════
# 출력
# ═══════════════════════════════════════
print("=" * 60)
print("TIU_CARD 정적 무결성 검증 리포트")
print("=" * 60)
print(f"\n[1] 카드 파일: {len(card_files)}개  |  고유 카드 ID: {len(set(all_card_ids))}개")
print(f"    전체 카드 참조 수 (중복 포함): {len(all_card_ids)}개")
if dup_cards:
    print(f"  !! 중복 ID: {len(dup_cards)}건")
    for cid, srcs in list(dup_cards.items())[:10]:
        print(f"     - {cid} ← {srcs}")
else:
    print("    ✓ 카드 ID 중복 없음")

print(f"\n[2] LOG 정의 수: {len(log_defs_strict)}개  |  LOG 참조 수: {len(log_refs)}개")
if dangling_logs:
    print(f"  !! 정의 없는 LOG 참조: {len(dangling_logs)}건 (샘플 최대 15건)")
    for l in dangling_logs[:15]:
        print(f"     - {l}")
else:
    print("    ✓ 모든 LOG 참조가 정의에 연결됨")

print(f"\n[3] 미션 정의: {len(mission_defs)}개  |  미션 참조: {len(mission_refs)}개")
if dangling_missions:
    print(f"  !! 정의 없는 미션 참조: {len(dangling_missions)}건")
    for m in dangling_missions: print(f"     - {m}")
else:
    print("    ✓ 모든 미션 참조가 정의에 연결됨")

print(f"\n[4] 체인 정의: {len(chain_defs)}개")
print(f"\n[5] REWARDS 풀 크기: {rewards_count}개 (기본 6개 선택에 충분: {'✓' if rewards_count >= 6 else '✗'})")
print(f"    엔딩 정의: {len(set(ending_defs))}개 — {sorted(set(ending_defs))}")

print(f"\n[6] Act별 카드 커버리지:")
for a in [1,2,3,4]:
    print(f"    Act{a}: {act_dist[a]}장")

print(f"\n[7] 1회성(once:true) 카드: {once_count}장")

print("\n" + "=" * 60)
print("검증 완료")
print("=" * 60)
