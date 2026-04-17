// ============ MUTANTS: SPAWN / PROJECT / DRAW ============

// Create a single mutant entity
function createMutant(type, baseX, baseSpeed) {
  var m = {
    type: type, z: 1.0,
    x: baseX,
    speed: baseSpeed,
    hp: type === 'shellwalker' ? 3 : (type === 'runner' ? 1 : 2),
    sway: Math.random() * Math.PI * 2,
    swaySpeed: 0.04 + Math.random() * 0.03,
    dead: false, hitFlash: 0,
    animName: 'approach', frameIndex: 0, frameTimer: 0,
    attackCommitted: false, deathDone: false,
  };
  return m;
}

function spawnMutant() {
  var typePool = 1 + Math.floor(state.wave / 2);
  var types = ['drone', 'runner', 'shellwalker'];
  var type = types[Math.floor(Math.random() * Math.min(types.length, typePool))];
  spawnMutantOfType(type);
}

// 특정 타입을 바로 스폰 (노드 모드/보스 전용)
function spawnMutantOfType(type, opts) {
  opts = opts || {};
  var baseX = (Math.random() - 0.5) * 0.7;
  var baseSpeed = 0.00030 + Math.random() * 0.00012 + state.wave * 0.00004;

  if (type === 'shellwalker') {
    // 편대 2~3체 (쉘 워커는 일반 몹이 아닌 편대)
    var count = 2 + Math.floor(Math.random() * 2);
    var unitSpeed = baseSpeed * 0.65;
    for (var i = 0; i < count; i++) {
      var m = createMutant('shellwalker',
        baseX + (i - (count - 1) * 0.5) * 0.08,
        unitSpeed + (Math.random() - 0.5) * 0.00003
      );
      m.z = 1.0 - i * 0.03;
      state.mutants.push(m);
    }
    return;
  }

  // 쉘 토커 보스 — 야외형/격리실형
  if (type === 'shelltalker_field' || type === 'shelltalker_contained') {
    var boss = createMutant('shelltalker', 0, baseSpeed * 0.8);
    boss.hp = 6;
    boss.isBoss = true;
    boss.variant = type;
    // 격리실형은 초반 기습 체크
    if (type === 'shelltalker_contained'
        && escapeState
        && escapeState.flags
        && !escapeState.flags.shellTalkerKnown) {
      boss.ambushPending = true;
    }
    state.mutants.push(boss);

    // 음성 모사 COMMS (박상훈 일병 — 이중철 지휘관 전임 부하)
    if (typeof commsSay === 'function') {
      setTimeout(function() {
        commsSay('— "지휘관님, 여깁니다."', 2500);
      }, 800);
    }
    return;
  }

  // 일반 스폰
  var single = createMutant(type, baseX, baseSpeed);
  if (type === 'runner') single.speed *= 1.5;
  if (opts.isBoss) { single.isBoss = true; single.hp *= 2; }
  state.mutants.push(single);
}

// 3D → 2D projection; z=1 at horizon, z=0 at barricade
function project(m) {
  var horizonY = H * 0.48;
  var barricadeY = H * 0.78;
  var zEase = 1 - m.z;
  var screenY = horizonY + (barricadeY - horizonY) * zEase;
  var scale = 0.15 + zEase * 0.85;
  var xWorld = m.x + Math.sin(m.sway) * 0.04 * (1 - zEase);
  var screenX = W/2 + xWorld * W * (0.5 + zEase * 1.2);
  return { x: screenX, y: screenY, scale: scale };
}

function drawMutant(m) {
  if (MUTANT_SPRITES[m.type]) {
    drawSpriteMutant(m);
  } else {
    drawProceduralMutant(m);
  }
}

// Sprite-based mutants (Shell Walker / SPEC-005)
function drawSpriteMutant(m) {
  var p = project(m);
  var s = p.scale;
  var img = getCurrentFrame(m);
  if (!img) return;

  // Scale: Shell Walker is imposing — larger than drone
  // Base on canvas 512; target display height scales with perspective
  var targetH = 180 * s; // larger than procedural mutants (120 * s)
  var aspect = img.naturalWidth / img.naturalHeight;
  var w = targetH * aspect;
  var h = targetH;
  var x = p.x - w * 0.5;
  var y = p.y - h * 0.88; // anchor near bottom (feet at screenY)

  ctx.save();

  // ground shadow
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.beginPath();
  ctx.ellipse(p.x, p.y + h * 0.04, w * 0.32, h * 0.04, 0, 0, Math.PI * 2);
  ctx.fill();

  // hit flash overlay via globalCompositeOperation
  if (m.hitFlash > 0) {
    ctx.drawImage(img, x, y, w, h);
    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.fillRect(x, y, w, h);
    ctx.globalCompositeOperation = 'source-over';
  } else {
    ctx.drawImage(img, x, y, w, h);
  }

  ctx.restore();
}

// Procedural mutants (drone / runner) — kept for lightweight variety
function drawProceduralMutant(m) {
  var p = project(m);
  var s = p.scale;
  var w = 60 * s, h = 120 * s;
  var x = p.x, y = p.y;

  ctx.save();
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.beginPath();
  ctx.ellipse(x, y + h * 0.95, w * 0.5, h * 0.06, 0, 0, Math.PI * 2);
  ctx.fill();

  var flash = m.hitFlash > 0;
  ctx.fillStyle = flash ? '#fff' : '#080808';

  if (m.type === 'shelltalker') {
    // 쉘 토커 보스 — 큰 체형 + 붉은 눈
    w *= 1.6; h *= 1.5;
    ctx.fillStyle = flash ? '#fff' : '#111';
    ctx.beginPath();
    ctx.ellipse(x, y - h * 0.38, w * 0.4, h * 0.2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(x - w * 0.3, y - h * 0.2, w * 0.6, h * 0.6);
    ctx.fillRect(x - w * 0.5, y - h * 0.15, w * 0.2, h * 0.5);
    ctx.fillRect(x + w * 0.3, y - h * 0.15, w * 0.2, h * 0.5);
    ctx.fillRect(x - w * 0.25, y + h * 0.35, w * 0.18, h * 0.4);
    ctx.fillRect(x + w * 0.07, y + h * 0.35, w * 0.18, h * 0.4);
    if (s > 0.25 && !flash) {
      var eY = y - h * 0.4;
      ctx.fillStyle = '#ff3333';
      ctx.shadowColor = '#ff3333'; ctx.shadowBlur = 10 * s;
      ctx.beginPath();
      ctx.arc(x - w * 0.12, eY, Math.max(2, 3.5 * s), 0, Math.PI * 2);
      ctx.arc(x + w * 0.12, eY, Math.max(2, 3.5 * s), 0, Math.PI * 2);
      ctx.fill(); ctx.shadowBlur = 0;
    }
  } else if (m.type === 'drone') {
    ctx.beginPath();
    ctx.ellipse(x, y - h * 0.4, w * 0.35, h * 0.18, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(x - w * 0.25, y - h * 0.25, w * 0.5, h * 0.55);
    ctx.fillRect(x - w * 0.45, y - h * 0.2, w * 0.15, h * 0.55);
    ctx.fillRect(x + w * 0.3, y - h * 0.2, w * 0.15, h * 0.55);
    ctx.fillRect(x - w * 0.2, y + h * 0.3, w * 0.15, h * 0.4);
    ctx.fillRect(x + w * 0.05, y + h * 0.3, w * 0.15, h * 0.4);
  } else if (m.type === 'runner') {
    ctx.beginPath();
    ctx.ellipse(x + w * 0.1, y - h * 0.45, w * 0.28, h * 0.15, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x - w * 0.2, y - h * 0.3);
    ctx.lineTo(x + w * 0.3, y - h * 0.35);
    ctx.lineTo(x + w * 0.25, y + h * 0.3);
    ctx.lineTo(x - w * 0.25, y + h * 0.25);
    ctx.closePath(); ctx.fill();
    ctx.fillRect(x - w * 0.2, y + h * 0.25, w * 0.12, h * 0.5);
    ctx.fillRect(x + w * 0.1, y + h * 0.25, w * 0.12, h * 0.5);
  }

  if (s > 0.3 && !flash) {
    var eyeY = y - h * 0.42;
    var eyeOff = w * 0.12;
    ctx.fillStyle = '#fff';
    ctx.shadowColor = '#fff';
    ctx.shadowBlur = 6 * s;
    ctx.beginPath();
    ctx.arc(x - eyeOff, eyeY, Math.max(1, 2 * s), 0, Math.PI * 2);
    ctx.arc(x + eyeOff, eyeY, Math.max(1, 2 * s), 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }
  ctx.restore();
}
