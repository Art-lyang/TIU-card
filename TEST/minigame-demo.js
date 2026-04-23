(function(){
  var locale = 'ko';
  var active = 'signal';
  var result = { rank: 'READY', text: '' };
  var state = {};
  var timer = null;
  var motionTimer = null;

  var copy = {
    ko: {
      appTitle: '현장임무 미니게임 테스트',
      appDesc: '본편에 붙이기 전, 현장임무에서 10~25초짜리 조작이 어떤 느낌인지 확인하는 독립 테스트입니다.',
      retry: '재시도',
      notesTitle: '적용 메모',
      time: '남은 시간',
      lock: '판정 확정',
      signalHint: '커서가 자동으로 움직입니다. 안정 구간에 들어왔을 때 Space / Enter 또는 판정 버튼을 누르세요.',
      pickLimit: '선택',
      selected: '선택됨',
      ready: 'READY',
      scanHint: '이상 반응 지점을 찾아 누르세요.',
      ranks: { great: '대성공', success: '성공', partial: '부분 성공', fail: '실패' },
      notes: [
        '본편 적용 시 미니게임 코드는 components-minigames.js 같은 새 파일로 분리합니다.',
        '임무별 문구는 miniGames 번역 bucket으로 빼서 한국어/영어를 따로 관리합니다.',
        '미니게임 결과는 기존 현장임무 result/g/log에 보너스 또는 패널티로 합산합니다.'
      ]
    },
    en: {
      appTitle: 'Field Mission Mini-Game Test',
      appDesc: 'An isolated prototype for checking how 10-25 second field interactions might feel before production integration.',
      retry: 'Retry',
      notesTitle: 'Integration Notes',
      time: 'Time Left',
      lock: 'Confirm Result',
      signalHint: 'The cursor moves automatically. Press Space / Enter or confirm while it crosses the stability band.',
      pickLimit: 'Pick',
      selected: 'selected',
      ready: 'READY',
      scanHint: 'Find and tap the abnormal reaction point.',
      ranks: { great: 'Great Success', success: 'Success', partial: 'Partial Success', fail: 'Failure' },
      notes: [
        'In production, mini-game logic should live in a new file such as components-minigames.js.',
        'Mission-specific copy should live in a miniGames i18n bucket for Korean and English.',
        'Mini-game outcomes should be merged into the existing field mission result/g/log payload.'
      ]
    }
  };

  var miniGames = {
    signal: {
      id: 'M-002', kind: 'SIGNAL ALIGNMENT', type: 'signal',
      ko: {
        tab: '신호 정렬',
        title: 'SPEC-011 음향 패턴 정렬',
        intro: '사망자의 목소리와 현재 수신 신호를 대조한다. 초록 커서를 황색 안정 구간에 맞춘 뒤 판정을 확정한다.',
        results: {
          great: '잡음 뒤에 숨어 있던 반복 주파수가 완전히 분리됐다. 위치와 발화 패턴을 동시에 확보했다.',
          success: '핵심 주파수를 확보했다. SPEC-011의 활동 반경이 좁혀졌다.',
          partial: '일부 패턴만 확보했다. 위치는 좁혀졌지만 잡음이 섞여 있다.',
          fail: '신호가 붕괴했다. 남은 것은 왜곡된 목소리뿐이다.'
        }
      },
      en: {
        tab: 'Signal Align',
        title: 'SPEC-011 Acoustic Pattern Alignment',
        intro: 'Compare recorded voices against the live signal. Stop the moving cursor inside the amber stability band before time runs out.',
        results: {
          great: 'The repeating frequency under the noise is fully isolated. Both position and voice pattern are secured.',
          success: 'The key frequency is secured. SPEC-011 activity range is narrowed.',
          partial: 'Only part of the pattern is recovered. The position is narrower, but noise remains.',
          fail: 'The signal collapses. Only distorted voices remain.'
        }
      }
    },
    evidence: {
      id: 'M-008', kind: 'EVIDENCE SORT', type: 'evidence',
      ko: {
        tab: '증거 분류',
        title: '관측중지 데이터 선별',
        intro: 'ORACLE이 거부한 관측 로그 중 실제로 임무 판단에 필요한 기록 3개만 고른다.',
        results: {
          great: '핵심 기록만 정확히 추렸다. 숨겨진 접근 권한 흔적이 드러났다.',
          success: '필요한 기록 대부분을 확보했다. ORACLE 보고서와 현장 기록의 차이가 보인다.',
          partial: '일부 기록은 유효하지만 노이즈가 섞였다. 판단에는 위험이 남는다.',
          fail: '무의미한 로그에 시간이 소모됐다. 관측 근거가 흐려졌다.'
        },
        cards: [
          { text: '00:13:42 / 관측 장비가 4초 동안 역방향 타임코드를 기록', good: true },
          { text: '00:14:01 / 근무자 식별 태그 정상 인증', good: false },
          { text: '00:14:09 / 상위 권한 요청 패킷이 로컬에서 차단됨', good: true },
          { text: '00:15:20 / 외곽 카메라 렌즈 오염률 3%', good: false },
          { text: '00:16:33 / ORACLE 기록과 로컬 저장본의 해시 불일치', good: true },
          { text: '00:17:02 / 전력 사용량 평균 이하', good: false }
        ]
      },
      en: {
        tab: 'Evidence Sort',
        title: 'Observation Halt Data Triage',
        intro: 'Choose only three records that matter from the observation logs ORACLE rejected.',
        results: {
          great: 'Only the critical records are selected. A hidden access-right trace becomes visible.',
          success: 'Most required records are secured. The gap between ORACLE and local logs is visible.',
          partial: 'Some records are useful, but noise remains. The next decision is still risky.',
          fail: 'Time is wasted on irrelevant logs. The observation basis becomes unclear.'
        },
        cards: [
          { text: '00:13:42 / Sensor records reverse timecode for four seconds', good: true },
          { text: '00:14:01 / Staff ID tag authenticates normally', good: false },
          { text: '00:14:09 / Upper-access packet blocked locally', good: true },
          { text: '00:15:20 / Outer camera lens contamination at 3%', good: false },
          { text: '00:16:33 / Hash mismatch between ORACLE log and local copy', good: true },
          { text: '00:17:02 / Power usage below average', good: false }
        ]
      }
    },
    sequence: {
      id: 'MI-01', kind: 'QUARANTINE SEQUENCE', type: 'sequence',
      ko: {
        tab: '격리 봉인',
        title: '격리실 이상 반응 봉인 절차',
        intro: '경고등이 켜진 격리실 패널에서 지시문 순서대로 봉인 절차를 완료한다.',
        instruction: '절차 지시문을 읽고 버튼을 순서대로 입력한다.',
        results: {
          great: '봉인 절차가 지연 없이 완료됐다. 이상 반응이 격리실 내부에 묶였다.',
          success: '봉인은 성공했다. 일부 장비 과부하는 있었지만 확산은 막았다.',
          partial: '봉인은 늦게 완료됐다. 하부 배관 쪽에 잔류 반응이 남았다.',
          fail: '절차가 꼬였다. 격리실 내부 압력이 임계치를 넘었다.'
        }
      },
      en: {
        tab: 'Seal Sequence',
        title: 'Abnormal Quarantine Room Seal',
        intro: 'Complete the seal protocol by pressing the warning-panel buttons in the instructed order.',
        instruction: 'Read the protocol line and press buttons in order.',
        results: {
          great: 'The seal completes without delay. The abnormal reaction is contained inside the room.',
          success: 'The seal succeeds. Some equipment overloads, but spread is prevented.',
          partial: 'The seal completes late. Residual reaction remains in the lower piping.',
          fail: 'The sequence breaks down. Internal pressure crosses the critical line.'
        }
      }
    },
    breach: {
      id: 'M-011', kind: 'ORACLE TRACE', type: 'breach',
      ko: {
        tab: '권한 추적',
        title: 'ORACLE 권한 흔적 우회',
        intro: '권한 회로망에서 인접 노드를 따라 이동하며 KEY 흔적을 확보하고, 노출도가 임계치에 닿기 전 EXIT로 빠져나간다.',
        results: {
          great: '노출 흔적을 거의 남기지 않고 권한 흔적을 회수했다. 숨겨진 내부 경로가 열린다.',
          success: '필요한 권한 흔적을 확보하고 세션을 빠져나왔다. 잠긴 기록에 접근할 수 있다.',
          partial: '일부 권한 흔적만 확보했다. 제한 접근은 가능하지만 추적 잔향이 남았다.',
          fail: '노출도가 임계치를 넘었다. ORACLE이 세션을 차단했다.'
        }
      },
      en: {
        tab: 'Trace Key',
        title: 'ORACLE Authority Trace Bypass',
        intro: 'Move through adjacent nodes in an authority network, collect KEY traces, then reach EXIT before exposure crosses the limit.',
        results: {
          great: 'Authority traces are recovered with almost no exposure. A hidden internal route opens.',
          success: 'Required authority traces are secured and the session exits. Locked records can be accessed.',
          partial: 'Only some authority traces are secured. Limited access is possible, but trace residue remains.',
          fail: 'Exposure crosses the limit. ORACLE blocks the session.'
        }
      }
    },
    sample: {
      id: 'M-006', kind: 'SAMPLE RECOVERY', type: 'sample',
      ko: {
        tab: '샘플 회수',
        title: '활성 샘플 추적 회수',
        intro: '회수 탐침을 조작해 이동하는 활성 샘플을 안정권 안에 붙잡고 회수율을 채운다.',
        results: {
          great: '장비 과부하 없이 활성 샘플을 온전하게 회수했다. 연구 가치가 높다.',
          success: '활성 샘플 회수에 성공했다. 약간의 과부하는 통제 가능하다.',
          partial: '일부 샘플 조직만 확보했다. 확산 위험 검역이 필요하다.',
          fail: '회수 장비가 과부하됐다. 샘플이 파손되고 확산 위험이 상승했다.'
        }
      },
      en: {
        tab: 'Sample Recovery',
        title: 'Active Sample Tracking Recovery',
        intro: 'Operate the extractor probe, keep the active specimen inside the recovery field, and fill recovery progress.',
        results: {
          great: 'The active sample is recovered intact without equipment overload. Its research value is high.',
          success: 'The active sample is recovered. Minor overload can be controlled.',
          partial: 'Only partial tissue is secured. Spread-risk quarantine is required.',
          fail: 'The extractor overloads. The sample fractures and spread risk rises.'
        }
      }
    },
    scan: {
      id: 'MI-05', kind: 'SCAN SEARCH', type: 'scan',
      ko: {
        tab: '스캔 탐색',
        title: '미등록 통로 생체 반응 스캔',
        intro: '어두운 구역 위를 스캐너로 훑어 이상 반응이 가장 강한 지점을 찾는다.',
        results: {
          great: '정확한 열원 중심을 포착했다. 실종자의 이동 경로가 복원됐다.',
          success: '이상 반응 지점을 찾았다. 수색 범위를 크게 줄였다.',
          partial: '근처 반응은 잡았지만 중심점을 놓쳤다. 추가 수색이 필요하다.',
          fail: '스캔이 허탕으로 끝났다. 수색 시간이 소모됐다.'
        }
      },
      en: {
        tab: 'Scan Search',
        title: 'Unregistered Passage Bio-Signal Scan',
        intro: 'Sweep the dark sector and tap the point with the strongest abnormal reaction.',
        results: {
          great: 'The heat-source center is found exactly. The missing route is reconstructed.',
          success: 'An abnormal reaction point is found. The search area is narrowed sharply.',
          partial: 'A nearby reaction is found, but the center is missed. More search is needed.',
          fail: 'The scan returns nothing useful. Search time is lost.'
        }
      }
    },
    log: {
      id: 'M-008', kind: 'LOG RESTORE', type: 'log',
      ko: {
        tab: '로그 복원',
        title: '깨진 CCTV 타임코드 복원',
        intro: '섞인 로그 조각을 올바른 시간 순서로 눌러 사건 흐름을 복원한다.',
        results: {
          great: '타임라인이 완전 복원됐다. 누락된 프레임의 의미가 드러났다.',
          success: '대부분의 흐름을 복원했다. 사건 순서 판단이 가능하다.',
          partial: '일부 순서는 맞았지만 핵심 연결이 약하다.',
          fail: '로그 순서가 무너졌다. 사건 재구성에 실패했다.'
        },
        order: ['00:11 문 개방', '00:13 화면 정지', '00:14 권한 요청', '00:16 로그 삭제']
      },
      en: {
        tab: 'Log Restore',
        title: 'Broken CCTV Timecode Restore',
        intro: 'Tap scrambled log fragments in the correct time order to restore the event flow.',
        results: {
          great: 'The timeline is fully restored. The missing frames become meaningful.',
          success: 'Most of the flow is recovered. The event order can be judged.',
          partial: 'Some order is correct, but the critical link is weak.',
          fail: 'The log order collapses. Reconstruction fails.'
        },
        order: ['00:11 Door opens', '00:13 Feed freezes', '00:14 Access request', '00:16 Log deletion']
      }
    },
    route: {
      id: 'M-010', kind: 'ROUTE EVADE', type: 'route',
      ko: {
        tab: '경로 선택',
        title: '수로 추적 우회 경로',
        intro: '제한 이동 횟수 안에 위험 타일을 피해 목표 지점까지 이동한다.',
        results: {
          great: '매복을 완전히 회피하고 목표 지점에 도달했다.',
          success: '목표 지점에 도달했다. 경보는 울리지 않았다.',
          partial: '목표에는 접근했지만 위험 구역을 스쳤다.',
          fail: '경로 판단이 늦었다. 추적 대상이 이탈했다.'
        }
      },
      en: {
        tab: 'Route Evade',
        title: 'Drainage Route Intercept',
        intro: 'Reach the target within limited moves while avoiding danger tiles.',
        results: {
          great: 'The ambush is fully avoided and the target point is reached.',
          success: 'The target point is reached without triggering the alarm.',
          partial: 'The route reaches the area, but brushes danger.',
          fail: 'The route call is late. The target escapes.'
        }
      }
    },
    testimony: {
      id: 'MI-05', kind: 'TESTIMONY CHECK', type: 'testimony',
      ko: {
        tab: '진술 검증',
        title: '실종자 면담 기록 교차검증',
        intro: '증언과 현장 기록을 비교해 모순되는 진술 하나를 골라낸다.',
        results: {
          great: '모순을 정확히 짚었다. 숨긴 통로의 존재가 확인됐다.',
          success: '의심 진술을 찾아냈다. 추가 면담 근거가 생겼다.',
          partial: '진술의 불일치를 감지했지만 결정적 근거는 약하다.',
          fail: '모순을 놓쳤다. 잘못된 인물을 신뢰하게 됐다.'
        },
        answer: 2,
        lines: [
          'A: 00시 이후엔 누구도 B2로 내려가지 않았습니다.',
          'B: 하부 배관실 문은 계속 잠겨 있었습니다.',
          'C: 저는 00:18에 B2 비상등을 직접 껐습니다.',
          '현장 기록: 00:17~00:21 B2 접근 권한 사용 기록 없음.'
        ]
      },
      en: {
        tab: 'Testimony',
        title: 'Missing Staff Interview Cross-Check',
        intro: 'Compare testimony and site records, then choose the contradictory statement.',
        results: {
          great: 'The contradiction is identified exactly. The hidden passage is confirmed.',
          success: 'The suspicious statement is found. There is ground for another interview.',
          partial: 'A mismatch is sensed, but the proof is weak.',
          fail: 'The contradiction is missed. Trust shifts to the wrong person.'
        },
        answer: 2,
        lines: [
          'A: Nobody went down to B2 after midnight.',
          'B: The lower pipe-room door stayed locked.',
          'C: I turned off the B2 emergency lights at 00:18.',
          'Site record: No B2 access authorization from 00:17 to 00:21.'
        ]
      }
    },
    screening: {
      id: 'MI-06', kind: 'LATENCY SCREENING', type: 'screening',
      ko: {
        tab: '잠복 판독',
        title: '잠복 반응 스크리닝',
        intro: '오라클 단말기로 대기 인원의 생체·행동·신경 반응을 빠르게 훑고 잠복기 노출자를 식별한다.',
        results: {
          great: '잠복기 노출자만 정확히 분리했다. 대기열 전체가 조용히 재배치됐다.',
          success: '주요 노출자를 식별했다. 추가 검역으로 위험을 통제할 수 있다.',
          partial: '의심 인원 일부를 골라냈지만 오탐 또는 누락이 남았다.',
          fail: '판독이 흔들렸다. 잠복 반응자가 대기열에 남았다.'
        },
        people: [
          { id: 'A-17', bio: '맥박 안정 / 체온 +0.2', act: '시선 회피 없음', neuro: '반응 지연 0.1s', exposed: false },
          { id: 'B-04', bio: '체온 +1.4 / 동공 수축 반복', act: '질문 전 답변 시도', neuro: '반응 지연 0.8s', exposed: true },
          { id: 'C-22', bio: '맥박 상승 / 손 떨림', act: '공황 호흡', neuro: '신경 반응 정상', exposed: false },
          { id: 'D-09', bio: '체온 +0.9 / 피부 전도 급등', act: '동일 문장 반복', neuro: '청각 자극 무반응 2회', exposed: true },
          { id: 'E-31', bio: '체온 정상 / 산소포화 안정', act: '지시 수행 정상', neuro: '반응 지연 0.2s', exposed: false },
          { id: 'F-12', bio: '맥박 불규칙 / 체온 +0.7', act: '소음 방향 오인', neuro: '좌우 자극 반전', exposed: true }
        ]
      },
      en: {
        tab: 'Latency Read',
        title: 'Latent Reaction Screening',
        intro: 'Use the ORACLE terminal to scan biometric, behavioral, and neural reactions, then identify latent exposed personnel.',
        results: {
          great: 'Only latent exposed personnel are isolated. The entire queue is quietly rerouted.',
          success: 'Major exposed personnel are identified. Follow-up quarantine can control the risk.',
          partial: 'Some suspicious personnel are found, but false positives or misses remain.',
          fail: 'The reading collapses. Latent reactors remain in the queue.'
        },
        people: [
          { id: 'A-17', bio: 'Pulse stable / Temp +0.2', act: 'No gaze avoidance', neuro: 'Response delay 0.1s', exposed: false },
          { id: 'B-04', bio: 'Temp +1.4 / Repeating pupil contraction', act: 'Answers before question ends', neuro: 'Response delay 0.8s', exposed: true },
          { id: 'C-22', bio: 'Pulse spike / Hand tremor', act: 'Panic breathing', neuro: 'Neural response normal', exposed: false },
          { id: 'D-09', bio: 'Temp +0.9 / Skin conductance spike', act: 'Repeats same phrase', neuro: 'No auditory response twice', exposed: true },
          { id: 'E-31', bio: 'Temp normal / Oxygen stable', act: 'Follows instruction normally', neuro: 'Response delay 0.2s', exposed: false },
          { id: 'F-12', bio: 'Irregular pulse / Temp +0.7', act: 'Misreads noise direction', neuro: 'Left-right stimulus inversion', exposed: true }
        ]
      }
    }
  };

  function el(id) { return document.getElementById(id); }
  function textPack() { return copy[locale]; }
  function gamePack() { return miniGames[active][locale]; }
  function pickOne(list) { return list[Math.floor(Math.random() * list.length)]; }

  function clearTimer() { if (timer) window.clearInterval(timer); timer = null; }
  function clearMotion() { if (motionTimer) window.clearInterval(motionTimer); motionTimer = null; }

  function setResult(rank) {
    var pack = gamePack();
    result = { rank: rank, text: pack.results[rank] };
    renderResult();
    clearTimer();
    clearMotion();
  }

  function renderResult() {
    var c = textPack();
    el('result-rank').textContent = result.rank === 'READY' ? c.ready : c.ranks[result.rank];
    el('result-text').textContent = result.text || '';
  }

  function startCountdown(seconds, onExpire) {
    clearTimer();
    state.timeLeft = seconds;
    timer = window.setInterval(function(){
      state.timeLeft -= 1;
      var t = el('time-left');
      if (t) t.textContent = state.timeLeft + 's';
      if (state.timeLeft <= 0) {
        clearTimer();
        onExpire();
      }
    }, 1000);
  }

  function renderChrome() {
    var c = textPack();
    document.documentElement.lang = locale;
    document.documentElement.setAttribute('data-locale', locale);
    el('app-title').textContent = c.appTitle;
    el('app-desc').textContent = c.appDesc;
    el('reset-btn').textContent = c.retry;
    el('home-link').textContent = locale === 'ko' ? '본편으로' : 'Back to main';
    el('notes-title').textContent = c.notesTitle;
    el('notes-list').innerHTML = c.notes.map(function(n){ return '<li>' + n + '</li>'; }).join('');
    el('lang-toggle').textContent = locale === 'ko' ? 'EN' : 'KO';

    el('mission-tabs').innerHTML = Object.keys(miniGames).map(function(key){
      var g = miniGames[key];
      var p = g[locale];
      return '<button class="tab ' + (active === key ? 'active' : '') + '" data-tab="' + key + '">' +
        '<strong>' + p.tab + '</strong><span>' + g.id + ' / ' + g.kind + '</span></button>';
    }).join('');
    Array.prototype.forEach.call(document.querySelectorAll('[data-tab]'), function(btn){
      btn.addEventListener('click', function(){
        active = btn.getAttribute('data-tab');
        if (window.location.hash !== '#' + active) window.location.hash = active;
        resetGame();
      });
    });
  }

  function renderMissionHeader() {
    var g = miniGames[active];
    var p = gamePack();
    el('mission-id').textContent = g.id;
    el('mission-kind').textContent = g.kind;
    el('mission-title').textContent = p.title;
    el('mission-intro').textContent = p.intro;
  }

  function renderSignal() {
    var c = textPack();
    state = { mode: 'signal', cursor: 6, dir: 1, safeStart: 60, safeEnd: 71, near: 2.7, locked: false, timeLeft: 15 };
    el('game-stage').innerHTML =
      '<div class="hud-row"><span>' + c.time + ': <b id="time-left">15s</b></span><span>' + c.signalHint + '</span></div>' +
      '<div class="signal-box signal-box-css">' +
      '<div class="signal-track"><div class="wave"></div><div class="wave" style="animation-delay:.2s"></div>' +
      '<div class="signal-near" style="left:' + (state.safeStart - state.near) + '%;width:' + state.near + '%"></div>' +
      '<div class="signal-near" style="left:' + state.safeEnd + '%;width:' + state.near + '%"></div>' +
      '<div class="signal-safe" style="left:' + state.safeStart + '%;width:' + (state.safeEnd - state.safeStart) + '%"></div>' +
      '<div class="signal-cursor" id="signal-cursor" style="left:' + state.cursor + '%"></div></div>' +
      '<div class="control-row signal-actions"><button id="lock-btn" class="terminal-button" aria-label="' + c.lock + '">' + c.lock + '</button></div></div>';

    function score() {
      if (state.cursor >= state.safeStart && state.cursor <= state.safeEnd) return 'success';
      if (state.cursor >= state.safeStart - state.near && state.cursor < state.safeStart) return 'partial';
      if (state.cursor > state.safeEnd && state.cursor <= state.safeEnd + state.near) return 'partial';
      return 'fail';
    }
    function lockSignal() {
      if (state.locked) return;
      state.locked = true;
      setResult(score());
    }
    motionTimer = window.setInterval(function(){
      state.cursor += state.dir * 0.55;
      if (state.cursor >= 100) { state.cursor = 100; state.dir = -1; }
      if (state.cursor <= 0) { state.cursor = 0; state.dir = 1; }
      el('signal-cursor').style.left = state.cursor + '%';
    }, 16);
    el('lock-btn').onclick = lockSignal;
    state.onKey = function(e){ if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); lockSignal(); } };
    startCountdown(15, lockSignal);
  }

  function renderEvidence() {
    var c = textPack();
    var p = gamePack();
    state = { mode: 'evidence', selected: [], timeLeft: 20 };
    el('game-stage').innerHTML =
      '<div class="hud-row"><span>' + c.time + ': <b id="time-left">20s</b></span><span>' + c.pickLimit + ' 3 / <b id="pick-count">0</b> ' + c.selected + '</span></div>' +
      '<div class="evidence-grid">' + p.cards.map(function(card, i){ return '<button class="evidence-card" data-evidence="' + i + '">' + card.text + '</button>'; }).join('') + '</div>' +
      '<div class="control-row"><button id="evidence-lock">' + c.lock + '</button></div>';
    function updateCards(finalized) {
      Array.prototype.forEach.call(document.querySelectorAll('[data-evidence]'), function(btn){
        var idx = Number(btn.getAttribute('data-evidence'));
        var selected = state.selected.indexOf(idx) >= 0;
        btn.classList.toggle('selected', selected && !finalized);
        if (finalized && selected) btn.classList.add(p.cards[idx].good ? 'good' : 'bad');
      });
      el('pick-count').textContent = state.selected.length;
    }
    function score() {
      var good = state.selected.filter(function(idx){ return p.cards[idx].good; }).length;
      if (good === 3 && state.selected.length === 3) return 'great';
      if (good === 2 && state.selected.length === 3) return 'success';
      if (good >= 1) return 'partial';
      return 'fail';
    }
    Array.prototype.forEach.call(document.querySelectorAll('[data-evidence]'), function(btn){
      btn.onclick = function(){
        var idx = Number(btn.getAttribute('data-evidence'));
        var at = state.selected.indexOf(idx);
        if (at >= 0) state.selected.splice(at, 1);
        else if (state.selected.length < 3) state.selected.push(idx);
        updateCards(false);
      };
    });
    el('evidence-lock').onclick = function(){ updateCards(true); setResult(score()); };
    startCountdown(20, function(){ updateCards(true); setResult(score()); });
  }

  function renderSequence() {
    var c = textPack();
    var p = gamePack();
    var protocols = [
      {
        code: 'Q-LOCK / NEGATIVE PRESSURE',
        order: ['AUX ON', 'VENT CLOSE', 'MAIN LOCK', 'PURGE HOLD'],
        buttons: ['MAIN LOCK', 'AUX ON', 'VENT CLOSE', 'RED OFF', 'PURGE HOLD', 'RESET', 'BYPASS', 'COOLANT']
      },
      {
        code: 'BIOSEAL / COOLANT LOOP',
        order: ['COOLANT', 'RED OFF', 'AUX ON', 'MAIN LOCK'],
        buttons: ['AUX ON', 'MAIN LOCK', 'COOLANT', 'BYPASS', 'RED OFF', 'PURGE HOLD', 'VENT', 'RESET']
      },
      {
        code: 'OVERRIDE / PURGE STAGE',
        order: ['RED OFF', 'BYPASS', 'PURGE HOLD', 'COOLANT'],
        buttons: ['RESET', 'RED OFF', 'VENT CLOSE', 'COOLANT', 'AUX ON', 'BYPASS', 'MAIN LOCK', 'PURGE HOLD']
      }
    ];
    var protocol = pickOne(protocols);
    var order = protocol.order;
    state = { mode: 'sequence', step: 0, mistakes: 0, timeLeft: 18, protocol: protocol.code, order: order };
    el('game-stage').innerHTML =
      '<div class="hud-row"><span>' + c.time + ': <b id="time-left">18s</b></span><span>MISTAKES: <b id="mistakes">0</b></span></div>' +
      '<div class="sequence-box"><div class="sequence-code">' + protocol.code + '</div><div class="sequence-instruction">' + order.join(' > ') + '</div>' +
      '<div class="seq-pad">' + protocol.buttons.map(function(label){ return '<button class="seq-button" data-seq="' + label + '">' + label + '</button>'; }).join('') + '</div></div>';
    function finish() {
      if (state.mistakes === 0 && state.timeLeft >= 9) setResult('great');
      else if (state.mistakes <= 1) setResult('success');
      else if (state.mistakes <= 3) setResult('partial');
      else setResult('fail');
    }
    Array.prototype.forEach.call(document.querySelectorAll('[data-seq]'), function(btn){
      btn.onclick = function(){
        var label = btn.getAttribute('data-seq');
        if (label === order[state.step]) {
          btn.classList.add('used');
          state.step += 1;
          if (state.step >= order.length) finish();
        } else {
          state.mistakes += 1;
          el('mistakes').textContent = state.mistakes;
          btn.animate([{ transform: 'translateX(-3px)' }, { transform: 'translateX(3px)' }, { transform: 'translateX(0)' }], { duration: 160 });
        }
      };
    });
    startCountdown(18, function(){ setResult(state.step >= order.length ? 'partial' : 'fail'); });
  }

  function renderBreach() {
    var c = textPack();
    var scenarios = [
      {
        name: 'AUTH NODE 01', start: 'A', exit: 'I', required: 3,
        nodes: [
          { id: 'A', x: 8, y: 54, type: 'START', links: ['B', 'D'] },
          { id: 'B', x: 24, y: 28, type: 'KEY', links: ['A', 'C', 'E'] },
          { id: 'C', x: 44, y: 22, type: 'NOISE', links: ['B', 'F'] },
          { id: 'D', x: 28, y: 72, type: 'MASK', links: ['A', 'E', 'G'] },
          { id: 'E', x: 50, y: 52, type: 'KEY', links: ['B', 'D', 'F', 'H'] },
          { id: 'F', x: 70, y: 32, type: 'TRACE', links: ['C', 'E', 'I'] },
          { id: 'G', x: 52, y: 82, type: 'ECHO', links: ['D', 'H'] },
          { id: 'H', x: 74, y: 66, type: 'KEY', links: ['E', 'G', 'I'] },
          { id: 'I', x: 92, y: 48, type: 'EXIT', links: ['F', 'H'] }
        ]
      },
      {
        name: 'LOCAL MIRROR 07', start: 'A', exit: 'J', required: 3,
        nodes: [
          { id: 'A', x: 9, y: 25, type: 'START', links: ['B', 'D'] },
          { id: 'B', x: 28, y: 18, type: 'NOISE', links: ['A', 'C', 'E'] },
          { id: 'C', x: 48, y: 28, type: 'KEY', links: ['B', 'F'] },
          { id: 'D', x: 18, y: 58, type: 'MASK', links: ['A', 'E', 'G'] },
          { id: 'E', x: 40, y: 52, type: 'ECHO', links: ['B', 'D', 'F', 'H'] },
          { id: 'F', x: 64, y: 40, type: 'KEY', links: ['C', 'E', 'I'] },
          { id: 'G', x: 34, y: 82, type: 'TRACE', links: ['D', 'H'] },
          { id: 'H', x: 58, y: 76, type: 'KEY', links: ['E', 'G', 'J'] },
          { id: 'I', x: 82, y: 32, type: 'MASK', links: ['F', 'J'] },
          { id: 'J', x: 92, y: 66, type: 'EXIT', links: ['H', 'I'] }
        ]
      },
      {
        name: 'QUARANTINE HASH', start: 'A', exit: 'I', required: 3,
        nodes: [
          { id: 'A', x: 10, y: 78, type: 'START', links: ['B', 'C'] },
          { id: 'B', x: 22, y: 50, type: 'KEY', links: ['A', 'D'] },
          { id: 'C', x: 34, y: 84, type: 'NOISE', links: ['A', 'E'] },
          { id: 'D', x: 42, y: 32, type: 'MASK', links: ['B', 'F'] },
          { id: 'E', x: 54, y: 68, type: 'KEY', links: ['C', 'F', 'G'] },
          { id: 'F', x: 60, y: 42, type: 'TRACE', links: ['D', 'E', 'H'] },
          { id: 'G', x: 76, y: 78, type: 'ECHO', links: ['E', 'I'] },
          { id: 'H', x: 78, y: 28, type: 'KEY', links: ['F', 'I'] },
          { id: 'I', x: 92, y: 54, type: 'EXIT', links: ['G', 'H'] }
        ]
      }
    ];
    var scenario = pickOne(scenarios);
    state = {
      mode: 'breach',
      current: scenario.start,
      visited: [scenario.start],
      keys: 0,
      exposure: 14,
      scenario: scenario.name,
      required: scenario.required,
      timeLeft: 22,
      nodes: scenario.nodes,
      exit: scenario.exit,
      lastType: 'START'
    };
    el('game-stage').innerHTML =
      '<div class="hud-row"><span>' + c.time + ': <b id="time-left">22s</b></span><span>' + scenario.name + ' / KEY: <b id="breach-keys">0/' + scenario.required + '</b> / EXPOSURE: <b id="breach-exposure">14%</b></span></div>' +
      '<div class="breach-network"><div class="breach-map" id="breach-map"></div>' +
      '<div class="breach-side"><div class="breach-status"><b>OBJECTIVE</b><p>' + (locale === 'ko' ? 'KEY 3개 확보 후 EXIT로 탈출' : 'Collect 3 KEY nodes, then exit') + '</p></div><div class="breach-status"><b>NODE TYPES</b><p>KEY / MASK / ECHO / NOISE / TRACE / EXIT</p></div></div></div>';

    function getNode(id) {
      return state.nodes.filter(function(node){ return node.id === id; })[0];
    }
    function draw() {
      el('breach-keys').textContent = state.keys + '/' + state.required;
      el('breach-exposure').textContent = Math.round(state.exposure) + '%';
      var current = getNode(state.current);
      var links = [];
      state.nodes.forEach(function(node){
        node.links.forEach(function(target){
          if (node.id < target) {
            var other = getNode(target);
            links.push('<line x1="' + node.x + '%" y1="' + node.y + '%" x2="' + other.x + '%" y2="' + other.y + '%" />');
          }
        });
      });
      var nodes = state.nodes.map(function(node){
        var reachable = current.links.indexOf(node.id) >= 0;
        var visited = state.visited.indexOf(node.id) >= 0;
        return '<button class="breach-node ' + node.type.toLowerCase() + (node.id === state.current ? ' current' : '') + (reachable ? ' reachable' : '') + (visited ? ' visited' : '') + '" style="left:' + node.x + '%;top:' + node.y + '%" data-node="' + node.id + '">' +
          '<strong>' + node.id + '</strong><span>' + node.type + '</span></button>';
      }).join('');
      el('breach-map').innerHTML = '<svg class="breach-links" viewBox="0 0 100 100" preserveAspectRatio="none">' + links.join('') + '</svg>' + nodes +
        '<div class="breach-meter"><span style="width:' + state.exposure + '%"></span></div>';
      Array.prototype.forEach.call(document.querySelectorAll('[data-node]'), function(btn){
        btn.onclick = function(){
          moveNode(btn.getAttribute('data-node'));
        };
      });
    }
    function applyNode(node) {
      var firstVisit = state.visited.indexOf(node.id) < 0;
      state.exposure += 7;
      if (node.type === 'KEY' && firstVisit) state.keys += 1;
      if (node.type === 'MASK') state.exposure -= 18;
      if (node.type === 'NOISE') state.exposure += 18;
      if (node.type === 'TRACE') state.exposure += 28;
      if (node.type === 'ECHO') {
        if (state.lastType === 'KEY' && firstVisit) state.keys += 1;
        if (state.lastType === 'MASK') state.exposure -= 10;
      }
      state.exposure = Math.max(0, Math.min(100, state.exposure));
      state.lastType = node.type;
    }
    function finish(exitReached) {
      if (!exitReached) {
        if (state.keys >= 2 && state.exposure < 100) return setResult('partial');
        return setResult('fail');
      }
      if (state.keys >= state.required && state.exposure <= 45) return setResult('great');
      if (state.keys >= state.required) return setResult('success');
      if (state.keys >= 2) return setResult('partial');
      setResult('fail');
    }
    function moveNode(id) {
      var current = getNode(state.current);
      if (current.links.indexOf(id) < 0) return;
      var next = getNode(id);
      state.current = id;
      applyNode(next);
      if (state.visited.indexOf(id) < 0) state.visited.push(id);
      draw();
      if (state.exposure >= 100) return finish(false);
      if (next.type === 'EXIT') return finish(true);
    }
    draw();
    startCountdown(22, function(){ finish(false); });
  }

  function renderSample() {
    var c = textPack();
    state = {
      mode: 'sample',
      probe: 28,
      specimen: 62,
      specimenDir: -1,
      capture: 0,
      overload: 12,
      hold: false,
      timeLeft: 18,
      locked: false
    };
    el('game-stage').innerHTML =
      '<div class="hud-row"><span>' + c.time + ': <b id="time-left">18s</b></span><span>' + (locale === 'ko' ? '버튼을 누르면 탐침이 상승, 떼면 하강합니다. 샘플에 겹쳐 회수율을 채우세요.' : 'Hold to raise the probe, release to sink. Track the specimen to build recovery.') + '</span></div>' +
      '<div class="sample-box fishing-sample"><div class="sample-tank" id="sample-tank">' +
      '<div class="sample-band"></div><div class="sample-specimen" id="sample-specimen"></div><div class="sample-probe" id="sample-probe"></div></div>' +
      '<div class="sample-bars"><div><span>RECOVERY</span><div class="mini-bar"><i id="capture-bar"></i></div></div><div><span>OVERLOAD</span><div class="mini-bar overload"><i id="overload-bar"></i></div></div></div>' +
      '<button id="sample-lock" class="primary sample-button">' + (locale === 'ko' ? '회수 장비 작동' : 'Operate Extractor') + '</button></div>';
    function finishByProgress() {
      if (state.capture >= 96 && state.overload < 45) setResult('great');
      else if (state.capture >= 96) setResult('success');
      else if (state.capture >= 55) setResult('partial');
      else setResult('fail');
    }
    function setHold(value) {
      state.hold = value;
      el('sample-lock').classList.toggle('holding', value);
    }
    motionTimer = window.setInterval(function(){
      if (state.locked) return;
      state.probe += state.hold ? 1.35 : -0.95;
      state.probe = Math.max(6, Math.min(94, state.probe));
      state.specimen += state.specimenDir * (0.55 + Math.sin(Date.now() / 280) * 0.18);
      if (state.specimen <= 18) { state.specimen = 18; state.specimenDir = 1; }
      if (state.specimen >= 84) { state.specimen = 84; state.specimenDir = -1; }
      var overlap = Math.abs(state.probe - state.specimen) <= 8;
      if (overlap) state.capture = Math.min(100, state.capture + 1.8);
      else state.capture = Math.max(0, state.capture - 0.45);
      state.overload += state.hold ? 0.9 : -0.65;
      if (overlap) state.overload += 0.2;
      state.overload = Math.max(0, Math.min(100, state.overload));
      el('sample-probe').style.left = state.probe + '%';
      el('sample-specimen').style.left = state.specimen + '%';
      el('sample-tank').classList.toggle('locked', overlap);
      el('capture-bar').style.width = state.capture + '%';
      el('overload-bar').style.width = state.overload + '%';
      if (state.overload >= 98) { state.locked = true; setResult('fail'); }
      if (state.capture >= 100) { state.locked = true; finishByProgress(); }
    }, 40);
    el('sample-lock').onmousedown = function(){ setHold(true); };
    el('sample-lock').onmouseup = function(){ setHold(false); };
    el('sample-lock').onmouseleave = function(){ setHold(false); };
    el('sample-lock').ontouchstart = function(e){ e.preventDefault(); setHold(true); };
    el('sample-lock').ontouchend = function(e){ e.preventDefault(); setHold(false); };
    state.onKey = function(e){ if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setHold(true); } };
    state.onKeyUp = function(e){ if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setHold(false); } };
    startCountdown(18, function(){ state.locked = true; finishByProgress(); });
  }

  function renderScan() {
    var c = textPack();
    var layouts = [
      { target: { x: 68, y: 42 }, decoys: [{ x: 24, y: 32 }, { x: 46, y: 72 }, { x: 82, y: 70 }] },
      { target: { x: 34, y: 66 }, decoys: [{ x: 64, y: 28 }, { x: 76, y: 54 }, { x: 20, y: 22 }] },
      { target: { x: 78, y: 68 }, decoys: [{ x: 32, y: 38 }, { x: 56, y: 48 }, { x: 18, y: 74 }] }
    ];
    var layout = pickOne(layouts);
    state = { mode: 'scan', target: layout.target, decoys: layout.decoys, scan: { x: 50, y: 50 }, hold: 0, tracking: false, timeLeft: 18 };
    el('game-stage').innerHTML =
      '<div class="hud-row"><span>' + c.time + ': <b id="time-left">18s</b></span><span>' + (locale === 'ko' ? '스캐너를 움직여 이상 반응을 1초간 유지' : 'Move the scanner and hold on the anomaly for 1s') + '</span></div>' +
      '<div class="scan-field" id="scan-field"><div class="scan-hotspot" style="left:' + state.target.x + '%;top:' + state.target.y + '%"></div>' +
      state.decoys.map(function(d){ return '<div class="scan-decoy" style="left:' + d.x + '%;top:' + d.y + '%"></div>'; }).join('') +
      '<div class="scan-ring" id="scan-ring"></div><div class="scan-lock" id="scan-lock">SIGNAL 0%</div></div>';
    function updateScanner(evt) {
      var rect = el('scan-field').getBoundingClientRect();
      var x = ((evt.clientX - rect.left) / rect.width) * 100;
      var y = ((evt.clientY - rect.top) / rect.height) * 100;
      state.scan.x = Math.max(0, Math.min(100, x));
      state.scan.y = Math.max(0, Math.min(100, y));
      el('scan-field').style.setProperty('--scan-x', state.scan.x + '%');
      el('scan-field').style.setProperty('--scan-y', state.scan.y + '%');
    }
    function tickScan() {
      var dist = Math.sqrt(Math.pow(state.scan.x - state.target.x, 2) + Math.pow(state.scan.y - state.target.y, 2));
      var decoyHit = state.decoys.some(function(d){ return Math.sqrt(Math.pow(state.scan.x - d.x, 2) + Math.pow(state.scan.y - d.y, 2)) < 9; });
      if (dist < 9) state.hold += 1;
      else if (decoyHit) state.hold = Math.max(0, state.hold - 1);
      else state.hold = Math.max(0, state.hold - 0.35);
      var percent = Math.min(100, state.hold * 10);
      el('scan-lock').textContent = 'SIGNAL ' + percent + '%';
      el('scan-lock').classList.toggle('active', percent > 0);
      el('scan-ring').classList.toggle('locked', dist < 9);
      el('scan-ring').classList.toggle('decoy', decoyHit && dist >= 9);
      if (state.hold >= 10) setResult(dist < 4 ? 'great' : 'success');
    }
    function beginScan(evt) {
      updateScanner(evt);
      state.tracking = true;
    }
    function endScan() { state.tracking = false; }
    el('scan-field').onmousemove = updateScanner;
    el('scan-field').onmousedown = beginScan;
    el('scan-field').onmouseup = endScan;
    el('scan-field').onmouseleave = endScan;
    el('scan-field').ontouchstart = function(evt){ beginScan(evt.touches[0]); evt.preventDefault(); };
    el('scan-field').ontouchmove = function(evt){ updateScanner(evt.touches[0]); evt.preventDefault(); };
    el('scan-field').ontouchend = function(evt){ endScan(); evt.preventDefault(); };
    motionTimer = window.setInterval(tickScan, 100);
    startCountdown(18, function(){ setResult('fail'); });
  }

  function renderLog() {
    var c = textPack();
    var p = gamePack();
    var shuffled = [p.order[2], p.order[0], p.order[3], p.order[1]];
    state = { mode: 'log', picked: [], timeLeft: 20 };
    el('game-stage').innerHTML =
      '<div class="hud-row"><span>' + c.time + ': <b id="time-left">20s</b></span><span>' + (locale === 'ko' ? '시간 순서대로 선택' : 'Select chronological order') + '</span></div>' +
      '<div class="log-grid">' + shuffled.map(function(line, i){ return '<button class="log-piece" data-log="' + i + '">' + line + '</button>'; }).join('') + '</div>';
    function finish() {
      var correct = state.picked.filter(function(line, i){ return line === p.order[i]; }).length;
      if (correct === 4) setResult('great');
      else if (correct === 3) setResult('success');
      else if (correct >= 2) setResult('partial');
      else setResult('fail');
    }
    Array.prototype.forEach.call(document.querySelectorAll('[data-log]'), function(btn){
      btn.onclick = function(){
        if (btn.classList.contains('used')) return;
        btn.classList.add('used');
        btn.textContent = (state.picked.length + 1) + ' // ' + btn.textContent;
        state.picked.push(shuffled[Number(btn.getAttribute('data-log'))]);
        if (state.picked.length === 4) finish();
      };
    });
    startCountdown(20, finish);
  }

  function renderRoute() {
    var c = textPack();
    var sheets = [
      { pos: 20, goal: 4, moves: 9, danger: [7, 12, 17], block: [1, 6, 16], jammer: [13] },
      { pos: 24, goal: 0, moves: 10, danger: [8, 13, 18], block: [3, 4, 14], jammer: [11, 17] },
      { pos: 22, goal: 2, moves: 8, danger: [6, 7, 18], block: [10, 15, 20], jammer: [12] }
    ];
    var sheet = pickOne(sheets);
    state = { mode: 'route', pos: sheet.pos, moves: sheet.moves, startMoves: sheet.moves, goal: sheet.goal, danger: sheet.danger, block: sheet.block, jammer: sheet.jammer };
    el('game-stage').innerHTML =
      '<div class="hud-row"><span>MOVES: <b id="moves-left">' + state.moves + '</b></span><span>' + (locale === 'ko' ? '빨강은 접촉 즉시 실패, 회색은 막힌 구역, 노랑은 이동 방해' : 'Red fails on contact, gray is blocked, amber drains moves') + '</span></div>' +
      '<div class="route-grid">' + Array.from({length:25}).map(function(_, i){ return '<button class="route-cell" data-cell="' + i + '"></button>'; }).join('') + '</div>';
    function draw() {
      Array.prototype.forEach.call(document.querySelectorAll('[data-cell]'), function(btn){
        var idx = Number(btn.getAttribute('data-cell'));
        btn.className = 'route-cell';
        btn.disabled = false;
        if (state.danger.indexOf(idx) >= 0) btn.classList.add('danger');
        if (state.block.indexOf(idx) >= 0) { btn.classList.add('blocked'); btn.disabled = true; }
        if (state.jammer.indexOf(idx) >= 0) btn.classList.add('jammer');
        if (idx === state.goal) btn.classList.add('goal');
        if (idx === state.pos) btn.classList.add('player');
      });
      el('moves-left').textContent = state.moves;
    }
    function finish(success) {
      if (!success) return setResult('fail');
      if (state.moves >= Math.ceil(state.startMoves / 2)) setResult('great');
      else setResult('success');
    }
    function move(to) {
      var px = state.pos % 5, py = Math.floor(state.pos / 5);
      var tx = to % 5, ty = Math.floor(to / 5);
      if (Math.abs(px - tx) + Math.abs(py - ty) !== 1) return;
      if (state.block.indexOf(to) >= 0) return;
      state.pos = to;
      state.moves -= state.jammer.indexOf(to) >= 0 ? 2 : 1;
      if (state.danger.indexOf(to) >= 0) { draw(); return finish(false); }
      draw();
      if (to === state.goal) finish(true);
      else if (state.moves <= 0) finish(false);
    }
    Array.prototype.forEach.call(document.querySelectorAll('[data-cell]'), function(btn){
      btn.onclick = function(){ move(Number(btn.getAttribute('data-cell'))); };
    });
    draw();
  }

  function renderTestimony() {
    var p = gamePack();
    state = { mode: 'testimony', picked: null, timeLeft: 20 };
    el('game-stage').innerHTML =
      '<div class="hud-row"><span>' + textPack().time + ': <b id="time-left">20s</b></span><span>' + (locale === 'ko' ? '모순 진술 선택' : 'Choose contradiction') + '</span></div>' +
      '<div class="testimony-list">' + p.lines.map(function(line, i){ return '<button class="testimony-card" data-testimony="' + i + '">' + line + '</button>'; }).join('') + '</div>';
    Array.prototype.forEach.call(document.querySelectorAll('[data-testimony]'), function(btn){
      btn.onclick = function(){
        var idx = Number(btn.getAttribute('data-testimony'));
        state.picked = idx;
        btn.classList.add(idx === p.answer ? 'good' : 'bad');
        if (idx === p.answer) setResult('great');
        else if (idx === 3) setResult('partial');
        else setResult('fail');
      };
    });
    startCountdown(20, function(){ setResult('fail'); });
  }

  function renderScreening() {
    var c = textPack();
    var p = gamePack();
    var people = p.people.slice().sort(function(){ return Math.random() - 0.5; });
    state = { mode: 'screening', selected: [], people: people, timeLeft: 22 };
    el('game-stage').innerHTML =
      '<div class="hud-row"><span>' + c.time + ': <b id="time-left">22s</b></span><span>' + (locale === 'ko' ? '의심 인원 최대 3명 지정' : 'Flag up to 3 suspicious personnel') + '</span></div>' +
      '<div class="screening-grid">' + people.map(function(person, i){
        return '<button class="screen-card" data-screen="' + i + '"><b>' + person.id + '</b><span>' + person.bio + '</span><span>' + person.act + '</span><span>' + person.neuro + '</span></button>';
      }).join('') + '</div>' +
      '<div class="control-row"><button id="screen-lock" class="primary">' + (locale === 'ko' ? '격리 지정 확정' : 'Confirm Isolation') + '</button></div>';
    function draw(reveal) {
      Array.prototype.forEach.call(document.querySelectorAll('[data-screen]'), function(btn){
        var idx = Number(btn.getAttribute('data-screen'));
        var person = people[idx];
        btn.classList.toggle('selected', state.selected.indexOf(idx) >= 0);
        btn.classList.toggle('good', reveal && person.exposed);
        btn.classList.toggle('bad', reveal && !person.exposed && state.selected.indexOf(idx) >= 0);
      });
    }
    function score() {
      var exposed = people.map(function(person, i){ return person.exposed ? i : null; }).filter(function(v){ return v !== null; });
      var correct = state.selected.filter(function(i){ return people[i].exposed; }).length;
      var falsePositive = state.selected.length - correct;
      var missed = exposed.length - correct;
      draw(true);
      if (correct === exposed.length && falsePositive === 0) setResult('great');
      else if (correct >= 2 && falsePositive <= 1 && missed <= 1) setResult('success');
      else if (correct >= 1) setResult('partial');
      else setResult('fail');
    }
    Array.prototype.forEach.call(document.querySelectorAll('[data-screen]'), function(btn){
      btn.onclick = function(){
        var idx = Number(btn.getAttribute('data-screen'));
        var at = state.selected.indexOf(idx);
        if (at >= 0) state.selected.splice(at, 1);
        else if (state.selected.length < 3) state.selected.push(idx);
        draw(false);
      };
    });
    el('screen-lock').onclick = score;
    startCountdown(22, score);
  }

  function resetGame() {
    clearTimer();
    clearMotion();
    window.removeEventListener('keydown', keyHandler);
    window.removeEventListener('keyup', keyUpHandler);
    result = { rank: 'READY', text: '' };
    renderChrome();
    renderMissionHeader();
    if (active === 'signal') renderSignal();
    if (active === 'evidence') renderEvidence();
    if (active === 'sequence') renderSequence();
    if (active === 'breach') renderBreach();
    if (active === 'sample') renderSample();
    if (active === 'scan') renderScan();
    if (active === 'log') renderLog();
    if (active === 'route') renderRoute();
    if (active === 'testimony') renderTestimony();
    if (active === 'screening') renderScreening();
    renderResult();
    window.addEventListener('keydown', keyHandler);
    window.addEventListener('keyup', keyUpHandler);
  }

  function keyHandler(e) { if (state && typeof state.onKey === 'function') state.onKey(e); }
  function keyUpHandler(e) { if (state && typeof state.onKeyUp === 'function') state.onKeyUp(e); }

  el('lang-toggle').onclick = function(){ locale = locale === 'ko' ? 'en' : 'ko'; resetGame(); };
  el('reset-btn').onclick = resetGame;

  window.render_game_to_text = function(){
    return JSON.stringify({ locale: locale, active: active, mission: miniGames[active].id, mode: state.mode, timeLeft: state.timeLeft, state: state, result: result });
  };

  window.advanceTime = function(ms) {
    if (!state || !state.timeLeft) return;
    var seconds = Math.floor(ms / 1000);
    state.timeLeft = Math.max(0, state.timeLeft - seconds);
    var t = el('time-left');
    if (t) t.textContent = state.timeLeft + 's';
  };

  var requested = window.location.hash.replace('#', '');
  if (miniGames[requested]) active = requested;
  window.addEventListener('hashchange', function(){
    var next = window.location.hash.replace('#', '');
    if (miniGames[next] && next !== active) {
      active = next;
      resetGame();
    }
  });

  resetGame();
})();
