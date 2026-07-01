// data-evening-ij-arc.js — 임재혁 간부 상실 붕괴 이브닝 라인 (urgent · 계단식)
// execLostCount 공용 헬퍼(data-cards-ij-arc.js) 런타임 참조. 전향(LOG-IJ-DEFECT) 후엔 이브닝 접촉 차단(components-evening.js).
// 계단: 상실 1 → 시스템으로 애도 회피 / 상실 2 → ORACLE을 유일한 안정처로 / 상실 2(후일) → 지휘관 판단 재감사(비난의 씨앗).
(function(){
  if(typeof EVENING_CHATS==='undefined'){ return; }
  function lost(logs){ return (typeof window!=='undefined'&&window.execLostCount)?window.execLostCount(logs):0; }
  function gate(min){ return function(ctx){ var logs=(ctx&&ctx.logs)||[]; return logs.indexOf('LOG-IJ-DEFECT')<0 && lost(logs)>=min; }; }

  EVENING_CHATS.push(
    { char:'임재혁', act:[2,3,4], dayMin:5, dayMax:99, priority:'urgent', responseKey:'ij_break_1', condFn:gate(1),
      lines:[
        "한 사람이 빠지면 남은 사람에게 업무가 재분배됩니다. 계산으로는 그렇게 처리하면 됩니다.",
        "…그런데 계산이 안 끝나요. 왜 하필 그 사람이어야 했는지, 그 부분이 계속 남습니다.",
        "ORACLE 로그를 다시 봤습니다. 그 판단 시점에, ORACLE은 다른 경로를 권고하고 있었더군요."
      ] },
    { char:'임재혁', act:[2,3,4], dayMin:6, dayMax:99, priority:'urgent', responseKey:'ij_break_2', condFn:gate(2),
      lines:[
        "또 한 자리가 비었습니다.",
        "이상하죠. 봉쇄선도, 자원도, ORACLE 예측 범위 안에서 움직입니다. 흔들리는 건 늘 사람 쪽입니다.",
        "요즘은 ORACLE 콘솔 앞에 있을 때가 제일 편합니다. 저건, 최소한 갑자기 사라지진 않으니까요."
      ] },
    { char:'임재혁', act:[3,4], dayMin:8, dayMax:99, priority:'urgent', responseKey:'ij_break_3', condFn:gate(2),
      lines:[
        "밤마다 그 판단들을 다시 돌려봅니다. 각 시점에 ORACLE이 뭘 권고했고, 지휘관님이 뭘 선택했는지.",
        "…패턴이 보입니다. 어긋난 지점마다, 사람이 개입했더군요.",
        "오해는 마세요. 비난이 아닙니다. 그냥… 데이터가 그렇게 말하고 있어서요."
      ] }
  );
})();
