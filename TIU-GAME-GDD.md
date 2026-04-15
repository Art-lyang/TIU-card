# TERMINAL SESSION — Game Design Document
> 최종 업데이트: 2026-04-15 (v0.7)

## 개요
TIU 세계관 기반 하이브리드 게임. Reigns식 카드 스와이프 + 텍스트 어드벤처.
ORACLE Proxy Network 한국 지부 초대 지휘관(이중철/Pilehead) 시점.

**배포**: https://art-lyang.github.io/TIU-card/ (Art-lyang/TIU-card)

## 파일 구조 (전부 200줄 이하 유지, 총 63개 JS 파일)

### 코어
- `index.html` — HTML 셸 + 스크립트 로드 (캐시버스트 ?v=10)
- `style.css` — 전체 스타일 + 반응형

### 앱 로직
- `app.js` — React App 컴포넌트 (메인 상태 관리)
- `app-init.js` — 글로벌 유틸, CARDS 배열, drawCard, Save, SFX
- `app-utils.js` — 유틸 함수 (pick, drawCard, INTRO_FILTER 등)
- `app-logic.js` — Act 전환, 엔딩 체크, 게임 로직
- `app-bgm.js` — BGM 연동 로직

### UI 컴포넌트
- `components.js` — Boot, Tutorial, GameOver, TrustToast
- `components-game.js` — StatBar, GaugeBar, CardView, SwipeArea
- `components-dialogue.js` — Dialogue, LogViewer, EndingScreen, FieldMission
- `components-evening.js` — EveningChat (이브닝 챗 + 선택지)
- `components-briefing.js` — DayBriefing
- `components-archive.js` — 아카이브 전용 컴포넌트
- `components-evidence.js` — 증거 수집 컴포넌트
- `components-facility.js` — 시설 탐사 컴포넌트
- `components-settings.js` — 설정 패널 Sound/Display 탭
- `components-settings-2.js` — 설정 패널 Save/Data/Info 탭 + SettingsPanel 메인

### 데이터
- `data-core.js` — NP, REWARDS, DIALOGUES(14종), ORACLE_LOGS(26종), BOOT_LINES, EVENING_CHATS(36종)
- `data-cards-prologue.js` + `data-cards-1.js` ~ `data-cards-16.js` — 카드 데이터 (337장)
- `data-chains.js` — 연쇄 카드 CHAINS (6체인)
- `data-chains-incident.js` — 기지 내부 사건 체인 트리거 카드
- `data-chains-incident2.js` — 기지 내부 사건 체인 분기
- `data-missions.js` — 현장 임무 M-001~M-004
- `data-missions-2.js` — 현장 임무 M-005~M-006
- `data-missions-3.js` — 현장 임무 M-007~M-008
- `data-missions-incident.js` — 기지 내부 사건 임무 MI-01~MI-05
- `data-endings.js` — 엔딩 6종 서사 + 특수 엔딩 체크
- `data-archive.js` — ORACLE 아카이브 백과사전 (43종)
- `data-rewards.js` — 보상/감시/정보해금 시스템
- `data-status-tags.js` — 상태 태그 시스템
- `data-evidence.js` — 증거 데이터 (28종)
- `data-facility.js` + `data-facility-2.js` — 시설 탐사 데이터 (29 노드)
- `data-hidden-story.js` — 히든 스토리 (10종)

### 이브닝 챗 시스템
- `data-evening-trust-1.js` — getTrustTier + 강도윤 Act 1-2 대사
- `data-evening-trust-1b.js` — 강도윤 Act 3-4 + 추가 대사
- `data-evening-trust-2.js` — 서하은 신뢰도별 대사
- `data-evening-trust-3.js` — 윤세진·임재혁·박소영 대사
- `data-evening-responses.js` — 이브닝 챗 선택지 (19종)
- `data-evening-extra.js` — 추가 이브닝 챗 + 추가 선택지 (19종)
- `evening-lines.js` — getEveningLines 함수 (신뢰도 기반 대사 변형)
- EVENING_TRUST_LINES: 52개 신뢰도 변형 세트

### 이미지
- `images.js` — base64 이변체/캐릭터 이미지 + CHAR_IMG 매핑
- `images_bg.js` — base64 카드 배경 이미지
- `images_cards.js` — base64 카드 개별 이미지
- `img/` — 카드 일러스트 PNG 56장 (scene/character/anomaly)

### 오디오
- `bgm.js` — BGM 시스템 (crossfade, 음소거, 볼륨 조절)
- `bgm-fade.js` — fadeIn/fadeOut/timer 관리
- `bgm_main.js` — 메인 BGM (base64)
- `bgm_tension.js` — 긴장 BGM (base64)
- `bgm_boot.js` — 부팅 사운드 (base64)

## 플레이어: 이중철 (Pilehead)
한국인 군 특수부대 장교 출신. 불명예전역. 한국 지부 초대 지휘관. 기지: 강원도 비공개 위치.

## 인물
**한국 지부**: 이중철(지휘관), 서하은(부지휘관/데이터분석), 강도윤(전술지휘관/현장), 윤세진(연구원/의료관), 임재혁(정보분석관/기술)
**프로메테우스**: 마르쿠스 베버(지휘관), 닉 포스터, 박소영(분석관), 에이전트 강(정체 미공개)

## 4대 스탯
봉쇄(c:50), 자원(r:65), 신뢰(t:50), 평가(o:40). 0이면 게임오버.
봉쇄 100 = C_cs(봉쇄 성공) 또는 C_cst(자충수) 엔딩. 유도지수(GI): 숨겨진 변수.

## 4-Act 구조

| Act | 서사 | 일수 | 하루 카드 | 감쇠 |
|-----|------|------|----------|------|
| **Act 1: 프롤로그/일상** | 기지 도착, ORACLE 첫 접속, 간부 자기소개(인사+업무보고), 현장임무 없음 | ~5일 | 4장 | 없음 |
| **Act 2: 의혹** | 이변체 첫 조우, 프로메테우스 감지, ORACLE 의심 시작 | ~14일 | 5장 | 없음 |
| **Act 3: 진실** | 프로메테우스 대면, 서하은 분기, ORACLE 실체 접근 | ~29일 | 6장 | c-1, r-1 |
| **Act 4: 최종** | GI 기반 분기, 엔딩 수렴, 최종 프로토콜 | Day 30+ | 7장 | c-2, r-2, t-1 |

- **CA-001 "기지 도착 첫날"**: 게임 시작 시 반드시 첫 번째 카드로 강제 배치 (once 시스템)
- **Act 1 간부진 이브닝챗**: ORACLE 의심 없음, 순수한 자기소개+업무보고 톤
- **Act 2부터 ORACLE 의심 시작**: 서하은·윤세진·임재혁이 이상 징후 감지
- **once 카드 시스템**: 소개카드(CA-001~006) 등 1회성 카드는 `once: true` + `ONCE-{cardId}` LOG 추적으로 중복 방지
- **Act 1 현장임무 미발생**: 이변체 조우 및 FIELD MISSION은 Act 2부터
- **이브닝 인트로 스킵**: INTRO_LOG_MAP으로 첫 자기소개 완료 후 Act 1 반복 방지

## 메카닉
- 하루: Act별 카드 4/5/6/7장 → 이브닝 챗 → 뉴스 → 보상 → 다음 날
- 이브닝 챗: 신뢰도(low/mid/high/bond) 4구간 기반 대사 완전 변형 (52세트), 선택지(38종) 포함
- 인물 신뢰도: 4인 개별(0~100, 시작50), 65~70+ 심층 대화 해금
- 카드 중복 방지: 최근 20장 버퍼 + 태그 쿨다운 3일
- 이변체 쿨다운: tag 기반, 같은 변이체 최소 3일
- 자원 리스크: r≥2 획득 시 20% 실패 → 빨간 토스트 **화면 중앙** 2.5초
- 보상 안전장치: 스탯 최소 5 보장
- BGM: 메인/긴장/부팅 3트랙 (base64), crossfade 전환, 볼륨 슬라이더(모바일 드래그 지원)
- 설정 패널: ☰ 메뉴 → SOUND/DATA/SAVE/DISPLAY/INFO 5탭
- 시설 탐사: 기지 구역별 인터랙티브 탐색 (29 노드)
- 증거 수집: 28종 증거 아이템
- 히든 스토리: 10종 숨겨진 서사

## 콘텐츠 현황
- 카드 337장 (17개 파일: prologue + 1~16)
- 연쇄 6체인 + 기지 사건 체인 + 사건 임무 5종(MI-01~05)
- 현장 미션 8개(M-001~M-008) + 사건 미션 5개(MI-01~MI-05)
- ORACLE 로그 26종 + 대화 14종 + 아카이브 43종
- 이브닝 챗 40종(기본36+추가4) + 신뢰도 변형 52세트 + 선택지 38종
- 이변체 5종(직접) + 아카이브 전용 6종 + 이미지 56장(img/)
- 엔딩 10종 표시 (서사 6종: A/B/D/C_cs/C_cst/F + 즉사 4종: C_c/C_r/C_t/C_o)
- 증거 28종 + 시설 29노드 + 히든 스토리 10종

## 확정 로어
- 프로메테우스: 한국 비공식 지원. ORACLE은 적대 분류.
- 다회차: Observer→ORACLE 임시 능력. 만료: UPON_FULL_ESTABLISHMENT || OBSERVATION_TERMINATE
- Shell Talker: 희생자 목소리만 모방. 박상훈 중위 = 이미 포식당함
- 봉쇄 0 = 시설 자체 봉쇄·폐기. 봉쇄 100 = C_cs(봉쇄 성공) 또는 C_cst(자충수)
- DPRK 블랙존: 의식/육체 분리. EV-Σ 무관. Observer 능력 불완전 작용

## 다음 작업
1. ~~카드 80장+ 확충~~ ✅ (337장 달성)
2. ~~Act 구조 설계 + 구현~~ ✅
3. ~~비주얼 폴리싱 (배경 이미지 + 터미널 필터)~~ ✅
4. ~~BGM 시스템~~ ✅ (3트랙 base64)
5. ~~파일 분리 (200줄 기준)~~ ✅ (63개 JS 파일)
6. ~~자원 실패 토스트 화면 중앙 표시~~ ✅
7. ~~img 폴더 56장~~ ✅
8. ~~4-Act 구조 (프롤로그 Act 추가)~~ ✅
9. ~~CA-001 첫 카드 강제 배치~~ ✅
10. ~~간부진 인트로 대사 수정 (ORACLE 의심 제거)~~ ✅
11. ~~윤세진 설정: 보완 분석 기법~~ ✅
12. ~~소개카드 once 중복 방지~~ ✅
13. ~~이브닝 챗 선택지 시스템~~ ✅ (38종 응답)
14. ~~설정 패널 (5탭)~~ ✅
15. ~~시설 탐사 시스템~~ ✅ (29노드)
16. ~~증거 수집 시스템~~ ✅ (28종)
17. ~~기지 사건 체인~~ ✅ (트리거 + 분기 + MI-01~05)
18. ~~봉쇄100 엔딩 분기 (C_cs/C_cst)~~ ✅
19. **유니버스 페이지** (TIU-WORLDBUILDING-SUMMARY.md 기반 HTML)
20. **이변체 추가** (현재 5종 → 목표 8~10종)
21. **현장 미션 확장** (현재 M-001~008 → 목표 20~25개)
22. **3회차 유도지수 UI 노출**
23. **4회차+ OBSERVER ACCESS 잔향**
