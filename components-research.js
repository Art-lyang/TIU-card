// components-research.js — 연구 콘솔 UI (윤세진 이변체/바이러스 연구)
// ResearchPanel: 이미지 중심 연구 대시보드 — 연구실 히어로 + 프로젝트 미디어 카드 (.rlab-*)

function ResearchPanel(p) {
  var EN = (typeof getLocale === 'function' && getLocale() === 'en');
  var research = (typeof researchNormalize === 'function') ? researchNormalize(p.research) : (p.research || {});
  var stats = p.stats || { c: 0, r: 0, t: 0, o: 0 };
  var day = p.day || 1, act = p.act || 1, logs = p.logs || [];

  var L = function(ko, en) { return EN ? en : ko; };
  var fxStr = function(fx) {
    if (!fx) return '';
    var map = { c: L('봉쇄', 'CON'), r: L('자원', 'RES'), t: L('신뢰', 'TRU'), o: L('충성', 'LOY') };
    var parts = []; var k;
    for (k in fx) { if (!fx.hasOwnProperty(k) || !fx[k]) continue; parts.push(map[k] + (fx[k] > 0 ? '+' : '') + fx[k]); }
    return parts.join(' ');
  };
  var costStr = function(cost) {
    if (!cost) return '';
    var map = { c: L('봉쇄', 'CON'), r: L('자원', 'RES'), t: L('신뢰', 'TRU'), o: L('충성', 'LOY') };
    var parts = []; var k;
    for (k in cost) { if (cost.hasOwnProperty(k) && cost[k]) parts.push(map[k] + ' -' + cost[k]); }
    return parts.join(' ');
  };

  var RDIR = 'assets/images/research/';
  var RP_IMG = { 'RP-SUPPRESS': RDIR + 'research_suppress.webp', 'RP-SPEC': RDIR + 'research_spec.webp', 'RP-LIGHT': RDIR + 'research_light.webp', 'RP-JOINT': RDIR + 'research_joint.webp' };

  var visible = RESEARCH_PROJECTS.filter(function (proj) { return researchVisible(proj, day, act, logs); });

  var help = useRlabHelp('ts_researchHelpSeen', p.devPreview);
  var helpRows = [
    [L('착수', 'BEGIN'), L('윤세진 연구관의 이변체·바이러스 연구입니다. 단계마다 자원을 들여 ‘단계 착수’로 시작합니다.', "Yoon Se-jin's aberrant/virus research. Each stage costs resources — start it with 'Begin Stage'.")],
    [L('진행', 'PROGRESS'), L('착수한 단계는 매일 진행되고, 하루 마감 시 성공·실패가 판정됩니다. 성공률은 카드에 표시됩니다.', 'An active stage advances every day and resolves (success/fail) at day end. The success rate is shown on each card.')],
    [L('완료', 'COMPLETE'), L('모든 단계를 마치면 완료 보상이 적용됩니다. 자원이 부족하면 착수 버튼이 비활성화됩니다.', 'Finishing all stages applies the completion reward. If resources run short, the begin button is disabled.')]
  ];

  var projCard = function (proj) {
    var ps = researchProjState(research, proj.id);
    var pen = (EN && proj.en) ? proj.en : null;
    var name = pen ? pen.name : proj.name;
    var desc = pen ? pen.desc : proj.desc;
    var done = ps.done;
    var stage = researchCurrentStage(proj, ps);
    var enStages = pen && pen.stages ? pen.stages : null;
    var stageLabel = function (idx) { return (enStages && enStages[idx]) ? enStages[idx].label : proj.stages[idx].label; };
    var total = proj.stages.length;
    var thumb = RP_IMG[proj.id] || (RDIR + 'research_spec.webp');

    var progPct = done ? 100 : ((ps.active && stage) ? Math.round(((ps.stage + (ps.prog / stage.days)) / total) * 100) : Math.round((ps.stage / total) * 100));

    var pill = done ? h('span', { className: 'rlab-pill rlab-pill--done' }, L('완료', 'DONE'))
      : (ps.active ? h('span', { className: 'rlab-pill rlab-pill--run' }, L('진행', 'ACTIVE'))
        : h('span', { className: 'rlab-pill rlab-pill--wait' }, L('대기', 'READY')));

    var statusText, metaRow = null;
    if (done) {
      statusText = h('div', { className: 'rlab-state rlab-state--done' }, '✔ ' + L('연구 완료', 'RESEARCH COMPLETE') + (proj.doneFx ? '   ·   ' + fxStr(proj.doneFx) : ''));
    } else if (ps.active && stage) {
      statusText = h('div', { className: 'rlab-state rlab-state--run' }, L('진행 중', 'IN PROGRESS') + ' — ' + stageLabel(ps.stage) + '   ·   D' + ps.prog + '/' + stage.days);
    } else if (stage) {
      var succ = Math.round((1 - stage.risk) * 100);
      var sc = succ >= 70 ? 'ok' : (succ >= 55 ? 'warn' : 'risk');
      var rewardHint = (ps.stage >= total - 1) ? (L('완료 보상', 'reward') + ' ' + fxStr(proj.doneFx)) : L('다음 단계로', 'next stage');
      statusText = h('div', { className: 'rlab-stage' }, L('단계', 'STAGE') + ' ' + (ps.stage + 1) + '/' + total + ' — ' + stageLabel(ps.stage));
      metaRow = h('div', { className: 'rlab-meta' },
        h('span', null, L('비용', 'COST') + ' ', h('b', null, costStr(stage.cost) || '—')),
        h('span', null, L('소요', 'TIME') + ' ', h('b', null, stage.days + L('일', 'd'))),
        h('span', null, L('성공', 'SUCC') + ' ', h('b', { className: 'rlab-' + sc }, succ + '%')),
        h('span', { className: 'rlab-meta-reward' }, rewardHint));
    }

    var canStart = !done && !ps.active && stage && researchAffordable(stage, stats);
    var btn = (!done) && h('button', { type: 'button', className: 'rlab-btn' + (ps.active ? ' is-running' : (canStart ? '' : ' is-disabled')),
      onClick: function () { if (canStart && p.onStart) p.onStart(proj.id); } },
      ps.active ? L('진행 중…', 'RUNNING…') : (canStart ? L('단계 착수', 'BEGIN STAGE') : L('자원 부족', 'INSUFFICIENT')));

    return h('div', { key: proj.id, className: 'rlab-card' + (ps.active ? ' is-active' : '') + (done ? ' is-done' : '') },
      h('div', { className: 'rlab-thumb' },
        h('div', { className: 'rlab-thumb-img', style: { backgroundImage: 'url(' + thumb + ')' } }),
        h('div', { className: 'rlab-thumb-fx' })),
      h('div', { className: 'rlab-info' },
        h('div', { className: 'rlab-title-row' }, h('div', { className: 'rlab-title' }, name), pill),
        h('div', { className: 'rlab-desc' }, desc),
        statusText,
        h('div', { className: 'rlab-prog' }, h('div', { className: 'rlab-prog-fill', style: { width: progPct + '%' } })),
        metaRow,
        btn));
  };

  var resItem = function (k, v) { return h('div', { className: 'rlab-res-item' }, h('div', { className: 'rlab-res-k' }, k), h('div', { className: 'rlab-res-v' }, (v == null ? 0 : v))); };

  return h('div', { className: 'rlab-screen' },
    h('div', { className: 'rlab-frame' },
      h('div', { className: 'rlab-hero' },
        h('div', { className: 'rlab-hero-img', style: { backgroundImage: 'url(' + RDIR + 'research_hero.webp)' } }),
        h('div', { className: 'rlab-hero-top' },
          h('div', { className: 'rlab-kicker' }, h('span', { className: 'rlab-live' }), L('연구 콘솔', 'RESEARCH CONSOLE')),
          h('div', { className: 'rlab-hero-ctrls' },
            h(RlabHelpButton, { onClick: help.show, title: L('탭 안내', 'Tab guide') }),
            h('button', { type: 'button', className: 'rlab-close', 'aria-label': L('닫기', 'Close'), onClick: function () { if (p.onClose) p.onClose(); } }, '×'))),
        h('div', { className: 'rlab-hero-id' },
          h('div', { className: 'rlab-hero-name' }, L('이변체 연구실', 'Aberrant Research Lab')),
          h('div', { className: 'rlab-hero-role' }, L('담당 연구관 · ', 'Lead researcher · '), h('b', null, L('윤세진', 'Yoon Se-jin'))))),
      h('div', { className: 'rlab-res' }, resItem(L('자원', 'RES'), stats.r), resItem(L('봉쇄', 'CON'), stats.c), resItem(L('신뢰', 'TRU'), stats.t)),
      h('div', { className: 'rlab-body' },
        visible.length === 0
          ? h('div', { className: 'rlab-empty' }, L('아직 착수 가능한 연구가 없습니다.', 'No research available yet.'))
          : visible.map(projCard),
        h('div', { className: 'rlab-foot' }, L('※ 착수 후 매일 진행됩니다. 결과는 하루 마감 시 판정됩니다.', '※ Progress advances each day. Outcomes resolve at day end.'))),
      h(RlabHelpOverlay, { open: help.open, onClose: help.close, title: L('연구 콘솔 안내', 'RESEARCH CONSOLE'), ok: L('확인', 'GOT IT'), rows: helpRows }))
  );
}
