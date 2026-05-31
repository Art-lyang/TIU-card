// lang-evening-extra-en.js - English overlays for extra evening chats.
(function(){
if(!window.TS_I18N||typeof window.TS_I18N.mergeContent!=='function')return;
window.TS_I18N.mergeContent('en', {
  eveningChats: {
    "doyun_1_2-5": { lines: ["I just finished the night patrol.", "There was a thermal reaction south of the containment line, but it was a false positive.", "False positives have been increasing lately. I cannot tell whether it is the equipment or the environment."] },
    "doyun_1_3-5": { lines: ["Back in special forces, I only had to follow orders.", "Here is different. The enemy's shape is different. The terrain is different.", "Still... I am glad you are here, Commander. The chain of command feels steady again."] },
    "doyun_1_4-5": { lines: ["There was something strange outside the containment line.", "There were marks on a tree. Not made by a person.", "Maybe an anomaly marking territory... I should ask Se-jin."] },
    "doyun_2_7-11": { lines: ["Morale is slipping a little among the agents.", "Night-shift rotation is off. Three people are short on sleep.", "I will rebuild the roster, with your permission."] },
    "doyun_2_11-14": { lines: ["I noticed something during training today.", "The agents are not afraid of anomalies. They are afraid of what they do not know.", "More information should be shared... but ORACLE only gives the minimum."] },
    "haeun_1_2-5": { lines: ["I am taking a short break from organizing data.", "I am restructuring the branch reports to match the standard format.", "Since you have arrived, Commander, I wanted to clean up the document system too."] },
    "haeun_1_3-5": { lines: ["When I work late alone, I start thinking too much.", "The ORACLE patterns I saw in overseas analysis do not quite match the texture of this Korea Branch.", "It is too early to conclude anything. That is why I am watching it carefully."] },
    "haeun_1_4-5": { lines: ["I am organizing communication logs.", "There are quite a few external reception records, so they need classification.", "I will report once they are sorted."] },
    "haeun_2_8-12": { lines: ["Commander, may I ask you something?", "Sometimes I am not sure whether following ORACLE's orders is really the right thing.", "The more I look at the data, the more it feels like something is missing."] },
    "haeun_2_12-14": { lines: ["While writing the report, I looked for records from the previous commander.", "There are none. No operation logs for the three months before your assignment.", "If ORACLE managed the branch, there should be logs... They were deleted."] },
    "sejin_1_2-4": { lines: ["Commander, the lab temperature is a little unstable.", "It could affect anomaly sample storage, so I am monitoring it.", "I asked Jae-hyeok to take a look at the cooling system."] },
    "sejin_1_4-5": { lines: ["When I wrote papers, data was everything.", "Here... I can feel that there are people behind the data.", "The anomalies may have been people once too. Thinking that way changes the research."] },
    "sejin_1_5-5": { lines: ["I found seasonality in anomaly behavior patterns.", "When temperature drops, activity decreases. It is not hibernation, but close.", "If we use this, we may improve containment efficiency."] },
    "sejin_2_7-11": { lines: ["I have not been sleeping well lately.", "The research will not leave my head... I see the data even at night.", "It is fine. This is passion, not stress. Probably."] },
    "sejin_2_12-14": { lines: ["I am observing early-stage infected anomalies.", "They still retain human habits. Trying to open doors, tapping on walls.", "Is that memory, or reflex... I still do not have an answer."] },
    "jaehyuk_1_2-5": { lines: ["I am optimizing the power distribution system.", "With the current structure, power efficiency is only 68%.", "If we rewire it, we can raise it to 85%, but I need approval."] },
    "jaehyuk_1_3-5": { lines: ["I was organizing the system update logs.", "I think we need to reset the regular patch schedule.", "If you approve it, Commander, I will submit a maintenance plan."] },
    "jaehyuk_2_5-99": { lines: function(p){
      if(p&&p.sessions>0)return ["Commander. I made an analysis module while working late.", "...It is an evidence analysis framework.", "It can cross-match collected logs, observation records, and incident reports from the terminal.", "But this is strange. The table should be empty, yet some source-less log hashes are already present.", "I do not know what process created the records first. For now, I will upload the module as a commander-only module.", "...I thought we might need it."];
      return ["Commander. I made an analysis module while working late.", "...It is an evidence analysis framework.", "It can cross-match collected logs, observation records, and incident reports from the terminal.", "The table is empty for now. From here on, we can attach sources to incoming leads and compare them later.", "I will upload it as a commander-only module. You can use it during Evening Sessions.", "...I thought we might need it."];
    } },
    "sejin_session_echo_02": { lines: ["Commander, there is a strange column in the sample calibration sheet.", "It is a comparison value I have not entered yet, but the formula is already aligned.", "It could be simple autocomplete. But the baseline is too accurate.", "It feels as if someone left a blank for the value I was going to write later."] },
    "jaehyuk_2_8-12": { lines: ["I was adjusting the communication antenna direction.", "But ORACLE has locked a specific frequency band.", "It is a technically unnecessary restriction... I do not know why it is there."] },
    "jaehyuk_2_12-14": { lines: ["Commander, I saw something strange while inspecting the server room.", "There is a periodic spike in the power-consumption graph. Every day at 03:00.", "There is no activity record in the system logs for that time.", "Something is running at dawn, but it is leaving no record."] },
    "jaehyuk_2a_8-12": { lines: ["Commander, this is personal, but I was in a hacking club at university.", "I once probed a system out of curiosity. I thought it was North Korean material.", "Some of that failed structure overlaps with the texture of ORACLE logs.", "It may be a false association. For now, I am keeping it on paper only."] },
    "doyun_3b_14-16": { lines: ["Commander. I have read the record from the time you left the military.", "How far a person can endure words thrown at dead squadmates.", "I learned something similar in the field. Suppressing anger and pretending it is not there are different things.", "...That is why your arrival here did not feel strange to me."] },
    "doyun_4b_29-30": { lines: ["I checked the containment line. Weather outside the perimeter is worsening.", "...But aside from that, one personal note.", "At first, I did not fully trust this team. You were outsiders.", "Now I think this team will stay with me as long as my years in the Marines."] },
    "sejin_4b_29-30": { lines: ["Commander. Where is your family now, if I may ask?", "...I'm sorry. That was personal.", "My parents do not really know what kind of work I do here.", "That makes me want to protect both the people here and the people outside who know nothing."] }
  },
  eveningResponses: {
    "doyun_1_2-5": { a: { label: "File an equipment inspection request.", reply: "Understood. I will prepare the supply request form." }, b: { label: "Record the false positives too.", reply: "Yes. I will record all of them. There may be a pattern." } },
    "doyun_1_3-5": { a: { label: "You are adapting well.", reply: "Thank you. Having a command structure makes this much better." }, b: { label: "You need to adapt.", reply: "...Understood." } },
    "doyun_1_4-5": { a: { label: "Ask Se-jin for analysis.", reply: "Yes. I will pass it to her immediately." }, b: { label: "Photograph it and record it.", reply: "Already photographed. I will attach it to the report." } },
    "doyun_2_7-11": { a: { label: "Good. Adjust the roster.", reply: "Thank you. I will submit the new roster by tomorrow." }, b: { label: "I will handle morale.", reply: "...Understood." } },
    "doyun_2_11-14": { a: { label: "You are right.", reply: "That is why your briefings matter, Commander. They come from a person." }, b: { label: "ORACLE must have its reasons.", reply: "...I suppose so." } },
    "haeun_1_2-5": { a: { label: "You are doing well.", reply: "Thank you. I will finish sorting it soon." }, b: { label: "It is not urgent. Take your time.", reply: "Yes. I will be thorough." } },
    "haeun_1_3-5": { a: { label: "Do not overwork yourself.", reply: "...Thank you. I think I needed to hear that." }, b: { label: "Focus matters.", reply: "Yes... understood." } },
    "haeun_1_4-5": { a: { label: "Good work. Report when it is sorted.", reply: "Yes. I will upload it as soon as it is complete." }, b: { label: "Start with the highest priority items.", reply: "Yes, understood." } },
    "haeun_2_8-12": { a: { label: "I have the same question.", reply: "...I am relieved. It was not just me." }, b: { label: "Following orders is safer.", reply: "...Yes. Understood." } },
    "haeun_2_12-14": { a: { label: "Find out why they were deleted.", reply: "Yes. I will see if any part can be restored." }, b: { label: "They may have been lost during system migration.", reply: "That is possible. But we still need to confirm it." } },
    "sejin_1_2-4": { a: { label: "Tell Jae-hyeok to prioritize it.", reply: "Yes, thank you. Sample preservation is the top priority." }, b: { label: "Hold with temporary measures.", reply: "Yes... I will add extra coolant packs for now." } },
    "sejin_1_4-5": { a: { label: "That is a good perspective.", reply: "...Thank you. I am glad I can share thoughts like this." }, b: { label: "Emotional projection is dangerous.", reply: "...Yes. I will be careful." } },
    "sejin_1_5-5": { a: { label: "Reflect it in containment strategy.", reply: "Yes! I will share it with Do-yun too." }, b: { label: "Gather more data.", reply: "Understood. I will observe for one more month." } },
    "sejin_2_7-11": { a: { label: "Rest when you need to rest.", reply: "...Yes. I will try." }, b: { label: "Condition management is basic.", reply: "...Understood. I am sorry." } },
    "sejin_2_12-14": { a: { label: "I think it is memory.", reply: "...If so, they are truly sad beings." }, b: { label: "Treat them only as research subjects.", reply: "...Yes. I will exclude emotion." } },
    "jaehyuk_1_2-5": { a: { label: "Proceed.", reply: "Thank you. I will finish the work by tomorrow." }, b: { label: "Maintain current status.", reply: "...Understood. I will proceed if approval comes later." } },
    "jaehyuk_1_3-5": { a: { label: "Submit the maintenance plan.", reply: "Yes. I will organize it and report by tomorrow." }, b: { label: "Is the current status enough?", reply: "It is fine for now, but regular inspection is necessary." } },
    "jaehyuk_2_5-99": { a: { label: "Good. Bring it online now.", reply: "Yes. Commander authorization is already confirmed. You can use it now." }, b: { label: "You built this alone?", reply: "...I did not tell anyone else. I will leave the judgment to you, Commander." } },
    "sejin_session_echo_02": { a: { label: "Keep it unofficial.", reply: "Yes. I will leave it out of the official report. But I will keep the value." }, b: { label: "Check ORACLE correction first.", reply: "Understood. I will identify the cause first. If it is wrong, I will leave that record too." } },
    "jaehyuk_2_8-12": { a: { label: "Find out why it is locked.", reply: "Yes. I will check carefully." }, b: { label: "There must be a security reason.", reply: "...There might be." } },
    "jaehyuk_2_12-14": { a: { label: "03:00... keep a record.", reply: "I already have a week's pattern captured. Would you like to see it?" }, b: { label: "Could it be a system backup process?", reply: "If it were a backup, there would be logs. The lack of logs is the problem." } },
    "jaehyuk_2a_8-12": { a: { label: "That experience matters here.", reply: "...Thank you. That gives me strength." }, b: { label: "The result matters now.", reply: "Yes. I will prove it with results." } },
    "doyun_3b_14-16": { a: { label: "I am glad you are on our side.", reply: "...Thank you, Commander." }, b: { label: "Now matters more than the past.", reply: "...Understood." } },
    "doyun_4b_29-30": { a: { label: "I feel the same.", reply: "...Thank you." }, b: { label: "This is not over yet.", reply: "Yes. I will carry out the mission to the end." } },
    "sejin_4b_29-30": { a: { label: "That feeling will steady you.", reply: "...Thank you. I will be more careful because of it." }, b: { label: "Be careful with personal feelings.", reply: "...Yes. Understood." } }
  }
});

window.TS_I18N.mergeContent('en', {
  eveningChats: {
    "haeun_2a_7-12": { lines: ["Commander, I found something strange in the analysis data.", "Among the packets ORACLE sends outward, there are two encryption methods.", "One is standard headquarters encryption. The other... is a structure I have never seen before.", "I will look into it a little more."] },
    "haeun_3a_14-18": { lines: ["This is not something that needs to go on record.", "In graduate school, I had a senior researcher I worked with.", "We coauthored a paper on asymmetric signal detection, and that method is now being used directly in ORACLE analysis.", "It is ironic. The same method is now a tool for doubting ORACLE."] },
    "haeun_3a_19-23": { lines: ["Commander, one thing before you sleep.", "I encrypted the analysis logs I organized and saved them to my personal laptop.", "If something happens, I wanted you to be able to restore them.", "...Maybe I am being oversensitive. But I wanted to leave them behind."] },
    "haeun_4a_29-31": { lines: ["Commander. Your decisions have become faster lately.", "Compared with the beginning, there is much less hesitation. I mean that positively.", "Still, sometimes it may be worth slowing down on purpose.", "What ORACLE cannot predict is, in the end, slow human judgment."] },
    "haeun_4a_32-33": { lines: ["I am working late, so I made two cups of tea. Would you like one?", "...It is nothing important. Just that.", "Tonight I wanted to rest a little instead of analyzing.", "You need rest too, Commander."] },
    "haeun_4a_34-35": { lines: ["When I first arrived at this branch, I believed ORACLE was perfect.", "Only after you came here did I learn that perfection and rightness are different things.", "I will remember for the rest of my life that you protected my place here.", "...Thank you."] },
    "jaehyuk_3a_14-17": { lines: ["Yesterday, ORACLE's system self-diagnostic log was strange.", "For 0.4 seconds, an item called commander loyalty index appeared.", "I could not screenshot it, and the log was automatically deleted.", "...This was not my imagination."] },
    "jaehyuk_3a_18-23": { lines: ["Would you like some instant noodles? I made a late-night meal.", "...It is literally just noodles. Not a secret meeting.", "Sometimes you need to be a person too, Commander.", "To protect anything, you have to endure. To endure, you have to eat."] },
    "jaehyuk_4a_29-30": { lines: ["Commander. My mother farms in the countryside.", "Sometimes she calls and asks whether ORACLE is good.", "I cannot answer. If I say yes, it feels like a lie. If I say no, she will worry.", "...So I just tell her the work is interesting."] },
    "jaehyuk_4a_31-32": { lines: ["Commander. I prepared a separate backup drive.", "It is for contingencies. Seo Hae-eun's analysis logs are included too.", "The location is inside the shielded conference-room wall. Only you should know.", "It is insurance. I hope we never have to use it."] },
    "jaehyuk_4a_33": { lines: ["Commander, I just thought of something.", "One reason I do this work is that I believed systems were better than people.", "People are swayed by emotion, while systems are objective.", "...Now I think a little differently."] },
    "jaehyuk_4a_34": { lines: ["Looking at ORACLE's final session count, this will be an operation people remember.", "Your judgment will change history. That is not an exaggeration.", "I am just next to it, recording the logs.", "I feel proud. That is all."] },
    "jaehyuk_4a_35": { lines: ["Commander. This was a joke I once told Seo Hae-eun.", "When ORACLE finally opposes us, it becomes a mirror.", "Now I think that was true.", "The way you judge things defines ORACLE."] },
    "doyun_2b_8-11": { lines: ["Commander. Today's patrol team returned thirty minutes late.", "Radio cut out twice, possibly because of interference.", "...It may be nothing, but I am recording it.", "I will report it as no anomaly."] },
    "doyun_3b_19-23": { lines: ["These days the agents have given you a nickname.", "The one who does not break.", "Because you do not break before ORACLE or before the anomalies.", "...They are proud. I wanted to tell you."] },
    "doyun_4b_31-32": { lines: ["Commander. Want to know one way to manage fear in the field?", "Breathe slowly three times and focus on the feeling in your soles.", "That is all. Nothing complicated.", "...You have looked tired lately."] },
    "doyun_4b_33": { lines: ["I saw stars from the outer post today. For the first time in a while.", "You do not see stars in Seoul. Out here they are clear.", "...I want this scenery to remain.", "I think that is one of the reasons we protect this place."] },
    "doyun_4b_34": { lines: ["Commander. An old superior once told me this.", "Operations never go according to plan. If the leader shakes, the operation is over.", "Watching you so far, I have never felt that person was wrong.", "...I will not shake either."] },
    "doyun_4b_35": { lines: ["Let me say one last thing.", "If this branch ends, even then...", "At the next post, I would want to serve under you again.", "That is all, Commander."] },
    "sejin_2b_9-12": { lines: ["Commander, a bird sat by the lab window today.", "Wild birds are rare near this branch, so I was happy without meaning to be.", "It felt like scenery from before EV-Sigma was still here.", "...Sorry. It is not especially important."] },
    "sejin_3b_13-16": { lines: ["Commander, please tell me when a medical judgment is needed.", "The agents' mental health is as important as combat strength.", "Stress levels are especially high lately. I am quietly holding consultations.", "I only wanted you to know."] },
    "sejin_3b_17-23": { lines: ["Commander, this may sound strange, but anomalies do not frighten me.", "What frightens me is when I begin to understand why they look this way.", "When something that should not make sense begins to make sense.", "That is a territory no ethics textbook covered."] },
    "sejin_4b_31-32": { lines: ["I brought a flowerpot into the lab. It is a hydrangea.", "Agents passing by said the room felt warmer.", "The longer a branch operates, the more it needs signs of people.", "ORACLE does not calculate things like that."] },
    "sejin_4b_33": { lines: ["Commander, one strange thing I found during anomaly research.", "Certain entities perform something close to healing on each other.", "Biologically it makes no sense, but it is in the observation records.", "...It is difficult to exclude the possibility that this species was once human."] },
    "sejin_4b_34": { lines: ["I am a doctor, but here I do not think I have done the work of a doctor properly.", "Research kept coming first. An ethics journal would reject this field report.", "Still, watching how you care for the agents teaches me.", "I want to be in that place too."] },
    "sejin_4b_35": { lines: ["Commander. I have a draft paper titled The Language of Risk.", "It is about how ORACLE's language makes danger sound ordinary.", "I may never publish it, but I wanted to show it to you.", "Someday, after this branch is settled."] }
  },
  eveningResponses: {
    "haeun_2a_7-12": { a: { label: "Keep checking it quietly.", reply: "Yes. I will keep it outside the official report for now." }, b: { label: "Do not overreach.", reply: "Understood. I will stay within the data." } },
    "haeun_3a_14-18": { a: { label: "Then use it carefully.", reply: "Yes. I will make sure the tool does not become the conclusion." }, b: { label: "Do not let the past steer you.", reply: "...Understood. I will separate memory from evidence." } },
    "haeun_3a_19-23": { a: { label: "Good judgment.", reply: "...Thank you. I wanted someone to say that." }, b: { label: "Delete any unnecessary risk.", reply: "Yes. I will reduce the exposure path." } },
    "haeun_4a_29-31": { a: { label: "I will remember that.", reply: "That alone may be enough to keep us human." }, b: { label: "We cannot afford hesitation.", reply: "Yes. I only meant that speed should still belong to you." } },
    "haeun_4a_32-33": { a: { label: "I will take one.", reply: "Then please sit for a moment. Just a moment is fine." }, b: { label: "You should rest first.", reply: "...Then I will. Thank you." } },
    "haeun_4a_34-35": { a: { label: "You protected this branch too.", reply: "...I will hold on to that." }, b: { label: "We still need you.", reply: "Yes. I will stay until the end." } },
    "jaehyuk_3a_14-17": { a: { label: "Reconstruct the trace.", reply: "I will try. Even a fragment could prove this exists." }, b: { label: "Do not trigger ORACLE.", reply: "Understood. I will only monitor passively." } },
    "jaehyuk_3a_18-23": { a: { label: "I will eat.", reply: "Good. The operation can wait five minutes." }, b: { label: "Later.", reply: "Then I will keep it warm. For a little while." } },
    "jaehyuk_4a_29-30": { a: { label: "That is an honest answer.", reply: "...Maybe. It is the least false answer I have." }, b: { label: "Keep your family out of this.", reply: "Yes. That is why I do not tell her details." } },
    "jaehyuk_4a_31-32": { a: { label: "Good. Keep it hidden.", reply: "Yes. No one else has the location." }, b: { label: "This is dangerous.", reply: "I know. But having no backup is more dangerous." } },
    "jaehyuk_4a_33": { a: { label: "People can correct systems.", reply: "I think I am finally learning that." }, b: { label: "Systems still matter.", reply: "Yes. They matter. They just cannot be the whole answer." } },
    "jaehyuk_4a_34": { a: { label: "Your logs matter too.", reply: "...Thank you. I will record them properly." }, b: { label: "Stay focused.", reply: "Yes. Pride later, precision now." } },
    "jaehyuk_4a_35": { a: { label: "Then we choose carefully.", reply: "That is the point. Carefully, and as ourselves." }, b: { label: "ORACLE is still only a system.", reply: "Yes. Which means someone has to decide what it becomes." } },
    "doyun_2b_8-11": { a: { label: "Keep recording small anomalies.", reply: "Yes. Small things become routes when ignored." }, b: { label: "No anomaly is enough.", reply: "Understood. I will keep the note off the main report." } },
    "doyun_3b_19-23": { a: { label: "Tell them I am grateful.", reply: "I will. It will mean a lot to them." }, b: { label: "A nickname is not a shield.", reply: "Correct. But morale can hold a line for a few more minutes." } },
    "doyun_4b_31-32": { a: { label: "I will try it.", reply: "Good. It works better than people expect." }, b: { label: "I am fine.", reply: "Yes, Commander. I will still watch your back." } },
    "doyun_4b_33": { a: { label: "That is worth protecting.", reply: "Yes. More than the reports ever say." }, b: { label: "Do not get sentimental.", reply: "Understood. The line remains first." } },
    "doyun_4b_34": { a: { label: "Then we hold together.", reply: "Yes. Together." }, b: { label: "Hold your position.", reply: "Always." } },
    "doyun_4b_35": { a: { label: "I would trust you there too.", reply: "...Thank you, Commander." }, b: { label: "Finish this post first.", reply: "Yes. I will." } },
    "sejin_2b_9-12": { a: { label: "It is worth mentioning.", reply: "...Thank you. I wanted it to matter a little." }, b: { label: "Return to the research.", reply: "Yes. I will. I just needed one quiet moment." } },
    "sejin_3b_13-16": { a: { label: "Continue the consultations.", reply: "Yes. Quietly, and without making anyone feel weak." }, b: { label: "Report only critical cases.", reply: "Understood. I will protect privacy unless risk rises." } },
    "sejin_3b_17-23": { a: { label: "Understanding can be dangerous.", reply: "Yes. I will not confuse empathy with permission." }, b: { label: "Keep the ethics line clear.", reply: "That is what I am trying to do." } },
    "sejin_4b_31-32": { a: { label: "Leave it there.", reply: "I will. It is small, but people notice it." }, b: { label: "Do not let it disrupt work.", reply: "Of course. It is on the side shelf." } },
    "sejin_4b_33": { a: { label: "Preserve the record.", reply: "Yes. Even if it is uncomfortable, it matters." }, b: { label: "Do not call it healing yet.", reply: "Correct. I will keep the term provisional." } },
    "sejin_4b_34": { a: { label: "You are still a doctor.", reply: "...Thank you. I needed that more than I thought." }, b: { label: "Then act like one now.", reply: "Yes. I will." } },
    "sejin_4b_35": { a: { label: "Show it to me later.", reply: "I will. After this is over." }, b: { label: "Keep it safe.", reply: "Yes. I saved an offline copy." } }
  }
});

window.TS_I18N.mergeContent('en', {
  eveningResponses: {
    "doyun_2_5-7": { a: { label: "Do not forget Philadelphia.", reply: "...Yes. I feel the same way." }, b: { label: "Focus on holding the line.", reply: "Understood. That is my duty." } },
    "doyun_2_8-10": { a: { label: "Strengthen night patrols.", reply: "I will adjust the roster immediately." }, b: { label: "Leave it as an old field story.", reply: "...Understood." } },
    "doyun_3_15-21": { a: { label: "Assign budget for replacements.", reply: "Thank you. I will organize the priorities and submit them." }, b: { label: "Make the current gear last.", reply: "...Yes. I will use what we have as well as I can." } },
    "doyun_3_22-28": { a: { label: "Proceed with wall reinforcement.", reply: "Yes. I will start with the materials list." }, b: { label: "I will leave field judgment to you.", reply: "...Understood. I will take responsibility." } },
    "doyun_4_29-99": { a: { label: "We go together.", reply: "...Yes. I will follow you to the end." }, b: { label: "Do your part.", reply: "Understood, Commander." } },
    "haeun_2_5-7": { a: { label: "Are any records from then left?", reply: "Some. I will organize them and share them with you." }, b: { label: "Things are normal now, so it is fine.", reply: "...If so, that is a relief." } },
    "haeun_2_8-10": { a: { label: "Start recording the pattern.", reply: "Yes. I will proceed carefully." }, b: { label: "It may be a misunderstanding.", reply: "...It could be." } },
    "haeun_3_15-21": { a: { label: "Keep digging into that gap.", reply: "Yes. I will expand the sample and verify it." }, b: { label: "Secure proof first.", reply: "Yes. I will gather it carefully." } },
    "haeun_3_22-28": { a: { label: "Find out who is doing it.", reply: "Yes. I will start with the access logs." }, b: { label: "Restrict access to your logs.", reply: "Yes. I will take action within my authority." } },
    "jaehyuk_2_5-7": { a: { label: "Approve the pipe and distributor replacements.", reply: "Thank you. I will begin work tomorrow." }, b: { label: "Postpone low-priority repairs.", reply: "...Understood. I will handle the urgent items first." } },
    "jaehyuk_2_8-10": { a: { label: "I am thinking the same thing.", reply: "...I will record that. Please keep watching too, Commander." }, b: { label: "Focus on the job assigned.", reply: "...Yes. Understood." } },
    "jaehyuk_3_15-21": { a: { label: "Find a bypass route.", reply: "...Yes. I will look for an unofficial channel." }, b: { label: "Follow ORACLE's judgment.", reply: "...Understood." } },
    "jaehyuk_3_22-28": { a: { label: "Dig into that layer.", reply: "...I will be careful. I will leave records." }, b: { label: "It is dangerous. Keep your distance.", reply: "...Yes. I will judge carefully." } },
    "jaehyuk_4_29-99": { a: { label: "Share everything you learned.", reply: "...Yes. I will trust only you with this." }, b: { label: "Keep it hidden until it is safe.", reply: "Understood. At the right moment." } },
    "sejin_2_5-7": { a: { label: "Analyze the cause of the drift too.", reply: "Yes. I will repeat observations and confirm it." }, b: { label: "It may be chance.", reply: "...It may be." } },
    "sejin_2_8-10": { a: { label: "Use that memory in the research.", reply: "Yes... I will not forget it." }, b: { label: "Remove emotion. Treat it as data.", reply: "Understood. I will stay objective." } },
    "sejin_3_15-21": { a: { label: "Find out what that structure is.", reply: "Yes. I will organize the observation protocol." }, b: { label: "Hypotheses come after proof.", reply: "...Understood. I will approach it carefully." } },
    "sejin_3_22-28": { a: { label: "Find proof of parameter tampering.", reply: "Thank you. You will review it with me, right?" }, b: { label: "Keep observing for now.", reply: "...Yes. I will keep the records going." } },
    "sejin_4_29-99": { a: { label: "The inhibitor research is top priority.", reply: "...Thank you. I will complete it." }, b: { label: "Work only within safe limits.", reply: "Yes. I will proceed carefully." } },
    "jaehyuk_2_18-30": { a: { label: "Install the closed circuit.", reply: "Understood. I will begin. I will trust you, Commander.", log: "LOG-UPRISING-OFFER" }, b: { label: "Stand by for now.", reply: "Understood. I will keep preparations ready. Tell me when you need it.", log: null } },
    "weber_4_29-35": { a: { label: "I want to find the truth.", reply: "...Good. We will share what we have." }, b: { label: "I will withhold judgment for now.", reply: "A wise posture. There is still time." } },
    "weber_4_40-99": { a: { label: "I understand that difference.", reply: "...Then I hope you will work with us, Commander." }, b: { label: "I still cannot trust the organization.", reply: "...That is rational too." } },
    "foster_4_31-35": { a: { label: "You can still change.", reply: "...Thank you. I do not deserve to hear that." }, b: { label: "Leave the past buried.", reply: "...Thank you. That may let me take one step forward." } },
    "foster_4_40-99": { a: { label: "Korea being the success case is the danger.", reply: "Exactly. That is why you matter." }, b: { label: "Thank you for the information.", reply: "...If you need more, I will provide it." } },
    "soyoung_4_32-35": { a: { label: "Carry on Seo Hae-eun's work too.", reply: "...Yes. I will make sure it continues." }, b: { label: "If you have adapted, that is enough.", reply: "Thank you. I will live up to your expectations." } },
    "soyoung_4_40-99": { a: { label: "Share that pattern immediately.", reply: "Yes. I will send all analysis material." }, b: { label: "Hold until you have confirmation.", reply: "...Understood. I will gather more." } },
    "weber_4c_29-30": { a: { label: "I understand. Continue.", reply: "I am glad we can speak plainly." }, b: { label: "I will withhold judgment for now.", reply: "...There is time." } },
    "weber_4c_31-33": { a: { label: "Share that information.", reply: "It is already prepared." }, b: { label: "If you have interests here, there are conditions.", reply: "...The condition is your judgment." } },
    "weber_4c_34-35": { a: { label: "You are carrying his part too.", reply: "...Thank you. I will continue." }, b: { label: "Revenge will not find the answer.", reply: "I know. That is why I called it resolve." } },
    "foster_early_27-30": { a: { label: "I will listen. Keep the channel open.", reply: "...Good. Then next time, let us speak face to face." }, b: { label: "I still cannot trust you.", reply: "I expected that. But this channel will stay alive for a while." } },
    "foster_4c_29-30": { a: { label: "We both had a reason to make it this far.", reply: "...Correct." }, b: { label: "Analysis. Cold of you.", reply: "...That is how I survived." } },
    "foster_4c_31-33": { a: { label: "You are not replaceable either.", reply: "...Thank you. No one has told me that before." }, b: { label: "So self-preservation comes first.", reply: "...It is a realistic judgment." } },
    "foster_4c_34-35": { a: { label: "Korea will be different.", reply: "...You are the one who has to prove that." }, b: { label: "Thank you for the information.", reply: "...I hope it is useful." } },
    "soyoung_4c_29-30": { a: { label: "I trust your intentions.", reply: "...Thank you. I will do my best." }, b: { label: "Check Seo Hae-eun's contact path.", reply: "Yes... I will try." } },
    "soyoung_4c_31-33": { a: { label: "Share the analysis immediately.", reply: "Yes. I will organize it and send it over." }, b: { label: "Approach it carefully.", reply: "Yes. I will avoid ORACLE's notice." } },
    "soyoung_4c_34-35": { a: { label: "I believe you.", reply: "...Thank you, Commander." }, b: { label: "Show it through results.", reply: "...Yes. I will prove it with results." } },
    "haeun_3_20-24": { a: { label: "Show me the previous commander's record.", reply: "Here. I restored the voice memo too. ...Please brace yourself before you listen.", log: "LOG-090" }, b: { label: "There is an audio record too?", reply: "Yes. The quality is poor, but it contains the final moments.", log: "LOG-091" } },
    "jaehyuk_3_19-23": { a: { label: "I need to see the captured screen.", reply: "Here it is. A thirty-eight-second record. I captured all of it.", log: "LOG-092" }, b: { label: "Show me the cable trace too.", reply: "It runs down to the B3 lower bulkhead. The same place where the previous commander disappeared.", log: "LOG-093" } }
  }
});

window.TS_I18N.mergeContent('en', {
  eveningChats: {
    "jaehyuk_2_18-30": { lines: ["Commander. Do you have a moment?", "I would like to speak in the shielded conference room.", "...", "Independent server, independent comms, independent power. Everything is ready.", "These are the facilities you approved.", "It means this base can operate without ORACLE.", "...", "We plant the closed circuit.", "An independent control system that bypasses ORACLE's command structure.", "Seo Hae-eun will handle the software. I will handle the hardware.", "Kang Do-yun will handle physical control.", "...", "We can trust Prometheus, or we can escape.", "But we are the ones who protected this base.", "There is no reason to hand it over."] },
    "haeun_3_20-24": { lines: ["Commander... this is not an official report.", "I found something while restoring deleted operations logs.", "Before your assignment... it was not that this base had no commander.", "There was one. The records were deleted.", "And that person had the same questions you do."] },
    "jaehyuk_3_19-23": { lines: ["Commander. 02:47.", "You remember that something happens in the server room at that time.", "I lay in wait. Three days. Alone.", "And I saw it.", "...You need to see this yourself. Words are not enough."] },
    "weber_4c_29-30": { lines: ["Prometheus is not a government.", "It is a civilian organization. We are not asking you to join. We are asking for cooperation.", "Few people understand that distinction.", "I thought you might."] },
    "weber_4c_31-33": { lines: ["Your country's coastal barrier - we helped reinforce its design.", "A technical contribution. No compensation.", "Why? Because if Korea collapses, all of East Asia follows.", "We have interests here too. That much is true."] },
    "weber_4c_34-35": { lines: ["The reason I joined Prometheus in Germany is not complicated.", "My brother died in a Rhine anomaly incident. 2029.", "ORACLE classified it as an administrative error.", "After that, this stopped being calculation. It became resolve."] },
    "foster_early_27-30": { lines: ["A short voice packet arrives through an external channel.", "The sender does not identify himself, but the accent and phrasing match the records.", "\"Nick Foster. I am not asking to meet in person.\"", "\"If you listened to Weber, you should hear my side too.\""] },
    "foster_4c_29-30": { lines: ["Lee Jung-cheol. The time I came to your unit - that was a mistake.", "Do not misunderstand. This is not an apology. It is an analysis.", "If you had not stopped me then, the whole operation would have gone wrong.", "Neither of us would have made it this far."] },
    "foster_4c_31-33": { lines: ["Weber is a strategist. I am someone who works under him.", "There is a clear difference. If Weber dies, he is replaced.", "If someone like me dies, that is simply the end.", "That is why I am careful. Just know that."] },
    "foster_4c_34-35": { lines: ["Whether you use my information or not, I have done my part.", "One request, though.", "The commander in Philadelphia was not someone like you.", "That side is already too late. Korea is not. Not yet."] },
    "soyoung_4c_29-30": { lines: ["Commander, have you heard anything about Senior Seo Hae-eun?", "Officially she was transferred to another branch, but contact is poor.", "...I think she knew this would happen.", "I just want to finish what she could not."] },
    "soyoung_4c_31-33": { lines: ["I found a repeated pattern in the ORACLE query structure.", "Every session, your unusual decisions are being catalogued.", "Everything you decide is being classified and stored.", "...This is not simple logging."] },
    "soyoung_4c_34-35": { lines: ["Commander. I had several reasons for coming here.", "Senior Seo Hae-eun's request, my own curiosity, and other reasons too.", "But now the biggest reason I am staying is that I like the people here.", "That much is real. Please believe me."] }
  },
  eveningTrustLines: {
    doyun_injured: {
      low: [
        "...Reporting in.",
        "Returning to field duty is impossible.",
        "That is all."
      ],
      mid: [
        "...I can still function.",
        "Not being able to return to the field is... frustrating.",
        "Commander. If it concerns the mission, tell me. My head is still clear."
      ],
      high: [
        "Commander.",
        "Honestly... I am uneasy about not being out there. If something happens outside.",
        "I can still give operational advice. That is what I can do right now.",
        "...Please understand even if I am not beside you. I will follow your judgment."
      ],
      bond: [
        "Commander.",
        "...If I am alive, does this still count as serving? I feel like I will lose my mind if I cannot step into the field.",
        "But my head still works. Operations, personnel placement, anything. Ask me.",
        "...I understand the decision you made that night to keep me alive. I will not forget it."
      ]
    },
    doyun_minor_wound: {
      low: [
        "...My left arm has been treated.",
        "It would be better to reduce direct field deployment.",
        "That is the report."
      ],
      mid: [
        "The arm is wrapped. I can still move.",
        "But another underwater entry like that is out of the question for a while.",
        "If needed, I will revise the field assignments myself."
      ],
      high: [
        "Commander. The arm injury is not severe.",
        "But if I go in the same way again, my judgment may slip.",
        "I will command outer operations, but direct entry should go to another team."
      ],
      bond: [
        "Commander.",
        "I want to say I am fine, but Se-jin is right this time.",
        "Instead of going in myself, I will handle placement and extraction routes.",
        "...I will not make you pull me out because I overdid it."
      ]
    }
  }
});
})();
