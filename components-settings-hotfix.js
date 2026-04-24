// components-settings-hotfix.js — defer locale apply until settings close
(function(){
  if(typeof SettingsPanel!=='function') return;
  var tr=function(path,fallback,params){return(typeof tt==='function')?tt(path,params||null,fallback):fallback};

  if(typeof SettingsSaveTab==='function'){
    SettingsSaveTab=function(p){
      var _cf=useState(null),cfm=_cf[0],setCfm=_cf[1];
      var _ci=useState(''),cfmInput=_ci[0],setCfmInput=_ci[1];
      var sessions=Save.getSessions();
      var endings=Save.getEndings();
      var logs=Save.getLogs();
      var logsTotal=typeof ORACLE_LOGS!=='undefined'?ORACLE_LOGS.length:0;
      var mono={fontFamily:"'Share Tech Mono',monospace",fontSize:13,color:'var(--ui)'};
      var cfmModal=function(){
        if(!cfm)return null;
        var needInput=!!cfm.inputKey;
        var inputOk=!needInput||cfmInput===cfm.inputKey;
        return h('div',{style:{position:'fixed',inset:0,background:'rgba(0,0,0,0.8)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:310}},
          h('div',{style:{background:'#0a120a',border:'1px solid rgba(255,68,68,0.4)',padding:'20px 24px',maxWidth:300,textAlign:'center'}},
            h('div',{style:{fontSize:13,color:'#ff4444',marginBottom:16,whiteSpace:'pre-wrap',lineHeight:1.7}},cfm.msg),
            needInput&&h('div',{style:{marginBottom:12}},
              h('div',{style:{fontSize:11,color:'rgba(255,68,68,0.6)',marginBottom:6}},tr('settings.typeDelete','Type "DELETE" to continue')),
              h('input',{type:'text',value:cfmInput,maxLength:String(cfm.inputKey||'').length||4,style:{width:'100%',background:'rgba(255,68,68,0.08)',border:'1px solid rgba(255,68,68,0.3)',color:'#ff4444',fontFamily:"'Share Tech Mono',monospace",fontSize:13,padding:'6px 10px',textAlign:'center',outline:'none'},onChange:function(e){setCfmInput(e.target.value)}})),
            h('div',{style:{display:'flex',gap:10,justifyContent:'center'}},
              h('button',{className:'btn',style:{fontSize:11,padding:'8px 16px',marginTop:0},onClick:function(){setCfm(null);setCfmInput('')}},tr('settings.cancel','Cancel')),
              h('button',{className:'btn btn-amber',disabled:!inputOk,style:{fontSize:11,padding:'8px 16px',marginTop:0,opacity:inputOk?1:0.3,cursor:inputOk?'pointer':'not-allowed'},onClick:function(){if(!inputOk)return;cfm.action();setCfm(null);setCfmInput('')}},tr('settings.confirm','Confirm')))));
      };
      var _snaps=useState(function(){return Save.listSnapshots()}),snaps=_snaps[0],setSnaps=_snaps[1];
      var fmtTime=function(ts){if(!ts)return '';var d=new Date(ts);return(d.getMonth()+1)+'/'+d.getDate()+' '+String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0')};
      var slotRow=function(s){
        var data=s.data;
        var label=data?data.label:tr('settings.slotEmpty','Empty Slot');
        var timeStr=data?fmtTime(data.timestamp):'';
        var sesStr=(data&&data.sessions!=null)?' · '+tr('settings.sessions','Sessions')+' '+data.sessions:'';
        return h('div',{key:s.slot,style:{display:'flex',alignItems:'center',gap:6,padding:'8px 10px',marginBottom:6,background:data?'rgba(var(--ui-rgb),.05)':'rgba(255,255,255,.02)',border:'1px solid '+(data?'rgba(var(--ui-rgb),.2)':'rgba(255,255,255,.08)'),borderRadius:2}},
          h('div',{style:{flex:1,minWidth:0}},
            h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.5)',letterSpacing:1}},'SLOT '+s.slot),
            h('div',{style:{fontSize:12,color:data?'var(--ui)':'rgba(255,255,255,.3)',fontWeight:'bold',marginTop:2}},label),
            data&&h('div',{style:{fontSize:10,color:'rgba(var(--ui-rgb),.4)',marginTop:2,fontFamily:"'Share Tech Mono',monospace"}},timeStr+sesStr)),
          h('button',{style:{background:'rgba(var(--ui-rgb),.1)',border:'1px solid rgba(var(--ui-rgb),.3)',color:'var(--ui)',fontFamily:"'Share Tech Mono',monospace",fontSize:10,padding:'5px 8px',cursor:'pointer'},onClick:function(){setCfm({msg:'SLOT '+s.slot+' - '+tr('settings.slotSave','Save')+'\n'+(data?tr('settings.overwriteHint','Existing data will be overwritten.'):''),action:function(){if(p.onSaveSnap)p.onSaveSnap(s.slot);setSnaps(Save.listSnapshots())}})}},tr('settings.slotSave','Save')),
          data&&h('button',{style:{background:'rgba(240,160,48,.1)',border:'1px solid rgba(240,160,48,.3)',color:'#f0a030',fontFamily:"'Share Tech Mono',monospace",fontSize:10,padding:'5px 8px',cursor:'pointer'},onClick:function(){setCfm({msg:'SLOT '+s.slot+' - '+tr('settings.slotLoad','Load'),action:function(){if(p.onLoadSnap)p.onLoadSnap(s.slot);p.onClose()}})}},tr('settings.slotLoad','Load')),
          data&&h('button',{style:{background:'rgba(255,68,68,.08)',border:'1px solid rgba(255,68,68,.25)',color:'#ff6644',fontFamily:"'Share Tech Mono',monospace",fontSize:10,padding:'5px 8px',cursor:'pointer'},onClick:function(){Save.deleteSnapshot(s.slot);setSnaps(Save.listSnapshots())}},tr('settings.slotDelete','Delete')));
      };
      return h('div',null,
        _settingsRow(tr('settings.sessions','Sessions'),h('span',{style:mono},sessions)),
        _settingsRow(tr('settings.unlockedLogs','Unlocked Logs'),h('span',{style:mono},(logs?logs.length:0)+'/'+logsTotal)),
        _settingsRow(tr('settings.endingsFound','Endings Found'),h('span',{style:mono},(endings?endings.length:0)+'/10')),
        h('div',{style:{marginTop:16,paddingTop:12,borderTop:'1px solid rgba(var(--ui-rgb),.15)'}},
          h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.6)',letterSpacing:2,marginBottom:8}},tr('settings.snapshotSlots','SNAPSHOT SLOTS')),
          h('div',{style:{fontSize:10,color:'rgba(var(--ui-rgb),.4)',marginBottom:10,lineHeight:1.6}},tr('settings.snapshotHelp','Save at a desired day and reload later to compare different branching choices.')),
          snaps.map(slotRow)),
        h('div',{style:{marginTop:16,display:'flex',flexDirection:'column',gap:8}},
          h('button',{className:'btn',style:{fontSize:11,padding:'8px 16px',marginTop:0,width:'100%'},onClick:function(){setCfm({msg:tr('settings.resetConfirm','This resets the current active session.\\nLogs and endings will be preserved.'),action:function(){if(p.onReset)p.onReset();p.onClose()}})}},tr('settings.resetCurrent','Reset Current Session')),
          h('button',{className:'btn',style:{fontSize:11,padding:'8px 16px',marginTop:0,width:'100%',color:'#ff4444'},onClick:function(){setCfm({msg:tr('settings.wipeConfirm','This deletes all data.\\nLogs, endings, and session records will be lost.\\nThis cannot be undone.'),inputKey:tr('settings.deleteKey','DELETE'),action:function(){if(p.onFullReset)p.onFullReset();p.onClose()}})}},tr('settings.wipeAll','Delete All Data'))),
        cfmModal());
    };
  }

  SettingsPanel = function(p){
    var _tab=useState('sound'),tab=_tab[0],setTab=_tab[1];
    var _muted=useState(typeof BGM!=='undefined'?BGM.muted:false),muted=_muted[0],setMuted=_muted[1];
    var _vol=useState(function(){return Save.get('ts_volume',10)}),vol=_vol[0],setVol=_vol[1];
    var _sfxVol=useState(function(){return Save.get('ts_sfxVol',50)}),sfxVol=_sfxVol[0],setSfxVol=_sfxVol[1];
    var _currentLang=useState(function(){return(window.TS_I18N&&window.TS_I18N.getLocale())||'ko'}),currentLang=_currentLang[0];
    var _pendingLang=useState(currentLang),pendingLang=_pendingLang[0],setPendingLang=_pendingLang[1];

    var closePanel=function(){
      var nextLang=pendingLang||currentLang;
      if(window.TS_I18N&&nextLang!==currentLang){
        window.TS_I18N.setLocale(nextLang);
        if(typeof window!=='undefined'&&window.location&&typeof window.location.reload==='function'){window.location.reload();return;}
      }
      p.onClose();
    };

    useEffect(function(){
      var handler=function(e){if(e.key==='Escape')closePanel()};
      window.addEventListener('keydown',handler);
      return function(){window.removeEventListener('keydown',handler)};
    },[pendingLang,currentLang]);

    var toggleMute=function(){
      if(typeof BGM!=='undefined'){
        var m=BGM.toggleMute();setMuted(m);Save.set('ts_muted',m);
        if(typeof SFX!=='undefined')SFX.muted=m;
      }
    };
    var changeVol=function(v){
      var nv=Math.max(0,Math.min(100,v));setVol(nv);
      if(typeof BGM!=='undefined'){
        BGM.vol=nv/100;
        if(BGM.current&&BGM.tracks[BGM.current]&&!BGM.muted)BGM.tracks[BGM.current].volume=nv/100;
        Save.set('ts_volume',nv);
      }
    };
    var changeSfxVol=function(v){
      var nv=Math.max(0,Math.min(100,v));setSfxVol(nv);
      if(typeof SFX!=='undefined'){SFX.vol=nv/100;Save.set('ts_sfxVol',nv)}
    };

    var content=null;
    if(tab==='sound') content=h(SettingsSoundTab,{muted:muted,vol:vol,sfxVol:sfxVol,onToggleMute:toggleMute,onVolChange:changeVol,onSfxVolChange:changeSfxVol});
    if(tab==='save') content=h(SettingsSaveTab,{onReset:p.onReset,onFullReset:p.onFullReset,onClose:closePanel,onSaveSnap:p.onSaveSnap,onLoadSnap:p.onLoadSnap});
    if(tab==='display') content=h(SettingsDisplayTab,{onFxModeChange:p.onFxModeChange,currentLang:currentLang,pendingLang:pendingLang,onLanguageSelect:setPendingLang});
    if(tab==='info') content=h(SettingsInfoTab);

    return h('div',{style:{position:'fixed',inset:0,background:'rgba(0,0,0,0.85)',zIndex:300,display:'flex',alignItems:'center',justifyContent:'center'},onClick:function(e){if(e.target===e.currentTarget)closePanel()}},
      h('div',{style:{width:'100%',maxWidth:400,maxHeight:'80vh',background:'#0a120a',border:'1px solid rgba(var(--ui-rgb),0.25)',padding:'16px 20px',display:'flex',flexDirection:'column',overflow:'hidden',boxShadow:'0 0 40px rgba(0,0,0,0.5), 0 0 8px rgba(var(--ui-rgb),0.05)'}},
        h('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12,paddingBottom:8,borderBottom:'1px solid rgba(var(--ui-rgb),0.15)'}},
          h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:12,color:'var(--ui)',letterSpacing:2}},tr('settings.title','SETTINGS')),
          h('div',{style:{display:'flex',gap:6}},
            p.onMainMenu&&h('button',{style:{background:'none',border:'1px solid rgba(var(--ui-rgb),0.2)',color:'var(--ui)',fontFamily:"'Share Tech Mono',monospace",fontSize:10,padding:'3px 8px',cursor:'pointer'},onClick:function(){closePanel();if(p.onMainMenu)p.onMainMenu()}},tr('settings.mainMenu','MENU')),
            h('button',{style:{background:'none',border:'1px solid rgba(var(--ui-rgb),0.2)',color:'var(--ui)',fontFamily:"'Share Tech Mono',monospace",fontSize:10,padding:'3px 8px',cursor:'pointer'},onClick:closePanel},tr('settings.close','ESC')))),
        h('div',{style:{display:'flex',gap:4,marginBottom:12,flexWrap:'wrap'}},
          _settingsTabBtn('sound',tr('settings.tabs.sound','SOUND'),tab,setTab),
          _settingsTabBtn('save',tr('settings.tabs.save','SAVE'),tab,setTab),
          _settingsTabBtn('display',tr('settings.tabs.display','DISPLAY'),tab,setTab),
          _settingsTabBtn('info',tr('settings.tabs.info','INFO'),tab,setTab)),
        h('div',{style:{flex:1,overflowY:'auto',minHeight:0}},content))
    );
  };
})();
