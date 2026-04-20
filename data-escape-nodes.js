// data-escape-nodes.js — Act4 탈출 텍스트 어드벤처 노드 데이터
// 로드 순서: data-act4-escape.js 다음, logic-escape-roll.js 이전
// 슈팅 미니게임(field-mission/)을 대체하는 B안 텍스트 어드벤처 모드.
//
// 노드 구조:
//   id           — 노드 식별자
//   type         — 'intro' | 'event' | 'check' | 'final'
//   title        — 상단 타이틀 ("지휘관실")
//   simTime      — CCTV 타임스탬프 ("03:47") 누적용
//   body[]       — 서술 줄 배열 (타이핑 효과로 순차 표시)
//   decisionSec  — 노드 결정 제한 시간 (초)
//   globalCost   — 이 노드 진입 시 글로벌 타이머 자동 감소량 (초)
//   choices[]    — 선택지 배열
//     label      — 버튼 라벨
//     hint       — 힌트 ("[DC 사격 50]" 등)
//     roll       — 롤 정의 { type:'aim'|'stealth'|'focus'|'trust', dc:N, stat:키 }
//     effect     — 기본 효과 (pass 시) { hp:±, detection:±, ammo:± }
//     onFail     — 실패 시 추가 효과 + 서사
//     onSuccess  — 성공 시 추가 서사
//     to         — 다음 노드 id
//     log        — 부여할 LOG id (옵션)
//     autoPick   — 타임아웃 시 자동 선택 여부 (기본 false, 첫 선택지가 auto)

window.ESCAPE_NODES = {
  start: 'commander_office',

  // ═══════════════ 공통 시작 ═══════════════
  commander_office: {
    type: 'intro',
    title: '지휘관실 — 03:47',
    simTime: '03:47',
    decisionSec: 40,
    globalCost: 20,
    body: [
      'ORACLE 단말이 잠시 깜박였다. 베버의 메시지가 암호 채널로 들어온다.',
      '"지휘관. 북측 2km 집결지에서 대기 중입니다. 선택하십시오."',
      '',
      '호흡을 고른다. 선택은 둘 뿐이다.',
      '기지 정문으로 정면 돌파하거나, B3 비상구로 지하를 타거나.',
    ],
    choices: [
      { label: '↗ 기지 정문 돌파 (일반 루트)',
        hint: '초기 난이도 높음 · 후반 완화',
        to: 'base_gate', log: 'LOG-GENERAL-ROUTE',
        effect: {},
        onSuccess: ['정문으로. 당신은 라이플을 점검했다.'] },
      { label: '↓ B3 비상 탈출구 (지하 루트)',
        hint: '초기 정숙 · 후반 격리실 조우',
        to: 'b3_descent', log: 'LOG-B3-ROUTE',
        effect: {},
        onSuccess: ['지하로. 비상 계단 셔터가 절반만 열린다.'] },
    ],
  },

  // ═══════════════ 일반 루트 ═══════════════
  base_gate: {
    type: 'check',
    title: '기지 정문 — 03:52',
    simTime: '03:52',
    decisionSec: 25,
    globalCost: 30,
    body: [
      '정문 초소. 야간 경비 셋.',
      '베버가 원격으로 CCTV를 루프시켰지만 — 22초짜리다.',
      '22초 안에 셋을 무력화하거나, 셋 중 하나를 속여야 한다.',
    ],
    choices: [
      { label: '▶ 정면 사격 (3발, 무음기)',
        hint: '[DC 사격 50 · control 판정]',
        roll: { type: 'aim', dc: 50, stat: 'control' },
        effect: { ammo: -3 },
        onSuccess: [
          '세 발, 간격 정확. 누구도 비명을 지를 틈이 없었다.',
          '22초 루프가 15초 남았다. 통과.',
        ],
        onFail: [
          '두 발째가 빗나갔다. 한 명이 무전기에 손을 댔다.',
          '겨우 입막음했지만 — ORACLE 로그에 이상 신호 파편이 남았다.',
        ],
        failEffect: { hp: -15, detection: 20 },
        to: 'base_exterior' },
      { label: '◎ 루프 구간 우회 (초소 뒤 철조망)',
        hint: '[DC 은폐 55 · -observation 판정]',
        roll: { type: 'stealth', dc: 55, stat: 'observation_inv' },
        effect: {},
        onSuccess: [
          '철조망 아래 흙이 파여 있다. 베버가 예고한 그 자리다.',
          '초소를 등지고 외곽으로 빠져나간다.',
        ],
        onFail: [
          '철조망이 소리를 냈다. 초소의 조명이 이쪽으로 돌았다.',
          '몸을 숙이며 달렸다 — 흔적은 남았다.',
        ],
        failEffect: { hp: -8, detection: 25 },
        to: 'base_exterior' },
    ],
  },

  base_exterior: {
    type: 'event',
    title: '외곽 주차장 — 04:08',
    simTime: '04:08',
    decisionSec: 30,
    globalCost: 15,
    body: [
      '외곽 주차장. 차량 서너 대가 뒤집힌 채 남아 있다.',
      '감염 잔존 흔적은 있지만 활동체는 보이지 않는다.',
      '한쪽 구석에 휴대용 보급 상자. 반대편은 담쟁이 덮인 은폐 루트.',
    ],
    choices: [
      { label: '◎ 보급 상자 확보',
        hint: '+HP 20 / +탄약 6 / 시간 소모',
        to: 'shell_talker_outdoor',
        effect: { hp: 20, ammo: 6 },
        extraGlobalCost: 15,
        onSuccess: ['의약품과 무음 탄창. 그리고 — 베버가 남긴 짧은 쪽지.',
          '"마지막 구간이 가장 조용합니다. 그것이 가장 위험합니다."'] },
      { label: '→ 즉시 은폐 이동',
        hint: '-detection 10 / 보급 포기',
        to: 'shell_talker_outdoor',
        effect: { detection: -10 },
        onSuccess: ['주차장을 빠르게 통과. 시간을 벌었다.'] },
    ],
  },

  shell_talker_outdoor: {
    type: 'check',
    title: '외곽 감염 구역 — 04:24',
    simTime: '04:24',
    decisionSec: 25,
    globalCost: 25,
    body: [
      '콘크리트 담벼락 너머에서 낮은 목소리가 들렸다.',
      '"지휘관님. ... 듣고 계십니까."',
      '',
      '익숙한 음성이다. 전임 부대에서 실종 처리된 누군가.',
      '이것이 진짜일 리 없다. — 진짜일 리 없지?',
    ],
    choices: [
      { label: '◎ 응답하지 않고 우회',
        hint: '[DC 집중 55 · resistance 판정]',
        roll: { type: 'focus', dc: 55, stat: 'resistance',
                shellTalkerKnownBonus: 15 },
        effect: {},
        onSuccess: [
          '한 박자 멈춘 뒤 — 반대 방향으로 움직였다.',
          '등 뒤에서 콘크리트 긁히는 소리. 그것이 쫓지는 않았다.',
        ],
        onFail: [
          '목소리가 가까이 왔다. 담벼락 모서리 — 그림자가 튀어나왔다.',
          '한 발 쐈다. 그것은 후퇴했다. 하지만 당신은 다쳤다.',
        ],
        failEffect: { hp: -20, detection: 15 },
        to: 'coast' },
      { label: '▶ 조준하고 선제 사격',
        hint: '[DC 사격 45 · control 판정]',
        roll: { type: 'aim', dc: 45, stat: 'control' },
        effect: { ammo: -2 },
        onSuccess: [
          '두 발. 그것은 쓰러졌다. 박상훈 중위는 아니었다.',
          '처음부터 아니었다.',
        ],
        onFail: [
          '조준이 흔들렸다. 그것이 먼저 당신을 봤다.',
          '근접 조우 — 어깨에 깊은 상흔이 남았다.',
        ],
        failEffect: { hp: -25, detection: 20 },
        to: 'coast' },
    ],
  },
};
