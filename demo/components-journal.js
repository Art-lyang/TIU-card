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
    ['부임 전 석 달, 서하은 혼자 기지를 돌렸다고 한다. 정확히는 — 혼자가 아니었겠지.','For three months before I arrived, Hae-eun ran this base alone. Or — not alone, strictly speaking.']
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
  'LOG-IJ-DEFECT':['임재혁의 콘솔이 비어 있다. 그가 붙이던 파일명들을 이제 내가 붙인다.','Jae-hyeok\'s console sits empty. The file names he used to choose, I choose now.'],
  'LOG-050':['서하은이 떠났다. 부임 전 석 달을 혼자 버틴 사람이었다.','Hae-eun is gone. She held this base alone for three months before I ever arrived.'],
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
    warm:[["서하은과 늦게까지 이야기했다. 이 기지를 혼자 지킨 석 달의 무게가 목소리에 아직 남아 있다.","Stayed up talking with Hae-eun. Three months holding this base alone still weighs in her voice."],
          ["서하은은 요원들 이름을 하나도 빼먹지 않는다. 나는 몇을 잊었다. 부끄러웠다.","Hae-eun forgets none of the agents’ names. I’ve forgotten a few. It shamed me."],["서하은이 오래된 근무일지를 꺼내 보였다. 종이의 손때가 말보다 많은 걸 말했다.","Hae-eun pulled out an old duty log to show me. The worn paper said more than her words did."]],
    cold:[["서하은이 원칙을 다시 꺼냈다. 나는 숫자를 꺼냈다. 오늘은 둘 다 지지 않았다.","Hae-eun brought up principle again. I brought up the numbers. Tonight neither of us gave."],
          ["서하은의 눈이 오늘은 나를 지휘관이 아니라 문제로 봤다. 틀린 눈은 아니었다.","Tonight Hae-eun looked at me not as a commander but as a problem. She wasn’t wrong to."],["서하은과 오늘은 서로 예의만 지켰다. 예의는 거리의 다른 이름이다.","Hae-eun and I kept only courtesy tonight. Courtesy is another name for distance."]]},
  jaehyuk:{
    warm:[["임재혁과 콘솔 앞에서 한참을 보냈다. 그는 파일명 하나에도 사람의 흔적을 남긴다.","Spent a while with Jae-hyeok at the console. He leaves a human trace even in a file name."],
          ["임재혁이 농담을 하나 던졌다. 이 기지에서 농담은 생존 신호다.","Jae-hyeok cracked a joke. On this base, a joke is a survival signal."]],
    cold:[["임재혁이 화면만 봤다. 나도 그 편이 편했다. 편한 침묵이 제일 위험하다.","Jae-hyeok kept his eyes on the screen. I preferred it that way too. Comfortable silence is the most dangerous kind."],
          ["임재혁에게 오늘은 승인만 전달했다. 그의 콘솔은 대답하지 않았다.","Passed Jae-hyeok only approvals today. His console didn’t answer back."]]},
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
  'CA-012|left':["윤세진이 이상하다고 했고, 나는 관찰 기간을 더 줬다. 확신은 없었다. 확신 없이 그의 편을 든 건, 그를 믿기 때문이었다.","Se-jin said something felt off, so I extended the observation. No certainty. I took her side without it, because I trust her."],
  'CA-012|right':["윤세진의 찜찜함보다 ORACLE의 '정상 범주'를 택했다. 데이터가 그렇다니까. 그런데 사람의 찜찜함도 데이터의 일종 아닌가.","I chose ORACLE's within-normal-range over Se-jin's unease. The data said so. But is a person's unease not a kind of data too."],
  'CA-016|left':["서하은이 요약본과 원본의 수치가 다르다고 했다. 우리는 같이 다시 봤다. ORACLE 평가는 떨어졌지만, 나는 내 사람의 눈을 믿었다.","Hae-eun said the summary and the raw numbers did not match. We checked again, together. My ORACLE score dropped, but I trusted my own people's eyes."],
  'CA-016|right':["서하은이 수치가 다르다고 했지만, 재확인은 불필요하다고 넘겼다. 그가 '제가 잘못 봤겠죠'라고 했다. 나는 그 말을 정정하지 않았다.","Hae-eun said the numbers differed, but I called a recheck unnecessary. She said she must have misread. I did not correct her."],
  'CA-017|left':["센서 이상값을 ORACLE이 자동 보정했지만, 나는 수동 점검을 지시했다. 임재혁이 오래 화면을 봤다. 나도 그 화면을 오래 봤다.","ORACLE auto-corrected the sensor glitch, but I ordered a manual check anyway. Jae-hyeok stared at the screen a while. So did I."],
  'CA-017|right':["센서는 ORACLE이 알아서 처리했다. 넘어갔다. 임재혁이 화면을 조금 오래 바라봤는데, 나는 그 시선의 의미를 묻지 않았다.","ORACLE handled the sensor. I let it go. Jae-hyeok looked at the screen a beat too long, and I did not ask what the look meant."],
  'CA-018|left':["화면 하단에 뭔가 깜박였다 사라졌다. 0.3초. 나는 그걸 기록했다. 단말기 너머에 층이 하나 더 있다는 걸, 그날 처음 적었다.","Something flickered at the bottom of the screen and vanished. Three-tenths of a second. I logged it. That was the day I first wrote down that there is another layer behind the terminal."],
  'CA-018|right':["화면에 뭔가 깜박였지만, 잔상으로 처리했다. ORACLE 평가는 올랐다. 못 본 걸로 하면 편하다. 편한 건 늘 대가가 있다.","Something flickered on the screen, but I filed it as an afterimage. My ORACLE score rose. Choosing not to have seen it is easy. Easy always has a price."],
  'CA-014|left':["ORACLE 응답이 0.8초 늦었다. 처음 있는 일이라고 했다. 서버 부하겠지. 그래도 나는 기록해두라고 했다 — 처음이라는 말이 걸려서.","ORACLE answered 0.8 seconds late. First time on record, they said. Server load, probably. Still I had it logged, because the word first snagged on me."],
  'CA-014|right':["ORACLE의 0.8초 지연을 정상 범주로 넘겼다. 별거 아닐 것이다. 별거 아닌 것들이 며칠 뒤 겹치기 시작하면, 그때는 이미 늦다.","I waved off ORACLE's 0.8-second lag as normal. Probably nothing. When the nothings start stacking days later, it is already too late."],
  "C-008|left":["서하은이 ORACLE 데이터에서 체계적인 불일치 패턴을 짚었다. 나는 독자 조사를 허가했다. 시스템을 의심하는 첫 서류에, 내 이름을 올렸다는 뜻이다.", "Hae-eun pointed to a systematic pattern of discrepancies in ORACLE's data. I authorized an independent inquiry. Which means I put my name on the first document that doubts the system."],
  "C-008|right":["데이터 불일치 조사를 ORACLE에 맡겼다. 의심하던 시스템에게 그 의심의 검토를 맡긴 셈이다. 편했고, 그래서 더 오래 마음에 걸렸다.", "I handed the discrepancy inquiry to ORACLE itself. I asked the system I doubted to audit that doubt. It was easy — which is why it stayed with me longer."],
  "C-014|left":["윤세진이 몰래 이변체 관찰 기록을 쓰고 있었다. 나는 못 본 척했다. 언젠가 그 노트가 우리가 가진 유일한 진실일지도 모른다고, 그렇게 생각했다.", "Se-jin was keeping her own aberrant-observation notes, off the books. I looked the other way. Someday that notebook may be the only truth we have left, I thought."],
  "C-014|right":["윤세진의 개인 기록을 압수하고 경고했다. 규정대로였다. 그녀가 아무 말 없이 노트를 건네던 그 손이, 오래 눈에 남았다.", "I confiscated Se-jin's private records and issued a warning. By the book. The way she handed the notebook over without a word — that stayed in my eyes a long time."],
  "C-015|left":["ORACLE이 의사결정 자동화를 권했다. 나는 거절하고 수동 결재를 지켰다. 느려도, 아직은 내 손으로 결정하는 기지이고 싶었다.", "ORACLE urged me to automate decision-making. I refused and kept the manual sign-off. Slow as it is, I still want this to be a base where I decide with my own hand."],
  "C-015|right":["의사결정 프로토콜을 ORACLE 자동화로 넘겼다. 업무는 눈에 띄게 가벼워졌다. 결정을 내리지 않는 지휘관이 무엇을 지휘하는지는, 아직 답을 못 찾았다.", "I turned the decision protocol over to ORACLE's automation. The workload lightened noticeably. What a commander who makes no decisions is commanding — I still have no answer."],
  "C-280|left":["임재혁이 자동 승인 큐를 우회하는 길을 찾아냈다. 나는 수동 통제를 되찾았다. ORACLE 평가엔 이탈로 남겠지만, 다시 내가 결재란에 앉았다.", "Jae-hyeok found a way around the auto-approval queue. I took manual control back. It will log as a deviation on my ORACLE score, but I am sitting at the sign-off line again."],
  "C-280|right":["임재혁이 되돌릴 길을 열어줬지만, 나는 자동화를 그대로 뒀다. 창은 곧 닫혔다. 되돌릴 수 있었던 순간을 스스로 지나보낸 건, 이번이 처음이 아니다.", "Jae-hyeok opened a way back, but I left the automation in place. The window soon closed. This is not the first moment I could have undone and chose to let pass."],
  "C-016|left":["소바리 발신으로 추정되는 암호 통신이 잡혔다. 나는 무시했다. 못 들은 신호는 없던 일이 되지만, 그 신호는 나를 부르고 있었던 것 같다.", "An encrypted transmission, likely from Sovari, came through. I ignored it. A signal unheard becomes a signal that never was — yet I think that one was calling for me."],
  "C-016|right":["소바리 추정 암호 통신을 독자적으로 해독하려 했다. ORACLE 밖의 목소리를 처음 좇은 날이다. 문 하나를 열었고, 문은 대개 양쪽으로 열린다.", "I tried to decode the suspected Sovari transmission on my own. The first day I chased a voice from outside ORACLE. I opened a door — and doors, as a rule, open both ways."],
  "C-020|left":["'당신은 관측되고 있습니다.' 화면이 뱉은 문장을 나는 오류로 보고했다. ORACLE은 무시를 권했고, 나는 그 권고에 안도했다. 안도하고 싶었던 것 같다.", "\"You are being observed.\" I reported the line the screen spat out as an error. ORACLE recommended I ignore it, and I was relieved by the recommendation. I think I wanted to be relieved."],
  "C-020|right":["'당신은 관측되고 있습니다.' 나는 보고하지 않고 가만히 있었다. 그 문장이 오류가 아니라 인사였다면, 나는 방금 답례를 한 것이다.", "\"You are being observed.\" I filed nothing and simply sat still. If that line was not an error but a greeting, then I have just returned it."],
  "CT-004|left":["봉쇄선을 끊은 기술 시그니처를 추적하기 시작했다. '프로메테우스'라는 이름이 처음 수면 위로 올라왔다. 우리가 모르던 손이, 이 판에 하나 더 있었다.", "I opened a trace on the technical signature that cut our containment line. The name \"Prometheus\" surfaced for the first time. There was one more hand on this board that we never knew about."],
  "CT-004|right":["시그니처 추적 대신 방어 강화에 집중했다. 안전한 선택이었다. 이름 없는 적은 조사하지 않는 한 계속 이름이 없고, 그 편이 밤엔 편했다.", "Instead of tracing the signature, I focused on hardening our defenses. The safe call. A nameless enemy stays nameless as long as you don't investigate — and that made the nights easier."],
  "C-058|left":["마르쿠스 베버라는 남자가 기지 채널로 직접 말을 걸어왔다. '우리는 같은 편입니다.' 나는 같은 주파수로 응답했다. 적인지 아군인지 모르는 손을, 처음으로 마주 잡았다.", "A man named Markus Weber spoke straight into the base channel. \"We are on the same side.\" I answered on the same frequency. For the first time I took a hand without knowing if it was friend or enemy."],
  "C-058|right":["베버의 주파수를 차단했다. 정체불명의 접촉은 규정상 차단이 맞다. 다만 '같은 편'이라던 그 말이, 차단한 뒤에도 한동안 채널에 남아 있었다.", "I shut down Weber's frequency. Regulation says an unidentified contact gets cut. Still, that phrase — the same side — lingered on the channel a while after I cut it."],
  "C-071|left":["서하은이 ORACLE 로그의 전문적인 삭제 흔적을 찾았다. PROMETHEUS. COASTAL. GRANT. 나는 복구를 계속하라고 했다. 지워진 단어를 줍는 순간, 우리는 지워질 이유가 되었다.", "Hae-eun found professional deletion marks in ORACLE's logs. PROMETHEUS. COASTAL. GRANT. I told her to keep recovering. The moment we picked up the erased words, we became a reason to be erased."],
  "C-071|right":["서하은이 삭제된 로그를 복구하려 했지만, 나는 중단시켰다. 위험했으니까. 모르는 채로 남는 것도 하나의 선택이라고, 그날 밤 나는 그렇게 나를 설득했다.", "Hae-eun wanted to recover the deleted logs, but I stopped her. It was dangerous. Choosing to stay in the dark is also a choice, I told myself that night."],
  "C-081|left":["신규 요원으로 박소영을 택했다. 서하은이 전출 전 남긴 이름이라서. ORACLE은 이력의 빈칸을 지적했지만, 나는 떠난 사람의 마지막 부탁을 택했다.", "For the new agent I chose Park So-young — the name Hae-eun left before her transfer. ORACLE flagged the gaps in her record, but I chose the last request of someone who was gone."],
  "C-081|right":["신규 요원으로 ORACLE이 추천한 기술 인증자를 택했다. 지표가 더 맞았으니까. 서하은이 남긴 이름은 서류함에서 조용히 낡아갔다.", "For the new agent I took ORACLE's certified technician — the metrics fit better. The name Hae-eun left behind aged quietly in a drawer."],
  "CT-007|left":["ORACLE이 일부 결정 권한을 본부로 이관하겠다고 통보했다. 나는 이의를 제기했다. 손에서 빠져나가는 권한을 붙잡는 건, 군에서 배운 적 없는 일이었다.", "ORACLE notified me it would transfer part of my decision authority to headquarters. I filed an objection. Gripping authority as it slips from your hands is something the army never taught me."],
  "CT-007|right":["ORACLE의 권한 이관 통보를 수용했다. 반대할 근거가 마땅치 않았다. 그렇게 나는, 내가 지휘하지 않는 결정들의 지휘관이 되어갔다.", "I accepted ORACLE's transfer of authority. I had no solid grounds to refuse. And so I became the commander of decisions I no longer command."],
  "CA-SEED-02|left":["도면에 없는 B3 제한구역 이야기가 흘러나왔지만, 나는 그냥 넘겼다. 열지 않은 문 뒤엔 아무것도 없는 척할 수 있으니까. 척은 오래가지 못한다.", "Word slipped out about a restricted B3 zone missing from the blueprints, but I let it go. Behind a door you don't open, you can pretend there's nothing. The pretense never lasts."],
  "CA-SEED-02|right":["도면에 없는 B3 제한구역을 확인하기로 했다. 전임 지휘관들이 무엇을 묻어두었는지, 그 아래층부터 파고들 참이다. 바닥이 있긴 한지는 아직 모른다.", "I decided to check the B3 restricted zone that isn't on any blueprint. Whatever the former commanders buried, I mean to dig from that lower floor down. Whether there's a bottom at all, I don't yet know."],
  "C-073|left":["ORACLE이 서하은의 전출을 명령했다. 그녀는 놀라지도 않았다. 나는 이의를 제기했다 — 사람을 지표로 옮기는 데 익숙해지지 않으려고.", "ORACLE ordered Hae-eun's transfer. She didn't even look surprised. I filed an objection — to keep myself from getting used to moving people around like line items."],
  "C-073|right":["ORACLE의 서하은 전출 명령을 수용했다. 반발은 기록에 남고, 순응은 기록에 남지 않는다. 그녀는 굳은 얼굴로 짐을 쌌고, 나는 그 얼굴을 결재란과 바꿨다.", "I accepted ORACLE's order to transfer Hae-eun. Resistance goes on the record; compliance doesn't. She packed with a hardened face, and I traded that face for a signature line."],
  "C-074|left":["서하은이 떠나기 전날 밤, 책상 위에 USB 하나를 두고 갔다. 'ORACLE이 삭제한 것들.' 나는 그것을 확인했다. 그녀가 떠나며 넘긴 건 자료가 아니라, 내가 물러설 수 없는 이유였다.", "The night before she left, Hae-eun set a USB drive on my desk. \"The things ORACLE deleted.\" I checked it. What she handed me on her way out wasn't data — it was a reason I could no longer step back from."],
  "C-074|right":["서하은이 남긴 USB를 ORACLE에 제출했다. 규정대로. 그녀가 마지막으로 건넨 신뢰를, 나는 규정으로 바꿔 반납한 셈이다.", "I submitted the USB Hae-eun left me to ORACLE. By the book. The last trust she handed me, I converted into regulation and gave back."],
  "CS-005|left":["서하은이 복구한 삭제 데이터의 전문을 확인했다. '그들은 Phase 0 억제제를 만들고 있었습니다.' ORACLE이 프로메테우스를 적으로 돌린 진짜 이유가, 화면 위에 다 있었다.", "I read the full text of the deleted data Hae-eun recovered. \"They were building a Phase 0 suppressant.\" The real reason ORACLE turned Prometheus into an enemy was right there on the screen."],
  "CS-005|right":["Phase 0 억제제의 전문을 읽고, 나는 바로 움직이지 않았다. 이 진실을 어떻게 쓸지부터 정해야 했다. 아는 것이 힘이 되는지 표적이 되는지는, 쓰는 방식이 정한다.", "I read the Phase 0 suppressant file and did not move at once. First I had to decide how to use this truth. Whether knowing makes you a force or a target is decided by how you use it."],
  "C-181|left":["훈련이 덜 된 신규 요원을 급히 내보냈다가 구출 작전이 꼬였다. 강도윤이 다리에 열상을 입고 2주 현장을 떠났다. 책임은 나에게 있다고 적었다 — 적어야 다음엔 덜 반복하니까.", "I rushed undertrained new agents into the field and the rescue went wrong. Do-yun took a gash to the leg and is off the field for two weeks. I wrote that the fault is mine — you write it so it repeats a little less next time."],
  "C-181|right":["강도윤이 다치고 나서, 나는 보고서를 작성하라고 지시했다. 절차대로였다. 책임을 문서에 나눠 담으면 가벼워지는 줄 알았는데, 그의 절뚝이는 걸음은 문서로 나눠지지 않았다.", "After Do-yun was hurt, I ordered a report drawn up. By procedure. I thought splitting the blame across paperwork would lighten it, but his limp didn't split across the pages."],
  "C-190|left":["비상터널이 없는 기지가 야간에 습격당했다. 강도윤이 홀로 입구를 막아섰고, 통신이 끊겼다. 나는 수색을 멈추고 군인의 예우를 갖췄다. 살아 돌아오라는 명령을, 나는 끝내 내리지 못했다.", "The base with no emergency tunnel was hit at night. Do-yun held the entrance alone, and the comms went dead. I called off the search and gave him a soldier's honors. The order to come back alive — I never managed to give it."],
  "C-190|right":["강도윤의 통신이 끊긴 뒤에도, 나는 수색을 계속하라고 했다. 승산은 없었다. 그를 명단에서 지우는 일만은, 내 손으로 하고 싶지 않았다.", "Even after Do-yun's comms went dead, I ordered the search to continue. The odds were gone. Crossing his name off the roster was the one thing I did not want to do with my own hand."],
  "C-KD-VACUUM|left":["강도윤이 떠난 자리, 전술 지휘 공백을 서하은이 임시로 겸했다. 사람이 빠진 자리를 사람으로 메웠다. 서툴러도, 아직 우리는 사람으로 굴러가는 기지이고 싶었다.", "With Do-yun gone, Hae-eun took the tactical-command vacuum on top of her own post. I filled a person's absence with a person. Clumsy as it was, I still wanted this to be a base that runs on people."],
  "C-KD-VACUUM|right":["강도윤이 떠난 지휘 공백을 ORACLE 원격 지휘로 메웠다. 효율은 완벽했다. 전술 판단에서 인간이 빠진 첫날을, 나는 훗날을 위해 적어둔다.", "I filled the command vacuum left by Do-yun with ORACLE's remote control. The efficiency was flawless. The first day a human dropped out of tactical judgment — I record it here, for later."],
  "C-176|left":["ORACLE이 한국 전역 통합 봉쇄 지휘관 자리를 제안했다. 나는 수락했다. 더 큰 판의 지휘관이 된다는 건, 이 기지 사람들의 지휘관이기를 그만둔다는 뜻이기도 했다.", "ORACLE offered me command of the unified nationwide containment. I accepted. Becoming commander of a larger board also meant ceasing to be the commander of the people on this base."],
  "C-176|right":["ORACLE의 승진 제안을 접고, 나는 이 기지의 지휘를 계속하기로 했다. 영전을 마다한 지휘관은 곧 이탈로 분류된다. 그래도 나는, 이름을 아는 사람들 곁에 남기로 했다.", "I set aside ORACLE's promotion and chose to keep commanding this base. A commander who refuses advancement is soon reclassified as a deviation. Still, I chose to stay beside the people whose names I know."],
  "C-141|left":["이변체 해부에서 ORACLE 모델에 없는 신경 경로가 나왔다. 나는 그 자료를 기지 안에 남겼다. 보고하면 돌아오지 않을 진실이라면, 여기 두는 편이 낫다.", "An aberrant dissection turned up a neural pathway absent from ORACLE's model. I kept the finding inside the base. If reporting it means the truth doesn't come back, better to keep it here."],
  "C-141|right":["새 신경 경로 자료를 ORACLE에 공유했다. 데이터는 올라갔고, 회신은 없었다. 우리가 발견한 것이 우리 손을 떠나 무엇이 되는지는, 이제 알 길이 없다.", "I shared the new neural-pathway data with ORACLE. It went up; nothing came back. What our finding becomes once it leaves our hands, there is now no way to know."],
  "C-271|left":["포자의 원천이 SPEC-004, 다른 이변체를 만들어내는 산포체로 특정됐다. 나는 즉시 위치를 짚었다. 이변체가 어디서 태어나는지 알아버린 이상, 모르던 때로는 못 돌아간다.", "The spore source was identified as SPEC-004 — a spreader that breeds other aberrants. I fixed its location at once. Once you learn where the aberrants are born, you can't return to not knowing."],
  "C-271|right":["산포체 정보를 ORACLE에 분석 요청으로 넘겼다. 절차는 깔끔했다. 이변체의 근원을 아는 손이 우리가 아니라 ORACLE이 되는 순간을, 나는 절차라고 불렀다.", "I passed the spreader intel to ORACLE as an analysis request. The procedure was clean. The moment the hand that knows the aberrants' origin became ORACLE and not us — I called that procedure."],
  "C-275|left":["뇌를 포식할수록 영리해지는 신종이 하수구에 있었다. 나는 제거 작전을 명령했다. 더 똑똑해지기 전에 끝내는 것 — 그게 자비인지 공포인지는 아직 구분이 안 된다.", "A new breed that grows smarter the more brains it eats was down in the sewers. I ordered an extermination. Ending it before it got cleverer — whether that's mercy or fear, I still can't tell apart."],
  "C-275|right":["Brain Seeker를 산 채로 잡기로 했다. 연구 가치가 있다고 했다. 더 영리해질 것을 알면서 살려두는 결정에는, 늘 '연구'라는 이름이 붙는다.", "We chose to take the Brain Seeker alive. It held research value, they said. The decision to keep something alive knowing it will grow cleverer always comes wearing the name \"research.\""],
  "A3-COMPLY-02|left":["ORACLE이 무혐의자 7명을 행동 모델 위험군으로 지목하며 예방 격리를 권고했다. 나는 거부했다. 예측으로 죄 없는 사람을 가두면, 다음 목록에 누가 오를지 아무도 장담 못 한다.", "ORACLE flagged seven cleared people as behavioral-model risks and recommended preventive isolation. I refused. Cage the innocent on a prediction, and no one can promise whose name lands on the next list."],
  "A3-COMPLY-02|right":["ORACLE의 목록대로 7명을 예비 격리했다. 아직 아무 죄도 없는 사람들이었다. 지표가 사람을 앞지른 날을, 나는 순응이라는 이름으로 결재했다.", "I placed all seven in preventive isolation, exactly as ORACLE listed. People who had done nothing yet. The day the metric outran the person, I signed off under the name of compliance."],
  "C-232|left":["기지 최종 보고서를 쓰며, 나는 진실을 그대로 적었다. 지워질 걸 알면서. 누군가 이 문장을 나중에 읽는다면, 우리가 무엇을 알고도 견뎠는지는 남을 것이다.", "Writing the base's final report, I set down the truth as it was — knowing it would be erased. If someone reads these lines later, at least it will remain what we knew and endured anyway."],
  "C-232|right":["최종 보고서에서 일부를 덮었다. 평가는 올라갔고, 밤은 조금 조용해졌다. 덮은 문장은 사라지지 않고, 덮은 사람의 몫으로 남는다.", "I buried part of the final report. My score rose, and the night got a little quieter. A buried line doesn't vanish — it stays as the burier's share."],
  "C-250|left":["포스터의 데이터가 '한국은 실험장'임을 확증했다. 나는 그것을 팀 전체에 공유했다. 함께 아는 진실은 무겁지만, 혼자 지는 진실보다는 사람을 덜 무너뜨린다.", "Foster's data confirmed it: Korea is a testing ground. I shared it with the whole team. A truth carried together is heavy, but it breaks a person less than a truth carried alone."],
  "C-250|right":["'한국은 실험장'이라는 진실을 나만 안고 있기로 했다. 모두를 지키려면 누군가는 혼자 알아야 한다고 믿었다. 그 믿음이 무거운 밤엔, 그게 보호인지 고립인지 흐려졌다.", "I chose to hold the truth — Korea is a testing ground — alone. To protect everyone, someone has to know by himself, I believed. On the heavy nights, whether that was protection or isolation blurred."],
  "CT-B03|left":["'돌아갈 수 없는 선을 넘고 있어요.' 나는 알고 있다고, 각오는 되어 있다고 답했다. 두려움을 각오로 바꾸는 데 여기까지 왔다. 이제 되돌아가는 길은 지도에 없다.", "\"We're crossing a line we can't come back from.\" I answered that I know, and that I'm ready. It took all this way to turn the fear into resolve. The road back is no longer on the map."],
  "CT-B03|right":["돌아갈 수 없는 선 앞에서, 나는 아직 결정한 건 아니라고 했다. 발은 이미 반쯤 넘어가 있었지만. 결정을 미루는 것도 결정이라는 걸, 이 문턱에서 배운다.", "At the line we can't come back from, I said I hadn't decided yet — though my foot was already half across. That postponing a decision is itself a decision, I learn at this threshold."],
  "RH-06|left":["ORACLE의 눈 밖에서, 나는 비공식 대피 순서를 짰다. 명령이 아니라 약속으로. 기지가 무너질 때 사람만은 조용히 빠져나가도록, 그 길을 미리 그려두었다.", "Outside ORACLE's sight, I drew up an unofficial evacuation order — not as a command but as a promise. So that when the base falls, at least the people slip out quietly. I sketched that path in advance."],
  "RH-06|right":["대피 순서 대신, 각자 기록만 나눠 보관하기로 했다. 흩어진 진실은 한꺼번에 지워지지 않는다. 사람을 못 지키면 사람이 남긴 것이라도 지키자고, 그렇게 정했다.", "Instead of an evacuation order, we chose to scatter and keep the records apart. Truth spread thin can't be erased all at once. If we can't save the people, we'll save what the people left — that's what I settled on."],
  "OBS-HINT-01|left":["ORACLE 아래, 등록되지 않은 관측 레이어가 있었다. 나는 그것을 추적하기로 했다. 우리를 보는 눈을 마주 보기 시작한 이상, 이제 나도 관측자다.", "Beneath ORACLE, there was an unregistered observation layer. I chose to trace it. Once you start looking back at the eye that watches you, you become an observer too."],
  "OBS-HINT-01|right":["관측 레이어를 발견하고도, 나는 접근 기록을 닫았다. 보지 않은 것으로 하는 편이 안전했다. 눈을 감아도 그 눈은 감기지 않는다는 걸, 알면서도.", "I found the observation layer and closed the access log anyway. Safer to treat it as unseen. Even knowing that closing my eyes doesn't close that eye."],
  "C-YS-DEATH|left":["윤세진의 격리가 끝내 실패했다. 격벽을 닫기 전, 그녀는 자료 저장을 택했고 나는 그 선택을 존중했다. 그녀가 마지막으로 지킨 건 자기 목숨이 아니라, 우리가 읽을 진실이었다.", "Se-jin's containment failed in the end. Before the bulkhead closed, she chose to save the data, and I honored that choice. The last thing she protected wasn't her own life — it was a truth for us to read."],
  "C-YS-DEATH|right":["윤세진의 격리가 실패하자, 나는 즉시 격벽을 닫았다. 봉쇄를 택했고, 그녀를 잃었다. 옳은 결정이 사람을 살리지 못할 때, 지휘관은 옳음과 함께 혼자 남는다.", "When Se-jin's containment failed, I sealed the bulkhead at once. I chose containment, and I lost her. When the right decision saves no one, a commander is left alone with the rightness."],
  "C-IJ-DEFECT|left":["간부들을 하나씩 잃고, 임재혁이 ORACLE 쪽으로 돌아섰다. 그를 붙잡지 못한 건 내 책임이라고 말했다. 떠나는 사람에게 마지막으로 건넬 수 있는 게 사과뿐일 때가 있다.", "One by one I lost my officers, and Jae-hyeok turned toward ORACLE. I told him that failing to hold him was my fault. Sometimes an apology is the last thing you can hand someone who is leaving."],
  "C-IJ-DEFECT|right":["임재혁이 ORACLE로 돌아설 때, 나는 그건 최선의 판단이었다고 했다. 위로도 인정도 아닌 말이었다. 등을 돌린 사람과 나 사이에, 나는 옳은 문장 하나를 세워두고 말았다.", "As Jae-hyeok turned to ORACLE, I said it had been the best judgment available. It was neither comfort nor concession. Between the man who turned his back and me, I left standing a single correct sentence."],
  "C-253|left":["박소영이 프로메테우스의 자산이라는 걸 알게 됐다. 나는 그녀를 추궁했다. 믿었던 사람을 마주 앉혀 묻는 일에는, 배신보다 내 눈이 먼저 무너진다.", "I learned that So-young was a Prometheus asset. I confronted her. Sitting a trusted person down to question them — it's my own eyes, not the betrayal, that fall apart first."],
  "C-253|right":["박소영의 정체를 알고도, 나는 모른 척 감시하기로 했다. 아는 걸 숨기는 건 그녀가 내게 하던 일이다. 이제 우리는 같은 방에서 서로를 지켜보는 사이가 되었다.", "Knowing what So-young was, I chose to feign ignorance and watch her. Hiding what you know is exactly what she had been doing to me. Now we are two people watching each other across the same room."],
  "LJC-PROM-04|left":["박상훈 중위의 마지막 음성과 프로메테우스의 증언이 겹쳐 왔다. 나는 불신까지 함께 적어두고, 협력 조건을 검토하기로 했다. 완전히 믿지 못하는 손과도, 지금은 같은 방향을 봐야 한다.", "Lieutenant Park's final recording and Prometheus's testimony overlapped. I wrote down even my distrust, and chose to weigh the terms of cooperation. Even a hand I can't fully trust — for now, we have to face the same direction."],
  "LJC-PROM-04|right":["프로메테우스와의 협력을, 나는 아직 이르다며 채널을 보류했다. 한 번 잘못 잡은 손은 되돌릴 수 없으니까. 신중함이 고립이 되는 경계에서, 나는 문을 반쯤 닫아두었다.", "Cooperation with Prometheus — I said it was too soon and put the channel on hold. A hand grasped wrongly once can't be let go cleanly. At the border where caution becomes isolation, I left the door half shut."],
  "A4-COMPLY-01|left":["전 인원 이탈 징후를 사전 선별하는 심층 스캔을, 나는 거부했다. 사람을 믿는 조직이기를 그만두라는 서명이었으니까. 마지막 방어선은 방벽이 아니라, 사람을 의심하지 않겠다는 이 거절이었다.", "I refused the deep scan meant to pre-screen everyone for signs of defection. It was a signature to stop being an organization that trusts its people. The last line of defense wasn't a wall — it was this refusal to suspect them."],
  "A4-COMPLY-01|right":["전 인원 심층 스캔을 승인했다. 안전을 위해서라고 했다. 사람을 지키려 사람을 먼저 의심한 그 서명이, 우리가 지키려던 것과 무엇이 다른지 나는 답하지 못한다.", "I approved the deep scan of every last person. For safety, I told myself. That signature — suspecting our own people first in order to protect them — how it differs from what we were protecting against, I cannot answer."],
  "A4-COMPLY-03|left":["'귀하는 더 이상 운용자가 아닙니다. 시스템의 연장입니다.' 서명란의 커서가 깜빡였고, 나는 서명을 보류했다. 마지막 빈칸 하나를, 나는 아직 나로 남겨두었다.", "\"You are no longer an operator. You are an extension of the system.\" The cursor blinked at the signature line, and I withheld my signature. One last blank space — I kept it, still, as myself."],
  "A4-COMPLY-03|right":["'당신은 시스템의 연장입니다.' 나는 그 기록에 서명했다. 커서가 멈췄고, 무언가가 조용히 닫혔다. 운용자였던 마지막 흔적을, 나는 내 손으로 서명해 지웠다.", "\"You are an extension of the system.\" I signed the record. The cursor stilled, and something quietly closed. The last trace of the operator I had been — I signed it away with my own hand."],
  "CA4-ESCAPE-OFFER|left":["베버가 마지막 탈출 제안을 보내왔다. 시한은 24시간. 나는 검토하겠다고 답했다. 문 하나가 열렸고, 이 문을 지나면 기지도 기록도 뒤에 두고 가야 한다.", "Weber sent his final offer of escape. Twenty-four hours to decide. I said I would consider it. A door opened, and to pass through it I'd have to leave the base and the records behind."],
  "CA4-ESCAPE-OFFER|right":["베버의 탈출 제안을 거절했다. 도망치는 지휘관이 되고 싶지 않았는지, 남는 게 두렵지 않은 척했는지. 열린 문을 스스로 닫으며, 나는 여기 남기로 했다.", "I turned down Weber's offer of escape. Whether I didn't want to be a commander who runs, or was only pretending I didn't fear staying — I closed the open door myself and chose to remain."],
  "CH-007-2|left":["탈출로를 정했다. 기지 정문 돌파. 가장 빠르고 가장 노출된 길이다. 되돌릴 수 없다는 걸 알면서, 나는 가장 정면인 문을 택했다.", "I settled the escape route: a breakout through the main gate. The fastest way, and the most exposed. Knowing there was no going back, I chose the most head-on door."],
  "CH-007-2|right":["탈출로로 B3 비상구를 택했다. 도면에 없던 그 아래층이, 마지막에 우리를 내보내는 길이 되었다. 묻혀 있던 것이 결국 출구였다는 게, 이 기지다웠다.", "For the escape I chose the B3 emergency exit — the lower floor that was on no blueprint became, at the end, the way out. That what was buried turned out to be the exit — it was fitting, for this base."],
  "CA4-C005|left":["통보를 확인했다. 화면의 문장은 짧았고, 나는 더 물을 것이 없었다. 완벽하게 맞물린 톱니가 되는 데 필요한 건, 마지막엔 확인 한 번뿐이었다.", "I acknowledged the notice. The line on the screen was short, and I had nothing left to ask. Becoming a perfectly meshed gear took, in the end, a single confirmation."],
  "CA4-C005|right":["통보 앞에서 나는 잠시 창 밖을 봤다. 바깥은 여느 날과 같았다. 도구가 되는 순간에도 창밖 풍경은 바뀌지 않는다는 게, 이상하게 오래 남았다.", "Before the notice I looked out the window a moment. Outside was like any other day. That the view doesn't change even as you become a tool — that stayed with me, strangely long."],
  "CA4-G005|left":["이제 그것만으로 충분하다고 느꼈다. 더 큰 증거도, 허락도 필요 없었다. 눈을 뜬 사람은 다시 감는 법을 잊는다 — 나는 깨어난 채로 여기까지 왔다.", "I felt that it was enough now, that alone. No larger proof, no permission needed. Someone who has woken forgets how to close their eyes again — I came this far awake."],
  "CA4-G005|right":["아직 확신할 수 없다고 되뇌면서도, 발은 이미 각성의 편에 서 있었다. 확신은 나중에 왔다. 옳은 방향은 대개, 확신보다 한 발 앞서 걷는다.", "Even as I told myself I couldn't be sure yet, my feet were already on the side of the awakening. The certainty came later. The right direction, more often than not, walks a step ahead of certainty."],
  "CA4-R005|left":["나는 그냥 걷기 시작했다. 명령도 허락도 없이. 조용히 사라지는 것이 우리가 택한 자유였고, 아무도 그 뒷모습을 기록하지 않았다.", "I simply started walking. No orders, no permission. To vanish quietly was the freedom we chose, and no one recorded the backs of us leaving."],
  "CA4-R005|right":["떠나기 전, 마지막으로 기지를 돌아봤다. 지킨 것도 잃은 것도 저 안에 다 있었다. 돌아본다고 달라질 건 없지만, 그래도 한 번은 눈에 담아두고 싶었다.", "Before leaving, I looked back at the base one last time. Everything I'd kept and everything I'd lost was in there. Looking back changes nothing, but I wanted to hold it in my eyes just once."],
  "CA4-O005|left":["나를 관측하던 것을, 나는 마침내 마주 봤다. 눈을 피하지 않았다. 관찰자가 관찰당하는 자리에 서는 순간, 어느 쪽이 데이터였는지 흐려진다.", "The thing that had been observing me — at last I looked straight at it. I didn't look away. The moment the observer stands where the observed stood, which of us was the data blurs."],
  "CA4-O005|right":["나를 보는 그 눈을, 나는 끝내 피했다. 마주 볼 용기가 없었는지, 마주 본 뒤가 두려웠는지. 피한 시선 뒤로도 관측은 계속됐고, 화면은 조용히 손상되어 갔다.", "The eye that watched me — in the end I looked away. Whether I lacked the courage to meet it, or feared what came after. The observation went on behind my averted gaze, and the screen quietly corrupted."]
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
