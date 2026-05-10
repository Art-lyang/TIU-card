// logic-session-pack-news.js
// Adds act-aware session-deck news and ORACLE deletion leaks without changing core news pools.
(function(){
  if (typeof genChoiceReactionNews !== "function") return;
  var baseGenChoiceReactionNews = genChoiceReactionNews;

  function isEn() {
    if (typeof getLocale === "function") return getLocale() === "en";
    return !!(window.TS_I18N && window.TS_I18N.getLocale && window.TS_I18N.getLocale() === "en");
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

  function deriveAct(stats) {
    if (stats && stats.act) return Math.max(1, Math.min(4, Number(stats.act) || 1));
    var day = stats && stats.day ? Number(stats.day) : 1;
    if (day >= 29) return 4;
    if (day >= 14) return 3;
    if (day >= 5) return 2;
    return 1;
  }

  function packActive(packId, logs) {
    if (!packId) return true;
    if (typeof hasSessionDeckPack === "function" && hasSessionDeckPack(packId)) return true;
    if (typeof _sessionDeckLogFallback === "function" && _sessionDeckLogFallback(packId, logs || [])) return true;
    return false;
  }

  function entryOk(entry, act, logs) {
    if (!entry) return false;
    if (entry.minAct && act < entry.minAct) return false;
    if (entry.maxAct && act > entry.maxAct) return false;
    if (entry.pack && !packActive(entry.pack, logs)) return false;
    if (entry.logs && !any(logs, entry.logs)) return false;
    return true;
  }

  function pickEntry(entries, act, logs, current, recent) {
    var pool = [];
    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      if (entryOk(entry, act, logs)) pool.push(line(entry.ko, entry.en));
    }
    if (typeof pickNewsFromPool === "function") return pickNewsFromPool(pool, current || [], recent || []);
    if (pool.length === 0) return null;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  var SESSION_DECK_NEWS = [
    { pack:"DG_MERIDIAN", minAct:2, maxAct:2,
      ko:"[국내] 대가 인더스트리, 방벽 장비와 Phase 0 제제 묶음 입찰 확대 — 심의 과정 비공개",
      en:"[DOMESTIC] Daega Industries expands bundled bids for barrier hardware and Phase 0 compounds - review process remains closed" },
    { pack:"DG_MERIDIAN", minAct:3,
      ko:"[국내] DG·메리디안 보급 라인 경쟁 격화 — 강원지부 관련 심의 문서 열람 제한",
      en:"[DOMESTIC] DG and Meridian supply-line competition intensifies - review documents tied to the Gangwon branch are access-limited" },
    { pack:"DG_MERIDIAN", minAct:3,
      ko:"[해외] 메리디안, 한국 방벽 데이터 접근 심의 재신청 — 정부는 민감 정보 포함 여부 검토",
      en:"[OVERSEAS] Meridian reapplies for Korean barrier-data access review as officials examine sensitive-data exposure" },
    { pack:"DG_MERIDIAN", minAct:4,
      ko:"[분류 보류] DG 감사 자료와 한국지부 운영 로그 대조 요청 증가 — 본부 승인 여부 미확인",
      en:"[CLASSIFICATION HOLD] Requests rise to compare DG audit material against Korea Branch operation logs - HQ approval unconfirmed" },

    { pack:"B3_PREDECESSOR", minAct:2, maxAct:2,
      ko:"[분류 보류] 이전 지휘관 부임 전 3개월 운영 로그 공백 재검토 — 문서 번호 일부 복원",
      en:"[CLASSIFICATION HOLD] Three months of pre-commander operation gaps under review - partial document numbers restored" },
    { pack:"B3_PREDECESSOR", minAct:3,
      ko:"[내부] B3 하부 전력 기록과 이전 지휘관 인수 로그의 시간값 불일치 확인",
      en:"[INTERNAL] Timestamp mismatch confirmed between B3 lower-power records and previous commander handover logs" },
    { pack:"B3_PREDECESSOR", minAct:4,
      ko:"[분류 보류] B3 계층 접근권 기록, 한국지부 임시 권한 부여 절차와 교차 검토 중",
      en:"[CLASSIFICATION HOLD] B3-layer access records are being cross-checked against Korea Branch temporary grant procedures" },

    { pack:"PROMETHEUS_TENSION", minAct:2, maxAct:2,
      ko:"[국내] 강원 산간 통신 장비 회수 건, 민간 군사기업 관련 가능성으로 재분류",
      en:"[DOMESTIC] Recovered Gangwon mountain comms equipment is reclassified for possible private-military links" },
    { pack:"PROMETHEUS_TENSION", minAct:3,
      ko:"[분류 보류] 프로메테우스 좌표와 ORACLE 누락 감시 구역 일부 일치 — 공식 검증 지연",
      en:"[CLASSIFICATION HOLD] Prometheus coordinates partially match ORACLE surveillance gaps - formal verification delayed" },
    { pack:"PROMETHEUS_TENSION", minAct:4,
      ko:"[내부] 프로메테우스 적대 분류 근거 파일, 첨부 원본 없이 요약본만 재전송",
      en:"[INTERNAL] Prometheus hostile-classification basis file resent as a summary without original attachments" },

    { pack:"UPRISING_INFRA", minAct:2, maxAct:2,
      ko:"[내부] 지부 노후 전원설비 보강 계획, ORACLE 표준 목록 외 항목 포함으로 보류",
      en:"[INTERNAL] Branch power-system reinforcement plan held for including items outside the ORACLE standard list" },
    { pack:"UPRISING_INFRA", minAct:3,
      ko:"[국내] 방벽 인근 비상 통신망 점검 확대 — 독립 운용 가능 장비 반입 여부 주목",
      en:"[DOMESTIC] Emergency comms inspections expand near the barrier - attention turns to independently operable hardware" },
    { pack:"UPRISING_INFRA", minAct:4,
      ko:"[분류 보류] 폐쇄회로 시설 점검 기록 일부, 중앙망 외 저장 위치에서 중복 발견",
      en:"[CLASSIFICATION HOLD] Closed-circuit facility inspection records found duplicated outside the central network" },

    { pack:"MUTANT_SURGE", minAct:2, maxAct:2,
      ko:"[국내] 방벽 외곽 생체감지 센서 이상 반응 증가 — Phase 1+ 자동 제거 절차 재점검",
      en:"[DOMESTIC] Outer-barrier biosensor anomalies rise - Phase 1+ automatic removal procedures are being rechecked" },
    { pack:"MUTANT_SURGE", minAct:3,
      ko:"[국내] 기지 북측 능선 이변체 집단 이동 재관측 — 현장 대응 기록 비공개 검토",
      en:"[DOMESTIC] Variant group movement reobserved along the northern ridge - field response records under restricted review" },
    { pack:"MUTANT_SURGE", minAct:4,
      ko:"[경고] 광역 변이 반응 패턴, 기존 SPEC 분류표와 불일치 — 추가 현장 검증 필요",
      en:"[WARNING] Wide-area mutation response pattern conflicts with existing SPEC taxonomy - further field verification required" },

    { pack:"GOV_ORACLE_SUSPICION", minAct:2, maxAct:2,
      ko:"[국내] 지자체, 대피소 브리핑 자료와 ORACLE 권고문 차이 해명 요구",
      en:"[DOMESTIC] Local governments request an explanation for gaps between shelter briefings and ORACLE advisories" },
    { pack:"GOV_ORACLE_SUSPICION", minAct:3,
      ko:"[국내] 국방부 합동상황실, 강원지부 원본 센서 로그 제출 여부 검토",
      en:"[DOMESTIC] Defense joint situation room reviews whether Gangwon Branch raw sensor logs should be submitted" },
    { pack:"GOV_ORACLE_SUSPICION", minAct:4,
      ko:"[분류 보류] 정부 비상시설 권한과 ORACLE 현장 노드 권한 충돌 사례 임시 보관",
      en:"[CLASSIFICATION HOLD] Cases of authority conflict between emergency facilities and ORACLE field nodes are temporarily archived" }
  ];

  var ORACLE_DELETION_NEWS = [
    { pack:"B3_PREDECESSOR", minAct:2,
      ko:"[분류 오류 — 자동 삭제 예정]\n[국내] 이전 지휘관 운영 로그, ORACLE 본부 삭제 대기열에서 제목만 복원\n[삭제됨]",
      en:"[CLASSIFICATION ERROR - SCHEDULED FOR AUTO-DELETION]\n[DOMESTIC] Previous commander operation log restored by title only from an ORACLE HQ deletion queue.\n[DELETED]" },
    { pack:"DG_MERIDIAN", minAct:3,
      ko:"[분류 오류 — 자동 삭제 예정]\n[국내] DG 조달 조건표와 한국지부 보급 지연 기록이 동일 문서 묶음에서 발견\n[삭제됨]",
      en:"[CLASSIFICATION ERROR - SCHEDULED FOR AUTO-DELETION]\n[DOMESTIC] DG procurement terms and Korea Branch supply-delay records found in the same document bundle.\n[DELETED]" },
    { pack:"PROMETHEUS_TENSION", minAct:3,
      ko:"[분류 오류 — 자동 삭제 예정]\n[국내] 프로메테우스 적대 분류 전 내부 검토 메모 일부 복원 — 결론란 공백\n[삭제됨]",
      en:"[CLASSIFICATION ERROR - SCHEDULED FOR AUTO-DELETION]\n[DOMESTIC] Internal pre-classification memo on Prometheus partly restored - conclusion field blank.\n[DELETED]" },
    { pack:"UPRISING_INFRA", minAct:3,
      ko:"[분류 오류 — 자동 삭제 예정]\n[국내] 독립 전원 설계 승인서, ORACLE 표준 시설 목록에 없는 서명 포함\n[삭제됨]",
      en:"[CLASSIFICATION ERROR - SCHEDULED FOR AUTO-DELETION]\n[DOMESTIC] Independent power design approval includes a signature absent from the ORACLE standard facility list.\n[DELETED]" },
    { pack:"MUTANT_SURGE", minAct:2,
      ko:"[분류 오류 — 자동 삭제 예정]\n[국내] 생체값 0의 감시 영상 공백, 자동 오류가 아닌 수동 격리 태그로 확인\n[삭제됨]",
      en:"[CLASSIFICATION ERROR - SCHEDULED FOR AUTO-DELETION]\n[DOMESTIC] Zero-biosignal surveillance blank confirmed as a manual quarantine tag, not an automatic error.\n[DELETED]" },
    { pack:"GOV_ORACLE_SUSPICION", minAct:2,
      ko:"[분류 오류 — 자동 삭제 예정]\n[국내] 지방청 원본 로그 요청서, ORACLE 자동 응답 전 별도 반려 기록 확인\n[삭제됨]",
      en:"[CLASSIFICATION ERROR - SCHEDULED FOR AUTO-DELETION]\n[DOMESTIC] Local agency raw-log request shows a separate rejection record before ORACLE's auto-response.\n[DELETED]" },
    { minAct:3,
      ko:"[분류 오류 — 자동 삭제 예정]\n[국내] 한국지부 일일 보고서 첨부 순서, 제출 직후 본부 서버에서 재정렬된 흔적\n[삭제됨]",
      en:"[CLASSIFICATION ERROR - SCHEDULED FOR AUTO-DELETION]\n[DOMESTIC] Korea Branch daily report attachments show signs of HQ-side reordering immediately after submission.\n[DELETED]" }
  ];

  var LOG_REACTION_NEWS = [
    { logs:["LOG-MS-ZERO-SEAL", "LOG-MS-ZERO-TRACE"],
      ko:"[국내] 방벽 외곽 감시망 일부 구간에서 생체값 0의 미분류 영상 공백 확인 — 공식 분류 보류",
      en:"[DOMESTIC] Unclassified zero-biosignal blank found in outer-barrier surveillance - official classification pending" },
    { logs:["LOG-MS-GROUP-BARRIER", "LOG-MS-GROUP-SAMPLE"],
      ko:"[국내] 기지 북측 능선 이변체 집단 이동 증가 — 현장 대응 기록 비공개 검토",
      en:"[DOMESTIC] Variant group movement rises along the northern ridge - field response records under restricted review" },
    { logs:["LOG-MS-WITNESS-HOLD", "LOG-MS-WITNESS-ORACLE"],
      ko:"[분류 보류] 방벽 인근 검문소 생존자 기록 일부가 ORACLE 격리 분류와 충돌",
      en:"[CLASSIFICATION HOLD] Checkpoint survivor record conflicts with ORACLE quarantine classification" },
    { logs:["LOG-GOV-HAEJIN-LOCAL", "LOG-GOV-HAEJIN-ORACLE"],
      ko:"[국내] 기지 주변 마을 야간 습격 이후 지방청, 한국지부 감지 기록 확인 요청",
      en:"[DOMESTIC] Local agency requests Korea Branch detection records after night attack near the base" },
    { logs:["LOG-GOV-BRIEF-LOCAL", "LOG-GOV-BRIEF-ORACLE"],
      ko:"[국내] 방벽 인근 대피소 운영 지침 브리핑 요청 증가 — 지자체, 한국지부 현장 판단 범위 질의",
      en:"[DOMESTIC] Briefing requests rise for shelter operations near the barrier - local governments question Korea Branch field authority" },
    { logs:["LOG-GOV-SHELTER-RAW", "LOG-GOV-SHELTER-ORACLE"],
      ko:"[국내] 방벽 인근 대피소 CCTV에 미식별 드론 항적 포착 — 지방청, 센서 공백 여부 확인 중",
      en:"[DOMESTIC] Unidentified drone track found in shelter CCTV near the barrier - local agency reviews sensor-gap reports" },
    { logs:["LOG-GOV-AUDIT-RAW", "LOG-GOV-AUDIT-ORACLE"],
      ko:"[국내] 국방부 합동상황실, 주변 마을 습격 전 외곽 센서 원본 로그 제출 여부 검토",
      en:"[DOMESTIC] Defense situation room reviews raw outer-sensor logs from before the nearby village attack" },
    { logs:["LOG-GOV-BRANCH-LOCAL", "LOG-GOV-BRANCH-ORACLE"],
      ko:"[국내] 한국지부 운영 권한 범위 질의 증가 — 정부 비상시설과 ORACLE 현장 노드 지위 재검토",
      en:"[DOMESTIC] Questions rise over Korea Branch authority - emergency-facility status and ORACLE node status under review" },
    { logs:["LOG-GOV-INSPECT-LIMITED", "LOG-GOV-INSPECT-REMOTE"],
      ko:"[국내] 방벽 인근 대피 체계 합동 점검 예고 — 한국지부 기록 대조 여부 주목",
      en:"[DOMESTIC] Joint inspection announced for barrier-adjacent evacuation systems - attention turns to Korea Branch record comparison" }
  ];

  var BASE_REACTION_NEWS_EN = {};
  BASE_REACTION_NEWS_EN["[국내] 생활안전센터 신고량 급증 — '회색 버튼' 관련 민원 정식 접수 전환"] = "[DOMESTIC] Community safety center reports surge as complaints about the 'gray button' move into formal intake";
  BASE_REACTION_NEWS_EN["[국내] 방벽 내부 커뮤니티, 공식 신고 대신 자체 확인망 공유 확산"] = "[DOMESTIC] Communities inside the barrier increasingly share self-check networks instead of filing official reports";
  BASE_REACTION_NEWS_EN["[국내] 환승 검문 허브 11초 공백 로그, 보건당국 기술 검토 대상으로 이관"] = "[DOMESTIC] Eleven-second gap log from transit checkpoint hub transferred to health-authority technical review";
  BASE_REACTION_NEWS_EN["[국내] 현장 보건팀, 중앙 분류망 통과 사례의 공백 로그 확인 요청"] = "[DOMESTIC] Field medical team requests review of gap logs from cases cleared by the central classification grid";
  BASE_REACTION_NEWS_EN["[국내] Phase 관찰 병동 가족 분리 권고 근거 자료 공개 요구 확대"] = "[DOMESTIC] Demands grow to disclose the basis for family-separation guidance in Phase observation wards";
  BASE_REACTION_NEWS_EN["[국내] 일부 병동, 가족 분리 위험 평가를 의료 판단 참고자료로 채택"] = "[DOMESTIC] Some wards adopt family-separation risk assessments as reference material for medical decisions";
  BASE_REACTION_NEWS_EN["[국내] DG 협력 물류망, 방벽 인접 시장 정리 착수 — 보급 안정 기대와 독점 우려 교차"] = "[DOMESTIC] DG-linked logistics network begins reorganizing markets near the barrier, raising both supply hopes and monopoly concerns";
  BASE_REACTION_NEWS_EN["[국내] 방벽 인접 상인회, 검역 조건부 지역 유통망 유지 합의"] = "[DOMESTIC] Merchant associations near the barrier agree to maintain local distribution under quarantine conditions";
  BASE_REACTION_NEWS_EN["[국내] 교육청, 방벽 내부 학교 재검 사례 위험 평가 자료 검토 착수"] = "[DOMESTIC] Education office begins reviewing risk-assessment material for school retest cases inside the barrier";
  BASE_REACTION_NEWS_EN["[국내] 교육청 공개 문구에 감염 이력 낙인 방지 지침 반영 논의"] = "[DOMESTIC] Education office discusses adding anti-stigma guidance for infection history to public notices";
  BASE_REACTION_NEWS_EN["[분류 보류] 강원 동부 작전 관련 문서 제목만 복원 — 본문 접근 제한"] = "[CLASSIFICATION HOLD] Eastern Gangwon operation document titles restored only - body access remains restricted";
  BASE_REACTION_NEWS_EN["[분류 오류 — 자동 삭제 예정]\n[국내] '민간 피해 없음' 문서와 유족 편지 스캔본 동시 발견\n[삭제됨]"] = "[CLASSIFICATION ERROR - SCHEDULED FOR AUTO-DELETION]\n[DOMESTIC] 'No civilian damage' document and scanned bereaved-family letter found together.\n[DELETED]";
  BASE_REACTION_NEWS_EN["[국내] 환승 허브 운영기관, 비공개 경고문 노출 후 임시 통제 권고안 검토"] = "[DOMESTIC] Transit hub operator reviews temporary-control guidance after a nonpublic warning notice is exposed";
  BASE_REACTION_NEWS_EN["[국내] 환승 허브 동선 유지 권고 후 삭제된 사건번호 수집 커뮤니티 활동 증가"] = "[DOMESTIC] Community tracking of deleted case numbers grows after guidance to maintain transit-hub routes";
  BASE_REACTION_NEWS_EN["[국내] 감염 이력 비공개 플래그 접근권 축소 — 복귀 지원 단체 환영"] = "[DOMESTIC] Access to private infection-history flags reduced, welcomed by reintegration support groups";
  BASE_REACTION_NEWS_EN["[국내] 위험 사업장 감염 이력 공유 유지 — 채용 차별 제보 동반 증가"] = "[DOMESTIC] Infection-history sharing remains at high-risk worksites as hiring-discrimination reports rise";
  BASE_REACTION_NEWS_EN["[국내] DG 봉쇄 장비 무상 교체 확대 — 시민단체, 데이터 제공 조건 공개 요구"] = "[DOMESTIC] DG expands free replacement of containment equipment; civic groups demand disclosure of data-sharing terms";
  BASE_REACTION_NEWS_EN["[해외] 메리디안, 한국 봉쇄 데이터 불투명성 지적 — 정부는 '검토 중' 답변"] = "[OVERSEAS] Meridian criticizes opacity in Korean containment data; government says review is ongoing";
  BASE_REACTION_NEWS_EN["[국내] 외국계 바이오자산 진입 심의 장기 보류 — DG 협력사 물량은 정상 통관"] = "[DOMESTIC] Foreign bioasset entry review remains stalled while DG partner shipments clear customs normally";
  BASE_REACTION_NEWS_EN["[해외] 메리디안 계열 보급품 한국 지부 반입 정황 — 외교부, 민간 연구물자라 설명"] = "[OVERSEAS] Signs of Meridian-affiliated supplies entering the Korea Branch; foreign ministry calls them civilian research materials";
  BASE_REACTION_NEWS_EN["[국내] DG 자체 감사 협조 범위 확대 — 강원 지부 운영 자료 일부 열람"] = "[DOMESTIC] DG self-audit cooperation expands to partial review of Gangwon Branch operational material";
  BASE_REACTION_NEWS_EN["[국내] 감사독립위, 방벽 시설 운영 점검 착수 — DG 자체 감사 요구 제동"] = "[DOMESTIC] Independent Audit Committee begins inspecting barrier-facility operations, checking DG self-audit demands";
  BASE_REACTION_NEWS_EN["[국내] 증거 분석 절차 강화 이후 비공개 사건번호 재분류 사례 증가"] = "[DOMESTIC] Nonpublic case-number reclassifications increase after evidence-analysis procedures are strengthened";
  BASE_REACTION_NEWS_EN["[분류 보류] 강원지부 일일 보고서, 본문과 첨부 우선순위가 반복적으로 어긋난다는 내부 점검 기록"] = "[CLASSIFICATION HOLD] Internal check notes repeated priority mismatch between Gangwon Branch daily-report bodies and attachments";
  BASE_REACTION_NEWS_EN["[국내] 방벽 외곽 순찰로 일부 구간, 중앙 감시망 음영지역으로 재분류 — 현장 재측량 예정"] = "[DOMESTIC] Sections of the outer-barrier patrol route reclassified as central-grid blind spots; field resurvey planned";
  BASE_REACTION_NEWS_EN["[국내] Phase 0 의심 케이스 재검토 요청 증가 — 현장 의료진 비공식 기록이 근거로 제시됨"] = "[DOMESTIC] Review requests rise for suspected Phase 0 cases, citing unofficial field-medical records";
  BASE_REACTION_NEWS_EN["[분류 보류] ORACLE 질의 경로 일부에서 지연 패턴 확인 — 공식 장애 보고는 접수되지 않음"] = "[CLASSIFICATION HOLD] Delay pattern confirmed in part of the ORACLE query path - no official outage report filed";
  BASE_REACTION_NEWS_EN["[내부] ORACLE 자동 판단과 현장 판단이 병기된 반대 메모, 감사 대상 문서로 임시 보관"] = "[INTERNAL] Dissent memo comparing ORACLE automatic judgment and field judgment is temporarily held for audit review";
  BASE_REACTION_NEWS_EN["[국내] 강원지부 현장 기록 체계 개편 정황 — 중앙망 외 보조 검증선 존재 가능성"] = "[DOMESTIC] Signs of Gangwon Branch field-record restructuring suggest a secondary verification line outside the central grid";
  BASE_REACTION_NEWS_EN["[국내] ORACLE 절차 도입 지부, 사전 설명회 병행 시 인원 이탈률 감소"] = "[DOMESTIC] Branches adopting ORACLE procedures see lower staff attrition when pre-briefings are provided";
  BASE_REACTION_NEWS_EN["[국내] 봉쇄 자동화 재교육 예산 배정 — 현장 노조는 '최소한의 안전장치'라 평가"] = "[DOMESTIC] Budget allocated for containment-automation retraining; field union calls it a minimum safeguard";
  BASE_REACTION_NEWS_EN["[내부] ORACLE 성과 보고서에 현장 피로도 부록 첨부 — 삭제 없이 본부 라인 통과"] = "[INTERNAL] Field-fatigue appendix attached to ORACLE performance report and passes HQ line without deletion";
  BASE_REACTION_NEWS_EN["[분류 보류] 강원지부 긴급 안정화 패키지 승인 — 본부 보급, 봉쇄 자동 보정, 현장 명령 철회가 동시에 기록됨"] = "[CLASSIFICATION HOLD] Gangwon Branch emergency stabilization package approved - HQ supply, containment auto-correction, and field-order withdrawal logged together";
  BASE_REACTION_NEWS_EN["[내부] 강원지부 수동 비상망 가동 — 비공식 협조 명단과 현장 기록 묶음으로 최소 생존선 재정렬"] = "[INTERNAL] Gangwon Branch manual emergency network activates, rebuilding minimum survival lines from unofficial contacts and field records";
  BASE_REACTION_NEWS_EN["[국내] 중앙 자동화와 현장 설명 절차를 병행한 지부, 봉쇄 효율과 내부 신뢰 동시 개선"] = "[DOMESTIC] Branch using both central automation and field explanation procedures improves containment efficiency and internal trust";
  BASE_REACTION_NEWS_EN["[내부] ORACLE 평가 지표 하락 경보 발령 — 비공식 기록 보존 요청이 내부 채널에서 증가 추세"] = "[INTERNAL] ORACLE evaluation metric decline alert issued; requests to preserve unofficial records rise on internal channels";
  BASE_REACTION_NEWS_EN["[내부] ORACLE 순응 절차가 안정성을 높였지만, 보급·신뢰 완충 계획 없이는 현장 피로가 누적될 수 있음"] = "[INTERNAL] ORACLE compliance procedures improve stability, but field fatigue may accumulate without supply and trust buffers";
  BASE_REACTION_NEWS_EN["[경고] 일일 결산에서 위험 자원 하락 원인이 표시됨 — 다음 DAY 보상과 이브닝 대화에서 보완 선택 권고"] = "[WARNING] Daily settlement now shows causes of critical resource drops - stabilization choices recommended in the next DAY reward and evening chat";
  BASE_REACTION_NEWS_EN["[국내] 방벽 내부 주민 신뢰 지수 하락 — 신고보다 침묵을 택하는 사례 증가"] = "[DOMESTIC] Resident trust index inside the barrier falls as more cases choose silence over reporting";
  BASE_REACTION_NEWS_EN["[국내] 중앙 분류망과 현장 판단 불일치 사례, 비공개 감사 대상으로 전환"] = "[DOMESTIC] Cases where central classification and field judgment diverge move into nonpublic audit review";
  BASE_REACTION_NEWS_EN["[국내] 방벽 주변 검역 도장 식품 가격 상승 — 군납품 암시장 거래 단속"] = "[DOMESTIC] Quarantine-stamped food prices rise near the barrier as black-market military-supply trades are targeted";

  function localizeBaseReactionNews(item) {
    if (!isEn()) return item;
    return BASE_REACTION_NEWS_EN[item] || item;
  }

  function hasDeckSignal(logs) {
    return packActive("DG_MERIDIAN", logs) ||
      packActive("B3_PREDECESSOR", logs) ||
      packActive("PROMETHEUS_TENSION", logs) ||
      packActive("UPRISING_INFRA", logs) ||
      packActive("MUTANT_SURGE", logs) ||
      packActive("GOV_ORACLE_SUSPICION", logs);
  }

  genChoiceReactionNews = function(s, g, logs, recent) {
    var out = baseGenChoiceReactionNews(s, g, logs, recent) || [];
    var lg = logs || [];
    var act = deriveAct(s);
    var current = out.slice();
    var recentItems = recent || [];

    var deckLine = pickEntry(SESSION_DECK_NEWS, act, lg, current, recentItems);
    if (deckLine) {
      out.unshift(deckLine);
      current.push(deckLine);
    }

    if (act >= 3 && Math.random() < 0.35) {
      var secondDeckLine = pickEntry(SESSION_DECK_NEWS, act, lg, current, recentItems);
      if (secondDeckLine) {
        out.unshift(secondDeckLine);
        current.push(secondDeckLine);
      }
    }

    var deckSignal = hasDeckSignal(lg);
    var deletionPressure = act >= 2 && (g <= -10 || Math.random() < (deckSignal ? 0.55 : 0.25));
    if (deletionPressure) {
      var deletedLine = pickEntry(ORACLE_DELETION_NEWS, act, lg, current, recentItems);
      if (deletedLine) {
        out.unshift(deletedLine);
        current.push(deletedLine);
      }
    }

    var reactionLine = pickEntry(LOG_REACTION_NEWS, act, lg, current, recentItems);
    if (reactionLine) out.unshift(reactionLine);

    out = typeof uniqueNewsItems === "function" ? uniqueNewsItems(out) : out;
    if (isEn()) out = out.map(localizeBaseReactionNews);
    return typeof uniqueNewsItems === "function" ? uniqueNewsItems(out) : out;
  };
})();
