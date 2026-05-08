# TERMINAL SESSION (TIU-CARD)

> Reigns식 카드 지휘, Suzerain식 압박, 한국 SF 감시 디스토피아를 섞은 정적 HTML 카드 게임.
>
> **장르**: 카드 스와이프 지휘 시뮬레이션 + 텍스트 어드벤처 + 현장임무 미니게임
> **현재 빌드**: `BUILD_VER=178`
> **최종 검증일**: 2026-05-08
> **배포 주소**: https://art-lyang.github.io/TIU-card/

---

## 짧은 소개

플레이어는 ORACLE 한국지부의 첫 지휘관입니다. 매일 ORACLE은 통제된 카드 선택지를 제시하고, 플레이어는 봉쇄, 자원, 신뢰, 평가를 관리해야 합니다. 하지만 진짜 질문은 하나입니다. 플레이어가 지부를 지휘하고 있는 것인지, 아니면 선택지를 제공하는 시스템에게 훈련당하고 있는 것인지.

---

## 현재 콘텐츠 현황

| 구분 | 현재 상태 |
|---|---:|
| 카드 | **541장** |
| 세션 카드팩 | 후보 **6종**, 세션마다 **4종** 선택 |
| 카드 체인 | 메인 체인 **18개** + 사건/후속 체인 **10개** |
| 현장임무 | **15개** |
| 미니게임 연동 임무 | **9개** |
| 조사테이블 | 증거 **38개** + 조합 **15개** |
| 이브닝 챗 | **103개**, 하루 1명 대화 구조 |
| 엔딩 | 즉사/탈출 포함 **16종** |
| 아카이브 | **46개** |
| 시설 | 확장/지부 인프라 **16개** |
| BGM | **6곡** |
| 세이브 | 독립 세이브 슬롯 **3개** + 세션 상태 스냅샷 |
| 언어 | 한국어 기본, 영어 UI/콘텐츠 오버레이 검증 중 |

최신 정적 무결성 검사:

```text
cards 541 / unique 541
missions 15
evidence 38 + combos 15
archive 46
validator issues 0
```

---

## 주요 시스템

- **DAY 카드 지휘**: 스와이프 또는 키보드 선택으로 봉쇄, 자원, 신뢰, 평가, 숨겨진 GI를 변화시킵니다.
- **세션 카드팩**: 새 세션마다 6개 후보팩 중 4개가 선택됩니다. 핵심 진행, 조사테이블 해금, 기본 시설, 현장임무 인프라는 카드팩과 상관없이 유지됩니다.
- **ACT 컬러 규칙**: Act 1 파랑, Act 2 초록, Act 3 노랑, Act 4 빨강을 카드, 브리핑, 보상, 대화, 이브닝 화면에 적용합니다.
- **이브닝 챗 2.0**: 하루 1명만 대화할 수 있고, 대화 후 이브닝 허브로 돌아오며 완료 상태가 잠깁니다.
- **조사테이블**: Act 2 임재혁 이브닝 루트의 `LOG-EV-UNLOCK` 이후 열리며, 증거와 조합을 확인합니다.
- **현장임무**: 카드와 연결되어 발생하며, 일부 임무는 미니게임으로 이어집니다.
- **미니게임**: signal, sequence, breach, sample, scan, evidence, reconstruction, route, statement, screening 계열을 사용합니다.
- **세이브/로드**: 3개 슬롯이 DAY/ACT, 로그, 이브닝 사용 여부, 현장임무 선택, 세션 카드팩, 시설, 조사 조합을 보존합니다.
- **메인 메뉴 시작 흐름**: 첫 플레이어는 튜토리얼로 바로 진입하고, 재플레이어는 DLC 선택 없이 본 캠페인을 시작합니다.
- **메타 진행**: ORACLE/Observer/GI 계열은 초회차에 전부 드러내지 않고, 반복 플레이에서 일부 징후가 드러나도록 설계되어 있습니다.

---

## 세션 카드팩 구조

세션 카드팩은 Act 2 정보량을 줄이고, 재플레이 때마다 다른 서사 묶음이 나오게 하기 위한 구조입니다. 어떤 팩이 활성화되는지에 따라 일부 선택지와 후속 엔딩 루트가 달라집니다.

| 팩 | 역할 |
|---|---|
| `DG_MERIDIAN` | DG/메리디언 접촉과 외부 세력 압박 |
| `B3_PREDECESSOR` | B3 및 전임 지휘관 관련 기록 |
| `PROMETHEUS_TENSION` | 이중철의 프로메테우스 불신과 협력 전 망설임 |
| `UPRISING_INFRA` | 시설/폐쇄회로 확장과 관련 엔딩 루트 |
| `MUTANT_SURGE` | 변이체 과다 조우와 위협감 강화 |
| `GOV_ORACLE_SUSPICION` | 해진회 사건, 기지 주변 마을 압박, 정부의 ORACLE 기지 의심 |

조사테이블, 기본 시설 확장, 세이브 보정, 현장임무 기본 구조는 선택된 카드팩과 무관하게 작동합니다.

---

## 기술 구조

- **런타임**: 정적 HTML + React 18 CDN + 바닐라 JS/CSS
- **빌드 시스템**: 없음. `index.html`이 단일 진입점입니다.
- **저장 방식**: `localStorage` 기반 스냅샷
- **i18n**: `i18n-runtime.js`, `lang-ui-ko.js`, `lang-ui-en.js`, `lang-content-en-all.js`, `lang-content-en-dialogues.js`, 카드팩별 영어 오버레이
- **QA 도구**: Node validator, 몬테카를로 시뮬레이터, 브라우저 QA, Playwright 로컬 검사
- **호스팅**: GitHub Pages 또는 정적 호스팅

---

## 로컬 실행

```bash
python -m http.server 4173
```

브라우저에서 아래 주소를 엽니다.

```text
http://localhost:4173/index.html
```

일반 플레이에는 별도 패키지 설치가 필요 없습니다. QA 도구는 스크립트에 따라 Node 또는 Playwright가 필요할 수 있습니다.

---

## 폴더 구조

```text
TIU_CARD/
├─ index.html                         # 진입점, BUILD_VER=178
├─ app*.js                            # 앱 상태, 세이브, 로직, 사운드 훅
├─ components-*.js                    # 카드 UI, 이브닝, 대화, 브리핑, 아카이브, 설정, 미니게임
├─ data-*.js                          # 카드, 임무, 증거, 엔딩, 로그, 보상, 시설
├─ data-session-decks.js              # 세션 카드팩 정의와 선택 규칙
├─ logic-session-pack-news.js         # 카드팩 연동 뉴스
├─ i18n-runtime.js                    # 언어 런타임
├─ lang-ui-ko.js / lang-ui-en.js      # UI 언어팩
├─ lang-content-en-all.js             # 영어 콘텐츠 오버레이
├─ assets/ and images*.js             # 이미지 레지스트리와 시각 자산
├─ field-mission/                     # Act 4 탈출/현장임무 런타임
├─ tools/                             # validator와 시뮬레이션 도구
├─ qa-report-2026-05-08.md            # 최신 세션팩 QA 리포트
└─ -setup/
   ├─ GDD/TIU-GAME-GDD-v11.md         # 현재 릴리즈 후보 GDD 델타
   ├─ GDD/TIU-GAME-GDD-v10.md         # 이전 전체 GDD 스냅샷
   ├─ MD/TIU-ALPHA-CHANGELOG-2026-05-08.md # 최신 변경 요약
   ├─ MD/TIU-ALPHA-CHANGELOG.md       # 마일스톤 변경 기록
   └─ QA-Review/GAMEPLAY-REVIEW.md    # 게임성/시스템 리뷰 노트
```

---

## 현재 QA 기준

2026-05-08 기준 확인 내용:

- 정적 validator: **이슈 0건**
- i18n smoke: **통과**
- 브라우저 런타임: 카드 레지스트리, 세션 카드팩, 세이브 스냅샷, 조사테이블 보정, 카드팩 체인 조건, 한/영 오버레이, 공개 금지 세계관 용어 검사 통과
- 세이브 슬롯: 세션 카드팩과 현장임무 선택값이 로드 시 중복으로 쌓이지 않고 정확히 복원됨
- 조사테이블: Act 1 스냅샷에서는 이전 세션 조사테이블 해금이 제거되고, Act 2 이후 스냅샷에서는 정상 보존됨
- 현장임무: 확인한 런타임 경로에서 활성 현장임무는 2개로 유지됨
- 공개 뉴스 정리: 일반 뉴스에서 소바리/카룬탈 노출 제거, 실존 의료단체명은 일반 표현으로 교체
- 수치 문구 정리: `+2`, `-2`처럼 이상한 소단위 예측 문구 제거
- 모바일 메인 메뉴: 390x844 기준 행 간격 6px, 푸터가 첫 화면 안에 보임

몬테카를로 요약:

```text
simulator_v2.py 500 random
  서사 엔딩 392/500 = 78.4%
  즉사 108/500 = 21.6%
  타임아웃 0
  Act4 평균 카드풀 54.7 / 하위 10% 41.0

simulator_v2.py 500 neutral
  서사 엔딩 489/500 = 97.8%
  즉사 0
  타임아웃 11/500 = 2.2%

simulator_v2.py 500 resist
  서사 엔딩 55/500 = 11.0%
  즉사 445/500 = 89.0%
```

저항 시뮬레이션은 일부러 가혹한 자동 전략이라 런타임 오류라기보다 밸런스 관찰 지점으로 봅니다.

남은 관찰 지점:

- `check_buttons.py`는 특수 전환/히든 카드 `CA-OBS-PROTO`, `CH-007-5`의 무효과 버튼 경고를 계속 표시합니다.
- Act 4 하위 카드풀 압박은 인간 플레이테스트에서 계속 봐야 합니다.

---

## 출시 준비 상태

현재는 후기 베타 / 릴리즈 후보 준비 단계입니다. 핵심 콘텐츠 양보다 패키징과 폴리시가 더 중요합니다.

| 우선순위 | 작업 |
|---|---|
| P0 | 콘텐츠 추가 후 validator/몬테카를로/브라우저 QA 유지 |
| P1 | 한국어 최종 플레이테스트와 영어 인력 감수 |
| P1 | 트레일러, GIF, 공식 스토어 스크린샷 |
| P1 | Steam/itch 캡슐 아트와 페이지 문구 |
| P2 | 텍스트 밀도가 높은 카드/장면의 이미지 추가 |
| P2 | 엔딩 이미지와 아카이브 표시 최종 점검 |

---

## 주요 문서

| 문서 | 용도 |
|---|---|
| [`-setup/GDD/TIU-GAME-GDD-v11.md`](-setup/GDD/TIU-GAME-GDD-v11.md) | 현재 릴리즈 후보 GDD 델타 |
| [`-setup/GDD/TIU-GAME-GDD-v10.md`](-setup/GDD/TIU-GAME-GDD-v10.md) | 이전 전체 GDD 스냅샷 |
| [`-setup/MD/TIU-ALPHA-CHANGELOG-2026-05-08.md`](-setup/MD/TIU-ALPHA-CHANGELOG-2026-05-08.md) | 최신 세션팩/QA 변경 요약 |
| [`-setup/MD/TIU-ALPHA-CHANGELOG.md`](-setup/MD/TIU-ALPHA-CHANGELOG.md) | 마일스톤 변경 기록 |
| [`qa-report-2026-05-08.md`](qa-report-2026-05-08.md) | 최신 세션팩 및 안정성 QA 리포트 |
| [`qa-report-2026-05-05.md`](qa-report-2026-05-05.md) | 이전 대형 QA 이슈 리포트 |
| [`-setup/QA-Review/GAMEPLAY-REVIEW.md`](-setup/QA-Review/GAMEPLAY-REVIEW.md) | 게임성/시스템 리뷰 노트 |
| [`HANDOFF.md`](HANDOFF.md) | 작업 인계 노트 |

---

## 라이선스

Copyright (c) 2026 art-lyang.
All rights reserved.

이 프로젝트의 카드 텍스트, 서사, 코드, 이미지 자산은 모두 권리자의 소유입니다. 명시적인 서면 허가 없이 복제, 배포, 2차 창작 또는 파생 작업에 사용할 수 없습니다.

자세한 내용은 [LICENSE](LICENSE)를 확인하세요.

---

*최종 업데이트: 2026-05-08 / BUILD_VER=178*
