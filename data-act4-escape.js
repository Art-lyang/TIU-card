// data-act4-escape.js — Act4 탈출 체인 CH-007 + 엔딩 E/E_c/E_bad
// 로드 순서: data-endings.js 다음, app-init.js 이전
// 기존 전역(LOGS / CHAINS / ENDING_DEFS / CARDS_ACT4)에 주입

// ═══════════════════ 1. LOG 8종 ═══════════════════
(function(){
  var newLogs = [
    { id:"LOG-SHELLTALKER-CAP", title:"SPEC-011 격리 포착 [비공식]",
      content:"[임재혁 비공식 분석]\n\nORACLE 아키텍처 격리 레이어 내 연구 블록 1건 포착.\n메타데이터 태그: SPEC-011 / 음성 패턴 학습체 / 보존 중.\n접근 권한: 없음. 존재만 확인됨.\n\n보존 음성 패턴 목록 중 식별 가능 항목:\n— 박상훈 중위 (실종 처리 / 지부 설립 이전 강원 작전 소속)\n\n결론: KR-INIT-001 내부에 쉘 토커 1체가 비공개 보관되어 있다.\n지휘관도 모르는 시설.\n이 개체는 박상훈 중위를 포식했다." },
    { id:"LOG-VOSS-STANDBY", title:"암호 대기 채널 저장",
      content:"[미등록 통신 채널]\n\n발신자: 마르쿠스 베버\n채널: ORACLE 감시 범위 외\n메시지: \"원할 때 회신하십시오.\"\n\n긴급 탈출선. 사용 여부 미정." },
    { id:"LOG-GENERAL-ROUTE", title:"탈출 루트: 기지 정문 돌파",
      content:"[작전 기록]\n\n선택된 루트: 기지 정문 경유 외곽 감염 구역 관통.\n초기 난이도: 어려움 (검문 돌파)\n후반 난이도: 쉬움 (외곽 감염체 밀도 낮음)\n조우 가능성: 야외 쉘 토커" },
    { id:"LOG-B3-ROUTE", title:"탈출 루트: B3 비상구",
      content:"[작전 기록]\n\n선택된 루트: B3 하강 — 비상 복도 — 격리실 경유.\n초기 난이도: 쉬움 (감시 공백)\n후반 난이도: 어려움 (격리실 조우 회피 불가)\n조우 고정: 격리실 쉘 토커 보스전" },
    { id:"LOG-ESCAPE-TRIG", title:"탈출 작전 개시",
      content:"[ORACLE 로그 외부]\n\n작전 코드명: QUIET DEPARTURE\n개시 시각: 03:47\n동행자: 자동 판정됨\n상태: 진행 중" },
    { id:"LOG-ESCAPE-CLEAR", title:"탈출 작전 — 성공",
      content:"[프로메테우스 암호 채널]\n\n해안 접선점 도달.\n지휘관 이중철 및 동행자 수습 완료.\nORACLE 감지 지연 시간: 약 6시간.\n상태: UNLINKED." },
    { id:"LOG-ESCAPE-FAIL", title:"탈출 작전 — 표적 무력화",
      content:"[ORACLE FINAL LOG]\n\nSIGNAL ACQUIRED.\nTARGET NEUTRALIZED.\n\n세션 작전 종료.\n재배치 불가." },
    { id:"LOG-ESCAPE-UNLUCKY", title:"탈출 작전 — LOST IN TRANSIT",
      content:"[기록 공백]\n\n작전 중단 지점 불명.\n사전 경고 누락 — 음성 모방형 개체와의 조우.\n\n회수된 음성 로그 마지막 3초:\n\"지휘관님. 접니다. 박상훈입니다. ...들립니까.\"\n\n[그 뒤는 기록되지 않음]" }
  ];
  if(typeof ORACLE_LOGS!=='undefined') newLogs.forEach(function(l){ ORACLE_LOGS.push(l); });
})();

// ═══════════════════ 2. ENDING_DEFS 확장 ═══════════════════
if(typeof ENDING_DEFS!=='undefined'){
  ENDING_DEFS.E = { name:"탈출",
    narrative:[
      "차량이 해안 방벽 외곽을 벗어났다.",
      "",
      "검은 바다. 파도 소리.",
      "접선점에 세 사람이 서 있었다.",
      "",
      "베버. 그리고 그 옆에 — 낯익지 않은 여성.",
      "\"에이전트 강입니다.\" 베버가 짧게 소개했다.",
      "\"이 작전 내내 당신을 관측해왔습니다. 지금껏 이름을 드리지 못했습니다.\"",
      "",
      "그녀 옆에는 닉 포스터. 그는 고개를 짧게 숙였다. 사과는 아니었다.",
      "하지만 표정에서 무언가가 풀려 있었다.",
      "",
      "\"ORACLE이 당신의 부재를 감지하는 데 약 6시간이 걸릴 겁니다.\" 강이 말했다.",
      "\"그때쯤이면 당신들은 이미 다른 이름으로 존재하게 될 겁니다.\"",
      "",
      "당신은 뒤를 돌아보지 않았다.",
      "",
      "[세션 종료 — OPERATOR STATUS: UNLINKED]",
      "[OBSERVATION: 연결이 끊겼습니다]"
    ]
  };
  ENDING_DEFS.E_c = { name:"SIGNAL ACQUIRED",
    narrative:[
      "교전 중 피탄.",
      "",
      "마지막 시야 — 흐릿한 콘크리트. 희미한 조명.",
      "",
      "무전기에서 한 줄의 문장:",
      "",
      "> SIGNAL ACQUIRED.",
      "> TARGET NEUTRALIZED.",
      "",
      "ORACLE은 기록을 갱신했다.",
      "",
      "[ERROR: OPERATOR OFFLINE]",
      "[재배치 대상 없음]"
    ]
  };
  ENDING_DEFS.E_bad = { name:"LOST IN TRANSIT",
    narrative:[
      "격리실 너머에서 목소리가 들렸다.",
      "",
      "\"지휘관님. 접니다. 박상훈입니다.\"",
      "",
      "박상훈 중위. 지부 설립 이전에 실종 처리된 장교.",
      "당신은 그것을 알고 있었다. 그랬다면 —",
      "",
      "망설임. 0.4초.",
      "",
      "그것이면 충분했다.",
      "",
      "음성 모방형 개체가 격벽 그림자에서 튀어나왔다.",
      "첫 타격은 정확했다.",
      "",
      "준비되지 않은 자에게는 준비되지 않은 결말이 온다.",
      "",
      "[LOST IN TRANSIT]",
      "[기록 중단 — 좌표 불명]"
    ]
  };
}

// ═══════════════════ 3. 신규 카드 3장 (Act3 힌트 / Act3 빌드업 / Act4 제안) ═══════════════════
var CARDS_ESCAPE_EXTRA = [
  // Act3 초반 힌트 카드 — 임재혁
  { id:"C-HINT-SHELLTALKER", act:[3], once:true, priority:"상",
    req:function(s,g,logs){ return s.day>=15 && s.day<=24 && logs.indexOf('LOG-SHELLTALKER-CAP')<0; },
    msg:"임재혁이 비공식 보고를 가져왔습니다.\n\n\"지휘관님. ORACLE 아키텍처 격리 레이어에서 뭔가 포착했습니다.\"\n\n\"제 권한으론 접근 불가인데, 메타데이터 태그만 잡혔습니다.\"\n\n\"태그 — 'SPEC-011 / 음성 패턴 학습체 / 보존 중'.\"\n\n\"...이 기지 어딘가에, 쉘 토커 한 개체가 비공개 보관되어 있다는 뜻입니다.\"",
    left:{ label:"기록해둬라", fx:{c:0,r:0,t:1,o:-2}, g:-2, log:"LOG-SHELLTALKER-CAP" },
    right:{ label:"착오일 것이다", fx:{c:0,r:0,t:-1,o:1}, g:1 } },

  // Act3 후반 빌드업 카드 — 베버 대기 채널
  { id:"CA3-VOSS-STANDBY", act:[3], once:true, priority:"상",
    req:function(s,g,logs){
      return s.day>=22
        && g<=-10
        && logs.indexOf('ONCE-CH-005-3')>=0
        && logs.indexOf('LOG-SHELLTALKER-CAP')>=0
        && logs.indexOf('LOG-VOSS-STANDBY')<0;
    },
    msg:"단말기 외부 채널에 미등록 신호가 들어왔습니다.\nORACLE 로그에는 기록되지 않습니다.\n\n짧은 암호 메시지:\n\n[긴급 대기 채널 — 베버]\n[원하시는 때에 회신하십시오.]\n\n이건 ORACLE이 모르는 통신이다.\n저장해둘 것인가, 지울 것인가.",
    left:{ label:"채널을 저장한다", fx:{c:0,r:0,t:1,o:-2}, g:-3, log:"LOG-VOSS-STANDBY" },
    right:{ label:"삭제한다. 너무 위험하다", fx:{c:0,r:0,t:0,o:1}, g:1 } },

  // Act4 진입 시 탈출 제안 (CH-007 체인 트리거)
  { id:"CA4-ESCAPE-OFFER", act:[4], once:true, priority:"상",
    req:function(s,g,logs){ return logs.indexOf('LOG-VOSS-STANDBY')>=0; },
    msg:"Act 4 첫날.\n\n저장해둔 암호 채널에서 메시지가 들어옵니다. 베버.\n\n\"지휘관. 상황이 임계점에 도달했습니다.\"\n\n\"ORACLE이 당신에 대한 평가를 최종화하고 있습니다. 결과가 나오는 순간 — 서하은 부지휘관과 같은 경로를 밟게 될 겁니다.\"\n\n\"24시간. 그 안에 결정하십시오.\"\n\"우리가 당신과 팀을 빼낼 수 있습니다. 이번이 마지막 기회입니다.\"",
    left:{ label:"검토하겠다", fx:{c:0,r:0,t:1,o:-2}, g:-3 },
    right:{ label:"거절한다", fx:{c:0,r:0,t:-1,o:1}, g:2 } }
];

// Act4 카드풀에 주입
if(typeof CARDS_ACT4!=='undefined'){
  CARDS_ESCAPE_EXTRA.forEach(function(c){ CARDS_ACT4.push(c); });
}

// ═══════════════════ 4. CHAINS["CH-007"] — 체인 5장 ═══════════════════
if(typeof CHAINS!=='undefined'){
  CHAINS["CH-007"] = {
    name:"탈출 작전", trigger:"CA4-ESCAPE-OFFER-left",
    cards:[
      // CH-007-1 — 베버 브리핑 & 두 루트 설명
      { id:"CH-007-1", priority:"상",
        msg:"기지 북측 2km. 심야 집결 지점.\n\n베버가 압축된 작전 계획을 전달합니다.\n\n\"두 가지 루트가 있습니다. 각각의 특성을 설명드리지요.\"\n\n\"첫째 — 기지 정문 돌파. 초기 저항은 강하지만, 돌파 후에는 외곽 감염 구역을 관통하면 됩니다. 야외 조우는 회피 가능.\"\n\n\"둘째 — B3 비상 탈출구. 초기 진입은 조용합니다. 다만 격리실을 경유해야 합니다. 그곳에서 무엇을 마주칠지는 짐작하실 겁니다.\"",
        left:{ label:"설명을 들었다", fx:{c:0,r:0,t:1,o:-1}, g:-1 },
        right:{ label:"계속", fx:{c:0,r:0,t:1,o:-1}, g:-1 } },

      // CH-007-2 — 루트 결정
      { id:"CH-007-2", priority:"상",
        msg:"결정해야 합니다.\n\n둘 중 하나. 되돌릴 수 없습니다.",
        left:{ label:"기지 정문 돌파 (일반)", fx:{c:0,r:0,t:0,o:-1}, g:-2, log:"LOG-GENERAL-ROUTE" },
        right:{ label:"B3 비상 탈출구", fx:{c:0,r:0,t:0,o:-1}, g:-2, log:"LOG-B3-ROUTE" } },

      // CH-007-3 — 낙오 판정 (단독)
      { id:"CH-007-3", priority:"상",
        msg:"탈출 전야. 간부진 개별 면담.\n\n서하은, 강도윤, 윤세진, 임재혁.\n네 명이 차례로 들어왔다가 나갑니다.\n\n모두가 가겠다고 말하는 것은 아니었다.\n그것은 배신이 아니라 — 각자의 무게였다.\n\n[판정 중 ...]\n[동행자 확정됨]",
        left:{ label:"명단을 확인한다", fx:{c:0,r:0,t:0,o:-1}, g:-1 },
        right:{ label:"결과를 듣는다", fx:{c:0,r:0,t:0,o:-1}, g:-1 } },

      // CH-007-4 — 작전 개시 게이트 + LOG-ESCAPE-TRIG
      { id:"CH-007-4", priority:"상",
        msg:"작전 개시 시각. 03:47.\n\n동행자들이 각자의 위치에 있습니다.\n당신은 호흡을 고릅니다.\n\n발소리. 숨소리. 그리고 그 너머의 침묵.\n\n이제, 나아갈 시간입니다.",
        left:{ label:"작전 개시", fx:{c:0,r:0,t:1,o:-2}, g:-3, log:"LOG-ESCAPE-TRIG" },
        right:{ label:"한 번 더 점검한다", fx:{c:0,r:0,t:1,o:-2}, g:-3, log:"LOG-ESCAPE-TRIG" } },

      // CH-007-5 — 결과 수신 (app.js hSwipe 특수 분기에서 처리)
      // app.js가 id==='CH-007-5'를 감지하여 roll → 로그 부여 → doGO 호출
      { id:"CH-007-5", priority:"상",
        msg:"통신이 들어옵니다.\n\n이어폰에서 짧은 잡음.\n\n결과가 기록되고 있습니다 ...",
        left:{ label:"확인한다", fx:{c:0,r:0,t:0,o:0}, g:0 },
        right:{ label:"확인한다", fx:{c:0,r:0,t:0,o:0}, g:0 } }
    ]
  };
}

// ═══════════════════ 5. 탈출 결과 판정 로직 (app.js에서 호출) ═══════════════════
// shellTalkerKnown × 루트 조합별 확률표
// ┌─────────────┬────────┬────────┬────────┐
// │ 조합        │ CLEAR  │ FAIL_c │ UNLUCKY│
// ├─────────────┼────────┼────────┼────────┤
// │ known+일반  │ 0.80   │ 0.20   │ 0.00   │  (쉘토커 인지 + 야외회피)
// │ known+B3    │ 0.65   │ 0.35   │ 0.00   │  (쉘토커 인지로 기습 방지)
// │ unknown+일반│ 0.65   │ 0.20   │ 0.15   │  (야외 쉘토커 조우 가능)
// │ unknown+B3  │ 0.35   │ 0.15   │ 0.50   │  (격리실 기습 대규모)
// └─────────────┴────────┴────────┴────────┘
window.resolveEscape = function(logs){
  var known = logs.indexOf('LOG-SHELLTALKER-CAP')>=0;
  var b3    = logs.indexOf('LOG-B3-ROUTE')>=0;
  var r = Math.random();
  var cClear, cFail;
  if(known && !b3){ cClear=0.80; cFail=1.00; }
  else if(known && b3){ cClear=0.65; cFail=1.00; }
  else if(!known && !b3){ cClear=0.65; cFail=0.85; }
  else { cClear=0.35; cFail=0.50; } // unknown+B3, UNLUCKY 비중 최대
  if(r < cClear) return { log:'LOG-ESCAPE-CLEAR', ending:'E' };
  if(r < cFail)  return { log:'LOG-ESCAPE-FAIL',  ending:'E_c' };
  return            { log:'LOG-ESCAPE-UNLUCKY',ending:'E_bad' };
};
