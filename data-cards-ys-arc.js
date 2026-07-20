// data-cards-ys-arc.js — 윤세진 연구 지원 아크
// 설비 증설 요청 · 연구 지연 카운트(LOG-SEJIN-DELAY-*) · 장비 노후 격리 실패로 사망(LOG-SEJIN-DEAD) · 사후 변이/추모
// 전부 로그 기반. 지연 카운트는 window.ysDelayCount로 공용(이브닝 라인 등에서 재사용).
(function(){
  function ysDelay(logs){ return (logs||[]).filter(function(l){ return /^LOG-SEJIN-DELAY-/.test(l); }).length; }
  function dead(logs){ return (logs||[]).indexOf('LOG-SEJIN-DEAD')>=0; }
  if(typeof window!=='undefined') window.ysDelayCount = ysDelay;

  var C = [
    // ── 설비 증설 요청 (승인/보류) ──
    { id:"C-YS-EQUIP", act:[2,3], priority:"중", once:true, bg:"lab", img:"char_sejin",
      req:function(s,g,logs){ return logs.indexOf('LOG-INTRO-YS')>=0 && s.day>=11 && !dead(logs); },
      msg:"윤세진이 분석 장비 목록을 내밉니다.\n\n\"격리 용기와 분석기가 한계입니다. 지금 장비로는 이변체 표본을 오래 유지하지 못해요.\"\n\n\"연구실 설비 증설을 승인해 주세요. 자원이 들지만… 이걸 미루면 언젠가 사고가 납니다.\"",
      left:{ label:"설비 증설 승인", fx:{ c:0, r:-8, t:2, o:-1 }, g:-1, log:'LOG-SEJIN-EQUIP-OK' },
      right:{ label:"지금은 보류", fx:{ c:0, r:0, t:-3, o:0 }, g:1, log:'LOG-SEJIN-DELAY-EQUIP' } },

    // ── 사망 이벤트 (지연 4회 이상) ──
    { id:"C-YS-DEATH", act:[3,4], priority:"상", once:true, alert:true, bg:"lab",
      req:function(s,g,logs){ return ysDelay(logs)>=4 && logs.indexOf('LOG-INTRO-YS')>=0 && !dead(logs); },
      msg:"연구실 격리 용기가 굉음과 함께 균열. 노후된 냉각·봉인 장비가 동시에 오류를 냈습니다.\n\n윤세진: \"봉쇄선까지 번지기 전에 여기서 끊어야 해요. 데이터는… 마지막까지 저장하겠습니다.\"\n\n임재혁: \"윤세진! 지금 나와요!\"\n\n격벽이 내려오고, 안쪽 바이탈 신호가 하나씩 꺼집니다.",
      left:{ label:"자료 저장을 우선 — 그녀의 선택을 존중", fx:{ c:0, r:0, t:-6, o:-2 }, g:-3, log:['LOG-SEJIN-DEAD','LOG-SEJIN-DATA-SAVED'] },
      right:{ label:"봉쇄를 우선 — 즉시 격벽 폐쇄", fx:{ c:3, r:0, t:-8, o:0 }, g:-2, log:['LOG-SEJIN-DEAD','LOG-SEJIN-CONTAIN'] } },

    // ── 사후 변이본 6종 (원본과 동일 req + 사망 조건) ──
    { id:"C-031-D", act:[2,3], priority:"중", once:true,
      req:function(s,g,logs){ return s.day>=6 && logs.indexOf("LOG-004")>=0; }, cond:function(s,g,logs){ return dead(logs) && logs.indexOf('LOG-IJ-DEFECT')<0; },
      msg:"임재혁이 윤세진의 관측 일지를 넘겨봅니다.\n\n\"Shell Talker 활동 반경 40% 확대 — 여기까지가 그녀가 기록한 마지막 패턴입니다.\"\n\n\"이변체는 계속 움직이는데, 읽어낼 사람이 없습니다.\"",
      left:{ label:"유작 데이터로 대응선 유지", fx:{ c:1, r:0, t:1, o:0 }, g:0 },
      right:{ label:"ORACLE 자동 분석에 맡긴다", fx:{ c:0, r:0, t:0, o:1 }, g:1 } },
    { id:"C-062-D", act:[3,4], priority:"중", once:true,
      req:function(s,g,logs){ return s.day>=6 && logs.indexOf("LOG-009")>=0; }, cond:function(s,g,logs){ return dead(logs) && logs.indexOf('LOG-IJ-DEFECT')<0; },
      msg:"블랙존 경계 확대 보고가 다시 올라왔습니다.\n\n\"'EV-Σ는 이렇게 움직이지 않는다.' 윤세진이 남긴 메모입니다.\"\n\n임재혁: \"그녀라면 답을 찾았을 겁니다. 우린 아직 못 찾았습니다.\"",
      left:{ label:"메모를 근거로 재분석 시도", fx:{ c:0, r:-1, t:1, o:0 }, g:-1 },
      right:{ label:"본부 판단을 따른다", fx:{ c:0, r:0, t:0, o:1 }, g:1 } },
    { id:"C-064-D", act:[3], priority:"중", once:true,
      req:function(s,g,logs){ return logs.indexOf("LOG-005")>=0; }, cond:function(s,g,logs){ return dead(logs) && logs.indexOf('LOG-IJ-DEFECT')<0; },
      msg:"윤세진의 연구실은 봉인됐습니다. 임재혁이 그녀가 남긴 Blood Pit 분석 노트를 정리합니다.\n\n\"…여기까지가 그녀가 본 전부입니다. 이어받을 사람이 없습니다.\"",
      left:{ label:"유작 데이터 보존", fx:{ c:0, r:0, t:1, o:0 }, g:-1 },
      right:{ label:"연구 종결 처리", fx:{ c:0, r:0, t:0, o:1 }, g:1 } },
    { id:"C-065-D", act:[3], priority:"중", once:true,
      req:function(s,g,logs){ return logs.indexOf("LOG-004")>=0; }, cond:function(s,g,logs){ return dead(logs) && logs.indexOf('LOG-IJ-DEFECT')<0; },
      msg:"윤세진이 만들던 음성 감별 알고리즘은 미완성으로 남았습니다.\n\n임재혁: \"절반은 돌아갑니다. 나머지는… 그녀 머릿속에 있었어요.\"",
      left:{ label:"미완 알고리즘이라도 배치", fx:{ c:1, r:0, t:0, o:0 }, g:0 },
      right:{ label:"오탐 위험 — 보류", fx:{ c:0, r:0, t:0, o:1 }, g:0 } },
    { id:"C-067-D", act:[3,4], priority:"상", once:true,
      req:function(s,g,logs){ return logs.indexOf("LOG-005")>=0; }, cond:function(s,g,logs){ return dead(logs) && logs.indexOf('LOG-IJ-DEFECT')<0 && logs.indexOf("LOG-017")<0; },
      msg:"억제제 시제품은 마지막 임상 직전에서 멈췄습니다.\n\n임재혁: \"윤세진의 데이터가 없으면 여기서 더 못 갑니다. Phase 0에서 사람을 구할 수 있었는데.\"",
      left:{ label:"남은 자료로 임상 강행", fx:{ c:0, r:-2, t:-1, o:-1 }, g:-2, log:"LOG-017" },
      right:{ label:"연구 동결", fx:{ c:0, r:0, t:0, o:1 }, g:0 } },
    { id:"C-087-D", act:[4], priority:"상", once:true,
      req:function(s,g,logs){ return g<=30 && logs.indexOf("LOG-003")>=0; }, cond:function(s,g,logs){ return dead(logs) && logs.indexOf('LOG-IJ-DEFECT')<0; },
      msg:"프로메테우스 억제 약물 자료가 다시 확인됐습니다.\n\n\"윤세진이라면 우리 연구와 합쳤을 겁니다.\" 임재혁이 말끝을 흐립니다.\n\n\"이제 합칠 연구가 없습니다.\"",
      left:{ label:"자료만이라도 보관", fx:{ c:0, r:0, t:0, o:-1 }, g:-2 },
      right:{ label:"ORACLE에 보고", fx:{ c:0, r:0, t:-1, o:2 }, g:2 } },

    // ── 연구 진척별 ORACLE 견제 (자율성 침해 · 각 연구 완료 로그 조건 · 사망 후 억제) ──
    { id:"C-YS-ORACLE-SPEC", act:[2,3], priority:"중", once:true,
      req:function(s,g,logs){ return logs.indexOf('LOG-INTRO-YS')>=0 && logs.indexOf('LOG-RES-012')>=0 && !dead(logs); },
      msg:"ORACLE이 윤세진의 표본 분석 결과를 검토하고 있습니다.\n\n[ORACLE: 해당 데이터의 기밀 등급을 상향합니다. 이후 이 연구의 모든 기록은 본부 전용 채널로만 공유됩니다.]\n\n윤세진: \"제 분석을 팀과 공유할 수 없다는 뜻입니까?\"",
      left:{ label:"팀과의 공유를 우선", fx:{ c:0, r:0, t:1, o:-1 }, g:-2 },
      right:{ label:"ORACLE 보안 정책 수용", fx:{ c:0, r:0, t:0, o:2 }, g:2 } },
    { id:"C-YS-ORACLE-LIGHT", act:[2,3], priority:"중", once:true,
      req:function(s,g,logs){ return logs.indexOf('LOG-INTRO-YS')>=0 && logs.indexOf('LOG-RES-LIGHT')>=0 && !dead(logs); },
      msg:"광반응 약점 데이터가 봉쇄선에 적용 가능한 수준입니다.\n\n[ORACLE: 현장 배치 전 본부 검증이 필수입니다. 예상 소요: 14일.]\n\n임재혁: \"하루가 급한데 2주를 기다린다고요?\"",
      left:{ label:"즉시 현장 배치", fx:{ c:1, r:0, t:1, o:-1 }, g:-3 },
      right:{ label:"본부 검증 일정 수용", fx:{ c:0, r:0, t:-1, o:2 }, g:2 } },
    { id:"C-YS-ORACLE-JOINT", act:[3,4], priority:"상", once:true,
      req:function(s,g,logs){ return logs.indexOf('LOG-INTRO-YS')>=0 && logs.indexOf('LOG-RES-JOINT')>=0 && !dead(logs); },
      msg:"합동 연구가 ORACLE 예측 모델의 편향을 입증했습니다.\n\n[ORACLE: 해당 분석의 방법론 검증을 개시합니다.]\n\n[ORACLE: 임재혁 분석관의 쿼리 역분석 기법을 시스템 무결성 침해 위험으로 분류합니다.]\n\n윤세진: \"…이건 검증이 아니라 감시예요.\"",
      left:{ label:"연구 결과 공개를 지속", fx:{ c:0, r:-1, t:1, o:-2 }, g:-4 },
      right:{ label:"분석 방법을 수정해 진행", fx:{ c:0, r:0, t:-1, o:3 }, g:3 } },
    { id:"C-YS-ORACLE-SUPPRESS", act:[3,4], priority:"상", once:true,
      req:function(s,g,logs){ return logs.indexOf('LOG-INTRO-YS')>=0 && logs.indexOf('LOG-017')>=0 && !dead(logs); },
      msg:"억제제 시제품이 완성됐습니다. Phase 0 감염자를 구할 수 있습니다.\n\n[ORACLE: 임상 결과의 신뢰성 재평가가 필요합니다. 추가 데이터 500건 이상 수집 권고.]\n\n윤세진: \"그럼 언제 배치하나요?\"\n\n[ORACLE: 재평가 완료 후. 예상 30일 이상.]",
      left:{ label:"현장 배치를 강행", fx:{ c:0, r:-2, t:1, o:-3 }, g:-4 },
      right:{ label:"추가 재평가 수용", fx:{ c:0, r:-1, t:-1, o:3 }, g:2 } },

    // ── 추모 / 여파 (자료 보존 여부로 분기) ──
    { id:"C-YS-MEMORIAL", act:[3,4], priority:"중", once:true, bg:"lab",
      req:function(s,g,logs){ return dead(logs) && logs.indexOf('LOG-IJ-DEFECT')<0; },
      msg:function(){ try{ var L=(typeof window!=='undefined'&&window.__ts_liveLogs)||[];
        if(L.indexOf('LOG-SEJIN-DATA-SAVED')>=0)
          return "봉인된 연구실 앞. 임재혁이 윤세진의 마지막 저장 드라이브를 지휘관에게 건넵니다.\n\n\"…그녀가 끝까지 지킨 자료입니다. 언젠가 이걸 이어받을 사람이 오겠죠.\"\n\n연구실 문에는 그녀의 이름표가 그대로 남아 있습니다.";
        return "봉인된 연구실 앞. 격벽 안쪽은 지켜졌지만, 그 안의 자료도 함께 사라졌습니다.\n\n임재혁: \"기지는 지켰습니다. 대신… 그녀가 본 것을 우린 영영 모르게 됐습니다.\"\n\n연구실 문에는 그녀의 이름표가 그대로 남아 있습니다.";
      }catch(e){ return "봉인된 연구실 앞. 임재혁이 오래 서 있습니다."; } },
      left:{ label:"연구실을 그대로 둔다", fx:{ c:0, r:0, t:1, o:0 }, g:0 },
      right:{ label:"장비를 회수해 재배치", fx:{ c:0, r:3, t:0, o:0 }, g:0 } }
  ];

  if(typeof window!=='undefined') window.CARDS_YS_ARC = C;
})();
