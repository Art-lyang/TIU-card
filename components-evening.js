// TERMINAL SESSION — components-evening.js
// EveningChat
function EveningChat(p){
  var s1=useState(null),selChar=s1[0],setSelChar=s1[1];
  var s2=useState(0),li=s2[0],setLi=s2[1];
  var s3=useState(false),done=s3[0],setDone=s3[1];
  var chars=[{name:'\uc11c\ud558\uc740',key:'haeun',role:'\ubd80\uc9c0\ud718\uad00'},{name:'\uac15\ub3c4\uc724',key:'doyun',role:'\ud604\uc7a5\uc694\uc6d0'},{name:'\uc724\uc138\uc9c4',key:'sejin',role:'\uc5f0\uad6c\uc6d0'},{name:'\uc784\uc7ac\ud601',key:'jaehyuk',role:'\uae30\uc220\uad00'},{name:'\ub9c8\ub974\ucfe0\uc2a4 \ubca0\ubc84',key:'weber',role:'\ud504\ub85c\uba54\ud14c\uc6b0\uc2a4'},{name:'\ub2c9 \ud3ec\uc2a4\ud130',key:'foster',role:'\ud504\ub85c\uba54\ud14c\uc6b0\uc2a4'},{name:'\ubc15\uc18c\uc601',key:'soyoung',role:'\ubd84\uc11d\uad00'}];
  var available=chars.filter(function(c){if(c.name==='\uc11c\ud558\uc740'&&p.logs.indexOf('LOG-050')>=0)return false;if(c.name==='\uac15\ub3c4\uc724'&&p.logs.indexOf('LOG-075')>=0)return false;if(c.name==='\ub9c8\ub974\ucfe0\uc2a4 \ubca0\ubc84'&&p.logs.indexOf('LOG-080')<0)return false;if(c.name==='\ub2c9 \ud3ec\uc2a4\ud130'&&p.logs.indexOf('LOG-081')<0)return false;if(c.name==='\ubc15\uc18c\uc601'&&(p.logs.indexOf('LOG-082')<0||p.logs.indexOf('LOG-INTRO-SY')<0))return false;return true});
  var usedEv=p.usedEvening||[];
  var ecKey=function(ec){return ec.char+'_'+ec.act[0]+'_'+ec.dayMin+'-'+ec.dayMax};
  var charKeyMap2={'서하은':'haeun','강도윤':'doyun','윤세진':'sejin','임재혁':'jaehyuk','마르쿠스 베버':'weber','닉 포스터':'foster','박소영':'soyoung'};
  var INTRO_LOG_MAP={'\uc11c\ud558\uc740':'LOG-INTRO-SH','\uac15\ub3c4\uc724':'LOG-INTRO-KD','\uc724\uc138\uc9c4':'LOG-INTRO-YS','\uc784\uc7ac\ud601':'LOG-INTRO-IJ'};
  var chat=null;
  if(selChar){
    var ck=charKeyMap2[selChar.name]||'';
    var tier=(typeof getTrustTier==='function'&&ck)?getTrustTier(p.trust,ck):'mid';
    var tierDayCap={low:10,mid:24,high:99,bond:99};
    var dayCap=tierDayCap[tier]||99;
    var sortByDay=function(a,b){return a.dayMin-b.dayMin};
    var introLog=INTRO_LOG_MAP[selChar.name];var introDone=introLog&&p.logs.indexOf(introLog)>=0;
    var skipIntro=function(ec){return!(introDone&&ec.dayMin===1&&ec.act.indexOf(1)>=0)};
    var matches=EVENING_CHATS.filter(function(ec){return ec.char===selChar.name&&ec.act.indexOf(p.act)>=0&&p.day>=ec.dayMin&&p.day<=ec.dayMax&&ec.dayMin<=dayCap&&usedEv.indexOf(ecKey(ec))<0&&skipIntro(ec)}).sort(sortByDay);
    if(matches.length>0){chat=matches[0]}
    else{
      matches=EVENING_CHATS.filter(function(ec){return ec.char===selChar.name&&ec.act.indexOf(p.act)>=0&&ec.dayMin<=dayCap&&usedEv.indexOf(ecKey(ec))<0&&skipIntro(ec)}).sort(sortByDay);
      if(matches.length>0){chat=matches[0]}
      else{
        matches=EVENING_CHATS.filter(function(ec){return ec.char===selChar.name&&ec.act.indexOf(p.act)>=0&&p.day>=ec.dayMin&&p.day<=ec.dayMax&&skipIntro(ec)}).sort(sortByDay);
        if(matches.length>0)chat=matches[matches.length-1];
        else{matches=EVENING_CHATS.filter(function(ec){return ec.char===selChar.name&&ec.act.indexOf(p.act)>=0&&skipIntro(ec)}).sort(sortByDay);chat=matches.length>0?matches[matches.length-1]:null}
      }
    }
  }
  var chatLines=chat?(typeof getEveningLines==='function'?getEveningLines(chat,p.trust,p.logs):chat.lines):[];
  var resp=(chat&&typeof getEveningResponse==='function')?getEveningResponse(chat,p.trust):null;
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
    var m2=EVENING_CHATS.filter(function(ec){return ec.char===c.name&&ec.act.indexOf(p.act)>=0&&p.day>=ec.dayMin&&p.day<=ec.dayMax&&ec.dayMin<=dayCap2&&usedEv.indexOf(ecKey(ec))<0&&si2(ec)}).sort(sortD);
    if(m2.length===0)m2=EVENING_CHATS.filter(function(ec){return ec.char===c.name&&ec.act.indexOf(p.act)>=0&&ec.dayMin<=dayCap2&&usedEv.indexOf(ecKey(ec))<0&&si2(ec)}).sort(sortD);
    if(m2.length>0&&p.onMarkEvening)p.onMarkEvening(ecKey(m2[0]))
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
    h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:16,color:'rgba(220,255,220,.9)',textAlign:'center',margin:'12px 0 4px',letterSpacing:1}},'DAY '+p.day+' \uc885\ub8cc'),
    h('div',{style:{fontSize:13,color:'rgba(var(--ui-rgb),.6)',textAlign:'center',marginBottom:20}},'\uac04\ubd80\uc9c4 \ud55c \uba85\uacfc \ub300\ud654\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.'),
    h('div',{style:{display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap',maxWidth:440,margin:'0 auto'}},
      available.map(function(c,idx){var portrait=CHAR_IMG[c.name]||null;return h('div',{key:c.name,onClick:function(){pickChar(c)},style:{cursor:'pointer',textAlign:'center',padding:'14px 10px 10px',border:'1px solid rgba(var(--ui-rgb),.15)',borderRadius:8,background:'rgba(10,18,10,.6)',width:90,transition:'all 0.2s',position:'relative'}},
        h('span',{style:{position:'absolute',top:4,left:6,fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(240,160,48,.7)',letterSpacing:1}},'['+(idx+1)+']'),
        portrait?h('img',{src:portrait,style:{width:60,height:60,borderRadius:'50%',border:'2px solid rgba(var(--ui-rgb),.3)',display:'block',margin:'0 auto 6px',objectFit:'cover'}}):h('div',{style:{width:60,height:60,borderRadius:'50%',background:'var(--ui-border)',margin:'0 auto 6px'}}),
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
    h('div',{className:'oracle-card',style:{width:'100%',maxWidth:440,flex:1,minHeight:80,padding:'18px 20px',cursor:'default',display:'flex',flexDirection:'column',overflowY:'hidden',marginBottom:0,userSelect:'none',WebkitUserSelect:'none',touchAction:'none'}},
      h('div',{className:'oracle-card__glow'}),
      chatLines.length>0?h(React.Fragment,null,
        chatLines.slice(0,li).map(function(l,i){return h('div',{key:i,style:{fontSize:14,lineHeight:1.7,color:'rgba(220,255,220,.8)',marginBottom:8}},l)}),
        li<chatLines.length&&h('div',{key:'typing-'+li,style:{fontSize:14,lineHeight:1.7,color:'rgba(220,255,220,.8)',marginBottom:8}},chatLines[li].substring(0,ci),!done&&h('span',{style:{color:'var(--ui)',animation:'blink 1s infinite',marginLeft:1}},'█')),
        replyLine&&h('div',{style:{fontSize:13,lineHeight:1.7,color:'#f0a030',marginTop:8,borderLeft:'2px solid #f0a030',paddingLeft:10,fontStyle:'italic'}},replyLine)
      ):h('div',{style:{fontSize:13,color:'rgba(var(--ui-rgb),.4)'}},'...')),
    done&&!choiceDone&&resp&&h('div',{style:{width:'100%',maxWidth:440,flexShrink:0,display:'flex',flexDirection:'column',gap:8,padding:'8px 0',margin:'0 auto'}},
      [resp.a,resp.b].map(function(opt,i){var bdrCol=i===0?'rgba(240,160,48,.5)':'rgba(var(--ui-rgb),.35)';return h('button',{key:i,style:{background:'rgba(10,18,10,.4)',border:'1px solid '+bdrCol,color:i===0?'#f0a030':'var(--ui)',fontFamily:'inherit',fontSize:14,padding:'10px 20px',cursor:'pointer',textAlign:'center',minHeight:44,display:'flex',flexDirection:'column',alignItems:'center',gap:2,transition:'all 0.3s ease'},onClick:function(){
        var cn=selChar.name;if(p.onResponse)p.onResponse(cn,opt.trust||0);
        if(opt.log&&p.onLog)p.onLog(opt.log);
        setReplyLine(opt.reply||'');setChoiceDone(true)}},h('span',null,opt.label))})),
    done&&(!resp||choiceDone)&&p.logs.indexOf('LOG-EV-UNLOCK')>=0&&typeof EvidenceTable==='function'&&h(EvidenceTable,{logs:p.logs,unlocked:true,onTrust:p.onTrustMod,onGi:p.onGiMod}),
    done&&(!resp||choiceDone)&&h('button',{className:'btn btn-amber',style:{display:'block',margin:'12px auto',padding:'10px 28px'},onClick:p.onDone},'[ \ub2e4\uc74c ]'));
}
