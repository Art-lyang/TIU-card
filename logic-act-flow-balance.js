// logic-act-flow-balance.js
// Non-invasive wrappers for Act2/Act4 pacing cards. Keeps the core logic file
// stable while letting new logs affect news and faction relation panels.
(function(){
  var has = function(logs, id){ return (logs || []).indexOf(id) >= 0; };
  var pushUnique = function(list, text, recent){
    if (!text || list.indexOf(text) >= 0 || (recent || []).indexOf(text) >= 0) return;
    list.push(text);
  };
  var clampRel = function(v){ return Math.max(0, Math.min(100, v)); };

  var prevNews = (typeof window.genChoiceReactionNews === 'function') ? window.genChoiceReactionNews : null;
  window.genChoiceReactionNews = function(s, g, logs, recent){
    var rn = recent || [];
    var out = prevNews ? (prevNews(s, g, logs, rn) || []).slice() : [];
    var lg = logs || [];
    if (has(lg, 'LOG-A2-FORESHADOW-01')) {
      pushUnique(out, "[분류 보류] 새벽 통신 로그에서 ORACLE 기록 외부 경유 흔적 확인 — 조직명 미부여", rn);
    }
    if (has(lg, 'LOG-A2-FORESHADOW-02')) {
      pushUnique(out, "[내부] 조사테이블, 외부 경유·삭제 기록·현장 이상 패턴을 별도 분류로 보관 시작", rn);
    }
    if (has(lg, 'LOG-A2-TRIAGE-01')) {
      pushUnique(out, "[내부] 운영 후반 단서, 결론 고정 없이 후속 교차검증 목록으로 이관", rn);
    }
    if (has(lg, 'LOG-A4-DG-SUPPORT')) {
      pushUnique(out, "[국내] DG 연계 긴급 민간 보급망 가동 — 방벽 인접 물류 공백 일부 완화", rn);
    }
    if (has(lg, 'LOG-A4-MD-SUPPORT')) {
      pushUnique(out, "[해외] 메리디안 관측망, 한국 방벽 변동값 보정 자료를 비공개 전달", rn);
    }
    if (has(lg, 'LOG-A4-PROM-SUPPORT')) {
      pushUnique(out, "[분류 보류] 프로메테우스 제공 좌표와 ORACLE 누락 구역 일부 일치 — 공식 검증 대기", rn);
    }
    if (has(lg, 'LOG-A4-EVIDENCE-RELIEF')) {
      pushUnique(out, "[내부] 조사테이블 교차 결론으로 최종 배치 순서 재조정 — 자원 손실 완충 기록", rn);
    }
    if (has(lg, 'LOG-A4-STAFF-REVIEW')) {
      pushUnique(out, "[내부] 최종 결산 회의, 자원 압박표와 조사 단서를 함께 반영한 최종 배치안 작성", rn);
    }
    return out;
  };

  var prevRelations = (typeof window.getFactionRelations === 'function') ? window.getFactionRelations : null;
  window.getFactionRelations = function(logs, gi){
    var rows = prevRelations ? (prevRelations(logs, gi) || []).slice() : [];
    var lg = logs || [];
    var touch = function(id, delta, status, hint){
      for (var i = 0; i < rows.length; i++) {
        if (rows[i] && rows[i].id === id) {
          rows[i] = Object.assign({}, rows[i], {
            value: clampRel((rows[i].value || 0) + delta),
            status: status || rows[i].status,
            hint: hint || rows[i].hint
          });
          return;
        }
      }
    };
    if (has(lg, 'LOG-A4-DG-SUPPORT')) {
      touch('dg', 12, '긴급 보급 협조', '보급 완충 / 종속 위험');
    }
    if (has(lg, 'LOG-A4-MD-SUPPORT')) {
      touch('meridian', 12, '관측값 협조', '정보 보정 / 개입 압력');
    }
    if (has(lg, 'LOG-A4-PROM-SUPPORT')) {
      touch('prometheus', 10, '조건부 현장 협조', '진실 공유 / 조작 방지');
    }
    if (has(lg, 'LOG-A4-EVIDENCE-RELIEF')) {
      touch('oracle', -4, '판단 근거 병기', '조사 근거로 독자 판단 여지 확대');
    }
    if (has(lg, 'LOG-A4-STAFF-REVIEW')) {
      touch('oracle', -2, '현장 재배치 검토', '수치 평가보다 현장 증거 우선');
    }
    return rows;
  };
})();
