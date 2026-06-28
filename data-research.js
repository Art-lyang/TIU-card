// data-research.js — 윤세진 연구 콘솔 (변이체/바이러스 연구 R&R 시스템)
// RESEARCH_PROJECTS: 프로젝트 정의 + 순수 엔진 함수(테스트 가능, app.js가 얇게 호출)
// 진행 방식: 일자 자동 진행(Q1=B). 각 단계 착수 시 자원 투입 → days만큼 경과 → 가중 롤.
//   성공: 다음 단계(또는 최종 완료 시 기존 캐논 LOG 해금 + 영구 스탯) / 실패: 온건 패널티(Q2=A).
// 정합성: 완료 LOG는 기존 캐논 로그(LOG-017/LOG-RES-*/LOG-LIGHT-02)를 그대로 해금 →
//   콘솔·대화·이브닝·아카이브가 동일 마일스톤을 공유한다.

var RESEARCH_PROJECTS = [
  {
    id: "RP-SUPPRESS",
    name: "EV-Σ 억제제 (Phase 0→1)",
    char: "윤세진",
    desc: "감염자의 Phase 0→1 전환을 늦추는 지연 화합물. 성공 시 사람을 구할 시간을 번다.",
    reqLog: "LOG-INTRO-YS", minDay: 6, minAct: 1,
    doneLog: "LOG-017",
    doneFx: { c: 5, t: 5 },
    doneToast: "억제제 실용화 — 봉쇄·신뢰 강화",
    stages: [
      { label: "동물 실험", days: 2, cost: { r: 5 }, risk: 0.15, fail: { r: 0 },
        failToast: "동물 실험 데이터 불안정 — 재시도 필요" },
      { label: "화합물 정제", days: 3, cost: { r: 10 }, risk: 0.25, fail: { o: 5 },
        failToast: "정제 실패 — ORACLE이 자원 사용을 주시" },
      { label: "인체 임상", days: 3, cost: { r: 15 }, risk: 0.4, fail: { t: -5, o: 5 },
        failToast: "임상 부작용 — 팀 신뢰 흔들림, ORACLE 주목 상승" }
    ],
    en: {
      name: "EV-Σ Suppressant (Phase 0→1)",
      desc: "A delay compound that slows the Phase 0→1 conversion in the infected. Success buys time to save lives.",
      doneToast: "Suppressant deployed — containment & trust reinforced",
      stages: [
        { label: "Animal trials", failToast: "Animal-trial data unstable — retry needed" },
        { label: "Compound refinement", failToast: "Refinement failed — ORACLE notes the resource burn" },
        { label: "Human trial", failToast: "Clinical side effects — team trust shaken, ORACLE scrutiny up" }
      ]
    }
  },
  {
    id: "RP-SPEC",
    name: "이변체 표본 분석",
    char: "윤세진",
    desc: "확보한 SPEC 표본의 조직·행동 패턴 정밀 분석. 성공 시 현장 대응 인텔을 확보한다.",
    reqLog: "LOG-INTRO-YS", minDay: 8, minAct: 2,
    doneLog: "LOG-RES-012",
    doneFx: { o: -5, c: 5 },
    doneToast: "표본 분석 완료 — 대응 인텔 확보",
    stages: [
      { label: "표본 안정화", days: 2, cost: { r: 5 }, risk: 0.2, fail: { o: 5 },
        failToast: "표본 반응 불안정 — 재시도 필요" },
      { label: "활체 정밀 분석", days: 2, cost: { r: 10 }, risk: 0.3, fail: { c: -5 },
        failToast: "격리 절차 일부 실패 — 봉쇄 소폭 약화" }
    ],
    en: {
      name: "Aberrant Specimen Analysis",
      desc: "Detailed tissue and behavior analysis of secured SPEC specimens. Success yields field-response intel.",
      doneToast: "Specimen analysis complete — response intel secured",
      stages: [
        { label: "Specimen stabilization", failToast: "Specimen reaction unstable — retry needed" },
        { label: "Live-specimen analysis", failToast: "Partial containment failure — containment weakened slightly" }
      ]
    }
  },
  {
    id: "RP-LIGHT",
    name: "광반응 약점 규명",
    char: "윤세진",
    desc: "감시 영상의 빛 반응을 프레임 단위로 분석해 이변체의 약점 파장대를 규명한다.",
    reqLog: "LOG-INTRO-YS", minDay: 10, minAct: 2,
    doneLog: "LOG-RES-LIGHT",
    doneFx: { c: 5 },
    doneToast: "광반응 데이터 확보 — 봉쇄 효율 향상",
    stages: [
      { label: "프레임 분석", days: 2, cost: { r: 5 }, risk: 0.1, fail: { r: 0 },
        failToast: "분석 노이즈 과다 — 재시도 필요" },
      { label: "파장대 특정", days: 3, cost: { r: 10 }, risk: 0.2, fail: { r: -5 },
        failToast: "장비 과부하 — 자원 소량 손실" }
    ],
    en: {
      name: "Photoreaction Weakness Study",
      desc: "Frame-by-frame analysis of light reactions in surveillance footage to pin down the aberrant's vulnerable wavelength band.",
      doneToast: "Photoreaction data secured — containment efficiency up",
      stages: [
        { label: "Frame analysis", failToast: "Too much analysis noise — retry needed" },
        { label: "Wavelength isolation", failToast: "Equipment overload — minor resource loss" }
      ]
    }
  },
  {
    id: "RP-JOINT",
    name: "합동 연구: ORACLE 예측 모델 대조",
    char: "윤세진 · 임재혁",
    desc: "윤세진의 표본 데이터와 임재혁의 ORACLE 쿼리 역분석을 합쳐 예측 모델의 편향을 규명한다. 두 사람이 함께해야 가능한 연구.",
    reqLogs: ["LOG-INTRO-YS", "LOG-INTRO-IJ"], minDay: 14, minAct: 2,
    doneLog: "LOG-RES-JOINT",
    doneFx: { t: 5, o: -5 },
    doneToast: "ORACLE 편향 입증 — 신뢰 결집, 충성 하락",
    stages: [
      { label: "데이터 통합", days: 2, cost: { r: 10 }, risk: 0.2, fail: { o: 5 },
        failToast: "통합 중 쿼리 흔적 노출 — ORACLE 주목" },
      { label: "쿼리 역분석", days: 3, cost: { r: 10 }, risk: 0.3, fail: { o: 5 },
        failToast: "역분석 감지 — ORACLE 주목 상승" },
      { label: "편향 입증", days: 3, cost: { r: 15 }, risk: 0.35, fail: { t: -5, o: 5 },
        failToast: "입증 실패 — 팀 사기·보안 동시 타격" }
    ],
    en: {
      name: "Joint Study: ORACLE Prediction-Model Audit",
      desc: "Cross-references Yoon Se-jin's specimen data with Lim Jae-hyeok's reverse-analysis of ORACLE queries to expose bias in the prediction model. Only possible with both of them.",
      doneToast: "ORACLE bias proven — trust rallies, loyalty drops",
      stages: [
        { label: "Data integration", failToast: "Query traces exposed during integration — ORACLE notices" },
        { label: "Query reverse-analysis", failToast: "Reverse-analysis detected — ORACLE scrutiny rises" },
        { label: "Bias proof", failToast: "Proof failed — morale and security both take a hit" }
      ]
    }
  }
];

// ── 순수 엔진 (app.js와 헤드리스 테스트가 공유) ──

var RESEARCH_DEFAULT_PROJ = { stage: 0, prog: 0, active: false, done: false };

function researchGetProject(id) {
  for (var i = 0; i < RESEARCH_PROJECTS.length; i++) if (RESEARCH_PROJECTS[i].id === id) return RESEARCH_PROJECTS[i];
  return null;
}

// 저장 상태에서 특정 프로젝트의 진행 상태(없으면 기본값 복제)
function researchProjState(state, id) {
  var s = (state && state[id]) ? state[id] : null;
  return {
    stage: s && typeof s.stage === 'number' ? s.stage : 0,
    prog: s && typeof s.prog === 'number' ? s.prog : 0,
    active: !!(s && s.active),
    done: !!(s && s.done)
  };
}

// 저장 상태 정규화(손상/구버전 방어 — 로드 안전성)
function researchNormalize(state) {
  var out = {};
  if (!state || typeof state !== 'object') return out;
  for (var i = 0; i < RESEARCH_PROJECTS.length; i++) {
    var p = RESEARCH_PROJECTS[i];
    if (state[p.id]) {
      var ps = researchProjState(state, p.id);
      if (ps.stage > p.stages.length) ps.stage = p.stages.length;
      if (ps.stage < 0) ps.stage = 0;
      if (ps.done) { ps.active = false; ps.stage = p.stages.length; }
      out[p.id] = ps;
    }
  }
  return out;
}

function researchVisible(p, day, act, logs) {
  if (!p) return false;
  logs = logs || [];
  if (p.reqLog && logs.indexOf(p.reqLog) < 0) return false;
  if (p.reqLogs) { for (var i = 0; i < p.reqLogs.length; i++) { if (logs.indexOf(p.reqLogs[i]) < 0) return false; } }
  if (typeof p.minDay === 'number' && day < p.minDay) return false;
  if (typeof p.minAct === 'number' && act < p.minAct) return false;
  return true;
}

function researchCurrentStage(p, ps) {
  if (!p || !ps || ps.done || ps.stage >= p.stages.length) return null;
  return p.stages[ps.stage];
}

// 자원 충분 여부(현재 단계 cost 기준)
function researchAffordable(stage, stats) {
  if (!stage || !stage.cost) return true;
  var k; for (k in stage.cost) { if (!stage.cost.hasOwnProperty(k)) continue; if ((stats[k] || 0) < stage.cost[k]) return false; }
  return true;
}

function researchCanStart(state, p, stats, day, act, logs) {
  if (!researchVisible(p, day, act, logs)) return false;
  var ps = researchProjState(state, p.id);
  if (ps.done || ps.active) return false;
  var stage = researchCurrentStage(p, ps);
  if (!stage) return false;
  return researchAffordable(stage, stats);
}

// 단계 착수: 자원 차감 + active. 순수 — {state, stats} 새 객체 반환. 불가 시 변경 없이 반환.
function researchStart(state, id, stats, day, act, logs) {
  var p = researchGetProject(id);
  var nState = researchNormalize(state);
  var nStats = { c: stats.c, r: stats.r, t: stats.t, o: stats.o, day: stats.day };
  if (!researchCanStart(nState, p, nStats, day, act, logs)) return { state: nState, stats: nStats, ok: false };
  var ps = researchProjState(nState, id);
  var stage = researchCurrentStage(p, ps);
  var k; for (k in stage.cost) { if (stage.cost.hasOwnProperty(k)) nStats[k] = Math.max(0, (nStats[k] || 0) - stage.cost[k]); }
  ps.active = true; ps.prog = 0;
  nState[id] = ps;
  return { state: nState, stats: nStats, ok: true };
}

// 하루 경과: active 프로젝트 prog++, 성숙 단계 롤 해소. 순수 — rng 주입(테스트). effects로 fx/log/toast 반환.
function researchAdvanceDay(state, rng) {
  rng = rng || Math.random;
  var nState = researchNormalize(state);
  var effects = [];
  for (var i = 0; i < RESEARCH_PROJECTS.length; i++) {
    var p = RESEARCH_PROJECTS[i];
    var ps = nState[p.id];
    if (!ps || !ps.active || ps.done) continue;
    var stage = p.stages[ps.stage];
    if (!stage) { ps.active = false; continue; }
    ps.prog = (ps.prog || 0) + 1;
    if (ps.prog < stage.days) { nState[p.id] = ps; continue; }
    // 성숙 → 롤
    var success = rng() >= stage.risk;
    if (success) {
      var lastStage = (ps.stage >= p.stages.length - 1);
      ps.active = false; ps.prog = 0;
      if (lastStage) {
        ps.done = true; ps.stage = p.stages.length;
        effects.push({ id: p.id, outcome: 'complete', fx: p.doneFx || {}, log: p.doneLog || null, toast: p.doneToast || '', stageLabel: '' });
      } else {
        ps.stage = ps.stage + 1;
        effects.push({ id: p.id, outcome: 'stage', fx: {}, log: null, toast: '', stageLabel: stage.label });
      }
    } else {
      ps.active = false; ps.prog = 0;
      effects.push({ id: p.id, outcome: 'fail', fx: stage.fail || {}, log: null, toast: stage.failToast || '', stageLabel: stage.label });
    }
    nState[p.id] = ps;
  }
  return { state: nState, effects: effects };
}

// 진행 중 프로젝트가 하나라도 있나(런처 배지/표시용)
function researchActiveCount(state) {
  var n = 0; var ns = researchNormalize(state);
  for (var i = 0; i < RESEARCH_PROJECTS.length; i++) { var ps = ns[RESEARCH_PROJECTS[i].id]; if (ps && ps.active && !ps.done) n++; }
  return n;
}
function researchDoneCount(state) {
  var n = 0; var ns = researchNormalize(state);
  for (var i = 0; i < RESEARCH_PROJECTS.length; i++) { var ps = ns[RESEARCH_PROJECTS[i].id]; if (ps && ps.done) n++; }
  return n;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    RESEARCH_PROJECTS: RESEARCH_PROJECTS,
    researchGetProject: researchGetProject,
    researchProjState: researchProjState,
    researchNormalize: researchNormalize,
    researchVisible: researchVisible,
    researchCurrentStage: researchCurrentStage,
    researchAffordable: researchAffordable,
    researchCanStart: researchCanStart,
    researchStart: researchStart,
    researchAdvanceDay: researchAdvanceDay,
    researchActiveCount: researchActiveCount,
    researchDoneCount: researchDoneCount
  };
}
