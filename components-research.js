// components-research.js — 연구 콘솔 UI (윤세진 변이체/바이러스 연구)
// ResearchPanel: 프로젝트 착수/진행 관리 풀스크린 패널 (시설 패널 스타일 차용)

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

    // 단계 진행 트랙
    var track = h('div', { style: { display: 'flex', gap: 4, margin: '8px 0' } },
      proj.stages.map(function (st, i) {
        var st8 = i < ps.stage || done; // 완료된 단계
        var cur = i === ps.stage && !done; // 현재 단계
        return h('div', {
          key: i,
          style: {
            flex: 1, height: 4, borderRadius: 2,
            background: st8 ? 'var(--ui)' : (cur && ps.active ? 'rgba(var(--ui-rgb),.55)' : 'rgba(var(--ui-rgb),.16)')
          }
        });
      })
    );

    var statusLine;
    if (done) {
      statusLine = h('div', { style: { fontSize: 11, color: 'var(--ui)', letterSpacing: 1 } },
        '✔ ' + L('연구 완료', 'COMPLETE') + (proj.doneFx ? ' · ' + fxStr(proj.doneFx) : ''));
    } else if (ps.active && stage) {
      statusLine = h('div', { style: { fontSize: 11, color: 'rgba(var(--ui-rgb),.85)' } },
        L('진행 중', 'IN PROGRESS') + ' — ' + stageLabel(ps.stage) + ' (D' + ps.prog + '/' + stage.days + ')');
    } else if (stage) {
      var succ = Math.round((1 - stage.risk) * 100);
      var rewardHint = (ps.stage >= proj.stages.length - 1)
        ? (L('완료 보상', 'reward') + ': ' + fxStr(proj.doneFx))
        : (L('다음 단계로', 'advance to next stage'));
      statusLine = h('div', { style: { fontSize: 11, lineHeight: 1.6, color: 'rgba(var(--ui-rgb),.7)' } },
        h('div', null, L('단계', 'Stage') + ' ' + (ps.stage + 1) + '/' + proj.stages.length + ' — ' + stageLabel(ps.stage)),
        h('div', null, L('비용', 'Cost') + ': ' + costStr(stage.cost) + ' · ' + L('소요', 'Time') + ' ' + stage.days + L('일', 'd')),
        h('div', { style: { color: succ >= 70 ? '#7ec77e' : (succ >= 55 ? '#d6c04a' : '#e08a5a') } },
          L('성공', 'Success') + ' ' + succ + '% · ' + rewardHint),
        h('div', { style: { color: '#e08a5a' } }, L('실패 시', 'On fail') + ': ' + (fxStr(stage.fail) || L('재시도', 'retry')))
      );
    }

    var canStart = !done && !ps.active && stage && researchAffordable(stage, stats);
    var btn = (!done) && h('span', {
      onClick: function () { if (canStart && p.onStart) p.onStart(proj.id); },
      style: {
        display: 'inline-block', marginTop: 8, padding: '6px 16px',
        fontFamily: "'Share Tech Mono',monospace", fontSize: 11, letterSpacing: 1,
        cursor: canStart ? 'pointer' : 'default',
        color: canStart ? 'var(--ui)' : 'rgba(var(--ui-rgb),.3)',
        border: '1px solid ' + (canStart ? 'rgba(var(--ui-rgb),.5)' : 'rgba(var(--ui-rgb),.18)'),
        borderRadius: 3, opacity: ps.active ? 0.4 : 1
      }
    }, ps.active ? L('진행 중…', 'Running…') : (canStart ? L('단계 착수', 'Begin stage') : L('자원 부족', 'Insufficient')));

    return h('div', {
      key: proj.id,
      style: {
        border: '1px solid rgba(var(--ui-rgb),.18)', borderRadius: 6,
        padding: '12px 14px', margin: '0 0 10px', background: 'rgba(var(--ui-rgb),.035)'
      }
    },
      h('div', { style: { fontFamily: "'Share Tech Mono',monospace", fontSize: 13, color: 'var(--ui)', letterSpacing: 0.5 } }, name),
      h('div', { style: { fontSize: 11, color: 'rgba(var(--ui-rgb),.55)', margin: '4px 0 2px', lineHeight: 1.5 } }, desc),
      track,
      statusLine,
      btn
    );
  };

  return h('div', {
    style: {
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(3,7,8,.98)', zIndex: 100, display: 'flex', flexDirection: 'column'
    }
  },
    // 헤더
    h('div', {
      style: {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 14px', borderBottom: '1px solid rgba(var(--ui-rgb),.22)',
        background: 'rgba(var(--ui-rgb),.045)', flexShrink: 0
      }
    },
      h('div', { style: { fontFamily: "'Share Tech Mono',monospace", fontSize: 12, color: 'var(--ui)', letterSpacing: 1 } },
        L('연구 콘솔 // 윤세진', 'RESEARCH CONSOLE // SE-JIN')),
      h('span', {
        onClick: function () { if (p.onClose) p.onClose(); },
        style: { cursor: 'pointer', color: 'rgba(var(--ui-rgb),.7)', fontSize: 18, lineHeight: 1, padding: '0 4px' }
      }, '×')
    ),
    // 자원 표시줄
    h('div', {
      style: {
        padding: '6px 14px', fontFamily: "'Share Tech Mono',monospace", fontSize: 10,
        letterSpacing: 1, color: 'rgba(var(--ui-rgb),.5)', borderBottom: '1px solid rgba(var(--ui-rgb),.1)', flexShrink: 0
      }
    }, L('가용 자원', 'AVAILABLE') + ' — ' + L('자원', 'RES') + ' ' + (stats.r || 0) + ' · ' + L('봉쇄', 'CON') + ' ' + (stats.c || 0) + ' · ' + L('신뢰', 'TRU') + ' ' + (stats.t || 0)),
    // 본문
    h('div', { style: { flex: 1, overflowY: 'auto', padding: '12px 14px' } },
      visible.length === 0
        ? h('div', { style: { color: 'rgba(var(--ui-rgb),.4)', fontSize: 12, textAlign: 'center', marginTop: 40 } },
            L('아직 착수 가능한 연구가 없습니다.', 'No research available yet.'))
        : visible.map(projCard),
      h('div', { style: { fontSize: 10, color: 'rgba(var(--ui-rgb),.35)', marginTop: 6, lineHeight: 1.6 } },
        L('※ 착수 후 매일 진행됩니다. 결과는 하루 마감 시 판정됩니다.', '※ Progress advances each day. Outcomes resolve at day end.'))
    )
  );
}
