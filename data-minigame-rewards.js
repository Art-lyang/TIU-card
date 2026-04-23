(function(){
  var minigames = {
    "M-002": {
      start: {
        analyze: { key: "signal_scan", type: "signal" }
      }
    },
    "MI-01": {
      start: {
        shield: { key: "seal_sequence", type: "sequence" },
        seal: { key: "seal_sequence", type: "sequence" },
        oracle: { key: "seal_sequence", type: "sequence" }
      }
    },
    "MI-04": {
      start: {
        remove: { key: "authority_trace", type: "breach" },
        trap: { key: "authority_trace", type: "breach" },
        oracle: { key: "authority_trace", type: "breach" }
      }
    }
  };

  var rewards = {
    "M-002": {
      great: { result: { o: 1 }, log: ["LOG-MG-011-AUDIO", "LOG-MG-DLG-SEJIN-SIGNAL"] },
      success: { result: { o: 1 }, log: "LOG-MG-011-AUDIO" },
      partial: { result: { o: 0 } },
      fail: { result: { t: -1 } }
    },
    "MI-01": {
      great: { result: { c: 1, o: 1 }, log: ["LOG-MG-INC-01-SEAL", "LOG-MG-DLG-JAEHYUK-SEAL"] },
      success: { result: { c: 1 }, log: "LOG-MG-INC-01-SEAL" },
      partial: { result: { r: -1 } },
      fail: { result: { c: -1, r: -1 } }
    },
    "MI-04": {
      great: { result: { o: 1, t: 1 }, log: ["LOG-MG-INC-04-TRACE", "LOG-MG-DLG-HAEUN-TRACE"] },
      success: { result: { o: 1 }, log: "LOG-MG-INC-04-TRACE" },
      partial: { result: {} },
      fail: { result: { o: -1, t: -1 } }
    }
  };

  var narratives = {
    "M-002": {
      eliminate: {
        great: {
          textSuffix: "[신호 정렬: 대성공]\n정렬된 파형 위로 실제 발성 지점이 하나만 또렷하게 떠오른다.\n강도윤은 망설이지 않고 그 지점을 향해 사격한다.\n총성이 멎은 뒤에도 잔향은 남지만, 적어도 지금 방금 쓰러진 것이 무엇인지는 분명하다.",
          endLabel: "[ 기지 귀환 — 핵심 발성원 제거 ]"
        },
        success: {
          textSuffix: "[신호 정렬: 성공]\n발성 지점이 좁혀진다. 강도윤은 지체 없이 사격하고 숲은 다시 조용해진다.\n다만 마지막에 들린 목소리가 진짜였는지는 끝내 확신할 수 없다.",
          endLabel: "[ 기지 귀환 — 제거 완료 ]"
        },
        partial: {
          textSuffix: "[신호 정렬: 부분 성공]\n신호는 맞췄지만 잡음이 끝까지 남는다.\n강도윤은 위협을 제거했지만, 당신의 귀에는 부하의 목소리와 비명이 겹친 채 남아 있다.",
          endLabel: "[ 기지 귀환 — 제거 완료 / 음성 잔향 지속 ]"
        },
        fail: {
          textSuffix: "[신호 정렬: 실패]\n판형 정렬에 실패한 채 진입한다. 강도윤은 결국 가장 위험한 지점을 먼저 쏘는 수밖에 없다.\n위협은 멎었지만, 방금 제거한 것이 진짜 발성원이었는지는 끝내 검증하지 못한다.",
          endLabel: "[ 기지 귀환 — 제거 완료 / 발성 검증 실패 ]"
        }
      },
      capture: {
        great: {
          textSuffix: "[신호 정렬: 대성공]\n정렬된 파형 덕분에 격리 상자를 투입할 타이밍이 정확해진다.\n개체 반응은 거칠지만, 살아 있는 표본과 명확한 발성 패턴이 함께 확보된다.",
          endLabel: "[ 기지 귀환 — 표본 확보 / 발성 패턴 완비 ]"
        },
        success: {
          textSuffix: "[신호 정렬: 성공]\n격리 시점이 맞아떨어진다. 표본은 확보됐고, 발성 패턴 일부도 기록된다.",
          endLabel: "[ 기지 귀환 — 표본 확보 ]"
        },
        partial: {
          textSuffix: "[신호 정렬: 부분 성공]\n포획은 성공하지만 발성 데이터 일부가 잡음에 묻힌다.\n표본은 남았으나 분석 가치는 예상보다 낮다.",
          endLabel: "[ 기지 귀환 — 표본 확보 / 데이터 불완전 ]"
        },
        fail: {
          textSuffix: "[신호 정렬: 실패]\n포획 절차는 유지했지만 발성 정렬이 틀어진다.\n표본은 확보됐으나 핵심 패턴은 놓쳤고, 격리 비용만 커진다.",
          endLabel: "[ 기지 귀환 — 표본 확보 / 핵심 패턴 누락 ]"
        }
      },
      analyze: {
        great: {
          textSuffix: "[신호 정렬: 대성공]\n윤세진의 분석과 현장 정렬값이 정확히 겹친다.\n부하의 음성층과 개체 고유 파형이 분리되며, ORACLE 보고서보다 한 단계 선명한 결론이 남는다.",
          endLabel: "[ 기지 귀환 — 정밀 분석 완료 ]"
        },
        success: {
          textSuffix: "[신호 정렬: 성공]\n분석값이 안정되고 ORACLE 결론을 현장 기준으로 보강한다.\n의미 있는 교차검증이 남는다.",
          endLabel: "[ 기지 귀환 — 분석 완료 ]"
        },
        partial: {
          textSuffix: "[신호 정렬: 부분 성공]\n분석은 끝났지만 신호층이 완전히 분리되지는 않는다.\n결론은 확보됐으나, 기록엔 잡음이 남는다.",
          endLabel: "[ 기지 귀환 — 분석 완료 / 기록 불안정 ]"
        },
        fail: {
          textSuffix: "[신호 정렬: 실패]\nORACLE 분석은 받았지만 현장 교차검증은 무너진다.\n보고서는 남지만, 당신은 그 결론을 완전히 믿지 못한다.",
          endLabel: "[ 기지 귀환 — ORACLE 분석 수신 ]"
        }
      }
    },
    "MI-01": {
      shield: {
        great: {
          textSuffix: "[봉인 시퀀스: 대성공]\n차단 순서가 완벽하게 맞아떨어진다.\n잔류 진동도 빠르게 가라앉고, 현재혁은 이번엔 제대로 막았다고 짧게 중얼거린다.",
          endLabel: "[ 처리 완료 — 증상 차단 안정화 ]"
        },
        success: {
          textSuffix: "[봉인 시퀀스: 성공]\n증상은 차단되고 격리실은 다시 안정권에 들어간다.",
          endLabel: "[ 처리 완료 — 증상 차단 ]"
        },
        partial: {
          textSuffix: "[봉인 시퀀스: 부분 성공]\n차단은 됐지만 보조 잠금이 늦게 걸린다.\n당장 위험하진 않지만, 아래층 잔류 반응은 완전히 죽지 않는다.",
          endLabel: "[ 처리 완료 — 증상 차단 / 잔류 반응 경고 ]"
        },
        fail: {
          textSuffix: "[봉인 시퀀스: 실패]\n차단 절차가 꼬이며 격리실이 한 차례 더 흔들린다.\n현 상황은 수습했지만, 원인부 차단에는 실패했다는 인상이 짙게 남는다.",
          endLabel: "[ 처리 완료 — 임시 차단 / 원인 미확인 ]"
        }
      },
      seal: {
        great: {
          textSuffix: "[봉인 시퀀스: 대성공]\n봉인 절차가 정확히 들어맞으며 B2 하부가 영구 차단 상태로 넘어간다.\n현재혁도 이 정도면 다시 열릴 가능성이 낮다고 판단한다.",
          endLabel: "[ 처리 완료 — 영구 봉인 확정 ]"
        },
        success: {
          textSuffix: "[봉인 시퀀스: 성공]\n하부 구역은 예정대로 영구 봉인된다.",
          endLabel: "[ 처리 완료 — 영구 봉인 ]"
        },
        partial: {
          textSuffix: "[봉인 시퀀스: 부분 성공]\n봉인은 완료됐지만 일부 절차를 수동 보정으로 메웠다.\n겉으로는 닫혔지만, 구조적 불안은 조금 남는다.",
          endLabel: "[ 처리 완료 — 영구 봉인 / 수동 보정 ]"
        },
        fail: {
          textSuffix: "[봉인 시퀀스: 실패]\n예정된 절차대로는 닫지 못해 강제 차단으로 마무리한다.\n외형상 봉인은 됐지만, 당신은 이걸 완전한 봉인으로 부르지 못한다.",
          endLabel: "[ 처리 완료 — 강제 봉인 / 불완전 ]"
        }
      },
      oracle: {
        great: {
          textSuffix: "[봉인 시퀀스: 대성공]\nORACLE 자동 판단과 현장 입력값이 정확히 맞물린다.\n이번엔 기계 판단이 아니라, 기계 판단을 검증한 결과처럼 보인다.",
          endLabel: "[ 처리 완료 — ORACLE 판단 수용 / 검증 완료 ]"
        },
        success: {
          textSuffix: "[봉인 시퀀스: 성공]\nORACLE 판단은 무리 없이 적용된다.",
          endLabel: "[ 처리 완료 — ORACLE 판단 수용 ]"
        },
        partial: {
          textSuffix: "[봉인 시퀀스: 부분 성공]\nORACLE 조치는 수행됐지만 현장 체감은 완전히 따라오지 않는다.\n정리는 됐으나 찝찝함이 남는다.",
          endLabel: "[ 처리 완료 — ORACLE 조치 완료 ]"
        },
        fail: {
          textSuffix: "[봉인 시퀀스: 실패]\nORACLE 조치를 그대로 따랐지만 입력값 교차확인에 실패한다.\n조치는 끝났어도, 정말 정리된 건지 누구도 단언하지 못한다.",
          endLabel: "[ 처리 완료 — ORACLE 조치 / 현장 검증 실패 ]"
        }
      }
    },
    "MI-04": {
      remove: {
        great: {
          textSuffix: "[권한 추적: 대성공]\n하드웨어 제거와 동시에 권한 사슬까지 깨끗하게 추적된다.\n누가 이 장치를 숨겼는지에 가까운 흔적이 남는다.",
          endLabel: "[ 처리 완료 — 하드웨어 제거 / 권한 사슬 확보 ]"
        },
        success: {
          textSuffix: "[권한 추적: 성공]\n하드웨어는 제거됐고, 추적 로그도 기본선은 확보된다.",
          endLabel: "[ 처리 완료 — 하드웨어 제거 ]"
        },
        partial: {
          textSuffix: "[권한 추적: 부분 성공]\n물리 제거는 끝났지만 추적 체인은 도중에 흐려진다.\n증거는 남았으나, 누군가 일부를 지운 흔적이 보인다.",
          endLabel: "[ 처리 완료 — 하드웨어 제거 / 추적 불완전 ]"
        },
        fail: {
          textSuffix: "[권한 추적: 실패]\n제거는 해냈지만 핵심 추적 고리를 놓친다.\n당장 위험은 사라졌어도, 누가 심었는지는 다시 어둠 속으로 들어간다.",
          endLabel: "[ 처리 완료 — 하드웨어 제거 / 추적 실패 ]"
        }
      },
      trap: {
        great: {
          textSuffix: "[권한 추적: 대성공]\n감시 트랩은 그대로 살아 있고, 접근 주체를 특정할 수 있을 만큼 선명한 권한 흔적이 남는다.",
          endLabel: "[ 처리 완료 — 감시 트랩 가동 / 추적선 확보 ]"
        },
        success: {
          textSuffix: "[권한 추적: 성공]\n트랩은 정상적으로 작동 대기 상태에 들어간다.",
          endLabel: "[ 처리 완료 — 감시 트랩 가동 ]"
        },
        partial: {
          textSuffix: "[권한 추적: 부분 성공]\n트랩은 걸었지만 추적 버퍼 일부가 비어 있다.\n다음 접근은 잡을 수 있어도, 이전 흔적은 희미하다.",
          endLabel: "[ 처리 완료 — 감시 트랩 가동 / 버퍼 손실 ]"
        },
        fail: {
          textSuffix: "[권한 추적: 실패]\n트랩은 남겼지만 권한 추적 경로가 무너진다.\n누군가 다시 들어오면 알 수는 있겠지만, 지금까지의 흔적은 건지지 못한다.",
          endLabel: "[ 처리 완료 — 감시 트랩 가동 / 추적 손실 ]"
        }
      },
      oracle: {
        great: {
          textSuffix: "[권한 추적: 대성공]\nORACLE 패치 적용 전후의 권한 흐름이 선명하게 갈린다.\n패치가 무엇을 지웠는지까지 역으로 읽을 수 있을 정도다.",
          endLabel: "[ 처리 완료 — ORACLE 패치 / 흔적 분석 완료 ]"
        },
        success: {
          textSuffix: "[권한 추적: 성공]\n패치는 적용됐고 보안구역은 다시 안정권으로 돌아온다.",
          endLabel: "[ 처리 완료 — ORACLE 패치 ]"
        },
        partial: {
          textSuffix: "[권한 추적: 부분 성공]\n패치는 완료됐지만, 지워진 영역이 생각보다 넓다.\n정리는 됐으나 남은 정보는 적다.",
          endLabel: "[ 처리 완료 — ORACLE 패치 / 정보 일부 손실 ]"
        },
        fail: {
          textSuffix: "[권한 추적: 실패]\n패치는 적용됐지만 추적 흔적은 거의 남지 않는다.\n보안은 봉합됐어도, 이번에도 누가 손댔는지는 흐려진다.",
          endLabel: "[ 처리 완료 — ORACLE 패치 / 추적 불가 ]"
        }
      }
    }
  };

  var staticNodeOverrides = {
    "M-001": {
      oracle: {
        endLabel: "[ 기지 귀환 — ORACLE 원격 분석 완료 ]"
      }
    },
    "M-003": {
      record: {
        endLabel: "[ 기지 귀환 — 비공식 좌표 보관 ]"
      },
      report: {
        endLabel: "[ 기지 귀환 — ORACLE 보고 완료 ]"
      }
    },
    "M-005": {
      retreat: {
        endLabel: "[ 기지 귀환 — 전술 철수 ]"
      },
      retreat_data: {
        endLabel: "[ 기지 귀환 — ORACLE 데이터 송신 ]"
      }
    },
    "M-006": {
      retreat: {
        endLabel: "[ 기지 귀환 — 안개 구역 이탈 ]"
      }
    },
    "M-007": {
      exit_quick: {
        endLabel: "[ 기지 귀환 — 이상 구역 이탈 ]"
      }
    }
  };

  window.FIELD_MINIGAME_CONFIGS = minigames;
  window.FIELD_MINIGAME_REWARDS = rewards;
  window.FIELD_MINIGAME_NARRATIVES = narratives;
  window.FIELD_MISSION_NODE_OVERRIDES = staticNodeOverrides;

  if (typeof ORACLE_LOGS !== "undefined") {
    ORACLE_LOGS.push(
      {
        id: "LOG-MG-011-AUDIO",
        title: "SPEC-011 음성 분리 기록",
        content: "[현장 미니게임 결과 기록]\n\n수신 음향 패턴에서 Shell Talker 고유 주파수 대역 일부를 분리했다.\n반복 주기와 잡음층이 구분되며, 유인 신호와 원 신호 사이의 간격이 확인되었다.\n\n윤세진 분석 메모:\n\"가짜 구조 요청과 실제 발성 잔향이 섞여 있었어요. 이제 미끼성 음성에 더 빨리 반응할 수 있습니다.\""
      },
      {
        id: "LOG-MG-INC-01-SEAL",
        title: "격리실 봉인 절차 기록",
        content: "[현장 미니게임 결과 기록]\n\nB2 하부 이상 반응 대응 중 봉인 패널 수동 개입 기록.\n자동 프로토콜이 누락한 보조 잠금 순서가 확인되었으며, 수동 입력으로 차압이 안정화되었다.\n\n임재혁 메모:\n\"기본 루틴만 믿었으면 틈이 남았을 겁니다. 누군가 이 절차를 일부러 얕게 설계해둔 느낌입니다.\""
      },
      {
        id: "LOG-MG-INC-04-TRACE",
        title: "보안 백도어 추적 기록",
        content: "[현장 미니게임 결과 기록]\n\n보안구역 인증 오류 대응 중 미등록 권한 흔적을 역추적했다.\n접근 키 경로 일부가 ORACLE 표준 갱신 패턴과 다르게 이동하며, 내부 승인 없이 재동기화된 구간이 존재했다.\n\n서하은 메모:\n\"삭제된 게 아니라, 흔적이 얇게 덮여 있었어요. 누군가 지운 게 아니라 보이지만 않게 만든 겁니다.\""
      }
    );
  }

  if (typeof ARCHIVE_ENTRIES !== "undefined") {
    ARCHIVE_ENTRIES.push(
      {
        id: "ARC-MG-011-AUDIO",
        cat: "현장분석",
        title: "Shell Talker 음성 분리 메모",
        unlock: function(logs){ return logs.indexOf("LOG-MG-011-AUDIO") >= 0; },
        content: "현장 신호 정렬 결과를 기반으로 정리한 메모.\n\nShell Talker의 유인 음성은 단일 파형이 아니라, 희생자 음성 잔향 위에 외부 잡음을 의도적으로 겹친 구조였다.\n실제 발성 잔향과 미끼 신호를 구분할 기준점이 확보되었다.\n\n적용 효과:\n이후 현장 분석 시 가짜 구조 요청 필터링 정확도 상승."
      },
      {
        id: "ARC-MG-INC-01-SEAL",
        cat: "시설기록",
        title: "B2 봉인 누락 절차",
        unlock: function(logs){ return logs.indexOf("LOG-MG-INC-01-SEAL") >= 0; },
        content: "격리실 이상 반응 대응 중 확인된 수동 봉인 절차 누락 기록.\n\n자동 봉인 루틴은 주 잠금만 활성화하고 보조 차압 고정을 생략하고 있었다.\n현장 수동 입력으로만 안정화 가능.\n\n판단:\n단순 노후화라기보다 설계 단계 누락 또는 의도적 축약 가능성 존재."
      },
      {
        id: "ARC-MG-INC-04-TRACE",
        cat: "보안감사",
        title: "인증 오류 권한 흔적",
        unlock: function(logs){ return logs.indexOf("LOG-MG-INC-04-TRACE") >= 0; },
        content: "보안구역 인증 오류 조사 중 확보한 권한 흔적.\n\n미등록 경로가 ORACLE 승인 절차를 우회한 뒤, 정상 갱신 패턴처럼 위장되어 있었다.\n겉보기에는 일반 보안 패치처럼 보이지만 실제 이동 경로는 수동 개입 흔적에 가깝다.\n\n판단:\n내부 승인 없이 접근 권한을 재조정할 수 있는 별도 계층 존재 가능."
      }
    );
  }

  if (typeof DIALOGUES !== "undefined") {
    DIALOGUES.push(
      {
        char: "윤세진",
        role: "연구원",
        logReq: "LOG-MG-DLG-SEJIN-SIGNAL",
        lines: [
          "지휘관님, 이번 현장 신호 정렬 결과 봤어요.",
          "Shell Talker가 저장한 음성은 그냥 재생된 게 아니었어요. 실제 희생자 발성 잔향 위에 다른 층을 덮고 있었어요.",
          "이번에 잡아낸 기준점이면 다음엔 미끼성 구조 요청을 더 빨리 걸러낼 수 있습니다.",
          "현장에서 사람이 직접 맞춰 준 데이터라서, ORACLE 모델보다 훨씬 살아 있어요."
        ],
        choices: [
          { label: "좋아. 이걸 현장 기준으로 계속 다듬어", tag: "분석", reply: "알겠습니다. 이번엔 진짜 현장 데이터를 바탕으로 만들 수 있어요.", fx: {}, g: -1, trust: 5 },
          { label: "ORACLE 분석팀에도 바로 공유해", tag: "냉정", reply: "...네. 다만 원본은 따로 보관해두겠습니다.", fx: {}, g: 1, trust: -2 }
        ]
      },
      {
        char: "임재혁",
        role: "기술관",
        logReq: "LOG-MG-DLG-JAEHYUK-SEAL",
        lines: [
          "지휘관님. 이번 봉인 패널 로그, 그냥 넘길 일이 아닙니다.",
          "자동 루틴이 보조 잠금 절차를 건너뛰고 있었어요. 현장에서 손으로 안 눌렀으면 틈이 남았을 겁니다.",
          "노후화라고 보기엔 이상하게 필요한 단계만 빠져 있습니다.",
          "누군가 처음부터 '완전 봉인'이 아니라 '적당히 버티는 봉인'으로 짠 느낌입니다."
        ],
        choices: [
          { label: "원인 추적 계속해. 패널 설계부터 보자", tag: "분석", reply: "예. 설계 로그부터 다시 뜯어보겠습니다.", fx: {}, g: -1, trust: 5 },
          { label: "기록만 남기고 지금은 조용히 묻어둬", tag: "냉정", reply: "...알겠습니다. 그런데 이건 다시 터질 겁니다.", fx: {}, g: 1, trust: -2 }
        ]
      },
      {
        char: "서하은",
        role: "부지휘관",
        logReq: "LOG-MG-DLG-HAEUN-TRACE",
        lines: [
          "보안구역 인증 오류 추적 결과 확인했습니다.",
          "이건 삭제라기보다 은폐에 가까워요. 흔적이 없던 게 아니라, 정상 패턴 아래에 얇게 깔려 있었어요.",
          "겉으로는 ORACLE 유지보수처럼 보이게 덮어놓은 거죠.",
          "이런 식이면 기록을 보는 사람조차 보고 있다는 걸 눈치채기 어렵습니다."
        ],
        choices: [
          { label: "좋아. 이후엔 같은 패턴부터 먼저 찾아", tag: "분석", reply: "네. 숨기는 방식이 보이면, 다음 흔적은 더 빨리 잡을 수 있어요.", fx: {}, g: -1, trust: 5 },
          { label: "증거가 더 모일 때까지 외부 보고는 보류하자", tag: "냉정", reply: "그게 안전하긴 합니다. 대신 원본은 제가 따로 보관하겠습니다.", fx: {}, g: 0, trust: 3 }
        ]
      }
    );
  }
})();
