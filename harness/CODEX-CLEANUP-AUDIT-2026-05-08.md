# Codex 정리 감사 리포트 - 2026-05-08

## 백업

- 생성한 소스 백업: `_backups/TIU_CARD_pre_cleanup_source_20260508_235311.zip`
- 백업 제외: `.git`, `_backups`, `.claude/worktrees`
- 제외 이유: `.claude/worktrees`는 대용량 로컬 병렬 작업 복사본이며 정식 게임 런타임 소스가 아닙니다.

## 현재 프로젝트 상태

| 항목 | 현재 값 |
|---|---:|
| BUILD_VER | 178 |
| 카드 | 고유 ID 541장 |
| 메인 체인 | 18 |
| 사건/연속 체인 | 10 |
| 미션 | 15 |
| 미니게임 연동 미션 | 9 |
| 증거 | 38 |
| 증거 조합 | 15 |
| 엔딩 | 16 |
| 아카이브 | 46 |

## 이번 후속 정리

- `.claude/worktrees/` 4,461개 파일을 git index에서만 제거했습니다.
- 로컬 `.claude/worktrees/` 폴더는 삭제하지 않았습니다.
- `git ls-files .claude/worktrees` 결과는 0개입니다.
- `.gitignore`의 `.claude/worktrees/` 규칙으로 이후 재추적을 막았습니다.
- 엔딩 분기 조건을 직접 검증하는 `tools/check_ending_routes.js`를 추가했습니다.

## 검증 명령 결과

```text
node tools/check_ending_routes.js
  11/11 통과
  A/B/D/F/G 특수 엔딩 분기 확인
  F 승인 Observer 루트 통과
  F 미승인 Observer 루트 통과
  Observer 로그가 없을 때 F 미발생 확인
  Act 2에서는 특수 엔딩 미발생 확인

node tools/validator.js
  파일 로드 77 / 실패 0
  카드 541 / 고유 ID 541
  이슈 0건

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
  A/B/D/G 및 즉사/시사 계열 엔딩 발생 확인
  F는 짧은 자동 스윕에서는 자연 발생하지 않아 전용 조건 검증으로 보강
```

브라우저 스모크:

- URL: `http://127.0.0.1:4173/index.html`
- 뷰포트: `390x844`
- 결과: 부트 화면 정상 렌더, root 채워짐, 버튼 3개 표시, 콘솔 오류 0
- 콘솔 경고: 사용자 입력 전 오디오 자동재생 차단 경고만 확인

## 엔딩 분기 메모

- 정적 validator 기준 엔딩 필수 LOG 생산 문제는 0건입니다.
- `chkSpecialEnding()`의 A/B/D/F/G 분기 조건은 `tools/check_ending_routes.js`에서 직접 확인했습니다.
- 엔딩 F는 일반 20회 자동 스윕에서는 나오지 않았지만, 조건 자체는 발생 가능합니다.
- 검증된 F 경로:
  - `LOG-012` + `LOG-OBSERVER-01` + `LOG-OBSERVER-APPROVED`, day 28 이상, GI 0 이하
  - `LOG-012` + `LOG-OBSERVER-01`, day 33 이상, GI -20 이하, 고신뢰 캐릭터 2명 이상
- 이번 검증은 조건식 검증입니다. 실제 플레이 감각과 발생 빈도는 별도 플레이테스트로 판단해야 합니다.

## 조사테이블, 미션, 세이브 메모

- 조사테이블 증거 38개와 조합 15개가 정의되어 있습니다.
- validator 기준 증거 출처 LOG 미도달 문제는 0건입니다.
- 카드에서 미션으로 가는 참조 깨짐은 0건입니다.
- 미션 노드 참조 깨짐은 0건입니다.
- 미니게임 연동 참조 깨짐은 0건입니다.
- 세이브는 stats, GI, act, actFlags, trust, logs, 사용자 설정, 아카이브, 시설 상태, active specs, 세션팩, 최근 뉴스/보상, 체인 상태, 현재 카드, 증거 조합을 보존합니다.
- 로드 시 React state를 직접 복원하고 저장된 현재 카드 또는 체인 카드에서 다시 그립니다.
- Act 1 로드에서는 이전 세션 조사테이블 해금 상태를 제거하고, Act 2 이후 로드에서는 보존합니다.

## 미사용 또는 용량 과다 후보

아래 항목은 제거 후보입니다. 실제 삭제 여부는 사용자 판단 후 진행합니다.

| 후보 | 현재 사용 여부 | 원래 용도 추정 | 제거 위험 |
|---|---|---|---|
| `.claude/worktrees/` | 게임 런타임 미사용. git 추적 해제 완료, 로컬 보존 | Claude Code 병렬 작업트리와 실험 브랜치 복사본 | 로컬 병합/참고 여부 확인 전 실제 삭제는 위험 |
| `output/` | 런타임 미사용 | Playwright 스크린샷, QA 캡처, 감사 JSON, 디버그 산출물 | 낮음. 보관 가치가 있으면 외부 백업 후 삭제 |
| 루트의 `_tmp*.jpg/html/js/spec/config` | `index.html`에서 미참조 | 수동 미리보기, 스크린샷, i18n/브라우저 스모크 조각 | 낮음 |
| `.playwright-cli/` | 런타임 미사용 | 브라우저 자동화 오류/콘솔 로그 | 낮음 |
| `_i18n_check/` | 런타임 미사용 | 과거 i18n 마이그레이션 검수 산출물 | 번역 이력 필요 시 중간 |
| `_local_untracked_backup_20260423_i18n/` | 런타임 미사용 | 과거 로컬 i18n 백업 | 내용 확인 후 중간 |
| `TEST/`, `TEST.zip` | 런타임 미사용 | 테스트용 복사본 또는 메인 메뉴 export | 내부 산출물 확인 전 중간 |
| `test-results/`, `_tmp_test_results/` | 런타임 미사용 | 테스트 러너 출력 | 낮음 |
| `d/` | 현재 코드 직접 참조 없음 | 정식 `assets/images/`를 만들기 전의 원본/소스 이미지 세트 | 이후 자산 재생성이 필요하면 중간 |
| `assets/images/logos/*.png` | 현재 코드 직접 참조 없음 | 향후 스토어/브랜드 자산 | 중간 |
| `assets/gameplay/choice_chevron_*.png` | 현재 코드 직접 참조 없음 | 이전 카드 선택 UI chevron | 낮음/중간. 삭제 전 시각 회귀 확인 |
| `assets/images/missions/` 일부 대체 hero 파일 | 일부 미참조 | 과거 미션 이미지 후보 | 중간. 선호 아트 확인 필요 |
| 루트 legacy 프레임 PNG | 일부 literal scan에서 미참조 | 초기 UI 스킨 자산 | 중간. CSS/이미지 레지스트리 재확인 후 삭제 |

## 추천 정리 순서

1. 이미 완료: `.claude/worktrees/`를 git index에서 제거하고 ignore 처리.
2. 사용자 확인 후: 로컬 `.claude/worktrees/`를 보관할지 삭제할지 결정.
3. `output/`, `.playwright-cli/`, `_tmp*`, `test-results/`는 QA 산출물 보관 정책을 정한 뒤 정리.
4. `d/`는 원본 자산 보관소인지 확인한 뒤 repo 밖으로 옮길지 결정.
5. 미참조 이미지 후보는 브라우저 시각 회귀 확인 후 제거.
6. 엔딩 F는 조건식 통과 상태이므로, 다음 단계에서는 실제 플레이 루트에서 발생 빈도와 발견 가능성을 조정.
