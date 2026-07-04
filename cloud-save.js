// cloud-save.js - optional Google/Firebase cloud save bridge for full version.
(function(){
  var root=window;
  var SDK_VERSION='12.7.0';
  var SDK_BASE='https://www.gstatic.com/firebasejs/'+SDK_VERSION+'/';
  var CURRENT_KEYS=[
    'ts_game','ts_logs','ts_trust','ts_usedDlg','ts_usedEvening','ts_seenArchive','ts_facility',
    'ts_research','ts_combos','ts_evidence_used','ts_resourceReserveUsed','ts_onceShown','ts_activeSpecs',
    'ts_sessionDeck','ts_recentNews','ts_recentRewards','ts_activeMission','ts_resumePhase',
    'ts_pendingBriefing','ts_resumeHeadlines','ts_resumeRewards','ts_resumeDialogueIndex','ts_eveningLineState',
    'ts_act2_reached','ts_observer_proto'
  ];
  var SNAP_KEYS=['ts_snap_1','ts_snap_2','ts_snap_3'];
  var PROGRESS_KEYS=['ts_endings','ts_sessions','ts_achievements','ts_minigamesSeen','ts_lastEnding'];
  var SETTINGS_KEYS=['ts_locale','ts_muted','ts_volume','ts_sfxVol','ts_fontSize','ts_fxMode'];
  var WATCH_PREFIXES=['ts_observer_proto_roll_'];
  var WATCH_KEYS={};
  CURRENT_KEYS.concat(SNAP_KEYS).concat(PROGRESS_KEYS).concat(SETTINGS_KEYS).forEach(function(k){WATCH_KEYS[k]=true});
  function isWatchKey(key){
    if(WATCH_KEYS[key])return true;
    for(var i=0;i<WATCH_PREFIXES.length;i++)if(String(key||'').indexOf(WATCH_PREFIXES[i])===0)return true;
    return false;
  }

  function hasConfig(){
    var c=root.TIU_FIREBASE_CONFIG;
    return !!(c&&c.apiKey&&c.authDomain&&c.projectId&&String(c.apiKey).indexOf('YOUR_')!==0&&String(c.projectId).indexOf('YOUR_')!==0);
  }
  function loadScript(src){
    return new Promise(function(resolve,reject){
      var existing=document.querySelector('script[data-tiu-cloud-src="'+src+'"]');
      if(existing){
        if(existing.getAttribute('data-loaded')==='1')resolve();
        else existing.addEventListener('load',function(){resolve()},{once:true});
        return;
      }
      var s=document.createElement('script');
      s.src=src;
      s.async=true;
      s.setAttribute('data-tiu-cloud-src',src);
      s.onload=function(){s.setAttribute('data-loaded','1');resolve()};
      s.onerror=function(){reject(new Error('SDK_LOAD_FAILED'))};
      document.head.appendChild(s);
    });
  }
  function readJson(key){
    try{
      var raw=localStorage.getItem(key);
      if(raw===null)return undefined;
      return JSON.parse(raw);
    }catch(e){
      try{return localStorage.getItem(key)}catch(e2){return undefined}
    }
  }
  function writeJson(key,value){
    try{
      if(value===undefined||value===null)localStorage.removeItem(key);
      else localStorage.setItem(key,JSON.stringify(value));
    }catch(e){}
  }
  function readPack(keys,includePrefixes){
    var out={};
    keys.forEach(function(k){
      var v=readJson(k);
      if(v!==undefined)out[k]=v;
    });
    if(!includePrefixes)return out;
    try{
      for(var i=0;i<localStorage.length;i++){
        var key=localStorage.key(i);
        var prefixed=false;
        for(var p=0;p<WATCH_PREFIXES.length;p++)if(String(key||'').indexOf(WATCH_PREFIXES[p])===0){prefixed=true;break}
        if(prefixed&&out[key]===undefined){
          var pv=readJson(key);
          if(pv!==undefined)out[key]=pv;
        }
      }
    }catch(e){}
    return out;
  }
  function applyPack(pack){
    if(!pack)return;
    Object.keys(pack).forEach(function(k){
      if(isWatchKey(k))writeJson(k,pack[k]);
    });
  }
  function cleanUser(u){
    if(!u)return null;
    return {uid:u.uid||'',email:u.email||'',displayName:u.displayName||''};
  }
  function nowLabel(ts){
    if(!ts)return '';
    try{
      var d=new Date(ts);
      return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')+' '+String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');
    }catch(e){return ''}
  }
  function timestampToMillis(v){
    if(!v)return 0;
    if(typeof v==='number')return v;
    if(typeof v==='string')return Date.parse(v)||0;
    if(typeof v.toMillis==='function')return v.toMillis();
    if(typeof v.seconds==='number')return v.seconds*1000+Math.floor((v.nanoseconds||0)/1000000);
    return 0;
  }
  function saveSummary(data,meta){
    data=data||{};
    meta=meta||{};
    var keys=Object.keys(data);
    var game=data.ts_game||{};
    var stats=game.stats||{};
    var ts=timestampToMillis(game.timestamp)||timestampToMillis(meta.clientUpdatedAt)||timestampToMillis(meta.serverUpdatedAt);
    return {
      hasData:keys.length>0,
      hasGame:!!(game&&game.stats),
      day:parseInt(stats.day||0,10)||0,
      act:parseInt(game.act||1,10)||1,
      revision:parseInt(game.saveRevision||0,10)||0,
      timestamp:ts,
      timestampLabel:nowLabel(ts),
      sessions:parseInt(data.ts_sessions||0,10)||0,
      logs:Array.isArray(data.ts_logs)?data.ts_logs.length:0,
      endings:Array.isArray(data.ts_endings)?data.ts_endings.length:0,
      // 충돌 선택 판단용 상세: 시설(완료+승인)/연구/증거 조합 진행
      facility:(function(){var f=data.ts_facility||{};var a=Array.isArray(f.completed)?f.completed.length:0;var b=Array.isArray(f.approved)?f.approved.length:0;return a+b})(),
      research:(function(){var r=data.ts_research;return (r&&typeof r==='object')?Object.keys(r).length:0})(),
      combos:Array.isArray(data.ts_combos)?data.ts_combos.length:0
    };
  }
  function compareSummaries(local,cloud){
    local=local||saveSummary({});
    cloud=cloud||saveSummary({});
    if(!local.hasData&&!cloud.hasData)return {type:'empty',recommendation:'none',requiresChoice:false};
    if(local.hasData&&!cloud.hasData)return {type:'cloud_empty',recommendation:'local',requiresChoice:false};
    if(!local.hasData&&cloud.hasData)return {type:'local_empty',recommendation:'cloud',requiresChoice:true};
    if(local.revision&&cloud.revision&&local.revision===cloud.revision&&local.timestamp===cloud.timestamp)return {type:'synced',recommendation:'none',requiresChoice:false};
    if(local.revision!==cloud.revision){
      return {type:'revision_mismatch',recommendation:local.revision>cloud.revision?'local':'cloud',requiresChoice:true};
    }
    if(local.timestamp!==cloud.timestamp){
      return {type:'timestamp_mismatch',recommendation:local.timestamp>cloud.timestamp?'local':'cloud',requiresChoice:true};
    }
    if(local.day!==cloud.day||local.act!==cloud.act){
      return {type:'progress_mismatch',recommendation:(local.act>cloud.act||(local.act===cloud.act&&local.day>cloud.day))?'local':'cloud',requiresChoice:true};
    }
    if(local.logs!==cloud.logs||local.endings!==cloud.endings||local.sessions!==cloud.sessions){
      return {type:'meta_mismatch',recommendation:(local.sessions>cloud.sessions||local.endings>cloud.endings)?'local':'cloud',requiresChoice:true};
    }
    return {type:'synced',recommendation:'none',requiresChoice:false};
  }

  var CloudSave={
    status:'unconfigured',
    lastError:'',
    lastSyncAt:0,
    pending:false,
    user:null,
    auth:null,
    db:null,
    readyPromise:null,
    flushTimer:null,
    isApplyingRemote:false,
    conflict:null,
    localSummary:null,
    cloudSummary:null,
    postSignInUid:'',
    listeners:[],
    isConfigured:function(){return hasConfig()},
    getState:function(){
      return {
        status:this.status,
        lastError:this.lastError,
        lastSyncAt:this.lastSyncAt,
        lastSyncLabel:nowLabel(this.lastSyncAt),
        pending:this.pending,
        user:this.user,
        isConfigured:hasConfig(),
        conflict:this.conflict,
        localSummary:this.localSummary,
        cloudSummary:this.cloudSummary
      };
    },
    subscribe:function(fn){
      if(typeof fn!=='function')return function(){};
      this.listeners.push(fn);
      try{fn(this.getState())}catch(e){}
      var self=this;
      return function(){self.listeners=self.listeners.filter(function(x){return x!==fn})};
    },
    emit:function(){
      var state=this.getState();
      this.listeners.slice().forEach(function(fn){try{fn(state)}catch(e){}});
    },
    setStatus:function(status,error){
      this.status=status;
      this.lastError=error?String(error.message||error):'';
      this.emit();
    },
    init:function(){
      this.installStorageHook();
      if(!hasConfig()){this.setStatus('unconfigured');return Promise.resolve(this.getState())}
      return this.ensureReady().catch(function(e){CloudSave.setStatus('error',e);return CloudSave.getState()});
    },
    ensureReady:function(){
      if(this.readyPromise)return this.readyPromise;
      if(!hasConfig()){this.setStatus('unconfigured');return Promise.reject(new Error('FIREBASE_CONFIG_MISSING'))}
      var self=this;
      this.setStatus('loading');
      this.readyPromise=loadScript(SDK_BASE+'firebase-app-compat.js')
        .then(function(){return loadScript(SDK_BASE+'firebase-auth-compat.js')})
        .then(function(){return loadScript(SDK_BASE+'firebase-firestore-compat.js')})
        .then(function(){
          if(!root.firebase)throw new Error('FIREBASE_SDK_MISSING');
          if(!root.firebase.apps||!root.firebase.apps.length)root.firebase.initializeApp(root.TIU_FIREBASE_CONFIG);
          self.auth=root.firebase.auth();
          self.db=root.firebase.firestore();
          self.auth.onAuthStateChanged(function(user){
            self.user=cleanUser(user);
            if(!user){
              self.postSignInUid='';
              self.conflict=null;
              self.localSummary=self.getLocalSummary();
              self.cloudSummary=null;
              self.setStatus('signed_out');
              return;
            }
            self.setStatus('connected');
            if(self.postSignInUid!==self.user.uid){
              self.postSignInUid=self.user.uid;
              self.handlePostSignIn().catch(function(){});
            }else if(self.pending&&!self.conflict){
              self.scheduleFlush(500);
            }
          });
          return self.getState();
        })
        .catch(function(e){self.readyPromise=null;self.setStatus('error',e);throw e});
      return this.readyPromise;
    },
    installStorageHook:function(){
      try{
        if(Storage.prototype.__tiuCloudSavePatched)return;
        var rawSet=Storage.prototype.setItem;
        var rawRemove=Storage.prototype.removeItem;
        Storage.prototype.setItem=function(k,v){
          var r=rawSet.apply(this,arguments);
          try{if(this===localStorage&&root.CloudSave)root.CloudSave.markDirty(k)}catch(e){}
          return r;
        };
        Storage.prototype.removeItem=function(k){
          var r=rawRemove.apply(this,arguments);
          try{if(this===localStorage&&root.CloudSave)root.CloudSave.markDirty(k)}catch(e){}
          return r;
        };
        Storage.prototype.__tiuCloudSavePatched=true;
      }catch(e){}
    },
    signIn:function(){
      var self=this;
      return this.ensureReady().then(function(){
        var provider=new root.firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({prompt:'select_account'});
        var mobile=/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent||'');
        if(mobile&&self.auth.signInWithRedirect)return self.auth.signInWithRedirect(provider);
        return self.auth.signInWithPopup(provider).catch(function(e){
          var code=String(e&&e.code||'');
          if(self.auth.signInWithRedirect&&(code.indexOf('popup')>=0||code.indexOf('operation-not-supported')>=0))return self.auth.signInWithRedirect(provider);
          throw e;
        });
      }).catch(function(e){self.setStatus('error',e);throw e});
    },
    signOut:function(){
      var self=this;
      return this.ensureReady().then(function(){return self.auth.signOut()}).catch(function(e){self.setStatus('error',e);throw e});
    },
    userRef:function(){
      if(!this.db||!this.user||!this.user.uid)throw new Error('CLOUD_USER_MISSING');
      return this.db.collection('users').doc(this.user.uid);
    },
    getLocalSummary:function(){
      return saveSummary(readPack(CURRENT_KEYS.concat(PROGRESS_KEYS).concat(SETTINGS_KEYS),true),{});
    },
    getCloudCurrentDoc:function(){
      var self=this;
      return this.ensureReady().then(function(){
        if(!self.user)throw new Error('GOOGLE_SIGN_IN_REQUIRED');
        return self.userRef().collection('saves').doc('current').get();
      });
    },
    getCloudSummary:function(){
      return this.getCloudCurrentDoc().then(function(doc){
        if(!doc||!doc.exists)return saveSummary({});
        var body=doc.data()||{};
        return saveSummary(body.data||{},body);
      });
    },
    handlePostSignIn:function(){
      var self=this;
      return this.checkConflict({autoUploadEmpty:true}).then(function(conflict){
        if(conflict&&conflict.requiresChoice)return conflict;
        if(self.pending&&!self.conflict)self.scheduleFlush(500);
        return conflict;
      });
    },
    checkConflict:function(opts){
      opts=opts||{};
      var self=this;
      return this.ensureReady().then(function(){
        if(!self.user)throw new Error('GOOGLE_SIGN_IN_REQUIRED');
        self.setStatus('checking');
        var local=self.getLocalSummary();
        return self.getCloudSummary().then(function(cloud){
          var cmp=compareSummaries(local,cloud);
          var conflict={
            type:cmp.type,
            recommendation:cmp.recommendation,
            requiresChoice:cmp.requiresChoice,
            local:local,
            cloud:cloud,
            checkedAt:Date.now()
          };
          self.localSummary=local;
          self.cloudSummary=cloud;
          if(cmp.type==='cloud_empty'&&opts.autoUploadEmpty){
            self.conflict=null;
            return self.uploadCurrent({silentConflict:true}).then(function(){return conflict});
          }
          self.conflict=cmp.requiresChoice?conflict:null;
          self.setStatus(cmp.requiresChoice?'conflict':'connected');
          return conflict;
        });
      }).catch(function(e){self.setStatus('error',e);throw e});
    },
    buildDoc:function(keys,type){
      var data=readPack(keys,type==='current');
      var game=data.ts_game||{};
      return {
        schemaVersion:1,
        type:type||'current',
        buildVersion:root.BUILD_VER||0,
        saveRevision:(game&&parseInt(game.saveRevision,10))||0,
        clientUpdatedAt:Date.now(),
        serverUpdatedAt:root.firebase.firestore.FieldValue.serverTimestamp(),
        user:this.user,
        data:data
      };
    },
    uploadCurrent:function(opts){
      opts=opts||{};
      var self=this;
      return this.ensureReady().then(function(){
        if(!self.user)throw new Error('GOOGLE_SIGN_IN_REQUIRED');
        self.setStatus('syncing');
        var ref=self.userRef();
        var batch=self.db.batch();
        batch.set(ref.collection('saves').doc('current'),self.buildDoc(CURRENT_KEYS.concat(SETTINGS_KEYS),'current'),{merge:true});
        batch.set(ref.collection('meta').doc('progress'),self.buildDoc(PROGRESS_KEYS,'progress'),{merge:true});
        SNAP_KEYS.forEach(function(k,idx){
          var snap=readJson(k);
          var snapRef=ref.collection('saves').doc('snap_'+(idx+1));
          if(snap!==undefined)batch.set(snapRef,self.buildDoc([k],'snapshot'),{merge:true});
          else batch.delete(snapRef);
        });
        return batch.commit().then(function(){
          self.pending=false;
          self.conflict=null;
          self.localSummary=self.getLocalSummary();
          self.cloudSummary=self.localSummary;
          self.lastSyncAt=Date.now();
          self.setStatus('connected');
          return self.getState();
        });
      }).catch(function(e){self.setStatus('error',e);throw e});
    },
    restoreCloud:function(opts){
      opts=opts||{};
      var self=this;
      return this.ensureReady().then(function(){
        if(!self.user)throw new Error('GOOGLE_SIGN_IN_REQUIRED');
        self.setStatus('restoring');
        var ref=self.userRef();
        return Promise.all([
          ref.collection('saves').doc('current').get(),
          ref.collection('meta').doc('progress').get(),
          ref.collection('saves').doc('snap_1').get(),
          ref.collection('saves').doc('snap_2').get(),
          ref.collection('saves').doc('snap_3').get()
        ]).then(function(docs){
          self.isApplyingRemote=true;
          try{
            docs.forEach(function(doc){
              if(!doc||!doc.exists)return;
              var data=doc.data()||{};
              applyPack(data.data||{});
            });
          }finally{
            self.isApplyingRemote=false;
          }
          self.pending=false;
          self.conflict=null;
          self.localSummary=self.getLocalSummary();
          self.cloudSummary=self.localSummary;
          self.lastSyncAt=Date.now();
          self.setStatus('connected');
          if(opts.reload!==false)setTimeout(function(){try{root.location.reload()}catch(e){}},250);
          return self.getState();
        });
      }).catch(function(e){self.isApplyingRemote=false;self.setStatus('error',e);throw e});
    },
    deleteCloudData:function(){
      var self=this;
      return this.ensureReady().then(function(){
        if(!self.user)throw new Error('GOOGLE_SIGN_IN_REQUIRED');
        var ref=self.userRef();
        var batch=self.db.batch();
        batch.delete(ref.collection('saves').doc('current'));
        batch.delete(ref.collection('saves').doc('snap_1'));
        batch.delete(ref.collection('saves').doc('snap_2'));
        batch.delete(ref.collection('saves').doc('snap_3'));
        batch.delete(ref.collection('meta').doc('progress'));
        return batch.commit().then(function(){self.conflict=null;self.cloudSummary=saveSummary({});self.lastSyncAt=Date.now();self.setStatus('connected');return self.getState()});
      }).catch(function(e){self.setStatus('error',e);throw e});
    },
    resolveConflict:function(choice){
      if(choice==='cloud')return this.restoreCloud({reload:true});
      if(choice==='local')return this.uploadCurrent();
      return Promise.reject(new Error('UNKNOWN_CONFLICT_RESOLUTION'));
    },
    markDirty:function(key){
      if(this.isApplyingRemote||!isWatchKey(key))return;
      if(!hasConfig()||!this.user)return;
      this.pending=true;
      if(this.conflict){this.setStatus('conflict');return}
      this.setStatus('pending');
      this.scheduleFlush(2500);
    },
    scheduleFlush:function(delay){
      var self=this;
      clearTimeout(this.flushTimer);
      this.flushTimer=setTimeout(function(){self.uploadCurrent().catch(function(){})},delay||2500);
    }
  };

  root.CloudSave=CloudSave;
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){CloudSave.init()},{once:true});
  else CloudSave.init();
})();
