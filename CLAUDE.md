# TIU-CARD Project Rules

> Reigns-style card command sim + text adventure + field mission minigames
> Korean SF surveillance fiction / ORACLE AI management system

## Core Constraints

- 진단 에이전트(`.claude/agents/`)는 코드를 수정하지 않는다. 리포트만 생성한다.
- 모든 데이터 파일 변경 후 `node tools/validator.js`를 실행한다.
- 배포 전 캐시 태그는 `node tools/stamp-cache.js`로 일괄 스탬프한다. 개별 `?v=` 수동 범프는 하지 않는다.
- 커밋 전 `integrity-verifier` 에이전트를 통과해야 한다.
- 개인 경로, API 키, 계정 정보를 파일에 기록하지 않는다.
- `_workspace/`는 git에 포함하지 않는다.

## Authoritative Sources

- 세계관/톤 규칙: `-setup/GDD/TIU-GAME-GDD-v13.md` (현행 델타, 그 위 델타는 v12, 상세 규칙은 v11)
- 캐논 스토리라인: `-setup/MD/storyline/TIU-CANON-STORYLINE.md`, `TIU-CANON-STORYLINE-2.md`
- 캐릭터 바이블: `-setup/MD/ABERRANT+CHARACTER+KARUNTAL+SOVARI/TIU-CHARACTER-BIBLE.md`
- 한국 설정: `-setup/MD/TIU-KOREA-COMPLETE-2026/` 디렉토리 전체
- 세계 설정: `-setup/MD/TIU-WORLD-COMPLETE-WITH-KOREA-2026/` 디렉토리 전체
- 아카이브 기존 엔트리: `data-archive.js`

## Lore Retrieval & Output Protocol

세계관/캐논 작업은 파일을 통독하지 말고 **라우터부터** 본다.

1. `-setup/LORE-ROUTER.md`를 먼저 읽어 주제 → 파일을 찾는다.
2. 그 파일을 `Grep`(키워드 / `^#` 헤딩)으로 좁힌 뒤, **매칭 섹션만** `Read`한다. 특별한 이유 없이 전체를 읽지 않는다.
3. 라우터에 없으면 마스터 vault(`../TIU/1. 세계관/`) 브리지로 grep하고, 찾으면 라우터에 한 줄 추가한다.
4. 캐논 충돌 시 우선순위: 런타임 코드 > `GDD/TIU-GAME-GDD-v13.md`(+v12+v11) > 캐논 1/2 > 캐릭터 바이블 > 마스터 vault.

출력은 **간결하게**: 결론 먼저, 근거는 요청 시. 카드/대사 작성 시 Act 색상·ORACLE 톤만 지키고 메타 설명은 최소화한다.

## Card ID Naming

카드 ID 계열은 `tools/validator.js`의 `CARD_ID_FORMAT_RULES`가 기준이다. 현재 실사용 계열은 아래 10종으로 관리한다.

- 기본/힌트: `C-XXX`, `C-FE###-A/B`, `C-HINT-*`
- 캐릭터/중립 Act 카드: `CA-XXX`, `CA-XXXB`, `CA-OBS-PROTO`, `CA-SEED-##`
- Act 4 루트/필러/위험: `CA3-*`, `CA4-*`
- Act 2~4 흐름/지원: `A2-*`, `A3-*`, `A4-*`
- 이벤트: `CE-XXX`
- 사이드/인물 체인: `CS-XXX`, `CS-XXXB`
- 위기/크라이시스: `CT-XXX`, `CT-B##`, `CT-C##`, `CT-O##`, `CT-T##`
- 체인 카드: `CH-...-N`
- 지역/조직 팩: `CB-*`, `CN-*`, `CR-*`, `DG-*`, `HH-*`, `KC-*`, `MD-*`, `MS-*`, `RH-*`
- 특수 팩: `FP-FE-*`, `GOV-ORC-*`, `LJC-PROM-*`, `OBS-HINT-*`, `ORC-LOYAL-SAFE-*`, `RH-SAFE-*`, `SUP-DM-*`

## Act Color Identity

- Act 1: blue (도입/안정)
- Act 2: green (확장/탐색)
- Act 3: yellow (위기/압력)
- Act 4: red (긴급/탈출)

카드 텍스트, 브리핑, 이브닝 챗 톤이 Act 색상 정체성과 일치해야 한다.

## Archive Entry Format

`data-archive.js`의 `ARCHIVE_ENTRIES` 배열에 추가. 필수 필드:
- `id`: `ARC-{CAT}-{NAME}` (예: `ARC-SPEC-011`, `ARC-CHAR-DOYUN`, `ARC-ORG-ORACLE`)
- `cat`: 카테고리 문자열 (이변체, 인물, 조직, 지역, 기술, 사건)
- `title`: 표시명
- `unlock`: `function(logs){ return logs.indexOf("LOG-XXX")>=0 }` 형식
- `content`: 본문 문자열. `\n`으로 줄바꿈. ORACLE 보고서 톤 유지.

## Mission i18n Rule (현장임무/긴급 추가 시)

신규 미션(`M-*`, `M-E*`, `MI-*`) 추가 시 영어 i18n은 **두 파일을 함께** 갱신한다:
- 서사(`title` / 노드 `text` / `choices`) → `lang-content-en-all.js`
- 인텔 패널(`report` 라벨·값) → `lang-fieldmission-dossier-en.js`

`report`는 EN 없으면 KO 원본을 그대로 노출한다(안전망 없음). dossier 누락 시 영어 모드 "ANALYSIS REPORT"에 한국어가 보이므로 두 파일을 항상 같이 본다. `intel`(grid/depth/env)은 원본을 영문으로 쓰면 별도 번역 불필요.

같은 원칙이 **신규 LOG에도** 적용된다: `ORACLE_LOGS`에 로그를 추가하면 카드 EN과 **같은 커밋에서** `oracleLogs` EN 오버레이(`lang-content-en-all.js` 또는 `lang-cards-flow-en.js`)를 짝으로 추가한다. 로그 뷰어·증거 근거 화면은 EN 없으면 KO를 그대로 노출한다(폴백이 조용해서 QA에서 놓치기 쉬움).

## CCTV Sting / 돌발 기습 (CT-30x → M-E0x)

- 기습 게이트는 `app-init.js`의 `EMERGENCY_AMBUSHES`(spec/mission/done 레지스트리) + `ambushPending()`/`anyAmbushPending()` 공용 헬퍼가 단일 소스. 트리거 카드 `req`와 미니맵 사전경보(`app.js` `computeMapEvent`)가 이걸 공유하므로, 조건 변경 시 헬퍼 한 곳만 수정한다.
- CCTV 스팅 영상은 **H.264(avc1) + faststart** 만 사용한다. `mp4v`(MPEG-4 Part 2)·HEVC·ProRes는 브라우저 `<video>`가 못 돌린다. 영상 없으면 `CCTV_CLIPS`에서 `img`(미션 hero)로 둔다.

## Tech Stack

- Runtime: static HTML + React 18 (vendor/ 로컬 번들) + vanilla JS/CSS. 폰트도 fonts/ 셀프호스트 — 외부 CDN 의존 없음
- Storage: localStorage
- Build: none (index.html이 단일 진입점)
- Deploy: GitHub Pages
- QA: `tools/validator.js`, `.claude/agents/`, `.claude/_audit/`

## Agent Routing

작업 유형별 어떤 에이전트를 사용할지는 `harness/ORCHESTRATOR.md` 참조.
