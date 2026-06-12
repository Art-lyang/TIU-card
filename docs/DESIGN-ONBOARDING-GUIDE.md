# 설계: 온보딩·가이드 보강 (0+1+2단계)

> 목적: "인터페이스/가이드 안내 부족" 피드백 해소.
> 원칙: 강제 튜토리얼 금지 — ORACLE 세계관 내재형(diegetic) 안내. 데이터(data-*)·세이브 스키마·밸런스 무접촉.

## 배경 근거
- 몬테카를로 분석: 효과 미리보기 기능의 발견성 부족이 신규 이탈의 절반 (밸런스 절벽은 BUILD 241에서 해소).
- 현 브리핑(=`Tutorial` 컴포넌트, components-game.js:1041)은 4스탯·0=실패·스와이프까지 커버하나
  ① 봉쇄 100 종료 미고지(시뮬상 newbie 3.2%/careful 4.4%가 실제로 이 엔딩으로 종료)
  ② 기울이기 미리보기 미고지 ③ 재열람 불가 ④ 필요 시점 안내 부재.

## 확정 기술 훅 (정찰 완료)
| 훅 | 위치 | 비고 |
|---|---|---|
| 브리핑 본체 | `components-game.js:1041 Tutorial` koSteps + `lang-ui-ko.js tutorial.steps` + `lang-ui-en.js` | 3곳 동기 수정 |
| 모멘트 힌트 채널 | `app.js` 기존 토스트(`setToast`/`toastType('oracle')`, CardC `onOracleBlock` 경로와 동일 스타일) | 신규 UI 불필요. 힌트용 노출시간 별도(4.5s) |
| 발화 지점 | `app.js` phase 머신(667~), swipe 처리부(스탯 변화 직후), `sessions` state | 전부 한 파일에서 중앙 제어 |
| 재열람 화면 진입 | `components-settings-2.js` SettingsPanel 버튼 목록 | 미니게임 가이드(onClose 패턴)와 동일 |

## 0단계 — 브리핑 3/3 두 줄 보강 (초저비용)
3/3 lines 배열에 추가:
- (스탯 블록 뒤) `"봉쇄가 100에 도달해도 임무는 종료됩니다."`
- (스와이프 안내 뒤) `"카드를 끝까지 밀기 전에 기울이면, 지표 변동 예측이 표시됩니다."`

EN:
- `"If Containment reaches 100, the operation also ends."`
- `"Tilt a card before committing to preview the projected stat changes."`

수정 파일: components-game.js(폴백)·lang-ui-ko.js·lang-ui-en.js (demo 동기화 포함)

## 1단계 — 첫 회차 모멘트 힌트 (sessions==0 한정, 각 1회, 토스트)
공통 구현: app.js에 세션 메모리 레지스트리 `shownHints`(useRef Set — 저장 안 함, 새 세션마다 초기화가 곧 의도)와
`fireGuideHint(key)` 헬퍼(= sessions===0 && 미발화 시 oracle 토스트 4.5s). i18n 키 `guide.h1~h5`.

| ID | 트리거 (app.js 발화 지점) | KO 카피 초안 | EN 카피 초안 |
|---|---|---|---|
| H1 미리보기 | `phase==='game'` 첫 진입 직후 (day1 첫 카드 표시 시) | `[ORACLE: 카드를 기울이면 판단 결과 예측치가 표시됩니다]` | `[ORACLE: Tilt the card to preview the projected outcome]` |
| H2 위험대 | 스와이프 처리 후 어느 스탯이든 최초 ≤25 | `[ORACLE: {스탯} 지표 임계 접근 — 회복 판단을 권고합니다]` | `[ORACLE: {stat} approaching critical — recovery decisions advised]` |
| H3 야간통신 | `phase==='evening'` 최초 진입 | `[야간 통신 개방: 하루 한 명과의 대화가 신뢰를 만듭니다]` | `[Night comms open: one conversation a day builds trust]` |
| H4 현장임무 | 미션 phase 최초 진입 | `[현장 모듈은 메인메뉴 ▸ 미니게임 가이드에서 무보상 연습이 가능합니다]` | `[Field modules can be practiced risk-free in Main Menu ▸ Minigame Guide]` |
| H5 과잉 봉쇄 | 스와이프 처리 후 봉쇄 최초 ≥85 | `[경고: 봉쇄 100 도달 시 임무 종료 — 과잉 통제 역시 실패로 기록됩니다]` | `[Warning: Containment 100 terminates the operation — overcontrol is also failure]` |

규칙: 회차≥1 전면 미노출 · GI/로그/세이브 무기록 · 토스트는 입력을 막지 않음 · Act 색상 변수(--ui) 자동 준수.

## 2단계 — "운영 프로토콜" 재열람 화면
- 진입: 설정 패널에 `[ 운영 프로토콜 ]` 버튼 (메인메뉴 항목 추가는 모바일 6칸 한계로 보류).
- 신규 컴포넌트 `ProtocolGuide` (components-settings-2.js 내 또는 인접, LogViewer/미니게임 가이드 패턴: 정적 1화면 + 닫기).
- 내용(전부 i18n `guideProtocol.*`, ORACLE 보고서 톤):
  1. 4대 지표 — 아이콘+2줄씩 (브리핑보다 한 단계 구체적으로: 무엇이 올리고/내리나)
  2. 종료 조건 — "임의 지표 0" + "봉쇄 100" (GI/숨김 지표는 캐논대로 비공개 유지)
  3. 하루 구조 — 판단 카드 → 일일 보상 → 야간 통신
  4. 조작 — 스와이프 / 기울여 미리보기 / 숫자키 1–9 / Enter
  5. 부속 체계 한 줄씩 — 조사테이블·시설 확장·아카이브·수동 스냅샷 3슬롯
- 게임오버 화면·메인메뉴에서의 추가 진입은 v2에서 검토(이번 범위 밖).

## 가드레일
- 신규 텍스트는 KO/EN 동시 작성(tt 경유) — i18n-smoke에 guide.* 커버 추가.
- 캐논: ORACLE 표현은 전부 내부 단말 화면 한정(노출 규칙 준수). GI 언급 금지.
- 본편+demo 동시 적용, ttst는 추후 일괄 재동기화 시점에 수렴(이번 패치는 본편 우선).

## 영향 파일·버전 계획
| 파일 | 변경 | 비고 |
|---|---|---|
| components-game.js | 브리핑 폴백 2줄 | v77→78 |
| app.js | fireGuideHint + 발화 5지점 | v83→84 |
| components-settings-2.js | 프로토콜 버튼+화면 | v18→19 |
| lang-ui-ko.js / lang-ui-en.js | tutorial 2줄 + guide.* ≈7키 + guideProtocol.* ≈12키 | v32→33 / v36→37 |
| style.css | (필요시) 프로토콜 화면 소량 | v73→74 |
| index.html ×2(root/demo) | 버전·BUILD 243 | |

## 검증 계획
1. localStorage 초기화(sessions=0) 헤드리스 — H1~H5 각 트리거 캡처(가상시간+상태주입)
2. sessions≥1 — 힌트 5종 전부 미노출 확인
3. EN 모드 — 브리핑/힌트/프로토콜 영어 노출 캡처
4. i18n-smoke·validator 그린, 토스트 채널 기존 사용처(ORACLE 거절 메시지) 회귀 무
5. integrity-verifier 게이트 → 배포

## 구현 순서 (예상 1세션)
0단계(10분) → 2단계(정적 화면이라 카피만 확정되면 직선) → 1단계(훅 5지점+검증) → 통합 검증 → 배포
