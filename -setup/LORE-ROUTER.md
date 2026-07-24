---
title: TIU-CARD 로어 라우터 (에이전트 빠른 색인)
type: router
updated: 2026-05-31
---

# TIU-CARD 로어 라우터

> **이 파일이 "제2의 뇌"의 색인이다. 세계관/캐논 작업 시 *제일 먼저* 이 파일만 읽고, 여기서 정확한 파일·섹션으로 점프한다. 파일 통독 금지.**
> 사람용 옵시디언 MOC는 [`MD/_HOME.md`](MD/_HOME.md). 이 라우터는 에이전트 검색용(실경로 + grep 키워드 + 섹션 앵커).

## 검색 프로토콜 (4단계)

1. **여기서 주제 → 파일** 찾는다 (아래 B/C 표).
2. 그 파일에 **`Grep`** 으로 키워드/섹션 헤딩(`^#`) 검색 → 위치 특정.
3. 매칭 **섹션만** `Read`(offset/limit). 특별한 이유 없으면 전체 읽지 않는다.
4. 라우터에 없으면 → **D. 마스터 vault 브리지**에서 grep → 찾으면 이 라우터에 한 줄 추가(§E).

---

## A. 권위 앵커 (항상 현재 기준)

| 용도 | 경로 | 비고 |
|---|---|---|
| 톤/규칙(현재 델타) | [`GDD/TIU-GAME-GDD-v12.md`](GDD/TIU-GAME-GDD-v12.md) | BUILD 452 델타. 짧음, 규칙+변경사 |
| 직전 델타(상세 규칙 본문) | [`GDD/TIU-GAME-GDD-v11.md`](GDD/TIU-GAME-GDD-v11.md) | v12가 참조하는 상세 규칙 |
| 전체 시스템 스냅샷 | [`GDD/TIU-GAME-GDD-v10.md`](GDD/TIU-GAME-GDD-v10.md) | 큰 문서 — 섹션만 grep |
| 캐논 줄거리 1부 | [`MD/storyline/TIU-CANON-STORYLINE.md`](MD/storyline/TIU-CANON-STORYLINE.md) | 배경·인물·4Act·진실·엔딩·용어 |
| 캐논 줄거리 2부 | [`MD/storyline/TIU-CANON-STORYLINE-2.md`](MD/storyline/TIU-CANON-STORYLINE-2.md) | 규칙·엔딩 8종·이변체·용어·지역 |
| 세계관 요약 | [`MD/storyline/TIU-WORLDBUILDING-SUMMARY.md`](MD/storyline/TIU-WORLDBUILDING-SUMMARY.md) | 한 파일 개관(긴 편) |
| 캐릭터 바이블 | [`MD/ABERRANT+CHARACTER+KARUNTAL+SOVARI/TIU-CHARACTER-BIBLE.md`](MD/ABERRANT+CHARACTER+KARUNTAL+SOVARI/TIU-CHARACTER-BIBLE.md) | 인물·조직·세력관계 |
| 한국 설정(권위) | `MD/TIU-KOREA-COMPLETE-2026/` | 한국은 이 폴더가 기준 |
| 세계 설정 | `MD/TIU-WORLD-COMPLETE-WITH-KOREA-2026/` | 국가별. 한국 파일은 미러본 |
| 아카이브 코드 | `data-archive.js`, `data-archive-expansion.js` | 엔트리 추가 위치 |
| 데이터 검증 | `tools/validator.js` | 데이터 변경 후 필수 실행 |

---

## B. 주제 → 파일 빠른 조회 (게임 `-setup/`)

| 주제/키워드 | 파일 |
|---|---|
| 톤·넘버링·리소스·메뉴·메타진행 규칙 | `GDD/TIU-GAME-GDD-v12.md` + 상세는 `v11.md` (§C 섹션맵 참조) |
| 4-Act 흐름, ORACLE의 진실, 엔딩 8종, 용어 | `MD/storyline/TIU-CANON-STORYLINE.md` / `-2.md` |
| 프로메테우스·관측자·쉐드오더·TS-Ω·빌런·민간 | `MD/ABERRANT+CHARACTER+KARUNTAL+SOVARI/TIU-CHARACTER-BIBLE.md` |
| 이변체 등급(H/M/S/X)·SPEC 목록 | `…/TIU-ABERRANT-{INDEX,H,M,S,X}.md`, 캐논2 §7 |
| 카룬탈 / 유물 | `…/TIU-KARUNTAL.md`, `…/TIU-KARUNTAL-ARTIFACTS.md` |
| 소바리(인물/국가/필드로그) | `…/TIU-SOVARI-{CHARACTERS,NATION}.md`, `MD/TIU-SOVARI-PACK/` |
| 한국: 대가/정부/군/경제/사회/북한/방벽/변종/인물 | `MD/TIU-KOREA-COMPLETE-2026/TIU-KOREA-{DAEGA,DAEGA-HISTORY,GOV,MILITARY,ECONOMY,SOCIETY,NORTH,WALL,VARIANT,CHARACTERS}.md` |
| 한국 아카이브 설계/엔트리 | `MD/TIU-KOREA-COMPLETE-2026/TIU-ARCHIVE-{DESIGN,ENTRIES}.md` |
| 미국(ORACLE보고/군/사회) | `MD/TIU-WORLD-COMPLETE-WITH-KOREA-2026/TIU-USA-{ORACLE-REPORT,MILITARY,SOCIETY}.md` |
| 중국 / 일본 / 러시아 / EU / 독일 | `…/TIU-{CHINA*,JAPAN*,RUSSIA,EUROPEAN-UNION,GERMANY-AHNENERBE-SUCCESSOR}.md` |
| 메리디안 그룹 | `…/TIU-MERIDIAN-GROUP.md` |
| Act 구조 / Act3 미션 / 시설 통합 | `MD/act-structure/{ACT-STRUCTURE-DESIGN,ACT3-MISSIONS-DESIGN,FACILITY-INTEGRATION-DESIGN}.md` |
| 카드 디자인 가이드 / Act별 배치 / 아프터매스 | `MD/card-design/{TIU-CARD-DESIGN-GUIDE,ACT-CARD-ASSIGNMENT,AFTERMATH-CARDS-DESIGN}.md` |
| RF-Ω 회수 영상 시리즈 (필라델피아 SPEC 푸티지) | `MD/card-design/RECOVERED-FOOTAGE-DESIGN.md` |
| L3 결사/종족/기술/언어 | `MD/TIU-WORLDBUILDING/TIU-WORLDBUILDING/TIU-L3-*.md`, `MD/TIU-L3-LANGUAGE{,-NOTES}.md` |
| 인간 진영 / 회색 경제 / 실패 아카이브 | `…/TIU-HUMAN-FACTIONS.md`, `MD/TIU-GRAY-ECONOMY.md`, `MD/TIU-FAILURE-ARCHIVE.md` |
| 변경 기록 / 게임성 QA | `MD/TIU-ALPHA-CHANGELOG{,-2026-05-08}.md`, `QA-Review/GAMEPLAY-REVIEW.md` |

---

## C. 핫 문서 섹션 앵커 (섹션만 읽기용)

**GDD v12** (`GDD/TIU-GAME-GDD-v12.md`) — BUILD 452 현행 델타
`1` Current Scope · `2` Changes Since v11 (239→452) · `3` Rule Amendments · `4` QA Baseline · `5` Watch Items

**GDD v11** (`GDD/TIU-GAME-GDD-v11.md`) — 상세 규칙 본문(여전히 유효, v12가 일부 수정)
`1` Current Scope · `2` Session Deck-Pack · `3` Public Lore Visibility · `4` Numeric Text Rule · `5` Resource Pressure/Character-State · `6` Mobile Menu/Modal · `7` Meta-Progression · `8` QA Baseline · `9` Watch Items · `10` External Packaging · `11` Standalone Demo

**캐논 1부** (`MD/storyline/TIU-CANON-STORYLINE.md`)
`1` 세계관 배경 · `2` 주요 인물 · `3` 4-Act 흐름 · `4` ORACLE의 진실 · `5` 엔딩 분기(8종) · `6` 용어집

**캐논 2부** (`MD/storyline/TIU-CANON-STORYLINE-2.md`)
`5` 핵심 설정/규칙 · `6` 엔딩 분기(8종) · `7` 이변체 SPEC · `8` 용어집 · `9` 주요 지역

**세계관 요약** (`MD/storyline/TIU-WORLDBUILDING-SUMMARY.md`)
`0` 배경 · `1` ORACLE 시스템 · `2` TIU 한국지부(KR-INIT-001) · `3` 이변체 SPEC · `4` 시설/기지 · `5` 프로메테우스 · `6` Act 흐름 · `7` 엔딩 요약 · `8` 한국 배경 · `9` 세계 지역 · `10` 용어

**캐릭터 바이블** (`MD/ABERRANT+CHARACTER+KARUNTAL+SOVARI/TIU-CHARACTER-BIBLE.md`)
`1` 프로메테우스 · `2` 관측자/OBSERVER · `3` 쉐드 오더 · `4` TS-Ω · `5` 정부/군사 · `6` 인간 빌런 · `7` 민간인 · `8` 이미지 현황 · `9` 세력 관계 · `10` 확정 로어 규칙

---

## D. 마스터 vault 브리지 (심층 · 온디맨드)

게임 `-setup/`에 없는 깊은 설정은 마스터 vault에 있다. **평소엔 안 읽고, 특정 심층 주제가 필요할 때만** 아래 폴더로 grep.

- **위치(상대):** 이 저장소 루트의 형제 폴더 `../TIU/1. 세계관/`
- **세션 접근:** 절대경로 = (이 저장소 루트의 **부모 디렉토리**) + `/TIU/1. 세계관/…`. Grep/Read 시 절대경로로 변환.

| 심층 주제 | 마스터 폴더 |
|---|---|
| 현무교(교리/역사/구조/지역/에베라) | `5. WORLD/4. 종교+우주론/1. HYEONMUKYO/` |
| L3 심층(엑수비아 평의회/거북분파/쉐드오더) | `5. WORLD/3. 지하 L3/1. SHED ORDER+L3/` |
| 국가 원본·시민생활, 0과(은밀 인프라/작전) | `5. WORLD/1. 지표 L1/` (+ `2. SECTION ZERO+0과/`) |
| 단편 소설(이든콜·함경북도·필라델피아 탈출) | `7. NOVEL/` |
| 사건/인물스텁/과학노트, INC-003·INC-009 | `8. CANON-STAGING/` |
| 지도(플레이어블존·방벽·필라델피아) | `9. MAPS/` |
| 관측자 메커닉·PARALLAX·아카이브 리크 | `10. OBSERVER+ARCHIVE/` |
| 캐논 운영 리포트(충돌체크/결정, 2026-04) | `11. REPORTS/` |
| 음모론 레퍼런스·월드빌딩 바이블 V2 | `13. REFERENCES/` |
| 서브 역사(백두 72H·2000s·2020s) | `14. SUB-HISTORY/` |
| AI GM 안전 가드레일 | `15. AI-GAME-MASTER/3. TIU-ADAPTED/` |
| 캐논 레이어(BLACK-OBSERVER 색인 등) | `16. CANON-LAYERS/` |
| 컨셉 이미지(webp) | `17. IMAGE/` |

> 캐논 충돌 시 우선순위: **런타임 코드 > `GDD/TIU-GAME-GDD-v12.md`(+v11) > 캐논 스토리라인 1/2 > 캐릭터 바이블 > 마스터 vault**.

---

## E. 라우터 유지 규칙

- 마스터 vault에서 새로 찾아 쓴 파일은 B 또는 D 표에 **한 줄** 추가한다.
- `-setup/`에 세계관 파일이 추가/이동되면 해당 행을 갱신한다.
- 이 라우터는 **색인만** 담는다. 본문 설정을 여기 복붙하지 않는다(중복 방지).
