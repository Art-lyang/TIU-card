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
          ["강도윤은 위험을 축소해 말한다. 그 버릇이 나를 안심시키고, 그래서 더 걱정된다.","Do-yun downplays the danger. The habit reassures me — which is exactly why it worries me."],["강도윤은 늘 결론부터 말한다. 오늘은 결론 앞의 침묵이 더 길었다.","Do-yun always leads with the conclusion. Tonight the silence before it ran longer."]],
    cold:[["강도윤이 말수를 줄였다. 명령만 받는 사람의 얼굴을 나는 안다 — 거울에서 봤다.","Do-yun’s gone quiet. I know the face of a man who only takes orders — I’ve seen it in the mirror."],
          ["오늘 강도윤에게 설명 대신 지시를 내렸다. 편했다. 편했다는 게 오래 남는다.","Today I handed Do-yun an order instead of an explanation. It was easy. The ease is what lingers."],["강도윤에게 이유를 묻지 않았다. 물으면 대답할 사람이라, 그래서 안 물었다.","I didn’t ask Do-yun why. He’s the kind who would answer — which is exactly why I didn’t."]]},
  sejin:{
    warm:[["윤세진이 오늘은 데이터 뒤의 말을 조금 흘렸다. 신뢰는 그런 틈으로 샌다.","Se-jin let slip a little of what lies behind the data tonight. Trust leaks through gaps like that."],
          ["윤세진의 노트에 오늘은 여백이 적었다. 말하기 시작했다는 뜻일까.","Fewer blanks in Se-jin’s notes today. Does that mean the talking has started."],["윤세진이 오늘은 커피를 두 잔 탔다. 한 잔을 내 앞에 두기까지 걸린 시간을 나는 셌다.","Se-jin made two coffees tonight. I counted the seconds it took to set one down in front of me."]],
    cold:[["윤세진의 보고는 정확했고, 정확한 만큼 비어 있었다. 무엇을 안 적었는지가 궁금하다.","Se-jin’s report was precise — and as precise as it was, hollow. I wonder what went unwritten."],
          ["연구동 불이 또 늦게 꺼졌다. 오늘은 이유를 묻지 않았다. 물었어야 했나.","The research wing’s lights went out late again. I didn’t ask why tonight. Should I have."],["윤세진의 대답이 오늘은 전부 괜찮다였다. 괜찮다가 세 번을 넘으면 나는 그 말을 믿지 않는다.","Every answer from Se-jin tonight was fine, fine, fine. Past the third fine, I stop believing it."]]},
  haeun:{
    warm:[["서하은과 늦게까지 이야기했다. 이 기지를 혼자 지킨 석 달의 무게가 목소리에 아직 남아 있다.","Stayed up talking with Ha-eun. Three months holding this base alone still weighs in her voice."],
          ["서하은은 요원들 이름을 하나도 빼먹지 않는다. 나는 몇을 잊었다. 부끄러웠다.","Ha-eun forgets none of the agents’ names. I’ve forgotten a few. It shamed me."],["서하은이 오래된 근무일지를 꺼내 보였다. 종이의 손때가 말보다 많은 걸 말했다.","Ha-eun pulled out an old duty log to show me. The worn paper said more than her words did."]],
    cold:[["서하은이 원칙을 다시 꺼냈다. 나는 숫자를 꺼냈다. 오늘은 둘 다 지지 않았다.","Ha-eun brought up principle again. I brought up the numbers. Tonight neither of us gave."],
          ["서하은의 눈이 오늘은 나를 지휘관이 아니라 문제로 봤다. 틀린 눈은 아니었다.","Tonight Ha-eun looked at me not as a commander but as a problem. She wasn’t wrong to."],["서하은과 오늘은 서로 예의만 지켰다. 예의는 거리의 다른 이름이다.","Ha-eun and I kept only courtesy tonight. Courtesy is another name for distance."]]},
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


// ── 선택 기반 소회 ── 임팩트 있는 카드 선택(카드ID|방향)에 붙는 전용 메모. 플레이어 선택이 일지에 그대로 남는다. [KO,EN].
var MEMO_BY_CHOICE={
  'C-096|left':["Blood Pit을 태웠다. 확산은 멈췄고, 표본은 재가 됐다. 옳은 결정이라고 적어둔다 — 적어두면 옳은 게 되기라도 할 것처럼.","We burned the Blood Pit. The spread stopped, the specimen turned to ash. I write that it was the right call — as if writing it makes it so."],
  'C-096|right':["Blood Pit을 살려 가뒀다. 윤세진은 만족했고, 나는 밤새 그 웅덩이가 숨 쉬는 상상을 했다.","We caged the Blood Pit alive. Se-jin was satisfied. I spent the night imagining that pit breathing."],
  'C-097|left':["한동혁 일병이었던 것을 제거했다. 음성은 그쳤다. 그의 이름은 보고서 어디에도 남기지 않았다.","We put down what used to be Private Han. The voice went quiet. I left his name off every line of the report."],
  'C-097|right':["한동혁이었던 것을 산 채로 이송했다. 연구 가치가 있다고 했다. 가치라는 단어를 사람에게 쓰는 데 익숙해지고 있다.","We shipped what used to be Han away alive. They said it held research value. I am getting used to using the word value for a person."],
  'C-098|left':["감염체 마네킹을 원거리에서 정리했다. 접촉은 없었다. 접촉이 없으면 죄책감도 덜한지, 요즘 시험해보는 중이다.","We cleared the mannequin from a distance. No contact. Lately I test whether less contact means less guilt."],
  'C-098|right':["마네킹을 격리로 확보했다. Phase 1이라 예측은 가능하다고 했다. 예측 가능한 것과 안전한 것은 다르다.","We contained the mannequin. Phase 1, so it is predictable, they said. Predictable and safe are not the same thing."],
  'C-099|left':["Brood Drone 둥지를 태웠다. 편대는 와해됐다. 통신 메커니즘은 재와 함께 사라졌고, 윤세진은 아무 말도 하지 않았다.","We torched the Brood Drone nest. The swarm collapsed. The comms mechanism went up with the ash, and Se-jin said nothing."],
  'C-099|right':["지휘 개체를 산 채로 잡았다. 연구는 계속되고, 우리는 그것이 무엇과 통신하는지 아직 모른다.","We took the command unit alive. The research continues, and we still do not know what it talks to."],
  'C-100|left':["포자 발생원을 태웠다. 집합체는 형성되지 못했다. 방독면 너머로 본 것은, 그냥 곰팡이 슨 지하실이었다.","We burned the spore source. No aggregate formed. Behind the gas mask, it was just a mold-choked basement."],
  'C-100|right':["포자를 먼저 채취하고 태웠다. 차단제 연구가 가능하다고 했다. 무언가를 남기려 잠깐 멈추는 그 순간이, 늘 제일 위험하다.","We sampled the spores first, then burned them. A blocker might be possible, they said. That pause to keep something is always the most dangerous moment."],
  'C-089|left':["ORACLE의 선제 타격 권고를 받아들여 작전을 검토했다. 권고와 내 판단이 또 일치했다. 편한 일치일수록 오래 들여다봐야 한다.","I took up ORACLE's strike recommendation and began planning. Its counsel and my judgment aligned again. The more convenient the agreement, the longer I should stare at it."],
  'C-089|right':["ORACLE의 선제 타격 권고를 거부했다. 기록에 남을 것이다. 거부는 군에서 못 배운 유일한 기술인데, 늦게라도 배우는 중이다.","I refused ORACLE's pre-emptive strike. It will go on the record. Refusal is the one skill the army never taught me — I am learning it late."],
  'C-090|left':["강도윤의 긴급 호출에 먼저 움직였다. ORACLE 보고는 뒤로 미뤘다. 현장이 먼저인지 절차가 먼저인지 — 오늘의 답은 현장이었다.","I moved on Do-yun's emergency call first. The report to ORACLE waited. Field first or procedure first — today the answer was the field."],
  'C-090|right':["강도윤이 직접 보라고 했지만, 나는 ORACLE에 먼저 보고했다. 절차대로였다. 강도윤은 아무 말도 하지 않았고, 그 침묵이 오래 남았다.","Do-yun said to see it myself, but I reported to ORACLE first. By the book. He said nothing, and the silence stayed."],
  'C-019|left':["미분류 흔적에 경계만 강화했다. 성급하게 쫓지 않았다. 신중한 건지 겁이 난 건지, 나도 아직 구분이 안 된다.","I only tightened watch over the unclassified traces. I did not chase. Cautious or afraid, I still cannot tell the two apart."],
  'C-019|right':["미분류 흔적을 단독으로 추적하기로 했다. 보고 체계 밖으로 한 발 내디뎠다. 그 한 발이 어디까지 이어질지는 아직 모른다.","I chose to track the unclassified traces alone. One step outside the reporting chain. Where that step leads, I do not yet know."],
  'CA-001|left':["부임 첫날, 나는 보고서부터 폈다. 사람보다 숫자를 먼저 본 셈이다. 습관은 이렇게 첫날부터 자리를 잡는다.","My first day, and I opened the reports first. Numbers before faces. Habits take their seat on day one, just like this."],
  'CA-001|right':["부임 첫날, 나는 기지부터 걸었다. 보고서는 기다릴 수 있지만 사람 얼굴은 그날만의 것이라서.","My first day, and I walked the base first. Reports can wait; a person's face belongs only to that day."],
  'CA-002|left':["석 달치 보류 항목을 ORACLE 분류 그대로 결재했다. 빠르고 깔끔했다. 빠르고 깔끔한 결재가 늘 좋은 결재는 아니다.","I cleared three months of held items exactly as ORACLE sorted them. Fast and clean. Fast and clean is not always good."],
  'CA-002|right':["보류 항목을 부지휘관과 하나씩 다시 봤다. 오래 걸렸다. 그중 둘은 ORACLE 분류와 달랐고, 그 둘이 오래 마음에 남았다.","I went through the held items with my deputy, one by one. It took long. Two of them did not match ORACLE's sorting, and those two stayed with me."],
  'CA-006|left':["오늘도 ORACLE 권고대로 움직였다. 이유는 서로 다른데 결론이 늘 같다. 편한 일치가 제일 무섭다.","Again today I moved as ORACLE recommended. Different reasons, always the same conclusion. Convenient agreement is what frightens me most."],
  'CA-006|right':["ORACLE 권고를 한 번 접고 내 판단을 얹었다. 별일 아닌 결정이었지만, 내 손으로 한 결정이었다.","I set ORACLE's recommendation aside once and put my own judgment on top. A small call, but mine."],
  'CA-009|left':["첫 훈련을 강도윤 방식대로 뒀다. 실전 기준이라 거칠었다. 요원들 눈빛이 달라졌다 — 그게 이 기지엔 필요했다.","I let Do-yun run the first drill his way. Combat standard, rough. The agents' eyes changed, and this base needed that."],
  'CA-009|right':["첫 훈련은 ORACLE 프로토콜대로, 부상 위험 최소로 갔다. 안전했다. 안전한 훈련이 실전에서 사람을 지켜주는지는, 아직 모른다.","The first drill went by ORACLE protocol, injury risk minimized. Safe. Whether a safe drill protects anyone in the field, I do not yet know."],
  'CA-011|left':["고라니 떼였다. 대응은 불필요했지만, 나는 기록을 남겼다. 아무것도 아닌 걸 적어두는 습관이 언젠가 나를 살릴지도 모른다.","It was just deer. No response needed, but I logged it anyway. The habit of recording nothing-much may save me one day."],
  'CA-011|right':["고라니 떼였고, ORACLE 분류대로 넘겼다. 맞는 판단이었다. 맞는 판단만 쌓다 보면 언젠가 틀린 것도 맞다고 넘기게 된다.","Just deer, filed as ORACLE classified. The right call. Stack up only right calls, and one day you wave a wrong one through as right too."],
  'CA-012|left':["윤세진이 이상하다고 했고, 나는 관찰 기간을 더 줬다. 확신은 없었다. 확신 없이 그의 편을 든 건, 그를 믿기 때문이었다.","Se-jin said something felt off, so I extended the observation. No certainty. I took his side without it, because I trust him."],
  'CA-012|right':["윤세진의 찜찜함보다 ORACLE의 '정상 범주'를 택했다. 데이터가 그렇다니까. 그런데 사람의 찜찜함도 데이터의 일종 아닌가.","I chose ORACLE's within-normal-range over Se-jin's unease. The data said so. But is a person's unease not a kind of data too."],
  'CA-016|left':["서하은이 요약본과 원본의 수치가 다르다고 했다. 우리는 같이 다시 봤다. ORACLE 평가는 떨어졌지만, 나는 내 사람의 눈을 믿었다.","Ha-eun said the summary and the raw numbers did not match. We checked again, together. My ORACLE score dropped, but I trusted my own people's eyes."],
  'CA-016|right':["서하은이 수치가 다르다고 했지만, 재확인은 불필요하다고 넘겼다. 그가 '제가 잘못 봤겠죠'라고 했다. 나는 그 말을 정정하지 않았다.","Ha-eun said the numbers differed, but I called a recheck unnecessary. She said she must have misread. I did not correct her."],
  'CA-017|left':["센서 이상값을 ORACLE이 자동 보정했지만, 나는 수동 점검을 지시했다. 임재혁이 오래 화면을 봤다. 나도 그 화면을 오래 봤다.","ORACLE auto-corrected the sensor glitch, but I ordered a manual check anyway. Jaehyuk stared at the screen a while. So did I."],
  'CA-017|right':["센서는 ORACLE이 알아서 처리했다. 넘어갔다. 임재혁이 화면을 조금 오래 바라봤는데, 나는 그 시선의 의미를 묻지 않았다.","ORACLE handled the sensor. I let it go. Jaehyuk looked at the screen a beat too long, and I did not ask what the look meant."],
  'CA-018|left':["화면 하단에 뭔가 깜박였다 사라졌다. 0.3초. 나는 그걸 기록했다. 단말기 너머에 층이 하나 더 있다는 걸, 그날 처음 적었다.","Something flickered at the bottom of the screen and vanished. Three-tenths of a second. I logged it. That was the day I first wrote down that there is another layer behind the terminal."],
  'CA-018|right':["화면에 뭔가 깜박였지만, 잔상으로 처리했다. ORACLE 평가는 올랐다. 못 본 걸로 하면 편하다. 편한 건 늘 대가가 있다.","Something flickered on the screen, but I filed it as an afterimage. My ORACLE score rose. Choosing not to have seen it is easy. Easy always has a price."],
  'CA-014|left':["ORACLE 응답이 0.8초 늦었다. 처음 있는 일이라고 했다. 서버 부하겠지. 그래도 나는 기록해두라고 했다 — 처음이라는 말이 걸려서.","ORACLE answered 0.8 seconds late. First time on record, they said. Server load, probably. Still I had it logged, because the word first snagged on me."],
  'CA-014|right':["ORACLE의 0.8초 지연을 정상 범주로 넘겼다. 별거 아닐 것이다. 별거 아닌 것들이 며칠 뒤 겹치기 시작하면, 그때는 이미 늦다.","I waved off ORACLE's 0.8-second lag as normal. Probably nothing. When the nothings start stacking days later, it is already too late."]
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
  var moodFor=function(d,evs,act,bondIdx){
    // 1순위: 그날 해금 로그의 아크 이벤트 (간부 상실·세진 지연)
    for(var i=0;i<evs.length;i++){
      if(evs[i].t==='log'){var ek=journalEventKey(evs[i].id);if(ek)return JOURNAL_MOODS_EVENT[ek]}
    }
    // 2순위: 선택 기반 메모 — 임팩트 있는 카드 선택(카드ID|방향)에 붙인 전용 소회. 플레이어 선택이 일지에 남는 체감.
    for(var ci=0;ci<evs.length;ci++){ if(evs[ci].t==='card'&&evs[ci].id){ var _mc=MEMO_BY_CHOICE[evs[ci].id+'|'+(evs[ci].d||'')]; if(_mc)return _mc; } }
    // 3순위: 이브닝/대화 유대 — 그날 누구와 어떤 톤으로 교감했는지(플레이어 선택 반영). day 해시로 루트/Act 풀과 교대.
    for(var bi=0;bi<evs.length;bi++){ if(evs[bi].t==='bond'&&evs[bi].id&&JOURNAL_MOODS_BOND[evs[bi].id]){ var bp=JOURNAL_MOODS_BOND[evs[bi].id]; var tone=(evs[bi].d==='cold')?'cold':'warm'; var barr=bp[tone]||bp.warm||bp.cold; if(barr&&barr.length&&journalHash(d,'bond')%3===0){ return barr[(typeof bondIdx==='number'?bondIdx:journalHash(d,evs[bi].id+tone))%barr.length]; } break; } }
    // 4순위: 그날의 루트(r) — 매일 반복되지 않게 day 해시로 Act 풀과 교대
    var route=(evs.filter(function(e){return e.r})[0]||{}).r||'';
    if(route&&JOURNAL_MOODS_ROUTE[route]&&journalHash(d,'alt')%2===0){
      var rp=JOURNAL_MOODS_ROUTE[route];return rp[journalHash(d,route)%rp.length];
    }
    // 5순위: Act 기본 풀
    var ap=JOURNAL_MOODS[act]||JOURNAL_MOODS[1];return ap[journalHash(d,act)%ap.length];
  };
  // 유대 소회 반복 방지: 게이트 통과하는 유대일을 시간순으로 세어 (인물+톤)별 변형을 순환시킨다.
  var _bondSeq={},_bondCnt={};
  days.slice().sort(function(a,b){return a-b}).forEach(function(dd){var de=byDay[dd]||[];for(var i=0;i<de.length;i++){if(de[i].t==='bond'&&de[i].id&&JOURNAL_MOODS_BOND[de[i].id]){if(journalHash(dd,'bond')%3===0){var k=de[i].id+(de[i].d==='cold'?'cold':'warm');_bondSeq[dd]=_bondCnt[k]||0;_bondCnt[k]=(_bondCnt[k]||0)+1;}break;}}});
  return h(React.Fragment,null,
    deckLine&&h('div',{className:'jr-deck'},deckLine),
    pager(),
    pageDays.map(function(d){
      var evs=byDay[d];
      var act=(evs.filter(function(e){return e.act})[0]||{}).act||1;
      var mood=moodFor(d,evs,act,_bondSeq[d]);
      var lines=evs.map(lineFor).filter(Boolean);
      return h('div',{key:'jd'+d,className:'jr-day'},
        h('div',{className:'jr-day-h'},'DAY '+d+' — ACT '+act),
        lines.length?lines.map(function(l,i){return h('div',{key:i,className:'jr-line'},l)}):h('div',{className:'jr-line jr-line-dim'},isEn?'· (no notable record)':'· (특기 기록 없음)'),
        h('div',{className:'jr-mood'},'✎ '+(isEn?mood[1]:mood[0])));
    }),
    pager());
}
