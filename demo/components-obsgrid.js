// components-obsgrid.js — ORACLE 관측 밀도 그리드 (등축 3D 기둥 스카이라인)
// 메인 메뉴 피드 배너 하단 오버레이. 표시 전용 — 데이터는 세이브 day/세션 시드로 결정적 생성.
// 연출: 기둥 차오름(0.9s) → 숨쉬기 + 간헐 스파이크(관측 포착). fx '끔'이면 정적 1회 렌더.
// 옵저버 레이어: 엔딩 F 또는 G 달성 세이브에선 수평선 위로 희미한 역상 그리드가 겹친다
// — ORACLE 의 관측망 위에 또 다른 관측자가 있다는 메타 암시 (다회차 보상 이스터에그).
function ObservationGrid(p){
  var ref=useRef(null);
  useEffect(function(){
    var canvas=ref.current;if(!canvas)return;
    var ctx=canvas.getContext('2d');
    var DPR=Math.min(2,window.devicePixelRatio||1);
    var fxMode='full';try{fxMode=JSON.parse(localStorage.getItem('ts_fxMode'))||'full'}catch(e){fxMode='full'}
    var fxOff=p.fxOff||fxMode==='off';
    var seed=p.seed||1;
    var observer=!!p.observer;
    var W=0,H=0,raf=0,killed=false;
    var t0=performance.now();
    var spike={c:-1,r:-1,at:-9999};

    function hash(a,b,c){var x=(a*374761393+b*668265263+c*2246822519)>>>0;x=(x^(x>>>13))*1274126177>>>0;return ((x^(x>>>16))>>>0)/4294967295}

    function size(){
      var el=canvas.parentNode;if(!el)return;
      W=el.clientWidth;H=el.clientHeight;
      canvas.width=W*DPR;canvas.height=H*DPR;
      canvas.style.width=W+'px';canvas.style.height=H+'px';
      ctx.setTransform(DPR,0,0,DPR,0,0);
    }
    size();
    var onRs=function(){size()};window.addEventListener('resize',onRs);

    function draw(now){
      if(killed)return;
      var el=(now-t0)/1000;
      var rise=fxOff?1:Math.min(1,el/0.9);rise=1-Math.pow(1-rise,3);
      ctx.clearRect(0,0,W,H);
      var cw=10,ch=5;                       // 등축 셀 폭/깊이(px)
      var cols=Math.max(8,Math.floor(W/cw)+4),rows=4;
      var maxH=H*0.85;   // .obsgrid 자체가 배너 하단 40%라 내부에선 크게
      var ox=W*0.5,oy=H-rows*ch-4;          // 그리드 원점(하단 중앙 기준)
      // 스파이크 갱신 (2.4s 주기)
      if(!fxOff&&el-spike.at>2.4){spike={c:Math.floor(hash(seed,Math.floor(el),7)*cols),r:Math.floor(hash(seed,Math.floor(el),11)*rows),at:el}}
      var spikeK=Math.max(0,1-(el-spike.at)/1.1);  // 스파이크 감쇠
      // 뒤→앞 페인터 순서
      for(var r=0;r<rows;r++){
        for(var c=0;c<cols;c++){
          var base=hash(seed,c,r);
          // 이웃 스무딩으로 도시 스카이라인 느낌
          var n=(hash(seed,c+1,r)+hash(seed,c-1<0?0:c-1,r)+hash(seed,c,r+1))/3;
          var hv=Math.pow(base*0.6+n*0.4,2.3)*0.9;  // 대부분 낮고 드물게 피크
          var breathe=fxOff?0:Math.sin(el*1.4+c*0.7+r*1.3)*0.03;
          var sp=(c===spike.c&&r===spike.r)?spikeK*0.5:0;
          var bh=Math.max(2,(hv+breathe+sp)*maxH*rise);
          var x=ox+(c-cols/2)*cw*0.98-(r-rows/2)*6;   // 살짝 사선 흐름
          var y=oy+r*ch;
          // 높이→색: 낮음 진초록, 높음 앰버
          var k=Math.max(0,Math.min(1,(hv-0.28)*2.2+sp));  // 앰버는 상위 피크만
          var cr=Math.round(60+k*180),cg=Math.round(200-k*40),cb=Math.round(120-k*70);
          var a=0.32+k*0.38;
          // 좌측면
          ctx.fillStyle='rgba('+Math.round(cr*0.45)+','+Math.round(cg*0.45)+','+Math.round(cb*0.45)+','+a+')';
          ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,y-bh);ctx.lineTo(x+cw/2,y-bh+ch/2);ctx.lineTo(x+cw/2,y+ch/2);ctx.closePath();ctx.fill();
          // 우측면
          ctx.fillStyle='rgba('+Math.round(cr*0.68)+','+Math.round(cg*0.68)+','+Math.round(cb*0.68)+','+a+')';
          ctx.beginPath();ctx.moveTo(x+cw,y);ctx.lineTo(x+cw,y-bh);ctx.lineTo(x+cw/2,y-bh+ch/2);ctx.lineTo(x+cw/2,y+ch/2);ctx.closePath();ctx.fill();
          // 상판
          ctx.fillStyle='rgba('+cr+','+cg+','+cb+','+Math.min(1,a+0.15)+')';
          ctx.beginPath();ctx.moveTo(x,y-bh);ctx.lineTo(x+cw/2,y-bh-ch/2);ctx.lineTo(x+cw,y-bh);ctx.lineTo(x+cw/2,y-bh+ch/2);ctx.closePath();ctx.fill();
          // 스파이크 글로우
          if(sp>0.05){ctx.fillStyle='rgba(255,196,90,'+(sp*0.5)+')';ctx.beginPath();ctx.arc(x+cw/2,y-bh-2,7+sp*8,0,Math.PI*2);ctx.fill()}
          // 옵저버 역상 (수평선 위 희미한 반전 기둥)
          if(observer){
            var ry=oy-rows*ch-6-r*ch;
            ctx.fillStyle='rgba(150,170,255,'+(a*0.10)+')';
            ctx.fillRect(x,ry- ch/2,cw,bh*0.5);
          }
        }
      }
      if(!fxOff)raf=requestAnimationFrame(draw);
    }
    raf=requestAnimationFrame(draw);
    return function(){killed=true;cancelAnimationFrame(raf);window.removeEventListener('resize',onRs)};
  },[p.seed,p.observer,p.fxOff]);
  return h('div',{className:'obsgrid','aria-hidden':true},h('canvas',{ref:ref}));
}
