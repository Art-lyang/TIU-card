// lang-cards-ct-en.js - English overlays for crisis/trust route cards.
(function(){
if(!window.TS_I18N||typeof window.TS_I18N.mergeContent!=='function')return;
window.TS_I18N.mergeContent('en', {
  cards: {
    "CT-001": { msg: "Unclassified biological responses surge beyond the containment line.\n\nThere is no response protocol. Field data is insufficient.\n\nKang Do-yun: \"If only we had collected even one sample before...\"", leftLabel: "Deploy immediately", rightLabel: "Observe, then decide" },
    "CT-002": { msg: "Yoon Se-jin uploads an improvised anomaly-response protocol.\n\n\"I built it without field data. I cannot guarantee accuracy.\"\n\n\"But it is better than having nothing.\"", leftLabel: "Adopt it", rightLabel: "Use the ORACLE protocol" },
    "CT-003": { msg: "Containment Line Sector 3 has been cut from the outside.\n\nThis was not an anomaly. There are tool marks.\n\nSeo Hae-eun: \"Someone did this. Someone we do not know.\"", leftLabel: "Search the area", rightLabel: "Report to ORACLE" },
    "CT-004": { msg: "Seo Hae-eun files an emergency report.\n\n\"We extracted a technical signature from the intrusion trace.\"\n\"It is presumed to belong to an organization called Prometheus.\"\n\n\"...We did not know they were here.\"", leftLabel: "Begin pursuit investigation", rightLabel: "Focus on defense reinforcement" },
    "CT-005": { msg: "Multiple incidents occur at once.\n\nAnomaly activity is detected in two containment sectors.\nAt the same time, an unidentified vehicle approaches from the east.\n\n[ORACLE: Multiple threats detected. Determine priority.]", leftLabel: "Prioritize anomalies", rightLabel: "Prioritize the vehicle" },
    "CT-006": { msg: "Kang Do-yun stops you in the corridor.\n\n\"Commander. I will ask plainly.\"\n\"Why did you take no action for the last ten days?\"\n\n\"The agents are thinking the same thing.\"", leftLabel: "My judgment was lacking", rightLabel: "I was observing the situation" },
    "CT-007": { msg: "[ORACLE special transmission]\n\n\"Korea Branch operational efficiency is below standard.\"\n\"Partial decision authority will be transferred to headquarters.\"\n\nLim Jae-hyeok: \"...ORACLE is starting to move directly.\"", leftLabel: "File an objection", rightLabel: "Accept it" },
    "CT-008": { msg: "[ORACLE reprimand transmission]\n\n\"Prometheus response performance is insufficient.\"\n\"The value of the Korea Branch is now in question.\"\n\nSeo Hae-eun: \"The pressure has begun.\"", leftLabel: "We will show results", rightLabel: "Headquarters is wrong" },
    "CT-009": { msg: "Seo Hae-eun's investigation remains unfinished as the final phase begins.\n\nKey intelligence is missing.\n\nSeo Hae-eun: \"We ran out of time. We have to proceed with what we know.\"", leftLabel: "Reopen the investigation now", rightLabel: "Proceed with available intel" },
    "CT-010": { msg: "[ORACLE emergency transmission - clearance: MAXIMUM]\n\n\"Commander replacement is under review.\"\n\"If current operational status continues, a decision will be made within 48 hours.\"\n\nLim Jae-hyeok stares at the screen without speaking.", leftLabel: "Prove it with results", rightLabel: "Replacement does not matter" },
    "CT-011": { msg: "Kang Do-yun gathers the entire branch.\n\n\"Commander. We made our decision.\"\n\"Whether a replacement comes or not, we will stay with you until the end.\"\n\nYoon Se-jin and Lim Jae-hyeok nod.", leftLabel: "...Thank you", rightLabel: "Make your own decisions" }
  }
});
})();
