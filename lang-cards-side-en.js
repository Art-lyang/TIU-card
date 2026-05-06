// lang-cards-side-en.js - English overlays for smaller route and crisis card groups.
(function(){
if(!window.TS_I18N||typeof window.TS_I18N.mergeContent!=='function')return;
window.TS_I18N.mergeContent('en', {
  cards: {
    "RH-01": { msg: "Seo Hae-eun adds a note during the daily briefing.\n\n\"I can review reports before they go to ORACLE.\nWe can preserve the format perfectly - while lowering the priority of certain information.\"\n\n\"If ORACLE only sees the format, it will not detect a problem.\"", leftLabel: "Keep only the official format", rightLabel: "Submit it exactly as headquarters requires" },
    "RH-02": { msg: "Kang Do-yun reports through an unofficial channel.\n\n\"During outer patrol, I found an area outside ORACLE camera coverage.\nI will list it as a normal route in the report.\"\n\n\"If we do that, we can use it as a blind point when needed.\"", leftLabel: "Record it that way", rightLabel: "Record everything by ORACLE protocol" },
    "RH-03": { msg: "Yoon Se-jin speaks while organizing medical records.\n\n\"There are cases I keep personally outside the official records.\nORACLE classified them as 'normal range,' but I see a pattern.\"\n\n\"Should I keep them separately from the formal report?\"", leftLabel: "Keep them. Maintain the official format", rightLabel: "Follow ORACLE classification" },
    "RH-04": { msg: "Lim Jae-hyeok looks up from the console.\n\n\"I am reverse-analyzing ORACLE query patterns.\n\nIt lets us see more inside the system while minimizing what the authorities can detect.\"\n\n\"As an operator, this is part of my job.\"", leftLabel: "Continue the analysis", rightLabel: "Do it after formal approval" },
    "RH-05": { msg: "[ORACLE: Self-diagnostic result notification]\n\n\"PILEHEAD. A temporary anomaly has been detected in the analysis module. Resynchronization is required.\"\n\nSeo Hae-eun speaks quietly.\n\"...This is our chance to leave a record of our own judgment.\nWe can record how ORACLE judged it, and why we thought differently.\"", leftLabel: "Record our judgment together", rightLabel: "Pass through only ORACLE judgment" },
    "CB-01": { msg: "ORACLE recalculates the daily operations directive.\n\n[ORACLE: Branch compliance pattern stable. Proposing a buffer procedure to reduce field friction.]\n\nSeo Hae-eun adds,\n\"If we submit the headquarters report as required but brief the team first, we can reduce backlash.\"", leftLabel: "Explain first, then apply ORACLE procedure", rightLabel: "Apply the procedure immediately" },
    "CB-02": { msg: "The containment automation protocol has been updated.\n\n[ORACLE: Automation approved. Containment efficiency expected to increase. Field retraining required.]\n\nKang Do-yun says, \"If the team knows what is changing, they can follow it. If they do not, they will break.\"", leftLabel: "Approve with retraining budget", rightLabel: "Approve immediately without budget" },
    "CB-03": { msg: "[ORACLE: Loyalty index increase confirmed]\n\nThe headquarters report is generated automatically. The sentences are perfect. None of the field anxiety is reflected.\n\nYoon Se-jin says quietly,\n\"Can we include the human condition in a loyalty report? Otherwise it will break later.\"", leftLabel: "Attach a field-condition appendix", rightLabel: "Submit ORACLE text as-is" },
    "ORC-LOYAL-SAFE-01": { msg: "[ORACLE: Loyal operator protection protocol active]\n\nThe evaluation index is stable. However, at least one of containment, resources, or trust has entered a critical risk range.\n\n[ORACLE: Emergency headquarters supply approved]\n[ORACLE: Containment-line auto-correction patch applied]\n[ORACLE: Selected unfavorable field orders withdrawn to restore trust]\n\nThis intervention is permitted only once per session.", leftLabel: "Approve ORACLE emergency intervention", rightLabel: "Preserve the intervention log too" },
    "C-301": { msg: "During night patrol, Research Wing B's isolation room reports an abnormal thermal reaction.\n\nSensor record: room temperature 37.2 C to 4.1 C in six minutes.\n\nThe isolated subject is not moving.\nBut frost is forming on the inside of the wall glass.\n\nThen the microphone catches something. A tiny voice.\n\"...Can you hear me?\"", hint: "Investigation starts a linked follow-up chain.", leftLabel: "Enter and investigate the isolation room", rightLabel: "Strengthen remote monitoring" },
    "C-302": { msg: "Lim Jae-hyeok runs into the security room.\n\n\"Commander, cameras 3, 7, and 12 went offline at the same time.\"\n\"The pattern is strange. This is not a failure. Someone is turning them off in order.\"\n\nA blind spot now covers the entire B1 corridor.", hint: "Investigation starts a linked follow-up chain.", leftLabel: "Trace the logs with Lim Jae-hyeok", rightLabel: "Switch all sectors to manual patrol" },
    "C-303": { msg: "Yoon Se-jin reports with a pale face.\n\n\"Culture sample 3 is contaminated.\"\n\"The problem is that the contaminant is not external. It mutated inside the incubator.\"\n\nBlack threadlike material spreads across the inner glass.", hint: "Investigation starts a linked follow-up chain.", leftLabel: "Emergency isolate and analyze the sample", rightLabel: "Incinerate the entire incubator" },
    "C-304": { msg: "[ORACLE security alert]\n\nThe restricted passage biometric system contains a successful authentication record.\n\nProblem: no registered person entered at that time.\n\nSomeone, or something, passed authentication.", hint: "Investigation starts a linked follow-up chain.", leftLabel: "Analyze server-room access logs", rightLabel: "Reset the authentication system" },
    "C-305": { msg: "Morning headcount. One staff member is missing.\n\nSupply officer Lee Su-hyeon. No movement record after leaving the break room at 22:00 last night.\n\nKang Do-yun: \"He is not in the dorm. The bedding is spread out, but it looks unused.\"\n\nThe branch needs an internal search.", hint: "Investigation starts a linked follow-up chain.", leftLabel: "Backtrack his route", rightLabel: "Ask ORACLE for location tracking" },
    "HH-01": { msg: "Lim Jae-hyeok speaks almost to himself.\n\n\"Commander. This may be strange, but -\nthe branch power, communications, servers. ORACLE controls all of it.\"\n\"If ORACLE shut down for even one day, we could do nothing.\"\n\n\"Someday, it would be good to build independent infrastructure piece by piece.\"", leftLabel: "Review the idea", rightLabel: "That violates headquarters policy" },
    "HH-02": { msg: "Seo Hae-eun hands you Lim Jae-hyeok's proposal.\n\n\"This is the independent infrastructure candidate list he prepared:\nlocal server room, independent comms room, emergency generator, shielded meeting room, armory.\"\n\n\"With those five, the branch can stand on its own without ORACLE.\"\n\"Add an emergency evacuation bunker, and it is complete.\"", leftLabel: "Put it on the review list", rightLabel: "We are not at that stage yet" },
    "CR-001": { msg: "News of ration cuts spreads.\n\nSome branch personnel gather in front of the food storage room.\n\"Why are we the ones starving?\"\n\nYou need to respond before the situation worsens.", leftLabel: "Go explain in person", rightLabel: "Deploy the security team" },
    "CR-002": { msg: "Medical bay emergency report: only three days of medicine remain.\n\nYoon Se-jin: \"If anyone is injured, we will have no way to treat them.\"\n\nExternal procurement may be dangerous depending on supply route conditions.", leftLabel: "Risk external procurement", rightLabel: "Optimize current stock allocation" },
    "CR-003": { msg: "During night patrol, the food-storage lock is found broken.\n\nInventory check result - three days of emergency food are missing.\n\nKang Do-yun: \"This was internal. Someone has reached their limit.\"", leftLabel: "Investigate everyone strictly", rightLabel: "Handle it quietly with leniency" },
    "CR-004": { msg: "[Emergency] Generator fuel level critical.\n\nIf auxiliary power is not engaged within four hours, every system will shut down, including the ORACLE terminal.\n\nLim Jae-hyeok: \"We need to cut power to nonessential areas first.\"", leftLabel: "Cut nonessential sectors", rightLabel: "Prioritize ORACLE power allocation" },
    "CR-005": { msg: "The branch water-purification filters are overdue for replacement, but no replacements remain.\n\n\"The water smells.\"\n\nMorale is visibly falling.", leftLabel: "Order temporary purification methods", rightLabel: "Divert sealed supplies" },
    "CR-006": { msg: "Supply shortage and containment-line weakening occur at the same time.\n\nORACLE: \"Resource allocation priority must be determined.\"\n\nIf resources go to containment reinforcement, branch living conditions will worsen.", leftLabel: "Prioritize branch living conditions", rightLabel: "Prioritize containment reinforcement" },
    "CA-SEED-01": { msg: "There is a strange item in the night-duty report.\n\n\"02:47 - system self-diagnostic record. No assigned operator.\"\n\nNo self-diagnostic is scheduled for 02:47 in the operation manual.", leftLabel: "Treat it as an error", rightLabel: "Preserve the record" },
    "CA-SEED-02": { msg: "A memo is found deep inside the office desk drawer.\n\nUnknown author. No date. The handwriting is rushed and faint.\n\nStrange. There should not have been a previous commander...\n\nOnly the last line is clear:\n\n\"B3 - there is an area inside that is not on the plans. Behind the restricted zone. Confirmation required.\"", leftLabel: "Let it pass", rightLabel: "Check B3 restricted area" },
    "CA-SEED-03": { msg: "Lim Jae-hyeok hesitates during a terminal inspection.\n\n\"...No, never mind. The firmware version number is odd.\"\n\n\"It is a build with no official release record. Usually that does not happen.\"", leftLabel: "Use your judgment", rightLabel: "Ask ORACLE" },
    "CA-SEED-04": { msg: "Seo Hae-eun adds a note while submitting the daily report.\n\n\"While organizing the data... I found intermittent discontinuities in ORACLE log timestamps.\"\n\"It is only at the millisecond level, so it does not affect operations, but it bothers me.\"", leftLabel: "I will keep it in mind", rightLabel: "No need to file an official report" },
    "CN-001": { msg: "ORACLE's daily analysis includes an assessment of you.\n\n\"Commander Lee Joong-chul: recommendation compliance rate 47%. Classification - indeterminate.\"\n\n\"Additional observation required. Judgment withheld.\"", leftLabel: "Raise the compliance rate", rightLabel: "I will do this my way" },
    "CN-002": { msg: "Seo Hae-eun asks carefully.\n\n\"Commander... what do you think of ORACLE?\"\n\"You do not seem obedient, but you do not seem rebellious either. Honestly, you are hard to read.\"", leftLabel: "I am still deciding too", rightLabel: "I make the judgment" },
    "CN-003": { msg: "ORACLE sends an unusual transmission.\n\n\"The commander's decision pattern does not match existing models.\"\n\"Unpredictability - analysis ongoing to determine whether it is a risk or an asset.\"\n\n[Transmission ended]", leftLabel: "ORACLE will judge that too", rightLabel: "Stay unpredictable" },
    "CN-004": { msg: "Lim Jae-hyeok speaks over dinner.\n\n\"Your style is interesting, Commander.\"\n\"You do not fully follow ORACLE, but you do not openly reject it either.\"\n\"Walking a line? Or do you really not know yet?\"", leftLabel: "Maybe both", rightLabel: "I know what I am doing" },
    "CN-005": { msg: "Kang Do-yun requests a private report.\n\n\"Commander. I will ask honestly.\"\n\"The fact that you are neither with ORACLE nor Prometheus... is that intentional?\"\n\"Or have you not decided yet?\"", leftLabel: "It is intentional. I am watching both sides", rightLabel: "...I do not know, honestly" },
    "CA-OBS-PROTO": { msg: "[ERR:0x8F2A - UNREGISTERED PROTOCOL DETECTED]\n\nPROTOCOL: OBSERVER\nAccess approval requested\n\nSource: ████████\nProtocol: unregistered\nSecurity level: ████\nAuthentication status: BYPASSED\n\nAn external connection is being attempted without ORACLE approval.\n\nApprove?", leftLabel: "Approve access", rightLabel: "Reject" }
  },
  resultText: {
    "C-301_left": "You begin a direct investigation of the isolation room. Something is answering from inside the cold glass.",
    "C-301_right": "Remote monitoring is reinforced. The voice remains in the audio buffer.",
    "C-302_left": "You trace the camera outage logs with Lim Jae-hyeok. The shutdown order came from inside the branch.",
    "C-302_right": "All sectors switch to manual patrol. The blind spot narrows, but personnel fatigue rises.",
    "C-303_left": "The contaminated sample is isolated for analysis. Yoon Se-jin preserves a narrow window of evidence.",
    "C-303_right": "The incubator is incinerated. The immediate risk drops, along with the chance to understand the mutation.",
    "C-304_left": "Server-room access logs are pulled. The authentication success is real, but the operator field is blank.",
    "C-304_right": "The authentication system is reset. The anomaly is contained, but the trace is partly erased.",
    "C-305_left": "The missing staff member's route is backtracked through the branch. The trail points toward the emergency stairs.",
    "C-305_right": "ORACLE location tracking begins. The search becomes faster, and less transparent."
  }
});
window.TS_I18N.mergeContent('en', {
  cards: {
    "LJC-PROM-01": { msg: "A Prometheus audio file arrives.\n\nFile: GANGWON-OLD / COASTAL-MIRROR / VOICELOSS\n\nLee Jung-cheol stops with his hand over the confirm key.\n\nThe eastern Gangwon operation. Comms blackout. Lieutenant Park Sang-hun. The final voice that sounded like a rescue call.\n\nORACLE summarized the incident as \"possible intervention by an uncooperative civilian faction,\" but Lee Jung-cheol remembers another name.\n\nPrometheus.", leftLabel: "Delay opening the file", rightLabel: "Open it despite the discomfort", leftReplyMsg: "[Record held: commander's personal judgment detected]", rightReplyMsg: "[Record opened: old operation file comparison started]" },
    "LJC-PROM-02": { msg: "Prometheus sends an unofficial request for an in-person meeting.\n\nThe message is short.\n\n\"We have the communication record from that day. The commander should hear it himself.\"\n\nSeo Hae-eun speaks carefully.\n\"Commander, you do not have to go in person.\"\n\nLee Jung-cheol answers without looking at the screen.\n\"It is not that I do not need to. It is that... I do not want to.\"", leftLabel: "Send a proxy", rightLabel: "Make direct contact", leftReplyMsg: "[Meeting avoided: proxy-contact protocol active]", rightReplyMsg: "[Direct contact: commander's heart rate elevated]" },
    "LJC-PROM-03": { msg: "A short testimony file from Prometheus is restored.\n\n\"We were not the ones who blocked the rescue call that day. We were late. That is why we were looking for the survivor.\"\n\nThe room goes quiet.\n\nLee Jung-cheol says nothing for a while.\n\nThe reason he hates Prometheus becomes a little less clear. The hatred is not gone. It simply begins to waver over where it should be aimed.", leftLabel: "Seal the testimony", rightLabel: "Preserve it as conflicting testimony", leftReplyMsg: "[Testimony sealed: omitted from official report]", rightReplyMsg: "[Testimony preserved: clue added for old operation review]" },
    "LJC-PROM-04": { msg: "The direct Prometheus channel opens again.\n\nWhen Markus Weber's name appears on the screen, Lee Jung-cheol does not answer immediately.\n\nLieutenant Park Sang-hun's final voice. ORACLE's report. Prometheus testimony that they arrived too late.\n\nEverything overlaps in the same place.\n\nLim Jae-hyeok speaks quietly.\n\"Commander. If we cooperate with them, we should record why this still feels wrong. Otherwise someone can rewrite our judgment later.\"\n\nPrometheus is waiting for a response.", leftLabel: "Record the distrust and review terms", rightLabel: "Hold the channel. Not yet", leftReplyMsg: "[Pre-cooperation record: separating personal hostility from operational need]", rightReplyMsg: "[Cooperation delayed: contact held by commander's judgment]" }
  },
  oracleLogs: {
    "LOG-LJC-PROM-01": {
      title: "Lee Jung-cheol Personal Record: Eastern Gangwon Operation",
      content: "[Unofficial access record]\n\nTarget: GANGWON-OLD / COASTAL-MIRROR / VOICELOSS\n\nCommander Lee Jung-cheol shows decision latency while opening a Prometheus-related audio file.\n\nLinked incident: eastern Gangwon operation, communications blackout, Lieutenant Park Sang-hun listed as missing.\n\nExisting ORACLE classification: possible intervention by an uncooperative civilian faction.\nCommander note: \"Since that day, it has been difficult to hear the name Prometheus objectively.\""
    },
    "LOG-LJC-PROM-02": {
      title: "Prometheus Contact Avoidance Record",
      content: "[Commander behavior observation]\n\nUnofficial in-person meeting request received from Prometheus.\n\nRequest phrase: \"We have the communication record from that day.\"\n\nCommander Lee Jung-cheol acknowledges the need for direct contact, but delays the meeting or considers proxy contact.\n\nAssessment: strategic judgment and personal avoidance response are both present."
    },
    "LOG-LJC-PROM-03": {
      title: "Conflicting Testimony: Rescue Call Interference",
      content: "[Restored testimony file]\n\nSender: unidentified Prometheus-line channel\n\nCore testimony: \"We were not the ones who blocked the rescue call that day. We were late.\"\n\nThis testimony conflicts with ORACLE's existing incident classification.\n\nNote: the commander's aversion to Prometheus may be tied not only to hostility, but to unresolved responsibility."
    },
    "LOG-LJC-PROM-04": {
      title: "Prometheus Cooperation Preconditions",
      content: "[Unofficial judgment record]\n\nBefore reopening a direct Prometheus channel, Commander Lee Jung-cheol reviews the eastern Gangwon operation and Lieutenant Park Sang-hun's missing-person record again.\n\nLim Jae-hyeok proposes preserving the commander's distrust, ORACLE's old classification, and Prometheus's conflicting testimony in the same file.\n\nPurpose: to make clear that any later cooperation is an operational decision made with incomplete evidence, not a simple defection or emotional revenge.\n\nAssessment: cooperation with Prometheus is possible, but the commander's personal hostility remains unresolved."
    },
    "LOG-LJC-PROM-DLG": {
      title: "Seo Hae-eun Interview Record: The Commander's Pause",
      content: "[Senior officer interview summary]\n\nSeo Hae-eun confirmed that the commander's response slows whenever Prometheus-related reports appear.\n\nHe does not refuse the order. He simply pauses once before the confirmation key.\n\nAssessment: memories of a past operation repeatedly intrude on Prometheus-related judgment."
    },
    "LOG-RH-SUMMARY": {
      title: "Report Priority Reordering",
      content: "Seo Hae-eun preserved ORACLE report format while lowering the priority of sensitive field judgment. ORACLE evaluation did not immediately fall, but an unofficial judgment line was created."
    },
    "LOG-RH-BLINDSPOT": {
      title: "Outer Blind Point",
      content: "Kang Do-yun disguised an outer area outside ORACLE surveillance as a normal patrol route. It is not classified as open rebellion, but can serve as an independent movement line if needed."
    },
    "LOG-RH-MEDICAL": {
      title: "Unofficial Medical Cases",
      content: "Yoon Se-jin preserved medical cases ORACLE classified as normal range. They do not conflict with the official record and can be cross-checked against early infection signs."
    },
    "LOG-RH-QUERYMAP": {
      title: "ORACLE Query Map",
      content: "Lim Jae-hyeok reverse-analyzed ORACLE query patterns and marked low-surveillance request routes. The system is not being attacked directly, but its judgment flow can be read."
    },
    "LOG-RH-COUNTERMEMO": {
      title: "Counter-Judgment Memo",
      content: "A memo preserving field judgment alongside ORACLE's self-diagnostic anomaly. It records both what ORACLE concluded and why branch command thought differently."
    },
    "LOG-CB-STABILITY": {
      title: "Compliance Buffer Procedure",
      content: "A record of following ORACLE procedure while briefing personnel first to reduce field resistance. Even on a loyal route, this operating style can slow trust collapse."
    },
    "LOG-CB-CONTAINMENT": {
      title: "Automation Retraining Budget",
      content: "Containment automation was approved together with field retraining budget. The branch accepts ORACLE efficiency while preserving personnel understanding."
    },
    "LOG-CB-HUMANAPPENDIX": {
      title: "Human Appendix to Loyalty Report",
      content: "A field-condition appendix was attached to an ORACLE headquarters report. The commander's compliance remained intact, but fatigue and anxiety were not erased."
    },
    "LOG-ORACLE-SAFEGUARD": {
      title: "ORACLE Loyal Operator Protection Protocol",
      content: "With the loyalty index stable but containment, resources, or trust approaching a game-over threshold, ORACLE executed emergency headquarters supply, containment auto-correction, and withdrawal of selected unfavorable orders. This intervention is permitted once per session."
    },
    "LOG-RH-NETWORK": {
      title: "Quiet Resistance Line",
      content: "Report format, outer patrol routes, and internal query maps have connected into a quiet circuit. It is not public rebellion, but the Korean branch now has a minimal structure for independent judgment."
    },
    "LOG-CB-SUSTAINED": {
      title: "Sustainable Loyalty",
      content: "ORACLE procedure was combined with briefings, retraining, and field appendices. This creates a buffer so loyalty does not only mean consuming personnel."
    }
  }
});
window.TS_I18N.mergeContent('en', {
  cards: {
    "KC-01": { msg: "A local safety center sends an unofficial inquiry.\n\nInside Residential Zone 12, the report-app button keeps freezing gray.\n\nThe official explanation is communication delay. Residents say the case number disappears after the gray button appears.", leftLabel: "Register it as a formal report and trace it", rightLabel: "Quietly verify the cause through the local network" },
    "KC-02": { msg: "A hospital asks about repeated false rejections at the admission gate.\n\nThe field health unit asks whether reinspection is needed, while the central classification network treats it as a normal pass.\n\nLim Jae-hyeok says, \"The gate log has an eleven-second gap. The branch cannot change the gate standard directly, but we can raise the gap as a technical issue.\"", leftLabel: "Request reinspection as a technical issue", rightLabel: "Share only the log with the field health unit" },
    "KC-03": { msg: "A shared report arrives from a Phase observation ward.\n\nThe child's Phase 0 value is rising while the parents test normal. The central classification network recommends family-wide isolation, and the hospital asks the branch for risk-assessment material.\n\nYoon Se-jin says, \"We should not decide the isolation ourselves. But we can help separate the child's treatment priority from family-separation risk.\"", leftLabel: "Provide only the central-classification evidence", rightLabel: "Attach the medical staff's dissenting note" },
    "KC-04": { msg: "At a logistics market near the barrier, quarantine-site food and military supplies are moving through a temporary channel.\n\nA DG partner proposes converting it into an official subcontract line. Local merchants ask to keep their own distribution network open.", leftLabel: "Regularize it under a DG subcontract", rightLabel: "Keep the local merchant network conditionally open" },
    "KC-05": { msg: "An education-office inquiry says one student inside the barrier has not returned to school after a sensor-gate retest.\n\nSchool attendance and class format will be decided by the education and health authorities. The branch is asked only for risk assessment and public wording advice.\n\nSeo Hae-eun says, \"If the wording is wrong, the entire family of someone with infection history will be stigmatized. We are not deciding school operations, only what information to pass on.\"", leftLabel: "Deliver neutral closure-risk material", rightLabel: "Suggest anti-stigma wording as well" },
    "KC-06": { msg: "Records Preservation Room B-12 restores only the title of an old document.\n\nTitle: \"No Civilian Harm - Post-Operation Debrief, Eastern Gangwon\"\n\nThe body is gone, but several signatures from the same hour remain in the header.", leftLabel: "Preserve only the title and restrict access", rightLabel: "Attempt to restore the body" },
    "KC-07": { msg: "A nonpublic warning appears for four seconds on an admission-hub advertising screen.\n\n[Higher classification pending - access path mismatch]\n\nCitizens notice the closed-circuit camera before the official announcement.", leftLabel: "Recommend temporary hub control", rightLabel: "Keep the route open and strengthen guidance" },
    "KC-08": { msg: "A discrimination report arrives from a hiring process involving infection history.\n\nThe public record shows \"medical observation complete,\" but a hidden flag remains in a company HR network.\n\nSeo Hae-eun says, \"Records are not erased. The problem is who gets to see them.\"", leftLabel: "Restrict access to the hidden flag", rightLabel: "Keep sharing with risk businesses" }
  },
  oracleLogs: {
    "LOG-KR-CIV-REPORT": { title: "Gray Report Button: Formal Registration", content: "The residential-zone report-button failure was registered as a formal case. The public explanation remains communication delay, but the branch now traces a KR-CIV hold pattern." },
    "LOG-KR-CIV-QUIET": { title: "Gray Report Button: Quiet Verification", content: "The branch checked the gray button failure through a local network. Public anxiety was contained, but the missing official case number leaves weaker follow-up evidence." },
    "LOG-KR-GATE-STRICT": { title: "Admission Gate Technical Issue", content: "The eleven-second admission-gate gap was forwarded as a technical issue. The branch cannot alter gate standards directly, but a formal reinspection request now exists." },
    "LOG-KR-GATE-REVIEW": { title: "Admission Gate Log Shared", content: "The branch avoided intervening in the central classification network and shared only the gap log with the field health unit. The anomaly remains open." },
    "LOG-KR-HOSPITAL-CENTRAL": { title: "Phase Ward Central Evidence", content: "Only the central-classification basis for family isolation was provided to the hospital. The branch did not make the medical decision, but the family question remains active." },
    "LOG-KR-HOSPITAL-FAMILY": { title: "Phase Ward Staff Dissent", content: "The branch attached the medical staff's dissenting note so the child's treatment priority and family-separation risk could be reviewed together." },
    "LOG-KR-MARKET-DG": { title: "Barrier Market DG Regularization", content: "The barrier logistics market was regularized through a DG subcontract line. Supplies are more stable, but local merchants say containment has become a corporate contract." },
    "LOG-KR-MARKET-LOCAL": { title: "Barrier Market Local Network", content: "The local merchant network remains conditionally open. Citizen access is less rigid, but quarantine-site distribution still carries gray-market risk." },
    "LOG-KR-SCHOOL-CLOSE": { title: "Education Office Risk Material", content: "Neutral risk material was sent to the education and health authorities for the student retest case. School operation decisions remain outside branch authority." },
    "LOG-KR-SCHOOL-CONTINUE": { title: "Education Office Anti-Stigma Wording", content: "The branch added anti-stigma wording to the public guidance draft. The authorities still decide attendance and class format, but the student's family is less likely to be exposed by wording alone." },
    "LOG-KR-RECORD-PRESERVE": { title: "B-12 Title Preserved", content: "Only the restored title from Records Preservation Room B-12 was sealed. The missing body remains unknown, but the Eastern Gangwon trace is preserved." },
    "LOG-KR-RECORD-RESTORE": { title: "B-12 Body Restoration Attempt", content: "The branch attempted to restore the body of the Eastern Gangwon post-operation debrief. Some access codes surfaced where no normal log should exist." },
    "LOG-KR-HUB-LOCK": { title: "Admission Hub Temporary Control", content: "After the nonpublic warning appeared, the branch recommended temporary admission-hub control. Citizens have already shared captured images of the warning." },
    "LOG-KR-HUB-OPEN": { title: "Admission Hub Route Maintained", content: "The hub route remains open while guidance is strengthened. Daily movement is preserved, but copies of the warning continue to circulate." },
    "LOG-KR-REGISTRY-SEAL": { title: "Infection-History Flag Restricted", content: "Access to the hidden infection-history flag was restricted. Some employers object that risk information is being withheld." },
    "LOG-KR-REGISTRY-SHARE": { title: "Infection-History Flag Sharing Maintained", content: "Risk businesses continue to receive the hidden infection-history flag. Safety visibility improves, but hiring-discrimination complaints remain unresolved." }
  }
});
})();
