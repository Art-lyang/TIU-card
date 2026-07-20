// data-missions-emergency.js — 긴급 현장임무 (파일럿)
// 비활성(이번 세션 휴면) 이변체를 사전 정찰 없이 긴급 조우하는 자체완결 미션.
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
    },
    // ── M-E03 : SPEC-003 Brood Drone 긴급 환기구 군체 침입 ──
    "M-E03": {
      id: "M-E03", title: "환기구 군체 침입 — 긴급 대응",
      codename: "BROOD DRONE", spec: "SPEC-003", threat: "HIGH",
      hero: "assets/images/missions/mission_m005_brood_drone_corridor_hero_v2.webp",
      intel: { grid: "37.4512 N, 126.8901 E", depth: "SUB-LEVEL +1 m", env: "NIGHT / VENT DUCT" },
      report: [
        { label: "조우 유형", value: "긴급 — 사전 정찰 없음", level: "danger" },
        { label: "침입 경로", value: "상부 환기 덕트 — 다중 확산", level: "danger" },
        { label: "개체 수", value: "군체 — 정확 산출 불가", level: "warn" },
        { label: "지휘 개체", value: "근접 추정 — 미식별", level: "warn" },
        { label: "예상 사상자", value: "확산 속도 의존", level: "err" },
        { label: "교전 조건", value: "밀폐 덕트 / 시야 차단", level: "info" }
      ],
      nodes: {
        start: {
          text: "환기 계통 경보.\n\n상부 덕트 필터가 안쪽에서 찢겼다. 소형 개체 다수가 환기로를 타고 기지 내부로 번진다.\n\n임재혁 (무전): \"환기구마다 반응입니다. 한두 마리가 아니에요 — 군체가 통째로 들어왔습니다.\"\n\n윤세진 (무전): \"Brood Drone이에요. 단독으론 약하지만 수가 문제예요. 어딘가에 지휘 개체가 있고, 그게 확산을 조율합니다.\"\n\n[ORACLE: SPEC-003 군체 침입 확인. 경고 — 지휘 개체 제거 전까지 재확산 가능.]\n\n덕트 전체로 퍼지기 전에 결정해야 한다.",
          choices: [
            { label: "▸ 환기 계통 전면 차단 + 소각", next: "burn", sub: "덕트 봉쇄 후 소각", risk: "HIGH", icon: "fire" },
            { label: "▸ 살충 가스 충전 — 구획별 정화", next: "gas", sub: "구획 가스 정화", risk: "MEDIUM", icon: "crosshair" },
            { label: "▸ ORACLE 군체 추적 — 지휘 개체 우선", next: "command", g: 2, sub: "지휘 개체 추적", risk: "LOW", icon: "dish" }
          ]
        },
        burn: {
          text: "환기 계통을 구획째 폐쇄하고, 덕트에 소이 처리를 흘려보낸다.\n\n금속 덕트 안에서 수십 개의 작은 비명이 겹친다. 잠시 후, 잠잠해진다.\n\n강도윤: \"덕트 내부 반응 소멸. ...전부 태웠습니다.\"\n\n확산은 멈췄다. 다만 환기 계통 절반이 못 쓰게 됐다.\n\n윤세진: \"지휘 개체까지 같이 탄 건지는 확실치 않아요. 당분간 환기구를 주시해야 합니다.\"",
          choices: [{ label: "[ 기지 귀환 — 군체 소각 ]", next: "end", result: { c: 2, r: -2, t: 0, o: 1 }, log: "LOG-014" }]
        },
        gas: {
          text: "구획별로 살충 가스를 충전한다. 인원을 먼저 물리고, 한 구획씩 닫아가며 정화한다.\n\n느리지만 확실하다. 덕트 반응이 구획 단위로 하나씩 꺼진다.\n\n마지막 구획에서 — 다른 것보다 큰 열원 하나가 가스에 저항하다 멈춘다.\n\n윤세진: \"...지휘 개체예요. 같이 잡혔습니다. 재확산 위험 없음.\"\n\n시간은 걸렸지만, 손실도 환기 계통 피해도 없다.",
          choices: [{ label: "[ 기지 귀환 — 지휘 개체 포함 정화 ]", next: "end", result: { c: 1, r: -2, t: 1, o: 0 }, log: "LOG-014" }]
        },
        command: {
          text: "[ORACLE: 환기 계통 음향·열화상 패턴 분석 개시...]\n\n[ORACLE: 군체 이동이 한 지점을 중심으로 동기화되어 있습니다. 지휘 개체 위치 추정 — 지하 1 구역 환기 분기점.]\n[ORACLE: 지휘 개체 제거 시 군체 통제 붕괴 예측. 분기점 집중 권고.]\n\n분기점만 노린다. 지휘 개체를 끊자, 나머지 개체들의 움직임이 흐트러진다.\n\n통제를 잃은 군체는 빠르게 정리된다. 환기 계통 피해 최소.",
          choices: [{ label: "[ 기지 귀환 — 지휘 개체 우선 제거 ]", next: "end", result: { c: 1, r: -1, t: 0, o: 2 }, log: "LOG-014" }]
        }
      }
    },
    // ── M-E04 : SPEC-001 Mannequin 긴급 정지 위장 잠입 ──
    "M-E04": {
      id: "M-E04", title: "정지 위장 잠입 — 긴급 대응",
      codename: "MANNEQUIN", spec: "SPEC-001", threat: "HIGH",
      hero: "assets/images/missions/mission_m004_mannequin_encounter_hero_v2.webp",
      intel: { grid: "37.5443 N, 127.0557 E", depth: "STORAGE +0 m", env: "NIGHT / SUPPLY STORE" },
      report: [
        { label: "조우 유형", value: "긴급 — 사전 정찰 없음", level: "danger" },
        { label: "침입 경로", value: "보급품 반입 — 내부 잠입", level: "danger" },
        { label: "위장 상태", value: "정지 — 호흡·열원 거의 없음", level: "warn" },
        { label: "식별 난이도", value: "높음 — 인원과 혼동 위험", level: "warn" },
        { label: "예상 사상자", value: "자극 시 급증", level: "err" },
        { label: "교전 조건", value: "근접 / 식별 우선", level: "info" }
      ],
      nodes: {
        start: {
          text: "인원 점검 불일치.\n\n야간 보급 창고. 정기 점검에서 머릿수가 하나 더 잡힌다.\n\n강도윤 (무전): \"구석에 사람 형체 하나. ...미동이 없습니다. 호흡도, 열도 거의 안 잡혀요.\"\n\"방금 전까지 우리 대원인 줄 알았습니다. 보급품 틈에 섞여 들어온 것 같습니다.\"\n\n윤세진 (무전): \"마네킹이에요. 정지 위장형. 자극하면 순간적으로 움직입니다 — 식별이 먼저예요.\"\n\n[ORACLE: SPEC-001 정지 위장 개체 확인. 경고 — 직접 접촉 전 열화상 식별 권고.]\n\n창고 안 인원들이 술렁인다.",
          choices: [
            { label: "▸ 즉시 제압 — 접근 사격", next: "shoot", sub: "즉시 사격 제압", risk: "HIGH", icon: "fire" },
            { label: "▸ 열화상 식별 후 격리", next: "scan", sub: "식별 후 격리", risk: "MEDIUM", icon: "crosshair" },
            { label: "▸ ORACLE 인원 대조 요청", next: "match", g: 2, sub: "인원 대조 요청", risk: "LOW", icon: "dish" }
          ]
        },
        shoot: {
          text: "강도윤이 신호 없이 접근하며 사격한다.\n\n형체가 — 사격 직전, 순간적으로 움직인다. 사람처럼 팔을 들어 막는다.\n\n총성. 형체가 무너진다. 표면의 피부 같은 막이 벗겨지며, 안쪽의 매끈한 골격이 드러난다.\n\n사람이 아니다. 처음부터.\n\n근무 인원 한 명이 주저앉는다. 방금 전까지 동료라고 믿었던 것이다.\n\n빠르게 끝났지만, 창고의 공기가 무겁다.",
          choices: [{ label: "[ 기지 귀환 — 즉시 제거 ]", next: "end", result: { c: 1, r: -1, t: 0, o: 1 }, log: "LOG-013" }]
        },
        scan: {
          text: "인원을 전부 물린다. 열화상 스캐너로 한 명씩 대조한다.\n\n전원 정상 체온 — 단 하나, 구석의 형체만 거의 상온이다.\n\n식별 완료. 인원과 분리한 뒤, 자극을 주지 않고 차폐 케이스로 덮어 격리한다.\n\n형체가 케이스 안에서 한 번 꿈틀하다, 다시 멈춘다.\n\n윤세진: \"무피해 식별·격리 완료. ...이 방식이면 표본도 보존돼요. 연구 가치가 있습니다.\"",
          choices: [{ label: "[ 기지 귀환 — 무피해 격리 ]", next: "end", result: { c: 1, r: -1, t: 1, o: 0 }, log: "LOG-013" }]
        },
        match: {
          text: "[ORACLE: 창고 인원 생체 데이터 교차 대조 개시...]\n\n[ORACLE: 등록 인원 전원 일치. 구석 개체 — 미등록. 생체 신호 패턴 비생물.]\n[ORACLE: 해당 개체는 보급 반입 시점에 혼입된 것으로 추정됩니다. 반입 검수 절차 보강을 권고합니다.]\n\n식별된 개체만 분리해 원거리에서 정리한다. 인원 손실 없음.\n\n반입 검수 누락이 어디서 났는지 — 기록이 남는다.",
          choices: [{ label: "[ 기지 귀환 — ORACLE 대조 수행 ]", next: "end", result: { c: 1, r: 0, t: 0, o: 2 }, log: "LOG-013" }]
        }
      }
    }
  };
  Object.keys(ME).forEach(function(k){ MISSIONS[k] = ME[k]; });
})();
