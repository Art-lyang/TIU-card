// data-escape-nodes-2.js — B3 루트 + 최종 노드 (data-escape-nodes.js 후속)
// ESCAPE_NODES 객체에 추가 주입. 200줄 룰 준수를 위해 분리.

(function(){
  if (typeof ESCAPE_NODES === 'undefined') return;

  // ═══════════════ B3 루트 ═══════════════
  ESCAPE_NODES.b3_descent = {
    type: 'check',
    title: 'B3 하강 — 03:55',
    simTime: '03:55',
    decisionSec: 30,
    globalCost: 20,
    body: [
      'B3 엘리베이터 홀. 비상등만 들어온 녹색 어둠.',
      '엘리베이터는 빠르지만 ORACLE 감지 레이어와 닿는다.',
      '비상 계단은 안전하나 10층을 걸어내려가야 한다.',
    ],
    choices: [
      { label: '⬇ 엘리베이터 강제 호출',
        hint: '[DC 정숙 45 · -observation 판정]',
        roll: { type: 'stealth', dc: 45, stat: 'observation_inv' },
        effect: { detection: 15 },
        onSuccess: [
          '문이 한 번만 움직이고 닫혔다. ORACLE은 이를 "정비 호출"로 처리했다.',
          '20초 만에 B3 하단. 효율적이었다.',
        ],
        onFail: [
          '문이 두 번 움직였다. 두 번째 호출이 로그에 남았다.',
          '누군가가 그 로그를 읽을 때 — 당신은 이미 없어야 한다.',
        ],
        failEffect: { detection: 25 },
        to: 'emergency_corridor' },
      { label: '⤓ 비상 계단 (10층)',
        hint: 'HP -8 / 탐지 감소',
        to: 'emergency_corridor',
        effect: { hp: -8, detection: -10 },
        onSuccess: ['10층. 호흡이 거칠어졌지만 — 흔적은 없다.'] },
    ],
  };

  ESCAPE_NODES.emergency_corridor = {
    type: 'check',
    title: '비상 복도 — 04:10',
    simTime: '04:10',
    decisionSec: 25,
    globalCost: 25,
    body: [
      '지하 2층 비상 복도. 파이프에서 스팀이 새어나온다.',
      '모퉁이 너머에서 발소리 — 내부 경비 둘. 무장 상태.',
      '이 구간은 우회로가 없다. 정면뿐이다.',
    ],
    choices: [
      { label: '▶ 스팀 차폐 뒤에서 연사',
        hint: '[DC 사격 45 · control 판정]',
        roll: { type: 'aim', dc: 45, stat: 'control' },
        effect: { ammo: -4 },
        onSuccess: [
          '스팀이 조준선을 흐렸지만 그들의 것도 흐려졌다.',
          '당신이 먼저 끝냈다.',
        ],
        onFail: [
          '스팀이 갑자기 걷혔다. 그들이 먼저 봤다.',
          '상호 교전 — 한 명은 제압했지만 나머지 한 명이 무전을 날렸다.',
        ],
        failEffect: { hp: -20, detection: 30 },
        to: 'b3_fork' },
      { label: '◎ 제압하지 않고 기만 (ORACLE 사칭)',
        hint: '[DC 집중 60 · resistance 판정]',
        roll: { type: 'focus', dc: 60, stat: 'resistance' },
        effect: {},
        onSuccess: [
          '"야간 감사. 3분 후 복귀합니다."',
          '그들은 경례하고 물러섰다. 운이 좋았다.',
          '더 정확하게는 — 그들의 훈련이 여기까지였다.',
        ],
        onFail: [
          '억양이 어긋났다. 그들이 당신의 얼굴을 기억했다.',
          '교전 시작. 짧지만 격렬했다.',
        ],
        failEffect: { hp: -15, ammo: -3, detection: 25 },
        to: 'b3_fork' },
    ],
  };

  ESCAPE_NODES.b3_fork = {
    type: 'event',
    title: '복도 분기 — 04:28',
    simTime: '04:28',
    decisionSec: 30,
    globalCost: 10,
    body: [
      '복도가 두 갈래로 갈라진다.',
      '왼쪽 — 격리실 통로. SPEC-011 보관 구역. 거리상 최단.',
      '오른쪽 — 우회 배관로. 15분 더 걸리고 탐지 위험이 추가된다.',
    ],
    choices: [
      { label: '← 격리실 관통',
        hint: '빠름 / 쉘토커 조우 고정',
        to: 'shell_talker_containment',
        effect: {},
        onSuccess: ['왼쪽으로. 격리문의 봉인 테이프가 찢어져 있다.'] },
      { label: '→ 우회 배관로',
        hint: '[DC 은폐 50 · -observation 판정]',
        roll: { type: 'stealth', dc: 50, stat: 'observation_inv' },
        effect: { detection: 15, hp: -5 },
        extraGlobalCost: 20,
        onSuccess: [
          '배관로에서 쥐 한 마리가 도망쳤다. 그게 유일한 증인이었다.',
          '15분 지연. 하지만 격리실은 피했다.',
        ],
        onFail: [
          '배관의 접합부가 소리를 냈다. 감지계가 떨렸다.',
          '몸을 빠르게 빼냈지만 — 흔적은 남았다.',
        ],
        failEffect: { detection: 20 },
        to: 'coast' },
    ],
  };

  ESCAPE_NODES.shell_talker_containment = {
    type: 'check',
    title: '격리실 — 04:32',
    simTime: '04:32',
    decisionSec: 15,  // 극긴장 — 시간 짧음
    globalCost: 25,
    body: [
      '격리문이 열렸다. 안에서 기다리고 있던 것처럼.',
      '',
      '"지휘관님, 여깁니다. — 박상훈입니다. 듣고 계십니까."',
      '',
      '그 목소리를 전에도 들은 적이 있다. 파일로만.',
      '판단할 시간이 길지 않다.',
    ],
    choices: [
      { label: '▶ 음성 무시하고 선제 사격',
        hint: '[DC 집중 65 · shellTalkerKnown 시 DC 50]',
        roll: { type: 'focus', dc: 65, stat: 'resistance',
                shellTalkerKnownBonus: 15 },
        effect: { ammo: -5 },
        onSuccess: [
          '다섯 발. 외골격의 접합부만 정확히 노렸다.',
          '그것은 목소리를 잃었다. — 처음부터 목소리가 아니었다.',
        ],
        onFail: [
          '망설임. 0.4초. 그것이면 충분했다.',
          '음성 모방형이 격벽 그림자에서 튀어나왔다. 첫 타격은 정확했다.',
          'shellTalkerKnown=false + 크리티컬 실패 → E_bad 분기',
        ],
        failEffect: { hp: -40, detection: 20, markUnlucky: true },
        to: 'coast' },
      { label: '◎ 뒤로 물러나며 조준',
        hint: '[DC 사격 55 · control 판정]',
        roll: { type: 'aim', dc: 55, stat: 'control',
                shellTalkerKnownBonus: 10 },
        effect: { ammo: -3 },
        onSuccess: [
          '거리를 벌렸다. 시야를 확보했다. 세 발.',
          '그것은 격벽에 무너졌다. 음성도 그와 함께.',
        ],
        onFail: [
          '후퇴하는 동안 조준선이 흔들렸다.',
          '근접 조우를 허용했다. 어깨가 짓눌렸다.',
        ],
        failEffect: { hp: -35, detection: 15 },
        to: 'coast' },
    ],
  };

  // ═══════════════ 최종 노드 (양쪽 수렴) ═══════════════
  ESCAPE_NODES.coast = {
    type: 'final',
    title: '해안 접선 — 05:30',
    simTime: '05:30',
    decisionSec: 40,
    globalCost: 0,  // 도달하면 글로벌 타이머 영향 없음
    body: [
      '파도 소리가 먼저 들렸다.',
      '해안 방벽 외곽. 바위틈에 검은 실루엣 셋이 서 있다.',
      '베버. 그 옆에 낯선 여성. 그리고 — 닉 포스터.',
      '',
      '마지막 구간. 접선점까지 60미터.',
    ],
    choices: [
      { label: '▶ 정상 접근',
        hint: '[DC 신호 40 · 동행자 trust 평균 보정]',
        roll: { type: 'trust', dc: 40, stat: 'companion_avg' },
        effect: {},
        onSuccess: ['식별. 통과. 당신은 뒤를 돌아보지 않았다.'],
        onFail: [
          '식별 신호가 어긋났다. 베버 쪽에서 긴장했다.',
          '결국 통과했지만 — 몇 초 더 걸렸다.',
        ],
        failEffect: { detection: 10 },
        to: 'ENDING' },
    ],
  };

})();
