(function(){
  if(typeof window==='undefined'||typeof React==='undefined')return;
  function OracleLinkBar(p){
    var state=React.useState(function(){return new Date()}),now=state[0],setNow=state[1];
    React.useEffect(function(){
      var t=setInterval(function(){setNow(new Date())},1000);
      return function(){clearInterval(t)};
    },[]);
    var pad=function(n){return String(n).padStart(2,'0')};
    var days=['SUN','MON','TUE','WED','THU','FRI','SAT'];
    var time=pad(now.getHours())+':'+pad(now.getMinutes())+':'+pad(now.getSeconds());
    var date='20██-'+pad(now.getMonth()+1)+'-'+pad(now.getDate())+' // '+days[now.getDay()];
    var bars=[18,34,26,48,22,30,16,42,36,20,28,18,34,24];
    return React.createElement('footer',{className:'oracle-link-bar','aria-label':'ORACLE LINK'},
      React.createElement('div',{className:'oracle-link-left'},
        React.createElement('span',{className:'oracle-link-dot','aria-hidden':true}),
        React.createElement('span',{className:'oracle-link-label'},'ORACLE LINK'),
        React.createElement('span',{className:'oracle-link-sub'},'ENCRYPTION: ACTIVE ✓'),
        React.createElement('span',{className:'oracle-link-sub oracle-link-sync'},'SYNC: STABLE')),
      React.createElement('div',{className:'oracle-link-wave','aria-hidden':true},
        bars.map(function(h,i){return React.createElement('i',{key:i,style:{height:h+'%'}})})),
      React.createElement('div',{className:'oracle-link-right'},
        React.createElement('span',{className:'oracle-link-time'},time),
        React.createElement('span',{className:'oracle-link-date'},date)));
  }
  window.OracleLinkBar=OracleLinkBar;
})();
