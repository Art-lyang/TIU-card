// data-cards-korea-civilian.js — Korean civilian life / incident response cards
// Choices unlock lightweight logs that the daily news pass can echo back as outside-world reactions.

var CARDS_KOREA_CIVILIAN = [
  { id:"KC-01", act:[1,2], tag:"kr-civilian", priority:"중", once:true,
    cond:function(s){return s.day>=2},
    msg:"생활안전센터에서 비공식 문의가 들어왔습니다.\n\n방벽 내부 제12생활구 신고앱의 버튼이 회색으로 멈추는 사례가 반복되고 있습니다.\n\n공식 설명은 통신 지연입니다. 하지만 주민들은 회색 버튼이 뜬 뒤 사건 번호가 사라진다고 말합니다.",
    left:{label:"정식 신고로 접수시켜 추적한다",fx:{c:1,r:0,t:-1,o:1},g:1,log:"LOG-KR-CIV-REPORT"},
    right:{label:"지역망에서 조용히 원인을 확인한다",fx:{c:0,r:0,t:1,o:-1},g:-1,log:"LOG-KR-CIV-QUIET"} },

  { id:"KC-02", act:[1,2,3], tag:"kr-gate", priority:"중", once:true,
    cond:function(s){return s.day>=4},
    msg:"환승 검문 허브에서 같은 승객에게 노란불이 세 번 반복되었다는 외부 질의가 들어왔습니다.\n\n현장 보건팀은 재검 필요성을 문의했고, 중앙 분류망은 정상 통과로 처리했습니다.\n\n임재혁: \"게이트 로그가 11초 비어 있습니다. 지부가 검문 기준을 바꿀 권한은 없지만, 이 공백은 기술 의견으로 올릴 수 있습니다.\"",
    left:{label:"기술 의견서로 재검토 요청",fx:{c:1,r:-1,t:0,o:-1},g:-1,log:"LOG-KR-GATE-STRICT"},
    right:{label:"현장 보건팀에 로그만 공유",fx:{c:0,r:0,t:1,o:-1},g:-1,log:"LOG-KR-GATE-REVIEW"} },

  { id:"KC-03", act:[2,3], tag:"kr-hospital", priority:"상", once:true,
    cond:function(s){return s.day>=7},
    msg:"Phase 관찰 병동에서 가족 항의가 들어왔다는 공유 보고가 올라왔습니다.\n\n아이만 Phase 0 수치가 다르고, 부모는 정상입니다. 중앙 분류망은 가족 전체 격리를 권고했고, 병원은 지부에 위험 평가 자료를 요청했습니다.\n\n윤세진: \"우리가 격리 결정을 내릴 수는 없어요. 대신 아이 치료 우선 근거와 가족 분리 위험을 같이 써줄 수 있습니다.\"",
    left:{label:"중앙 분류 근거 자료만 제공",fx:{c:1,r:0,t:-1,o:1},g:1,log:"LOG-KR-HOSPITAL-CENTRAL"},
    right:{label:"의료진 판단 보강 의견 첨부",fx:{c:-1,r:0,t:2,o:-1},g:-2,log:"LOG-KR-HOSPITAL-FAMILY"} },

  { id:"KC-04", act:[2,3], tag:"kr-market", priority:"중", once:true,
    cond:function(s){return s.day>=8},
    msg:"방벽 인접 물류시장에서 검역 도장이 찍힌 식품과 군납 통조림이 암시장으로 흘러가고 있습니다.\n\nDG 협력사는 정식 하청 라인을 제안했고, 지역 상인들은 자체 유통망을 살려달라고 요청합니다.",
    left:{label:"DG 하청 라인으로 정리",fx:{c:0,r:2,t:-1,o:1},g:1,log:"LOG-KR-MARKET-DG"},
    right:{label:"지역 상인망을 조건부 유지",fx:{c:-1,r:1,t:1,o:-1},g:-1,log:"LOG-KR-MARKET-LOCAL"} },

  { id:"KC-05", act:[2,3], tag:"kr-school", priority:"중", once:true,
    cond:function(s){return s.day>=9},
    msg:"방벽 내부 학교에서 학생 한 명이 감지 게이트 재검 후 등교하지 않았다는 문의가 교육청 경로로 공유되었습니다.\n\n등교 여부와 수업 방식은 교육청과 보건당국이 결정합니다. 지부에는 위험 평가와 공개 문구 자문만 요청되었습니다.\n\n서하은: \"문구를 잘못 쓰면 감염 이력자 가족 전체가 낙인찍힙니다. 우리가 정할 건 학교 운영이 아니라, 어떤 정보를 넘길지입니다.\"",
    left:{label:"폐쇄 필요성 자료를 중립 전달",fx:{c:1,r:0,t:-1,o:1},g:1,log:"LOG-KR-SCHOOL-CLOSE"},
    right:{label:"낙인 방지 문구를 함께 제안",fx:{c:-1,r:0,t:1,o:-1},g:-1,log:"LOG-KR-SCHOOL-CONTINUE"} },

  { id:"KC-06", act:[3], tag:"kr-record", priority:"상", once:true,
    cond:function(s){return s.day>=15},
    msg:"기록보존실 B-12에서 오래된 문서 제목만 복원되었습니다.\n\n제목: '민간 피해 없음 — 강원 동부 작전 사후 정리본'\n\n본문은 사라졌지만, 같은 시각 유족 편지 스캔본이 옆 폴더에 남아 있습니다.",
    left:{label:"제목만 보존 — 접근 제한",fx:{c:0,r:0,t:-1,o:1},g:1,log:"LOG-KR-RECORD-PRESERVE"},
    right:{label:"사본 복원 시도",fx:{c:0,r:-1,t:1,o:-1},g:-3,log:"LOG-KR-RECORD-RESTORE"} },

  { id:"KC-07", act:[3,4], tag:"kr-hub", priority:"상", once:true,
    cond:function(s){return s.day>=18},
    msg:"환승 검문 허브 광고 스크린에 비공개 경고문이 4초간 노출되었습니다.\n\n[상위 분류 보류 — 접근 경로 불일치]\n\n시민들은 안내 방송보다 휴대폰 카메라를 먼저 들었습니다.",
    left:{label:"운영기관에 임시 통제 권고",fx:{c:1,r:-1,t:-1,o:0},g:0,log:"LOG-KR-HUB-LOCK"},
    right:{label:"영상 회수와 동선 유지 권고",fx:{c:-1,r:0,t:1,o:-1},g:-1,log:"LOG-KR-HUB-OPEN"} },

  { id:"KC-08", act:[3,4], tag:"kr-registry", priority:"중", once:true,
    cond:function(s){return s.day>=20},
    msg:"감염 이력자 채용 차별 제보가 들어왔습니다.\n\n공개 원장에는 '의료 관찰 종료'로 표시되어 있지만, 기업 심사망에는 비공개 플래그가 남아 있습니다.\n\n서하은: \"기록은 삭제되지 않습니다. 문제는 누가 볼 수 있느냐예요.\"",
    left:{label:"비공개 플래그 접근권 축소",fx:{c:0,r:0,t:1,o:-1},g:-1,log:"LOG-KR-REGISTRY-SEAL"},
    right:{label:"위험 사업장에는 공유 유지",fx:{c:1,r:0,t:-2,o:1},g:1,log:"LOG-KR-REGISTRY-SHARE"} }
];

if (typeof ORACLE_LOGS !== 'undefined') {
  [
    {id:"LOG-KR-CIV-REPORT",title:"회색 신고 버튼 — 정식 접수",content:"생활안전센터 신고앱 회색 버튼 사례를 정식 사건으로 접수했다. 외부 설명은 통신 지연으로 유지되지만, 내부 분류망은 KR-CIV 계열 보류 패턴을 추적하기 시작했다."},
    {id:"LOG-KR-CIV-QUIET",title:"회색 신고 버튼 — 비공식 확인",content:"회색 버튼 사례를 지역망에서 조용히 확인했다. 주민 불안은 낮아졌지만, 공식 사건 번호가 남지 않아 사후 추적 근거가 약해졌다."},
    {id:"LOG-KR-GATE-STRICT",title:"검문 허브 기술 의견서",content:"환승 검문 허브의 11초 공백 로그를 기술 의견서로 보건당국에 전달했다. 지부는 검문 기준을 직접 바꾸지 않았지만, 재검토 요청은 공식 기록에 남았다."},
    {id:"LOG-KR-GATE-REVIEW",title:"검문 허브 로그 공유",content:"중앙 분류망에 개입하지 않고 현장 보건팀에 공백 로그만 공유했다. 시민 불안은 커지지 않았지만, 공백 원인은 아직 남아 있다."},
    {id:"LOG-KR-HOSPITAL-CENTRAL",title:"Phase 관찰 병동 — 중앙 분류 자료",content:"중앙 분류망의 가족 격리 권고 근거 자료만 병원에 제공했다. 지부는 의료 결정을 내리지 않았지만, 병동 밖 가족 항의는 계속되고 있다."},
    {id:"LOG-KR-HOSPITAL-FAMILY",title:"Phase 관찰 병동 — 의료진 의견 보강",content:"의료진이 별도 판단할 수 있도록 아이 치료 우선 근거와 가족 분리 위험 평가를 함께 제공했다. 중앙 분류망은 예외 처리 사유를 요구하고 있다."},
    {id:"LOG-KR-MARKET-DG",title:"방벽 물류시장 — DG 정리",content:"방벽 인접 물류시장을 DG 하청 라인으로 정리했다. 보급은 안정됐지만 지역 상인들은 봉쇄가 기업 장악으로 바뀌었다고 말한다."},
    {id:"LOG-KR-MARKET-LOCAL",title:"방벽 물류시장 — 지역망 유지",content:"지역 상인망을 조건부 유지했다. 민심은 안정됐지만 검역 도장과 군납 물자의 회색 유통을 완전히 끊지는 못했다."},
    {id:"LOG-KR-SCHOOL-CLOSE",title:"교육청 위험 평가 자료",content:"감지 재검 학생 건에 대해 교육청과 보건당국에 위험 평가 자료를 중립 전달했다. 학교 운영 결정은 외부 기관에 남았지만, 학생들 사이에서 노란불 세 번 괴담이 퍼지고 있다."},
    {id:"LOG-KR-SCHOOL-CONTINUE",title:"교육청 공개 문구 자문",content:"위험 평가와 함께 낙인 방지 공개 문구를 제안했다. 학교 운영 결정은 교육청에 남았고, 학부모 단체는 기준 공개를 요구하고 있다."},
    {id:"LOG-KR-RECORD-PRESERVE",title:"B-12 제목 보존",content:"기록보존실 B-12에서 복원된 제목만 봉인했다. 문서 오염 위험은 낮췄지만 강원도 사건의 빈칸은 그대로 남았다."},
    {id:"LOG-KR-RECORD-RESTORE",title:"B-12 사본 복원 시도",content:"강원 동부 작전 사후 정리본의 사본 복원을 시도했다. 접근 로그에 존재하지 않는 부서 코드가 새로 찍혔다."},
    {id:"LOG-KR-HUB-LOCK",title:"환승 허브 임시 통제 권고",content:"비공개 경고문 노출 후 운영기관에 임시 통제 권고안을 전달했다. 현장 결정권은 외부 기관에 남았지만 시민들은 경고문 캡처본을 이미 공유하고 있다."},
    {id:"LOG-KR-HUB-OPEN",title:"환승 허브 동선 유지 권고",content:"허브 운영을 유지하되 노출 영상 회수와 동선 안내 강화를 권고했다. 일상은 보존됐지만 일부 사본은 삭제된 사건번호 수집 커뮤니티로 흘러갔다."},
    {id:"LOG-KR-REGISTRY-SEAL",title:"감염 이력 플래그 접근권 축소",content:"감염 이력 비공개 플래그 접근권을 축소했다. 감염 이력자의 사회 복귀 가능성은 올라갔지만 일부 기관은 위험 정보를 숨긴다고 반발한다."},
    {id:"LOG-KR-REGISTRY-SHARE",title:"감염 이력 플래그 공유 유지",content:"위험 사업장에는 감염 이력 플래그 공유를 유지했다. 안전성은 높아졌지만 채용 차별 제보가 늘고 있다."}
  ].forEach(function(log){ if(!ORACLE_LOGS.some(function(x){return x.id===log.id})) ORACLE_LOGS.push(log); });
}
