# Codex 정리 감사 리포트 - 2026-05-08

## 백업

- 생성한 소스 백업: `_backups/TIU_CARD_pre_cleanup_source_20260508_235311.zip`
- 백업 제외: `.git`, `_backups`, `.claude/worktrees`
- 제외 이유: `.claude/worktrees`는 약 9GB 규모의 로컬 Claude 작업트리 복사본이며, 정식 런타임 소스가 아닙니다.

## 현재 런타임 스냅샷

| 항목 | 현재 값 |
|---|---:|
| BUILD_VER | 178 |
| 카드 | 고유 ID 541장 |
| 메인 체인 | 18 |
| 사건/후속 체인 | 10 |
| 미션 | 15 |
| 미니게임 연동 미션 | 9 |
| 증거 | 38 |
| 증거 조합 | 15 |
| 엔딩 | 16 |
| 아카이브 | 46 |

## 검증 명령 결과

```text
node tools/validator.js
  파일 로드 77 / 실패 0
  카드 541 / 고유 ID 541
  이슈 0

node tools/i18n-smoke.js
  i18n smoke ok

python tools/check_buttons.py
  실제 버튼 실패 0
  특수 무효과 경고 2: CA-OBS-PROTO, CH-007-5

python tools/diagnose_act4.py
  Act 4 카드 총 179장
  Act 4 무조건 데일리/필러 후보 44장
  Act 4 조건부 카드 123장

python tools/simulator_v3.py 20 all
  comply: 서사 엔딩 10.0%, 즉사 90.0%
  rebel: 서사 엔딩 0.0%, 즉사 100.0%
  careful: 서사 엔딩 85.0%, 타임아웃 15.0%
  explorer: 서사 엔딩 100.0%, 엔딩 A 100.0%
  newbie: 서사 엔딩 80.0%, 즉사 20.0%
```

브라우저 스모크:

- URL: `http://127.0.0.1:4173/index.html`
- 뷰포트: `390x844`
- 결과: 부트 화면 렌더링 정상, root 채워짐, 버튼 3개 표시, 콘솔 에러 0
- 콘솔 경고: 사용자 입력 전 부트 오디오가 차단됨. 브라우저 자동재생 정책으로 인한 정상 경고입니다.

## 적용한 수정

- `README.md`, `-setup/GDD/TIU-GAME-GDD-v11.md`, `-setup/MD/README.md`, `-setup/MD/TIU-ALPHA-CHANGELOG-2026-05-08.md`, `qa-report-2026-05-08.md`의 런타임 수치를 최신화했습니다.
- `HANDOFF.md`에 남아 있던 로컬 절대경로를 저장소 기준 상대 표현으로 바꿨습니다.
- 로컬 백업, Playwright 산출물, 임시 파일, output, test-result, Claude worktree가 실수로 커밋되지 않도록 `.gitignore`를 보강했습니다.

## 기능 점검 메모

### 엔딩

- 정적 validator 기준 엔딩 필수 LOG 생산 문제: 0건.
- 런타임 특수 엔딩 함수는 A, B, D, F, G와 즉사 C 계열, 탈출 E 계열을 지원합니다.
- `simulator_v3.py 20 all`에서 A, B, D, G, C_r, C_t, C_o, C_cs가 발생했습니다.
- 엔딩 F는 짧은 프로필 스윕에서는 발생하지 않았습니다. 도달 불가능하다는 뜻은 아니며, 조건이 더 엄격하므로 전용 루트 강제 테스트나 목표 플레이테스트가 필요합니다.

### 조사테이블

- `LOG-EV-UNLOCK`은 세션 한정 로그이며 Act 1 스냅샷에서는 정리됩니다.
- 조사테이블이 열리지 않은 상태로 Act 3 이상에 진입하면 fallback 해금 대화가 있습니다.
- `data-evidence.js`는 증거 38개와 조합 15개를 정의합니다.
- validator 기준 증거 출처 LOG 도달성 문제: 0건.

### 미션

- validator 기준 카드→미션 참조 깨짐: 0건.
- validator 기준 미션 노드 참조 깨짐: 0건.
- validator 기준 미니게임 참조 깨짐: 0건.
- 런타임은 active spec 시스템으로 활성 현장임무 수를 제한합니다.

### 세이브/로드

- 저장 경로는 stats, GI, act, actFlags, trust, logs, 사용한 대화, 사용한 이브닝, 시설 상태, active specs, 세션덱, 최근 뉴스/보상, 체인 큐, 현재 카드, 증거 조합을 보존합니다.
- 스냅샷 로드는 페이지 reload 없이 React state를 직접 복원하고, 저장된 현재 카드 또는 체인 큐에서 다시 그립니다.
- Act 1 스냅샷은 세션 한정 조사테이블 해금 상태를 제거하고, Act 2 이후 스냅샷은 보존합니다.

## 미사용 또는 용량 과다 후보

아래는 삭제 후보일 뿐이며, 실제 삭제는 하지 않았습니다.

| 후보 | 대략 크기 | 현재 사용 여부 | 원래 용도 추정 | 제거 위험 |
|---|---:|---|---|---|
| `.claude/worktrees/` | 약 9.1GB | 게임 런타임에서는 미사용. 일부는 이미 git history/index에 들어간 상태 | Claude Code 병렬 작업트리와 실험 브랜치 | 높음. 병합/보존 여부 확인 필요 |
| `output/` | 약 60.6MB | 런타임 미사용 | Playwright 스크린샷, QA 캡처, audit JSON, 디버그 산출물 | 런타임 기준 낮음, QA 이력 기준 중간 |
| 루트의 `_tmp*.jpg/html/js/spec/config` | 전체 2MB 미만 | `index.html`에서 미사용 | 수동 프리뷰 페이지, 스크린샷, i18n/브라우저 스모크 조각 | 유용한 스크린샷 보존 후 낮음 |
| `.playwright-cli/` | 작음 | 런타임 미사용 | 브라우저 자동화 스냅샷과 콘솔 로그 | 낮음 |
| `_i18n_check/` | 약 0.7MB | 런타임 미사용 | 과거 i18n 마이그레이션 번들/검사 산출물 | 번역 히스토리가 필요하면 중간 |
| `_local_untracked_backup_20260423_i18n/` | 작음 | 런타임 미사용 | 과거 로컬 i18n 백업 | 폐기 확인 전 중간 |
| `TEST/`, `TEST.zip` | 합산 약 26MB | 런타임 미사용 | 테스트용 복사본 또는 메인 메뉴 터미널 export | 외부 전달용이면 중간 |
| `test-results/`, `_tmp_test_results/` | 작음 | 런타임 미사용 | 테스트 러너 출력 | 낮음 |
| `d/` | 약 80MB | 현재 런타임 매핑에서 직접 참조되지 않음 | 압축된 `assets/images/`를 만들기 전 원본/소스 이미지 세트 | 향후 에셋 재생성이 필요하면 중간 |
| `assets/images/logos/*.png` | 약 4MB | 현재 문자 그대로의 런타임 참조는 없음 | 향후 스토어/브랜딩 자산 | 중간 |
| `assets/gameplay/choice_chevron_*.png` | 작음 | 현재 문자 그대로의 런타임 참조는 없음 | 이전 카드 선택 UI chevron | 낮음/중간. 삭제 전 시각 회귀 확인 |
| `assets/images/missions/`의 일부 대체 hero 파일 | 1MB 미만 | 현재 `images_p1.js`에서 일부 미참조 | 과거 미션 이미지 후보 | 중간. 선호 아트 확인 필요 |
| `advance_button.png`, `dialog_panel.png`, `news_panel.png`, `panel_frame_medium.png` 등 루트 legacy 프레임 PNG | 작음 | 일부는 literal scan에서 미참조 | 초기 UI 스킨 자산 | 중간. CSS/런타임 확인 후 삭제 |

## 추천 정리 순서

1. `.claude/worktrees/`를 repo 밖에 보관하거나 삭제해도 되는지 확인합니다.
2. 승인되면 실제 삭제 전에 `git rm --cached`로 `.claude/worktrees/`를 repository index에서 제거합니다.
3. 유용한 QA 스크린샷만 남기고 `output/`, `.playwright-cli/`, `_tmp*`를 이동 또는 삭제합니다.
4. `d/`가 소스 아트 보관소인지, 런타임 repo 밖으로 빼도 되는지 결정합니다.
5. 미참조 이미지 후보는 눈으로 확인한 뒤 삭제합니다.
6. 밸런스 변경 전 엔딩 F 전용 route-forcing 테스트를 추가합니다.
