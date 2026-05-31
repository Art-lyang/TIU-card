/* ================================================================
   ORACLE Korea Branch — Facility Data + i18n
   ================================================================ */

// ── LANGUAGE STATE ──
var currentLang = "ko";

// ── i18n: UI STRINGS ──
var UI = {
  en: {
    headerTitle: "ORACLE Korea Branch",
    headerSub: "Classified Facility Schematic — Gangwon Province",
    sysInfo: "SYSTEM: ACTIVE<br>CLEARANCE: LEVEL 3",
    panelHeader: "Room Information",
    panelPlaceholder: "SELECT A ROOM<br>TO VIEW DETAILS",
    tabRestricted: "Restricted",
    tabExterior: "Exterior",
    statusOnline: "STATUS: OPERATIONAL",
    statusRedacted: "STATUS: [REDACTED]",
    statusPatrol: "STATUS: PATROL ACTIVE",
    upgradeAvail: "UPGRADE: AVAILABLE",
    classSecret: "SECRET",
    classTop: "TOP SECRET",
    classField: "FIELD OPS",
    accessDenied: "Access Denied",
    clearanceReq: "Clearance Level 5 Required",
    partialData: "Partial schematic data available — integrity unverified",
    patrolRoute: "PATROL ROUTE",
    patrolDefault: "DEFAULT",
    patrolAlt: "ALTERNATE"
  },
  ko: {
    headerTitle: "ORACLE 한국 지부",
    headerSub: "기밀 시설 설계도 — 강원도",
    sysInfo: "시스템: 가동 중<br>보안등급: LEVEL 3",
    panelHeader: "구역 정보",
    panelPlaceholder: "구역을 선택하면<br>상세 정보가 표시됩니다",
    tabRestricted: "제한 구역",
    tabExterior: "외부 구역",
    statusOnline: "상태: 가동 중",
    statusRedacted: "상태: [삭제됨]",
    statusPatrol: "상태: 순찰 중",
    upgradeAvail: "업그레이드: 가능",
    classSecret: "기밀",
    classTop: "극비",
    classField: "현장 작전",
    accessDenied: "접근 거부",
    clearanceReq: "보안등급 5 필요",
    partialData: "부분 설계 데이터 확보 — 무결성 미검증",
    patrolRoute: "순찰 경로",
    patrolDefault: "기본",
    patrolAlt: "대체"
  }
};

// ── i18n: TYPE LABELS ──
var typeLabels = {
  en: { access:"access", security:"security", logistics:"logistics", operations:"operations",
        research:"research", medical:"medical", staff:"staff", command:"command",
        tech:"tech", storage:"storage", containment:"containment", hazard:"hazard",
        classified:"classified", terrain:"terrain", checkpoint:"checkpoint",
        surveillance:"surveillance", patrol:"patrol", perimeter:"perimeter" },
  ko: { access:"출입", security:"보안", logistics:"보급", operations:"작전",
        research:"연구", medical:"의료", staff:"인원 지원", command:"지휘",
        tech:"기술", storage:"저장", containment:"격리", hazard:"위험",
        classified:"기밀", terrain:"지형", checkpoint:"검문소",
        surveillance:"감시", patrol:"순찰", perimeter:"경계선" }
};

// ── TYPE COLORS ──
var typeColors = {
  access:      { border:"#2a6644", bg:"rgba(20,50,30,0.5)", label:"#44aa66" },
  security:    { border:"#4a6622", bg:"rgba(40,50,15,0.5)", label:"#88aa33" },
  logistics:   { border:"#446622", bg:"rgba(35,50,15,0.5)", label:"#77aa44" },
  operations:  { border:"#226644", bg:"rgba(15,50,35,0.5)", label:"#33aa77" },
  research:    { border:"#225566", bg:"rgba(15,40,50,0.5)", label:"#33aacc" },
  medical:     { border:"#226655", bg:"rgba(15,50,45,0.5)", label:"#33ccaa" },
  staff:       { border:"#335533", bg:"rgba(25,45,25,0.5)", label:"#55aa55" },
  command:     { border:"#446633", bg:"rgba(35,50,25,0.6)", label:"#88cc44" },
  tech:        { border:"#334466", bg:"rgba(25,35,50,0.5)", label:"#5588cc" },
  storage:     { border:"#445533", bg:"rgba(35,45,25,0.5)", label:"#88aa55" },
  containment: { border:"#663322", bg:"rgba(50,25,15,0.5)", label:"#cc6633" },
  hazard:      { border:"#662222", bg:"rgba(50,15,15,0.5)", label:"#cc4444" },
  classified:  { border:"#331111", bg:"rgba(30,8,8,0.6)",   label:"#662222" },
  terrain:     { border:"#2a4a2a", bg:"rgba(15,35,15,0.4)", label:"#4a8a4a" },
  checkpoint:  { border:"#5a5a22", bg:"rgba(45,45,12,0.5)", label:"#aaaa44" },
  surveillance:{ border:"#4a5a22", bg:"rgba(35,45,12,0.4)", label:"#8aaa33" },
  patrol:      { border:"#5a4a22", bg:"rgba(45,35,12,0.4)", label:"#aa8a33" },
  perimeter:   { border:"#4a3a22", bg:"rgba(40,30,12,0.4)", label:"#aa7733" }
};

// ── HELPERS ──
function t(obj) {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return obj[currentLang] || obj.en || "";
}
function tType(type) { return (typeLabels[currentLang] || typeLabels.en)[type] || type; }
function ui(key) { return (UI[currentLang] || UI.en)[key] || ""; }
