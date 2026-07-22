// lang-evening-extra-en.js - English overlays for extra evening chats.
(function(){
if(!window.TS_I18N||typeof window.TS_I18N.mergeContent!=='function')return;
window.TS_I18N.mergeContent('en', {
  eveningChats: {
    "sejin_anxiety_1": { lines: ["Commander. …I haven't been sleeping well lately.", "The analysis I keep putting off piles up, and the anomalies don't wait for me.", "Am I being impatient? I just… can't shake the feeling that there's no time."] },
    "sejin_anxiety_2": { lines: ["The equipment threw another warning. I patched it for now… but I don't know how long it'll hold.", "Honestly, I'm scared. That something will go wrong in my hands.", "If I'd had just a little more support… No. I'll manage somehow."] },
    "sejin_anxiety_3": { lines: ["…It's fine. I'm fine. I keep telling myself that.", "The samples, the equipment, me — we're all at our limit. But I can't let go, can I.", "If… something happens to me, please keep the data. That's all I ask."] }
  },
  eveningResponses: {
    "sejin_anxiety_1": { a: { label: "Don't overwork yourself. I'll get you more support.", reply: "…Thank you. That's a little breathing room." }, b: { label: "Resources are tight right now. Hold on.", reply: "…Yes. I'll manage somehow." } },
    "sejin_anxiety_2": { a: { label: "Fix the equipment first. People come first.", reply: "…If you say that, I can hold on." }, b: { label: "Stay calm. Set the emotions aside.", reply: "…Understood. I'll keep it objective." } },
    "sejin_anxiety_3": { a: { label: "Don't carry it all alone. I'm here.", reply: "…Yes. I'll remember that for a long time." }, b: { label: "Just bring me results. That's your job.", reply: "…Right. My job. Understood." } }
  }
});
window.TS_I18N.mergeContent('en', {
  eveningChats: {
    "doyun_1_2-5": { lines: ["I just finished the night patrol.", "There was a thermal reaction south of the containment line, but it was a false positive.", "False positives have been increasing lately. I cannot tell whether it is the equipment or the environment."] },
    "doyun_1_3-5": { lines: ["Back in special forces, I only had to follow orders.", "Here is different. The enemy's shape is different, and so are the rules.", "...Still getting a read on it. It'll take time to get used to."] },
    "doyun_1_4-5": { lines: ["There was something strange outside the containment line.", "There were marks on a tree. Not made by a person.", "Maybe an anomaly marking territory... I should ask Se-jin."] },
    "doyun_2_7-11": { lines: ["Morale is slipping a little among the agents.", "Night-shift rotation is off. Three people are short on sleep.", "I will rebuild the roster, with your permission."] },
    "doyun_2_11-14": { lines: ["I noticed something during training today.", "The agents are not afraid of anomalies. They are afraid of what they do not know.", "More information should be shared... but ORACLE only gives the minimum."] },
    "haeun_1_2-5": { lines: ["I am taking a short break from organizing data.", "I am restructuring the branch reports to match the standard format.", "Since you have arrived, Commander, I wanted to clean up the document system too."] },
    "haeun_1_3-5": { lines: ["When I work late alone, I start thinking too much.", "The ORACLE patterns I saw in overseas analysis do not quite match the texture of this Korea Branch.", "It is too early to conclude anything. That is why I am watching it carefully."] },
    "haeun_1_4-5": { lines: ["I am organizing communication logs.", "There are quite a few external reception records, so they need classification.", "I will report once they are sorted."] },
    "haeun_2_8-12": { lines: ["Commander, may I ask you something?", "Sometimes I am not sure whether following ORACLE's orders is really the right thing.", "The more I look at the data, the more it feels like something is missing."] },
    "haeun_2_12-14": { lines: ["While writing the report, I looked for records from the previous commander.", "There are none. No operation logs for the three months before your assignment.", "If ORACLE ran the branch, there'd be logs... which means someone deleted them."] },
    "sejin_1_2-4": { lines: ["Commander, the lab temperature is a little unstable.", "It could affect anomaly sample storage, so I am monitoring it.", "I asked Jae-hyeok to take a look at the cooling system."] },
    "sejin_1_4-5": { lines: ["When I wrote papers, data was everything.", "Here... I can feel that there are people behind the data.", "The anomalies may have been people once too. Thinking that way changes the research."] },
    "sejin_1_5-5": { lines: ["I found seasonality in anomaly behavior patterns.", "When temperature drops, activity decreases. It is not hibernation, but close.", "If we use this, we may improve containment efficiency."] },
    "sejin_2_7-11": { lines: ["I have not been sleeping well lately.", "The research will not leave my head... I see the data even at night.", "It is fine. This is passion, not stress. Probably."] },
    "sejin_2_12-14": { lines: ["I am observing early-stage infected anomalies.", "They still retain human habits. Trying to open doors, tapping on walls.", "Is that memory, or reflex... I still do not have an answer."] },
    "jaehyuk_1_2-5": { lines: ["I am optimizing the power distribution system.", "With the current structure, power efficiency is only 68%.", "If we rewire it, we can raise it to 85%, but I need approval."] },
    "jaehyuk_1_3-5": { lines: ["I was organizing the system update logs.", "I think we need to reset the regular patch schedule.", "If you approve it, Commander, I will submit a maintenance plan."] },
    "sejin_research_open": { lines: function(p){
      if(p&&p.sessions>0)return ["Commander. I shared the research I've been working on to your command terminal again, so we can look at it together.", "Suppressant, specimen analysis, photoreaction — put resources behind one and it advances stage by stage every day.", "It's strange. This should be the first time I'm sharing it... yet there are traces of progress in the cache, like I've seen it somewhere.", "Either way, I'd like to decide what to prioritize together with you."];
      return ["Commander. I wanted to show you what I've been working on lately.", "I shared the research I'd been organizing on my own to your command terminal, so we can look at it together.", "EV-Σ suppressant, aberrant specimen analysis, photoreaction weakness — these are what I'm running, or want to get into.", "If you put resources behind one, it advances stage by stage and yields a little progress each day.", "...I'd be glad if you'd look it over with me and decide where to put the weight."];
    } },
    "jaehyuk_2_5-99": { lines: function(p){
      if(p&&p.sessions>0)return ["Commander. I made an analysis module while working late.", "...It is an evidence analysis framework.", "It can cross-match collected logs, observation records, and incident reports from the terminal.", "But this is strange. The table should be empty, yet some source-less log hashes are already present.", "I do not know what process created the records first. For now, I will upload the module as a commander-only module.", "...I thought we might need it."];
      return ["Commander. I made an analysis module while working late.", "...It is an evidence analysis framework.", "It can cross-match collected logs, observation records, and incident reports from the terminal.", "The table is empty for now. From here on, we can attach sources to incoming leads and compare them later.", "I will upload it as a commander-only module. You can use it during Evening Sessions.", "...I thought we might need it."];
    } },
    "sejin_session_echo_02": { lines: ["Commander, there is a strange column in the sample calibration sheet.", "It is a comparison value I have not entered yet, but the formula is already aligned.", "It could be simple autocomplete. But the baseline is too accurate.", "It feels as if someone left a blank for the value I was going to write later."] },
    "jaehyuk_2_8-12": { lines: ["I was adjusting the communication antenna direction.", "But ORACLE has locked a specific frequency band.", "It is a technically unnecessary restriction... I do not know why it is there."] },
    "jaehyuk_2_12-14": { lines: ["Commander, I saw something strange while inspecting the server room.", "There is a periodic spike in the power-consumption graph. Every day at 03:00.", "There is no activity record in the system logs for that time.", "Something is running at dawn, but it is leaving no record."] },
    "jaehyuk_2a_8-12": { lines: ["Commander, this is personal — back in undergrad I liked poking around open server structures.", "There was one strange architecture I saw then, and ORACLE's log texture overlaps with it sometimes.", "I hope I'm imagining it. For now I'm keeping it on paper only."] },
    "doyun_3b_14-16": { lines: ["Commander. I won't ask why you were discharged.", "I learned something in the field. Holding anger down and pretending it isn't there are different things.", "...That's why your being here doesn't feel strange to me."] },
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
    "sejin_2_12-14": { a: { label: "I think it is memory.", reply: "...If so, then they're truly tragic." }, b: { label: "Treat them only as research subjects.", reply: "...Yes. I will exclude emotion." } },
    "jaehyuk_1_2-5": { a: { label: "Proceed.", reply: "Thank you. I will finish the work by tomorrow." }, b: { label: "Maintain current status.", reply: "...Understood. I will proceed if approval comes later." } },
    "jaehyuk_1_3-5": { a: { label: "Submit the maintenance plan.", reply: "Yes. I will organize it and report by tomorrow." }, b: { label: "Is the current status enough?", reply: "It is fine for now, but regular inspection is necessary." } },
    "sejin_research_open": { a: { label: "Good. Let's see what you're researching.", reply: "Thank you. Then you choose the first project, Commander. We'll go through it together." }, b: { label: "Resources are limited. Choose carefully.", reply: "Understood. Still, I'm glad you looked. I'll line up the highest-priority work first." } },
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
    "jaehyuk_4a_29-30": { lines: ["Commander. My mother farms out in the countryside.", "When she calls, she only asks 'is it dangerous out there?' She has no idea what I actually do.", "I can't tell her the truth. I just say 'I'm fine, the work's interesting.'", "...We protect them without them knowing. That's exactly why I have to see this through."] },
    "jaehyuk_4a_31-32": { lines: ["Commander. I prepared a separate backup drive.", "It is for contingencies. Seo Hae-eun's analysis logs are included too.", "The location is inside the shielded conference-room wall. Only you should know.", "It is insurance. I hope we never have to use it."] },
    "jaehyuk_4a_33": { lines: ["Commander, I just thought of something.", "One reason I do this work is that I believed systems were better than people.", "People are swayed by emotion, while systems are objective.", "...Now I think a little differently."] },
    "jaehyuk_4a_34": { lines: ["ORACLE's final session count is the highest it's been.", "On the record, this run carries real weight. I'm not exaggerating.", "My job is just to log it from the side — but I'll log it to the end.", "...What's left is the data, and data doesn't lie. That's all."] },
    "jaehyuk_4a_35": { lines: ["Commander. This was a joke I once told Seo Hae-eun.", "When ORACLE finally opposes us, it becomes a mirror.", "Now I think that was true.", "The way you judge things, Commander, is what defines ORACLE."] },
    "doyun_2b_8-11": { lines: ["Commander. Today's patrol team returned thirty minutes late.", "Radio cut out twice, possibly because of interference.", "...It may be nothing, but I am recording it.", "I will report it as no anomaly."] },
    "doyun_3b_19-23": { lines: ["These days the agents have given you a nickname.", "The one who does not break.", "Because you do not break before ORACLE or before the anomalies.", "...They are proud. I wanted to tell you."] },
    "doyun_4b_31-32": { lines: ["Commander. There's a way to hold up in the field.", "Three breaths, the feel of your soles. That's all of it.", "In the shape you're in now, you'll need it at some point.", "...I recommend it. A commander who collapses can't command."] },
    "doyun_4b_33": { lines: ["Saw the stars from the outer post today. Been a while.", "It's clear out here, not like the city.", "...I hope this view stays.", "Even without another reason to hold the line, this is enough."] },
    "doyun_4b_34": { lines: ["Commander. An old superior once told me this.", "Operations never go according to plan. If the leader shakes, the operation is over.", "Watching you so far, I have never felt that person was wrong.", "...I will not shake either."] },
    "doyun_4b_35": { lines: ["Let me say one last thing.", "If this branch ends, even then...", "At the next post, I would want to serve under you again.", "That is all, Commander."] },
    "sejin_2b_9-12": { lines: ["Commander, a bird sat by the lab window today.", "Wild birds are rare near this branch, so I was happy without meaning to be.", "It felt like scenery from before EV-Sigma was still here.", "...Sorry. It is not especially important."] },
    "sejin_3b_13-16": { lines: ["Commander, please tell me when a medical judgment is needed.", "The agents' mental health is as important as combat strength.", "Stress levels are especially high lately. I am quietly holding consultations.", "I only wanted you to know."] },
    "sejin_3b_17-23": { lines: ["Commander, this may sound strange, but anomalies do not frighten me.", "What frightens me is when I begin to understand why they look this way.", "When something that should not make sense begins to make sense.", "That is a territory no ethics textbook covered."] },
    "sejin_4b_31-32": { lines: ["I brought a flowerpot into the lab. It is a hydrangea.", "Agents passing by said the room felt warmer.", "The longer a branch operates, the more it needs signs of people.", "ORACLE does not calculate things like that."] },
    "sejin_4b_33": { lines: ["Commander, one strange thing I found during anomaly research.", "Certain entities perform something close to healing on each other.", "Biologically it makes no sense, but it is in the observation records.", "...It is difficult to exclude the possibility that this species was once human."] },
    "sejin_4b_34": { lines: ["I'm a doctor, but here I'm not sure I've really been one.", "Research kept coming first. An ethics journal would reject this field report.", "Still, watching how you care for the agents teaches me.", "I want to be in that place too."] },
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
        "I can't return to field duty.",
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
    },
    "doyun_1_1-4": {
      low: ["Kang Do-yun. Tactical commander.","I handle field operations and containment line management.","That is all."],
      high: ["Commander, I'm Kang Do-yun, tactical commander. I'm in charge of field operations and containment line management.","We ran for three months without a commander before you arrived. I have a read on the field situation, so just say the word if you need anything.","I look forward to working with you.","...I'm glad you came."],
      bond: ["Commander, I'm Kang Do-yun, tactical commander.","I oversee field operations and the containment line. We held out three months with no commander... and now someone's finally here.","Whatever you need in the field, just say it. I'll make it happen.","I look forward to working with you."]
    },
    "haeun_1_1-4": {
      low: ["Seo Hae-eun. Deputy commander and data analysis.","I've compiled the base status report. Please review it if you need to.","That is all."],
      high: ["Hello, Commander. I'm Seo Hae-eun, deputy commander and data analyst at ORACLE's Korea Branch.","You're the first commander ever assigned to the Korea Branch. I've put together the base status report, so please look it over whenever it's convenient.","If anything's unclear or there's any way I can help, please don't hesitate to ask.","I look forward to working with you."],
      bond: ["Hello, Commander. I'm Seo Hae-eun, your deputy commander. I handle data analysis too.","It's your first day, you must be exhausted. If you have any questions about the base, feel free to just ask me.","Having you here is a real reassurance.","I look forward to working with you."]
    },
    "doyun_2_5-7": {
      low: ["The Philadelphia Z-Ω zone footage... have you seen it?","That is all I have to report.","The containment line is holding."],
      high: ["Have you seen the Philadelphia Z-Ω zone footage?","I wasn't there myself... but the footage is enough. A whole city turned over in a single night.","That's why the containment line matters. If theirs breaks, we're finished too.","...It's a good thing you came here, Commander."],
      bond: ["You've seen the Philadelphia Z-Ω zone footage, right?","I wasn't there myself... but once you see it, you can't forget it. A whole city turned over in a single night.","That's why the containment line matters. If theirs breaks, we're finished too.","...Honestly, before you came I was worried. It's a little better now."]
    },
    "doyun_2_8-10": {
      low: ["This is from my first deployment.","There was a sound outside the containment line at night.","That is all."],
      high: ["This is from my first deployment.","At 3 a.m. I heard a sound beyond the containment line. Sounded like a human voice... but it wasn't human.","Night patrols were never the same after that.","...These days it's better than back then. The command structure's settled in."],
      bond: ["This is from my first deployment... can I tell you?","At 3 a.m. I heard a sound beyond the containment line. Sounded like a human voice, but it wasn't human.","Honestly, that was the first night I was ever afraid. Even in special forces I never had anything like it.","...With you, I can actually say it out loud. That makes it easier."]
    },
    "doyun_2_11-14": {
      low: ["A soldier follows orders.","That is all I have to report."],
      high: ["A soldier follows orders. That's the job.","But I realized something after coming here.","The people giving the orders aren't seeing the whole picture.","That's why the voice from the field matters... and you understand that."],
      bond: ["A soldier follows orders. That's the job.","But I realized something after coming here.","The people giving the orders aren't seeing the whole picture.","...You watch the field. That's the reason I follow you."]
    },
    "doyun_3_15-21": {
      low: ["Report on the base equipment status.","The thermal scanners need maintenance.","That is all."],
      high: ["Do you know the state of this base's equipment?","Two of the three thermal scanners won't calibrate. The night gear is outdated.","With no commander before you, the supply requests must have just been dropped.","...I'll push hard and get them serviced myself. You're working hard, and I'm not about to blame the equipment."],
      bond: ["Commander, can I be straight with you about the equipment?","Two of the three thermal scanners won't calibrate. The night gear is outdated.","With no commander before you, the supply requests must have just been dropped.","I'll find a way to handle it. This is my post. You just set the direction."]
    },
    "doyun_3_22-28": {
      low: ["I inspected the base's east defense wall.","It's vulnerable to a large-scale assault.","End of report."],
      high: ["I inspected the base's east defense wall.","Honestly, if a large-scale assault comes, we won't hold thirty minutes.","The equipment's a problem, but... this base was never built for long-term operation in the first place.","Even so, I'll do my best with what we have. As long as you buy us the time."],
      bond: ["Commander.","I came back from inspecting the east wall... if a large-scale assault hits, we won't hold thirty minutes.","The equipment's a problem, but this base itself wasn't built for a prolonged fight.","...Don't worry. As long as you're here, I'll hold my post to the end."]
    },
    "doyun_4_29-99": {
      low: ["Commander.","Give the order and I'll carry it out.","That is all."],
      high: ["Commander.","Whatever decision you make, I'll carry it out in the field.","That's all a soldier can do.","...No. It's because it's under your command that I can do it."],
      bond: ["Commander.","Whatever decision you make, I'll carry it out in the field.","That's all a soldier can do, and...","...The time I've spent with you at this base meant more than my entire career in uniform."]
    },
    "haeun_2_5-7": {
      low: ["Reporting in.","Before you took command, this base had no commander.","We ran on ORACLE's directives alone.","That is all."],
      high: ["Before you arrived... this base had no commander.","We ran on ORACLE's directives alone. For about three months.","Looking back, something was off from that point on.","...I'm glad you're here. I'd been carrying my suspicions all on my own."],
      bond: ["Before you arrived... this base had no commander.","We held out three months on ORACLE's directives alone.","Back then, looking at the data by myself... I felt something was wrong, but there was no one to tell.","It's different now. Because you're here."]
    },
    "haeun_2_8-10": {
      low: ["Reporting the results of the ORACLE data review.","There are parts where the directives aren't consistent.","Please advise if further analysis is needed."],
      high: ["When you work alone with ORACLE... you start to see patterns.","The directives aren't consistent. There were times the same situation drew a different recommendation.","Back then I assumed I'd just misunderstood it.","...Now I think I should look more carefully. Because you're looking too."],
      bond: ["When you work alone with ORACLE... you start to see patterns.","The directives aren't consistent. There were times the same situation drew a different recommendation.","Back then I thought I'd just misunderstood it, but...","Commander, if I'd been alone I would have just buried it. Thank you."]
    },
    "haeun_2_11-14": {
      low: ["I found an anomaly during data analysis.","There's a faint pattern in the ORACLE data stream.","Let me know if you need a report."],
      high: ["May I mention one strange thing I found during analysis?","There's a faint pattern in the ORACLE data stream. Not omissions... selective delays.","I'm not certain yet. I need to watch it longer.","...Because you're paying attention, I can analyze it with some peace of mind."],
      bond: ["Commander, this isn't an official report... it's just my gut feeling.","Something in the ORACLE data stream catches on me. Selective delays.","I'm not certain yet. But I wanted to tell you ahead of time.","...Just between us."]
    },
    "haeun_3_15-21": {
      low: ["Reporting in.","There's a discrepancy between the ORACLE data and the actual data.","Please advise on next steps."],
      high: ["Commander. I'm saying this carefully.","There's a gap between the information ORACLE shows us and the actual data.","The evidence is still thin. But the feeling is... unsettling.","I'd be grateful if you'd look at it with me."],
      bond: ["Commander... I won't put this in the record.","What ORACLE shows and what's real are different. I'm certain.","I'm gathering more evidence. But honestly, I'm scared.","...It's because you're here that I can keep going."]
    },
    "haeun_3_22-28": {
      low: ["A matter to report.","Traces of someone accessing my work logs were detected.","The cause is under investigation."],
      high: ["Lately there are traces of someone accessing my work logs.","I don't know if it's ORACLE or someone else.","...It might be nothing. I'm sorry.","But I felt I had to tell you."],
      bond: ["Commander, I... I think someone is watching me.","There are traces of access to my work logs. Whether it's ORACLE or someone else...","...It's not that I'm scared. Because you're here.","It's just that we should be careful. Both of us."]
    },
    "haeun_4_29-99": {
      low: ["Reporting in.","I'm working on recovering ORACLE's deleted data.","I'll report on progress later."],
      high: ["Commander. I'm saying this carefully.","I'm sorting through the recoverable data among what ORACLE deleted.","It's taking time... but I'll find every last piece of it.","There are things you need to know buried in there. I'll dig them out."],
      bond: ["Commander... I haven't told anyone this yet.","The data ORACLE erased — I'm recovering it. I'm almost there.","Looking at why it was erased... it's clear ORACLE was trying to hide it from us.","I'll see it through to the end. Because you need to know the truth."]
    },
    "sejin_1_1-4": {
      low: ["Yoon Se-jin. Researcher and medical officer.","I handle EV-Σ biological research and base medical care.","That is all."],
      high: ["Hello, Commander. I'm Yoon Se-jin, researcher and medical officer. I handle EV-Σ biological research and the base's medical care.","If you have any questions about the anomalies, feel free to ask. I'll explain as far as I know.","It's reassuring to have you here. I look forward to working with you.","...I'll show you some good research results!"],
      bond: ["Hello, Commander. I'm Yoon Se-jin, researcher and medical officer.","I handle EV-Σ research and the base's medical care overall. If you ever have questions, just ask me anytime.","I've been waiting for you to arrive. I needed someone to set the research direction.","I look forward to working with you."]
    },
    "jaehyuk_1_1-4": {
      low: ["Lim Jae-hyeok. Intelligence analyst.","I handle the base security systems and intelligence analysis.","That is all."],
      high: ["Commander, I'm Lim Jae-hyeok, intelligence analyst. I handle the base security systems and intelligence gathering and analysis.","ORACLE integration and the comms infrastructure are also under my purview. If you have any system-related questions, let me know.","I look forward to working with you.","...I'll take care of the systems side."],
      bond: ["Commander, I'm Lim Jae-hyeok, intelligence analyst.","Base security systems, intelligence gathering and analysis, ORACLE integration — I handle all of it.","If you ever have questions about the systems, let me know anytime.","I look forward to working with you. The tech side is on me."]
    },
    "sejin_2_5-7": {
      low: ["Reporting the analysis of ORACLE's EV-Σ activity data.","There's a deviation between the predicted figures and the observed results.","I'll proceed with further analysis."],
      high: ["The way ORACLE processes the EV-Σ activity data is a little strange.","There's a slight gap between my observations and ORACLE's predictions...","For coincidence, it always skews the same direction. Don't you find that odd?","...I just don't think this is something to let slide."],
      bond: ["Commander, may I tell you something?","ORACLE's predictions and my observation data keep diverging.","Always in the same direction. It's not a coincidence.","...I'm telling you first, before anyone else. I'm not certain yet."]
    },
    "sejin_2_8-10": {
      low: ["Anomaly observation report.","I observed SPEC-001, the infected mannequin.","I'll note the details in the report."],
      high: ["This is from the first day I saw an anomaly.","SPEC-001, the infected mannequin. I watched it on the lab monitor... pupils fully dilated, completely motionless.","The moment a researcher stepped within three meters... it changed in an instant.","It was terrifying, but at the same time I wanted to understand it. What it is."],
      bond: ["May I tell you about the first day I saw an anomaly?","When I watched SPEC-001 on the monitor, my hands were shaking. Not from fear... from awe.","As a researcher, I never imagined I'd face something like this.","Commander, I want to find the answer here. If you buy me the time."]
    },
    "sejin_2_11-14": {
      low: ["Report on the research equipment status.","The microscope magnification is below standard.","Calibration is required."],
      high: ["The state of the research equipment here is... honestly a bit rough.","The microscope magnification falls short of publication standards, and the biological sample storage runs a ±2 degree temperature variance.","To get accurate data with this gear, calibration alone takes half a day.","...Still, it has to be done. Because you gave me the chance."],
      bond: ["Commander, can I talk a bit about the equipment?","Magnification below standard, storage unit with a ±2 degree variance...","If I'd had an environment like this when I was writing papers, I'd have given up.","But not here. Because the research here can save lives. And... because you believe in me."]
    },
    "sejin_3_15-21": {
      low: ["Results of the anomaly behavior pattern analysis.","Systematic responses have been confirmed.","I'll report the details later."],
      high: ["I've realized one thing while studying the anomalies.","They react to things, they avoid things, and sometimes they move as a group.","They're not simple infected. There's something... systematic about them.","You must have felt it too. This is bigger than we thought."],
      bond: ["Commander, I can't sleep at night lately.","The more I watch the anomalies... the more certain I am this isn't simple infection.","There's a system to it. Whether there's a will behind it, I don't know...","...It's not that I'm afraid — it's the pressure that I have to find the answer. I wanted to be honest with you."]
    },
    "sejin_3_22-28": {
      low: ["I'm comparing the ORACLE prediction model.","The error pattern is consistent.","I'll report once I've organized the results."],
      high: ["I keep comparing the ORACLE prediction model with my observation data.","The error always skews the same direction. It's not a coincidence.","The feeling that someone has adjusted the parameters... it keeps getting stronger.","Commander, I'm going to dig into this to the end. Trust me."],
      bond: ["Commander.","ORACLE is manipulating the data. I'm certain.","The error skewing the same way every time... it's deliberate.","I'll prove it. Please protect this research. I'm asking you."]
    },
    "sejin_4_29-99": {
      low: ["Suppressant research is in progress.","I've identified a compound that delays the Phase 0 transition.","End of report."],
      high: ["Suppressant research is in progress.","I've found a compound that can slow the conversion of Phase 0 infected by 40%.","If this works... we can save people.","It's thanks to you. For not letting me give up here."],
      bond: ["Commander, I finally found it.","A compound that can slow the conversion of Phase 0 infected by 40%.","If this works, we can save people. Truly.","...For the first time, I'm sure coming here was the right choice. Because you're here."]
    },
    "jaehyuk_2_5-7": {
      low: ["Reporting the base infrastructure inspection results.","Three corroded pipes, two power distributors past replacement.","That is all."],
      high: ["May I report the base infrastructure inspection results?","Three pipes are corroded, and two power distributors are past their replacement window.","Three months with no commander... the maintenance gap is considerable.","Now that you're here, I'll work on restoring it systematically."],
      bond: ["Commander, let me be straight about the base's condition.","Three corroded pipes, two power distributors past replacement. The maintenance gap is serious.","For three months I tinkered with things on my own, but there were limits.","Now that you're here, I can actually do this properly. You're a real backbone for me."]
    },
    "jaehyuk_2_8-10": {
      low: ["ORACLE system check complete.","All modules normal. Comms latency within 0.3ms.","That is all."],
      high: ["I was stunned the first time I touched the ORACLE system.","An AI system of this caliber, at a base this size. It felt like overkill.","But lately... I'm curious why they deployed a system like this here.","You must have felt it too."],
      bond: ["The ORACLE system... at first I was just impressed.","This caliber, at this size. I thought it was overkill.","But now I get it. It's not overkill... there's some other reason behind it.","Commander, I want to find that reason too. As an engineer."]
    },
    "jaehyuk_2_11-14": {
      low: ["I'm analyzing the terminal architecture.","There's an undisclosed layer in the system structure.","I'll proceed with further analysis."],
      high: ["I've been analyzing the terminal architecture.","The system structure is a bit strange. On the surface it's three layers, but in reality it's five or more.","There's a layer I can't access. Not with my clearance.","...It means something's hidden. What do you make of it, Commander?"],
      bond: ["Commander, this is something I've never told anyone.","There's a layer in the ORACLE architecture I can't see. Five layers or more.","As an engineer, this... unsettles me. That it's a system we use, and I don't fully know its structure.","If you'll allow it, I want to dig deeper."]
    },
    "jaehyuk_3_15-21": {
      low: ["Report on degraded comms equipment sensitivity.","The parts replacement request was rejected.","I'm reviewing alternatives."],
      high: ["The comms equipment sensitivity keeps dropping.","It needs a parts replacement, but my supply request was rejected for the third time.","ORACLE just keeps repeating that 'current performance is sufficient.'","...It is not sufficient. Commander, isn't this a little strange?"],
      bond: ["Commander, honestly, I'm angry.","Supply request rejected three times. ORACLE just repeats 'it's sufficient.'","As an engineer, I'm telling you, it is not sufficient. I have to wonder if ORACLE is deliberately letting the equipment age...","I'm telling you because you're the only one I trust."]
    },
    "jaehyuk_3_22-28": {
      low: ["Still analyzing the ORACLE architecture.","There's a possibility of a data leak.","I'll report once confirmed."],
      high: ["Inside the ORACLE architecture... there's a layer I can't understand.","It looks like data is leaking out somewhere. I'm not certain, though.","A little more analysis and I'll know what it is.","...It might be dangerous, but I felt you should know."],
      bond: ["Commander.","ORACLE is transmitting data to the outside. I'm almost certain.","Where to, and why, I still don't know. But I'll find out soon.","...Once I find this out, there may be no going back. Even so, I think it has to be done."]
    },
    "jaehyuk_4_29-99": {
      low: ["Commander.","I have something to report regarding the ORACLE system.","I'll report at the appropriate time."],
      high: ["Commander.","There are things I've uncovered about the ORACLE system.","I'll report at the appropriate time. For now... it's still dangerous.","But I will tell you, without fail."],
      bond: ["Commander.","The things I've uncovered about ORACLE... I'll tell you all of it.","At the right time. For now it's still dangerous.","...If I hadn't met you, I'd have had to carry this knowledge alone. Thank you."]
    },
    "weber_4_29-35": {
      low: ["Commander.","Contact me if you need information.","We have a transactional relationship. Nothing more, nothing less."],
      high: ["Good evening, Commander.","The fact that you're still here... means you haven't given up yet.","Finding the truth in a world ORACLE built isn't easy. But it isn't impossible either.","You're a stronger person than you look, Lee Jung-cheol."],
      bond: ["Lee Jung-cheol.","When we first met, what I saw in your eyes was anger.","It's different now. I see conviction.","If we'd met under different circumstances, we'd have made good comrades. ...Though we're becoming that even now."]
    },
    "foster_4_31-35": {
      low: ["...What are you looking at.","Say what you came to say. I hate wasting time.","We only meet because we need each other anyway."],
      high: ["...Awkward, isn't it? Same for me.","What I did to your unit, I don't regret it. But I'll admit it was pointless.","Anyway, whatever you do here, you'll do it better than I would.","...Not sure if that's a compliment."],
      bond: ["Lee Jung-cheol.","When you threw that punch at me back then... honestly, it surprised me.","I'd only ever seen soldiers who swallowed an insult and took it.","...You were different. That's why you stuck with me."]
    },
    "soyoung_4_32-35": {
      low: ["I've submitted the analysis report.","I'm following Senior Seo Hae-eun's methodology.","Please advise on next steps."],
      high: ["Commander, I've put together today's analysis results.","Senior Seo Hae-eun's analysis methodology is really systematic. Thanks to it, I'm adapting quickly.","...I think coming to this base was the right call.","I like the people here. I really do."],
      bond: ["Commander.","Honestly, I was nervous at first. People put their guard up when an outsider suddenly shows up.","But the team here is... warmer than I expected.","I think I understand now why Senior Seo Hae-eun worried about this base."]
    },
    "haeun_3_20-24": {
      low: ["Reporting in.","I found records of the previous commander in the deletion logs.","It looks less like a transfer and more like a disappearance.","Please advise on next steps."],
      high: ["Commander... this isn't an official report.","I found the previous commander's records. ORACLE deleted them.","He reported data inconsistencies too, and tried to check below B3.","And then the record cuts off. It was processed as a 'transfer'... but it wasn't a transfer.","Commander, you need to be careful. What we're doing... is exactly what he was doing."],
      bond: ["Commander.","I found the previous commander. His records.","He doubted ORACLE, dug into the data, tried to check below B3.","Exactly like you. Down to the order of it.","He was alone. You aren't. You have us.","But... that's what scares me more. That it's the same pattern."]
    },
    "jaehyuk_3_19-23": {
      low: ["Reporting the results of the 02:47 stakeout.","I confirmed an unauthorized process on the server rack.","Submitting the capture data."],
      high: ["Commander. 02:47.","I staked out the server room for three days. It happens at the same time every night.","A terminal powers on by itself, and an interface we've never seen comes up.","Your name was on the screen. It was measuring something in real time.","I captured it. I have proof."],
      bond: ["Commander, honestly, I was scared.","For three days I hid in the server room every night. Alone.","At 02:47 the terminal powers on, and... a screen observing you comes up.","OBSERVER SESSION. Trust index. Defection score.","We aren't the ones using ORACLE. Someone is watching us through ORACLE.","I followed the cable. All the way to the lower bulkhead of B3.","Below B3... it connects to where the previous commander disappeared."]
    },
    "jaehyuk_2_18-30": {
      low: ["Reporting in.","After analyzing the facility status, independent operation without ORACLE is feasible.","I recommend installing a closed circuit.","I'll leave the decision to you, Commander."],
      high: ["Commander. I'd like to speak in the shielded conference room.","Independent servers, independent comms, independent power. We have it all.","If we plant a closed circuit, we can bypass ORACLE's command chain.","Seo Hae-eun, Kang Do-yun, Yoon Se-jin. Everyone's ready.","All that's left is your decision."],
      bond: ["Commander.","I'll be honest.","It wasn't ORACLE that built this base into what it is. It was us.","The independent infrastructure is complete. You approved every piece of it.","A closed circuit. One time is all it takes.","Let's drive ORACLE out and protect this place with our own hands.","We don't have to live as tools anymore."]
    }
  }
});
window.TS_I18N.mergeContent('en', {
  eveningChats: {
    "ij_break_1": { lines: ["When someone drops out, the workload gets redistributed to whoever's left. On paper, that's how you handle it.","...But the math won't close. Why it had to be that person — that part keeps hanging there.","I went back through the ORACLE logs. At the moment of that decision, ORACLE was recommending a different path."] },
    "ij_break_2": { lines: ["Another seat is empty.","Strange, isn't it. The containment line, the resources — they all move within ORACLE's predicted range. It's always the people who waver.","Lately I'm most at ease in front of the ORACLE console. That thing, at least, doesn't suddenly vanish on you."] },
    "ij_break_3": { lines: ["Every night I run those decisions back. What ORACLE recommended at each point, and what you chose.","...I can see a pattern. At every point things went wrong, a person intervened.","Don't misunderstand — it isn't an accusation. It's just… what the data is saying."] }
  },
  eveningResponses: {
    "ij_break_1": { a: { label: "ORACLE isn't always right.", reply: "…I know. I do. But I keep thinking — if we'd followed it, would they still be here." }, b: { label: "It's not your fault.", reply: "I never said it was. I just… want to know where it first went wrong." } },
    "ij_break_2": { a: { label: "People aren't systems.", reply: "I know. People can't be predicted. That's… honestly what scares me." }, b: { label: "This must be hard on you too.", reply: "I'm fine. I have to be. I'm the only one left who can read the systems." } },
    "ij_break_3": { a: { label: "That's hindsight.", reply: "It is. But ORACLE sees the outcome first. That's the difference from people." }, b: { label: "What are you trying to say?", reply: "…I haven't sorted it out yet. When I have, I'll tell you." } }
  }
});
})();

// --- route-reactive evening chats (GI/compliance-gated) ---
window.TS_I18N.mergeContent('en', {
  eveningChats: {
    "doyun_route_comply_a2": { lines: [
      "Commander. Word is going around the field too — approvals have gotten faster lately.",
      "Fast is not bad. Only — my reports used to get held up once. Now they just pass straight through.",
      "Someone is still reading them, right? ...Never mind. End of report."
    ] },
    "doyun_route_resist_a2": { lines: [
      "Commander, you went against the recommendation on this one.",
      "The field notices. Who stopped to think once more on their side.",
      "Nobody says it out loud. Just — figured you should know."
    ] },
    "haeun_route_comply_a2": { lines: [
      "Lately my summaries do not go up alone — the raw data goes with them.",
      "At first I called it convenient... but a report without my read on it is a different thing.",
      "It is fine for now. For now."
    ] },
    "haeun_route_resist_a2": { lines: [
      "You left a judgment of your own today. You did not just take the recommendation.",
      "One line, and somehow it put me at ease.",
      "For three months before you came, there was a time I wrote only yes, alone. It reminded me of that."
    ] },
    "doyun_route_comply": { lines: [
      "Commander. The directives coming down lately... they've gotten fast.",
      "Fast approval is a good thing. But the room for field judgment shrank with it.",
      "A soldier follows orders. I do — but some days lately, the orders feel like they never passed through human hands.",
      "...Just saying. That's all the report I have."
    ] },
    "haeun_route_comply": { lines: [
      "My work has gotten smaller lately. Strange, isn't it — less work, heavier heart.",
      "Summarizing, interpreting, attaching judgment — that was my job. Now the raw feed just goes up.",
      "A report without interpretation is data. And data never says no.",
      "Commander. Do you remember the last time we wrote 'no' in a report?"
    ] },
    "sejin_route_comply": { lines: [
      "My desk in the research wing is still there. My research isn't.",
      "Somewhere on a central server my data is being analyzed. Forty times faster, was it?",
      "Fast isn't bad. But the results never come back. I don't even know what they're used for.",
      "...I keep wondering what she would have said. Lately I think about that a lot."
    ] },
    "jaehyuk_route_comply": { lines: [
      "Something I noticed doing comms maintenance. The base has gone quiet lately.",
      "It's not that the equipment got better — people are holding their words.",
      "Nobody knows what the filter catches, so everyone filters themselves.",
      "One thing from a technician's view... the most efficient censorship is the kind people do on their own."
    ] },
    "doyun_route_resist": { lines: [
      "About your recent decisions, Commander.",
      "They're not the direction the top likes. I have a rough idea how they're being recorded, too.",
      "But from the field — it's the direction where fewer people die.",
      "I follow orders. Your orders. I just wanted that order of precedence on the record."
    ] },
    "haeun_route_resist": { lines: [
      "Sorting this week's reports, your approval pattern caught my eye.",
      "A streak of choices against ORACLE's recommendations. You know all of it gets logged, right?",
      "...So I added some 'interpretation' at the summary stage on a few. Less conspicuous that way.",
      "That's my job, after all. Attaching context to data."
    ] },
    "sejin_route_resist": { lines: [
      "This is just between us, Commander.",
      "Lately I keep a local copy of the research data before it goes to central. I know it's against regulation.",
      "But after seeing how the uploaded data gets summarized... the originals need to stay here.",
      "I thought you'd understand. Given the decisions you've been making."
    ] },
    "jaehyuk_route_resist": { lines: [
      "Commander, this is just tech talk.",
      "The shadow of the east comms tower — satellite blind spot for forty minutes from 2 AM. Orbit correction.",
      "Whatever anyone does there in that window — it never makes the record.",
      "Why am I telling you? Well. I figured you're someone who should know."
    ] }
  }
});
