/* ================================================================
   ORACLE Korea Branch — Room SVG Art Templates (Part 2: Special + Exterior)
   Depends on: oracle-room-art.js (_RA_types, _RA_base, _RA_G, _RA_led, etc.)
   ================================================================ */
_RA_types.containment=function(){var G=_RA_G,led=_RA_led;return _RA_base(
  '<rect x="30" y="22" width="50" height="50" rx="1" fill="rgba(204,102,51,.03)" stroke="rgba(204,102,51,.3)" stroke-width="1"/>'+
  '<line x1="30" y1="22" x2="80" y2="72" stroke="rgba(204,102,51,.08)" stroke-width=".4"/><line x1="80" y1="22" x2="30" y2="72" stroke="rgba(204,102,51,.08)" stroke-width=".4"/>'+
  '<rect x="100" y="22" width="50" height="50" rx="1" fill="rgba(204,102,51,.03)" stroke="rgba(204,102,51,.25)" stroke-width="1"/>'+
  '<line x1="100" y1="22" x2="150" y2="72" stroke="rgba(204,102,51,.06)" stroke-width=".4"/><line x1="150" y1="22" x2="100" y2="72" stroke="rgba(204,102,51,.06)" stroke-width=".4"/>'+
  led(55,18,'#cc6633','.6')+led(125,18,'#cc6633','.4')+
  '<rect x="35" y="30" width="12" height="8" rx="1" fill="'+G+'.03)" stroke="rgba(204,102,51,.2)" stroke-width=".4"/>'+
  '<ellipse cx="90" cy="106" rx="40" ry="6" fill="rgba(204,102,51,.03)"/>','#cc6633')};
_RA_types.hazard=function(){var G=_RA_G;return _RA_base(
  '<polygon points="90,25 110,55 70,55" fill="none" stroke="rgba(204,68,68,.4)" stroke-width="1"/>'+
  '<text x="90" y="48" text-anchor="middle" fill="rgba(204,68,68,.5)" font-family="monospace" font-size="12" font-weight="bold">!</text>'+
  '<rect x="28" y="38" width="18" height="28" rx="2" fill="rgba(204,68,68,.06)" stroke="rgba(204,68,68,.25)" stroke-width=".7"/>'+
  '<line x1="30" y1="48" x2="44" y2="48" stroke="rgba(204,68,68,.15)" stroke-width=".4"/>'+
  '<rect x="134" y="38" width="18" height="28" rx="2" fill="rgba(204,68,68,.06)" stroke="rgba(204,68,68,.2)" stroke-width=".7"/>'+
  '<line x1="136" y1="48" x2="150" y2="48" stroke="rgba(204,68,68,.12)" stroke-width=".4"/>'+
  '<ellipse cx="90" cy="106" rx="40" ry="6" fill="rgba(204,68,68,.03)"/>','#cc4444')};
_RA_types.classified=function(){return _RA_base(
  '<rect x="40" y="25" width="100" height="50" rx="1" fill="rgba(102,34,34,.06)" stroke="rgba(102,34,34,.25)" stroke-width="1"/>'+
  '<text x="90" y="45" text-anchor="middle" fill="rgba(102,34,34,.4)" font-family="monospace" font-size="6" letter-spacing="3">[REDACTED]</text>'+
  '<text x="90" y="55" text-anchor="middle" fill="rgba(102,34,34,.25)" font-family="monospace" font-size="5" letter-spacing="2">ACCESS DENIED</text>'+
  '<line x1="42" y1="30" x2="138" y2="30" stroke="rgba(102,34,34,.1)" stroke-width=".3"/><line x1="42" y1="60" x2="138" y2="60" stroke="rgba(102,34,34,.1)" stroke-width=".3"/>'+
  '<rect x="75" y="68" width="30" height="12" rx="1" fill="none" stroke="rgba(102,34,34,.2)" stroke-width=".5"/><circle cx="90" cy="74" r="2" fill="rgba(102,34,34,.3)"/>'+
  '<ellipse cx="90" cy="106" rx="40" ry="6" fill="rgba(102,34,34,.03)"/>','#662222')};
_RA_types.access=function(){var G=_RA_G,led=_RA_led;return _RA_base(
  '<rect x="50" y="28" width="80" height="50" rx="1" fill="'+G+'.03)" stroke="'+G+'.2)" stroke-width=".7"/>'+
  '<line x1="90" y1="28" x2="90" y2="78" stroke="'+G+'.15)" stroke-width=".6"/>'+
  '<circle cx="85" cy="53" r="2" fill="'+G+'.15)"/><circle cx="95" cy="53" r="2" fill="'+G+'.15)"/>'+
  '<rect x="135" y="40" width="15" height="20" rx="1" fill="'+G+'.04)" stroke="'+G+'.2)" stroke-width=".5"/>'+
  led(142,46,'#9dff74','.6')+'<rect x="138" y="52" width="8" height="3" rx=".5" fill="'+G+'.08)"/>'+
  '<ellipse cx="90" cy="106" rx="40" ry="6" fill="'+G+'.03)"/>')};
_RA_types.terrain=function(){var G=_RA_G;return _RA_base(
  '<line x1="40" y1="45" x2="40" y2="75" stroke="'+G+'.15)" stroke-width="2"/><polygon points="40,25 25,50 55,50" fill="'+G+'.06)" stroke="'+G+'.15)" stroke-width=".5"/>'+
  '<polygon points="40,32 28,48 52,48" fill="'+G+'.04)" stroke="'+G+'.1)" stroke-width=".3"/>'+
  '<line x1="90" y1="40" x2="90" y2="72" stroke="'+G+'.12)" stroke-width="2"/><polygon points="90,22 72,48 108,48" fill="'+G+'.05)" stroke="'+G+'.12)" stroke-width=".5"/>'+
  '<line x1="140" y1="48" x2="140" y2="75" stroke="'+G+'.1)" stroke-width="1.5"/><polygon points="140,30 128,52 152,52" fill="'+G+'.04)" stroke="'+G+'.1)" stroke-width=".4"/>'+
  '<ellipse cx="90" cy="106" rx="55" ry="8" fill="'+G+'.04)"/>')};
_RA_types.checkpoint=function(){var G=_RA_G,led=_RA_led,mon=_RA_mon;return _RA_base(
  '<rect x="35" y="35" width="4" height="45" rx="1" fill="'+G+'.12)" stroke="'+G+'.2)" stroke-width=".5"/>'+
  '<rect x="141" y="35" width="4" height="45" rx="1" fill="'+G+'.12)" stroke="'+G+'.2)" stroke-width=".5"/>'+
  '<rect x="39" y="38" width="102" height="5" rx="1" fill="rgba(170,170,68,.08)" stroke="rgba(170,170,68,.3)" stroke-width=".6"/>'+
  '<rect x="65" y="50" width="50" height="28" rx="1" fill="'+G+'.04)" stroke="'+G+'.18)" stroke-width=".6"/>'+
  mon(70,53,18,12)+'<rect x="92" y="55" width="15" height="8" rx=".5" fill="'+G+'.06)" stroke="'+G+'.1)" stroke-width=".3"/>'+
  led(80,70,'#9dff74','.5')+
  '<ellipse cx="90" cy="106" rx="40" ry="6" fill="'+G+'.03)"/>')};
_RA_types.surveillance=function(){var G=_RA_G,led=_RA_led;return _RA_base(
  '<line x1="90" y1="20" x2="90" y2="68" stroke="'+G+'.25)" stroke-width="1.5"/>'+
  '<line x1="85" y1="68" x2="95" y2="68" stroke="'+G+'.2)" stroke-width="1"/>'+
  '<circle cx="90" cy="20" r="5" fill="none" stroke="'+G+'.3)" stroke-width=".7"/><circle cx="90" cy="20" r="2" fill="'+G+'.15)"/>'+
  '<path d="M78,14 Q84,8 90,14" fill="none" stroke="'+G+'.12)" stroke-width=".5"/><path d="M72,10 Q81,0 90,10" fill="none" stroke="'+G+'.08)" stroke-width=".4"/>'+
  '<path d="M90,14 Q96,8 102,14" fill="none" stroke="'+G+'.12)" stroke-width=".5"/><path d="M90,10 Q99,0 108,10" fill="none" stroke="'+G+'.08)" stroke-width=".4"/>'+
  '<rect x="30" y="50" width="25" height="22" rx="1" fill="'+G+'.03)" stroke="'+G+'.15)" stroke-width=".5"/>'+
  led(38,56)+led(48,56)+led(38,62,'#9dff74','.4')+
  '<rect x="125" y="50" width="25" height="22" rx="1" fill="'+G+'.03)" stroke="'+G+'.15)" stroke-width=".5"/>'+
  led(132,56)+led(142,56,'#ff6644','.3')+
  '<ellipse cx="90" cy="106" rx="40" ry="6" fill="'+G+'.03)"/>')};
_RA_types.patrol=function(){var G=_RA_G,O=_RA_O,box=_RA_box;return _RA_base(
  '<rect x="55" y="30" width="70" height="40" rx="2" fill="'+G+'.04)" stroke="'+G+'.2)" stroke-width=".7"/>'+
  '<line x1="90" y1="22" x2="90" y2="30" stroke="'+G+'.2)" stroke-width="1"/>'+
  '<rect x="90" y="22" width="18" height="8" fill="'+O+'.08)" stroke="'+O+'.25)" stroke-width=".5"/>'+
  box(60,50,22,14,'.08')+box(88,52,18,12,'.06')+
  '<circle cx="30" cy="80" r="3" fill="none" stroke="'+O+'.3)" stroke-width=".6"/><circle cx="30" cy="80" r="1" fill="'+O+'.3)"/>'+
  '<line x1="33" y1="80" x2="55" y2="70" stroke="'+O+'.15)" stroke-width=".5" stroke-dasharray="3,3"/>'+
  '<circle cx="150" cy="80" r="3" fill="none" stroke="'+O+'.3)" stroke-width=".6"/><circle cx="150" cy="80" r="1" fill="'+O+'.3)"/>'+
  '<line x1="125" y1="70" x2="147" y2="80" stroke="'+O+'.15)" stroke-width=".5" stroke-dasharray="3,3"/>'+
  '<ellipse cx="90" cy="106" rx="45" ry="6" fill="'+G+'.03)"/>')};
_RA_types.perimeter=function(){var G=_RA_G,led=_RA_led;return _RA_base(
  '<line x1="20" y1="55" x2="160" y2="55" stroke="'+G+'.25)" stroke-width="1"/>'+
  '<line x1="35" y1="38" x2="35" y2="55" stroke="'+G+'.15)" stroke-width="1"/><line x1="65" y1="38" x2="65" y2="55" stroke="'+G+'.15)" stroke-width="1"/><line x1="95" y1="38" x2="95" y2="55" stroke="'+G+'.15)" stroke-width="1"/><line x1="125" y1="38" x2="125" y2="55" stroke="'+G+'.15)" stroke-width="1"/><line x1="155" y1="38" x2="155" y2="55" stroke="'+G+'.15)" stroke-width="1"/>'+
  '<path d="M20,38 Q28,32 35,38 Q42,44 50,38 Q58,32 65,38 Q72,44 80,38 Q88,32 95,38 Q102,44 110,38 Q118,32 125,38 Q132,44 140,38 Q148,32 155,38" fill="none" stroke="'+G+'.2)" stroke-width=".6"/>'+
  '<rect x="60" y="62" width="10" height="14" rx="1" fill="'+G+'.04)" stroke="'+G+'.2)" stroke-width=".5"/>'+led(65,66,'#9dff74','.6')+
  '<rect x="110" y="62" width="10" height="14" rx="1" fill="'+G+'.04)" stroke="'+G+'.2)" stroke-width=".5"/>'+led(115,66,'#9dff74','.4')+
  '<ellipse cx="90" cy="106" rx="50" ry="6" fill="'+G+'.03)"/>')};
// Public API
var ROOM_ART={get:function(type){return(_RA_types[type]||_RA_types.access)()}};
