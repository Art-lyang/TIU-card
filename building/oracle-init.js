/* ================================================================
   ORACLE Korea Branch — Event Listeners & Init
   Depends on: oracle-app.js, oracle-gamelink.js
   ================================================================ */

// ── LANGUAGE TAB CLICK ──
document.querySelectorAll(".lang-tab").forEach(function(tab) {
  tab.addEventListener("click", function() { setLang(tab.dataset.lang); });
});

// ── FLOOR TAB CLICK ──
document.querySelectorAll(".floor-tab").forEach(function(tab) {
  tab.addEventListener("click", function() { renderFloor(tab.dataset.floor); });
});

// ── DESELECT (desktop) ──
document.getElementById("map-area").addEventListener("click", function() {
  selectedRoom = null;
  document.querySelectorAll(".room.selected,.ext-zone.selected").forEach(function(r) { r.classList.remove("selected"); });
  updateInfoPanel(null);
});

// ── RESIZE ──
window.addEventListener("resize", function() { renderFloor(currentFloor); });

// ── INIT ──
updateStaticUI();
renderFloor("level1");
