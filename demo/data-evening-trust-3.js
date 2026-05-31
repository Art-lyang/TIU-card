// data-evening-trust-3.js - additional trust/state evening chat variants
// Weber, Foster, and Park So-young variants are provided by the extra evening files.
Object.assign(EVENING_TRUST_LINES, {});

// Kang Do-yun injury state (LOG-074-DONE)
// He survives the night assault, but cannot return to field duty.
var DOYUN_INJURED_LINES = {
  low: [
    "...보고드립니다.",
    "현장 복귀는 불가능합니다.",
    "이상입니다."
  ],
  mid: [
    "...아직 움직일 수는 있습니다.",
    "현장 복귀가 안 되니까... 답답합니다.",
    "지휘관님. 임무 관련이면 말씀하십시오. 머리는 멀쩡합니다."
  ],
  high: [
    "지휘관님.",
    "솔직히... 제가 못 나가는 게 불안합니다. 밖에서 무슨 일이 생기면.",
    "임무 조언이라도 드리겠습니다. 그게 지금 제가 할 수 있는 일입니다.",
    "...옆에 없어도 이해하십시오. 지휘관님의 결정은 따르겠습니다."
  ],
  bond: [
    "지휘관님.",
    "...살아있어도 수행이라고 해야 합니까. 현장을 못 나가니까 미칠 것 같습니다.",
    "그래도 제 머리는 굴러갑니다. 작전이든 인원 배치든 물어봐 주십시오.",
    "...그날 밤 지휘관님이 저를 살려둔 결정은 이해합니다. 잊지 않겠습니다."
  ]
};

var DOYUN_MINOR_WOUND_LINES = {
  low: [
    "...왼팔은 처치했습니다.",
    "직접 투입은 줄이는 게 낫겠습니다.",
    "보고는 이상입니다."
  ],
  mid: [
    "팔은 묶어 뒀습니다. 움직일 수는 있습니다.",
    "다만 오늘 같은 수중 진입은 당분간 무리입니다.",
    "필요하면 현장 배치는 제가 다시 짜겠습니다."
  ],
  high: [
    "지휘관. 팔 부상은 크지 않습니다.",
    "하지만 같은 방식으로 한 번 더 들어가면 판단이 흐려질 겁니다.",
    "외곽 작전은 제가 지휘하되, 직접 돌입은 다른 조로 돌리겠습니다."
  ],
  bond: [
    "지휘관.",
    "괜찮다고 말하고 싶지만, 이번엔 윤세진 말이 맞습니다.",
    "직접 뛰는 대신 배치와 퇴로를 제가 잡겠습니다.",
    "...무리해서 빠지는 일은 만들지 않겠습니다."
  ]
};
