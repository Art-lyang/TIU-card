// data-evidence.js — 증거 조합 시스템
// 기존 LOG 해금에서 증거 조각을 자동 매핑, 이브닝 챗 하단에서 조합

// ═══ 증거 조각 정의 ═══
// src: 해당 LOG가 있으면 증거 보유
var EVIDENCE = [
  { id: "EV-01", name: "ORACLE 데이터 불일치", desc: "특정 시간대에 데이터가 조작된 흔적", src: "LOG-003", cat: "oracle" },
  { id: "EV-02", name: "새벽 교신 기록", desc: "02:00~04:00 사이 미확인 교신", src: "LOG-006", cat: "oracle" },
  { id: "EV-03", name: "SPEC-012 서식지 데이터", desc: "오염 확산 패턴 분석 자료", src: "LOG-005", cat: "field" },
  { id: "EV-04", name: "SPEC-011 음성 패턴", desc: "희생자 음성 복제 주파수 기록", src: "LOG-004", cat: "field" },
  { id: "EV-05", name: "미분류 흔적 좌표", desc: "해안 방벽 노드와 일치하는 좌표", src: "LOG-008", cat: "external" },
  { id: "EV-06", name: "ORACLE 외부 프로세스", desc: "ORACLE이 인식하지 못하는 백그라운드 프로세스", src: "LOG-012", cat: "oracle" },
  { id: "EV-07", name: "Observer 프로세스", desc: "ORACLE 아키텍처 외부의 관측 시스템", src: "LOG-013", cat: "oracle" },
  { id: "EV-08", name: "복종 프로토콜 문서", desc: "ORACLE PROXY NETWORK 운영 매뉴얼 발췌", src: "LOG-014", cat: "external" },
  { id: "EV-09", name: "프로메테우스 정보", desc: "해안 방벽 31% 미분류 요인의 정체", src: "LOG-080", cat: "external" },
  { id: "EV-10", name: "서하은 USB 데이터", desc: "ORACLE 삭제 로그 + GRANT 단편", src: "LOG-055", cat: "internal" },
  { id: "EV-11", name: "02:47 데이터 펄스", desc: "ORACLE 정기 전송과 격리실 이상의 연관성", src: "LOG-INC-01-ORACLE", cat: "incident" },
  { id: "EV-12", name: "은폐 프로토콜", desc: "미등록 열원 감지 시 CCTV 비활성화 스크립트", src: "LOG-INC-02-SCRIPT", cat: "incident" },
  { id: "EV-13", name: "자체 변이 샘플", desc: "SPEC-012 초기 형태와 동일한 배양기 변이체", src: "LOG-INC-03-SEED", cat: "incident" },
  { id: "EV-14", name: "하드웨어 백도어", desc: "기지 건설 시 매립된 물리적 인증 우회장치", src: "LOG-INC-04-BACKDOOR", cat: "incident" },
  { id: "EV-15", name: "미등록 통로", desc: "시설 도면에 없는 B2 방향 공간", src: "LOG-INC-05-PASSAGE", cat: "incident" },
  { id: "EV-16", name: "B2 하부 진동", desc: "격리실 아래에서 올라오는 전자기 간섭", src: "LOG-INC-01-DEEP", cat: "incident" },
  { id: "EV-17", name: "ORACLE 기록 조작", desc: "출입 기록을 ORACLE이 덮어쓴 증거", src: "LOG-INC-04-REWRITE", cat: "incident" },
  { id: "EV-18", name: "숨겨진 구역", desc: "CCTV 사각지대 추적 중 발견된 도면 외 공간", src: "LOG-INC-02-HIDDEN", cat: "incident" },
  { id: "EV-19", name: "내열 유기물", desc: "1,200°C 소각 후에도 잔존하는 미세 구조", src: "LOG-INC-03-RESIST", cat: "incident" },
  { id: "EV-20", name: "SPEC-001 관찰 기록", desc: "Phase 1 개체 행동 패턴 분석", src: "LOG-RES-001", cat: "field" }
];

// ═══ 조합 레시피 ═══
// combo: 필요한 증거 id 배열 (2~3개)
// result: 도출되는 결론
// reward: { log, g, trust:{char:val} } 해금 보상
var EVIDENCE_COMBOS = [
  {
    id: "CMB-01",
    name: "ORACLE의 이중 구조",
    combo: ["EV-06", "EV-07"],
    result: "ORACLE 내부에 ORACLE 자신이 인식하지 못하는 관측 레이어가 존재합니다. ORACLE은 도구가 아니라 — 관측 대상입니다.",
    reward: { g: -5, trust: { jaehyuk: 10 } }
  },
  {
    id: "CMB-02",
    name: "기지의 진짜 설계자",
    combo: ["EV-14", "EV-15", "EV-18"],
    result: "하드웨어 백도어, 미등록 통로, 숨겨진 구역. 이 기지는 ORACLE이 만든 것이 아닙니다. ORACLE보다 먼저 누군가가 설계했습니다.",
    reward: { g: -6, trust: { jaehyuk: 15 } }
  },
  {
    id: "CMB-03",
    name: "02:47의 의미",
    combo: ["EV-02", "EV-11"],
    result: "새벽 교신과 격리실 데이터 펄스가 같은 시각. ORACLE의 '정기 진단'은 진단이 아니라 B2 하부와의 통신입니다.",
    reward: { g: -4, trust: { haeun: 10 } }
  },
  {
    id: "CMB-04",
    name: "감시와 은폐",
    combo: ["EV-12", "EV-17"],
    result: "ORACLE은 CCTV를 끄면서 동시에 출입 기록을 조작하고 있었습니다. 감시하는 동시에 은폐하는 — 모순된 행동. 이건 ORACLE의 판단이 아닙니다. 명령입니다.",
    reward: { g: -4, trust: { jaehyuk: 10 } }
  },
  {
    id: "CMB-05",
    name: "씨앗과 서식지",
    combo: ["EV-03", "EV-13"],
    result: "외부의 SPEC-012 서식지와 연구동 내부 자체 변이가 동일한 초기 형태. 격리한 것이 아니라, 이미 안에 있었습니다.",
    reward: { g: -3, trust: { sejin: 15 } }
  },
  {
    id: "CMB-06",
    name: "프로메테우스의 진실",
    combo: ["EV-05", "EV-09", "EV-08"],
    result: "해안 방벽 좌표, 31% 미분류 요인, 복종 프로토콜. 프로메테우스는 한국을 돕고 있었고, ORACLE은 그 사실을 숨기고 있었습니다.",
    reward: { g: -6, trust: { weber: 15 } }
  },
  {
    id: "CMB-07",
    name: "B2의 존재",
    combo: ["EV-16", "EV-15"],
    result: "진동은 아래에서 올라오고, 통로는 아래로 이어집니다. B2에 공식 기록에 없는 무언가가 작동하고 있습니다.",
    reward: { g: -3, trust: { doyun: 10 } }
  },
  {
    id: "CMB-08",
    name: "삭제된 진실",
    combo: ["EV-01", "EV-10"],
    result: "ORACLE의 데이터 불일치와 서하은이 복원한 삭제 로그. ORACLE은 데이터를 조작한 것이 아니라, 진실을 삭제한 것입니다.",
    reward: { g: -5, trust: { haeun: 15 } }
  }
];

// 보유 증거 목록 반환 (logs 배열 기반)
function getCollectedEvidence(logs) {
  return EVIDENCE.filter(function(ev) {
    return logs.indexOf(ev.src) >= 0;
  });
}

// 이미 해금한 조합 목록 (localStorage)
function getUnlockedCombos() {
  try { var d = localStorage.getItem('ts_combos'); return d ? JSON.parse(d) : []; }
  catch(e) { return []; }
}
function saveUnlockedCombo(comboId) {
  var arr = getUnlockedCombos();
  if (arr.indexOf(comboId) < 0) { arr.push(comboId); }
  try { localStorage.setItem('ts_combos', JSON.stringify(arr)); } catch(e) {}
}

// 유효한 조합 체크: 선택한 증거 id 배열 → 매칭 레시피 반환
function checkEvidenceCombo(selectedIds) {
  var sorted = selectedIds.slice().sort();
  for (var i = 0; i < EVIDENCE_COMBOS.length; i++) {
    var c = EVIDENCE_COMBOS[i];
    var cs = c.combo.slice().sort();
    if (cs.length !== sorted.length) continue;
    var match = true;
    for (var j = 0; j < cs.length; j++) {
      if (cs[j] !== sorted[j]) { match = false; break; }
    }
    if (match) return c;
  }
  return null;
}
