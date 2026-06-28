// components-research.js — 연구 콘솔 UI (윤세진 변이체/바이러스 연구)
// ResearchPanel: 프로젝트 착수/진행 관리 풀스크린 패널 (.rsch-* dossier 스타일)

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

    // 단계 진행 게이지
    var track = h('div', { className: 'rsch-track' },
      proj.stages.map(function (st, i) {
        var segDone = i < ps.stage || done;
        var segCur = i === ps.stage && ps.active && !done;
        return h('div', { key: i, className: 'rsch-seg' + (segDone ? ' is-done' : '') + (segCur ? ' is-cur' : '') });
      })
    );

    // 상태 라인
    var statusLine;
    if (done) {
      statusLine = h('div', { className: 'rsch-status is-done' },
        '✔ ' + L('연구 완료', 'COMPLETE') + (proj.doneFx ? ' · ' + fxStr(proj.doneFx) : ''));
    } else if (ps.active && stage) {
      statusLine = h('div', { className: 'rsch-status is-run' },
        L('진행 중', 'IN PROGRESS') + ' — ' + stageLabel(ps.stage) + ' (D' + ps.prog + '/' + stage.days + ')');
    } else if (stage) {
      var succ = Math.round((1 - stage.risk) * 100);
      var succCls = succ >= 70 ? 'rsch-succ--ok' : (succ >= 55 ? 'rsch-succ--warn' : 'rsch-succ--risk');
      var rewardHint = (ps.stage >= proj.stages.length - 1)
        ? (L('완료 보상', 'reward') + ': ' + fxStr(proj.doneFx))
        : (L('다음 단계로', 'advance to next stage'));
      statusLine = h('div', { className: 'rsch-meta' },
        h('div', { className: 'rsch-row' }, L('단계', 'Stage') + ' ' + (ps.stage + 1) + '/' + proj.stages.length + ' — ' + stageLabel(ps.stage)),
        h('div', { className: 'rsch-row' }, L('비용', 'Cost') + ': ' + costStr(stage.cost) + ' · ' + L('소요', 'Time') + ' ' + stage.days + L('일', 'd')),
        h('div', { className: 'rsch-row ' + succCls }, L('성공', 'Success') + ' ' + succ + '% · ' + rewardHint),
        h('div', { className: 'rsch-row rsch-fail' }, L('실패 시', 'On fail') + ': ' + (fxStr(stage.fail) || L('재시도', 'retry')))
      );
    }

    var canStart = !done && !ps.active && stage && researchAffordable(stage, stats);
    var btnCls = 'rsch-btn' + (ps.active ? ' is-running' : (canStart ? '' : ' is-disabled'));
    var btn = (!done) && h('button', {
      type: 'button', className: btnCls,
      onClick: function () { if (canStart && p.onStart) p.onStart(proj.id); }
    }, ps.active ? L('진행 중…', 'Running…') : (canStart ? L('단계 착수', 'Begin stage') : L('자원 부족', 'Insufficient')));

    var tag = done
      ? h('span', { className: 'rsch-tag rsch-tag--done' }, L('완료', 'DONE'))
      : (ps.active ? h('span', { className: 'rsch-tag rsch-tag--run' }, L('진행', 'RUN')) : null);

    return h('div', { key: proj.id, className: 'rsch-card' + (ps.active ? ' is-active' : '') + (done ? ' is-done' : '') },
      h('div', { className: 'rsch-card-glow' }),
      h('div', { className: 'rsch-card-h' },
        h('span', { className: 'rsch-card-name' }, name), tag),
      h('div', { className: 'rsch-card-desc' }, desc),
      track,
      statusLine,
      btn
    );
  };

  var chip = function (label, val) {
    return h('span', { className: 'rsch-chip' }, label + ' ', h('b', null, val));
  };

  return h('div', { className: 'rsch-screen' },
    h('div', { className: 'rsch-head' },
      h('div', { className: 'rsch-head-l' },
        h('span', { className: 'rsch-live-dot' }),
        L('연구 콘솔 // 윤세진', 'RESEARCH CONSOLE // SE-JIN')),
      h('span', { className: 'rsch-close', onClick: function () { if (p.onClose) p.onClose(); } }, '×')
    ),
    h('div', { className: 'rsch-res' },
      chip(L('자원', 'RES'), (stats.r || 0)),
      chip(L('봉쇄', 'CON'), (stats.c || 0)),
      chip(L('신뢰', 'TRU'), (stats.t || 0))
    ),
    h('div', { className: 'rsch-body' },
      visible.length === 0
        ? h('div', { className: 'rsch-empty' }, L('아직 착수 가능한 연구가 없습니다.', 'No research available yet.'))
        : visible.map(projCard),
      h('div', { className: 'rsch-foot' },
        L('※ 착수 후 매일 진행됩니다. 결과는 하루 마감 시 판정됩니다.', '※ Progress advances each day. Outcomes resolve at day end.'))
    )
  );
}
