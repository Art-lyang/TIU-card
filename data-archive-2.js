// data-archive-2.js — 조직/인물/시설 아카이브 추가 항목

ARCHIVE_ENTRIES.push(
  { id: "ARC-ORG-DG", cat: "조직", title: "대가산업(DG Industries)",
    unlock: function(logs){ return logs.indexOf('C-274')>=0||logs.indexOf('C-275')>=0 },
    content: "1946년 공식 설립. 제약·방위·기술 복합기업.\n\n한국 EV-Σ 억제제, 방벽 인프라, 군용 바이오센서의 독점 공급자.\n\nORACLE과 독립적 운영 계약. 프로메테우스와 직접 파트너십 보유.\n\n허용도 회장 3세대 체제 하에서 방벽 사업 비중이 전체 매출의 67%까지 확대됨." },
  { id: "ARC-ORG-MRD", cat: "조직", title: "메리디안 파마슈티컬",
    unlock: function(logs){ return logs.indexOf('FLAG-MERIDIAN')>=0 },
    content: "글로벌 제약 기업. DG의 한국 시장 독점에 대항해 아시아 시장 진출 시도 중.\n\n로비·역정보·특허 분쟁을 전략적으로 활용하는 것으로 알려짐.\n\nORACLE이 '유용한 시장 경쟁자'로 분류 — 시스템이 메리디안을 적극 지원하는 이유는 불명확." },
  { id: "ARC-ORG-SDAC", cat: "조직", title: "SDAC(특수재난이상현상대응사령부)",
    unlock: function(logs){ return logs.indexOf('LOG-005')>=0 },
    content: "공식 명칭 SDAC. 대중 별칭 '화이트 실드/백방패'.\n\n대통령 직속 특수 지휘 체계. 봉쇄율 97.3%(세계 최고 수준).\n\nDG 장비·프로메테우스 기술 운용. 서재훈 사령관 체제 하에서 권한이 대폭 확대됨.\n\n민간 감시 시스템과 ORACLE 인터페이스 공유 — 정보 흐름의 방향에 대한 내부 논쟁 존재." },
  { id: "ARC-CHAR-CWJ", cat: "인물", title: "최우진(대한민국 대통령)",
    unlock: function(logs){ return logs.indexOf('LOG-094')>=0 },
    content: "강원도 사건 민간인 피해자 가족 출신. 피해 경험이 정치 입문의 계기.\n\n방벽 예산 증액, 즉시 봉쇄 정책 강화 기조 유지.\n\n강원도 사건 내부 기록에 대해 '열람 불가' 처분 유지 중.\n\nORACLE에 대한 공식 입장: '완전한 신뢰'. 비공개 입장은 확인 불가." },
  { id: "ARC-CHAR-HYD", cat: "인물", title: "허용도(DG 회장)",
    unlock: function(logs){ return logs.indexOf('C-274')>=0||logs.indexOf('C-275')>=0 },
    content: "DG 3세대 회장. 조부가 EV 발생 직전 ORACLE 전신 프로젝트에 투자한 기록.\n\nORACLE 프록시 침투 의혹 — 미확인.\n\n가문 내부에서 구전되는 비공개 역사가 있다는 소문. 공식 부인.\n\n방벽 독점 계약 갱신 시 직접 지휘관급과 접촉하는 관행." },
  { id: "ARC-SYS-NADL", cat: "시설", title: "NADL 방벽 시스템",
    unlock: function(logs){ return logs.indexOf('LOG-095')>=0 },
    content: "4층 방어 체계 — 물리 장벽 + 센서 네트워크 + 자동 교전 + 기동 대응.\n\nDMZ 남쪽 + 북중 국경 + 해안선 + 내부 2차 봉쇄선 커버.\n\nDG 전량 공급. 센서 유지보수 주기 72시간.\n\n강원도 사건 당시 해당 구역 센서가 72시간 전 오프라인 — 점검 기록 없음." }
);
