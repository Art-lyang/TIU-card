// data-cards-facility-propose.js — facility proposal cards auto-generator
var CARDS_FACILITY_PROPOSALS = [];
(function(){
  if (typeof FACILITY_EXPANSIONS === 'undefined') return;

  function isUnavailable(feId){
    try{
      var fac = (typeof Save !== 'undefined' && Save.getFacility) ? Save.getFacility() : null;
      if(!fac) return false;
      var all = [].concat(fac.approved||[], fac.pending||[], fac.completed||[], fac.proposed||[]);
      return all.indexOf(feId) >= 0;
    }catch(err){ return false; }
  }

  FACILITY_EXPANSIONS.forEach(function(fe, idx){
    CARDS_FACILITY_PROPOSALS.push({
      id: 'FP-' + fe.id,
      act: [1,2,3],
      priority: idx < 4 ? '중' : '하',
      isFacilityProposal: true,
      feId: fe.id,
      tag: 'facility-proposal-' + fe.id,
      req: function(s){
        var minDay = fe.minDay || 1;
        var minAct = fe.minAct || 1;
        return s.day >= minDay && (s.day <= 29) && minAct <= ((s.day >= 29) ? 4 : (s.day >= 14 ? 3 : (s.day >= 5 ? 2 : 1))) && !isUnavailable(fe.id);
      },
      msg: function(){var view=typeof getFacilityExpansionView==='function'?getFacilityExpansionView(fe):fe;return view.cardMsg || (view.name + ' expansion proposal received.');},
      left: Object.assign({}, fe.cardLeft || { fx:{}, g:0 }, { label:function(){var view=typeof getFacilityExpansionView==='function'?getFacilityExpansionView(fe):fe;return (view.cardLeft&&view.cardLeft.label)||'Defer proposal';} }),
      right: Object.assign({}, fe.cardRight || { fx:{}, g:0 }, { label:function(){var view=typeof getFacilityExpansionView==='function'?getFacilityExpansionView(fe):fe;return (view.cardRight&&view.cardRight.label)||'Approve expansion';} })
    });
  });
})();
