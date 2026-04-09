// TERMINAL SESSION — components-evening.js (EveningAmbient, EveningChat)
// 이브닝 챗 앰비언트 사운드 (Web Audio API)
var EveningAmbient = {
  ctx: null, nodes: [], active: false,
  start: function() {
    if (this.active) return;
    if (typeof BGM !== 'undefined' && BGM.muted) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (this.ctx.state === 'suspended') { this.ctx.resume(); }
      this.active = true;
      var ctx = this.ctx;
      var master = ctx.createGain();
      master.gain.setValueAtTime(0, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 2);
      master.connect(ctx.destination);
      this.nodes.push(master);
      // 저음 드론 — 깊은 밤 분위기
      var drone = ctx.createOscillator();
      drone.type = 'sine';
      drone.frequency.setValueAtTime(55, ctx.currentTime);
      var droneGain = ctx.createGain();
      droneGain.gain.setValueAtTime(0.4, ctx.currentTime);
      drone.connect(droneGain);
      droneGain.connect(master);
      drone.start();
      this.nodes.push(drone);
      // 미세한 고음 톤 — 기지 전자장비 느낌
      var hum = ctx.createOscillator();
      hum.type = 'sine';
      hum.frequency.setValueAtTime(440, ctx.currentTime);
      var humGain = ctx.createGain();
      humGain.gain.setValueAtTime(0.015, ctx.currentTime);
      hum.connect(humGain);
      humGain.connect(master);
      hum.start();
      this.nodes.push(hum);
      // LFO로 드론에 미세한 떨림
      var lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.15, ctx.currentTime);
      var lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(3, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(drone.frequency);
      lfo.start();
      this.nodes.push(lfo);
      // 간헐적 화이트 노이즈 (바람 소리)
      var bufSize = ctx.sampleRate * 4;
      var noiseBuf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      var data = noiseBuf.getChannelData(0);
      for (var i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * 0.3;
      var noise = ctx.createBufferSource();
      noise.buffer = noiseBuf;
      noise.loop = true;
      var noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.setValueAtTime(200, ctx.currentTime);
      var noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.08, ctx.currentTime);
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(master);
      noise.start();
      this.nodes.push(noise);
      this.master = master;
    } catch(e) { console.warn('Evening ambient failed:', e); }
  },
  stop: function() {
    if (!this.active || !this.ctx) return;
    var ctx = this.ctx;
    var master = this.master;
    if (master) {
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
    }
    var nodes = this.nodes;
    setTimeout(function() {
      nodes.forEach(function(n) { try { if (n.stop) n.stop(); } catch(e){} });
    }, 1600);
    this.nodes = [];
    this.active = false;
    this.master = null;
  }
};

function EveningChat(p){
  var s1=useState(null),selChar=s1[0],setSelChar=s1[1];
  var s2=useState(0),li=s2[0],setLi=s2[1];
  var s3=useState(false),done=s3[0],setDone=s3[1];
  // 이브닝 앰비언트 사운드 시작/정지
  useEffect(function(){ EveningAmbient.start(); return function(){ EveningAmbient.stop(); }; },[]);
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
  var s5=useState(null),pickedResp=s5[0],setPickedResp=s5[1];
  useEffect(function(){if(selChar){setLi(0);setCi(0);setDone(false);setPickedResp(null)}},[selChar]);
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
        h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:'#1a8a1a',marginTop:2}},c.role),
        (function(){
          var tags=typeof getCharTags==='function'?getCharTags(c.name,c.key,p.trust,p.logs):[];
          if(tags.length===0)return null;
          return h('div',{style:{display:'flex',gap:3,justifyContent:'center',flexWrap:'wrap',marginTop:4}},
            tags.map(function(tg,ti){return h('span',{key:ti,className:tg.cls,style:{fontFamily:"'Share Tech Mono',monospace",fontSize:8,padding:'1px 4px',borderRadius:2,letterSpacing:0.5}},tg.label)}))
        })()
      )})),
    typeof EvidenceTable==='function'&&h(EvidenceTable,{logs:p.logs,onTrust:p.onTrustMod,onGi:p.onGiMod}),
    h('button',{className:'btn',style:{display:'block',margin:'20px auto 0',fontSize:11,padding:'8px 20px',opacity:0.5},onClick:p.onDone},'[ \uac74\ub108\ub6f0\uae30 ]'));
  var portrait=CHAR_IMG[selChar.name]||null;
  var preventH=function(e){e.preventDefault()};
  var resetH=function(){preventH._sx=null;preventH._sy=null};
  var choiceBtn=function(label,onClick){return h('div',{onClick:onClick,style:{padding:'10px 14px',cursor:'pointer',borderLeft:'3px solid rgba(145,255,106,.35)',background:'rgba(145,255,106,.03)',marginBottom:0,transition:'background 0.15s'}},
    h('div',{style:{display:'flex',alignItems:'center',gap:8}},
      h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:'rgba(145,255,106,.45)',letterSpacing:1,flexShrink:0}},'\u25B8'),
      h('span',{style:{fontSize:12,color:'#9dff74',lineHeight:1.5}},label)))};
  return h('div',{className:'screen',onTouchStart:resetH,onTouchMove:preventH,onTouchEnd:resetH,style:{touchAction:'none',overflow:'hidden'}},
    h('div',{className:'title-frame'},h('span',null,'ORACLE // EVENING')),
    h('div',{style:{textAlign:'center',margin:'8px 0',flexShrink:0}},
      portrait&&h('img',{src:portrait,className:'portrait',style:{width:80,height:80,borderRadius:'50%',objectFit:'cover'}}),
      h('div',{style:{fontSize:15,color:'#f0a030',fontWeight:'bold',marginTop:4}},selChar.name),
      h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'#1a8a1a',marginTop:2}},selChar.role)),
    h('div',{className:'oracle-card',style:{width:'100%',maxWidth:440,flex:1,minHeight:80,padding:'18px 20px 14px',cursor:'default',display:'flex',flexDirection:'column',overflow:'hidden',marginBottom:0,WebkitUserSelect:'none',userSelect:'none'}},
      h('div',{className:'oracle-card__glow'}),
      chatLines.length>0?h(React.Fragment,null,
        chatLines.slice(0,li).map(function(l,i){return h('div',{key:i,style:{fontSize:14,lineHeight:1.7,color:'rgba(220,255,220,.8)',marginBottom:8}},l)}),
        li<chatLines.length&&h('div',{key:'typing-'+li,style:{fontSize:14,lineHeight:1.7,color:'rgba(220,255,220,.8)',marginBottom:8}},chatLines[li].substring(0,ci),!done&&h('span',{style:{color:'#33ff33',animation:'blink 1s infinite',marginLeft:1}},'█'))
      ):h('div',{style:{fontSize:13,color:'rgba(157,255,116,.4)'}},'...'),
      done&&(function(){
        var resp=typeof getEveningResponse==='function'?getEveningResponse(chat,p.trust):null;
        if(!resp)return h('button',{className:'btn btn-amber',style:{display:'block',margin:'12px auto 0',padding:'10px 28px'},onClick:p.onDone},'[ \ub2e4\uc74c ]');
        if(pickedResp)return h('div',{style:{marginTop:'auto',paddingTop:10,borderTop:'1px solid rgba(145,255,106,.1)'}},
          h('div',{style:{fontSize:12,color:'rgba(157,255,116,.5)',fontFamily:"'Share Tech Mono',monospace",padding:'8px 14px',borderLeft:'3px solid rgba(145,255,106,.15)',background:'rgba(145,255,106,.02)',lineHeight:1.6,marginBottom:10}},pickedResp.reply),
          h('button',{className:'btn btn-amber',style:{display:'block',margin:'0 auto',padding:'10px 28px'},onClick:p.onDone},'[ \ub2e4\uc74c ]'));
        return h('div',{style:{marginTop:'auto',paddingTop:10,borderTop:'1px solid rgba(145,255,106,.08)',display:'flex',flexDirection:'column',gap:6}},
          choiceBtn(resp.a.label,function(){if(p.onResponse)p.onResponse(selChar.name,resp.a.trust);setPickedResp(resp.a)}),
          choiceBtn(resp.b.label,function(){if(p.onResponse)p.onResponse(selChar.name,resp.b.trust);setPickedResp(resp.b)}));
      })()),
    h('div',{className:'footer-frame'},h('span',null,'ORACLE REMOTE TERMINAL \u2014 BRANCH KR-INIT-001')));
}
