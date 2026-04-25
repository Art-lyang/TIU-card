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
    "haeun_1_3-5": { lines: ["When I work late alone, I start thinking too much.", "What I did before coming to this branch... my memory is a little hazy.", "It is nothing strange. Work here is just very busy."] },
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
    "jaehyuk_2_8-12": { lines: ["I was adjusting the communication antenna direction.", "But ORACLE has locked a specific frequency band.", "It is a technically unnecessary restriction... I do not know why it is there."] },
    "jaehyuk_2_12-14": { lines: ["Commander, I saw something strange while inspecting the server room.", "There is a periodic spike in the power-consumption graph. Every day at 03:00.", "There is no activity record in the system logs for that time.", "Something is running at dawn, but it is leaving no record."] }
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
    "jaehyuk_2_8-12": { a: { label: "Find out why it is locked.", reply: "Yes. I will check carefully." }, b: { label: "There must be a security reason.", reply: "...There might be." } },
    "jaehyuk_2_12-14": { a: { label: "03:00... keep a record.", reply: "I already have a week's pattern captured. Would you like to see it?" }, b: { label: "Could it be a system backup process?", reply: "If it were a backup, there would be logs. The lack of logs is the problem." } }
  }
});
})();
