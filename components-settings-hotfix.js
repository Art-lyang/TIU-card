// components-settings-hotfix.js — defer locale apply until settings close
(function(){
  if(typeof SettingsPanel!=='function') return;
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
          h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:12,color:'var(--ui)',letterSpacing:2}},'SETTINGS'),
          h('button',{style:{background:'none',border:'1px solid rgba(var(--ui-rgb),0.2)',color:'var(--ui)',fontFamily:"'Share Tech Mono',monospace",fontSize:10,padding:'3px 8px',cursor:'pointer'},onClick:closePanel},'ESC')),
        h('div',{style:{display:'flex',gap:4,marginBottom:12,flexWrap:'wrap'}},
          _settingsTabBtn('sound','SOUND',tab,setTab),
          _settingsTabBtn('save','SAVE',tab,setTab),
          _settingsTabBtn('display','DISPLAY',tab,setTab),
          _settingsTabBtn('info','INFO',tab,setTab)),
        h('div',{style:{flex:1,overflowY:'auto',minHeight:0}},content))
    );
  };
})();