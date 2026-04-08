// TERMINAL SESSION — app-logic.js
// 순수 로직 함수: checkLogs, chkGameOver, genNewsHeadlines, checkActTransitionLogic 등

var RISK_MSG = [
  "물자 상태 불량 — 자원 확보 실패",
  "운송 중 파손 — 사용 불가 판정",
  "유통기한 초과 — 폐기 처리",
  "오염 감지 — 안전 기준 미달"
];

// ═══ LOG 해금 체크 (카드/대화/미션 결과에 따라 LOG 트리거) ═══
// unlock: function(id) — 콜백
function checkLogsAll(s, g, cid, dc, di, dir, logs, trust, unlock) {
  if (s.day >= 1) unlock('LOG-001');
  if (s.day >= 3) unlock('LOG-002');
  if (s.day >= 7) unlock('LOG-011');
  if (cid === 'C-006') unlock('LOG-003');
  if (cid === 'C-003') unlock('LOG-004');
  if (cid === 'C-010') unlock('LOG-005');
  if (cid === 'C-042' || cid === 'C-043') unlock('LOG-013');
  if (cid === 'C-044' || cid === 'C-045') unlock('LOG-014');
  if (cid === 'C-046' || cid === 'C-047') unlock('LOG-015');
  // ═══ 관찰 LOG: 포획 연구 + 신뢰 복합 조건 ═══
  if (cid === 'C-091' && logs.indexOf('LOG-RES-012') >= 0 && trust.sejin >= 40) unlock('LOG-020');
  if (cid === 'C-092' && logs.indexOf('LOG-RES-011') >= 0 && trust.jaehyuk >= 40) unlock('LOG-021');
  if (cid === 'C-093' && logs.indexOf('LOG-RES-001') >= 0 && trust.sejin >= 50) unlock('LOG-022');
  if (cid === 'C-094' && trust.doyun >= 50) unlock('LOG-023');
  if (cid === 'C-095' && trust.sejin >= 55) unlock('LOG-024');
  if (cid === 'C-102') unlock('LOG-025');
  if (cid === 'C-106') unlock('LOG-026');
  if (cid === 'C-114') unlock('LOG-027');
  if (cid === 'C-124') unlock('LOG-028');
  if (cid === 'CT-001') unlock('LOG-030');
  if (cid === 'CT-002') unlock('LOG-031');
  if (cid === 'CT-003') unlock('LOG-032');
  if (cid === 'CT-004') unlock('LOG-033');
  if (cid === 'CT-005') unlock('LOG-034');
  if (cid === 'CT-006') unlock('LOG-035');
  if (cid === 'CT-007') unlock('LOG-036');
  if (cid === 'CT-008') unlock('LOG-037');
  if (cid === 'CT-009') unlock('LOG-038');
  if (cid === 'CT-010') unlock('LOG-039');
  if (cid === 'CT-011') unlock('LOG-040');
  if (cid === 'C-177') unlock('LOG-060');
  if (cid === 'C-178') { unlock('LOG-061'); if (dir === 'left') unlock('LOG-004'); if (dir === 'right') unlock('LOG-005'); }
  if (cid === 'C-073' && dir === 'left') unlock('LOG-051');
  if (cid === 'C-073' && dir === 'right') unlock('LOG-050');
  if (cid === 'CS-001') unlock('LOG-053');
  if (cid === 'CS-002') unlock('LOG-054');
  if (cid === 'CS-003') unlock('LOG-052');
  if (cid === 'CS-004') unlock('LOG-055');
  if (cid === 'CS-010') unlock('LOG-056');
  if (cid === 'CS-013') unlock('LOG-057');
  if (cid === 'CS-014') unlock('LOG-058');
  if (cid === 'CS-015') unlock('LOG-059');
  // ═══ 진실 LOG: GI 상한 잠금 (ORACLE 순응도가 높으면 차단) ═══
  if (cid === 'CH-004-2' && g <= 5) unlock('LOG-009');
  if ((cid === 'C-053' || cid === 'CH-005-2') && g <= 10) unlock('LOG-016');
  if (cid === 'C-067' && g <= 5) unlock('LOG-017');
  if ((cid === 'C-074' || cid === 'CH-006-2') && g <= 0) unlock('LOG-018');
  if ((cid === 'C-079' || cid === 'C-086') && g <= -5) unlock('LOG-019');
  // 대화 기반 LOG
  if (dc === '\uc11c\ud558\uc740' && di === 0) { unlock('LOG-006'); unlock('LOG-INTRO-SH'); }
  if (dc === '\uc724\uc138\uc9c4' && di === 0) { unlock('LOG-007'); unlock('LOG-INTRO-YS'); }
  if (dc === '\uac15\ub3c4\uc724' && di === 0) { unlock('LOG-008'); unlock('LOG-INTRO-KD'); }
  if (dc === '\uc784\uc7ac\ud601' && di === 0) unlock('LOG-INTRO-IJ');
  if (dc === '\uc784\uc7ac\ud601' && di === 1) unlock('LOG-012');
  if (dc === '\ubc15\uc18c\uc601' && di === 0) unlock('LOG-INTRO-SY');
  // GI 임계값 기반
  if (g <= -15) unlock('LOG-009');
  if (g <= -30) unlock('LOG-010');
  // 신뢰도 임계값 기반
  if (trust.haeun >= 70) unlock('LOG-006');
  if (trust.sejin >= 70) unlock('LOG-007');
  if (trust.doyun >= 65) unlock('LOG-008');
  // ═══ 체인 카드 LOG 트리거 (data-cards-11.js 연동) ═══
  if (cid === 'C-109' || cid === 'C-159') unlock('LOG-GYM');
  if (cid === 'C-174' || cid === 'C-140') unlock('LOG-FREEZER');
  if (cid === 'C-001' && dir === 'right') unlock('LOG-062');
  if (cid === 'C-179' && dir === 'left') unlock('LOG-063');
  if (cid === 'C-179' && dir === 'right') unlock('LOG-064');
  if (cid === 'C-180') unlock('LOG-063-DONE');
  if (cid === 'C-181') unlock('LOG-065');
  if (cid === 'C-182') unlock('LOG-065-ATK');
  if (cid === 'C-183') unlock('LOG-065-END');
  if (cid === 'C-023' && dir === 'right') unlock('LOG-066');
  if (cid === 'C-145' && dir === 'right') unlock('LOG-067');
  if (cid === 'C-111' && dir === 'right') unlock('LOG-068');
  if (cid === 'C-184') unlock('LOG-069');
  if (cid === 'C-185') unlock('LOG-069-CREW');
  if (cid === 'C-186') unlock('LOG-069-END');
  if (cid === 'C-041' && dir === 'right') unlock('LOG-070');
  if (cid === 'C-163' && dir === 'right') unlock('LOG-071');
  if (cid === 'C-018' && dir === 'right') unlock('LOG-072');
  if (cid === 'C-084' && dir === 'left') unlock('LOG-073');
  if (cid === 'C-188') unlock('LOG-074');
  if (cid === 'C-189') unlock('LOG-074-DONE');
  if (cid === 'C-190') unlock('LOG-075');
  if (cid === 'C-191') unlock('LOG-074-ORC');
  if (cid === 'C-192') unlock('LOG-075-ORC');
  if (cid === 'C-159') unlock('LOG-078');
  if (cid === 'C-080') unlock('LOG-079');
  if (cid === 'C-201') unlock('LOG-076');
  if (cid === 'C-215') unlock('LOG-077');
  // ═══ 외부 인물 + 에이전트 강 (data-cards-15.js) ═══
  if (cid === 'CH-005-3') unlock('LOG-080');
  if (cid === 'C-248' && dir === 'left') unlock('LOG-081');
  if (cid === 'C-249' && dir === 'left') unlock('LOG-081-DATA');
  if (cid === 'C-250') unlock('LOG-081-INTEL');
  if (cid === 'C-081' && dir === 'left') unlock('LOG-082');
  if (cid === 'C-252') unlock('LOG-082-REPORT');
  if (cid === 'C-253') unlock('LOG-083');
}

// ═══ 게임 오버 체크 ═══
function chkGameOver(s) {
  if (s.c <= 0) return '\ubd09\uc1c4\uc120 \ubd95\uad34. \uc2dc\uc124 \uc790\uccb4 \ubd09\uc1c4 \ud504\ub85c\ud1a0\ucf5c \ubc1c\ub3d9 \u2014 \uae30\uc9c0 \ud3d0\uae30 \uc808\ucc28\uac00 \uac1c\uc2dc\ub418\uc5c8\uc2b5\ub2c8\ub2e4.';
  if (s.c >= 100) return '[GRANT EXPIRED \u2014 UPON_FULL_ESTABLISHMENT] \ud55c\uad6d \uc9c0\ubd80 \uc548\uc815\ud654 \uc644\ub8cc. \uc784\uc2dc \uad8c\ud55c\uc774 \ub9cc\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4. \uc138\uc158\uc744 \uc885\ub8cc\ud569\ub2c8\ub2e4.';
  if (s.r <= 0) return '\uc790\uc6d0 \uace0\uac08. \uae30\uc9c0 \uae30\ub2a5\uc774 \ub9c8\ube44\ub418\uc5c8\uc2b5\ub2c8\ub2e4.';
  if (s.t <= 0) return '\uc778\uc6d0 \uc2e0\ub8b0 \ubd95\uad34. \uae30\uc9c0 \uc694\uc6d0\ub4e4\uc774 \uc774\ud0c8\ud588\uc2b5\ub2c8\ub2e4.';
  if (s.o <= 0) return 'ORACLE \uc811\uc18d \ucc28\ub2e8. \ub2e8\ub9d0\uae30 \uc5f0\uacb0\uc774 \uc885\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4.';
  return null;
}

// ═══ 뉴스 헤드라인 생성 ═══
function genNewsHeadlines(s, g) {
  var l = [];
  if (s.c > 60) l.push(pick(NP.gc)); else if (s.c < 40) l.push(pick(NP.bc));
  if (s.r < 30) l.push(pick(NP.br));
  if (Math.random() < 0.4) l.push(pick(NP.w));
  if (s.day > 3 && Math.random() < 0.3) l.push(pick(NP.p));
  if (g <= -10 && s.day > 5 && Math.random() < 0.4) l.push(pick(NP.gl));
  if (!l.length) l.push(pick(NP.w));
  return l;
}

// ═══ Act 전환 조건 체크 ═══
function checkActTransitionLogic(s, g, lg, af, curAct) {
  if (curAct === 1 && s.day >= 10) {
    var route = af.prom_met && af.mission_done ? 'A' : af.prom_met ? 'B' : af.mission_done ? 'C' : 'D';
    return { act: 2, route: route };
  }
  if (curAct === 2 && s.day >= 25) {
    var route = af.chain_done && af.prom_mission ? 'A' : af.chain_done ? 'B' : af.prom_mission ? 'C' : 'D';
    return { act: 3, route: route };
  }
  return null;
}

// ═══ 인트로 대화 완료 체크 ═══
function isIntrosDone(logs) {
  return logs.indexOf('LOG-INTRO-SH') >= 0 &&
    logs.indexOf('LOG-INTRO-KD') >= 0 &&
    logs.indexOf('LOG-INTRO-YS') >= 0 &&
    logs.indexOf('LOG-INTRO-IJ') >= 0;
}

function isIntroDlgCheck(d, i) {
  var chars = ['\uc11c\ud558\uc740', '\uac15\ub3c4\uc724', '\uc724\uc138\uc9c4', '\uc784\uc7ac\ud601'];
  var ci = chars.indexOf(d.char);
  if (ci < 0) return false;
  return i === ci;
}
