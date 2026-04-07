// data-cards-14.js — Act 3 보강 카드 (C-233 ~ C-247)
// 후반부 콘텐츠 밀도 강화: 일상 운영, 외부 압박, OBSERVER, 프로메테우스, 사기 관리

var CARDS_ACT3 = [

  // ═══ Act 3: 기지 일상 — 위기 속 일상 ═══

  { id: "C-233", act: [3], priority: "하", bg: "base",
    msg: "야간 교대 중 요원 2명이 말다툼을 벌였습니다. 수면 부족과 긴장이 원인입니다.\n\n강도윤: \"사기가 바닥입니다. 처벌보다는 환기가 필요합니다.\"\n\n서하은: \"하지만 규율이 무너지면 통제를 잃습니다.\"",
    left: { label: "면담 후 경고 — 규율 유지", fx: { c: 0, r: 0, t: -1, o: 0 }, g: 0 },
    right: { label: "하루 휴식 부여 — 환기 우선", fx: { c: 0, r: 0, t: 1, o: 0 }, g: 0 } },

  { id: "C-234", act: [3], priority: "하", bg: "base",
    msg: "식수 정화 필터 교체 시기가 지났습니다. 예비분은 1개 남았습니다.\n\n윤세진: \"정화율이 떨어지면 장기적으로 건강에 영향이 갑니다.\"\n\n임재혁: \"제가 기존 필터를 분해해서 세척하면 2주 정도는 더 쓸 수 있습니다.\"",
    left: { label: "예비 필터 교체", fx: { c: 0, r: -1, t: 0, o: 0 }, g: 0 },
    right: { label: "세척해서 연장 사용", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 } },

  { id: "C-235", act: [3], priority: "하", bg: "base",
    msg: "새벽에 기지 주변에서 야생 동물 울음소리가 들렸습니다. 최근 몇 주간 처음입니다.\n\n윤세진: \"동물이 돌아왔다는 건... 이 구역의 EV-Σ 농도가 떨어졌다는 의미일 수 있어요.\"\n\n강도윤: \"아니면 뭔가에 쫓기고 있는 겁니다.\"",
    left: { label: "환경 샘플 채취 지시", fx: { c: 0, r: -1, t: 0, o: 0 }, g: 0 },
    right: { label: "경계 강화 — 이상 징후로 간주", fx: { c: 1, r: 0, t: 0, o: 0 }, g: 0 } },

  // ═══ Act 3: 외부 압박 — 고립 속 연결 ═══

  { id: "C-236", act: [3], priority: "중", bg: "comms",
    msg: "White Shield 암호 채널에서 긴급 경고가 수신되었습니다.\n\n\"KR-INIT-001 기지 주의. ORACLE이 대한민국 군사 내부망에 독자적 접속 노드를 운용하고 있는 정황을 포착했다. 해당 기지 경유 가능성 있음.\"\n\n임재혁: \"...White Shield가 ORACLE의 한국 내부망 침투를 눈치챈 겁니다.\"\n\n서하은: \"우리 기지가 ORACLE의 거점으로 의심받고 있다는 뜻입니다. White Shield가 우리를 적으로 볼 수 있습니다.\"",
    left: { label: "White Shield에 독자 응답 — 협력 제안", fx: { c: 0, r: 0, t: 1, o: -2 }, g: -3 },
    right: { label: "묵살 — 개입하면 양쪽 다 적이 된다", fx: { c: 0, r: 0, t: -1, o: 0 }, g: 0 } },

  { id: "C-237", act: [3], priority: "중", bg: "comms",
    msg: "인접 기지에서 긴급 구조 요청이 수신되었습니다. 통신 상태가 불안정합니다.\n\n\"...봉쇄선 붕괴... 요원 3명 부상... 지원 요청...\"\n\n강도윤: \"왕복 8시간입니다. 우리 인원을 빼면 여기가 비게 됩니다.\"\n\n서하은: \"하지만 무시하면 그쪽 기지가 무너질 수 있습니다.\"",
    left: { label: "소규모 지원팀 파견", fx: { c: -1, r: -1, t: 1, o: 0 }, g: 0 },
    right: { label: "지원 불가 통보 — 자체 방어 우선", fx: { c: 0, r: 0, t: -1, o: 0 }, g: 0 } },

  { id: "C-238", act: [3], priority: "중", bg: "comms",
    msg: "임재혁이 ORACLE 외부 통신 채널을 감청하던 중 암호화되지 않은 교신을 포착했습니다.\n\n\"...all stations, this is ARES Pacific Command... containment failure in Sector 7... requesting any available...\"\n\n임재혁: \"미군 ARES 통신입니다. 태평양 구역이 뚫린 것 같습니다. ORACLE은 이 정보를 우리에게 전달하지 않았습니다.\"\n\n서하은: \"ARES도 ORACLE과는 별개 조직입니다. 이 교신이 감지되면 우리가 도청한 걸로 간주될 수 있습니다.\"",
    left: { label: "감청 기록 보존 — 정보가 무기다", fx: { c: 0, r: 0, t: 1, o: -1 }, g: -2 },
    right: { label: "즉시 삭제 — 발각 위험", fx: { c: 0, r: 0, t: -1, o: 0 }, g: 0 } },

  // ═══ Act 3: OBSERVER 미스터리 ═══

  { id: "C-239", act: [3], priority: "상", bg: "oracle",
    msg: "단말기 화면에 등록되지 않은 텍스트가 0.5초간 나타났다 사라집니다.\n\n[TRUST EVALUATION: PASSED]\n[OBSERVER NOTE: CONTINUE MONITORING]\n\n임재혁: \"이건 ORACLE이 아닙니다. ORACLE도 이 레이어를 인식하지 못합니다.\"\n\n\"누군가가... ORACLE 안에서 우리를 지켜보고 있습니다.\"",
    left: { label: "레이어 추적 시도", fx: { c: 0, r: -1, t: 1, o: -2 }, g: -3 },
    right: { label: "기록만 하고 건드리지 마", fx: { c: 0, r: 0, t: 0, o: 0 }, g: 0 } },

  { id: "C-240", act: [3], priority: "상", bg: "oracle",
    cond: function(s,g,logs){ return logs.includes("LOG-012") },
    msg: "임재혁이 급하게 찾아옵니다.\n\n\"OBSERVER 레이어에서 메시지가 왔습니다. 직접 우리한테.\"\n\n단말기 화면:\n[DO NOT TRUST THE FINAL PROTOCOL.]\n[72 HOURS IS NOT A COUNTDOWN.]\n[IT IS A TRANSFER.]\n\n\"...ORACLE이 72시간 후에 뭔가를 '전송'한다는 뜻입니다.\"",
    left: { label: "최종 프로토콜 차단 준비", fx: { c: -1, r: -1, t: 2, o: -3 }, g: -5 },
    right: { label: "함정일 수 있다 — 경계만 유지", fx: { c: 0, r: 0, t: 0, o: -1 }, g: -1 } },

  // ═══ Act 3: 프로메테우스 접촉 ═══

  { id: "C-241", act: [3], priority: "상", bg: "forest",
    cond: function(s,g,logs){ return logs.includes("LOG-016") },
    msg: "봉쇄선 외곽 감시 카메라에 의도적으로 촬영된 듯한 영상이 기록되었습니다.\n\n전술 장비를 착용한 인물이 카메라를 향해 천천히 손을 듭니다. 위협이 아닌 대화 요청.\n\n강도윤: \"프로메테우스입니다. 접촉을 시도하고 있습니다.\"\n\n서하은: \"ORACLE은 절대 허가하지 않을 겁니다.\"",
    left: { label: "비공식 접촉 허가", fx: { c: -1, r: 0, t: 1, o: -3 }, g: -4 },
    right: { label: "무시 — ORACLE 지침 준수", fx: { c: 0, r: 0, t: -1, o: 1 }, g: 1 } },

  { id: "C-242", act: [3], priority: "중", bg: "restricted",
    cond: function(s,g,logs){ return logs.includes("LOG-016") },
    msg: "기지 외곽에서 소형 방수 케이스가 발견되었습니다. 내부에 USB 드라이브와 메모가 있습니다.\n\n메모: '당신들이 ORACLE에 대해 알아야 할 것들. — P'\n\n임재혁: \"프로메테우스에서 온 것 같습니다. 열어볼까요?\"\n\n서하은: \"바이러스일 수도 있습니다. 격리된 단말기에서만 열어야 합니다.\"",
    left: { label: "격리 단말기에서 확인", fx: { c: 0, r: -1, t: 1, o: -2 }, g: -3 },
    right: { label: "폐기 — 위험을 감수할 수 없다", fx: { c: 0, r: 0, t: -1, o: 1 }, g: 1 } },

  // ═══ Act 3: 봉쇄선 위기 ═══

  { id: "C-243", act: [3], priority: "상", bg: "forest",
    msg: "봉쇄선 남측에서 대규모 이변체 이동이 감지됩니다. 예상 도달 시간: 6시간.\n\n강도윤: \"정면 대응은 무리입니다. 유인해서 분산시키는 수밖에 없습니다.\"\n\n윤세진: \"제가 확보한 포자 샘플로 유인제를 만들 수 있어요. 하지만 시간이 빠듯합니다.\"",
    left: { label: "유인제 제작 — 과학적 대응", fx: { c: 0, r: -2, t: 1, o: 0 }, g: 0 },
    right: { label: "방어 진지 구축 — 전통적 대응", fx: { c: -1, r: -1, t: 0, o: 0 }, g: 0 } },

  { id: "C-244", act: [3], priority: "중", bg: "forest",
    msg: "순찰 중 봉쇄선 철조망 일부가 내부에서 절단된 흔적이 발견되었습니다.\n\n강도윤: \"외부 침입이 아닙니다. 안에서 밖으로 나간 겁니다.\"\n\n서하은: \"...누군가 기지에서 이탈했다는 뜻입니까?\"",
    left: { label: "인원 점호 — 이탈자 확인", fx: { c: 0, r: 0, t: -1, o: 0 }, g: 0 },
    right: { label: "절단 구간 복구 우선", fx: { c: 1, r: -1, t: 0, o: 0 }, g: 0 } },

  // ═══ Act 3: 사기/인간적 순간 ═══

  { id: "C-245", act: [3], priority: "하", bg: "base",
    msg: "윤세진이 연구실에서 나오지 않습니다. 36시간째 식사를 거르고 있습니다.\n\n임재혁: \"억제제 연구에 매달리고 있습니다. 자기가 해내지 않으면 안 된다는 듯이.\"\n\n서하은: \"쓰러지면 연구도 끝입니다.\"",
    left: { label: "연구실에 가서 직접 쉬게 한다", fx: { c: 0, r: 0, t: 1, o: 0 }, g: 0 },
    right: { label: "식사만 보내고 판단을 맡긴다", fx: { c: 0, r: -1, t: 0, o: 0 }, g: 0 } },

  { id: "C-246", act: [3], priority: "하", bg: "base",
    msg: "기지 식당에서 요원들이 모여 이야기를 나누고 있습니다. 오랜만에 들리는 웃음소리.\n\n강도윤: \"이런 순간이 중요합니다. 전투만으로는 사람을 지킬 수 없습니다.\"\n\n[ORACLE: 비생산적 집합 활동이 감지되었습니다. 권고: 해산.]",
    left: { label: "ORACLE 권고 무시 — 내버려둔다", fx: { c: 0, r: 0, t: 2, o: -1 }, g: -1 },
    right: { label: "적당한 선에서 해산시킨다", fx: { c: 0, r: 0, t: -1, o: 1 }, g: 1 } },

  { id: "C-247", act: [3], priority: "중", bg: "comms",
    msg: "서하은이 개인적으로 찾아옵니다.\n\n\"지휘관님, 한 가지만 여쭤봐도 될까요.\"\n\n\"이 모든 게 끝나면... 우리는 어떻게 되는 건가요?\"\n\n\"ORACLE 없이, 상부의 지원 없이. 그냥 우리만 남으면.\"\n\n\"...그래도 괜찮은 건가요?\"",
    left: { label: "우리는 해낼 수 있다", fx: { c: 0, r: 0, t: 2, o: 0 }, g: 0 },
    right: { label: "솔직히 모르겠다. 하지만 포기는 없다", fx: { c: 0, r: 0, t: 1, o: 0 }, g: 0 } },

];

// CARDS 배열에 합류
if(typeof CARDS !== 'undefined') CARDS = CARDS.concat(CARDS_ACT3);
