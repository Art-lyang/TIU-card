// lang-evidence-hidden-en.js
// English overlays for hidden-story and character-arc evidence table records.
(function(){
if(!window.TS_I18N || typeof window.TS_I18N.mergeContent !== 'function') return;
window.TS_I18N.mergeContent('en', {
  evidence: {
    "EV-HS-01": { name: "Former commander record", desc: "The deleted final report and voice memo of the previous commander." },
    "EV-HS-02": { name: "OBSERVER session capture", desc: "A captured screen of the observation interface active at 02:47." },
    "EV-HS-03": { name: "B3 lower bulkhead anomaly", desc: "Abnormal heat and a 0.7 Hz vibration at the lowest B3 bulkhead." },
    "EV-24": { name: "Seo Hae-eun parallax memo", desc: "Differences between the Korea Branch ORACLE baseline and overseas node directives." },
    "EV-25": { name: "Kang Do-yun patrol-route map", desc: "An outer sector ORACLE repeatedly leaves uncovered." },
    "EV-26": { name: "Yoon Se-jin parameter comparison", desc: "A recurring gap between the official EV-Sigma values and the field readings." },
    "EV-27": { name: "Lim Jae-hyeok private-layer printout", desc: "A structure beyond administrator access inside ORACLE architecture layer five or deeper." },
    "EV-28": { name: "Four-axis suspicion memo", desc: "Analysis, field, molecular, and system lines converging on the same conclusion." },
    "EV-29": { name: "B3 investigation-line memo", desc: "A link between the four-axis suspicion set, the former commander, and the B3 lower records." }
  },
  evidenceCombos: {
    "CMB-HS-01": { name: "Repeating pattern", result: "The former commander found the same ORACLE data discrepancy, asked the same questions, and headed toward the same place before disappearing. This is not coincidence. Someone designed the sequence." },
    "CMB-HS-02": { name: "Identity of the observer", result: "The OBSERVER session, the external ORACLE process, and the observation layer ORACLE cannot see are all run by the same presence. ORACLE is being used as a tool to watch us." },
    "CMB-HS-03": { name: "Secret below B3", result: "The 0.7 Hz vibration behind the bulkhead, B3 lower electromagnetic interference, and the unregistered passage all point to the same place. Something was below B3 before ORACLE." },
    "CMB-12": { name: "Four-axis suspicion", result: "Seo Hae-eun's parallax, Kang Do-yun's empty route, Yoon Se-jin's parameter deviation, and Lim Jae-hyeok's private layer point at the same structure from different angles." },
    "CMB-13": { name: "Lines converging on B3", result: "The four suspicion axes connect to the former commander's deleted record and the B3 lower bulkhead anomaly. The previous commander suspected the same sequence. This time, the record remains." }
  }
});
})();
