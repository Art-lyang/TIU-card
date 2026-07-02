# Play Console 등록 자료 — TERMINAL SESSION

> 출시 순서 확정: **구글 플레이 → (매출 확인 후 GCRB 등급) → itch 한국어 정식 → 스팀**
> Play는 자체등급분류라 심의 비용 0. 필요 실비: 개발자 계정 $25 1회.

## 준비물 체크리스트

| 항목 | 상태 |
|---|---|
| 앱 패키지 (Bubblewrap) | ⬜ PC에서 — `TWA-RELEASE.md` 절차 |
| 앱 아이콘 512×512 | ✅ `icons/icon-512.png` |
| 피처 그래픽 1024×500 | ✅ `store-assets/feature-graphic-1024x500.png` |
| 폰 스크린샷 최소 2장 | ⬜ 실기기 캡처 권장 컷: ①카드 스와이프(전용 아트 카드) ②DAY 전환 컷 ③이브닝 챗 ④전술 피드/미니게임 |
| 개인정보처리방침 URL | ✅ `https://art-lyang.github.io/TIU-card/privacy.html` — **게시 전 연락처 이메일 2곳 기입** |
| 콘텐츠 등급 설문(IARC) | ⬜ 아래 초안 참고 |
| 비공개 테스트 (신규 개인계정: 테스터 12명·14일) | ⬜ |

## 앱 이름 (30자)

```
TERMINAL SESSION : 오라클 지휘 시뮬레이션
```

## 짧은 설명 (80자)

KO:
```
AI 오라클의 감시 아래, 카드 한 장으로 기지의 운명을 결정하라. 한국 SF 감시 스릴러 지휘 시뮬레이션.
```
EN:
```
Command a surveillance base under an AI's watchful eye. A Korean SF thriller told in card swipes.
```

## 전체 설명 (4000자 내)

KO:
```
[ORACLE 시스템 접속 승인 — 세션을 시작합니다]

당신은 강원도 해안의 격리 기지를 지휘하는 사령관입니다.
모든 결정은 카드 한 장. 왼쪽인가, 오른쪽인가.
그리고 그 모든 선택을, AI 'ORACLE'이 지켜보고 있습니다.

명령에 따를 것인가. 의심할 것인가.
따르면 안전하지만 무언가를 잃고, 거스르면 진실에 가까워지지만 위험해집니다.

■ 특징
- 카드 스와이프 지휘 시뮬레이션 — 자원, 부하, 신뢰, 그리고 ORACLE의 평가가 매 선택에 반응
- 31일의 시나리오, 4개의 국면(Act) — 도입에서 탈출까지 긴장이 단계적으로 고조
- 16종의 엔딩 — 순응, 회색지대, 저항, 관찰자… 당신의 누적된 선택이 결말을 결정
- 현장임무 미니게임 — 관제 화면으로 요원을 지휘하는 실시간 임무
- 이브닝 챗 — 매일 밤 간부 한 명과의 대화. 신뢰를 쌓으면 숨겨진 진실이 열림
- 조사 테이블과 아카이브 — 증거를 조합해 기지 밖의 세계를 재구성
- 클라우드 세이브(선택) — Google 로그인으로 기기 간 이어하기
- 오프라인 플레이 지원, 한국어/영어

광고 없음. 추적 없음. 오직 이야기.

[경고: ORACLE은 당신의 모든 결정을 기록합니다]
```

EN:
```
[ORACLE SYSTEM ACCESS GRANTED — session begins]

You command a quarantine base on Korea's eastern coast.
Every decision is a single card. Left, or right.
And every choice is watched by an AI called ORACLE.

Obey, and stay safe — but lose something each time.
Resist, and edge closer to the truth — at a price.

■ Features
- Card-swipe command sim — resources, crew, trust, and ORACLE's evaluation react to every choice
- A 31-day scenario across 4 acts, from quiet routine to desperate escape
- 16 endings shaped by your accumulated choices
- Real-time field missions on a tactical command feed
- Evening chats — one officer each night; earn trust, unlock the truth
- Evidence board & archive — piece together what's really happening outside
- Optional cloud save via Google sign-in
- Offline play, Korean & English

No ads. No tracking. Only the story.

[WARNING: ORACLE records every decision you make]
```

## IARC 콘텐츠 등급 설문 초안

솔직 응답 기준. 예상 결과: 만 12세+ (폭력 서술 기준에 따라 15세+ 가능).

| 질문 영역 | 답 | 근거 |
|---|---|---|
| 폭력 (묘사) | **예 — 텍스트 서술, 비사실적/간접적** | 전투·사망·부상이 텍스트로 서술됨. 그래픽 묘사 없음. 흑백 정지 이미지 |
| 유혈 | 아니오 | 고어 이미지 없음 |
| 성적 콘텐츠 | 아니오 | 없음 |
| 욕설 | 아니오 (경미한 표현 수준) | 강한 욕설 없음 |
| 약물/음주/흡연 | 아니오 (담배 묘사 카드 1장 — '예, 언급 수준' 선택 고려) | C-056 FOSTER 담배 언급 |
| 공포 요소 | 예 — 경미 | 감시/스릴러 긴장감, 점프스케어 없음 |
| 도박 | 아니오 | 없음 |
| 인앱 구매 | 아니오 | 유료 단건 판매 |
| 사용자 간 상호작용/UGC/채팅 | 아니오 | 싱글플레이 전용 |
| 위치 공유 | 아니오 | 권한 자체를 안 씀 |
| 개인정보 | 선택적 Google 로그인 (클라우드 세이브) | privacy.html 참조 |

## 데이터 안전 섹션 (Play Console)

- 수집: 이메일 주소·사용자 ID (선택 — 클라우드 세이브 로그인 시에만)
- 목적: 앱 기능(세이브 동기화)
- 공유: 없음 / 판매: 없음
- 암호화 전송: 예 (Firebase HTTPS)
- 삭제 요청 가능: 예 (privacy.html 문의 절차)
- 광고 ID: 사용 안 함

## 남은 순서

1. `TWA-RELEASE.md` 1단계 — Bubblewrap 패키징 (PC)
2. Play Console 앱 생성 → 비공개 테스트 트랙 업로드 (테스터 12명 모집, 14일)
3. 위 자료로 스토어 등록정보 작성 + IARC 설문
4. assetlinks.json 지문 교체 (`TWA-RELEASE.md` 3단계)
5. 테스트 기간 종료 → 프로덕션 승격
