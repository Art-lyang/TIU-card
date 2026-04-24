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
    "MI-05": {
      start: {
        interview: { key: "statement_verify", type: "statement" }
      }
    },
    "M-007": {
      start: {
        strike: { key: "latent_screen", type: "screening" }
      }
    }
  });

  Object.assign(window.FIELD_MINIGAME_REWARDS||(window.FIELD_MINIGAME_REWARDS={}),{
    "M-003": {
      great: { result: { r: 1, o: 1 } },
      success: { result: { o: 1 } },
      partial: { result: { t: 1 } },
      fail: { result: { o: -1 } }
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
          ko: { textSuffix: "[잠복 반응 스크리닝: 대성공]\n대기 인원 가운데 잠복 반응을 보이는 둘이 즉시 분리된다.\n작전실의 긴장은 오히려 차갑게 가라앉고, 사격선도 더 명확해진다.", endLabel: "[ 기지 귀환 — 현장 선별 완료 ]" },
          en: { textSuffix: "[Latent Screening: Great Success]\nTwo latent-exposure signatures are isolated from the waiting group at once.\nThe room gets colder, not louder, and the firing line becomes clearer.", endLabel: "[ Return to Base — Screening Complete ]" }
        },
        success: {
          ko: { textSuffix: "[잠복 반응 스크리닝: 성공]\n잠복 노출자의 징후가 분리되며 대기 인원의 불안이 정리된다.\n현장은 여전히 긴장돼 있지만, 적어도 누굴 먼저 봐야 하는지는 분명하다.", endLabel: "[ 기지 귀환 — 잠복 반응 식별 ]" },
          en: { textSuffix: "[Latent Screening: Success]\nHidden exposure signs separate from the group and the waiting room steadies.\nThe room remains tense, but at least the first priority is clear.", endLabel: "[ Return to Base — Latent Signatures Isolated ]" }
        },
        partial: {
          ko: { textSuffix: "[잠복 반응 스크리닝: 부분 성공]\n이상 징후를 일부 짚어냈지만 전부 분리하지는 못한다.\n사격선은 좁혀졌으나, 방 안의 불안은 완전히 가라앉지 않는다.", endLabel: "[ 기지 귀환 — 잠복 반응 의심자 선별 ]" },
          en: { textSuffix: "[Latent Screening: Partial Success]\nSome anomaly signs are caught, but not all of them are cleanly isolated.\nThe firing line narrows, though the room never fully settles.", endLabel: "[ Return to Base — Suspects Narrowed ]" }
        },
        fail: {
          ko: { textSuffix: "[잠복 반응 스크리닝: 실패]\n정상 반응과 잠복 징후를 갈라내지 못한 채 시간이 흐른다.\n현장 판단은 이어지지만, 대기실 전체가 더 예민해진 상태다.", endLabel: "[ 기지 귀환 — 현장 선별 실패 ]" },
          en: { textSuffix: "[Latent Screening: Failure]\nTime burns away before normal response and latent exposure can be separated.\nThe operation continues, but the whole staging room becomes more brittle.", endLabel: "[ Return to Base — Screening Failed ]" }
        }
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

  window.createFieldMiniGameFollowupCard = function(meta){
    if(!meta||!meta.type)return null;
    var tpl=FOLLOWUP_TEMPLATES[meta.type];
    if(!tpl)return null;
    var locale=(window.TS_I18N&&window.TS_I18N.getLocale&&window.TS_I18N.getLocale()==='en')?'en':'ko';
    var text=tpl[locale];
    var stamp=(Date.now()%1000000).toString(36);
    return {
      id: 'FMF-'+String(meta.type).toUpperCase()+'-'+String(meta.missionId||'GEN')+'-'+String(meta.rank||'success').toUpperCase()+'-'+stamp,
      priority: meta.rank==='fail'?'상':(meta.rank==='great'?'상':'중'),
      msg: (locale==='en'
        ? '[Field Follow-Up]\n\n'+text.title+'\n\n'+rankFlavor(locale,meta.rank)+'\n\n'+text.prompt
        : '[현장 후속 카드]\n\n'+text.title+'\n\n'+rankFlavor(locale,meta.rank)+'\n\n'+text.prompt),
      left: {
        label: text.left,
        fx: adjustFx(tpl.fx.left,meta.rank,'left'),
        g: meta.rank==='great'?1:0
      },
      right: {
        label: text.right,
        fx: adjustFx(tpl.fx.right,meta.rank,'right'),
        g: meta.rank==='fail'?-1:0
      }
    };
  };
})();
