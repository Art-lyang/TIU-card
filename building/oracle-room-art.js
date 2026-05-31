/* ================================================================
   ORACLE Korea Branch — Room SVG Art Templates (Part 1: Indoor)
   Generates inline SVG for mobile room cards
   ================================================================ */
var _RA_G='rgba(145,255,106,',_RA_O='rgba(240,160,48,';
var _RA_floor='<rect x="10" y="88" width="160" height="32" fill="url(#rg)" opacity=".5"/><line x1="10" y1="88" x2="170" y2="88" stroke="'+_RA_G+'.12)" stroke-width=".5"/>';
var _RA_wall='<rect x="10" y="15" width="160" height="73" fill="none" stroke="'+_RA_G+'.08)" stroke-width=".5"/>';
var _RA_base=function(inner,glow){return'<svg viewBox="0 0 180 120" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="rg" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M12 0L0 0 0 12" fill="none" stroke="'+_RA_G+'.05)" stroke-width=".5"/></pattern><radialGradient id="ag" cx="50%" cy="65%" r="55%"><stop offset="0%" stop-color="'+(glow||'#9dff74')+'" stop-opacity=".06"/><stop offset="100%" stop-color="#9dff74" stop-opacity="0"/></radialGradient></defs><rect width="180" height="120" fill="url(#ag)"/>'+_RA_floor+_RA_wall+inner+'</svg>'};
var _RA_mon=function(x,y,w,h){return'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="1" fill="'+_RA_G+'.04)" stroke="'+_RA_G+'.35)" stroke-width=".7"/><rect x="'+(x+2)+'" y="'+(y+1)+'" width="'+(w-4)+'" height="'+(h-3)+'" fill="'+_RA_G+'.08)"/>'};
var _RA_led=function(x,y,c,op){return'<circle cx="'+x+'" cy="'+y+'" r="1.2" fill="'+(c||'#9dff74')+'" opacity="'+(op||'.5')+'"/>'};
var _RA_box=function(x,y,w,h,op){return'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="1" fill="'+_RA_G+(op||'.07')+')" stroke="'+_RA_G+'.1)" stroke-width=".3"/>'};
var _RA_types={
security:function(){var G=_RA_G,led=_RA_led,mon=_RA_mon;return _RA_base(
  mon(50,22,24,16)+mon(76,22,24,16)+mon(102,22,24,16)+
  '<line x1="53" y1="30" x2="70" y2="30" stroke="'+G+'.25)" stroke-width=".5"/>'+
  '<polyline points="79,30 82,27 85,33 88,28 91,32 94,29" fill="none" stroke="#9dff74" stroke-width=".6"/>'+
  '<rect x="104" y="25" width="18" height="10" fill="none" stroke="'+G+'.2)" stroke-width=".3"/><circle cx="110" cy="30" r="1.5" fill="#9dff74" opacity=".5"/>'+
  '<rect x="48" y="40" width="80" height="4" rx="1" fill="'+G+'.06)" stroke="'+G+'.15)" stroke-width=".5"/>'+
  '<rect x="18" y="20" width="16" height="52" rx="1" fill="'+G+'.03)" stroke="'+G+'.18)" stroke-width=".6"/>'+
  led(24,28)+led(30,28,'#9dff74','.3')+led(24,34)+led(30,34,'#ff6644','.3')+led(24,40)+led(30,40)+
  '<rect x="146" y="25" width="14" height="42" rx="1" fill="'+G+'.03)" stroke="'+G+'.15)" stroke-width=".5"/>'+
  '<line x1="150" y1="30" x2="150" y2="52" stroke="'+G+'.18)" stroke-width="1.5"/><line x1="153" y1="30" x2="153" y2="48" stroke="'+G+'.14)" stroke-width="1.5"/><line x1="156" y1="30" x2="156" y2="50" stroke="'+G+'.16)" stroke-width="1.5"/>'+
  '<ellipse cx="90" cy="106" rx="40" ry="6" fill="'+G+'.03)"/>')},
operations:function(){var G=_RA_G,mon=_RA_mon;return _RA_base(
  '<rect x="40" y="40" width="100" height="30" rx="2" fill="'+G+'.04)" stroke="'+G+'.2)" stroke-width=".7"/>'+
  mon(55,20,30,16)+mon(90,20,30,16)+
  '<line x1="58" y1="28" x2="80" y2="28" stroke="'+G+'.2)" stroke-width=".4"/><line x1="93" y1="26" x2="115" y2="26" stroke="'+G+'.15)" stroke-width=".4"/>'+
  '<line x1="93" y1="29" x2="110" y2="29" stroke="'+G+'.1)" stroke-width=".4"/>'+
  '<ellipse cx="60" cy="78" rx="8" ry="3" fill="'+G+'.04)" stroke="'+G+'.1)" stroke-width=".4"/>'+
  '<ellipse cx="90" cy="78" rx="8" ry="3" fill="'+G+'.04)" stroke="'+G+'.1)" stroke-width=".4"/>'+
  '<ellipse cx="120" cy="78" rx="8" ry="3" fill="'+G+'.04)" stroke="'+G+'.1)" stroke-width=".4"/>'+
  '<ellipse cx="90" cy="106" rx="45" ry="6" fill="'+G+'.03)"/>')},
research:function(){var G=_RA_G,mon=_RA_mon;return _RA_base(
  '<rect x="30" y="42" width="55" height="22" rx="1" fill="'+G+'.04)" stroke="'+G+'.2)" stroke-width=".6"/>'+
  '<rect x="35" y="36" width="5" height="8" rx="1" fill="'+G+'.12)"/><rect x="43" y="37" width="4" height="7" rx="1" fill="'+G+'.08)"/>'+
  '<line x1="52" y1="36" x2="52" y2="43" stroke="'+G+'.2)" stroke-width="1.2"/><circle cx="52" cy="36" r="3" fill="none" stroke="'+G+'.15)" stroke-width=".5"/>'+
  '<line x1="70" y1="38" x2="70" y2="50" stroke="'+G+'.25)" stroke-width="1.5"/><circle cx="70" cy="36" r="2" fill="none" stroke="'+G+'.3)" stroke-width=".6"/><rect x="66" y="50" width="8" height="3" rx=".5" fill="'+G+'.08)"/>'+
  mon(110,24,40,20)+
  '<line x1="114" y1="32" x2="145" y2="32" stroke="'+G+'.2)" stroke-width=".4"/><line x1="114" y1="35" x2="138" y2="35" stroke="'+G+'.15)" stroke-width=".4"/>'+
  '<rect x="110" y="46" width="40" height="4" rx="1" fill="'+G+'.06)" stroke="'+G+'.12)" stroke-width=".4"/>'+
  '<ellipse cx="90" cy="106" rx="40" ry="6" fill="'+G+'.03)"/>')},
medical:function(){var G=_RA_G;return _RA_base(
  '<rect x="22" y="45" width="42" height="18" rx="2" fill="'+G+'.04)" stroke="'+G+'.2)" stroke-width=".6"/><rect x="22" y="45" width="10" height="18" rx="2" fill="'+G+'.06)"/>'+
  '<line x1="30" y1="50" x2="58" y2="50" stroke="'+G+'.1)" stroke-width="1.5"/>'+
  '<rect x="66" y="40" width="14" height="10" rx="1" fill="'+G+'.04)" stroke="'+G+'.3)" stroke-width=".5"/>'+
  '<polyline points="68,45 70,42 72,48 74,44 76,46 78,43" fill="none" stroke="#9dff74" stroke-width=".6"/>'+
  '<line x1="85" y1="28" x2="85" y2="68" stroke="'+G+'.2)" stroke-width=".7"/><rect x="81" y="26" width="8" height="5" rx="1" fill="'+G+'.06)" stroke="'+G+'.18)" stroke-width=".4"/>'+
  '<rect x="110" y="22" width="42" height="45" rx="1" fill="'+G+'.03)" stroke="'+G+'.16)" stroke-width=".5"/>'+
  '<line x1="112" y1="34" x2="150" y2="34" stroke="'+G+'.1)" stroke-width=".3"/><line x1="112" y1="46" x2="150" y2="46" stroke="'+G+'.1)" stroke-width=".3"/>'+
  '<rect x="115" y="24" width="5" height="8" rx="1" fill="'+G+'.1)"/><rect x="122" y="25" width="4" height="7" rx="1" fill="'+G+'.07)"/><rect x="128" y="24" width="5" height="8" rx="1" fill="'+G+'.09)"/>'+
  '<line x1="140" y1="38" x2="140" y2="43" stroke="'+G+'.25)" stroke-width="1"/><line x1="137" y1="40.5" x2="143" y2="40.5" stroke="'+G+'.25)" stroke-width="1"/>'+
  '<ellipse cx="90" cy="106" rx="40" ry="6" fill="'+G+'.03)"/>')},
logistics:function(){var G=_RA_G,box=_RA_box;return _RA_base(
  '<rect x="18" y="20" width="35" height="58" rx="1" fill="'+G+'.02)" stroke="'+G+'.16)" stroke-width=".5"/>'+
  '<line x1="19" y1="34" x2="52" y2="34" stroke="'+G+'.1)" stroke-width=".3"/><line x1="19" y1="48" x2="52" y2="48" stroke="'+G+'.1)" stroke-width=".3"/><line x1="19" y1="62" x2="52" y2="62" stroke="'+G+'.1)" stroke-width=".3"/>'+
  box(21,22,13,10)+box(36,23,12,9)+box(21,36,16,10)+box(22,50,10,10)+box(34,51,14,9)+
  '<rect x="130" y="20" width="30" height="58" rx="1" fill="'+G+'.02)" stroke="'+G+'.14)" stroke-width=".5"/>'+
  '<line x1="131" y1="34" x2="159" y2="34" stroke="'+G+'.1)" stroke-width=".3"/><line x1="131" y1="48" x2="159" y2="48" stroke="'+G+'.1)" stroke-width=".3"/>'+
  box(133,22,10,10)+box(145,23,12,9)+box(133,36,20,10)+box(133,50,10,10)+
  '<rect x="68" y="55" width="32" height="16" rx="1" fill="'+G+'.04)" stroke="'+G+'.14)" stroke-width=".4"/>'+
  '<circle cx="73" cy="73" r="3" fill="none" stroke="'+G+'.18)" stroke-width=".5"/><circle cx="95" cy="73" r="3" fill="none" stroke="'+G+'.18)" stroke-width=".5"/>'+
  box(72,47,14,9,'.08')+box(88,49,10,7,'.06')+
  '<ellipse cx="90" cy="106" rx="40" ry="6" fill="'+G+'.03)"/>')},
command:function(){var G=_RA_G,O=_RA_O;return _RA_base(
  '<rect x="30" y="18" width="120" height="45" rx="2" fill="'+G+'.03)" stroke="'+G+'.3)" stroke-width="1"/>'+
  '<rect x="34" y="21" width="112" height="39" fill="'+G+'.04)"/>'+
  '<circle cx="90" cy="36" r="10" fill="none" stroke="'+O+'.25)" stroke-width=".8"/><circle cx="90" cy="36" r="4" fill="none" stroke="'+O+'.15)" stroke-width=".4"/><circle cx="90" cy="36" r="1.5" fill="'+O+'.3)"/>'+
  '<text x="90" y="52" text-anchor="middle" fill="'+O+'.3)" font-family="monospace" font-size="4" letter-spacing="2">ORACLE</text>'+
  '<line x1="36" y1="28" x2="60" y2="28" stroke="'+G+'.12)" stroke-width=".4"/><line x1="120" y1="28" x2="144" y2="28" stroke="'+G+'.12)" stroke-width=".4"/>'+
  '<rect x="25" y="66" width="130" height="6" rx="1" fill="'+G+'.06)" stroke="'+G+'.15)" stroke-width=".5"/>'+
  '<rect x="55" y="68" width="30" height="3" rx=".5" fill="'+G+'.08)" stroke="'+G+'.1)" stroke-width=".3"/>'+
  '<rect x="95" y="68" width="20" height="3" rx=".5" fill="'+G+'.06)" stroke="'+G+'.08)" stroke-width=".3"/>'+
  '<ellipse cx="90" cy="106" rx="45" ry="6" fill="'+G+'.04)"/>')},
tech:function(){var G=_RA_G,led=_RA_led,mon=_RA_mon;return _RA_base(
  '<rect x="20" y="20" width="22" height="55" rx="1" fill="'+G+'.03)" stroke="'+G+'.2)" stroke-width=".6"/>'+
  led(28,28)+led(36,28)+led(28,34)+led(36,34,'#ff6644','.3')+led(28,40)+led(36,40)+
  '<line x1="23" y1="48" x2="39" y2="48" stroke="'+G+'.1)" stroke-width=".4"/><line x1="23" y1="54" x2="39" y2="54" stroke="'+G+'.1)" stroke-width=".4"/>'+led(28,60)+led(36,60)+
  '<rect x="48" y="20" width="22" height="55" rx="1" fill="'+G+'.03)" stroke="'+G+'.2)" stroke-width=".6"/>'+
  led(56,28)+led(64,28,'#9dff74','.6')+led(56,34)+led(64,34)+led(56,40,'#9dff74','.6')+led(64,40)+
  '<line x1="51" y1="48" x2="67" y2="48" stroke="'+G+'.1)" stroke-width=".4"/>'+led(56,54)+led(64,54,'#ff6644','.2')+
  '<rect x="76" y="20" width="22" height="55" rx="1" fill="'+G+'.03)" stroke="'+G+'.2)" stroke-width=".6"/>'+
  led(84,28)+led(92,28)+led(84,34,'#9dff74','.4')+led(92,34)+led(84,40)+led(92,40,'#9dff74','.6')+
  '<path d="M42,45 Q46,45 48,40" fill="none" stroke="'+G+'.12)" stroke-width=".6"/><path d="M70,45 Q74,45 76,40" fill="none" stroke="'+G+'.12)" stroke-width=".6"/>'+
  mon(115,30,35,22)+
  '<line x1="118" y1="38" x2="145" y2="38" stroke="'+G+'.2)" stroke-width=".4"/><line x1="118" y1="42" x2="140" y2="42" stroke="'+G+'.15)" stroke-width=".4"/><line x1="118" y1="46" x2="142" y2="46" stroke="'+G+'.1)" stroke-width=".4"/>'+
  '<rect x="115" y="54" width="35" height="4" rx="1" fill="'+G+'.06)" stroke="'+G+'.12)" stroke-width=".4"/>'+
  '<ellipse cx="90" cy="106" rx="40" ry="6" fill="'+G+'.03)"/>')},
staff:function(){var G=_RA_G,led=_RA_led;return _RA_base(
  '<rect x="25" y="40" width="45" height="20" rx="3" fill="'+G+'.05)" stroke="'+G+'.15)" stroke-width=".6"/><rect x="25" y="35" width="8" height="25" rx="2" fill="'+G+'.06)"/>'+
  '<rect x="80" y="45" width="25" height="15" rx="1" fill="'+G+'.04)" stroke="'+G+'.12)" stroke-width=".5"/>'+
  '<rect x="84" y="48" width="6" height="4" rx=".5" fill="'+G+'.1)"/>'+
  '<rect x="130" y="22" width="24" height="48" rx="1" fill="'+G+'.04)" stroke="'+G+'.2)" stroke-width=".6"/>'+
  '<rect x="133" y="25" width="18" height="12" fill="'+G+'.08)"/><line x1="134" y1="30" x2="149" y2="30" stroke="'+G+'.12)" stroke-width=".3"/>'+
  led(140,42,'#9dff74','.6')+led(146,42)+
  '<rect x="133" y="50" width="18" height="8" rx="1" fill="'+G+'.03)" stroke="'+G+'.1)" stroke-width=".3"/>'+
  '<ellipse cx="90" cy="106" rx="40" ry="6" fill="'+G+'.03)"/>')},
storage:function(){var G=_RA_G,led=_RA_led,box=_RA_box;return _RA_base(
  '<rect x="50" y="22" width="80" height="55" rx="2" fill="'+G+'.03)" stroke="'+G+'.25)" stroke-width="1"/>'+
  '<circle cx="90" cy="50" r="12" fill="none" stroke="'+G+'.15)" stroke-width=".8"/><circle cx="90" cy="50" r="5" fill="none" stroke="'+G+'.2)" stroke-width=".6"/>'+
  '<line x1="90" y1="38" x2="90" y2="44" stroke="'+G+'.25)" stroke-width=".8"/><line x1="90" y1="56" x2="90" y2="62" stroke="'+G+'.25)" stroke-width=".8"/>'+
  '<rect x="115" y="42" width="10" height="16" rx="1" fill="'+G+'.06)" stroke="'+G+'.18)" stroke-width=".5"/>'+
  led(120,46,'#9dff74','.6')+led(120,52)+
  '<rect x="18" y="25" width="20" height="45" rx="1" fill="'+G+'.02)" stroke="'+G+'.12)" stroke-width=".4"/>'+
  box(20,28,16,10)+box(20,42,16,10)+
  '<ellipse cx="90" cy="106" rx="40" ry="6" fill="'+G+'.03)"/>')}
};
