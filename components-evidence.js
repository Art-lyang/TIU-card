// components-evidence.js — 증거 테이블 UI 컴포넌트
// 이브닝 챗 하단에 표시, 증거 조합으로 결론 도출

function localizeEvidenceRecord(ev) {
  if (!ev) return ev;
  var loc = (typeof tc === 'function') ? tc('evidence', ev.id, null) : null;
  return loc ? Object.assign({}, ev, loc) : ev;
}

function localizeEvidenceCombo(combo) {
  if (!combo) return combo;
  var loc = (typeof tc === 'function') ? tc('evidenceCombos', combo.id, null) : null;
  return loc ? Object.assign({}, combo, loc) : combo;
}

function evidenceLocale() {
  return (window.TS_I18N && window.TS_I18N.getLocale && window.TS_I18N.getLocale()) || 'ko';
}

function evidenceText(ko, en) {
  return evidenceLocale() === 'en' ? en : ko;
}

// 증거의 근거 원본 LOG를 찾아 현지화(로그 탭과 동일한 oracleLogs 오버레이 재사용)
function getEvidenceSourceLog(ev) {
  if (!ev || !ev.src || typeof ORACLE_LOGS === 'undefined') return null;
  var log = ORACLE_LOGS.filter(function(l){ return l.id === ev.src; })[0];
  if (!log) return null;
  var overlay = (evidenceLocale() === 'en' && typeof tc === 'function') ? tc('oracleLogs', log.id, null) : null;
  return { id: log.id, title: (overlay && overlay.title) || log.title, content: (overlay && overlay.content) || log.content };
}

function evidenceFailText(selected) {
  var locale = evidenceLocale();
  var isEn = locale === 'en';
  var count = (selected || []).length;
  if (count >= 3) {
    return isEn ?
      'The evidence points in different directions. Rebuild the set around one shared source or incident.' :
      '단서의 방향이 갈라졌습니다. 같은 출처나 사건을 중심으로 조합을 다시 묶어보세요.';
  }
  if (count === 2) {
    return isEn ?
      'A pattern is visible, but one more matching record is needed for a firm conclusion.' :
      '패턴은 보이지만 결론으로 고정하기에는 한 축이 부족합니다. 맞물리는 기록을 하나 더 찾아보세요.';
  }
  return isEn ?
    'Select at least two records before attempting cross-analysis.' :
    '교차 분석에는 최소 두 개 이상의 단서가 필요합니다.';
}

function renderEvidenceInsights(unlocked, compact) {
  if (!unlocked || !unlocked.length) return null;
  return h('div', { style: { marginTop: compact ? 10 : 14, paddingTop: compact ? 8 : 10,
    borderTop: '1px solid rgba(var(--ui-rgb),.08)' } },
    h('div', { style: { fontFamily: "'Share Tech Mono',monospace", fontSize: compact ? 9 : 10,
      color: 'rgba(var(--ui-rgb),.42)', letterSpacing: 1, marginBottom: 6 } },
      evidenceText('통찰: ', 'INSIGHTS: ') + unlocked.length + '/' + EVIDENCE_COMBOS.length),
    unlocked.map(function(cid) {
      var c = localizeEvidenceCombo(EVIDENCE_COMBOS.filter(function(x) { return x.id === cid; })[0]);
      if (!c) return null;
      return h('div', { key: cid, style: { marginBottom: compact ? 6 : 8,
        padding: compact ? '0 0 0 8px' : '0 0 0 10px',
        borderLeft: '2px solid rgba(240,160,48,.25)' } },
        h('div', { style: { fontSize: compact ? 9 : 10, color: 'rgba(240,160,48,.72)',
          marginBottom: 2 } }, '\u2713 ' + c.name),
        h('div', { style: { fontSize: compact ? 9 : 10, color: 'rgba(var(--ui-rgb),.46)',
          lineHeight: 1.5 } }, c.result));
    }));
}

// ── 수사 보드 뷰 — 증거를 핀으로 배치하고 조합을 선으로 연결 ──
// 완성된 통찰(unlocked combo) = 앰버 실선, 현재 선택 중 = 점선(--ui).
// 사용(비활성) 증거도 흐리게 남겨 보드의 누적감을 유지한다. 표시 전용 SVG — 판정 로직 불관여.
function evidenceBoardHash(s){var x=0;for(var i=0;i<s.length;i++)x=(x*31+s.charCodeAt(i))>>>0;return x}
function EvidenceBoard(p){
  var items=p.items||[];            // allCollected (활성+사용)
  var activeIds=p.activeIds||[];    // 선택 가능한 활성 증거 id
  var selected=p.selected||[];
  var unlockedCombos=p.unlockedCombos||[];
  var catColor=p.catColor||{};
  if(!items.length)return null;
  var cols=3,rows=Math.max(1,Math.ceil(items.length/cols));
  var H=Math.max(240,rows*92+24);
  // 결정적 배치: 수집 순서 그리드 + id 해시 지터 (같은 세션에선 항상 같은 자리)
  var pos={};
  items.forEach(function(ev,i){
    var col=i%cols,row=Math.floor(i/cols);
    var jx=(evidenceBoardHash(ev.id)%11)-5, jy=(evidenceBoardHash(ev.id+'y')%9)-4;
    var x=Math.max(10,Math.min(90,col*33.3+16.7+jx));
    var y=Math.max(7,Math.min(93,((row+0.5)/rows)*100+jy));
    pos[ev.id]={x:x,y:y};
  });
  var linePairs=function(ids){var out=[];for(var i=0;i<ids.length;i++)for(var j=i+1;j<ids.length;j++)out.push([ids[i],ids[j]]);return out};
  var comboLines=[];
  (typeof EVIDENCE_COMBOS!=='undefined'?EVIDENCE_COMBOS:[]).forEach(function(c){
    if(unlockedCombos.indexOf(c.id)<0)return;
    linePairs(c.combo||[]).forEach(function(pr){
      if(pos[pr[0]]&&pos[pr[1]])comboLines.push(pr);
    });
  });
  var selLines=linePairs(selected).filter(function(pr){return pos[pr[0]]&&pos[pr[1]]});
  return h('div',{className:'evb-board',style:{height:H}},
    h('svg',{className:'evb-lines',width:'100%',height:'100%','aria-hidden':true},
      comboLines.map(function(pr,i){
        var a=pos[pr[0]],b=pos[pr[1]];
        return h('line',{key:'c'+i,x1:a.x+'%',y1:a.y+'%',x2:b.x+'%',y2:b.y+'%',stroke:'rgba(240,160,48,.5)',strokeWidth:1.5});
      }),
      selLines.map(function(pr,i){
        var a=pos[pr[0]],b=pos[pr[1]];
        return h('line',{key:'s'+i,x1:a.x+'%',y1:a.y+'%',x2:b.x+'%',y2:b.y+'%',stroke:'rgba(var(--ui-rgb),.75)',strokeWidth:1.5,strokeDasharray:'5 4',className:'evb-line-sel'});
      })),
    items.map(function(ev){
      var pt=pos[ev.id];
      var isActive=activeIds.indexOf(ev.id)>=0;
      var isSel=selected.indexOf(ev.id)>=0;
      var cc=catColor[ev.cat]||'var(--ui)';
      return h('div',{key:ev.id,className:'evb-pin'+(isSel?' is-sel':'')+(isActive?'':' is-used'),
          style:{left:pt.x+'%',top:pt.y+'%'},
          onClick:isActive?function(){p.onToggle(ev.id)}:undefined},
        h('span',{className:'evb-dot',style:{background:cc,boxShadow:isSel?'0 0 10px '+cc:'none'}}),
        h('span',{className:'evb-name'},ev.name),
        !isActive&&h('span',{className:'evb-done'},'✓'));
    }),
    h('div',{className:'evb-legend'},
      h('span',null,h('i',{className:'evb-lg evb-lg--combo'}),evidenceText('통찰','INSIGHT')),
      h('span',null,h('i',{className:'evb-lg evb-lg--sel'}),evidenceText('선택 중','SELECTING'))));
}

function EvidenceTable(p) {
  var logs = p.logs || [];
  var allCollected = getCollectedEvidence(logs).map(localizeEvidenceRecord);
  var collected = (typeof getActiveEvidence === 'function' ? getActiveEvidence(logs) : getCollectedEvidence(logs)).map(localizeEvidenceRecord);
  var unlocked = getUnlockedCombos();
  var s1 = useState([]), selected = s1[0], setSelected = s1[1];
  var s2 = useState(null), result = s2[0], setResult = s2[1];
  var s3 = useState(!!p.forceOpen), show = s3[0], setShow = s3[1];
  var s4 = useState((function(){try{return localStorage.getItem('ts_evidenceView')||'board'}catch(e){return 'board'}})()), viewMode = s4[0], setViewMode = s4[1];
  var activeIds = collected.map(function(ev) { return ev.id; }).join('|');

  useEffect(function() {
    setSelected(function(prev) {
      return prev.filter(function(id) { return activeIds.split('|').indexOf(id) >= 0; });
    });
  }, [activeIds]);

  if (!p.unlocked) return null;

  // 선택 상한 = 조합 최대 멤버 수 (CMB-12 '4인 의심 축'이 4멤버 — 고정 3이면 영구 해금 불가)
  var maxSel = 3;
  try { if (typeof EVIDENCE_COMBOS !== 'undefined') maxSel = EVIDENCE_COMBOS.reduce(function(m, c) { return Math.max(m, (c.combo || []).length); }, 3); } catch (e) {}
  var toggle = function(evId) {
    if (result) return;
    setSelected(function(prev) {
      if (prev.indexOf(evId) >= 0) return prev.filter(function(id) { return id !== evId; });
      if (prev.length >= maxSel) return prev;
      return prev.concat([evId]);
    });
  };

  var submit = function() {
    var combo = localizeEvidenceCombo(checkEvidenceCombo(selected));
    if (combo) {
      var wasNew = unlocked.indexOf(combo.id) < 0;
      if (wasNew) {
        saveUnlockedCombo(combo.id);
        if (typeof markEvidenceComboUsed === 'function') markEvidenceComboUsed(combo.id);
        if (combo.reward) {
          if (combo.reward.trust && p.onTrust) {
            for (var ck in combo.reward.trust) p.onTrust(ck, combo.reward.trust[ck]);
          }
          if (combo.reward.g && p.onGi) p.onGi(combo.reward.g);
          if (combo.reward.log && p.onLog) {
            if (Array.isArray(combo.reward.log)) combo.reward.log.forEach(function(id) { p.onLog(id); });
            else p.onLog(combo.reward.log);
          }
        }
      } else if (typeof markEvidenceComboUsed === 'function') {
        markEvidenceComboUsed(combo.id);
      }
      if(typeof SFX!=='undefined')SFX.play('check');
      setResult({ success: true, combo: combo, wasNew: wasNew });
    } else {
      if(typeof SFX!=='undefined')SFX.play('btn_off');
      setResult({ success: false });
    }
  };

  var reset = function() { setSelected([]); setResult(null); };

  var catColor = { oracle: 'rgba(var(--ui-rgb),.9)', field: 'var(--ui)', external: 'rgba(var(--ui-rgb),.78)', incident: '#ff6666', internal: 'rgba(var(--ui-rgb),.58)' };
  var catName = { oracle: 'ORACLE', field: 'FIELD', external: 'EXTERNAL', incident: 'INCIDENT', internal: 'INTERNAL' };

  // 공통 외부 컨테이너 (고정 사이즈)
  var outerStyle = { border: '1px solid rgba(var(--ui-rgb),.16)', background: 'linear-gradient(180deg,rgba(var(--ui-rgb),.045),rgba(3,7,8,.86))',
    borderRadius: 3, padding: '10px 12px' };
  var outerProps = { className: 'evidence-table', style: outerStyle };

  if (collected.length < 2) return h('div', outerProps,
    h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
      h('span', { style: { fontFamily: "'Share Tech Mono',monospace", fontSize: 10,
        color: 'rgba(var(--ui-rgb),.55)', letterSpacing: 2 } },
        evidenceText('조사테이블 대기', 'EVIDENCE TABLE STANDBY')),
      h('span', { style: { fontFamily: "'Share Tech Mono',monospace", fontSize: 10,
        color: 'rgba(240,160,48,.65)', letterSpacing: 1 } },
        collected.length + '/2 · ' + evidenceText('수집 ', 'COL ') + allCollected.length)),
    h('div', { style: { fontSize: 11, color: 'rgba(var(--ui-rgb),.45)',
      lineHeight: 1.5, marginTop: 8 } },
      evidenceText('교차 분석 가능한 새 자료가 부족합니다. 분석 완료 자료는 로그 탭과 통찰 목록에 보존됩니다.',
        'Not enough active records are available for cross-analysis. Analyzed records remain in Logs and the insight list.')),
    renderEvidenceInsights(unlocked, true));

  // 접힌 상태
  if (!show && !p.forceOpen) return h('div', outerProps,
    h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
      h('span', { style: { fontFamily: "'Share Tech Mono',monospace", fontSize: 10,
        color: 'rgba(var(--ui-rgb),.5)', letterSpacing: 2 } },
        evidenceText('조사테이블 (' + collected.length + '/' + allCollected.length + ')',
          'EVIDENCE TABLE (' + collected.length + '/' + allCollected.length + ')')),
      h('div', { onClick: function() { setShow(true) }, style: { cursor: 'pointer',
        padding: '4px 12px', border: '1px solid rgba(var(--ui-rgb),.25)',
        borderRadius: 2, background: 'rgba(var(--ui-rgb),.04)',
        fontFamily: "'Share Tech Mono',monospace", fontSize: 10,
        color: 'var(--ui)', letterSpacing: 1 } }, '\u25BC ' + evidenceText('열기', 'OPEN'))),
    h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8, opacity: 0.4 } },
      collected.slice(0, 4).map(function(ev) {
        return h('div', { key: ev.id, onClick: function() { setShow(true) },
          style: { flex: '0 0 calc(50% - 3px)', padding: '4px 6px', cursor: 'pointer',
            border: '1px solid rgba(var(--ui-rgb),.06)', borderRadius: 2 } },
          h('div', { style: { fontSize: 10, color: 'var(--ui-text)', lineHeight: 1.3 } }, ev.name));
      })),
    collected.length > 4 && h('div', { style: { fontSize: 9, color: 'rgba(var(--ui-rgb),.25)',
      textAlign: 'center', marginTop: 4, fontFamily: "'Share Tech Mono',monospace" } },
      evidenceText('+ ' + (collected.length - 4) + '건 더 있음', '+ ' + (collected.length - 4) + ' more')),
    unlocked.length > 0 && h('div', { style: { fontSize: 9, color: 'rgba(240,160,48,.42)',
      marginTop: 6, fontFamily: "'Share Tech Mono',monospace" } },
      evidenceText('분석 완료 ', 'ANALYZED ') + unlocked.length));

  // 열린 상태: 같은 외부 사이즈, 내부 스크롤
  return h('div', outerProps,
    // 헤더
    h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
      h('span', { style: { fontFamily: "'Share Tech Mono',monospace", fontSize: 10,
        color: 'var(--ui)', letterSpacing: 2 } }, evidenceText('조사테이블 ', 'EVIDENCE TABLE ') + '(' + collected.length + '/' + allCollected.length + ')'),
      h('div', { style: { display: 'flex', gap: 6 } },
        h('div', { onClick: function() { var nm = viewMode === 'board' ? 'list' : 'board'; setViewMode(nm); try { localStorage.setItem('ts_evidenceView', nm) } catch (e) {} }, style: { cursor: 'pointer',
          padding: '4px 10px', border: '1px solid rgba(var(--ui-rgb),.25)',
          borderRadius: 2, background: 'rgba(var(--ui-rgb),.04)',
          fontFamily: "'Share Tech Mono',monospace", fontSize: 10,
          color: 'var(--ui)', letterSpacing: 1 } }, viewMode === 'board' ? evidenceText('목록', 'LIST') : evidenceText('보드', 'BOARD')),
        h('div', { onClick: function() { setShow(false) }, style: { cursor: 'pointer',
        padding: '4px 12px', border: '1px solid rgba(var(--ui-rgb),.25)',
        borderRadius: 2, background: 'rgba(var(--ui-rgb),.04)',
        fontFamily: "'Share Tech Mono',monospace", fontSize: 10,
        color: 'rgba(var(--ui-rgb),.6)', letterSpacing: 1 } }, '\u25B2 ' + evidenceText('닫기', 'CLOSE')))),

    // 스크롤 영역 (증거 카드 + 결과)
    h('div', { style: { maxHeight: 340, overflowY: 'auto', paddingRight: 2 } },
      // 보드 뷰 — 핀 + 연결선 (조합 완성=앰버 실선, 선택 중=점선)
      viewMode==='board' && h(EvidenceBoard, { items: allCollected, activeIds: collected.map(function(e){return e.id}),
        selected: selected, unlockedCombos: unlocked, catColor: catColor, onToggle: toggle }),
      // 증거 카드 그리드 (목록 뷰)
      viewMode!=='board' && h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 } },
        collected.map(function(ev) {
          var isSel = selected.indexOf(ev.id) >= 0;
          var cc = catColor[ev.cat] || 'var(--ui)';
          return h('div', { key: ev.id, onClick: function() { toggle(ev.id) },
            style: { flex: '0 0 calc(50% - 3px)', padding: '6px 8px', cursor: 'pointer',
              border: '1px solid ' + (isSel ? cc : 'rgba(var(--ui-rgb),.1)'),
              background: isSel ? 'rgba(var(--ui-rgb),.06)' : 'transparent',
              borderRadius: 2, transition: 'all 0.15s' } },
            h('div', { style: { display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 } },
              h('span', { style: { width: 6, height: 6, borderRadius: '50%',
                background: isSel ? cc : 'rgba(var(--ui-rgb),.2)', flexShrink: 0 } }),
              h('span', { style: { fontFamily: "'Share Tech Mono',monospace", fontSize: 8,
                color: cc, letterSpacing: 0.5 } }, catName[ev.cat] || '')),
            h('div', { style: { fontSize: 11, color: isSel ? 'var(--ui)' : 'var(--ui-text)',
              lineHeight: 1.4 } }, ev.name),
            h('div', { style: { fontSize: 9, color: 'rgba(var(--ui-rgb),.3)',
              marginTop: 2, lineHeight: 1.3 } }, ev.desc));
        }),
        // 사용(콤보 소진)된 증거 — 보드 뷰와 동일하게 흐리게 누적 표시 (뷰 토글 시 개수 불일치 해소)
        (function() {
          var activeIds = collected.map(function(e) { return e.id; });
          return allCollected.filter(function(e) { return activeIds.indexOf(e.id) < 0; }).map(function(ev) {
            var cc = catColor[ev.cat] || 'var(--ui)';
            return h('div', { key: 'used-' + ev.id,
              style: { flex: '0 0 calc(50% - 3px)', padding: '6px 8px', opacity: 0.4,
                border: '1px dashed rgba(var(--ui-rgb),.12)', borderRadius: 2 } },
              h('div', { style: { display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 } },
                h('span', { style: { width: 6, height: 6, borderRadius: '50%', background: 'rgba(var(--ui-rgb),.2)', flexShrink: 0 } }),
                h('span', { style: { fontFamily: "'Share Tech Mono',monospace", fontSize: 8, color: cc, letterSpacing: 0.5 } }, (catName[ev.cat] || '') + ' ✓')),
              h('div', { style: { fontSize: 11, color: 'var(--ui-text)', lineHeight: 1.4 } }, ev.name));
          });
        })()),

      // 결과 표시
      result && result.success && h('div', { style: { marginTop: 4, padding: '10px 12px',
        borderLeft: '3px solid rgba(var(--ui-rgb),.55)', background: 'rgba(var(--ui-rgb),.045)' } },
        h('div', { style: { fontFamily: "'Share Tech Mono',monospace", fontSize: 9,
          color: 'var(--ui)', letterSpacing: 1, marginBottom: 4 } },
          '\u25B8 ' + result.combo.name),
        h('div', { style: { fontSize: 12, color: 'var(--ui-text)',
          lineHeight: 1.6 } }, result.combo.result),
        result.wasNew &&
          h('div', { style: { fontSize: 9, color: 'var(--ui)', marginTop: 6,
            fontFamily: "'Share Tech Mono',monospace" } }, '+ NEW INSIGHT UNLOCKED'),
        h('div', { style: { fontSize: 9, color: 'rgba(var(--ui-rgb),.42)', marginTop: 6,
          fontFamily: "'Share Tech Mono',monospace" } },
          evidenceText('사용한 자료는 활성 목록에서 정리되고, 원본은 로그 탭에 보존됩니다.',
            'Used records are removed from the active list; source logs remain in Logs.')),
        h('div', { onClick: reset, style: { marginTop: 8, fontSize: 10,
          color: 'rgba(var(--ui-rgb),.4)', cursor: 'pointer',
          fontFamily: "'Share Tech Mono',monospace" } }, '[ RESET ]')),

      result && !result.success && h('div', { style: { marginTop: 4, padding: '8px 12px',
        borderLeft: '3px solid rgba(255,68,68,.4)', background: 'rgba(255,68,68,.03)' } },
        h('div', { style: { fontSize: 11, color: 'rgba(255,100,100,.7)',
          lineHeight: 1.5 } }, evidenceFailText(selected)),
        h('div', { onClick: reset, style: { marginTop: 6, fontSize: 10,
          color: 'rgba(var(--ui-rgb),.4)', cursor: 'pointer',
          fontFamily: "'Share Tech Mono',monospace" } }, '[ RESET ]')),

      // 해금된 조합 목록
      renderEvidenceInsights(unlocked, true)),

    // 선택 상태 + 제출 (스크롤 영역 밖, 하단 고정)
    !result && h('div', { style: { display: 'flex', gap: 8, alignItems: 'center',
      justifyContent: 'space-between', marginTop: 8, paddingTop: 6,
      borderTop: '1px solid rgba(var(--ui-rgb),.08)' } },
      h('span', { style: { fontSize: 10, color: 'rgba(var(--ui-rgb),.4)',
        fontFamily: "'Share Tech Mono',monospace" } },
        evidenceText('선택: ', 'SELECTED: ') + selected.length + '/' + maxSel),
      selected.length >= 2 && h('div', { onClick: submit,
        style: { padding: '6px 14px', cursor: 'pointer',
          border: '1px solid rgba(var(--ui-rgb),.3)', background: 'rgba(var(--ui-rgb),.05)',
          fontFamily: "'Share Tech Mono',monospace", fontSize: 10,
          color: 'var(--ui)', letterSpacing: 1 } }, evidenceText('분석', 'ANALYZE')))
  );
}

// 게임 화면용 증거 패널 오버레이 (열람 전용, 조합 불가) — 이미지 중심 대시보드(.rlab) + 카테고리 그룹
function EvidencePanel(p) {
  var allCollected = getCollectedEvidence(p.logs || []).map(localizeEvidenceRecord);
  var collected = (typeof getActiveEvidence === 'function' ? getActiveEvidence(p.logs || []) : getCollectedEvidence(p.logs || [])).map(localizeEvidenceRecord);
  var unlocked = getUnlockedCombos();
  var EN = evidenceLocale() === 'en'; var L = function(ko, en){ return EN ? en : ko; };
  var catColor = { oracle: 'var(--ui)', field: 'rgba(var(--ui-rgb),.78)', external: 'rgba(var(--ui-rgb),.92)', incident: '#ff6f5a', internal: 'rgba(var(--ui-rgb),.6)' };
  var catName = { oracle: L('ORACLE','ORACLE'), field: L('현장','FIELD'), external: L('외부','EXTERNAL'), incident: L('사건','INCIDENT'), internal: L('내부','INTERNAL') };
  var CAT_ORDER = ['oracle','field','external','incident','internal'];

  var groups = {};
  collected.forEach(function(ev){ var c = ev.cat || 'internal'; (groups[c] = groups[c] || []).push(ev); });
  var availCats = CAT_ORDER.filter(function(c){ return groups[c] && groups[c].length; });

  // 상단 카테고리 필터 — 'all'이면 전체, 아니면 해당 분류만.
  var _ac = useState('all'), activeCat = _ac[0], setActiveCat = _ac[1];
  // 조합 모드 — 이브닝 챗에서 열었을 때(canCombine)만 노출. 조합 UI(EvidenceTable)를 전체 폭으로 표시.
  var _md = useState(p.canCombine ? 'combine' : 'browse'), mode = _md[0], setMode = _md[1];
  var _exp = useState({}), expanded = _exp[0], setExpanded = _exp[1];  // 카드별 상세(근거 원본) 펼침
  var showFilter = collected.length > 0 && availCats.length >= 2;
  // 칩이 숨겨졌거나(분류<2) 활성 분류가 사라지면 전체로 폴백 → 통찰·전체 콘텐츠가 다시 보이고 막다른 상태가 없다.
  var effCat = (activeCat !== 'all' && (!showFilter || availCats.indexOf(activeCat) < 0)) ? 'all' : activeCat;

  var help = useRlabHelp('ts_evidenceHelpSeen', p.devPreview);
  var helpRows = [
    [L('수집','COLLECT'), L('현장·임무·로그에서 확보한 증거가 분류별로 정리됩니다. 상단 ‘수집’ 카운터로 전체 확보량을 봅니다.','Evidence gathered from field ops, missions and logs is sorted by category. The COLLECTED counter shows your total.')],
    [L('분류','FILTER'), L('상단 분류 칩(ORACLE·현장·외부·사건·내부)으로 원하는 계열만 모아 볼 수 있습니다.','Use the category chips (ORACLE/FIELD/EXTERNAL/INCIDENT/INTERNAL) to view one line at a time.')],
    [L('조합','COMBINE'), L('증거 2~3개를 맞물리면 새 통찰이 열립니다. 조합은 이브닝 챗에서 하고, 해금된 통찰은 이 목록 하단에 보존됩니다.','Link 2–3 records to unlock a new insight. Combine during Evening Chat; unlocked insights stay at the bottom of this list.')]
  ];

  var evCard = function(ev){
    var isOpen = !!expanded[ev.id];
    var src = isOpen ? getEvidenceSourceLog(ev) : null;
    return h('div', { key: ev.id, className: 'ev2-card' + (isOpen ? ' is-open' : ''),
        style: { borderLeftColor: catColor[ev.cat] || 'var(--ui)' },
        onClick: function(){ setExpanded(function(m){ var n = Object.assign({}, m); if (n[ev.id]) delete n[ev.id]; else n[ev.id] = true; return n; }); } },
      h('div', { className: 'ev2-cardhead' },
        h('div', { className: 'ev2-name' }, ev.name),
        h('span', { className: 'ev2-caret' }, isOpen ? '\u25be' : '\u25b8')),
      h('div', { className: 'ev2-desc' }, ev.desc),
      isOpen && h('div', { className: 'ev2-detail' },
        src ? h('div', { className: 'ev2-detail-src' }, L('근거 기록', 'SOURCE') + ' \u00b7 ' + src.id) : null,
        src ? h('div', { className: 'ev2-detail-title' }, src.title) : null,
        h('div', { className: 'ev2-detail-body' }, src ? src.content : L('원본 기록을 찾을 수 없습니다.', 'Source record unavailable.'))));
  };

  var EVN = (typeof EVIDENCE !== 'undefined') ? EVIDENCE.length : allCollected.length;
  var EVC = (typeof EVIDENCE_COMBOS !== 'undefined') ? EVIDENCE_COMBOS.length : unlocked.length;

  return h('div', { className: 'rlab-screen' },
    h('div', { className: 'rlab-frame' },
      h('div', { className: 'rlab-hero' },
        h('div', { className: 'rlab-hero-img', style: { backgroundImage: 'url(assets/images/evidence/evidence_hero.jpg)' } }),
        h('div', { className: 'rlab-hero-top' },
          h('div', { className: 'rlab-kicker' }, h('span', { className: 'rlab-live' }), L('조사 테이블','EVIDENCE TABLE')),
          h('div', { className: 'rlab-hero-ctrls' },
            h(RlabHelpButton, { onClick: help.show, title: L('탭 안내','Tab guide') }),
            h('button', { type: 'button', className: 'rlab-close', 'aria-label': L('닫기','Close'), onClick: function(){ if(p.onClose)p.onClose(); } }, '×'))),
        h('div', { className: 'rlab-hero-id' },
          h('div', { className: 'rlab-hero-name' }, L('조사 테이블','Evidence Table')),
          h('div', { className: 'rlab-hero-role' }, L('담당 정보분석관 · ','Intel analyst · '), h('b', null, L('임재혁','Lim Jae-hyeok'))))),
      h('div', { className: 'rlab-res' },
        h('div', { className: 'rlab-res-item' }, h('div', { className: 'rlab-res-k' }, L('활성','ACTIVE')), h('div', { className: 'rlab-res-v' }, collected.length)),
        h('div', { className: 'rlab-res-item' }, h('div', { className: 'rlab-res-k' }, L('수집','COLLECTED')), h('div', { className: 'rlab-res-v' }, allCollected.length + '/' + EVN)),
        h('div', { className: 'rlab-res-item' }, h('div', { className: 'rlab-res-k' }, L('통찰','INSIGHTS')), h('div', { className: 'rlab-res-v' }, unlocked.length + '/' + EVC))),
      p.canCombine && h('div', { className: 'ev2-filter' },
        h('button', { type: 'button', className: 'ev2-chip' + (mode === 'combine' ? ' is-active' : ''), style: { '--chipcol': '#f0a030' }, onClick: function(){ setMode('combine'); } },
          h('span', { className: 'ev2-chip-dot' }), L('증거 조합','COMBINE'), h('span', { className: 'ev2-chip-n' }, unlocked.length + '/' + EVC)),
        h('button', { type: 'button', className: 'ev2-chip' + (mode === 'browse' ? ' is-active' : ''), style: { '--chipcol': 'var(--ui)' }, onClick: function(){ setMode('browse'); } },
          h('span', { className: 'ev2-chip-dot' }), L('열람','BROWSE'), h('span', { className: 'ev2-chip-n' }, allCollected.length))),
      showFilter && mode === 'browse' && h('div', { className: 'ev2-filter' },
        h('button', { type: 'button', className: 'ev2-chip' + (effCat === 'all' ? ' is-active' : ''), style: { '--chipcol': 'var(--ui)' }, onClick: function(){ setActiveCat('all'); } },
          h('span', { className: 'ev2-chip-dot' }), L('전체','ALL'), h('span', { className: 'ev2-chip-n' }, collected.length)),
        availCats.map(function(c){
          return h('button', { key: c, type: 'button', className: 'ev2-chip' + (effCat === c ? ' is-active' : ''), style: { '--chipcol': catColor[c] }, onClick: function(){ setActiveCat(c); } },
            h('span', { className: 'ev2-chip-dot' }), catName[c], h('span', { className: 'ev2-chip-n' }, groups[c].length));
        })),
      (p.canCombine && mode === 'combine')
        ? h('div', { className: 'rlab-body' },
            typeof EvidenceTable === 'function' && h(EvidenceTable, { logs: p.logs, unlocked: true, forceOpen: true, onTrust: p.onTrust, onGi: p.onGi, onLog: p.onLog }),
            h('div', { className: 'rlab-foot' }, L('※ 증거를 연결해 통찰을 해금하십시오. 목록/보드 뷰는 우측 상단에서 전환합니다.','※ Link records to unlock insights. Toggle list/board view at the top right.')))
        : h('div', { className: 'rlab-body' },
        collected.length === 0
          ? h('div', { className: 'rlab-empty' }, allCollected.length === 0
              ? L('수집된 증거가 없습니다.','No evidence records collected.')
              : L('현재 조합 가능한 활성 자료가 없습니다. 분석 완료 정보는 아래 통찰과 로그 탭에 보존됩니다.','No active records available. Completed insights remain below and in Logs.'))
          : CAT_ORDER.filter(function(c){ return groups[c] && groups[c].length && (effCat === 'all' || c === effCat); }).map(function(c){
              return h('div', { key: c, className: 'ev2-group' },
                h('div', { className: 'ev2-cathead', style: { color: catColor[c] } },
                  h('span', { className: 'ev2-catdot', style: { background: catColor[c] } }),
                  catName[c],
                  h('span', { className: 'ev2-catn' }, groups[c].length)),
                groups[c].map(evCard));
            }),
        effCat === 'all' && renderEvidenceInsights(unlocked, false),
        h('div', { className: 'rlab-foot' }, p.canCombine
          ? L('※ 상단 [증거 조합] 탭에서 증거를 연결할 수 있습니다.','※ Use the COMBINE tab above to link records.')
          : L('※ 증거 조합은 이브닝 챗에서 가능합니다.','※ Evidence combination is available during Evening Chat.'))),
      h(RlabHelpOverlay, { open: help.open, onClose: help.close, title: L('조사 테이블 안내','EVIDENCE TABLE'), ok: L('확인','GOT IT'), rows: helpRows })
    )
  );
}
