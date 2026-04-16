// TERMINAL SESSION — app-logic.js
// 게임 로직 순수 함수 (App() 외부로 분리)

function chk(s){if(s.c<=0)return'\ubd09\uc1c4\uc120 \ubd95\uad34. \uc2dc\uc124 \uc790\uccb4 \ubd09\uc1c4 \ud504\ub85c\ud1a0\ucf5c \ubc1c\ub3d9 \u2014 \uae30\uc9c0 \ud3d0\uae30 \uc808\ucc28\uac00 \uac1c\uc2dc\ub418\uc5c8\uc2b5\ub2c8\ub2e4.';if(s.c>=100)return'[GRANT EXPIRED \u2014 UPON_FULL_ESTABLISHMENT] \ud55c\uad6d \uc9c0\ubd80 \uc548\uc815\ud654 \uc644\ub8cc. \uc784\uc2dc \uad8c\ud55c\uc774 \ub9cc\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4. \uc138\uc158\uc744 \uc885\ub8cc\ud569\ub2c8\ub2e4.';if(s.r<=0)return'\uc790\uc6d0 \uace0\uac08. \uae30\uc9c0 \uae30\ub2a5\uc774 \ub9c8\ube44\ub418\uc5c8\uc2b5\ub2c8\ub2e4.';if(s.t<=0)return'\uc778\uc6d0 \uc2e0\ub8b0 \ubd95\uad34. \uae30\uc9c0 \uc694\uc6d0\ub4e4\uc774 \uc774\ud0c8\ud588\uc2b5\ub2c8\ub2e4.';if(s.o<=0)return'ORACLE \uc811\uc18d \ucc28\ub2e8. \ub2e8\ub9d0\uae30 \uc5f0\uacb0\uc774 \uc885\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4.';return null}

function genNews(s,g){var l=[];if(s.c>60)l.push(pick(NP.gc));else if(s.c<40)l.push(pick(NP.bc));if(s.r<30)l.push(pick(NP.br));if(Math.random()<0.4)l.push(pick(NP.w));if(s.day>3&&Math.random()<0.3)l.push(pick(NP.p));if(g<=-10&&s.day>5&&Math.random()<0.4)l.push(pick(NP.gl));if(!l.length)l.push(pick(NP.w));return l}

function isIntroDlg(d,i){var chars=['\uc11c\ud558\uc740','\uac15\ub3c4\uc724','\uc724\uc138\uc9c4','\uc784\uc7ac\ud601'];var ci=chars.indexOf(d.char);if(ci<0)return false;return i===ci}

function introsDone(logs){return logs.indexOf('LOG-INTRO-SH')>=0&&logs.indexOf('LOG-INTRO-KD')>=0&&logs.indexOf('LOG-INTRO-YS')>=0&&logs.indexOf('LOG-INTRO-IJ')>=0}

function checkActTransition(s,g,lg,af,curAct){
  if(curAct===1&&s.day>=10){
    var route=af.prom_met&&af.mission_done?'A':af.prom_met?'B':af.mission_done?'C':'D';
    return{act:2,route:route};
  }
  if(curAct===2&&s.day>=25){
    var route=af.chain_done&&af.prom_mission?'A':af.chain_done?'B':af.prom_mission?'C':'D';
    return{act:3,route:route};
  }
  if(curAct===3&&s.day>=30){
    // GI 수치 기반 Act 4 루트 결정
    var route=g>=10?'A4_COMPLY':g>=-15?'A4_GREY':g>=-30?'A4_RESIST':'A4_OBSERVER';
    return{act:4,route:route};
  }
  return null;
}

// checkLogs: trust, tryUnlock를 파라미터로 받아 처리
function checkLogs(s,g,cid,dc,di,dir,trust,tryUnlock){
    if(s.day>=1)tryUnlock('LOG-001');if(s.day>=3)tryUnlock('LOG-002');if(s.day>=7)tryUnlock('LOG-011');
    if(cid==='C-006')tryUnlock('LOG-003');if(cid==='C-003')tryUnlock('LOG-004');if(cid==='C-010')tryUnlock('LOG-005');
    if(cid==='C-042'||cid==='C-043')tryUnlock('LOG-013');
    if(cid==='C-044'||cid==='C-045')tryUnlock('LOG-014');
    if(cid==='C-046'||cid==='C-047')tryUnlock('LOG-015');
    if(cid==='C-091')tryUnlock('LOG-020');if(cid==='C-092')tryUnlock('LOG-021');
    if(cid==='C-093')tryUnlock('LOG-022');if(cid==='C-094')tryUnlock('LOG-023');if(cid==='C-095')tryUnlock('LOG-024');
    if(cid==='C-102')tryUnlock('LOG-025');if(cid==='C-106')tryUnlock('LOG-026');
    if(cid==='C-114')tryUnlock('LOG-027');if(cid==='C-124')tryUnlock('LOG-028');
    if(cid==='CT-001')tryUnlock('LOG-030');if(cid==='CT-002')tryUnlock('LOG-031');
    if(cid==='CT-003')tryUnlock('LOG-032');if(cid==='CT-004')tryUnlock('LOG-033');
    if(cid==='CT-005')tryUnlock('LOG-034');if(cid==='CT-006')tryUnlock('LOG-035');
    if(cid==='CT-007')tryUnlock('LOG-036');if(cid==='CT-008')tryUnlock('LOG-037');
    if(cid==='CT-009')tryUnlock('LOG-038');if(cid==='CT-010')tryUnlock('LOG-039');
    if(cid==='CT-011')tryUnlock('LOG-040');
    if(cid==='C-177')tryUnlock('LOG-060');if(cid==='C-178'){tryUnlock('LOG-061');if(dir==='left')tryUnlock('LOG-004');if(dir==='right')tryUnlock('LOG-005')}
    if(cid==='C-073'&&dir==='left')tryUnlock('LOG-051');if(cid==='C-073'&&dir==='right')tryUnlock('LOG-050');
    if(cid==='CS-001')tryUnlock('LOG-053');if(cid==='CS-002')tryUnlock('LOG-054');if(cid==='CS-003')tryUnlock('LOG-052');
    if(cid==='CS-004')tryUnlock('LOG-055');if(cid==='CS-010')tryUnlock('LOG-056');
    if(cid==='CS-013')tryUnlock('LOG-057');if(cid==='CS-014')tryUnlock('LOG-058');if(cid==='CS-015')tryUnlock('LOG-059');
    if(cid==='CH-004-2')tryUnlock('LOG-009');
    if(cid==='C-053'||cid==='CH-005-2')tryUnlock('LOG-016');
    if(cid==='C-067')tryUnlock('LOG-017');
    if(cid==='C-074'||cid==='CH-006-2')tryUnlock('LOG-018');
    if(cid==='C-079'||cid==='C-086')tryUnlock('LOG-019');
    if(dc==='\uc11c\ud558\uc740'&&di===0){tryUnlock('LOG-006');tryUnlock('LOG-INTRO-SH')}if(dc==='\uc724\uc138\uc9c4'&&di===0){tryUnlock('LOG-007');tryUnlock('LOG-INTRO-YS')}
    if(dc==='\uac15\ub3c4\uc724'&&di===0){tryUnlock('LOG-008');tryUnlock('LOG-INTRO-KD')}if(dc==='\uc784\uc7ac\ud601'&&di===0)tryUnlock('LOG-INTRO-IJ');if(dc==='\uc784\uc7ac\ud601'&&di===1)tryUnlock('LOG-012');
    if(dc==='\ubc15\uc18c\uc601'&&di===0)tryUnlock('LOG-INTRO-SY');
    if(g<=-15)tryUnlock('LOG-009');if(g<=-30)tryUnlock('LOG-010');
    if(trust&&trust.haeun>=70)tryUnlock('LOG-006');if(trust&&trust.sejin>=70)tryUnlock('LOG-007');if(trust&&trust.doyun>=65)tryUnlock('LOG-008');
    // ═══ 체인 카드 LOG 트리거 (data-cards-11.js 연동) ═══
    if(cid==='C-001'&&dir==='right')tryUnlock('LOG-062');
    if(cid==='C-179'&&dir==='left')tryUnlock('LOG-063');
    if(cid==='C-179'&&dir==='right')tryUnlock('LOG-064');
    if(cid==='C-180')tryUnlock('LOG-063-DONE');
    if(cid==='C-181')tryUnlock('LOG-065');
    if(cid==='C-182')tryUnlock('LOG-065-ATK');
    if(cid==='C-183')tryUnlock('LOG-065-END');
    if(cid==='C-023'&&dir==='right')tryUnlock('LOG-066');
    if(cid==='C-145'&&dir==='right')tryUnlock('LOG-067');
    if(cid==='C-111'&&dir==='right')tryUnlock('LOG-068');
    if(cid==='C-184')tryUnlock('LOG-069');
    if(cid==='C-185')tryUnlock('LOG-069-CREW');
    if(cid==='C-186')tryUnlock('LOG-069-END');
    if(cid==='C-041'&&dir==='right')tryUnlock('LOG-070');
    if(cid==='C-163'&&dir==='right')tryUnlock('LOG-071');
    if(cid==='C-018'&&dir==='right')tryUnlock('LOG-072');
    if(cid==='C-084'&&dir==='left')tryUnlock('LOG-073');
    if(cid==='C-188')tryUnlock('LOG-074');
    if(cid==='C-189')tryUnlock('LOG-074-DONE');
    if(cid==='C-190')tryUnlock('LOG-075');
    if(cid==='C-191')tryUnlock('LOG-074-ORC');
    if(cid==='C-192')tryUnlock('LOG-075-ORC');
    if(cid==='C-159')tryUnlock('LOG-078');
    if(cid==='C-080')tryUnlock('LOG-079');
    if(cid==='C-201')tryUnlock('LOG-076');
    if(cid==='C-215')tryUnlock('LOG-077');
    // ═══ 외부 인물 + 에이전트 강 (data-cards-15.js) ═══
    if(cid==='CH-005-3')tryUnlock('LOG-080');
    if(cid==='C-248'&&dir==='left')tryUnlock('LOG-081');
    if(cid==='C-249'&&dir==='left')tryUnlock('LOG-081-DATA');
    if(cid==='C-250')tryUnlock('LOG-081-INTEL');
    if(cid==='C-081'&&dir==='left')tryUnlock('LOG-082');
    if(cid==='C-252')tryUnlock('LOG-082-REPORT');
    if(cid==='C-253')tryUnlock('LOG-083');
}

// ═══ app.js 호환 alias (함수명 불일치 수정) ═══
var checkLogsAll=function(s,g,cid,dc,di,dir,logs,trust,tryUnlock){checkLogs(s,g,cid,dc,di,dir,trust,tryUnlock)};
var chkGameOver=chk;
var genNewsHeadlines=genNews;
var checkActTransitionLogic=checkActTransition;
var isIntrosDone=introsDone;
var isIntroDlgCheck=isIntroDlg;
