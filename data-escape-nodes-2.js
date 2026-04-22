// data-escape-nodes-2.js — supplemental escape node tuning
if (typeof ESCAPE_NODES !== 'undefined') {
  Object.keys(ESCAPE_NODES).forEach(function(k){
    var n = ESCAPE_NODES[k];
    if (!n.body || !Array.isArray(n.body)) n.body = ['...'];
    if (!n.choices || !n.choices.length) {
      n.choices = [{ label:'계속', to:'ENDING', effect:{}, onSuccess:['계속 전진한다.'] }];
    }
  });
}
