// data-facility-2.js — 시설 확장 자원 카드 + 커버 스토리 + 상태 판정
// Depends on: data-facility.js (FACILITY_EXPANSIONS), data-core.js (ORACLE_LOGS)

// ── 확장 완료 후 추가되는 자원 카드 ──
var CARDS_FACILITY = [
  // FE-001: 저온 냉동고
  { id: "C-FE001-A", act: [1,2,3], feReq: "FE-001", tag: "fe001a", msg: "윤세진: 냉동고 샘플 분석 결과가 나왔습니다.\n\n\"Phase 0 감염체의 세포 활성이 예상보다 높습니다.\n추가 냉각이 필요할 수 있습니다.\"", bg: "research",
    left: { label: "냉각 강화", fx: { c: 0, r: -1, t: 0, o: 1 }, g: -1 },
    right: { label: "현재 온도 유지", fx: { c: 0, r: 0, t: 1, o: 0 }, g: 0 } },
  { id: "C-FE001-B", act: [1,2,3], feReq: "FE-001", tag: "fe001b", msg: "임재혁: 냉동고 냉각 시스템 점검 완료.\n\n\"전력 소모가 예상보다 15% 높습니다.\n절전 모드를 적용하면 자원을 아낄 수 있지만, 냉각 효율이 떨어집니다.\"", bg: "supply",
    left: { label: "절전 모드 적용", fx: { c: 0, r: 1, t: 0, o: 0 }, g: 0 },
    right: { label: "최대 냉각 유지", fx: { c: 0, r: -1, t: 0, o: 1 }, g: -1 } },

  // FE-002: 야외 훈련장
  { id: "C-FE002-A", act: [1,2,3], feReq: "FE-002", tag: "fe002a", msg: "강도윤: 야외 훈련장 보고.\n\n\"요원들 체력이 눈에 띄게 올랐습니다.\n다만 훈련 중 소음이 민간 지역까지 들릴 수 있습니다.\"", bg: "default",
    left: { label: "야간 훈련으로 전환", fx: { c: 0, r: 0, t: 1, o: 0 }, g: 0 },
    right: { label: "주간 훈련 유지", fx: { c: 1, r: 0, t: 0, o: -1 }, g: -1 } },

  // FE-003: 센서 어레이
  { id: "C-FE003-A", act: [1,2,3], feReq: "FE-003", tag: "fe003a", msg: "센서 어레이 자동 경보:\n\n\"봉쇄선 동측 300m 지점에서 비정상 열원 감지.\n기존 센서로는 탐지 불가능했던 소형 개체입니다.\"", bg: "default",
    left: { label: "원격 관측만", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 },
    right: { label: "조사팀 파견", fx: { c: 1, r: -1, t: 0, o: 1 }, g: 1 } },

  // FE-004: 의무실 확장
  { id: "C-FE004-A", act: [1,2,3], feReq: "FE-004", tag: "fe004a", msg: "의무실 격리동 보고:\n\n\"격리 환자 2명의 상태가 안정되었습니다.\n확장된 장비 덕분에 정밀 검사가 가능해졌습니다.\"", bg: "default",
    left: { label: "퇴원 처리", fx: { c: 0, r: 0, t: 1, o: 0 }, g: 0 },
    right: { label: "관찰 연장", fx: { c: 0, r: -1, t: 0, o: 1 }, g: 0 } },

  // FE-005: 보급로 확장
  { id: "C-FE005-A", act: [2,3], feReq: "FE-005", tag: "fe005a", msg: "2차 보급로 운영 보고:\n\n\"산악 경로를 통한 물자 수송이 정상 가동 중입니다.\n다만 기상 악화 시 통행이 위험합니다.\"", bg: "supply",
    left: { label: "안전 우선 (감속)", fx: { c: 0, r: 0, t: 1, o: 0 }, g: 0 },
    right: { label: "수송량 유지", fx: { c: 0, r: 1, t: 0, o: 0 }, g: 0 } },
  { id: "C-FE005-B", act: [2,3], feReq: "FE-005", tag: "fe005b", msg: "보급 담당관:\n\n\"2차 보급로 덕분에 비상 식량 비축이 가능해졌습니다.\n추가 비축분을 확보하겠습니까?\"", bg: "supply",
    left: { label: "현행 유지", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 },
    right: { label: "추가 비축 승인", fx: { c: 0, r: 2, t: 0, o: -1 }, g: 0 } },

  // FE-006: CCTV 교체
  { id: "C-FE006-A", act: [2,3], feReq: "FE-006", tag: "fe006a", msg: "AI CCTV 경보:\n\n\"기존 시스템으로는 감지 불가능했던 패턴을 포착했습니다.\n봉쇄 구역 내 미세 움직임이 증가하고 있습니다.\"", bg: "default",
    left: { label: "경계 단계 상향", fx: { c: 1, r: 0, t: 0, o: 0 }, g: 0 },
    right: { label: "데이터 수집 후 판단", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 1 } },

  // FE-007: 비상 벙커
  { id: "C-FE007-A", act: [2,3], feReq: "FE-007", tag: "fe007a", msg: "벙커 관리 보고:\n\n\"비상 대피 시설 점검 완료. 수용 인원 20명, 비상 물자 72시간분.\n정기 점검 주기를 결정해주십시오.\"", bg: "default",
    left: { label: "월 1회", fx: { c: 0, r: 0, t: 1, o: 0 }, g: 0 },
    right: { label: "주 1회 (자원 소모)", fx: { c: 1, r: -1, t: 0, o: 0 }, g: 0 } },

  // FE-008: 순찰 확장
  { id: "C-FE008-A", act: [1,2,3], feReq: "FE-008", tag: "fe008a", msg: "강도윤: 확장 순찰 보고.\n\n\"북측 능선에서 새로운 관측점을 확보했습니다.\n봉쇄 구역 전체를 조망할 수 있는 위치입니다.\"", bg: "default",
    left: { label: "관측점 유지", fx: { c: 1, r: 0, t: 0, o: 0 }, g: 0 },
    right: { label: "전진 초소 설치", fx: { c: 2, r: -1, t: 0, o: 0 }, g: -1 } }
];

// ── 민간 위장 커버 스토리 LOG ──
var COVER_LOGS = [
  { id: "LOG-COVER-001", title: "민간 위장 — 냉동 창고", content: "[민간 기록]\n\n강원 산간 냉동 창고 업체 '설악 콜드체인'\n시설 증축 허가 승인\n\n용도: 농수산물 저온 보관\n공사 기간: 약 2주\n\n[실제: ORACLE 한국지부 B2 저온 냉동고 확장]" },
  { id: "LOG-COVER-002", title: "민간 위장 — 산악 훈련장", content: "[민간 기록]\n\n국유림 관리소, 산악 훈련장 조성 공사 착수\n\n목적: 산악 구조대 훈련 시설\n위치: 강원 산간 국유림 인접 부지\n\n[실제: ORACLE 한국지부 야외 훈련장 설치]" },
  { id: "LOG-COVER-003", title: "민간 위장 — 임도 정비", content: "[민간 기록]\n\n강원도, 임도(林道) 정비 사업 착수\n\n구간: 산간 마을 연결 임도 3.2km\n목적: 산림 자원 운반 효율 개선\n\n[실제: ORACLE 한국지부 2차 보급로 개설]" }
];

// ── 시설 상태 판정 (데일리 리포트용) ──
function getFacilityStatusLines(stats, completedFE, approvedFE) {
  var lines = [];
  var comp = completedFE || [];
  var appr = approvedFE || [];

  // 스탯 기반 경고
  if (stats.c <= 15) lines.push({ text: "보안실 — 침투 위험 [CRITICAL]", color: "red", blink: true });
  else if (stats.c <= 25) lines.push({ text: "보안실 — 봉쇄 불안정 경고", color: "orange" });

  if (stats.r <= 15) lines.push({ text: "보급 창고 — 비축량 고갈 [CRITICAL]", color: "red", blink: true });
  else if (stats.r <= 30) lines.push({ text: "보급 창고 — 자원 부족 경고", color: "orange" });

  if (stats.t <= 15) lines.push({ text: "체력단련실 — 인원 이탈 위험", color: "red" });
  else if (stats.t <= 25) lines.push({ text: "휴게실 — 사기 저하", color: "orange" });

  if (stats.o <= 30) lines.push({ text: "통신실 — ORACLE 통신 불안정", color: "orange" });

  // 확장 완료 표시
  comp.forEach(function(feId) {
    var fe = FACILITY_EXPANSIONS.filter(function(f) { return f.id === feId; })[0];
    if (fe) lines.push({ text: fe.name + " — 가동 중 ✓", color: "green" });
  });

  // 승인 대기 표시
  appr.forEach(function(feId) {
    if (comp.indexOf(feId) >= 0) return;
    var fe = FACILITY_EXPANSIONS.filter(function(f) { return f.id === feId; })[0];
    if (fe) lines.push({ text: fe.name + " — 확장 대기 중", color: "gray" });
  });

  // 정상 상태
  if (lines.length === 0) lines.push({ text: "전 구역 정상 가동", color: "green" });

  return lines;
}

// ── 시설 완료 후 추가 보상 카드 (REWARDS 풀 확장) ──
var REWARDS_FACILITY_BONUS = [
  { id: "RF-001", feReq: "FE-001", title: "냉동고 연구 데이터", desc: "저온 보관 샘플에서 새로운 분석 결과를 확보합니다.",
    benefit: "평가 +10", cost: "자원 -5", fx: { c: 0, r: -1, t: 0, o: 2 } },
  { id: "RF-002", feReq: "FE-002", title: "전투 태세 강화", desc: "훈련장 요원들의 대응력이 향상되었습니다.",
    benefit: "봉쇄 +10, 신뢰 +5", cost: "자원 -5", fx: { c: 2, r: -1, t: 1, o: 0 } },
  { id: "RF-003", feReq: "FE-003", title: "센서 경보 분석", desc: "고감도 센서가 새로운 패턴을 포착했습니다.",
    benefit: "봉쇄 +10, 평가 +5", cost: "", fx: { c: 2, r: 0, t: 0, o: 1 } },
  { id: "RF-004", feReq: "FE-004", title: "격리동 의료 보고", desc: "격리동의 정밀 검사로 감염 대응력이 개선됩니다.",
    benefit: "신뢰 +10", cost: "자원 -5", fx: { c: 0, r: -1, t: 2, o: 0 } },
  { id: "RF-005", feReq: "FE-005", title: "2차 보급로 물자", desc: "산악 경로를 통한 추가 물자가 도착했습니다.",
    benefit: "자원 +15", cost: "봉쇄 -5", fx: { c: -1, r: 3, t: 0, o: 0 } },
  { id: "RF-006", feReq: "FE-006", title: "AI 감시 보고서", desc: "AI CCTV가 분석한 행동 패턴 보고서입니다.",
    benefit: "봉쇄 +10, 평가 +5", cost: "", fx: { c: 2, r: 0, t: 0, o: 1 } },
  { id: "RF-007", feReq: "FE-007", title: "벙커 비축품 점검", desc: "비상 벙커의 비축 물자를 점검하고 보충합니다.",
    benefit: "신뢰 +5, 봉쇄 +5", cost: "자원 -5", fx: { c: 1, r: -1, t: 1, o: 0 } },
  { id: "RF-008", feReq: "FE-008", title: "전진 관측 보고", desc: "확장 순찰로에서 수집한 정보를 분석합니다.",
    benefit: "봉쇄 +15", cost: "자원 -5", fx: { c: 3, r: -1, t: 0, o: 0 } }
];

// ORACLE_LOGS에 커버 스토리 추가 (data-core.js 이후 로드됨)
if (typeof ORACLE_LOGS !== 'undefined') {
  COVER_LOGS.forEach(function(log) { ORACLE_LOGS.push(log); });
}
