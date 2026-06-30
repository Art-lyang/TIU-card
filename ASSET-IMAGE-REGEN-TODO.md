# 이미지 재생성 TODO — 중복 재사용 아트 교체

> PC 아트 파이프라인 작업용. 같은 그림이 여러 화면에 중복 노출되는 문제를 해결하기 위해
> **전용 신규 아트가 필요한 이미지 목록**입니다.

## 배경

플레이 중 미션(M-008 관측중지) 히어로와 **시설탭** 이미지가 동일하다는 제보로 전수 점검(md5 해시 대조)한 결과,
**시설탭 이미지 8장이 전부 카드/미션/스토리 아트의 바이트 단위 복사본**임을 확인했습니다.
시설탭이 이미지 중심 대시보드로 재디자인되면서, 플레이어가 **같은 그림을 두 탭(미션·시설 등)에서** 보게 됩니다.

- 깨진(없는) 이미지 참조: **0건**
- 엔딩 이미지와 바이트 일치: **없음** (제보된 M-008 컷은 엔딩이 아니라 시설 FE-006과 동일)

## 공통 스펙 (전 항목 동일)

- **치수**: `1536 × 1024` (3:2 가로)
- **포맷**: JPG (RGB)
- **톤**: 흑백/저채도 그레이스케일, 시네마틱, 거친 감시 영상 질감, 필름 그레인, 높은 대비, 차갑고 어두운 조명
- **금지**: 화면 내 텍스트/로고 워터마크, 밝은 원색
- **파일명·경로 유지** → 코드 수정 불필요. 교체만 하면 됨.
- **두 곳 모두 교체**: `assets/images/facility/` **와** `demo/assets/images/facility/` (동일 파일명)
- 교체 후 캐시 무효화가 필요하면 `index.html` / `demo/index.html`의 해당 `?v=` 태그만 올리면 됨(선택).

### 공통 프롬프트 접두 (영문, 이미지 생성용)

```
monochrome desaturated grayscale, cinematic, gritty surveillance aesthetic,
ORACLE military containment base in winter Gangwon Korea, film grain,
high contrast, dim cold lighting, no people, no on-screen text, no logo, 3:2 landscape
```

---

## 🔴 우선순위 1 — 시설탭 8장 (전용 아트 필요)

각 항목: `대상 파일` ← *현재 복사 출처* / **그려야 할 내용** / 생성 프롬프트(접두 + 아래)

### FE-001 · 저온 냉동고 확장
- 대상: `assets/images/facility/facility_fe001_cryo_storage.jpg`
- 현재: `cards/core/card_core_lab_corridor.jpg` 복사본
- 내용: 지하 저온 시료 보관실. 성에 낀 스테인리스 시료 캐니스터/냉동 캐비닛 열, 냉기 안개, 결로, 생물 격리.
- 프롬프트: `underground cryogenic sample storage vault, rows of frosted steel sample canisters and cryo cabinets, cold mist, condensation, biohazard containment, empty`

### FE-002 · 야외 훈련장 및 시설 설치
- 대상: `assets/images/facility/facility_fe002_training_ground.jpg`
- 현재: `missions/mission_m003_unclassified_trace_hero.jpg` 복사본
- 내용: 봉쇄구역 외곽 야외 훈련장. 장애물 코스, 사격 레인 표적, 겨울 눈, 흐린 하늘.
- 프롬프트: `fenced outdoor military training ground at the edge of a containment zone, obstacle course, firing-range targets, snow, overcast, empty`

### FE-003 · 고급 센서 어레이
- 대상: `assets/images/facility/facility_fe003_sensor_array.jpg`
- 현재: `missions/mission_m006_spore_phantom_hero.jpg` 복사본
- 내용: 봉쇄선 외곽 감시 센서 마스트/레이더·안테나 어레이. 케이블, 접시 안테나, 눈 덮인 능선, 황혼.
- 프롬프트: `perimeter surveillance sensor masts and radar/antenna array along a containment fence line, cables, dish antennas, snowy ridge, dusk`

### FE-004 · 의무실 확장
- 대상: `assets/images/facility/facility_fe004_medical_bay.jpg`
- 현재: `cards/story/card_story_shelltalker_lab_containment.jpg` 복사본
- 내용: 군 야전 의무실/클리닉 내부. 병상, IV 스탠드, 모니터, 낡았지만 멸균된 분위기, 어둑함.
- 프롬프트: `military field medical bay interior, hospital beds, IV stands, vital monitors, sterile but worn, dim`

### FE-005 · 보급로 확장
- 대상: `assets/images/facility/facility_fe005_supply_route.jpg`
- 현재: `cards/core/card_core_road_collapse.jpg` 복사본
- 내용: 기지 보급 하역장/수송로. 정차된 군용 트럭, 쌓인 보급 상자·팔레트, 검문 게이트, 눈.
- 프롬프트: `supply loading dock and convoy route into a base, parked military truck, stacked supply crates and pallets, checkpoint gate, snow`

### FE-006 · CCTV 시스템 전면 교체  ← *제보된 M-008 중복 건*
- 대상: `assets/images/facility/facility_fe006_cctv_control.jpg`
- 현재: `missions/mission_m008_observation_stop_hero.jpg` 와 동일
- 내용: 감시 통제실. 외곽 피드를 띄운 CCTV 모니터 월, 어두운 운영 데스크와 키보드, 어둑함.
- 프롬프트: `surveillance control room, wall of CCTV monitors showing grainy perimeter feeds, dark operator desk with keyboards, dim, empty`

### FE-007 · 비상 대피 벙커
- 대상: `assets/images/facility/facility_fe007_emergency_bunker.jpg`
- 현재: `cards/core/card_core_secret_passage.jpg` 복사본
- 내용: 지하 비상 대피 벙커. 두꺼운 방폭문, 콘크리트 벽, 비상 보급/간이 침상, 비상등 한 줄기.
- 프롬프트: `underground emergency shelter bunker, heavy blast door, concrete walls, emergency supplies and cots, single emergency light`

### FE-008 · 순찰 경로 확장
- 대상: `assets/images/facility/facility_fe008_north_patrol.jpg`
- 현재: `cards/core/card_core_weber_arrival.jpg` 복사본
- 내용: 북측 봉쇄선 순찰로/감시탑. 야간 봉쇄 펜스 따라 늘어선 조명탑, 눈, 발자국.
- 프롬프트: `north perimeter patrol path with a watchtower and floodlights along a containment fence at night, snow, footprints, empty`

---

## 🟡 우선순위 2 — 선택(허용 범위)

미션 히어로가 같은 변이체의 도감 초상과 동일. 같은 개체라 의도면 그대로 둬도 무방하나,
**미션 히어로(조우 장면)와 도감 초상(개체 단독)을 구분**하면 더 좋음.

| 미션 히어로 | ≡ 도감 초상 | 권장 |
|---|---|---|
| `mission_m004_mannequin_encounter_hero_v2.jpg` | `spec_001_mannequin_hq_v2.jpg` | 미션 히어로를 '조우 현장' 컷으로 분리(선택) |
| `mission_m005_brood_drone_corridor_hero_v2.jpg` | `spec_003_brood_hq_v2.jpg` | 동일 |

---

## 작업 체크리스트

- [ ] FE-001 ~ FE-008 신규 아트 8장 생성 (1536×1024 JPG, 흑백 톤)
- [ ] `assets/images/facility/` 에 **같은 파일명**으로 덮어쓰기
- [ ] `demo/assets/images/facility/` 에도 동일 교체
- [ ] (선택) `index.html` / `demo/index.html` 캐시 태그 갱신
- [ ] (선택) 우선순위 2 — mission≡spec 분리

> 파일명·경로를 유지하면 **코드 변경 없이** 교체만으로 반영됩니다.
