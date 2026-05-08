# Codex 프로젝트 가이드: TIU-CARD

이 문서는 Codex가 TIU-CARD 작업을 할 때 먼저 읽는 프로젝트 규칙입니다.
기존 Claude용 하네스인 `CLAUDE.md`, `.claude/`와 함께 쓰이며, 사용자가 요청하지 않는 한 Claude용 파일을 덮어쓰거나 대체하지 않습니다.

## 프로젝트 목적

TIU-CARD는 정적 HTML 기반 카드 지휘 게임입니다. Reigns식 카드 스와이프, 텍스트 어드벤처 분기, 한국 SF 감시 디스토피아, 현장임무 미니게임을 결합합니다.

플레이어는 ORACLE 한국지부의 첫 지휘관으로서 봉쇄, 자원, 신뢰, 평가, 숨겨진 GI 압박, 세션 카드팩, 조사테이블, 시설, 아카이브, 엔딩을 관리합니다.

## 기준 문서

- 현재 게임 개요: `README.md`
- 작업 인계와 최근 상태: `HANDOFF.md`
- 세계관/톤 규칙: `-setup/GDD/TIU-GAME-GDD-v11.md`
- 이전 전체 GDD 스냅샷: `-setup/GDD/TIU-GAME-GDD-v10.md`
- 캐논/스토리라인 참고: `-setup/MD/storyline/`
- 캐릭터/세계관 참고: `-setup/MD/`
- 최신 QA 리포트: `qa-report-*.md`
- Claude용 역할 하네스: `CLAUDE.md`, `.claude/agents/`
- Codex 작업 흐름 하네스: `harness/CODEX-ORCHESTRATOR.md`

## 절대 규칙

- 개인 절대경로, 계정명, 토큰, API 키, 비공개 URL, 로컬 머신 정보는 프로젝트 파일에 기록하지 않습니다.
- `_workspace/`는 임시 작업 공간입니다. git에 포함하지 않고, 프로젝트의 기준 상태로 쓰지 않습니다.
- 사용자가 만든 변경을 보존합니다. 관련 없는 수정이나 생성물을 되돌리지 않습니다.
- 요청된 기능, 버그, 콘텐츠, QA 범위 안에서만 수정합니다.
- 한국어 콘텐츠는 UTF-8을 유지하고 깨진 인코딩을 만들지 않습니다.
- `.claude/settings.local.json` 같은 로컬 설정 파일은 수정하지 않습니다.
- 사용자가 명시하지 않는 한 `.claude/worktrees/`를 수정하지 않습니다.
- 라이선스를 존중합니다. 게임 텍스트, 아트, 음악, 코드, 생성 콘텐츠는 프로젝트 자산입니다.

## 기술 구조

- 런타임: 정적 `index.html` + React 18 CDN + 바닐라 JavaScript/CSS.
- 번들러, 패키지 빌드, 모듈 시스템이 없습니다.
- `index.html`의 스크립트 로드 순서는 런타임 동작의 일부입니다.
- 대부분의 데이터는 전역 `var` 형태로 여러 `data-*.js` 파일에 분산되어 있습니다.
- UI는 `React.createElement` 패턴을 사용합니다. 명시 승인 없이 JSX나 빌드 단계를 도입하지 않습니다.
- 저장/로드는 `localStorage` 기반입니다.
- 배포 대상은 정적 호스팅/GitHub Pages입니다.

## 주요 파일 영역

- `app*.js`: 앱 상태, 저장/로드, 카드 드로우, 해금, 보상.
- `components-*.js`: 게임 화면, 설정, 아카이브, 조사테이블, 이브닝 챗, 브리핑, 미니게임, 탈출 래퍼.
- `data-cards*.js`: 카드 데이터와 카드팩 데이터.
- `data-missions*.js`: 현장임무와 변형 임무.
- `data-chains*.js`: 카드 체인과 후속 시퀀스.
- `data-evidence.js`, `data-archive.js`, `data-facility*.js`: 해금형 시스템과 세계관 엔트리.
- `lang-*.js`: 한국어/영어 UI와 콘텐츠 오버레이.
- `tools/validator.js`: 핵심 정적 무결성 검증 도구.
- `tools/simulator_v3.py`: 플레이어 프로필 기반 밸런스 시뮬레이터.

## 검증 기준

- `data-*.js` 변경 후: `node tools/validator.js`
- 카드, 임무, 체인, 엔딩, 경제/수치 변경 후: 보통 `python tools/simulator_v3.py 100 all`
- i18n 변경 후: 필요 시 `node tools/i18n-smoke.js`
- UI/런타임 변경 후: `python -m http.server 4173`으로 띄우고 `http://localhost:4173/index.html` 브라우저 스모크
- 릴리즈 관련 변경 후: `harness/CODEX-ORCHESTRATOR.md`, `harness/CHECKLIST-release.md` 확인

## Codex 작업 방식

- 수정 전에 가까운 코드와 문서를 먼저 읽습니다.
- 기존 전역 변수와 `React.createElement` 스타일을 우선합니다.
- 작고 좁은 패치를 선호합니다. 콘텐츠/QA 작업 중 대규모 리팩터링을 하지 않습니다.
- 데이터를 추가할 때는 카드 ID, LOG ID, 미션 ID, i18n 키, 아카이브 해금, 스크립트 로드 순서를 함께 확인합니다.
- 결과 보고에는 변경 내용과 검증 명령 결과를 포함합니다.
- 임시 메모, 드래프트, 로컬 QA 산출물은 `_workspace/codex/` 또는 기존 `_workspace/*` 하위에 둡니다.

## 역할 라우팅

`.codex/agents/`의 역할 문서를 재사용 프롬프트처럼 사용합니다.

- `implementation-lead.md`: 구현과 통합.
- `data-integrity-auditor.md`: 정적 데이터/참조 검증.
- `narrative-lore-editor.md`: 스토리, 톤, 아카이브, 대화, 캐논 점검.
- `ui-runtime-debugger.md`: 브라우저/UI/런타임 디버깅.
- `balance-simulation-analyst.md`: 몬테카를로 및 진행 밸런스 리뷰.
- `release-qa-coordinator.md`: 릴리즈 전 검증과 패키징 점검.

반복 작업은 `.codex/skills/`의 스킬 문서를 참고합니다.
