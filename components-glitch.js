// TERMINAL SESSION — components-glitch.js
// 글리치 연출 컴포넌트 & 유틸
// Level 1: CSS 자동 (root에 .glitch-l1 클래스 부여)
// Level 2: CSS 자동 (root에 .glitch-l2 클래스 부여)
// Level 3: 풀스크린 오버레이 컴포넌트 렌더

var GLITCH_MESSAGES_L3 = [
  '[OBSERVER PROTOCOL ACTIVE]',
  '[SIGNAL INTEGRITY COMPROMISED]',
  '[UNCLASSIFIED DATA STREAM DETECTED]',
  '[ORACLE BOUNDARY BREACH]',
  '[ERR 0x7F — REFERENCE LOST]',
  '[ANOMALY IN OBSERVATION LAYER]'
];

// Level 3 풀스크린 오버레이
function GlitchOverlay(p) {
  // props: level (1|2|3), onComplete, duration, fxMode ('full'|'reduced'|'off')
  var s1 = useState(true), visible = s1[0], setVisible = s1[1];
  var s2 = useState(''), msg = s2[0], setMsg = s2[1];
  var s3 = useState(''), subMsg = s3[0], setSubMsg = s3[1];

  useEffect(function () {
    // 효과 꺼짐 모드: 바로 onComplete
    if (p.fxMode === 'off') {
      if (p.onComplete) p.onComplete();
      setVisible(false);
      return;
    }
    if (p.level === 3) {
      setMsg(GLITCH_MESSAGES_L3[Math.floor(Math.random() * GLITCH_MESSAGES_L3.length)]);
      // 0x코드 형태 서브메시지
      setSubMsg('0x' + Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase().padStart(6, '0'));
    }
    var defaultDur = p.level === 1 ? 400
                   : p.level === 2 ? 1500
                   : 3500;
    var dur = p.duration || defaultDur;
    // 축소 모드: 지속시간 50%
    if (p.fxMode === 'reduced') dur = Math.max(300, Math.floor(dur * 0.5));

    var t = setTimeout(function () {
      setVisible(false);
      if (p.onComplete) p.onComplete();
    }, dur);
    return function () { clearTimeout(t); };
  }, [p.level]);

  if (!visible) return null;
  // Level 1/2는 CSS 전담 (root className)
  if (p.level !== 3) return null;
  // Level 3: 풀스크린 오버레이
  return h('div', { className: 'glitch-l3-overlay' },
    h('div', { className: 'glitch-l3-overlay__text' },
      h('div', null, msg),
      h('div', {
        style: {
          fontSize: 11,
          color: 'rgba(0,240,255,0.7)',
          letterSpacing: 2,
          marginTop: 8,
          textShadow: '0 0 6px rgba(0,240,255,0.5)'
        }
      }, subMsg)
    )
  );
}

// 텍스트 변조 유틸 (Level 2+에서 카드 텍스트 일부를 블록 문자로 교체)
var _GLITCH_CHARS = '░▒▓█▄▀■□▪▫×◇◆';
function scrambleText(text, intensity) {
  if (!text || intensity <= 0) return text;
  var arr = text.split('');
  var count = Math.floor(arr.length * Math.min(1, intensity));
  // seed 기반 결정적 셔플로 프레임마다 달라지지 않음 (깜박임 방지)
  var seed = 0;
  for (var si = 0; si < text.length; si++) seed = (seed * 31 + text.charCodeAt(si)) | 0;
  var rnd = function () {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (var i = 0; i < count; i++) {
    var idx = Math.floor(rnd() * arr.length);
    if (arr[idx] !== ' ' && arr[idx] !== '\n' && arr[idx] !== '[' && arr[idx] !== ']') {
      arr[idx] = _GLITCH_CHARS[Math.floor(rnd() * _GLITCH_CHARS.length)];
    }
  }
  return arr.join('');
}

// prefers-reduced-motion 감지 훅 — 컴포넌트에서 사용
function prefersReducedMotion() {
  try {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) {
    return false;
  }
}

// 글리치 트리거 결정 — 카드/로그/엔딩 기반
function resolveGlitchLevel(card, endId, logId) {
  // 카드에 glitch 필드 있으면 우선
  if (card && typeof card.glitch === 'number') return card.glitch;
  // 엔딩 ID 기반
  if (endId === 'F') return 3;
  if (endId === 'B') return 2; // 각성 엔딩
  // 로그 기반
  if (logId === 'LOG-010') return 3;
  if (logId === 'LOG-009') return 2;
  return 0;
}
