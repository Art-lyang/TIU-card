// TERMINAL SESSION — sfx-sources.js
// SFX 파일 경로 정의 + Act BGM 경로 정의
// 모든 오디오 파일은 audio/ 폴더에서 서빙

// Act별 BGM 경로 (bgm.js에서 사용)
var BGM_ACT1 = 'audio/act1_bg_sound.mp3';
var BGM_ACT2 = 'audio/act2_bg_sound.mp3';
var BGM_ACT3 = 'audio/act3_bg_sound.mp3';
var BGM_ACT4 = 'audio/act4_bg_sound.mp3';

// SFX 파일 경로 (app-init.js SFX._cache에서 Audio 객체로 로드)
var SFX_PATHS = {
  swipe:    'audio/card_swife_sound.wav',   // 카드 스와이프
  alarm:    'audio/alarm_tic.wav',          // LOG/아카이브 신규 해금
  btn_on:   'audio/button_on.wav',          // 열기/클릭/확정
  btn_off:  'audio/button_off.wav',         // 닫기/취소/실패
  check:    'audio/check_sound.wav',        // 증거 매칭 성공
  radio:    'audio/radio static noise.wav', // 뉴스/브리핑 통신 노이즈
  reload:   'audio/reload_3sec.wav',        // 현장 미션 시작
  rifle:    'audio/rifle.wav'               // 전투/게임오버
};
