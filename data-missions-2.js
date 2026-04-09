// data-missions-2.js — 현장 임무 (M-005~M-006)
(function(){var M2={
  "M-005": {
    id: "M-005", title: "Brood Drone 색출전",
    nodes: {
      start: {
        text: "봉쇄선 남측 500m. Brood Drone 40체 이상 확인.\n\n이전과 다르다. 대형을 유지하고 있다. 누군가가 지휘하고 있다.\n\n강도윤: \"지휘 개체를 찾아야 합니다. 제거하면 나머지는 흩어집니다.\"\n\n[ORACLE: 군체 통신 교란 장비 가용. 반경 200m 유효.]",
        choices: [
          { label: "▸ 교란 장비로 드론 분산", next: "disrupt" },
          { label: "▸ 지휘 개체 직접 수색", next: "hunt" },
          { label: "▸ ORACLE 드론으로 상공 탐색", next: "oracle_drone", g: 2 },
        ]
      },
      disrupt: {
        text: "군체 통신 교란 장비를 가동한다.\n\n드론들의 대형이 흔들린다. 일부가 방향을 잃고 배회하기 시작한다.\n\n그러나 — 30초 후, 대형이 재편된다. 교란 장비의 효과가 약하다.\n\n강도윤: \"지휘 개체가 신호를 증폭하고 있습니다. 교란만으로는 안 됩니다.\"",
        choices: [
          { label: "▸ 지휘 개체 수색으로 전환", next: "hunt" },
          { label: "▸ 철수", next: "retreat", result: { c: 0, r: -1, t: 0, o: 0 } },
        ]
      },
      hunt: {
        text: "드론 대형의 후방을 관찰한다.\n\n300m 후방, 폐건물 옥상 — 다른 것보다 큰 형체가 웅크리고 있다.\n\n긴 목. 껍질에 구멍이 많다. 목에서 진동이 보인다.\n\n강도윤이 숨을 들이쉰다. \"Shell Talker입니다.\"",
        choices: [
          { label: "▸ 저격 시도", next: "snipe" },
          { label: "▸ 위치만 기록하고 철수", next: "mark", result: { c: 1, r: 0, t: 1, o: 0 } },
        ]
      },
      oracle_drone: {
        text: "[ORACLE: 정찰 드론 전개. 열 서명 매핑 중...]\n\n결과: 드론 군집 후방 300m 지점에 대형 개체 1체 확인.\n분류: SPEC-011 (Shell Talker). 지휘 중계 모드.\n\n[ORACLE: 해당 개체 제거 시 반경 300m 내 드론 조직력 60~80% 저하 예상.]\n[ORACLE: 위치 데이터를 전송합니다.]",
        choices: [
          { label: "▸ 위치 확인. 저격 시도", next: "snipe" },
          { label: "▸ 데이터 확보. 철수", next: "retreat_data", result: { c: 1, r: 0, t: 0, o: 2 } },
        ]
      },
      snipe: {
        text: "강도윤이 자세를 잡는다. 거리 300m.\n\n첫 발. 빗나갔다. Shell Talker가 고개를 든다.\n\n두 번째. 목 기관부에 명중.\n\nShell Talker가 경련한다. 동시에 — 주변 드론 전체가 정지한다.\n\n5초간의 정적.\n\n드론들이 방향 없이 흩어지기 시작한다. 통솔자를 잃은 병사들처럼.\n\n강도윤이 고개를 끄덕인다. \"해냈습니다.\"\n\n기지로 돌아온 뒤. 72시간 경과.\n\n봉쇄선 남측의 드론 활동은 0으로 떨어졌습니다.\n하지만 동측과 서측에서 소규모 드론 무리가 새로 관측되기 시작합니다.\n\n윤세진: \"군체가 사라진 게 아니에요. 분산됐을 뿐이에요.\"\n\"지휘 개체가 없으니 소규모로 쪼개져서... 오히려 예측이 어려워졌어요.\"\n\n하나의 위협을 제거하자, 여러 개의 작은 위협이 되었습니다.",
        choices: [
          { label: "[ 기지 귀환 — 지휘 개체 제거 ]", next: "end", result: { c: 2, r: -1, t: 2, o: 0 }, log: "LOG-014" },
        ]
      },
      mark: {
        text: "위치를 기록한다. 오늘은 여기까지.\n\nShell Talker의 좌표, 드론 대형 패턴, 군체 통신 주파수 — 모두 기록.\n\n다음에 더 준비된 상태로 돌아올 수 있다.",
        choices: [
          { label: "[ 기지 귀환 — 정보 수집 ]", next: "end", result: { c: 1, r: 0, t: 1, o: 0 }, log: "LOG-014" },
        ]
      },
      retreat: {
        text: "철수한다. 드론 대형은 여전히 유지되고 있다.\n\n다음에 더 나은 장비로 돌아와야 한다.",
        choices: [
          { label: "[ 기지 귀환 ]", next: "end", result: { c: 0, r: -1, t: 0, o: 0 } },
        ]
      },
      retreat_data: {
        text: "ORACLE 데이터를 확보하고 철수한다.\n\nShell Talker의 위치, 드론 대형 패턴, 군체 통신 주파수 — ORACLE이 기록.\n\n[ORACLE: 우수한 판단입니다. 데이터 분석 후 최적 대응을 권고하겠습니다.]",
        choices: [
          { label: "[ 기지 귀환 ]", next: "end", result: { c: 1, r: 0, t: 0, o: 2 }, log: "LOG-014" },
        ]
      },
    }
  },
  "M-006": {
    id: "M-006", title: "포자 지대 진입",
    nodes: {
      start: {
        text: "방독면 착용. 포자 밀집 지역으로 진입.\n\n시야 30m 미만. 짙은 안개.\n\n발밑에서 푸석한 감촉. 포자가 지면에 쌓여 있다.\n\n강도윤: \"조명을 유지하십시오. 꺼지면 안 됩니다.\"\n\n전방 20m — 안개 속에서 형체가 보인다. 사람처럼 걸어오고 있다.",
        choices: [
          { label: "▸ 조명을 비춘다", next: "light" },
          { label: "▸ 뒤로 물러난다", next: "retreat" },
          { label: "▸ ORACLE 포자 농도 분석", next: "oracle_scan", g: 2 },
        ]
      },
      light: {
        text: "강한 조명을 비춘다.\n\n형체가 흩어진다. 안개처럼 분산된다.\n\n3초 후 — 더 가까운 곳에서 다시 나타난다. 10m.\n\n이번에는 두 개.\n\n강도윤: \"이것들은 포자 집합체입니다. 실체가 없습니다.\"\n\n조명을 비출 때마다 흩어지지만, 점점 가까이에서 재형성된다.",
        choices: [
          { label: "▸ 소각 장비로 포자 제거", next: "burn" },
          { label: "▸ 데이터 기록 후 즉시 철수", next: "record_retreat" },
        ]
      },
      retreat: {
        text: "물러난다. 형체도 멈춘다.\n\n안개 밖으로 나오자 공기가 맑아진다.\n\n윤세진에게 보고할 데이터는 부족하지만, 안전하게 돌아왔다.",
        choices: [
          { label: "[ 기지 귀환 ]", next: "end", result: { c: 0, r: 0, t: 1, o: 0 }, log: "LOG-015" },
        ]
      },
      oracle_scan: {
        text: "[ORACLE: 포자 농도 실시간 매핑 중...]\n\n결과: 현 위치 포자 농도 — 기준치의 12배.\n방독면 유효 시간: 약 40분.\n\n형체는 포자가 일정 밀도 이상 집중된 지점에서 자발적으로 형성.\n지능 여부: 불명.\n\n[ORACLE: 소각으로 밀도를 낮추면 형성을 억제할 수 있습니다.]",
        choices: [
          { label: "▸ 소각 장비 사용", next: "burn" },
          { label: "▸ 40분 내 조사 후 철수", next: "timed_survey" },
        ]
      },
      burn: {
        text: "소각 장비를 가동한다.\n\n화염이 안개를 태운다. 포자가 타면서 주황색 불꽃이 번진다.\n\n형체들이 수축한다. 줄어든다. 사라진다.\n\n하지만 — 소각 지점에서 새로운 포자가 터져 나온다. 2차 확산.\n\n급히 후퇴한다.\n\n기지 귀환 후, 강도윤의 방독면 필터를 검사합니다.\n포자 잔여물이 기준치의 4배. 노출 시간이 10분만 더 길었으면 위험했습니다.\n\n그리고 위성 관측 결과 — 소각 구역의 포자 밀도가 소각 전보다 30% 증가.\n화염이 포자 방출을 촉진한 겁니다.\n\n윤세진이 데이터를 보고 한마디합니다.\n\"불은 답이 아니었어요. 우리가 오히려 확산을 도운 거예요.\"",
        choices: [
          { label: "[ 기지 귀환 — 소각 데이터 확보 ]", next: "end", result: { c: 0, r: -2, t: 0, o: 1 }, log: "LOG-015" },
        ]
      },
      record_retreat: {
        text: "포자 농도, 형체 출현 패턴, 조명 반응 — 모두 기록한다.\n\n강도윤이 후방을 경계하며 안개 밖으로 빠져나온다.\n\n물리적 제거는 불가능하다. 밀도 저감만 가능.\n\n윤세진에게 좋은 데이터가 될 것이다.",
        choices: [
          { label: "[ 기지 귀환 — 관측 데이터 확보 ]", next: "end", result: { c: 1, r: -1, t: 1, o: 0 }, log: "LOG-015" },
        ]
      },
      timed_survey: {
        text: "40분 타이머를 시작한다.\n\n안개 깊숙이 들어간다. 형체가 양쪽에서 나타난다. 무시한다.\n\n중심부에서 발견 — 높이 3m의 식물 유사 구조물. 상부에서 포자 구름이 방출되고 있다.\n\n[ORACLE: SPEC-004 (Seed Spreader) 추정. 이것이 포자의 원천입니다.]\n\n타이머: 12분 남음. 사진을 찍고 돌아간다.",
        choices: [
          { label: "[ 기지 귀환 — 원천 발견 ]", next: "end", result: { c: 1, r: -1, t: 1, o: 1 }, log: "LOG-015" },
        ]
      },
    }
  },
};Object.keys(M2).forEach(function(k){MISSIONS[k]=M2[k]})})();
