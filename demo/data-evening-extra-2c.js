// data-evening-extra-2c.js — Part C (외부 3명: 베버/포스터/박소영)
// ═══════════════════════════════════════════════════════════════
// 외부 3명 — 이브닝 챗 추가 (각 5개 목표)
// ═══════════════════════════════════════════════════════════════

// ─── 마르쿠스 베버 (+3 → 총 5) ────────────
EVENING_CHATS.push(
  { char: '마르쿠스 베버', act: [4], dayMin: 29, dayMax: 30,
    responseKey: 'weber_4c_29-30',
    lines: [
      "프로메테우스는 정부가 아닙니다. 민간 조직입니다.",
      "가입이 아니라 — 협조를 요청하는 겁니다.",
      "그 차이를 이해하는 사람이 드뭅니다.",
      "당신은 이해할 거라고 생각했습니다."
    ] },
  { char: '마르쿠스 베버', act: [4], dayMin: 31, dayMax: 33,
    responseKey: 'weber_4c_31-33',
    lines: [
      "당신네 나라 해안 방벽 — 설계도를 우리가 보강했습니다.",
      "기술적인 부분입니다. 보상 없이.",
      "왜? — 한국이 무너지면 동아시아 전체가 무너지니까.",
      "우리도 이해관계가 있습니다. 정확합니다."
    ] },
  { char: '마르쿠스 베버', act: [4], dayMin: 34, dayMax: 35,
    responseKey: 'weber_4c_34-35',
    lines: [
      "내가 독일에서 프로메테우스에 들어온 이유 — 별거 없습니다.",
      "형이 라인강 이변체 사고로 죽었습니다. 2029년.",
      "ORACLE은 그 사고를 '행정 오류'로 분류했고요.",
      "그 뒤로는 — 계산이 아니라 집념입니다."
    ] }
);

// ─── 닉 포스터 (+3 → 총 5) ────────────────
EVENING_CHATS.push(
  { char: '닉 포스터', act: [3,4], dayMin: 27, dayMax: 30,
    responseKey: 'foster_early_27-30',
    condFn: function(ctx){ var logs=ctx.logs||[]; return logs.indexOf('LOG-080')>=0 && logs.indexOf('LOG-081')<0; },
    priority: 'event',
    lines: [
      "외부 채널에 짧은 음성 패킷이 들어옵니다.",
      "발신자는 이름을 밝히지 않습니다. 하지만 억양과 말투는 기록과 일치합니다.",
      "\"닉 포스터입니다. 직접 만나자는 말은 아닙니다.\"",
      "\"당신이 베버의 말을 들었다면, 이제 내 쪽 이야기도 들어야 합니다.\""
    ] },
  { char: '닉 포스터', act: [4], dayMin: 29, dayMax: 30,
    responseKey: 'foster_4c_29-30',
    condFn: function(ctx){ var logs=ctx.logs||[]; return logs.indexOf('LOG-081')>=0; },
    lines: [
      "이중철. 내가 그때 당신 부대 찾아간 거 — 실수였습니다.",
      "오해하지 마세요. 사과 아닙니다. 분석 결과예요.",
      "그때 당신이 저지하지 않았다면 — 작전 자체가 틀어졌을 거고요.",
      "우리 둘 다 여기까진 못 왔을 겁니다."
    ] },
  { char: '닉 포스터', act: [4], dayMin: 31, dayMax: 33,
    responseKey: 'foster_4c_31-33',
    condFn: function(ctx){ var logs=ctx.logs||[]; return logs.indexOf('LOG-081')>=0; },
    lines: [
      "베버는 전략가입니다. 나는 — 그 밑에서 일하는 사람이고요.",
      "차이는 분명합니다. 베버는 죽어도 대체됩니다.",
      "나 같은 건 — 죽으면 그냥 끝나요.",
      "그래서 더 조심합니다. 그것만 알아두세요."
    ] },
  { char: '닉 포스터', act: [4], dayMin: 34, dayMax: 35,
    responseKey: 'foster_4c_34-35',
    condFn: function(ctx){ var logs=ctx.logs||[]; return logs.indexOf('LOG-081')>=0; },
    lines: [
      "당신이 내 정보를 쓰든 말든 — 제 책임은 다한 겁니다.",
      "다만, 부탁 하나만.",
      "필라델피아 쪽 지휘관은 — 당신 같은 사람이 아니었어요.",
      "그쪽은 이미 늦었습니다. 한국은 — 아직 아닙니다."
    ] }
);

// ─── 박소영 (+3 → 총 5) ─────────────────
EVENING_CHATS.push(
  { char: '박소영', act: [4], dayMin: 29, dayMax: 30,
    responseKey: 'soyoung_4c_29-30',
    lines: [
      "지휘관님, 서하은 선배 소식 들으셨어요?",
      "타 지부 배치 — 형식적으론 그렇지만 연락이 잘 안 돼요.",
      "...선배도 알고 계셨을 거예요, 이 결과.",
      "저는 — 선배가 못 끝낸 걸 대신 하고 싶을 뿐입니다."
    ] },
  { char: '박소영', act: [4], dayMin: 31, dayMax: 33,
    responseKey: 'soyoung_4c_31-33',
    lines: [
      "ORACLE 쿼리 구조 보다가 — 반복되는 패턴 하나 발견했어요.",
      "매 세션마다 지휘관의 '이례적 판단'을 카탈로그화하고 있습니다.",
      "지휘관님이 하신 결정들 — 전부 분류되어 저장 중이라는 거예요.",
      "...이건 단순 로깅이 아닙니다."
    ] },
  { char: '박소영', act: [4], dayMin: 34, dayMax: 35,
    responseKey: 'soyoung_4c_34-35',
    lines: [
      "지휘관님. 저는 — 여기 오기까지 여러 이유가 있었어요.",
      "서하은 선배의 부탁도, 제 궁금증도, 그리고 — 다른 이유도.",
      "하지만 지금은 — 여기 사람들이 좋아서 남는 게 가장 큽니다.",
      "그것만은 진짜입니다. 믿어주세요."
    ] },

  // ═══ 루트 반응형 — 플레이어의 노선(GI/순응 로그)에 따라 밤 대화가 달라진다 ═══
  // ORACLE 순응 기조 (gi 상승 or COMPLY 로그) — 간부들이 변해가는 기지를 감지한다
  { char: '강도윤', act: [3], dayMin: 15, dayMax: 24,
    responseKey: 'doyun_route_comply',
    condFn: function(ctx){ return (ctx.gi||0)>=15; },
    lines: [
      "지휘관님. 요즘 위에서 내려오는 지시가... 빨라졌습니다.",
      "결재가 빠른 건 좋은 일이죠. 근데 현장 판단이 끼어들 틈도 같이 줄었습니다.",
      "군인은 명령에 따릅니다. 따르는데 — 요즘은 명령이 사람 손을 안 거친 것 같은 날이 있습니다.",
      "...그냥 그렇다는 겁니다. 보고는 여기까지입니다."
    ] },
  { char: '서하은', act: [3], dayMin: 15, dayMax: 26,
    responseKey: 'haeun_route_comply',
    condFn: function(ctx){ var n=0;['LOG-A2-COMPLY-01','LOG-A2-COMPLY-02','LOG-A2-COMPLY-03','LOG-A2-COMPLY-04'].forEach(function(l){if(ctx.logs.indexOf(l)>=0)n++}); return n>=2||(ctx.gi||0)>=20; },
    lines: [
      "요즘 제 일이 줄었어요. 이상하죠. 일이 줄었는데 마음이 무거워요.",
      "요약하고, 해석하고, 판단을 붙이는 게 제 일이었는데 — 이제 원본이 그냥 위로 올라가요.",
      "해석이 사라진 보고는 데이터예요. 데이터는 반박하지 않죠.",
      "지휘관님. 우리가 마지막으로 '아니오'라고 적은 게 언제였는지, 기억나세요?"
    ] },
  { char: '윤세진', act: [3,4], dayMin: 18, dayMax: 33,
    responseKey: 'sejin_route_comply',
    condFn: function(ctx){ return ctx.logs.indexOf('LOG-A3-COMPLY-03')>=0; },
    lines: [
      "연구동 자리가 그대로인데, 제 연구는 이제 여기 없어요.",
      "중앙 서버 어딘가에서 제 데이터가 분석되고 있겠죠. 40배 빠르게, 라고 했던가요.",
      "빠른 게 나쁜 건 아니에요. 그런데 결과가 돌아오질 않아요. 어디에 쓰이는지도 모르고요.",
      "...선배가 있었으면 뭐라고 했을까요. 요즘 자꾸 그 생각을 해요."
    ] },
  { char: '임재혁', act: [2,3], dayMin: 9, dayMax: 24,
    responseKey: 'jaehyuk_route_comply',
    condFn: function(ctx){ return ctx.logs.indexOf('LOG-A2-COMPLY-04')>=0||(ctx.gi||0)>=18; },
    lines: [
      "통신망 정비하다가 느낀 건데요. 요즘 기지가 조용합니다.",
      "장비가 좋아진 게 아니라 — 사람들이 말을 아끼는 겁니다.",
      "필터가 뭘 거르는지 아무도 모르니까, 다들 알아서 거르는 거죠.",
      "기술자 입장에서 한마디만 하면... 제일 효율적인 검열은 스스로 하게 만드는 겁니다."
    ] },
  // 저항/이탈 기조 (gi 하락) — 간부들이 조용히 곁을 내준다
  { char: '강도윤', act: [3], dayMin: 15, dayMax: 26,
    responseKey: 'doyun_route_resist',
    condFn: function(ctx){ return (ctx.gi||0)<=-10; },
    lines: [
      "지휘관님 요즘 결정들 말입니다.",
      "위에서 좋아할 방향은 아닙니다. 평가에 어떻게 기록되는지도 대충 압니다.",
      "근데 현장에서 보면 — 사람이 덜 죽는 쪽이더군요.",
      "저는 명령에 따릅니다. 지휘관님 명령에요. 그 순서만 확실히 해두고 싶었습니다."
    ] },
  { char: '서하은', act: [3], dayMin: 16, dayMax: 27,
    responseKey: 'haeun_route_resist',
    condFn: function(ctx){ return (ctx.gi||0)<=-12; },
    lines: [
      "이번 주 보고서 정리하다가 — 지휘관님 결재 패턴이 눈에 띄더라고요.",
      "ORACLE 권고와 다른 선택이 이어지고 있어요. 알고 계시죠, 이거 다 기록된다는 거.",
      "...그래서 몇 개는 요약 단계에서 '해석'을 좀 넣었어요. 눈에 덜 띄게.",
      "제 일이 원래 그거잖아요. 데이터에 맥락을 붙이는 거."
    ] },
  { char: '윤세진', act: [3], dayMin: 17, dayMax: 28,
    responseKey: 'sejin_route_resist',
    condFn: function(ctx){ return (ctx.gi||0)<=-10; },
    lines: [
      "지휘관님한테만 말씀드리는 건데요.",
      "요즘 연구 데이터, 중앙에 올리기 전에 로컬에 사본을 남겨요. 규정 위반인 건 알아요.",
      "그런데 올라간 데이터가 어떻게 요약되는지 한번 보고 나니까... 원본은 여기 있어야겠더라고요.",
      "지휘관님이라면 이해하실 것 같아서요. 요즘 하시는 결정들 보면."
    ] },
  { char: '임재혁', act: [2,3], dayMin: 10, dayMax: 25,
    responseKey: 'jaehyuk_route_resist',
    condFn: function(ctx){ return (ctx.gi||0)<=-10; },
    lines: [
      "지휘관님, 이건 그냥 기술 잡담인데요.",
      "동측 통신탑 그늘, 새벽 2시부터 40분간 위성 사각입니다. 보정 궤도 때문에요.",
      "누가 그 시간에 뭘 하든 — 기록에는 안 남는다는 뜻이죠.",
      "왜 말씀드리냐고요? 글쎄요. 지휘관님은 알아두시는 게 좋을 것 같아서요."
    ] }
);

EVENING_CHATS.push(
  { char: '강도윤', act: [2], dayMin: 8, dayMax: 14, responseKey: 'doyun_route_comply_a2',
    condFn: function(ctx){ return (ctx.gi||0)>=8; },
    lines: [
      "지휘관님. 요즘 승인이 빨라졌다는 얘기, 현장에서도 돕니다.",
      "빠른 게 나쁘진 않죠. 다만 — 예전엔 제 보고가 한 번은 걸렸는데, 요즘은 그냥 통과됩니다.",
      "누가 읽긴 읽는 겁니까? ...아닙니다. 보고 끝입니다."
    ] },
  { char: '강도윤', act: [2], dayMin: 8, dayMax: 14, responseKey: 'doyun_route_resist_a2',
    condFn: function(ctx){ return (ctx.gi||0)<=-6; },
    lines: [
      "지휘관님, 이번 건 위 권고랑 다르게 가셨더군요.",
      "현장 사람들은 압니다. 누가 자기들 편에서 한 번 더 생각했는지.",
      "말은 안 합니다. 그냥 — 알아두시라고요."
    ] },
  { char: '서하은', act: [2], dayMin: 8, dayMax: 14, responseKey: 'haeun_route_comply_a2',
    condFn: function(ctx){ return (ctx.gi||0)>=8 || ctx.logs.indexOf('LOG-A2-COMPLY-01')>=0; },
    lines: [
      "요즘 제 요약본이 그대로 안 올라가고, 원본이 같이 올라가요.",
      "처음엔 편하다 했는데... 제 해석이 빠진 보고는, 좀 다른 물건이더라고요.",
      "아직은 괜찮아요. 아직은요."
    ] },
  { char: '서하은', act: [2], dayMin: 8, dayMax: 14, responseKey: 'haeun_route_resist_a2',
    condFn: function(ctx){ return (ctx.gi||0)<=-6; },
    lines: [
      "지휘관님이 오늘 판단을 하나 남기셨죠. 권고를 그대로 안 받고요.",
      "그 한 줄이 뭐라고, 저는 좀 안심이 됐어요.",
      "부임 전 석 달, 저 혼자 '예'만 적던 때가 있었거든요. 그때 생각이 나서요."
    ] }
);
