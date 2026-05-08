# TIU-CARD Project Rules

> Reigns-style card command sim + text adventure + field mission minigames
> Korean SF surveillance fiction / ORACLE AI management system

## Core Constraints

- 진단 에이전트(`.claude/agents/`)는 코드를 수정하지 않는다. 리포트만 생성한다.
- 모든 데이터 파일 변경 후 `node tools/validator.js`를 실행한다.
- 커밋 전 `integrity-verifier` 에이전트를 통과해야 한다.
- 개인 경로, API 키, 계정 정보를 파일에 기록하지 않는다.
- `_workspace/`는 git에 포함하지 않는다.

## Authoritative Sources

- 세계관/톤 규칙: `-setup/GDD/TIU-GAME-GDD-v11.md`
- 캐논 스토리라인: `-setup/MD/storyline/TIU-CANON-STORYLINE.md`, `TIU-CANON-STORYLINE-2.md`
- 캐릭터 바이블: `-setup/MD/ABERRANT+CHARACTER+KARUNTAL+SOVARI/TIU-CHARACTER-BIBLE.md`
- 한국 설정: `-setup/MD/TIU-KOREA-COMPLETE-2026/` 디렉토리 전체
- 세계 설정: `-setup/MD/TIU-WORLD-COMPLETE-WITH-KOREA-2026/` 디렉토리 전체
- 아카이브 기존 엔트리: `data-archive.js`

## Card ID Naming

- 기본 카드: `C-XXX`
- 체인: `CH-XXX-N`
- 사이드: `CS-XXX`
- 위기: `CT-XXX`
- Act4: `CA-XXX`
- 이벤트: `CE-XXX`

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

## Tech Stack

- Runtime: static HTML + React 18 CDN + vanilla JS/CSS
- Storage: localStorage
- Build: none (index.html이 단일 진입점)
- Deploy: GitHub Pages
- QA: `tools/validator.js`, `.claude/agents/`, `.claude/_audit/`

## Agent Routing

작업 유형별 어떤 에이전트를 사용할지는 `harness/ORCHESTRATOR.md` 참조.
