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
  swipe:    'audio/card_swipe_sound.mp3',   // 카드 스와이프
  alarm:    'audio/alarm_tic.mp3',          // LOG/아카이브 신규 해금
  btn_on:   'audio/button_on.mp3',          // 열기/클릭/확정
  btn_off:  'audio/button_off.mp3',         // 닫기/취소/실패
  check:    'audio/check_sound.mp3',        // 증거 매칭 성공
  radio:    'audio/radio_static_noise.mp3', // 뉴스/브리핑 통신 노이즈
  reload:   'audio/reload_3sec.mp3',        // 현장 미션 시작
  rifle:    'audio/rifle.mp3',              // 전투/게임오버
  glitch:   'audio/glitch_noise.mp3',       // ORACLE 에러/이상현상/세이프가드/체인
  reward:   'audio/reward_get.mp3',         // 보상 획득
  dialogue: 'audio/dialogue_blip.mp3',      // 이브닝/대사 블립
  news:     'audio/news_alert.mp3',         // 뉴스/알림
  seal_btn:    'audio/seal_button.mp3',     // 미니게임: 격리 봉인 시퀀스 버튼
  iso_door:    'audio/iso_door.mp3',        // 미니게임: 격리 완료(격리실 문)
  blaster:     'audio/blaster.mp3',         // 미니게임: 정밀 타격 통제 발포
  scan_signal: 'audio/scan_signal.mp3',     // 미니게임: 생체 반응 스캔 진행 루프
  table_open:  'audio/table_open.mp3',      // info-bar 시설/연구/조사 테이블 열기
  creature_amb:'audio/creature_ambient.mp3',// 변이체(SPEC) 미션 진입 앰비언트 루프
  gameover_doom:'audio/gameover_doom.mp3'   // 게임오버 — 총성 뒤 이어지는 무거운 드론 스팅
};
