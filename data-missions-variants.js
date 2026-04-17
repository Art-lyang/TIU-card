// data-missions-variants.js — 신뢰 기반 변형 선택지 + 전투 조우 노드
// trustReq: {charName: minValue} → 해당 신뢰 충족 시에만 선택지 표시
(function(){

// ══ M-001: SPEC-012 — 강도윤 동행 루트 ══
MISSIONS['M-001'].nodes.start.choices.push({
  label: '▸ 강도윤과 합동 돌입 — 양동 작전',
  trustReq: { doyun: 60 },
  next: 'doyun_joint'
});
MISSIONS['M-001'].nodes['doyun_joint'] = {
  text: "강도윤이 고개를 끄덕인다.\n\n\"지휘관. 제가 서쪽에서 교란합니다. 지휘관은 중심부로.\"\n\n양동 작전. 강도윤이 화염 장비로 서쪽을 소각하며 점액의 주의를 끈다.\n\n당신은 중심부로 접근 — 오염원의 핵심체를 직접 관찰할 수 있다.\n\n윤세진이 원하던 고순도 샘플. 핵심부 조직. 동시에 서쪽의 소각으로 확산이 억제된다.\n\n강도윤이 무전한다.\n\"여기 정리됐습니다. 지휘관 쪽은?\"\n\n\"확보 완료.\"\n\n\"...좋습니다.\"\n\n돌아오는 길에 강도윤이 말합니다.\n\"지휘관을 믿지 않았으면 이 작전은 불가능했습니다.\"\n\n소각과 확보를 동시에. 신뢰가 만든 결과입니다.",
  choices: [{ label: "[ 기지 귀환 — 합동 작전 성공 ]", next: "end",
    result: { c: 2, r: -1, t: 2, o: 0 }, log: ["LOG-005","LOG-RES-012"] }]
};

// ══ M-002: SPEC-011 — 윤세진 분석 루트 ══
MISSIONS['M-002'].nodes.start.choices.push({
  label: '▸ 윤세진의 음성 패턴 디코이 활용',
  trustReq: { sejin: 60 },
  next: 'sejin_decoy'
});
MISSIONS['M-002'].nodes['sejin_decoy'] = {
  text: "윤세진이 무전으로 제안합니다.\n\n\"Shell Talker가 복제한 음성 패턴... 역으로 이용할 수 있어요.\"\n\"제가 녹음한 주파수로 디코이를 만들면, 대상을 유인할 수 있습니다.\"\n\n강도윤이 의아하게 봅니다. 하지만 당신은 윤세진을 믿습니다.\n\n디코이 장치가 숲에서 재생됩니다. 가짜 목소리가 울립니다.\n\nSPEC-011이 반응합니다. 소리를 향해 이동합니다.\n\n유인된 SPEC-011을 비접촉 포획 장비로 격리합니다.\n\n윤세진: \"...이 주파수 데이터로 다른 Shell Talker도 추적할 수 있어요.\"\n\n강도윤이 속삭입니다.\n\"...윤세진 덕분에 아무도 안 다쳤습니다.\"",
  choices: [{ label: "[ 기지 귀환 — 과학적 포획 성공 ]", next: "end",
    result: { c: 1, r: -1, t: 2, o: 0 }, log: ["LOG-004","LOG-RES-011"] }]
};

// ══ M-004: SPEC-001 — 임재혁 기술 지원 루트 ══
MISSIONS['M-004'].nodes.start.choices.push({
  label: '▸ 임재혁 원격 스캔 + 정밀 격리',
  trustReq: { jaehyuk: 55 },
  next: 'jaehyuk_tech'
});
MISSIONS['M-004'].nodes['jaehyuk_tech'] = {
  text: "임재혁이 무전합니다.\n\n\"지휘관. 제가 만든 열화상 매핑 장치를 보냅니다.\"\n\"건물 구조 전체를 3D로 스캔할 수 있습니다. 들어가기 전에 전부 파악할 수 있어요.\"\n\n드론이 건물 주위를 돌며 스캔합니다.\n\n결과: 개체 4체의 정확한 위치, 이동 패턴, 반응 범위가 매핑됩니다.\n\n강도윤이 감탄합니다. \"이거면 한 체씩 개별 격리가 가능합니다.\"\n\n건물에 진입합니다. 매핑 데이터를 기반으로 각 개체를 순차 격리.\n\n개체들이 반응하지만, 예측된 범위 안에서의 움직임.\n\n4체 전부 격리 성공. 건물 손상 없음. 인원 피해 없음.\n\n임재혁: \"데이터가 좋으면 힘을 쓸 필요가 없습니다.\"",
  choices: [{ label: "[ 기지 귀환 — 무손상 정밀 격리 ]", next: "end",
    result: { c: 1, r: 0, t: 2, o: 1 }, log: ["LOG-013","LOG-RES-001"] }]
};

// ══ M-005: Brood Drone — 서하은 정보 루트 ══
MISSIONS['M-005'].nodes.start.choices.push({
  label: '▸ 서하은의 ORACLE 데이터로 약점 분석',
  trustReq: { haeun: 55 },
  next: 'haeun_intel'
});
MISSIONS['M-005'].nodes['haeun_intel'] = {
  text: "서하은이 무전합니다. 목소리가 낮습니다.\n\n\"지휘관님. ORACLE 내부 데이터에서 군체 구조 분석 보고서를 찾았습니다.\"\n\"공식 채널이 아니에요. 제가 직접 찾은 거예요.\"\n\n보고서에 따르면 — Brood Drone의 지휘 신호는 특정 주파수 대역을 사용합니다.\n그 주파수를 정확히 역위상으로 방출하면 지휘 체계가 마비됩니다.\n\n교란 장비의 주파수를 서하은이 알려준 값으로 조정합니다.\n\n가동.\n\n드론 대형이 무너집니다. 완전히. 지휘 개체의 신호가 차단됩니다.\n\n드론들이 흩어져 도주합니다. Shell Talker는 혼란에 빠진 채 후퇴.\n\n전투 없이 40체 이상의 드론 군집을 해산시켰습니다.\n\n서하은: \"ORACLE이 이 데이터를 공개하지 않은 이유가 궁금합니다.\"",
  choices: [{ label: "[ 기지 귀환 — 무혈 해산 성공 ]", next: "end",
    result: { c: 2, r: 0, t: 2, o: -1 }, g: -2, log: "LOG-014" }]
};

// ══ M-006: 포자 지대 — 윤세진 동행 루트 ══
MISSIONS['M-006'].nodes.start.choices.push({
  label: '▸ 윤세진 직접 동행 — 현장 분석',
  trustReq: { sejin: 65 },
  next: 'sejin_field'
});
MISSIONS['M-006'].nodes['sejin_field'] = {
  text: "윤세진이 방독면을 쓰고 나타납니다.\n\n강도윤: \"연구원을 현장에 데려갈 순 없습니다.\"\n윤세진: \"제가 아니면 이 포자의 생태를 현장에서 판단할 사람이 없어요.\"\n\n당신이 허가합니다. 강도윤이 한숨을 쉽니다.\n\n포자 지대 진입. 윤세진이 실시간으로 분석합니다.\n\n\"이 포자... 빛에 반응해요. 조명이 아니라 특정 파장에.\"\n\"소각이 확산을 촉진하는 이유도 이거예요. 열복사가 방출을 자극하는 거예요.\"\n\n윤세진이 장비에서 자외선 필터를 꺼냅니다.\n\n\"UV-C 파장이면 포자의 발아를 억제할 수 있어요.\"\n\n시험 가동. 자외선이 비추는 범위에서 포자 형체들이 형성되지 않습니다.\n\n무해화가 아닌, 억제. 하지만 이것이 첫 번째 실질적 대응입니다.\n\n강도윤이 인정합니다.\n\"...데려오길 잘했습니다.\"",
  choices: [{ label: "[ 기지 귀환 — 억제법 발견 ]", next: "end",
    result: { c: 1, r: -1, t: 3, o: 0 }, g: -1, log: "LOG-015" }]
};

// ══ M-001/M-002: 전투 조우 노드 (eliminate 경로 확장) ══
// M-001 eliminate에 전투 판단 추가
var m1elim = MISSIONS['M-001'].nodes.eliminate;
var m1elimOrig = m1elim.text;
MISSIONS['M-001'].nodes.eliminate = {
  text: "오염 구역을 격리한다. 강도윤이 화염 방사기를 준비한다.\n\n그때 — 점액질 사이에서 형체가 솟아오른다.\n\nSPEC-012 성체. 높이 2m. 오염원의 수호자인가.\n\n[ORACLE: 경고 — 미분류 변이 개체. 위협 등급 상향.]",
  choices: [
    { label: "▸ 즉시 소각 — 화력 집중", next: "m1_burn" },
    { label: "▸ 측면 우회 — 오염원만 제거", next: "m1_flank" }
  ]
};
MISSIONS['M-001'].nodes['m1_burn'] = {
  text: "강도윤이 방아쇠를 당긴다.\n\n화염이 변이 개체를 감싼다. 형체가 수축하며 비명 같은 진동을 낸다.\n\n10초. 소각 완료.\n\n이어서 오염 구역 전체를 소각한다. 주황빛 불길.\n\n기지로 돌아온 뒤, 윤세진이 보고서를 받습니다.\n\"...성체가 있었다고요? 샘플이 있었으면...\"\n\n소각 구역 위성 사진. 새 점액질이 번지기 시작합니다.",
  choices: [{ label: "[ 기지 귀환 — 소각 완료 ]", next: "end",
    result: { c: 2, r: -1, t: 0, o: 1 }, log: "LOG-005" }]
};
MISSIONS['M-001'].nodes['m1_flank'] = {
  text: "강도윤에게 신호를 보낸다. 우회.\n\n성체의 반대편으로 돌아간다. 성체가 감지하지 못한다.\n오염원 중심부에 화염을 집중한다.\n\n성체가 반응한다. 오염원이 타오르자 형체가 흐트러진다.\n\n강도윤: \"오염원에 연결되어 있었습니다. 분리되니까 약해집니다.\"\n\n성체가 녹아내린다. 오염원과 함께.\n\n전술적 판단이 화력을 절약했다.",
  choices: [{ label: "[ 기지 귀환 — 효율적 제거 ]", next: "end",
    result: { c: 2, r: 0, t: 1, o: 1 }, log: "LOG-005" }]
};

// M-005 hunt에 전투 판정 추가
var m5snipeOrig = MISSIONS['M-005'].nodes.snipe;
MISSIONS['M-005'].nodes.snipe = {
  text: "강도윤이 자세를 잡는다. 거리 300m.\n\n첫 발. Shell Talker가 고개를 든다.\n\n동시에 — 주변 드론 12체가 당신의 위치로 쇄도한다.\n\n[ORACLE: 경고 — 반격 대형 감지.]",
  choices: [
    { label: "▸ 강도윤 엄호 — 2차 사격 기회 확보", next: "m5_cover" },
    { label: "▸ 드론 교란 후 후퇴", next: "m5_retreat_fight" }
  ]
};
MISSIONS['M-005'].nodes['m5_cover'] = {
  text: "당신이 드론을 향해 사격한다. 3체 격추.\n\n나머지가 흩어지는 순간 — 강도윤이 두 번째 사격.\n\n목 기관부 명중. Shell Talker가 경련한다.\n\n드론 전체가 정지한다. 5초간의 정적.\n\n드론들이 방향 없이 흩어지기 시작한다.\n\n강도윤이 고개를 끄덕인다. \"해냈습니다.\"\n\n72시간 후, 봉쇄선 남측 드론 활동 0.\n하지만 동측·서측에서 소규모 무리가 새로 관측됩니다.\n\n윤세진: \"군체가 분산됐을 뿐이에요. 오히려 예측이 어려워졌어요.\"",
  choices: [{ label: "[ 기지 귀환 — 지휘 개체 제거 ]", next: "end",
    result: { c: 2, r: -1, t: 2, o: 0 }, log: "LOG-014" }]
};
MISSIONS['M-005'].nodes['m5_retreat_fight'] = {
  text: "교란 장비를 최대 출력으로 가동한다.\n\n드론들이 혼란에 빠진다. 충분한 시간.\n\n후퇴하면서 Shell Talker의 정확한 좌표를 기록한다.\n\n강도윤: \"다음에는 놓치지 않겠습니다.\"\n\n드론 대형은 재편되지만, 지휘 개체 위치가 확보되었다.",
  choices: [{ label: "[ 기지 귀환 — 전술적 후퇴 ]", next: "end",
    result: { c: 1, r: 0, t: 1, o: 0 }, log: "LOG-014" }]
};

})();
