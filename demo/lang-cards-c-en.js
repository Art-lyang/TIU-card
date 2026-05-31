// lang-cards-c-en.js - English overlays for facility-expansion (FE) cards only.
// Note: 47 duplicate keys (C-133..C-152, C-244..C-270, C-276) were removed on 2026-05-17;
// their canonical English text now lives in lang-content-en-all.js, which loads earlier
// but is no longer overwritten by this file.
(function(){
if(!window.TS_I18N||typeof window.TS_I18N.mergeContent!=='function')return;
window.TS_I18N.mergeContent('en', {
  cards: {
    "C-FE001-A": { msg: "Yoon Se-jin: The freezer sample analysis is complete.\n\n\"Cellular activity in the Phase 0 infected sample is higher than expected.\nAdditional cooling may be required.\"", leftLabel: "Strengthen cooling", rightLabel: "Maintain current temperature" },
    "C-FE001-B": { msg: "Lim Jae-hyeok: Freezer cooling-system inspection complete.\n\n\"Power consumption is 15% higher than expected.\nPower-saving mode can conserve resources, but cooling efficiency will drop.\"", leftLabel: "Apply power-saving mode", rightLabel: "Maintain maximum cooling" },
    "C-FE002-A": { msg: "Kang Do-yun: Outdoor training field report.\n\n\"Agent stamina has noticeably improved.\nHowever, training noise may reach nearby civilian areas.\"", leftLabel: "Switch to night training", rightLabel: "Maintain daytime training" },
    "C-FE003-A": { msg: "Sensor array automatic alert:\n\n\"Abnormal heat source detected 300 meters east of the containment line.\nA small entity that existing sensors could not detect.\"", leftLabel: "Remote observation only", rightLabel: "Dispatch investigation team" },
    "C-FE004-A": { msg: "Medical isolation wing report:\n\n\"Two isolated patients have stabilized.\nThe expanded equipment now allows detailed examination.\"", leftLabel: "Process discharge", rightLabel: "Extend observation" },
    "C-FE005-A": { msg: "Secondary supply route operation report:\n\n\"Material transport through the mountain route is operating normally.\nHowever, passage becomes dangerous in bad weather.\"", leftLabel: "Safety first - slow transport", rightLabel: "Maintain transport volume" },
    "C-FE005-B": { msg: "Supply officer:\n\n\"Thanks to the secondary supply route, we can build an emergency food reserve.\nShould we secure additional stock?\"", leftLabel: "Maintain current stock", rightLabel: "Approve additional reserves" },
    "C-FE006-A": { msg: "AI CCTV alert:\n\n\"A pattern that the existing system could not detect has been captured.\nMicro-movement inside the containment zone is increasing.\"", leftLabel: "Raise alert level", rightLabel: "Collect data before deciding" },
    "C-FE007-A": { msg: "Bunker management report:\n\n\"Emergency evacuation facility inspection complete. Capacity: 20 people. Emergency supplies: 72 hours.\nPlease determine the regular inspection cycle.\"", leftLabel: "Once per month", rightLabel: "Once per week - resource cost" },
    "C-FE008-A": { msg: "Kang Do-yun: Expanded patrol report.\n\n\"We secured a new observation point on the northern ridge.\nIt overlooks the entire containment zone.\"", leftLabel: "Maintain observation point", rightLabel: "Install forward outpost" },
    "C-FE009-A": { msg: "Yoon Se-jin: Double-shield operation report.\n\n\"The isolated sample response has stabilized. But maintaining the shield layers increases power consumption.\"", leftLabel: "Operate normally", rightLabel: "Low-power mode" },
    "C-FE010-A": { msg: "Lim Jae-hyeok: Backup room inspection report.\n\n\"Local backup is operating normally. We can now double-check before transmitting to headquarters.\"", leftLabel: "Maintain current cycle", rightLabel: "Increase backup frequency" },
    "C-FE011-A": { msg: "Medical bay: B3 ventilation improvement report.\n\n\"Headache complaints have decreased. But if we delay filter replacement, air quality may destabilize again.\"", leftLabel: "Keep regular replacement", rightLabel: "Conserve consumables" },
    "C-FE012-A": { msg: "Lim Jae-hyeok: Local server room operation report.\n\n\"Independent backups are accumulating on the local server. We can share only what we want with ORACLE.\"", leftLabel: "Maintain ORACLE sharing", rightLabel: "Operate local-first" },
    "C-FE013-A": { msg: "Seo Hae-eun: Shortwave communication room report.\n\n\"We secured a channel for external contact. Prometheus-side frequencies can also be detected.\"", leftLabel: "Receive only", rightLabel: "Test two-way operation" },
    "C-FE014-A": { msg: "Lim Jae-hyeok: Emergency generator trial report.\n\n\"Seventy-two hours of independent operation is possible. The problem is fuel. If this turns into a long crisis, allocation rules must be decided first.\"", leftLabel: "Finalize fuel allocation", rightLabel: "Apply ORACLE power-saving plan" },
    "C-FE015-A": { msg: "Seo Hae-eun: Shielded meeting-room usage report.\n\n\"The officer meeting left no trace on the ORACLE line. That means we have to preserve the minutes ourselves.\"", leftLabel: "Keep handwritten minutes", rightLabel: "Submit only a summary" },
    "C-FE016-A": { msg: "Kang Do-yun: Armory maintenance report.\n\n\"We have enough personnel equipment in reserve. The question is when we will have to use it.\"", leftLabel: "Use only for training", rightLabel: "Prepare emergency deployment" }
  },
  resultText: {
    "CA-007_left": "Medical supplies are prioritized. The infirmary reserve stabilizes.",
    "CA-007_right": "Supplies are distributed according to ORACLE's recommendation. Operational efficiency is maintained."
  }
});
})();
