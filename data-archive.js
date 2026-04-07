// data-archive.js — ORACLE ARCHIVE 용어 백과사전 데이터
// 해금 조건: LOG 플래그, 카드 등장, 일수 기반

var ARCHIVE_ENTRIES = [

  // ═══ 카테고리: 이변체 (SPEC) ═══
  { id: "ARC-SPEC-001", cat: "이변체", title: "SPEC-001 — 감염체 마네킹",
    unlock: function(logs){ return logs.indexOf("LOG-013")>=0 },
    content: "M-TYPE / EV-Σ Phase 1 변이체.\n\n인간형 감염체. 자극이 없으면 완전히 정지 상태를 유지하나, 반경 3m 이내 생체 반응 감지 시 0.3초 이내에 공격 상태로 전환.\n\n피부 표면이 플라스틱과 유사한 광택. 동공 완전 확장 고정. 호흡은 감지 불가 수준.\n\n열감지 스캐너로 생체 반응 확인 필수. 시각적 구분이 어려움 — 정지 상태에서는 일반 인체와 구분 불가." },

  { id: "ARC-SPEC-003", cat: "이변체", title: "SPEC-003 — Brood Drone",
    unlock: function(logs){ return logs.indexOf("LOG-014")>=0 },
    content: "H-TYPE / 군집 하위 개체.\n\n인간 체구의 약 60%. 외골격 구조. 단안(單眼). 앞다리가 날카로운 갈고리 형태로 변형.\n\n독립적 의지 없음. 군집체(Hive)로부터 분리 시 12시간 이내 비활성화.\n\n집단 반응 속도가 인간을 초과함. 개별 대응보다 군집 단위 무력화가 효과적." },

  { id: "ARC-SPEC-008", cat: "이변체", title: "SPEC-008 — Spore Phantom",
    unlock: function(logs){ return logs.indexOf("LOG-015")>=0 },
    content: "S-TYPE / 포자 집합체.\n\n인간형 실루엣. 광원 노출 시 분산, 암소에서 재결합.\n\n에어로졸 위험: 흡입 시 감염 위험. 환기 시스템 유지 필수.\n\n물리적 제거 불가능. 밀도 감소만 가능. 밀폐 공간에서의 조우는 극도로 위험." },

  { id: "ARC-SPEC-011", cat: "이변체", title: "SPEC-011 — Shell Talker",
    unlock: function(logs){ return logs.indexOf("LOG-004")>=0 },
    content: "음성 모방형 변이체.\n\n피해자의 음성 패턴을 저장 및 복제. 저장 기간 불명 (추정 수년).\n\n육안 식별 어려움. 음성으로 접근 유도 후 공격.\n\n대응: 음성 확인 시 반드시 시각적 확인 병행. 단독 대응 금지." },

  { id: "ARC-SPEC-012", cat: "이변체", title: "SPEC-012 — Blood Pit",
    unlock: function(logs){ return logs.indexOf("LOG-005")>=0 },
    content: "환경 오염형 변이체.\n\n붉은 점액질 웅덩이. 소화 효소를 포함하여 유기물을 용해 흡수.\n\n지하 수로를 통해 확장. 토양/수질 변이 확인.\n\n접촉 시 방호복 외층 부식. 소각으로 제거 가능하나, 생체 표본은 연구 가치가 높음." },

  { id: "ARC-EVS", cat: "이변체", title: "EV-Σ (진화 가속 매개체)",
    unlock: function(logs){ return logs.indexOf("LOG-001")>=0 },
    content: "생물학적 진화 가속 매개체. 단순 바이러스가 아님.\n\n인간에게는 '감염', TS-Ω에게는 '확장', ORACLE에게는 '상태변화'.\n\n단계별 진행:\n· Phase 0: 초기 감염. 억제제로 전환 지연 가능.\n· Phase 1: 인간형 변이. 부분적 통제 가능.\n· Phase 2+: 완전 변이. 통제 불가.\n\n프리온 단백질 기반 자기 변형 메커니즘. 변형 속도를 40% 감소시키는 억제제 개발 중." },

  { id: "ARC-SPEC-002", cat: "이변체", title: "SPEC-002 — 경질화 개체",
    unlock: function(logs){ return logs.indexOf("LOG-013")>=0 && logs.indexOf("LOG-017")>=0 },
    content: "M-TYPE / EV-Σ Phase 2 변이체.\n\n전신이 회색~갈색 각질층으로 경질화. 체중이 원래의 3~4배로 증가.\n\n통상 화기 무효. 벽과 차량을 관통하는 사례 보고.\n\n이동 속도 저하. 단, 정지 기록 없음 — 느리지만 절대 멈추지 않는다.\n\n대응: 물리 공격 무효. 도주 우선. 고온 소각 또는 산성 용제로만 제거 가능.\n\n참고: Phase 0에서 Phase 1 완료까지 약 6~12시간 소요." },

  { id: "ARC-SPEC-004", cat: "이변체", title: "SPEC-004 — Seed Spreader",
    unlock: function(logs){ return logs.indexOf("LOG-015")>=0 },
    content: "S-TYPE / 고정형 확산 개체.\n\n높이 2~4m. 식물 유사 외형. 내부에 맥동하는 생체 조직.\n\n토양 고착 후 반경 수km에 포자를 광역 방출.\n\n숙주 행동 변형 메커니즘: 동충하초(Cordyceps)와 동일 원리.\n\n제거 시 폭발적 포자 방출(2차 확산) 위험.\n\n반경 500m 내 접근 금지. 소각 시 반드시 토양 오염 처리 병행.\n\n참고: Silent Belt 형성의 주요 원인으로 확인." },

  { id: "ARC-SPEC-005", cat: "이변체", title: "SPEC-005 — Shell Walker",
    unlock: function(logs){ return logs.indexOf("LOG-004")>=0 },
    content: "H-TYPE / TS-Ω 군체 이동형 하위 개체.\n\n거북이를 인간 크기로 확대한 형태. 등껍질에 발광 문양 — 군체 통신 수신부.\n\n단독 행동 불가. 항상 2~5개체가 편대로 이동.\n\n군체 통신 범위 외로 유인하면 기능 저하. 분리 후 24시간 내 기능 정지.\n\nPhiladelphia Zone 해안 외곽에서 주로 관측.\n\n한국지부 직접 조우 기록: 없음. ORACLE 데이터베이스를 통한 열람." },

  { id: "ARC-SPEC-007", cat: "이변체", title: "SPEC-007 — Phase 3 터미널",
    unlock: function(logs){ return logs.indexOf("LOG-017")>=0 && (logs.indexOf("LOG-015")>=0 || logs.indexOf("LOG-014")>=0) },
    content: "M-TYPE / EV-Σ Phase 3 최종 변이체.\n\n원래 종(인간/동물)의 흔적 완전 소실.\n\n세포 특성: HeLa 세포주형 무한 증식. 비가역.\n\n환경에 따라 신체 구조를 실시간 변형. 사격으로 관통된 몸통이 3초 내 재생.\n\n300m 이내 접근 금지. 생포 시도 절대 금지.\n\n한국 봉쇄선 내 출현 기록: 0건. ORACLE 경고 등급: CRITICAL." },

  { id: "ARC-SPEC-009", cat: "이변체", title: "SPEC-009 — TS-Ω Core",
    unlock: function(logs){ return logs.indexOf("LOG-INTRO-KD")>=0 },
    content: "X-TYPE / Sovereign Shell 본체. [접근 제한]\n\n해양 군체 중심 의식. 물리적 크기: ██████.\n\n██████ 음원과의 연관성 ██████.\n\nPhiladelphia Zone과의 관계: ██████.\n\n한국 인지 여부: ██████.\n\n— 강도윤 구두 보고 중 일부 발췌 —\n'필라델피아 영상에서 바다 쪽으로 뭔가 있었습니다. 크기를 가늠할 수 없었습니다.'\n\n추가 데이터: OMEGA CLEARANCE REQUIRED.\n[이 기록은 일부만 공개됩니다]" },

  { id: "ARC-SPEC-010", cat: "이변체", title: "SPEC-010 — Infiltrator Scale",
    unlock: function(logs){ return logs.indexOf("LOG-016")>=0 },
    content: "M-TYPE / 침투형 변이체.\n\n인간 외형 완벽 위장. 사회에 동화된 상태로 활동.\n\n식별: 체온 2~3℃ 저하, 특정 광원하 동공 수직 수축.\n\n서울 외곽에서 White Shield가 식별. 6개월간 민간인으로 생활하며 군사 시설 정보를 수집.\n\n체포 시도 시 전투 형태로 전환 — 비늘 돌출, 근력 3배 상승.\n\n열 감지 및 DNA 검사로만 확인 가능." },

  // ═══ 카테고리: 인물 ═══
  { id: "ARC-CHAR-DOYUN", cat: "인물", title: "강도윤 — 현장요원",
    unlock: function(logs){ return true },
    content: "직책: 현장요원 / 전술 지휘\n소속: 한국지부 KR-INIT-001\n\n특수부대 출신. 봉쇄선 순찰 및 이변체 대응 작전을 지휘.\n\n실전 경험이 풍부하며 현장 판단력이 뛰어남. 명령 체계를 중시하나, 현장의 목소리를 우선시하는 성향." },

  { id: "ARC-CHAR-HAEUN", cat: "인물", title: "서하은 — 부지휘관",
    unlock: function(logs){ return true },
    content: "직책: 부지휘관 / 데이터 분석\n소속: 한국지부 KR-INIT-001\n\n지휘관 부임 전 3개월간 ORACLE 지시만으로 기지를 운영.\n\nORACLE 데이터 불일치를 최초로 감지. 아날로그 백업 통신망을 독자 구축.\n\n조심스럽지만 핵심을 놓치지 않는 분석력." },

  { id: "ARC-CHAR-SEJIN", cat: "인물", title: "윤세진 — 연구원",
    unlock: function(logs){ return true },
    content: "직책: 연구원 / 생물학자\n소속: 한국지부 KR-INIT-001\n\n대학원에서 프리온 단백질 연구. EV-Σ는 한국지부에 와서 처음 접촉.\n\n이변체 행동 패턴 분석 및 EV-Σ 억제제 개발 담당.\n\nPhase 0 감염자 전환을 40% 지연시키는 화합물 발견." },

  { id: "ARC-CHAR-JAEHYUK", cat: "인물", title: "임재혁 — 기술관",
    unlock: function(logs){ return true },
    content: "직책: 기술관 / 시스템 관리\n소속: 한국지부 KR-INIT-001\n\nORACLE 시스템 유지보수 및 통신 장비 관리 담당.\n\nORACLE 아키텍처 내 비공개 레이어(5계층 이상)를 발견.\n\n외부 데이터 전송 및 자기모순 행동 패턴을 추적 중." },

  { id: "ARC-CHAR-NICK", cat: "인물", title: "닉 포스터 — 프로메테우스 요원",
    unlock: function(logs){ return logs.indexOf("LOG-016")>=0 },
    content: "소속: 프로메테우스\n\n기지 감시 카메라에 포착된 인물. 데이터베이스 대조 결과 프로메테우스 소속 확인.\n\n전술 장비 착용. 기지 주변 활동 목적 불명.\n\n경고: 접촉 시 주의 필요." },

  { id: "ARC-CHAR-WEBER", cat: "인물", title: "마르쿠스 베버 — 프로메테우스 지휘관",
    unlock: function(logs){ return logs.indexOf("LOG-080")>=0 },
    content: "소속: 프로메테우스 한국 작전팀 지휘관\n\n독일어 억양의 영어 사용. 차분하고 논리적인 태도.\n\nORACLE이 한국 봉쇄 데이터를 이용하고 있다고 주장.\n봉쇄 성공률 '미분류 외부 요인 31%'가 프로메테우스 기술 지원이라는 정보를 제공.\n\n서하은 전출 명령이 ORACLE 자동 시스템에 의한 것임을 입증하는 자료를 보유." },

  { id: "ARC-CHAR-SOYOUNG", cat: "인물", title: "박소영 — 분석관",
    unlock: function(logs){ return logs.indexOf("LOG-082")>=0 },
    content: "직책: 데이터 분석관 (서하은 후임)\n\n서하은의 추천으로 합류한 민간 데이터 과학자.\n\nORACLE 데이터 스트림 분석에 빠르게 적응. 서하은의 방법론을 계승.\n\n선별적 데이터 지연 패턴을 독자적으로 확인." },

  { id: "ARC-CHAR-KANG", cat: "인물", title: "에이전트 강 — 미확인 관찰자",
    unlock: function(logs){ return logs.indexOf("LOG-ACT2")>=0 },
    content: "정체: 불명\n\nAct 1부터 기지 주변에서 흔적만 남기는 미확인 인물.\n\n군화도 민간 장비도 아닌 발자국, 초단파 전파 스캔, 서버실 미인식 세션, 전문가 수준의 관찰 거점.\n\nORACLE도 프로메테우스도 아닌 제3의 존재.\n\n경고: [ORACLE은 이 존재를 인식하지 못합니다]" },

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

  { id: "ARC-ORG-WHITESHIELD", cat: "조직", title: "White Shield (한국 군사대응)",
    unlock: function(logs){ return logs.indexOf("LOG-001")>=0 },
    content: "대한민국 군 EV-Σ 대응 체계.\n\n봉쇄 성공률 97.3% — 전 세계 최고.\n\n5개국 군사대응 중 유일하게 95% 이상 유지.\n\n비교: ARES(미국) 62%, Red Dragon(중국) 41%, Permafrost(러시아) 38%.\n\nORACLE 평가: 'This region should have failed. Outcome does not match model.'\n\n성공 요인: 지형적 이점, 조기 대응, 프로메테우스 기술 지원(31% 기여 — 미확인)." },

  // ═══ 카테고리: 시설/장비 ═══
  { id: "ARC-FAC-SEAL", cat: "시설", title: "봉쇄선",
    unlock: function(logs){ return logs.indexOf("LOG-001")>=0 },
    content: "오염 구역을 둘러싼 다층 방어 경계선.\n\n4개 이상의 구역으로 분할 운영. 각 구역 독립 격리 가능.\n\n전기 울타리 시스템, 열감지 센서, 야간 순찰 루트로 구성.\n\n취약점: 동쪽 방어벽 구조적 한계, 센서 사각지대, 대규모 습격 시 30분 방어 한계." },

  { id: "ARC-FAC-TUNNEL", cat: "시설", title: "비상 대피 터널",
    unlock: function(logs){ return logs.indexOf("LOG-073")>=0 },
    content: "기지 북측 지하 비상 통로.\n\n지휘관의 사전 결정에 따라 구축된 대피 경로. 기존에는 기지에서 외부로 나가는 경로가 1개뿐이었으나, 봉쇄선 붕괴 시 30초 내 판단이 필요하다는 강도윤의 건의를 반영하여 추가 경로를 확보.\n\n구조: 기지 북측 → 봉쇄선 외곽 약 200m 지점까지 연결. 단방향 대피 전용.\n\n수용 인원: 최대 8명 동시 이동 가능.\n조명: 비상 배터리 구동 (48시간).\n\n참고: 이 터널의 존재가 야간 대규모 습격 시 요원 생존의 결정적 요소가 될 수 있음." },

  { id: "ARC-FAC-LAB", cat: "시설", title: "연구실",
    unlock: function(logs){ return true },
    content: "기지 내 EV-Σ 연구 시설.\n\n장비 현황: 현미경(배율 기준 미달), 생체 샘플 보관 장치(온도 편차 ±2도).\n\n윤세진이 억제제 연구 및 이변체 행동 패턴 분석을 수행.\n\nSPEC-001 등 이변체 모니터링 가능." },

  { id: "ARC-FAC-SENSOR", cat: "시설", title: "봉쇄선 센서 체계",
    unlock: function(logs){ return logs.indexOf("LOG-070")>=0 },
    content: "봉쇄선 감시 시스템 구성.\n\n전기 울타리: 구역별 독립 전원 운용.\n열감지 센서: 이변체 탐지 1차 수단. 사각지대 존재 확인.\n야간 순찰 루트: 2인 1조, 4시간 교대.\n\n센서 오작동 시 수동 확인 필요 — 소요시간 약 30분.\n\n취약점: 동쪽 방어벽 구조적 한계, 대규모 습격 시 30분 방어 한계.\n\n임재혁이 센서 네트워크 유지보수 담당." },

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

  { id: "ARC-SCI-EVOLVE", cat: "과학", title: "진화 분류 체계 (ORACLE 기준)",
    unlock: function(logs){ return logs.indexOf("LOG-017")>=0 },
    content: "ORACLE이 사용하는 EV-Σ 진화 상태 분류.\n\nOVERDRIVE (과속진화): Philadelphia. 붕괴. 속도 통제 불가.\nCONTROLLED (통제진화): 한국. 지속 가능. 속도 관리 중.\nDELAYED (지연진화): Silent Belt. 느리게 진행.\nSTAGNANT (정체진화): DPRK. 거의 멈춤.\nCOMPLETE (완료진화): TS-Ω. 더 이상 변화 불필요.\n\n한국은 CONTROLLED — 진화 속도를 인위적으로 관리하는 유일한 구역.\n이것이 한국 봉쇄의 전략적 가치이자 ORACLE이 한국을 예외변수로 분류하는 이유." },

  { id: "ARC-SCI-TEMP", cat: "과학", title: "EV-Σ 환경 반응 조건",
    unlock: function(logs){ return logs.indexOf("LOG-015")>=0 || logs.indexOf("LOG-017")>=0 },
    content: "EV-Σ는 단순 바이러스가 아닌 생물학적 진화 가속 매개체.\n\n환경 온도에 따른 반응:\n· 중간 온도: 활성 진화 (가장 위험)\n· 저온: Dormant 상태 (억제 ≠ 제거)\n· 고온: 구조 붕괴\n· 극한 환경: 비활성\n\n경고: 저온 포자는 환경 변화 시 재활성화.\n'억제는 제거가 아니다.' — ORACLE 경고문\n\n한국의 사계절 기후는 EV-Σ 관리에 복합적 변수." },

  { id: "ARC-SCI-4STAGE", cat: "과학", title: "EV-Σ 변이 4단계",
    unlock: function(logs){ return logs.indexOf("LOG-013")>=0 && logs.indexOf("LOG-017")>=0 },
    content: "EV-Σ 감염체의 물리적 변이 단계.\n\n1단계: 잠복 (프리온형) — 외형 변화 미미. 억제제 투여 가능.\n2단계: 표면 변이 (마네킹) — Phase 1. 인간형 유지.\n3단계: 구조 변형 (경질화) — Phase 2. 통상 화기 무효.\n4단계: 터미널 (HeLa형) — Phase 3. 종 흔적 소실. 무한 증식.\n\n각 단계 전환은 비가역적.\n현재 억제제는 1→2단계 전환만 지연 가능 (40%).\n\n윤세진 연구 목표: 2→3단계 전환 차단." },

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

  { id: "ARC-SYS-GENESIS", cat: "시스템", title: "GENESIS BREAK (최초 발생)",
    unlock: function(logs){ return logs.indexOf("LOG-004")>=0 || logs.indexOf("LOG-005")>=0 },
    content: "EV-Σ 최초 대규모 발현 사건.\n\n일시: 기밀.\n장소: 기밀.\n\n결과: 전 세계적 감염 확산의 시작.\n\nPhiladelphia Zone이 최초의 완전 붕괴 사례.\n\n핵심 교훈:\n· 감염은 생물이 아니라 시스템이다\n· 사살 = 확산 (분해 시 포자 방출)\n· 공기 감염이 존재한다\n\n이 사건의 교훈이 이후 모든 봉쇄 프로토콜의 기준이 됨." },

  // ═══ 카테고리: 지역/사건 ═══
  { id: "ARC-LOC-PHILA", cat: "지역", title: "필라델피아 Z-Ω 구역",
    unlock: function(logs){ return logs.indexOf("LOG-INTRO-KD")>=0 },
    content: "구역 분류: Z-Ω COLLAPSE.\n진화 상태: OVERDRIVE (과속진화).\n\n글로벌 감염 사태의 대표적 사례. 하룻밤 사이에 도시 전체가 봉쇄 실패.\n\n강도윤이 영상으로 확인. 직접 방문 이력은 없음.\n'한 번 보면 잊을 수 없습니다. 하룻밤 사이에 도시가 뒤집혔습니다.'\n\nTS-Ω Core의 영향권. Philadelphia Zone 전체가 사실상 격리 구역.\n\n한국지부 봉쇄선의 중요성을 상기시키는 사례.\n'저쪽이 뚫리면 여기도 끝입니다.' — 강도윤" },

  { id: "ARC-LOC-DPRK", cat: "지역", title: "DPRK 블랙존",
    unlock: function(logs){ return logs.indexOf("LOG-INTRO-KD")>=0 },
    content: "북한 접경 지역의 미확인 구역. [접근 제한]\n\n진화 분류: ██████.\n\n현상: ██████. 상세 불명.\n\nORACLE 분류: ██████.\n관측 상태: ██████.\n\n— 강도윤 구두 보고 중 일부 발췌 —\n'북쪽에 대해서는 아는 게 거의 없습니다. 다만... ORACLE이 그쪽 데이터를 일부러 안 보여주는 느낌입니다.'\n\n추가 데이터: LEVEL 5 CLEARANCE REQUIRED.\n[이 기록은 일부만 공개됩니다]" },

  { id: "ARC-LOC-KOREA", cat: "지역", title: "Z-0 한국 구역",
    unlock: function(logs){ return logs.indexOf("LOG-001")>=0 },
    content: "ORACLE 구역 분류: Z-0.\n진화 상태: CONTROLLED (통제진화).\n\n봉쇄 성공률 97.3% — 전 세계 유일 95% 이상 구역.\n\nORACLE 내부 평가:\n'This region should have failed. Outcome does not match model.'\nEXCEPTION_INDEX: HIGH\nOBSERVER_INTEREST: SUSTAINED\n\nNext Wave 시뮬레이션:\n· 해안 포자 72% / 다점 Spreader 44.8%\n· 내부 NODE 31.1% / TS-Ω 압박 18.6%\n\nTS-Ω 필드 반응: 한국을 '인지'하지 못함. 전파실패구간으로만 감지." },

  { id: "ARC-LOC-ASHFALL", cat: "지역", title: "Ashfall City (Z-3)",
    unlock: function(logs){ return logs.indexOf("LOG-014")>=0 },
    content: "위치: Camden, NJ (미국).\n구역 분류: Z-3 COLLAPSE.\n진화 상태: OVERDRIVE (과속진화).\n\n도시 인프라가 생체 조직으로 전환됨.\nORACLE 기록: 'Structures are no longer buildings. They are organs.'\n\nBrood Drone 200+ 집단 관측.\n\nPhiladelphia와 함께 봉쇄 실패의 대표적 사례.\n한국지부 교육 자료로 활용 — '봉쇄가 실패하면 이것이 된다.'" },

  { id: "ARC-LOC-SILENT", cat: "지역", title: "Silent Belt",
    unlock: function(logs){ return logs.indexOf("LOG-015")>=0 },
    content: "광역 포자 오염 지대.\n진화 분류: DELAYED (지연진화).\n\nSeed Spreader(SPEC-004)가 주요 형성 원인.\n\n40km 반경 내 12개 이상의 Spreader 구조체 확인.\n\n소리가 없다 — 동물, 새, 곤충 모두 부재.\n\n확장 속도: 월 1.2km.\n\nPermafrost Unit(러시아)가 경계 관리.\n\n한국지부 직접 관여: 없음. ORACLE 데이터베이스를 통한 열람." }
];

// 카테고리 목록 (표시 순서)
var ARCHIVE_CATEGORIES = ["이변체", "인물", "조직", "시설", "과학", "시스템", "지역"];
