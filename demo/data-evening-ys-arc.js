// data-evening-ys-arc.js — 윤세진 연구 지연 누적 시 초조·불안 이브닝 라인
// 지연 카운트(LOG-SEJIN-DELAY-*) 2/3/4 계단으로 격화. priority:'urgent'라 조건 충족 시 최우선 노출.
// 사망(LOG-SEJIN-DEAD) 후엔 condFn + isEveningContactUnavailableByLogs로 이중 차단.
(function(){
  if(typeof EVENING_CHATS==='undefined')return;
  function ysDelay(logs){ return (logs||[]).filter(function(l){ return /^LOG-SEJIN-DELAY-/.test(l); }).length; }
  function gate(min){ return function(p){ var logs=(p&&p.logs)||[]; return logs.indexOf('LOG-INTRO-YS')>=0 && logs.indexOf('LOG-SEJIN-DEAD')<0 && ysDelay(logs)>=min; }; }
  EVENING_CHATS.push(
    { char:'윤세진', act:[2,3], dayMin:11, dayMax:99, priority:'urgent', responseKey:'sejin_anxiety_1', condFn:gate(2),
      lines:[
        "지휘관님. …요즘 잠이 잘 안 와요.",
        "미뤄둔 분석이 자꾸 쌓이는데, 이변체는 저를 안 기다려 주거든요.",
        "제가 조급한 걸까요. 그냥… 시간이 없다는 느낌이 계속 듭니다."
      ] },
    { char:'윤세진', act:[2,3], dayMin:11, dayMax:99, priority:'urgent', responseKey:'sejin_anxiety_2', condFn:gate(3),
      lines:[
        "장비가 또 경고를 냈어요. 임시로 붙잡아 뒀지만… 언제까지 버틸지 모르겠습니다.",
        "솔직히 말하면, 무섭습니다. 제 손에서 뭔가 잘못될까 봐.",
        "지원이 조금만 더 있었으면… 아니에요. 제가 어떻게든 해볼게요."
      ] },
    { char:'윤세진', act:[2,3], dayMin:11, dayMax:99, priority:'urgent', responseKey:'sejin_anxiety_3', condFn:gate(4),
      lines:[
        "…괜찮아요. 괜찮습니다. 계속 그렇게 되뇌고 있어요.",
        "표본도, 장비도, 저도 한계예요. 그래도 놓으면 안 되잖아요.",
        "혹시… 제게 무슨 일이 생기면, 데이터는 꼭 남겨 주세요. 그거면 됩니다."
      ] }
  );
})();
