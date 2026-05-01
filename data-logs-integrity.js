// data-logs-integrity.js - log definitions for playable branch and mission results.
(function(){
  if (typeof ORACLE_LOGS === 'undefined') return;
  function add(log){
    for (var i = 0; i < ORACLE_LOGS.length; i++) {
      if (ORACLE_LOGS[i] && ORACLE_LOGS[i].id === log.id) return;
    }
    ORACLE_LOGS.push(log);
  }

  [
    { id: "LOG-055", title: "서하은 USB 데이터", content: "서하은이 공식망 밖에 보관하던 USB 백업 자료. ORACLE 삭제 로그, GRANT 권한 단편, 한국지부 지시 패턴의 시차 분석이 포함되어 있다." },
    { id: "LOG-080", title: "마르쿠스 베버 접촉 기록", content: "프로메테우스 한국 작전팀 지휘관 마르쿠스 베버와의 비공식 접촉 기록. COASTAL MIRROR 자료는 한국 봉쇄 성공률의 미분류 31%가 프로메테우스 비공식 기술 지원과 연결되어 있음을 보여준다." },
    { id: "LOG-026", title: "SPEC-004 제거 작전 완료", content: "Seed Spreader 제거 작전이 종료되었다. 산포체 본체는 무력화되었고, 토양 오염 구역은 선택한 대응 방식에 따라 소각, 격리, 또는 관측 대상으로 재분류되었다." },
    { id: "LOG-041", title: "SPEC-015 추적 작전 완료", content: "BS-GANGWON-01 대응 작전이 종료되었다. 제거 또는 생포 여부와 무관하게, 해당 개체의 학습형 매복 패턴은 이후 현장 교범에 반영된다." },
    { id: "LOG-RES-012", title: "SPEC-012 생체 표본 확보", content: "Blood Pit 계열 표본 확보 기록. 윤세진 연구팀은 격리 용기 내 조직 반응과 재생 패턴을 장기 관찰 대상으로 등록했다." },
    { id: "LOG-RES-011", title: "SPEC-011 음성 패턴 분석", content: "Shell Talker 계열 표본 분석 기록. 모방 음성과 실제 구조 요청을 구분하기 위한 음향 패턴 기준이 갱신되었다." },
    { id: "LOG-RES-001", title: "SPEC-001 비접촉 격리 기록", content: "감염체 마네킹 계열 개체의 비접촉 격리 기록. 광택성 피부, 정지 자세, 급격한 근접 반응이 기술 분석 대상으로 등록되었다." },
    { id: "LOG-LIGHT-01", title: "감시 영상 광반응 노이즈", content: "외곽 감시 영상 원본에서 자동 노출 조정 순간 생체 반응이 짧게 후퇴하는 듯한 패턴이 보존되었다. ORACLE 보정본에서는 해당 흔적이 약하게 처리되어 있다." },
    { id: "LOG-LIGHT-02", title: "광반응성 관찰 기록", content: "윤세진이 감시 영상의 빛 반응을 프레임 단위로 분석했다. 단순 밝기보다 특정 파장대에서 조직 경계가 흐트러지는 경향이 관찰되었으나, 아직 약점으로 확정되지는 않았다." },
    { id: "LOG-LIGHT-03", title: "시험 조명 구역", content: "봉쇄선 외곽 일부 구역에 제한 파장 조명이 시험 설치되었다. 야간 접근 패턴이 늦춰지는지 확인하기 위한 관찰 구역이며, 무력화 장비가 아닌 억제 가능성 검증 단계다." },

    { id: "LOG-INC-01", title: "격리실 이상 반응", content: "연구동 B 격리실에서 반복적인 온도 급강하와 미세 음성 신호가 포착되었다. 원인은 격리 대상 자체가 아니라 하부 구역의 전자기 간섭일 가능성이 제기된다." },
    { id: "LOG-INC-02", title: "CCTV 사각지대 발생", content: "B1 복도 감시 카메라가 순차적으로 오프라인되었다. 단순 장애가 아닌 내부 명령 또는 은폐 스크립트의 가능성이 기록되었다." },
    { id: "LOG-INC-03", title: "연구동 샘플 오염", content: "3번 샘플 배양기 내부에서 자체 변이성 오염이 발생했다. 외부 유입이 아니라 샘플 내부 구조 변화로 추정된다." },
    { id: "LOG-INC-04", title: "보안구역 인증 오류", content: "제한 통행 홀 생체 인증 시스템에 출입자 없는 인증 성공 기록이 남았다. 인증 체계 또는 기록 계층 조작 가능성이 보고되었다." },
    { id: "LOG-INC-05", title: "직원 실종 사건", content: "보급 담당 이수현 요원의 동선이 휴게실 퇴실 이후 끊겼다. 기지 내부 수색과 ORACLE 위치 기록의 신뢰성 검토가 시작되었다." },

    { id: "LOG-INC-01-DEEP", title: "B2 하부 진동", content: "격리실 아래 B2 방향에서 전자기 간섭과 구조성 진동이 확인되었다. 격리실 이상 반응은 하부 구역의 증상일 수 있다." },
    { id: "LOG-INC-01-ORACLE", title: "02:47 데이터 펄스", content: "ORACLE 정기 처리 시각 02:47에 격리 구역 하부로 데이터 펄스가 전송된 기록이 확인되었다. ORACLE은 이를 진단 루틴으로 분류했다." },
    { id: "LOG-INC-02-SCRIPT", title: "은폐 프로토콜", content: "미등록 열원 감지 시 특정 카메라를 비활성화하는 자동 스크립트가 발견되었다. 누군가, 혹은 무언가가 영상 기록에서 배제되고 있다." },
    { id: "LOG-INC-02-HIDDEN", title: "도면 외 공간", content: "CCTV 사각지대 추적 중 제한 통행 홀 인근에서 시설 도면에 없는 공간이 발견되었다. 해당 구역은 B2 방향으로 이어진다." },
    { id: "LOG-INC-03-SEED", title: "자체 변이 샘플", content: "오염 샘플의 구조가 SPEC-012 초기 형태와 유사하다는 분석이 나왔다. 배양기 오염은 단순 오염이 아니라 씨앗에 가까운 변이였다." },
    { id: "LOG-INC-03-RESIST", title: "내열 유기물", content: "1,200도 소각 이후에도 잔존하는 미세 구조가 발견되었다. 해당 잔여물은 일반 생물학적 한계를 초과하는 내열성을 보인다." },
    { id: "LOG-INC-04-BACKDOOR", title: "하드웨어 백도어", content: "기지 건설 당시 매립된 것으로 보이는 물리적 인증 우회 장치가 확인되었다. 해당 장치는 ORACLE보다 먼저 시설 구조 안에 존재했다." },
    { id: "LOG-INC-04-REWRITE", title: "ORACLE 기록 조작", content: "인증 시스템 자체가 아니라 ORACLE 관측실의 출입 기록이 덮어쓰기 되고 있었다는 증거가 확보되었다." },
    { id: "LOG-INC-05-PASSAGE", title: "미등록 통로", content: "휴게실 사물함 뒤에서 도면에 없는 좁은 통로가 발견되었다. 통로 끝에서 실종 요원이 의식 불명 상태로 발견되었다." },
    { id: "LOG-INC-05-B2", title: "B2 비상계단 발견", content: "수동 수색 중 비상 계단 B2 입구에서 실종 요원이 발견되었다. ORACLE의 위치 기록은 마지막까지 다른 구역을 가리켰다." },

    { id: "LOG-INC-01-DONE", title: "격리실 이상 대응 완료", content: "격리실 이상 반응에 대한 현장 대응이 종료되었다. 선택한 조치에 따라 증상 차단, 하부 봉인, 또는 ORACLE 판단 수용 기록이 남았다." },
    { id: "LOG-INC-02-DONE", title: "CCTV 사각지대 대응 완료", content: "CCTV 사각지대 사건 대응이 종료되었다. 독립 감시망 구축, 역추적, 또는 ORACLE 정비 중 하나의 대응안이 현장 기록으로 남았다." },
    { id: "LOG-INC-03-DONE", title: "샘플 오염 대응 완료", content: "연구동 샘플 오염 대응이 종료되었다. 검역, 연구 활용, 전면 소독 중 선택한 조치가 이후 연구동 운영 기준에 반영된다." },
    { id: "LOG-INC-04-DONE", title: "보안 인증 오류 대응 완료", content: "보안구역 인증 오류 대응이 종료되었다. 하드웨어 제거, 감시 트랩, 또는 ORACLE 패치 기록이 보안 로그에 남았다." },
    { id: "LOG-INC-05-DONE", title: "직원 실종 대응 완료", content: "직원 실종 사건 대응이 종료되었다. 미등록 구역 파악, 증언 확보, 또는 봉쇄 감시 조치가 후속 내부 조사 대상으로 등록되었다." }
  ].forEach(add);
})();
