// logic-session-pack-news.js
// Adds localized news reactions for optional session-deck pack logs without touching core news logic.
(function(){
  if (typeof genChoiceReactionNews !== "function") return;
  var baseGenChoiceReactionNews = genChoiceReactionNews;

  function isEn() {
    return typeof getLocale === "function" && getLocale() === "en";
  }

  function line(ko, en) {
    return isEn() ? en : ko;
  }

  function has(logs, id) {
    return Array.isArray(logs) && logs.indexOf(id) >= 0;
  }

  function any(logs, ids) {
    for (var i = 0; i < ids.length; i++) if (has(logs, ids[i])) return true;
    return false;
  }

  genChoiceReactionNews = function(s, g, logs) {
    var out = baseGenChoiceReactionNews(s, g, logs) || [];
    var lg = logs || [];
    var pool = [];

    if (any(lg, ["LOG-MS-ZERO-SEAL", "LOG-MS-ZERO-TRACE"])) {
      pool.push(line(
        "[국내] 방벽 외곽 감시망 일부 구간에서 생체값 0의 미분류 영상 공백 확인 — 공식 분류 보류",
        "[Domestic] Unclassified zero-biosignal blank found in outer barrier surveillance - official classification pending"
      ));
    }
    if (any(lg, ["LOG-MS-GROUP-BARRIER", "LOG-MS-GROUP-SAMPLE"])) {
      pool.push(line(
        "[국내] 기지 북측 능선 이변체 집단 이동 증가 — 현장 대응 기록 비공개 검토",
        "[Domestic] Variant group movement rises along the northern ridge - field response records under restricted review"
      ));
    }
    if (any(lg, ["LOG-MS-WITNESS-HOLD", "LOG-MS-WITNESS-ORACLE"])) {
      pool.push(line(
        "[분류 보류] 방벽 인근 검문소 생존자 기록 일부가 ORACLE 격리 분류와 충돌",
        "[Classification Pending] Checkpoint survivor record conflicts with ORACLE quarantine classification"
      ));
    }
    if (any(lg, ["LOG-GOV-HAEJIN-LOCAL", "LOG-GOV-HAEJIN-ORACLE"])) {
      pool.push(line(
        "[국내] 기지 주변 마을 야간 습격 이후 지방청, 한국지부 감지 기록 확인 요청",
        "[Domestic] Local agency requests Korea Branch detection records after night attack near the base"
      ));
    }
    if (any(lg, ["LOG-GOV-BRIEF-LOCAL", "LOG-GOV-BRIEF-ORACLE"])) {
      pool.push(line(
        "[국내] 방벽 인근 대피소 운영 지침 브리핑 요청 증가 — 지자체, 한국지부 현장 판단 범위 질의",
        "[Domestic] Briefing requests rise for shelter operations near the barrier - local governments question Korea Branch field authority"
      ));
    }
    if (any(lg, ["LOG-GOV-SHELTER-RAW", "LOG-GOV-SHELTER-ORACLE"])) {
      pool.push(line(
        "[국내] 방벽 인근 대피소 CCTV에 미식별 드론 항적 포착 — 지방청, 센서 공백 여부 확인 중",
        "[Domestic] Unidentified drone track found in shelter CCTV near the barrier - local agency reviews sensor-gap reports"
      ));
    }
    if (any(lg, ["LOG-GOV-AUDIT-RAW", "LOG-GOV-AUDIT-ORACLE"])) {
      pool.push(line(
        "[국내] 국방부 합동상황실, 주변 마을 습격 전 외곽 센서 원본 로그 제출 여부 검토",
        "[Domestic] Defense situation room reviews raw outer-sensor logs from before the nearby village attack"
      ));
    }
    if (any(lg, ["LOG-GOV-BRANCH-LOCAL", "LOG-GOV-BRANCH-ORACLE"])) {
      pool.push(line(
        "[국내] 한국지부 운영 권한 범위 질의 증가 — 정부 비상시설과 ORACLE 현장 노드 지위 재검토",
        "[Domestic] Questions rise over Korea Branch authority - emergency-facility status and ORACLE node status under review"
      ));
    }
    if (any(lg, ["LOG-GOV-INSPECT-LIMITED", "LOG-GOV-INSPECT-REMOTE"])) {
      pool.push(line(
        "[국내] 방벽 인근 대피 체계 합동 점검 예고 — 한국지부 기록 대조 여부 주목",
        "[Domestic] Joint inspection announced for barrier-adjacent evacuation systems - attention turns to Korea Branch record comparison"
      ));
    }

    if (pool.length > 0) {
      var pickFn = typeof pick === "function" ? pick : function(arr) { return arr[0]; };
      var item = pickFn(pool);
      if (item && out.indexOf(item) < 0) out = [item].concat(out);
    }
    return typeof uniqueNewsItems === "function" ? uniqueNewsItems(out) : out;
  };
})();
