// TERMINAL SESSION — app-logic.js
// 게임 로직 순수 함수 (App() 외부로 분리)

function chk(s){
  var tr=function(key,fb){return typeof tt==='function'?tt('gameOver.reasons.'+key,null,fb):fb};
  if(s.c<=0)return tr('containmentLow','봉쇄선 붕괴. 시설 자체 봉쇄 프로토콜 발동 — 기지 폐기 절차가 개시되었습니다.');
  if(s.c>=100)return tr('containmentHigh','[GRANT EXPIRED — UPON_FULL_ESTABLISHMENT] 한국 지부 안정화 완료. 임시 권한이 만료되었습니다. 세션을 종료합니다.');
  if(s.r<=0)return tr('resourcesLow','자원 고갈. 기지 기능이 마비되었습니다.');
  if(s.t<=0)return tr('trustLow','인원 신뢰 붕괴. 기지 요원들이 이탈했습니다.');
  if(s.o<=0)return tr('evaluationLow','ORACLE 접속 차단. 단말기 연결이 종료되었습니다.');
  return null;
}

var NEWS_RECENT_KEY='ts_recentNews';
var NEWS_RECENT_LIMIT=12;
function getRecentNewsItems(){
  try{var d=localStorage.getItem(NEWS_RECENT_KEY);var parsed=d?JSON.parse(d):[];return Array.isArray(parsed)?parsed:[]}catch(e){return[]}
}
function rememberNewsItems(items){
  try{
    var recent=getRecentNewsItems(),next=recent.slice();
    (items||[]).forEach(function(item){if(item&&next.indexOf(item)<0)next.push(item)});
    localStorage.setItem(NEWS_RECENT_KEY,JSON.stringify(next.slice(-NEWS_RECENT_LIMIT)));
  }catch(e){}
}
function pickNewsFromPool(pool,current,recent){
  if(!Array.isArray(pool)||pool.length===0)return null;
  current=current||[];recent=recent||[];
  var candidates=pool.filter(function(item){return item&&current.indexOf(item)<0&&recent.indexOf(item)<0});
  if(candidates.length>0)return pick(candidates);
  return null;
}

function genChoiceReactionNews(s,g,logs){
  var lg=logs||[],pool=[];
  var has=function(id){return lg.indexOf(id)>=0};
  if(has('LOG-KR-CIV-REPORT'))pool.push("[국내] 생활안전센터 신고량 급증 — '회색 버튼' 관련 민원 정식 접수 전환");
  if(has('LOG-KR-CIV-QUIET'))pool.push("[국내] 방벽 내부 커뮤니티, 공식 신고 대신 자체 확인망 공유 확산");
  if(has('LOG-KR-GATE-STRICT'))pool.push("[국내] 환승 검문 허브 11초 공백 로그, 보건당국 기술 검토 대상으로 이관");
  if(has('LOG-KR-GATE-REVIEW'))pool.push("[국내] 현장 보건팀, 중앙 분류망 통과 사례의 공백 로그 확인 요청");
  if(has('LOG-KR-HOSPITAL-CENTRAL'))pool.push("[국내] Phase 관찰 병동 가족 분리 권고 근거 자료 공개 요구 확대");
  if(has('LOG-KR-HOSPITAL-FAMILY'))pool.push("[국내] 일부 병동, 가족 분리 위험 평가를 의료 판단 참고자료로 채택");
  if(has('LOG-KR-MARKET-DG')||has('LOG-SUPPLY-DG'))pool.push("[국내] DG 협력 물류망, 방벽 인접 시장 정리 착수 — 보급 안정 기대와 독점 우려 교차");
  if(has('LOG-KR-MARKET-LOCAL'))pool.push("[국내] 방벽 인접 상인회, 검역 조건부 지역 유통망 유지 합의");
  if(has('LOG-KR-SCHOOL-CLOSE'))pool.push("[국내] 교육청, 방벽 내부 학교 재검 사례 위험 평가 자료 검토 착수");
  if(has('LOG-KR-SCHOOL-CONTINUE'))pool.push("[국내] 교육청 공개 문구에 감염 이력 낙인 방지 지침 반영 논의");
  if(has('LOG-KR-RECORD-PRESERVE'))pool.push("[분류 보류] 강원 동부 작전 관련 문서 제목만 복원 — 본문 접근 제한");
  if(has('LOG-KR-RECORD-RESTORE'))pool.push("[분류 오류 — 자동 삭제 예정]\n[국내] '민간 피해 없음' 문서와 유족 편지 스캔본 동시 발견\n[삭제됨]");
  if(has('LOG-KR-HUB-LOCK'))pool.push("[국내] 환승 허브 운영기관, 비공개 경고문 노출 후 임시 통제 권고안 검토");
  if(has('LOG-KR-HUB-OPEN'))pool.push("[국내] 환승 허브 동선 유지 권고 후 삭제된 사건번호 수집 커뮤니티 활동 증가");
  if(has('LOG-KR-REGISTRY-SEAL'))pool.push("[국내] 감염 이력 비공개 플래그 접근권 축소 — 복귀 지원 단체 환영");
  if(has('LOG-KR-REGISTRY-SHARE'))pool.push("[국내] 위험 사업장 감염 이력 공유 유지 — 채용 차별 제보 동반 증가");
  if(has('LOG-DG-DEAL'))pool.push("[국내] DG 봉쇄 장비 무상 교체 확대 — 시민단체, 데이터 제공 조건 공개 요구");
  if(has('LOG-MD-CONTACT'))pool.push("[해외] 메리디안, 한국 봉쇄 데이터 불투명성 지적 — 정부는 '검토 중' 답변");
  if(has('LOG-DG-VS-MD'))pool.push("[국내] 외국계 바이오자산 진입 심의 장기 보류 — DG 협력사 물량은 정상 통관");
  if(has('LOG-SUPPLY-MD'))pool.push("[해외] 메리디안 계열 보급품 한국 지부 반입 정황 — 외교부, 민간 연구물자라 설명");
  if(has('LOG-AUDIT-COMPLY'))pool.push("[국내] DG 자체 감사 협조 범위 확대 — 강원 지부 운영 자료 일부 열람");
  if(has('LOG-AUDIT-ALLY'))pool.push("[국내] 감사독립위, 방벽 시설 운영 점검 착수 — DG 자체 감사 요구 제동");
  if(has('LOG-EV-UNLOCK'))pool.push("[국내] 증거 분석 절차 강화 이후 비공개 사건번호 재분류 사례 증가");
  if(has('LOG-RH-SUMMARY'))pool.push("[분류 보류] 강원지부 일일 보고서, 본문과 첨부 우선순위가 반복적으로 어긋난다는 내부 점검 기록");
  if(has('LOG-RH-BLINDSPOT'))pool.push("[국내] 방벽 외곽 순찰로 일부 구간, 중앙 감시망 음영지역으로 재분류 — 현장 재측량 예정");
  if(has('LOG-RH-MEDICAL'))pool.push("[국내] Phase 0 의심 케이스 재검토 요청 증가 — 현장 의료진 비공식 기록이 근거로 제시됨");
  if(has('LOG-RH-QUERYMAP'))pool.push("[분류 보류] ORACLE 질의 경로 일부에서 지연 패턴 확인 — 공식 장애 보고는 접수되지 않음");
  if(has('LOG-RH-COUNTERMEMO'))pool.push("[내부] ORACLE 자동 판단과 현장 판단이 병기된 반대 메모, 감사 대상 문서로 임시 보관");
  if(has('LOG-RH-NETWORK'))pool.push("[국내] 강원지부 현장 기록 체계 개편 정황 — 중앙망 외 보조 검증선 존재 가능성");
  if(has('LOG-CB-STABILITY'))pool.push("[국내] 중앙 표준 절차 도입 지부, 사전 설명회 병행 시 인원 이탈률 감소");
  if(has('LOG-CB-CONTAINMENT'))pool.push("[국내] 봉쇄 자동화 재교육 예산 배정 — 현장 노조는 '최소한의 안전장치'라 평가");
  if(has('LOG-CB-HUMANAPPENDIX'))pool.push("[내부] ORACLE 성과 보고서에 현장 피로도 부록 첨부 — 삭제 없이 본부 라인 통과");
  if(has('LOG-ORACLE-SAFEGUARD'))pool.push("[분류 보류] 강원지부 긴급 안정화 패키지 승인 — 본부 보급, 봉쇄 자동 보정, 현장 명령 철회가 동시에 기록됨");
  if(has('LOG-RH-SAFEGUARD'))pool.push("[내부] 강원지부 수동 비상망 가동 — 비공식 협조 명단과 현장 기록 묶음으로 최소 생존선 재정렬");
  if(has('LOG-CB-SUSTAINED'))pool.push("[국내] 중앙 자동화와 현장 설명 절차를 병행한 지부, 봉쇄 효율과 내부 신뢰 동시 개선");
  if(g<=-15&&s.o<=40)pool.push("[내부] ORACLE 평가 지표 하락 경보 발령 — 비공식 기록 보존 요청이 내부 채널에서 증가 추세");
  if(g>=15&&(s.r<=40||s.t<=40))pool.push("[내부] ORACLE 순응 절차가 안정성을 높였지만, 보급·신뢰 완충 계획 없이는 현장 피로가 누적될 수 있음");
  if(s.c<=30||s.r<=30||s.t<=30||s.o<=30)pool.push("[경고] 일일 결산에서 위험 지표 하락 원인이 표시됨 — 야간 보정 회의 및 보급 재배치 검토 필요");
  if(pool.length===0){
    if(s.t<35)pool.push("[국내] 방벽 내부 주민 신뢰 지수 하락 — 신고보다 침묵을 택하는 사례 증가");
    if(s.o<35)pool.push("[국내] 중앙 분류망과 현장 판단 불일치 사례, 비공개 감사 대상으로 전환");
    if(s.r<35)pool.push("[국내] 방벽 주변 검역 도장 식품 가격 상승 — 군납품 암시장 거래 단속");
  }
  if(pool.length===0)return [];
  var item=pickNewsFromPool(pool,[],arguments.length>3?arguments[3]:[]);
  return item?[item]:[];
}

function pushUniqueNews(l,item){if(item&&l.indexOf(item)<0)l.push(item)}
function pushNewsPick(l,pool,recent){
  if(!Array.isArray(pool)||pool.length===0)return false;
  recent=recent||[];
  var fresh=pool.filter(function(item){return item&&l.indexOf(item)<0&&recent.indexOf(item)<0});
  if(fresh.length>0){l.push(pick(fresh));return true}
  return false;
}
function uniqueNewsItems(items){
  var out=[];
  (items||[]).forEach(function(item){if(item&&out.indexOf(item)<0)out.push(item)});
  return out;
}

function getFactionRelations(logs,gi){
  var lg=logs||[];
  var has=function(id){return lg.indexOf(id)>=0};
  var clampRel=function(v){return Math.max(0,Math.min(100,v))};
  var out=[];
  var oracle=clampRel(65+(gi||0));
  out.push({id:'oracle',name:'ORACLE',value:oracle,status:oracle>=75?'감시 우호':oracle>=55?'명령 체계 안정':oracle>=35?'의심 누적':'이탈 위험',tone:oracle>=75?'#66aaff':oracle>=35?'var(--ui)':'#ff6644',hint:oracle>=75?'통제 친화':'독자 판단 여지'});
  if(has('LOG-080')||has('LOG-081')||has('LOG-VOSS-STANDBY')||has('LOG-LJC-PROM-01')||has('LOG-LJC-PROM-02')||has('LOG-LJC-PROM-03')||has('LOG-LJC-PROM-04')||has('LOG-LJC-PROM-05')||has('LOG-LJC-PROM-06')||has('LOG-LJC-PROM-07')){
    var prom=25;
    if(has('LOG-080'))prom+=15;
    if(has('LOG-081'))prom+=10;
    if(has('LOG-081-DATA')||has('LOG-081-INTEL'))prom+=10;
    if(has('LOG-VOSS-STANDBY'))prom+=12;
    if(has('LOG-LJC-PROM-02'))prom+=8;
    if(has('LOG-LJC-PROM-03'))prom+=10;
    if(has('LOG-LJC-PROM-04'))prom+=15;
    if(has('LOG-LJC-PROM-05'))prom+=6;
    if(has('LOG-LJC-PROM-06'))prom+=8;
    if(has('LOG-LJC-PROM-07'))prom+=10;
    out.push({id:'prometheus',name:'PROMETHEUS',value:clampRel(prom),status:prom>=70?'협력 가능':prom>=50?'접촉 유지':prom>=35?'불신 속 대화':'적대 기억',tone:'#f0a030',hint:'진실/탈출 루트'});
  }
  if(has('LOG-DG-CONTACT')){
    var dg=35;
    if(has('LOG-DG-DEAL'))dg+=18;
    if(has('LOG-DG-HISTORY'))dg+=10;
    if(has('LOG-DG-HISTORY-DEEP'))dg+=8;
    if(has('LOG-SUPPLY-DG'))dg+=12;
    if(has('LOG-DG-VS-MD'))dg+=15;
    if(has('LOG-DG-LEDGER'))dg+=6;
    if(has('LOG-AUDIT-COMPLY'))dg+=8;
    if(has('LOG-DG-RETALIATE'))dg-=12;
    if(has('LOG-AUDIT-ALLY'))dg-=10;
    out.push({id:'dg',name:'DG',value:clampRel(dg),status:dg>=75?'영향력 과밀':dg>=55?'거래 우위':dg>=40?'접촉/탐색':'경계',tone:'#d8b45a',hint:'보급/종속 위험'});
  }
  if(has('LOG-MD-CONTACT')){
    var md=35;
    if(has('LOG-MD-INTEL'))md+=18;
    if(has('LOG-MD-BACKCHANNEL'))md+=16;
    if(has('LOG-SUPPLY-MD'))md+=12;
    if(has('LOG-DG-DECRYPT'))md+=15;
    if(has('LOG-MD-REJECT'))md-=8;
    if(has('LOG-DG-VS-MD'))md-=25;
    out.push({id:'meridian',name:'MERIDIAN',value:clampRel(md),status:md>=70?'채무성 협력':md>=50?'정보 교환':md>=35?'보류 라인':'차단 위기',tone:'#55c8d8',hint:'정보/개입 부담'});
  }
  return out;
}

function genNews(s,g,logs){var l=[],recent=getRecentNewsItems(),lg=logs||[];if(s.c>60)pushNewsPick(l,NP.gc,recent);else if(s.c<40)pushNewsPick(l,NP.bc,recent);if(s.r<30)pushNewsPick(l,NP.br,recent);pushNewsPick(l,NP.w,recent);if(Math.random()<0.5)pushNewsPick(l,NP.w,recent);if(s.day>3&&Math.random()<0.5)pushNewsPick(l,NP.p,recent);
  var glReady=g<=-10&&s.day>5&&(lg.indexOf('LOG-012')>=0||lg.indexOf('LOG-016')>=0||lg.indexOf('LOG-018')>=0||lg.indexOf('LOG-019')>=0||lg.indexOf('LOG-050')>=0||lg.indexOf('LOG-051')>=0||lg.indexOf('LOG-OBSERVER-INTRO')>=0);
  if(glReady&&Math.random()<0.5){var glPool=NP.gl;if(lg.indexOf('LOG-016')<0&&Array.isArray(glPool)){glPool=glPool.filter(function(item){return String(item).indexOf('31%')<0})}pushNewsPick(l,glPool,recent)}
  // v1.2: DG/Meridian 뉴스 — 관련 LOG 획득 후 또는 특정 day 이후 30% 확률로 추가 노출
  if(NP.dg&&(lg.indexOf('LOG-DG-CONTACT')>=0||s.day>=10)&&Math.random()<0.3)pushNewsPick(l,NP.dg,recent);
  if(NP.md&&(lg.indexOf('LOG-MD-CONTACT')>=0||s.day>=14)&&Math.random()<0.3)pushNewsPick(l,NP.md,recent);
  genChoiceReactionNews(s,g,lg,recent).forEach(function(item){pushUniqueNews(l,item)});
  var out=uniqueNewsItems(l);rememberNewsItems(out);return out}

function isIntroDlg(d,i){var chars=['\uc11c\ud558\uc740','\uac15\ub3c4\uc724','\uc724\uc138\uc9c4','\uc784\uc7ac\ud601'];var ci=chars.indexOf(d.char);if(ci<0)return false;return i===ci}

function introsDone(logs){return (logs.indexOf('LOG-INTRO-SH')>=0||logs.indexOf('LOG-050')>=0)&&logs.indexOf('LOG-INTRO-KD')>=0&&logs.indexOf('LOG-INTRO-YS')>=0&&logs.indexOf('LOG-INTRO-IJ')>=0}

function checkActTransition(s,g,lg,af,curAct){
  // 디스패치 타임라인: 문서 기준 (Act1→5, Act2→14, Act3→29, Act4 종료 day>35)
  if(curAct===1&&s.day>=5){
    return{act:2,route:'A'};
  }
  if(curAct===2&&s.day>=14){
    var route=af.prom_met&&af.mission_done?'A':af.prom_met?'B':af.mission_done?'C':'D';
    return{act:3,route:route};
  }
  if(curAct===3&&s.day>=29){
    // GI 수치 기반 Act 4 루트 결정
    var route=g>=10?'A4_COMPLY':g>=-15?'A4_GREY':g>=-30?'A4_RESIST':'A4_OBSERVER';
    return{act:4,route:route};
  }
  return null;
}

// checkLogs: trust, tryUnlock를 파라미터로 받아 처리
function checkLogs(s,g,cid,dc,di,dir,logs,trust,tryUnlock){
    if(s.day>=1)tryUnlock('LOG-001');if(s.day>=3)tryUnlock('LOG-002');if(s.day>=7)tryUnlock('LOG-011');
    if(cid==='C-006')tryUnlock('LOG-003');if(cid==='C-003')tryUnlock('LOG-004');if(cid==='C-010')tryUnlock('LOG-005');
    if(cid==='C-042'||cid==='C-043')tryUnlock('LOG-013');
    if(cid==='C-044'||cid==='C-045')tryUnlock('LOG-014');
    if(cid==='C-046'||cid==='C-047')tryUnlock('LOG-015');
    if(cid==='C-091')tryUnlock('LOG-020');if(cid==='C-092')tryUnlock('LOG-021');
    if(cid==='C-093')tryUnlock('LOG-022');if(cid==='C-094')tryUnlock('LOG-023');if(cid==='C-095')tryUnlock('LOG-024');
    if(cid==='C-106')tryUnlock('LOG-C106-HERB');
    if(cid==='C-114'&&dir==='left')tryUnlock('LOG-027');if(cid==='C-124')tryUnlock('LOG-028');
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
    if(cid==='CH-004-2'){tryUnlock('LOG-009');tryUnlock('LOG-DEFECTOR-1')}
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
    if(cid==='C-159')tryUnlock('LOG-C159-GYM');
    if(cid==='C-078')tryUnlock('LOG-078');
    if(cid==='C-080')tryUnlock('LOG-079');
    if(cid==='C-201')tryUnlock('LOG-076');
    if(cid==='C-215')tryUnlock('LOG-077');
    // ═══ 외부 인물 + 미확인 관찰자 (data-cards-15.js) ═══
    if(cid==='CH-005-3')tryUnlock('LOG-080');
    if(cid==='C-248'&&dir==='left')tryUnlock('LOG-081');
    if(cid==='C-249'&&dir==='left')tryUnlock('LOG-081-DATA');
    if(cid==='C-250')tryUnlock('LOG-081-INTEL');
    if(cid==='C-081'&&dir==='left')tryUnlock('LOG-082');
    if(cid==='C-252')tryUnlock('LOG-082-REPORT');
    if(cid==='C-253')tryUnlock('LOG-083');
    // ═══ DG·Meridian (data-cards-dg-meridian.js v1.2) ═══
    if(cid==='DG-01'&&dir==='left')tryUnlock('LOG-DG-CONTACT');
    if((cid==='DG-02'||cid==='DG-03')&&dir==='left')tryUnlock('LOG-DG-DEAL');
    if(cid==='DG-04'&&dir==='left')tryUnlock('LOG-DG-HISTORY');
    if(cid==='MD-01'&&dir==='left')tryUnlock('LOG-MD-CONTACT');
    if(cid==='MD-02'&&dir==='left')tryUnlock('LOG-MD-INTEL');
    if(cid==='MD-03'&&dir==='right')tryUnlock('LOG-MD-REJECT');
    if(cid==='MD-04'&&dir==='left')tryUnlock('LOG-DG-VS-MD');
    // ═══ 물자 택일 (SUP-DM v1.3) ═══
    if((cid==='SUP-DM-01'||cid==='SUP-DM-02'||cid==='SUP-DM-03')&&dir==='left')tryUnlock('LOG-SUPPLY-MD');
    if((cid==='SUP-DM-01'||cid==='SUP-DM-02'||cid==='SUP-DM-03')&&dir==='right')tryUnlock('LOG-SUPPLY-DG');
    // ═══ 내부분열 중재 (CA23-DV v1.0) — 좌 선택 시 해결 체인 LOG ═══
    if(cid==='CA23-DV-01'&&dir==='left')tryUnlock('LOG-DV-01-MED');
    if(cid==='CA23-DV-02'&&dir==='left')tryUnlock('LOG-DV-02-MED');
    if(cid==='CA23-DV-03'&&dir==='left')tryUnlock('LOG-DV-03-MED');
    if(cid==='CA23-DV-04'&&dir==='left')tryUnlock('LOG-DV-04-MED');
    // ═══ 큰 분기 CHAINS 파생 LOG (data-chains-branch.js v1.0) ═══
    if(cid==='CH-DG-04-L-2'&&dir==='left')tryUnlock('LOG-DG-HISTORY-DEEP');
    if(cid==='CH-MD-03-L-2'&&dir==='left')tryUnlock('LOG-DG-RETALIATE');
    if(cid==='CH-SUP-DG-1-R-2'&&dir==='left')tryUnlock('LOG-DG-LEDGER');
    if(cid==='CH-MD-04-R-1'&&dir==='left')tryUnlock('LOG-MD-BACKCHANNEL');
    if(cid==='CH-MD-04-R-2'&&dir==='left')tryUnlock('LOG-DG-DECRYPT');
    if(cid==='CH-DG-WARN-R-1'&&dir==='left')tryUnlock('LOG-AUDIT-COMPLY');
    if(cid==='CH-DG-WARN-R-2'&&dir==='left')tryUnlock('LOG-AUDIT-ALLY');
}

// ═══ app.js 호환 alias (함수명 불일치 수정) ═══
var checkLogsAll=function(s,g,cid,dc,di,dir,logs,trust,tryUnlock){checkLogs(s,g,cid,dc,di,dir,logs,trust,tryUnlock)};
var chkGameOver=chk;
var genNewsHeadlines=genNews;
var checkActTransitionLogic=checkActTransition;
var isIntrosDone=introsDone;
var isIntroDlgCheck=isIntroDlg;
