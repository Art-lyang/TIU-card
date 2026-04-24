// TERMINAL SESSION ??components.js (Dialogue, LogViewer, EndingScreen, FieldMission)
var tt=function(path,params,fallback){if(typeof t==='function'){var v=t(path,params);return(v&&v!==path)?v:(fallback||path)}return fallback||path};
function Dialogue(p){
  var d=p.dialogue,portrait=CHAR_IMG[d.char]||null;
  var SN={c:{l:'遊됱뇙',cls:'stat-icon-inline-c'},r:{l:'?먯썝',cls:'stat-icon-inline-r'},t:{l:'?좊ː',cls:'stat-icon-inline-t'},o:{l:'?됯?',cls:'stat-icon-inline-o'}};
  var s1=useState(0),li=s1[0],setLi=s1[1];var s2=useState(false),sc=s2[0],setSc=s2[1];
  var s3=useState(-1),picked=s3[0],setPicked=s3[1];var s4=useState(null),chosen=s4[0],setChosen=s4[1];
  var s5=useState(''),rTxt=s5[0],setRTxt=s5[1];var s6=useState(false),rDone=s6[0],setRDone=s6[1];
  useEffect(function(){setLi(0);setSc(false);setPicked(-1);setChosen(null);setRTxt('');setRDone(false)},[d]);
  useEffect(function(){if(li<d.lines.length){var t=setTimeout(function(){setLi(function(v){return v+1})},800);return function(){clearTimeout(t)}}else{var t2=setTimeout(function(){setSc(true)},400);return function(){clearTimeout(t2)}}},[li]);
  useEffect(function(){if(!chosen||!chosen.reply)return;var txt=chosen.reply;var i=0;var t=setInterval(function(){if(i<txt.length){i++;setRTxt(txt.substring(0,i))}else{clearInterval(t);setTimeout(function(){setRDone(true)},800)}},30);return function(){clearInterval(t)}},[chosen]);
  useEffect(function(){if(rDone&&chosen){var t=setTimeout(function(){p.onChoice(chosen)},1400);return function(){clearTimeout(t)}}},[rDone]);
  var handlePick=function(c,i){if(picked>=0)return;setPicked(i);setTimeout(function(){setChosen(c)},500)};
  var fxTags=function(fx){if(!fx)return null;var tags=[];['c','r','t','o'].forEach(function(k){if(fx[k]&&fx[k]!==0){tags.push({key:k,val:fx[k],name:SN[k].l,cls:SN[k].cls})}});if(!tags.length)return null;return h('div',{style:{display:'flex',gap:10,marginTop:8,flexWrap:'wrap',animation:'fadeIn 0.5s ease'}},tags.map(function(t){var pos=t.val>0;return h('span',{key:t.key,style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:pos?'var(--ui)':'#ff4444',textShadow:'0 0 6px '+(pos?'rgba(var(--ui-rgb),0.4)':'rgba(255,68,68,0.4)'),letterSpacing:1,display:'inline-flex',alignItems:'center',gap:2}},h('span',{className:'stat-icon-inline '+t.cls}),t.name+(pos?'+':'')+t.val)}))};
  return h('div',{className:'screen'},
    h('div',{className:'title-frame'},h('span',null,'ORACLE // COMMUNICATION')),
    h('div',{style:{textAlign:'center',margin:'8px 0',flexShrink:0}},
      portrait&&h('img',{src:portrait,className:'portrait',alt:d.char,style:{width:90,height:90}}),
      h('div',{style:{fontSize:15,color:'#f0a030',fontWeight:'bold'}},d.char),
      h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'var(--ui-dim)',marginTop:2}},d.role)),
    h('div',{className:'oracle-card',style:{width:'100%',maxWidth:440,flex:1,minHeight:100,padding:'18px 20px',cursor:'default',display:'flex',flexDirection:'column',overflowY:'auto',marginBottom:0}},
      h('div',{className:'oracle-card__glow'}),
      h('div',{style:{flex:1}},
        d.lines.slice(0,li).map(function(l,i){return h('div',{key:i,style:{fontSize:14,lineHeight:1.7,color:'rgba(var(--ui-rgb),.85)',marginBottom:6,animation:'fadeIn 0.3s ease'}},String(l))}),
        chosen&&chosen.reply&&h('div',{style:{fontSize:14,lineHeight:1.7,color:'#f0a030',marginTop:8}},rTxt,!rDone&&h('span',{style:{animation:'blink 1s infinite',marginLeft:2}},'??)),
        rDone&&chosen&&fxTags(chosen.fx)),
      !sc&&!chosen&&h('div',{style:{textAlign:'right',marginTop:4}},h('span',{style:{color:'rgba(var(--ui-rgb),.4)',animation:'blink 1s infinite',fontSize:12}},'??))),
    sc&&!chosen&&h('div',{style:{width:'100%',maxWidth:440,flexShrink:0,display:'flex',flexDirection:'column',gap:8,padding:'8px 0'}},
      d.choices.map(function(c,i){var isMe=picked===i;var isOther=picked>=0&&picked!==i;var bdrCol=i===0?'rgba(240,160,48,.5)':'rgba(var(--ui-rgb),.35)';var bdrSel=i===0?'rgba(240,160,48,.8)':'rgba(var(--ui-rgb),.7)';var tc={'\ub0c9\uc815':'#6699cc','\uacf5\uac10':'#f0c060','\ubd84\uc11d':'#33cccc','\uac15\uacbd':'#ff6644'};var tagCol=c.tag&&tc[c.tag]||'#888';return h('button',{key:i,style:{background:isMe?'rgba(var(--ui-rgb),.04)':'rgba(10,18,10,.4)',border:'1px solid '+(isMe?bdrSel:bdrCol),color:i===0?'#f0a030':'var(--ui)',fontFamily:'inherit',fontSize:14,padding:'10px 20px',cursor:'pointer',textAlign:'center',opacity:isOther?0.15:1,transform:isMe?'scale(1.02)':'scale(1)',boxShadow:isMe?'0 0 12px '+(i===0?'rgba(240,160,48,.15)':'rgba(var(--ui-rgb),.12)'):' none',transition:'all 0.3s ease',pointerEvents:picked>=0?'none':'auto',minHeight:44,display:'flex',flexDirection:'column',alignItems:'center',gap:2},onClick:function(){handlePick(c,i)}},
        c.tag&&h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:tagCol,letterSpacing:2,opacity:0.85}},'[ '+c.tag+' ]'),
        h('span',null,c.label))}))
  );
}
// v1.1 ??LOG 移댄뀒怨좊━ 異붾줎 (ID/?쒕ぉ 湲곕컲)
function logCategory(log){
  var id=log.id||'',title=log.title||'',ct=log.content||'';
  if(id.indexOf('LOG-INTRO-')===0)return'?명듃濡?;
  if(title.indexOf('SPEC-')>=0||id.indexOf('LOG-SPEC')===0)return'?대?泥?;
  if(id.indexOf('LOG-DG-')===0||id.indexOf('LOG-MD-')===0||id.indexOf('LOG-SUPPLY-')===0||title.indexOf('?媛')>=0||title.indexOf('硫붾━?붿븞')>=0)return'?몃젰쨌湲곗뾽';
  if(id.indexOf('LOG-AUDIT-')===0||id.indexOf('LOG-UPRISING-')===0||id.indexOf('LOG-OBSERVER-')===0)return'媛먯궗쨌遊됱뇙';
  if(id.indexOf('LOG-RECON-')===0||title.indexOf('媛먯떆')>=0||title.indexOf('?뺤같')>=0)return'?낆옄 議곗궗';
  if(title.indexOf('?꾨줈硫뷀뀒?곗뒪')>=0||title.indexOf('COASTAL')>=0||ct.indexOf('?꾨줈硫뷀뀒?곗뒪')>=0&&id!=='LOG-003')return'?꾨줈硫뷀뀒?곗뒪';
  if(title.indexOf('?쒗븯?')>=0||title.indexOf('媛뺣룄??)>=0||title.indexOf('?ㅼ꽭吏?)>=0||title.indexOf('?꾩옱??)>=0||title.indexOf('諛뺤냼??)>=0)return'媛꾨?쨌?몃Ъ';
  if(title.indexOf('ORACLE')>=0||title.indexOf('GRANT')>=0||title.indexOf('?⑤쭚湲?)>=0||title.indexOf('沅뚰븳')>=0||id==='LOG-001'||id==='LOG-002'||id==='LOG-010'||id==='LOG-011'||id==='LOG-012'||id==='LOG-019'||id==='LOG-003')return'ORACLE ?쒖뒪??;
  if(title.indexOf('EV-誇')>=0||title.indexOf('?듭젣??)>=0||title.indexOf('諛붿씠?ъ뒪')>=0)return'EV-誇 ?곌뎄';
  return'湲고?';
}
var LOG_CAT_ORDER=['?꾩껜','ORACLE ?쒖뒪??,'媛꾨?쨌?몃Ъ','?대?泥?,'?꾨줈硫뷀뀒?곗뒪','?몃젰쨌湲곗뾽','?낆옄 議곗궗','EV-誇 ?곌뎄','媛먯궗쨌遊됱뇙','?명듃濡?,'湲고?'];
function LogViewer(p){
  var locale=(window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale())||'ko';
  var isEn=locale==='en';
  var s1=useState(null),sel=s1[0],setSel=s1[1];
  var s2=useState('all'),cat=s2[0],setCat=s2[1];
  var ul=ORACLE_LOGS.filter(function(l){return p.unlockedIds.indexOf(l.id)>=0});
  var lk=ORACLE_LOGS.length-ul.length;
  var catName=function(raw){
    if(!isEn)return raw;
    var map={
      '전체':'All','ORACLE 시스템':'ORACLE Systems','간부/인물':'Personnel','이변체':'Anomalies','프로메테우스':'Prometheus',
      '병력/기업':'Forces & Corporations','현장 조사':'Field Investigation','EV-Σ 연구':'EV-Sigma Research','감사/등색':'Audit & Containment','인트로':'Intro','기타':'Misc'
    };
    return map[raw]||raw;
  };
  var getLogText=function(log){
    var overlay=(isEn&&typeof tc==='function')?tc('oracleLogs',log.id,null):null;
    return { title:(overlay&&overlay.title)||log.title, content:(overlay&&overlay.content)||log.content };
  };
  var normalizedCategory=function(log){ return catName(logCategory(log)); };
  var catCounts={}; ul.forEach(function(l){var c=normalizedCategory(l);catCounts[c]=(catCounts[c]||0)+1});
  var allLabel=isEn?'All':'전체';
  var visCats=[allLabel].concat(Object.keys(catCounts).sort());
  var filtered=cat===allLabel?ul:ul.filter(function(l){return normalizedCategory(l)===cat});
  if(sel){
    var log=ORACLE_LOGS.filter(function(l){return l.id===sel})[0];
    var text=getLogText(log);
    return h('div',{className:'screen'},h('div',{style:{width:'100%',maxWidth:420,padding:'20px 0',flex:1,overflowY:'auto'}},
      h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'var(--ui-dim)',letterSpacing:2,textAlign:'center',marginBottom:10}},'ORACLE DATABASE - RECORD VIEW'),
      h('div',{style:{display:'flex',alignItems:'center',justifyContent:'center',gap:8,marginBottom:14,flexWrap:'wrap'}},
        h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'var(--ui-dim)',background:'var(--ui-bg)',border:'1px solid var(--ui-border)',borderRadius:3,padding:'2px 8px'}},normalizedCategory(log)),
        h('span',{style:{fontSize:14,color:'#f0a030',fontWeight:'bold'}},text.title)
      ),
      h('div',{style:{background:'var(--ui-bg)',border:'1px solid var(--ui-border)',borderRadius:4,padding:16,fontFamily:"'Share Tech Mono',monospace",fontSize:12,lineHeight:2,color:'var(--ui)',whiteSpace:'pre-wrap'}},text.content),
      h('div',{style:{display:'flex',gap:10,justifyContent:'center',marginTop:20}},
        h('button',{className:'btn',style:{fontSize:12,padding:'8px 20px',marginTop:0},onClick:function(){setSel(null)}},isEn?'← List':'← 목록'),
        h('button',{className:'btn btn-amber',style:{fontSize:12,padding:'8px 20px',marginTop:0},onClick:p.onClose},isEn?'Close':'닫기')
      )
    ));
  }
  return h('div',{className:'screen'},
    IMG.bg_corridor&&h('div',{className:'bg-overlay',style:{backgroundImage:'url('+IMG.bg_corridor+')',opacity:0.07}}),
    h('div',{style:{width:'100%',maxWidth:420,padding:'20px 0',flex:1,overflowY:'auto'}},
      h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'var(--ui-dim)',letterSpacing:2,textAlign:'center',marginBottom:6}},'ORACLE DATABASE'),
      h('div',{style:{fontSize:12,color:'#888',textAlign:'center',marginBottom:12}},isEn?(ul.length+'/'+ORACLE_LOGS.length+' records unlocked'):(ul.length+'/'+ORACLE_LOGS.length+' 기록 해금')),
      h('div',{style:{display:'flex',gap:4,flexWrap:'wrap',marginBottom:14,justifyContent:'center'}},visCats.map(function(c){
        var isSel=c===cat; var cnt=c===allLabel?ul.length:(catCounts[c]||0);
        return h('button',{key:c,onClick:function(){setCat(c)},style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,padding:'4px 9px',background:isSel?'rgba(var(--ui-rgb),.12)':'transparent',border:'1px solid '+(isSel?'rgba(var(--ui-rgb),.55)':'rgba(var(--ui-rgb),.18)'),borderRadius:3,color:isSel?'var(--ui)':'rgba(var(--ui-rgb),.55)',cursor:'pointer',letterSpacing:.5}},c+' '+cnt);
      })),
      filtered.length===0&&h('div',{style:{fontSize:12,color:'#555',textAlign:'center',padding:'20px 0',fontStyle:'italic'}},isEn?'No unlocked records in this category':'해당 카테고리에 해금된 기록 없음'),
      filtered.map(function(l){var text=getLogText(l); var lcat=normalizedCategory(l); return h('div',{key:l.id,onClick:function(){setSel(l.id)},style:{background:'var(--ui-bg)',border:'1px solid var(--ui-border)',borderRadius:4,padding:'12px 16px',marginBottom:8,cursor:'pointer'}},
        h('div',{style:{display:'flex',alignItems:'center',gap:6,marginBottom:3}},
          h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:'rgba(var(--ui-rgb),.6)',background:'rgba(var(--ui-rgb),.06)',border:'1px solid rgba(var(--ui-rgb),.2)',borderRadius:2,padding:'1px 5px',letterSpacing:.5}},lcat),
          h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:'var(--ui-dim)',marginLeft:'auto'}},l.id)),
        h('div',{style:{fontSize:13,color:'var(--ui)'}},text.title))
      }),
      lk>0&&h('div',{style:{fontSize:12,color:'#333',textAlign:'center',marginTop:12,fontStyle:'italic'}},isEn?(lk+' records remain locked'):(lk+'건의 기록이 잠겨 있습니다')),
      h('button',{className:'btn btn-amber',style:{display:'block',margin:'20px auto 0',fontSize:12,padding:'8px 20px'},onClick:p.onClose},isEn?'Close':'닫기')
    )
  );
}
function EndingScreen(p){
  var all=[{id:'A',name:'?꾨꼍???꾧뎄',hint:'ORACLE??理쒓퀬 ?좎엫???살쑝??},{id:'B',name:'媛곸꽦',hint:'吏꾩떎???⑦렪??紐⑷꺽?섎씪'},{id:'C_c',name:'遊됱뇙 遺뺢눼',hint:'遊됱뇙?좎씠 臾대꼫吏??},{id:'C_cs',name:'遊됱뇙 ?깃났',hint:'?꾨꼍??遊됱뇙瑜??ъ꽦?섎떎'},{id:'C_cst',name:'?먯땐??,hint:'???껉퀬 ?몄뼇媛?怨좎튂??},{id:'C_r',name:'?먯썝 怨좉컝',hint:'湲곗?媛 湲곕뒫???껊떎'},{id:'C_t',name:'?좊ː ?곸떎',hint:'?숇즺?ㅼ씠 ?좊굹??},{id:'C_o',name:'?묒냽 李⑤떒',hint:'ORACLE???뱀떊??踰꾨━??},{id:'D',name:'議곗슜???먯쑀',hint:'諛섎? ?띿쓽 ?대갑'},{id:'G',name:'愿留앹옄',hint:'?대뒓 履쎈룄 ?좏깮?섏? ?딅떎'},{id:'F',name:'[?곗씠???먯긽]',hint:'???'}];
  return h('div',{className:'screen'},h('div',{style:{width:'100%',maxWidth:420,padding:'20px 0',flex:1,overflowY:'auto'}},h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'var(--ui-dim)',letterSpacing:2,textAlign:'center',marginBottom:6}},'SESSION ARCHIVE'),h('div',{style:{fontSize:12,color:'#888',textAlign:'center',marginBottom:20}},'珥??몄뀡: '+p.sessions+' | ?붾뵫: '+p.endings.length+'/'+all.length),all.map(function(e){var f=p.endings.indexOf(e.id)>=0;return h('div',{key:e.id,style:{background:f?'var(--ui-bg)':'#080808',border:'1px solid '+(f?'var(--ui-border)':'#111'),borderRadius:4,padding:'12px 16px',marginBottom:8}},h('div',{style:{fontSize:14,color:f?'var(--ui)':'#333',fontWeight:'bold'}},f?e.name:'[誘몃컻寃?'),h('div',{style:{fontSize:11,color:f?'var(--ui-dim)':'#222',marginTop:4,fontStyle:'italic'}},f?'?ъ꽦 ?꾨즺':e.hint))}),h('button',{className:'btn btn-amber',style:{display:'block',margin:'20px auto 0',fontSize:12,padding:'8px 20px'},onClick:p.onClose},'?リ린')));
}
function FieldMission(p){
  var mission=MISSIONS[p.missionId];var tr=p.trust||{};var s1=useState('start'),nodeId=s1[0],setNodeId=s1[1];var s2=useState(''),textShown=s2[0],setTextShown=s2[1];var s3=useState(false),showChoices=s3[0],setShowChoices=s3[1];
  function getMissionI18nKey(missionId,nodeId){
    return missionId+'_'+nodeId;
  }
  function localizeMissionNode(mission,node,nodeId){
    var key=getMissionI18nKey(mission.id||p.missionId,nodeId);
    var loc=(typeof tc==='function')?tc('missions',key,null):null;
    if(!loc) return node;
    var out=Object.assign({},node);
    if(loc.text) out.text=loc.text;
    if(loc.choices&&Array.isArray(node.choices)){
      out.choices=node.choices.map(function(choice,idx){
        return Object.assign({},choice,loc.choices[idx]||{});
      });
    }
    return out;
  }
  var node=localizeMissionNode(mission,mission.nodes[nodeId],nodeId);var mImg=p.missionId==='M-001'?IMG.spec_012_bloodpit:p.missionId==='M-002'?IMG.spec_011_shelltalker:p.missionId==='M-004'?IMG.spec_001_mannequin:p.missionId==='M-005'?IMG.spec_003_brood:p.missionId==='M-006'?IMG.spec_008_spore:p.missionId==='M-009'?IMG.spec_004_seedspreader:p.missionId==='M-010'?IMG.spec_015_brainseeker:null;
  useEffect(function(){setTextShown('');setShowChoices(false);var i=0;var txt=node.text;var t=setInterval(function(){if(i<txt.length){i++;setTextShown(txt.substring(0,i))}else{clearInterval(t);setTimeout(function(){setShowChoices(true)},400)}},25);return function(){clearInterval(t)}},[nodeId]);
  var handleChoice=function(choice){if(choice.next==='end'){p.onComplete({result:choice.result||{},g:choice.g||0,log:choice.log||null})}else{setNodeId(choice.next)}};
  var visChoices=node.choices.filter(function(c){if(!c.trustReq)return true;for(var k in c.trustReq){if((tr[k]||0)<c.trustReq[k])return false}return true});
  useEffect(function(){
    var onKey=function(e){
      if(!showChoices)return;
      var idx=-1;
      if(/^[1-9]$/.test(e.key))idx=parseInt(e.key,10)-1;
      else if(e.code&&/^Numpad[1-9]$/.test(e.code))idx=parseInt(e.code.slice(6),10)-1;
      if(idx>=0&&idx<visChoices.length){e.preventDefault();handleChoice(visChoices[idx])}
    };
    window.addEventListener('keydown',onKey);
    return function(){window.removeEventListener('keydown',onKey)};
  },[showChoices,visChoices]);
  return h('div',{className:'screen',style:{overflow:'hidden'}},
    IMG.bg_restricted&&h('div',{className:'bg-overlay',style:{backgroundImage:'url('+IMG.bg_restricted+')',opacity:0.08}}),
    h('div',{style:{width:'100%',maxWidth:420,padding:'6px 0',flexShrink:0}},
      h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'#f0a030',letterSpacing:2,textAlign:'center'}},'FIELD MISSION'),
      h('div',{style:{fontSize:13,color:'#ccddcc',textAlign:'center',marginTop:2}},mission.title),
      mImg&&nodeId==='start'&&h('img',{src:mImg,className:'mission-img',alt:mission.title})
    ),
    h('div',{style:{flex:1,width:'100%',maxWidth:420,overflowY:'auto',minHeight:0,padding:'4px 0',WebkitOverflowScrolling:'touch'}},
      h('div',{style:{fontSize:13,lineHeight:1.7,color:'var(--ui)',whiteSpace:'pre-wrap',borderLeft:'2px solid var(--ui-dim)',paddingLeft:12}},textShown,!showChoices&&h('span',{style:{animation:'blink 1s infinite'}},'??))
    ),
    showChoices&&h('div',{style:{width:'100%',maxWidth:420,flexShrink:0,display:'flex',flexDirection:'column',gap:6,padding:'6px 0'}},
      visChoices.map(function(c,i){var isTrust=!!c.trustReq;return h('button',{key:i,onClick:function(){handleChoice(c)},style:{background:isTrust?'rgba(240,160,48,.06)':'var(--ui-bg)',border:'1px solid '+(isTrust?'rgba(240,160,48,.4)':'var(--ui-border)'),borderRadius:4,padding:'10px 14px',cursor:'pointer',textAlign:'left',color:c.next==='end'?'#f0a030':isTrust?'#f0c060':'var(--ui)',fontSize:12,lineHeight:1.5,fontFamily:'inherit'}},h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.3)',marginRight:8,minWidth:14,display:'inline-block'}},(i+1)+''),isTrust&&h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:'#f0a030',letterSpacing:1,marginRight:6}},'['+tt('mission.trustLabel','?좊ː','?좊ː')+']'),h('span',{style:{marginRight:6,opacity:0.5}},'??),c.label)})
    ),
    h('div',{className:'footer',style:{flexShrink:0}},'ORACLE REMOTE TERMINAL ??FIELD OPS')
  );
}
