# tools/simulator_v3.py — 성격 프로필 기반 시뮬레이터
# 사용: python tools/simulator_v3.py [N_RUNS] [profile]
#   profile: all | comply | rebel | careful | explorer | newbie
#     all      — 5개 프로필 각각 N_RUNS씩 돌리고 비교표 출력
#     comply   — 순응형: ORACLE 평가(o) 유지 우선, GI 상승 선호
#     rebel    — 반항형: GI 감소 선호, 신뢰 캐릭터 우선, 저항 루트 노림
#     careful  — 자원관리형: 가장 낮은 스탯 방어, 즉사 회피 최우선
#     explorer — 탐색형: 미션/체인/히든 콘텐츠 트리거 카드 우선 선택
#     newbie   — 초보형: 70% 랜덤 + 30% 텍스트 길이 짧은 쪽 선택
#
# v2 대비 추가:
#  1. 성격 프로필 5종 — 실제 플레이어 유형 시뮬
#  2. 미션 트리거 추적 — 필드 미션 도달률 측정
#  3. 히든 로그 추적 — 히든 스토리/옵저버 루트 도달률
#  4. 체인 완주율 — 체인 시작/완료 비율
#  5. 이브닝 챗 캐릭터별 상세 통계
#  6. 위험 구간 분석 — 어떤 day/act에서 즉사가 집중되는지
#  7. JSON 리포트 출력 — _workspace/sim-results/에 저장

import os, re, sys, random, collections, json, time, math

try: sys.stdout.reconfigure(encoding='utf-8')
except Exception: pass

ROOT = os.path.normpath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.insert(0, os.path.dirname(__file__))

from simulator import (
    CARDS, card_log_rules, CARDS_PER_DAY, DECAY, ACT_BOUNDS, read,
    get_act, chk_game_over, eval_req,
)
# v2는 if __name__ 가드가 없어서 직접 import 불가.
# 필요한 함수를 여기에 재정의한다.

def extract_block(src, marker):
    i = src.find(marker)
    if i < 0: return ''
    start = src.find('[', i)
    if start < 0: return ''
    depth = 0; in_str = False; quote = ''; esc = False
    for j in range(start, len(src)):
        ch = src[j]
        if esc: esc = False; continue
        if ch == '\\': esc = True; continue
        if in_str:
            if ch == quote: in_str = False
            continue
        if ch in ('"', "'"): in_str = True; quote = ch; continue
        if ch == '[': depth += 1
        elif ch == ']':
            depth -= 1
            if depth == 0: return src[start:j+1]
    return ''

def extract_objects(block):
    objs = []; i = 0
    while i < len(block):
        if block[i] != '{': i += 1; continue
        start = i; depth = 0; in_str = False; quote = ''; esc = False
        for j in range(i, len(block)):
            ch = block[j]
            if esc: esc = False; continue
            if ch == '\\': esc = True; continue
            if in_str:
                if ch == quote: in_str = False
                continue
            if ch in ('"', "'"): in_str = True; quote = ch; continue
            if ch == '{': depth += 1
            elif ch == '}':
                depth -= 1
                if depth == 0: objs.append(block[start:j+1]); i = j + 1; break
        else: break
    return objs

def parse_rewards():
    src = read('data-core.js')
    block = extract_block(src, 'var REWARDS =')
    rewards = []
    for obj in extract_objects(block):
        id_m = re.search(r'\bid:\s*"([^"]+)"', obj)
        if not id_m: continue
        fx = {'c': 0, 'r': 0, 't': 0, 'o': 0}
        fx_m = re.search(r'\bfx:\s*\{([^}]*)\}', obj, re.S)
        if fx_m:
            for m in re.finditer(r'([crto]):\s*(-?\d+)', fx_m.group(1)):
                fx[m.group(1)] = int(m.group(2))
        rewards.append({'id': id_m.group(1), 'fx': fx})
    return rewards

CHAR_KEYS = ['haeun', 'doyun', 'sejin', 'jaehyuk']

def chk_special_ending(s, gi, act, trust, logs):
    if act < 4: return None
    def t(v): return 1 if v >= 65 else 0
    def m(v): return 1 if v >= 60 else 0
    high = t(trust['haeun']) + t(trust['doyun']) + t(trust['sejin']) + t(trust['jaehyuk'])
    mid = m(trust['haeun']) + m(trust['doyun']) + m(trust['sejin']) + m(trust['jaehyuk'])
    any70 = sum(1 for ch in CHAR_KEYS if trust[ch] >= 70)
    any55 = sum(1 for ch in CHAR_KEYS if trust[ch] >= 55)
    lc = len(logs)
    has_log_12 = 'LOG-012' in logs
    has_observer = 'LOG-OBSERVER-01' in logs
    has_approved = 'LOG-OBSERVER-APPROVED' in logs
    has_quiet_freedom = 'LOG-RH-QUIET-FREEDOM' in logs
    if act >= 4 and s['day'] >= 30 and gi >= 55 and s['c'] >= 70 and s['o'] >= 60: return 'A'
    if has_log_12 and has_observer and has_approved and s['day'] >= 30 and gi <= 5: return 'F'
    if has_log_12 and has_observer and has_approved and s['day'] >= 31 and gi <= 0: return 'F'
    if has_log_12 and has_observer and not has_approved and s['day'] >= 33 and gi <= -20 and high >= 2: return 'F'
    if has_quiet_freedom and gi <= -30 and mid >= 3 and lc >= 8 and s['day'] >= 30: return 'D'
    if gi <= -30 and mid >= 3 and lc >= 8 and s['day'] >= 31: return 'D'
    if gi <= -35 and s['r'] >= 35 and any70 >= 1 and lc >= 10 and s['day'] >= 32: return 'D'
    if gi <= -15 and high >= 2 and lc >= 6 and s['day'] >= 30: return 'B'
    if gi <= -25 and high <= 1 and lc >= 10 and s['day'] >= 31: return 'B'
    if 0 <= gi <= 20 and any55 >= 1 and lc >= 7 and s['day'] >= 30: return 'G'
    if -5 <= gi <= 25 and any55 >= 2 and lc >= 9 and s['day'] >= 32: return 'G'
    return None

def resolve_time_up(s, gi, trust, logs):
    high = sum(1 for ch in CHAR_KEYS if trust[ch] >= 65)
    if gi >= 40: return 'A'
    if gi <= -20 and high >= 1: return 'D'
    if gi <= -15: return 'B'
    return 'G'

def get_transition_route(new_act, act_flags, gi):
    if new_act == 2:
        return 'A'
    if new_act == 3:
        prom_met = bool(act_flags.get('prom_met'))
        mission_done = bool(act_flags.get('mission_done'))
        if prom_met and mission_done: return 'A'
        if prom_met: return 'B'
        if mission_done: return 'C'
        return 'D'
    if new_act == 4:
        if gi >= 10: return 'A4_COMPLY'
        if gi >= -15: return 'A4_GREY'
        if gi >= -30: return 'A4_RESIST'
        return 'A4_OBSERVER'
    return ''

def transition_penalty(new_act, route):
    if new_act == 4:
        if route == 'A4_COMPLY': return 0
        return 5
    if new_act == 3:
        return 5 if route in ('A', 'B', 'C') else 10
    if new_act == 2:
        return 0 if route == 'A' else 5
    return 0

def apply_transition_penalty(s, new_act, route):
    penalty = transition_penalty(new_act, route)
    if penalty <= 0:
        return s
    ns = dict(s)
    for k in 'crto':
        ns[k] = max(0, min(100, ns[k] - penalty))
    return ns

def resistance_safeguard_eligible(s, gi, logs):
    if 'ONCE-RH-SAFE-01' in logs or 'LOG-RH-SAFEGUARD' in logs: return False
    if s.get('day', 1) < 8: return False
    if s.get('c', 0) <= 0 or s.get('r', 0) <= 0 or s.get('t', 0) <= 0 or s.get('o', 0) <= 0 or s.get('c', 0) >= 100: return False
    resistance = gi <= -35 or any(str(x).startswith(('LOG-RH-', 'LOG-LJC-PROM-', 'LOG-UPRISING-')) for x in logs)
    if not resistance: return False
    return s['c'] <= 25 or s['r'] <= 25 or s['t'] <= 20 or s['o'] <= 20

def apply_resistance_safeguard(s, gi, logs):
    if not resistance_safeguard_eligible(s, gi, logs): return s, gi, False
    ns = dict(s)
    ns['c'] = max(ns['c'], 35); ns['r'] = max(ns['r'], 45)
    ns['t'] = max(ns['t'], 35); ns['o'] = max(ns['o'], 25)
    for item in ('LOG-RH-SAFEGUARD', 'ONCE-RH-SAFE-01'):
        if item not in logs: logs.append(item)
    return ns, gi - 3, True

def oracle_safeguard_eligible(s, gi, logs):
    if 'ONCE-ORC-LOYAL-SAFE-01' in logs or 'LOG-ORACLE-SAFEGUARD' in logs: return False
    if s.get('c', 0) <= 0 or s.get('r', 0) <= 0 or s.get('t', 0) <= 0 or s.get('o', 0) <= 0 or s.get('c', 0) >= 100: return False
    if gi < 10: return False
    return s['c'] <= 20 or s['r'] <= 20 or s['t'] <= 20

def apply_oracle_safeguard(s, gi, logs):
    if not oracle_safeguard_eligible(s, gi, logs): return s, gi, False
    ns = dict(s)
    ns['c'] = max(ns['c'], 40); ns['r'] = max(ns['r'], 40); ns['t'] = max(ns['t'], 40)
    for item in ('LOG-ORACLE-SAFEGUARD', 'ONCE-ORC-LOYAL-SAFE-01'):
        if item not in logs: logs.append(item)
    return ns, gi + 3, True

def apply_route_safeguard(s, gi, logs):
    ns, ng, applied = apply_resistance_safeguard(s, gi, logs)
    if applied: return ns, ng, True
    return apply_oracle_safeguard(s, gi, logs)

def _clamp_stat(v):
    return max(0, min(100, v))

def _as_log_list(choice):
    return choice.get('logs', []) if choice else []

def _has_log_prefix(choice, prefixes):
    for log in _as_log_list(choice):
        for prefix in prefixes:
            if str(log).startswith(prefix): return True
    return False

def _raises(before, after, key):
    return after[key] > before[key]

def _lift_below(after, key, target):
    if after[key] < target:
        after[key] = _clamp_stat(target)
        return True
    return False

def _cap_above(after, key, target):
    if after[key] > target:
        after[key] = _clamp_stat(target)
        return True
    return False

def is_resistance_choice(card, choice, before_gi, after_gi):
    cid = str(card.get('id', '')) if card else ''
    g = choice.get('g', 0) if choice else 0
    if g < 0: return True
    if cid.startswith('RH-'): return True
    if cid.startswith('LJC-PROM-') and g <= 0: return True
    return _has_log_prefix(choice, ('LOG-RH-', 'LOG-CHAR-', 'LOG-RECON-', 'LOG-LJC-PROM-', 'LOG-UPRISING-'))

def is_loyal_choice(card, choice, before_gi, after_gi, before, after):
    cid = str(card.get('id', '')) if card else ''
    g = choice.get('g', 0) if choice else 0
    if g > 0 or after_gi > before_gi: return True
    if cid.startswith('CB-') or cid.startswith('ORC-LOYAL-'): return True
    return _raises(before, after, 'o') and not _raises(before, after, 't')

def is_neutral_route(gi):
    return gi > -35 and gi < 8

CRITICAL_BAND = 25
STAT_STEP = 5

def dampen_critical_band_loss(before, after):
    """balance-tuning.js dampenCriticalBandLoss 미러 — 선택 카드 전용.
    위험대(<=25) 안에서의 추가 손실을 절반으로 완화하되 5단위 그리드로 올림 스냅.
    (-5 유지 / -10→-5 / -15→-10 / -20→-10) 진입 타격은 그대로.
    보상/일일 감쇠 경로는 액면 그대로 — 게임오버도 서사의 일부."""
    hit = False
    for k in 'crto':
        b = before.get(k, 0)
        a = after.get(k, 0)
        if b <= CRITICAL_BAND and a < b:
            loss = b - a
            soft = math.ceil(loss / 2 / STAT_STEP) * STAT_STEP
            if soft < loss:
                after[k] = max(0, min(100, b - soft))
                hit = True
    return hit

def apply_choice_balance_tuning(before, before_gi, after, after_gi, card, choice, act):
    ns = dict(after)
    ng = after_gi
    changed = False
    cid = str(card.get('id', '')) if card else ''

    if dampen_critical_band_loss(before, ns):
        changed = True

    if cid == 'CE-005':
        if ng < before_gi - 5:
            ng = before_gi - 5
            changed = True
        changed = _lift_below(ns, 'o', 5) or changed

    if cid == 'CE-015':
        changed = _lift_below(ns, 'o', 5) or changed
        changed = _lift_below(ns, 'r', 5) or changed

    if cid in ('CE-042', 'CE-042B', 'CE-042C', 'CE-042D'):
        changed = _lift_below(ns, 'o', 5) or changed
        changed = _lift_below(ns, 'r', 5) or changed

    if cid == 'CA4-EX-02':
        changed = _lift_below(ns, 'o', 5) or changed
        changed = _lift_below(ns, 'r', 5) or changed

    if cid == 'CA4-OR-03':
        changed = _lift_below(ns, 'o', 5) or changed

    if act <= 2 and is_resistance_choice(card, choice, before_gi, ng) and before.get('o', 0) > 0 and ns.get('o', 0) <= 0:
        changed = _lift_below(ns, 'o', 5) or changed

    # 주의: JS와 1:1 미러가 아니라 시뮬 캘리브레이션 캡이다.
    # 본편 스와이프 경로는 applyFx가 전 Act 0~100 클램프(95캡은 다이얼로그/미션 경로에만 존재)지만,
    # 시뮬 프로필의 카드 추첨 편향이 실플레이보다 c를 과도하게 끌어올려 act<=1로 좁히면
    # Act2 초입 C_cs가 80%+로 폭증(실관측과 불일치). 출하 밸런스 기준선(BUILD 242~247)이
    # 모두 이 캡으로 측정되었으므로 변경 시 전 기준선 재측정이 필요하다.
    if act <= 3 and _raises(before, ns, 'c') and ns['c'] >= 100:
        changed = _cap_above(ns, 'c', 95) or changed

    return ns, ng, changed

REWARDS = parse_rewards()

N_RUNS = int(sys.argv[1]) if len(sys.argv) > 1 else 300
PROFILE = sys.argv[2] if len(sys.argv) > 2 else 'all'
ALL_PROFILES = ['comply', 'rebel', 'careful', 'explorer', 'newbie']
if PROFILE not in ALL_PROFILES + ['all']:
    raise SystemExit(f'Unknown profile: {PROFILE}\nUse: all, {", ".join(ALL_PROFILES)}')

random.seed(42)

# ═══════════ 미션/체인/히든로그 ID 수집 ═══════════

def collect_mission_ids():
    """data-missions*.js에서 미션 ID 수집."""
    ids = set()
    for fn in os.listdir(ROOT):
        if fn.startswith('data-missions') and fn.endswith('.js'):
            src = read(fn)
            for m in re.finditer(r'id:\s*"(M[I]?-\d+)"', src):
                ids.add(m.group(1))
    return ids

def collect_chain_ids():
    """data-chains*.js에서 체인 시작 ID 수집."""
    ids = set()
    for fn in os.listdir(ROOT):
        if fn.startswith('data-chains') and fn.endswith('.js'):
            src = read(fn)
            for m in re.finditer(r'id:\s*"(CH-[^"]+)"', src):
                ids.add(m.group(1))
    return ids

def collect_hidden_logs():
    """히든 스토리/옵저버/특수 루트에 필요한 LOG ID."""
    return {
        'observer': ['LOG-OBSERVER-APPROVED', 'LOG-OBSERVER-01', 'LOG-012', 'LOG-013'],
        'hidden_story': ['LOG-HIDDEN-01', 'LOG-HIDDEN-02', 'LOG-HIDDEN-03'],
        'investigation': ['LOG-EV-UNLOCK'],
        'prometheus': ['LOG-PROM-CONTACT', 'LOG-LJC-PROM-01'],
        'uprising': ['LOG-UPRISING-01', 'LOG-UPRISING-02'],
        'resistance_safe': ['LOG-RH-SAFEGUARD', 'LOG-RH-QUIET-FREEDOM'],
        'oracle_safe': ['LOG-ORACLE-SAFEGUARD'],
    }

def collect_mission_trigger_cards():
    """mission 필드가 있는 카드 ID → 미션 ID 매핑."""
    triggers = {}
    for c in CARDS:
        for side_key in ('left', 'right'):
            side = c.get(side_key)
            if not side:
                continue
            for log in side.get('logs', []):
                if log.startswith('LOG-MISSION-') or log.startswith('MISSION-'):
                    triggers[c['id']] = log
    # 또한 카드 body에서 mission: "M-XXX" 패턴 검색
    for fn in os.listdir(ROOT):
        if fn.startswith('data-cards') and fn.endswith('.js'):
            src = read(fn)
            for m in re.finditer(r'id:\s*"([^"]+)"[^}]*?mission:\s*"([^"]+)"', src, re.S):
                triggers[m.group(1)] = m.group(2)
    return triggers

def collect_chain_trigger_map():
    """data-chains*.js에서 체인 트리거 매핑: (card_id, direction) -> chain_id."""
    chain_map = {}
    for fn in os.listdir(ROOT):
        if fn.startswith('data-chains') and fn.endswith('.js'):
            src = read(fn)
            for m in re.finditer(r'"(CH-[^"]+)":\s*\{[^}]*trigger:\s*"([^"]+)"', src, re.S):
                chain_id = m.group(1)
                trigger = m.group(2)
                if '-left' in trigger:
                    card_id = trigger.replace('-left', '')
                    chain_map[(card_id, 'left')] = chain_id
                elif '-right' in trigger:
                    card_id = trigger.replace('-right', '')
                    chain_map[(card_id, 'right')] = chain_id
                else:
                    chain_map[(trigger, 'left')] = chain_id
                    chain_map[(trigger, 'right')] = chain_id
    return chain_map

MISSION_IDS = collect_mission_ids()
CHAIN_IDS = collect_chain_ids()
HIDDEN_LOG_GROUPS = collect_hidden_logs()
MISSION_TRIGGERS = collect_mission_trigger_cards()
CHAIN_TRIGGER_MAP = collect_chain_trigger_map()  # (card_id, dir) -> chain_id

# ═══════════ ACTIVE_SPECS / 돌발 긴급 시뮬 ═══════════

ALL_SPEC_TAGS = ['spec-001', 'spec-003', 'spec-004', 'spec-008', 'spec-011', 'spec-012', 'spec-015']
ACTIVE_SPEC_COUNT = 3

# EMERGENCY_AMBUSHES 미러 (app-init.js)
EMERGENCY_AMBUSHES = [
    {'spec': 'spec-015', 'mission': 'M-E02', 'done': 'LOG-041'},
    {'spec': 'spec-003', 'mission': 'M-E03', 'done': 'LOG-014'},
    {'spec': 'spec-001', 'mission': 'M-E04', 'done': 'LOG-013'},
]

# CT-301 ~ CT-304: 긴급 돌발 카드 ID 목록
AMBUSH_CARD_IDS = {'CT-301', 'CT-302', 'CT-303', 'CT-304'}
# CT-302/303/304의 spec-목표 매핑 (ambushPending 쪽)
AMBUSH_CARD_SPEC = {
    'CT-302': 'spec-015',
    'CT-303': 'spec-003',
    'CT-304': 'spec-001',
}

def pick_active_specs():
    """세션당 ACTIVE_SPEC_COUNT종 고정 활성 변이체 선택."""
    return set(random.sample(ALL_SPEC_TAGS, ACTIVE_SPEC_COUNT))

def sim_ambush_pending(spec_tag, done_log, s, logs, active_specs):
    """app-init.js ambushPending 미러.
    활성 종(active_specs)은 조사루트로 다룸 → 여기선 False (상호배타).
    done_log가 이미 있으면 완료 → False.
    s.day >= 5 이상이어야 등장."""
    if not active_specs:
        return False
    if spec_tag in active_specs:
        return False  # 활성 종은 조사루트 → ambush 제외
    if done_log in logs:
        return False
    day = s.get('day', 1)
    if day < 5:
        return False
    return True

def sim_spec_ok(card, active_specs):
    """specOk 미러: spec 태그 카드는 active_specs에 속할 때만 등장."""
    tag = card.get('tag') or ''
    if not tag.startswith('spec-'):
        return True
    if not active_specs:
        return True
    return tag in active_specs

def eval_req_extended(expr, s, gi, logs, active_specs):
    """eval_req 확장판 — ambushPending/ACTIVE_SPECS 글로벌 처리 추가."""
    if not expr:
        return True
    # CT-30x의 ambushPending 패턴: 특수 파이썬 함수로 인터셉트
    # JS: ambushPending('spec-015','LOG-041',s,logs)
    import re as _re
    ambush_m = _re.search(
        r"ambushPending\(['\"]([^'\"]+)['\"],\s*['\"]([^'\"]+)['\"]",
        expr
    )
    if ambush_m:
        spec_tag = ambush_m.group(1)
        done_log = ambush_m.group(2)
        return sim_ambush_pending(spec_tag, done_log, s, logs, active_specs)
    # CT-301 패턴: ACTIVE_SPECS.indexOf('spec-011') < 0
    active_spec_m = _re.search(
        r"ACTIVE_SPECS\.indexOf\(['\"]([^'\"]+)['\"]\)\s*<\s*0",
        expr
    )
    if active_spec_m:
        spec_tag = active_spec_m.group(1)
        day_m = _re.search(r's\.day\s*>=\s*(\d+)', expr)
        min_day = int(day_m.group(1)) if day_m else 0
        if s.get('day', 1) < min_day:
            return False
        return spec_tag not in active_specs
    # 일반 eval_req
    return eval_req(expr, s, gi, logs)

# 미션 트리거 카드 목록 (카드 body에서 mission 필드 있는 것 전체)
MISSION_CARD_IDS = set()
for _c in CARDS:
    for _sk in ('left', 'right'):
        _side = _c.get(_sk)
        if _side and _side.get('mission'):
            MISSION_CARD_IDS.add(_c['id'])
            break

# 체인 카드 ID 목록 (CH-로 시작하는 것)
CHAIN_CARD_IDS = {c['id'] for c in CARDS if c['id'].startswith('CH-')}

# 카드 연속 중복 감지용 윈도우 크기
REPEAT_WINDOW = 5

SESSION_DECK_PACK_WEIGHTS = [
    ('DG_MERIDIAN', 2),
    ('B3_PREDECESSOR', 2),
    ('PROMETHEUS_TENSION', 2),
    ('UPRISING_INFRA', 1),
    ('MUTANT_SURGE', 2),
    ('GOV_ORACLE_SUSPICION', 2),
]
SESSION_DECK_PICK_COUNT = 4
SESSION_DECK_MUTANT_SURGE_IDS = {
    'C-030', 'C-031', 'C-045', 'C-047', 'C-066',
    'C-175', 'CE-021', 'CE-025', 'CE-036',
    'C-271', 'C-272', 'C-273', 'C-274', 'C-275',
}

def pick_session_deck():
    pool = list(SESSION_DECK_PACK_WEIGHTS)
    picked = []
    while pool and len(picked) < SESSION_DECK_PICK_COUNT:
        total = sum(w for _, w in pool)
        roll = random.random() * total
        acc = 0
        for idx, (pack, weight) in enumerate(pool):
            acc += weight
            if roll <= acc:
                picked.append(pack)
                pool.pop(idx)
                break
    return set(picked)

def _tag_has(tag, token):
    tag = str(tag or '').lower()
    token = str(token or '').lower()
    if not tag or not token: return False
    return tag == token or tag.startswith(token + '-') or ('-' + token) in tag or ('_' + token) in tag

def get_card_session_deck_pack(card):
    if not card: return None
    if card.get('sessionPack'): return card.get('sessionPack')
    cid = str(card.get('id', ''))
    tag = str(card.get('tag') or '').lower()
    if cid in SESSION_DECK_MUTANT_SURGE_IDS or tag == 'mutant-surge': return 'MUTANT_SURGE'
    if tag == 'gov-oracle-suspicion': return 'GOV_ORACLE_SUSPICION'
    if tag == 'uprising-hint' or cid.startswith('HH-'): return 'UPRISING_INFRA'
    if (
        cid in ('A2-FORESHADOW-01', 'A2-FORESHADOW-02', 'A2-TRIAGE-01') or
        cid.startswith('A3-B3-') or cid.startswith('A4-B3-') or
        cid.startswith('CA-SEED-') or re.match(r'^C-32[0-5]$', cid) or
        _tag_has(tag, 'b3') or 'predecessor' in tag
    ):
        return 'B3_PREDECESSOR'
    if (
        cid.startswith(('DG-', 'MD-', 'SUP-DM-', 'CA23-DV-', 'CH-DG-', 'CH-MD-', 'CH-SUP-')) or
        _tag_has(tag, 'dg') or _tag_has(tag, 'meridian')
    ):
        return 'DG_MERIDIAN'
    if cid.startswith('LJC-PROM-') or tag in ('prometheus-lee', 'midgame-prom'):
        return 'PROMETHEUS_TENSION'
    return None

def _session_deck_log_fallback(pack, logs):
    prefixes = {
        'DG_MERIDIAN': ('LOG-DG', 'LOG-MD', 'LOG-DV', 'LOG-SUPPLY-DG', 'LOG-SUPPLY-MD'),
        'B3_PREDECESSOR': ('LOG-090', 'LOG-091', 'LOG-092', 'LOG-093', 'LOG-CHAR-', 'LOG-A2-FORESHADOW', 'LOG-A2-TRIAGE', 'LOG-B3-LINEAGE', 'LOG-A4-B3-LINEAGE'),
        'PROMETHEUS_TENSION': ('LOG-LJC-PROM', 'LOG-PROM'),
        'UPRISING_INFRA': ('LOG-UPRISING',),
        'MUTANT_SURGE': ('LOG-MS-',),
        'GOV_ORACLE_SUSPICION': ('LOG-GOV-',),
    }.get(pack, ())
    return any(str(log).startswith(prefixes) for log in logs)

def session_deck_ok(card, logs, act, session_deck):
    pack = get_card_session_deck_pack(card)
    if not pack: return True
    min_act = 3 if pack == 'DG_MERIDIAN' else 2
    if act < min_act: return False
    if pack in session_deck: return True
    return _session_deck_log_fallback(pack, logs)

def session_deck_lineage_weight(card, logs, act, session_deck):
    pack = get_card_session_deck_pack(card)
    if not pack or act < 3: return 1.0
    if card.get('transReq'): return 1.0
    active = pack in session_deck
    touched = _session_deck_log_fallback(pack, logs)
    weight = 1.0
    if touched:
        weight += 0.75 if act >= 4 else 0.55
    elif active:
        weight += 0.35 if act >= 4 else 0.25
    if pack == 'B3_PREDECESSOR' and touched:
        weight += 0.15
    if card.get('once'):
        weight += 0.1
    return max(0.75, min(2.1, weight))

def card_base_weight(card):
    w = 1.0
    priority = card.get('priority')
    if priority == '상':
        w += 5
    elif priority == '중':
        w += 2
    elif priority == 'event':
        w += 6
    if card.get('once'):
        w += 2
    if card.get('transReq'):
        w += 4
    if card.get('glitch'):
        w += 1
    return w

def rescue_flow_weight(card, s):
    """app-init.js rescueFlowWeight 미러: 위험대 스탯 회복 카드 가중치 부스트."""
    if not s or not card:
        return 1
    mult = 1
    for k in 'crto':
        v = s.get(k, 100)
        if not isinstance(v, (int, float)) or v > 35:
            continue
        heals = False
        for side_key in ('left', 'right'):
            side = card.get(side_key)
            if side and side.get('fx', {}).get(k, 0) > 0:
                heals = True
                break
        if not heals:
            continue
        m = 4 if v <= 20 else (3 if v <= 30 else 2)
        if m > mult:
            mult = m
    return mult

def weighted_card_choice(pool, logs, act, session_deck, s=None):
    def wgt(c):
        return card_base_weight(c) * session_deck_lineage_weight(c, logs, act, session_deck) * rescue_flow_weight(c, s)
    total = sum(wgt(c) for c in pool)
    if total <= 0: return random.choice(pool)
    roll = random.random() * total
    for c in pool:
        roll -= wgt(c)
        if roll <= 0:
            return c
    return pool[-1]

def note_hidden_logs(logs, hidden_logs_found):
    for L in logs:
        for group_logs in HIDDEN_LOG_GROUPS.values():
            if L in group_logs:
                hidden_logs_found.add(L)

# ═══════════ 성격 프로필 선택 로직 ═══════════

def choose_side_profile(card, s, gi, profile, logs):
    """프로필에 따른 좌/우 선택."""
    L, R = card.get('left'), card.get('right')
    if not L or not R:
        return random.choice(['left', 'right'])

    if profile == 'comply':
        # ORACLE 평가(o) 유지 + GI 상승 선호
        lo = L['fx'].get('o', 0) + L['g'] * 0.5
        ro = R['fx'].get('o', 0) + R['g'] * 0.5
        if lo > ro: return 'left'
        if ro > lo: return 'right'
        return random.choice(['left', 'right'])

    elif profile == 'rebel':
        # GI 감소 + 신뢰(t) 유지 선호
        lg = L['g'] * -1 + L['fx'].get('t', 0) * 0.5
        rg = R['g'] * -1 + R['fx'].get('t', 0) * 0.5
        if lg > rg: return 'left'
        if rg > lg: return 'right'
        return random.choice(['left', 'right'])

    elif profile == 'careful':
        # 가장 낮은 스탯 방어 + 즉사 스탯 회피
        lowest_key = min('crto', key=lambda k: s[k])
        danger = [k for k in 'crto' if s[k] <= 25]
        def score(side):
            sc = 0
            for k in danger:
                sc += side['fx'].get(k, 0) * 3
            sc += side['fx'].get(lowest_key, 0) * 2
            sc += sum(max(0, v) for v in side['fx'].values())
            return sc
        ls, rs = score(L), score(R)
        if ls > rs: return 'left'
        if rs > ls: return 'right'
        return random.choice(['left', 'right'])

    elif profile == 'explorer':
        # 미션/체인 트리거 카드면 해당 방향 우선
        # LOG 생성이 많은 쪽 선호 (콘텐츠 탐색)
        ll = len(L.get('logs', []))
        rl = len(R.get('logs', []))
        if ll > rl: return 'left'
        if rl > ll: return 'right'
        # 그 외엔 약간 랜덤 + 긍정 편향
        total_l = sum(v for v in L['fx'].values())
        total_r = sum(v for v in R['fx'].values())
        if total_l > total_r: return 'left'
        if total_r > total_l: return 'right'
        return random.choice(['left', 'right'])

    elif profile == 'newbie':
        # 70% 랜덤, 30% 스탯 합계 좋은 쪽
        if random.random() < 0.7:
            return random.choice(['left', 'right'])
        total_l = sum(v for v in L['fx'].values())
        total_r = sum(v for v in R['fx'].values())
        if total_l >= total_r: return 'left'
        return 'right'

    return random.choice(['left', 'right'])

# ═══════════ 이브닝 시뮬 (프로필 반영) ═══════════

def simulate_evening_profile(trust, gi, profile, day):
    targets = random.sample(CHAR_KEYS, random.choice([1, 2]))
    gi_delta = 0
    interactions = []

    for ch in targets:
        if profile == 'comply':
            t_delta = random.choice([2, 3, 5, 5, 0, -2])
            g_delta = random.choice([1, 2, 2, 0, 0])
        elif profile == 'rebel':
            t_delta = random.choice([5, 8, 10, 12, 3])
            g_delta = random.choice([-2, -3, -4, -1, 0])
        elif profile == 'careful':
            t_delta = random.choice([3, 5, 5, 7, 0])
            g_delta = random.choice([0, 0, 1, -1])
        elif profile == 'explorer':
            t_delta = random.choice([5, 7, 8, 3, 0, -3])
            g_delta = random.choice([0, -1, 1, -2, 2])
        elif profile == 'newbie':
            t_delta = random.choice([0, 3, 5, -3, -5, 8])
            g_delta = random.choice([0, 0, 1, -1, 2, -2])
        else:
            t_delta = random.randint(-3, 8)
            g_delta = random.randint(-2, 2)

        old_trust = trust[ch]
        trust[ch] = max(0, min(100, trust[ch] + t_delta))
        gi_delta += g_delta
        interactions.append({'char': ch, 'trust_delta': t_delta, 'trust_after': trust[ch]})

    return gi_delta, interactions

# ═══════════ 보상 선택 (프로필 반영) ═══════════

def choose_reward_profile(options, s, profile):
    if not options:
        return None
    if profile == 'newbie':
        return random.choice(options)

    def score(opt):
        fx = opt['fx']
        if profile == 'comply':
            return fx.get('o', 0) * 3 + fx.get('c', 0) * 2 + sum(v for v in fx.values())
        elif profile == 'rebel':
            return fx.get('t', 0) * 3 + fx.get('r', 0) * 2 - fx.get('o', 0)
        elif profile == 'careful':
            lowest = min('crto', key=lambda k: s[k])
            return fx.get(lowest, 0) * 5 + sum(max(0, v) for v in fx.values())
        elif profile == 'explorer':
            return sum(v for v in fx.values())
        return 0

    return max(options, key=score)

def apply_reward(s, reward, act=None, gi=0, trans_route=''):
    if not reward:
        return s
    ns = dict(s)
    for k in 'crto':
        ns[k] += reward['fx'].get(k, 0) * 5
        ns[k] = max(0, min(100, ns[k]))
    if act <= 2:
        rid = reward.get('id')
        if rid == 'R-06':
            ns['r'] = max(0, min(100, s['r'] + 5))
            ns['t'] = max(0, min(100, s['t'] + 10))
            ns['o'] = max(0, min(100, s['o'] - 5))
        elif rid == 'R-07':
            ns['r'] = max(0, min(100, s['r'] - 5))
            ns['t'] = max(0, min(100, s['t']))
            ns['o'] = max(0, min(100, s['o'] + 10))
        elif rid == 'R-08':
            ns['c'] = max(0, min(100, s['c'] + 5))
            ns['r'] = max(0, min(100, s['r'] - 5))
            ns['t'] = max(0, min(100, s['t'] + 5))
    if act == 3:
        ns['c'] = max(0, ns['c'] - 5)
        if gi < 20 and trans_route != 'A4_COMPLY':
            ns['r'] = max(0, ns['r'] - 5)
    elif act == 4:
        loyal_relief = gi >= 40 or trans_route == 'A4_COMPLY'
        ns['c'] = max(0, ns['c'] - 10)
        ns['r'] = max(0, ns['r'] - (5 if loyal_relief else 10))
        ns['t'] = max(0, ns['t'] - (0 if loyal_relief else 5))
    # 시뮬 캘리브레이션 캡 (위 apply_choice 주석 참조 — JS 1:1 아님, 기준선 보존용)
    if act is not None and act <= 3 and s.get('c', 0) < 100 and ns['c'] >= 100:
        ns['c'] = 95
    # 보상 패널티와 act 3/4 일일 압박은 액면 그대로 적용 — 위험대 완충 없음.
    # 게임오버도 서사의 일부.
    return ns

# ═══════════ 시뮬 본체 ═══════════

def simulate_one(profile):
    s = {'c': 50, 'r': 65, 't': 50, 'o': 40, 'day': 1}
    gi = 0
    logs = []
    trust = {ch: 50 for ch in CHAR_KEYS}
    recent = collections.deque(maxlen=60)
    tag_cd = {}
    session_deck = pick_session_deck()
    active_specs = pick_active_specs()  # 세션별 ACTIVE_SPECS
    act_flags = {'prom_met': False, 'mission_done': False, 'chain_done': False, 'prom_mission': False}
    trans_route = ''
    card_freq = collections.Counter()
    ending = None
    max_days = 50

    # 추적용
    missions_triggered = set()       # mission 필드가 있는 카드가 실제 등장한 mission ID
    chains_started = set()
    chains_completed = set()
    hidden_logs_found = set()
    death_day = None
    death_act = None
    stat_history = []
    evening_log = []

    # 덱 이상징후 추적
    null_draw_days = []              # pool=0으로 드로우 실패한 day
    repeat_streaks = 0               # REPEAT_WINDOW 내 동일 카드 재출현 횟수
    ambush_triggered = {}            # CT-30x id → 발동 day
    ambush_eligible_checked = {}     # CT-30x id → 조건 충족(세션 내 첫 1회)
    mission_card_seen = set()        # 이번 세션에서 등장한 미션 카드 ID (mission 필드 보유 카드)
    chain_triggered_this_session = set()  # 이번 세션에서 트리거된 체인 ID
    recent_window = collections.deque(maxlen=REPEAT_WINDOW)  # 짧은 윈도우 중복 감지용

    while s['day'] <= max_days and ending is None:
        if s['day'] > 35:
            ending = resolve_time_up(s, gi, trust, logs)
            break
        act = get_act(s['day'])
        # Runtime applies act pressure after the daily reward pick; keep the
        # start-of-day pass side-effect free so simulator timings match app.js.

        s, gi, safeguarded = apply_route_safeguard(s, gi, logs)
        if safeguarded: note_hidden_logs(logs, hidden_logs_found)

        go = chk_game_over(s)
        if go:
            ending = go
            death_day = s['day']
            death_act = act
            break

        n = CARDS_PER_DAY[act]
        drew_any = False
        for _ in range(n):
            pool = []
            for c in CARDS:
                if c['id'] in ('ORC-LOYAL-SAFE-01', 'RH-SAFE-01'): continue
                if c['id'] in recent: continue
                if act not in c['act']: continue
                if c.get('transReq') and c.get('transReq') != trans_route: continue
                if c['tag'] and tag_cd.get(c['tag'], -99) >= s['day'] - 3: continue
                if not c['tag']:
                    is_generic = c['act'] and len(c['act']) >= 3
                    if is_generic:
                        if c['id'] in tag_cd: continue
                    elif tag_cd.get(c['id'], -99) >= s['day'] - 15: continue
                if c['once'] and ('ONCE-' + c['id']) in logs: continue
                if not session_deck_ok(c, logs, act, session_deck): continue
                # ACTIVE_SPECS 게이팅 (specOk 미러)
                if not sim_spec_ok(c, active_specs): continue
                # req 평가: ambushPending/ACTIVE_SPECS 처리 확장 버전
                if not eval_req_extended(c['req'], s, gi, logs, active_specs): continue
                pool.append(c)

            # CT-30x 등장 가능성 사전 점검 (조건 충족 여부 기록, 세션 내 첫 충족만 기록)
            # 단, 이미 발동된(ONCE 로그 있음) 카드는 eligible 제외
            for ct_id, spec_tag in AMBUSH_CARD_SPEC.items():
                if ct_id not in ambush_eligible_checked and ct_id not in ambush_triggered and ('ONCE-' + ct_id) not in logs:
                    done_log = next((a['done'] for a in EMERGENCY_AMBUSHES if a['spec'] == spec_tag), None)
                    if done_log and sim_ambush_pending(spec_tag, done_log, s, logs, active_specs):
                        ambush_eligible_checked[ct_id] = 1
            # CT-301 별도 점검 (spec-011 휴면 여부)
            if 'CT-301' not in ambush_eligible_checked and 'CT-301' not in ambush_triggered and ('ONCE-CT-301') not in logs:
                if s.get('day', 1) >= 7 and 'spec-011' not in active_specs:
                    ambush_eligible_checked['CT-301'] = 1

            if not pool:
                null_draw_days.append(s['day'])
                break

            c = weighted_card_choice(pool, logs, act, session_deck, s)
            drew_any = True

            # 연속 중복 감지: REPEAT_WINDOW 내 같은 카드 재등장
            if c['id'] in recent_window:
                repeat_streaks += 1
            recent_window.append(c['id'])

            # 긴급 돌발(CT-30x) 발동 기록
            if c['id'] in AMBUSH_CARD_IDS:
                ambush_triggered[c['id']] = s['day']

            # 미션 카드 등장 기록
            if c['id'] in MISSION_CARD_IDS:
                mission_card_seen.add(c['id'])

            dir_choice = choose_side_profile(c, s, gi, profile, logs)

            # 체인 트리거 추적: 올바른 방향 선택 시 체인 시작
            chain_key = (c['id'], dir_choice)
            if chain_key in CHAIN_TRIGGER_MAP:
                chain_triggered_this_session.add(CHAIN_TRIGGER_MAP[chain_key])

            side = c[dir_choice]
            before_s = dict(s)
            before_gi = gi
            if side:
                for k, v in side['fx'].items():
                    s[k] = _clamp_stat(s[k] + v * 5)
                gi += side['g']
                floor = side.get('floor') or {}
                for fk, fv in floor.items():
                    if fk in s and s[fk] < fv and (not side.get('floorCriticalOnly') or s[fk] <= 20):
                        s[fk] = fv
                s, gi, _ = apply_choice_balance_tuning(before_s, before_gi, s, gi, c, side, act)
                if side.get('mission'):
                    act_flags['mission_done'] = True
                    if side.get('mission') in ('M-003', 'M-007'):
                        act_flags['prom_mission'] = True
                for L in side['logs']:
                    if L not in logs:
                        logs.append(L)
                        # 히든 로그 추적
                        for group, group_logs in HIDDEN_LOG_GROUPS.items():
                            if L in group_logs:
                                hidden_logs_found.add(L)

            if c['id'] == 'CA-OBS-PROTO' and dir_choice == 'left' and 'LOG-OBSERVER-APPROVED' not in logs:
                logs.append('LOG-OBSERVER-APPROVED')
                note_hidden_logs(logs, hidden_logs_found)

            for rd, rl in card_log_rules.get(c['id'], []):
                if rd is None or rd == dir_choice:
                    if rl not in logs:
                        logs.append(rl)
                        for group, group_logs in HIDDEN_LOG_GROUPS.items():
                            if rl in group_logs:
                                hidden_logs_found.add(rl)

            # 미션 트리거 추적
            if c['id'] in MISSION_TRIGGERS:
                missions_triggered.add(MISSION_TRIGGERS[c['id']])

            if c['id'] in ('C-006', 'C-011') and dir_choice == 'left':
                act_flags['prom_met'] = True

            # 체인 추적
            cid = c['id']
            if cid.startswith('CH-'):
                parts = cid.rsplit('-', 1)
                if len(parts) == 2 and parts[1].isdigit():
                    chain_base = parts[0]
                    chain_num = int(parts[1])
                    chains_started.add(chain_base)
                    # 체인 마지막 단계인지 확인 (다음 번호가 pool에 없으면 완료)
                    next_id = f'{chain_base}-{chain_num + 1}'
                    if not any(cc['id'] == next_id for cc in CARDS):
                        chains_completed.add(chain_base)
                        act_flags['chain_done'] = True

            if c['once']:
                if ('ONCE-' + c['id']) not in logs:
                    logs.append('ONCE-' + c['id'])
            recent.append(c['id'])
            if c['tag']:
                tag_cd[c['tag']] = s['day']
            else:
                tag_cd[c['id']] = s['day']
            card_freq[c['id']] += 1

            if c.get('endTrigger'):
                ending = c['endTrigger']
                break

            s, gi, safeguarded = apply_route_safeguard(s, gi, logs)
            if safeguarded: note_hidden_logs(logs, hidden_logs_found)
            go = chk_game_over(s)
            if go:
                ending = go
                death_day = s['day']
                death_act = act
                break

        if ending:
            break

        if not drew_any:
            null_draw_days.append(s['day'])

        # 스탯 기록
        stat_history.append({
            'day': s['day'], 'act': act,
            'c': s['c'], 'r': s['r'], 't': s['t'], 'o': s['o'], 'gi': gi,
        })

        # 이브닝
        gi_ev, ev_interactions = simulate_evening_profile(trust, gi, profile, s['day'])
        gi += gi_ev
        evening_log.append({'day': s['day'], 'interactions': ev_interactions})

        reward_options = random.sample(REWARDS, min(4, len(REWARDS))) if REWARDS else []
        chosen = choose_reward_profile(reward_options, s, profile)
        s = apply_reward(s, chosen, act, gi, trans_route)

        s, gi, safeguarded = apply_route_safeguard(s, gi, logs)
        if safeguarded: note_hidden_logs(logs, hidden_logs_found)
        go = chk_game_over(s)
        if go:
            ending = go
            death_day = s['day']
            death_act = act
            break

        s['day'] += 1

        if s['day'] > 35:
            ending = resolve_time_up(s, gi, trust, logs)
            break

        next_act = get_act(s['day'])
        if next_act > act:
            trans_route = get_transition_route(next_act, act_flags, gi)
            s = apply_transition_penalty(s, next_act, trans_route)
            go = chk_game_over(s)
            if go:
                ending = go
                death_day = s['day']
                death_act = next_act
                break
            continue

        se = chk_special_ending(s, gi, next_act, trust, logs)
        if se:
            ending = se
            break

    if ending is None:
        ending = resolve_time_up(s, gi, trust, logs)

    return {
        'ending': ending,
        'day': s['day'],
        'gi': gi,
        'stats': dict(s),
        'trust': dict(trust),
        'logs': list(logs),
        'log_count': len(logs),
        'card_freq': card_freq,
        'missions_triggered': missions_triggered,
        'chains_started': chains_started,
        'chains_completed': chains_completed,
        'hidden_logs': hidden_logs_found,
        'death_day': death_day,
        'death_act': death_act,
        'stat_history': stat_history,
        # 새 추적 항목
        'null_draw_days': list(null_draw_days),
        'repeat_streaks': repeat_streaks,
        'ambush_triggered': dict(ambush_triggered),   # {ct_id: day}
        'ambush_eligible': dict(ambush_eligible_checked),  # {ct_id: check_count}
        'mission_card_seen': set(mission_card_seen),  # 이번 세션에서 등장한 미션 카드
        'chain_card_seen': set(chain_triggered_this_session),  # 이번 세션에서 트리거된 체인 ID
        'active_specs': list(active_specs),
    }

# ═══════════ 집계 함수 ═══════════

def run_profile(profile, n_runs):
    results = []
    for _ in range(n_runs):
        results.append(simulate_one(profile))
    return results

def aggregate(results, profile):
    n = len(results)
    ending_count = collections.Counter()
    days = []
    gis = []
    trusts = {ch: [] for ch in CHAR_KEYS}
    log_counts = []
    mission_counts = collections.Counter()
    chain_start_counts = collections.Counter()
    chain_complete_counts = collections.Counter()
    hidden_counts = collections.Counter()
    death_days = collections.Counter()
    death_acts = collections.Counter()
    card_freq_total = collections.Counter()

    # 새 지표 집계용
    sessions_with_mission_card = 0    # 미션 카드(mission 필드) 1회+ 등장 세션 수
    sessions_with_chain_card = 0      # 체인 카드 1회+ 등장 세션 수
    sessions_with_ambush = 0          # CT-30x 1회+ 발동 세션 수
    ambush_trigger_counts = collections.Counter()  # CT-30x id별 발동 세션 수
    ambush_eligible_sessions = collections.Counter()  # CT-30x id별 조건 충족 세션 수
    null_draw_sessions = 0            # null 드로우 발생 세션 수
    null_draw_total = 0               # null 드로우 총 횟수
    null_draw_day_counts = collections.Counter()
    repeat_streak_total = 0           # 연속 중복 총 횟수
    repeat_streak_sessions = 0        # 연속 중복 발생 세션 수

    # 저자원 구간 미션/긴급 발동 추적 (Act3에서 c 또는 r <= 30인 세션)
    low_resource_sessions = 0
    low_resource_mission_sessions = 0
    low_resource_ambush_sessions = 0

    for r in results:
        ending_count[r['ending']] += 1
        days.append(r['day'])
        gis.append(r['gi'])
        log_counts.append(r['log_count'])
        for ch in CHAR_KEYS:
            trusts[ch].append(r['trust'][ch])
        for mid in r['missions_triggered']:
            mission_counts[mid] += 1
        for ch in r['chains_started']:
            chain_start_counts[ch] += 1
        for ch in r['chains_completed']:
            chain_complete_counts[ch] += 1
        for hl in r['hidden_logs']:
            hidden_counts[hl] += 1
        if r['death_day']:
            death_days[r['death_day']] += 1
        if r['death_act']:
            death_acts[r['death_act']] += 1
        for cid, cnt in r['card_freq'].items():
            card_freq_total[cid] += cnt

        # 미션 카드 세션 등장 여부
        if r.get('mission_card_seen'):
            sessions_with_mission_card += 1

        # 체인 트리거 세션 여부 (data-chains.js 체인 트리거 카드를 올바른 방향으로 선택)
        if r.get('chain_card_seen'):
            sessions_with_chain_card += 1

        # CT-30x 발동 여부
        triggered = r.get('ambush_triggered', {})
        if triggered:
            sessions_with_ambush += 1
            for ct_id in triggered:
                ambush_trigger_counts[ct_id] += 1

        # CT-30x 조건 충족 여부 (eligible) — 세션 내 1회 이상 조건 충족 여부만 집계
        eligible = r.get('ambush_eligible', {})
        for ct_id in eligible:
            ambush_eligible_sessions[ct_id] += 1

        # null 드로우
        nd = r.get('null_draw_days', [])
        if nd:
            null_draw_sessions += 1
            null_draw_total += len(nd)
            for d in nd:
                null_draw_day_counts[d] += 1

        # 연속 중복
        rs = r.get('repeat_streaks', 0)
        if rs > 0:
            repeat_streak_sessions += 1
            repeat_streak_total += rs

        # 저자원 Act3 구간 분석 — Act3 구간(day 14~28) 중 c 또는 r <= 30인 day가 존재하는 세션
        low_resource_days = {h['day'] for h in r.get('stat_history', []) if h['act'] == 3 and (h['c'] <= 30 or h['r'] <= 30)}
        is_low_resource = bool(low_resource_days)
        if is_low_resource:
            low_resource_sessions += 1
            if r.get('mission_card_seen'):
                low_resource_mission_sessions += 1
            if triggered:
                low_resource_ambush_sessions += 1

    days.sort()
    gis.sort()

    agg = {
        'profile': profile,
        'runs': n,
        'endings': dict(ending_count),
        'survival': {
            'min': days[0], 'max': days[-1],
            'median': days[n // 2], 'mean': round(sum(days) / n, 1),
        },
        'gi': {
            'min': gis[0], 'max': gis[-1],
            'median': gis[n // 2], 'mean': round(sum(gis) / n, 1),
        },
        'trust': {},
        'log_count_mean': round(sum(log_counts) / n, 1),
        'missions': {mid: round(100 * cnt / n, 1) for mid, cnt in mission_counts.most_common()},
        'chains': {
            'started': {ch: round(100 * cnt / n, 1) for ch, cnt in chain_start_counts.most_common()},
            'completed': {ch: round(100 * cnt / n, 1) for ch, cnt in chain_complete_counts.most_common()},
        },
        'hidden_logs': {hl: round(100 * cnt / n, 1) for hl, cnt in hidden_counts.most_common()},
        'death_hotspots': {
            'by_day': {str(d): cnt for d, cnt in death_days.most_common(5)},
            'by_act': {str(a): cnt for a, cnt in death_acts.most_common()},
        },
        'never_seen_cards': len([c for c in CARDS if card_freq_total.get(c['id'], 0) == 0]),
        'total_cards': len(CARDS),
        # ── 신규 지표 ──
        'deck_health': {
            'sessions_with_mission_card': sessions_with_mission_card,
            'sessions_with_mission_card_pct': round(100 * sessions_with_mission_card / n, 1),
            'sessions_with_chain_card': sessions_with_chain_card,
            'sessions_with_chain_card_pct': round(100 * sessions_with_chain_card / n, 1),
            'sessions_with_ambush': sessions_with_ambush,
            'sessions_with_ambush_pct': round(100 * sessions_with_ambush / n, 1),
            'ambush_by_card': {
                ct_id: {
                    'triggered_sessions': ambush_trigger_counts.get(ct_id, 0),
                    'triggered_pct': round(100 * ambush_trigger_counts.get(ct_id, 0) / n, 1),
                    'eligible_sessions': ambush_eligible_sessions.get(ct_id, 0),
                    'eligible_pct': round(100 * ambush_eligible_sessions.get(ct_id, 0) / n, 1),
                    'trigger_rate_of_eligible': round(
                        100 * ambush_trigger_counts.get(ct_id, 0) /
                        ambush_eligible_sessions[ct_id], 1
                    ) if ambush_eligible_sessions.get(ct_id, 0) > 0 else 0,
                }
                for ct_id in ['CT-301', 'CT-302', 'CT-303', 'CT-304']
            },
            'null_draw_sessions': null_draw_sessions,
            'null_draw_sessions_pct': round(100 * null_draw_sessions / n, 1),
            'null_draw_total': null_draw_total,
            'null_draw_top_days': {str(d): cnt for d, cnt in null_draw_day_counts.most_common(5)},
            'repeat_streak_sessions': repeat_streak_sessions,
            'repeat_streak_sessions_pct': round(100 * repeat_streak_sessions / n, 1),
            'repeat_streak_total': repeat_streak_total,
        },
        'low_resource_act3': {
            'sessions': low_resource_sessions,
            'sessions_pct': round(100 * low_resource_sessions / n, 1),
            'mission_appeared_pct': round(
                100 * low_resource_mission_sessions / low_resource_sessions, 1
            ) if low_resource_sessions > 0 else 0,
            'ambush_appeared_pct': round(
                100 * low_resource_ambush_sessions / low_resource_sessions, 1
            ) if low_resource_sessions > 0 else 0,
        },
    }

    for ch in CHAR_KEYS:
        vs = sorted(trusts[ch])
        agg['trust'][ch] = {
            'median': vs[n // 2],
            'pct_65plus': round(100 * sum(1 for v in vs if v >= 65) / n, 1),
        }

    return agg

# ═══════════ 출력 ═══════════

def print_profile_report(agg):
    p = agg['profile']
    n = agg['runs']
    print(f'\n{"=" * 70}')
    print(f' 프로필: {p.upper()} ({n}회)')
    print(f'{"=" * 70}')

    print(f'\n▸ 엔딩 분포')
    endings_order = ['A', 'B', 'D', 'F', 'G', 'C_c', 'C_r', 'C_t', 'C_o', 'C_cs', 'C_cst', 'TIMEOUT']
    for e in endings_order:
        cnt = agg['endings'].get(e, 0)
        pct = 100 * cnt / n
        bar = '#' * int(pct / 2)
        print(f'  {e:10s}  {cnt:4d}  ({pct:5.1f}%)  {bar}')

    sv = agg['survival']
    gi = agg['gi']
    print(f'\n▸ 생존: min {sv["min"]} / median {sv["median"]} / max {sv["max"]} / 평균 {sv["mean"]}일')
    print(f'▸ GI: min {gi["min"]} / median {gi["median"]} / max {gi["max"]} / 평균 {gi["mean"]}')
    print(f'▸ 평균 로그 수집: {agg["log_count_mean"]}개')

    print(f'\n▸ 신뢰도 (이브닝)')
    for ch in CHAR_KEYS:
        t = agg['trust'][ch]
        print(f'  {ch:10s}  median {t["median"]:3d}  /  65+ 달성률 {t["pct_65plus"]}%')

    if agg['missions']:
        print(f'\n▸ 미션 트리거율 (상위)')
        for mid, pct in list(agg['missions'].items())[:8]:
            print(f'  {mid:16s}  {pct}%')

    if agg['chains']['started']:
        print(f'\n▸ 체인 시작/완주율 (상위)')
        for ch, pct_s in list(agg['chains']['started'].items())[:8]:
            pct_c = agg['chains']['completed'].get(ch, 0)
            print(f'  {ch:16s}  시작 {pct_s}%  /  완주 {pct_c}%')

    if agg['hidden_logs']:
        print(f'\n▸ 히든 로그 발견율')
        for hl, pct in agg['hidden_logs'].items():
            print(f'  {hl:30s}  {pct}%')

    dh = agg['death_hotspots']
    if dh['by_act']:
        print(f'\n▸ 즉사 핫스팟')
        for act, cnt in dh['by_act'].items():
            print(f'  Act {act}: {cnt}회 ({100 * cnt / n:.1f}%)')
        if dh['by_day']:
            top_days = list(dh['by_day'].items())[:3]
            print(f'  위험 Day: {", ".join(f"Day {d}({c}회)" for d, c in top_days)}')

    print(f'\n▸ 미출현 카드: {agg["never_seen_cards"]}/{agg["total_cards"]}')

    dh2 = agg['deck_health']
    print(f'\n▸ 덱 건강도 지표')
    print(f'  현장임무 카드 등장 세션:  {dh2["sessions_with_mission_card_pct"]:5.1f}%  ({dh2["sessions_with_mission_card"]}/{n})')
    print(f'  체인 트리거 세션(data-chains):  {dh2["sessions_with_chain_card_pct"]:5.1f}%  ({dh2["sessions_with_chain_card"]}/{n})')
    print(f'  긴급 돌발(CT-30x) 발동 세션: {dh2["sessions_with_ambush_pct"]:5.1f}%  ({dh2["sessions_with_ambush"]}/{n})')
    print(f'  null 드로우 세션:        {dh2["null_draw_sessions_pct"]:5.1f}%  (총 {dh2["null_draw_total"]}회)')
    if dh2['null_draw_top_days']:
        print(f'    최다 Day: {list(dh2["null_draw_top_days"].items())[:3]}')
    print(f'  연속 중복 발생 세션:     {dh2["repeat_streak_sessions_pct"]:5.1f}%  (총 {dh2["repeat_streak_total"]}회)')
    print(f'\n  CT-30x 긴급 돌발 상세:')
    for ct_id in ['CT-301', 'CT-302', 'CT-303', 'CT-304']:
        d = dh2['ambush_by_card'][ct_id]
        elig = d['eligible_pct']
        trig = d['triggered_pct']
        # 조건 충족 세션 수 = eligible + 발동된 세션(발동 전 eligible 체크 완료된 것)
        # trig > elig 가능: 조건 충족 직후 같은 드로우 사이클에서 발동
        # "활성 종 제외 → 발동 가능" 확인 지표로 사용
        if elig == 0 and trig == 0:
            status = '[조건 미충족 — 해당 spec 전 세션 활성]'
        elif elig == 0 and trig > 0:
            status = '[발동됨 — eligible 체크 전 발동]'
        else:
            status = '[정상]'
        print(f'    {ct_id}: 조건충족가능 {elig:5.1f}% 세션  실제발동 {trig:5.1f}% 세션  {status}')

    lr = agg['low_resource_act3']
    if lr['sessions'] > 0:
        print(f'\n▸ 저자원 Act3 구간 (c or r <= 30)')
        print(f'  해당 세션: {lr["sessions_pct"]}%')
        print(f'  해당 구간에서 미션 카드 등장: {lr["mission_appeared_pct"]}%')
        print(f'  해당 구간에서 긴급 돌발 발동: {lr["ambush_appeared_pct"]}%')

def print_comparison(all_aggs):
    print(f'\n{"=" * 70}')
    print(f' 프로필 비교표')
    print(f'{"=" * 70}')

    header = f'{"항목":20s}'
    for a in all_aggs:
        header += f'  {a["profile"]:>10s}'
    print(header)
    print('-' * len(header))

    # 서사 엔딩 %
    row = f'{"서사 엔딩 %":20s}'
    for a in all_aggs:
        narrative = sum(a['endings'].get(e, 0) for e in ('A', 'B', 'D', 'F', 'G', 'C_cs', 'C_cst'))
        row += f'  {100 * narrative / a["runs"]:>9.1f}%'
    print(row)

    # 즉사 %
    row = f'{"즉사 %":20s}'
    for a in all_aggs:
        instant = sum(a['endings'].get(e, 0) for e in ('C_c', 'C_r', 'C_t', 'C_o'))
        row += f'  {100 * instant / a["runs"]:>9.1f}%'
    print(row)

    # 평균 생존
    row = f'{"평균 생존일":20s}'
    for a in all_aggs:
        row += f'  {a["survival"]["mean"]:>9.1f}일'
    print(row)

    # 평균 GI
    row = f'{"평균 GI":20s}'
    for a in all_aggs:
        row += f'  {a["gi"]["mean"]:>10.1f}'
    print(row)

    # 평균 로그 수
    row = f'{"평균 로그 수집":20s}'
    for a in all_aggs:
        row += f'  {a["log_count_mean"]:>10.1f}'
    print(row)

    # 주요 엔딩
    for e in ('A', 'B', 'D', 'F'):
        row = f'{"엔딩 " + e:20s}'
        for a in all_aggs:
            cnt = a['endings'].get(e, 0)
            row += f'  {100 * cnt / a["runs"]:>9.1f}%'
        print(row)

    # 미출현 카드
    row = f'{"미출현 카드":20s}'
    for a in all_aggs:
        row += f'  {a["never_seen_cards"]:>10d}'
    print(row)

# ═══════════ 메인 ═══════════

if __name__ == '__main__':
    print(f'TIU-CARD v3 프로필 시뮬레이터')
    print(f'  카드 pool: {len(CARDS)}장')
    print(f'  미션 ID: {len(MISSION_IDS)}개 / 체인 ID: {len(CHAIN_IDS)}개')
    print(f'  히든 로그 그룹: {len(HIDDEN_LOG_GROUPS)}개')
    print()

    profiles_to_run = ALL_PROFILES if PROFILE == 'all' else [PROFILE]
    all_aggs = []
    all_results = {}

    for prof in profiles_to_run:
        print(f'  [{prof}] {N_RUNS}회 시뮬 중...', end='', flush=True)
        t0 = time.time()
        results = run_profile(prof, N_RUNS)
        dt = time.time() - t0
        print(f' {dt:.1f}초')
        agg = aggregate(results, prof)
        all_aggs.append(agg)
        all_results[prof] = agg

    for agg in all_aggs:
        print_profile_report(agg)

    if len(all_aggs) > 1:
        print_comparison(all_aggs)

    # JSON 리포트 저장
    ws_dir = os.path.join(ROOT, '_workspace', 'sim-results')
    os.makedirs(ws_dir, exist_ok=True)
    ts = time.strftime('%Y-%m-%d_%H%M%S')
    json_path = os.path.join(ws_dir, f'sim-v3-{ts}.json')
    json_data = {
        'timestamp': ts,
        'runs_per_profile': N_RUNS,
        'cards_in_pool': len(CARDS),
        'profiles': {a['profile']: a for a in all_aggs},
    }
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(json_data, f, ensure_ascii=False, indent=2)
    print(f'\nJSON 리포트 저장: {json_path}')
