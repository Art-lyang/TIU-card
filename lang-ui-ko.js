// TERMINAL SESSION — lang-ui-ko.js
window.TS_I18N.mergeUI('ko', {
  meta:{ title:'TERMINAL SESSION', titleBar:'ORACLE // TERMINAL SESSION' },
  boot:{ startSession:'[ 세션 {session} 시작 ]' },
  hub:{
    title:'SCENARIO SELECT',
    progress:'{current} / {total}',
    backToSelect:'← 시나리오 선택으로',
    exploreSwipe:'← 스와이프하여 시나리오 탐색 →',
    enter:'[ 진입 ]',
    continue:'[ 이어서 플레이 ]',
    newGame:'[ 새로 시작 ]',
    start:'[ 시작하기 ]',
    replayTutorial:'[ 튜토리얼 다시 보기 ]',
    scenarioDesc:{
      main:'한국 지부 봉쇄 구역 관리 시나리오',
      dlc_green:'아프리카 소바리 폐허 — EV-Σ 잔류 구역 탐사',
      dlc_north:'러시아 북극권 — 신호 차단 구역 침투'
    }
  },
  stats:{
    title:'ORACLE STATUS — DAY {day}',
    c:'봉쇄', r:'자원', t:'신뢰', o:'평가'
  },
  card:{
    facilityExpansion:'시설 확장',
    oracleComm:'ORACLE 통신',
    priority:'우선순위: {priority}',
    priorityShort:{ high:'상 ■', mid:'중 ■', low:'하' },
    autoOverride:'⚠ AUTO-OVERRIDE',
    systemError:'⚠ SYSTEM ERROR — UNREGISTERED PROTOCOL',
    blockMsgs:[
      '[ORACLE: 명령 거부 감지 — 재확인 요청]',
      '[ORACLE: 순응 프로토콜 활성화 중]',
      '[ORACLE: 경고 — 불이행 기록 중]'
    ],
    none:'—'
  },
  scenario:{
    act:'ACT {act}',
    mission:'MIS {current}/{total}',
    log:'LOG {current}/{total}',
    archive:'ARC',
    archiveNew:'ARC {count} ●',
    facility:'시설 {done}/{total}',
    evidence:'증거 {count}',
    menu:'☰'
  },
  tutorial:{
    header:'ORACLE BRIEFING — {current}/{total}',
    skip:'[ 튜토리얼 건너뛰기 ]',
    steps:[
      {
        lines:['ORACLE 인사 프로토콜을 개시합니다.','','환영합니다, PILEHEAD.','','당신은 ORACLE Proxy Network','한국 지부의 초대 지휘관으로 발령되었습니다.','','[검열됨] 전, 미지의 바이러스 EV-Σ가 출현했습니다.','감염체는 이변체로 변이하며,','전 세계 주요 도시가 봉쇄 중입니다.'],
        choices:[{label:'계속',next:1}]
      },
      {
        lines:['[임무 브리핑]','','ORACLE은 프로메테우스를','적대 세력으로 분류하고 있습니다.','','당신의 임무:','▸ 봉쇄 구역 관리 및 이변체 대응','▸ 기지 운영 총괄','▸ ORACLE 지시 이행 및 외부 위협 감시','','간부진 4명이 당신을 보좌합니다.'],
        choices:[{label:'계속',next:2}]
      },
      {
        lines:['4가지 핵심 지표를 관리합니다.','','{{icon-c}} 봉쇄 — 봉쇄선 유지도','{{icon-r}} 자원 — 식량, 의약품, 장비','{{icon-t}} 신뢰 — 기지 인원의 신뢰도','{{icon-o}} 평가 — ORACLE의 당신에 대한 평가','','어느 지표든 0이 되면 임무에 실패합니다.','','← 왼쪽 / 오른쪽 →','카드를 밀어 선택하십시오.'],
      choices:[{label:'게임 시작',next:-1}]
      }
    ],
    highlights:['PILEHEAD','ORACLE','EV-Σ','이변체','프로메테우스','[검열됨]','봉쇄선','봉쇄','자원','신뢰도','신뢰','평가']
  },
  news:{
    header:'[ORACLE // 일일 보고]',
    dayReport:'DAY {day} REPORT',
    sectionStatus:'[상태 개요]',
    sectionSituation:'[상황 보고]',
    sectionIntel:'[정보 브리핑]',
    sectionFacility:'[시설 현황]',
    nextCycle:'[ 다음 사이클 진행 ]',
    headlineAlert:'[ ORACLE // 운영 상태 경보 ]',
    headlineWarn1:'KR-INIT-001 봉쇄 완전성 임계 도달 예측.',
    headlineWarn2:'한국지부 안정화 100% — 임시 운영 권한 자동 만료 절차 개시.',
    headlineWarn3:'GRANT EXPIRED 절차 준비 중. 선택에 유의하십시오.',
    assess:{
      high1:'운영 효율 양호. 현행 유지 권고.',
      high2:'ORACLE 권고 이행률이 우수. 한국 지부 성과 상위권.',
      high3:'지휘관 판단 신뢰도가 높음. 추가 운영 방침 유효.',
      high4:'기지 안정성 재확인. 추가 권한 부여 검토 중.',
      mid1:'운영 안정. 일부 비표준 징후 감지.',
      mid2:'전반적 안정. 인원들의 판단 빈도 소폭 증가.',
      mid3:'기지 운영 정상 범위. 일부 지표 변동 주시 중.',
      mid4:'ORACLE 권고 이행률이 보통. 관찰 지속.',
      low1:'비표준 판단 빈도 증가. 모니터링 강화.',
      low2:'독자적 의사결정 패턴 감지. 분석 중.',
      low3:'ORACLE 권고 이탈 빈도 축적. 기록 중.',
      low4:'운영 데이터 분석 중 비표준 항목 다수 확인.',
      veryLow1:'비표준 운영 패턴 다수 감지. 주의 요망.',
      veryLow2:'지휘관 신뢰 지수 하락 중. 재평가 예정.',
      veryLow3:'ORACLE 권고 무시 빈도 위험 수치 진입.',
      veryLow4:'운영 이상 감지. 본부 보고 검토 중.'
    }
  },
  reward:{
    c:'봉쇄', r:'자원', t:'신뢰', o:'평가',
    pickCount:'{count}개 중 선택',
    footer:'ORACLE REMOTE TERMINAL — BRANCH KR-INIT-001'
  },
  fieldMission:{
    title:'FIELD MISSION',
    trustTag:'[신뢰]',
    footer:'ORACLE REMOTE TERMINAL — FIELD OPS'
  },
  gameOver:{
    reportSection:'── ORACLE 최종 보고 ──',
    duration:'운영 기간: {days}일',
    stats:'봉쇄: {c} | 자원: {r} | 신뢰: {t} | 평가: {o}',
    restart:'[ 세션 재개시 — ACT 1 ]',
    ngPlus:'[ NEW GAME+ — 강화 시작 ]',
    logs:'기록', archive:'아카이브', endings:'엔딩',
    msgHigh:'요원의 헌신적 복무에 감사드립니다.',
    msgMid:'세션이 종료됩니다. 결과가 기록되었습니다.',
    msgLow:'비표준 운영 패턴 감지. 세션 데이터 분석 중...'
  },
  settings:{
    title:'SETTINGS',
    close:'ESC',
    tabs:{ sound:'SOUND', save:'SAVE', display:'DISPLAY', info:'INFO' },
    sound:'사운드',
    bgm:'배경음악',
    sfx:'효과음',
    fontSize:'글자 크기',
    visualFx:'화면 효과',
    language:'언어',
    langKo:'한국어',
    langEn:'English',
    sizeSmall:'작게', sizeNormal:'보통', sizeLarge:'크게',
    fxFull:'전체', fxReduced:'축소', fxOff:'끔',
    fxWarning:'⚠ 화면 깜박임·흔들림에 민감하시면 [축소] 또는 [끔]을 선택하세요.',
    preview:'미리보기: ORACLE TERMINAL SESSION 텍스트입니다.',
    sessions:'세션 횟수', unlockedLogs:'해금된 LOG', endingsFound:'발견 엔딩',
    snapshotSlots:'SNAPSHOT SLOTS',
    snapshotHelp:'원하는 DAY에 저장했다가 분기 선택 비교 용도로 다시 불러올 수 있습니다.',
    slotEmpty:'빈 슬롯',
    slotSave:'저장', slotLoad:'로드', slotDelete:'삭제',
    resetCurrent:'현재 세션 초기화',
    wipeAll:'전체 데이터 삭제',
    cancel:'취소', confirm:'확인',
    deleteKey:'삭제',
    overwriteHint:'기존 데이터를 덮어씁니다.',
    typeDelete:'"삭제"를 입력하세요',
    resetConfirm:'현재 진행 중인 세션을 초기화합니다.\nLOG와 엔딩 기록은 유지됩니다.',
    wipeConfirm:'모든 데이터를 삭제합니다.\nLOG, 엔딩, 세션 기록이 모두 사라집니다.\n이 작업은 되돌릴 수 없습니다.',
    version:'버전', engine:'엔진',
    logsOpen:'LOG 열람', archiveOpen:'ARCHIVE 열람',
    archive:'아카이브'
  },
  app:{
    facilityAdded:'시설 확장이 보상 풀에 추가되었습니다',
    facilityPending:'확장 제안이 대기 목록에 추가되었습니다',
    facilityRegistered:'시설 확장이 보상 풀에 등록되었습니다',
    facilityComplete:'[{title}] 확장 공사 완료{suffix}',
    facilityDefault:'시설',
    uprisingSuffix:' | GI -2',
    cStabilityAlert:'[ORACLE: KR-INIT-001 봉쇄 완전성 {value}% — 한국지부 안정화 임박]',
    snapshotSaved:'슬롯 {slot} 저장 완료 (DAY {day})',
    snapshotEmpty:'슬롯 {slot} 비어있음',
    snapshotLoaded:'슬롯 {slot} 로드 완료 (DAY {day})',
    achievement:'[ 업적 ] {name}',
    companionsLost:'[이번 작전에 함께하지 못한 동료: {names}]',
    companionsAll:'[간부진 전원 동행 확정]'
  }
});
