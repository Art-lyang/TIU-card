// appintoss/config.js — 앱인토스 빌드 전용 설정 (export-appintoss.mjs가 산출본에 주입)
// 루트(웹/itch/APK) 빌드에는 로드되지 않는다. 분기는 window.TIU_TOSS_BUILD 하나만 본다.
window.TIU_TOSS_BUILD = true;
window.TIU_TOSS_CONFIG = {
  appName: 'tiu-terminal-session',        // 콘솔 appName (수정 불가 고유 ID)
  // M4: 비소모성 IAP '본편 인가 코드'. web-bridge의 createOneTimePurchaseOrder 사용 예정.
  productFullUnlock: 'full_version_unlock',
  // 네이티브 저장소 키: STORAGE_PREFIX + (익명키 hash 앞 16자). 유저키는 로그인 후 채워진다.
  storagePrefix: 'tiu-save/',
  // 게임센터 점수: 누적 관리 일수(전 회차 day 합산). 소수점 없음 → 정수 문자열 제출.
  leaderboardScore: 'cumulative-days',
  // 행동 분석 eventLog 이름 프리픽스
  logPrefix: 'ts'
};
