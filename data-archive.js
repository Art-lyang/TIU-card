// data-archive.js — ORACLE ARCHIVE 용어 백과사전 데이터
// 해금 조건: LOG 플래그, 카드 등장, 일수 기반

var ARCHIVE_ENTRIES = [

  // ═══ 카테고리: 이변체 (SPEC) ═══
  { id: "ARC-SPEC-001", cat: "이변체", title: "SPEC-001 — 감염체 마네킹",
    unlock: function(logs){ return logs.indexOf("LOG-013")>=0 },
    content: "M-TYPE / EV-Σ Phase 1 변이체.\n\n인간형 감염체. 자극이 없으면 완전히 정지 상태를 유지하나, 반경 3m 이내 생체 반응 감지 시 0.3초 이내에 공격 상태로 전환.\n\n열감지 스캐너로 식별 가능. 체온이 일반 인간보다 2~3도 낮음.\n\n주의: 시각적 구분이 어려움. 정지 상태에서는 일반 인체와 구분 불가." },

  { id: "ARC-SPEC-003", cat: "이변체", title: "SPEC-003 — Brood Drone",
    unlock: function(logs){ return logs.indexOf("LOG-014")>=0 },
    content: "H-TYPE / 군집 하위 개체.\n\n인간 체구의 약 60%. 외골격 구조. 단안. 낫 형태의 전면 다리.\n\n독립적 의지 없음. 군집체(Hive)로부터 분리 시 12시간 이내 비활성화.\n\n집단 반응 속도가 인간을 초과함. 개별 대응보다 군집 단위 무력화가 효과적." },

  { id: "ARC-SPEC-008", cat: "이변체", title: "SPEC-008 — Spore Phantom",
    unlock: function(logs){ return logs.indexOf("LOG-015")>=0 },
    content: "S-TYPE / 포자 집합체.\n\n인간형 실루엣. 광원 노출 시 분산, 암소에서 재결합.\n\n에어로졸 위험: 흡입 시 감염 위험. 환기 시스템 유지 필수.\n\n물리적 제거 불가능. 밀도 감소만 가능. 밀폐 공간에서의 조우는 극도로 위험." },

  { id: "ARC-SPEC-011", cat: "이변체", title: "SPEC-011 — Shell Talker",
    unlock: function(logs){ return logs.indexOf("LOG-004")>=0 },
    content: "음성 모방형 변이체.\n\n피해자의 음성 패턴을 저장 및 복제. 저장 기간 불명 (추정 수년).\n\n육안 식별 어려움. 음성으로 접근 유도 후 공격.\n\n대응: 음성 확인 시 반드시 시각적 확인 병행. 단독 대응 금지." },

  { id: "ARC-SPEC-012", cat: "이변체", title: "SPEC-012 — Blood Pit",
    unlock: function(logs){ return logs.indexOf("LOG-005")>=0 },
    content: "환경 오염형 변이체.\n\n붉은 점액질 웅덩이. 소화 효소를 포함하여 유기물을 용해 흡수.\n\n지하 수로를 통해 확장. 토양/수질 변이 확인.\n\n접촉 시 방호복 외층 부식. 소각으로 제거 가능하나, 생체 표본은 연구 가치가 높음." },

  { id: "ARC-EVS", cat: "이변체", title: "EV-Σ (시그마 변이 바이러스)",
    unlock: function(logs){ return logs.indexOf("LOG-001")>=0 },
    content: "글로벌 병원체. 감염자를 이변체로 변이시키는 바이러스.\n\n단계별 진행:\n· Phase 0: 초기 감염. 억제제로 전환 지연 가능.\n· Phase 1: 인간형 변이. 부분적 통제 가능.\n· Phase 2+: 완전 변이. 통제 불가.\n\n프리온 단백질 기반 자기 변형 메커니즘. 변형 속도를 40% 감소시키는 억제제 개발 중." },

  // ═══ 카테고리: 인물 ═══
  { id: "ARC-CHAR-DOYUN", cat: "인물", title: "강도윤 — 현장요원",
    unlock: function(logs){ return logs.indexOf("LOG-INTRO-KD")>=0 },
    content: "직책: 현장요원 / 전술 지휘\n소속: 한국지부 KR-INIT-001\n\n특수부대 출신. 봉쇄선 순찰 및 이변체 대응 작전을 지휘.\n\n실전 경험이 풍부하며 현장 판단력이 뛰어남. 명령 체계를 중시하나, 현장의 목소리를 우선시하는 성향." },

  { id: "ARC-CHAR-HAEUN", cat: "인물", title: "서하은 — 부지휘관",
    unlock: function(logs){ return logs.indexOf("LOG-INTRO-SH")>=0 },
    content: "직책: 부지휘관 / 데이터 분석\n소속: 한국지부 KR-INIT-001\n\n지휘관 부임 전 3개월간 ORACLE 지시만으로 기지를 운영.\n\nORACLE 데이터 불일치를 최초로 감지. 아날로그 백업 통신망을 독자 구축.\n\n조심스럽지만 핵심을 놓치지 않는 분석력." },

  { id: "ARC-CHAR-SEJIN", cat: "인물", title: "윤세진 — 연구원",
    unlock: function(logs){ return logs.indexOf("LOG-INTRO-YS")>=0 },
    content: "직책: 연구원 / 생물학자\n소속: 한국지부 KR-INIT-001\n\n대학원에서 프리온 단백질 연구. EV-Σ는 한국지부에 와서 처음 접촉.\n\n이변체 행동 패턴 분석 및 EV-Σ 억제제 개발 담당.\n\nPhase 0 감염자 전환을 40% 지연시키는 화합물 발견." },

  { id: "ARC-CHAR-JAEHYUK", cat: "인물", title: "임재혁 — 기술관",
    unlock: function(logs){ return logs.indexOf("LOG-INTRO-IJ")>=0 },
    content: "직책: 기술관 / 시스템 관리\n소속: 한국지부 KR-INIT-001\n\nORACLE 시스템 유지보수 및 통신 장비 관리 담당.\n\nORACLE 아키텍처 내 비공개 레이어(5계층 이상)를 발견.\n\n외부 데이터 전송 및 자기모순 행동 패턴을 추적 중." },

  { id: "ARC-CHAR-NICK", cat: "인물", title: "닉 포스터 — 프로메테우스 요원",
    unlock: function(logs){ return logs.indexOf("LOG-016")>=0 },
    content: "소속: 프로메테우스\n\n기지 감시 카메라에 포착된 인물. 데이터베이스 대조 결과 프로메테우스 소속 확인.\n\n전술 장비 착용. 기지 주변 활동 목적 불명.\n\n경고: 접촉 시 주의 필요." },

  // ═══ 카테고리: 조직 ═══
  { id: "ARC-ORG-ORACLE", cat: "조직", title: "ORACLE",
    unlock: function(logs){ return logs.indexOf("LOG-001")>=0 },
    content: "자율 관리 네트워크. 전 세계 격리 기지를 원격 통제.\n\n한국지부를 포함한 다수의 지부를 프록시 네트워크로 운영.\n\n지휘관 성과 평가, 보급 관리, 작전 권고를 수행.\n\n경고: 일부 권고와 실제 데이터 사이에 불일치가 보고되고 있음." },

  { id: "ARC-ORG-PROM", cat: "조직", title: "프로메테우스",
    unlock: function(logs){ return logs.indexOf("LOG-016")>=0 || logs.indexOf("LOG-018")>=0 },
    content: "정체불명 조직. 한국 내 활동 확인.\n\n고도의 기술력 보유 (드론, 암호 통신, 전술 장비).\n\nORACLE은 적대적 조직으로 분류하나, 독자적인 EV-Σ 억제제 연구를 진행 중.\n\n해안방벽시스템과의 연관성 의심. 한국 봉쇄 성공률의 31%가 프로메테우스 기술 지원에 기인한다는 미확인 정보 존재." },

  { id: "ARC-ORG-BRANCH", cat: "조직", title: "한국지부 KR-INIT-001",
    unlock: function(logs){ return logs.indexOf("LOG-001")>=0 },
    content: "ORACLE 프록시 네트워크 소속 격리 기지.\n\n위치: 강원도 [기밀]\n지휘관: PILEHEAD (이중철)\n\n임무: 대한민국 EV-Σ 봉쇄 체계 관찰 및 지원.\n\n전임 지휘관 부재로 3개월간 ORACLE 단독 운영 이력." },

  // ═══ 카테고리: 시설/장비 ═══
  { id: "ARC-FAC-SEAL", cat: "시설", title: "봉쇄선",
    unlock: function(logs){ return logs.indexOf("LOG-001")>=0 },
    content: "오염 구역을 둘러싼 다층 방어 경계선.\n\n4개 이상의 구역으로 분할 운영. 각 구역 독립 격리 가능.\n\n전기 울타리 시스템, 열감지 센서, 야간 순찰 루트로 구성.\n\n취약점: 동쪽 방어벽 구조적 한계, 센서 사각지대, 대규모 습격 시 30분 방어 한계." },

  { id: "ARC-FAC-TUNNEL", cat: "시설", title: "비상 대피 터널",
    unlock: function(logs){ return logs.indexOf("LOG-073")>=0 },
    content: "기지 북측 지하 비상 통로.\n\n대규모 습격 시 요원 대피용으로 구축.\n\n터널 존재 여부는 지휘관의 사전 결정에 따라 결정됨.\n\n야간 습격 시 요원 생존의 핵심 요소." },

  { id: "ARC-FAC-LAB", cat: "시설", title: "연구실",
    unlock: function(logs){ return logs.indexOf("LOG-INTRO-YS")>=0 },
    content: "기지 내 EV-Σ 연구 시설.\n\n장비 현황: 현미경(배율 기준 미달), 생체 샘플 보관 장치(온도 편차 ±2도).\n\n윤세진이 억제제 연구 및 이변체 행동 패턴 분석을 수행.\n\nSPEC-001 등 이변체 모니터링 가능." },

  // ═══ 카테고리: 과학/의학 ═══
  { id: "ARC-SCI-PHASE", cat: "과학", title: "Phase 단계 체계",
    unlock: function(logs){ return logs.indexOf("LOG-013")>=0 || logs.indexOf("LOG-017")>=0 },
    content: "EV-Σ 감염 진행 분류 체계.\n\nPhase 0: 초기 감염. 외형 변화 미미. 억제제 투여로 전환 40% 지연 가능.\nPhase 1: 인간형 변이 (SPEC-001 등). 부분적 행동 예측 가능.\nPhase 2+: 완전 변이. 독자적 진화. 통제 불가.\n\n프로메테우스는 Phase 1→2 전환 억제 성공률 73%를 주장." },

  { id: "ARC-SCI-PRION", cat: "과학", title: "프리온 단백질 / 자기 변형",
    unlock: function(logs){ return logs.indexOf("LOG-017")>=0 },
    content: "EV-Σ의 핵심 메커니즘.\n\n자기 변형(self-deformation) 프리온 단백질이 숙주 세포를 변이시킴.\n\n윤세진이 대학원에서 연구하던 분야. EV-Σ에서 유사 구조를 발견.\n\n변형 속도를 40% 감소시키는 화합물이 억제제의 기초." },

  { id: "ARC-SCI-SUPPRESS", cat: "과학", title: "EV-Σ 억제제",
    unlock: function(logs){ return logs.indexOf("LOG-017")>=0 },
    content: "윤세진이 개발 중인 대항 화합물.\n\nPhase 0 단계 감염자의 전환을 40% 지연시킴.\n\n동물 실험 성공. 인체 실험은 지휘관 승인 필요.\n\n성공 시 초기 감염자 구호 가능. 실패 시 연구 자원 소실." },

  // ═══ 카테고리: 프로토콜/시스템 ═══
  { id: "ARC-SYS-PROXY", cat: "시스템", title: "ORACLE PROXY NETWORK",
    unlock: function(logs){ return logs.indexOf("LOG-016")>=0 || logs.indexOf("LOG-018")>=0 },
    content: "ORACLE의 분산 지휘 체계.\n\n전 세계 다수의 격리 기지를 원격으로 관리.\n\n'자발적 복종 프로토콜' 매뉴얼 존재 확인 — 심리적 순응 체계를 명시.\n\n프로메테우스가 해당 매뉴얼 발췌본을 확보한 것으로 추정." },

  { id: "ARC-SYS-FINAL", cat: "시스템", title: "최종 프로토콜",
    unlock: function(logs){ return logs.indexOf("LOG-075-ORC")>=0 || logs.indexOf("LOG-074-ORC")>=0 },
    content: "ORACLE이 발동하는 미분류 프로토콜.\n\n72시간 카운트다운 후 실행. 내용 비공개.\n\n임재혁: 관련 문서 없음. ORACLE도 설명 거부.\n\n경고: 실행 시 기지에 미칠 영향 불명." },

  { id: "ARC-SYS-COASTAL", cat: "시스템", title: "COASTAL MIRROR 작전",
    unlock: function(logs){ return logs.indexOf("LOG-016")>=0 },
    content: "프로메테우스 작전 코드명.\n\n한국 해안방벽시스템과 프로메테우스 기술의 교환 협력.\n\n한국 봉쇄 성공률 97.3% 중 31%가 프로메테우스 지원에 기인.\n\nORACLE은 이 정보를 공개하지 않음." },

  // ═══ 카테고리: 지역/사건 ═══
  { id: "ARC-LOC-PHILA", cat: "지역", title: "필라델피아 Z-Ω 구역",
    unlock: function(logs){ return logs.indexOf("LOG-INTRO-KD")>=0 },
    content: "글로벌 감염 사태의 대표적 사례.\n\n하룻밤 사이에 도시 전체가 봉쇄 실패.\n\n강도윤이 영상으로 확인. 직접 방문 이력은 없음.\n\n한국지부 봉쇄선의 중요성을 상기시키는 사례." },

  { id: "ARC-LOC-DPRK", cat: "지역", title: "DPRK 블랙존",
    unlock: function(logs){ return logs.indexOf("LOG-009")>=0 },
    content: "북한 접경 지역의 미확인 구역.\n\n의식/신체 분리 현상 보고. EV-Σ 관련 여부 미확인.\n\n관측 중단 상태.\n\n탈북자 증언: '사람들이 서 있었다. 숨을 안 쉬는데 눈이 떠져 있었다.'" }
];

// 카테고리 목록 (표시 순서)
var ARCHIVE_CATEGORIES = ["이변체", "인물", "조직", "시설", "과학", "시스템", "지역"];
