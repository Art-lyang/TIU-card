// data-missions-emergency.js — 긴급 현장임무 (파일럿)
// 비활성(이번 세션 휴면) 변이체를 사전 정찰 없이 긴급 조우하는 자체완결 미션.
// 조사 루트(활성 종)와 ACTIVE_SPECS 게이팅으로 상호배타 → 같은 종 이중 조우 없음.
// MISSIONS 정의 이후 로드 (data-missions.js 뒤).

(function(){
  if (typeof MISSIONS === 'undefined') return;
  var ME = {
    // ── M-E01 : SPEC-011 Shell Talker 긴급 봉쇄선 돌파 ──
    "M-E01": {
      id: "M-E01", title: "봉쇄선 음성 돌파 — 긴급 대응",
      codename: "SHELL TALKER", spec: "SPEC-011", threat: "HIGH",
      hero: "assets/images/missions/mission_m002_shell_talker_clean.webp",
      intel: { grid: "37.5994 N, 127.0881 E", depth: "PERIMETER +0 m", env: "NIGHT / PERIMETER GATE" },
      report: [
        { label: "조우 유형", value: "긴급 — 사전 정찰 없음", level: "danger" },
        { label: "음성 모방", value: "CONFIRMED — 실종 요원 음성", level: "danger" },
        { label: "접근 거리", value: "봉쇄선 게이트 30 m", level: "warn" },
        { label: "예상 생존률", value: "산출 불가 — 데이터 부족", level: "err" },
        { label: "권장 접근 방식", value: "음성 무시 / 즉시 차단", level: "info" },
        { label: "날씨 / 환경", value: "야간 / 무음", level: "info" }
      ],
      nodes: {
        start: {
          text: "야간 경보.\n\n봉쇄선 남측 게이트. 야간 근무조가 무전을 보낸다.\n\n\"...안에서 사람 목소리가 들립니다. 게이트 바로 앞입니다.\"\n\n무전 너머로 목소리가 새어 나온다. 한 명이 아니다. 여럿.\n\n\"...열어줘. 나야. 추워.\"\n\n강도윤이 무전을 끊는다. \"전부 실종 처리된 요원 이름입니다. 사전 징후도 없었습니다. 갑자기 게이트까지 왔어요.\"\n\n윤세진: \"Shell Talker예요. 게이트를 열게 만들려는 겁니다. 근무조가 흔들리고 있어요.\"\n\n[ORACLE: SPEC-011 음성 모방 확인. 경고 — 대상은 희생자의 음성만 복제합니다.]\n\n시간이 없다.",
          choices: [
            { label: "▸ 즉시 진압 — 게이트 사격조 전개", next: "suppress", sub: "즉시 사격 진압", risk: "HIGH", icon: "fire" },
            { label: "▸ 음성 차단 + 포위 — 근무조 후퇴", next: "contain", sub: "차단 후 포위", risk: "MEDIUM", icon: "crosshair" },
            { label: "▸ ORACLE 음향 대조 요청", next: "analyze", g: 2, sub: "음향 대조 요청", risk: "LOW", icon: "dish" }
          ]
        },
        suppress: {
          text: "게이트 사격조를 전개한다. 조명탄이 터진다.\n\n게이트 앞 — 형체가 드러난다. 목에 구멍이 뚫린 외골격. 그 안에서 여전히 사람 목소리가 흘러나온다.\n\n강도윤이 신호를 기다리지 않는다. 일제 사격.\n\n비명. 사람의 비명인지, 복제된 비명인지 알 수 없다.\n\n5초 뒤, 목소리가 멈춘다.\n\n근무조 한 명이 게이트 난간을 붙잡고 주저앉는다. 방금 자기 형의 목소리를 들었다고 했다.\n\n돌아가는 길, 아무도 말하지 않는다.",
          choices: [{ label: "[ 기지 귀환 — 즉시 제거 ]", next: "end", result: { c: 2, r: -2, t: 0, o: 1 }, log: "LOG-004" }]
        },
        contain: {
          text: "근무조를 게이트에서 물린다. 외부 스피커로 화이트노이즈를 송출 — 음성 미끼를 덮는다.\n\n목소리가 끊기자, 형체가 움직이기 시작한다. 게이트를 따라 측면으로.\n\n강도윤의 분대가 세 방향에서 거리를 좁힌다. 음성에 반응하지 않는 팀으로만.\n\n포위. 무력화. 깔끔하진 않지만, 추가 피해는 없다.\n\n윤세진: \"근무조 누구도 안 다쳤어요. ...이 방식, 기록해 둘게요. 다음에 또 올 테니까.\"",
          choices: [{ label: "[ 기지 귀환 — 무피해 제압 ]", next: "end", result: { c: 1, r: -1, t: 2, o: 0 }, log: "LOG-004" }]
        },
        analyze: {
          text: "[ORACLE: 게이트 음원과 한국군 DB 교차 분석 개시...]\n\n결과: 복제된 음성 다수가 인근 봉쇄선 실종자 명단과 일치.\n그중 하나 — 3년 전 강원도 동부 작전 실종자.\n\n[ORACLE: 해당 개체는 다수 희생자를 포식한 누적 개체로 판단됩니다. 게이트 개방 요구는 학습된 유인 행동입니다.]\n[ORACLE: 차단벽 가동 후 원거리 제압을 권고합니다. 근무조 직접 교전 불필요.]\n\n권고대로 차단벽을 올리고, 원거리에서 정리한다. 손실 없음.\n\n게이트가 조용해진 뒤에도, 강도윤은 한참 그 자리를 떠나지 못한다.",
          choices: [{ label: "[ 기지 귀환 — ORACLE 권고 수행 ]", next: "end", result: { c: 1, r: 0, t: 0, o: 2 }, log: "LOG-004" }]
        }
      }
    },
    // ── M-E02 : SPEC-015 Brain Seeker 긴급 하수도 침입 (봉쇄선 내부 조우) ──
    "M-E02": {
      id: "M-E02", title: "하수도 침입 — 긴급 대응",
      codename: "BRAIN SEEKER", spec: "SPEC-015", threat: "DANGER",
      hero: "assets/images/missions/mission_m010_brain_seeker_clean.webp",
      intel: { grid: "37.5215 N, 126.9240 E", depth: "SUB-LEVEL -3 m", env: "NIGHT / SEWER INTAKE" },
      report: [
        { label: "조우 유형", value: "긴급 — 사전 정찰 없음", level: "danger" },
        { label: "침입 경로", value: "하수도 흡입구 — 봉쇄선 내부", level: "danger" },
        { label: "방어 기관", value: "등껍질 부재 — 척추 노출", level: "warn" },
        { label: "학습 단계", value: "순찰 패턴 동기화 — ACTIVE", level: "warn" },
        { label: "예상 사상자", value: "산출 불가 — 표본 부족", level: "err" },
        { label: "교전 조건", value: "협소 통로 / 시야 제한", level: "info" }
      ],
      nodes: {
        start: {
          text: "심야 경보.\n\n하수도 흡입구 격자가 안쪽에서 뜯겨 나갔다. 봉쇄선 내부다.\n\n강도윤 (무전): \"...들어왔습니다. 하수도를 타고 기지 하층으로. 사전 징후 없었습니다.\"\n\"열화상에 거대한 열원 하나. 두개골만 노출. 등껍질이 없습니다 — 척추가 그대로 보여요.\"\n\n윤세진 (무전): \"특수 변이 개체로 확인됨. 누적 포식 개체예요. 우리 순찰 시간을 학습했습니다.\"\n\"하층 통로는 좁아요. 도약 공격에 불리합니다.\"\n\n[ORACLE: 특수 변이 개체 확인 — 지정 BS-GANGWON-01. 봉쇄선 내부 침입. 학습 단계 진입.]\n\n시간이 없다.",
          choices: [
            { label: "▸ 하층 통로 봉쇄 + 집중 사격", next: "seal", sub: "통로 봉쇄 후 제압", risk: "HIGH", icon: "fire" },
            { label: "▸ 배수로 역류 — 흡입구로 역유인", next: "flush", sub: "역류로 유인 제압", risk: "MEDIUM", icon: "crosshair" },
            { label: "▸ ORACLE 열화상 추적 요청", next: "track", g: 2, sub: "열화상 추적 요청", risk: "LOW", icon: "dish" }
          ]
        },
        seal: {
          text: "하층 통로 양쪽을 차폐문으로 봉쇄한다. 퇴로를 끊는다.\n\n좁은 통로 안 — 개체가 모습을 드러낸다. 체고 2.2m. 바다거북형 두개골. 측면 안와에서 빛이 반사된다.\n\n도약. 강도윤의 분대가 일제히 척추를 노린다.\n\n3발. 두개골 상부 관통. 개체가 콘크리트를 긁으며 쓰러진다.\n\n윤세진: \"척추 반응 없음. 무력화 확인.\"\n\n등껍질 없는 개체는 — 방어 수단이 없었다. 다만 통로 벽에, 누군가의 얼굴 가죽이 떨어져 있다.",
          choices: [{ label: "[ 기지 귀환 — 침입 개체 제거 ]", next: "end", result: { c: 2, r: -2, t: 0, o: 1 }, log: "LOG-041" }]
        },
        flush: {
          text: "배수 펌프를 역회전시킨다. 하수도에 역류가 인다.\n\n수위가 차오르자 개체가 흡입구 쪽으로 밀려난다. 학습형 개체는 익숙한 경로로 후퇴하려 한다 — 예상대로.\n\n흡입구 길목에 전기 그물. 작동.\n\n경련. 강도윤이 두개골에 3발을 박는다. 멈춘다.\n\n윤세진: \"근무 인원 손실 없음. ...이 경로, 기록해 둘게요. 또 올 테니까.\"",
          choices: [{ label: "[ 기지 귀환 — 무피해 제압 ]", next: "end", result: { c: 1, r: -1, t: 2, o: 0 }, log: "LOG-041" }]
        },
        track: {
          text: "[ORACLE: 하층 열화상 격자 추적 개시...]\n\n[ORACLE: 개체는 봉쇄선 실종자 다수를 포식한 누적 개체로 판단됩니다. 하수도 흡입구는 학습된 침입 경로입니다.]\n[ORACLE: 차폐 후 원거리 제압을 권고합니다. 근접 교전 불필요.]\n\n권고대로 통로를 차폐하고, 원거리에서 정리한다. 손실 없음.\n\n흡입구 격자를 다시 용접하는 동안, 강도윤은 한참 그 자리를 떠나지 못한다.",
          choices: [{ label: "[ 기지 귀환 — ORACLE 권고 수행 ]", next: "end", result: { c: 1, r: 0, t: 0, o: 2 }, log: "LOG-041" }]
        }
      }
    }
  };
  Object.keys(ME).forEach(function(k){ MISSIONS[k] = ME[k]; });
})();
