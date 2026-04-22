// components-escape-roll.js — simple escape roll result overlay
function EscapeRollDisplay(p){
  var result = p.result || { roll:0, target:0, outcome:'fail' };
  useEffect(function(){
    var t = setTimeout(function(){ if (p.onDone) p.onDone(); }, 1200);
    return function(){ clearTimeout(t); };
  }, []);
  var label = result.outcome === 'critical' ? 'CRITICAL'
    : result.outcome === 'success' ? 'SUCCESS'
    : result.outcome === 'critical_fail' ? 'CRITICAL FAIL'
    : 'FAIL';
  return h('div',{className:'escape-roll-overlay'},
    h('div',{className:'escape-roll-card'},
      h('div',null,'D100 ROLL'),
      h('div',{className:'escape-roll-score'}, String(result.roll) + ' / ' + String(result.target)),
      h('div',{className:'escape-roll-result'}, label),
      h('div',{className:'escape-roll-hint'}, '판정 반영 중 ...')
    )
  );
}
