// components-settings-hotfix.js — defer locale apply until settings close
(function(){
  if(typeof SettingsPanel!=='function') return;
  var tr=function(path,fallback,params){return(typeof tt==='function')?tt(path,params||null,fallback):fallback};

  if(typeof SettingsSaveTab==='function'){
    SettingsSaveTab=function(p){
      var _cf=useState(null),cfm=_cf[0],setCfm=_cf[1];
      var _ci=useState(''),cfmInput=_ci[0],setCfmInput=_ci[1];
      var _cl=useState(function(){return(typeof CloudSave!=='undefined'&&CloudSave&&CloudSave.getState)?CloudSave.getState():{status:'unavailable',isConfigured:false}}),cloud=_cl[0],setCloud=_cl[1];
      var sessions=Save.getSessions();
      var endings=Save.getEndings();
      var logs=Save.getLogs();
      var logsTotal=typeof ORACLE_LOGS!=='undefined'?ORACLE_LOGS.length:0;
      var endingsTotal=typeof ENDING_CATALOG!=='undefined'?ENDING_CATALOG.length:(typeof ENDING_DEFS!=='undefined'?Object.keys(ENDING_DEFS).length:10);
      var mono={fontFamily:"'Share Tech Mono',monospace",fontSize:13,color:'var(--ui)'};
      var cfmModal=function(){
        if(!cfm)return null;
        var needInput=!!cfm.inputKey;
        var inputOk=!needInput||cfmInput===cfm.inputKey;
        return h('div',{style:{position:'fixed',inset:0,background:'rgba(0,0,0,0.8)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:310}},
          h('div',{style:{background:'rgba(3,7,8,.96)',border:'1px solid rgba(255,68,68,0.4)',padding:'20px 24px',maxWidth:300,textAlign:'center'}},
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
      useEffect(function(){
        if(typeof CloudSave==='undefined'||!CloudSave||!CloudSave.subscribe)return;
        return CloudSave.subscribe(function(state){setCloud(state)});
      },[]);
      var cloudBusy=cloud&&/loading|checking|syncing|restoring|pending/.test(cloud.status||'');
      var cloudAction=function(fn){return function(){try{var r=fn();if(r&&r.catch)r.catch(function(){})}catch(e){}}};
      var cloudButton=function(label,onClick,variant,disabled){
        return h('button',{className:'btn '+(variant==='amber'?'btn-amber':''),disabled:!!disabled,style:{fontSize:10,padding:'7px 10px',marginTop:0,flex:'1 1 120px',opacity:disabled?0.35:1,cursor:disabled?'not-allowed':'pointer'},onClick:onClick},label);
      };
      var cloudStatusText=function(){
        if(!cloud||!cloud.isConfigured)return tr('settings.cloudUnavailable','Google cloud save is not enabled yet. Local save remains active.');
        if(cloud.status==='error')return tr('settings.cloudError','Cloud save error')+(cloud.lastError?': '+cloud.lastError:'');
        if(cloud.status==='pending')return tr('settings.cloudPending','Sync pending...');
        if(cloud.status==='checking')return tr('settings.cloudChecking','Checking cloud save...');
        if(cloud.status==='conflict')return tr('settings.cloudConflict','Save conflict');
        if(cloud.status==='syncing')return tr('settings.cloudSyncing','Syncing...');
        if(cloud.status==='restoring')return tr('settings.cloudRestoring','Restoring cloud save...');
        if(cloud.user)return tr('settings.cloudConnected','Connected');
        return tr('settings.cloudDisconnected','Not connected');
      };
      var summaryLine=function(label,s){
        if(!s||!s.hasData)return label+': '+tr('settings.cloudNoRecord','No saved record');
        var day=s.day?('DAY '+s.day):tr('settings.cloudMetaOnly','Meta only');
        var act=s.hasGame?('ACT '+s.act):'';
        var rev=s.revision?('REV '+s.revision):'';
        var when=s.timestampLabel||'';
        return label+': '+[act,day,rev,when].filter(Boolean).join(' / ');
      };
      var conflictPanel=function(conflict){
        if(!conflict||!conflict.requiresChoice)return null;
        return h('div',{style:{margin:'10px 0',padding:'10px 12px',background:'rgba(255,167,38,.08)',border:'1px solid rgba(255,167,38,.35)'}},
          h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'#ffa726',letterSpacing:1,marginBottom:6}},tr('settings.cloudConflictTitle','SAVE CONFLICT DETECTED')),
          h('div',{style:{fontSize:10,color:'rgba(var(--ui-rgb),.55)',lineHeight:1.6,marginBottom:8}},tr('settings.cloudConflictBody','Cloud save and this device save are different. Choose which record to keep.')),
          h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.7)',lineHeight:1.6,marginBottom:8}},
            h('div',null,summaryLine(tr('settings.cloudLocalRecord','This device'),conflict.local)),
            h('div',null,summaryLine(tr('settings.cloudRemoteRecord','Cloud'),conflict.cloud))),
          h('div',{style:{display:'flex',gap:6,flexWrap:'wrap'}},
            cloudButton(tr('settings.cloudUseLocal','Use This Device'),cloudAction(function(){return CloudSave.resolveConflict('local')}),'amber',cloudBusy),
            cloudButton(tr('settings.cloudUseCloud','Use Cloud Save'),cloudAction(function(){return CloudSave.resolveConflict('cloud')}),'',cloudBusy)));
      };
      var cloudSection=function(){
        var configured=!!(cloud&&cloud.isConfigured);
        var user=cloud&&cloud.user;
        return h('div',{style:{marginTop:16,paddingTop:12,borderTop:'1px solid rgba(var(--ui-rgb),.15)'}},
          h('div',{style:{display:'flex',justifyContent:'space-between',gap:8,alignItems:'center',marginBottom:8}},
            h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.6)',letterSpacing:2}},tr('settings.cloudTitle','GOOGLE CLOUD SAVE')),
            h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:cloud&&cloud.status==='error'?'#ff6644':'var(--ui)'}},cloudStatusText())),
          h('div',{style:{fontSize:10,color:'rgba(var(--ui-rgb),.45)',lineHeight:1.6,marginBottom:10}},tr('settings.cloudLocalFirst','Local save stays primary. When connected, current progress, logs, archive unlocks, endings, and snapshot slots can be synced.')),
          user&&h('div',{style:{fontSize:10,color:'rgba(var(--ui-rgb),.55)',lineHeight:1.6,marginBottom:10,fontFamily:"'Share Tech Mono',monospace"}},
            tr('settings.cloudAccount','Account')+': '+(user.email||user.displayName||user.uid),
            cloud.lastSyncLabel?' | '+tr('settings.cloudLastSync','Last sync')+': '+cloud.lastSyncLabel:''),
          conflictPanel(cloud&&cloud.conflict),
          h('div',{style:{display:'flex',gap:6,flexWrap:'wrap'}},
            configured&&!user&&cloudButton(tr('settings.cloudSignIn','Connect Google'),cloudAction(function(){return CloudSave.signIn()}),'amber',cloudBusy),
            configured&&user&&cloudButton(tr('settings.cloudCheck','Check Cloud Save'),cloudAction(function(){return CloudSave.checkConflict({autoUploadEmpty:false})}),'',cloudBusy),
            configured&&user&&cloudButton(tr('settings.cloudUpload','Upload Local Save'),cloudAction(function(){return CloudSave.uploadCurrent()}),'amber',cloudBusy),
            configured&&user&&cloudButton(tr('settings.cloudRestore','Restore Cloud Save'),function(){setCfm({msg:tr('settings.cloudRestoreConfirm','Cloud save will overwrite local progress and reload the session.'),action:cloudAction(function(){return CloudSave.restoreCloud({reload:true})})})},'',cloudBusy),
            configured&&user&&cloudButton(tr('settings.cloudSignOut','Sign Out'),cloudAction(function(){return CloudSave.signOut()}),'',cloudBusy),
            configured&&user&&cloudButton(tr('settings.cloudDelete','Delete Cloud Data'),function(){setCfm({msg:tr('settings.cloudDeleteConfirm','Delete cloud save data for this Google account? Local save will remain on this device.'),inputKey:tr('settings.deleteKey','DELETE'),action:cloudAction(function(){return CloudSave.deleteCloudData()})})},'',cloudBusy)),
          !configured&&h('div',{style:{fontSize:10,color:'rgba(var(--ui-rgb),.35)',lineHeight:1.6,marginTop:8,fontFamily:"'Share Tech Mono',monospace"}},tr('settings.cloudConfigHint','Cloud sync will become available after account sync is enabled for this build.')));
      };
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
          data&&h('button',{style:{background:'rgba(var(--ui-rgb),.1)',border:'1px solid rgba(var(--ui-rgb),.3)',color:'var(--ui)',fontFamily:"'Share Tech Mono',monospace",fontSize:10,padding:'5px 8px',cursor:'pointer'},onClick:function(){setCfm({msg:'SLOT '+s.slot+' - '+tr('settings.slotLoad','Load'),action:function(){if(p.onLoadSnap)p.onLoadSnap(s.slot);p.onClose()}})}},tr('settings.slotLoad','Load')),
          data&&h('button',{style:{background:'rgba(255,68,68,.08)',border:'1px solid rgba(255,68,68,.25)',color:'#ff6644',fontFamily:"'Share Tech Mono',monospace",fontSize:10,padding:'5px 8px',cursor:'pointer'},onClick:function(){Save.deleteSnapshot(s.slot);setSnaps(Save.listSnapshots())}},tr('settings.slotDelete','Delete')));
      };
      return h('div',null,
        _settingsRow(tr('settings.sessions','Sessions'),h('span',{style:mono},sessions)),
        _settingsRow(tr('settings.unlockedLogs','Unlocked Logs'),h('span',{style:mono},(logs?logs.length:0)+'/'+logsTotal)),
        _settingsRow(tr('settings.endingsFound','Endings Found'),h('span',{style:mono},(endings?endings.length:0)+'/'+endingsTotal)),
        h('div',{style:{marginTop:16,paddingTop:12,borderTop:'1px solid rgba(var(--ui-rgb),.15)'}},
          h('div',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:'rgba(var(--ui-rgb),.6)',letterSpacing:2,marginBottom:8}},tr('settings.snapshotSlots','SNAPSHOT SLOTS')),
          h('div',{style:{fontSize:10,color:'rgba(var(--ui-rgb),.4)',marginBottom:10,lineHeight:1.6}},tr('settings.snapshotHelp','Save at a desired day and reload later to compare different branching choices.')),
          snaps.map(slotRow)),
        cloudSection(),
        h('div',{style:{marginTop:16,display:'flex',flexDirection:'column',gap:8}},
          h('button',{className:'btn',style:{fontSize:11,padding:'8px 16px',marginTop:0,width:'100%'},onClick:function(){setCfm({msg:tr('settings.resetConfirm','This resets the current active session.\\nLogs and endings will be preserved.'),action:function(){if(p.onReset)p.onReset();p.onClose()}})}},tr('settings.resetCurrent','Reset Current Session')),
          h('button',{className:'btn',style:{fontSize:11,padding:'8px 16px',marginTop:0,width:'100%',color:'#ff4444'},onClick:function(){var wipeMsg=tr('settings.wipeConfirm','This deletes all data.\\nLogs, endings, and session records will be lost.\\nThis cannot be undone.');if(cloud&&cloud.user)wipeMsg+='\\n\\n'+tr('settings.cloudWipeLocalOnly','Cloud save is not deleted here. Use Delete Cloud Data first if you also want to clear the cloud record.');setCfm({msg:wipeMsg,inputKey:tr('settings.deleteKey','DELETE'),action:function(){if(p.onFullReset)p.onFullReset();p.onClose()}})}},tr('settings.wipeAll','Delete All Data'))),
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
    var _restarting=useState(false),restarting=_restarting[0],setRestarting=_restarting[1];var _langCfm=useState(null),langCfm=_langCfm[0],setLangCfm=_langCfm[1];

    var applyLangReload=function(nextLang){
      if(window.TS_I18N)window.TS_I18N.setLocale(nextLang);
      setRestarting(nextLang);
      if(typeof window!=='undefined'&&window.location&&typeof window.location.reload==='function'){setTimeout(function(){window.location.reload()},1600)}
    };
    var closePanel=function(after){
      var nextLang=pendingLang||currentLang;
      if(window.TS_I18N&&nextLang!==currentLang){setLangCfm({next:nextLang});return}
      if(after)after();
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
    if(tab==='guide') content=h(SettingsProtocolTab);
    if(tab==='info') content=h(SettingsInfoTab);

    return h('div',{style:{position:'fixed',inset:0,background:'rgba(0,0,0,0.85)',zIndex:300,display:'flex',alignItems:'center',justifyContent:'center',padding:14,boxSizing:'border-box'},onClick:function(e){if(e.target===e.currentTarget)closePanel()}},
      h('div',{style:{width:'100%',maxWidth:400,maxHeight:'80vh',background:'rgba(3,7,8,.96)',border:'1px solid rgba(var(--ui-rgb),0.25)',padding:'16px 20px',display:'flex',flexDirection:'column',overflow:'hidden',boxShadow:'0 0 40px rgba(0,0,0,0.5), 0 0 8px rgba(var(--ui-rgb),0.05)'}},
        h('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12,paddingBottom:8,borderBottom:'1px solid rgba(var(--ui-rgb),0.15)'}},
          h('span',{style:{fontFamily:"'Share Tech Mono',monospace",fontSize:12,color:'var(--ui)',letterSpacing:2}},tr('settings.title','SETTINGS')),
          h('div',{style:{display:'flex',gap:6}},
            p.onMainMenu&&h('button',{style:{background:'none',border:'1px solid rgba(var(--ui-rgb),0.2)',color:'var(--ui)',fontFamily:"'Share Tech Mono',monospace",fontSize:10,padding:'3px 8px',cursor:'pointer'},onClick:function(){closePanel(p.onMainMenu)}},tr('settings.mainMenu','MENU')),
            h('button',{style:{background:'none',border:'1px solid rgba(var(--ui-rgb),0.2)',color:'var(--ui)',fontFamily:"'Share Tech Mono',monospace",fontSize:10,padding:'3px 8px',cursor:'pointer'},onClick:function(){closePanel()}},tr('settings.close','ESC')))),
        h('div',{style:{display:'flex',gap:4,marginBottom:12,flexWrap:'wrap'}},
          _settingsTabBtn('sound',tr('settings.tabs.sound','SOUND'),tab,setTab),
          _settingsTabBtn('save',tr('settings.tabs.save','SAVE'),tab,setTab),
          _settingsTabBtn('display',tr('settings.tabs.display','DISPLAY'),tab,setTab),
          _settingsTabBtn('guide',tr('settings.tabs.guide','PROTOCOL'),tab,setTab),
          _settingsTabBtn('info',tr('settings.tabs.info','INFO'),tab,setTab)),
        h('div',{style:{flex:1,overflowY:'auto',minHeight:0}},content))
      ,restarting?h('div',{style:{position:'fixed',top:'16%',left:'50%',transform:'translateX(-50%)',zIndex:320,background:'rgba(3,7,8,.97)',border:'1px solid rgba(var(--ui-rgb),.55)',borderRadius:4,padding:'10px 18px',fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:'var(--ui)',letterSpacing:1,textAlign:'center',whiteSpace:'pre-line',boxShadow:'0 0 24px rgba(var(--ui-rgb),.18)',animation:'fadeIn .25s ease'}},restarting==='en'?'⟳ Changing language — restarting session.':'⟳ 언어 변경 — 세션을 재시작합니다.'):null
      ,langCfm?h('div',{style:{position:'fixed',inset:0,background:'rgba(0,0,0,0.82)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:330},onClick:function(e){if(e.target===e.currentTarget){setPendingLang(currentLang);setLangCfm(null)}}},
        h('div',{style:{background:'rgba(3,7,8,.97)',border:'1px solid rgba(255,68,68,0.42)',padding:'22px 24px',maxWidth:300,textAlign:'center',boxShadow:'0 0 40px rgba(0,0,0,.6)'}},
          h('div',{style:{fontSize:13,color:'#ff5a48',marginBottom:18,lineHeight:1.7}},currentLang==='en'?'Changing the language will restart the session. Proceed?':'언어를 변경하면 세션을 재시작합니다. 진행하시겠습니까?'),
          h('div',{style:{display:'flex',gap:10,justifyContent:'center'}},
            h('button',{className:'btn',style:{fontSize:11,padding:'8px 16px',marginTop:0},onClick:function(){setPendingLang(currentLang);setLangCfm(null)}},tr('settings.cancel','취소')),
            h('button',{className:'btn btn-amber',style:{fontSize:11,padding:'8px 16px',marginTop:0},onClick:function(){var n=langCfm.next;setLangCfm(null);applyLangReload(n)}},tr('settings.confirm','확인'))))):null
    );
  };
})();
