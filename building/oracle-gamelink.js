/* ================================================================
   ORACLE Korea Branch — Game Data Link
   Reads game state from localStorage (shared by TIU-card app.js)
   Applies: expansion rooms, stat-based alerts, patrol changes
   Depends on: oracle-data.js, oracle-floors.js
   ================================================================ */

var gameState = null;

function loadGameState() {
  try {
    var raw = localStorage.getItem('tiu_facility_state');
    if (raw) gameState = JSON.parse(raw);
  } catch (e) { gameState = null; }
  // Also try loading stats from game save
  try {
    var gs = localStorage.getItem('ts_game');
    if (gs) {
      var parsed = JSON.parse(gs);
      if (parsed && parsed.stats) {
        if (!gameState) gameState = {};
        gameState.stats = parsed.stats;
      }
    }
  } catch (e) {}
}

// ── 확장 완료 방 데이터 (facilityFloors에 동적 추가) ──
var expansionRooms = {
  "FE-001": {
    floor: "b2", room: {
      id: "cryo_storage", type: "storage",
      name: { en: "Cryogenic Storage Unit", ko: "저온 냉동고" },
      desc: { en: "Expanded sub-zero storage for EV-Σ sample preservation. Advanced cooling system.", ko: "EV-Σ 샘플 보존용 확장 냉동 저장 시설. 고급 냉각 시스템." },
      x: 200, y: 530, w: 180, h: 90
    }
  },
  "FE-002": {
    floor: "exterior", zone: {
      id: "training_ground", type: "patrol",
      name: { en: "Outdoor Training Ground", ko: "야외 훈련장" },
      desc: { en: "Temporary outdoor training area near perimeter. Combat readiness facility.", ko: "봉쇄 구역 인근 임시 야외 훈련장. 전투 대비 시설." },
      x: 60, y: 280, w: 180, h: 80
    }
  },
  "FE-003": {
    floor: "exterior", zone: {
      id: "sensor_array", type: "surveillance",
      name: { en: "Advanced Sensor Array", ko: "고급 센서 어레이" },
      desc: { en: "Next-gen surveillance sensors along the perimeter. AI-enhanced threat detection.", ko: "봉쇄선 외곽 차세대 감시 센서. AI 기반 위협 감지." },
      x: 640, y: 170, w: 160, h: 70
    }
  },
  "FE-004": {
    floor: "level1", upgradeRoom: "medical_bay",
    upgradeName: { en: "Medical Bay [UPGRADED]", ko: "의무실 [확장됨]" },
    upgradeDesc: { en: "Expanded medical bay with isolation ward and advanced equipment. Full trauma and quarantine capacity.", ko: "격리 병동 및 고급 장비 확장 완료. 외상 및 격리 대응 역량 확보." }
  },
  "FE-005": {
    floor: "exterior", zone: {
      id: "supply_route_b", type: "logistics",
      name: { en: "Mountain Supply Route", ko: "산악 보급로" },
      desc: { en: "Secondary supply corridor through mountain pass. Weather-dependent.", ko: "산악 통로를 통한 2차 보급 경로. 기상 상황에 따라 운영." },
      x: 60, y: 60, w: 120, h: 80
    }
  },
  "FE-006": {
    floor: "level1", upgradeRoom: "cctv_control",
    upgradeName: { en: "CCTV Control [AI SYSTEM]", ko: "CCTV 통제실 [AI 시스템]" },
    upgradeDesc: { en: "AI-enhanced surveillance system. Full facility coverage with pattern recognition.", ko: "AI 강화 감시 시스템. 패턴 인식 기반 전 구역 감시." }
  },
  "FE-007": {
    floor: "b3", room: {
      id: "emergency_bunker", type: "containment",
      name: { en: "Emergency Bunker", ko: "비상 대피 벙커" },
      desc: { en: "Underground emergency shelter. Capacity: 20 personnel, 72hr supplies.", ko: "지하 비상 대피소. 수용: 20명, 72시간분 물자." },
      x: 200, y: 530, w: 180, h: 90
    }
  },
  "FE-008": {
    floor: "exterior",
    patrolRoute: {
      label: { en: "Extended North", ko: "북측 확장" },
      color: "rgba(100,255,150,0.4)",
      nodeColor: "rgba(100,255,150,0.8)",
      points: [[730,105],[730,60],[550,30],[350,30],[200,60],[265,95]]
    }
  }
};

// ── 확장 방/구역 동적 삽입 ──
function applyExpansions() {
  if (!gameState || !gameState.completed) return;
  gameState.completed.forEach(function(feId) {
    var exp = expansionRooms[feId];
    if (!exp) return;
    var floor = facilityFloors[exp.floor];
    if (!floor) return;

    // 새 방 추가 (interior)
    if (exp.room) {
      var exists = (floor.rooms || []).some(function(r) { return r.id === exp.room.id; });
      if (!exists) {
        if (!floor.rooms) floor.rooms = [];
        exp.room._expanded = true;
        floor.rooms.push(exp.room);
      }
    }
    // 새 구역 추가 (exterior)
    if (exp.zone) {
      var exists = (floor.zones || []).some(function(z) { return z.id === exp.zone.id; });
      if (!exists) {
        if (!floor.zones) floor.zones = [];
        exp.zone._expanded = true;
        floor.zones.push(exp.zone);
      }
    }
    // 방 업그레이드
    if (exp.upgradeRoom) {
      var rooms = floor.rooms || [];
      for (var i = 0; i < rooms.length; i++) {
        if (rooms[i].id === exp.upgradeRoom) {
          rooms[i]._upgraded = true;
          if (exp.upgradeName) rooms[i].name = exp.upgradeName;
          if (exp.upgradeDesc) rooms[i].desc = exp.upgradeDesc;
          break;
        }
      }
    }
    // 순찰 루트 추가
    if (exp.patrolRoute && floor.patrolRoutes) {
      if (!floor.patrolRoutes.extendedRoute) {
        floor.patrolRoutes.extendedRoute = exp.patrolRoute;
      }
    }
  });
}

// ── 스탯 기반 방 스타일 적용 ──
function getStatAlerts() {
  if (!gameState || !gameState.stats) return {};
  var s = gameState.stats;
  var alerts = {};
  if (s.c <= 25) { alerts.security_office = "warning"; alerts.cctv_control = "warning"; }
  if (s.c <= 15) { alerts.security_office = "critical"; alerts.cctv_control = "critical"; }
  if (s.r <= 30) alerts.supply_depot = "warning";
  if (s.r <= 15) alerts.supply_depot = "critical";
  if (s.t <= 25) { alerts.staff_lounge = "warning"; alerts.gym = "warning"; }
  if (s.t <= 15) { alerts.staff_lounge = "critical"; alerts.gym = "critical"; }
  if (s.o <= 30) { alerts.comms_room = "warning"; alerts.oracle_chamber = "warning"; }
  return alerts;
}

// ── 방 렌더링 후 스타일 보강 (오버레이) ──
function applyRoomOverlays() {
  var alerts = getStatAlerts();
  document.querySelectorAll(".room, .ext-zone").forEach(function(el) {
    // Remove old overlays
    var old = el.querySelector(".game-overlay");
    if (old) old.remove();
  });

  // Stat-based alerts
  Object.keys(alerts).forEach(function(roomId) {
    var level = alerts[roomId];
    var el = document.querySelector('[data-room-id="' + roomId + '"]');
    if (!el) return;
    var overlay = document.createElement("div");
    overlay.className = "game-overlay game-overlay--" + level;
    overlay.textContent = level === "critical" ? "CRITICAL" : "WARNING";
    el.appendChild(overlay);
  });

  // NEW badges for expanded rooms
  document.querySelectorAll('[data-expanded="true"]').forEach(function(el) {
    if (el.querySelector(".game-badge-new")) return;
    var badge = document.createElement("div");
    badge.className = "game-badge-new";
    badge.textContent = "NEW";
    el.appendChild(badge);
  });

  // UPGRADED badges
  document.querySelectorAll('[data-upgraded="true"]').forEach(function(el) {
    if (el.querySelector(".game-badge-upgraded")) return;
    var badge = document.createElement("div");
    badge.className = "game-badge-upgraded";
    badge.textContent = "UPGRADED";
    el.appendChild(badge);
  });
}

// ── 초기화 ──
loadGameState();
applyExpansions();
