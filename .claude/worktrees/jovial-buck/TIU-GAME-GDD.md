# TERMINAL SESSION — Game Design Document
> 최종 업데이트: 2026-04-02

## 개요
TIU 세계관 기반 하이브리드 게임. Reigns식 카드 스와이프 + 텍스트 어드벤처.
ORACLE Proxy Network 한국 지부 초대 지휘관(이중철/Pilehead) 시점.

**배포**: https://art-lyang.github.io/TIU-card/ (Art-lyang/TIU-card)

## 파일 구조 (10파일, 전부 300줄 이하)
- `index.html` (25줄) — HTML 셸
- `style.css` (95줄) — CSS + 반응형 (모바일/PC)
- `data-core.js` (60줄) — NP, REWARDS, DIALOGUES(12종), ORACLE_LOGS(19종), BOOT_LINES
- `data-cards-1.js` (65줄) — 기본 카드 CARDS_BASE (C-001~C-051)
- `data-cards-2.js` (47줄) — 스토리 카드 CARDS_STORY (C-052~C-088)
- `data-chains.js` (46줄) — 연쇄 카드 CHAINS (CH-001~CH-006, 19장)
- `data-missions.js` (264줄) — 현장 임무 MISSIONS (M-001~M-006)
- `images.js` (40줄, ~111KB) — base64 이미지 21장 + CHAR_IMG 매핑
- `components.js` (75줄) — UI 컴포넌트 12개
- `app.js` (144줄) — 게임 로직 + Save + SFX + CARDS 병합

## 플레이어: 이중철 (Pilehead)
한국인 군 특수부대 장교 출신. 불명예전역. 한국 지부 초대 지휘관. 기지: 강원도 비공개 위치.

## 인물
**한국 지부 5명**: 이중철(지휘관), 서하은(부지휘관/정보), 강도윤(현장), 윤세진(의료), 임재혁(기술)
**프로메테우스 4명**: 마르쿠스 베버(지휘관), 닉 포스터, 박소영(연구), 에이전트 강(정체 미공개)

## 4대 스탯
봉쇄(c:50), 자원(r:60), 신뢰(t:50), 평가(o:40). 0이면 게임오버.
봉쇄 100 = GRANT EXPIRED(안정화 완료). 유도지수(GI): 숨겨진 변수, 5일차+GI≤30시 글리치.

## 메카닉
- 하루: Act별 카드 5/6/7장 → 뉴스 → 보상 → 다음 날
- Act 구조: 이벤트 기반 전환, 교체형 카드 풀, ORACLE 브리핑 화면
  - Act 1 부임 (31장 풀, 감쇠 없음)
  - Act 2 충돌 (70장 풀, 매일 c-2/r-2)
  - Act 3 선택 (38장 풀, 매일 c-3/r-3/t-1, 진입 시 전체 -5)
- 인물 신뢰도: 4인 개별(0~100, 시작50), 65~70+ 심층 대화 해금
- 카드 중복 방지: 최근 8장 기억
- 이변체 쿨다운: tag 기반, 같은 변이체 최소 3일
- 보상 안전장치: 스탯 최소 5 보장
- 사운드: Web Audio API 프로시저럴 7종

## 콘텐츠 현황
- 카드 88장 활성(+C-089/C-090) + 연쇄 6개(13장) + 미션 8개(+M-007/M-008) + 로그 19종 + 대화 12종 + 이미지 21장

## 확정 로어
- 프로메테우스: 한국 비공식 지원. ORACLE은 적대 분류.
- 다회차: Observer→ORACLE 임시 능력. 만료: UPON_FULL_ESTABLISHMENT || OBSERVATION_TERMINATE
- Shell Talker: 희생자 목소리만 모방. 박상훈 중위 = 이미 포식당함
- 봉쇄 0 = 시설 자체 봉쇄·폐기. 봉쇄 100 = GRANT 만료(세션 종료)
- DPRK 블랙존: 의식/육체 분리. EV-Σ 무관. Observer 능력 불완전 작용

## 다음 작업
1. ~~카드 80장+ 확충~~ ✅
2. ~~Act 구조 설계~~ ✅
3. ~~Act 구조 코드 구현~~ ✅
4. **비주얼 폴리싱** (카드 이미지 + 터미널 필터) ✅
5. React 전환
