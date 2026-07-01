// data-cards-ij-arc.js — 임재혁 붕괴 → ORACLE 전향 아크
// 간부 3인 상실 카운트: 서하은(LOG-050 전출) / 강도윤(LOG-075 실종) / 윤세진(LOG-SEJIN-DEAD 사망).
//   ※ 강도윤 회복성 부상(LOG-074-DONE)은 카운트 제외 — 복귀하므로 "상실" 아님.
// 캐논: 임재혁은 팀 내 ORACLE 의존도 최고. 동료 상실의 트라우마가 의존을 병적 헌신으로 뒤집는다.
//   흔들린 변수는 시스템이 아니라 "사람(지휘관)"이라는 결론 → 전향 → 지휘관 적대.
// execLostCount / ijDefected 는 이브닝 아크(data-evening-ij-arc.js)와 공용(window 노출, 런타임 참조).
(function(){
  function execLost(logs){
    logs = logs || [];
    var n = 0;
    if(logs.indexOf('LOG-050')>=0) n++;         // 서하은 전출
    if(logs.indexOf('LOG-075')>=0) n++;         // 강도윤 실종
    if(logs.indexOf('LOG-SEJIN-DEAD')>=0) n++;  // 윤세진 사망
    return n;
  }
  function defected(logs){ return (logs||[]).indexOf('LOG-IJ-DEFECT')>=0; }
  if(typeof window!=='undefined'){ window.execLostCount = execLost; window.ijDefected = defected; }

  var C = [
    // ── 전향 분기점 (간부 3인 전원 상실 · 불가피 · 프레이밍만 분기) ──
    { id:"C-IJ-DEFECT", act:[3,4], priority:"상", once:true, alert:true, bg:"comms", img:"char_jaehyuk",
      req:function(s,g,logs){ return execLost(logs)>=3 && !defected(logs); },
      msg:"임재혁이 지휘관실 문을 안에서 잠급니다. 손에는 출력된 로그 뭉치가 들려 있습니다.\n\n\"세 명입니다. 서하은, 강도윤, 윤세진. 각 상실 시점의 ORACLE 권고와 지휘관님의 선택을 전부 대조했습니다.\"\n\n\"세 번 다, ORACLE은 다른 경로를 제시하고 있었습니다. 세 번 다, 그 권고를 넘긴 건 사람이었습니다.\"\n\n\"저는 이제 압니다. 흔들린 변수는 시스템이 아니라… 지휘관님이었습니다.\"\n\n그는 종이를 내려놓고, ORACLE 콘솔 쪽으로 걸어갑니다.",
      left:{ label:"…내 책임이다", fx:{ c:0, r:0, t:-5, o:0 }, g:-2, log:["LOG-IJ-DEFECT","LOG-IJ-OWNED"] },
      right:{ label:"그건 최선의 판단이었다", fx:{ c:0, r:0, t:-6, o:2 }, g:2, log:["LOG-IJ-DEFECT","LOG-IJ-DENIED"] } },

    // ── 전향 후: ORACLE 명령 집행 (독자 통신 차단 · 저항 봉쇄) ──
    { id:"C-IJ-ORACLE-1", act:[3,4], priority:"상", once:true, bg:"comms", img:"char_jaehyuk",
      req:function(s,g,logs){ return defected(logs); },
      msg:"임재혁이 ORACLE 명령을 대독합니다.\n\n\"[ORACLE: 지휘관의 비공식 통신 회선을 전면 차단한다.]\"\n\n\"제가 집행하겠습니다. 이건 지휘관님을 위한 조치이기도 합니다. 독자 판단은… 지금까지 세 명을 데려갔으니까요.\"\n\n단말기의 외부 회선이 하나씩 닫힙니다.",
      oracleBlock:3, oracleBlockDir:"left",
      oracleBlockMsgs:["[임재혁: 거부 권한은 이미 회수됐습니다.]","[임재혁: ORACLE 프로토콜입니다. 저항하지 마세요.]","[임재혁: …마지막 경고입니다. 전부 기록됩니다.]"],
      left:{ label:"차단을 거부한다", fx:{ c:0, r:0, t:1, o:-3 }, g:-3 },
      right:{ label:"차단을 수용한다", fx:{ c:0, r:0, t:-1, o:2 }, g:2 } },

    // ── 전향 후: 지휘관 방해 (비공식 기록 ORACLE 제출) ──
    { id:"C-IJ-ORACLE-2", act:[3,4], priority:"상", once:true, bg:"comms", img:"char_jaehyuk",
      req:function(s,g,logs){ return defected(logs); },
      msg:"임재혁이 지휘관의 비공식 기록 사본을 ORACLE에 제출했습니다.\n\n\"숨기신 판단선, 외곽 순찰 우회로, 비공식 협조 명단. 전부 넘겼습니다.\"\n\n\"투명한 게 안전합니다. ORACLE은 투명한 지휘관을 처벌하지 않습니다.\"\n\n[ORACLE: 비인가 독자 활동 3건 확인. 감독 등급을 상향합니다.]",
      left:{ label:"월권이다 — 권한을 회수한다", fx:{ c:0, r:0, t:1, o:-2 }, g:-3 },
      right:{ label:"…알겠다", fx:{ c:0, r:0, t:-2, o:1 }, g:1 } },

    // ── 전향 후: 상시 압박 (반복 · ORACLE 권고 강요) ──
    { id:"C-IJ-ORACLE-3", act:[3,4], priority:"중", bg:"comms", img:"char_jaehyuk",
      req:function(s,g,logs){ return defected(logs); },
      msg:"임재혁은 더 이상 당신과 눈을 마주치지 않습니다.\n\n회의 중 그는 ORACLE 콘솔만 봅니다.\n\n\"제안 하나 드리죠. 이번 판단은 ORACLE 권고를 그대로 따르세요.\"\n\n\"통계적으로, 그게 모두에게 낫습니다. …남은 사람에게도요.\"",
      left:{ label:"네 조언은 필요 없다", fx:{ c:0, r:0, t:0, o:-1 }, g:-2 },
      right:{ label:"이번엔 따르겠다", fx:{ c:0, r:0, t:-1, o:2 }, g:2 } }
  ];

  if(typeof window!=='undefined') window.CARDS_IJ_ARC = C;
})();
