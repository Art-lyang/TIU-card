// TERMINAL SESSION — components.js
var h=React.createElement,useState=React.useState,useEffect=React.useEffect,useRef=React.useRef,useCallback=React.useCallback;

function Boot(p){
  var s=useState([]),lines=s[0],setLines=s[1];var s2=useState(false),done=s2[0],setDone=s2[1];var idx=useRef(0);
  useEffect(function(){var t=setInterval(function(){if(idx.current<BOOT_LINES.length){setLines(function(p){return p.concat([BOOT_LINES[idx.current]])});idx.current++}else{clearInterval(t);setTimeout(function(){setDone(true)},800)}},280);return function(){clearInterval(t)}},[]);
  return h('div',{className:'boot'},IMG.title_screen&&h('div',{style:{width:'100%',maxWidth:420,marginBottom:12,flexShrink:0,position:'relative',overflow:'hidden',borderRadius:4,border:'1px solid #0d2a0d',boxShadow:'0 0 30px rgba(0,255,0,0.04)'}},h('img',{src:IMG.title_screen,alt:'TERMINAL SESSION',style:{width:'100%',display:'block',filter:'brightness(0.8) contrast(1.1)',opacity:done?1:0.6+Math.min(0.4,lines.length*0.04),transition:'opacity 0.5s ease'}})),h('div',{className:'boot-text',style:{fontFamily:"'Share Tech Mono',monospace",fontSize:12,lineHeight:1.7,maxWidth:420,width:'100%',overflowY:'auto',flex:1,minHeight:0}},lines.map(function(l,i){var s=String(l||'');return h('div',{key:i,style:{color:s.indexOf('TERMINAL SESSION')>=0?'#f0a030':s.indexOf('WELCOME')>=0?'#50ff50':'#33ff33',fontWeight:s.indexOf('TERMINAL')>=0||s.indexOf('WELCOME')>=0?'bold':'normal',whiteSpace:'pre-wrap',animation:'slideUp 0.3s ease'}},s)}),!done&&h('span',{style:{animation:'blink 1s infinite'}},'█')),done&&h('button',{className:'btn',onClick:p.onDone},'[ 세션 시작 ]'));
}
function Stats(p){
  var sm=[{k:'c',l:'봉쇄'},{k:'r',l:'자원'},{k:'t',l:'신뢰'},{k:'o',l:'평가'}];
  return h('div',{style:{width:'100%',maxWidth:440,flexShrink:0}},
    h('div',{className:'section-hdr'},h('span',null,'ORACLE STATUS — DAY '+p.stats.day)),
    sm.map(function(s){var v=p.stats[s.k],d=v<=15,hi=v>=85;return h('div',{key:s.k,className:'gauge-row'+(d?' gauge-danger':'')+(hi?' gauge-high':'')},
      h('div',{className:'gauge-icon gauge-icon-'+s.k}),
      h('span',{className:'gauge-label'},s.l),
      h('div',{className:'gauge-bar'},h('div',{className:'gauge-fill',style:{width:v+'%'}})),
      h('span',{className:'gauge-val'},v))})
  );
}
function CardC(p){
  var card=p.card,gi=p.gi||0;
  var s1=useState(0),dx=s1[0],setDx=s1[1];var s2=useState(false),dragging=s2[0],setDragging=s2[1];var s3=useState(0),sx=s3[0],setSx=s3[1];var s4=useState(null),chosen=s4[0],setChosen=s4[1];
  var th=80,dir=dx>th?'right':dx<-th?'left':null,tx=chosen==='left'?-400:chosen==='right'?400:dx;
  var hS=function(x){setSx(x);setDragging(true)},hM=function(x){if(dragging)setDx(x-sx)};
  var hE=function(){setDragging(false);if(dir){setChosen(dir);setTimeout(function(){p.onSwipe(dir);setDx(0);setChosen(null)},300)}else setDx(0)};
  var pcClass=card.priority==='상'?' card-p-high':card.priority==='중'?' card-p-mid':' card-p-low';
  var plbl=card.priority==='상'?'상 ■':card.priority==='중'?'중 ■':'하';
  var specImgMap={'spec-001':IMG.spec_001_mannequin,'spec-003':IMG.spec_003_brood,'spec-008':IMG.spec_008_spore,'spec-011':IMG.spec_011_shelltalker,'spec-012':IMG.spec_012_bloodpit};
  var specBg=card.tag&&specImgMap[card.tag]?specImgMap[card.tag]:null;
  return h('div',{style:{flex:1,width:'100%',maxWidth:440,position:'relative',display:'flex',flexDirection:'column',minHeight:0}},
    h('div',{style:{position:'absolute',top:'50%',left:4,fontSize:11,color:'#33ff33',opacity:dx<-30?Math.min(0.8,Math.abs(dx)/th):0,transition:'opacity 0.1s',fontFamily:"'Share Tech Mono',monospace",transform:'translateY(-50%)',pointerEvents:'none',zIndex:2}},'← '+card.left.label),
    h('div',{style:{position:'absolute',top:'50%',right:4,fontSize:11,color:'#33ff33',opacity:dx>30?Math.min(0.8,dx/th):0,transition:'opacity 0.1s',fontFamily:"'Share Tech Mono',monospace",transform:'translateY(-50%)',textAlign:'right',pointerEvents:'none',zIndex:2}},card.right.label+' →'),
    h('div',{className:'card-panel'+pcClass,style:{transform:'translateX('+tx+'px) rotate('+(tx*0.04)+'deg)',transition:dragging?'none':'transform 0.3s ease',opacity:chosen?0:1,touchAction:'pan-y'},
      onMouseDown:function(e){hS(e.clientX)},onMouseMove:function(e){hM(e.clientX)},onMouseUp:hE,onMouseLeave:function(){if(dragging)hE()},
      onTouchStart:function(e){hS(e.touches[0].clientX)},onTouchMove:function(e){e.preventDefault();hM(e.touches[0].clientX)},onTouchEnd:hE},
      specBg&&h('div',{className:'card-img-bg',style:{backgroundImage:'url('+specBg+')'}}),
      h('div',{className:'card-hdr'},h('span',{className:'card-hdr-l'},'ORACLE 통신'),h('span',{className:'card-hdr-r'},'우선순위: '+plbl)),
      h('div',{className:'card-msg'},card.msg),
      h('div',{className:'card-choices'},h('div',{className:'card-choice card-choice-l'},card.left.label),h('div',{className:'card-choice card-choice-r'},card.right.label))
    ));
}
function News(p){
  var s=useState(0),shown=s[0],setShown=s[1];var dIdx=0,fIdx=0;
  useEffect(function(){if(shown<p.headlines.length){var t=setTimeout(function(){setShown(function(v){return v+1})},500);return function(){clearTimeout(t)}}},[shown,p.headlines.length]);
  var parseHL=function(raw){var s=String(raw||'');var isGl=s.indexOf('분류 오류')>=0;var isDel=s.indexOf('삭제됨')>=0;if(isGl||isDel)return{tag:'REDACTED',text:s,gl:true};if(s.indexOf('[해외]')>=0){fIdx++;return{tag:'FOREIGN-0'+fIdx,text:s.replace('[해외] ',''),gl:false}}if(s.indexOf('[국내]')>=0){dIdx++;return{tag:'DOMESTIC-0'+dIdx,text:s.replace('[국내] ',''),gl:false}}return{tag:'INTEL-01',text:s,gl:false}};
  return h('div',{style:{width:'100%',maxWidth:440,background:'url(news_panel.png) center/100% 100% no-repeat',padding:'20px 24px 16px',display:'flex',flexDirection:'column',flex:1,minHeight:0}},
    h('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:4}},
      h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:12,color:'#9dff74',letterSpacing:1}},'[ORACLE // INTEL BRIEFING]'),
      h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(157,255,116,.6)',letterSpacing:1}},'PRIORITY: MEDIUM')),
    h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:16,color:'rgba(220,255,220,.9)',fontWeight:'bold',marginBottom:12,letterSpacing:1}},'DAY '+(p.day||'?')+' REPORT'),
    h('div',{style:{flex:1,overflowY:'auto',minHeight:0}},
      p.headlines.slice(0,shown).map(function(l,i){var hl=parseHL(l);return h('div',{key:i,style:{borderBottom:'1px solid rgba(145,255,106,.1)',padding:'10px 0',animation:'fadeIn 0.4s ease'}},
        h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:hl.gl?'#ff6644':'rgba(157,255,116,.6)',letterSpacing:1,marginBottom:3}},'['+hl.tag+']'),
        h('div',{style:{fontSize:14,lineHeight:1.5,color:hl.gl?'#ff4444':'rgba(220,255,220,.8)',fontFamily:hl.gl?"'Share Tech Mono',monospace":'inherit'}},hl.text))})),
    shown>=p.headlines.length&&h('button',{style:{display:'block',margin:'12px auto 0',background:'url(advance_button.png) center/100% 100% no-repeat',border:'none',color:'rgba(220,255,220,.9)',fontFamily:"'Share Tech Mono',monospace",fontSize:13,letterSpacing:1,padding:'12px 24px',cursor:'pointer',minWidth:220,flexShrink:0},onClick:p.onContinue},'[ 다음 사이클 진행 ]'));
}
function GameOver(p){
  var msg=p.gi>50?"요원의 헌신적 복무에 감사드립니다.":p.gi>25?"세션이 종료됩니다. 결과가 기록되었습니다.":"비표준 운영 패턴 감지. 세션 데이터 분석 중...";
  var narr=p.endNarr;
  var btns=h('div',{style:{flexShrink:0,display:'flex',flexDirection:'column',alignItems:'center',gap:10,paddingBottom:20}},h('button',{className:'btn btn-amber',onClick:p.onRestart},'[ 세션 재개시 ]'),h('div',{style:{display:'flex',gap:10}},h('button',{className:'btn',style:{fontSize:12,padding:'10px 18px',minHeight:44,marginTop:0},onClick:p.onLogs},'기록'),h('button',{className:'btn',style:{fontSize:12,padding:'10px 18px',minHeight:44,marginTop:0},onClick:p.onEndings},'엔딩')));
  if(narr&&narr.narrative){return h('div',{className:'boot',style:{justifyContent:'flex-start',paddingTop:30}},h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'#1a6a1a',letterSpacing:2,textAlign:'center',marginBottom:12,flexShrink:0}},'ENDING: '+narr.name),h('div',{style:{fontSize:13,lineHeight:2,maxWidth:420,width:'100%',overflowY:'auto',flex:1,minHeight:0,padding:'0 8px'}},narr.narrative.map(function(l,i){var isCmd=l.indexOf('>')===0||l.indexOf('[')===0;var isEmpty=l==='';return h('div',{key:i,style:{color:isCmd?'#f0a030':isEmpty?'transparent':'#33ff33',fontFamily:isCmd?"'Share Tech Mono',monospace":'inherit',fontWeight:isCmd?'bold':'normal',minHeight:isEmpty?10:'auto',whiteSpace:'pre-wrap',textAlign:'left'}},isEmpty?'\u00A0':l)})),btns)}
  return h('div',{className:'boot'},h('div',{style:{fontSize:13,lineHeight:1.9,maxWidth:420,width:'100%',textAlign:'center'}},h('div',{className:'go-title'},'─── SESSION TERMINATED ───'),h('div',{className:'go-reason'},p.reason),h('div',{className:'go-section'},'── ORACLE 최종 보고 ──'),h('div',{className:'go-stat'},'운영 기간: '+p.stats.day+'일'),h('div',{className:'go-stat'},'봉쇄: '+p.stats.c+' | 자원: '+p.stats.r+' | 신뢰: '+p.stats.t+' | 평가: '+p.stats.o),h('div',{className:'go-msg'},'"'+msg+'"')),btns);
}
function Tutorial(p){
  var s1=useState(0),step=s1[0],setStep=s1[1];
  var steps=[{lines:["ORACLE 인사 프로토콜을 개시합니다.","","환영합니다, 이중철 지휘관.","","당신은 Proxy Network 한국 지부의","초대 지휘관으로 발령되었습니다.","","본 지부는 강원도 내 비공개 위치에","설치된 최초의 한국 거점입니다."],choices:[{label:"발령을 수락합니다",next:1},{label:"상세 브리핑을 요청합니다",next:1}]},{lines:["대한민국은 EV-Σ 위기 속에서","안정적인 봉쇄 체계를 유지하고 있는","몇 안 되는 국가 중 하나입니다.","","지휘관으로서 당신의 역할은","기지 운영과 현장 임무를 총괄하는 것입니다."],choices:[{label:"계속",next:2}]},{lines:["지휘관은 4가지 핵심 지표를 관리해야 합니다.","","◆ 봉쇄 — 관할 구역 봉쇄선 유지도","◇ 자원 — 식량, 의약품, 장비","○ 신뢰 — 기지 인원의 신뢰도","● 평가 — ORACLE의 당신에 대한 평가","","어느 지표든 0이 되면 임무에 실패합니다."],choices:[{label:"이해했습니다",next:3}]},{lines:["매일 ORACLE이 보고서와 요청을 전달합니다.","","카드를 좌우로 밀어 결정을 내리십시오.","","← 왼쪽: 첫 번째 선택지","→ 오른쪽: 두 번째 선택지"],choices:[{label:"임무를 시작합니다",next:-1}]}];
  var st=steps[step];var s2=useState(0),shown=s2[0],setShown=s2[1];var s3=useState(false),bv=s3[0],setBv=s3[1];
  useEffect(function(){setShown(0);setBv(false)},[step]);
  useEffect(function(){if(shown<st.lines.length){var t=setTimeout(function(){setShown(function(v){return v+1})},st.lines[shown]===''?150:80);return function(){clearTimeout(t)}}else{var t2=setTimeout(function(){setBv(true)},400);return function(){clearTimeout(t2)}}},[shown,step]);
  return h('div',{className:'screen'},h('div',{style:{width:'100%',maxWidth:420,padding:'40px 0',flex:1,display:'flex',flexDirection:'column'}},h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'#1a6a1a',textAlign:'center',marginBottom:16,letterSpacing:2}},'ORACLE BRIEFING — '+(step+1)+'/'+steps.length),h('div',{style:{flex:1,display:'flex',flexDirection:'column',justifyContent:'center'}},st.lines.slice(0,shown).map(function(l,i){var txt=String(l||' '),isIcon='◆◇○●'.split('').some(function(c){return txt.indexOf(c)>=0});return h('div',{key:step+'-'+i,style:{fontSize:isIcon?13:14,lineHeight:1.8,color:isIcon?'#f0a030':txt.indexOf('←')>=0?'#33ff33':'#ccddcc',textAlign:'center'}},txt)})),bv&&h('div',{style:{display:'flex',flexDirection:'column',gap:10,alignItems:'center',paddingBottom:20}},st.choices.map(function(c,i){return h('button',{key:i,className:'btn'+(i===0?' btn-amber':''),onClick:function(){if(c.next===-1)p.onDone();else setStep(c.next)}},c.label)}))));
}
function RewardScreen(p){
  var SN={c:'봉쇄',r:'자원',t:'신뢰',o:'평가'};
  var count=4;if(p.stats.c<30||p.stats.r<30||p.stats.t<30||p.stats.o<30)count=3;if(p.stats.c<20||p.stats.r<20||p.stats.t<20||p.stats.o<20)count=2;if(p.stats.c<10||p.stats.r<10||p.stats.t<10||p.stats.o<10)count=1;
  var av=pickN(REWARDS,count);var s1=useState(-1),sel=s1[0],setSel=s1[1];
  var fxList=function(fx){var pos=[],neg=[];['c','r','t','o'].forEach(function(k){var v=(fx[k]||0)*5;if(v>0)pos.push({k:k,v:v});if(v<0)neg.push({k:k,v:v})});return{pos:pos,neg:neg}};
  return h('div',{className:'screen'},
    h('div',{className:'title-frame'},h('span',null,'ORACLE // RESOURCE DIRECTIVE')),
    h('div',{style:{fontSize:14,color:'rgba(220,255,220,.85)',textAlign:'center',margin:'8px 0 12px'}},count===4?'4개 중 1개를 선택하십시오':count+'개 중 선택'),
    h('div',{style:{flex:1,width:'100%',maxWidth:440,overflowY:'auto',minHeight:0,padding:'0 2px'}},
      av.map(function(r,i){var fl=fxList(r.fx);var isSel=sel===i;return h('div',{key:r.id,className:'oracle-card'+(isSel?' is-selected':''),onClick:function(){setSel(i)}},
        h('div',{className:'oracle-card__glow'}),
        h('span',{className:'oracle-card__tag'},'OPTION 0'+(i+1)),
        h('div',{className:'oracle-card__title'},r.title),
        h('div',{className:'oracle-card__desc'},r.desc),
        h('div',{className:'oracle-card__effects'},
          fl.pos.map(function(e){return h('span',{key:e.k,className:'oracle-card__effect oracle-card__effect--pos'},'▲ '+SN[e.k]+' +'+e.v)}),
          fl.neg.map(function(e){return h('span',{key:e.k,className:'oracle-card__effect oracle-card__effect--neg'},'▼ '+SN[e.k]+' '+e.v)})
        ),
        isSel&&h('button',{className:'oracle-card__execute',onClick:function(e){e.stopPropagation();p.onPick(r)}},'— EXECUTE —')
      )})
    ),
    h('div',{className:'footer-frame'},h('span',null,'ORACLE REMOTE TERMINAL — BRANCH KR-INIT-001'))
  );
}
function Dialogue(p){
  var d=p.dialogue,portrait=CHAR_IMG[d.char]||null;
  var SN={c:{l:'봉쇄',ic:'◆'},r:{l:'자원',ic:'◇'},t:{l:'신뢰',ic:'○'},o:{l:'평가',ic:'●'}};
  var s1=useState(0),li=s1[0],setLi=s1[1];var s2=useState(false),sc=s2[0],setSc=s2[1];
  var s3=useState(-1),picked=s3[0],setPicked=s3[1];var s4=useState(null),chosen=s4[0],setChosen=s4[1];
  var s5=useState(''),rTxt=s5[0],setRTxt=s5[1];var s6=useState(false),rDone=s6[0],setRDone=s6[1];
  useEffect(function(){setLi(0);setSc(false);setPicked(-1);setChosen(null);setRTxt('');setRDone(false)},[d]);
  useEffect(function(){if(li<d.lines.length){var t=setTimeout(function(){setLi(function(v){return v+1})},800);return function(){clearTimeout(t)}}else{var t2=setTimeout(function(){setSc(true)},400);return function(){clearTimeout(t2)}}},[li]);
  useEffect(function(){if(!chosen||!chosen.reply)return;var txt=chosen.reply;var i=0;var t=setInterval(function(){if(i<txt.length){i++;setRTxt(txt.substring(0,i))}else{clearInterval(t);setTimeout(function(){setRDone(true)},800)}},30);return function(){clearInterval(t)}},[chosen]);
  useEffect(function(){if(rDone&&chosen){var t=setTimeout(function(){p.onChoice(chosen)},1400);return function(){clearTimeout(t)}}},[rDone]);
  var handlePick=function(c,i){if(picked>=0)return;setPicked(i);setTimeout(function(){setChosen(c)},500)};
  var fxTags=function(fx){if(!fx)return null;var tags=[];['c','r','t','o'].forEach(function(k){if(fx[k]&&fx[k]!==0){tags.push({key:k,val:fx[k],name:SN[k].l,ic:SN[k].ic})}});if(!tags.length)return null;return h('div',{style:{display:'flex',gap:10,marginTop:8,flexWrap:'wrap',animation:'fadeIn 0.5s ease'}},tags.map(function(t){var pos=t.val>0;return h('span',{key:t.key,style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:pos?'#50ff50':'#ff4444',textShadow:'0 0 6px '+(pos?'rgba(80,255,80,0.4)':'rgba(255,68,68,0.4)'),letterSpacing:1}},t.ic+t.name+(pos?'+':'')+t.val)}))};
  return h('div',{className:'screen'},
    h('div',{className:'title-frame'},h('span',null,'ORACLE // COMMUNICATION')),
    h('div',{style:{textAlign:'center',margin:'8px 0',flexShrink:0}},
      portrait&&h('img',{src:portrait,className:'portrait',alt:d.char,style:{width:90,height:90}}),
      h('div',{style:{fontSize:15,color:'#f0a030',fontWeight:'bold'}},d.char),
      h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'#1a8a1a',marginTop:2}},d.role)),
    h('div',{style:{width:'100%',maxWidth:440,flex:1,minHeight:0,background:'url(dialog_panel.png) center/100% 100% no-repeat',padding:'18px 22px',display:'flex',flexDirection:'column',overflowY:'auto'}},
      h('div',{style:{marginBottom:8,flexShrink:0}},
        h('div',{style:{fontSize:14,color:'#9dff74',fontWeight:'bold'}},d.char),
        h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(157,255,116,.6)'}},d.role)),
      h('div',{style:{flex:1}},
        d.lines.slice(0,li).map(function(l,i){return h('div',{key:i,style:{fontSize:14,lineHeight:1.7,color:'rgba(220,255,220,.8)',marginBottom:6,animation:'fadeIn 0.3s ease'}},String(l))}),
        chosen&&chosen.reply&&h('div',{style:{fontSize:14,lineHeight:1.7,color:'#f0a030',marginTop:8}},rTxt,!rDone&&h('span',{style:{animation:'blink 1s infinite',marginLeft:2}},'▌')),
        rDone&&chosen&&fxTags(chosen.fx)),
      !sc&&!chosen&&h('div',{style:{textAlign:'right',marginTop:4}},h('span',{style:{color:'rgba(145,255,106,.5)',animation:'blink 1s infinite',fontSize:12}},'▶'))),
    sc&&!chosen&&h('div',{style:{width:'100%',maxWidth:440,flexShrink:0,display:'flex',flexDirection:'column',gap:8,padding:'8px 0'}},
      d.choices.map(function(c,i){var isMe=picked===i;var isOther=picked>=0&&picked!==i;var img=i===0?'choice_orange.png':'choice_green.png';return h('button',{key:i,style:{background:'url('+img+') center/100% 100% no-repeat',border:'none',color:i===0?'#f0a030':'#9dff74',fontFamily:'inherit',fontSize:14,padding:'14px 20px',cursor:'pointer',textAlign:'center',opacity:isOther?0.15:1,transform:isMe?'scale(1.02)':'scale(1)',filter:isMe?'brightness(1.3)':'none',transition:'all 0.3s ease',pointerEvents:picked>=0?'none':'auto',minHeight:44},onClick:function(){handlePick(c,i)}},c.label)}))
  );
}
function LogViewer(p){
  var s1=useState(null),sel=s1[0],setSel=s1[1];var ul=ORACLE_LOGS.filter(function(l){return p.unlockedIds.indexOf(l.id)>=0}),lk=ORACLE_LOGS.length-ul.length;
  if(sel){var log=ORACLE_LOGS.filter(function(l){return l.id===sel})[0];return h('div',{className:'screen'},h('div',{style:{width:'100%',maxWidth:420,padding:'20px 0',flex:1,overflowY:'auto'}},h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'#1a6a1a',letterSpacing:2,textAlign:'center',marginBottom:16}},'ORACLE DATABASE — RECORD VIEW'),h('div',{style:{fontSize:14,color:'#f0a030',fontWeight:'bold',textAlign:'center',marginBottom:16}},log.title),h('div',{style:{background:'#0d1a0d',border:'1px solid #1a3a1a',borderRadius:4,padding:16,fontFamily:"'Share Tech Mono',monospace",fontSize:12,lineHeight:2,color:'#33ff33',whiteSpace:'pre-wrap'}},log.content),h('div',{style:{display:'flex',gap:10,justifyContent:'center',marginTop:20}},h('button',{className:'btn',style:{fontSize:12,padding:'8px 20px',marginTop:0},onClick:function(){setSel(null)}},'← 목록'),h('button',{className:'btn btn-amber',style:{fontSize:12,padding:'8px 20px',marginTop:0},onClick:p.onClose},'닫기'))));}
  return h('div',{className:'screen'},IMG.bg_corridor&&h('div',{className:'bg-overlay',style:{backgroundImage:'url('+IMG.bg_corridor+')',opacity:0.07}}),h('div',{style:{width:'100%',maxWidth:420,padding:'20px 0',flex:1,overflowY:'auto'}},h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'#1a6a1a',letterSpacing:2,textAlign:'center',marginBottom:6}},'ORACLE DATABASE'),h('div',{style:{fontSize:12,color:'#888',textAlign:'center',marginBottom:20}},ul.length+'/'+ORACLE_LOGS.length+' 기록 해금'),ul.map(function(l){return h('div',{key:l.id,onClick:function(){setSel(l.id)},style:{background:'#0d1a0d',border:'1px solid #1a3a1a',borderRadius:4,padding:'12px 16px',marginBottom:8,cursor:'pointer'}},h('div',{style:{display:'flex',justifyContent:'space-between'}},h('span',{style:{fontSize:13,color:'#33ff33'}},l.title),h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'#1a6a1a'}},l.id)))}),lk>0&&h('div',{style:{fontSize:12,color:'#333',textAlign:'center',marginTop:12,fontStyle:'italic'}},lk+'건의 기록이 잠겨 있습니다'),h('button',{className:'btn btn-amber',style:{display:'block',margin:'20px auto 0',fontSize:12,padding:'8px 20px'},onClick:p.onClose},'닫기')));
}
function EndingScreen(p){
  var all=[{id:'A',name:'완벽한 도구',hint:'ORACLE의 최고 신임을 얻으라'},{id:'B',name:'각성',hint:'진실의 단편을 목격하라'},{id:'C_c',name:'봉쇄 붕괴',hint:'봉쇄선이 무너지다'},{id:'C_r',name:'자원 고갈',hint:'기지가 기능을 잃다'},{id:'C_t',name:'신뢰 상실',hint:'동료들이 떠나다'},{id:'C_o',name:'접속 차단',hint:'ORACLE이 당신을 버리다'},{id:'D',name:'조용한 자유',hint:'반란 속의 해방'},{id:'F',name:'[데이터 손상]',hint:'???'}];
  return h('div',{className:'screen'},h('div',{style:{width:'100%',maxWidth:420,padding:'20px 0',flex:1,overflowY:'auto'}},h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'#1a6a1a',letterSpacing:2,textAlign:'center',marginBottom:6}},'SESSION ARCHIVE'),h('div',{style:{fontSize:12,color:'#888',textAlign:'center',marginBottom:20}},'총 세션: '+p.sessions+' | 엔딩: '+p.endings.length+'/'+all.length),all.map(function(e){var f=p.endings.indexOf(e.id)>=0;return h('div',{key:e.id,style:{background:f?'#0d1a0d':'#080808',border:'1px solid '+(f?'#1a3a1a':'#111'),borderRadius:4,padding:'12px 16px',marginBottom:8}},h('div',{style:{fontSize:14,color:f?'#33ff33':'#333',fontWeight:'bold'}},f?e.name:'[미발견]'),h('div',{style:{fontSize:11,color:f?'#1a6a1a':'#222',marginTop:4,fontStyle:'italic'}},f?'달성 완료':e.hint))}),h('button',{className:'btn btn-amber',style:{display:'block',margin:'20px auto 0',fontSize:12,padding:'8px 20px'},onClick:p.onClose},'닫기')));
}
function FieldMission(p){
  var mission=MISSIONS[p.missionId];var s1=useState('start'),nodeId=s1[0],setNodeId=s1[1];var s2=useState(''),textShown=s2[0],setTextShown=s2[1];var s3=useState(false),showChoices=s3[0],setShowChoices=s3[1];
  var node=mission.nodes[nodeId];var mImg=p.missionId==='M-001'?IMG.spec_012_bloodpit:p.missionId==='M-002'?IMG.spec_011_shelltalker:p.missionId==='M-004'?IMG.spec_001_mannequin:p.missionId==='M-005'?IMG.spec_003_brood:p.missionId==='M-006'?IMG.spec_008_spore:null;
  useEffect(function(){setTextShown('');setShowChoices(false);var i=0;var txt=node.text;var t=setInterval(function(){if(i<txt.length){i++;setTextShown(txt.substring(0,i))}else{clearInterval(t);setTimeout(function(){setShowChoices(true)},400)}},25);return function(){clearInterval(t)}},[nodeId]);
  var handleChoice=function(choice){if(choice.next==='end'){p.onComplete({result:choice.result||{},g:choice.g||0,log:choice.log||null})}else{setNodeId(choice.next)}};
  return h('div',{className:'screen',style:{overflow:'hidden'}},
    IMG.bg_restricted&&h('div',{className:'bg-overlay',style:{backgroundImage:'url('+IMG.bg_restricted+')',opacity:0.08}}),
    h('div',{style:{width:'100%',maxWidth:420,padding:'6px 0',flexShrink:0}},
      h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'#f0a030',letterSpacing:2,textAlign:'center'}},'FIELD MISSION'),
      h('div',{style:{fontSize:13,color:'#ccddcc',textAlign:'center',marginTop:2}},mission.title),
      mImg&&nodeId==='start'&&h('img',{src:mImg,className:'mission-img',alt:mission.title})
    ),
    h('div',{style:{flex:1,width:'100%',maxWidth:420,overflowY:'auto',minHeight:0,padding:'4px 0',WebkitOverflowScrolling:'touch'}},
      h('div',{style:{fontSize:13,lineHeight:1.7,color:'#33ff33',whiteSpace:'pre-wrap',borderLeft:'2px solid #1a5a1a',paddingLeft:12}},textShown,!showChoices&&h('span',{style:{animation:'blink 1s infinite'}},'▌'))
    ),
    showChoices&&h('div',{style:{width:'100%',maxWidth:420,flexShrink:0,display:'flex',flexDirection:'column',gap:6,padding:'6px 0'}},
      node.choices.map(function(c,i){return h('button',{key:i,onClick:function(){handleChoice(c)},style:{background:'#0d1a0d',border:'1px solid #1a3a1a',borderRadius:4,padding:'10px 14px',cursor:'pointer',textAlign:'left',color:c.next==='end'?'#f0a030':'#33ff33',fontSize:12,lineHeight:1.5,fontFamily:'inherit'}},h('span',{style:{marginRight:6,opacity:0.5}},'▸'),c.label)})
    ),
    h('div',{className:'footer',style:{flexShrink:0}},'ORACLE REMOTE TERMINAL — FIELD OPS')
  );
}
