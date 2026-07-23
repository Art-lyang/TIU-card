// TERMINAL SESSION — components-journal.js
// 지휘관 일지: 회차 동안의 선택·기록·현장 대응을 이중철(레벨 4 인가자)의 사적 메모로 수집·열람.
// 설계 원칙:
//  - 본문은 저장하지 않는다 — {t,id,d,day} 레퍼런스만 저장하고 열람 시 RESULT_TEXT/ORACLE_LOGS/MISSIONS에서 렌더.
//    (저장 수 KB 유지, i18n은 렌더 시점 로케일 반영 — getResultText가 EN 폴백 내장)
//  - 저장 키 ts_journal 은 세이브 정규화(normalizeGameSave) 밖의 독립 키. 신규 회차에서 리셋(app.js 등록).
//  - 개체 명명: ORACLE 내부 시점이므로 SPEC-### 단일 표기(MISSIONS[id].spec). 대외 맥락은 '아베란트'.
//  - 히든 로그는 수집 시점에 이미 제외(tryUnlock 가시 분기만 훅). GI 수치는 어떤 형태로도 기록하지 않는다.

var Journal={
  _cap:400,
  read:function(){try{var a=Save.get('ts_journal',[]);return Array.isArray(a)?a:[]}catch(e){return[]}},
  push:function(e){
    if(!e||!e.t)return;
    try{
      var a=this.read();
      a.push(e);
      if(a.length>this._cap)a=a.slice(a.length-this._cap);
      Save.set('ts_journal',a);
    }catch(_e){}
  }
};

// ✎ 무드 코멘트 — 이중철의 한 줄. day 해시로 결정적 선택(재열람 시 불변). [KO,EN] 쌍.
// Act 색상 정체성: 1=blue(도입) 2=green(탐색/의심) 3=yellow(압력) 4=red(긴급). 개체 언급은 SPEC 코드만.
// 사담 계열 캐논 근거(TIU-CANON-STORYLINE §이중철 / WORLDBUILDING-SUMMARY §PILEHEAD):
//  전직 육군 특수부대 장교(대위) → 프로메테우스 관계자의 부대원 모욕에 과격 대응 → 불명예전역.
//  전역 원인은 이념이 아닌 개인적 분노 — ORACLE의 '프로메테우스=위협' 분류와 감정이 우연히 일치해
//  자발적으로 동조하기 쉬운 구조(설계 핵심). 부임 전 3개월은 서하은이 ORACLE 지시만으로 운영.
//  ※ 닉 포스터 실명·재회 언급 금지(Act3+ 게이트 전 노출 가능) — 사건은 우회 표현만.
var JOURNAL_MOODS={
  1:[
    ['적응 중이다. 절차는 명확하고, 단말기는 항상 먼저 알고 있다.','Settling in. Procedure is clear, and the terminal always knows first.'],
    ['간부들의 얼굴을 익히는 중. 다들 각자의 방식으로 버티고 있다.','Learning the officers\' faces. Each of them holds on in their own way.'],
    ['기지는 조용하다. 조용한 것이 정상인지 아직 판단이 서지 않는다.','The base is quiet. I can\'t yet tell if quiet is normal.'],
    ['보고와 승인. 승인과 보고. 리듬에 몸이 먼저 익는다.','Report and approve. Approve and report. The rhythm settles in before I do.'],
    ['감정이 없었다면 거짓말이다. 결국 이 기지의 지휘관으로 부임했다. 걱정은 되지만, 후회는 없다.','I\'d be lying if I said there was no feeling in it. In the end I took command of this base. Worried, yes — but no regrets.'],
    ['군복을 벗은 지 몇 년. 다시 지휘석에 앉을 줄은 몰랐다. 이력서의 마지막 줄을 여기서는 아무도 묻지 않았다.','Years since I took off the uniform. Never thought I\'d sit in a command chair again. No one here asked about the last line of my record.'],
    ['부임 전 석 달, 서하은 혼자 기지를 돌렸다고 한다. 정확히는 — 혼자가 아니었겠지.','For three months before I arrived, Ha-eun ran this base alone. Or — not alone, strictly speaking.']
  ],
  2:[
    ['사소한 어긋남이 눈에 밟힌다. 사소하다고 적어두는 것부터가 이상하다.','Small misalignments catch my eye. That I keep calling them small is itself strange.'],
    ['기록과 기억이 다를 때, 어느 쪽을 믿어야 하는지 아직 답을 못 정했다.','When record and memory differ, I still haven\'t decided which to trust.'],
    ['질문을 하나 삼켰다. 삼킨 질문은 어디에 기록되나.','Swallowed a question today. Where do swallowed questions get filed.'],
    ['외부 접촉이 늘고 있다. 모두가 무언가를 원한다.','Outside contacts are increasing. Everyone wants something.'],
    ['ORACLE은 프로메테우스를 위협으로 분류한다. 나도 그렇게 생각한다. 이유는 서로 다른데 결론이 같다 — 편한 일치다. 편하다는 게 마음에 걸린다.','ORACLE classifies Prometheus as a threat. So do I. Different reasons, same conclusion — a convenient agreement. The convenience is what bothers me.'],
    ['왜 나였을까, 가끔 생각한다. 경력이라면 나보다 나은 사람이 있었다. 기록이라면 — 내 기록은 흠이었을 텐데.','Sometimes I wonder why it was me. If it was the career, better men existed. If it was the record — mine was a stain.'],
    ['화를 참지 못해 군복을 벗은 사람에게 봉쇄선 하나를 맡겼다. 누군가는 그 계산을 하고 뽑았을 것이다.','They handed a containment line to a man who lost his uniform to his own temper. Someone made that calculation before picking me.']
  ],
  3:[
    ['버틸 것과 버릴 것을 매일 다시 정한다.','Every day I re-decide what to hold and what to let go.'],
    ['수치가 나빠지면 사람 얼굴부터 떠오른다. 지휘관에게 좋은 습관은 아니다.','When the numbers drop, faces come to mind first. Not a good habit for a commander.'],
    ['평가가 내려온다. 평가하는 쪽의 기준은 끝내 공개되지 않는다.','The evaluations come down. The evaluator\'s criteria are never disclosed.'],
    ['오늘도 몇 가지를 기록하지 않기로 했다. 이 문장은 남긴다.','Again today I chose not to record certain things. This sentence stays.'],
    ['그때는 부대원을 지키려다 군복을 벗었다. 지금은 지표를 지키느라 사람을 내려놓는다. 어느 쪽이 더 과격한가.','Back then I lost the uniform protecting my men. Now I set people down to protect the numbers. Which is the more violent act.'],
    ['그날의 분노는 아직 그대로 있다. 달라진 건 하나 — 이제는 그 분노를 결재란에 서명하는 데 쓴다.','That day\'s anger is still intact. Only one thing changed — now I spend it signing approval lines.'],
    ['걱정은 된다고 처음에 적었다. 그 문장을 오늘 다시 읽었다. 그때의 걱정은 지금 것에 비하면 사치였다.','\"Worried,\" I wrote at the start. Re-read that line today. That worry was a luxury compared to this one.']
  ],
  4:[
    ['시간이 없다는 감각만 정확해진다.','Only the sense that time is running out grows precise.'],
    ['남은 사람들을 센다. 세는 것 말고 할 수 있는 일을 찾는 중이다.','I count who\'s left. I\'m looking for something to do besides counting.'],
    ['결정은 이미 내려진 것 같다. 내가 내린 것인지가 문제다.','The decision feels already made. The question is whether I made it.'],
    ['이 일지가 어디까지 남을지 모르겠다. 그래도 쓴다.','I don\'t know how much of this journal will survive. I write anyway.'],
    ['부임 첫날의 다짐을 다시 읽었다. 단어 하나도 지키지 못하게 됐지만, 문장은 아직 틀리지 않았다.','Re-read my first-day resolution. I couldn\'t keep a single word of it — but the sentence itself still isn\'t wrong.'],
    ['이번에도 과격 대응이라고 기록되겠지. 상관없다. 그때도 후회하지 않았다.','They\'ll file this one as excessive force too. Fine. I didn\'t regret it then either.'],
    ['한 번은 사람 때문에 모든 걸 잃었다. 이번에 잃는다면, 적어도 같은 이유였으면 한다.','Once I lost everything over people. If I lose it all again — let it at least be for the same reason.']
  ]
};
function journalHash(a,b){var h=2166136261;var s=String(a)+'|'+String(b);for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=(h*16777619)>>>0}return h}

// ── 방향 세분화 레이어 ── 일지가 "이번 회차가 어디로 가는가"를 말하게 한다. 우선순위: 이벤트 > 루트 > Act.
// 루트 무드 — transRoute별(Act3 A~D / Act4 4루트). 카드 엔트리의 r 필드에서 그날의 루트를 읽는다.
var JOURNAL_MOODS_ROUTE={
  A:[['지표가 버텨준다. 버티는 동안 무엇을 준비하느냐가 문제다.','The numbers are holding. The question is what we build while they hold.'],
     ['숫자는 안정을 말한다. 현장의 얼굴들은 조금 다른 말을 한다.','The figures say stable. The faces in the field say something slightly different.']],
  B:[['사람이 모자라다. 명령서는 그 사실을 모르는 것처럼 도착한다.','We are short on people. The directives arrive as if they don\'t know that.'],
     ['현장이 얇아지고 있다. 서류 위에서는 아직 두껍다.','The field is wearing thin. On paper it still looks thick.']],
  C:[['정보가 무기가 된 지는 오래다. 요즘은 침묵도 무기다.','Information became a weapon long ago. These days, silence is one too.'],
     ['누가 무엇을 아는지가 전선이 됐다. 나는 어느 쪽 참호에 있나.','Who knows what has become the front line. Which trench am I in.']],
  D:[['나쁜 소식이 겹치는 날이 잦아졌다. 겹침에는 보통 이유가 있다.','Bad news keeps arriving in pairs. Coincidence usually has a reason.'],
     ['하루를 막으면 이틀이 무너져 들어온다.','Hold one day together and two more collapse into it.']],
  A4_COMPLY:[['승인란에 서명하는 손이 빨라졌다. 빨라진 것을 자각하는 동안은, 아직 내 손이다.','My signing hand has gotten faster. As long as I notice that, it\'s still my hand.'],
     ['지시와 판단의 경계가 흐려진다. 이렇게 적어두는 것은 그래서다.','The line between orders and judgment is blurring. That is exactly why I write this down.']],
  A4_GREY:[['어느 쪽에도 온전히 서지 않기로 했다. 그 자리가 제일 좁다.','I chose to stand fully on neither side. It is the narrowest place to stand.'],
     ['양쪽 모두 나를 자기편으로 센다. 둘 다 틀렸다.','Both sides count me as theirs. Both are wrong.']],
  A4_RESIST:[['거절을 다시 배우고 있다. 군에서 못 배운 유일한 기술이다.','Relearning how to refuse. The one skill the army never taught me.'],
     ['명령서 위에 내 판단을 겹쳐 쓴다. 대가는 언젠가 온다. 그때 계산하겠다.','I write my own judgment over the directives. The bill will come. I\'ll settle it then.']],
  A4_OBSERVER:[['기록되지 않는 무언가가 기록을 보고 있다. 문장이 이상하지만 고치지 않겠다.','Something unrecorded is reading the records. Strange sentence. I\'m not fixing it.'],
     ['단말기 너머에 층이 하나 더 있다. 증명은 못 한다. 감각은 확실하다.','There is one more layer behind the terminal. I can\'t prove it. I can feel it.']]
};
// 아크 이벤트 무드 — 그날 해금 로그에 매칭되면 최우선. 간부 상실·세진 지연 계열.
var JOURNAL_MOODS_EVENT={
  'LOG-SEJIN-DEAD':['윤세진의 연구 노트를 정리했다. 마지막 장은 비어 있었다. 그 여백이 제일 무겁다.','I sorted Yoon Se-jin\'s research notes. The last page was blank. That blank weighs the most.'],
  'LOG-IJ-DEFECT':['임재혁의 콘솔이 비어 있다. 그가 붙이던 파일명들을 이제 내가 붙인다.','Jaehyuk\'s console sits empty. The file names he used to choose, I choose now.'],
  'LOG-050':['서하은이 떠났다. 부임 전 석 달을 혼자 버틴 사람이었다.','Ha-eun is gone. She held this base alone for three months before I ever arrived.'],
  'LOG-075':['강도윤의 채널이 응답하지 않는다. 현장은 아직 그의 동선을 따라 돈다.','Do-yun\'s channel has gone silent. The field still runs along the routes he drew.'],
  'SEJIN-DELAY':['연구동 불이 늦게까지 켜져 있다. 윤세진의 보고가 또 밀렸다. 장비 탓이라고 했지만, 눈은 다른 말을 하고 있었다.','The research wing\'s lights stayed on late. Se-jin\'s report slipped again. She blamed the equipment — her eyes said otherwise.']
};
// ── 이브닝/대화 유대 무드 ── 그날 누구와 어떤 톤(warm/cold)으로 교감했는지에 따라 소회가 달라진다.
// 캐넌 키: doyun/sejin/haeun/jaehyuk/soyoung (modTrust 정규화 키와 동일). [KO,EN] 쌍 배열.
var JOURNAL_MOODS_BOND={
  doyun:{
    warm:[["강도윤과 오래 이야기했다. 현장의 언어는 늘 나보다 정직하다.","Talked with Do-yun a long while. The field’s language is always more honest than mine."],
          ["강도윤은 위험을 축소해 말한다. 그 버릇이 나를 안심시키고, 그래서 더 걱정된다.","Do-yun downplays the danger. The habit reassures me — which is exactly why it worries me."]],
    cold:[["강도윤이 말수를 줄였다. 명령만 받는 사람의 얼굴을 나는 안다 — 거울에서 봤다.","Do-yun’s gone quiet. I know the face of a man who only takes orders — I’ve seen it in the mirror."],
          ["오늘 강도윤에게 설명 대신 지시를 내렸다. 편했다. 편했다는 게 오래 남는다.","Today I handed Do-yun an order instead of an explanation. It was easy. The ease is what lingers."]]},
  sejin:{
    warm:[["윤세진이 오늘은 데이터 뒤의 말을 조금 흘렸다. 신뢰는 그런 틈으로 샌다.","Se-jin let slip a little of what lies behind the data tonight. Trust leaks through gaps like that."],
          ["윤세진의 노트에 오늘은 여백이 적었다. 말하기 시작했다는 뜻일까.","Fewer blanks in Se-jin’s notes today. Does that mean the talking has started."]],
    cold:[["윤세진의 보고는 정확했고, 정확한 만큼 비어 있었다. 무엇을 안 적었는지가 궁금하다.","Se-jin’s report was precise — and as precise as it was, hollow. I wonder what went unwritten."],
          ["연구동 불이 또 늦게 꺼졌다. 오늘은 이유를 묻지 않았다. 물었어야 했나.","The research wing’s lights went out late again. I didn’t ask why tonight. Should I have."]]},
  haeun:{
    warm:[["서하은과 늦게까지 이야기했다. 이 기지를 혼자 지킨 석 달의 무게가 목소리에 아직 남아 있다.","Stayed up talking with Ha-eun. Three months holding this base alone still weighs in her voice."],
          ["서하은은 요원들 이름을 하나도 빼먹지 않는다. 나는 몇을 잊었다. 부끄러웠다.","Ha-eun forgets none of the agents’ names. I’ve forgotten a few. It shamed me."]],
    cold:[["서하은이 원칙을 다시 꺼냈다. 나는 숫자를 꺼냈다. 오늘은 둘 다 지지 않았다.","Ha-eun brought up principle again. I brought up the numbers. Tonight neither of us gave."],
          ["서하은의 눈이 오늘은 나를 지휘관이 아니라 문제로 봤다. 틀린 눈은 아니었다.","Tonight Ha-eun looked at me not as a commander but as a problem. She wasn’t wrong to."]]},
  jaehyuk:{
    warm:[["임재혁과 콘솔 앞에서 한참을 보냈다. 그는 파일명 하나에도 사람의 흔적을 남긴다.","Spent a while with Jaehyuk at the console. He leaves a human trace even in a file name."],
          ["임재혁이 농담을 하나 던졌다. 이 기지에서 농담은 생존 신호다.","Jaehyuk cracked a joke. On this base, a joke is a survival signal."]],
    cold:[["임재혁이 화면만 봤다. 나도 그 편이 편했다. 편한 침묵이 제일 위험하다.","Jaehyuk kept his eyes on the screen. I preferred it that way too. Comfortable silence is the most dangerous kind."],
          ["임재혁에게 오늘은 승인만 전달했다. 그의 콘솔은 대답하지 않았다.","Passed Jaehyuk only approvals today. His console didn’t answer back."]]},
  soyoung:{
    warm:[["박소영과의 대화는 늘 한 겹 더 있다. 오늘은 그 겹을 굳이 들추지 않았다.","There’s always one more layer to talking with So-young. Tonight I chose not to lift it."],
          ["박소영이 유용한 말을 정확한 때에 건넸다. 정확한 타이밍은 언제나 조금 무서운 법이다.","So-young offered something useful at exactly the right moment. Perfect timing is always a little unnerving."]],
    cold:[["박소영이 웃었다. 그 웃음이 어디까지 진심인지, 세는 습관이 생겼다.","So-young smiled. I’ve picked up the habit of measuring how far that smile goes."],
          ["박소영에게 오늘은 아무것도 내주지 않았다. 그쪽도 마찬가지였을 것이다.","Gave So-young nothing today. I expect the favor was returned."]]}
};

function journalEventKey(id){
  if(JOURNAL_MOODS_EVENT[id])return id;
  if(String(id).indexOf('LOG-SEJIN-DELAY')===0)return 'SEJIN-DELAY';
  return null;
}

// ── DEV 전용: ✎ 무드 코멘트 전체 프리뷰 (?dev=1 런처에서 호출) ──
// Act별 4줄 KO/EN 전량을 한 화면에서 검수. day 해시 선택이라 실플레이 없이 여기서 전문 확인.
function JournalMoodPreview(p){
  var ACT_COL={1:'#66aaff',2:'#39d98a',3:'#e6c030',4:'#ff6655'};
  return h('div',{style:{position:'fixed',inset:0,zIndex:100000,background:'rgba(2,6,8,.94)',overflowY:'auto',padding:'26px 18px 40px'},onClick:function(e){if(e.target===e.currentTarget&&p.onClose)p.onClose()}},
    h('div',{style:{maxWidth:640,margin:'0 auto',fontFamily:"'Share Tech Mono','Noto Sans KR',monospace"}},
      h('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14,borderBottom:'1px solid rgba(57,217,138,.35)',paddingBottom:8}},
        h('span',{style:{fontSize:12,letterSpacing:2,color:'#39d98a'}},'[DEV] ✎ JOURNAL MOODS — 전량 프리뷰'),
        h('button',{onClick:p.onClose,style:{font:'11px monospace',padding:'6px 14px',cursor:'pointer',background:'rgba(10,26,22,.9)',color:'#8affc0',border:'1px solid rgba(138,255,192,.45)',borderRadius:3}},'닫기 ✕')),
      [1,2,3,4].map(function(act){
        var col=ACT_COL[act],pool=JOURNAL_MOODS[act]||[];
        return h('div',{key:'a'+act,style:{marginBottom:18}},
          h('div',{style:{fontSize:11,letterSpacing:2,color:col,marginBottom:6}},'— ACT '+act+' ('+pool.length+'종 · day 해시 결정적 선택) —'),
          pool.map(function(m,i){
            return h('div',{key:i,style:{border:'1px solid '+col+'33',borderLeft:'2px solid '+col+'88',borderRadius:3,padding:'8px 11px',margin:'5px 0',background:'rgba(255,255,255,.02)'}},
              h('div',{style:{fontSize:9,color:col,opacity:.7,marginBottom:3}},'#'+(i+1)),
              h('div',{style:{fontSize:12.5,lineHeight:1.6,color:'#d8c9a0',fontStyle:'italic'}},'✎ '+m[0]),
              h('div',{style:{fontSize:11,lineHeight:1.55,color:'rgba(200,214,222,.55)',marginTop:3}},'EN: '+m[1]));
          }));
      }),
      h('div',{style:{fontSize:10,color:'rgba(138,255,192,.5)',marginTop:6}},'선택 규칙: journalHash(day, act) % 풀크기 — 같은 날은 항상 같은 줄(재열람 불변)')));
}
// DEV 런처 버튼에서 상태 없이 열 수 있는 임퍼러티브 오프너 (자체 마운트/언마운트)
function openJournalMoodPreview(){
  if(document.getElementById('jm-preview-root'))return;
  var d=document.createElement('div');d.id='jm-preview-root';document.body.appendChild(d);
  var root=ReactDOM.createRoot(d);
  var close=function(){try{root.unmount()}catch(e){}if(d.parentNode)d.parentNode.removeChild(d)};
  root.render(h(JournalMoodPreview,{onClose:close}));
}

function CommanderJournal(p){
  var locale=(window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale())||'ko';
  var isEn=locale==='en';
  var s2=useState(0),page=s2[0],setPage=s2[1];
  var entries=Journal.read();
  // day별 그룹(최신 우선)
  var byDay={},days=[];
  entries.forEach(function(e){if(!e||!e.day)return;if(!byDay[e.day]){byDay[e.day]=[];days.push(e.day)}byDay[e.day].push(e)});
  days.sort(function(a,b){return b-a});
  var pageSize=4,totalPages=Math.max(1,Math.ceil(days.length/pageSize));
  var safePage=Math.max(0,Math.min(page,totalPages-1));
  var pageDays=days.slice(safePage*pageSize,safePage*pageSize+pageSize);
  var lineFor=function(e){
    try{
      if(e.t==='card'&&typeof getResultText==='function'){var rt=getResultText(e.id,e.d);return rt?('· '+rt):null}
      if(e.t==='log'){
        var ld=(typeof ORACLE_LOGS!=='undefined')?ORACLE_LOGS.filter(function(l){return l.id===e.id})[0]:null;
        if(!ld||ld.hidden)return null;
        var ov=(isEn&&typeof tc==='function')?tc('oracleLogs',e.id,null):null;
        return '· '+(isEn?'Record updated — ':'기록 갱신 — ')+((ov&&ov.title)||ld.title);
      }
      if(e.t==='mission'){
        var m=(typeof MISSIONS!=='undefined')?MISSIONS[e.id]:null;
        if(!m)return null;
        // SPEC 단일 표기(캐논): spec 필드 우선, 없으면 제목(EN 오버레이 폴백)
        if(m.spec)return '· '+(isEn?('Field response — '+m.spec+(m.codename?' ('+m.codename+')':'')):('현장 대응 — '+m.spec+(m.codename?' ('+m.codename+')':'')));
        var mov=(isEn&&typeof tc==='function')?tc('missions',e.id,null):null;
        return '· '+(isEn?'Field response — ':'현장 대응 — ')+((mov&&mov.title)||m.title);
      }
    }catch(_e){}
    return null;
  };
  var pager=function(){
    if(totalPages<=1)return null;
    var btn=function(label,disabled,np){return h('button',{className:'btn',disabled:disabled,style:{fontSize:11,padding:'6px 14px',marginTop:0,minHeight:0,opacity:disabled?0.3:1,cursor:disabled?'default':'pointer'},onClick:function(){if(!disabled)setPage(np)}},label)};
    return h('div',{className:'vw-pager'},
      btn(isEn?'PREV':'이전',safePage<=0,Math.max(0,safePage-1)),
      h('span',{className:'vw-pager-n'},(safePage+1)+' / '+totalPages),
      btn(isEn?'NEXT':'다음',safePage>=totalPages-1,Math.min(totalPages-1,safePage+1)));
  };
  if(days.length===0)return h('div',{className:'vw-note',style:{marginTop:14}},tt('journal.empty',null,isEn?'No entries yet. The journal fills in as the session proceeds.':'아직 기록이 없습니다. 세션이 진행되면 일지가 채워집니다.'));
  // 일지 안내 — 지휘관이 임기 중 직접 남기는 사적 메모라는 간단한 설명 한 줄
  var deckLine=isEn?'✱ Personal notes the commander keeps through this term.':'✱ 지휘관이 임기 중 직접 남기는 개인 메모입니다.';
  var moodFor=function(d,evs,act){
    // 1순위: 그날 해금 로그의 아크 이벤트 (간부 상실·세진 지연)
    for(var i=0;i<evs.length;i++){
      if(evs[i].t==='log'){var ek=journalEventKey(evs[i].id);if(ek)return JOURNAL_MOODS_EVENT[ek]}
    }
    // 2순위: 이브닝/대화 유대 — 그날 누구와 어떤 톤으로 교감했는지(플레이어 선택 반영). day 해시로 루트/Act 풀과 교대.
    for(var bi=0;bi<evs.length;bi++){ if(evs[bi].t==='bond'&&evs[bi].id&&JOURNAL_MOODS_BOND[evs[bi].id]){ var bp=JOURNAL_MOODS_BOND[evs[bi].id]; var tone=(evs[bi].d==='cold')?'cold':'warm'; var barr=bp[tone]||bp.warm||bp.cold; if(barr&&barr.length&&journalHash(d,'bond')%3===0){ return barr[journalHash(d,evs[bi].id+tone)%barr.length]; } break; } }
    // 3순위: 그날의 루트(r) — 매일 반복되지 않게 day 해시로 Act 풀과 교대
    var route=(evs.filter(function(e){return e.r})[0]||{}).r||'';
    if(route&&JOURNAL_MOODS_ROUTE[route]&&journalHash(d,'alt')%2===0){
      var rp=JOURNAL_MOODS_ROUTE[route];return rp[journalHash(d,route)%rp.length];
    }
    // 4순위: Act 기본 풀
    var ap=JOURNAL_MOODS[act]||JOURNAL_MOODS[1];return ap[journalHash(d,act)%ap.length];
  };
  return h(React.Fragment,null,
    deckLine&&h('div',{className:'jr-deck'},deckLine),
    pager(),
    pageDays.map(function(d){
      var evs=byDay[d];
      var act=(evs.filter(function(e){return e.act})[0]||{}).act||1;
      var mood=moodFor(d,evs,act);
      var lines=evs.map(lineFor).filter(Boolean);
      return h('div',{key:'jd'+d,className:'jr-day'},
        h('div',{className:'jr-day-h'},'DAY '+d+' — ACT '+act),
        lines.length?lines.map(function(l,i){return h('div',{key:i,className:'jr-line'},l)}):h('div',{className:'jr-line jr-line-dim'},isEn?'· (no notable record)':'· (특기 기록 없음)'),
        h('div',{className:'jr-mood'},'✎ '+(isEn?mood[1]:mood[0])));
    }),
    pager());
}
