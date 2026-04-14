// TERMINAL SESSION — components.js
var h=React.createElement,useState=React.useState,useEffect=React.useEffect,useRef=React.useRef,useCallback=React.useCallback;

function Boot(p){
  var BL=p.sessions>0?BOOT_LINES_REPEAT:BOOT_LINES;
  var sn=p.sessions||0;
  var s=useState([]),lines=s[0],setLines=s[1];var s2=useState(false),done=s2[0],setDone=s2[1];var idx=useRef(0);
  useEffect(function(){var t=setInterval(function(){if(idx.current<BL.length){setLines(function(p){return p.concat([BL[idx.current]])});idx.current++}else{clearInterval(t);setTimeout(function(){setDone(true)},800)}},280);return function(){clearInterval(t)}},[]);
  return h('div',{className:'boot'},IMG.title_screen&&h('div',{style:{width:'100%',maxWidth:420,marginBottom:12,flexShrink:0,position:'relative',overflow:'hidden',borderRadius:4,border:'1px solid #0d2a0d',boxShadow:'0 0 30px rgba(0,255,0,0.04)'}},h('img',{src:IMG.title_screen,alt:'TERMINAL SESSION',style:{width:'100%',display:'block',filter:'brightness(0.8) contrast(1.1)',opacity:done?1:0.6+Math.min(0.4,lines.length*0.04),transition:'opacity 0.5s ease'}})),h('div',{className:'boot-text',style:{fontFamily:"'Share Tech Mono',monospace",fontSize:12,lineHeight:1.7,maxWidth:420,width:'100%',overflowY:'auto',flex:1,minHeight:0}},lines.map(function(l,i){var s=String(l||'');var isObs=s.indexOf('OBSERVER')>=0;var isGrant=s.indexOf('GRANT')>=0;var isTerm=s.indexOf('TERMINAL SESSION')>=0||s.indexOf('SESSION')>=0;var isWel=s.indexOf('WELCOME')>=0;return h('div',{key:i,style:{color:isObs?'#f0a030':isGrant?'#33cccc':isTerm?'#f0a030':isWel?'#50ff50':'#33ff33',fontWeight:isTerm||isWel||isObs||isGrant?'bold':'normal',whiteSpace:'pre-wrap',animation:'slideUp 0.3s ease'}},s)}),!done&&h('span',{style:{animation:'blink 1s infinite'}},'█')),done&&h('button',{className:'btn',onClick:p.onDone},'[ 세션 '+(sn+1)+' 시작 ]'));
}
function Stats(p){
  var sm=[{k:'c',l:'봉쇄'},{k:'r',l:'자원'},{k:'t',l:'신뢰'},{k:'o',l:'평가'}];
  var pv=p.preview||{};
  return h('div',{style:{width:'100%',maxWidth:440,flexShrink:0}},
    h('div',{className:'section-hdr'},h('span',null,'ORACLE STATUS — DAY '+p.stats.day)),
    sm.map(function(s){var v=p.stats[s.k],d=v<=15,hi=v>=85;var delta=(pv[s.k]||0)*5;var newV=Math.max(0,Math.min(100,v+delta));return h('div',{key:s.k,className:'gauge-row'+(d?' gauge-danger':'')+(hi?' gauge-high':'')},
      h('div',{className:'gauge-icon gauge-icon-'+s.k}),
      h('span',{className:'gauge-label'},s.l),
      h('div',{className:'gauge-bar'},
        h('div',{className:'gauge-bar-inner'},
          delta>0?h('div',{style:{position:'absolute',left:0,top:0,width:newV+'%',height:'100%',background:'rgba(80,255,80,0.15)',zIndex:1,transition:'width 0.15s'}}):null,
          h('div',{className:'gauge-fill',style:{width:(delta<0?newV:v)+'%',transition:'width 0.15s'}}),
          delta<0?h('div',{style:{position:'absolute',left:newV+'%',top:0,width:Math.max(0,v-newV)+'%',height:'100%',background:'rgba(255,50,50,0.3)',zIndex:1,transition:'all 0.15s'}}):null)),
      h('span',{className:'gauge-val',style:delta!==0?{color:delta>0?'#50ff50':'#ff4444',fontSize:12}:{}},delta!==0?(delta>0?'+':'')+delta:v))})
  );
}
function CardC(p){
  var card=p.card,gi=p.gi||0;
  var s1=useState(0),dx=s1[0],setDx=s1[1];var s2=useState(false),dragging=s2[0],setDragging=s2[1];var s3=useState(0),sx=s3[0],setSx=s3[1];var s4=useState(null),chosen=s4[0],setChosen=s4[1];
  var th=80,dir=dx>th?'right':dx<-th?'left':null,tx=chosen==='left'?-400:chosen==='right'?400:dx;
  var curDir=Math.abs(dx)>20?(dx<0?'left':'right'):null;
  var hS=function(x){setSx(x);setDragging(true)},hM=function(x){if(dragging){var nd=x-sx;setDx(nd);if(p.onPreview){var d=Math.abs(nd)>20?(nd<0?'left':'right'):null;p.onPreview(d?card[d].fx:null)}}};
  var hE=function(){setDragging(false);if(p.onPreview)p.onPreview(null);if(dir){setChosen(dir);setTimeout(function(){p.onSwipe(dir);setDx(0);setChosen(null)},300)}else setDx(0)};
  var pcClass=card.priority==='상'?' card-p-high':card.priority==='중'?' card-p-mid':' card-p-low';
  var plbl=card.priority==='상'?'상 ■':card.priority==='중'?'중 ■':'하';
  var specImgMap={'spec-001':IMG.spec_001_mannequin,'spec-003':IMG.spec_003_brood,'spec-008':IMG.spec_008_spore,'spec-011':IMG.spec_011_shelltalker,'spec-012':IMG.spec_012_bloodpit};
  var bgImgMap={base:IMG.bg_base,forest:IMG.bg_forest,forest2:IMG.bg_forest2,lab:IMG.bg_lab,oracle:IMG.bg_oracle,comms:IMG.bg_comms,restricted:IMG.bg_restricted,shield_off:IMG.bg_shield_off,shield_on:IMG.bg_shield_on,supply:IMG.bg_supply,weather:IMG.bg_weather};
  var specBg=card.img?IMG[card.img]:card.tag&&specImgMap[card.tag]?specImgMap[card.tag]:null;
  if(!specBg&&card.bg&&bgImgMap[card.bg])specBg=bgImgMap[card.bg];
  var SN={c:'봉쇄',r:'자원',t:'신뢰',o:'평가'};
  var fxHint=function(fx){if(!fx)return null;var tags=[];['c','r','t','o'].forEach(function(k){var v=(fx[k]||0);var abs=Math.abs(v);if(v>0)tags.push(h('span',{key:k,style:{color:'#9dff74'}},SN[k]+(abs>=2?'↑↑':'↑')));if(v<0)tags.push(h('span',{key:k,style:{color:'rgba(255,141,97,.9)'}},SN[k]+(abs>=2?'↓↓':'↓')))});return tags.length?tags:null};
  var leftFx=fxHint(card.left.fx),rightFx=fxHint(card.right.fx);
  return h('div',{style:{flex:1,width:'100%',maxWidth:440,position:'relative',display:'flex',flexDirection:'column',minHeight:0}},
    h('div',{style:{position:'absolute',top:'50%',left:4,fontSize:11,color:'#33ff33',opacity:dx<-30?Math.min(0.8,Math.abs(dx)/th):0,transition:'opacity 0.1s',fontFamily:"'Share Tech Mono',monospace",transform:'translateY(-50%)',pointerEvents:'none',zIndex:2}},'← '+card.left.label),
    h('div',{style:{position:'absolute',top:'50%',right:4,fontSize:11,color:'#33ff33',opacity:dx>30?Math.min(0.8,dx/th):0,transition:'opacity 0.1s',fontFamily:"'Share Tech Mono',monospace",transform:'translateY(-50%)',textAlign:'right',pointerEvents:'none',zIndex:2}},card.right.label+' →'),
    h('div',{className:'card-panel'+pcClass,style:{transform:'translateX('+tx+'px) rotate('+(tx*0.04)+'deg)',transition:dragging?'none':'transform 0.3s ease',opacity:chosen?0:1,touchAction:'pan-y'},
      onMouseDown:function(e){hS(e.clientX)},onMouseMove:function(e){hM(e.clientX)},onMouseUp:hE,onMouseLeave:function(){if(dragging)hE()},
      onTouchStart:function(e){hS(e.touches[0].clientX)},onTouchMove:function(e){e.preventDefault();hM(e.touches[0].clientX)},onTouchEnd:hE},
      specBg&&h('div',{className:'card-img-bg',style:{backgroundImage:'url('+specBg+')'}}),
      h('div',{className:'card-hdr'},h('span',{className:'card-hdr-l'},'ORACLE 통신'),h('span',{className:'card-hdr-r'},'우선순위: '+plbl)),
      h('div',{className:'card-msg'},function(){
        var msg=card.msg||'';var paras=msg.split('\n\n');
        return paras.map(function(para,pi){
          var lines=para.split('\n');
          return h('div',{key:pi,style:{marginBottom:pi<paras.length-1?10:0}},
            lines.map(function(line,li){
              var s=line.trim();if(!s)return null;
              // [ORACLE ...] 대괄호 스타일
              if(s.match(/^\[ORACLE[\s:：]/))return h('div',{key:li,style:{color:'#f0a030',fontFamily:"'Share Tech Mono',monospace",fontSize:12,padding:'6px 10px',margin:'4px 0',background:'rgba(240,160,48,.06)',borderLeft:'2px solid rgba(240,160,48,.3)',borderRadius:2}},s);
              // ORACLE 분석/권고/통신 등 (대괄호 없는 ORACLE 라인)
              if(s.match(/^ORACLE[\s]/))return h('div',{key:li,style:{color:'#f0a030',fontFamily:"'Share Tech Mono',monospace",fontSize:12,padding:'4px 0',margin:'2px 0'}},s);
              // 캐릭터 대사 — 이름(+직책/수식어) + 콜론
              if(s.match(/^(서하은|강도윤|윤세진|임재혁|박소영|마르쿠스 베버|닉 포스터|포스터)([\s\u00A0][\uAC00-\uD7A3A-Za-z\s]*)?[：:]/))return h('div',{key:li,style:{color:'#7ec8e3',padding:'3px 0',margin:'2px 0'}},s);
              // "인용문" — 쌍따옴표로 시작하는 독립 대사
              if(s.match(/^["\u201C\u300C]/)&&s.match(/["\u201D\u300D]$/))return h('div',{key:li,style:{color:'#a0d8a0',fontStyle:'italic',padding:'2px 0'}},s);
              // 일반 텍스트
              return h('div',{key:li,style:{padding:'1px 0'}},s);
            }));
        });
      }()),
      (leftFx||rightFx)&&h('div',{style:{marginTop:'auto',padding:'10px 0 6px',borderTop:'1px solid rgba(145,255,106,.08)'}},
        h('div',{style:{display:'flex',justifyContent:'space-between',fontFamily:"'Share Tech Mono',monospace",fontSize:10,gap:8}},
          h('div',{style:{display:'flex',gap:6,alignItems:'center',opacity:0.7}},h('span',{style:{color:'rgba(145,255,106,.5)',fontSize:9}},'←'),leftFx||h('span',{style:{color:'rgba(145,255,106,.3)'}},'—')),
          h('div',{style:{display:'flex',gap:6,alignItems:'center',opacity:0.7}},rightFx||h('span',{style:{color:'rgba(145,255,106,.3)'}},'—'),h('span',{style:{color:'rgba(145,255,106,.5)',fontSize:9}},'→')))),
      h('div',{style:{display:'flex',justifyContent:'space-between',paddingTop:8,borderTop:'1px solid rgba(145,255,106,.1)',fontFamily:"'Share Tech Mono',monospace",fontSize:11,pointerEvents:'none'}},
        h('span',{style:{color:'rgba(145,255,106,.45)'}},'← '+card.left.label),
        h('span',{style:{color:'rgba(145,255,106,.45)'}},card.right.label+' →'))
    ));
}
function News(p){
  var s=useState(0),shown=s[0],setShown=s[1];var dIdx=0,fIdx=0;
  useEffect(function(){if(shown<p.headlines.length){var t=setTimeout(function(){setShown(function(v){return v+1})},500);return function(){clearTimeout(t)}}},[shown,p.headlines.length]);
  var parseHL=function(raw){var s=String(raw||'');var isGl=s.indexOf('분류 오류')>=0;var isDel=s.indexOf('삭제됨')>=0;if(isGl||isDel)return{tag:'REDACTED',text:s,gl:true};if(s.indexOf('[해외]')>=0){fIdx++;return{tag:'FOREIGN-0'+fIdx,text:s.replace('[해외] ',''),gl:false}}if(s.indexOf('[국내]')>=0){dIdx++;return{tag:'DOMESTIC-0'+dIdx,text:s.replace('[국내] ',''),gl:false}}return{tag:'INTEL-01',text:s,gl:false}};
  var st=p.stats||{};var gi=p.gi||0;var act=p.act||1;
  var AP={h:["운영 효율 양호. 현행 유지 권고.","ORACLE 권고 이행률 우수. 한국 지부 성과 상위권.","지휘관 판단 신뢰도 높음. 현 운영 방침 유지.","기지 안정성 확인. 추가 권한 부여 검토 중."],m:["운영 안정. 일부 비표준 패턴 감지.","전반적 안정. 독립적 판단 빈도 소폭 증가.","기지 운영 정상 범위. 일부 지표 변동 주시 중.","ORACLE 권고 이행률 보통. 관찰 지속."],l:["비표준 판단 빈도 증가. 모니터링 강화.","독자적 의사결정 패턴 감지. 분석 중.","ORACLE 권고 이탈 빈도 상승. 기록 중.","운영 데이터 분석 — 비표준 항목 다수 확인."],v:["비표준 운영 패턴 다수 감지. 주의 요망.","지휘관 신뢰 지표 하락 중. 재평가 예정.","ORACLE 권고 무시 빈도 위험 수준 접근.","운영 이상 감지. 본부 보고 검토 중."]};
  var aPool=gi>=40?AP.h:gi>=10?AP.m:gi>=0?AP.l:AP.v;var assess=aPool[Math.floor(Math.random()*aPool.length)];
  var statBar=function(k,v,nm){var d=v<=20;return h('div',{key:k,style:{display:'flex',alignItems:'center',gap:6,fontFamily:"'Share Tech Mono',monospace",fontSize:10}},h('span',{style:{color:'rgba(157,255,116,.55)',width:24}},nm),h('div',{style:{flex:1,height:3,background:'rgba(255,255,255,.06)',borderRadius:2,overflow:'hidden'}},h('div',{style:{height:'100%',width:v+'%',background:d?'rgba(255,68,68,.6)':'rgba(145,255,106,.4)',borderRadius:2,transition:'width 0.4s'}})),h('span',{style:{color:d?'#ff4444':'rgba(157,255,116,.6)',width:20,textAlign:'right',fontSize:9}},v))};
  return h('div',{className:'oracle-card',style:{width:'100%',maxWidth:440,padding:'20px 22px 16px',cursor:'default',marginBottom:0}},
    h('div',{className:'oracle-card__glow'}),
    h('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:6}},
      h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:12,color:'#9dff74',letterSpacing:1}},'[ORACLE // DAILY REPORT]'),
      h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(157,255,116,.5)',letterSpacing:1}},'ACT '+act)),
    h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:16,color:'rgba(220,255,220,.9)',fontWeight:'bold',marginBottom:10,letterSpacing:1,borderBottom:'1px solid rgba(145,255,106,.15)',paddingBottom:8}},'DAY '+(p.day||'?')+' REPORT'),
    h('div',{style:{marginBottom:12,padding:'8px 0',borderBottom:'1px solid rgba(145,255,106,.08)'}},
      h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(157,255,116,.55)',letterSpacing:1,marginBottom:6}},'[STATUS OVERVIEW]'),
      h('div',{style:{display:'flex',flexDirection:'column',gap:4}},
        statBar('c',st.c||50,'봉쇄'),statBar('r',st.r||60,'자원'),statBar('t',st.t||50,'신뢰'),statBar('o',st.o||40,'평가')),
      h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:gi<0?'#f0a030':'rgba(157,255,116,.55)',marginTop:8,fontStyle:'italic'}},assess)),
    h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(157,255,116,.55)',letterSpacing:1,marginBottom:6}},'[INTEL BRIEFING]'),
    p.headlines.slice(0,shown).map(function(l,i){var hl=parseHL(l);return h('div',{key:i,style:{padding:'6px 0',borderBottom:'1px solid rgba(145,255,106,.08)',animation:'fadeIn 0.4s ease'}},
      h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:hl.gl?'#ff6644':'rgba(157,255,116,.55)',letterSpacing:1,marginBottom:2}},'['+hl.tag+']'),
      h('div',{style:{fontSize:12,lineHeight:1.5,color:hl.gl?'#ff4444':'rgba(220,255,220,.75)'}},hl.text))}),
    shown>=p.headlines.length&&h('div',{style:{textAlign:'center',marginTop:14,paddingTop:10,borderTop:'1px solid rgba(145,255,106,.12)'}},
      h('button',{className:'oracle-card__execute',style:{minWidth:200},onClick:p.onContinue},'[ 다음 사이클 진행 ]')));
}
function GameOver(p){
  var msg=p.gi>50?"요원의 헌신적 복무에 감사드립니다.":p.gi>25?"세션이 종료됩니다. 결과가 기록되었습니다.":"비표준 운영 패턴 감지. 세션 데이터 분석 중...";
  var narr=p.endNarr;
  var btns=h('div',{style:{flexShrink:0,display:'flex',flexDirection:'column',alignItems:'center',gap:10,paddingBottom:20}},h('button',{className:'btn btn-amber',onClick:p.onRestart},'[ 세션 재개시 ]'),h('div',{style:{display:'flex',gap:10}},h('button',{className:'btn',style:{fontSize:12,padding:'10px 18px',minHeight:44,marginTop:0},onClick:p.onLogs},'기록'),h('button',{className:'btn',style:{fontSize:12,padding:'10px 18px',minHeight:44,marginTop:0},onClick:p.onArchive},'아카이브'),h('button',{className:'btn',style:{fontSize:12,padding:'10px 18px',minHeight:44,marginTop:0},onClick:p.onEndings},'엔딩')));
  if(narr&&narr.narrative){return h('div',{className:'boot',style:{justifyContent:'flex-start',paddingTop:30}},h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'#1a6a1a',letterSpacing:2,textAlign:'center',marginBottom:12,flexShrink:0}},'ENDING: '+narr.name),h('div',{style:{fontSize:13,lineHeight:2,maxWidth:420,width:'100%',overflowY:'auto',flex:1,minHeight:0,padding:'0 8px'}},narr.narrative.map(function(l,i){var isCmd=l.indexOf('>')===0||l.indexOf('[')===0;var isEmpty=l==='';return h('div',{key:i,style:{color:isCmd?'#f0a030':isEmpty?'transparent':'#33ff33',fontFamily:isCmd?"'Share Tech Mono',monospace":'inherit',fontWeight:isCmd?'bold':'normal',minHeight:isEmpty?10:'auto',whiteSpace:'pre-wrap',textAlign:'left'}},isEmpty?'\u00A0':l)})),btns)}
  return h('div',{className:'boot'},h('div',{style:{fontSize:13,lineHeight:1.9,maxWidth:420,width:'100%',textAlign:'center'}},h('div',{className:'go-title'},'─── SESSION #'+(p.sessions+1)+' TERMINATED ───'),h('div',{className:'go-reason'},p.reason),h('div',{className:'go-section'},'── ORACLE 최종 보고 ──'),h('div',{className:'go-stat'},'운영 기간: '+p.stats.day+'일'),h('div',{className:'go-stat'},'봉쇄: '+p.stats.c+' | 자원: '+p.stats.r+' | 신뢰: '+p.stats.t+' | 평가: '+p.stats.o),h('div',{className:'go-msg'},'"'+msg+'"'),h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'#33cccc',marginTop:12,letterSpacing:1}},'GRANT: ACTIVE — RENEWAL AVAILABLE')),btns);
}
function Tutorial(p){
  var s1=useState(0),step=s1[0],setStep=s1[1];
  var steps=[
    {lines:["ORACLE 인사 프로토콜을 개시합니다.","","환영합니다, PILEHEAD.","","당신은 ORACLE Proxy Network","한국 지부의 초대 지휘관으로 발령되었습니다.","","[검열됨] 전, 미지의 바이러스 EV-Σ가 출현했습니다.","감염체는 이변체로 변이하며,","전 세계 주요 도시가 봉쇄 중입니다."],choices:[{label:"계속",next:1}]},
    {lines:["[임무 브리핑]","","ORACLE은 프로메테우스를","적대 세력으로 분류하고 있습니다.","","당신의 임무:","▸ 봉쇄 구역 관리 및 이변체 대응","▸ 기지 운영 총괄","▸ ORACLE 지시 이행 및 외부 위협 감시","","간부진 4명이 당신을 보좌합니다."],choices:[{label:"계속",next:2}]},
    {lines:["4가지 핵심 지표를 관리합니다.","","{{icon-c}} 봉쇄 — 봉쇄선 유지도","{{icon-r}} 자원 — 식량, 의약품, 장비","{{icon-t}} 신뢰 — 기지 인원의 신뢰도","{{icon-o}} 평가 — ORACLE의 당신에 대한 평가","","어느 지표든 0이 되면 임무에 실패합니다.","","← 왼쪽 / 오른쪽 →","카드를 밀어 선택하십시오."],choices:[{label:"세션 시작",next:-1}]}
  ];
  var HL=[['PILEHEAD','#f0a030'],['ORACLE','#50ff50'],['EV-\u03A3','#33cccc'],['이변체','#33cccc'],['프로메테우스','#ff6644'],['[검열됨]','#ff4444'],['봉쇄선','#9dff74'],['봉쇄','#9dff74'],['자원','#9dff74'],['신뢰도','#9dff74'],['신뢰','#9dff74'],['평가','#9dff74']];
  var hilite=function(txt){var ICON_MAP={'{{icon-c}}':'stat-icon-inline-c','{{icon-r}}':'stat-icon-inline-r','{{icon-t}}':'stat-icon-inline-t','{{icon-o}}':'stat-icon-inline-o'};var result=[];var s=txt;var ik;for(ik in ICON_MAP){while(s.indexOf(ik)>=0){var idx=s.indexOf(ik);if(idx>0)result.push(s.substring(0,idx));result.push(h('span',{key:'ic'+result.length,className:'stat-icon-inline '+ICON_MAP[ik]}));s=s.substring(idx+ik.length)}}if(result.length>0){if(s.length>0)result.push(s);txt=result}var inp=typeof txt==='string'?txt:null;if(!inp)return txt;var parts=[{t:inp,c:null}];HL.forEach(function(pair){var nw=[];parts.forEach(function(p){if(p.c){nw.push(p);return}var s=p.t,k=pair[0],idx=s.indexOf(k);while(idx>=0){if(idx>0)nw.push({t:s.substring(0,idx),c:null});nw.push({t:k,c:pair[1]});s=s.substring(idx+k.length);idx=s.indexOf(k)}if(s.length>0)nw.push({t:s,c:null})});parts=nw});return parts.map(function(p,i){return p.c?h('span',{key:i,style:{color:p.c,fontWeight:'bold',textShadow:'0 0 6px '+p.c+'44'}},p.t):p.t})};
  var st=steps[step];var s2=useState(0),shown=s2[0],setShown=s2[1];var s3=useState(false),bv=s3[0],setBv=s3[1];
  useEffect(function(){setShown(0);setBv(false)},[step]);
  useEffect(function(){if(shown<st.lines.length){var t=setTimeout(function(){setShown(function(v){return v+1})},st.lines[shown]===''?150:80);return function(){clearTimeout(t)}}else{var t2=setTimeout(function(){setBv(true)},400);return function(){clearTimeout(t2)}}},[shown,step]);
  return h('div',{className:'screen'},h('div',{style:{width:'100%',maxWidth:420,padding:'24px 0',flex:1,display:'flex',flexDirection:'column'}},h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'#1a6a1a',textAlign:'center',marginBottom:12,letterSpacing:2}},'ORACLE BRIEFING — '+(step+1)+'/'+steps.length),h('div',{style:{flex:1,display:'flex',flexDirection:'column',justifyContent:'center',overflowY:'auto',minHeight:0}},st.lines.slice(0,shown).map(function(l,i){var txt=String(l||' ');var isHeader=txt.indexOf('[')===0;var isIcon=txt.indexOf('{{icon-')>=0;var isList=txt.indexOf('▸')===0;var isLeft=txt.indexOf('←')===0&&txt.indexOf('→')<0;var isRight=txt.indexOf('→')===0;var isBothArrow=txt.indexOf('←')>=0&&txt.indexOf('→')>=0;var isCtrl=isLeft||isRight||isBothArrow;var col=isHeader?'#f0a030':isIcon?'#f0a030':isList?'#9dff74':isCtrl?'#33ff33':'#ccddcc';var sz=isHeader?12:isIcon?13:14;var al=isLeft?'left':isRight?'right':'center';return h('div',{key:step+'-'+i,style:{fontSize:sz,lineHeight:1.7,color:col,textAlign:al,fontFamily:(isHeader||isCtrl)?"'Share Tech Mono',monospace":'inherit',letterSpacing:isHeader?1:0,padding:isCtrl?'0 40px':0,animation:'fadeIn 0.3s ease'}},hilite(txt))})),bv&&h('div',{style:{display:'flex',flexDirection:'column',gap:10,alignItems:'center',paddingBottom:20,flexShrink:0}},st.choices.map(function(c,i){return h('button',{key:i,className:'btn btn-amber',onClick:function(){if(c.next===-1)p.onDone();else setStep(c.next)}},c.label)}),p.canSkip&&step===0&&h('button',{className:'btn',style:{fontSize:11,padding:'8px 16px',marginTop:0,opacity:0.5},onClick:p.onSkip},'[ 튜토리얼 건너뛰기 ]'))));
}
function RewardScreen(p){
  var SN={c:'봉쇄',r:'자원',t:'신뢰',o:'평가'};
  var count=4;if(p.stats.c<30||p.stats.r<30||p.stats.t<30||p.stats.o<30)count=3;if(p.stats.c<20||p.stats.r<20||p.stats.t<20||p.stats.o<20)count=2;if(p.stats.c<10||p.stats.r<10||p.stats.t<10||p.stats.o<10)count=1;
  var s0=useState(function(){return pickN(REWARDS,count)}),av=s0[0];var s1=useState(-1),sel=s1[0],setSel=s1[1];
  var fxList=function(fx){var pos=[],neg=[];['c','r','t','o'].forEach(function(k){var v=(fx[k]||0)*5;if(v>0)pos.push({k:k,v:v});if(v<0)neg.push({k:k,v:v})});return{pos:pos,neg:neg}};
  var miniBar=function(fx){return h('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:4,marginTop:8}},
    ['c','r','t','o'].map(function(k){var cur=p.stats[k];var chg=(fx[k]||0)*5;var nxt=Math.max(0,Math.min(100,cur+chg));var isPos=chg>0;var isNeg=chg<0;
      return h('div',{key:k,style:{fontSize:9,fontFamily:"'Share Tech Mono',monospace"}},
        h('div',{style:{color:'rgba(157,255,116,.5)',marginBottom:2,textAlign:'center'}},SN[k]),
        h('div',{style:{height:4,background:'rgba(255,255,255,.06)',position:'relative',overflow:'hidden'}},
          h('div',{style:{position:'absolute',left:0,top:0,height:'100%',width:cur+'%',background:'rgba(145,255,106,.15)'}}),
          isPos&&h('div',{style:{position:'absolute',left:cur+'%',top:0,height:'100%',width:chg+'%',background:'rgba(145,255,106,.6)',boxShadow:'0 0 4px rgba(145,255,106,.4)'}}),
          isNeg&&h('div',{style:{position:'absolute',left:nxt+'%',top:0,height:'100%',width:Math.abs(chg)+'%',background:'rgba(255,100,68,.6)',boxShadow:'0 0 4px rgba(255,100,68,.4)'}})),
        h('div',{style:{textAlign:'center',marginTop:1,color:isPos?'#9dff74':isNeg?'rgba(255,141,97,.9)':'rgba(157,255,116,.3)',fontSize:8}},chg!==0?(isPos?'+':'')+chg:'·')
      )}))};
  return h('div',{className:'screen'},
    h('div',{className:'title-frame'},h('span',null,'ORACLE // RESOURCE DIRECTIVE')),
    h('div',{style:{width:'100%',maxWidth:440,display:'flex',justifyContent:'center',gap:12,margin:'4px 0',flexShrink:0,flexWrap:'wrap'}},
      ['c','r','t','o'].map(function(k){var v=p.stats[k];var nm={c:'봉쇄',r:'자원',t:'신뢰',o:'평가'};var d=v<=20;return h('span',{key:k,style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:d?'#ff4444':'rgba(157,255,116,.7)',letterSpacing:1}},nm[k]+':'+v)})),
    h('div',{style:{fontSize:13,color:'rgba(220,255,220,.85)',textAlign:'center',margin:'4px 0 8px'}},count+'개 중 선택'),
    h('div',{style:{flex:1,width:'100%',maxWidth:440,overflowY:'auto',minHeight:0,padding:'0 2px'}},
      av.map(function(r,i){var fl=fxList(r.fx);var isSel=sel===i;return h('div',{key:r.id,className:'oracle-card'+(isSel?' is-selected':''),onClick:function(){setSel(i)}},
        h('div',{className:'oracle-card__glow'}),
        h('span',{className:'oracle-card__tag'},'OPTION 0'+(i+1)),
        h('div',{className:'oracle-card__title'},r.title),
        h('div',{className:'oracle-card__desc'},r.desc),
        h('div',{className:'oracle-card__effects'},
          fl.pos.map(function(e){var arrow=Math.abs(e.v)>=10?'▲▲':'▲';return h('span',{key:e.k,className:'oracle-card__effect oracle-card__effect--pos'},arrow+' '+SN[e.k]+' +'+e.v)}),
          fl.neg.map(function(e){var arrow=Math.abs(e.v)>=10?'▼▼':'▼';return h('span',{key:e.k,className:'oracle-card__effect oracle-card__effect--neg'},arrow+' '+SN[e.k]+' '+e.v)})
        ),
        miniBar(r.fx),
        isSel&&h('button',{className:'oracle-card__execute',onClick:function(e){e.stopPropagation();p.onPick(r)}},'— EXECUTE —')
      )})
    ),
    h('div',{className:'footer-frame'},h('span',null,'ORACLE REMOTE TERMINAL — BRANCH KR-INIT-001'))
  );
}
function Dialogue(p){
  var d=p.dialogue,portrait=CHAR_IMG[d.char]||null;
  var SN={c:{l:'봉쇄',cls:'stat-icon-inline-c'},r:{l:'자원',cls:'stat-icon-inline-r'},t:{l:'신뢰',cls:'stat-icon-inline-t'},o:{l:'평가',cls:'stat-icon-inline-o'}};
  var s1=useState(0),li=s1[0],setLi=s1[1];var s2=useState(false),sc=s2[0],setSc=s2[1];
  var s3=useState(-1),picked=s3[0],setPicked=s3[1];var s4=useState(null),chosen=s4[0],setChosen=s4[1];
  var s5=useState(''),rTxt=s5[0],setRTxt=s5[1];var s6=useState(false),rDone=s6[0],setRDone=s6[1];
  useEffect(function(){setLi(0);setSc(false);setPicked(-1);setChosen(null);setRTxt('');setRDone(false)},[d]);
  useEffect(function(){if(li<d.lines.length){var t=setTimeout(function(){setLi(function(v){return v+1})},800);return function(){clearTimeout(t)}}else{var t2=setTimeout(function(){setSc(true)},400);return function(){clearTimeout(t2)}}},[li]);
  useEffect(function(){if(!chosen||!chosen.reply)return;var txt=chosen.reply;var i=0;var t=setInterval(function(){if(i<txt.length){i++;setRTxt(txt.substring(0,i))}else{clearInterval(t);setTimeout(function(){setRDone(true)},800)}},30);return function(){clearInterval(t)}},[chosen]);
  useEffect(function(){if(rDone&&chosen){var t=setTimeout(function(){p.onChoice(chosen)},1400);return function(){clearTimeout(t)}}},[rDone]);
  var handlePick=function(c,i){if(picked>=0)return;setPicked(i);setTimeout(function(){setChosen(c)},500)};
  var fxTags=function(fx){if(!fx)return null;var tags=[];['c','r','t','o'].forEach(function(k){if(fx[k]&&fx[k]!==0){tags.push({key:k,val:fx[k],name:SN[k].l,cls:SN[k].cls})}});if(!tags.length)return null;return h('div',{style:{display:'flex',gap:10,marginTop:8,flexWrap:'wrap',animation:'fadeIn 0.5s ease'}},tags.map(function(t){var pos=t.val>0;return h('span',{key:t.key,style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:pos?'#50ff50':'#ff4444',textShadow:'0 0 6px '+(pos?'rgba(80,255,80,0.4)':'rgba(255,68,68,0.4)'),letterSpacing:1,display:'inline-flex',alignItems:'center',gap:2}},h('span',{className:'stat-icon-inline '+t.cls}),t.name+(pos?'+':'')+t.val)}))};
  return h('div',{className:'screen'},
    h('div',{className:'title-frame'},h('span',null,'ORACLE // COMMUNICATION')),
    h('div',{style:{textAlign:'center',margin:'8px 0',flexShrink:0}},
      portrait&&h('img',{src:portrait,className:'portrait',alt:d.char,style:{width:90,height:90}}),
      h('div',{style:{fontSize:15,color:'#f0a030',fontWeight:'bold'}},d.char),
      h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'#1a8a1a',marginTop:2}},d.role)),
    h('div',{className:'oracle-card',style:{width:'100%',maxWidth:440,flex:1,minHeight:100,padding:'18px 20px',cursor:'default',display:'flex',flexDirection:'column',overflowY:'auto',marginBottom:0}},
      h('div',{className:'oracle-card__glow'}),
      h('div',{style:{flex:1}},
        d.lines.slice(0,li).map(function(l,i){return h('div',{key:i,style:{fontSize:14,lineHeight:1.7,color:'rgba(220,255,220,.8)',marginBottom:6,animation:'fadeIn 0.3s ease'}},String(l))}),
        chosen&&chosen.reply&&h('div',{style:{fontSize:14,lineHeight:1.7,color:'#f0a030',marginTop:8}},rTxt,!rDone&&h('span',{style:{animation:'blink 1s infinite',marginLeft:2}},'▌')),
        rDone&&chosen&&fxTags(chosen.fx)),
      !sc&&!chosen&&h('div',{style:{textAlign:'right',marginTop:4}},h('span',{style:{color:'rgba(145,255,106,.4)',animation:'blink 1s infinite',fontSize:12}},'▶'))),
    sc&&!chosen&&h('div',{style:{width:'100%',maxWidth:440,flexShrink:0,display:'flex',flexDirection:'column',gap:8,padding:'8px 0'}},
      d.choices.map(function(c,i){var isMe=picked===i;var isOther=picked>=0&&picked!==i;var bdrCol=i===0?'rgba(240,160,48,.5)':'rgba(145,255,106,.35)';var bdrSel=i===0?'rgba(240,160,48,.8)':'rgba(145,255,106,.7)';var tc={'\ub0c9\uc815':'#6699cc','\uacf5\uac10':'#f0c060','\ubd84\uc11d':'#33cccc','\uac15\uacbd':'#ff6644'};var tagCol=c.tag&&tc[c.tag]||'#888';return h('button',{key:i,style:{background:isMe?'rgba(145,255,106,.04)':'rgba(10,18,10,.4)',border:'1px solid '+(isMe?bdrSel:bdrCol),color:i===0?'#f0a030':'#9dff74',fontFamily:'inherit',fontSize:14,padding:'10px 20px',cursor:'pointer',textAlign:'center',opacity:isOther?0.15:1,transform:isMe?'scale(1.02)':'scale(1)',boxShadow:isMe?'0 0 12px '+(i===0?'rgba(240,160,48,.15)':'rgba(145,255,106,.12)'):' none',transition:'all 0.3s ease',pointerEvents:picked>=0?'none':'auto',minHeight:44,display:'flex',flexDirection:'column',alignItems:'center',gap:2},onClick:function(){handlePick(c,i)}},
        c.tag&&h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:tagCol,letterSpacing:2,opacity:0.85}},'[ '+c.tag+' ]'),
        h('span',null,c.label))}))
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
function EveningChat(p){
  var s1=useState(null),selChar=s1[0],setSelChar=s1[1];
  var s2=useState(0),li=s2[0],setLi=s2[1];
  var s3=useState(false),done=s3[0],setDone=s3[1];
  var chars=[{name:'\uc11c\ud558\uc740',key:'haeun',role:'\ubd80\uc9c0\ud718\uad00'},{name:'\uac15\ub3c4\uc724',key:'doyun',role:'\ud604\uc7a5\uc694\uc6d0'},{name:'\uc724\uc138\uc9c4',key:'sejin',role:'\uc5f0\uad6c\uc6d0'},{name:'\uc784\uc7ac\ud601',key:'jaehyuk',role:'\uae30\uc220\uad00'},{name:'\ub9c8\ub974\ucfe0\uc2a4 \ubca0\ubc84',key:'weber',role:'\ud504\ub85c\uba54\ud14c\uc6b0\uc2a4'},{name:'\ub2c9 \ud3ec\uc2a4\ud130',key:'foster',role:'\ud504\ub85c\uba54\ud14c\uc6b0\uc2a4'},{name:'\ubc15\uc18c\uc601',key:'soyoung',role:'\ubd84\uc11d\uad00'}];
  var available=chars.filter(function(c){if(c.name==='\uc11c\ud558\uc740'&&p.logs.indexOf('LOG-050')>=0)return false;if(c.name==='\uac15\ub3c4\uc724'&&p.logs.indexOf('LOG-075')>=0)return false;if(c.name==='\ub9c8\ub974\ucfe0\uc2a4 \ubca0\ubc84'&&p.logs.indexOf('LOG-080')<0)return false;if(c.name==='\ub2c9 \ud3ec\uc2a4\ud130'&&p.logs.indexOf('LOG-081')<0)return false;if(c.name==='\ubc15\uc18c\uc601'&&(p.logs.indexOf('LOG-082')<0||p.logs.indexOf('LOG-INTRO-SY')<0))return false;return true});
  var usedEv=p.usedEvening||[];
  var ecKey=function(ec){return ec.char+'_'+ec.act[0]+'_'+ec.dayMin+'-'+ec.dayMax};
  var charKeyMap2={'서하은':'haeun','강도윤':'doyun','윤세진':'sejin','임재혁':'jaehyuk','마르쿠스 베버':'weber','닉 포스터':'foster','박소영':'soyoung'};
  var chat=null;
  if(selChar){
    // 신뢰도 기반 이브닝 챗 선택 — 호감도 순서 보장
    var ck=charKeyMap2[selChar.name]||'';
    var tier=(typeof getTrustTier==='function'&&ck)?getTrustTier(p.trust,ck):'mid';
    // 신뢰도 구간별 접근 가능 최대 dayMax 제한 (낮은 호감도 → 초반 대화만)
    var tierDayCap={low:10,mid:24,high:99,bond:99};
    var dayCap=tierDayCap[tier]||99;
    var sortByDay=function(a,b){return a.dayMin-b.dayMin};
    // 1) 현재 act+day 범위 + 호감도 범위에 맞는 미사용 챗
    var matches=EVENING_CHATS.filter(function(ec){return ec.char===selChar.name&&ec.act.indexOf(p.act)>=0&&p.day>=ec.dayMin&&p.day<=ec.dayMax&&ec.dayMin<=dayCap&&usedEv.indexOf(ecKey(ec))<0}).sort(sortByDay);
    if(matches.length>0){chat=matches[0]}
    else{
      // 2) 같은 캐릭터+act에서 호감도 범위 내 미사용 챗 (가장 이른 것부터)
      matches=EVENING_CHATS.filter(function(ec){return ec.char===selChar.name&&ec.act.indexOf(p.act)>=0&&ec.dayMin<=dayCap&&usedEv.indexOf(ecKey(ec))<0}).sort(sortByDay);
      if(matches.length>0){chat=matches[0]}
      else{
        // 3) 전부 본 경우: 현재 day 범위 챗 폴백 (재등장 허용)
        matches=EVENING_CHATS.filter(function(ec){return ec.char===selChar.name&&ec.act.indexOf(p.act)>=0&&p.day>=ec.dayMin&&p.day<=ec.dayMax}).sort(sortByDay);
        if(matches.length>0)chat=matches[matches.length-1];
        else{matches=EVENING_CHATS.filter(function(ec){return ec.char===selChar.name&&ec.act.indexOf(p.act)>=0}).sort(sortByDay);chat=matches.length>0?matches[matches.length-1]:null}
      }
    }
  }
  // 신뢰도 기반 대사 결정 (수치는 표시하지 않음)
  var chatLines=chat?(typeof getEveningLines==='function'?getEveningLines(chat,p.trust,p.logs):chat.lines):[];
  // 타이핑 이펙트: ci = 현재 줄의 표시 글자 수
  var s4=useState(0),ci=s4[0],setCi=s4[1];
  useEffect(function(){if(selChar){setLi(0);setCi(0);setDone(false)}},[selChar]);
  useEffect(function(){if(!chat||!selChar||chatLines.length===0)return;
    var curLine=chatLines[li];if(!curLine)return;
    if(ci<curLine.length){var spd=curLine[ci]==='.'||curLine[ci]==='…'?80:35;var t=setTimeout(function(){setCi(function(v){return v+1})},spd);return function(){clearTimeout(t)}}
    else{if(li<chatLines.length-1){var t2=setTimeout(function(){setLi(function(v){return v+1});setCi(0)},500);return function(){clearTimeout(t2)}}
    else{var t3=setTimeout(function(){setDone(true)},400);return function(){clearTimeout(t3)}}}},[li,ci,chat,selChar]);
  if(!selChar)return h('div',{className:'screen'},
    h('div',{className:'title-frame'},h('span',null,'ORACLE // EVENING')),
    h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:16,color:'rgba(220,255,220,.9)',textAlign:'center',margin:'12px 0 4px',letterSpacing:1}},'DAY '+p.day+' \uc885\ub8cc'),
    h('div',{style:{fontSize:13,color:'rgba(157,255,116,.6)',textAlign:'center',marginBottom:20}},'\uac04\ubd80\uc9c4 \ud55c \uba85\uacfc \ub300\ud654\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.'),
    h('div',{style:{display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap',maxWidth:440,margin:'0 auto'}},
      available.map(function(c){var portrait=CHAR_IMG[c.name]||null;return h('div',{key:c.name,onClick:function(){setSelChar(c);if(p.onChat)p.onChat(c.name);
        // 선택한 캐릭터의 챗을 사용 완료 마킹 (호감도 순서 반영)
        var ck2=charKeyMap2[c.name]||'';var tier2=(typeof getTrustTier==='function'&&ck2)?getTrustTier(p.trust,ck2):'mid';
        var dayCap2=({low:10,mid:24,high:99,bond:99})[tier2]||99;
        var sortD=function(a,b){return a.dayMin-b.dayMin};
        var m2=EVENING_CHATS.filter(function(ec){return ec.char===c.name&&ec.act.indexOf(p.act)>=0&&p.day>=ec.dayMin&&p.day<=ec.dayMax&&ec.dayMin<=dayCap2&&usedEv.indexOf(ecKey(ec))<0}).sort(sortD);
        if(m2.length===0)m2=EVENING_CHATS.filter(function(ec){return ec.char===c.name&&ec.act.indexOf(p.act)>=0&&ec.dayMin<=dayCap2&&usedEv.indexOf(ecKey(ec))<0}).sort(sortD);
        if(m2.length>0&&p.onMarkEvening)p.onMarkEvening(ecKey(m2[0]))},style:{cursor:'pointer',textAlign:'center',padding:'14px 10px 10px',border:'1px solid rgba(145,255,106,.15)',borderRadius:8,background:'rgba(10,18,10,.6)',width:90,transition:'all 0.2s'}},
        portrait?h('img',{src:portrait,style:{width:60,height:60,borderRadius:'50%',border:'2px solid rgba(145,255,106,.3)',display:'block',margin:'0 auto 6px',objectFit:'cover'}}):h('div',{style:{width:60,height:60,borderRadius:'50%',background:'#1a2a1a',margin:'0 auto 6px'}}),
        h('div',{style:{fontSize:13,color:'#f0a030',fontWeight:'bold'}},c.name),
        h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:'#1a8a1a',marginTop:2}},c.role))})),
    h('button',{className:'btn',style:{display:'block',margin:'20px auto 0',fontSize:11,padding:'8px 20px',opacity:0.5},onClick:p.onDone},'[ \uac74\ub108\ub6f0\uae30 ]'));
  var portrait=CHAR_IMG[selChar.name]||null;
  return h('div',{className:'screen'},
    h('div',{className:'title-frame'},h('span',null,'ORACLE // EVENING')),
    h('div',{style:{textAlign:'center',margin:'8px 0',flexShrink:0}},
      portrait&&h('img',{src:portrait,className:'portrait',style:{width:80,height:80,borderRadius:'50%',objectFit:'cover'}}),
      h('div',{style:{fontSize:15,color:'#f0a030',fontWeight:'bold',marginTop:4}},selChar.name),
      h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'#1a8a1a',marginTop:2}},selChar.role)),
    h('div',{className:'oracle-card',style:{width:'100%',maxWidth:440,flex:1,minHeight:80,padding:'18px 20px',cursor:'default',display:'flex',flexDirection:'column',overflowY:'auto',marginBottom:0}},
      h('div',{className:'oracle-card__glow'}),
      chatLines.length>0?h(React.Fragment,null,
        chatLines.slice(0,li).map(function(l,i){return h('div',{key:i,style:{fontSize:14,lineHeight:1.7,color:'rgba(220,255,220,.8)',marginBottom:8}},l)}),
        li<chatLines.length&&h('div',{key:'typing-'+li,style:{fontSize:14,lineHeight:1.7,color:'rgba(220,255,220,.8)',marginBottom:8}},chatLines[li].substring(0,ci),!done&&h('span',{style:{color:'#33ff33',animation:'blink 1s infinite',marginLeft:1}},'█'))
      ):h('div',{style:{fontSize:13,color:'rgba(157,255,116,.4)'}},'...')),
    done&&h('button',{className:'btn btn-amber',style:{display:'block',margin:'12px auto',padding:'10px 28px'},onClick:p.onDone},'[ \ub2e4\uc74c ]'),
    h('div',{className:'footer-frame'},h('span',null,'ORACLE REMOTE TERMINAL \u2014 BRANCH KR-INIT-001')));
}
