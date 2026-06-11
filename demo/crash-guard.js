// TERMINAL SESSION — crash-guard.js
// 전역 크래시 안전망: 처리되지 않은 오류로 화면이 비었을 때(흰 화면)
// 복구 안내 오버레이를 띄운다. 앱이 살아 있는 동안의 오류는 기록만 한다.
// 의존성 없음 — React/i18n이 죽은 상황에서도 동작해야 하므로 순수 DOM만 사용.
(function(){
  if(window.__tiuCrashGuard)return;
  window.__tiuCrashGuard=true;
  var shown=false;
  var log=[];
  window.__tiuCrashLog=log;

  function record(kind,msg,src,line){
    var entry={kind:kind,msg:String(msg||'').slice(0,300),src:src||'',line:line||0,at:Date.now()};
    log.push(entry);
    if(log.length>8)log.shift();
    return entry;
  }

  function isNoise(msg){
    msg=String(msg||'');
    if(msg.indexOf('ResizeObserver loop')>=0)return true;
    if(msg.indexOf('play() request was interrupted')>=0)return true;
    return false;
  }

  function rootDead(){
    var root=document.getElementById('root');
    if(!root)return document.readyState!=='loading';
    return root.children.length===0;
  }

  function showOverlay(entry){
    if(shown)return;
    shown=true;
    try{
      var ov=document.createElement('div');
      ov.id='tiu-crash-overlay';
      ov.setAttribute('role','alertdialog');
      ov.style.cssText='position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;padding:20px;background:#020805;color:#bfe8cd;font-family:\'Share Tech Mono\',\'Noto Sans KR\',monospace,sans-serif;';
      var panel=document.createElement('div');
      panel.style.cssText='width:100%;max-width:420px;border:1px solid rgba(108,255,170,.4);background:linear-gradient(180deg,rgba(6,20,12,.98),rgba(3,10,7,.98));padding:22px 20px;box-shadow:0 0 30px rgba(62,255,167,.08);';
      var html='';
      html+='<div style="font-size:12px;letter-spacing:3px;color:#f0a030;margin-bottom:10px;">SYSTEM FAULT &mdash; RECOVERY READY</div>';
      html+='<div style="font-size:13px;line-height:1.7;margin-bottom:6px;">예기치 못한 오류로 화면 출력이 중단되었습니다.<br>진행 상황은 이 기기에 자동 저장되어 있습니다.</div>';
      html+='<div style="font-size:11px;line-height:1.6;color:rgba(191,232,205,.55);margin-bottom:14px;">An unexpected fault interrupted the display.<br>Your progress is stored safely on this device.</div>';
      if(entry&&entry.msg){
        html+='<div style="font-size:10px;line-height:1.5;color:rgba(108,255,170,.45);border-left:2px solid rgba(108,255,170,.3);padding-left:8px;margin-bottom:16px;word-break:break-all;">'+String(entry.msg).slice(0,140).replace(/&/g,'&amp;').replace(/</g,'&lt;')+'</div>';
      }
      panel.innerHTML=html;
      var btn=document.createElement('button');
      btn.type='button';
      btn.textContent='> 세션 재개 / RESUME SESSION _';
      btn.style.cssText='width:100%;min-height:46px;padding:11px 16px;background:rgba(240,160,48,.07);border:1px solid rgba(240,160,48,.55);border-left:3px solid #f0a030;color:#f0a030;font:inherit;font-size:13px;font-weight:700;letter-spacing:1.5px;cursor:pointer;text-align:left;';
      btn.onclick=function(){try{location.reload()}catch(e){location.href=location.pathname}};
      panel.appendChild(btn);
      ov.appendChild(panel);
      (document.body||document.documentElement).appendChild(ov);
    }catch(e){/* 오버레이 자체 실패 시 조용히 포기 — 콘솔 로그는 남아 있음 */}
  }

  function maybeShow(entry){
    // 앱이 살아 있으면(루트에 화면이 그려져 있으면) 방해하지 않는다.
    // React가 스스로 복구할 시간을 준 뒤 흰 화면일 때만 개입한다.
    setTimeout(function(){
      if(!shown&&rootDead())showOverlay(entry);
    },450);
  }

  window.addEventListener('error',function(ev){
    if(ev&&ev.target&&ev.target!==window&&(ev.target.tagName==='SCRIPT'||ev.target.tagName==='LINK'||ev.target.tagName==='IMG')){
      // 리소스 로드 실패: 스크립트 실패만 치명 후보로 본다
      var src=ev.target.src||ev.target.href||'';
      var entry=record('resource',(ev.target.tagName||'')+' load failed',src,0);
      if(ev.target.tagName==='SCRIPT')maybeShow(entry);
      return;
    }
    var msg=ev&&ev.message;
    if(isNoise(msg))return;
    maybeShow(record('error',msg,ev&&ev.filename,ev&&ev.lineno));
  },true);

  window.addEventListener('unhandledrejection',function(ev){
    var reason=ev&&ev.reason;
    var msg=reason&&(reason.message||String(reason));
    if(isNoise(msg))return;
    maybeShow(record('rejection',msg,'',0));
  });
})();
