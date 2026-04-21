# TERMINAL SESSION (TIU-CARD)

> Reigns × Suzerain × SCP, in a Korean AI-surveillance setting.
>
> **장르**: 하이브리드 — 카드 스와이프 의사결정 + 텍스트 어드벤처
> **빌드**: BUILD_VER=22 (v1.0 출시 준비 마일스톤)
> **배포**: https://art-lyang.github.io/TIU-card/

---

## 한 줄 요약

ORACLE이 배정한 임무를 수행하는 Proxy Network 요원으로서, 카드 스와이프로 기지 운영 판단을 내리고 텍스트 어드벤처로 현장 임무를 수행한다. **당신의 모든 선택은 자유의지인가, 유도된 복종인가.**

---

## 핵심 콘텐츠

| 항목 | 수치 |
|---|---|
| 카드 | 486장 |
| 엔딩 | 15종 (서사 8 + 즉사 4 + escape 3) |
| 등장 인물 | 8명 (내부 5 + 프로메테우스 3) |
| 시설 확장 | 16개 (기본 11 + uprising 5) |
| 현장 미션 | 15개 |
| 이브닝 챗 | 약 120~150 씬 (신뢰도 4구간 × 4인 × Act별 변형) |
| 업적 | 29개 (Steam steamId 매핑 완료) |
| BGM | 6 트랙 |
| 1회차 플레이 | 약 5~8시간 |
| 100% 클리어 | 약 20~30시간 |

---

## 기술 스택

- **프론트엔드**: React 18 (CDN) + vanilla JS/CSS
- **빌드**: 정적 HTML — 빌드 시스템 없음
- **배포**: GitHub Pages
- **저장**: localStorage (다중 슬롯 3개 + NG+ 영속 데이터)
- **모바일 대응**: viewport 메타 + 터치 스와이프 + Apple Web App

## 실행 방법

### 로컬 개발

```bash
# Python 정적 서버
python -m http.server 8080
# → http://localhost:8080
```

### 프로덕션

`index.html` 단일 진입점, 정적 자산만으로 동작. 어떤 정적 호스팅(GitHub Pages / Netlify / Vercel)에도 배포 가능.

---

## 디렉토리 구조

```
TIU-card/
├── index.html                    — 진입점 (BUILD_VER=22)
├── style.css, style-glitch.css   — 스타일
├── app*.js                       — React 앱 로직
├── components-*.js               — UI 컴포넌트 (13개)
├── data-*.js                     — 게임 데이터 (60+ 파일, 200줄 룰)
├── images*.js, img/              — 이미지 자산 (base64 + PNG 34장)
├── bgm*.js, *.mp3                — BGM (6 트랙)
├── HANDOFF.md                    — 다음 작업 세션 인수인계
│
├── field-mission/                — Act4 탈출 미니게임 (인라인 iframe, 7.1MB)
│   ├── index.html                — 미니게임 진입점
│   ├── css/style.css
│   ├── js/                       — 17개 (sectors, config, escape-state, node-map, mutants, flow 등)
│   └── assets/                   — 배경, 라이플 스프라이트, bound_shellwalker 프레임
│
├── -setup/                       — 디자인 문서
│   ├── GDD/
│   │   ├── TIU-GAME-GDD-v10.md   — ★ 최신 GDD (v1.0)
│   │   ├── TIU-GAME-GDD-v05.md   — v0.9 (이전)
│   │   └── TIU-GAME-GDD.md       — v0.7 요약본
│   ├── MD/
│   │   ├── TIU-ALPHA-CHANGELOG.md — ★ 마일스톤 체인지로그
│   │   ├── act-structure/        — Act 구조 설계
│   │   ├── card-design/          — 카드 디자인 가이드
│   │   └── storyline/            — 캐논 스토리라인
│   └── QA-Review/
│       └── GAMEPLAY-REVIEW.md
│
└── tools/                        — Python QA 도구
    ├── validator.py              — ID 중복/체인 참조/LOG 검증
    ├── simulator.py              — 몬테카를로 v1
    ├── simulator_v2.py           — v2 (전략 시뮬)
    ├── diagnose_act4.py          — Act4 카드 풀 진단
    └── check_buttons.py          — 버튼 작동성 검사
```

---

## 출시 로드맵 요약

| 단계 | 작업 | 기간 |
|---|---|---|
| **현재** | BUILD_VER=22, 콘텐츠 90% | — |
| **M1~M2** | itch.io 한국어 데모 + 피드백 + i18n 시스템 도입 | 2개월 |
| **M2~M5** | 영어 번역 + 일러스트 30~50장 + Steam 페이지 등록 | 3개월 |
| **M5~M7** | 트레일러 + 캡슐 그래픽 + Steam Next Fest 데모 | 2개월 |
| **M7~M9** | 베타 테스트 + UI/UX 폴리시 | 2개월 |
| **M9~M12** | ★ Steam 정식 출시 ($7.99) + itch.io 동시 발매 (₩5,000) ★ | — |

상세 계획은 [GDD v1.0](-setup/GDD/TIU-GAME-GDD-v10.md) §7 참조.

---

## 가격 권장 (출시 시)

| 시나리오 | itch.io | Steam |
|---|---|---|
| A: 한국어만 | ₩3,000 (PWYW) | $4.99 |
| **B: 한·영, 일러스트 30장** ★권장 | **₩5,000** | **$7.99** |
| C: 한·영·일, 풀 폴리시 | ₩7,000 | $12.99 |

---

## 비교 작품

- **Reigns** 시리즈 (Nerial) — 카드 스와이프 메커닉 원조
- **Suzerain** (Torpor Games) — 텍스트 위주 정치 시뮬, 다국어 성공 사례
- **Yes, Your Grace** — 픽셀 일러스트 + 분기 결정
- **Replica** (somi, 한국) — 한국 인디 메타 호러 직접 벤치마크
- **Pony Island / Doki Doki** — 메타 내러티브/4번째 벽 깨기

차별점: **AI 감시 + 메타 내러티브** + **8개 엔딩 회차 분기 (CA-001B 메타 진입)** + **시설 빌딩 + 조사 테이블** RPG 요소 결합

---

## 관련 문서

| 문서 | 위치 | 용도 |
|---|---|---|
| GDD v1.0 (최신) | [`-setup/GDD/TIU-GAME-GDD-v10.md`](-setup/GDD/TIU-GAME-GDD-v10.md) | 종합 게임 디자인 |
| 알파 체인지로그 | [`-setup/MD/TIU-ALPHA-CHANGELOG.md`](-setup/MD/TIU-ALPHA-CHANGELOG.md) | 마일스톤별 변경 |
| 작업 인수인계 | [`HANDOFF.md`](HANDOFF.md) | 다음 세션 시작 가이드 |
| 카드 디자인 가이드 | [`-setup/MD/card-design/TIU-CARD-DESIGN-GUIDE.md`](-setup/MD/card-design/TIU-CARD-DESIGN-GUIDE.md) | 카드 작성 규칙 |
| 캐논 스토리라인 | [`-setup/MD/storyline/`](-setup/MD/storyline/) | 세계관 자료 |

---

## 라이선스 / 저작권

(미정 — 출시 전 결정)

---

*Built with Claude Code · Last updated: 2026-04-20*
