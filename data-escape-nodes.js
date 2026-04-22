// data-escape-nodes.js — fallback inline escape adventure nodes
var ESCAPE_GLOBAL_TIMER_START = 360;
var ESCAPE_DETECTION_LIMIT = 100;
var ESCAPE_DETECTION_WARNING = 70;
var ESCAPE_OVERTIME_LIMIT = 0;
var ESCAPE_FAIL_PENALTY_SEC = 20;

var ESCAPE_NODES = {
  start: 'general_entry',

  general_entry: {
    title: '정문 돌파 준비',
    simTime: '03:49',
    globalCost: 8,
    decisionSec: 18,
    body: [
      '차량 점화는 금지. 도보 이탈.',
      '정문 쪽 감시 인원을 계산한다.',
      '베버의 채널이 짧게 끊기며 열린다.',
      '"정문 루트. 첫 2분만 버티면 외곽으로 빠집니다."'
    ],
    choices: [
      { label:'연막탄과 함께 돌파한다', hint:'봉쇄 기반 판정', to:'general_checkpoint', roll:{ stat:'c', base:58, bonusStat:'t', bonusScale:0.15 }, effect:{ detection:10 }, onSuccess:['연막이 시야를 덮었다.', '초기 감시는 흔들린다.'], onFail:['연막 전개가 늦었다.', '적외선 감시가 당신을 붙잡는다.'], failEffect:{ hp:-12, detection:20 } },
      { label:'경비 공백을 기다린다', hint:'평가 기반 판정', to:'general_checkpoint', roll:{ stat:'o', base:54, bonusStat:'r', bonusScale:0.10 }, effect:{ detection:4 }, onSuccess:['짧은 공백. 지금이다.'], onFail:['예상보다 순찰 간격이 짧다.'], failEffect:{ detection:16, hp:-6 } }
    ]
  },

  general_checkpoint: {
    title: '외곽 검문선',
    simTime: '03:53',
    globalCost: 10,
    decisionSec: 16,
    body: [
      '첫 검문선 뒤편에서 기계음이 끊긴다.',
      '야간 감시 드론이 회전한다.',
      '정문을 넘겼지만 아직 안전하지 않다.'
    ],
    choices: [
      { label:'드론을 유인해 우회한다', hint:'신뢰 기반 판정', to:'general_final', roll:{ stat:'t', base:56, bonusStat:'o', bonusScale:0.08 }, effect:{ detection:8 }, onSuccess:['드론 시선이 옆으로 벗어난다.'], onFail:['드론의 조명이 당신을 훑는다.'], failEffect:{ detection:18, hp:-8 } },
      { label:'속도를 올려 그대로 밀어붙인다', hint:'자원 기반 판정', to:'general_final', roll:{ stat:'r', base:52, bonusStat:'c', bonusScale:0.08 }, effect:{ hp:-4, detection:12 }, onSuccess:['정문 철제 구조물이 뒤로 멀어진다.'], onFail:['파편과 탄흔이 따라붙는다.'], failEffect:{ hp:-16, detection:14 } }
    ]
  },

  general_final: {
    title: '해안 접선점',
    simTime: '03:58',
    globalCost: 8,
    decisionSec: 14,
    body: [
      '외곽 감염 구역의 그림자가 길게 늘어진다.',
      '파도 소리가 들린다.',
      '마지막 200미터. 누가 먼저 당신을 찾느냐의 문제다.'
    ],
    choices: [
      { label:'엄폐를 유지하며 접근한다', hint:'안정 루트', to:'ENDING', roll:{ stat:'o', base:60, bonusStat:'t', bonusScale:0.10 }, effect:{ detection:5 }, onSuccess:['해안 방벽이 눈앞이다.'], onFail:['마지막 교전이 발생한다.'], failEffect:{ hp:-14, detection:16 } },
      { label:'짧게 뛰어 접선점으로 진입', hint:'속공 루트', to:'ENDING', roll:{ stat:'c', base:57, bonusStat:'r', bonusScale:0.08 }, effect:{ detection:9 }, onSuccess:['숨을 삼킨 채 접선점에 도달한다.'], onFail:['개활지에서 피탄당했다.'], failEffect:{ hp:-18, detection:10 } }
    ]
  },

  b3_entry: {
    title: 'B3 비상구 진입',
    simTime: '03:48',
    globalCost: 6,
    decisionSec: 20,
    body: [
      'B3 하강. 금속 냄새가 짙다.',
      '정전된 복도는 오히려 조용하다.',
      '격리실 방향 표시등이 한 번 깜빡인다.'
    ],
    choices: [
      { label:'정비용 통로로 우회한다', hint:'평가 기반 판정', to:'b3_quarantine', roll:{ stat:'o', base:55, bonusStat:'t', bonusScale:0.10 }, effect:{ detection:5 }, onSuccess:['감시 사각지대를 통과했다.'], onFail:['폐쇄문 해제 지연.'], failEffect:{ detection:14, hp:-6 } },
      { label:'최단거리로 밀고 나간다', hint:'봉쇄 기반 판정', to:'b3_quarantine', roll:{ stat:'c', base:53, bonusStat:'r', bonusScale:0.08 }, effect:{ detection:10 }, onSuccess:['경보 전에 구역을 통과한다.'], onFail:['센서가 짧게 울렸다.'], failEffect:{ detection:18, hp:-10 } }
    ]
  },

  b3_quarantine: {
    title: '격리실 전실',
    simTime: '03:52',
    globalCost: 10,
    decisionSec: 18,
    body: [
      '격리실 앞. 문은 반쯤 열려 있다.',
      '무언가가 사람 목소리를 흉내 낸다.',
      '쉘 토커. 기록 속 그 개체가 여기 있다.'
    ],
    choices: [
      { label:'소리에 반응하지 않고 통과한다', hint:'평정 유지', to:'b3_final', roll:{ stat:'t', base:58, bonusStat:'o', bonusScale:0.12 }, effect:{ detection:8 }, onSuccess:['목소리를 무시했다. 그것이 정답이었다.'], onFail:['망설임이 생겼다.'], failEffect:{ hp:-22, detection:20, markUnlucky:true } },
      { label:'교란 사격 후 돌파한다', hint:'자원 소모 큼', to:'b3_final', roll:{ stat:'r', base:55, bonusStat:'c', bonusScale:0.10 }, effect:{ ammo:-3, detection:14 }, onSuccess:['탄환과 금속 파편이 복도를 가른다.'], onFail:['너무 가까웠다.'], failEffect:{ hp:-18, detection:18, ammo:-4, markUnlucky:true } }
    ]
  },

  b3_final: {
    title: '비상 수직통로',
    simTime: '03:57',
    globalCost: 8,
    decisionSec: 15,
    body: [
      '수직통로 상부 해치.',
      '바깥 공기가 새어 들어온다.',
      '이제 마지막 상승만 남았다.'
    ],
    choices: [
      { label:'동행자를 먼저 올린다', hint:'신뢰 보정', to:'ENDING', roll:{ stat:'t', base:60, bonusStat:'c', bonusScale:0.08 }, effect:{ detection:6 }, onSuccess:['끝까지 질서를 유지했다.'], onFail:['상승 중 조명이 켜진다.'], failEffect:{ hp:-12, detection:20 } },
      { label:'본인이 먼저 올라가 해치를 확보한다', hint:'속도 보정', to:'ENDING', roll:{ stat:'c', base:56, bonusStat:'o', bonusScale:0.08 }, effect:{ detection:10 }, onSuccess:['해치를 강제로 열었다.'], onFail:['해치 고정이 늦었다.'], failEffect:{ hp:-15, detection:18 } }
    ]
  }
};
