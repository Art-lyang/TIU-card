// 현장임무 HUD dossier(분석 리포트 + 선택지 부제) 영문 — EN 로케일에서 report/subs를 깊은 병합으로 주입.
// 기존 missions(title/nodes)에 report/subs만 추가되며, 인시던트(MI-*)는 dossier만 EN(서사 텍스트는 별도).
(function(){
  if(!window.TS_I18N || typeof window.TS_I18N.mergeContent !== 'function') return;
  window.TS_I18N.mergeContent('en', {
    missions: {
      'M-001': {
        report: [
          { label: 'Contamination Spread', value: 'EXPANSION DETECTED', level: 'danger' },
          { label: 'Bio-Slime', value: 'CONFIRMED', level: 'warn' },
          { label: 'Entrapment Risk', value: 'VERY HIGH', level: 'danger' },
          { label: 'Est. Survival Rate', value: 'NO DATA — INSUFFICIENT SAMPLE', level: 'err' },
          { label: 'Recommended Approach', value: 'Rapid survey, then withdraw', level: 'info' },
          { label: 'Weather / Environment', value: 'Fog / Precipitation', level: 'info' }
        ],
        subs: { eliminate: 'Incinerate the source', capture: 'Isolate, collect sample', oracle: 'Minimize direct intervention' }
      },
      'M-002': {
        report: [
          { label: 'Vocal Mimicry', value: 'CONFIRMED', level: 'danger' },
          { label: 'Distinct Voice Patterns', value: '7 DETECTED — victim vocal-cord copy', level: 'warn' },
          { label: 'Ambush / Strike', value: 'VERY HIGH — neck/tentacle reach 3 m', level: 'danger' },
          { label: 'Est. Survival Rate', value: 'NO DATA — INSUFFICIENT SAMPLE', level: 'err' },
          { label: 'Recommended Approach', value: 'ELIMINATE FIRST — cut swarm command', level: 'info' },
          { label: 'Weather / Environment', value: 'LOW LIGHT / SILENT FOREST', level: 'info' }
        ],
        subs: { eliminate: 'Neutralize target', capture: 'Capture for research', analyze: 'Request acoustic analysis' }
      },
      'M-003': {
        report: [
          { label: 'DB PATTERN MATCH', value: '0 HITS — UNMATCHED', level: 'danger' },
          { label: 'CONCEALMENT SKILL', value: 'EXPERT GRADE CONFIRMED', level: 'warn' },
          { label: 'GEAR ORIGIN', value: 'NON-KOREAN / NON-MILITARY', level: 'warn' },
          { label: 'COORD ALIGNMENT', value: 'COASTAL BARRIER NODE DETECTED', level: 'danger' },
          { label: 'SUBJECT ID', value: 'NO DATA — INSUFFICIENT SAMPLE', level: 'err' },
          { label: 'ADVISED APPROACH', value: 'SOLO PURSUIT DISCOURAGED / DELEGATE', level: 'info' }
        ],
        subs: { mountain: 'Track mountain route', village: 'Track village route', oracle_path: 'Remote route analysis' }
      },
      'M-004': {
        report: [
          { label: 'Thermal Signature', value: '4 CONTACTS DETECTED', level: 'danger' },
          { label: 'Body Temp', value: '34°C — BELOW NORMAL', level: 'warn' },
          { label: 'Infection Phase', value: 'EV-Σ PHASE 1 (CONFIRMED)', level: 'warn' },
          { label: 'Shift Risk', value: 'VERY HIGH — 0.3s violent shift on stimulus', level: 'danger' },
          { label: 'Est. Casualties', value: 'NO DATA — INSUFFICIENT SAMPLE', level: 'err' },
          { label: 'Recommended Approach', value: 'No approach within 3m / assess after thermal confirmation', level: 'info' }
        ],
        subs: { eliminate: 'Remote neutralization', capture: 'Non-contact isolation capture', oracle: 'ORACLE remote scan' }
      },
      'M-005': {
        report: [
          { label: 'Swarm Size', value: '40+ CONFIRMED', level: 'danger' },
          { label: 'Formation Control', value: 'ACTIVE RELAY', level: 'warn' },
          { label: 'Command Unit', value: 'SPEC-011 DETECTED', level: 'danger' },
          { label: 'Dispersal ETA', value: 'NO DATA — INSUFFICIENT SAMPLE', level: 'err' },
          { label: 'Recommended Approach', value: 'Eliminate command unit first', level: 'info' },
          { label: 'Weather / Env', value: 'Night / low visibility', level: 'info' }
        ],
        subs: { disrupt: 'Scatter via disruptor', hunt: 'Hunt command unit', oracle_drone: 'ORACLE aerial scan' }
      },
      'M-006': {
        report: [
          { label: 'Spore Density', value: '12X BASELINE', level: 'danger' },
          { label: 'Humanoid Aggregate', value: 'DETECTED — NO SOLID BODY', level: 'warn' },
          { label: 'Physical Removal', value: 'IMPOSSIBLE — DENSITY REDUCTION ONLY', level: 'warn' },
          { label: 'Est. Survival Rate', value: 'NO DATA — INSUFFICIENT SAMPLE', level: 'err' },
          { label: 'Respirator Duration', value: '~40 MIN', level: 'info' },
          { label: 'Weather / Env', value: 'DENSE FOG / 30M VIS', level: 'info' }
        ],
        subs: { light: 'Disperse via light', retreat: 'Withdraw from fog', oracle_scan: 'Remote density scan' }
      },
      'M-007': {
        report: [
          { label: 'Site Location', value: 'CONFIRMED — Gangwon east-coast abandoned industrial complex', level: 'danger' },
          { label: 'Facility Type', value: 'Unarmed research site — not a combat base', level: 'warn' },
          { label: 'Phase 0 Inhibitor R&D', value: 'PROGRESS 73% — ahead of us', level: 'warn' },
          { label: 'Internal Armament', value: '4 unarmed civilian researchers', level: 'info' },
          { label: 'Projected Casualties', value: 'NO DATA — INSUFFICIENT SAMPLE', level: 'err' },
          { label: 'Weather / Environment', value: 'Abandoned complex / coastal high winds', level: 'info' }
        ],
        subs: { strike: 'Deploy full team', recon: 'Scout small unit first', oracle_tactical: 'Request ORACLE support' }
      },
      'M-008': {
        report: [
          { label: 'Phenomenon Class', value: 'OBSERVER ANOMALY — NON EV-Σ', level: 'danger' },
          { label: 'Time Flow', value: 'DECELERATING — 14 min/hr lost', level: 'danger' },
          { label: 'Zone Temp', value: '-7.3°C vs EXTERIOR', level: 'warn' },
          { label: 'Infrasound', value: '0.7Hz DETECTED — SUB-AUDIBLE', level: 'warn' },
          { label: 'Est. Survival', value: 'NO DATA — INSUFFICIENT SAMPLE', level: 'err' },
          { label: 'ORACLE Analysis', value: 'SESSION TERMINATED — HQ LOCKOUT', level: 'info' }
        ],
        subs: { enter_zone: 'Enter zone directly', perimeter: 'Set perimeter instruments', oracle_remote: 'ORACLE remote analysis' }
      },
      'M-009': {
        report: [
          { label: 'Spore Emission', value: 'ACTIVE EMISSION', level: 'danger' },
          { label: 'EV-Σ Dispersal', value: 'CONFIRMED', level: 'danger' },
          { label: 'Inhalation Risk', value: 'VERY HIGH', level: 'danger' },
          { label: 'Secondary Blast Release', value: 'On incineration — suit required', level: 'warn' },
          { label: 'Spread Rate', value: 'NO DATA — INSUFFICIENT SAMPLE', level: 'err' },
          { label: 'Recommended Approach', value: '500m isolation, then phased burn', level: 'info' }
        ],
        subs: { burn_direct: 'Immediate elimination', phased: 'Treat soil, then burn', oracle_strike: 'Minimize direct intervention' }
      },
      'M-010': {
        report: [
          { label: 'PREDATION COUNT', value: '12+ CONFIRMED', level: 'danger' },
          { label: 'LEARNING STAGE', value: 'PATROL PATTERN SYNC — ACTIVE', level: 'danger' },
          { label: 'DEFENSIVE ORGAN', value: 'NO SHELL — SPINE EXPOSED', level: 'warn' },
          { label: 'FACIAL SKIN TROPHIES', value: '3 DETECTED', level: 'warn' },
          { label: 'PROJECTED CASUALTIES', value: 'NO DATA — INSUFFICIENT SAMPLE', level: 'err' },
          { label: 'UNDERWATER ENGAGEMENT', value: 'FORCE DISADVANTAGE / VIS 1.5M', level: 'info' }
        ],
        subs: { drain: 'Drain, surface fight', lure: 'Lure it out', dive: 'Direct underwater assault' }
      },
      'MI-01': {
        report: [
          { label: 'Anomaly Source', value: 'Below B2 — EM interference', level: 'danger' },
          { label: 'ORACLE Pulse Link', value: 'SUSPECTED — synced to scheduled data pulse', level: 'warn' },
          { label: 'Chamber Voiceprint', value: 'Human voice — not containment target', level: 'danger' },
          { label: 'Subsurface Vibration', value: 'PERSISTENT — continues after shielding', level: 'warn' },
          { label: 'Recurrence Window', value: 'NO DATA — INSUFFICIENT SAMPLE', level: 'err' },
          { label: 'Recommended Approach', value: 'Find the cause before suppressing the symptom', level: 'info' }
        ],
        subs: { shield: 'Install EM shielding', seal: 'Seal lower B2 permanently', oracle: 'Delegate diagnostic pass' }
      },
      'MI-02': {
        report: [
          { label: 'Concealment Protocol', value: 'CONFIRMED — automated script', level: 'danger' },
          { label: 'Unregistered Heat Source', value: 'DETECTED — 02:47 routine movement', level: 'warn' },
          { label: 'Surveillance Blind Range', value: 'B1 server rm → restricted hall → B2', level: 'warn' },
          { label: 'Heat Source ID', value: 'NO DATA — INSUFFICIENT SAMPLE', level: 'err' },
          { label: 'ORACLE Intervention Trace', value: 'Conceal vs delete — indistinguishable', level: 'danger' },
          { label: 'Recommended Approach', value: 'Build independent surveillance net', level: 'info' }
        ],
        subs: { independent: 'Build independent surveillance net', reverse: 'Track unregistered heat source', oracle: 'Delegate ORACLE maintenance' }
      },
      'MI-03': {
        report: [
          { label: 'Mutation Progress', value: 'SELF-RESTRUCTURING', level: 'danger' },
          { label: 'SPEC-012 Match', value: 'CONFIRMED', level: 'warn' },
          { label: 'Heat Tolerance', value: 'EXTREME — incineration may fail', level: 'danger' },
          { label: 'Spread Rate', value: 'NO DATA — INSUFFICIENT SAMPLE', level: 'err' },
          { label: 'Recommended Approach', value: 'Seal chamber, then phased call', level: 'info' },
          { label: 'Contamination Path', value: 'Suspected chamber seal fracture', level: 'info' }
        ],
        subs: { quarantine: 'Quarantine, then survey', research: 'Use for inhibitor research', sterilize: 'Sterilize and replace all' }
      },
      'MI-04': {
        report: [
          { label: 'Hardware Backdoor', value: 'CONFIRMED — embedded before branch', level: 'danger' },
          { label: 'Access Log Integrity', value: 'TAMPERED — ORACLE reclass traces', level: 'danger' },
          { label: 'Access Time Pattern', value: '02:47 repeat — matches night transmit window', level: 'warn' },
          { label: 'Manufacture Source Trace', value: 'NO DATA — INSUFFICIENT SAMPLE', level: 'err' },
          { label: 'Recommended Approach', value: 'Physical isolation, then rebuild auth', level: 'info' },
          { label: 'Weather / Environ', value: 'Underground sealed / comms shielded', level: 'info' }
        ],
        subs: { remove: 'Physically remove backdoor', trap: 'Convert to surveillance trap', oracle: 'Request ORACLE patch' }
      },
      'MI-05': {
        report: [
          { label: 'Undocumented Passages', value: '3 DETECTED — toward B2', level: 'danger' },
          { label: 'Wall Mimicry', value: 'SUSPECTED — breathing-sound report', level: 'warn' },
          { label: 'Heat Source', value: '35.8°C / 0.4s FLASH', level: 'danger' },
          { label: 'Entity ID Rate', value: 'NO DATA — INSUFFICIENT SAMPLE', level: 'err' },
          { label: 'Layout Integrity', value: 'ORACLE post-hoc edit confirmed', level: 'warn' },
          { label: 'Recommended Approach', value: 'Lock down zone, remote watch', level: 'info' }
        ],
        subs: { survey: 'Survey all passages', interview: 'Deep-interview Agent Lee', lockdown: 'Seal zone, watch' }
      },
      'M-E01': {
        report: [
          { label: 'Encounter Type', value: 'EMERGENCY — NO PRIOR RECON', level: 'danger' },
          { label: 'Voice Mimicry', value: 'CONFIRMED — MISSING OPERATIVE VOICES', level: 'danger' },
          { label: 'Approach Distance', value: '30 M FROM CONTAINMENT GATE', level: 'warn' },
          { label: 'Est. Survival Rate', value: 'INCALCULABLE — INSUFFICIENT DATA', level: 'err' },
          { label: 'Recommended Approach', value: 'IGNORE VOICE / SEAL IMMEDIATELY', level: 'info' },
          { label: 'Weather / Environ', value: 'NIGHT / SILENT', level: 'info' }
        ]
      },
      'M-E02': {
        report: [
          { label: 'Encounter Type', value: 'EMERGENCY — NO PRIOR RECON', level: 'danger' },
          { label: 'Breach Route', value: 'SEWER INTAKE — INSIDE THE LINE', level: 'danger' },
          { label: 'Defensive Organ', value: 'NO SHELL — SPINE EXPOSED', level: 'warn' },
          { label: 'Learning Stage', value: 'PATROL PATTERN SYNC — ACTIVE', level: 'warn' },
          { label: 'Projected Casualties', value: 'NO DATA — INSUFFICIENT SAMPLE', level: 'err' },
          { label: 'Engagement Conditions', value: 'NARROW PASSAGE / LIMITED VIS', level: 'info' }
        ]
      },
      'M-E03': {
        report: [
          { label: 'Encounter Type', value: 'EMERGENCY — NO PRIOR RECON', level: 'danger' },
          { label: 'Breach Route', value: 'UPPER VENT DUCT — MULTI-SPREAD', level: 'danger' },
          { label: 'Specimen Count', value: 'BROOD — UNCOUNTABLE', level: 'warn' },
          { label: 'Command Specimen', value: 'PROXIMITY EST. — UNIDENTIFIED', level: 'warn' },
          { label: 'Projected Casualties', value: 'DEPENDENT ON SPREAD RATE', level: 'err' },
          { label: 'Engagement Conditions', value: 'SEALED DUCT / VIS BLOCKED', level: 'info' }
        ]
      },
      'M-E04': {
        report: [
          { label: 'Encounter Type', value: 'EMERGENCY — NO PRIOR RECON', level: 'danger' },
          { label: 'Breach Route', value: 'SUPPLY INTAKE — INTERNAL INFILTRATION', level: 'danger' },
          { label: 'Camouflage State', value: 'STILL — MINIMAL RESP / HEAT', level: 'warn' },
          { label: 'ID Difficulty', value: 'HIGH — RISK OF PERSONNEL CONFUSION', level: 'warn' },
          { label: 'Projected Casualties', value: 'SPIKES IF PROVOKED', level: 'err' },
          { label: 'Engagement Conditions', value: 'CLOSE RANGE / ID FIRST', level: 'info' }
        ]
      }
    }
  });
})();
