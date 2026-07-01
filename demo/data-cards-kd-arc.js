// data-cards-kd-arc.js — 강도윤 손실(LOG-075) 추모·여파 카드
// LOG-075(비상 터널 미구축 시 후미 방어 중 행방불명 = 사실상 사망) 후 등장.
// 강도윤 재등장 카드는 기존 req(!LOG-075 && !LOG-074-DONE)로 이미 억제됨(C-107/C-110 등), CE-042C가 최종결산 반영.
// 여기서는 손실 이후의 추모·지휘 공백·팀 여파만 신규로 다룬다.
(function(){
  function lost(logs){ return (logs||[]).indexOf('LOG-075')>=0; }
  var C = [
    // ── 추모: 남겨진 작전 일지 ──
    { id:"C-KD-MEMORIAL", act:[3,4], priority:"중", once:true, bg:"base",
      req:function(s,g,logs){ return lost(logs); },
      msg:"강도윤의 자리에는 그가 마지막까지 손에 쥐고 있던 작전 일지가 남았습니다.\n\n마지막 장, 미완성 문장 하나: \"비상 터널만 있었다면—\"\n\n한 요원이 낮게 말합니다: \"…그가 늘 말하던 걸, 우리가 못 들었던 거예요.\"",
      left:{ label:"일지를 현장 교범에 편입한다", fx:{ c:1, r:0, t:1, o:0 }, g:0 },
      right:{ label:"개인 유품으로 봉인한다", fx:{ c:0, r:0, t:2, o:0 }, g:-1 } },

    // ── 여파: 전술지휘 공백 ──
    { id:"C-KD-VACUUM", act:[3,4], priority:"상", once:true, alert:true, bg:"base",
      req:function(s,g,logs){ return lost(logs) && logs.indexOf('LOG-050')<0; },
      msg:"전술지휘 공백이 발생했습니다. 봉쇄선 현장 지휘를 누가 맡을지 결정해야 합니다.\n\n[ORACLE: 지휘 인프라 안정을 위해 현장 지휘를 ORACLE 원격 통제로 이관할 것을 권고합니다.]\n\n서하은: \"현장은 사람이 봐야 합니다. 제가 겸임하겠습니다. …그 사람이라면 그렇게 했을 거예요.\"",
      left:{ label:"서하은 임시 겸임", fx:{ c:0, r:-1, t:2, o:-1 }, g:-2 },
      right:{ label:"ORACLE 원격 지휘 수용", fx:{ c:1, r:0, t:-1, o:2 }, g:2 } },

    // ── 여파: 전술지휘 공백 (서하은 부재 변이 · ORACLE 원격 지휘) ──
    { id:"C-KD-VACUUM-B", act:[3,4], priority:"상", once:true, alert:true, bg:"base",
      req:function(s,g,logs){ return lost(logs) && logs.indexOf('LOG-050')>=0 && logs.indexOf('ONCE-C-KD-VACUUM')<0 && logs.indexOf('LOG-IJ-DEFECT')<0; },
      msg:"전술지휘 공백이 발생했습니다. 서하은도 이미 떠난 지금, 현장을 사람 눈으로 볼 지휘자가 없습니다.\n\n[ORACLE: 지휘 인프라 안정을 위해 현장 지휘를 ORACLE 원격 통제로 이관할 것을 권고합니다.]\n\n임재혁: \"…받아들이는 게 낫습니다. 사람은 계속 사라지고, ORACLE은 안 사라지니까요.\"",
      left:{ label:"임시로 직접 지휘한다", fx:{ c:0, r:-1, t:1, o:-1 }, g:-2 },
      right:{ label:"ORACLE 원격 지휘 수용", fx:{ c:1, r:0, t:-1, o:2 }, g:2 } },

    // ── 여파: 팀이 그를 지우지 않는다 ──
    { id:"C-KD-ECHO", act:[3,4], priority:"하", once:true, bg:"forest",
      req:function(s,g,logs){ return lost(logs); },
      msg:"야간 순찰조가 사각지대 점검 방식을 바꿨습니다. 묻지 않아도, 강도윤이 하던 방식 그대로였습니다.\n\n한 요원: \"…선임이 그렇게 하셨으니까요.\"\n\n말은 없지만, 팀은 그를 지우지 않았습니다.",
      left:{ label:"그 방식을 표준으로 정한다", fx:{ c:1, r:0, t:1, o:0 }, g:0 },
      right:{ label:"각자 판단에 맡긴다", fx:{ c:0, r:0, t:1, o:0 }, g:0 } }
  ];
  if(typeof window!=='undefined') window.CARDS_KD_ARC = C;
})();
