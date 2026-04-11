# TERMINAL SESSION — Game Design Document
> 최종 업데이트: 2026-04-12 (v0.6)

## 개요
TIU 세계관 기반 하이브리드 게임. Reigns식 카드 스와이프 + 텍스트 어드벤처.
ORACLE Proxy Network 한국 지부 초대 지휘관(이중철/Pilehead) 시점.

**배포**: https://art-lyang.github.io/TIU-card/ (Art-lyang/TIU-card)

## 파일 구조 (전부 200줄 이하 유지)

### 코어
- `index.html` — HTML 셸 + 스크립트 로드
- `style.css` — 전체 스타일 + 반응형

### 앱 로직 (app.js → 4개 분리)
- `app-utils.js` — 유틸 함수 (pick, drawCard, INTRO_FILTER 등)
- `app-save.js` — Save 객체 (localStorage 세이브/로드)
- `app-sfx.js` — SFX 객체 (Web Audio API 7종)
- `app-main.js` — React App 컴포넌트 + BGM 시스템

### UI 컴포넌트 (components.js → 3개 분리)
- `components-boot.js` — Boot, Tutorial, GameOver 컴포넌트
- `components-game.js` — StatBar, GaugeBar, CardView, SwipeArea 컴포넌트
- `components-ui.js` — News, Reward, Archive, Dialogue, EveningChat 컴포넌트

### 데이터
- `data-core.js` — NP, REWARDS, DIALOGUES(12종), ORACLE_LOGS(19종), BOOT_LINES, EVENING_CHATS
- `data-cards-1.js` ~ `data-cards-15.js` — 카드 데이터 (CARDS_BASE, CARDS_STORY 등)
- `data-cards-prologue.js` — Act 1 프롤로그 전용 카드
- `data-chains.js` — 연쇄 카드 CHAINS (6체인, 13장)
- `data-missions.js` — 현장 임무 M-001~M-003
- `data-missions-2.js` — 현장 임무 M-004~M-006
- `data-missions-3.js` — 현장 임무 M-007~M-008
- `data-endings.js` — 엔딩 정의 + 특수 엔딩 체크
- `data-archive.js` — ORACLE 아카이브 백과사전 (ARC-*)
- `data-evening-trust-1.js` — 이브닝 챗: 강도윤 신뢰도별 대사 + getTrustTier
- `data-evening-trust-2.js` — 이브닝 챗: 서하은 신뢰도별 대사
- `data-evening-trust-3.js` — 이브닝 챗: 윤세진·임재혁·박소영 대사

### 이미지
- `images.js` — base64 이변체/캐릭터 이미지 21장 + CHAR_IMG 매핑
- `images_bg.js` — base64 카드 배경 이미지 9장
- `images_cards.js` — base64 카드 개별 이미지
- `img/` — 카드 일러스트 PNG 56장 (scene/character/anomaly)

### 오디오
- `bgm.js` — BGM 시스템 (crossfade, 음소거 토글)
- `bgm_main.mp3` — 메인 BGM
- `bgm_crisis.mp3` — 긴장 BGM (위험 상태 자동 전환)

## 플레이어: 이중철 (Pilehead)
한국인 군 특수부대 장교 출신. 불명예전역. 한국 지부 초대 지휘관. 기지: 강원도 비공개 위치.

## 인물
**한국 지부**: 이중철(지휘관), 서하은(부지휘관/데이터분석), 강도윤(전술지휘관/현장), 윤세진(연구원/의료관), 임재혁(정보분석관/기술)
**프로메테우스**: 마르쿠스 베버(지휘관), 닉 포스터, 박소영(분석관), 에이전트 강(정체 미공개)

## 4대 스탯
봉쇄(c:50), 자원(r:65), 신뢰(t:50), 평가(o:40). 0이면 게임오버.
봉쇄 100 = GRANT EXPIRED(안정화 완료). 유도지수(GI): 숨겨진 변수, 5일차+GI≤30시 글리치.

## 4-Act 구조

| Act | 서사 | 일수 | 하루 카드 | 감쇠 |
|-----|------|------|----------|------|
| **Act 1: 프롤로그/일상** | 기지 도착, ORACLE 첫 접속, 간부 자기소개(인사+업무보고), 현장임무 없음 | ~5일 | 4장 | 없음 |
| **Act 2: 의혹** | 이변체 첫 조우, 프로메테우스 감지, ORACLE 의심 시작 | ~14일 | 5장 | 없음 |
| **Act 3: 진실** | 프로메테우스 대면, 서하은 분기, ORACLE 실체 접근 | ~29일 | 6장 | c-1, r-1 |
| **Act 4: 최종** | GI 기반 분기, 엔딩 수렴, 최종 프로토콜 | Day 30+ | 7장 | c-2, r-2, t-1 |

- **CA-001 "기지 도착 첫날"**: 게임 시작 시 반드시 첫 번째 카드로 강제 배치
- **Act 1 간부진 이브닝챗**: ORACLE 의심 없음, 순수한 자기소개+업무보고 톤
- **Act 2부터 ORACLE 의심 시작**: 서하은·윤세진·임재혁이 이상 징후 감지
- **once 카드 시스템**: 소개카드 등 1회성 카드는 `once: true` 플래그로 중복 방지
- **Act 1 현장임무 미발생**: 이변체 조우 및 FIELD MISSION은 Act 2부터

## 메카닉
- 하루: Act별 카드 4/5/6/7장 → 이브닝 챗 → 뉴스 → 보상 → 다음 날
- 이브닝 챗: 신뢰도(low/mid/high/bond) 기반 대사 변형, 4인 개별
- 인물 신뢰도: 4인 개별(0~100, 시작50), 65~70+ 심층 대화 해금
- 카드 중복 방지: 최근 20장 버퍼 + 태그 쿨다운 3일
- 이변체 쿨다운: tag 기반, 같은 변이체 최소 3일
- 자원 리스크: r≥2 획득 시 20% 실패 → 빨간 토스트 **화면 중앙** 2.5초
- 보상 안전장치: 스탯 최소 5 보장
- BGM: 메인/위기 자동 전환 (봉쇄·자원 위험 시), 음소거 토글

## 콘텐츠 현황
- 카드 230장+ (16개 파일: prologue + 1~16)
- 연쇄 6개(13장) + 미션 8개 + 로그 19종 + 대화 12종
- 이변체 5종(+아카이브 6종) + 이미지 56장(img/) + 배경 9장
- 엔딩 8종 (A/B/C×4/D/F)

## 확정 로어
- 프로메테우스: 한국 비공식 지원. ORACLE은 적대 분류.
- 다회차: Observer→ORACLE 임시 능력. 만료: UPON_FULL_ESTABLISHMENT || OBSERVATION_TERMINATE
- Shell Talker: 희생자 목소리만 모방. 박상훈 중위 = 이미 포식당함
- 봉쇄 0 = 시설 자체 봉쇄·폐기. 봉쇄 100 = GRANT 만료(세션 종료)
- DPRK 블랙존: 의식/육체 분리. EV-Σ 무관. Observer 능력 불완전 작용

## 다음 작업
1. ~~카드 80장+ 확충~~ ✅
2. ~~Act 구조 설계 + 구현~~ ✅
3. ~~비주얼 폴리싱 (배경 이미지 + 터미널 필터)~~ ✅
4. ~~BGM 시스템~~ ✅
5. ~~파일 분리 (200줄 기준)~~ ✅
6. ~~자원 실패 토스트 화면 중앙 표시~~ ✅
7. ~~img 폴더 56장~~ ✅
8. ~~4-Act 구조 (프롤로그 Act 추가)~~ ✅
9. ~~CA-001 첫 카드 강제 배치~~ ✅
10. ~~간부진 인트로 대사 수정 (ORACLE 의심 제거)~~ ✅
11. ~~윤세진 설정: 보완 분석 기법~~ ✅
12. ~~소개카드 once 중복 방지~~ ✅
13. **유니버스 페이지** (TIU-WORLDBUILDING-SUMMARY.md 기반 HTML)
14. **이변체 추가** (현재 5종 → 목표 8~10종)
15. **현장 미션 확장** (현재 8개 → 목표 20~25개)
16. **3회차 유도지수 UI 노출**
17. **4회차+ OBSERVER ACCESS 잔향**
