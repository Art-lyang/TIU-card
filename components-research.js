// components-research.js — 연구 콘솔 UI (윤세진 변이체/바이러스 연구)
// ResearchPanel: 가운데 정렬 터미널 창 + 윤세진 ID 헤더 + 구조화 카드 (.rsch-*)

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

  var visible = RESEARCH_PROJECTS.filter(function (proj) { return researchVisible(proj, day, act, logs); });

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

    var gauge = h('div', { className: 'rsch-gauge' },
      h('div', { className: 'rsch-gauge-bars' },
        proj.stages.map(function (st, i) {
          var sd = i < ps.stage || done; var sc = i === ps.stage && ps.active && !done;
          return h('div', { key: i, className: 'rsch-seg' + (sd ? ' is-done' : '') + (sc ? ' is-cur' : '') });
        })),
      h('div', { className: 'rsch-gauge-n' }, (done ? total : ps.stage) + '/' + total));

    var pill = done ? h('span', { className: 'rsch-pill rsch-pill--done' }, L('완료', 'DONE'))
      : (ps.active ? h('span', { className: 'rsch-pill rsch-pill--run' }, L('진행', 'ACTIVE'))
        : h('span', { className: 'rsch-pill rsch-pill--wait' }, L('대기', 'READY')));

    var body;
    if (done) {
      body = h('div', { className: 'rsch-doneline' }, '✔ ' + L('연구 완료', 'RESEARCH COMPLETE') + (proj.doneFx ? '   ·   ' + fxStr(proj.doneFx) : ''));
    } else if (ps.active && stage) {
      body = h('div', { className: 'rsch-runline' }, L('진행 중', 'IN PROGRESS') + ' — ' + stageLabel(ps.stage) + '   ·   D' + ps.prog + '/' + stage.days);
    } else if (stage) {
      var succ = Math.round((1 - stage.risk) * 100);
      var succCls = succ >= 70 ? 'rsch-succ--ok' : (succ >= 55 ? 'rsch-succ--warn' : 'rsch-succ--risk');
      var rewardHint = (ps.stage >= total - 1) ? (L('완료 보상', 'REWARD') + ' ' + fxStr(proj.doneFx)) : L('다음 단계로', 'advance to next stage');
      body = h(React.Fragment, null,
        h('div', { className: 'rsch-stageline' }, L('단계', 'STAGE') + ' ' + (ps.stage + 1) + '/' + total + ' — ' + stageLabel(ps.stage)),
        h('div', { className: 'rsch-metagrid' },
          h('div', { className: 'rsch-cell' }, h('div', { className: 'rsch-cell-k' }, L('비용', 'COST')), h('div', { className: 'rsch-cell-v' }, costStr(stage.cost) || '—')),
          h('div', { className: 'rsch-cell' }, h('div', { className: 'rsch-cell-k' }, L('소요', 'TIME')), h('div', { className: 'rsch-cell-v' }, stage.days + L('일', 'd'))),
          h('div', { className: 'rsch-cell rsch-cell--succ' }, h('div', { className: 'rsch-cell-k' }, L('성공률', 'SUCCESS')), h('div', { className: 'rsch-cell-v ' + succCls }, succ + '%'))),
        h('div', { className: 'rsch-reward' }, rewardHint + '   ·   ' + L('실패 시', 'on fail') + ' ' + (fxStr(stage.fail) || L('재시도', 'retry'))));
    }

    var canStart = !done && !ps.active && stage && researchAffordable(stage, stats);
    var btnCls = 'rsch-btn' + (ps.active ? ' is-running' : (canStart ? '' : ' is-disabled'));
    var btn = (!done) && h('button', { type: 'button', className: btnCls,
      onClick: function () { if (canStart && p.onStart) p.onStart(proj.id); } },
      ps.active ? L('진행 중…', 'RUNNING…') : (canStart ? L('단계 착수', 'BEGIN STAGE') : L('자원 부족', 'INSUFFICIENT')));

    return h('div', { key: proj.id, className: 'rsch-card' + (ps.active ? ' is-active' : '') + (done ? ' is-done' : '') },
      h('div', { className: 'rsch-card-glow' }),
      h('div', { className: 'rsch-card-top' }, h('div', { className: 'rsch-card-name' }, name), pill),
      h('div', { className: 'rsch-card-desc' }, desc),
      gauge, body, btn);
  };

  var portrait = (typeof IMG !== 'undefined' && IMG.char_sejin) ? IMG.char_sejin : ((typeof CHAR_IMG !== 'undefined' && CHAR_IMG['윤세진']) || null);
  var chip = function (label, val) { return h('span', { className: 'rsch-chip' }, label + ' ', h('b', null, val)); };

  return h('div', { className: 'rsch-screen' },
    h('div', { className: 'rsch-frame' },
      h('div', { className: 'rsch-topbar' },
        h('div', { className: 'rsch-topbar-t' }, h('span', { className: 'rsch-live-dot' }), L('연구 콘솔', 'RESEARCH CONSOLE')),
        h('span', { className: 'rsch-close', onClick: function () { if (p.onClose) p.onClose(); } }, '×')),
      h('div', { className: 'rsch-scroll' },
        h('div', { className: 'rsch-id' },
          h('div', { className: 'rsch-id-portrait' }, portrait ? h('img', { src: portrait, alt: '윤세진' }) : null),
          h('div', { className: 'rsch-id-body' },
            h('div', { className: 'rsch-id-label' }, L('담당 연구관', 'LEAD RESEARCHER')),
            h('div', { className: 'rsch-id-name' }, L('윤세진', 'YOON SE-JIN')),
            h('div', { className: 'rsch-id-role' }, L('연구원 / 의료관', 'Researcher / Medical')),
            h('div', { className: 'rsch-id-res' },
              chip(L('자원', 'RES'), (stats.r || 0)), chip(L('봉쇄', 'CON'), (stats.c || 0)), chip(L('신뢰', 'TRU'), (stats.t || 0))))),
        visible.length === 0
          ? h('div', { className: 'rsch-empty' }, L('아직 착수 가능한 연구가 없습니다.', 'No research available yet.'))
          : visible.map(projCard),
        h('div', { className: 'rsch-foot' }, L('※ 착수 후 매일 진행됩니다. 결과는 하루 마감 시 판정됩니다.', '※ Progress advances each day. Outcomes resolve at day end.'))
      )
    )
  );
}
