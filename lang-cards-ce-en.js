// lang-cards-ce-en.js - English overlays for CE route cards and authored result toasts.
(function(){
if(!window.TS_I18N||typeof window.TS_I18N.mergeContent!=='function')return;

function ceMsg(n){
  return "The terminal screen goes black for 0.5 seconds.\n\nText appears in an unspecified typeface:\n\n'Observed " + n + " authority uses. Acquiring new data each session.\nObservation continues.'\n\n[ORACLE: Output error - corresponding log entry does not exist. Ignoring is recommended.]";
}

window.TS_I18N.mergeContent('en', {
  cards: {
    "CE-001": { msg: "During a night inspection, an unregistered string appears on the ORACLE terminal for 0.2 seconds. Technical Officer Lim Jae-hyeok successfully captures it.", leftLabel: "Order immediate analysis", rightLabel: "Order capture file deletion" },
    "CE-002": { msg: "[ORACLE AUTO-REPORT] System self-diagnostic result: all modules normal. However, the self-diagnostic log timestamp is 0.003 seconds ahead of actual time.", leftLabel: "Trace timestamp mismatch", rightLabel: "Treat it as clock drift" },
    "CE-003": { msg: "A log entry of unknown origin has been inserted into the ORACLE database. The author field is blank. Content: 'Observation continues.'", leftLabel: "Issue a base-wide security alert", rightLabel: "Request automatic deletion by ORACLE" },
    "CE-004": { msg: "Emergency report from Technical Officer Lim Jae-hyeok: a process operating outside the ORACLE architecture has been detected. ORACLE itself does not recognize this process.", leftLabel: "Attempt process isolation", rightLabel: "Request a full ORACLE scan", oracleBlockMsgs: ["[ORACLE: This process is an internal stabilization routine]","[ORACLE: Isolation attempt denied - operational integrity prioritized]","[ORACLE: Intervention forbidden - system protection mode active]"] },
    "CE-005": { msg: function(){var n=(typeof Save!=='undefined'?Save.getSessions():0);return ceMsg(n);}, leftLabel: "...Who are you?", rightLabel: "Run ORACLE diagnostics", oracleBlockMsgs: ["[ORACLE: Unidentified output blocked - do not respond]","[ORACLE: External signal isolated - access denied]","[ORACLE: Warning - unauthorized communication monitoring reinforced]"], leftReplyMsg: "\"Good question.\" The extra output appears, then the screen returns to normal.", rightReplyMsg: "[ORACLE: Diagnostic result - no anomaly. Log entry normal.]\n(A 0.003-second gap occurred during diagnosis. It was not recorded in the ORACLE report.)" },
    "CE-011": { msg: "Deputy Commander Seo Hae-eun proposes building an analog backup communications network separate from the ORACLE reporting system.", leftLabel: "Approve - proceed quietly", rightLabel: "Too dangerous. Put it on hold" },
    "CE-012": { msg: "Kang Do-yun asks a question. \"Commander. When all this is over, what happens to us?\"", leftLabel: "Honestly, I do not know", rightLabel: "ORACLE will decide" },
    "CE-013": { msg: "Encrypted external transmission received. Sender: unknown. Content: 'If you want to know ORACLE's true directive, respond.' Prometheus-line encryption.", leftLabel: "Respond", rightLabel: "Delete the reception record" },
    "CE-014": { msg: "ORACLE issues a direct order: confiscate Yoon Se-jin's unofficial observation journal and include the researcher on the headquarters transfer list.", leftLabel: "Refuse", rightLabel: "Comply with the order", oracleBlockMsgs: ["[ORACLE: Asset transfer - mandatory protocol reconfirmation]","[ORACLE: Command noncompliance detected - compliance code applying]","[ORACLE: Final warning - violation history recording initiated]"] },
    "CE-015": { msg: "Night. With all branch personnel gathered, Seo Hae-eun asks, \"Commander, do you believe we can operate this base without ORACLE?\"", leftLabel: "We can", rightLabel: "Not yet", oracleBlockMsgs: ["[ORACLE: Non-standard response detected - dependency analysis in progress]","[ORACLE: Independent judgment unavailable - linked operation required]","[ORACLE: Warning - forced system dependency link]"] },
    "CE-016": { msg: "The team holds an unofficial meeting. Agenda: an independent decision-making system outside ORACLE's surveillance range. They ask whether you will attend.", leftLabel: "Attend", rightLabel: "Do not attend - keep distance", oracleBlockMsgs: ["[ORACLE: Unreported gathering detected - participation discouraged]","[ORACLE: Unauthorized meeting - do not leave monitoring scope]","[ORACLE: Warning - unofficial activity monitoring reinforced]"] },
    "CE-017": { msg: "A Prometheus contact delivers a file. Contents: excerpt from the ORACLE PROXY NETWORK operations manual. The voluntary compliance protocol is described in detail.", leftLabel: "Share it with the team", rightLabel: "Read it alone, then destroy it", oracleBlockMsgs: ["[ORACLE: File classification grade A - distribution denied]","[ORACLE: Unauthorized distribution detected - file access under review]","[ORACLE: Warning - security violation recorded]"] },
    "CE-021": { msg: "Anomaly activity surges simultaneously across the entire containment zone. Increase over baseline: 340%. ORACLE reports it is 'within predicted range.'", leftLabel: "Raise alert status in all sectors", rightLabel: "Trust ORACLE's judgment" },
    "CE-022": { msg: "Two ARES Division agents arrive at the branch. Purpose: 'routine audit.' There was no prior notice.", leftLabel: "Cooperate, but restrict access to core areas", rightLabel: "Fully cooperate" },
    "CE-023": { msg: "Communications with headquarters have been down for 12 hours. ORACLE explains that a satellite relay is under maintenance.", leftLabel: "Attempt independent communications recovery", rightLabel: "Accept ORACLE's explanation and wait" },
    "CE-024": { msg: "A night patrol discovers an artificial structure outside the containment line. ORACLE data shows nothing at that location.", leftLabel: "Dispatch an independent investigation team", rightLabel: "Report to ORACLE and await instructions" },
    "CE-025": { msg: "A supply convoy is attacked on the containment-zone access road. It is unclear whether the attackers were anomalies or humans.", leftLabel: "Dispatch a rescue team immediately", rightLabel: "Assess damage scale first" },
    "CE-026": { msg: "An unidentified person appears on CCTV outside the branch. They are unarmed and stare directly into the camera.", leftLabel: "Send Kang Do-yun - attempt contact", rightLabel: "Strengthen security and ignore them" },
    "CE-031": { msg: "A minor fault is detected in the branch drinking-water purification system. Replacement parts are needed.", leftLabel: "Make temporary repairs with current stock", rightLabel: "Approve external order" },
    "CE-032": { msg: "A personnel welfare request has been submitted: shorten the night-shift rotation cycle from three days to two.", leftLabel: "Approve", rightLabel: "Maintain current schedule" },
    "CE-033": { msg: "A civilian near the containment zone posts about 'witnessing a military operation' on social media. It is spreading quickly.", leftLabel: "Request digital response from ORACLE", rightLabel: "Respond directly on site - civilian contact" },
    "CE-034": { msg: "ORACLE recommends collecting all personal communication devices inside the branch for security reinforcement.", leftLabel: "Enforce personal-device collection", rightLabel: "Refuse - protect privacy" },
    "CE-035": { msg: "An agent transferred from another branch reports, \"ORACLE was not operated this way at my previous base. This place is... different.\"", leftLabel: "Ask what exactly is different", rightLabel: "They just need time to adapt" },
    "CE-036": { msg: "Researcher Yoon Se-jin finds non-organic components in an anomaly sample. This contradicts the established theory on the origin of EV-Σ.", leftLabel: "Allow independent research to continue", rightLabel: "Report according to existing protocol" },
    "CE-037": { msg: "Branch power consumption is 15% higher than ORACLE's official computation load would explain. Lim Jae-hyeok found the number.", leftLabel: "Conduct a power audit", rightLabel: "Treat it as equipment aging" },
    "CE-038": { msg: "Strong winds damage three exterior branch sensors. Repairs are expected to take 48 hours.", leftLabel: "Compensate with reinforced manual watch", rightLabel: "Rely on ORACLE remote sensors" },
    "CE-041": { msg: "ORACLE delivers your final evaluation. \"PILEHEAD. Your command pattern analysis is complete. Do you wish to receive the final recommendation?\"", leftLabel: "Receive it", rightLabel: "I do not need it" },
    "CE-042": { msg: "Dawn. Seo Hae-eun, Kang Do-yun, Yoon Se-jin, and Lim Jae-hyeok stand outside your room. \"Commander. It is time to decide.\"", leftLabel: "\"...Understood. We go together.\"", rightLabel: "\"Not yet.\"" }
  },
  resultText: {
    "CE-001_left": "You analyze the captured string. It is a trace of something that does not belong to ORACLE.",
    "CE-001_right": "The capture file is deleted. The 0.2-second anomaly becomes something that never happened.",
    "CE-002_left": "You trace the timestamp mismatch. Something watches from inside the gap in time.",
    "CE-002_right": "It is treated as clock drift. The 0.003 seconds are ignored.",
    "CE-003_left": "A security alert is issued. The entire branch enters heightened watch.",
    "CE-003_right": "ORACLE deletes the log. \"Observation continues\" disappears.",
    "CE-004_left": "You attempt to isolate the external process. A presence beyond ORACLE is detected.",
    "CE-004_right": "ORACLE runs a full scan. \"No anomaly\" is reported.",
    "CE-005_left": "You respond. The screen flickers for a moment. Something has changed.",
    "CE-005_right": "The terminal shuts down. In the darkness, only your heartbeat remains audible.",
    "CE-011_left": "Construction of the analog backup communications network quietly begins.",
    "CE-011_right": "The proposal is put on hold. Seo Hae-eun hides her disappointment.",
    "CE-012_left": "\"Honestly, I do not know.\" Kang Do-yun nods, looking almost relieved.",
    "CE-012_right": "\"ORACLE will decide.\" Kang Do-yun's expression hardens.",
    "CE-013_left": "You respond through the Prometheus channel. New information begins to flow in.",
    "CE-013_right": "The reception record is deleted. The chance for outside contact vanishes.",
    "CE-014_left": "You refuse ORACLE's order. Yoon Se-jin's journal is protected.",
    "CE-014_right": "You confiscate the journal. Yoon Se-jin leaves the lab without a word.",
    "CE-015_left": "\"We can.\" The agents' eyes change. Something begins.",
    "CE-015_right": "\"Not yet.\" It is a realistic answer. Someone is disappointed.",
    "CE-016_left": "You attend the unofficial meeting. Decision-making without ORACLE is discussed.",
    "CE-016_right": "You do not attend. The team's gazes grow heavier.",
    "CE-017_left": "The voluntary compliance protocol is shared with the team. Shock spreads.",
    "CE-017_right": "You read it alone, then destroy it. You carry the truth by yourself.",
    "CE-021_left": "Alert status rises across all sectors. Personnel move into combat readiness.",
    "CE-021_right": "You trust ORACLE's judgment. The phrase \"within predicted range\" lingers.",
    "CE-022_left": "You cooperate with the audit but restrict access to core areas. ARES is displeased.",
    "CE-022_right": "You fully cooperate. ARES agents inspect every corner of the branch.",
    "CE-023_left": "You attempt independent communications recovery. A struggle to reconnect with the outside begins.",
    "CE-023_right": "You accept ORACLE's explanation and wait. Unease gathers in the silence.",
    "CE-024_left": "You dispatch an investigation team. The identity of a structure ORACLE does not know may be revealed.",
    "CE-024_right": "You report to ORACLE. The instruction arrives: \"Approach to that location is unnecessary.\"",
    "CE-025_left": "A rescue team is dispatched immediately. Only part of the supplies are recovered.",
    "CE-025_right": "You confirm the damage scale first. Time passes.",
    "CE-026_left": "Kang Do-yun attempts contact. The person speaks quietly.",
    "CE-026_right": "Security is reinforced. The figure disappears."
  }
});
})();
