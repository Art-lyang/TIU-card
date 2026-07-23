// lang-cards-flow-en.js
// English overlays for Act2 pacing and Act4 support/relief cards.
(function(){
if(!window.TS_I18N || typeof window.TS_I18N.mergeContent !== 'function') return;

var newsA2Foreshadow01 = "[분류 보류] 새벽 통신 로그에서 ORACLE 기록 외부 경유 흔적 확인 — 조직명 미부여";
var newsA2Foreshadow02 = "[내부] 조사테이블, 외부 경유·내부 기록·현장 이상 패턴을 별도 분류로 보관 시작";
var newsA2Triage01 = "[내부] 조사테이블 미해결 기록, 외부 경유·내부 기록·현장 이상 분류로 이관";
var newsA4DgSupport = "[국내] DG 연계 긴급 민간 보급망 가동 — 방벽 인접 물류 공백 일부 완화";
var newsA4MdSupport = "[해외] 메리디안 관측망, 한국 방벽 변동값 보정 자료를 비공개 전달";
var newsA4PromSupport = "[분류 보류] 프로메테우스 제공 좌표와 ORACLE 누락 구역 일부 일치 — 공식 검증 대기";
var newsA4EvidenceRelief = "[내부] 조사테이블 교차 결론으로 최종 배치 순서 재조정 — 자원 손실 완충 기록";
var newsA4StaffReview = "[내부] 최종 결산 회의, 자원 압박표와 조사 단서를 함께 반영한 최종 배치안 작성";

window.TS_I18N.mergeContent('en', {
  cards: {
    "A2-SUPPLY-01": { msg:"Early-containment consumption is running above the projected curve.\n\n[ORACLE: Command-judgment history reviewed — top-tier directive compliance. Pre-approving supply-preservation measures.]\n\nSeo Hae-eun checks the manifest.\n\"Approval came through before we even asked. Means they've been watching how we run things.\"", leftLabel:"Receive the preservation supplies", rightLabel:"Take only the essentials" },
    "A2-MORALE-01": { msg:"As extended shifts drag on, agent fatigue reports are climbing.\n\n[ORACLE: Duty-log analysis complete. Rest-facility upgrades and temporary shift rotation submitted to HQ — approved.]\n\nYoon Se-jin: \"So the machine looks after human fatigue too. Either way, it does help.\"", leftLabel:"Apply the improvements immediately", rightLabel:"Prioritize the shift rotation" },
    "A3-SUPPLY-01": { msg:"Gangwon Branch's operational run has outlasted HQ's settlement cycle.\n\n[ORACLE: Sustained-operations record confirmed. Allocation beyond standard resupply approved.]\n\nSeo Hae-eun hands over the manifest.\n\"HQ pushes more materiel to bases that hold out. This one already cleared paperwork.\"", leftLabel:"Take the extra supplies", rightLabel:"Take half, bank the rest" },
    "A3-SUPPLY-02": { msg:"[ORACLE: Entering prolonged-containment phase. Resource burn exceeds standard.]\n\n[ORACLE: Second allocation requested from HQ logistics. Approved.]\n\nKang Do-yun, briefly:\n\"We run to orders, so they back us. This month we can breathe.\"", leftLabel:"Receive the second allocation", rightLabel:"Distribute at field discretion" },
    "A4-SUPPLY-01": { msg:"[ORACLE: Final-phase support protocol. Priority resupply airdropped to loyal-operating bases.]\n\nSeo Hae-eun: \"HQ won't abandon us at the very end. This buys a few more days.\"", leftLabel:"Secure the emergency supplies", rightLabel:"Release some to lift morale" },
    "A3-INSPECT-01": { msg:"[ORACLE: Scheduled facility-inspection cycle reached. Running containment-line calibration automatically.]\n\nLim Jae-hyeok reads the results.\n\"It drops the overloaded sections and tightens the slack ones. Balanced it on its own.\"\n\n\"Less for us to touch means less fatigue on the agents.\"", leftLabel:"Approve the auto-calibration", rightLabel:"Verify the numbers, then approve" },
    "A3-INSPECT-02": { msg:"[ORACLE: Aging-equipment list submitted to HQ. Replacement budget allocated.]\n\nKang Do-yun: \"Figured we'd fix it out of our own cut. HQ paid. That's what holding out earns.\"", leftLabel:"Replace it on HQ's budget", rightLabel:"Prioritize and replace in sequence" },
    "A4-INSPECT-01": { msg:"[Emergency facility inspection — final stage]\n\nThe audit team swept the branch one last time. Containment is already at its limit, but the internal systems are more intact than expected.\n\n[ORACLE: Conditionally sound — order to preserve core systems first.]\n\nLim Jae-hyeok: \"We can't stop the collapse. But we can leave a frame people can hold to the end.\"", leftLabel:"Preserve the core systems", rightLabel:"Manage all systems evenly" },
    "A3-MORALE-01": { msg:"The agents' accumulated-fatigue reports reached HQ.\n\n[ORACLE: Assigning two relief personnel, priority given to compliant-operating bases.]\n\nSeo Hae-eun: \"First time a staffing request cleared this fast. It means they trust us up top.\"", leftLabel:"Take the relief personnel", rightLabel:"Spend it on existing staff's conditions" },
    "A3-MORALE-02": { msg:"Yoon Se-jin compiles the agents' grievances: meals, rest space, medical support.\n\n[ORACLE: Item-by-item improvements relayed to HQ. Three approved immediately.]\n\nYoon Se-jin: \"As long as grievances go up and answers come back down, people hold.\"", leftLabel:"Apply the improvements on-site", rightLabel:"Make the reporting channel permanent" },
    "A4-MORALE-01": { msg:"Some agents chose to stay even in the emergency phase. You have to decide what to promise them.\n\n[ORACLE: Special provisions for remaining personnel approved — family safety and posthumous compensation guaranteed.]\n\nSeo Hae-eun, quietly:\n\"I can't promise victory. But I can promise you won't have been for nothing.\"", leftLabel:"Guarantee the stay-behind provisions", rightLabel:"Focus on the field, not words" },
    "A2-FORESHADOW-01": {
      msg: "Lim Jae-hyeok finds a short gap while organizing the dawn communications log.\n\n\"It is not proof that someone entered. But there is an outside relay trace that does not appear in ORACLE's record. For now, we should preserve the pattern without naming an organization.\"\n\nFor now, suspicion arrives before answers.",
      leftLabel: "Record the pattern and hold pursuit",
      rightLabel: "Assign Lim Jae-hyeok an unofficial reanalysis"
    },
    "A2-FORESHADOW-02": {
      msg: "A new classification appears on the evidence table.\n\n[Outside relay / internal record / field anomaly]\n\nSeo Hae-eun says, \"If we force a conclusion now, we will misread the board. Today we should leave it as a stage for accumulating clues.\"\n\nThe evidence table is not the answer. It is a trace you can return to.",
      leftLabel: "Confirm only the classification standard",
      rightLabel: "Compress it into ORACLE report format"
    },
    "A2-TRIAGE-01": {
      msg: "The clues gathered on the evidence table point in different directions.\n\nSeo Hae-eun says, \"If we label the conclusion now, ORACLE's summary will swallow it. I will separate outside relay, internal records, and field anomalies, then pass them into the next cross-check list.\"\n\nSometimes delaying the answer is also a command decision.",
      leftLabel: "Move it to the next cross-check list",
      rightLabel: "Leave only the ORACLE summary"
    },
    "A3-B3-LINE-01": {
      msg: "Lim Jae-hyeok overlays the dawn communications gap with the B3 lower-level power log.\n\n\"Strange. The trace that looked like an outside relay passes through lower B3 once. It points in the same direction as the 02:47 pulse in the previous commander's record.\"\n\nThere is no conclusion yet. But the suspicion left in Act 2 now has a path downward.",
      leftLabel: "Compare it against lower B3 logs",
      rightLabel: "Fold it into the ORACLE summary"
    },
    "A3-B3-LINE-02": {
      msg: "Hae-eun brings an old maintenance sheet.\n\n\"The lower B3 bulkhead was not a closed facility. It was a maintenance target. After the previous commander disappeared, only that line vanished from the list.\"\n\nA space removed from a list is not gone. Someone decided not to look.",
      leftLabel: "Preserve the original maintenance sheet",
      rightLabel: "Reclassify it only as a danger zone"
    },
    "A4-B3-LINE-01": {
      msg: "As Act 4 pressure begins, an old backup line answers from lower B3.\n\nLim Jae-hyeok says, \"It is not an official line. But it works like the bypass route the previous commander left behind. If we use it, we can lose a little less of tonight's deployment table.\"\n\nORACLE does not register the line. The people who remain can still move along it.",
      leftLabel: "Use the B3 backup line for field deployment",
      rightLabel: "Record the line location and close it"
    },
    "A4-SUPPORT-DG-01": {
      msg: "Immediately after the resource shortage alert, an unofficial logistics window opens from a DG line.\n\n\"This is not a formal contract. But if the Gangwon branch cannot survive tonight, our side has a problem too. Record it as emergency civilian supply support.\"\n\nAccepting it gives you breathing room. In exchange, a debt remains under a name.",
      leftLabel: "Accept DG emergency logistics",
      rightLabel: "Take only the minimum and keep a public record"
    },
    "A4-SUPPORT-MD-01": {
      msg: "Meridian sends a short packet.\n\n\"The blind spot northeast of the containment line is widening. If you use our observation values, you can correct it immediately. In exchange, we request a portion of the field-response logs.\"\n\nThe information is accurate. The fact that someone outside sees too much is also accurate.",
      leftLabel: "Use the observation values to correct the line",
      rightLabel: "Use the coordinates only and refuse raw data sharing"
    },
    "A4-SUPPORT-PROM-01": {
      msg: "The Prometheus channel opens for a very short moment.\n\n\"This is not a demand for escape. If you want to keep the containment line alive tonight, look first at the field coordinates ORACLE is erasing. You do not have to trust us. Just leave the record.\"\n\nLim Jae-hyeok stares at the screen for a long moment.\n\"Let's treat it less like cooperation... and more like insurance against manipulation.\"",
      leftLabel: "Apply the coordinates to field judgment",
      rightLabel: "Preserve the record and keep the ORACLE report narrow"
    },
    "A4-EVIDENCE-RELIEF-01": {
      msg: "Two evidence-table clues point toward the same conclusion.\n\nYoon Se-jin says, \"This is not just a resource shortage. It is a deployment-order problem. We can prove that we keep spending people in the same place.\"\n\nIf the evidence is strong enough, crisis becomes a structure that can be repaired.",
      leftLabel: "Change deployment order using the evidence",
      rightLabel: "Reflect only the summary in the ORACLE report"
    },
    "A4-STAFF-REVIEW-01": {
      msg: "Final review meeting. The resource pressure sheet and evidence-table clues are placed on the same screen.\n\nKang Do-yun says, \"If we look only at the numbers, cutting back is correct. But if we look at who is holding which line, deployment changes.\"\n\nYoon Se-jin lines up the medical roster. Lim Jae-hyeok places ORACLE's omitted zones beside it.\n\nThis is not a card about enduring loss. It is a card about deciding where the remaining people stand.",
      leftLabel: "Reassign final roles by person",
      rightLabel: "Reassign by ORACLE evaluation table"
    }
  },
  oracleLogs: {
    "LOG-A2-FORESHADOW-01": {
      title: "Outside Relay Trace",
      content: "Lim Jae-hyeok recorded an outside relay trace that does not appear in ORACLE's official log. It has not been assigned to a specific faction. Only the pattern is preserved."
    },
    "LOG-A2-FORESHADOW-02": {
      title: "Evidence Table Classification Standard",
      content: "The evidence table began separating outside relay traces, internal records, and field anomalies as a distinct pattern. Conclusions will be cross-checked later."
    },
    "LOG-A2-TRIAGE-01": {
      title: "Cross-Check List",
      content: "Unresolved evidence-table records were not fixed into a conclusion. They were separated into outside relay, internal record, and field anomaly lines, then passed into the next cross-check list."
    },
    "LOG-B3-LINEAGE-01": {
      title: "Lower B3 Path Comparison",
      content: "The outside relay suspicion left in Act 2 was compared against lower B3 power logs. It pointed in the same direction as the previous commander's 02:47 pulse."
    },
    "LOG-B3-LINEAGE-02": {
      title: "B3 Bulkhead Maintenance Sheet",
      content: "The original maintenance sheet showed that the lower B3 bulkhead was once a maintenance target, not a sealed non-space. The line vanished after the previous commander's disappearance."
    },
    "LOG-A4-B3-LINEAGE": {
      title: "B3 Backup Line",
      content: "During the Act 4 crisis, an unregistered lower B3 backup line was used for field deployment. ORACLE did not register it, but field personnel could move along it."
    },
    "LOG-A4-DG-SUPPORT": {
      title: "DG Emergency Logistics Support",
      content: "During the final crisis, DG provided unofficial logistics support. The immediate resource collapse was softened, but the future cost of influence remains."
    },
    "LOG-A4-MD-SUPPORT": {
      title: "Meridian Observation Support",
      content: "Meridian provided containment-line observation values. The information reduced pressure in the crisis, while confirming the depth of external surveillance."
    },
    "LOG-A4-PROM-SUPPORT": {
      title: "Prometheus Field Coordinates",
      content: "Prometheus provided field coordinates omitted from ORACLE's view. Whether this was cooperation or anti-manipulation insurance remains a command judgment."
    },
    "LOG-A4-EVIDENCE-RELIEF": {
      title: "Evidence-Based Crisis Reassignment",
      content: "Cross-checked evidence table conclusions allowed the branch to adjust final deployment order. Evidence did not remove the crisis, but it gave the team a repairable structure."
    },
    "LOG-A4-STAFF-REVIEW": {
      title: "Final Staff Assignment",
      content: "The final resource pressure sheet and evidence-table clues were reviewed together to reassign final roles by person. Pressure was treated as an operational choice, not just a loss."
    }
  },
  newsItems: (function(){
    var items = {};
    items[newsA2Foreshadow01] = { type: 'classified', text: "[CLASSIFICATION HOLD] Dawn comms log shows an outside relay trace absent from ORACLE records — no organization assigned." };
    items[newsA2Foreshadow02] = { type: 'internal', text: "[INTERNAL] Evidence table begins storing outside relay, internal records, and field-anomaly patterns as a separate category." };
    items[newsA2Triage01] = { type: 'internal', text: "[INTERNAL] Unresolved evidence-table records moved into outside relay, internal record, and field-anomaly classifications." };
    items[newsA4DgSupport] = { type: 'domestic', text: "[DOMESTIC] DG-linked emergency civilian logistics network activates — partial relief for supply gaps near the barrier." };
    items[newsA4MdSupport] = { type: 'overseas', text: "[OVERSEAS] Meridian observation network privately delivers correction values for Korean containment-line fluctuation." };
    items[newsA4PromSupport] = { type: 'classified', text: "[CLASSIFICATION HOLD] Prometheus coordinates partially match zones omitted by ORACLE — formal verification pending." };
    items[newsA4EvidenceRelief] = { type: 'internal', text: "[INTERNAL] Evidence-table cross-check adjusts final deployment order — resource loss buffer recorded." };
    items[newsA4StaffReview] = { type: 'internal', text: "[INTERNAL] Final review meeting drafts deployment using both resource pressure and investigation clues." };
    return items;
  })()
});
})();
