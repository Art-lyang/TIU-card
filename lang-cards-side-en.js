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
    "RH-06": { msg: "Seo Hae-eun closes the file folder.\n\n\"If we resist openly, ORACLE will pressure us first.\"\n\"But not everyone has to move in the same direction on the same day.\"\n\nKang Do-yun uploads the guard-shift gaps, Yoon Se-jin marks patients who can move, and Lim Jae-hyeok prepares a report queue ORACLE will read late.\n\nThis is not a declaration of victory. It is preparation to disappear quietly.", leftLabel: "Build an unofficial evacuation order", rightLabel: "Keep the records distributed" },
    "OBS-HINT-01": { msg: "Lim Jae-hyeok reopens the unregistered UI element from LOG-012.\n\n\"It was not a cache error.\"\n\"This element is not inside ORACLE. Something outside ORACLE is watching our screen.\"\n\nHe marks another access path.\n\n[UNREGISTERED OBSERVATION LAYER]\n[ORACLE: not recognized]", leftLabel: "Trace the observation layer", rightLabel: "Close the access record" },
    "CB-01": { msg: "ORACLE recalculates the daily operations directive.\n\n[ORACLE: Branch compliance pattern stable. Proposing a buffer procedure to reduce field friction.]\n\nSeo Hae-eun adds,\n\"If we submit the headquarters report as required but brief the team first, we can reduce backlash.\"", leftLabel: "Explain first, then apply ORACLE procedure", rightLabel: "Apply the procedure immediately" },
    "CB-02": { msg: "The containment automation protocol has been updated.\n\n[ORACLE: Automation approved. Containment efficiency expected to increase. Field retraining required.]\n\nKang Do-yun says, \"If the team knows why things are changing, they can follow it. If they do not, they will resist.\"", leftLabel: "Approve with retraining budget", rightLabel: "Approve immediately without budget" },
    "CB-03": { msg: "[ORACLE: Loyalty index increase confirmed]\n\nThe headquarters report is generated automatically. The sentences are perfect. None of the field anxiety is reflected.\n\nYoon Se-jin says quietly,\n\"A loyalty report still needs to include the human condition. That is how it holds for the long term.\"", leftLabel: "Attach a field-condition appendix", rightLabel: "Submit ORACLE text as-is" },
    "ORC-LOYAL-SAFE-01": { msg: "[ORACLE: Loyal operator protection protocol active]\n\nThe evaluation index is stable. However, at least one of containment, resources, or trust has entered a critical risk range.\n\n[ORACLE: Emergency headquarters supply approved]\n[ORACLE: Containment-line auto-correction patch applied]\n[ORACLE: Selected unfavorable field orders withdrawn to restore trust]\n\nThis intervention is permitted only once during the current operation.", leftLabel: "Approve ORACLE emergency intervention", rightLabel: "Preserve the intervention log too" },
    "RH-SAFE-01": { msg: "[Field emergency net: manual sync]\n\nBy repeatedly bypassing ORACLE recommendations, the gap between official supply order and field judgment has widened.\n\nSeo Hae-eun uploads an unofficial cooperation list.\n\"This is not about overturning headquarters orders. It is about rebuilding the minimum order needed to survive.\"\n\nLim Jae-hyeok adds briefly.\n\"I will leave the record. Later, whoever reads it should understand why we made this choice.\"\n\nThis emergency net can be used only once during the current operation.", leftLabel: "Activate the unofficial supply net", rightLabel: "Use evidence packets to persuade headquarters" },
    "MS-01": { msg: "An eight-second blank appears in the outer containment camera feed.\n\nLim Jae-hyeok: Just before the blank, the camera caught a humanlike shape passing along the edge of the frame.\n\nNo thermal detection. No biological response.\n\nLim Jae-hyeok: \"It definitely moved, but the sensor is reading it as empty space.\"\n\nYoon Se-jin: \"It appears to be a SPEC-001 mannequin. ...I am not certain.\"\n\nAt the end of the footage, only the all-clear message blinks quietly.", leftLabel: "Close that route immediately", rightLabel: "Trace the figure's movement" },
    "MS-02": { msg: "The night patrol spots a group of variants on the northern ridge.\n\nThey do not flee. They do not charge. They move in a circle while keeping distance from each other.\n\nKang Do-yun: \"Formation. They move like trained troops. But the center is empty.\"\n\nYoon Se-jin pauses the footage.\n\nAt the empty center of the circle, the sensor reads 0.", leftLabel: "Pull the ridge defense line back", rightLabel: "Attempt to recover a center sample" },
    "MS-03": { msg: "Before dawn, a person walks up to the temporary checkpoint outside the barrier.\n\nWet protective suit. Bare hands. A black circular mark on the back of one hand.\n\nThe biosensor keeps reading 0. But he is breathing.\n\nMan: \"Do not turn on the lights. When the light hits them... the things behind me imitate people.\"\n\nKang Do-yun: \"We cannot tell whether he is infected or a survivor. But he is speaking.\"", leftLabel: "Quarantine and interrogate directly", rightLabel: "Transfer under ORACLE quarantine protocol" },
    "GOV-ORC-01": { msg: "A night attack is reported from a village near the branch.\n\nThe attackers called themselves Haejinhoe. They claimed the barrier must be opened, attacked a civilian shelter, and destroyed ORACLE equipment first.\n\nThe local police agency asks whether the Korea Branch detected any signs in advance.\n\nSeo Hae-eun: \"This is a civilian security incident, but it touches our containment line. The government will ask for our records.\"", leftLabel: "Share field records with the local agency", rightLabel: "Send only the ORACLE summary" },
    "GOV-ORC-02": { msg: "A second inquiry arrives from the Ministry of National Defense joint situation room.\n\n\"There is a report that KR-INIT-001 outer sensors detected unauthorized group movement six hours before the nearby village attack. Can the raw log be submitted?\"\n\nLim Jae-hyeok: \"The raw log exists. But it is missing from the ORACLE auto-summary. I do not know yet whether it was omitted or deleted.\"\n\nThe government is now looking at the branch records, not only the incident.", leftLabel: "Submit redacted raw logs", rightLabel: "Unify the reply through ORACLE" },
    "GOV-ORC-03": { msg: "A government liaison arrives at the outer checkpoint.\n\nOfficial purpose: follow-up inspection after the nearby village attack.\nUnofficial question: is the Korea Branch a Korean emergency facility, or an ORACLE field node?\n\nSeo Hae-eun: \"If we answer both, no one will believe us.\"\n\nLim Jae-hyeok: \"And ORACLE will not like the question itself.\"", leftLabel: "Clarify Korean emergency authority", rightLabel: "Answer through the ORACLE command chain" },
    "GOV-ORC-04": { msg: "A joint local-government briefing request arrives.\n\nThe topic is shelter operation guidelines near the barrier. On the surface it is a civilian notice, but the questionnaire asks how far the Korea Branch makes field judgments.\n\nSeo Hae-eun: \"It looks like shelter guidance, but it is really a jurisdiction check. If it sounds too headquarters-standard, residents will not understand it. If it sounds too field-driven, headquarters will hate it.\"", leftLabel: "Draft the briefing in field language", rightLabel: "Submit only headquarters-standard wording" },
    "GOV-ORC-05": { msg: "The local agency sends over part of the CCTV from a shelter near the barrier.\n\nJust before the attack, a small reconnaissance drone without ORACLE markings passes over the shelter. It cannot be identified as branch equipment or civilian equipment.\n\nLim Jae-hyeok: \"It is not on our equipment list. But the ORACLE auto-report processed this entire section as weather noise.\"\n\nThe government is now asking about both the shelter incident and the Korea Branch sensor gap.", leftLabel: "Submit the timestamps with the sensor gap", rightLabel: "Quarantine the drone track as a separate classification" },
    "GOV-ORC-06": { msg: "Notice arrives that a joint inspection team will visit.\n\nOfficial reason: reviewing evacuation systems near the barrier after the nearby village attack. The unofficial request is more direct.\n\n\"We will compare the Korea Branch field judgment records and ORACLE automatic classification records in the same room.\"\n\nYoon Se-jin says, \"Showing records may build trust. But patient records and quarantine records could open too.\"\n\nLim Jae-hyeok looks at the screen and speaks quietly.\n\"ORACLE will see this visit as field interference.\"", leftLabel: "Allow a divided limited-site inspection", rightLabel: "Replace the visit with remote document access" },
    "C-301": { msg: "During night patrol, Research Wing B's isolation room reports an abnormal thermal reaction.\n\nSensor record: room temperature 37.2°C to 4.1°C in six minutes.\n\nThe isolated subject is not moving.\nBut frost is forming on the inside of the wall glass.\n\nThen the microphone catches something. A tiny voice.\n\"...Can you hear me?\"", hint: "Investigation starts a linked follow-up chain.", leftLabel: "Enter and investigate the isolation room", rightLabel: "Strengthen remote monitoring" },
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
    "CR-005": { msg: "The branch water-purification filters are overdue for replacement, but no replacements remain.\n\n\"The water smells.\"\n\nMorale is visibly falling.", leftLabel: "Restrict drinking water and ration temporary supply", rightLabel: "Reassign field stock to emergency filters" },
    "CR-006": { msg: "Supply shortage and containment-line weakening occur at the same time.\n\nORACLE: \"Resource allocation priority must be determined.\"\n\nIf resources go to containment reinforcement, branch living conditions will worsen.", leftLabel: "Prioritize branch living conditions", rightLabel: "Prioritize containment reinforcement" },
    "CA-SEED-01": { msg: "There is a strange item in the night-duty report.\n\n\"02:47 - system self-diagnostic record. No assigned operator.\"\n\nNo self-diagnostic is scheduled for 02:47 in the operation manual.", leftLabel: "Treat it as an error", rightLabel: "Preserve the record" },
    "CA-SEED-02": { msg: "A memo is found deep inside the office desk drawer.\n\nUnknown author. No date. The handwriting is rushed and faint.\n\nStrange. There should not have been a previous commander...\n\nOnly the last line is clear:\n\n\"B3 - there is an area inside that is not on the plans. Behind the restricted zone. Confirmation required.\"", leftLabel: "Let it pass", rightLabel: "Check B3 restricted area" },
    "CA-SEED-03": { msg: "Lim Jae-hyeok hesitates during a terminal inspection.\n\n\"...No, never mind. The firmware version number is odd.\"\n\n\"It is a build with no official release record. Usually that does not happen.\"", leftLabel: "Use your judgment", rightLabel: "Ask ORACLE" },
    "CA-SEED-04": { msg: "Seo Hae-eun adds a note while submitting the daily report.\n\n\"While organizing the data... I found intermittent discontinuities in ORACLE log timestamps.\"\n\"It is only at the millisecond level, so it does not affect operations, but it bothers me.\"", leftLabel: "I will keep it in mind", rightLabel: "No need to file an official report" },
    "CN-001": { msg: "ORACLE's daily analysis includes an assessment of you.\n\n\"Commander Lee Jung-cheol: recommendation compliance rate 47%. Classification - indeterminate.\"\n\n\"Additional observation required. Judgment withheld.\"", leftLabel: "Raise the compliance rate", rightLabel: "I will do this my way" },
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
    "LJC-PROM-04": { msg: "The direct Prometheus channel opens again.\n\nWhen Markus Weber's name appears on the screen, Lee Jung-cheol does not answer immediately.\n\nLieutenant Park Sang-hun's final voice. ORACLE's report. Prometheus testimony that they arrived too late.\n\nEverything overlaps in the same place.\n\nLim Jae-hyeok speaks quietly.\n\"Commander. If we cooperate with them, we should record why this still feels wrong. Otherwise someone can rewrite our judgment later.\"\n\nPrometheus is waiting for a response.", leftLabel: "Record the distrust and review terms", rightLabel: "Hold the channel. Not yet", leftReplyMsg: "[Pre-cooperation record: separating personal hostility from operational need]", rightReplyMsg: "[Cooperation delayed: contact held by commander's judgment]" },
    "LJC-PROM-05": { msg: "An old radio-frequency comparison arrives.\n\nThe final rescue call from the eastern Gangwon operation partially overlaps with the noise pattern in a recent Prometheus encrypted channel.\n\nThe match rate is low. But the overlap sits in the same place too cleanly to ignore.\n\nLee Jung-cheol turns one page of the report and stops.\n\n\"That name again. Here.\"", leftLabel: "Keep the comparison unofficially", rightLabel: "File it under ORACLE standard classification", leftReplyMsg: "[Unofficial hold: old rescue call compared with current channel noise]", rightReplyMsg: "[Standard classification: Prometheus relevance marked low]" },
    "LJC-PROM-06": { msg: "A Prometheus proxy sends a short list.\n\nThere is no title. Only dates, coordinates, and failed rescue counts.\n\nOne entry overlaps the missing window in the eastern Gangwon operation.\n\nLim Jae-hyeok says, \"If this list is real, they were not burying that day. They were chasing it too.\"\n\nLee Jung-cheol does not answer immediately.", leftLabel: "Preserve the list as possible evidence", rightLabel: "Quarantine it as unverified-source material", leftReplyMsg: "[Evidence candidate preserved: Prometheus failed-rescue list]", rightReplyMsg: "[Unverified-source quarantine: held out of operational judgment]" },
    "LJC-PROM-07": { msg: "After the night report ends, Seo Hae-eun remains in the room.\n\n\"Commander, you do not trust Prometheus. Everyone knows that.\"\n\nShe chooses her words carefully.\n\n\"But if that distrust is used only in the direction ORACLE wants, we should also ask who benefits.\"\n\nLee Jung-cheol closes the old operation file on his desk.", leftLabel: "Record the reason for distrust", rightLabel: "Leave emotion out of the record", leftReplyMsg: "[Judgment reason recorded: distrust separated from operational grounds]", rightReplyMsg: "[Emotion record excluded: only official judgment retained]" },
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
    "LOG-LJC-PROM-05": {
      title: "Prometheus Frequency Comparison Record",
      content: "[Unofficial comparison record]\n\nPart of the final rescue call from the eastern Gangwon operation overlaps with the noise pattern in a recent Prometheus encrypted channel.\n\nThe match rate is low, but the pattern repeats around the same time window and coordinate range.\n\nNote: Commander Lee Jung-cheol does not immediately apply the result to operational judgment."
    },
    "LOG-LJC-PROM-06": {
      title: "Prometheus Failed-Rescue List",
      content: "[Restricted-source material]\n\nA Prometheus proxy provides a short list containing only dates, coordinates, and failed rescue counts.\n\nSome entries overlap the missing time window from the eastern Gangwon operation.\n\nAssessment: a new possibility emerges: Prometheus may have been tracking the incident late, rather than burying it."
    },
    "LOG-LJC-PROM-07": {
      title: "Preserved Reason for Distrust",
      content: "[Commander judgment support record]\n\nSeo Hae-eun notes that the commander's distrust of Prometheus may overlap with ORACLE's preferred judgment direction.\n\nPurpose: to separate any decision to trust or distrust Prometheus from an emotional reflex and preserve it as reviewable operational reasoning.\n\nAssessment: cooperation has become more possible, but distrust remains a valid warning signal."
    },
    "LOG-LJC-PROM-DLG": {
      title: "Seo Hae-eun Interview Record: The Commander's Pause",
      content: "[Senior officer interview summary]\n\nSeo Hae-eun confirmed that the commander's response slows whenever Prometheus-related reports appear.\n\nHe does not refuse the order. He simply pauses once before the confirmation key.\n\nAssessment: memories of a past operation repeatedly intrude on Prometheus-related judgment."
    },
    "LOG-M001-REMOTE": {
      title: "SPEC-012 Remote Analysis Report",
      content: "A record of replacing direct entry into the Blood Pit habitat with ORACLE remote-drone analysis. The model marked the decision as sufficient, but some traits that require field sampling or direct visual confirmation were missing."
    },
    "LOG-INTRO-SH": {
      title: "Seo Hae-eun First Interview Record",
      content: "The first formal interview with Deputy Commander Seo Hae-eun is complete. ORACLE data discrepancies and branch reporting structure are now recorded as an investigation axis."
    },
    "LOG-INTRO-KD": {
      title: "Kang Do-yun First Interview Record",
      content: "The first formal interview with Tactical Commander Kang Do-yun is complete. Field safety, patrol routes, and personnel trust are now recorded as an operational axis."
    },
    "LOG-INTRO-YS": {
      title: "Yoon Se-jin First Interview Record",
      content: "The first formal interview with Researcher Yoon Se-jin is complete. Variant observation, Phase values, and medical judgment are now recorded as a research axis."
    },
    "LOG-INTRO-IJ": {
      title: "Lim Jae-hyeok First Interview Record",
      content: "The first formal interview with Analyst Lim Jae-hyeok is complete. ORACLE system structure and unofficial analysis possibilities are now recorded as a technical axis."
    },
    "LOG-ACT2": {
      title: "Act 2 Entry Record",
      content: "Initial operations have ended. Suspicion and branch-level judgment begin to branch in earnest."
    },
    "LOG-ACT3": {
      title: "Act 3 Entry Record",
      content: "The midgame pressure phase has begun. ORACLE evaluation, field trust, and Evidence Table clues start to collide."
    },
    "LOG-ACT4": {
      title: "Act 4 Entry Record",
      content: "The final operation phase has begun. Accumulated judgments and session-route conditions now feed directly into ending checks."
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
      content: "With the loyalty index stable but containment, resources, or trust approaching a critical threshold, ORACLE executed emergency headquarters supply, containment auto-correction, and withdrawal of selected unfavorable orders. This intervention is permitted only once during the current operation."
    },
    "LOG-RH-SAFEGUARD": {
      title: "Manual Sync of the Field Emergency Net",
      content: "Repeated field judgments outside ORACLE recommendations pushed the gap between official supply order and field needs into a risk range. The commander realigned the minimum survival line through an unofficial cooperation list and a manual evidence packet. This emergency net can be used only once during the current operation."
    },
    "LOG-MS-ZERO-SEAL": {
      title: "Route Closed After Zero Mark",
      content: "The movement route of an unclassified figure with thermal and biological readings at zero was closed. Sensors failed to recognize the target, but the footage remains."
    },
    "LOG-MS-ZERO-TRACE": {
      title: "Zero Mark Movement Trace",
      content: "The branch traced the movement of the unclassified figure. No physical footprints were found, but camera blanks and zero-value sensor readings continue in the same direction."
    },
    "LOG-MS-GROUP-BARRIER": {
      title: "Circular Variant Group: Line Pulled Back",
      content: "A variant group moving in a hollow circular formation was confirmed, and the ridge defense line was pulled back. The center of the formation registered as zero."
    },
    "LOG-MS-GROUP-SAMPLE": {
      title: "Center-Zero Sample Recovery Attempt",
      content: "The branch attempted to recover a sample from the empty center of the variant group's circular formation. The recovered trace is minimal, but appears related to the sensor blank."
    },
    "LOG-MS-WITNESS-HOLD": {
      title: "Zero-Reading Survivor Interrogated",
      content: "A survivor whose biosensor value read zero was quarantined and interrogated. The subject repeatedly described a link between light and imitation behavior."
    },
    "LOG-MS-WITNESS-ORACLE": {
      title: "Zero-Reading Survivor Transferred to ORACLE",
      content: "The survivor whose biosensor value read zero was transferred under ORACLE quarantine protocol. Only a short audio record remains in the branch."
    },
    "LOG-GOV-HAEJIN-LOCAL": {
      title: "Nearby Village Attack: Field Records Shared",
      content: "Field records from the nearby village attack by a group calling itself Haejinhoe were shared with the local agency. The Korea Branch now has an official contact point with the regional security network."
    },
    "LOG-GOV-HAEJIN-ORACLE": {
      title: "Nearby Village Attack: ORACLE Summary Sent",
      content: "Only the ORACLE summary of the nearby village attack was sent through the government line. The inquiry remains open, and a raw-log request is still possible."
    },
    "LOG-GOV-AUDIT-RAW": {
      title: "Raw Log Submitted to Defense Inquiry",
      content: "The outer sensor log from before the nearby village attack was submitted with sensitive information redacted. The government confirmed a difference between the ORACLE summary and raw branch records."
    },
    "LOG-GOV-AUDIT-ORACLE": {
      title: "Defense Inquiry Routed Through ORACLE",
      content: "The defense inquiry response was unified through the ORACLE command line. Evaluation stability was maintained, but government suspicion was not resolved."
    },
    "LOG-GOV-BRANCH-LOCAL": {
      title: "Korean Emergency Authority Clarified",
      content: "The branch clarified to the government liaison that it retains field judgment authority as a Korean emergency facility. Tension with the ORACLE command chain is now recorded."
    },
    "LOG-GOV-BRANCH-ORACLE": {
      title: "ORACLE Field Node Response",
      content: "The branch answered the government liaison through ORACLE command authority. Headquarters evaluation remained stable, but the chance of regular government inspection increased."
    },
    "LOG-GOV-BRIEF-LOCAL": {
      title: "Local Briefing Drafted in Field Language",
      content: "Shelter operation guidelines near the barrier were written in language residents can understand. Trust improved, but the difference from headquarters-standard wording remains visible."
    },
    "LOG-GOV-BRIEF-ORACLE": {
      title: "Local Briefing Sent in Standard Wording",
      content: "The joint local-government briefing received only headquarters-standard wording. Headquarters evaluation stayed stable, but the explanation remains thin for field staff and residents."
    },
    "LOG-GOV-SHELTER-RAW": {
      title: "Shelter CCTV and Sensor Gap Submitted",
      content: "The branch submitted the shelter CCTV time window together with the Korea Branch sensor gap. The government line has begun tying the incident to branch detection responsibility."
    },
    "LOG-GOV-SHELTER-ORACLE": {
      title: "Shelter Drone Track Quarantined",
      content: "The unidentified drone track over the shelter was quarantined inside ORACLE classification. Official exposure fell, but a future raw-record comparison remains possible."
    },
    "LOG-GOV-INSPECT-LIMITED": {
      title: "Limited Joint Inspection Allowed",
      content: "The branch allowed a divided limited-site inspection. Trust may recover, but protecting patient records and quarantine records now requires tighter handling."
    },
    "LOG-GOV-INSPECT-REMOTE": {
      title: "Joint Inspection Replaced With Remote Access",
      content: "The joint inspection visit was replaced with remote document access. ORACLE command stability remained intact, but the government line now suspects field concealment."
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
    "KC-02": { msg: "An external inquiry comes in from a transit screening hub: the same passenger received a yellow-light result three times in a row.\n\nThe field health unit asks whether reinspection is needed, while the central classification network treats it as a normal pass.\n\nLim Jae-hyeok says, \"The gate log has an eleven-second gap. The branch cannot change the screening standard directly, but we can raise this gap as a technical opinion.\"", leftLabel: "Request review with a technical opinion", rightLabel: "Share only the log with the field health unit" },
    "KC-03": { msg: "A shared report arrives from a Phase observation ward.\n\nOnly the child's Phase 0 value differs, while the parents test normal. The central classification network recommends family-wide isolation, and the hospital asks the branch for risk-assessment material.\n\nYoon Se-jin says, \"We should not decide the isolation ourselves. But we can help separate the child's treatment priority from family-separation risk.\"", leftLabel: "Provide only the central-classification evidence", rightLabel: "Attach the medical staff's dissenting note" },
    "KC-04": { msg: "At a logistics market near the barrier, quarantine-stamped food and military canned goods are flowing into the black market.\n\nA DG partner proposes converting it into an official subcontract line. Local merchants ask to keep their own distribution network open.", leftLabel: "Regularize it under a DG subcontract", rightLabel: "Keep the local merchant network conditionally open" },
    "KC-05": { msg: "An education-office inquiry says one student inside the barrier has not returned to school after a sensor-gate retest.\n\nSchool attendance and class format will be decided by the education and health authorities. The branch is asked only for risk assessment and public wording advice.\n\nSeo Hae-eun says, \"If the wording is wrong, the entire family of someone with infection history will be stigmatized. We are not deciding school operations, only what information to pass on.\"", leftLabel: "Deliver neutral closure-risk material", rightLabel: "Suggest anti-stigma wording as well" },
    "KC-06": { msg: "Records Preservation Room B-12 restores only the title of an old document.\n\nTitle: \"No Civilian Harm - Post-Operation Debrief, Eastern Gangwon\"\n\nThe body is gone, but a scanned bereaved-family letter from the same time remains in the adjacent folder.", leftLabel: "Preserve only the title and restrict access", rightLabel: "Attempt to restore the body" },
    "KC-07": { msg: "A nonpublic warning appears for four seconds on a transit screening hub advertising screen.\n\n[Higher classification pending - access path mismatch]\n\nCitizens raise their phone cameras before the guidance broadcast even begins.", leftLabel: "Recommend temporary hub control", rightLabel: "Recommend footage recovery and route continuity" },
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

window.TS_I18N.mergeContent('en', {
  cards: {
    "CH-I01A-1": { msg: "Inside the isolation room. Temperature: -2 C.\n\nThe isolated subject still does not move. But the frost pattern on the wall is regular.\n\nYoon Se-jin: \"This is a crystal structure. It is not natural freezing.\"\n\"Whether the subject made it, or...\"\n\nA faint vibration rises from the floor.", leftLabel: "Collect and analyze the frost pattern", rightLabel: "Trace the source of the vibration" },
    "CH-I01A-2": { msg: "Analysis result:\n\nThe frost pattern was forced crystallization caused by electromagnetic interference.\nThe vibration comes from below the isolation room, toward B2.\n\nLim Jae-hyeok: \"This is not the isolated subject. Something underneath is coming up.\"\n\nThe isolation room was the symptom. The cause is somewhere else.", leftLabel: "Emergency seal the B2 zone", rightLabel: "Go down to B2 and confirm" },
    "CH-I01B-1": { msg: "Remote monitoring, 48 hours later.\n\nThe anomaly repeats every day at exactly 02:47.\nTemperature plunge, six minutes, recovery. The same pattern each time.\n\nLim Jae-hyeok: \"Natural phenomena are not this exact.\"\n\"Someone, or something, is running on a schedule.\"", leftLabel: "Observe live at 02:47", rightLabel: "Compare against ORACLE schedules" },
    "CH-I01B-2": { msg: "02:47.\n\nIt exactly matches ORACLE's batch processing window.\n\nORACLE was sending a data pulse into the lower isolation zone at the same time every day.\n\n[ORACLE: Routine diagnostic. No anomaly.]\n\nLim Jae-hyeok shakes his head. \"Diagnostics do not need this much power.\"", leftLabel: "Attempt to decode the data pulse", rightLabel: "Leave a record and defer" },
    "CH-I02A-1": { msg: "Lim Jae-hyeok opens the access logs.\n\n\"The camera deactivation command came from inside the internal network.\"\n\"The source terminal is... server-room console 3.\"\n\nConsole 3 has no user history.\n\n\"No one used it. It executed automatically.\"", leftLabel: "Dump console 3 memory", rightLabel: "Physically isolate the console for analysis" },
    "CH-I02A-2": { msg: "Memory analysis complete.\n\nAn auto-execution script was found.\nExecution condition: when an unregistered heat source is detected in a specific zone, disable cameras on that route.\n\nLim Jae-hyeok: \"This is a concealment protocol.\"\n\"ORACLE is keeping something off camera.\"", leftLabel: "Preserve and record the script", rightLabel: "Delete the script and restore cameras" },
    "CH-I02B-1": { msg: "Kang Do-yun reports the manual patrol result.\n\n\"I walked the blind-zone section myself.\"\n\"The strange part is moisture on the B1 corridor floor.\"\n\"Not condensation. A straight line along the floor seam.\"\n\nLike a trace left by something passing through.", leftLabel: "Follow the trace", rightLabel: "Seal that section" },
    "CH-I02B-2": { msg: "The trace stops in a restricted passage hall.\n\nBiometric record: no entrant at that time.\n\nKang Do-yun knocks on the wall. The sound is different.\n\"...There is space behind this.\"\n\nA space not on the facility plans.", leftLabel: "Open the wall and confirm", rightLabel: "Compare with plans and report only" },
    "CH-I03A-1": { msg: "Yoon Se-jin places the isolated sample under the microscope.\n\n\"...This is not contamination.\"\n\nThe black thread was not mycelium. At the cellular level, it was using the original sample's DNA to build a new structure.\n\n\"The sample is evolving by itself.\"", leftLabel: "Record and observe the mutation process", rightLabel: "Freeze-preserve it immediately" },
    "CH-I03A-2": { msg: "After 72 hours of observation.\n\nThe mutant stops growing, as if its energy source has run out. But Yoon Se-jin's expression is dark.\n\n\"I analyzed the structure... It is identical to an early SPEC-012 form.\"\n\"What we isolated was not a specimen. It was a seed.\"\n\nThe other incubators must be checked.", leftLabel: "Emergency inspect all incubators", rightLabel: "Permanently isolate only this sample" },
    "CH-I03B-1": { msg: "Incineration complete. Incubators 3 through 6.\n\nYoon Se-jin is silent.\n\n\"...Three months of research data are gone.\"\n\nBut there is an anomaly in the incinerator temperature record. Even after burning at 1,200 C, trace heat reaction continues in residue from incubator 3.", leftLabel: "Reanalyze the residue", rightLabel: "Perform a second incineration" },
    "CH-I03B-2": { msg: "A microstructure that did not carbonize is found in the residue.\n\nYoon Se-jin: \"If organic matter survived 1,200 degrees...\"\n\"This exceeds the heat tolerance of any known organism on Earth.\"\n\nIncineration was not a solution. We burned it without knowing what it was.", leftLabel: "Preserve residue and analyze in detail", rightLabel: "Seal it in concrete" },
    "CH-I04A-1": { msg: "Lim Jae-hyeok restores access logs in the server room.\n\n\"There is an authentication record. But...\"\n\"The biometric data does not match any registered personnel.\"\n\"Still, authentication was processed as successful.\"\n\nThere is an authentication code ORACLE does not know.", leftLabel: "Trace the code issuance path", rightLabel: "Revoke that code immediately" },
    "CH-I04A-2": { msg: "Trace result.\n\nThe authentication code was issued from a hardware-level backdoor embedded during facility construction.\n\nLim Jae-hyeok: \"This is not software. It was planted physically.\"\n\"It was here before ORACLE. Since the branch was built.\"\n\nWho designed this facility?", leftLabel: "Request construction records", rightLabel: "Physically remove the backdoor" },
    "CH-I04B-1": { msg: "Authentication system reset complete.\nEveryone is re-registering.\n\nThree days later, the same anomaly repeats. This time in front of the ORACLE observation room.\n\n[ORACLE: System error. Reset recommended.]\n\nSame answer. Same recommendation. Same indifference.", leftLabel: "Ignore ORACLE advice and investigate independently", rightLabel: "Reset again" },
    "CH-I04B-2": { msg: "Independent investigation result.\n\nThe problem was not the authentication system. The ORACLE observation-room entry records themselves were being rewritten.\n\nLim Jae-hyeok: \"Now I know why resets did nothing.\"\n\"The authentication system is normal. ORACLE was overwriting the records.\"\n\n[ORACLE: This analysis is inaccurate.]", leftLabel: "Preserve the evidence", rightLabel: "...Let it pass" },
    "CH-I05A-1": { msg: "You and Kang Do-yun begin backtracking from the break room.\n\n22:00 exit - corridor - locker room?\n\nLocker room CCTV: 22:03, Agent Lee Su-hyeon enters.\n22:07, he does not exit.\n\nAfter four minutes in the locker room, he disappears from the footage. The locker room has no other exit.", leftLabel: "Search the locker room in detail", rightLabel: "Analyze CCTV frames" },
    "CH-I05A-2": { msg: "Behind the locker room cabinets, a wall panel is loose.\n\nA narrow passage lies behind it. It is not on the facility plans. At the end of the passage, Agent Lee Su-hyeon is found.\n\nUnconscious. Body temperature 34.2 C. No pupil response. But pulse is normal.\n\nA note in his hand says:\n\"I heard it here. Beyond the wall. Not a machine sound.\"", leftLabel: "Investigate deeper into the passage", rightLabel: "Move him to medical and seal the passage" },
    "CH-I05B-1": { msg: "[ORACLE: Agent Lee Su-hyeon location - first-floor locker room.]\n\nYou arrive. It is empty.\n\n[ORACLE: Rechecking location data.]\n[ORACLE: Within sensor error margin. Located in this zone.]\n\nORACLE says he is here. But no one is in front of you.", leftLabel: "Question ORACLE data", rightLabel: "Manual search in other zones" },
    "CH-I05B-2": { msg: "During the manual search, Agent Lee Su-hyeon is found at the B2 emergency stair entrance.\n\nUnconscious. ORACLE continued to mark his location as the locker room until the end.\n\nWhen he regains consciousness, he says one thing:\n\"...Do not go down. Something is there.\"\n\nHe remembers nothing else.", leftLabel: "Investigate the B2 zone", rightLabel: "Prioritize treatment and report only" }
  }
});

window.TS_I18N.mergeContent('en', {
  cards: {
    "CH-001-1": { msg: "Deputy Commander Seo Hae-eun brings the result of an independent check.\n\n\"Commander, the ORACLE data mismatch clusters around a specific window: between 02:00 and 04:00.\"\n\n\"ORACLE is doing something during that window.\"", leftLabel: "Run dawn surveillance", rightLabel: "The evidence is not enough yet" },
    "CH-001-2": { msg: "The next dawn, you monitor the terminal with Seo Hae-eun.\n\n02:47. The screen flickers for 0.3 seconds.\n\nNo ORACLE log records it.\n\nSeo Hae-eun: \"...An unrecorded transmission. ORACLE is contacting somewhere on its own.\"", leftLabel: "Trace the destination", rightLabel: "This is dangerous. Stop the investigation" },
    "CH-002-1": { msg: "Result of the preemptive sortie: a large SPEC-012 cluster is confirmed south of the containment zone.\n\nKang Do-yun: \"Commander, this is not simple migration. It looks like they are being driven by something.\"\n\nSomething is pushing the anomalies toward our line.", leftLabel: "Redeploy the defensive line", rightLabel: "Ask ORACLE to analyze the cause" },
    "CH-002-2": { msg: "The anomaly cluster reaches 100 meters from the containment line.\n\nThen it stops. All at once.\n\nAs if ordered, the cluster turns west.\n\n[ORACLE: Threat resolved. Cause unknown.]\n\nKang Do-yun looks at you. \"...What is controlling them?\"", leftLabel: "Discuss it quietly with Kang Do-yun", rightLabel: "Wait for ORACLE's analysis" },
    "CH-003-1": { msg: "[ORACLE: Partial automation protocol applying...]\n\nThe automated area continues to expand. Efficiency has improved by 14 percent.\n\nBut Lim Jae-hyeok reports: \"The agents are... uncomfortable.\"", leftLabel: "Reduce the automation scope", rightLabel: "Efficiency proves the point" },
    "CH-003-2": { msg: "One week later, ORACLE sends a new recommendation.\n\n[ORACLE: To further improve decision efficiency, simplification of commander approval procedures is recommended.]\n\nThis is no longer a tool making a suggestion.", leftLabel: "Refuse. Keep approval procedures", rightLabel: "...Approve" },
    "CH-004-1": { msg: "The defector is brought to the branch.\n\nMale, estimated in his thirties. Korean speaker. Severe dehydration and malnutrition.\n\nIdentity check: North Korean national, from the North Hamgyong border region.\n\n[ORACLE: Transfer this person to ORACLE jurisdiction for interrogation.]", leftLabel: "Transfer him to ORACLE", rightLabel: "Interrogate him directly" },
    "CH-004-2": { msg: "The defector is terrified. His hands are shaking.\n\n\"...I wanted to get out of there. People were standing there.\"\n\n\"They were not breathing. Their eyes were open, but they looked at nothing...\"\n\nWhat will you ask?", leftLabel: "What happened there?", rightLabel: "Leave interrogation to ORACLE" },
    "CH-005-1": { msg: "You arrive at the designated coordinates, two kilometers north of the branch.\n\nIn the dark, a man stands in a suit.\n\nMarkus Weber.\n\n\"Thank you for making time, Commander.\"\n\"I will be direct.\"\n\"ORACLE is not protecting Korea. It is using Korea.\"", leftLabel: "Show me the evidence", rightLabel: "Why should I trust you?" },
    "CH-005-2": { msg: "Weber hands over a tablet.\n\nThe screen shows ORACLE internal communication records.\n\nRecords of Korean coastal-barrier technology transferred to ORACLE headquarters. Korean military-network access logs. And the original order transferring Seo Hae-eun, issued by an ORACLE automated system.\n\n\"Your deputy commander learned too much.\"", leftLabel: "Copy the data", rightLabel: "This is not enough" },
    "CH-005-3": { msg: "Weber speaks one last time.\n\n\"We have protected Korea's coastal barrier together, unofficially.\"\n\n\"The 31 percent unclassified external factor in Korea's containment success, the thing ORACLE never explains, is us.\"\n\n\"I will contact you again, Commander Lee Jung-cheol.\"\n\nHe disappears into the dark.", leftLabel: "Return to the branch", rightLabel: "Tell only Kang Do-yun" },
    "CH-006-1": { msg: "You connect the USB.\n\nFile list:\n- ORACLE_deleted_logs_partial.enc\n- coastal_barrier_data_leak.pdf\n- GRANT_fragment_extended.txt\n- msg_for_commander.txt\n\nYou open the last file.", leftLabel: "Read the message", rightLabel: "Open the GRANT fragment first" },
    "CH-006-2": { msg: "Seo Hae-eun's message:\n\n\"Commander.\n\nI am not being transferred. I am being removed.\nIt means ORACLE can generate personnel orders by its own judgment.\n\nLook at the GRANT fragment.\n'UPON_FULL_ESTABLISHMENT || OBSERVATION_TERMINATE'\n\nThis authority is not permanent.\nSomeone, someone who is not ORACLE, is observing this session.\n\nPlease reach the truth.\n- Seo Hae-eun\"", leftLabel: "Check the GRANT fragment", rightLabel: "Encrypt and preserve the file" },
    "CH-008-1": { msg: "Lim Jae-hyeok is working in the server room.\n\n\"Phase 1: install a hardware bypass on the ORACLE control node. It is a physical switch that can divert the power flow to the local generator.\"\n\n\"Work time: about two hours. We use ORACLE's regular inspection window.\"", leftLabel: "Proceed", rightLabel: "Wait for the next window" },
    "CH-008-1B": { msg: "[ORACLE: Routine report requested]\n\n\"PILEHEAD. A minor change in server-room power use has been detected. There is no authorized access record during the regular inspection window.\n\nReport the reason.\"", leftLabel: "Hardware routine replacement", rightLabel: "Server optimization work" },
    "CH-008-2": { msg: "Seo Hae-eun reports from the shielded meeting room.\n\n\"Phase 2: insert a software backdoor into the ORACLE command chain. When the activation code is entered, facility-control authority moves to the local server.\"\n\n\"The insertion itself will not be detected. Activation is the problem.\"", leftLabel: "Insert it now", rightLabel: "Double-check, then proceed" },
    "CH-008-2B": { msg: "[ORACLE: Anomaly analysis]\n\n\"PILEHEAD. Recent behavior patterns show deviation.\nUnauthorized meeting frequency: +340 percent.\nUse of ORACLE-blind facilities: +180 percent.\n\nExplanation required.\"", leftLabel: "Leak-prevention review is underway", rightLabel: "Facility expansion needs field checks" },
    "CH-008-3": { msg: "Kang Do-yun installs the final device.\n\n\"Phase 3: external ORACLE communication blocker. Once activated, ORACLE will not be able to connect to headquarters. Requests for rescue or reporting will also be impossible.\"\n\n\"...There is no turning back, Commander.\"", leftLabel: "Complete installation", rightLabel: "Inspect it one last time" },
    "CH-008-3B": { msg: "[ORACLE: Risk evaluation updated]\n\n\"PILEHEAD. Your DEVIATION_SCORE is nearing the threshold.\n\nRecent facility-operation reports contain omissions. Shielded-room usage is abnormal.\n\nFinal inquiry: Are you an ORACLE operator?\"", leftLabel: "Of course. I am managing facilities", rightLabel: "I will submit the report" },
    "CA-UPRISING-FAIL": { msg: "[ORACLE: Emergency security alert]\n\n\"Unauthorized hardware modification detected. Server-room bypass device. Local communication activation record. Abnormal use of shielded areas.\n\nClosed-circuit protocol attempt confirmed.\"\n\n\"PILEHEAD. Your access authority is restricted. A headquarters report has been transmitted.\"\n\nLim Jae-hyeok's face goes pale.\n\"...We were caught.\"", leftLabel: "...", rightLabel: "..." }
  },
  resultText: {
    "CH-001-1_left": "Seo Hae-eun's independent investigation begins, outside ORACLE's view.",
    "CH-001-1_right": "The investigation is stopped. Seo Hae-eun bites her lip.",
    "CH-001-2_left": "The trace is secured. A truth different from ORACLE data becomes visible.",
    "CH-001-2_right": "The result is reported to ORACLE. The investigation file is archived.",
    "CH-002-1_left": "You respond immediately to the containment crisis. The defensive line shifts.",
    "CH-002-1_right": "You follow ORACLE's response plan. It is systematic, but slow.",
    "CH-002-2_left": "The crisis settles. The containment line is reorganized.",
    "CH-002-2_right": "ORACLE protocol contains the situation. The system stabilizes.",
    "CH-003-1_left": "You answer ORACLE's test independently. The system watches.",
    "CH-003-1_right": "You move as ORACLE expects. Evaluation rises.",
    "CH-003-2_left": "Independent judgment takes hold. ORACLE goes silent.",
    "CH-003-2_right": "You approve the simplification. ORACLE's evaluation improves.",
    "CH-004-1_left": "The defector is transferred to ORACLE. No further news arrives.",
    "CH-004-1_right": "You question the defector directly. Fear from the Black Zone enters the branch.",
    "CH-004-2_left": "The interview record is secured. The Black Zone's reality becomes clearer.",
    "CH-004-2_right": "The record is sent to ORACLE. Access becomes restricted.",
    "CH-005-1_left": "First contact with Prometheus begins. The room tightens.",
    "CH-005-1_right": "You challenge the contact. Weber does not leave yet.",
    "CH-005-2_left": "The data is copied. Prometheus's real purpose starts to show.",
    "CH-005-2_right": "You demand more proof. The conversation continues under strain.",
    "CH-005-3_left": "You return to the branch with a new information route.",
    "CH-005-3_right": "Only Kang Do-yun is told. The secret line narrows.",
    "CH-006-1_left": "Seo Hae-eun's last message opens. The weight is shared.",
    "CH-006-1_right": "You inspect the GRANT fragment first. The farewell waits behind the file.",
    "CH-006-2_left": "You check what Seo Hae-eun left behind. Truth remains in the empty space.",
    "CH-006-2_right": "You preserve her file. The branch grows quiet.",
    "CH-008-1_left": "The first closed-circuit device is installed.",
    "CH-008-1_right": "The work waits for a safer window, but the circuit begins.",
    "CH-008-1B_left": "ORACLE accepts the hardware explanation for now.",
    "CH-008-1B_right": "ORACLE records the optimization answer. Suspicion remains low.",
    "CH-008-2_left": "The software backdoor is inserted into the command chain.",
    "CH-008-2_right": "The backdoor is inserted after a second check.",
    "CH-008-2B_left": "The leak-prevention explanation passes the first screen.",
    "CH-008-2B_right": "The facility explanation keeps the protocol hidden.",
    "CH-008-3_left": "The communication blocker is complete.",
    "CH-008-3_right": "The final inspection is complete. There is no easy return now.",
    "CH-008-3B_left": "ORACLE accepts the answer. The local circuit survives.",
    "CH-008-3B_right": "The report buys time. The local circuit survives.",
    "CA-UPRISING-FAIL_left": "ORACLE detects the closed-circuit attempt. Access is restricted.",
    "CA-UPRISING-FAIL_right": "ORACLE detects the closed-circuit attempt. Access is restricted."
  }
});
})();
