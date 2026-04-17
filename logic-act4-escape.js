// logic-act4-escape.js — CH-007 탈출 체인 판정 로직
// 로드 순서: data-act4-escape.js 다음, app-init.js 이전

// ═══════════════ 1. 낙오 판정 (CH-007-3 선택 시 호출) ═══════════════
// 간부진별 trust 기반 동행 확률:
//   trust ≥ 65 → 100% (자동 동행)
//   trust ≥ 50 →  70%
//   trust ≥ 35 →  40%
//   trust <  35 →  10%
// 반환: { accomp:[{key,name,log}], loss:[{key,name}] }
window.resolveAccomp = function(trust){
  var chars = [
    ['haeun',  '서하은', 'ACCOMP-HAEUN'],
    ['doyun',  '강도윤', 'ACCOMP-DOYUN'],
    ['sejin',  '윤세진', 'ACCOMP-SEJIN'],
    ['jaehyuk','임재혁', 'ACCOMP-JAEHYUK']
  ];
  var result = { accomp:[], loss:[] };
  chars.forEach(function(c){
    var t = (trust && trust[c[0]]) || 0;
    var prob;
    if(t >= 65)      prob = 1.00;
    else if(t >= 50) prob = 0.70;
    else if(t >= 35) prob = 0.40;
    else             prob = 0.10;
    if(Math.random() < prob){
      result.accomp.push({ key:c[0], name:c[1], log:c[2] });
    } else {
      result.loss.push({ key:c[0], name:c[1] });
    }
  });
  return result;
};

// ═══════════════ 2. 엔딩 E 동적 텍스트 조립 ═══════════════
// CH-007-5에서 CLEAR 확정 시 호출. ENDING_DEFS.E.narrative를 동적으로 덮어씀.
// 입력: logs 배열 (ACCOMP-* 및 LOG-B3-ROUTE 포함)
window.buildEEnding = function(logs){
  var accompAll = [
    { log:'ACCOMP-HAEUN',   name:'서하은' },
    { log:'ACCOMP-DOYUN',   name:'강도윤' },
    { log:'ACCOMP-SEJIN',   name:'윤세진' },
    { log:'ACCOMP-JAEHYUK', name:'임재혁' }
  ];
  var accomp = accompAll.filter(function(a){ return logs.indexOf(a.log) >= 0; });
  var b3 = logs.indexOf('LOG-B3-ROUTE') >= 0;

  // 동행자 라인 — 상태별 문장 변이
  var accompLine;
  if(accomp.length === 0){
    accompLine = '당신 혼자였다. 그 길은 함께 걷는 게 아니었다.';
  } else if(accomp.length === 4){
    accompLine = '서하은. 강도윤. 윤세진. 임재혁. — 네 사람이 당신 옆에 서 있었다.';
  } else if(accomp.length === 1){
    accompLine = accomp[0].name + '. — 단 한 명. 그걸로 충분했다.';
  } else {
    var names = accomp.map(function(a){return a.name;}).join(', ');
    accompLine = names + '. — 그들이 당신과 함께 있었다.';
  }

  // 루트 라인 — 경로에 따라 다름
  var routeLine = b3
    ? 'B3 비상구. 격리실의 어둠을 지나왔다. 대가가 있었지만, 여기까지 왔다.'
    : '기지 정문 돌파. 외곽 감염 구역을 가로질렀다. 지금은 그 뒤편에.';

  return [
    '차량이 해안 방벽 외곽을 벗어났다.',
    '',
    '검은 바다. 파도 소리.',
    routeLine,
    '',
    accompLine,
    '',
    '접선점에 세 사람이 서 있었다.',
    '베버. 그 옆에 — 낯선 여성.',
    '',
    '"에이전트 강입니다." 베버가 짧게 소개했다.',
    '"이 작전 내내 당신을 관측해왔습니다. 지금까지 이름을 드리지 못했습니다."',
    '',
    '그녀 옆에는 닉 포스터. 짧게 고개를 숙였다. 사과는 아니었다.',
    '하지만 표정에서 무언가가 풀려 있었다.',
    '',
    '"ORACLE이 당신의 부재를 감지하는 데 약 6시간이 걸릴 겁니다." 강이 말했다.',
    '"그때쯤이면 당신들은 이미 다른 이름으로 존재하게 될 겁니다."',
    '',
    '당신은 뒤를 돌아보지 않았다.',
    '',
    '[세션 종료 — OPERATOR STATUS: UNLINKED]',
    '[OBSERVATION: 연결이 끊겼습니다]'
  ];
};
