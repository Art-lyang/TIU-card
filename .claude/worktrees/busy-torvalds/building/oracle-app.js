/* ================================================================
   ORACLE Korea Branch — Renderer & Interaction
   Depends on: oracle-data.js, oracle-floors.js
   ================================================================ */

var currentFloor = "level1";
var selectedRoom = null;
function isMobile() { return window.innerWidth <= 900; }

// ── UPDATE STATIC UI ──
function updateStaticUI() {
  document.getElementById("hdr-title").textContent = ui("headerTitle");
  document.getElementById("hdr-subtitle").textContent = ui("headerSub");
  document.getElementById("hdr-sysinfo").innerHTML = ui("sysInfo");
  document.getElementById("panel-hdr").textContent = ui("panelHeader");
  document.getElementById("tab-restricted").textContent = ui("tabRestricted");
  document.getElementById("tab-exterior").textContent = ui("tabExterior");
  document.documentElement.lang = currentLang === "ko" ? "ko" : "en";
}

// ── RENDER FLOOR (desktop) ──
function renderFloor(floorId) {
  currentFloor = floorId;
  selectedRoom = null;
  var floor = facilityFloors[floorId];
  var container = document.getElementById("map-container");
  var floorTitle = document.getElementById("floor-title");
  var floorSub = document.getElementById("floor-subtitle");
  var classif = document.getElementById("classification");
  container.innerHTML = "";

  floorTitle.textContent = t(floor.title);
  floorSub.textContent = t(floor.subtitle) || "";
  var cls = floor.classification;
  classif.textContent = cls === "topsecret" ? ui("classTop") : cls === "field" ? ui("classField") : ui("classSecret");
  classif.className = cls;

  document.querySelectorAll(".floor-tab").forEach(function(tab) {
    tab.classList.toggle("active", tab.dataset.floor === floorId);
  });

  // Exterior floor — special render
  if (floor.isExterior) { renderExterior(floor, container); if (typeof applyRoomOverlays === "function") applyRoomOverlays(); updateInfoPanel(null); renderMobileIfNeeded(floorId); return; }

  // Masked (restricted)
  if (floor.masked) {
    var mask = document.createElement("div");
    mask.className = "floor-masked";
    mask.innerHTML = '<div class="lock-icon">&#9608;&#9608;&#9608;</div><div class="lock-text blink">' + ui("accessDenied") + '</div><div class="lock-sub">' + ui("clearanceReq") + '</div><div class="lock-sub" style="margin-top:20px;color:#221a1a">' + ui("partialData") + '</div>';
    container.appendChild(mask);
    setTimeout(function() { renderRooms(floor, container, true); }, 800);
    updateInfoPanel(null); renderMobileIfNeeded(floorId); return;
  }

  // Corridors
  if (floor.corridors) floor.corridors.forEach(function(c) {
    var el = document.createElement("div");
    el.className = c.dir === "h" ? "corridor-h" : "corridor-v";
    el.style.left = c.x + "px"; el.style.top = c.y + "px";
    if (c.dir === "h") el.style.width = c.w + "px"; else el.style.height = c.h + "px";
    container.appendChild(el);
  });
  renderRooms(floor, container, false);
  if (typeof applyRoomOverlays === "function") applyRoomOverlays();
  updateInfoPanel(null);
  renderMobileIfNeeded(floorId);
}

function renderMobileIfNeeded(floorId) {
  if (isMobile()) { renderMobileGrid(floorId); closeMobileSheet(); }
}

// ── RENDER ROOMS (interior) ──
function renderRooms(floor, container, dimmed) {
  floor.rooms.forEach(function(room) {
    var el = document.createElement("div");
    var isExp = room._expanded || false;
    var isUpg = room._upgraded || false;
    el.className = "room" + (room.upgradable ? " upgradable" : "") + (isExp ? " expanded" : "") + (isUpg ? " upgraded" : "");
    el.style.cssText = "left:" + room.x + "px;top:" + room.y + "px;width:" + room.w + "px;height:" + room.h + "px";
    el.dataset.roomId = room.id;
    if (isExp) el.dataset.expanded = "true";
    if (isUpg) el.dataset.upgraded = "true";
    var tc = typeColors[room.type] || typeColors.access;
    el.style.borderColor = isExp ? "#4ae" : isUpg ? "#6f6" : tc.border;
    el.style.background = isExp ? "rgba(74,170,238,.08)" : isUpg ? "rgba(100,255,100,.06)" : tc.bg;
    if (dimmed) { el.style.opacity = "0.35"; el.style.borderStyle = "dashed"; }
    el.innerHTML = '<div class="room-upgrade-dot"></div><div class="room-label" style="color:' + (isExp ? "#4ae" : isUpg ? "#6f6" : tc.label) + '">' + t(room.name) + '</div><div class="room-type-badge">' + tType(room.type) + '</div>';
    el.addEventListener("click", function(e) {
      e.stopPropagation();
      document.querySelectorAll(".room.selected,.ext-zone.selected").forEach(function(r) { r.classList.remove("selected"); });
      el.classList.add("selected"); selectedRoom = room; updateInfoPanel(room);
    });
    container.appendChild(el);
  });
}

// ── RENDER EXTERIOR ──
function renderExterior(floor, container) {
  // Base marker
  var bm = floor.baseMarker;
  var base = document.createElement("div");
  base.className = "ext-base-marker";
  base.style.cssText = "left:" + bm.x + "px;top:" + bm.y + "px;width:" + bm.w + "px;height:" + bm.h + "px";
  base.textContent = t(bm.label);
  container.appendChild(base);

  // Patrol routes
  var routes = floor.patrolRoutes;
  Object.keys(routes).forEach(function(key) {
    var route = routes[key];
    var pts = route.points;
    for (var i = 0; i < pts.length; i++) {
      // Node dot
      var dot = document.createElement("div");
      dot.className = "patrol-node" + (i === 0 ? " active" : "");
      dot.style.left = pts[i][0] + "px"; dot.style.top = pts[i][1] + "px";
      dot.style.background = route.nodeColor;
      dot.style.boxShadow = "0 0 6px " + route.nodeColor;
      container.appendChild(dot);
      // Line segment to next
      if (i < pts.length - 1) {
        var seg = document.createElement("div");
        seg.className = "patrol-seg";
        var dx = pts[i + 1][0] - pts[i][0], dy = pts[i + 1][1] - pts[i][1];
        var len = Math.sqrt(dx * dx + dy * dy);
        var angle = Math.atan2(dy, dx) * 180 / Math.PI;
        seg.style.left = pts[i][0] + "px"; seg.style.top = pts[i][1] + "px";
        seg.style.width = len + "px"; seg.style.transform = "rotate(" + angle + "deg)";
        seg.style.borderColor = route.color;
        container.appendChild(seg);
      }
    }
  });

  // Zones
  floor.zones.forEach(function(zone) {
    var el = document.createElement("div");
    var isExp = zone._expanded || false;
    el.className = "ext-zone" + (isExp ? " expanded" : "");
    el.style.cssText = "left:" + zone.x + "px;top:" + zone.y + "px;width:" + zone.w + "px;height:" + zone.h + "px";
    el.dataset.roomId = zone.id;
    if (isExp) el.dataset.expanded = "true";
    var tc = typeColors[zone.type] || typeColors.terrain;
    el.style.borderColor = isExp ? "#4ae" : tc.border;
    el.style.background = isExp ? "rgba(74,170,238,.06)" : tc.bg;
    el.innerHTML = '<div class="ez-label" style="color:' + (isExp ? "#4ae" : tc.label) + '">' + t(zone.name) + '</div><div class="ez-type">' + tType(zone.type) + '</div>';
    el.addEventListener("click", function(e) {
      e.stopPropagation();
      document.querySelectorAll(".room.selected,.ext-zone.selected").forEach(function(r) { r.classList.remove("selected"); });
      el.classList.add("selected"); selectedRoom = zone; updateInfoPanel(zone);
    });
    container.appendChild(el);
  });

  // Legend
  var legend = document.createElement("div");
  legend.className = "ext-legend";
  var extLeg = floor.patrolRoutes.extendedRoute ? '<div class="leg-item"><div class="leg-swatch" style="background:rgba(100,255,150,0.6)"></div>' + (currentLang === "ko" ? "확장" : "EXTENDED") + '</div>' : "";
  legend.innerHTML = '<div class="leg-item"><div class="leg-swatch" style="background:rgba(255,170,50,0.6)"></div>' + ui("patrolDefault") + '</div>' +
    '<div class="leg-item"><div class="leg-swatch" style="background:rgba(100,200,255,0.5)"></div>' + ui("patrolAlt") + '</div>' + extLeg;
  container.appendChild(legend);
}

// ── INFO PANEL (desktop) ──
function updateInfoPanel(room) {
  var panel = document.querySelector("#info-panel .panel-content");
  if (!room) { panel.innerHTML = '<div class="placeholder">' + ui("panelPlaceholder") + '</div>'; return; }
  var tc = typeColors[room.type] || typeColors.access;
  var isClassified = room.type === "classified";
  var statusClass = isClassified ? "" : " online";
  var statusText = isClassified ? ui("statusRedacted") : (room.type === "patrol" ? ui("statusPatrol") : ui("statusOnline"));
  var upgradeHtml = room.upgradable ? '<div style="margin-top:12px;padding:6px 8px;border:1px solid #1a3a1a;font-size:8px;color:#1a6a2a;letter-spacing:1px;text-transform:uppercase">' + ui("upgradeAvail") + '</div>' : "";
  var expBadge = room._expanded ? '<div style="margin-top:8px;padding:4px 8px;border:1px solid #4ae;font-size:9px;color:#4ae;letter-spacing:1px">[EXPANSION — GAME LINKED]</div>' : "";
  var upgBadge = room._upgraded ? '<div style="margin-top:8px;padding:4px 8px;border:1px solid #6f6;font-size:9px;color:#6f6;letter-spacing:1px">[UPGRADED — GAME LINKED]</div>' : "";
  // Stat alert in panel
  var alertHtml = "";
  if (typeof getStatAlerts === "function") {
    var alerts = getStatAlerts();
    if (alerts[room.id]) {
      var lvl = alerts[room.id];
      var aC = lvl === "critical" ? "#ff4444" : "#f0a030";
      alertHtml = '<div style="margin-top:8px;padding:6px 8px;border:1px solid ' + aC + ';color:' + aC + ';font-size:9px;letter-spacing:1px;text-transform:uppercase">' + (lvl === "critical" ? "⚠ CRITICAL — STAT BELOW THRESHOLD" : "⚠ WARNING — LOW STAT") + '</div>';
    }
  }
  panel.innerHTML = '<div class="room-title" style="color:' + tc.label + '">' + t(room.name) + '</div><div class="room-type">' + tType(room.type) + '</div><div class="room-desc">' + t(room.desc) + '</div><div class="room-status' + statusClass + '">' + statusText + '</div>' + upgradeHtml + expBadge + upgBadge + alertHtml;
}

// ── LANGUAGE SWITCH ──
function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll(".lang-tab").forEach(function(tab) { tab.classList.toggle("active", tab.dataset.lang === lang); });
  updateStaticUI(); renderFloor(currentFloor);
}
