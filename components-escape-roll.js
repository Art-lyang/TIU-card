// components-escape-roll.js — B안 탈출 d100 롤 애니메이션 컴포넌트
// EscapeGameScreen 내부에서 선택지 확정 후 표시.
// 입력: rollResult = { roll, total, dc, bonus, outcome }, onDone()
// 500ms 롤링 → 600ms 결과 페이드인 → 1200ms 후 onDone

window.EscapeRollDisplay = function(p){
  var result = p.result;
  var onDone = p.onDone;
  var _phase = useState('rolling');
  var phase = _phase[0], setPhase = _phase[1];
  var _display = useState(0);
  var display = _display[0], setDisplay = _display[1];

  useEffect(function(){
    if (!result) return;
    // 롤링: 500ms 동안 랜덤 숫자 깜박임
    var rollStart = Date.now();
    var rollInt = setInterval(function(){
      var el = Date.now() - rollStart;
      if (el >= 500) {
        clearInterval(rollInt);
        setDisplay(result.roll);
        setPhase('result');
        // 1800ms 후 onDone
        setTimeout(function(){ if (onDone) onDone(); }, 1800);
      } else {
        setDisplay(1 + Math.floor(Math.random() * 100));
      }
    }, 40);
    return function(){ clearInterval(rollInt); };
  }, [result]);

  if (!result) return null;

  var outcomeColor = {
    critical: '#7cffb5',
    success:  '#9fe8a8',
    partial:  '#ffc46b',
    fail:     '#ff6a6a'
  }[result.outcome] || '#fff';

  var outcomeLabel = {
    critical: 'CRITICAL',
    success:  'PASS',
    partial:  'PARTIAL',
    fail:     'FAIL'
  }[result.outcome] || '';

  var bonusSign = result.bonus >= 0 ? '+' : '';

  return h('div',{className:'escape-roll-overlay'},
    h('div',{className:'escape-roll-box'},
      h('div',{className:'escape-roll-label'}, 'D100 · DC ' + result.dc),
      h('div',{className:'escape-roll-dice' + (phase==='result' ? ' done' : '')},
        display
      ),
      phase==='result' && h('div',{className:'escape-roll-math'},
        result.roll + ' ' + bonusSign + result.bonus + ' = ' + result.total
      ),
      phase==='result' && h('div',{
        className:'escape-roll-outcome',
        style:{color: outcomeColor}
      }, outcomeLabel)
    )
  );
};
