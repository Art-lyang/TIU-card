(function(){
  if(typeof window==='undefined')return;

  Object.assign(window.FIELD_MINIGAME_CONFIGS||(window.FIELD_MINIGAME_CONFIGS={}),{
    "M-003": {
      start: {
        village: { key: "evidence_sort", type: "evidence" }
      }
    },
    "MI-02": {
      start: {
        reverse: { key: "log_reconstruction", type: "reconstruction" }
      }
    },
    "M-007": {
      start: {
        strike: { key: "strike_designation", type: "strike" }
      }
    }
  });

  function ensureFieldMiniStart(missionId){
    var configs=window.FIELD_MINIGAME_CONFIGS||(window.FIELD_MINIGAME_CONFIGS={});
    configs[missionId]=configs[missionId]||{};
    configs[missionId].start=configs[missionId].start||{};
    return configs[missionId].start;
  }

  Object.assign(ensureFieldMiniStart("MI-05"),{
    interview: { key: "statement_verify", type: "statement" }
  });

  Object.assign(ensureFieldMiniStart("M-001"),{
    doyun_joint: { key: "doyun_joint_assault", type: "sample", followupType: "doyun_assault" }
  });
  Object.assign(ensureFieldMiniStart("M-002"),{
    sejin_decoy: { key: "sejin_decoy_signal", type: "signal" }
  });
  Object.assign(ensureFieldMiniStart("M-004"),{
    jaehyuk_tech: { key: "jaehyuk_precision_scan", type: "scan" }
  });
  Object.assign(ensureFieldMiniStart("M-005"),{
    haeun_intel: { key: "haeun_data_sort", type: "evidence" }
  });
  Object.assign(ensureFieldMiniStart("M-006"),{
    sejin_field: { key: "sejin_spore_sample", type: "sample" }
  });

  Object.assign(window.FIELD_MINIGAME_REWARDS||(window.FIELD_MINIGAME_REWARDS={}),{
    "M-001": {
      great: { result: { t: 1, o: 1 } },
      success: { result: { t: 1 } },
      partial: { result: { o: 1 } },
      fail: { result: { r: -1 } }
    },
    "M-003": {
      great: { result: { r: 1, o: 1 } },
      success: { result: { o: 1 } },
      partial: { result: { t: 1 } },
      fail: { result: { o: -1 } }
    },
    "M-004": {
      great: { result: { o: 1, t: 1 } },
      success: { result: { o: 1 } },
      partial: { result: { t: 1 } },
      fail: { result: { o: -1 } }
    },
    "M-005": {
      great: { result: { c: 1, t: 1 } },
      success: { result: { c: 1 } },
      partial: { result: { t: 1 } },
      fail: { result: { o: -1 } }
    },
    "M-006": {
      great: { result: { t: 1, o: 1 } },
      success: { result: { t: 1 } },
      partial: { result: { r: -1 } },
      fail: { result: { r: -1, t: -1 } }
    },
    "MI-02": {
      great: { result: { o: 1, t: 1 } },
      success: { result: { o: 1 } },
      partial: { result: { t: 1 } },
      fail: { result: { r: -1 } }
    },
    "MI-05": {
      great: { result: { t: 1, o: 1 } },
      success: { result: { t: 1 } },
      partial: { result: { o: 1 } },
      fail: { result: { t: -1 } }
    },
    "M-007": {
      great: { result: { c: 1, t: 1 } },
      success: { result: { t: 1 } },
      partial: { result: { o: 1 } },
      fail: { result: { c: -1 } }
    }
  });

  Object.assign(window.FIELD_MINIGAME_NARRATIVES||(window.FIELD_MINIGAME_NARRATIVES={}),{
    "M-003": {
      village: {
        great: {
          ko: { textSuffix: "[증거 분류: 대성공]\n흔적 사이에서 실제로 이어지는 좌표, 장비, 이동선만 선명하게 남는다.\n마을 경유 흔적은 더 이상 막연한 추측이 아니라 하나의 경로가 된다.", endLabel: "[ 기지 귀환 — 증거 정리 완료 ]" },
          en: { textSuffix: "[Evidence Sort: Great Success]\nOnly the coordinates, hardware trace, and movement line remain after the noise is stripped away.\nThe village route becomes a coherent path instead of a hunch.", endLabel: "[ Return to Base — Evidence Sorted ]" }
        },
        success: {
          ko: { textSuffix: "[증거 분류: 성공]\n중요 단서가 추려지며 마을 경유 흔적의 윤곽이 잡힌다.\n남은 잡음은 있지만, 추적선은 이제 분명하다.", endLabel: "[ 기지 귀환 — 핵심 단서 확보 ]" },
          en: { textSuffix: "[Evidence Sort: Success]\nThe key clues separate from the rest and the village route takes shape.\nSome noise remains, but the trail is now readable.", endLabel: "[ Return to Base — Key Evidence Secured ]" }
        },
        partial: {
          ko: { textSuffix: "[증거 분류: 부분 성공]\n단서는 건졌지만 잡음 자료가 섞여 있다.\n좌표와 흔적이 이어지긴 하나, 다음 판단에는 여전히 빈칸이 남는다.", endLabel: "[ 기지 귀환 — 단서 확보 / 판독 보류 ]" },
          en: { textSuffix: "[Evidence Sort: Partial Success]\nUseful clues survive, but noise remains in the stack.\nThe route can be inferred, though the next call still contains blind spots.", endLabel: "[ Return to Base — Clues Secured / Review Pending ]" }
        },
        fail: {
          ko: { textSuffix: "[증거 분류: 실패]\n잡음 자료에 시선이 끌리며 핵심 단서의 연결이 흐려진다.\n마을의 흔적은 남아 있지만, 무엇이 진짜였는지는 더 애매해진다.", endLabel: "[ 기지 귀환 — 증거 혼선 ]" },
          en: { textSuffix: "[Evidence Sort: Failure]\nNoise steals the review window and the core links blur together.\nThe village traces remain, but what actually mattered is less clear than before.", endLabel: "[ Return to Base — Evidence Contaminated ]" }
        }
      }
    },
    "MI-02": {
      reverse: {
        great: {
          ko: { textSuffix: "[로그 복원: 대성공]\n끊긴 CCTV 조각이 하나의 흐름으로 이어지며 02:47 경로가 정확히 복원된다.\n이제 남는 것은 '누가'가 아니라 '왜 저 경로를 반복했는가'다.", endLabel: "[ 처리 완료 — 역추적 경로 복원 ]" },
          en: { textSuffix: "[Log Reconstruction: Great Success]\nThe broken CCTV fragments lock into a single chain and the 02:47 route is reconstructed exactly.\nThe remaining question is no longer who moved there, but why the route keeps repeating.", endLabel: "[ Resolution Complete — Reverse Route Restored ]" }
        },
        success: {
          ko: { textSuffix: "[로그 복원: 성공]\n공백 구간의 순서가 맞물리며 이동 경로가 드러난다.\n기록은 불완전해도 추적선은 충분히 살아난다.", endLabel: "[ 처리 완료 — 역추적 경로 확인 ]" },
          en: { textSuffix: "[Log Reconstruction: Success]\nThe blackout fragments align and the transit path emerges.\nThe record is incomplete, but the tracking line is usable again.", endLabel: "[ Resolution Complete — Reverse Route Confirmed ]" }
        },
        partial: {
          ko: { textSuffix: "[로그 복원: 부분 성공]\n기록의 앞뒤는 연결했지만 일부 조각이 삐끗난다.\n경로는 보이되, 중간 공백이 여전히 불안하게 남아 있다.", endLabel: "[ 처리 완료 — 역추적 경로 / 복원 불완전 ]" },
          en: { textSuffix: "[Log Reconstruction: Partial Success]\nThe record is mostly rebuilt, but one or two joins still slip.\nThe route is visible, though the middle remains unstable.", endLabel: "[ Resolution Complete — Reverse Route / Incomplete Restore ]" }
        },
        fail: {
          ko: { textSuffix: "[로그 복원: 실패]\n조각이 엇갈리며 공백 구간이 더 헷갈리는 흔적이 된다.\n스크립트는 남아 있지만, 오늘 복원으로는 방향을 되찾지 못했다.", endLabel: "[ 처리 완료 — 역추적 실패 ]" },
          en: { textSuffix: "[Log Reconstruction: Failure]\nThe fragments misalign and the blackout becomes harder to read than before.\nThe script still exists, but this reconstruction never regains its direction.", endLabel: "[ Resolution Complete — Reverse Trace Failed ]" }
        }
      }
    },
    "MI-05": {
      interview: {
        great: {
          ko: { textSuffix: "[진술 검증: 대성공]\n증언과 기록의 모순점이 즉시 맞물리며 허위 진술이 분리된다.\n면담은 위로가 아니라 검증으로 전환된다.", endLabel: "[ 처리 완료 — 진술 검증 완료 ]" },
          en: { textSuffix: "[Statement Verify: Great Success]\nThe contradiction between testimony and hard record snaps into place immediately.\nThe interview turns from comfort into verification.", endLabel: "[ Resolution Complete — Testimony Verified ]" }
        },
        success: {
          ko: { textSuffix: "[진술 검증: 성공]\n기록과 맞지 않는 진술 하나가 선명하게 떠오른다.\n면담 내용은 이제 참고가 아니라 선별된 정보가 된다.", endLabel: "[ 처리 완료 — 모순 진술 분리 ]" },
          en: { textSuffix: "[Statement Verify: Success]\nOne statement cleanly breaks away from the rest of the record.\nThe interview stops being raw testimony and becomes filtered information.", endLabel: "[ Resolution Complete — Contradiction Isolated ]" }
        },
        partial: {
          ko: { textSuffix: "[진술 검증: 부분 성공]\n이상한 문장은 남았지만 확증까지는 닿지 못한다.\n면담 내용은 의심할 가치가 있으나, 단정할 단계는 아니다.", endLabel: "[ 처리 완료 — 진술 검토 보류 ]" },
          en: { textSuffix: "[Statement Verify: Partial Success]\nAn odd line remains, but it never reaches certainty.\nThe interview is worth suspecting, not yet enough to close.", endLabel: "[ Resolution Complete — Testimony Review Pending ]" }
        },
        fail: {
          ko: { textSuffix: "[진술 검증: 실패]\n모순점을 짚지 못한 채 감정선에 휩쓸린다.\n면담은 끝났지만, 무엇이 사실이었는지는 더 흐려졌다.", endLabel: "[ 처리 완료 — 진술 검증 실패 ]" },
          en: { textSuffix: "[Statement Verify: Failure]\nThe contradiction is missed and the interview drifts with emotion instead.\nThe conversation ends, but the truth is less clear than before.", endLabel: "[ Resolution Complete — Testimony Verification Failed ]" }
        }
      }
    },
    "M-007": {
      strike: {
        great: {
          ko: { textSuffix: "[타격 표적 지정: 대성공]\n통신 장비 구획 두 곳이 정확히 사격선에 오른다. 인체 열원 구획은 전부 제외.\n타격은 장비에만 향한다 — 적어도 계획상으로는.", endLabel: "[ 기지 귀환 — 표적 지정 완료 ]" },
          en: { textSuffix: "[Strike Designation: Great Success]\nBoth comms-equipment blocks lock onto the firing line. Every human-heat block is excluded.\nThe strike points at hardware only — on paper, at least.", endLabel: "[ Return to Base — Targets Designated ]" }
        },
        success: {
          ko: { textSuffix: "[타격 표적 지정: 성공]\n통신 장비 구획이 표적으로 고정된다.\n지정이 늦어 진입조의 대기가 길어졌지만, 사격선은 깨끗하다.", endLabel: "[ 기지 귀환 — 표적 고정 ]" },
          en: { textSuffix: "[Strike Designation: Success]\nThe comms blocks are locked as targets.\nThe designation ran long and the entry team waited, but the firing line is clean.", endLabel: "[ Return to Base — Targets Locked ]" }
        },
        partial: {
          ko: { textSuffix: "[타격 표적 지정: 부분 성공]\n표적 하나는 정확했지만, 다른 하나는 빈 구획이었다.\n남은 통신 장비 구획은 진입조가 눈으로 확인해야 한다.", endLabel: "[ 기지 귀환 — 표적 일부 지정 ]" },
          en: { textSuffix: "[Strike Designation: Partial Success]\nOne target was true; the other was an empty block.\nThe remaining comms block has to be confirmed by eye, door by door.", endLabel: "[ Return to Base — Partial Designation ]" }
        },
        fail: {
          ko: { textSuffix: "[타격 표적 지정: 실패]\n지정한 구획에서 인체 열원이 확인된다. 사격선이 급히 취소된다.\n작전은 계속되지만, 방금 무엇을 쏠 뻔했는지는 모두가 안다.", endLabel: "[ 기지 귀환 — 표적 지정 실패 ]" },
          en: { textSuffix: "[Strike Designation: Failure]\nHuman heat resolves inside a designated block. The firing line is scrubbed in a hurry.\nThe operation continues, but everyone knows what was nearly fired upon.", endLabel: "[ Return to Base — Designation Failed ]" }
        }
      }
    }
  });

  function ensureFieldMiniNarrative(missionId){
    var narratives=window.FIELD_MINIGAME_NARRATIVES||(window.FIELD_MINIGAME_NARRATIVES={});
    narratives[missionId]=narratives[missionId]||{};
    return narratives[missionId];
  }

  Object.assign(ensureFieldMiniNarrative("M-001"),{
    doyun_joint: {
      great: {
        ko: { textSuffix: "[양동 회수 판정: 대성공]\n강도윤의 교란선과 중심부 진입 타이밍이 정확히 맞물린다.\n오염원 핵심부가 노출된 짧은 순간, 표본 확보와 확산 억제가 동시에 끝난다.", endLabel: "[ 기지 귀환 — 합동 작전 완전 성공 ]" },
        en: { textSuffix: "[Diversion Recovery: Great Success]\nDo-yun's diversion and the center entry line lock into the same window.\nThe core is exposed just long enough for both sample recovery and spread suppression.", endLabel: "[ Return to Base — Joint Operation Complete ]" }
      },
      success: {
        ko: { textSuffix: "[양동 회수 판정: 성공]\n교란선이 유지되는 동안 중심부 접근이 가능해진다.\n작전은 깔끔하게 닫혔고, 현장 우위도 남았다.", endLabel: "[ 기지 귀환 — 합동 작전 성공 ]" },
        en: { textSuffix: "[Diversion Recovery: Success]\nThe center can be reached while the diversion line holds.\nThe operation closes cleanly and leaves a field advantage behind.", endLabel: "[ Return to Base — Joint Operation Successful ]" }
      },
      partial: {
        ko: { textSuffix: "[양동 회수 판정: 부분 성공]\n진입로는 열렸지만 소각선 일부가 흔들린다.\n핵심부는 확인했으나, 후속 정리에는 추가 시간이 필요하다.", endLabel: "[ 기지 귀환 — 핵심부 확인 / 정리 필요 ]" },
        en: { textSuffix: "[Diversion Recovery: Partial Success]\nThe entry route opens, but part of the burn line wavers.\nThe core is confirmed, though cleanup will need more time.", endLabel: "[ Return to Base — Core Confirmed / Cleanup Needed ]" }
      },
      fail: {
        ko: { textSuffix: "[양동 회수 판정: 실패]\n교란선이 늦게 물리며 중심부 접근이 거칠어진다.\n작전은 끝났지만 장비와 체력 손실이 남는다.", endLabel: "[ 기지 귀환 — 합동 작전 불안정 ]" },
        en: { textSuffix: "[Diversion Recovery: Failure]\nThe diversion line slips late and the center approach turns rough.\nThe operation ends, but gear and stamina are spent.", endLabel: "[ Return to Base — Joint Operation Unstable ]" }
      }
    }
  });

  Object.assign(ensureFieldMiniNarrative("M-002"),{
    sejin_decoy: {
      great: {
        ko: { textSuffix: "[음성 디코이 정렬: 대성공]\n윤세진의 패턴 조율이 실제 목소리와 거의 구분되지 않는다.\nSPEC-011은 경계하지 못한 채 포획선 안으로 들어온다.", endLabel: "[ 기지 귀환 — 디코이 포획 완전 성공 ]" },
        en: { textSuffix: "[Voice Decoy Alignment: Great Success]\nSe-jin's pattern work becomes almost indistinguishable from a real voice.\nSPEC-011 enters the capture line before it can guard itself.", endLabel: "[ Return to Base — Decoy Capture Complete ]" }
      },
      success: {
        ko: { textSuffix: "[음성 디코이 정렬: 성공]\n디코이가 충분히 안정되며 대상을 유인한다.\n포획은 성공했고, 잔향 데이터도 남았다.", endLabel: "[ 기지 귀환 — 디코이 포획 성공 ]" },
        en: { textSuffix: "[Voice Decoy Alignment: Success]\nThe decoy stabilizes well enough to draw the target out.\nCapture succeeds and acoustic residue remains for analysis.", endLabel: "[ Return to Base — Decoy Capture Successful ]" }
      },
      partial: {
        ko: { textSuffix: "[음성 디코이 정렬: 부분 성공]\n유인은 되었지만 파형 일부가 흔들린다.\n대상은 포획됐으나 잔향 데이터의 신뢰도는 낮다.", endLabel: "[ 기지 귀환 — 포획 / 파형 불안정 ]" },
        en: { textSuffix: "[Voice Decoy Alignment: Partial Success]\nThe lure works, but part of the waveform slips.\nThe target is captured, though the residue data is less reliable.", endLabel: "[ Return to Base — Captured / Waveform Unstable ]" }
      },
      fail: {
        ko: { textSuffix: "[음성 디코이 정렬: 실패]\n디코이가 목표 주파수를 벗어나며 대상이 경계한다.\n포획은 강행되지만 현장팀이 더 깊이 들어가야 했다.", endLabel: "[ 기지 귀환 — 디코이 불안정 ]" },
        en: { textSuffix: "[Voice Decoy Alignment: Failure]\nThe decoy drifts away from the target frequency and the specimen becomes wary.\nCapture continues, but the field team has to push deeper.", endLabel: "[ Return to Base — Decoy Unstable ]" }
      }
    }
  });

  Object.assign(ensureFieldMiniNarrative("M-004"),{
    jaehyuk_tech: {
      great: {
        ko: { textSuffix: "[정밀 스캔: 대성공]\n임재혁의 스캔망이 건물 내부의 이동선을 층별로 분리한다.\n진입팀은 거의 손상 없이 격리 지점을 차례로 닫는다.", endLabel: "[ 기지 귀환 — 정밀 격리 완료 ]" },
        en: { textSuffix: "[Precision Scan: Great Success]\nJae-hyuk's scan net separates the interior routes by floor.\nThe entry team closes each isolation point with almost no damage.", endLabel: "[ Return to Base — Precision Isolation Complete ]" }
      },
      success: {
        ko: { textSuffix: "[정밀 스캔: 성공]\n주요 이동선이 드러나며 격리 순서가 잡힌다.\n건물 손상은 제한적이고, 현장팀의 부담도 낮아진다.", endLabel: "[ 기지 귀환 — 정밀 격리 성공 ]" },
        en: { textSuffix: "[Precision Scan: Success]\nThe main movement lines resolve and the isolation order becomes clear.\nStructural damage stays limited and field strain drops.", endLabel: "[ Return to Base — Precision Isolation Successful ]" }
      },
      partial: {
        ko: { textSuffix: "[정밀 스캔: 부분 성공]\n일부 사각이 남아 진입 순서를 즉석에서 조정한다.\n격리는 성공했지만 현장 판단 의존도가 높았다.", endLabel: "[ 기지 귀환 — 격리 / 스캔 사각 존재 ]" },
        en: { textSuffix: "[Precision Scan: Partial Success]\nA few blind spots remain and the entry order has to be adjusted on site.\nIsolation succeeds, but it depends heavily on field calls.", endLabel: "[ Return to Base — Isolated / Scan Blind Spots ]" }
      },
      fail: {
        ko: { textSuffix: "[정밀 스캔: 실패]\n열상 잡음이 개체 위치를 흐린다.\n격리는 끝났지만 장비 재점검과 추가 확인이 필요하다.", endLabel: "[ 기지 귀환 — 스캔 불량 ]" },
        en: { textSuffix: "[Precision Scan: Failure]\nThermal noise blurs the specimen positions.\nIsolation ends, but gear review and another confirmation pass are needed.", endLabel: "[ Return to Base — Scan Degraded ]" }
      }
    }
  });

  Object.assign(ensureFieldMiniNarrative("M-005"),{
    haeun_intel: {
      great: {
        ko: { textSuffix: "[데이터 선별: 대성공]\n서하은이 꺼낸 비공식 자료에서 지휘 신호의 핵심 패턴만 선명하게 남는다.\n교란파는 군체의 명령선을 정확히 끊는다.", endLabel: "[ 기지 귀환 — 군체 신호 차단 완료 ]" },
        en: { textSuffix: "[Data Sort: Great Success]\nThe unofficial data Hae-eun surfaced leaves only the core command pattern behind.\nThe interference pulse cuts the swarm order line cleanly.", endLabel: "[ Return to Base — Swarm Signal Cut ]" }
      },
      success: {
        ko: { textSuffix: "[데이터 선별: 성공]\n약점 주파수가 특정되며 교란값이 안정된다.\n군체 대형은 무너지고 현장 충돌은 피했다.", endLabel: "[ 기지 귀환 — 군체 교란 성공 ]" },
        en: { textSuffix: "[Data Sort: Success]\nThe weakness frequency is identified and the interference value stabilizes.\nThe swarm formation breaks without a direct clash.", endLabel: "[ Return to Base — Swarm Disrupted ]" }
      },
      partial: {
        ko: { textSuffix: "[데이터 선별: 부분 성공]\n핵심 주파수는 잡았지만 보조 패턴이 남는다.\n군체는 흩어졌으나 일부 개체의 재집결 가능성이 있다.", endLabel: "[ 기지 귀환 — 군체 분산 / 재집결 감시 ]" },
        en: { textSuffix: "[Data Sort: Partial Success]\nThe core frequency is caught, but secondary patterns remain.\nThe swarm scatters, though some units may regroup.", endLabel: "[ Return to Base — Swarm Scattered / Monitor Regrouping ]" }
      },
      fail: {
        ko: { textSuffix: "[데이터 선별: 실패]\nORACLE 자료의 잡음이 약점값을 흐린다.\n군체는 물러났지만, 왜 이 자료가 숨겨졌는지는 더 불분명해졌다.", endLabel: "[ 기지 귀환 — 데이터 혼선 ]" },
        en: { textSuffix: "[Data Sort: Failure]\nNoise in the ORACLE file blurs the weakness value.\nThe swarm withdraws, but why the file was hidden becomes less clear.", endLabel: "[ Return to Base — Data Contaminated ]" }
      }
    }
  });

  Object.assign(ensureFieldMiniNarrative("M-006"),{
    sejin_field: {
      great: {
        ko: { textSuffix: "[현장 샘플 회수: 대성공]\n윤세진이 포자 활성 구간을 정확히 붙잡는다.\nUV-C 억제값과 살아 있는 샘플이 동시에 확보된다.", endLabel: "[ 기지 귀환 — 억제값 및 샘플 확보 ]" },
        en: { textSuffix: "[Field Sample Recovery: Great Success]\nSe-jin locks onto the active spore window exactly.\nThe UV-C suppression value and a live sample are secured together.", endLabel: "[ Return to Base — Suppression Value + Sample Secured ]" }
      },
      success: {
        ko: { textSuffix: "[현장 샘플 회수: 성공]\n포자 반응이 안정 구간 안에 들어온다.\n억제법은 확인됐고, 연구실에서 재현 가능한 데이터도 남았다.", endLabel: "[ 기지 귀환 — 포자 억제법 확인 ]" },
        en: { textSuffix: "[Field Sample Recovery: Success]\nThe spore response settles inside the stable window.\nThe suppression method is confirmed with reproducible lab data.", endLabel: "[ Return to Base — Spore Suppression Confirmed ]" }
      },
      partial: {
        ko: { textSuffix: "[현장 샘플 회수: 부분 성공]\n억제 반응은 확인했지만 샘플 일부가 손상된다.\n공식 절차로 올리기 전 추가 실험이 필요하다.", endLabel: "[ 기지 귀환 — 억제 반응 확인 / 샘플 손상 ]" },
        en: { textSuffix: "[Field Sample Recovery: Partial Success]\nThe suppression response is confirmed, but part of the sample is damaged.\nMore testing is needed before it can become protocol.", endLabel: "[ Return to Base — Response Confirmed / Sample Damaged ]" }
      },
      fail: {
        ko: { textSuffix: "[현장 샘플 회수: 실패]\n포자 반응이 회수장 밖으로 튄다.\n억제법의 방향은 보였지만, 윤세진의 장비와 현장팀 모두 부담을 떠안는다.", endLabel: "[ 기지 귀환 — 회수 실패 / 억제값 불완전 ]" },
        en: { textSuffix: "[Field Sample Recovery: Failure]\nThe spore response jumps outside the recovery field.\nThe suppression direction is visible, but the gear and field team both pay for it.", endLabel: "[ Return to Base — Recovery Failed / Value Incomplete ]" }
      }
    }
  });

  function rankFlavor(locale, rank){
    var ko = {
      great: '현장 대응은 거의 완벽했다.',
      success: '현장 대응은 안정적으로 마무리됐다.',
      partial: '결과는 남았지만 여진이 함께 따라왔다.',
      fail: '현장 대응은 끝났지만 손실과 불확실성이 남았다.'
    };
    var en = {
      great: 'The field response was nearly flawless.',
      success: 'The field response closed out cleanly.',
      partial: 'The result holds, but so does the aftershock.',
      fail: 'The field response ended, but loss and ambiguity remain.'
    };
    var table=locale==='en'?en:ko;
    return table[rank]||table.success;
  }

  var FOLLOWUP_TEMPLATES = {
    signal: {
      ko: {
        title: '잔향 분석 후속 보고',
        prompt: '정렬된 음향 잔향을 어떻게 처리할지 결정한다.',
        left: '현장팀에 즉시 배포',
        right: 'ORACLE 분석실에만 보관'
      },
      en: {
        title: 'Echo Analysis Follow-Up',
        prompt: 'Decide how the aligned acoustic residue should be handled.',
        left: 'Distribute to field teams',
        right: 'Keep it in ORACLE analysis'
      },
      fx: { left: { o: 1, t: 1 }, right: { c: 1, o: 0 } }
    },
    evidence: {
      ko: {
        title: '선별 단서 후속 조치',
        prompt: '추려낸 단서를 독립 조사선으로 넘길지, 공식 분류표에 올릴지 결정한다.',
        left: '독립 조사선에 넘긴다',
        right: 'ORACLE 분류표에 편입'
      },
      en: {
        title: 'Filtered Clue Follow-Up',
        prompt: 'Decide whether the sorted clues go to an independent line or the official ORACLE register.',
        left: 'Pass to an independent line',
        right: 'File into ORACLE registry'
      },
      fx: { left: { t: 1, o: -1 }, right: { o: 1, t: -1 } }
    },
    sequence: {
      ko: {
        title: '봉인 후속 명령',
        prompt: '격리 절차 이후 남은 전력과 인원을 어디에 돌릴지 정한다.',
        left: '추가 봉인 유지',
        right: '잔여 전력을 다른 구역에 재배치'
      },
      en: {
        title: 'Seal Sequence Follow-Up',
        prompt: 'Choose how to reallocate power and personnel after the seal sequence.',
        left: 'Maintain extended seal',
        right: 'Redirect power to other sectors'
      },
      fx: { left: { c: 1, r: -1 }, right: { r: 1, c: -1 } }
    },
    breach: {
      ko: {
        title: '권한 흔적 처리안',
        prompt: '복원한 권한 흔적을 숨겨둘지, 바로 보안체계에 반영할지 결정한다.',
        left: '비공개 추적 유지',
        right: '즉시 보안체계 갱신'
      },
      en: {
        title: 'Authority Trace Follow-Up',
        prompt: 'Decide whether the recovered trace stays covert or updates security immediately.',
        left: 'Keep covert tracking',
        right: 'Update security at once'
      },
      fx: { left: { t: 1, o: -1 }, right: { c: 1, o: 1 } }
    },
    sample: {
      ko: {
        title: '회수 표본 처리안',
        prompt: '회수한 표본을 현장 보존할지, 연구 우선으로 넘길지 선택한다.',
        left: '현장 격리 보존',
        right: '연구실 우선 이송'
      },
      en: {
        title: 'Recovered Specimen Follow-Up',
        prompt: 'Choose whether the specimen stays in containment or goes to research priority.',
        left: 'Preserve in local containment',
        right: 'Transfer to research priority'
      },
      fx: { left: { c: 1, t: 0 }, right: { r: -1, o: 1 } }
    },
    scan: {
      ko: {
        title: '스캔 반응 후속 보고',
        prompt: '포착한 이상 반응 지점을 공개할지, 감시선 내부에서만 돌릴지 결정한다.',
        left: '현장 지휘선에 공유',
        right: '감시선 내부로 제한'
      },
      en: {
        title: 'Scan Signal Follow-Up',
        prompt: 'Choose whether the anomaly point is shared broadly or kept inside the surveillance line.',
        left: 'Share with field command',
        right: 'Restrict to surveillance line'
      },
      fx: { left: { o: 1, t: 1 }, right: { c: 1 } }
    },
    reconstruction: {
      ko: {
        title: '복원 기록 검토',
        prompt: '복원된 순서를 즉시 추적선에 넘길지, 추가 검증을 거칠지 정한다.',
        left: '즉시 추적선에 전달',
        right: '내부 검증 후 보류'
      },
      en: {
        title: 'Restored Log Review',
        prompt: 'Decide whether the rebuilt sequence goes straight to tracking or waits for internal verification.',
        left: 'Forward to tracking now',
        right: 'Hold for internal review'
      },
      fx: { left: { o: 1, r: -1 }, right: { t: 1 } }
    },
    route: {
      ko: {
        title: '우회 경로 활용안',
        prompt: '확보한 우회 경로를 후속 작전에 바로 쓰거나, 비상 탈출로로 남겨둔다.',
        left: '후속 작전에 즉시 사용',
        right: '비상 탈출로로 보존'
      },
      en: {
        title: 'Bypass Route Follow-Up',
        prompt: 'Use the secured route immediately or preserve it as an emergency exit line.',
        left: 'Use in the next operation',
        right: 'Preserve as an escape route'
      },
      fx: { left: { o: 1, r: -1 }, right: { c: 1, t: 1 } }
    },
    doyun_assault: {
      ko: {
        title: '강도윤 합동작전 사후 정리',
        prompt: '양동 작전으로 확보한 현장 우위를 추적 작전에 연결할지, 회수한 장비와 인원을 재정비할지 결정한다.',
        left: '추적 작전으로 즉시 연결',
        right: '장비와 인원을 재정비'
      },
      en: {
        title: 'Do-yun Joint Assault Follow-Up',
        prompt: 'Decide whether the field advantage from the coordinated assault becomes a tracking operation or a recovery window.',
        left: 'Press into follow-up tracking',
        right: 'Recover gear and personnel'
      },
      fx: { left: { o: 1, t: 1 }, right: { r: 1, t: 1 } }
    },
    statement: {
      ko: {
        title: '면담 기록 후속 조치',
        prompt: '모순 진술을 즉시 추궁할지, 감시 태그만 붙이고 더 지켜볼지 정한다.',
        left: '즉시 추궁한다',
        right: '감시 태그만 부착'
      },
      en: {
        title: 'Interview Follow-Up',
        prompt: 'Choose whether to challenge the contradiction now or keep the subject under quiet watch.',
        left: 'Push the contradiction now',
        right: 'Tag and monitor quietly'
      },
      fx: { left: { t: 1, o: 1 }, right: { c: 1, t: 0 } }
    },
    strike: {
      ko: {
        title: '타격 구획 사후 처리',
        prompt: '무력화된 통신 장비 구획에 남은 데이터 코어를 회수할지, 현장에서 파기할지 결정한다.',
        left: '데이터 코어 회수',
        right: '현장 파기'
      },
      en: {
        title: 'Strike Block Follow-Up',
        prompt: 'Decide whether the residual data cores in the neutralized comms blocks are recovered or destroyed on site.',
        left: 'Recover data cores',
        right: 'Destroy on site'
      },
      fx: { left: { t: 1, o: -1 }, right: { c: 1, o: 1 } }
    },
    screening: {
      ko: {
        title: '잠복 노출자 처리안',
        prompt: '식별된 노출 의심자를 즉시 격리할지, 관찰 구역에서 추적할지 결정한다.',
        left: '즉시 격리 조치',
        right: '관찰 구역 추적'
      },
      en: {
        title: 'Latent Exposure Follow-Up',
        prompt: 'Decide whether identified suspects are quarantined immediately or tracked inside observation.',
        left: 'Immediate quarantine',
        right: 'Track in observation'
      },
      fx: { left: { c: 1, r: -1 }, right: { t: 1, o: 1 } }
    }
  };

  function adjustFx(base, rank, side){
    var out={c:base.c||0,r:base.r||0,t:base.t||0,o:base.o||0};
    if(rank==='great'){
      if(side==='left'||side==='right'){
        if(out.c>0)out.c+=1;
        else if(out.r>0)out.r+=1;
        else if(out.t>0)out.t+=1;
        else if(out.o>0)out.o+=1;
      }
    }else if(rank==='partial'){
      if(out.o>0)out.o=Math.max(0,out.o-1);
      if(out.t>0)out.t=Math.max(0,out.t-1);
    }else if(rank==='fail'){
      if(side==='left'){ out.r-=1; }
      if(side==='right'){ out.c-=1; }
    }
    return out;
  }

  function applyTrustAssistFx(base, meta, side){
    var out={c:base.c||0,r:base.r||0,t:base.t||0,o:base.o||0};
    if(!meta||!meta.trustAssist)return out;
    var ch=meta.trustAssist.char;
    if(ch==='doyun'){
      if(side==='left')out.t+=1;
      else out.r+=1;
    }else if(ch==='sejin'){
      if(side==='left')out.o+=1;
      else out.t+=1;
    }else if(ch==='jaehyuk'){
      if(side==='left')out.o+=1;
      else out.c+=1;
    }else if(ch==='haeun'){
      if(side==='left')out.t+=1;
      else out.c+=1;
    }
    return out;
  }

  function trustAssistText(locale, meta){
    if(!meta||!meta.trustAssist)return '';
    var ch=meta.trustAssist.char;
    var ko={
      doyun:'강도윤이 현장 동선을 다시 짚어 다음 조치의 부담을 줄입니다.',
      sejin:'윤세진이 현장 분석값을 재검토해 다음 판단의 오차를 줄입니다.',
      jaehyuk:'임재혁이 현장 장비 로그를 정리해 후속 조치에 연결합니다.',
      haeun:'서하은이 비공식 단서를 정리해 다음 보고의 빈틈을 줄입니다.'
    };
    var en={
      doyun:'Do-yun reviews the field route and reduces the burden of the next move.',
      sejin:'Se-jin checks the field analysis again and narrows the margin of error.',
      jaehyuk:'Jae-hyuk organizes the equipment logs and links them to the follow-up action.',
      haeun:'Hae-eun organizes the unofficial clue and closes a gap in the next report.'
    };
    return (locale==='en'?en:ko)[ch]||'';
  }

  window.createFieldMiniGameFollowupCard = function(meta){
    if(!meta||!meta.type)return null;
    var tpl=FOLLOWUP_TEMPLATES[meta.type];
    if(!tpl)return null;
    var locale=(window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale()==='en')?'en':'ko';
    var text=tpl[locale];
    var assist=trustAssistText(locale,meta);
    var stamp=(Date.now()%1000000).toString(36);
    return {
      id: 'FMF-'+String(meta.type).toUpperCase()+'-'+String(meta.missionId||'GEN')+'-'+String(meta.rank||'success').toUpperCase()+'-'+stamp,
      priority: meta.trustAssist?'상':(meta.rank==='fail'?'상':(meta.rank==='great'?'상':'중')),
      msg: (locale==='en'
        ? '[Field Follow-Up]\n\n'+text.title+'\n\n'+rankFlavor(locale,meta.rank)+(assist?'\n'+assist:'')+'\n\n'+text.prompt
        : '[현장 후속 카드]\n\n'+text.title+'\n\n'+rankFlavor(locale,meta.rank)+(assist?'\n'+assist:'')+'\n\n'+text.prompt),
      left: {
        label: text.left,
        fx: applyTrustAssistFx(adjustFx(tpl.fx.left,meta.rank,'left'),meta,'left'),
        g: meta.rank==='great'?1:0
      },
      right: {
        label: text.right,
        fx: applyTrustAssistFx(adjustFx(tpl.fx.right,meta.rank,'right'),meta,'right'),
        g: meta.rank==='fail'?-1:0
      }
    };
  };
})();
