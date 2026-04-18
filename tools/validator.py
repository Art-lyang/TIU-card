# tools/validator.py — TIU-card 정적 무결성 검증 (regex 기반)
# 사용: python tools/validator.py
#
# 검증 항목:
#  1) 카드 ID 중복 (여러 데이터 파일에 같은 id)
#  2) 체인/사건체인 trigger가 존재하지 않는 카드 참조
#  3) 카드/미션 선택지의 mission 참조 유효성
#  4) LOG 생산/소비 불일치 (req에서 참조하는데 생산 안 되는 LOG)
#  5) EVIDENCE.src LOG가 실제 생산되는지
#  6) 엔딩 필수 LOG 생산 가능성
#  7) 고아 카드 (act 배열 없음, 잠금·체인·프롤로그 제외)
#  8) 한 카드 내 left/right 라벨 동일

import os, re, sys, collections

try:
    sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass

ROOT = os.path.normpath(os.path.join(os.path.dirname(__file__), '..'))

# 스캔 대상 데이터 파일 (index.html 로드 순서 기준)
DATA_FILES = [
    'data-core.js', 'data-status-tags.js', 'data-cards-prologue.js',
] + [f'data-cards-{i}.js' for i in range(1, 17)] + [
    'data-cards-act4.js', 'data-cards-crisis.js', 'data-cards-neutral.js',
    'data-rewards.js', 'data-chains.js', 'data-chains-incident.js', 'data-chains-incident2.js',
    'data-archive.js', 'data-missions.js', 'data-missions-2.js', 'data-missions-3.js',
    'data-missions-incident.js', 'data-missions-4.js', 'data-missions-5.js', 'data-missions-variants.js',
    'data-endings.js', 'data-act4-escape.js', 'data-achievements.js', 'data-evidence.js',
    'data-facility.js', 'data-facility-2.js', 'data-facility-uprising.js', 'data-hidden-story.js',
    'data-evening-trust-1.js', 'data-evening-trust-1b.js', 'data-evening-trust-2.js', 'data-evening-trust-3.js',
    'data-evening-responses.js', 'data-evening-extra.js', 'data-evening-responses-2.js', 'evening-lines.js',
    'data-result-text.js', 'data-result-story-1.js', 'data-result-story-2.js', 'data-result-story-3.js',
]

# 카드 정의가 들어있는 파일 (id 중복 체크 대상)
CARD_FILES = [
    'data-cards-prologue.js',
] + [f'data-cards-{i}.js' for i in range(1, 17)] + [
    'data-cards-act4.js', 'data-cards-crisis.js', 'data-cards-neutral.js',
    'data-act4-escape.js', 'data-chains-incident.js',
]

# 체인 카드 정의 파일 (id 중복 체크 별도)
CHAIN_CARD_FILES = ['data-chains.js', 'data-chains-incident2.js']

files_loaded = []
files_missing = []

def read(path):
    full = os.path.join(ROOT, path)
    if not os.path.exists(full):
        files_missing.append(path)
        return ''
    files_loaded.append(path)
    with open(full, 'r', encoding='utf-8') as f:
        return f.read()

# ── 카드 정의 추출 ──
# 패턴: { id: "C-001", act: [...], ...  }
# 한 라인에 한 카드가 있는 스타일이 일반적. 여러 줄 객체도 처리.
CARD_RX = re.compile(r'\{\s*id:\s*"([A-Z0-9_\-]+)"(.*?)\n\s*\}', re.S)
# act 추출
ACT_RX = re.compile(r'\bact:\s*\[([0-9,\s]*)\]')
# req 함수 추출
REQ_RX = re.compile(r'\breq:\s*(function\s*\([^)]*\)\s*\{[^}]*\}|\([^)]*\)\s*=>\s*[^,}\n]+|[^,\n]+?=>\s*[^,}\n]+)')
# mission 참조
MISSION_RX = re.compile(r'\bmission:\s*"([A-Z0-9_\-]+)"')
# left/right 라벨 (이스케이프된 따옴표 \" 처리)
LABEL_RX = re.compile(r'\b(left|right):\s*\{\s*label:\s*"((?:[^"\\]|\\.)*)"')
# once 플래그
ONCE_RX = re.compile(r'\bonce:\s*true\b')
# log 생산
LOG_PROD_RX = re.compile(r'\blog:\s*(?:"([A-Z0-9_\-]+)"|\[\s*((?:"[^"]+"\s*,?\s*)+)\])')
# LOG- 토큰 전체
LOG_ANY_RX = re.compile(r'LOG-[A-Z0-9_\-]+')

def extract_cards_from_file(path):
    """파일에서 { id: ..., ... } 형태의 카드 객체를 느슨하게 추출.
    LOG-/EV-/M-/MI- 로 시작하는 id는 데이터 정의이므로 카드에서 제외."""
    src = read(path)
    cards = []
    non_card_prefixes = ('LOG-', 'EV-', 'SCENE-', 'FAC-')
    # 라인 단위 처리: 각 id: 뒤로 다음 id: 전까지를 하나의 카드로 본다 (완벽하진 않지만 실용적)
    # 더 안전하게: 중괄호 깊이 추적
    idx = 0
    while True:
        m = re.search(r'\{\s*id:\s*"([A-Z0-9_\-]+)"', src[idx:])
        if not m: break
        start = idx + m.start()
        cid = m.group(1)
        # 매칭되는 중괄호 찾기
        depth = 0
        end = start
        in_str = False
        str_ch = ''
        esc = False
        for i in range(start, len(src)):
            ch = src[i]
            if esc:
                esc = False; continue
            if ch == '\\':
                esc = True; continue
            if in_str:
                if ch == str_ch: in_str = False
                continue
            if ch == '"' or ch == "'":
                in_str = True; str_ch = ch; continue
            if ch == '{': depth += 1
            elif ch == '}':
                depth -= 1
                if depth == 0:
                    end = i + 1
                    break
        body = src[start:end]
        if not cid.startswith(non_card_prefixes):
            cards.append({'id': cid, 'body': body, 'file': path})
        idx = end
    return cards

# ── 모든 데이터 파일 txt 로드 (LOG 스캔용) ──
all_src = {}
for f in DATA_FILES:
    all_src[f] = read(f)

# ── 카드 수집 ──
cards_by_file = {}
all_cards = []
for f in CARD_FILES + CHAIN_CARD_FILES:
    cs = extract_cards_from_file(f)
    cards_by_file[f] = cs
    all_cards.extend(cs)

id_to_files = collections.defaultdict(list)
for c in all_cards:
    id_to_files[c['id']].append(c['file'])

# ── 1) ID 중복 ──
duplicates = [(cid, files) for cid, files in id_to_files.items() if len(files) > 1]

# ── 2) 체인 trigger ──
# "trigger: "C-008-left"" 스타일
TRIGGER_RX = re.compile(r'trigger:\s*"([A-Z0-9_\-]+)-(left|right)"')
chain_triggers = []
for f in ['data-chains.js', 'data-chains-incident2.js']:
    src = all_src.get(f, '')
    for m in TRIGGER_RX.finditer(src):
        chain_triggers.append({'file': f, 'card': m.group(1), 'side': m.group(2)})

valid_card_ids = set(id_to_files.keys())
broken_chain_triggers = [t for t in chain_triggers if t['card'] not in valid_card_ids]

# ── 3) mission 참조 ──
# "M-001" ~ "M-XXX", "MI-01"~ 등 카드 내부 mission: "..."
# MISSIONS 선언 파일에서 id 추출
MISSION_ID_RX = re.compile(r'"(M-\d+|MI-\d+[A-Z]?)":\s*\{')
mission_ids = set()
for f in ['data-missions.js', 'data-missions-2.js', 'data-missions-3.js',
          'data-missions-incident.js', 'data-missions-4.js', 'data-missions-5.js']:
    src = all_src.get(f, '')
    mission_ids.update(MISSION_ID_RX.findall(src))

broken_mission_refs = []
for c in all_cards:
    for m in MISSION_RX.finditer(c['body']):
        mid = m.group(1)
        if mid not in mission_ids:
            broken_mission_refs.append({'card': c['id'], 'mission': mid, 'file': c['file']})

# ── 4/5) LOG 생산/소비 ──
produced_logs = set()
# 4-1) card/chain/mission 에서 log: "LOG-..." 또는 log: ["LOG-...",...]
for f, src in all_src.items():
    for m in LOG_PROD_RX.finditer(src):
        if m.group(1):
            produced_logs.add(m.group(1))
        elif m.group(2):
            for lm in re.findall(r'"(LOG-[A-Z0-9_\-]+)"', m.group(2)):
                produced_logs.add(lm)

# 4-1b) app*.js / components*.js 의 tryUnlock('LOG-...'), unlockLog('LOG-...') 호출
APP_FILES = ['app.js', 'app-init.js', 'app-utils.js', 'app-logic.js', 'app-bgm.js']
UNLOCK_RX = re.compile(r"(?:tryUnlock|unlockLog|addLog|pushLog|grantLog)\s*\(\s*['\"](LOG-[A-Z0-9_\-]+)['\"]\s*\)")
for f in APP_FILES:
    full = os.path.join(ROOT, f)
    if not os.path.exists(full): continue
    with open(full, 'r', encoding='utf-8') as fh:
        app_src = fh.read()
    for m in UNLOCK_RX.finditer(app_src):
        produced_logs.add(m.group(1))
# EVIDENCE_COMBOS reward.log 도 생산
COMBO_LOG_RX = re.compile(r"reward:\s*\{[^}]*log:\s*['\"](LOG-[A-Z0-9_\-]+)['\"]")
for m in COMBO_LOG_RX.finditer(all_src.get('data-evidence.js', '')):
    produced_logs.add(m.group(1))
# 4-2) once:true 카드는 ONCE-{id} 생산
for c in all_cards:
    if ONCE_RX.search(c['body']):
        produced_logs.add('ONCE-' + c['id'])
# 4-3) ORACLE_LOGS 및 다른 파일에 { id: "LOG-..." } 로 선언된 id 는 "획득 가능"으로 간주
ORACLE_LOG_ID_RX = re.compile(r'\{\s*id:\s*["\'](LOG-[A-Z0-9_\-]+)["\']')
defined_in_core = set()
for f, src in all_src.items():
    for lm in ORACLE_LOG_ID_RX.finditer(src):
        defined_in_core.add(lm.group(1))

# 4-4) LOG 소비: req 내 LOG- 토큰
consumed_logs = collections.defaultdict(list)
for c in all_cards:
    req_m = re.search(r'req:\s*function[^{]*\{([^}]*)\}|req:\s*\([^)]*\)\s*=>\s*([^,\n}]+)|req:\s*[^,\n]*?=>\s*([^,\n}]+)', c['body'])
    if req_m:
        req_body = req_m.group(1) or req_m.group(2) or req_m.group(3) or ''
        for lm in LOG_ANY_RX.findall(req_body):
            consumed_logs[lm].append(f"card {c['id']} ({c['file']})")

# 엔딩 조건 내 LOG 소비 (data-endings.js 함수 본문)
ending_src = all_src.get('data-endings.js', '')
for m in re.finditer(r"(indexOf|includes)\s*\(\s*'(LOG-[A-Z0-9_\-]+)'\s*\)", ending_src):
    consumed_logs[m.group(2)].append('ending (data-endings.js)')

# 도달 불가 LOG
unreachable_logs = []
for log, refs in consumed_logs.items():
    if log not in produced_logs and log not in defined_in_core:
        unreachable_logs.append({'log': log, 'refs': refs[:3], 'total': len(refs)})

# EVIDENCE src LOG
evidence_src = all_src.get('data-evidence.js', '')
EV_RX = re.compile(r'\{\s*id:\s*"(EV-\d+)",\s*name:\s*"([^"]+)",\s*desc:\s*"[^"]*",\s*src:\s*"(LOG-[A-Z0-9_\-]+)"')
evidence_unreachable = []
for m in EV_RX.finditer(evidence_src):
    ev_id, ev_name, ev_log = m.group(1), m.group(2), m.group(3)
    if ev_log not in produced_logs and ev_log not in defined_in_core:
        evidence_unreachable.append({'ev': ev_id, 'name': ev_name, 'srcLog': ev_log})

# ── 6) 엔딩 필수 LOG ──
ending_required = ['LOG-012', 'LOG-013', 'LOG-OBSERVER-APPROVED']
ending_missing = [log for log in ending_required if log not in produced_logs and log not in defined_in_core]

# ── 7) 고아 카드 ──
orphans = []
for c in all_cards:
    if re.search(r'return\s+false|=>\s*false', c['body']): continue
    if c['id'].startswith('CH') or c['id'].startswith('MI-') or c['id'].startswith('CA-') or c['id'].startswith('P-'):
        continue
    if c['file'] in CHAIN_CARD_FILES: continue  # 체인 카드는 act 없어도 됨
    act_m = ACT_RX.search(c['body'])
    if not act_m or not act_m.group(1).strip():
        orphans.append({'id': c['id'], 'file': c['file']})

# ── 8) 카드 구조 이상 ──
struct_issues = []
for c in all_cards:
    labels = {m.group(1): m.group(2) for m in LABEL_RX.finditer(c['body'])}
    if 'left' in labels and 'right' in labels:
        if labels['left'] == labels['right'] and labels['left'] != '-':
            struct_issues.append({'id': c['id'], 'file': c['file'], 'issue': f"동일 라벨: \"{labels['left']}\""})

# ═══════════ 리포트 출력 ═══════════
def hr(): print('═' * 64)
def section(t): print('\n' + '═' * 64 + '\n ' + t + '\n' + '═' * 64)
def ok(m): print('  OK  ' + m)
def warn_block(items, label, fmt, limit=25):
    if not items:
        ok(f'{label}: 0건')
        return
    print(f'  WARN  {label}: {len(items)}건')
    for it in items[:limit]:
        print('        - ' + fmt(it))
    if len(items) > limit:
        print(f'        ... ({len(items) - limit}건 더)')

section('TIU-CARD 정적 검증 리포트')
print(f'\n[로드]')
print(f'  파일: {len(files_loaded)} 로드 / {len(files_missing)} 누락')
if files_missing:
    for f in files_missing:
        print('    X  ' + f)

print(f'\n[콘텐츠 통계]')
card_count_by_file = {f: len(cs) for f, cs in cards_by_file.items()}
total_cards = sum(card_count_by_file.values())
unique_ids = len(id_to_files)
print(f'  카드 총 {total_cards}장 (고유 id {unique_ids}개)')
print(f'  체인 trigger: {len(chain_triggers)}건')
print(f'  미션 정의: {len(mission_ids)}개 ({", ".join(sorted(mission_ids))})')
print(f'  LOG 생산 {len(produced_logs)} / 코어 정의 {len(defined_in_core)} / req 소비 {len(consumed_logs)}')
print(f'\n  파일별 카드 수:')
for f, n in sorted(card_count_by_file.items()):
    if n > 0:
        print(f'    {n:3d}  {f}')

section('이슈 리포트')
warn_block(duplicates, '카드 ID 중복', lambda x: f"{x[0]}  (in: {', '.join(x[1])})")
warn_block(broken_chain_triggers, '체인 trigger → 존재하지 않는 카드', lambda x: f"{x['file']}: {x['card']}-{x['side']}")
warn_block(broken_mission_refs, '카드→미션 참조 깨짐', lambda x: f"{x['card']} → mission={x['mission']} ({x['file']})")
warn_block(unreachable_logs, '참조되지만 생산되지 않는 LOG', lambda x: f"{x['log']}  ({x['total']}곳 참조: {', '.join(x['refs'][:2])})")
warn_block(evidence_unreachable, '증거 src LOG 미도달', lambda x: f"{x['ev']} \"{x['name']}\" ← {x['srcLog']}")
warn_block([{'e': e} for e in ending_missing], '엔딩 필수 LOG 미생산', lambda x: x['e'])
warn_block(orphans, '고아 카드 (act 없음·잠금/체인/프롤로그 제외)', lambda x: f"{x['id']}  ({x['file']})")
warn_block(struct_issues, '카드 구조 이상', lambda x: f"{x['id']}  {x['issue']}  ({x['file']})")

total_issues = (len(duplicates) + len(broken_chain_triggers) + len(broken_mission_refs)
                + len(unreachable_logs) + len(evidence_unreachable) + len(ending_missing)
                + len(orphans) + len(struct_issues))

section('요약')
if total_issues == 0:
    print('  모든 정적 검증 통과 (이슈 0건)')
else:
    print(f'  총 이슈 {total_issues}건 발견 — 상단 상세 참조')
print()
sys.exit(1 if total_issues > 0 else 0)
