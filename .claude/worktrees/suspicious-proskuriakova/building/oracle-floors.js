/* ================================================================
   ORACLE Korea Branch — Floor & Exterior Zone Data
   Depends on: oracle-data.js (typeColors, UI, typeLabels)
   ================================================================ */

var facilityFloors = {
  level1: {
    title: { en:"Level 1 — Entry / Daily Operations", ko:"1층 — 출입 / 일상 운영" },
    subtitle: { en:"Primary function: entry control, daily staff activity, support operations", ko:"주요 기능: 출입 통제, 일상 인원 활동, 지원 운영" },
    classification: "secret",
    rooms: [
      { id:"entry_corridor", name:{ en:"Main Entry Corridor", ko:"주 출입 통로" }, type:"access", desc:{ en:"Primary controlled access corridor from surface entrance. Reinforced doors, security checkpoints, surveillance coverage.", ko:"지상 입구에서 연결되는 주 통제 통로. 강화문, 보안 검문소, 감시 카메라 구역." }, x:40, y:340, w:200, h:60, upgradable:false },
      { id:"security_office", name:{ en:"Security Office", ko:"보안실" }, type:"security", desc:{ en:"Access control and internal security screening. Security desks, monitors, access terminals, equipment lockers.", ko:"출입 통제 및 내부 보안 검색. 보안 데스크, 모니터, 출입 단말기, 장비 보관함." }, x:260, y:300, w:140, h:100, upgradable:true },
      { id:"cctv_control", name:{ en:"CCTV Control Room", ko:"CCTV 통제실" }, type:"security", desc:{ en:"Facility surveillance monitoring center. Multiple wall monitors, camera feeds, operator desks.", ko:"시설 감시 모니터링 센터. 다중 벽면 모니터, 카메라 피드, 운용자 데스크." }, x:260, y:180, w:140, h:100, upgradable:true },
      { id:"supply_depot", name:{ en:"Supply Depot", ko:"보급 창고" }, type:"logistics", desc:{ en:"Storage and logistics support. Crates, shelves, supply pallets, classified containers.", ko:"물자 보관 및 보급 지원. 상자, 선반, 보급 팔레트, 기밀 컨테이너." }, x:420, y:180, w:160, h:100, upgradable:true },
      { id:"briefing_room", name:{ en:"Briefing Room", ko:"브리핑실" }, type:"operations", desc:{ en:"Mission briefing and tactical planning room. Table, chairs, large wall display, tactical screens.", ko:"작전 브리핑 및 전술 계획실. 테이블, 의자, 대형 벽면 디스플레이, 전술 스크린." }, x:420, y:300, w:160, h:100, upgradable:false },
      { id:"research_a", name:{ en:"Research Wing A", ko:"연구동 A" }, type:"research", desc:{ en:"Primary anomaly analysis laboratory. Consoles, benches, sample tables, instruments.", ko:"주 이변체 분석 연구실. 콘솔, 작업대, 샘플 테이블, 계측 장비." }, x:600, y:180, w:180, h:100, upgradable:true },
      { id:"research_b", name:{ en:"Research Wing B", ko:"연구동 B" }, type:"research", desc:{ en:"Secondary research and technical support lab. Data analysis, equipment testing, specialized support.", ko:"보조 연구 및 기술 지원 실험실. 데이터 분석, 장비 테스트, 전문 지원." }, x:600, y:300, w:180, h:100, upgradable:true },
      { id:"medical_bay", name:{ en:"Medical Bay", ko:"의무실" }, type:"medical", desc:{ en:"Emergency treatment and recovery. Beds, med cabinets, monitors, trauma response setup.", ko:"응급 치료 및 회복 구역. 침대, 의약품 캐비닛, 모니터, 외상 대응 설비." }, x:800, y:180, w:160, h:100, upgradable:true },
      { id:"field_ready", name:{ en:"Field Team Ready Room", ko:"현장팀 대기실" }, type:"operations", desc:{ en:"Deployment standby and equipment preparation. Gear racks, benches, tactical lockers, mission prep board.", ko:"출동 대기 및 장비 준비 구역. 장비 거치대, 벤치, 전술 보관함, 임무 준비 보드." }, x:800, y:300, w:160, h:100, upgradable:true },
      { id:"staff_lounge", name:{ en:"Staff Lounge", ko:"휴게실" }, type:"staff", desc:{ en:"Rest and recovery space for personnel. Sofas, tables, vending area, subdued lighting.", ko:"인원 휴식 및 회복 공간. 소파, 테이블, 자판기 구역, 은은한 조명." }, x:980, y:180, w:160, h:100, upgradable:false },
      { id:"gym", name:{ en:"Gym Facility", ko:"체력단련실" }, type:"staff", desc:{ en:"Compact physical training and conditioning area. Basic training equipment, stretching zone.", ko:"소형 체력 훈련 및 컨디셔닝 구역. 기본 훈련 장비, 스트레칭 구역." }, x:980, y:300, w:160, h:100, upgradable:true },
      { id:"secure_elevator", name:{ en:"Secure Elevator", ko:"보안 엘리베이터" }, type:"access", desc:{ en:"Restricted access elevator to lower floors. Heavy secure structure, clearance-based access required.", ko:"하층부 접근용 보안 엘리베이터. 중(重)보안 구조물, 보안등급 기반 접근 필요." }, x:600, y:440, w:100, h:80, upgradable:false },
      { id:"emergency_stairs", name:{ en:"Emergency Stairwell", ko:"비상 계단" }, type:"access", desc:{ en:"Emergency evacuation route. Reinforced structure, separate from main circulation.", ko:"비상 대피 경로. 강화 구조물, 주 동선과 분리." }, x:800, y:440, w:100, h:80, upgradable:false },
      { id:"decon_checkpoint", name:{ en:"Decontamination Checkpoint", ko:"오염 제거 검문소" }, type:"security", desc:{ en:"Personnel decontamination station before entering operational zones.", ko:"작전 구역 진입 전 인원 오염 제거 스테이션." }, x:260, y:440, w:130, h:60, upgradable:false },
      { id:"locker_room", name:{ en:"Locker Room", ko:"탈의실" }, type:"staff", desc:{ en:"Personnel storage and changing area. Individual lockers, changing stalls.", ko:"인원 개인물품 보관 및 탈의 구역. 개인 사물함, 탈의 칸." }, x:420, y:440, w:130, h:60, upgradable:false },
      { id:"comms_room", name:{ en:"Communications Room", ko:"통신실" }, type:"operations", desc:{ en:"Short-range and encrypted communications relay station.", ko:"근거리 및 암호화 통신 중계 스테이션." }, x:980, y:440, w:130, h:60, upgradable:false }
    ],
    corridors: [
      {x:240,y:362,w:20,h:8,dir:"h"},{x:400,y:222,w:20,h:8,dir:"h"},{x:400,y:342,w:20,h:8,dir:"h"},
      {x:580,y:222,w:20,h:8,dir:"h"},{x:580,y:342,w:20,h:8,dir:"h"},{x:780,y:222,w:20,h:8,dir:"h"},
      {x:780,y:342,w:20,h:8,dir:"h"},{x:960,y:222,w:20,h:8,dir:"h"},{x:960,y:342,w:20,h:8,dir:"h"},
      {x:326,y:280,w:8,h:20,dir:"v"},{x:496,y:280,w:8,h:20,dir:"v"},{x:686,y:280,w:8,h:20,dir:"v"},
      {x:876,y:280,w:8,h:20,dir:"v"},{x:1056,y:280,w:8,h:20,dir:"v"},{x:646,y:400,w:8,h:40,dir:"v"},
      {x:846,y:400,w:8,h:40,dir:"v"},{x:326,y:400,w:8,h:40,dir:"v"},{x:496,y:400,w:8,h:40,dir:"v"},
      {x:1040,y:400,w:8,h:40,dir:"v"}
    ]
  },
  b1: {
    title: { en:"B1 — Tactical Control / Observation Layer", ko:"B1 — 전술 통제 / 관측 층" },
    subtitle: { en:"Primary function: central command and operational oversight", ko:"주요 기능: 중앙 지휘 및 작전 감독" },
    classification: "secret",
    rooms: [
      { id:"command_room", name:{ en:"Central Command Room", ko:"중앙 지휘실" }, type:"command", desc:{ en:"Primary command center for all facility operations. Holographic displays, tactical consoles, secure terminals.", ko:"전체 시설 작전의 주 지휘 센터. 홀로그래픽 디스플레이, 전술 콘솔, 보안 단말기." }, x:200, y:200, w:220, h:140 },
      { id:"oracle_chamber", name:{ en:"ORACLE Observation Chamber", ko:"ORACLE 관측실" }, type:"command", desc:{ en:"Direct ORACLE system interface and monitoring station. Restricted access.", ko:"ORACLE 시스템 직접 인터페이스 및 모니터링 스테이션. 접근 제한." }, x:440, y:200, w:180, h:140 },
      { id:"ops_control", name:{ en:"Operations Control Center", ko:"작전 통제 센터" }, type:"operations", desc:{ en:"Real-time tactical oversight and field coordination hub.", ko:"실시간 전술 감독 및 현장 조율 허브." }, x:640, y:200, w:180, h:140 },
      { id:"comms_hub", name:{ en:"Communications Hub", ko:"통신 허브" }, type:"operations", desc:{ en:"Encrypted multi-channel communications array. External and internal relay.", ko:"암호화 다채널 통신 어레이. 외부 및 내부 중계." }, x:840, y:200, w:160, h:140 },
      { id:"server_room", name:{ en:"Encrypted Server Room", ko:"암호화 서버실" }, type:"tech", desc:{ en:"Core data processing and encrypted storage infrastructure.", ko:"핵심 데이터 처리 및 암호화 저장 인프라." }, x:200, y:380, w:180, h:110 },
      { id:"incident_room", name:{ en:"Incident Response Planning", ko:"비상 대응 계획실" }, type:"operations", desc:{ en:"Emergency situation assessment and response coordination room.", ko:"비상 상황 평가 및 대응 조율실." }, x:400, y:380, w:180, h:110 },
      { id:"restricted_hall", name:{ en:"Restricted Access Hall", ko:"제한 통행 홀" }, type:"access", desc:{ en:"Secured transit corridor between sensitive areas. Biometric verification required.", ko:"민감 구역 간 보안 통행 복도. 생체 인증 필요." }, x:600, y:380, w:180, h:110 },
      { id:"data_monitor", name:{ en:"Data Monitoring Station", ko:"데이터 감시 스테이션" }, type:"tech", desc:{ en:"Continuous data stream analysis and anomaly detection terminal.", ko:"연속 데이터 스트림 분석 및 이상 탐지 단말기." }, x:800, y:380, w:180, h:110 }
    ],
    corridors: [
      {x:420,y:264,w:20,h:8,dir:"h"},{x:620,y:264,w:20,h:8,dir:"h"},{x:820,y:264,w:20,h:8,dir:"h"},
      {x:380,y:430,w:20,h:8,dir:"h"},{x:580,y:430,w:20,h:8,dir:"h"},{x:780,y:430,w:20,h:8,dir:"h"},
      {x:306,y:340,w:8,h:40,dir:"v"},{x:526,y:340,w:8,h:40,dir:"v"},{x:726,y:340,w:8,h:40,dir:"v"},{x:916,y:340,w:8,h:40,dir:"v"}
    ]
  },
  b2: {
    title: { en:"B2 — Advanced Research Layer", ko:"B2 — 심층 연구 층" },
    subtitle: { en:"Primary function: deeper anomaly research and technical analysis", ko:"주요 기능: 심층 이변체 연구 및 기술 분석" },
    classification: "secret",
    rooms: [
      { id:"hisec_lab", name:{ en:"High-Security Research Lab", ko:"고보안 연구실" }, type:"research", desc:{ en:"Maximum containment research environment for dangerous anomaly samples.", ko:"위험 이변체 샘플을 위한 최대 격리 연구 환경." }, x:200, y:200, w:200, h:130 },
      { id:"sample_vault", name:{ en:"Sample Storage Vault", ko:"샘플 저장 금고" }, type:"storage", desc:{ en:"Environmentally controlled vault for anomaly samples and specimens.", ko:"이변체 샘플 및 표본을 위한 환경 제어 금고." }, x:420, y:200, w:180, h:130 },
      { id:"cold_storage", name:{ en:"Cold Storage Room", ko:"저온 저장실" }, type:"storage", desc:{ en:"Sub-zero containment for temperature-sensitive biological materials.", ko:"온도 민감 생물학적 물질을 위한 영하 격리 저장." }, x:620, y:200, w:160, h:130 },
      { id:"sterile_proc", name:{ en:"Sterile Processing Room", ko:"무균 처리실" }, type:"research", desc:{ en:"Contamination-free processing and preparation area.", ko:"오염 없는 처리 및 준비 구역." }, x:800, y:200, w:180, h:130 },
      { id:"data_analysis", name:{ en:"Data Analysis Lab", ko:"데이터 분석실" }, type:"tech", desc:{ en:"Advanced computational analysis of anomaly data patterns.", ko:"이변체 데이터 패턴의 고급 연산 분석." }, x:200, y:380, w:180, h:110 },
      { id:"experiment_chamber", name:{ en:"Experiment Chamber", ko:"실험실" }, type:"research", desc:{ en:"Controlled testing environment for anomaly behavior studies.", ko:"이변체 행동 연구를 위한 통제 시험 환경." }, x:400, y:380, w:180, h:110 },
      { id:"materials_archive", name:{ en:"Materials Archive", ko:"자료 보관소" }, type:"storage", desc:{ en:"Indexed storage of research materials and historical samples.", ko:"연구 자료 및 역사적 샘플의 색인 보관." }, x:600, y:380, w:180, h:110 },
      { id:"hazard_waste", name:{ en:"Hazard Waste Disposal", ko:"위험 폐기물 처리실" }, type:"hazard", desc:{ en:"Secure disposal system for contaminated materials and waste.", ko:"오염 물질 및 폐기물을 위한 보안 처리 시스템." }, x:800, y:380, w:180, h:110 }
    ],
    corridors: [
      {x:400,y:260,w:20,h:8,dir:"h"},{x:600,y:260,w:20,h:8,dir:"h"},{x:780,y:260,w:20,h:8,dir:"h"},
      {x:380,y:430,w:20,h:8,dir:"h"},{x:580,y:430,w:20,h:8,dir:"h"},{x:780,y:430,w:20,h:8,dir:"h"},
      {x:296,y:330,w:8,h:50,dir:"v"},{x:506,y:330,w:8,h:50,dir:"v"},{x:706,y:330,w:8,h:50,dir:"v"},{x:896,y:330,w:8,h:50,dir:"v"}
    ]
  },
  b3: {
    title: { en:"B3 — Containment / Isolation Layer", ko:"B3 — 격리 / 봉쇄 층" },
    subtitle: { en:"Primary function: dangerous holding, emergency sealing, sensitive subject control", ko:"주요 기능: 위험 수용, 비상 봉인, 민감 대상 통제" },
    classification: "topsecret",
    rooms: [
      { id:"containment_cells", name:{ en:"Containment Cells", ko:"격리 셀" }, type:"containment", desc:{ en:"Reinforced cells for anomalous entity holding. Multi-layer security barriers.", ko:"이변체 수용을 위한 강화 셀. 다중 보안 장벽." }, x:200, y:200, w:200, h:130 },
      { id:"isolation_rooms", name:{ en:"Reinforced Isolation Rooms", ko:"강화 격리실" }, type:"containment", desc:{ en:"Maximum isolation units for high-risk subjects. Independent life support.", ko:"고위험 대상을 위한 최대 격리 유닛. 독립 생명 유지 장치." }, x:420, y:200, w:200, h:130 },
      { id:"observation_booths", name:{ en:"Observation Booths", ko:"관찰 부스" }, type:"security", desc:{ en:"One-way observation stations for monitoring contained subjects.", ko:"격리 대상 모니터링을 위한 단방향 관찰 스테이션." }, x:640, y:200, w:160, h:130 },
      { id:"seal_corridor", name:{ en:"Emergency Seal Corridor", ko:"비상 봉인 복도" }, type:"access", desc:{ en:"Blast-door sealed transit passage. Can isolate sections independently.", ko:"방폭문 봉인 통행 통로. 구역별 독립 격리 가능." }, x:820, y:200, w:160, h:130 },
      { id:"interrogation", name:{ en:"Interrogation Room", ko:"심문실" }, type:"operations", desc:{ en:"Secured interview facility for subject debriefing and intelligence extraction.", ko:"대상 브리핑 해제 및 정보 추출을 위한 보안 면담 시설." }, x:200, y:380, w:180, h:110 },
      { id:"biohazard_lock", name:{ en:"Biohazard Lock Zone", ko:"생물학적 위험 잠금 구역" }, type:"hazard", desc:{ en:"Bio-containment airlock system preventing pathogen escape.", ko:"병원체 탈출 방지 생물학적 격리 에어락 시스템." }, x:400, y:380, w:180, h:110 },
      { id:"crisis_disposal", name:{ en:"Crisis Disposal Chamber", ko:"위기 처분실" }, type:"hazard", desc:{ en:"Emergency incineration and material neutralization facility.", ko:"긴급 소각 및 물질 중화 시설." }, x:600, y:380, w:180, h:110 },
      { id:"restricted_booth", name:{ en:"Restricted Control Booth", ko:"제한 통제 부스" }, type:"command", desc:{ en:"Override control station for containment systems. Commander authorization only.", ko:"격리 시스템 오버라이드 통제 스테이션. 지휘관 인가 전용." }, x:800, y:380, w:180, h:110 }
    ],
    corridors: [
      {x:400,y:260,w:20,h:8,dir:"h"},{x:620,y:260,w:20,h:8,dir:"h"},{x:800,y:260,w:20,h:8,dir:"h"},
      {x:380,y:430,w:20,h:8,dir:"h"},{x:580,y:430,w:20,h:8,dir:"h"},{x:780,y:430,w:20,h:8,dir:"h"},
      {x:296,y:330,w:8,h:50,dir:"v"},{x:516,y:330,w:8,h:50,dir:"v"},{x:716,y:330,w:8,h:50,dir:"v"},{x:896,y:330,w:8,h:50,dir:"v"}
    ]
  },
  restricted: {
    title: { en:"Deep Restricted Layer", ko:"심층 제한 구역" },
    subtitle: { en:null, ko:null },
    classification: "topsecret", masked: true,
    rooms: [
      { id:"oracle_core", name:{ en:"ORACLE Core Chamber", ko:"ORACLE 코어 챔버" }, type:"classified", desc:{ en:"[REDACTED]", ko:"[삭제됨]" }, x:350, y:220, w:240, h:150 },
      { id:"black_archive", name:{ en:"Black Archive", ko:"블랙 아카이브" }, type:"classified", desc:{ en:"[REDACTED]", ko:"[삭제됨]" }, x:620, y:220, w:180, h:150 },
      { id:"unauth_research", name:{ en:"Unauthorized Research Room", ko:"비인가 연구실" }, type:"classified", desc:{ en:"[ACCESS DENIED]", ko:"[접근 거부]" }, x:200, y:410, w:180, h:100 },
      { id:"sealed_transit", name:{ en:"Sealed Transit Passage", ko:"봉인 통행로" }, type:"classified", desc:{ en:"[ACCESS DENIED]", ko:"[접근 거부]" }, x:400, y:410, w:160, h:100 },
      { id:"evac_route", name:{ en:"Hidden Evacuation Route", ko:"은닉 탈출 경로" }, type:"classified", desc:{ en:"[ACCESS DENIED]", ko:"[접근 거부]" }, x:580, y:410, w:160, h:100 },
      { id:"power_core", name:{ en:"Independent Power Core", ko:"독립 전원 코어" }, type:"classified", desc:{ en:"[REDACTED]", ko:"[삭제됨]" }, x:760, y:410, w:160, h:100 },
      { id:"deleted_vault", name:{ en:"Deleted Records Vault", ko:"삭제 기록 금고" }, type:"classified", desc:{ en:"[FILE NOT FOUND]", ko:"[파일을 찾을 수 없음]" }, x:200, y:220, w:130, h:150 },
      { id:"ultra_holding", name:{ en:"Ultra-Restricted Holding", ko:"초극비 수용실" }, type:"classified", desc:{ en:"[REDACTED]", ko:"[삭제됨]" }, x:820, y:220, w:140, h:150 }
    ],
    corridors: []
  },
  /* ============================================================
     EXTERIOR — Blockade Zone / Patrol Area
     ============================================================ */
  exterior: {
    title: { en:"Exterior — Blockade Perimeter / Patrol Zone", ko:"외부 — 봉쇄 경계선 / 순찰 구역" },
    subtitle: { en:"Gangwon Province surface operations area. Patrol lead: Kang Do-yun", ko:"강원도 지상 작전 구역. 순찰 담당: 강도윤" },
    classification: "field",
    isExterior: true,
    baseMarker: { x:540, y:380, w:120, h:50, label:{ en:"BASE ENTRANCE", ko:"기지 입구" } },
    zones: [
      { id:"north_perimeter", name:{ en:"North Perimeter Line", ko:"북측 경계선" }, type:"perimeter", desc:{ en:"Primary blockade line facing mountain ridge. Sensor posts every 200m. High anomaly activity zone.", ko:"산악 능선 방면 주 봉쇄선. 200m 간격 센서 초소. 이변체 활동 빈번 구역." }, x:350, y:60, w:280, h:70 },
      { id:"east_ridge", name:{ en:"East Ridge Observation", ko:"동측 능선 관측소" }, type:"surveillance", desc:{ en:"Elevated observation post with long-range surveillance equipment. Overlooks valley approach.", ko:"장거리 감시 장비를 갖춘 고지대 관측초소. 계곡 접근로 감시." }, x:820, y:100, w:200, h:80 },
      { id:"west_forest", name:{ en:"West Forest Buffer Zone", ko:"서측 산림 완충 구역" }, type:"terrain", desc:{ en:"Dense forest area serving as natural concealment. Patrol route passes through marked trails.", ko:"천연 은폐 역할의 밀림 지역. 표시된 산길을 통해 순찰 경로 통과." }, x:60, y:160, w:200, h:100 },
      { id:"south_access", name:{ en:"South Access Road", ko:"남측 접근로" }, type:"checkpoint", desc:{ en:"Concealed vehicle access route from regional road. Checkpoint with identity verification.", ko:"지방도로에서 연결되는 은폐 차량 접근로. 신원 확인 검문소." }, x:400, y:540, w:220, h:70 },
      { id:"north_outpost", name:{ en:"Forward Outpost Alpha", ko:"전방 초소 알파" }, type:"patrol", desc:{ en:"Advance patrol staging point. Emergency supply cache. Kang Do-yun's primary waypoint.", ko:"전진 순찰 거점. 비상 보급 캐시. 강도윤 주요 경유지." }, x:200, y:60, w:130, h:70 },
      { id:"east_checkpoint", name:{ en:"Eastern Checkpoint", ko:"동측 검문소" }, type:"checkpoint", desc:{ en:"Secondary access control point for eastern approach. Motion sensor array.", ko:"동측 접근로 보조 출입 통제 지점. 동작 감지 센서 어레이." }, x:870, y:300, w:160, h:70 },
      { id:"anomaly_zone", name:{ en:"Anomaly Activity Zone", ko:"이변체 활동 구역" }, type:"hazard", desc:{ en:"Sector with recurring anomalous readings. Entry restricted to armed patrol only. Footprints found — non-standard pattern.", ko:"반복적 이상 징후 감지 구역. 무장 순찰만 진입 허가. 발자국 발견 — 비표준 패턴." }, x:640, y:60, w:160, h:90 },
      { id:"supply_cache", name:{ en:"Emergency Supply Cache", ko:"비상 보급 캐시" }, type:"logistics", desc:{ en:"Hidden supply point for extended field operations. Medical kit, rations, ammunition.", ko:"장기 현장 작전용 은닉 보급 지점. 의료 키트, 전투식량, 탄약." }, x:100, y:380, w:160, h:70 },
      { id:"comms_relay", name:{ en:"Relay Tower Site", ko:"중계탑 거점" }, type:"surveillance", desc:{ en:"Encrypted short-range communications relay. Maintains contact between patrols and base.", ko:"암호화 근거리 통신 중계. 순찰조와 기지 간 통신 유지." }, x:870, y:480, w:160, h:70 },
      { id:"blocked_road", name:{ en:"Blocked Mountain Pass", ko:"봉쇄된 산악 통로" }, type:"perimeter", desc:{ en:"Former civilian road, now sealed with barriers. Occasional unauthorized approach attempts.", ko:"구 민간 도로, 현재 장벽 봉쇄. 간헐적 비인가 접근 시도." }, x:60, y:500, w:180, h:60 }
    ],
    // Patrol route: array of [x,y] waypoints — connects with dashed line
    patrolRoutes: {
      defaultRoute: {
        label: { en:"Default Patrol", ko:"기본 순찰" },
        color: "rgba(255,170,50,0.5)",
        nodeColor: "rgba(255,170,50,0.8)",
        points: [[265,95],[410,95],[600,95],[730,105],[730,200],[600,380],[540,405]]
      },
      altRoute: {
        label: { en:"Alternate Route", ko:"대체 경로" },
        color: "rgba(100,200,255,0.35)",
        nodeColor: "rgba(100,200,255,0.7)",
        points: [[265,95],[160,210],[160,415],[300,415],[540,405],[600,380],[950,345],[950,515]]
      }
    }
  }
};
