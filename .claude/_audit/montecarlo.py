# -*- coding: utf-8 -*-
"""
TIU_CARD Monte Carlo balance probe.

This is intentionally approximate: it samples the current card fx distribution
and reward pool to estimate route pressure, failure causes, and the impact of
one-time ORACLE safeguard logic. It is not a replacement for browser playtests.
"""

import glob
import os
import random
import re
import statistics
import sys
from collections import Counter, defaultdict

sys.stdout.reconfigure(encoding="utf-8")

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
STAT_KEYS = ("c", "r", "t", "o")


def clamp(v, lo=0, hi=100):
    return max(lo, min(hi, v))


def read_text(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()


def extract_rewards():
    core = read_text(os.path.join(ROOT, "data-core.js"))
    block = re.search(r"REWARDS\s*=\s*\[(.*?)\];\s*\nvar\s+DIALOGUES", core, re.DOTALL)
    rewards = []
    if not block:
        return rewards
    fx_pat = re.compile(
        r"fx:\s*\{\s*c:\s*(-?\d+)[^}]*r:\s*(-?\d+)[^}]*t:\s*(-?\d+)[^}]*o:\s*(-?\d+)\s*\}"
    )
    for m in fx_pat.finditer(block.group(1)):
        reward = {
            "c": int(m.group(1)) * 5,
            "r": int(m.group(2)) * 5,
            "t": int(m.group(3)) * 5,
            "o": int(m.group(4)) * 5,
        }
        # Runtime rewards do not carry GI directly. This heuristic mirrors the
        # route pressure: ORACLE evaluation tends to increase GI, human trust
        # tends to decrease it.
        reward["g"] = reward["o"] * 0.3 - reward["t"] * 0.2
        rewards.append(reward)
    return rewards


def extract_card_pairs():
    card_files = sorted(set(glob.glob(os.path.join(ROOT, "data-cards-*.js"))))
    pair_pat = re.compile(
        r"left\s*:\s*\{[^{}]*?fx\s*:\s*\{\s*c:\s*(-?\d+)[^}]*r:\s*(-?\d+)[^}]*t:\s*(-?\d+)[^}]*o:\s*(-?\d+)\s*\}[^{}]*?\}[^{}]*?"
        r"right\s*:\s*\{[^{}]*?fx\s*:\s*\{\s*c:\s*(-?\d+)[^}]*r:\s*(-?\d+)[^}]*t:\s*(-?\d+)[^}]*o:\s*(-?\d+)\s*\}",
        re.DOTALL,
    )
    pairs = []
    for path in card_files:
        content = read_text(path)
        for m in pair_pat.finditer(content):
            left = {
                "c": int(m.group(1)) * 5,
                "r": int(m.group(2)) * 5,
                "t": int(m.group(3)) * 5,
                "o": int(m.group(4)) * 5,
            }
            right = {
                "c": int(m.group(5)) * 5,
                "r": int(m.group(6)) * 5,
                "t": int(m.group(7)) * 5,
                "o": int(m.group(8)) * 5,
            }
            pairs.append((left, right))
    return pairs


REWARDS = extract_rewards()
CARD_PAIRS = extract_card_pairs()
CARD_FXS = [fx for pair in CARD_PAIRS for fx in pair]


def act_for_day(day):
    if day >= 29:
        return 4
    if day >= 14:
        return 3
    if day >= 5:
        return 2
    return 1


def cards_per_day(act):
    return 4 if act == 1 else 5 if act == 2 else 6 if act == 3 else 7


def go_reason(stats):
    if stats["c"] <= 0:
        return "containment_low"
    if stats["c"] >= 100:
        return "containment_high"
    if stats["r"] <= 0:
        return "resource_low"
    if stats["t"] <= 0:
        return "trust_low"
    if stats["o"] <= 0:
        return "oracle_eval_low"
    return ""


def apply_runtime_balance_model(policy, before, after, before_gi, after_gi, day, act):
    """Approximate balance-tuning.js for Monte Carlo trends."""
    changed = False

    def soften_crossing(key, floor, step):
        nonlocal changed
        if before[key] > floor and after[key] <= floor:
            after[key] = clamp(min(floor + step, after[key] + step))
            changed = True

    def lift_below(key, target):
        nonlocal changed
        if after[key] < target:
            after[key] = clamp(target)
            changed = True

    def cap_above(key, target):
        nonlocal changed
        if after[key] > target:
            after[key] = clamp(target)
            changed = True

    resistance = policy == "P4"
    loyalty = policy == "P3" or after_gi > before_gi

    if resistance and act <= 3 and day <= 18:
        lift_below("o", 15)
        lift_below("r", 15)
        lift_below("t", 15)
    elif resistance and act <= 3 and day <= 24:
        lift_below("o", 5)
        lift_below("r", 5)

    if loyalty and act <= 3 and day <= 24 and after_gi >= 8:
        if after["r"] < before["r"]:
            lift_below("r", 30)
        if after["t"] < before["t"]:
            lift_below("t", 30)
        if after["c"] < before["c"]:
            lift_below("c", 30)
        if after["c"] > before["c"] and after["c"] >= 95:
            cap_above("c", 92)

    if loyalty and act >= 4 and after_gi >= 40:
        if after["r"] < before["r"]:
            lift_below("r", 25)
        if after["t"] < before["t"]:
            lift_below("t", 25)
        if after["c"] < before["c"]:
            lift_below("c", 25)

    return changed


def play_once(policy):
    stats = {"c": 50, "r": 65, "t": 50, "o": 40}
    trust = {"haeun": 50, "doyun": 50, "sejin": 50, "jaehyuk": 50}
    logs_count = 1
    gi = 0.0
    safeguard_used = False
    safeguard_day = None
    tuning_hits = 0

    def maybe_oracle_safeguard(day):
        nonlocal safeguard_used, safeguard_day, gi
        if safeguard_used or gi < 10 or stats["o"] <= 0:
            return False
        if not any(stats[k] <= 20 for k in ("c", "r", "t")):
            return False
        for k in ("c", "r", "t"):
            if stats[k] <= 20:
                stats[k] = 40
        gi += 3
        safeguard_used = True
        safeguard_day = day
        return True

    def finish(ending, day, act):
        reason = go_reason(stats) if ending.startswith("GO") else ""
        return {
            "ending": ending,
            "day": day,
            "act": act,
            "stats": dict(stats),
            "gi": round(gi, 1),
            "go_reason": reason,
            "safeguard": safeguard_used,
            "safeguard_day": safeguard_day,
            "tuning_hits": tuning_hits,
        }

    for day in range(1, 37):
        act = act_for_day(day)
        if day > 35:
            high_trust = sum(1 for v in trust.values() if v >= 65)
            if gi >= 40:
                ending = "A_timeup"
            elif gi <= -20 and high_trust >= 1:
                ending = "D_timeup"
            elif gi <= -15:
                ending = "B_timeup"
            else:
                ending = "G_timeup"
            return finish(ending, day, act)

        for _ in range(cards_per_day(act)):
            if not CARD_PAIRS:
                break
            left, right = random.choice(CARD_PAIRS)

            def risk(fx):
                ns = {k: clamp(stats[k] + fx[k]) for k in STAT_KEYS}
                score = 0
                for k in STAT_KEYS:
                    if ns[k] <= 0:
                        score += 10000
                    elif ns[k] <= 15:
                        score += (15 - ns[k]) * 5
                if ns["c"] >= 100:
                    score += 5000
                elif ns["c"] >= 85:
                    score += (ns["c"] - 85) * 3
                if policy == "P1":
                    score -= sum(fx[k] for k in STAT_KEYS)
                elif policy == "P2":
                    weakest = min(STAT_KEYS, key=lambda k: stats[k])
                    score -= fx[weakest] * 3
                elif policy == "P3":
                    score -= fx["o"] * 1.5 - fx["t"] * 0.8
                elif policy == "P4":
                    score -= fx["t"] * 1.5 - fx["o"] * 0.8
                return score

            fx = left if risk(left) <= risk(right) else right
            before = dict(stats)
            before_gi = gi
            for k in STAT_KEYS:
                stats[k] = clamp(stats[k] + fx[k])
            gi += fx["o"] * 0.15 - fx["t"] * 0.1
            if apply_runtime_balance_model(policy, before, stats, before_gi, gi, day, act):
                tuning_hits += 1
            maybe_oracle_safeguard(day)

            reason = go_reason(stats)
            if reason:
                return finish("GO_mid", day, act)

        sample_size = 6
        if any(stats[k] < 40 for k in STAT_KEYS):
            sample_size = 5
        if any(stats[k] < 30 for k in STAT_KEYS):
            sample_size = 4
        if any(stats[k] < 20 for k in STAT_KEYS):
            sample_size = 3
        if any(stats[k] < 10 for k in STAT_KEYS):
            sample_size = 2
        pool = random.sample(REWARDS, min(sample_size, len(REWARDS))) if REWARDS else []
        if pool:
            if policy == "P1":
                reward = max(pool, key=lambda r: r["c"] + r["r"] + r["t"] + r["o"])
            elif policy == "P2":
                weakest = min(STAT_KEYS, key=lambda k: stats[k])
                reward = max(pool, key=lambda r: r[weakest])
            elif policy == "P3":
                reward = max(pool, key=lambda r: r["g"])
            else:
                reward = min(pool, key=lambda r: r["g"])
            for k in STAT_KEYS:
                stats[k] = clamp(stats[k] + reward[k])
            gi += reward["g"]

        if act == 3:
            stats["c"] = max(5, stats["c"] - 1)
            stats["r"] = max(5, stats["r"] - 1)
        if act == 4:
            stats["c"] = max(5, stats["c"] - 2)
            loyal_relief = gi >= 40
            stats["r"] = max(5, stats["r"] - (1 if loyal_relief else 2))
            stats["t"] = max(5, stats["t"] - (0 if loyal_relief else 1))

        maybe_oracle_safeguard(day)
        reason = go_reason(stats)
        if reason:
            return finish("GO_rew", day, act)

        logs_count = min(15, 1 + day // 3)
        for key in trust:
            if policy == "P3":
                drift = 1
            elif policy == "P4":
                drift = 1 if key in ("jaehyuk", "haeun") else 0
            elif policy == "P2":
                drift = 1 if key in ("haeun", "sejin") else 0
            else:
                drift = 0
            trust[key] = clamp(trust[key] + drift + random.randint(-1, 2))

        if act >= 3:
            high_trust = sum(1 for v in trust.values() if v >= 65)
            mid_trust = sum(1 for v in trust.values() if v >= 60)
            any55 = sum(1 for v in trust.values() if v >= 55)
            any70 = sum(1 for v in trust.values() if v >= 70)
            if act >= 4 and day >= 30 and gi >= 55 and stats["c"] >= 70 and stats["o"] >= 60:
                return finish("A", day, act)
            if gi <= -30 and mid_trust >= 3 and logs_count >= 8 and day >= 28:
                return finish("D", day, act)
            if gi <= -35 and stats["r"] >= 35 and any70 >= 1 and logs_count >= 10 and day >= 30:
                return finish("D", day, act)
            if gi <= -15 and high_trust >= 2 and logs_count >= 6 and day >= 25:
                return finish("B", day, act)
            if gi <= -25 and high_trust <= 1 and logs_count >= 10 and day >= 28:
                return finish("B", day, act)
            if 0 <= gi <= 20 and any55 >= 1 and logs_count >= 7 and day >= 28:
                return finish("G", day, act)
            if -5 <= gi <= 25 and any55 >= 2 and logs_count >= 9 and day >= 31:
                return finish("G", day, act)

    return finish("survive", 35, 4)


def run(policy, n):
    return [play_once(policy) for _ in range(n)]


def pct(value, total):
    return value / total * 100 if total else 0


def print_policy_report(policy, runs):
    labels = {
        "P1": "탐욕(합산 최대)",
        "P2": "약점보강(최저 스탯)",
        "P3": "충성(ORACLE 친화)",
        "P4": "저항(인간 편)",
    }
    n = len(runs)
    endings = Counter(r["ending"] for r in runs)
    go_runs = [r for r in runs if r["ending"].startswith("GO")]
    go_rate = pct(len(go_runs), n)
    days = [r["day"] for r in runs]
    gis = [r["gi"] for r in runs]
    reasons = Counter(r["go_reason"] for r in go_runs if r["go_reason"])
    acts = Counter(r["act"] for r in go_runs)
    safeguard_runs = [r for r in runs if r["safeguard"]]
    tuning_rate = pct(sum(1 for r in runs if r["tuning_hits"] > 0), n)

    print(f"\n[{policy}] {labels[policy]}")
    print(f"  평균 생존일: {statistics.mean(days):.1f}일  (중앙값 {statistics.median(days):.0f})")
    print(f"  평균 GI:    {statistics.mean(gis):+.1f}  (min {min(gis):.0f}, max {max(gis):.0f})")
    print(f"  게임오버율: {go_rate:.1f}%")
    print(f"  밸런스 완충 체감률: {tuning_rate:.1f}%")
    print(f"  ORACLE 구제 발동률: {pct(len(safeguard_runs), n):.1f}%")
    if safeguard_runs:
        survival_after = [r["day"] - r["safeguard_day"] for r in safeguard_runs if r["safeguard_day"] is not None]
        if survival_after:
            print(f"  구제 후 추가 생존: 평균 {statistics.mean(survival_after):.1f}일")
    print("  엔딩 분포:")
    for key in sorted(endings, key=lambda x: -endings[x]):
        print(f"     {key:<14} {endings[key]:>5}  ({pct(endings[key], n):.1f}%)")
    if reasons:
        print("  주요 게임오버 원인:")
        for key, count in reasons.most_common(4):
            print(f"     {key:<16} {count:>5}  ({pct(count, len(go_runs)):.1f}% of GO)")
    if acts:
        print("  Act별 게임오버:")
        for key in sorted(acts):
            print(f"     Act {key}: {acts[key]:>5}  ({pct(acts[key], len(go_runs)):.1f}% of GO)")


def main():
    n = int(os.environ.get("TIU_MC_N", "3000"))
    random.seed(42)
    results = {policy: run(policy, n) for policy in ("P1", "P2", "P3", "P4")}

    print("=" * 72)
    print(f"TIU_CARD 몬테카를로 시뮬레이션  (N={n} per policy)")
    print(f"카드 fx 샘플: {len(CARD_FXS)}개  |  REWARDS: {len(REWARDS)}개")
    print("모델: current cpd/act/decay + ORACLE safeguard + route softeners + overcontainment soft cap")
    print("=" * 72)

    for policy in ("P1", "P2", "P3", "P4"):
        print_policy_report(policy, results[policy])

    p1_success = [r for r in results["P1"] if not r["ending"].startswith("GO")]
    loyalty_a = [r for r in results["P3"] if r["ending"] == "A"]
    rebel_bd = [r for r in results["P4"] if r["ending"] in ("B", "D", "B_timeup", "D_timeup")]
    early_go = [r for r in results["P1"] if r["ending"] == "GO_mid" and r["day"] < 15]

    print("\n" + "=" * 72)
    print("밸런스 판정")
    print("=" * 72)
    print(f"  탐욕 정책 성공 완주율: {pct(len(p1_success), n):.1f}%  (엔딩 다양성: {len(set(r['ending'] for r in p1_success))}가지)")
    print(f"  충성 정책 → 엔딩 A 도달률: {pct(len(loyalty_a), n):.1f}%")
    print(f"  저항 정책 → 엔딩 B/D/타임업 도달률: {pct(len(rebel_bd), n):.1f}%")
    print(f"  즉사 급사율 (P1, 절반 이전): {pct(len(early_go), n):.1f}%")

    notes = []
    if pct(len(rebel_bd), n) < 8:
        notes.append("저항 루트는 아직 보상/완충이 부족합니다. Act2~3 증거·신뢰 보상을 더 늘리는 것이 좋습니다.")
    if pct(len(loyalty_a), n) < 12:
        notes.append("충성 루트는 엔딩 A 도달률이 낮습니다. 평가 외 자원 보상 또는 Act4 진입 조건 완화가 필요합니다.")
    p3_safeguard = pct(sum(1 for r in results["P3"] if r["safeguard"]), n)
    if p3_safeguard > 70:
        notes.append("충성 루트가 여전히 ORACLE 구제카드에 많이 의존합니다. 일반 충성 카드의 자원 손실을 조금 더 줄이세요.")
    if not notes:
        notes.append("현재 수치는 베타용으로 큰 붕괴 없이 읽힙니다. 다음 단계는 실제 플레이 로그 기반 미세 조정입니다.")
    print("\n권고:")
    for note in notes:
        print(f"  - {note}")


if __name__ == "__main__":
    main()
