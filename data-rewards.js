// TERMINAL SESSION — data-rewards.js
// 감시 선택 → 정보 해금 + ORACLE 거절 → 간접 보상 시스템

// ═══ 1번: 독립 조사/감시 선택 시 숨겨진 로그 해금 ═══
var RECON_TRIGGERS = {
  'C-006-left': 'LOG-RECON-P1',
  'C-008-left': 'LOG-RECON-D1',
  'C-011-left': 'LOG-RECON-P2',
  'C-014-left': 'LOG-RECON-S1',
  'C-032-left': 'LOG-RECON-P3',
  'C-141-left': 'LOG-RECON-L1'
};

// ═══ 3번: ORACLE 거절 시 다음 턴 스탯 보너스 (×5 적용) ═══
// msg: KO 토스트, msgEn: EN 토스트 (app.js의 pbMsg 조립 시 로케일 분기)
var REFUSAL_BONUSES = {
  'C-005-left': {t:1, msg:'팀이 독립 운영 체계를 갖춰가고 있습니다', msgEn:'The team is building an independent operations structure'},
  'C-015-left': {t:1, msg:'자동화 거부 — 팀 자율성 강화', msgEn:'Automation refused — team autonomy reinforced'},
  'C-035-left': {t:1,c:1, msg:'데이터 자주권 확보 — 팀 결속력 상승', msgEn:'Data sovereignty secured — team cohesion rising'},
  'C-036-left': {t:1, msg:'심리 평가 거부 — 요원 사기 회복', msgEn:'Psych evaluation refused — operative morale recovers'},
  'C-037-left': {msg:'불필요한 시스템 의존도를 줄였습니다', msgEn:'Unnecessary system dependence reduced'},
  'C-144-left': {t:1, msg:'독립 운영 유지 — 팀 신뢰도 상승', msgEn:'Independent operations preserved — team trust rises'}
};
