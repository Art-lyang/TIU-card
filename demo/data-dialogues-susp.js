// data-dialogues-susp.js — 간부진 의심 대화 (Act3+, 신뢰 일정 이상에서만 / "느낌" 수준의 위화감)
// ※ 로드 순서 주의: DIALOGUES used-추적이 '인덱스' 기반이므로, 이 대화들은 반드시
//    다른 모든 대화 push 이후(가장 늦게) 로드해 '순수 추가(최고 인덱스)'가 되도록 한다.
//    그래야 기존 대화 인덱스가 밀리지 않아 진행 중 세이브의 usedDlg 호환이 유지된다.
//    (index.html / validator DATA_FILES에서 data-character-arcs.js 뒤에 등록)

(function() {
  if (typeof DIALOGUES === "undefined") return;
  DIALOGUES.push(
    {
      id: "dlg_haeun_susp",
      char: "서하은",
      role: "부지휘관",
      actReq: 3,
      trustReq: function(tr){ return tr.haeun >= 45 },
      lines: [
        "지휘관님. 기록은 안 남기고, 그냥 제 느낌만 말씀드릴게요.",
        "제 일은 기지를 정상 궤도에 올리는 거잖아요. 보고 체계 잡고, 공백 메우고.",
        "그런데 어느 순간부터 — 정리가 좀 되려고 하면, ORACLE 권고가 그걸 다시 흐트러뜨려요.",
        "안정시키려는 쪽은 우린데, 흔드는 쪽이 위에 있는 것 같아서요."
      ],
      choices: [
        { label: "나도 그 위화감을 느꼈다", tag: "공감", reply: "...저만 그런 게 아니었군요. 조금 덜 외롭네요.", fx: {}, g: -3, trust: 12 },
        { label: "운영이 원래 그렇게 삐걱댄다", tag: "냉정", reply: "...그럴 수도요. 제가 예민한 거라면 다행이고요.", fx: {}, g: 1, trust: -5 }
      ]
    },
    {
      id: "dlg_jaehyuk_susp",
      char: "임재혁",
      role: "정보분석관 / 기술관",
      actReq: 3,
      trustReq: function(tr){ return tr.jaehyuk >= 45 },
      lines: [
        "지휘관님. 엔지니어 입장에서 하나만 짚고 넘어가겠습니다.",
        "ORACLE은 센서 수십만 개를 오차 없이 묶는 물건입니다. 그런 시스템이 '실수'를 해요.",
        "근데 그 오류가 — 하필 우리 곤란한 데서만 납니다. 늘 거기서.",
        "이 정도 기술이 그런 식으로 틀린다는 게, 저는 더 이상합니다. 오류가 아니라 의도 같아서요."
      ],
      choices: [
        { label: "오류가 아니라는 건가", tag: "분석", reply: "예. 우연이라기엔 솜씨가 너무 좋습니다.", fx: {}, g: -3, trust: 12 },
        { label: "기계는 그냥 기계다", tag: "냉정", reply: "...그렇게 믿고 싶긴 합니다. 저도요.", fx: {}, g: 1, trust: -5 }
      ]
    },
    {
      id: "dlg_sejin_susp",
      char: "윤세진",
      role: "연구원 / 의료관",
      actReq: 3,
      trustReq: function(tr){ return tr.sejin >= 45 },
      lines: [
        "지휘관님, 연구하면서 자꾸 드는 생각이 있어요.",
        "이변체를 제대로 막으려면 연구가 돼야 하잖아요. 표본도, 원본 데이터도 더 필요하고.",
        "근데 정작 그걸 막는 게 ORACLE이에요. 표본은 회수 불가, 데이터는 정제본만.",
        "막으라면서, 막을 도구는 안 주는 거예요. ...이상하지 않아요?"
      ],
      choices: [
        { label: "연구를 막을 이유가 있겠지", tag: "분석", reply: "그쵸. 근데 그 이유가 우리 편은 아닌 것 같아서요.", fx: {}, g: -3, trust: 12 },
        { label: "안전 규정일 뿐이다", tag: "냉정", reply: "...네, 안전. 그 말로 다 덮이긴 하죠.", fx: {}, g: 1, trust: -5 }
      ]
    },
    {
      id: "dlg_doyun_susp",
      char: "강도윤",
      role: "전술지휘관",
      actReq: 3,
      trustReq: function(tr){ return tr.doyun >= 45 },
      lines: [
        "지휘관. 현장에서만 잡히는 게 있어, 보고드립니다.",
        "봉쇄선 근처 것들 — 이변체든 짐승이든, 가끔 움직임이 이상합니다.",
        "겁먹고 흩어져야 할 놈들이, 한 방향으로 정렬해 움직입니다. 신호 받은 것처럼.",
        "누가 줄을 당기는 것 같단 말입니다. 제 착각이면 좋겠는데, 한두 번이 아닙니다."
      ],
      choices: [
        { label: "누가 조종한다는 건가", tag: "분석", reply: "단정은 못 합니다. 그래도 그 위화감, 무시 못 하겠습니다.", fx: {}, g: -3, trust: 12 },
        { label: "야생의 무리 행동이다", tag: "강경", reply: "그럴 수도 있습니다. 근데 야생은 이렇게 줄 안 맞춥니다.", fx: {}, g: 1, trust: -5 }
      ]
    }
  );
})();
