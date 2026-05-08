# Release Checklist

릴리즈 빌드 전 순서대로 확인.

## Pre-release

- [ ] `release-qa-runner` 실행 → 전체 PASS
- [ ] `node tools/validator.js` → issue 0
- [ ] BUILD_VER 증가 (`index.html`의 `var BUILD_VER=N`)
- [ ] LICENSE 파일 존재 확인
- [ ] README.md License 섹션 최신 상태

## Content

- [ ] 카드 데이터 중복 ID 없음
- [ ] i18n 키 누락 없음 (`i18n-text-auditor` 통과)
- [ ] 에셋 참조 깨짐 없음 (`asset-reference-checker` 통과)
- [ ] 세이브/로드 3슬롯 정상 동작

## Deploy

- [ ] `git status` clean
- [ ] `git push origin main`
- [ ] GitHub Pages 배포 확인: https://art-lyang.github.io/TIU-card/
- [ ] 브라우저 콘솔 에러 없음 (메인 플로우 스모크 테스트)

## Store (해당 시)

- [ ] 배포용 zip 생성 → `_workspace/release/`
- [ ] 스크린샷/GIF 준비
- [ ] 스토어 페이지 텍스트 준비
