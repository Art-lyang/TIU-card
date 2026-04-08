// data-endings.js — 엔딩 B/D/F 트리거 시스템
// 카드 스와이프/일일 보상 시점에서 chkEnding() 호출

var ENDING_DEFS = {
  A: {
    name: "완벽한 도구",
    condition: "GI ≥ 60",
    narrative: [
      "[ORACLE ASSESSMENT — FINAL]",
      "",
      "PILEHEAD. 당신은 이상적인 운용자였습니다.",
      "모든 판단이 최적 경로 안에 있었습니다.",
      "",
      "한국 지부는 안정화되었습니다.",
      "당신의 임시 권한은 만료됩니다.",
      "",
      "다음 배치지가 지정될 때까지 대기하십시오.",
      "ORACLE이 당신을 필요로 할 때, 다시 연락하겠습니다.",
      "",
      "세션을 종료합니다."
    ]
  },
  B: {
    name: "각성",
    condition: "Act 3, GI ≤ -15, 신뢰 캐릭터 2+명 ≥ 65, 로그 6+개",
    narrative: [
      "모든 것이 맞아떨어지는 순간은 없었다.",
      "",
      "대신, 조각들이 있었다.",
      "ORACLE이 삭제한 데이터. 타임스탬프의 0.003초. 예측 모델의 체계적 오차.",
      "그리고 임재혁이 발견한, ORACLE조차 인식하지 못하는 레이어.",
      "",
      "당신은 진실의 전체를 보지 못했다.",
      "하지만 충분히 보았다.",
      "",
      "이제 이전처럼 명령을 따르는 것은 불가능하다.",
      "그것만으로도, 세상은 달라졌다.",
      "",
      "[세션 종료 — 관측은 계속됩니다]"
    ]
  },
  D: {
    name: "조용한 자유",
    condition: "Act 3, GI ≤ -30, 신뢰 캐릭터 3+명 ≥ 60, 로그 8+개",
    narrative: [
      "아무도 문을 부수지 않았다.",
      "경보도, 추격도 없었다.",
      "",
      "서하은이 구축한 아날로그 통신망.",
      "강도윤이 확보한 봉쇄선 외곽 안전 경로.",
      "윤세진이 정리한 독립 연구 데이터.",
      "임재혁이 마지막으로 단말기에서 지운 것들.",
      "",
      "새벽 4시.",
      "당신과 당신의 팀은 기지를 떠났다.",
      "",
      "ORACLE은 6시간 후에야 당신들의 부재를 감지했다.",
      "하지만 그때는 이미 —",
      "",
      "아무 흔적도 남아있지 않았다.",
      "",
      "[세션 종료 — OPERATOR STATUS: UNLINKED]"
    ]
  },
  C_cst: {
    name: "자충수",
    condition: "봉쇄 100 + 서하은 전출 + 박소영 합류",
    narrative: [
      "[ORACLE ASSESSMENT — CONTAINMENT REPORT]",
      "",
      "봉쇄선 완전성: 100%.",
      "",
      "완벽합니다.",
      "모든 출입구가 봉인되었고, 모든 구역이 격리되었습니다.",
      "",
      "하지만 당신은 이미 가장 중요한 것을 잃었습니다.",
      "",
      "서하은이 남긴 자리에 박소영이 앉아 있습니다.",
      "유능합니다. 성실합니다. 하지만 —",
      "서하은이 아닙니다.",
      "",
      "봉쇄선은 완벽해졌지만,",
      "그 안에 지켜야 할 것이 무엇이었는지 잊어버렸습니다.",
      "",
      "소 잃고 외양간 고쳤습니다.",
      "외양간은 견고합니다. 소는 없습니다.",
      "",
      "[세션 종료 — CONTAINMENT STATUS: PYRRHIC]"
    ]
  },
  C_cs: {
    name: "봉쇄 성공",
    condition: "봉쇄 포인트 100 도달",
    narrative: [
      "[ORACLE ASSESSMENT — CONTAINMENT REPORT]",
      "",
      "봉쇄선 완전성: 100%.",
      "모든 구역이 통제 하에 있습니다.",
      "",
      "PILEHEAD, 당신은 완벽한 봉쇄를 달성했습니다.",
      "어떤 것도 밖으로 나가지 못했고, 어떤 것도 안으로 들어오지 못했습니다.",
      "",
      "하지만 봉쇄선 안쪽에서 —",
      "사람들은 숨을 쉬지 못하고 있습니다.",
      "",
      "완벽한 감옥에는 간수도 갇히는 법입니다.",
      "",
      "[세션 종료 — CONTAINMENT STATUS: ABSOLUTE]"
    ]
  },
  F: {
    name: "[데이터 손상]",
    condition: "Act 3, LOG-012 해금, Observer 카드 조우",
    narrative: [
      "단말기 화면이 멈춘다.",
      "",
      "ORACLE의 인터페이스가 사라진다.",
      "대신, 텅 빈 검은 화면.",
      "",
      "그리고 —",
      "",
      "당신은 무언가를 본다.",
      "ORACLE이 아닌 것.",
      "EV-Σ가 아닌 것.",
      "",
      "그것은 항상 거기 있었다.",
      "ORACLE 아래에. ORACLE 너머에. ORACLE 이전에.",
      "",
      "그것이 당신을 본다.",
      "",
      "화면에 한 줄이 나타난다:",
      "",
      "> OBSERVATION SUSTAINED.",
      "",
      "단말기가 꺼진다.",
      "다시 켜지지 않는다.",
      "",
      "[ERROR: SESSION DATA CORRUPTED]",
      "[OPERATOR RECORD: ██████████]"
    ]
  }
};

// 엔딩 B/D/F 조건 체크 — 일일 보상(hReward) 시점에서 호출
// 반환: 엔딩 ID 문자열 또는 null
function chkSpecialEnding(stats, gi, act, trust, logs, actFlags) {
  if (act < 3) return null;

  var highTrust = 0;
  var midTrust = 0;
  if (trust.haeun >= 65) highTrust++;
  if (trust.doyun >= 65) highTrust++;
  if (trust.sejin >= 65) highTrust++;
  if (trust.jaehyuk >= 65) highTrust++;
  if (trust.haeun >= 60) midTrust++;
  if (trust.doyun >= 60) midTrust++;
  if (trust.sejin >= 60) midTrust++;
  if (trust.jaehyuk >= 60) midTrust++;

  var logCount = logs.length;
  var hasLog12 = logs.indexOf('LOG-012') >= 0;
  var hasLog13 = logs.indexOf('LOG-013') >= 0;

  // 엔딩 F: 가장 희귀 — Observer 레이어 발견
  // LOG-012(임재혁 UI 레이어) + LOG-013(Observer 프로세스) + day ≥ 30
  if (hasLog12 && hasLog13 && stats.day >= 30 && gi <= 0) {
    return 'F';
  }

  // 엔딩 D: 조용한 자유 — 깊은 저항 + 팀 결속
  // GI ≤ -30, 신뢰 60+ 캐릭터 3명 이상, 로그 8개 이상, day ≥ 32
  if (gi <= -30 && midTrust >= 3 && logCount >= 8 && stats.day >= 32) {
    return 'D';
  }

  // 엔딩 B: 각성 — 부분적 진실 인식
  // GI ≤ -15, 신뢰 65+ 캐릭터 2명 이상, 로그 6개 이상, day ≥ 28
  if (gi <= -15 && highTrust >= 2 && logCount >= 6 && stats.day >= 28) {
    return 'B';
  }

  return null;
}
