# TERMINAL SESSION — Game Design Document
> 최종 업데이트: 2026-04-08

## 개요
TIU 세계관 기반 하이브리드 게임. Reigns식 카드 스와이프 + 텍스트 어드벤처.
ORACLE Proxy Network 한국 지부 초대 지휘관(이중철/Pilehead) 시점.

**배포**: https://art-lyang.github.io/TIU-card/ (Art-lyang/TIU-card)

## 파일 구조 (37 JS 파일 + CSS + HTML)
- `index.html` (58줄) — HTML 셸, 39개 스크립트 로드
- `style.css` (149줄) — CSS + Act별 색상 커스텀 프로퍼티
- `app.js` (271줄) — 게임 로직 (상태관리, checkLogs, 전환, 세이브)
- `app-utils.js` (57줄) — CARDS 병합, drawCard, Save, SFX
- `components-game.js` (172줄) — Boot, Stats, CardC, Tutorial, News 등
- `components.js` (62줄) — Dialogue, LogViewer, EndingScreen, FieldMission
- `components-evening.js` (163줄) — EveningAmbient + EveningChat
- `components-archive.js` (92줄) — ArchiveViewer
- `data-core.js` (156줄) — NP, REWARDS, DIALOGUES(12종), ORACLE_LOGS(29종), BOOT_LINES, 이브닝 기본 대사
- `data-evening-trust-1.js` (151줄) — 이브닝 신뢰 대사 Act 1~2
- `data-evening-trust-2.js` (204줄) — 이브닝 신뢰 대사 Act 3 + getEveningLines
- `data-archive.js` — ORACLE 아카이브 43항목
- `data-cards-1~15.js` — 카드 데이터 308장 (15개 파일)
- `data-chains.js` — 연쇄 카드 6체인 13장
- `data-missions.js` — 미션 M-001~003 (3선택지: 제거/포획/ORACLE)
- `data-missions-2.js` — 미션 M-005~006
- `data-missions-3.js` — 미션 M-007~008
- `data-endings.js` — 엔딩 정의 + 특수 엔딩 체크
- `images.js` — base64 이미지 + CHAR_IMG 매핑
- `images_bg.js` — 카드 배경 이미지 9장
- `images_cards.js` — 카드 전용 이미지
- `bgm.js` + `bgm_boot/main/tension.js` — Web Audio API BGM 시스템

## 플레이어: 이중철 (Pilehead)
한국인 군 특수부대 장교 출신. 불명예전역. 한국 지부 초대 지휘관. 기지: 강원도 비공개 위치.

## 인물
**한국 지부 5명**: 이중철(지휘관), 서하은(부지휘관/정보), 강도윤(현장), 윤세진(의료), 임재혁(기술)
**프로메테우스 4명**: 마르쿠스 베버(지휘관), 닉 포스터, 박소영(연구), 에이전트 강(정체 미공개)

## 4대 스탯
봉쇄(c:50), 자원(r:65), 신뢰(t:50), 평가(o:40). 0이면 게임오버.
봉쇄 100 = GRANT EXPIRED(안정화 완료). 유도지수(GI): 숨겨진 변수, 5일차+GI≤30시 글리치.

## 메카닉
- 하루: Act별 카드 5/6/7장 → 대화 이벤트 → 뉴스 → 보상 → 이브닝 챗 → 다음 날
- Act 구조: 일수 기반 무조건 전환 + 4루트 분기, Act별 CSS 색상 테마
  - Act 1 부임 (감쇠 없음)
  - Act 2 충돌 (매일 c-1/r-1)
  - Act 3 선택 (매일 c-2/r-2/t-1, 진입 시 전체 -3)
- 인물 신뢰도: 4인 개별(0~100, 시작50), 65~70+ 심층 대화 해금
- 이브닝 챗: 7인 참여, 신뢰 티어(low/high/bond), Act 3 3기간 세분화
- 카드 중복 방지: 최근 20장 버퍼 + 태그 쿨다운 3일
- 이변체 연쇄: 조우→결정→[포획 시] 관찰 (3선택지: 제거/포획/ORACLE)
- LOG 난이도: 복합 조건(신뢰+연구LOG) + GI 상한 잠금 + 포획 게이팅
- 보상 안전장치: 스탯 최소 5 보장
- 자원 리스크: r≥2 획득 시 20% 실패
- BGM: Web Audio API 프로시저럴 3트랙 (boot/main/tension)

## 콘텐츠 현황
- 카드 321장 (15개 파일 308장 + 체인 6개 13장) + 연계 체인 3개
- 미션 8개 (M-001~M-008)
- 로그 29종 (97 LOG ID)
- 대화 12종 + 이브닝 챗 7인
- 아카이브 43항목
- 이미지 3파일 (인물/배경/카드 전용)
- BGM 3트랙

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
4. ~~비주얼 폴리싱~~ ✅
5. ~~이브닝 챗 시스템~~ ✅
6. ~~BGM 시스템~~ ✅
7. ~~ORACLE 아카이브~~ ✅
8. ~~LOG 난이도 개선~~ ✅
9. 이변체 추가 (5→8~10종)
10. 미션 확장 (8→20~25개)
