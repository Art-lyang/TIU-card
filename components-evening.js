// TERMINAL SESSION — components-evening.js
// EveningChat (i18n-ready)
var tt=function(path,params,fallback){if(typeof t==='function'){var v=t(path,params);return(v&&v!==path)?v:(fallback||path)}return fallback||path};
function localizeFactionRelation(r){
  if(!r||!window.TS_I18N||window.TS_I18N.getLocale()!=='en')return r;
  var v=r.value||0;
  var statusMap={
    oracle:v>=75?'Surveillance aligned':v>=55?'Command link stable':v>=35?'Suspicion rising':'Defection risk',
    prometheus:v>=70?'Cooperation possible':v>=50?'Contact maintained':v>=35?'Mutual distrust':'Hostile memory',
    dg:v>=75?'Influence saturated':v>=55?'Deal advantage':v>=40?'Contact / probe':'Cautious',
    meridian:v>=70?'Debt-bound cooperation':v>=50?'Intel exchange':v>=35?'Reserved line':'Blocked channel'
  };
  var hintMap={
    oracle:v>=75?'Control-friendly':'Independent judgment margin',
    prometheus:'Truth / escape route',
    dg:'Supply / dependency risk',
    meridian:'Intel / intervention pressure'
  };
  return Object.assign({},r,{status:statusMap[r.id]||r.status,hint:hintMap[r.id]||r.hint});
}
function FactionRelationPanel(p){
  if(typeof getFactionRelations!=='function')return null;
  var rows=getFactionRelations(p.logs||[],p.gi||0).map(localizeFactionRelation);
  if(!rows||rows.length===0)return null;
  return h('div',{className:'evening-relations'},
    h('div',{className:'evening-relations-head'},
      h('span',null,tt('evening.factions',null,'FACTION RELATIONS')),
      h('span',null,tt('evening.liveMatrix',null,'LIVE MATRIX'))),
    h('div',{className:'evening-relations-grid'},
    rows.map(function(r){return h('div',{key:r.id,className:'evening-relation-card',style:{borderColor:r.tone}},
      h('div',{className:'evening-relation-top'},
        h('span',{className:'evening-relation-name',style:{color:r.tone}},r.name),
        h('span',{className:'evening-relation-value'},String(r.value).padStart(2,'0'))),
      h('div',{className:'evening-relation-bar',title:r.hint},
        h('div',{style:{width:r.value+'%',height:'100%',background:r.tone,boxShadow:'0 0 8px '+r.tone}})),
      h('div',{className:'evening-relation-status'},r.status)
    )})
    )
  );
}
function englishEveningResponseFallback(resp){
  if(!resp||!window.TS_I18N||window.TS_I18N.getLocale()!=='en')return resp;
  var out={a:null,b:null};
  if(resp.a)out.a=Object.assign({},resp.a,{label:'Ask them to share the details.',reply:'Understood. I will brief you directly, Commander.'});
  if(resp.b)out.b=Object.assign({},resp.b,{label:'Proceed carefully for now.',reply:'Understood. I will keep it contained until it is safe.'});
  return out;
}
function EveningChat(p){
  var s1=useState(null),selChar=s1[0],setSelChar=s1[1];
  var s2=useState(0),li=s2[0],setLi=s2[1];
  var s3=useState(false),done=s3[0],setDone=s3[1];
  var _doneToday=useState({}),doneToday=_doneToday[0],setDoneToday=_doneToday[1];
  var _skipC=useState(false),showSkipConfirm=_skipC[0],setShowSkipConfirm=_skipC[1];
  var chars=[{name:'서하은',key:'haeun',role:'부지휘관'},{name:'강도윤',key:'doyun',role:'현장요원'},{name:'윤세진',key:'sejin',role:'연구원'},{name:'임재혁',key:'jaehyuk',role:'기술관'},{name:'마르쿠스 베버',key:'weber',role:'프로메테우스'},{name:'닉 포스터',key:'foster',role:'프로메테우스'},{name:'박소영',key:'soyoung',role:'분석관'}];
  var available=chars.filter(function(c){if(c.name==='서하은'&&p.logs.indexOf('LOG-050')>=0)return false;if(c.name==='강도윤'&&p.logs.indexOf('LOG-075')>=0)return false;if(c.name==='마르쿠스 베버'&&(p.logs.indexOf('LOG-080')<0||p.act<4||p.day<29))return false;if(c.name==='닉 포스터'&&(p.day<27||p.act<3||(p.logs.indexOf('LOG-081')<0&&p.logs.indexOf('LOG-080')<0)))return false;if(c.name==='박소영'&&(p.logs.indexOf('LOG-082')<0||p.logs.indexOf('LOG-INTRO-SY')<0||p.act<4||p.day<29))return false;return true});
  var usedEv=p.usedEvening||[];
  var ecBaseKey=function(ec){return ec.char+'_'+ec.act[0]+'_'+ec.dayMin+'-'+ec.dayMax};
  var _ecKeyCounts={};EVENING_CHATS.forEach(function(ec){var k=ecBaseKey(ec);_ecKeyCounts[k]=(_ecKeyCounts[k]||0)+1});
  var ecKey=function(ec){var base=ecBaseKey(ec);return ec.responseKey||base+'_'+String((ec.lines&&ec.lines[0])||'').slice(0,28)};
  var ecUsed=function(ec){if(ec&&ec.responseKey==='jaehyuk_2_5-99'&&p.logs&&p.logs.indexOf('LOG-EV-UNLOCK')<0)return false;var base=ecBaseKey(ec);return usedEv.indexOf(ecKey(ec))>=0||((_ecKeyCounts[base]||0)<=1&&usedEv.indexOf(base)>=0)};
  var charKeyMap2={'서하은':'haeun','강도윤':'doyun','윤세진':'sejin','임재혁':'jaehyuk','마르쿠스 베버':'weber','닉 포스터':'foster','박소영':'soyoung'};
  var INTRO_LOG_MAP={'서하은':'LOG-INTRO-SH','강도윤':'LOG-INTRO-KD','윤세진':'LOG-INTRO-YS','임재혁':'LOG-INTRO-IJ'};
  function getChatI18nKey(ec){
    if(!ec) return '';
    if(ec.responseKey) return ec.responseKey;
    var ck = charKeyMap2[ec.char] || '';
    return ck ? (ck + '_' + ec.act[0] + '_' + ec.dayMin + '-' + ec.dayMax) : '';
  }
  function localizeChatLines(ec, fallbackLines){
    var key = getChatI18nKey(ec);
    var loc = (typeof tc==='function')?tc('eveningChats',key,null):null;
    return (loc && loc.lines) ? loc.lines : fallbackLines;
  }
  function localizeResp(ec, resp){
    var key = getChatI18nKey(ec);
    var loc = (typeof tc==='function')?tc('eveningResponses',key,null):null;
    if(!loc || !resp) return englishEveningResponseFallback(resp);
    var out = { a:null, b:null };
    if(resp.a) out.a = Object.assign({}, resp.a, loc.a || {});
    if(resp.b) out.b = Object.assign({}, resp.b, loc.b || {});
    return out;
  }
  var chat=null;
  if(selChar){
    var ck=charKeyMap2[selChar.name]||'';
    var tier=(typeof getTrustTier==='function'&&ck)?getTrustTier(p.trust,ck):'mid';
    var tierDayCap={low:10,mid:24,high:99,bond:99};
    var dayCap=tierDayCap[tier]||99;
    var sortByDay=function(a,b){return a.dayMin-b.dayMin};
    var introLog=INTRO_LOG_MAP[selChar.name];
    var introDone=introLog&&p.logs.indexOf(introLog)>=0;
    var skipIntro=function(ec){return !(introDone&&ec.dayMin===1&&ec.act.indexOf(1)>=0)};
    var evalCond=function(ec){
      if(!ec.condFn)return true;
      try{return ec.condFn({logs:p.logs,trust:p.trust,facility:p.facility,day:p.day,act:p.act})}catch(e){return true}
    };
    var deckCond=function(ec){
      try{return (typeof sessionDeckEveningOk!=='function')||sessionDeckEveningOk(ec,{logs:p.logs,trust:p.trust,facility:p.facility,day:p.day,act:p.act})}catch(e){return true}
    };
    var matches=EVENING_CHATS.filter(function(ec){
      return ec.char===selChar.name&&ec.act.indexOf(p.act)>=0&&p.day>=ec.dayMin&&p.day<=ec.dayMax&&ec.dayMin<=dayCap&&!ecUsed(ec)&&skipIntro(ec)&&evalCond(ec)&&deckCond(ec)
    }).sort(sortByDay);
    var eventMatches=matches.filter(function(ec){return ec.priority==='event'});
    if(eventMatches.length>0){chat=eventMatches[0]}
    else if(matches.length>0){chat=matches[0]}
    else{
      matches=EVENING_CHATS.filter(function(ec){return ec.char===selChar.name&&ec.act.indexOf(p.act)>=0&&p.day>=ec.dayMin&&ec.dayMin<=dayCap&&!ecUsed(ec)&&skipIntro(ec)&&evalCond(ec)&&deckCond(ec)}).sort(sortByDay);
      if(matches.length>0){chat=matches[0]}
      else{
        matches=EVENING_CHATS.filter(function(ec){return ec.char===selChar.name&&ec.act.indexOf(p.act)>=0&&p.day>=ec.dayMin&&p.day<=ec.dayMax&&skipIntro(ec)&&evalCond(ec)&&deckCond(ec)}).sort(sortByDay);
        if(matches.length>0)chat=matches[matches.length-1];
        else{
          matches=EVENING_CHATS.filter(function(ec){return ec.char===selChar.name&&ec.act.indexOf(p.act)>=0&&p.day>=ec.dayMin&&skipIntro(ec)&&evalCond(ec)&&deckCond(ec)}).sort(sortByDay);
          chat=matches.length>0?matches[matches.length-1]:null
        }
      }
    }
  }
  var chatLines=chat?localizeChatLines(chat,chat.lines||[]):[];
  var resp=(chat)?localizeResp(chat,(typeof getEveningResponse==='function')?getEveningResponse(chat,p.trust):null):null;
  var noChat=selChar&&(!chat||chatLines.length===0);
  var noChatText=tt('evening.noAvailableChat',null,'오늘은 추가 대화 기록이 없습니다.');
  var s4=useState(0),ci=s4[0],setCi=s4[1];
  var _ch=useState(false),choiceDone=_ch[0],setChoiceDone=_ch[1];
  var _rl=useState(''),replyLine=_rl[0],setReplyLine=_rl[1];
  useEffect(function(){if(selChar){setLi(0);setCi(0);setDone(false);setChoiceDone(false);setReplyLine('')}},[selChar]);
  useEffect(function(){if(!chat||!selChar||chatLines.length===0)return;
    var curLine=chatLines[li];if(!curLine)return;
    if(ci<curLine.length){var spd=curLine[ci]==='.'||curLine[ci]==='…'?80:35;var t=setTimeout(function(){setCi(function(v){return v+1})},spd);return function(){clearTimeout(t)}}
    else{if(li<chatLines.length-1){var t2=setTimeout(function(){setLi(function(v){return v+1});setCi(0)},500);return function(){clearTimeout(t2)}}
    else{var t3=setTimeout(function(){setDone(true)},400);return function(){clearTimeout(t3)}}}},[li,ci,chat,selChar]);
  var isEveningContactDisabled=function(c){
    if(!c)return true;
    var completed=!!doneToday[c.name];
    var locked=Object.keys(doneToday).length>0&&!completed;
    return completed||locked;
  };
  var pickChar=function(c){
    if(isEveningContactDisabled(c))return;
    setSelChar(c);if(p.onChat)p.onChat(c.name);
    var ck2=charKeyMap2[c.name]||'';var tier2=(typeof getTrustTier==='function'&&ck2)?getTrustTier(p.trust,ck2):'mid';
    var dayCap2=({low:10,mid:24,high:99,bond:99})[tier2]||99;
    var sortD=function(a,b){return a.dayMin-b.dayMin};
    var il2=INTRO_LOG_MAP[c.name];var id2=il2&&p.logs.indexOf(il2)>=0;var si2=function(ec){return!(id2&&ec.dayMin===1&&ec.act.indexOf(1)>=0)};
    var ec2=function(ec){if(!ec.condFn)return true;try{return ec.condFn({logs:p.logs,trust:p.trust,facility:p.facility,day:p.day,act:p.act})}catch(e){return true}};
    var dc2=function(ec){try{return (typeof sessionDeckEveningOk!=='function')||sessionDeckEveningOk(ec,{logs:p.logs,trust:p.trust,facility:p.facility,day:p.day,act:p.act})}catch(e){return true}};
    var m2=EVENING_CHATS.filter(function(ec){return ec.char===c.name&&ec.act.indexOf(p.act)>=0&&p.day>=ec.dayMin&&p.day<=ec.dayMax&&ec.dayMin<=dayCap2&&!ecUsed(ec)&&si2(ec)&&ec2(ec)&&dc2(ec)}).sort(sortD);
    if(m2.length===0)m2=EVENING_CHATS.filter(function(ec){return ec.char===c.name&&ec.act.indexOf(p.act)>=0&&p.day>=ec.dayMin&&ec.dayMin<=dayCap2&&!ecUsed(ec)&&si2(ec)&&ec2(ec)&&dc2(ec)}).sort(sortD);
    // 이벤트성 이브닝 우선 마크
    var evM=m2.filter(function(ec){return ec.priority==='event'});
    var pick=evM.length>0?evM[0]:(m2.length>0?m2[0]:null);
    if(pick&&p.onMarkEvening)p.onMarkEvening(ecKey(pick))
  };
  var pickResp=function(opt){
    var cn=selChar.name;if(p.onResponse)p.onResponse(cn,opt.trust||0);
    if(opt.log&&p.onLog)p.onLog(opt.log);
    setReplyLine(opt.reply||'');setChoiceDone(true)
  };
  var returnToEvening=function(){
    if(selChar)setDoneToday(function(prev){var next=Object.assign({},prev);next[selChar.name]=true;return next});
    setSelChar(null);setShowSkipConfirm(false);
  };
  useEffect(function(){
    var onKey=function(e){
      if(!selChar){
        if(showSkipConfirm){
          if(e.key==='Enter'||e.key===' '||e.key==='2'||e.code==='Numpad2'){e.preventDefault();p.onDone();return}
          if(e.key==='Escape'||e.key==='Backspace'||e.key==='1'||e.code==='Numpad1'){e.preventDefault();setShowSkipConfirm(false);return}
        }
        var n=-1;
        if(/^[0-9]$/.test(e.key))n=parseInt(e.key,10);
        else if(e.code&&/^Numpad[0-9]$/.test(e.code))n=parseInt(e.code.slice(6),10);
        if(n>=1&&n<=available.length&&!isEveningContactDisabled(available[n-1])){e.preventDefault();pickChar(available[n-1])}
        else if(Object.keys(doneToday).length>0&&(e.key==='Enter'||e.key===' ')){e.preventDefault();setShowSkipConfirm(true)}
      }else if(done&&!choiceDone&&resp){
        var idx=-1;
        if(e.key==='1'||e.code==='Numpad1'||e.key==='ArrowLeft')idx=0;
        else if(e.key==='2'||e.code==='Numpad2'||e.key==='ArrowRight')idx=1;
        if(idx<0)return;
        var opt=idx===0?resp.a:resp.b;
        if(opt){e.preventDefault();pickResp(opt)}
      }else if((noChat||done)&&(!resp||choiceDone)){
        if(e.key==='Enter'||e.key===' '){e.preventDefault();returnToEvening()}
        else if(e.key==='Escape'||e.key==='Backspace'){e.preventDefault();returnToEvening()}
      }
    };
    window.addEventListener('keydown',onKey);
    return function(){window.removeEventListener('keydown',onKey)};
  },[selChar,done,choiceDone,resp,available,doneToday,showSkipConfirm,noChat]);
  if(!selChar)return h('div',{className:'screen'},
    h('div',{className:'title-frame'},h('span',null,'ORACLE // EVENING')),
    h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:16,color:'rgba(var(--ui-rgb),.9)',textAlign:'center',margin:'12px 0 4px',letterSpacing:1}},'DAY '+p.day+' '+tt('evening.dayEnd',null,'종료')),
    h('div',{style:{fontSize:13,color:'rgba(var(--ui-rgb),.6)',textAlign:'center',marginBottom:20}},tt('evening.selectChar',null,'간부진 한 명과 대화할 수 있습니다.')),
    h('div',{style:{display:'grid',gridTemplateColumns:'repeat(2, minmax(96px, 112px))',gap:'16px 18px',justifyContent:'center',maxWidth:260,margin:'0 auto'}},
      available.map(function(c,idx){var portrait=CHAR_IMG[c.name]||null;return h('div',{key:c.name,onClick:function(){pickChar(c)},style:{cursor:'pointer',textAlign:'center',padding:'14px 10px 10px',border:'1px solid rgba(var(--ui-rgb),.15)',borderRadius:8,background:'rgba(var(--ui-rgb),.045)',width:'100%',minHeight:128,transition:'all 0.2s',position:'relative',boxSizing:'border-box'}},
        h('span',{style:{position:'absolute',top:4,left:6,fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(240,160,48,.7)',letterSpacing:1}},'['+(idx+1)+']'),
        portrait?h('img',{src:portrait,style:{width:60,height:60,borderRadius:'50%',border:'2px solid rgba(var(--ui-rgb),.3)',display:'block',margin:'0 auto 6px',objectFit:'cover'}}):h('div',{style:{width:60,height:60,borderRadius:'50%',background:'var(--ui-border)',margin:'0 auto 6px'}}),
        h('div',{style:{fontSize:13,color:'var(--ui)',fontWeight:'bold'}},c.name),
        h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:'var(--ui-dim)',marginTop:2}},c.role))})),
    (p.logs&&p.logs.indexOf('LOG-EV-UNLOCK')>=0&&typeof EvidenceTable==='function')&&h(EvidenceTable,{logs:p.logs,unlocked:true,onTrust:p.onTrustMod,onGi:p.onGiMod,onLog:p.onLog}),
    !showSkipConfirm&&h('button',{className:'btn',style:{display:'block',margin:'20px auto 0',fontSize:11,padding:'8px 20px',opacity:0.5},onClick:function(){setShowSkipConfirm(true)}},'[ '+tt('evening.skip',null,'건너뛰기')+' ]'),
    showSkipConfirm&&h('div',{style:{margin:'16px auto 0',maxWidth:320,border:'1px solid rgba(var(--ui-rgb),.25)',background:'rgba(3,7,8,.95)',borderRadius:4,padding:'16px 20px',textAlign:'center'}},
      h('div',{style:{fontSize:13,color:'var(--ui-text)',lineHeight:1.6,marginBottom:14}},tt('evening.skipConfirm',null,'대화를 건너뛰시겠습니까?')),
      h('div',{style:{display:'flex',gap:10,justifyContent:'center'}},
        h('button',{className:'btn',style:{fontSize:11,padding:'8px 20px',opacity:0.7},onClick:function(){setShowSkipConfirm(false)}},tt('common.cancel',null,'취소')),
        h('button',{className:'btn btn-amber',style:{fontSize:11,padding:'8px 20px'},onClick:p.onDone},tt('common.confirm',null,'확인')))));
  var portrait=CHAR_IMG[selChar.name]||null;
  return h('div',{className:'screen'},
    h('div',{className:'title-frame'},h('span',null,'ORACLE // EVENING')),
    h('div',{style:{textAlign:'center',margin:'8px 0',flexShrink:0}},
      portrait&&h('img',{src:portrait,className:'portrait',style:{width:80,height:80,borderRadius:'50%',objectFit:'cover'}}),
      h('div',{style:{fontSize:15,color:'var(--ui)',fontWeight:'bold',marginTop:4}},selChar.name),
      h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'var(--ui-dim)',marginTop:2}},selChar.role)),
    h('div',{className:'oracle-card',style:{width:'100%',maxWidth:440,flex:1,minHeight:80,padding:'18px 20px',cursor:'default',display:'flex',flexDirection:'column',overflowY:'hidden',marginBottom:0,userSelect:'none',WebkitUserSelect:'none',touchAction:'none'}},
      h('div',{className:'oracle-card__glow'}),
      chatLines.length>0?h(React.Fragment,null,
        chatLines.slice(0,li).map(function(l,i){return h('div',{key:i,style:{fontSize:14,lineHeight:1.7,color:'rgba(var(--ui-rgb),.9)',marginBottom:8}},l)}),
        li<chatLines.length&&h('div',{key:'typing-'+li,style:{fontSize:14,lineHeight:1.7,color:'rgba(var(--ui-rgb),.9)',marginBottom:8}},chatLines[li].substring(0,ci),!done&&h('span',{style:{color:'var(--ui)',animation:'blink 1s infinite',marginLeft:1}},'█')),
        replyLine&&h('div',{style:{fontSize:13,lineHeight:1.7,color:'var(--ui)',marginTop:8,borderLeft:'2px solid rgba(var(--ui-rgb),.55)',paddingLeft:10,fontStyle:'italic'}},replyLine)
      ):h('div',{style:{fontSize:13,color:'rgba(var(--ui-rgb),.55)',lineHeight:1.7}},noChatText)),
    done&&!choiceDone&&resp&&h('div',{style:{width:'100%',maxWidth:440,flexShrink:0,display:'flex',flexDirection:'column',gap:8,padding:'8px 0',margin:'0 auto'}},
      [resp.a,resp.b].map(function(opt,i){var bdrCol=i===0?'rgba(var(--ui-rgb),.55)':'rgba(var(--ui-rgb),.35)';return h('button',{key:i,style:{background:'rgba(var(--ui-rgb),.045)',border:'1px solid '+bdrCol,color:'var(--ui)',fontFamily:'inherit',fontSize:14,padding:'10px 20px',cursor:'pointer',textAlign:'center',minHeight:44,display:'flex',flexDirection:'column',alignItems:'center',gap:2,transition:'all 0.3s ease'},onClick:function(){
        var cn=selChar.name;if(p.onResponse)p.onResponse(cn,opt.trust||0);
        if(opt.log&&p.onLog)p.onLog(opt.log);
        setReplyLine(opt.reply||'');setChoiceDone(true)}},h('span',null,opt.label))})),
    (noChat||done)&&(!resp||choiceDone)&&h('button',{className:'btn btn-amber',style:{display:'block',margin:'12px auto',padding:'10px 28px'},onClick:p.onDone},'[ '+tt('evening.proceedNextDay',null,tt('common.next',null,'다음'))+' ]'));
}

function EveningChat2(p){
  var s1=useState(null),selChar=s1[0],setSelChar=s1[1];
  var s2=useState(0),li=s2[0],setLi=s2[1];
  var s3=useState(false),done=s3[0],setDone=s3[1];
  var _doneToday=useState({}),doneToday=_doneToday[0],setDoneToday=_doneToday[1];
  var _skipC=useState(false),showSkipConfirm=_skipC[0],setShowSkipConfirm=_skipC[1];
  var chars=[{name:'서하은',key:'haeun',role:'부지휘관'},{name:'강도윤',key:'doyun',role:'현장요원'},{name:'윤세진',key:'sejin',role:'연구원'},{name:'임재혁',key:'jaehyuk',role:'기술관'},{name:'마르쿠스 베버',key:'weber',role:'프로메테우스'},{name:'닉 포스터',key:'foster',role:'프로메테우스'},{name:'박소영',key:'soyoung',role:'분석관'}];
  var available=chars.filter(function(c){if(c.key==='haeun'&&p.logs.indexOf('LOG-050')>=0)return false;if(c.key==='doyun'&&p.logs.indexOf('LOG-075')>=0)return false;if(c.key==='weber'&&(p.logs.indexOf('LOG-080')<0||p.act<4||p.day<29))return false;if(c.key==='foster'&&(p.day<27||p.act<3||(p.logs.indexOf('LOG-081')<0&&p.logs.indexOf('LOG-080')<0)))return false;if(c.key==='soyoung'&&(p.logs.indexOf('LOG-082')<0||p.logs.indexOf('LOG-INTRO-SY')<0||p.act<4||p.day<29))return false;return true});
  var usedEv=p.usedEvening||[];
  var ecBaseKey=function(ec){return ec.char+'_'+ec.act[0]+'_'+ec.dayMin+'-'+ec.dayMax};
  var _ecKeyCounts={};EVENING_CHATS.forEach(function(ec){var k=ecBaseKey(ec);_ecKeyCounts[k]=(_ecKeyCounts[k]||0)+1});
  var ecKey=function(ec){var base=ecBaseKey(ec);return ec.responseKey||base+'_'+String((ec.lines&&ec.lines[0])||'').slice(0,28)};
  var ecUsed=function(ec){if(ec&&ec.responseKey==='jaehyuk_2_5-99'&&p.logs&&p.logs.indexOf('LOG-EV-UNLOCK')<0)return false;var base=ecBaseKey(ec);return usedEv.indexOf(ecKey(ec))>=0||((_ecKeyCounts[base]||0)<=1&&usedEv.indexOf(base)>=0)};
  var charKeyMap2={'서하은':'haeun','강도윤':'doyun','윤세진':'sejin','임재혁':'jaehyuk','마르쿠스 베버':'weber','닉 포스터':'foster','박소영':'soyoung'};
  var INTRO_LOG_MAP={'서하은':'LOG-INTRO-SH','강도윤':'LOG-INTRO-KD','윤세진':'LOG-INTRO-YS','임재혁':'LOG-INTRO-IJ'};
  function getChatI18nKey(ec){
    if(!ec) return '';
    if(ec.responseKey) return ec.responseKey;
    var ck = charKeyMap2[ec.char] || '';
    return ck ? (ck + '_' + ec.act[0] + '_' + ec.dayMin + '-' + ec.dayMax) : '';
  }
  function resolveEveningBucketEntry(bucketName, ec){
    if(typeof tc!=='function' || !ec) return null;
    var locale=(window.TS_I18N&&window.TS_I18N.getLocale)?window.TS_I18N.getLocale():'ko';
    if(locale!=='en') return null;
    var directKey=getChatI18nKey(ec);
    var direct=tc(bucketName,directKey,null);
    if(direct) return direct;
    var ck=charKeyMap2[ec.char]||'';
    var contentStore=(window.TS_I18N&&window.TS_I18N._content)||{};
    if(!ck || !contentStore.en) return null;
    var bucket=contentStore.en[bucketName];
    if(!bucket) return null;
    var prefix=ck+'_'+ec.act[0];
    var day=p.day||0;
    var keys=Object.keys(bucket).filter(function(k){return k.indexOf(prefix)===0});
    var bestKey=null,bestScore=Infinity;
    keys.forEach(function(k){
      var tail=k.slice(prefix.length);
      var m=tail.match(/(\d+)-(\d+)$/) || tail.match(/(\d+)$/);
      if(!m) return;
      var start=parseInt(m[1],10);
      var end=parseInt(m[2]||m[1],10);
      if(day<start || day>end) return;
      var span=(end-start);
      var dist=Math.abs(start-(ec.dayMin||start))+Math.abs(end-(ec.dayMax||end));
      var score=span*100+dist;
      if(score<bestScore){bestScore=score;bestKey=k;}
    });
    return bestKey?bucket[bestKey]:null;
  }
  function localizeChatLines(ec, fallbackLines){
    var loc = resolveEveningBucketEntry('eveningChats', ec);
    return resolveChatLines((loc && loc.lines) ? loc.lines : fallbackLines);
  }
  function eveningContext(){
    return {logs:p.logs||[],trust:p.trust,facility:p.facility,day:p.day,act:p.act,sessions:p.sessions||0};
  }
  function resolveChatLines(lines){
    if(typeof lines==='function'){
      try{return lines(eveningContext())||[]}catch(e){return []}
    }
    return Array.isArray(lines)?lines:[];
  }
  function localizeResp(ec, resp){
    var loc = resolveEveningBucketEntry('eveningResponses', ec);
    if(!loc || !resp) return englishEveningResponseFallback(resp);
    var out = { a:null, b:null };
    if(resp.a) out.a = Object.assign({}, resp.a, loc.a || {});
    if(resp.b) out.b = Object.assign({}, resp.b, loc.b || {});
    return out;
  }
  function localizeCharName(charObj){
    if(!charObj)return '';
    var loc=(typeof tc==='function')?tc('charNames',charObj.key,null):null;
    return (loc&&loc.value)||charObj.name;
  }
  function localizeCharRole(charObj){
    if(!charObj)return '';
    var loc=(typeof tc==='function')?tc('charRoles',charObj.key,null):null;
    return (loc&&loc.value)||charObj.role;
  }
  var chat=null;
  if(selChar){
    var ck=charKeyMap2[selChar.name]||'';
    var tier=(typeof getTrustTier==='function'&&ck)?getTrustTier(p.trust,ck):'mid';
    var tierDayCap={low:10,mid:24,high:99,bond:99};
    var dayCap=tierDayCap[tier]||99;
    var sortByDay=function(a,b){return a.dayMin-b.dayMin};
    var introLog=INTRO_LOG_MAP[selChar.name];
    var introDone=introLog&&p.logs.indexOf(introLog)>=0;
    var skipIntro=function(ec){return !(introDone&&ec.dayMin===1&&ec.act.indexOf(1)>=0)};
    var evalCond=function(ec){
      if(!ec.condFn)return true;
      try{return ec.condFn(eveningContext())}catch(e){return true}
    };
    var matches=EVENING_CHATS.filter(function(ec){
      return ec.char===selChar.name&&ec.act.indexOf(p.act)>=0&&p.day>=ec.dayMin&&p.day<=ec.dayMax&&ec.dayMin<=dayCap&&!ecUsed(ec)&&skipIntro(ec)&&evalCond(ec)
    }).sort(sortByDay);
    var eventMatches=matches.filter(function(ec){return ec.priority==='event'});
    if(eventMatches.length>0){chat=eventMatches[0]}
    else if(matches.length>0){chat=matches[0]}
    else{
      matches=EVENING_CHATS.filter(function(ec){return ec.char===selChar.name&&ec.act.indexOf(p.act)>=0&&p.day>=ec.dayMin&&ec.dayMin<=dayCap&&!ecUsed(ec)&&skipIntro(ec)&&evalCond(ec)}).sort(sortByDay);
      if(matches.length>0){chat=matches[0]}
      else{
        matches=EVENING_CHATS.filter(function(ec){return ec.char===selChar.name&&ec.act.indexOf(p.act)>=0&&p.day>=ec.dayMin&&p.day<=ec.dayMax&&skipIntro(ec)&&evalCond(ec)}).sort(sortByDay);
        if(matches.length>0)chat=matches[matches.length-1];
        else{
          matches=EVENING_CHATS.filter(function(ec){return ec.char===selChar.name&&ec.act.indexOf(p.act)>=0&&p.day>=ec.dayMin&&skipIntro(ec)&&evalCond(ec)}).sort(sortByDay);
          chat=matches.length>0?matches[matches.length-1]:null
        }
      }
    }
  }
  var chatLines=chat?localizeChatLines(chat,chat.lines||[]):[];
  var resp=(chat)?localizeResp(chat,(typeof getEveningResponse==='function')?getEveningResponse(chat,p.trust):null):null;
  var noChat=selChar&&(!chat||chatLines.length===0);
  var noChatText=tt('evening.noAvailableChat',null,'오늘은 추가 대화 기록이 없습니다.');
  var evidenceUnlocked=!!(p.logs&&p.logs.indexOf('LOG-EV-UNLOCK')>=0);
  var s4=useState(0),ci=s4[0],setCi=s4[1];
  var _ch=useState(false),choiceDone=_ch[0],setChoiceDone=_ch[1];
  var _rl=useState(''),replyLine=_rl[0],setReplyLine=_rl[1];
  var textRef=useRef(null);
  useEffect(function(){if(selChar){setLi(0);setCi(0);setDone(false);setChoiceDone(false);setReplyLine('')}},[selChar]);
  useEffect(function(){if(!chat||!selChar||chatLines.length===0)return;
    var curLine=chatLines[li];if(!curLine)return;
    if(ci<curLine.length){var ch=curLine[ci];var spd=(ch==='.'||ch==='!'||ch==='?')?80:35;var t=setTimeout(function(){setCi(function(v){return v+1})},spd);return function(){clearTimeout(t)}}
    else{if(li<chatLines.length-1){var t2=setTimeout(function(){setLi(function(v){return v+1});setCi(0)},500);return function(){clearTimeout(t2)}}
    else{var t3=setTimeout(function(){setDone(true)},400);return function(){clearTimeout(t3)}}}},[li,ci,chat,selChar,chatLines]);
  useEffect(function(){var el=textRef.current;if(el)el.scrollTop=el.scrollHeight},[li,ci,replyLine,done,choiceDone,selChar]);
  var isEveningContactDisabled=function(c){
    if(!c)return true;
    var completed=!!doneToday[c.name];
    var locked=Object.keys(doneToday).length>0&&!completed;
    return completed||locked;
  };
  var pickChar=function(c){
    if(isEveningContactDisabled(c))return;
    setSelChar(c);if(p.onChat)p.onChat(c.name);
    var ck2=charKeyMap2[c.name]||'';var tier2=(typeof getTrustTier==='function'&&ck2)?getTrustTier(p.trust,ck2):'mid';
    var dayCap2=({low:10,mid:24,high:99,bond:99})[tier2]||99;
    var sortD=function(a,b){return a.dayMin-b.dayMin};
    var il2=INTRO_LOG_MAP[c.name];var id2=il2&&p.logs.indexOf(il2)>=0;var si2=function(ec){return!(id2&&ec.dayMin===1&&ec.act.indexOf(1)>=0)};
    var ec2=function(ec){if(!ec.condFn)return true;try{return ec.condFn(eveningContext())}catch(e){return true}};
    var m2=EVENING_CHATS.filter(function(ec){return ec.char===c.name&&ec.act.indexOf(p.act)>=0&&p.day>=ec.dayMin&&p.day<=ec.dayMax&&ec.dayMin<=dayCap2&&!ecUsed(ec)&&si2(ec)&&ec2(ec)}).sort(sortD);
    if(m2.length===0)m2=EVENING_CHATS.filter(function(ec){return ec.char===c.name&&ec.act.indexOf(p.act)>=0&&p.day>=ec.dayMin&&ec.dayMin<=dayCap2&&!ecUsed(ec)&&si2(ec)&&ec2(ec)}).sort(sortD);
    var evM=m2.filter(function(ec){return ec.priority==='event'});
    var pick=evM.length>0?evM[0]:(m2.length>0?m2[0]:null);
    if(pick&&p.onMarkEvening)p.onMarkEvening(ecKey(pick))
  };
  var pickResp=function(opt){
    var cn=selChar.name;if(p.onResponse)p.onResponse(cn,opt.trust||0);
    if(opt.log&&p.onLog)p.onLog(opt.log);
    setReplyLine(opt.reply||'');setChoiceDone(true)
  };
  var returnToEvening=function(){
    if(selChar)setDoneToday(function(prev){var next=Object.assign({},prev);next[selChar.name]=true;return next});
    setSelChar(null);setShowSkipConfirm(false);
  };
  useEffect(function(){
    var onKey=function(e){
      if(!selChar){
        if(showSkipConfirm){
          if(e.key==='Enter'||e.key===' '||e.key==='2'||e.code==='Numpad2'){e.preventDefault();p.onDone();return}
          if(e.key==='Escape'||e.key==='Backspace'||e.key==='1'||e.code==='Numpad1'){e.preventDefault();setShowSkipConfirm(false);return}
        }
        var n=-1;
        if(/^[0-9]$/.test(e.key))n=parseInt(e.key,10);
        else if(e.code&&/^Numpad[0-9]$/.test(e.code))n=parseInt(e.code.slice(6),10);
        if(n>=1&&n<=available.length&&!isEveningContactDisabled(available[n-1])){e.preventDefault();pickChar(available[n-1])}
        else if(Object.keys(doneToday).length>0&&(e.key==='Enter'||e.key===' ')){e.preventDefault();setShowSkipConfirm(true)}
      }else if(done&&!choiceDone&&resp){
        var idx=-1;
        if(e.key==='1'||e.code==='Numpad1'||e.key==='ArrowLeft')idx=0;
        else if(e.key==='2'||e.code==='Numpad2'||e.key==='ArrowRight')idx=1;
        if(idx<0)return;
        var opt=idx===0?resp.a:resp.b;
        if(opt){e.preventDefault();pickResp(opt)}
      }else if((noChat||done)&&(!resp||choiceDone)){
        if(e.key==='Enter'||e.key===' '){e.preventDefault();returnToEvening()}
        else if(e.key==='Escape'||e.key==='Backspace'){e.preventDefault();returnToEvening()}
      }
    };
    window.addEventListener('keydown',onKey);
    return function(){window.removeEventListener('keydown',onKey)};
  },[selChar,done,choiceDone,resp,available,doneToday,showSkipConfirm,noChat]);
  if(!selChar)return h('div',{className:'screen'},
    h('div',{className:'title-frame'},h('span',null,'ORACLE // EVENING')),
    h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:16,color:'rgba(var(--ui-rgb),.9)',textAlign:'center',margin:'12px 0 4px',letterSpacing:1}},'DAY '+p.day+' '+tt('evening.dayEnd',null,'END')),
    h('div',{style:{fontSize:13,color:'rgba(var(--ui-rgb),.6)',textAlign:'center',marginBottom:20}},tt('evening.selectChar',null,'You can speak with one senior officer.')),
    h(FactionRelationPanel,{logs:p.logs,gi:p.gi}),
    h('div',{className:'evening-select-grid'},
      available.map(function(c,idx){var portrait=CHAR_IMG[c.name]||null;var completed=!!doneToday[c.name];var locked=Object.keys(doneToday).length>0&&!completed;var disabled=isEveningContactDisabled(c);return h('div',{key:c.name,onClick:disabled?undefined:function(){pickChar(c)},className:'evening-contact-card'+(completed?' is-complete':'')+(locked?' is-locked':''),'aria-disabled':disabled?'true':undefined},
        h('span',{className:'evening-contact-index'},'0'+(idx+1)),
        portrait?h('img',{src:portrait,className:'evening-contact-portrait'}):h('div',{className:'evening-contact-portrait evening-contact-portrait-empty'}),
        h('div',{className:'evening-contact-name'},localizeCharName(c)),
        h('div',{className:'evening-contact-role'},completed?tt('evening.completedRole',null,tt('eveningExtra.completedRole',null,'오늘 대화 완료했습니다')):(locked?tt('evening.lockedRole',null,tt('eveningExtra.lockedRole',null,'오늘은 대화 불가')):localizeCharRole(c))))})),
    (evidenceUnlocked&&typeof EvidenceTable==='function')&&h(EvidenceTable,{logs:p.logs,unlocked:true,onTrust:p.onTrustMod,onGi:p.onGiMod,onLog:p.onLog}),
    Object.keys(doneToday).length>0&&h('div',{className:'evening-complete-note'},evidenceUnlocked?tt('evening.completeNote',null,tt('eveningExtra.completeNote',null,'오늘 대화를 완료했습니다. 조사테이블을 확인한 뒤 다음 DAY로 진행할 수 있습니다.')):tt('evening.completeNoteNoEvidence',null,tt('eveningExtra.completeNoteNoEvidence',null,'오늘 대화를 완료했습니다. 다음 DAY로 진행할 수 있습니다.'))),
    !showSkipConfirm&&h('button',{className:'btn',style:{display:'block',margin:'20px auto 0',fontSize:11,padding:'8px 20px',opacity:Object.keys(doneToday).length>0?0.85:0.5},onClick:function(){setShowSkipConfirm(true)}},'[ '+(Object.keys(doneToday).length>0?tt('evening.proceedNextDay',null,tt('eveningExtra.proceedNextDay',null,'다음 DAY 진행')):tt('evening.skip',null,'SKIP'))+' ]'),
    showSkipConfirm&&h('div',{style:{margin:'16px auto 0',maxWidth:320,border:'1px solid rgba(var(--ui-rgb),.25)',background:'rgba(3,7,8,.95)',borderRadius:4,padding:'16px 20px',textAlign:'center'}},
      h('div',{style:{fontSize:13,color:'var(--ui-text)',lineHeight:1.6,marginBottom:14}},tt('evening.skipConfirm',null,'Skip tonight\'s conversation?')),
      h('div',{style:{display:'flex',gap:10,justifyContent:'center'}},
        h('button',{className:'btn',style:{fontSize:11,padding:'8px 20px',opacity:0.7},onClick:function(){setShowSkipConfirm(false)}},tt('common.cancel',null,'Cancel')),
        h('button',{className:'btn btn-amber',style:{fontSize:11,padding:'8px 20px'},onClick:p.onDone},tt('common.confirm',null,'Confirm')))));
  var portrait=CHAR_IMG[selChar.name]||null;
  return h('div',{className:'screen'},
    h('div',{className:'title-frame'},h('span',null,'ORACLE // EVENING')),
    h(CharacterCommPanel,{nameKey:selChar.name,charKey:selChar.key,displayName:localizeCharName(selChar),role:localizeCharRole(selChar),portrait:portrait}),
    h('div',{className:'oracle-card dialogue-card'},
      h('div',{className:'oracle-card__glow'}),
      h('div',{className:'dialogue-scroll',ref:textRef},
      chatLines.length>0?h(React.Fragment,null,
        chatLines.slice(0,li).map(function(l,i){return h('div',{key:i,className:'dialogue-line'},l)}),
        li<chatLines.length&&h('div',{key:'typing-'+li,className:'dialogue-line'},chatLines[li].substring(0,ci),!done&&h('span',{style:{color:'var(--ui)',animation:'blink 1s infinite',marginLeft:1}},'_')),
        replyLine&&h('div',{className:'dialogue-reply dialogue-reply--evening'},replyLine)
      ):h('div',{style:{fontSize:13,color:'rgba(var(--ui-rgb),.55)',lineHeight:1.7}},noChatText))),
    done&&!choiceDone&&resp&&h('div',{className:'dialogue-choices'},
      [resp.a,resp.b].map(function(opt,i){var bdrCol=i===0?'rgba(var(--ui-rgb),.55)':'rgba(var(--ui-rgb),.35)';return h('button',{key:i,className:'dialogue-choice-btn',style:{border:'1px solid '+bdrCol},onClick:function(){pickResp(opt)}},h('span',null,opt.label))})),
    (noChat||done)&&(!resp||choiceDone)&&h('div',{className:'dialogue-choices'},h('button',{className:'btn btn-amber',style:{display:'block',margin:'4px auto 0',padding:'10px 28px'},onClick:returnToEvening},'[ '+tt('evening.returnToEvening',null,tt('eveningExtra.returnToEvening',null,'이브닝 화면으로 돌아가기'))+' ]')));
}
