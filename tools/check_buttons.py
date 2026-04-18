# tools/check_buttons.py — 카드 좌/우 버튼(키패드) 작동성 검증
# 사용: python tools/check_buttons.py
#
# 체크:
#  1) left/right 필드 누락
#  2) label 빈 문자열 또는 공백만
#  3) label에 이중 이스케이프 (\\\") 포함 → 화면에 \" 그대로 노출
#  4) label 자체가 "-" (의도적 잠금 카드 — req 조건 확인)
#  5) req === () => false 인데 intentional 잠금 의심 카드
#  6) fx / g / log 전부 없는 "무효 선택지" (진행만 되는 카드)
#  7) 라벨이 제어 문자 / 이스케이프 아티팩트

import os, re, sys, collections

try: sys.stdout.reconfigure(encoding='utf-8')
except Exception: pass

ROOT = os.path.normpath(os.path.join(os.path.dirname(__file__), '..'))

CARD_FILES = [
    'data-cards-prologue.js',
] + [f'data-cards-{i}.js' for i in range(1, 17)] + [
    'data-cards-act4.js', 'data-cards-act4-ext.js', 'data-cards-resist-hint.js',
    'data-cards-crisis.js', 'data-cards-neutral.js',
    'data-chains.js', 'data-chains-incident.js', 'data-chains-incident2.js',
    'data-act4-escape.js',
]

def extract_cards(path):
    with open(os.path.join(ROOT, path), 'r', encoding='utf-8') as f:
        src = f.read()
    cards, i = [], 0
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
        cards.append({'id': cid, 'body': src[start:end], 'file': path})
        i = end
    return cards

# 라벨 추출 (이스케이프 보존)
def extract_label(body, side):
    m = re.search(r'\b' + side + r':\s*\{\s*label:\s*"((?:[^"\\]|\\.)*)"', body)
    return m.group(1) if m else None

def has_fx_or_log(body, side):
    m = re.search(r'\b' + side + r':\s*\{([^{}]*(?:\{[^}]*\}[^{}]*)*)\}', body)
    if not m: return False
    b = m.group(1)
    # fx 내부에 0이 아닌 값
    fxm = re.search(r'fx:\s*\{([^}]*)\}', b)
    if fxm:
        for v in re.findall(r'(-?\d+)', fxm.group(1)):
            if int(v) != 0: return True
    # g 값
    gm = re.search(r'\bg:\s*(-?\d+)', b)
    if gm and int(gm.group(1)) != 0: return True
    # log
    if re.search(r'\blog:', b): return True
    # trust
    if re.search(r'\btrust:\s*(-?\d+)', b): return True
    # mission
    if re.search(r'\bmission:', b): return True
    return False

def has_req_false(body):
    return bool(re.search(r'req:\s*\(?\)?\s*=>\s*false', body) or re.search(r'req:\s*function[^{]*\{\s*return\s+false', body))

issues = {
    'missing_side': [],       # left/right 없음
    'empty_label': [],        # 빈 라벨
    'placeholder_label': [],  # label == "-"
    'double_escape': [],      # \\\" 포함
    'both_sides_no_effect': [],  # 양쪽 다 fx/g/log 없음
    'intentionally_locked': [],  # req=>false 인 잠금 카드
}

total_cards = 0
NON_CARD_PREFIXES = ('LOG-', 'EV-', 'SCENE-', 'FAC-', 'CMB-')
for f in CARD_FILES:
    for c in extract_cards(f):
        if c['id'].startswith(NON_CARD_PREFIXES): continue  # LOG/EV 등 메타데이터 제외
        total_cards += 1
        body = c['body']

        # 5) 의도적 잠금
        if has_req_false(body):
            issues['intentionally_locked'].append(c)
            continue  # 이 카드는 뽑히지 않으므로 나머지 체크 skip

        left_label = extract_label(body, 'left')
        right_label = extract_label(body, 'right')

        # 1) 필드 누락
        miss = []
        if left_label is None: miss.append('left')
        if right_label is None: miss.append('right')
        if miss:
            issues['missing_side'].append({'card': c, 'missing': miss})
            continue

        # 2) 빈 라벨
        for side, lbl in [('left', left_label), ('right', right_label)]:
            if not lbl or not lbl.strip():
                issues['empty_label'].append({'card': c, 'side': side})

        # 4) "-" 플레이스홀더
        for side, lbl in [('left', left_label), ('right', right_label)]:
            if lbl.strip() == '-':
                issues['placeholder_label'].append({'card': c, 'side': side})

        # 3) 이중 이스케이프 \\\" 포함
        for side, lbl in [('left', left_label), ('right', right_label)]:
            if r'\\\"' in lbl or r'\\"' in lbl:
                issues['double_escape'].append({'card': c, 'side': side, 'label': lbl})

        # 6) 양쪽 다 무효
        if not has_fx_or_log(body, 'left') and not has_fx_or_log(body, 'right'):
            issues['both_sides_no_effect'].append(c)

def section(t): print('\n' + '='*62 + '\n ' + t + '\n' + '='*62)
def warn(items, label, fmt, limit=25):
    if not items:
        print(f'  OK  {label}: 0건')
        return
    print(f'  WARN  {label}: {len(items)}건')
    for it in items[:limit]:
        print('      - ' + fmt(it))
    if len(items) > limit:
        print(f'      ... ({len(items)-limit}건 더)')

section(f'TIU-CARD 버튼 작동성 점검 (카드 {total_cards}장 스캔)')

print('\n[작동 불가 / 의심]')
warn(issues['missing_side'], 'left/right 필드 누락 (버튼 아예 없음)',
     lambda x: f"{x['card']['id']}  누락: {','.join(x['missing'])}  ({x['card']['file']})")

warn(issues['empty_label'], '빈 라벨 (버튼 표시 안 됨)',
     lambda x: f"{x['card']['id']}.{x['side']}  ({x['card']['file']})")

warn(issues['double_escape'], '라벨 이중 이스케이프 (\\\" 화면 노출)',
     lambda x: f"{x['card']['id']}.{x['side']}  \"{x['label']}\"  ({x['card']['file']})")

print('\n[의도 가능성 높음 — 검토만]')
warn(issues['placeholder_label'], '라벨 "-"  (잠금 플레이스홀더 의심)',
     lambda x: f"{x['card']['id']}.{x['side']}  ({x['card']['file']})", 50)

warn(issues['both_sides_no_effect'], '양쪽 선택지 fx/g/log 모두 없음 (무효 진행)',
     lambda x: f"{x['id']}  ({x['file']})", 50)

print(f'\n  [참고] 의도적 잠금 카드 (req=>false): {len(issues["intentionally_locked"])}건 (정상)')

total = sum(len(v) for k, v in issues.items() if k != 'intentionally_locked')
print(f'\n{"-"*62}\n  실제 수정 검토 대상: {total}건')
