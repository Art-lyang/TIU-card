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
      msg: fe.cardMsg || (fe.name + ' 확장 제안이 도착했습니다.'),
      left: fe.cardLeft || { label:'보류', fx:{}, g:0 },
      right: fe.cardRight || { label:'승인', fx:{}, g:0 }
    });
  });
})();
