/* ================================================================
   ORACLE Korea Branch — Mobile Rendering & Bottom Sheet
   Depends on: oracle-data.js, oracle-floors.js, oracle-app.js
   ================================================================ */

// ── MOBILE GRID ──
function renderMobileGrid(floorId) {
  var floor = facilityFloors[floorId];
  var grid = document.getElementById("mobile-grid");
  grid.innerHTML = "";

  var hdr = document.createElement("div");
  hdr.className = "mg-header";
  hdr.textContent = t(floor.title);
  grid.appendChild(hdr);

  if (t(floor.subtitle)) {
    var sub = document.createElement("div");
    sub.className = "mg-sub";
    sub.textContent = t(floor.subtitle);
    grid.appendChild(sub);
  }

  var cls = document.createElement("div");
  cls.className = "mg-classif " + floor.classification;
  cls.textContent = floor.classification === "topsecret" ? ui("classTop")
    : floor.classification === "field" ? ui("classField") : ui("classSecret");
  grid.appendChild(cls);

  if (floor.masked) {
    var mask = document.createElement("div");
    mask.className = "floor-masked";
    mask.innerHTML =
      '<div class="lock-icon">&#9608;&#9608;&#9608;</div>' +
      '<div class="lock-text blink">' + ui("accessDenied") + '</div>' +
      '<div class="lock-sub">' + ui("clearanceReq") + '</div>';
    grid.appendChild(mask);
    setTimeout(function() { renderMobileRoomList(floor, grid, true); }, 600);
    return;
  }

  var items = floor.isExterior ? floor.zones : floor.rooms;
  renderMobileRoomList({ rooms: items }, grid, false);
}

function renderMobileRoomList(floor, grid, dimmed) {
  var cardGrid = document.createElement("div");
  cardGrid.className = "mg-card-grid";
  grid.appendChild(cardGrid);
  floor.rooms.forEach(function(room) {
    var el = document.createElement("div");
    el.className = "mgrid-room" + (dimmed ? " dimmed" : "");
    var tc = typeColors[room.type] || typeColors.access;
    var upHtml = room.upgradable
      ? '<div class="mr-upgrade">' + ui("upgradeAvail") + '</div>' : "";

    var artSvg = (typeof ROOM_ART !== 'undefined') ? ROOM_ART.get(room.type) : '';
    el.innerHTML =
      (artSvg ? '<div class="mr-art">' + artSvg + '</div>' : '') +
      '<div class="mr-info-bar">' +
        '<div class="mr-name" style="color:' + tc.label + '">' + t(room.name) + '</div>' +
        '<div class="mr-type-row"><span class="mr-type">' + tType(room.type) + '</span>' +
        (room.upgradable ? '<span class="mr-up-dot">●</span>' : '') +
        '</div>' +
      '</div>';

    el.addEventListener("click", function(e) {
      e.stopPropagation();
      document.querySelectorAll(".mgrid-room.m-selected").forEach(function(r) {
        r.classList.remove("m-selected");
      });
      el.classList.add("m-selected");
      openMobileSheet(room);
    });
    cardGrid.appendChild(el);
  });
}

// ── MOBILE BOTTOM SHEET ──
function openMobileSheet(room) {
  var sheet = document.getElementById("mobile-sheet");
  var body = document.getElementById("sheet-body");
  var tc = typeColors[room.type] || typeColors.access;
  var isClassified = room.type === "classified";
  var statusClass = isClassified ? "" : " online";
  var statusText = isClassified ? ui("statusRedacted") : ui("statusOnline");
  var upHtml = room.upgradable
    ? '<div style="margin-top:10px;padding:5px 8px;border:1px solid #1a3a1a;' +
      'font-size:8px;color:#1a6a2a;letter-spacing:1px;text-transform:uppercase;' +
      'display:inline-block">' + ui("upgradeAvail") + '</div>'
    : "";

  body.innerHTML =
    '<div class="room-title" style="color:' + tc.label + '">' + t(room.name) + '</div>' +
    '<div class="room-type">' + tType(room.type) + '</div>' +
    '<div class="room-desc">' + t(room.desc) + '</div>' +
    '<div class="room-status' + statusClass + '">' + statusText + '</div>' +
    upHtml;

  sheet.classList.add("open");
}

function closeMobileSheet() {
  document.getElementById("mobile-sheet").classList.remove("open");
  document.querySelectorAll(".mgrid-room.m-selected").forEach(function(r) {
    r.classList.remove("m-selected");
  });
}

document.getElementById("sheet-close").addEventListener("click", closeMobileSheet);
document.getElementById("sheet-handle").addEventListener("click", closeMobileSheet);
