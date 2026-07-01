# 엔딩 이미지 재사용 교체 — 신규 생성 이미지 리스트 (GPT API용)

> 지각 비교(RMSE)로 확인한 **엔딩 이미지를 게임플레이에서 재사용**하던 부분 교체.
> 코드 배선은 **이미 완료** — 아래 경로에 생성 파일만 저장하면 바로 적용됨(파일명 정확히 일치 필요).
> 스포일러(엔딩 장면 미리보기) 제거가 목적. 생성 전까지 해당 카드는 기본 배경으로 표시됨(문제 없음).

## 공통 스펙
- **스타일 접미사(모든 프롬프트 끝에 붙일 것)**:
  `Grayscale, high-contrast black and white, heavy film grain, desaturated cinematic still, gritty Korean post-outbreak surveillance-bunker aesthetic, cold lighting, shallow depth of field. No text, no captions, no logos, no watermark.`
- **해상도/비율**: 16:9 가로 (예: 1792×1024). 카드는 가로 밴드로 크롭됨.
- **포맷**: 지정 파일명 그대로 저장(확장자 포함). PNG로 생성 시 `.jpg`로 변환해 저장.
- **주의**: 정면으로 카메라를 응시하는 **앙상블/단체 포트레이트 금지**(엔딩처럼 보임). 장면·상황 중심으로.

---

## 1. C-005 — ORACLE 펌웨어 업데이트 (Act 2)
- **저장 경로(정확히)**: `assets/images/cards/core/card_core_oracle_firmware.jpg`
- **교체 전(문제)**: `card_core_oracle_loyalty.jpg` = **ending_A(순응 엔딩)** 재사용
- **카드 내용**: 임재혁이 ORACLE 단말기 펌웨어 업데이트를 제안
- **프롬프트**:
  `A lone Korean male technician in a dark tactical jacket and thin-frame glasses, seated at a cramped ORACLE command console deep underground, several monitors showing scrolling firmware code and diagnostic bars, server racks and cables behind him, one cold overhead light. Over-the-shoulder cinematic angle, focused and tense. [스타일 접미사]`

## 2. CR-004 — 발전기 전력 위기 (Act 3~4)
- **저장 경로(정확히)**: `assets/images/cards/story/card_story_power_crisis.jpg`
- **교체 전(문제)**: `card_story_commander_subdued.jpg` = **ending_E_c(지휘관 제압 배드엔딩)** 재사용 ← 스포일러
- **카드 내용**: 발전기 연료 위험, 4시간 내 보조 전력 전환 안 하면 전 시스템 셧다운
- **프롬프트**:
  `An emergency inside an underground command bunker during a power failure. A large diesel backup generator and breaker panel with blinking warning lights, most monitors gone dark, faint red emergency strip-lighting along the floor, a low fuel gauge glowing, a technician's silhouette reaching for a breaker switch. Claustrophobic, urgent countdown tension. [스타일 접미사]`

## 3. M-007 — 결정적 타격 미션 히어로 (구도 교체)
- **저장 경로(2개 모두 덮어쓰기 권장)**:
  - `assets/images/missions/mission_m007_decisive_strike_clean.webp` (미션 브리핑 hero)
  - `assets/images/missions/mission_m007_decisive_strike_hero.jpg` (미니게임 썸네일 `IMG.mission_m007`)
- **문제**: 현재 파일은 **"전원 집결 앙상블 포트레이트"** — 엔딩 파일 복제는 아니나(고유 아트) 피날레처럼 보여 전투 브리핑 톤과 불일치
- **프롬프트**:
  `A night tactical assault approach toward an abandoned industrial complex on the East Korean coast. A small armed strike team seen from behind advancing through fog toward distant floodlit ruins, rifles ready, breath visible in cold air, a drone silhouette overhead. Wide establishing shot conveying motion and threat — NOT a posed group portrait. [스타일 접미사]`
- (덮어쓰기 후 캐시 태그 `data-missions-3.js` / `images_p1.js` 범프 필요)

---

## 코드 배선 현황 (참고 — 이미 반영됨)
| 대상 | 조치 | 상태 |
|---|---|---|
| C-005 | `CARD_IMAGE_PATCHES` → `card_core_oracle_firmware` 로 변경 + IMG 키 등록 | ✅ 완료 (파일만 넣으면 적용) |
| CR-004 | `CARD_IMAGE_PATCHES` → `card_story_power_crisis` 로 변경 + IMG 키 등록 | ✅ 완료 |
| M-008 미니게임 | `IMG.mission_m008` 을 ending_B 복제(`_hero.jpg`) → `_clean.webp`(엔딩 아님)로 재지정 | ✅ 즉시 수정 완료 |

## 미노출(정리 선택) — 급하지 않음
- `card_story_secret_escape_group.jpg` ≈ **ending_D** / `card_story_base_occupation.jpg` ≈ **ending_H**
  → IMG 키만 등록돼 있고 **어떤 카드에도 매핑 안 됨(미노출)**. 신규 카드에서 쓸 때 전용 아트로 교체하거나, 안 쓰면 방치 무해.
- 구버전 `mission_mXXX_..._hero.jpg` 파일들은 브리핑에선 `_clean.webp`가 쓰여 대부분 잔존물. m008만 엔딩 중복이라 위에서 처리함.
