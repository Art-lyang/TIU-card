// TERMINAL SESSION — demo-flag.js
// 데모 빌드 플래그. 기본 OFF — itch 론칭 시점에 아래 한 줄을 true 기본으로 뒤집는다.
// 테스트: URL ?demo=1 로 데모 게이트 활성화. (론칭 후에는 ?full=1 해제 오버라이드 예정)
// itch 익스포트(tools/export-itch.mjs)와 앱 빌드(app-android/sync-www.mjs)는 이 파일을 고정값으로 스텁한다.
window.TS_DEMO=/[?&]demo=1/.test(location.search);
