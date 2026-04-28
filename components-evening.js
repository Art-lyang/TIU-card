// TERMINAL SESSION — components-evening.js
// EveningChat (i18n-ready)
var tt=function(path,params,fallback){if(typeof t==='function'){var v=t(path,params);return(v&&v!==path)?v:(fallback||path)}return fallback||path};
function EveningChat(p){
  var s1=useState(null),selChar=s1[0],setSelChar=s1[1];
  var s2=useState(0),li=s2[0],setLi=s2[1];
  var s3=useState(false),done=s3[0],setDone=s3[1];
  var _skipC=useState(false),showSkipConfirm=_skipC[0],setShowSkipConfirm=_skipC[1];
  var chars=[{name:'서하은',key:'haeun',role:'부지휘관'},{name:'강도윤',key:'doyun',role:'현장요원'},{name:'윤세진',key:'sejin',role:'연구원'},{name:'임재혁',key:'jaehyuk',role:'기술관'},{name:'마르쿠스 베버',key:'weber',role:'프로메테우스'},{name:'닉 포스터',key:'foster',role:'프로메테우스'},{name:'박소영',key:'soyoung',role:'분석관'}];
  var available=chars.filter(function(c){if(c.name==='서하은'&&p.logs.indexOf('LOG-050')>=0)return false;if(c.name==='강도윤'&&p.logs.indexOf('LOG-075')>=0)return false;if(c.name==='마르쿠스 베버'&&p.logs.indexOf('LOG-080')<0)return false;if(c.name==='닉 포스터'&&p.logs.indexOf('LOG-081')<0)return false;if(c.name==='박소영'&&(p.logs.indexOf('LOG-082')<0||p.logs.indexOf('LOG-INTRO-SY')<0))return false;return true});
  var usedEv=p.usedEvening||[];
  var ecKey=function(ec){return ec.char+'_'+ec.act[0]+'_'+ec.dayMin+'-'+ec.dayMax};
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
    if(!loc || !resp) return resp;
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
    var matches=EVENING_CHATS.filter(function(ec){
      return ec.char===selChar.name&&ec.act.indexOf(p.act)>=0&&p.day>=ec.dayMin&&p.day<=ec.dayMax&&ec.dayMin<=dayCap&&usedEv.indexOf(ecKey(ec))<0&&skipIntro(ec)&&evalCond(ec)
    }).sort(sortByDay);
    var eventMatches=matches.filter(function(ec){return ec.priority==='event'});
    if(eventMatches.length>0){chat=eventMatches[0]}
    else if(matches.length>0){chat=matches[0]}
    else{
      matches=EVENING_CHATS.filter(function(ec){return ec.char===selChar.name&&ec.act.indexOf(p.act)>=0&&p.day>=ec.dayMin&&ec.dayMin<=dayCap&&usedEv.indexOf(ecKey(ec))<0&&skipIntro(ec)&&evalCond(ec)}).sort(sortByDay);
      if(matches.length>0){chat=matches[0]}
      else{
        matches=EVENING_CHATS.filter(function(ec){return ec.char===selChar.name&&ec.act.indexOf(p.act)>=0&&p.day>=ec.dayMin&&p.day<=ec.dayMax&&skipIntro(ec)}).sort(sortByDay);
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
  var s4=useState(0),ci=s4[0],setCi=s4[1];
  var _ch=useState(false),choiceDone=_ch[0],setChoiceDone=_ch[1];
  var _rl=useState(''),replyLine=_rl[0],setReplyLine=_rl[1];
  useEffect(function(){if(selChar){setLi(0);setCi(0);setDone(false);setChoiceDone(false);setReplyLine('')}},[selChar]);
  useEffect(function(){if(!chat||!selChar||chatLines.length===0)return;
    var curLine=chatLines[li];if(!curLine)return;
    if(ci<curLine.length){var spd=curLine[ci]==='.'||curLine[ci]==='…'?80:35;var t=setTimeout(function(){setCi(function(v){return v+1})},spd);return function(){clearTimeout(t)}}
    else{if(li<chatLines.length-1){var t2=setTimeout(function(){setLi(function(v){return v+1});setCi(0)},500);return function(){clearTimeout(t2)}}
    else{var t3=setTimeout(function(){setDone(true)},400);return function(){clearTimeout(t3)}}}},[li,ci,chat,selChar]);
  var pickChar=function(c){
    setSelChar(c);if(p.onChat)p.onChat(c.name);
    var ck2=charKeyMap2[c.name]||'';var tier2=(typeof getTrustTier==='function'&&ck2)?getTrustTier(p.trust,ck2):'mid';
    var dayCap2=({low:10,mid:24,high:99,bond:99})[tier2]||99;
    var sortD=function(a,b){return a.dayMin-b.dayMin};
    var il2=INTRO_LOG_MAP[c.name];var id2=il2&&p.logs.indexOf(il2)>=0;var si2=function(ec){return!(id2&&ec.dayMin===1&&ec.act.indexOf(1)>=0)};
    var ec2=function(ec){if(!ec.condFn)return true;try{return ec.condFn({logs:p.logs,trust:p.trust,facility:p.facility,day:p.day,act:p.act})}catch(e){return true}};
    var m2=EVENING_CHATS.filter(function(ec){return ec.char===c.name&&ec.act.indexOf(p.act)>=0&&p.day>=ec.dayMin&&p.day<=ec.dayMax&&ec.dayMin<=dayCap2&&usedEv.indexOf(ecKey(ec))<0&&si2(ec)&&ec2(ec)}).sort(sortD);
    if(m2.length===0)m2=EVENING_CHATS.filter(function(ec){return ec.char===c.name&&ec.act.indexOf(p.act)>=0&&p.day>=ec.dayMin&&ec.dayMin<=dayCap2&&usedEv.indexOf(ecKey(ec))<0&&si2(ec)&&ec2(ec)}).sort(sortD);
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
  useEffect(function(){
    var onKey=function(e){
      if(!selChar){
        var n=-1;
        if(/^[0-9]$/.test(e.key))n=parseInt(e.key,10);
        else if(e.code&&/^Numpad[0-9]$/.test(e.code))n=parseInt(e.code.slice(6),10);
        if(n>=1&&n<=available.length){e.preventDefault();pickChar(available[n-1])}
      }else if(done&&!choiceDone&&resp){
        var idx=-1;
        if(e.key==='1'||e.code==='Numpad1'||e.key==='ArrowLeft')idx=0;
        else if(e.key==='2'||e.code==='Numpad2'||e.key==='ArrowRight')idx=1;
        if(idx<0)return;
        var opt=idx===0?resp.a:resp.b;
        if(opt){e.preventDefault();pickResp(opt)}
      }
    };
    window.addEventListener('keydown',onKey);
    return function(){window.removeEventListener('keydown',onKey)};
  },[selChar,done,choiceDone,resp,available]);
  if(!selChar)return h('div',{className:'screen'},
    h('div',{className:'title-frame'},h('span',null,'ORACLE // EVENING')),
    h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:16,color:'rgba(var(--ui-rgb),.9)',textAlign:'center',margin:'12px 0 4px',letterSpacing:1}},'DAY '+p.day+' '+tt('evening.dayEnd',null,'종료')),
    h('div',{style:{fontSize:13,color:'rgba(var(--ui-rgb),.6)',textAlign:'center',marginBottom:20}},tt('evening.selectChar',null,'간부진 한 명과 대화할 수 있습니다.')),
    h('div',{style:{display:'grid',gridTemplateColumns:'repeat(2, minmax(96px, 112px))',gap:'16px 18px',justifyContent:'center',maxWidth:260,margin:'0 auto'}},
      available.map(function(c,idx){var portrait=CHAR_IMG[c.name]||null;return h('div',{key:c.name,onClick:function(){pickChar(c)},style:{cursor:'pointer',textAlign:'center',padding:'14px 10px 10px',border:'1px solid rgba(var(--ui-rgb),.15)',borderRadius:8,background:'rgba(10,18,10,.6)',width:'100%',minHeight:128,transition:'all 0.2s',position:'relative',boxSizing:'border-box'}},
        h('span',{style:{position:'absolute',top:4,left:6,fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(240,160,48,.7)',letterSpacing:1}},'['+(idx+1)+']'),
        portrait?h('img',{src:portrait,style:{width:60,height:60,borderRadius:'50%',border:'2px solid rgba(var(--ui-rgb),.3)',display:'block',margin:'0 auto 6px',objectFit:'cover'}}):h('div',{style:{width:60,height:60,borderRadius:'50%',background:'var(--ui-border)',margin:'0 auto 6px'}}),
        h('div',{style:{fontSize:13,color:'#f0a030',fontWeight:'bold'}},c.name),
        h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:'var(--ui-dim)',marginTop:2}},c.role))})),
    (p.logs&&p.logs.indexOf('LOG-EV-UNLOCK')>=0&&typeof EvidenceTable==='function')&&h(EvidenceTable,{logs:p.logs,unlocked:true,onTrust:p.onTrustMod,onGi:p.onGiMod,onLog:p.onLog}),
    !showSkipConfirm&&h('button',{className:'btn',style:{display:'block',margin:'20px auto 0',fontSize:11,padding:'8px 20px',opacity:0.5},onClick:function(){setShowSkipConfirm(true)}},'[ '+tt('evening.skip',null,'건너뛰기')+' ]'),
    showSkipConfirm&&h('div',{style:{margin:'16px auto 0',maxWidth:320,border:'1px solid rgba(var(--ui-rgb),.25)',background:'rgba(10,18,10,.95)',borderRadius:4,padding:'16px 20px',textAlign:'center'}},
      h('div',{style:{fontSize:13,color:'var(--ui-text)',lineHeight:1.6,marginBottom:14}},tt('evening.skipConfirm',null,'대화를 건너뛰시겠습니까?')),
      h('div',{style:{display:'flex',gap:10,justifyContent:'center'}},
        h('button',{className:'btn',style:{fontSize:11,padding:'8px 20px',opacity:0.7},onClick:function(){setShowSkipConfirm(false)}},tt('common.cancel',null,'취소')),
        h('button',{className:'btn btn-amber',style:{fontSize:11,padding:'8px 20px'},onClick:p.onDone},tt('common.confirm',null,'확인')))));
  var portrait=CHAR_IMG[selChar.name]||null;
  return h('div',{className:'screen'},
    h('div',{className:'title-frame'},h('span',null,'ORACLE // EVENING')),
    h('div',{style:{textAlign:'center',margin:'8px 0',flexShrink:0}},
      portrait&&h('img',{src:portrait,className:'portrait',style:{width:80,height:80,borderRadius:'50%',objectFit:'cover'}}),
      h('div',{style:{fontSize:15,color:'#f0a030',fontWeight:'bold',marginTop:4}},selChar.name),
      h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'var(--ui-dim)',marginTop:2}},selChar.role)),
    h('div',{className:'oracle-card',style:{width:'100%',maxWidth:440,flex:1,minHeight:80,padding:'18px 20px',cursor:'default',display:'flex',flexDirection:'column',overflowY:'hidden',marginBottom:0,userSelect:'none',WebkitUserSelect:'none',touchAction:'none'}},
      h('div',{className:'oracle-card__glow'}),
      chatLines.length>0?h(React.Fragment,null,
        chatLines.slice(0,li).map(function(l,i){return h('div',{key:i,style:{fontSize:14,lineHeight:1.7,color:'rgba(var(--ui-rgb),.9)',marginBottom:8}},l)}),
        li<chatLines.length&&h('div',{key:'typing-'+li,style:{fontSize:14,lineHeight:1.7,color:'rgba(var(--ui-rgb),.9)',marginBottom:8}},chatLines[li].substring(0,ci),!done&&h('span',{style:{color:'var(--ui)',animation:'blink 1s infinite',marginLeft:1}},'█')),
        replyLine&&h('div',{style:{fontSize:13,lineHeight:1.7,color:'#f0a030',marginTop:8,borderLeft:'2px solid #f0a030',paddingLeft:10,fontStyle:'italic'}},replyLine)
      ):h('div',{style:{fontSize:13,color:'rgba(var(--ui-rgb),.4)'}},'...')),
    done&&!choiceDone&&resp&&h('div',{style:{width:'100%',maxWidth:440,flexShrink:0,display:'flex',flexDirection:'column',gap:8,padding:'8px 0',margin:'0 auto'}},
      [resp.a,resp.b].map(function(opt,i){var bdrCol=i===0?'rgba(240,160,48,.5)':'rgba(var(--ui-rgb),.35)';return h('button',{key:i,style:{background:'rgba(10,18,10,.4)',border:'1px solid '+bdrCol,color:i===0?'#f0a030':'var(--ui)',fontFamily:'inherit',fontSize:14,padding:'10px 20px',cursor:'pointer',textAlign:'center',minHeight:44,display:'flex',flexDirection:'column',alignItems:'center',gap:2,transition:'all 0.3s ease'},onClick:function(){
        var cn=selChar.name;if(p.onResponse)p.onResponse(cn,opt.trust||0);
        if(opt.log&&p.onLog)p.onLog(opt.log);
        setReplyLine(opt.reply||'');setChoiceDone(true)}},h('span',null,opt.label))})),
    done&&(!resp||choiceDone)&&h('button',{className:'btn btn-amber',style:{display:'block',margin:'12px auto',padding:'10px 28px'},onClick:p.onDone},'[ '+tt('common.next',null,'다음')+' ]'));
}

function EveningChat2(p){
  var s1=useState(null),selChar=s1[0],setSelChar=s1[1];
  var s2=useState(0),li=s2[0],setLi=s2[1];
  var s3=useState(false),done=s3[0],setDone=s3[1];
  var _skipC=useState(false),showSkipConfirm=_skipC[0],setShowSkipConfirm=_skipC[1];
  var chars=[{name:'서하은',key:'haeun',role:'부지휘관'},{name:'강도윤',key:'doyun',role:'현장요원'},{name:'윤세진',key:'sejin',role:'연구원'},{name:'임재혁',key:'jaehyuk',role:'기술관'},{name:'마르쿠스 베버',key:'weber',role:'프로메테우스'},{name:'닉 포스터',key:'foster',role:'프로메테우스'},{name:'박소영',key:'soyoung',role:'분석관'}];
  var available=chars.filter(function(c){if(c.key==='haeun'&&p.logs.indexOf('LOG-050')>=0)return false;if(c.key==='doyun'&&p.logs.indexOf('LOG-075')>=0)return false;if(c.key==='weber'&&p.logs.indexOf('LOG-080')<0)return false;if(c.key==='foster'&&p.logs.indexOf('LOG-081')<0)return false;if(c.key==='soyoung'&&(p.logs.indexOf('LOG-082')<0||p.logs.indexOf('LOG-INTRO-SY')<0))return false;return true});
  var usedEv=p.usedEvening||[];
  var ecKey=function(ec){return ec.char+'_'+ec.act[0]+'_'+ec.dayMin+'-'+ec.dayMax};
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
    var directKey=getChatI18nKey(ec);
    var direct=tc(bucketName,directKey,null);
    if(direct) return direct;
    var ck=charKeyMap2[ec.char]||'';
    if(!ck || !window.TS_I18N || !window.TS_I18N.content || !window.TS_I18N.content.en) return null;
    var bucket=window.TS_I18N.content.en[bucketName];
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
    return (loc && loc.lines) ? loc.lines : fallbackLines;
  }
  function localizeResp(ec, resp){
    var loc = resolveEveningBucketEntry('eveningResponses', ec);
    if(!loc || !resp) return resp;
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
      try{return ec.condFn({logs:p.logs,trust:p.trust,facility:p.facility,day:p.day,act:p.act})}catch(e){return true}
    };
    var matches=EVENING_CHATS.filter(function(ec){
      return ec.char===selChar.name&&ec.act.indexOf(p.act)>=0&&p.day>=ec.dayMin&&p.day<=ec.dayMax&&ec.dayMin<=dayCap&&usedEv.indexOf(ecKey(ec))<0&&skipIntro(ec)&&evalCond(ec)
    }).sort(sortByDay);
    var eventMatches=matches.filter(function(ec){return ec.priority==='event'});
    if(eventMatches.length>0){chat=eventMatches[0]}
    else if(matches.length>0){chat=matches[0]}
    else{
      matches=EVENING_CHATS.filter(function(ec){return ec.char===selChar.name&&ec.act.indexOf(p.act)>=0&&p.day>=ec.dayMin&&ec.dayMin<=dayCap&&usedEv.indexOf(ecKey(ec))<0&&skipIntro(ec)&&evalCond(ec)}).sort(sortByDay);
      if(matches.length>0){chat=matches[0]}
      else{
        matches=EVENING_CHATS.filter(function(ec){return ec.char===selChar.name&&ec.act.indexOf(p.act)>=0&&p.day>=ec.dayMin&&p.day<=ec.dayMax&&skipIntro(ec)}).sort(sortByDay);
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
  var s4=useState(0),ci=s4[0],setCi=s4[1];
  var _ch=useState(false),choiceDone=_ch[0],setChoiceDone=_ch[1];
  var _rl=useState(''),replyLine=_rl[0],setReplyLine=_rl[1];
  useEffect(function(){if(selChar){setLi(0);setCi(0);setDone(false);setChoiceDone(false);setReplyLine('')}},[selChar]);
  useEffect(function(){if(!chat||!selChar||chatLines.length===0)return;
    var curLine=chatLines[li];if(!curLine)return;
    if(ci<curLine.length){var ch=curLine[ci];var spd=(ch==='.'||ch==='!'||ch==='?')?80:35;var t=setTimeout(function(){setCi(function(v){return v+1})},spd);return function(){clearTimeout(t)}}
    else{if(li<chatLines.length-1){var t2=setTimeout(function(){setLi(function(v){return v+1});setCi(0)},500);return function(){clearTimeout(t2)}}
    else{var t3=setTimeout(function(){setDone(true)},400);return function(){clearTimeout(t3)}}}},[li,ci,chat,selChar,chatLines]);
  var pickChar=function(c){
    setSelChar(c);if(p.onChat)p.onChat(c.name);
    var ck2=charKeyMap2[c.name]||'';var tier2=(typeof getTrustTier==='function'&&ck2)?getTrustTier(p.trust,ck2):'mid';
    var dayCap2=({low:10,mid:24,high:99,bond:99})[tier2]||99;
    var sortD=function(a,b){return a.dayMin-b.dayMin};
    var il2=INTRO_LOG_MAP[c.name];var id2=il2&&p.logs.indexOf(il2)>=0;var si2=function(ec){return!(id2&&ec.dayMin===1&&ec.act.indexOf(1)>=0)};
    var ec2=function(ec){if(!ec.condFn)return true;try{return ec.condFn({logs:p.logs,trust:p.trust,facility:p.facility,day:p.day,act:p.act})}catch(e){return true}};
    var m2=EVENING_CHATS.filter(function(ec){return ec.char===c.name&&ec.act.indexOf(p.act)>=0&&p.day>=ec.dayMin&&p.day<=ec.dayMax&&ec.dayMin<=dayCap2&&usedEv.indexOf(ecKey(ec))<0&&si2(ec)&&ec2(ec)}).sort(sortD);
    if(m2.length===0)m2=EVENING_CHATS.filter(function(ec){return ec.char===c.name&&ec.act.indexOf(p.act)>=0&&p.day>=ec.dayMin&&ec.dayMin<=dayCap2&&usedEv.indexOf(ecKey(ec))<0&&si2(ec)&&ec2(ec)}).sort(sortD);
    var evM=m2.filter(function(ec){return ec.priority==='event'});
    var pick=evM.length>0?evM[0]:(m2.length>0?m2[0]:null);
    if(pick&&p.onMarkEvening)p.onMarkEvening(ecKey(pick))
  };
  var pickResp=function(opt){
    var cn=selChar.name;if(p.onResponse)p.onResponse(cn,opt.trust||0);
    if(opt.log&&p.onLog)p.onLog(opt.log);
    setReplyLine(opt.reply||'');setChoiceDone(true)
  };
  useEffect(function(){
    var onKey=function(e){
      if(!selChar){
        var n=-1;
        if(/^[0-9]$/.test(e.key))n=parseInt(e.key,10);
        else if(e.code&&/^Numpad[0-9]$/.test(e.code))n=parseInt(e.code.slice(6),10);
        if(n>=1&&n<=available.length){e.preventDefault();pickChar(available[n-1])}
      }else if(done&&!choiceDone&&resp){
        var idx=-1;
        if(e.key==='1'||e.code==='Numpad1'||e.key==='ArrowLeft')idx=0;
        else if(e.key==='2'||e.code==='Numpad2'||e.key==='ArrowRight')idx=1;
        if(idx<0)return;
        var opt=idx===0?resp.a:resp.b;
        if(opt){e.preventDefault();pickResp(opt)}
      }
    };
    window.addEventListener('keydown',onKey);
    return function(){window.removeEventListener('keydown',onKey)};
  },[selChar,done,choiceDone,resp,available]);
  if(!selChar)return h('div',{className:'screen'},
    h('div',{className:'title-frame'},h('span',null,'ORACLE // EVENING')),
    h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:16,color:'rgba(var(--ui-rgb),.9)',textAlign:'center',margin:'12px 0 4px',letterSpacing:1}},'DAY '+p.day+' '+tt('evening.dayEnd',null,'END')),
    h('div',{style:{fontSize:13,color:'rgba(var(--ui-rgb),.6)',textAlign:'center',marginBottom:20}},tt('evening.selectChar',null,'You can speak with one senior officer.')),
    h('div',{style:{display:'grid',gridTemplateColumns:'repeat(2, minmax(96px, 112px))',gap:'16px 18px',justifyContent:'center',maxWidth:260,margin:'0 auto'}},
      available.map(function(c,idx){var portrait=CHAR_IMG[c.name]||null;return h('div',{key:c.name,onClick:function(){pickChar(c)},style:{cursor:'pointer',textAlign:'center',padding:'14px 10px 10px',border:'1px solid rgba(var(--ui-rgb),.15)',borderRadius:8,background:'rgba(10,18,10,.6)',width:'100%',minHeight:128,transition:'all 0.2s',position:'relative',boxSizing:'border-box'}},
        h('span',{style:{position:'absolute',top:4,left:6,fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(240,160,48,.7)',letterSpacing:1}},'['+(idx+1)+']'),
        portrait?h('img',{src:portrait,style:{width:60,height:60,borderRadius:'50%',border:'2px solid rgba(var(--ui-rgb),.3)',display:'block',margin:'0 auto 6px',objectFit:'cover'}}):h('div',{style:{width:60,height:60,borderRadius:'50%',background:'var(--ui-border)',margin:'0 auto 6px'}}),
        h('div',{style:{fontSize:13,color:'#f0a030',fontWeight:'bold'}},localizeCharName(c)),
        h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:'var(--ui-dim)',marginTop:2}},localizeCharRole(c)))})),
    (p.logs&&p.logs.indexOf('LOG-EV-UNLOCK')>=0&&typeof EvidenceTable==='function')&&h(EvidenceTable,{logs:p.logs,unlocked:true,onTrust:p.onTrustMod,onGi:p.onGiMod,onLog:p.onLog}),
    !showSkipConfirm&&h('button',{className:'btn',style:{display:'block',margin:'20px auto 0',fontSize:11,padding:'8px 20px',opacity:0.5},onClick:function(){setShowSkipConfirm(true)}},'[ '+tt('evening.skip',null,'SKIP')+' ]'),
    showSkipConfirm&&h('div',{style:{margin:'16px auto 0',maxWidth:320,border:'1px solid rgba(var(--ui-rgb),.25)',background:'rgba(10,18,10,.95)',borderRadius:4,padding:'16px 20px',textAlign:'center'}},
      h('div',{style:{fontSize:13,color:'var(--ui-text)',lineHeight:1.6,marginBottom:14}},tt('evening.skipConfirm',null,'Skip tonight\'s conversation?')),
      h('div',{style:{display:'flex',gap:10,justifyContent:'center'}},
        h('button',{className:'btn',style:{fontSize:11,padding:'8px 20px',opacity:0.7},onClick:function(){setShowSkipConfirm(false)}},tt('common.cancel',null,'Cancel')),
        h('button',{className:'btn btn-amber',style:{fontSize:11,padding:'8px 20px'},onClick:p.onDone},tt('common.confirm',null,'Confirm')))));
  var portrait=CHAR_IMG[selChar.name]||null;
  return h('div',{className:'screen'},
    h('div',{className:'title-frame'},h('span',null,'ORACLE // EVENING')),
    h('div',{style:{textAlign:'center',margin:'8px 0',flexShrink:0}},
      portrait&&h('img',{src:portrait,className:'portrait',style:{width:80,height:80,borderRadius:'50%',objectFit:'cover'}}),
      h('div',{style:{fontSize:15,color:'#f0a030',fontWeight:'bold',marginTop:4}},localizeCharName(selChar)),
      h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'var(--ui-dim)',marginTop:2}},localizeCharRole(selChar))),
    h('div',{className:'oracle-card',style:{width:'100%',maxWidth:440,flex:1,minHeight:80,padding:'18px 20px',cursor:'default',display:'flex',flexDirection:'column',overflowY:'hidden',marginBottom:0,userSelect:'none',WebkitUserSelect:'none',touchAction:'none'}},
      h('div',{className:'oracle-card__glow'}),
      chatLines.length>0?h(React.Fragment,null,
        chatLines.slice(0,li).map(function(l,i){return h('div',{key:i,style:{fontSize:14,lineHeight:1.7,color:'rgba(var(--ui-rgb),.9)',marginBottom:8}},l)}),
        li<chatLines.length&&h('div',{key:'typing-'+li,style:{fontSize:14,lineHeight:1.7,color:'rgba(var(--ui-rgb),.9)',marginBottom:8}},chatLines[li].substring(0,ci),!done&&h('span',{style:{color:'var(--ui)',animation:'blink 1s infinite',marginLeft:1}},'_')),
        replyLine&&h('div',{style:{fontSize:13,lineHeight:1.7,color:'#f0a030',marginTop:8,borderLeft:'2px solid #f0a030',paddingLeft:10,fontStyle:'italic'}},replyLine)
      ):h('div',{style:{fontSize:13,color:'rgba(var(--ui-rgb),.4)'}},'...')),
    done&&!choiceDone&&resp&&h('div',{style:{width:'100%',maxWidth:440,flexShrink:0,display:'flex',flexDirection:'column',gap:8,padding:'8px 0',margin:'0 auto'}},
      [resp.a,resp.b].map(function(opt,i){var bdrCol=i===0?'rgba(240,160,48,.5)':'rgba(var(--ui-rgb),.35)';return h('button',{key:i,style:{background:'rgba(10,18,10,.4)',border:'1px solid '+bdrCol,color:i===0?'#f0a030':'var(--ui)',fontFamily:'inherit',fontSize:14,padding:'10px 20px',cursor:'pointer',textAlign:'center',minHeight:44,display:'flex',flexDirection:'column',alignItems:'center',gap:2,transition:'all 0.3s ease'},onClick:function(){pickResp(opt)}},h('span',null,opt.label))})),
    done&&(!resp||choiceDone)&&h('button',{className:'btn btn-amber',style:{display:'block',margin:'12px auto',padding:'10px 28px'},onClick:p.onDone},'[ '+tt('common.next',null,'NEXT')+' ]'));
}
