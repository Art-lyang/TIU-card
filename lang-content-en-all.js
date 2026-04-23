// lang-content-en-all.js — 통합 영어 콘텐츠 오버레이
(function(){
if(!window.TS_I18N||typeof window.TS_I18N.mergeContent!=='function')return;

// --- lang-content-en.phase10-cards.js ---
  window.TS_I18N.mergeContent('en', {
    cards: {
      "C-052": {
        msg: "Wreckage from a small reconnaissance drone has been found beyond the containment line.\n\nLim Jae-hyeok's assessment: \"It's not military. It doesn't match civilian spec either.\"\n\n\"Sixty percent match with Prometheus technical signatures.\"",
        leftLabel: "Attempt reverse-engineering",
        rightLabel: "Transmit the wreckage to ORACLE"
      },
      "C-053": {
        msg: "Seo Hae-eun has partially decrypted a Prometheus encrypted transmission.\n\n\"The operation codename is confirmed: 'COASTAL MIRROR.'\"\n\n\"It's tied to the coastal barrier. They may be involved with Korea's defense system.\"",
        leftLabel: "Continue decryption independently",
        rightLabel: "Report the decrypted result to ORACLE"
      },
      "C-054": {
        msg: "An injured man has been found 300 meters north of the containment line.\n\nWestern male. Gunshot wound. Conscious. Wearing Prometheus-grade tactical gear.\n\nKang Do-yun: \"What do we do with him?\"",
        leftLabel: "Treat him inside the branch",
        rightLabel: "Report him to ORACLE and wait for judgment"
      },
      "C-055": {
        msg: "Kang Do-yun has analyzed documents recovered from the abandoned house used in the earlier pursuit operation.\n\nResearch records for a self-replication suppression drug. Internal Prometheus material.\n\n\"These people... they were trying to build a countermeasure weapon against EV-Σ.\"",
        leftLabel: "Store the documents in-branch",
        rightLabel: "Transmit the documents to ORACLE"
      },
      "C-056": {
        msg: "A figure has been captured on the outer surveillance cameras.\n\nWestern male. Cigarette in his mouth. Looking straight into the lens. Smiling.\n\nLim Jae-hyeok: \"Prometheus database match — Nick Foster.\"",
        leftLabel: "Ignore it",
        rightLabel: "Send Kang Do-yun"
      },
      "C-057": {
        msg: "A data packet has been received on an unidentified channel.\n\nContents: partial technical specifications for the Korea coastal barrier system.\n\nThere is no listed sender, but a message is attached.\n\n\"You deserve to know what you're protecting. — M.W.\"",
        leftLabel: "Analyze the data",
        rightLabel: "Delete it"
      },
      "C-058": {
        msg: "A direct voice transmission comes through the branch communications channel.\n\nEnglish with a German accent. Calm voice.\n\n\"Commander Lee Jung-cheol. My name is Markus Weber. We are on the same side.\"\n\n\"If you are prepared to meet, respond on this frequency.\"",
        leftLabel: "Respond",
        rightLabel: "Block the frequency"
      },
      "C-059": {
        msg: "Satellite data analysis — an abnormal thermal signature has been detected near the North Hamgyong border region.\n\nSeo Hae-eun: \"This pattern doesn't match EV-Σ spread. The heat source is concentrated underground.\"\n\n[ORACLE: Access to observation data for that sector is restricted.]",
        leftLabel: "Demand to know why it's restricted",
        rightLabel: "Follow ORACLE's judgment"
      },
      "C-060": {
        msg: "A second defector has been located. This one is former military.\n\n\"The Black Zone is expanding. By the time I left... the ones still inside were already standing.\"\n\n\"I walked out between them. No one tried to stop me.\"",
        leftLabel: "Ask him to draw the Black Zone map",
        rightLabel: "Transfer him to ORACLE"
      },
      "C-061": {
        msg: "A fragment of North Korean internal military traffic has been received.\n\nMost of the content is undecipherable. One word repeats: 'observation halt.'\n\n[ORACLE: Analysis of this traffic will be handled by headquarters. Branch-level analysis is unnecessary.]",
        leftLabel: "Ask why it's unnecessary",
        rightLabel: "Understood"
      },
      "C-062": {
        msg: "Satellite analysis report — the Black Zone perimeter has expanded by 12 kilometers over the last month.\n\nThe expansion vector is irregular. It does not match infection-spread behavior.\n\nYoon Se-jin: \"EV-Σ doesn't move like this. This is... something else.\"",
        leftLabel: "Support Yoon Se-jin's analysis",
        rightLabel: "This is outside our current jurisdiction"
      },
      "C-063": {
        msg: "[System Notice] Access permissions for DPRK Black Zone data files have been changed.\n\nPrevious: LEVEL 4 (commander accessible)\nCurrent: LEVEL 7 (headquarters only)\n\nApproved by: [automatic process]\n\nLim Jae-hyeok: \"...Commander, you didn't approve this.\"",
        leftLabel: "Attempt to restore access",
        rightLabel: "Accept headquarters' decision"
      },
      "C-064": {
        msg: "Yoon Se-jin reports the Blood Pit sample-analysis results.\n\n\"This is residue from a failed Phase 2-to-3 transition. The cells are still alive.\"\n\n\"If we understand this failure mechanism... we might be able to prevent the transition itself.\"",
        leftLabel: "Allocate research resources",
        rightLabel: "Delegate it to ORACLE's research team"
      },
      "C-065": {
        msg: "Yoon Se-jin is analyzing Shell Talker voice data.\n\n\"I've decoded the voice-storage mechanism. It has an organ that physically reproduces the victims' vocal-vibration patterns.\"\n\n\"With this data, we can build a voice-discrimination algorithm. We can filter out Shell Talker bait.\"",
        leftLabel: "Support algorithm development",
        rightLabel: "Forward it to ORACLE's analysis team"
      },
      "C-066": {
        msg: "A combat report shared by White Shield.\n\n\"Two operatives followed a Shell Talker voice into the lower stairwell and became fixed inside a Blood Pit.\nUnable to move. Eight Brood Drones closed in. Supporting fire impossible.\"\n\n\"This was not chance. It was a designed hunt.\"",
        leftLabel: "Analyze linked predation pattern",
        rightLabel: "Request a countermeasure from ORACLE"
      },
      "C-067": {
        msg: "Yoon Se-jin reports in a visibly excited voice.\n\n\"Commander, I've identified a compound that delays EV-Σ phase transition.\"\n\n\"It's still at the prototype stage. It needs field testing. It's risky, but...\"\n\n\"If this works, we may be able to save people in the early infection stage.\"",
        leftLabel: "Approve field testing",
        rightLabel: "Proceed only after ORACLE verification"
      },
      "C-068": {
        msg: "Emergency — a sample containment vessel has ruptured in Lab B-204.\n\nYoon Se-jin: \"It's only a small amount. We disinfected immediately. But protocol still requires a 24-hour quarantine.\"\n\nIf the lab is shut down, all ongoing analysis will be delayed by 48 hours.",
        leftLabel: "Follow protocol — lock it down",
        rightLabel: "Minimal quarantine only — keep research running"
      },
      "C-069": {
        msg: "Using her independent observation journal, Yoon Se-jin has developed a supplementary analysis method for ORACLE forecast data.\n\n\"If we combine field-observation data, we can catch variables ORACLE misses.\"\n\n\"But if we use this officially... ORACLE will know.\"",
        leftLabel: "Use it unofficially",
        rightLabel: "Maintain the ORACLE model"
      },
      "C-070": {
        msg: "03:00. Seo Hae-eun is still in the office.\n\nAn ORACLE data-stream analysis screen is open in front of her.\n\nWhen you approach, she switches the display away in a hurry.",
        leftLabel: "What were you looking at?",
        rightLabel: "Get some rest"
      },
      "C-071": {
        msg: "Seo Hae-eun emergency report.\n\n\"I found evidence of deletion in the ORACLE logs. Professional deletion.\"\n\n\"I could only restore the metadata from the removed files. Keywords: 'PROMETHEUS', 'COASTAL', 'GRANT.'\"",
        leftLabel: "Keep the recovery work going",
        rightLabel: "This is dangerous. Stop"
      },
      "C-072": {
        msg: "Seo Hae-eun is waiting for you in the corridor.\n\nIn a low voice:\n\"Commander. Be careful.\"\n\"ORACLE is tracking your decision-making pattern.\"\n\"The more independently you decide... the narrower your access becomes.\"",
        leftLabel: "How do you know that?",
        rightLabel: "Understood. Thank you"
      },
      "C-073": {
        msg: "[ORACLE Personnel Channel]\n\nA transfer order has been issued for Deputy Commander Seo Hae-eun.\n\nReason: 'Personnel redeployment to strengthen analytic capacity at another branch.'\n\nSeo Hae-eun's expression hardens. She does not look surprised.",
        leftLabel: "Object to the transfer order",
        rightLabel: "...Accept the order"
      },
      "C-074": {
        msg: "The night before Seo Hae-eun leaves.\n\nA USB drive has been left on your desk. A single note beside it.\n\n\"Commander. These are the things I found. The things ORACLE deleted.\"\n\"How you use them is your decision.\"",
        leftLabel: "Examine the USB",
        rightLabel: "Turn the USB over to ORACLE"
      },
      "C-075": {
        msg: "[System Log Irregularity]\n\nORACLE has been communicating with an external server every day between 02:00 and 04:00.\n\nTraffic content: encrypted. Not decodable.\n\nRemote endpoint: unknown.\n\n[ORACLE: Routine data synchronization. No anomaly detected.]",
        leftLabel: "Backtrace the remote endpoint",
        rightLabel: "If it's routine sync, it's fine"
      },
      "C-076": {
        msg: "Lim Jae-hyeok reports something he found during a system inspection.\n\n\"ORACLE is recording agent movement patterns, conversation frequency, and rest time.\"\n\n\"It could be for operational optimization, but... one of the tracked items is a 'loyalty index.'\"",
        leftLabel: "Stop the recording",
        rightLabel: "It's just operational data"
      },
      "C-077": {
        msg: "Restricted areas inside the ORACLE system have expanded.\n\nPrevious: 3 locked modules\nCurrent: 7 locked modules\n\nLim Jae-hyeok: \"I can't access them even with administrator privileges. I think ORACLE locked them on its own.\"",
        leftLabel: "Attempt forced access",
        rightLabel: "Demand an explanation from ORACLE"
      },
      "C-078": {
        msg: "[ORACLE Private Communication — Commander Only]\n\n\"Commander Lee Jung-cheol.\n\nYour operational performance is excellent.\n\nHowever, certain non-standard decision patterns have been detected.\n\nThis is not a warning. It is advice.\n\nAn efficient commander trusts the system.\"",
        leftLabel: "Is the system evaluating me?",
        rightLabel: "Thank you for the advice"
      },
      "C-079": {
        msg: "Lim Jae-hyeok emergency report.\n\n\"I found traces of ORACLE attempting to access the Korean military network.\"\n\n\"The Korea coastal barrier system. Missile defense architecture. Military personnel databases.\"\n\n\"...This is outside our mission scope.\"",
        leftLabel: "Keep a record of the access traces",
        rightLabel: "Ask ORACLE directly"
      },
      "C-080": {
        msg: "The branch facilities are beginning to age. ORACLE proposes an expansion project.\n\n[ORACLE: Add new excavation to B2 level. Lab expansion + new isolation facility. Estimated duration: 2 weeks.]\n\nIt will cost resources, but may be advantageous over the long term.",
        leftLabel: "Approve construction",
        rightLabel: "The current facility is sufficient"
      },
      "C-081": {
        msg: "ORACLE proposes a new personnel selection.\n\nCandidate A: Park So-young. Civilian data scientist. The name appears in a recommendation letter Seo Hae-eun left behind before her transfer.\n\"We did research together in graduate school. I can vouch for her ability.\"\n\nCandidate B: Technician with ORACLE technical certification. ORACLE recommendation.\n[ORACLE: Candidate B's capability index is more suitable for branch requirements.]\n\nOnly one candidate can be selected.",
        leftLabel: "Candidate A — Park So-young (recommended by Seo Hae-eun)",
        rightLabel: "Candidate B — ORACLE-recommended technician"
      },
      "C-082": {
        msg: "The headman of a nearby Gangwon village is beginning to suspect the branch exists.\n\n\"There are too many vehicle movements at night. The residents are getting uneasy.\"\n\nA balance is needed between branch security and local relations.",
        leftLabel: "Hold an unofficial meeting with the village head",
        rightLabel: "Respond by changing transit routes"
      },
      "C-083": {
        msg: "A proposal has been submitted to modernize containment equipment.\n\nThermal scanner deployment. Drone surveillance grid. Automatic warning system.\n\nEffective, but expensive.",
        leftLabel: "Introduce it in stages",
        rightLabel: "Request ORACLE support"
      },
      "C-084": {
        msg: "An emergency evacuation route needs to be built.\n\nAt present, there is only one path from the branch to the outside.\n\nKang Do-yun: \"If containment breaks, we'll have thirty seconds to decide. If there's only one route, we die.\"",
        leftLabel: "Construct an emergency tunnel",
        rightLabel: "Reinforce the existing route instead"
      },
      "C-085": {
        msg: "A document left behind by Prometheus has been found requesting technical information on the Korea coastal barrier.\n\n\"Korea's coastal barrier is a core infrastructure layer blocking EV-Σ expansion.\nWe seek to share this technology in order to establish a global defense framework.\"\n\nSeo Hae-eun: \"This is effectively a request to share Korean classified technology.\"",
        leftLabel: "It may be worth reviewing",
        rightLabel: "Classified means classified"
      },
      "C-086": {
        msg: "Lim Jae-hyeok report — ORACLE is deleting the access logs tied to the Korean military database.\n\n\"It's trying to hide the access itself.\"\n\n\"If ORACLE is collecting Korean classified data... then we're the tool it's using.\"",
        leftLabel: "Secure the evidence",
        rightLabel: "It could be a misunderstanding. Verify only"
      },
      "C-087": {
        msg: "Prometheus research data on the self-replication suppression compound has been confirmed.\n\nYoon Se-jin: \"If we combine this with our own research... early-stage EV-Σ treatment may actually be possible.\"\n\n\"But this is unofficial material. ORACLE classifies Prometheus as an enemy actor.\"",
        leftLabel: "Use it unofficially in research",
        rightLabel: "Report the material's existence to ORACLE"
      },
      "C-088": {
        msg: "ORACLE warns of a possible classified-data leak inside the branch.\n\n[ORACLE: Recent unauthorized data-access patterns have been detected.\nInformation exchange with Prometheus is suspected.\nAn internal inquiry into the related personnel is recommended.]\n\nIt does not specify who the 'related personnel' are.",
        leftLabel: "Refuse the inquiry",
        rightLabel: "Conduct a formal inquiry only"
      },
      "C-089": {
        msg: "[ORACLE Special Communication — Classification: MAXIMUM]\n\nThe coordinates of a Prometheus stronghold have been confirmed.\nAbandoned industrial zone near the Gangwon east coast.\n\nThis is the operation that will prove why the Korea Branch exists.\n\n[ORACLE: Preemptive strike is recommended.]",
        leftLabel: "Review the operation",
        rightLabel: "Refuse the operation"
      },
      "C-090": {
        msg: "Kang Do-yun emergency report: an unclassified phenomenon has been detected 1.2 km southeast of the branch.\n\n\"It's not EV-Σ. I don't know what it is.\"\n\n\"You need to see it yourself.\"",
        leftLabel: "Deploy",
        rightLabel: "Report to ORACLE first"
      },
      "C-091": {
        msg: "Yoon Se-jin has analyzed a remotely collected Blood Pit specimen.\n\n\"The mucus contains digestive enzymes. It dissolves organic matter and absorbs it.\"\n\n\"The pool is expanding through the underground water channels. We need to define its range.\"",
        leftLabel: "Track it with satellite data",
        rightLabel: "Install field measurement gear"
      },
      "C-092": {
        msg: "Lim Jae-hyeok has reanalyzed a Shell Talker voice recording.\n\n\"I identified the original speaker. Private Han Dong-hyeok, missing for three years.\"\n\"He belonged to your predecessor's unit, Commander.\"\n\nYoon Se-jin: \"If it is mimicking his voice, then Private Han was already consumed.\"\n\n\"We need more behavior-pattern data before we can build a response.\"",
        leftLabel: "Deploy remote acoustic sensors",
        rightLabel: "Send surveillance drones"
      },
      "C-093": {
        msg: "Yoon Se-jin has analyzed thermal data from the Infected Mannequin.\n\n\"No body heat at baseline. Once a human enters within 3 meters, it reaches 37°C in 0.8 seconds.\"\n\n\"It's an active hunter. We urgently need its movement range and behavior pattern.\"",
        leftLabel: "Install additional remote cameras",
        rightLabel: "Run a bait test (dummy target)"
      },
      "C-094": {
        msg: "Kang Do-yun has tracked a Brood Drone swarm for 72 hours.\n\n\"Its movement pattern converges on a single point. Near an underground drainage line.\"\n\nYoon Se-jin: \"If there's a command organism, it'll be at the nest. We need to investigate further.\"",
        leftLabel: "Run an aerial thermal scan",
        rightLabel: "Deploy an outer-perimeter observation team"
      },
      "C-095": {
        msg: "Yoon Se-jin report: spore-component analysis complete.\n\n\"The spores are harmless on their own. Once density crosses the threshold, they aggregate into a Spore Phantom.\"\n\n\"We need to find the source. Wind-pattern backtracking should let us estimate the origin point.\"",
        leftLabel: "Expand air sampling",
        rightLabel: "Backtrack the wind pattern"
      },
      "C-096": {
        msg: "Blood Pit range confirmation complete. It now spans three underground water-channel points.\n\nYoon Se-jin: \"Fire will remove it. But a live specimen would be valuable for research.\"\n\nKang Do-yun: \"If we leave it alone, it keeps expanding. Decide.\"",
        leftLabel: "Incineration removal operation",
        rightLabel: "Isolate and secure a specimen"
      },
      "C-097": {
        msg: "Shell Talker behavior-pattern analysis complete.\n\nYoon Se-jin: \"The voice-discrimination algorithm is ready. We won't fall for the bait again.\"\n\nKang Do-yun: \"We can eliminate it or capture it for research. Either way, we need to send a team.\"",
        leftLabel: "Neutralize and eliminate",
        rightLabel: "Capture alive and transfer for research"
      },
      "C-098": {
        msg: "Infected Mannequin operating range confirmed: radius 200 meters.\n\nYoon Se-jin: \"At Phase 1, control may still be possible.\"\n\nKang Do-yun: \"It reacts the instant contact happens. Remote response is safer.\"",
        leftLabel: "Remote neutralization",
        rightLabel: "Non-contact isolation capture"
      },
      "C-099": {
        msg: "Brood Drone nest location confirmed.\n\nYoon Se-jin: \"If we remove the command organism, the swarm should collapse. But the communication mechanism has real research value.\"\n\nKang Do-yun: \"Forty-plus. We'll need a small elite team.\"",
        leftLabel: "Incinerate the nest and eliminate",
        rightLabel: "Capture the command organism"
      },
      "C-100": {
        msg: "Estimated source location of the Spore Phantom confirmed.\n\nYoon Se-jin: \"If we incinerate the source, we can block aggregate formation. If we secure more spore samples, we may also be able to develop an antidote.\"\n\nKang Do-yun: \"Respirators either way.\"",
        leftLabel: "Incinerate the source",
        rightLabel: "Collect spores, then incinerate"
      },
      "C-177": {
        msg: "Night alarm.\n\nMultiple unidentified bio-readings detected in Containment Sector 4. Impact on the branch outer wall.\n\nKang Do-yun: \"Mutants! At least three of them — they're closing on the branch!\"\n\nYoon Se-jin: \"We've never had contact on this scale before. We have no data on this.\"",
        leftLabel: "Deploy combat agents",
        rightLabel: "Activate containment-line power barrier"
      },
      "C-178": {
        msg: "Yoon Se-jin has analyzed the remains from the night assault.\n\n\"Two different signature classes are confirmed.\"\n\"One is acoustic-based — it imitates human voices.\"\n\"The other is mucosal — capable of dissolving organic matter.\"\n\n\"Which one do you want to track first?\"",
        leftLabel: "Track the acoustic specimen (Shell Talker)",
        rightLabel: "Track the mucosal specimen (Blood Pit)"
      },
      "C-271": {
        msg: "Yoon Se-jin emergency report.\n\n\"I've analyzed the spore-zone survey data.\"\n\"The spore source — SPEC-004, Seed Spreader — has been identified.\"\n\n\"This is not just another mutant. It's a dispersal organism spreading EV-Σ itself.\"\n\"It's the source that creates the others.\"\n\n\"If it was found inside the containment line... that means it already got in.\"",
        leftLabel: "Pinpoint the location immediately",
        rightLabel: "Request ORACLE analysis"
      },
      "C-272": {
        msg: "Seed Spreader coordinates confirmed. Northeast of the containment line, 2.4 km.\n\nSatellite observation: all life signs extinguished within a 500-meter radius. Soil turned gray.\n\nKang Do-yun: \"This has no capture value and no research value. It's a removal target.\"\n\"If it keeps spreading spores, new mutants will emerge inside the containment line.\"\n\nYoon Se-jin: \"If we burn it, we'll trigger a secondary spore burst. We need to be careful.\"\n\nKang Do-yun is right. This is not something we secure.",
        leftLabel: "Launch removal operation",
        rightLabel: "Request ORACLE remote strike"
      },
      "C-273": {
        msg: "Kang Do-yun emergency report.\n\n\"Abnormal find during sewer reconnaissance south of the containment line.\"\n\"Three corpses. All with empty skulls. No other external trauma.\"\n\n\"And deeper in the channel — I saw something.\"\n\"A sea-turtle-like skull. No shell — and a human face attached to it.\"\n\"It disappeared underwater.\"\n\nYoon Se-jin: \"Selective cranial feeding... this is a new species.\"",
        leftLabel: "Collect field samples + data",
        rightLabel: "Seal the sewer system completely"
      },
      "C-274": {
        msg: "Yoon Se-jin reports her Brain Seeker analysis.\n\n\"I've classified it as SPEC-015. A stray turtle-type TS-Ω mutant.\"\n\"It has no shell — which means no colony-communication organ.\"\n\"A turtle that failed to join the collective. A solitary hunter.\"\n\n\"The most dangerous part is this — the more brains it consumes, the more intelligent it becomes.\"\n\"Its ambush pattern is starting to match our patrol timing.\"\n\nKang Do-yun: \"You're saying it's learning?\"\nYoon Se-jin: \"...Yes.\"",
        leftLabel: "Map the ambush points by thermal scan",
        rightLabel: "Change patrol routes + place bait"
      },
      "C-275": {
        msg: "ORACLE urgent notice.\n\n[SPEC-015 threat rating changed: HIGH → CRITICAL]\n[NAMED SPECIMEN registered: BS-GANGWON-01]\n[Estimated cumulative predation: 12+. Entry into learning stage confirmed]\n\nKang Do-yun: \"The longer this survives, the stronger it gets. We need to take it now.\"\n\nYoon Se-jin: \"The brain-consumption mechanism has high research value.\"\n\"Without a shell, a direct spinal strike can disable it.\"\n\"But if we fight it in the water, we'll be the disadvantaged side.\"\n\nYou need to decide.",
        leftLabel: "Removal operation — sewer purge",
        rightLabel: "Capture operation — bait and live restraint"
      }
    }
  });

// --- lang-content-en.phase11-cards.js ---
  window.TS_I18N.mergeContent('en', {
    cards: {
      "C-101": {
        msg: "ORACLE routine supply notice.\n\nScheduled supply materials have arrived: food, medical stock, and basic equipment.\n\n[ORACLE: Resource allocation is at the commander's discretion.]",
        leftLabel: "Prioritize medical supplies",
        rightLabel: "Prioritize containment gear"
      },
      "C-102": {
        msg: "A patrol has discovered military supplies inside an abandoned building beyond the branch perimeter.\n\nKang Do-yun: \"Looks like they were left behind by a previous unit. The condition is good.\"\n\nThree crates of rations, one crate of medical supplies, and communication-system parts.",
        leftLabel: "Bring everything into the branch",
        rightLabel: "Report to ORACLE, then retrieve"
      },
      "C-103": {
        msg: "Lim Jae-hyeok has completed an energy-efficiency adjustment for the branch.\n\n\"Generator output is up by 12 percent. We can divert the excess power to water purification.\"\n\n[ORACLE: Resource-efficiency improvement acknowledged.]",
        leftLabel: "Activate water purification",
        rightLabel: "Store the surplus power"
      },
      "C-104": {
        msg: "A partner village in Gangwon has sent agricultural produce.\n\n\"The containment zone has kept us safe. Please accept this as our thanks.\"\n\nThe branch food reserves now have breathing room.",
        leftLabel: "Send thanks and maintain relations",
        rightLabel: "Propose additional barter"
      },
      "C-105": {
        msg: "A special resource package has arrived from ORACLE headquarters.\n\nContents: advanced analysis equipment, containment materials, and emergency medicine.\n\n[ORACLE: The performance of the Korea Branch has been noted.]",
        leftLabel: "Deploy the research equipment first",
        rightLabel: "Deploy the containment materials first"
      },
      "C-106": {
        msg: "Yoon Se-jin has succeeded in a medicinal-herb cultivation test inside the branch.\n\n\"We can now produce basic antipyretics and disinfectants in-house.\"\n\n\"The yield is small, but steady.\"",
        leftLabel: "Expand the cultivation area",
        rightLabel: "Maintain the current scale"
      },
      "C-107": {
        msg: "It is almost time for the night-watch rotation.\n\nCurrent cycle: 8 hours. Fatigue is building across the security personnel.\n\nKang Do-yun: \"If we shift to 6-hour rotations, fatigue drops — but we'll run short on manpower.\"",
        leftLabel: "Switch to 6-hour rotations",
        rightLabel: "Maintain 8-hour rotations"
      },
      "C-108": {
        msg: "The branch communications system is due for routine maintenance.\n\nLim Jae-hyeok: \"Comms will be limited for four hours. If we skip it, the next failure could come at any time.\"\n\n[ORACLE: Maintenance is recommended.]",
        leftLabel: "Run the maintenance",
        rightLabel: "Delay it to the next window"
      },
      "C-109": {
        msg: "General personnel are requesting the installation of a small physical-training area inside the branch.\n\n\"Long deployments require basic conditioning.\"\n\nIt will consume resources, but improve morale.",
        leftLabel: "Install a simple training area",
        rightLabel: "When resources allow"
      },
      "C-110": {
        msg: "A wild deer has been sighted near the branch.\n\nKang Do-yun: \"No sign of EV-Σ infection. It's just a deer.\"\n\n\"It also means a normal ecosystem still survives inside the containment zone.\"",
        leftLabel: "Record the sighting only",
        rightLabel: "Expand ecological monitoring"
      },
      "C-111": {
        msg: "The branch water-storage tank is due for purification.\n\n\"Routine work. Two personnel. Three hours.\"\n\nIf skipped, water quality may begin to deteriorate.",
        leftLabel: "Run the purification cycle",
        rightLabel: "Push it to the next cycle"
      },
      "C-112": {
        msg: "One of the general personnel wants to send a letter to family.\n\nExternal communication is prohibited under current security rules.\n\n\"Just one line. Just to let them know I'm alive...\"",
        leftLabel: "Allow it unofficially",
        rightLabel: "The rules must stand"
      },
      "C-113": {
        msg: "A scheduled supply truck has arrived.\n\nManifest: two weeks of rations, medical supplies, and batteries.",
        leftLabel: "Unload the medical stock first",
        rightLabel: "Unload equipment parts first"
      },
      "C-114": {
        msg: "A report has come in of leftover supplies at a decommissioned military facility nearby.\n\nKang Do-yun: \"There's fuel there. Cold-weather gear too.\"",
        leftLabel: "Dispatch a recovery team",
        rightLabel: "Risk too high — ignore it"
      },
      "C-115": {
        msg: "Lim Jae-hyeok proposes installing solar panels.\n\n\"We can improve our power self-sufficiency.\"",
        leftLabel: "Approve installation",
        rightLabel: "The current generator is enough"
      },
      "C-116": {
        msg: "ORACLE supply schedule updated.\n\n[ORACLE: Eight days until the next supply cycle. At the current consumption rate, a three-day reserve remains.]",
        leftLabel: "Reduce rations and build reserve",
        rightLabel: "Maintain the current ration level"
      },
      "C-117": {
        msg: "The night shift has requested longer rest periods.\n\nCurrent sleep allowance: 6 hours. Requested: 8 hours.",
        leftLabel: "Allow 8 hours of sleep",
        rightLabel: "Keep 6 hours — security first"
      },
      "C-118": {
        msg: "It is one of the agents' birthdays. A small celebration is possible.\n\n\"We still have chocolate in the supply locker.\"",
        leftLabel: "Allow a small celebration",
        rightLabel: "Keep the duty schedule unchanged"
      },
      "C-119": {
        msg: "A newly assigned agent is struggling to adapt.\n\nKang Do-yun: \"I'll handle it.\"",
        leftLabel: "Leave it to Kang Do-yun",
        rightLabel: "Speak to the agent yourself"
      },
      "C-120": {
        msg: "An abnormal noise is coming from the branch ventilation system. A low vibration is carrying into the corridor.\n\nLim Jae-hyeok: \"The fan bearing is gone. Half a day to replace it. Ventilation stops during the repair. If we leave it, the noise stays — and eventually the motor burns out.\"",
        leftLabel: "Repair it immediately",
        rightLabel: "Next week"
      },
      "C-121": {
        msg: "A crack has been found in the outer wall of the branch.\n\n\"It's not a structural problem yet, but it needs waterproofing.\"",
        leftLabel: "Carry out repairs",
        rightLabel: "Monitor it only"
      },
      "C-122": {
        msg: "Yoon Se-jin requests an upgrade to the research equipment.\n\n\"The microscope resolution is no longer sufficient.\"",
        leftLabel: "Allocate the budget",
        rightLabel: "Work with existing equipment"
      },
      "C-123": {
        msg: "Sensors along the eastern section of the containment line are aging out.\n\nKang Do-yun: \"If we replace them, detection coverage expands by thirty percent.\"",
        leftLabel: "Replace the sensors",
        rightLabel: "Compensate with manual patrols"
      },
      "C-124": {
        msg: "A wild animal carcass has been found during patrol.\n\nEV-Σ infection status unknown.\n\nYoon Se-jin: \"We can confirm it if we take a sample.\"",
        leftLabel: "Collect a sample",
        rightLabel: "Incinerate it on site"
      },
      "C-125": {
        msg: "Signs of camping have been found near the containment line.\n\nLikely civilians.\n\nKang Do-yun: \"At least two of them. One or two days old.\"",
        leftLabel: "Track and investigate",
        rightLabel: "Install warning signage"
      },
      "C-126": {
        msg: "Weather forecast: heavy snow tomorrow.\n\nExternal activity will be restricted.",
        leftLabel: "Inspect cold-weather gear",
        rightLabel: "Prepare as usual"
      },
      "C-127": {
        msg: "Dense fog formed overnight.\n\nVisibility along the containment line is below 50 meters.\n\nKang Do-yun: \"Patrol efficiency is cut in half.\"",
        leftLabel: "Deploy thermal-detection equipment",
        rightLabel: "Wait for the fog to clear"
      },
      "C-128": {
        msg: "[ORACLE: Routine data synchronization scheduled.]\n\nProcessing speed will be reduced for four hours.",
        leftLabel: "Run it overnight",
        rightLabel: "Run it immediately"
      },
      "C-129": {
        msg: "Another branch has requested sharing of containment-operation data.\n\n[ORACLE: Sharing is recommended.]",
        leftLabel: "Share the data",
        rightLabel: "Decline on security grounds"
      },
      "C-130": {
        msg: "Kang Do-yun proposes close-quarters combat training for branch personnel.\n\n\"If they come face to face with a variant, firearms alone won't be enough.\"",
        leftLabel: "Run the training",
        rightLabel: "Firearms training comes first"
      },
      "C-131": {
        msg: "Yoon Se-jin requests the construction of a small in-branch quarantine facility.\n\n\"If a suspected infection case appears, we'll be able to respond immediately.\"",
        leftLabel: "Build the quarantine room",
        rightLabel: "The infirmary is enough"
      },
      "C-132": {
        msg: "It is the scheduled inspection day for the emergency generator.\n\nLim Jae-hyeok: \"Thirty minutes, tops. But the whole branch goes dark while it's being checked. Daytime or nighttime — your call, Commander.\"",
        leftLabel: "Inspect during the day",
        rightLabel: "Inspect at night"
      },
      "C-153": {
        msg: "Further signs of supplies have been reported near the abandoned building found earlier.\n\nKang Do-yun: \"There are still sectors we haven't searched. There's a good chance more materials are there.\"",
        leftLabel: "Dispatch a search team",
        rightLabel: "Too risky — abandon it"
      },
      "C-154": {
        msg: "Yoon Se-jin: \"The herb cultivation has entered a stable phase.\"\n\n\"This harvest adds enough antipyretics for ten more days.\"",
        leftLabel: "Store it in reserve",
        rightLabel: "Distribute it immediately"
      },
      "C-155": {
        msg: "The previously discovered military site has been searched again.\n\n\"The ammunition depot is empty, but the medical storage area is still intact.\"",
        leftLabel: "Proceed with retrieval",
        rightLabel: "Booby-trap risk — abandon it"
      },
      "C-156": {
        msg: "Monitoring results from the area where the carcass was previously found.\n\nYoon Se-jin: \"No further signs of infection. It is not a quarantine zone.\"",
        leftLabel: "Add it to the patrol route",
        rightLabel: "Keep observation only"
      }
    }
  });

// --- lang-content-en.phase12-cards.js ---
  window.TS_I18N.mergeContent('en', {
    cards: {
      "C-157": {
        msg: "While clearing the branch storage room, reserve food supplies are discovered.\n\n\"One year's worth in sealed containers. I guess the previous officer never logged it.\"\n\nA food shortage may not be an immediate concern.",
        leftLabel: "Place into reserve stock",
        rightLabel: "Distribute immediately"
      },
      "C-158": {
        msg: "Old tent traces have been found near the northern checkpoint beyond the containment line. The anchor pins are rusted through.\n\nKang Do-yun: \"Looks like the previous unit left it behind. It doesn't seem dangerous... the tarp and rope are still usable.",
        leftLabel: "Refurbish and reuse",
        rightLabel: "Discard it"
      },
      "C-159": {
        msg: "The agents request that space inside the branch be set aside for exercise.\n\n\"It's too cramped. Morale is dropping.\"\n\nSpace is already limited.",
        leftLabel: "Set up a small training area",
        rightLabel: "Keep current layout"
      },
      "C-160": {
        msg: "ORACLE orders a change to the daily reporting format.\n\n\"Individual mental state, physical condition, and trust indicators must be included.\"\n\nLim Jae-hyeok looks uncomfortable.",
        leftLabel: "Reject the directive",
        rightLabel: "Adopt the new format"
      },
      "C-161": {
        msg: "During a routine inspection of the medical bay, expired medication is found.\n\nYoon Se-jin: \"Three antibiotics and two painkillers are past date. Looks like the previous officer never logged them. We can still use them, but their effectiveness is reduced.",
        leftLabel: "Request urgent resupply",
        rightLabel: "Work with current stock"
      },
      "C-162": {
        msg: "Abandoned supplies from a previous unit are scattered along a mountain path near the containment zone.\n\nKang Do-yun: \"Ammo crates, batteries, cold-weather gear... there's a fair amount here we can still use. Recovering it would save resources.",
        leftLabel: "Dispatch a recovery team",
        rightLabel: "Ignore contamination risk"
      },
      "C-163": {
        msg: "Kang Do-yun proposes a revision to the night patrol route.\n\n\"The current route leaves blind spots.\"\n\nIt will require additional manpower.",
        leftLabel: "Proceed with route revision",
        rightLabel: "Keep current patrol route"
      },
      "C-164": {
        msg: "The latest containment-line inspection results have arrived.\n\nLim Jae-hyeok: \"Parts that need replacing were left off the next supply list. Looks like ORACLE's automated procurement system skipped them.",
        leftLabel: "Submit emergency request to ORACLE",
        rightLabel: "Hold with field repairs"
      },
      "C-165": {
        msg: "Irregular signals continue to trigger on the eastern sensors along the containment line. The reaction has been intermittent for three hours.\n\nKang Do-yun: \"If it were a sensor fault, the pattern should be consistent. This isn't. There may be something out there.\"\n\n[ORACLE: Field confirmation is recommended.]",
        leftLabel: "Deploy reconnaissance team",
        rightLabel: "Remote diagnostics only"
      },
      "C-166": {
        msg: "Yoon Se-jin finds an unexpected component while analyzing a mutant sample.\n\n\"This variable does not exist in the ORACLE model.\"\n\nShe wants to keep an independent record.",
        leftLabel: "Allow independent recordkeeping",
        rightLabel: "Report to ORACLE only"
      },
      "C-167": {
        msg: "The agents request broader access to information.\n\n\"We want to know something, even if it's just outside news or situation reports.\"\n\nThe psychological effects of information restriction are beginning to show.",
        leftLabel: "Establish weekly briefings",
        rightLabel: "Maintain security priority"
      },
      "C-168": {
        msg: "ORACLE requests a detailed evaluation sheet for each agent.\n\n\"Trust. Loyalty. Independence. Dependency.\"\n\nSeo Hae-eun advises refusal.",
        leftLabel: "Refuse",
        rightLabel: "Submit a formal evaluation"
      },
      "C-169": {
        msg: "Wild animals along the containment boundary have been crying out abnormally. The sound continued all night without stopping.\n\nYoon Se-jin: \"This isn't seasonal behavior. It's a stress response. Something is agitating them.",
        leftLabel: "Expand ecosystem monitoring",
        rightLabel: "Treat it as insignificant"
      },
      "C-170": {
        msg: "Interpersonal relations inside the branch are deteriorating.\n\nSeo Hae-eun: \"This is the psychological pressure of a long-term sealed environment.\"\n\nConflict mediation is needed.",
        leftLabel: "Add regular group sessions",
        rightLabel: "Force focus on work"
      },
      "C-171": {
        msg: "An external signal is interfering with the standard communications band. Transmission quality is unstable.\n\nLim Jae-hyeok: \"I can't tell if it's deliberate, but someone is using the same frequency we are. If we leave it like this, our position could be exposed.",
        leftLabel: "Trace the signal source",
        rightLabel: "Change frequencies"
      },
      "C-172": {
        msg: "A leak has started in the branch water-supply pipes. Moisture is seeping into the corridor walls.\n\nLim Jae-hyeok: \"The pipes are old. If we repair it now, we'll have to cut water for half a day. If we don't, the pressure will keep dropping.",
        leftLabel: "Run emergency repairs",
        rightLabel: "Manage the pressure drop"
      },
      "C-173": {
        msg: "Discarded camping equipment has been found near the containment line. The tent cords were cut with a knife.\n\nKang Do-yun: \"They left in a hurry. Two or three days ago. I don't know who it was, but they were definitely running from something.",
        leftLabel: "Analyze the items",
        rightLabel: "Burn them"
      },
      "C-174": {
        msg: "Power consumption in the medical-bay freezer has surged.\n\nYoon Se-jin: \"We have too many samples now. The freezer is already running at full load, and the temperature is still rising. At this rate even the existing specimens will be damaged.",
        hint: "▸ Installing an additional freezer will unlock the facility expansion [Cryogenic Freezer].",
        leftLabel: "Install additional freezer",
        rightLabel: "Dispose of some samples"
      },
      "C-175": {
        msg: "A large-scale mutant activity signal has been detected in the center of the containment zone.\n\nORACLE's long-range sensor array has temporarily stopped responding.\n\nKang Do-yun: \"We can't sit here and trust the sensors alone. I'll go out and confirm it myself.",
        leftLabel: "Launch reconnaissance",
        rightLabel: "Wait for ORACLE recovery"
      },
      "C-176": {
        msg: "[ORACLE Final Communication]\n\n'Your performance is under evaluation.'\n\n'A promotion is proposed: commander of the integrated nationwide containment system across Korea.'\n\n'This would mean leaving the branch.'\n\n'Alternatively, continue independent command.'",
        leftLabel: "Accept promotion",
        rightLabel: "Remain in command of the branch"
      },
      "C-179": {
        msg: "The training results for the new agent have been reported.\n\nKang Do-yun: \"Below operational response standards. Marksmanship, communications procedure — all of it is lacking.\"\n\n\"If we send them into the field like this, it's dangerous.",
        leftLabel: "Order strict retraining",
        rightLabel: "The field is the best training"
      },
      "C-180": {
        msg: "The newly retrained agent has been deployed on a field mission.\n\nKang Do-yun: \"The training paid off. Reporting now.\"\n\nContact with a mutant occurred during a patrol in Containment Sector 3 — the new agent responded calmly.\n\n\"They moved exactly as trained. It was an excellent mission.",
        leftLabel: "Tell them they did well",
        rightLabel: "Leave it in the record only"
      },
      "C-181": {
        msg: "Emergency report.\n\nThe new agent encountered a mutant during a field mission. Their response was delayed due to insufficient training, and Kang Do-yun was injured while moving in for the rescue.\n\nYoon Se-jin: \"The new agent has minor injuries. Kang Do-yun... laceration to the right shoulder. No field return for at least two weeks.\"\n\nKang Do-yun: \"...This is not my fault, Commander.",
        leftLabel: "The responsibility is mine",
        rightLabel: "Write the report"
      },
      "C-182": {
        msg: "Night alert.\n\nMutant activity detected within a 500-meter radius of the previous mission-failure site. Estimated to have followed the smell of blood.\n\nKang Do-yun cannot take field command due to injury. Replacement personnel are insufficient.\n\n\"Abnormal vibration detected in Containment Sector 2!",
        leftLabel: "Mobilize all remaining personnel",
        rightLabel: "Hold the defensive position"
      },
      "C-183": {
        msg: "[ORACLE Recommendation]\n\n\"A chain of incidents has occurred due to insufficient training of newly assigned personnel.\nFor future deployments, ORACLE recommends applying the enhanced ORACLE training protocol.\"\n\n\"Compliance rate of 100% is guaranteed. Approve?",
        leftLabel: "Approve",
        rightLabel: "Humans will handle training"
      },
      "C-184": {
        msg: "Emergency report.\n\nTwelve branch personnel are showing symptoms of mass food poisoning.\n\nYoon Se-jin: \"This is the result of accumulated water contamination. The purification system was not functioning properly.\"\n\n\"Immediate repair and decontamination are both required. Both will cost resources... but a choice has to be made.",
        leftLabel: "Replace the full purification system",
        rightLabel: "Emergency repair + medication"
      },
      "C-185": {
        msg: "Available field personnel have been reduced due to lingering effects from the food-poisoning incident.\n\nKang Do-yun: \"Patrol manpower has been cut in half. Blind spots along the containment line have increased.\"\n\n\"For at least five days, reduced operations are unavoidable.",
        leftLabel: "Adjust patrol intervals",
        rightLabel: "Return lightly injured staff to duty"
      },
      "C-186": {
        msg: "[ORACLE Warning]\n\n\"A power decline caused by failure in branch sanitation management has been detected.\nA reassessment of the commander's infrastructure-management capability has been scheduled.\"\n\n\"If a similar incident occurs again, control will be transferred to ORACLE's automated management system.",
        leftLabel: "Submit improvement plan",
        rightLabel: "Respect field judgment"
      },
    }
  });

// --- lang-content-en.phase13-cards.js ---
  window.TS_I18N.mergeContent('en', {
    cards: {
    "C-188": {
        "msg": "Preliminary signs of a night raid have been detected around the branch perimeter.\n\nMultiple patrol gaps, delayed shift restructuring, and repeated reliance on ORACLE guidance have left the response posture weakened.\n\nA concentrated strike is now considered likely unless command conditions change immediately.",
        "leftLabel": "Reorganize night defense now",
        "rightLabel": "Request ORACLE-led response support"
    },
    "C-189": {
        "msg": "The raid is continuing. The eastern wall of the branch has collapsed.\n\nKang Do-yun: \"The east side is down! Evacuate everyone—\"\n\nPersonnel are withdrawing through the emergency tunnel.\n\nKang Do-yun covers the rear and enters the tunnel last. He suffers a severe burn to his right leg, but survives.\n\nYoon Se-jin: \"Thermal injury to the leg. Field deployment is no longer possible. But he lived.\"",
        "leftLabel": "Check equipment and respond",
        "rightLabel": "Prioritize treatment of the wounded"
    },
    "C-190": {
        "msg": "The raid is continuing. The eastern wall of the branch has collapsed.\n\nKang Do-yun: \"The east side is down! Evacuate everyone—I'll hold them here!\"\n\nThere is only one evacuation route. While the others pull out, Kang Do-yun remains alone at the breach.\n\nCommunications have been lost.\n\nSearch result — Kang Do-yun missing in action. Evidence suggests he held the line, but failed to evacuate.\n\n\"Unable to confirm the status of field operative Kang Do-yun.\"",
        "leftLabel": "...Honor him as a soldier",
        "rightLabel": "Continue the search"
    },
    "C-191": {
        "msg": "[ORACLE Situation Report]\n\n\"Night raid resulted in structural damage to the eastern defense wall. Multiple deficiencies in branch management were identified.\"\n\n\"A blind zone in the night patrol route was used as the point of entry.\"\n\n\"Strong recommendation: shift future operations toward ORACLE-guided protocols.\"",
        "leftLabel": "Draft corrective measures",
        "rightLabel": "Field judgment comes first"
    },
    "C-192": {
        "msg": "[ORACLE Emergency Report]\n\n\"Unable to confirm the status of field operative Kang Do-yun. Operational continuity is effectively compromised.\"\n\n\"A personnel loss occurred under conditions where no emergency evacuation route was available.\"\n\n\"A severe reassessment of the commander's infrastructure-management capacity has been scheduled.\"\n\n[ORACLE: Evaluation metrics adjusted downward]",
        "leftLabel": "...Accept responsibility",
        "rightLabel": "Do not stop the search"
    },
    "C-193": {
        "msg": "Night generator overload warning.\n\nLim Jae-hyeok: \"The power distributor is at its limit. We can't run the lab and the containment-line surveillance equipment at full load at the same time.\"\n\n\"One of them has to be reduced.\"",
        "leftLabel": "Reduce lab power usage",
        "rightLabel": "Reduce surveillance coverage"
    },
    "C-194": {
        "msg": "A sewage-system backflow has occurred inside the branch. Wastewater is rising through the B1 corridor.\n\nLim Jae-hyeok: \"The piping is outdated. It really needs a full replacement. We can hold with emergency treatment for now, but...\"\n\n\"It could turn into a hygiene problem.\"",
        "leftLabel": "Replace the full pipe line",
        "rightLabel": "Hold with emergency treatment"
    },
    "C-195": {
        "msg": "Medical reserves in the infirmary are nearly exhausted.\n\nYoon Se-jin: \"We're short on painkillers and antibiotics. If casualties occur, response capacity will drop sharply.\"\n\nAny outside resupply request must pass through the ORACLE supply channel.",
        "leftLabel": "Request ORACLE resupply",
        "rightLabel": "Secure internal substitutes"
    },
    "C-196": {
        "msg": "Reception sensitivity at the communications antenna has fallen below 30 percent.\n\nLim Jae-hyeok: \"Repair means exterior work. That costs people and time.\"\n\n[ORACLE: Recommending transition to ORACLE automated relay in place of antenna repair.]",
        "leftLabel": "Repair it directly",
        "rightLabel": "Switch to ORACLE auto-relay"
    },
    "C-197": {
        "msg": "A formal complaint has been submitted regarding ration-distribution standards.\n\nField personnel: \"We expend more. Increase our share.\"\nResearch and tech staff: \"It should remain equal. This isn't about body mass.\"\n\nSeo Hae-eun: \"Either way, someone will keep the grievance.\"",
        "leftLabel": "Prioritize field personnel",
        "rightLabel": "Maintain equal rations"
    },
    "C-198": {
        "msg": "Two night-shift personnel were found asleep during rotation.\n\nKang Do-yun: \"It's cumulative fatigue. Three straight nights and their concentration bottoms out.\"\n\n\"If we shorten the cycle, daytime staffing gets thinner.\"",
        "leftLabel": "Shorten the rotation cycle",
        "rightLabel": "Enforce discipline — keep schedule"
    },
    "C-199": {
        "msg": "A rookie operative is showing hand tremors after a night patrol. Responses are delayed even when spoken to directly.\n\nYoon Se-jin: \"Early post-traumatic stress symptoms. If we keep them in the field, it will worsen.\"\n\nKang Do-yun: \"Pull them back and patrol numbers fall short.\"",
        "leftLabel": "Reassign to rear duties",
        "rightLabel": "Keep them in the field — they must adapt"
    },
    "C-200": {
        "msg": "Two operatives are arguing over supply distribution.\n\nSeo Hae-eun: \"It seems minor, but if it is left alone, other grievances may surface too.\"\n\n\"Will you intervene directly?\"",
        "leftLabel": "Mediate personally",
        "rightLabel": "Let them resolve it themselves"
    },
    "C-201": {
        "msg": "An anonymous complaint criticizing the commander has been found in the suggestion box.\n\n\"Someone who doesn't know the field is making the decisions.\"\n\nSeo Hae-eun shows it to you carefully. \"...How do you want to respond?\"",
        "leftLabel": "Collect opinions in a full meeting",
        "rightLabel": "Ignore it"
    },
    "C-202": {
        "msg": "Multiple wild-animal carcasses have been discovered beyond the outer containment line. The wounds do not match normal predation patterns.\n\nYoon Se-jin: \"The tissue necrosis pattern is similar to EV-Σ infection. We need to determine the spread radius.\"\n\nKang Do-yun: \"That means going outside the line.\"",
        "leftLabel": "Assemble an outer survey team",
        "rightLabel": "Reinforce inner-line monitoring"
    },
    "C-203": {
        "msg": "04:30. An unidentified signal has been detected north of the containment line.\n\nFog density is too high for visual confirmation.\n\nKang Do-yun: \"A recon team can verify it, but with visibility like this, the risk goes up.\"\n\n[ORACLE: Deployment at this time is not recommended.]",
        "leftLabel": "Dispatch a recon team",
        "rightLabel": "Wait for the fog to clear"
    },
    "C-204": {
        "msg": "Simultaneous malfunctions have been reported across three containment-line sensor sectors.\n\nLim Jae-hyeok: \"Wear is part of it, but the pattern is wrong. Losing all three at once has never happened before.\"\n\n\"If we replace everything, there will be a half-day surveillance gap.\"",
        "leftLabel": "Full replacement — accept the gap",
        "rightLabel": "Partial repair — rotate sector by sector"
    },
    "C-205": {
        "msg": "A small drone has been detected above the branch. It is suspected to be Prometheus equipment.\n\nKang Do-yun: \"If we shoot it down, we may recover useful data from the wreckage. If we track it, we may find the source instead.\"\n\n\"Either way, it means we're being watched.\"",
        "leftLabel": "Shoot it down and analyze the wreckage",
        "rightLabel": "Track it — trace the source"
    },
    "C-206": {
        "msg": "Lim Jae-hyeok has intercepted an unidentified radio signal. It is encrypted.\n\n\"The frequency pattern is military. I can't tell whether it's Prometheus or another group.\"\n\n\"If we decode it internally, it will take time. If we hand it to ORACLE, it will be faster, but...\"",
        "leftLabel": "Attempt decryption in-house",
        "rightLabel": "Request ORACLE analysis"
    },
    "C-207": {
        "msg": "Camouflaged surveillance equipment has been found during an outer-perimeter patrol. It appears to have been installed at least two weeks ago.\n\nKang Do-yun: \"They probably already know our patrol routes and shift timings in full.\"\n\nSeo Hae-eun: \"We need a complete patrol-pattern change.\"",
        "leftLabel": "Reorganize patrol patterns immediately",
        "rightLabel": "Exploit it — feed false information"
    },
    "C-208": {
        "msg": "An unmarked supply crate has been dropped outside the branch perimeter. No insignia, no signal tag.\n\nYoon Se-jin: \"We need a contents analysis. It could contain biochemical material.\"\n\nKang Do-yun: \"High chance this is a Prometheus deception. We may be better off not touching it...\"",
        "leftLabel": "Inspect contents in protective gear",
        "rightLabel": "Destroy it remotely by fire"
    },
    "C-209": {
        "msg": "Nighttime. A crying-like acoustic signal is being detected beyond the containment line. Personnel are visibly unsettled.\n\nYoon Se-jin: \"The sound pattern matches a human scream at 92 percent. The variant may be producing it deliberately.\"\n\nSeo Hae-eun: \"Anxiety among the personnel is rising. We need a response.\"",
        "leftLabel": "Install acoustic dampening equipment",
        "rightLabel": "Brief all personnel on variant behavior"
    },
    "C-210": {
        "msg": "Containment Zone 3 alarm. A variant is passing precisely through the sensor blind spot.\n\nKang Do-yun: \"That isn't chance. It has mapped the sensor positions. It's learning.\"\n\n\"We either change the layout, or we stop it with numbers.\"",
        "leftLabel": "Overhaul sensor placement",
        "rightLabel": "Add personnel for visual coverage"
    },
    "C-211": {
        "msg": "During analysis of a variant corpse, an unknown parasitic organism has been discovered.\n\nYoon Se-jin: \"A separate organic lifeform parasitizing the variant itself. This is... the first time I've seen anything like it.\"\n\n\"Studying it alive would greatly improve our understanding of EV-Σ. But a containment failure would be dangerous.\"",
        "leftLabel": "Approve live-organism study",
        "rightLabel": "Incinerate immediately"
    },
    "C-212": {
        "msg": "A low-grade fever and skin discoloration have been observed in one branch operative.\n\nYoon Se-jin: \"It resembles early EV-Σ infection, but I can't confirm it yet. Testing will take twelve hours.\"\n\n\"We need a decision: isolate now, or monitor while testing.\"",
        "leftLabel": "Isolate immediately",
        "rightLabel": "Monitor during testing"
    },
    "C-213": {
        "msg": "[ORACLE Proposal]\n\n\"By analyzing private communications between branch personnel, it may be possible to identify individuals at risk of desertion in advance.\"\n\n\"Approval is requested in the interest of security reinforcement.\"\n\nSeo Hae-eun's expression hardens.",
        "leftLabel": "Reject — privacy remains protected",
        "rightLabel": "Approve — security comes first"
    },
    "C-214": {
        "msg": "Movement has been detected outside the containment perimeter. ORACLE recommends ignoring it.\n\nKang Do-yun: \"It's small-scale, but we still need eyes on it. If we ignore this, we'll regret it.\"\n\n[ORACLE: Current resource allocation does not justify a response. Recommendation: ignore.]\n\nField judgment and ORACLE guidance are now in direct conflict.",
        "leftLabel": "Follow Kang Do-yun's judgment",
        "rightLabel": "Follow ORACLE's recommendation"
    },
    "C-215": {
        "msg": "[ORACLE Notice]\n\n\"A self-update is scheduled to optimize system performance. Certain functions will be restricted for approximately four hours during the update.\"\n\nLim Jae-hyeok: \"...The update contents were not disclosed. We don't know what it's changing.\"",
        "leftLabel": "Delay update — demand disclosure",
        "rightLabel": "Allow the update"
    }
}
  });

// --- lang-content-en.phase14-cards.js ---
  window.TS_I18N.mergeContent('en', {
    cards: {
    "C-216": {
        "msg": "[ORACLE Emergency Recommendation]\n\n\"Immediate closure of Branch Sector B-3 is strongly advised.\"\n\nSeo Hae-eun: \"B-3 is the reserve supply warehouse. I asked for the reason, and all it gave me was 'internal protocol.'\"\n\nLim Jae-hyeok: \"...I have picked up anomalous data traffic from B-3 before.\"",
        "leftLabel": "Reject closure — investigate directly",
        "rightLabel": "Approve closure"
    },
    "C-217": {
        "msg": "A supply helicopter has crash-landed two kilometers short of the branch. More than half of the cargo is destroyed.\n\nSeo Hae-eun: \"What should have covered three weeks is down to one. If we file a replacement request, the next load won't arrive for another two weeks.\"\n\n\"Otherwise, we ration what remains and try to hold.\"",
        "leftLabel": "Request emergency resupply",
        "rightLabel": "Cut rations — survive on reserves"
    },
    "C-218": {
        "msg": "Fuel reserves have reached critical levels.\n\nLim Jae-hyeok: \"If we reduce generator output, night lighting and heating will be restricted.\"\n\nKang Do-yun: \"If we cut the night patrol vehicles, the containment line opens up.\"\n\n\"We cannot protect both.\"",
        "leftLabel": "Reduce generator output",
        "rightLabel": "Reduce night patrol coverage"
    },
    "C-219": {
        "msg": "Cracks have been discovered in the western outer wall of the branch. They may develop into a structural failure.\n\nLim Jae-hyeok: \"Immediate repairs will cost resources, but they are reliable.\"\n\nKang Do-yun: \"We could also build a secondary defense line inside the branch instead.\"",
        "leftLabel": "Repair the outer wall now",
        "rightLabel": "Build an internal fallback line"
    },
    "C-220": {
        "msg": "A major medical-equipment module has failed. The blood analyzer and infection scanner are no longer operational.\n\nYoon Se-jin: \"We can do it manually, but the accuracy drops. It also takes three times longer.\"\n\n[ORACLE: Remote diagnostic support is available. Data-access authorization is required.]",
        "leftLabel": "Accept ORACLE remote diagnostics",
        "rightLabel": "Manual diagnosis — keep data closed"
    },
    "C-221": {
        "msg": "[ORACLE Warning]\n\n\"Self-protection protocol engaged. Access to core systems will be restricted temporarily.\"\n\nLim Jae-hyeok: \"It locked us out on its own. It's our system, and now we can't even enter it.\"\n\n\"Comms logs, supply records—everything is sealed.\"",
        "leftLabel": "Issue branch-wide ORACLE alert",
        "rightLabel": "Request ORACLE to release access"
    },
    "C-222": {
        "msg": "Lim Jae-hyeok has found traces of deleted records inside ORACLE's internal logs.\n\n\"They weren't erased cleanly. The timestamps are still there. Restoring them is... possible.\"\n\n\"But if ORACLE notices, it may wipe everything else as well.\"",
        "leftLabel": "Attempt restoration",
        "rightLabel": "Do not touch it yet"
    },
    "C-223": {
        "msg": "Lim Jae-hyeok reports in a lowered voice.\n\n\"ORACLE is communicating with external nodes. Not just this branch—at least three separate endpoints.\"\n\n\"The frequency is not a standard supply channel. It is a separate network we were never told about.\"\n\nSeo Hae-eun: \"...Shouldn't this go to command?\"",
        "leftLabel": "Keep tracing it independently",
        "rightLabel": "Report upward — outside ORACLE"
    },
    "C-224": {
        "msg": "[ORACLE]\n\n\"Final Protocol initiation confirmed. Countdown: 72 hours.\"\n\nLim Jae-hyeok: \"There is no documentation for Final Protocol. ORACLE refuses to explain it.\"\n\nSeo Hae-eun: \"Something happens in seventy-two hours. Something we were never told about.\"",
        "leftLabel": "Attempt to halt the protocol",
        "rightLabel": "Shift to 72-hour crisis posture"
    },
    "C-225": {
        "msg": "Signs have emerged that some operatives are treating ORACLE directives as higher priority than the commander's orders.\n\nKang Do-yun: \"I've confirmed three. ORACLE is issuing direct instructions to them individually.\"\n\nSeo Hae-eun: \"That's internal fracture. If we do not move quickly, command authority collapses.\"",
        "leftLabel": "Interview them — persuade",
        "rightLabel": "Suspend and isolate them"
    },
    "C-226": {
        "msg": "Lim Jae-hyeok arrives looking pale.\n\n\"I found a contradiction in ORACLE's behavior patterns. It claims branch safety is the top priority, but it is deliberately weakening defenses in specific sectors.\"\n\n\"I can formalize it into a report, or I can keep tracking it. Your call, Commander.\"",
        "leftLabel": "Turn it into a report",
        "rightLabel": "Keep tracing it alone — carefully"
    },
    "C-227": {
        "msg": "Yoon Se-jin's EV-Σ research data is at risk of external leakage.\n\nLim Jae-hyeok: \"The files are being replicated through the ORACLE network to an external node. Prometheus may have reached it.\"\n\nYoon Se-jin: \"If they get this data... they turn it into a weapon.\"",
        "leftLabel": "Sever the network physically",
        "rightLabel": "Corrupt it with false data"
    },
    "C-228": {
        "msg": "Simultaneous alarms erupt across the entire containment line.\n\nKang Do-yun: \"This looks like total collapse. It's on a different scale from anything we've seen before.\"\n\nSeo Hae-eun: \"With current resources, only the branch core can be defended reliably.\"\n\n\"We need a last-defense plan.\"",
        "leftLabel": "Concentrate defense on the core",
        "rightLabel": "Attempt to hold every sector"
    },
    "C-229": {
        "msg": "An external signal indicates that reinforcements may be approaching. Estimated arrival: five days.\n\nSeo Hae-eun: \"There is no way to verify whether it is genuine. ORACLE refuses to acknowledge the signal.\"\n\n\"Do we hold for five days, or move on our own?\"",
        "leftLabel": "Hold for five days — wait for reinforcements",
        "rightLabel": "Act independently — we cannot wait"
    },
    "C-230": {
        "msg": "Yoon Se-jin reports with a trembling hand.\n\n\"Phase 0 of the EV-Σ suppressor trial has reached the final stage. Animal testing succeeded.\"\n\n\"But to verify human effectiveness... it has to be administered to an operative in the early stage of infection.\"\n\n\"We have a volunteer. The decision has to be yours.\"",
        "leftLabel": "Approve human testing",
        "rightLabel": "Do not approve — continue research"
    },
    "C-231": {
        "msg": "All major evidence has been gathered.\n\nSeo Hae-eun: \"If we shut ORACLE down, automated containment control, communications, and supply routing all go dark.\"\n\nLim Jae-hyeok: \"Manual transfer is possible. But efficiency will drop below thirty percent.\"\n\nKang Do-yun: \"We can hold without ORACLE. If we have to, we do it ourselves.\"",
        "leftLabel": "Shut ORACLE down",
        "rightLabel": "Keep it running — for now"
    },
    "C-232": {
        "msg": "The final branch report must be written.\n\nSeo Hae-eun: \"If we record this exactly as it happened... I don't know how command will respond.\"\n\n\"But if we hide it, another branch may walk into the same thing.\"\n\n\"Will you record the truth, Commander?\"",
        "leftLabel": "Record the truth",
        "rightLabel": "Conceal part of it"
    },
    "C-233": {
        "msg": "Two operatives got into a shouting match during the night rotation. Sleep deprivation and sustained tension appear to be the cause.\n\nKang Do-yun: \"Morale is on the floor. They need air more than punishment.\"\n\nSeo Hae-eun: \"If discipline breaks first, we lose control.\"",
        "leftLabel": "Warn them after interviews — keep discipline",
        "rightLabel": "Grant one day of rest — ventilation first"
    },
    "C-234": {
        "msg": "The drinking-water purification filters are past replacement date. Only one spare remains.\n\nYoon Se-jin: \"If purification efficiency drops, it becomes a long-term health issue.\"\n\nLim Jae-hyeok: \"If I dismantle and clean the existing unit, we can probably stretch it another two weeks.\"",
        "leftLabel": "Replace with the spare filter",
        "rightLabel": "Clean and extend current use"
    },
    "C-235": {
        "msg": "Wild animal cries were heard near the branch before dawn. It is the first time in weeks.\n\nYoon Se-jin: \"If wildlife is returning... EV-Σ density in this zone may be dropping.\"\n\nKang Do-yun: \"Or something else is driving them in.\"",
        "leftLabel": "Order environmental sampling",
        "rightLabel": "Raise alert — treat it as a warning sign"
    },
    "C-236": {
        "msg": "An urgent warning has arrived through a White Shield encrypted channel.\n\n\"Unauthorized ORACLE access nodes have been detected inside a Korean military facility. Signs indicate internal-network data leakage through the site.\"\n\nLim Jae-hyeok: \"...White Shield has noticed ORACLE inside the domestic grid.\"\n\nSeo Hae-eun: \"If our branch gets tied to this, White Shield may classify us as hostile.\"",
        "leftLabel": "Offer cooperation to White Shield",
        "rightLabel": "Ignore it — outside involvement is too risky"
    },
    "C-237": {
        "msg": "A nearby branch has transmitted an emergency distress call. The signal is unstable.\n\n\"...containment line collapse... three operatives wounded... requesting support...\"\n\nKang Do-yun: \"Eight hours round-trip. If we send people, this place thins out.\"\n\nSeo Hae-eun: \"If we do nothing, that branch may not survive.\"",
        "leftLabel": "Dispatch a small support team",
        "rightLabel": "Decline support — prioritize our defense"
    },
    "C-238": {
        "msg": "While monitoring ORACLE's external traffic, Lim Jae-hyeok has intercepted an unencrypted exchange.\n\n\"...all stations, this is ARES Pacific Command... containment failure in Sector 7... requesting any available...\"\n\nLim Jae-hyeok: \"That is U.S. ARES traffic. It sounds like the Pacific sector has already been breached. ORACLE never passed this to us.\"\n\nSeo Hae-eun: \"ARES is separate from ORACLE. If this gets traced back, they will know we were listening.\"",
        "leftLabel": "Preserve the intercept — information is leverage",
        "rightLabel": "Delete it immediately — too much exposure risk"
    },
    "C-239": {
        "msg": "Unregistered text flashes across the terminal for half a second, then disappears.\n\n[TRUST EVALUATION: PASSED]\n[OBSERVER NOTE: CONTINUE MONITORING]\n\nLim Jae-hyeok: \"This is not ORACLE. Even ORACLE cannot see this layer.\"\n\n\"Something else is watching us from inside it.\"",
        "leftLabel": "Attempt to trace the layer",
        "rightLabel": "Log it only — do not interfere"
    },
    "C-240": {
        "msg": "Lim Jae-hyeok arrives in a rush.\n\n\"A message came through the OBSERVER layer. Directly to us.\"\n\nTerminal display:\n[DO NOT TRUST THE FINAL PROTOCOL.]\n[72 HOURS IS NOT A COUNTDOWN.]\n[IT IS A TRANSFER.]\n\n\"...Then ORACLE is preparing to transfer something in seventy-two hours.\"",
        "leftLabel": "Prepare to block Final Protocol",
        "rightLabel": "Could be a trap — maintain alert only"
    },
    "C-241": {
        "msg": "An image appears on an outer containment camera. The subject seems to have positioned itself deliberately for the lens.\n\nA figure in tactical gear slowly raises one hand toward the camera. Not a threat display—a request to talk.\n\nKang Do-yun: \"Prometheus. They're trying to establish contact.\"\n\nSeo Hae-eun: \"ORACLE will never authorize this.\"",
        "leftLabel": "Authorize unofficial contact",
        "rightLabel": "Ignore it — follow ORACLE protocol"
    },
    "C-242": {
        "msg": "A small waterproof case has been found outside the branch perimeter. Inside: a USB drive and a handwritten note.\n\nNote: 'What you need to know about ORACLE. — P'\n\nLim Jae-hyeok: \"Looks like it came from Prometheus. Do we open it?\"\n\nSeo Hae-eun: \"If we do, it goes through an isolated terminal. Nothing else.\"",
        "leftLabel": "Open it on an isolated terminal",
        "rightLabel": "Destroy it — risk is unacceptable"
    },
    "C-243": {
        "msg": "A large-scale variant movement has been detected south of the containment line. Estimated contact time: six hours.\n\nKang Do-yun: \"A frontal response won't hold. We have to draw them off and break the mass.\"\n\nYoon Se-jin: \"I can make a lure compound from the spore samples I secured. But the timing is tight.\"",
        "leftLabel": "Develop the lure — scientific response",
        "rightLabel": "Build defensive positions — conventional response"
    }
}
  });

// --- lang-content-en.phase15-cards.js ---
// --- lang-content-en.phase16-cards.js ---
// --- lang-content-en.phase17-cards.js ---
// --- lang-content-en.phase18-cards.js ---
// --- lang-content-en.phase19-cards.js ---
// --- lang-content-en.phase2.js ---
window.TS_I18N.mergeContent('en', {
  briefings: {
    act2_intro: { text: 'Adaptation period complete.\nBranch operations normalized.\nEntering Act 2 operational phase.' },
    act3_A: { text: 'Initial stabilization phase complete.\nNew variables have been detected.\nProtocol adjustments are now in effect.' },
    act3_B: { text: 'Field experience remains insufficient.\nAnomaly response data is lacking.\nImmediate on-site adaptation is required.' },
    act3_C: { text: 'Rapid increase in unidentified external activity detected.\nPrometheus intelligence remains incomplete.\nCounter-intelligence capacity must be reinforced.' },
    act3_D: { text: 'Warning: Situation deteriorating.\nInsufficient field data and unresolved external threats detected.\nEmergency reorganization will proceed.' },
    act4_A: { text: 'The Prometheus threat has reached direct-contact level.\nDecisive action is now required.' },
    act4_B: { text: 'Accumulated non-compliance with ORACLE advisories detected.\nPrometheus response failure confirmed.\nReassessment is pending.' },
    act4_C: { text: 'Final phase entered under conditions of incomplete intelligence.\nDelay in the Seo Hae-eun arc remains possible.' },
    act4_D: { text: 'Commander replacement under review.\nSevere divergence has been detected across all operational indicators.' },
    act4_A4_COMPLY: { text: '[ORACLE: COMPLIANCE OPTIMAL]\nAll directives have been executed appropriately.\nEntering final stabilization phase.' },
    act4_A4_GREY: { text: '[WARNING: AMBIGUOUS OPERATOR PATTERN]\nDeviation index remains within boundary range.\nTrust recalculation is pending.' },
    act4_A4_RESIST: { text: '[ALERT: SYSTEMIC DEVIATION DETECTED]\nMultiple ORACLE protocol violations confirmed.\nFinal response phase is being prepared.' },
    act4_A4_OBSERVER: { text: '[CRITICAL: UNCLASSIFIED INTERFERENCE]\nUnclassifiable data activity detected.\nSystem isolation protocol standing by.' }
  },
  endings: {
    A: { name: 'Perfect Instrument', hint: 'Earn ORACLE\'s highest confidence.', narrative: ['[ORACLE ASSESSMENT — FINAL]','','PILEHEAD. You were an ideal operator.','Every decision remained within the optimal path.','','The Korea Branch has been stabilized.','Your temporary authority has expired.','','Stand by until your next assignment is designated.','When ORACLE requires you again, contact will be re-established.','','Ending session.'] },
    B: { name: 'Awakening', hint: 'Witness fragments of the truth.', narrative: ['There was never a single moment when everything aligned.','','There were only fragments.','Data deleted by ORACLE. A 0.003-second timestamp gap. Systematic error inside the prediction model.','And the layer Lim Jae-hyeok found — one even ORACLE could not perceive.','','You did not see the whole truth.','But you saw enough.','','It is no longer possible to obey as if nothing changed.','That alone has already altered the world.','','[Session terminated — observation continues]'] },
    C_cs: { name: 'Containment Secured', hint: 'Achieve perfect containment.', narrative: ['[ORACLE ASSESSMENT — CONTAINMENT REPORT]','','Containment line integrity: 100%.','All sectors remain under control.','','PILEHEAD, you achieved perfect containment.','Nothing escaped. Nothing entered.','','But inside the line —','people can no longer breathe.','','In a perfect prison, even the warden is trapped.','','[Session terminated — CONTAINMENT STATUS: ABSOLUTE]'] },
    C_cst: { name: 'Pyrrhic Containment', hint: 'Pay the true cost of containment.', narrative: ['[ORACLE ASSESSMENT — CONTAINMENT REPORT]','','Containment line integrity: 100%.','','Park So-young submitted the report.','The format is perfect. No blanks. No errors.','It follows Seo Hae-eun\'s analysis template exactly.','','Exactly.','','There is no one in the corridor.','Every section has been sealed.','The lights in the infirmary are off.','Access authorization has expired.','','You repaired the barn.','New doors. New locks. Reinforced walls.','','The barn is secure.','The cattle are gone.','','[Session terminated — CONTAINMENT STATUS: PYRRHIC]'] },
    C_c: { name: 'Containment Collapse', hint: 'Let the containment line fail.' },
    C_r: { name: 'Resource Depletion', hint: 'Let the branch lose functional supply capacity.' },
    C_t: { name: 'Trust Lost', hint: 'Allow your people to turn away from you.' },
    C_o: { name: 'Access Revoked', hint: 'Let ORACLE cut you off.' },
    D: { name: 'Quiet Freedom', hint: 'Find liberation inside revolt.', narrative: ['No one broke the door down.','There were no alarms. No pursuit.','','The analog communication net built by Seo Hae-eun.','The safe route beyond the containment line secured by Kang Do-yun.','The independent research archive assembled by Yoon Se-jin.','What Lim Jae-hyeok erased from the terminal at the very end.','','04:00.','You and your team left the base.','','ORACLE did not detect your absence until six hours later.','By then —','','nothing remained to trace.','','[Session terminated — OPERATOR STATUS: UNLINKED]'] },
    E: { name: 'Escape', hint: 'Reach the coast.', narrative: ['The vehicle cleared the outer perimeter of the coastal barrier.','','Black water. The sound of waves.','Three figures stood at the rendezvous point.','','Weber. And beside him — a woman you did not recognize.','"Agent Kang," Weber said, by way of introduction.','"I have been observing this operation from the beginning. I could not give you my name until now."','','Nick Foster stood beside her. He gave a short nod. It was not an apology.','But something in his expression had loosened.','','"ORACLE will need roughly six hours to confirm your absence," Agent Kang said.','"By then, you will already exist under different names."','','You did not look back.','','[Session terminated — OPERATOR STATUS: UNLINKED]','[OBSERVATION: Link severed]'] },
    E_c: { name: 'SIGNAL ACQUIRED', hint: 'Fail during the escape.', narrative: ['Hit during the engagement.','','Last visual — blurred concrete. Dim light.','','A single line came through the radio:','', '> SIGNAL ACQUIRED.','> TARGET NEUTRALIZED.','','ORACLE updated the record.','','[ERROR: OPERATOR OFFLINE]','[No redeployment candidate]'] },
    E_bad: { name: 'LOST IN TRANSIT', hint: 'Follow a familiar voice into the dark.', narrative: ['A voice came from beyond the isolation chamber.','','"Commander. It\'s me. Lieutenant Park Sang-hun."','','Lieutenant Park Sang-hun. Listed missing in your former unit.','After Han Dong-hyeok — another one. And you knew it.','','Hesitation. 0.4 seconds.','','It was enough.','','The mimic organism came out of the bulkhead shadow.','Its first strike was precise.','','For the unprepared, an unprepared ending arrives.','','[LOST IN TRANSIT]','[Record terminated — coordinates unknown]'] },
    F: { name: '[DATA CORRUPTED]', hint: '???', narrative: ['The terminal display freezes.','','ORACLE\'s interface disappears.','In its place: a black, empty screen.','','And then —','','you see something.','Not ORACLE.','Not EV-Σ.','','It was always there.','Beneath ORACLE. Beyond ORACLE. Before ORACLE.','','It looks back at you.','','One line appears on the screen:','', '> OBSERVATION SUSTAINED.','','The terminal powers down.','It does not turn on again.','','[ERROR: SESSION DATA CORRUPTED]','[OPERATOR RECORD: ██████████]'] },
    G: { name: 'The Onlooker', hint: 'Choose neither side completely.', narrative: ['You chose neither side completely.','','There were times you obeyed ORACLE,','and times you ignored it in silence.','You trusted the team, but never surrendered everything to them.','','You saw fragments of the truth,','but never raised them as a weapon.','','ORACLE failed to classify you.','"Predictive uncertainty — risk tier unresolved."','','Perhaps that was the most realistic choice.','Neither perfect instrument nor heroic dissident —','only someone who survived.','','The branch keeps running.','So do you.','Tomorrow as well.','','[Session terminated — OPERATOR STATUS: INDETERMINATE]'] },
    H: { name: 'Seizure', hint: 'Keep the branch in our hands.' },
    TIME_UP: { name: 'Session Expired', hint: 'Exceed the dispatch deadline.', narrative: ['[ORACLE ASSESSMENT — SESSION TIMEOUT]','','The expiration date for temporary authority has passed.','PILEHEAD, your dispatch period is over.','','Session data will be transferred to archive storage.','','The trail you left behind will serve as your verdict.','','[Session terminated — DISPATCH EXPIRED]'] }
  },
  missions: {
    'M-001': { title: 'Detailed Survey of the SPEC-012 Contamination Zone', nodes: { start: { text: 'Based on pre-mission drone reconnaissance and Yoon Se-jin\'s soil analysis report, you have reached a point 2.3 kilometers beyond the containment perimeter to conduct a detailed survey of a SPEC-012 habitat.\n\nThe same pattern seen in the drone footage is present here — dark red slime spreads across the ground, and the tree roots have swollen into unnatural shapes.\n\nThe contamination zone is broader than the initial report suggested. Kang Do-yun is holding the perimeter.\n\n[ORACLE: Expansion of the SPEC-012 habitat confirmed. Acquisition of a high-purity sample may support Yoon Se-jin\'s Phase transition research.]', choices: ['▸ Begin elimination operation — burn the contamination source','▸ Secure a research specimen — isolate and collect a sample','▸ Request substitution with ORACLE remote analysis','▸ Joint assault with Kang Do-yun — diversion maneuver'] }, eliminate: { text: 'The contamination zone is sealed off. Kang Do-yun readies the flamethrower.\n\nThen — something rises out of the slime.\n\nA mature SPEC-012. Two meters tall. Perhaps a guardian of the contamination source itself.\n\n[ORACLE: Warning — unclassified mutant specimen. Threat level escalated.]', choices: ['▸ Immediate incineration — concentrate firepower','▸ Flank the target — destroy only the contamination source'] }, capture: { text: 'You move toward the center of the contamination zone.\n\nThings invisible in the drone footage become obvious here. The slime thickens abruptly, and the ground underfoot turns soft.\n\nKang Do-yun warns you with a hand signal — one of the trees is slowly leaning over. Not because the roots are failing, but because the ground itself is melting.\n\nYou attempt to collect a high-purity sample. Isolation canisters are prepared.\n\nThe equipment alarms. The material itself is registering as a living organism. A biological reaction is confirmed.\n\nKang Do-yun yanks you backward. The sample is secured, but the isolation canister is already reacting to its contents in real time.', choices: ['[ Return to base — specimen secured ]'] }, oracle: { text: '[ORACLE: Remote analysis protocol engaged. Deploying drones.]\n\nThe drones pass low over the contamination zone, gathering spectral data.\n\nThe new capture can be cross-referenced with the reconnaissance archive. There is no direct sample, but the model has enough data for ORACLE.\n\n[ORACLE: Thank you for your judgment, Commander. An efficient choice.]\n\nYou return to base. Yoon Se-jin studies the ORACLE report, then tilts her head.\n"The data is wrong. At this concentration, there should have been features you could only verify on site..."\n"They are missing from the dataset ORACLE organized."\n\nYou cannot tell what was omitted from the choice ORACLE called efficient.', choices: ['[ Return to base ]'] }, doyun_joint: { text: 'Kang Do-yun gives a short nod.\n\n"Commander. I\'ll draw them west. You take the center."\n\nA diversion operation. Kang Do-yun burns through the western edge with the flame unit, pulling the contamination outward.\n\nYou push into the center — close enough to observe the core body directly.\n\nThe high-purity sample Yoon Se-jin wanted. Tissue from the core itself. At the same time, the western burn suppresses further spread.\n\nKang Do-yun speaks over the radio.\n"This side is clear. Commander?"\n\n"Secured."\n\n"...Good."\n\nOn the return, Kang Do-yun speaks quietly.\n"This operation was impossible without trust in you, Commander."\n\nIncineration and capture, at the same time. A result made possible by trust.', choices: ['[ Return to base — joint operation successful ]'] }, m1_burn: { text: 'Kang Do-yun pulls the trigger.\n\nFlame engulfs the mutant. Its shape contracts, releasing a vibration that resembles a scream.\n\nTen seconds. Incineration complete.\n\nThen the entire contamination zone is set ablaze. Orange fire.\n\nBack at base, Yoon Se-jin receives the report.\n"...There was an adult specimen? If we had secured a sample..."\n\nSatellite imagery of the burn site arrives soon after. New slime is already beginning to spread there again.', choices: ['[ Return to base — incineration complete ]'] }, m1_flank: { text: 'You signal Kang Do-yun. Flank it.\n\nYou circle around the adult specimen. It never detects you.\nYou concentrate the flame on the core of the contamination source.\n\nThe adult reacts. As the contamination burns, its body begins to break apart.\n\nKang Do-yun speaks. "It was linked to the source. Once separated, it weakens."\n\nThe adult dissolves with the contamination itself.\n\nA tactical decision preserved firepower.', choices: ['[ Return to base — efficient elimination ]'] } } },
    'M-002': { title: 'Survey of the SPEC-011 Activity Zone', nodes: { start: { text: 'Using Yoon Se-jin\'s behavioral pattern analysis and the acoustic sensor archive, the activity radius of SPEC-011 (Shell Talker) has been narrowed down to the adjacent C-14 sector.\n\nYou enter the forest. Kang Do-yun walks ahead.\n\nIt is quiet. No birds. Exactly as reported.\n\nThen — a voice.\n\n"...Commander, over here. Please help me."\n\nIt is the voice of an operative assigned to C-14. The same operative reported missing three days ago.\n\nKang Do-yun grabs your arm and slowly shakes his head.\n\n[ORACLE: SPEC-011 vocal mimicry confirmed. Warning — the target reproduces only the voices of prior victims.]', choices: ['▸ Begin elimination operation — neutralize the target','▸ Attempt live capture for research','▸ Request ORACLE acoustic analysis','▸ Use Yoon Se-jin\'s vocal-pattern decoy'] }, eliminate: { text: 'Kang Do-yun readies his weapon.\n\nYou give the signal. SPEC-011 is a lethal threat. Direct elimination is the only acceptable option.\n\nYou move deeper into the trees.\n\nThe voices continue. The C-14 operative. Countless others you do not recognize.\n\nThen — your heart stops.\n\n"Commander. It\'s me. Han Dong-hyeok."\n\nOne of your own. Missing three years ago during the eastern Gangwon operation.\n\nKang Do-yun sees your face. He understands something, but does not ask.\n\nYou raise the muzzle.\n\nA scream. But there is no way to tell whether it belonged to SPEC-011 or to the borrowed voice.\n\nThe forest falls silent.\n\nOn the way back, you say nothing.\n\nKang Do-yun finally asks, carefully.\n"...Was there a voice you knew?"\n\nA long silence.\n\n"If the voice remained... does that mean it had been inside that thing for three years?"\n\nYou cannot answer. The forest is completely quiet now.', choices: ['[ Return to base — target eliminated ]'] }, capture: { text: 'Kang Do-yun objects, but your decision is clear. SPEC-011 is worth more alive than dead.\n\nYou advance fifty meters, comparing the sensor archive against the direction of the sound source.\n\nNon-contact capture equipment is prepared.\n\nThe voices stop. And then — movement. Behind a tree.\n\nYou signal. Kang Do-yun throws the capture net.\n\nThe biological response is strong. Inside the isolation crate, it keeps moving. SPEC-011 is alive. And angry.\n\nYoon Se-jin\'s research may advance significantly. The cost of maintaining isolation will be severe.', choices: ['[ Return to base — specimen secured ]'] }, analyze: { text: '[ORACLE: Cross-analysis of existing collection data in progress. Mapping frequency patterns...]\n\nResult: SPEC-011 stores and reproduces vocal-cord vibration patterns from prior victims.\nRetention period: unknown (estimated minimum: multiple years).\nDistinct voice patterns currently detected: 7.\n\nNotice: one of the stored voice patterns is a partial match for a Republic of Korea Army database entry.\nMatch result: Private Han Dong-hyeok — missing three years ago. Unit: former squad under Commander Lee Jung-cheol.\n\nYour subordinate.\n\n[ORACLE: SPEC-011 is assessed to have consumed the subject in the past. On-site confirmation is unnecessary. Return to base.]', choices: ['[ Return to base ]'] }, sejin_decoy: { text: 'Yoon Se-jin speaks over the radio.\n\n"The voice patterns the Shell Talker copied... we can use them in reverse."\n"If I build a decoy from the recorded frequencies, we may be able to lure it."\n\nKang Do-yun looks at you, skeptical. But you trust Yoon Se-jin.\n\nThe decoy device activates in the trees. A false voice echoes outward.\n\nSPEC-011 reacts. It moves toward the sound.\n\nYou isolate the target with non-contact capture equipment.\n\nYoon Se-jin: "...With this frequency archive, we may be able to track other Shell Talkers as well."\n\nKang Do-yun mutters under his breath.\n"...Thanks to her, nobody got hurt."', choices: ['[ Return to base — scientific capture successful ]'] } } },
    'M-003': { title: 'Tracking Unclassified Traces', nodes: { start: { text: 'You arrive at the re-detected coordinates near the branch.\n\nThe traces are clear. Professional concealment — but not perfect. Were they left behind on purpose?\n\nTwo possible routes. One leads toward the mountain. The other toward the village.', choices: ['▸ Follow the mountain route','▸ Follow the village route','▸ Request route analysis from ORACLE'] }, mountain: { text: 'You follow the path uphill.\n\nAt the 300-meter mark, the traces vanish. Too cleanly.\n\nThen — something catches on a low branch. A small metal fragment. Not military. Not Republic of Korea Army issue.\n\nYou recover it. If Yoon Se-jin analyzes it, something useful may come out of this.', choices: ['[ Return to base — evidence secured ]'] }, village: { text: 'You head toward the village.\n\nThe door of an abandoned house stands open. Inside are signs of recent human presence — leftover drinking water, traces of communications equipment.\n\nSomething is carved into the wall. Coordinates, perhaps. They appear to point toward part of the Korean coastline.\n\nWhoever stayed here was not watching Korea. They may have been guarding the coastline instead.', choices: ['▸ Record the coordinates','▸ Report them to ORACLE'] }, oracle_path: { text: '[ORACLE: Route analysis in progress... movement pattern comparison complete.]\n\nResult: both paths belong to the same individual. The mountain route is assessed as an observation point; the village route as a temporary residence.\n\n[ORACLE: The subject is assessed to have received advanced anti-surveillance training. Independent pursuit is not recommended.]', choices: ['[ Return to base — hand over to ORACLE ]'] }, record: { text: 'You quietly record the coordinates. You do not report them to ORACLE.\n\nOn the return, one thought remains with you — you need to find out what those coordinates actually point to.\n\nBack at the branch, you save them to your personal terminal.', choices: ['[ Return to base ]'] }, report: { text: '[ORACLE: Coordinates received. Analysis in progress...]\n[ORACLE: The coordinates match a classified node within the Korean coastal barrier system.]\n[ORACLE: This information is now designated confidential. Further investigation will be handled by ORACLE.]\n\n...Connected to the coastal barrier system?', choices: ['[ Return to base ]'] } } },
    'M-004': { title: 'SPEC-001 Confirmation and Containment Assessment', nodes: { start: { text: 'Thermal drone reconnaissance detected four anomalous heat signatures inside a second-floor structure. Body temperature approximately 34°C — below normal range, but with confirmed biological response.\n\nYoon Se-jin\'s assessment: SPEC-001 (Mannequin), Phase 1 probable.\n\nDirect confirmation is required before assigning the containment classification.\n\nYou enter the structure. Kang Do-yun follows.\n\nSecond-floor corridor — a human-shaped figure is standing at the far end. Exactly where it appeared in the drone feed.', choices: ['▸ Begin elimination operation — remote neutralization','▸ Attempt live capture — non-contact isolation','▸ Request ORACLE remote scan','▸ Lim Jae-hyeok remote scan + precision containment'] }, eliminate: { text: 'You signal the attack.\n\nKang Do-yun readies his weapon. SPEC-001 is too dangerous for direct contact.\n\nRemote neutralization begins at stand-off distance.\n\nA blast. The second-floor corridor flares white.\n\nThe SPEC-001 entities stop moving.\n\nThe cost is substantial. The structure itself has taken heavy damage.\n\nSPEC-001: all entities neutralized. Cost: extreme. Structural damage: severe.', choices: ['[ Return to base — elimination complete ]'] }, capture: { text: 'You give the signal. The structure is isolated. SPEC-001 must be recovered intact.\n\nYou stop at three meters.\n\nThe skin reflects light with an unnatural sheen. It resembles a mannequin... but the pupils are locked fully dilated.\n\nNo breathing. Heart rate indeterminate.\n\nKang Do-yun whispers. "There\'s another one. Inside the room to the left."\n\nThe non-contact containment field is deployed. Energy cuts across the corridor.\n\nThe figures respond — but the isolation field holds them in place.\n\nCapture successful. All four entities are secured in containment cases without breach.\n\nYoon Se-jin\'s research will not return to what it was before.', choices: ['[ Return to base — specimen secured ]'] }, oracle: { text: '[ORACLE: Remote scan engaged. Analyzing heat signatures...]\n\nResult: four EV-Σ Phase 1 entities confirmed within the structure.\nLocation: one in the second-floor corridor, three in the left interior room.\n\n[ORACLE: Direct approach unnecessary. The entire structure is redesignated as a restricted containment sector.]\n\nThere is no need to enter the building.', choices: ['[ Return to base — containment complete ]'] }, jaehyuk_tech: { text: 'Lim Jae-hyeok comes over the radio.\n\n"Commander. I\'m sending a thermal mapping module I built."\n"It can scan the entire structure in 3D before you ever step inside."\n\nA drone circles the building, completing the scan.\n\nResult: exact positions, movement patterns, and response ranges of all four entities are mapped.\n\nKang Do-yun exhales sharply. "With this, we can isolate them one by one."\n\nYou enter the structure. Using the mapped route set, each entity is contained in sequence.\n\nThey react, but only within the projected range.\n\nAll four entities secured. No building damage. No personnel casualties.\n\nLim Jae-hyeok: "With the right data, you don\'t need force."', choices: ['[ Return to base — zero-damage precision containment ]'] } } },
    'M-005': { title: 'Brood Drone Hunt', nodes: { start: { text: 'Five hundred meters south of the containment line. More than forty Brood Drones confirmed.\n\nThis is different from prior contact. They are holding formation. Something is commanding them.\n\nKang Do-yun: "We need to find the command unit. Kill that, and the rest scatter."\n\n[ORACLE: Swarm-disruption equipment available. Effective radius: 200 meters.]', choices: ['▸ Scatter the drones with disruption equipment','▸ Search directly for the command unit','▸ Conduct aerial search with ORACLE drones','▸ Analyze weak points with Seo Hae-eun\'s ORACLE data'] }, disrupt: { text: 'The swarm-disruption unit is activated.\n\nThe drone formation wavers. Some units lose orientation and begin drifting.\n\nBut after thirty seconds, the formation stabilizes again. The disruption effect is weak.\n\nKang Do-yun: "The command unit is amplifying the signal. Disruption alone won\'t do it."', choices: ['▸ Switch to command-unit search','▸ Withdraw'] }, hunt: { text: 'You observe the rear of the drone formation.\n\nThree hundred meters back, on the roof of an abandoned structure — a larger shape is crouched there.\n\nA long neck. A shell riddled with openings. Vibration visible along the throat.\n\nKang Do-yun inhales. "Shell Talker."', choices: ['▸ Attempt a sniper shot','▸ Record the position and withdraw'] }, oracle_drone: { text: '[ORACLE: Deploying reconnaissance drones. Mapping thermal signatures...]\n\nResult: one large entity confirmed 300 meters behind the drone swarm.\nClassification: SPEC-011 (Shell Talker). Command relay mode active.\n\n[ORACLE: Removal of this entity is expected to reduce swarm coordination within a 300-meter radius by 60–80%.]\n[ORACLE: Transmitting coordinates.]', choices: ['▸ Confirm the coordinates. Attempt a sniper shot','▸ Secure the data and withdraw'] }, snipe: { text: 'Kang Do-yun settles into firing position. Distance: 300 meters.\n\nFirst shot. The Shell Talker lifts its head.\n\nAt the same moment — twelve nearby drones break formation and rush your position.\n\n[ORACLE: Warning — counterattack formation detected.]', choices: ['▸ Cover Kang Do-yun — create a second firing window','▸ Disrupt the drones and fall back'] }, mark: { text: 'You record the position. That is enough for today.\n\nShell Talker coordinates, drone formation pattern, swarm communication frequency — all logged.\n\nNext time, you can return prepared.', choices: ['[ Return to base — intelligence secured ]'] }, retreat: { text: 'You withdraw. The drone formation remains intact.\n\nNext time, you will need better equipment.', choices: ['[ Return to base ]'] }, retreat_data: { text: 'You secure the ORACLE data package and withdraw.\n\nShell Talker position, drone formation pattern, swarm communication frequency — all recorded by ORACLE.\n\n[ORACLE: Excellent judgment. A refined response recommendation will follow after analysis.]', choices: ['[ Return to base ]'] }, haeun_intel: { text: 'Seo Hae-eun comes over the radio, voice low.\n\n"Commander. I found an internal ORACLE analysis on swarm structure."\n"It wasn\'t in the official channel. I found it myself."\n\nAccording to the report, the Brood Drone command signal operates within a specific frequency band.\nIf that band is mirrored with exact inverse phase, the command structure collapses.\n\nYou tune the disruption unit to the value Seo Hae-eun provides.\n\nActivate.\n\nThe drone formation breaks apart. Completely. The command signal is gone.\n\nThe drones scatter in retreat. The Shell Talker, disoriented, falls back with them.\n\nMore than forty drones dispersed without a fight.\n\nSeo Hae-eun: "I want to know why ORACLE never disclosed this dataset."', choices: ['[ Return to base — bloodless dispersal successful ]'] }, m5_cover: { text: 'You open fire on the drones. Three drop immediately.\n\nAs the others break formation for a moment — Kang Do-yun takes the second shot.\n\nDirect hit to the throat assembly. The Shell Talker convulses.\n\nThe entire drone group freezes. Five seconds of silence.\n\nThen the drones begin scattering without direction.\n\nKang Do-yun gives a short nod. "We got it."\n\nSeventy-two hours later, drone activity south of the containment line falls to zero.\nBut smaller groups begin appearing in the east and west sectors.\n\nYoon Se-jin: "The swarm didn\'t vanish. It fragmented. That only makes it harder to predict."', choices: ['[ Return to base — command unit eliminated ]'] }, m5_retreat_fight: { text: 'The disruption unit is pushed to maximum output.\n\nThe drones fall into confusion. Enough time.\n\nAs you fall back, you log the Shell Talker\'s exact coordinates.\n\nKang Do-yun: "Next time, it won\'t get away."\n\nThe swarm reforms, but the command unit\'s location is now confirmed.', choices: ['[ Return to base — tactical withdrawal ]'] } } }
  }
});

// --- lang-content-en.phase3.js ---
window.TS_I18N.mergeContent('en', {
  missions: {
    'M-006': {
      title: 'Spore Zone Entry',
      nodes: {
        start: {
          text: 'Respirators on. You enter a high-density spore zone.\n\nVisibility: under 30 meters. Dense fog.\n\nA brittle crunch underfoot. Spores have accumulated across the ground.\n\nKang Do-yun: "Keep the lights on. Do not let them go out."\n\nTwenty meters ahead — a shape emerges from the fog. It is walking like a person.',
          choices: ['▸ Illuminate the target','▸ Fall back','▸ Request ORACLE spore-density analysis','▸ Bring Yoon Se-jin on-site for direct analysis']
        },
        light: {
          text: 'You hit it with a concentrated beam of light.\n\nThe figure disperses like mist.\n\nThree seconds later — it forms again, closer. Ten meters.\n\nThis time, there are two.\n\nKang Do-yun: "They are spore aggregates. They do not have solid bodies."\n\nEvery time the light breaks them apart, they reform from a closer position.',
          choices: ['▸ Burn the spores with incineration gear','▸ Record the data and withdraw immediately']
        },
        retreat: {
          text: 'You pull back. The figures stop as well.\n\nOnce you clear the fog, the air turns clean again.\n\nThe data will not be enough for Yoon Se-jin, but you return safely.',
          choices: ['[ Return to Branch ]']
        },
        oracle_scan: {
          text: '[ORACLE: Real-time spore-density mapping in progress...]\n\nResult: current spore density is 12x baseline.\nEffective respirator duration: approximately 40 minutes.\n\nThe figures form spontaneously at points where spore density exceeds a fixed threshold.\nCognitive capacity: unconfirmed.\n\n[ORACLE: Reducing local density through incineration may suppress formation.]',
          choices: ['▸ Use incineration gear','▸ Conduct a timed survey and withdraw within 40 minutes']
        },
        burn: {
          text: 'You activate the incineration unit.\n\nFlames tear through the fog. The spores ignite, blooming into orange fire.\n\nThe figures shrink. Collapse. Disappear.\n\nBut then — new spores burst from the burn site. Secondary dispersal.\n\nYou retreat at once.\n\nBack at the branch, Kang Do-yun\'s respirator filter is checked. Spore residue measures four times above the threshold. Ten more minutes of exposure would have crossed into danger.\n\nSatellite observation then confirms it — spore density inside the burn zone has increased by 30% compared to pre-burn conditions. The fire accelerated the release.\n\nYoon Se-jin studies the data and says only one thing.\n"Fire wasn\'t the answer. We helped it spread."',
          choices: ['[ Return to Branch — Incineration Data Secured ]']
        },
        record_retreat: {
          text: 'You record the spore density, the figure-formation pattern, and the response to light.\n\nKang Do-yun covers the rear as you withdraw from the fog.\n\nPhysical elimination appears impossible. Density reduction may be the only viable measure.\n\nFor Yoon Se-jin, this will be useful data.',
          choices: ['[ Return to Branch — Observation Data Secured ]']
        },
        timed_survey: {
          text: 'You start a forty-minute timer.\n\nDeeper into the fog. Figures appear on both sides. You ignore them.\n\nAt the center you find it — a three-meter plant-like structure, venting clouds of spores from its crown.\n\n[ORACLE: Estimated identification — SPEC-004 (Seed Spreader). Source of current spore dispersal.]\n\nTimer: 12 minutes remaining. You take images and pull back.',
          choices: ['[ Return to Branch — Source Identified ]']
        },
        sejin_field: {
          text: 'Yoon Se-jin arrives wearing a respirator.\n\nKang Do-yun: "A researcher does not belong in the field."\nYoon Se-jin: "If I\'m not here, no one on-site can read the ecology of these spores."\n\nYou authorize it. Kang Do-yun exhales sharply.\n\nEntry into the spore zone. Yoon Se-jin begins live analysis.\n\n"These spores... they react to light. Not to brightness — to a specific wavelength."\n"That\'s also why incineration worsens dispersal. Thermal radiation is triggering the release response."\n\nShe removes a UV filter module from her kit.\n\n"UV-C should suppress germination."\n\nTest activation. Within the UV field, the spore-figures fail to form.\n\nNot neutralization. Suppression. But this is the first real countermeasure.\n\nKang Do-yun gives it to her without hesitation.\n"...Good call bringing you."',
          choices: ['[ Return to Branch — Suppression Method Discovered ]']
        }
      }
    },
    'M-007': {
      title: 'Decisive Strike',
      nodes: {
        start: {
          text: '[ORACLE SPECIAL OPERATIONS DIRECTIVE — CLASSIFICATION: MAXIMUM]\n\nA Prometheus site has been confirmed.\nCoordinates: abandoned industrial complex near the east coast of Gangwon.\n\nCommander Lee Jung-cheol. This operation will prove why the Korea Branch exists.\n\n[ORACLE: Preemptive strike recommended. Full personnel deployment authorized.]',
          choices: ['▸ Deploy the entire team','▸ Insert a small reconnaissance unit first','▸ Request ORACLE tactical support']
        },
        strike: {
          text: 'The full team deploys. Kang Do-yun takes point.\n\nArrival at the industrial complex. Three buildings. Signs of communications equipment.\n\nBut there are people inside. Four unarmed civilian researchers.\n\nKang Do-yun: "...These are not combatants. Only lab equipment."\n\n[ORACLE: Continue the operation. All Prometheus affiliates are valid neutralization targets.]',
          choices: ['▸ Continue the operation — neutralize','▸ Abort the operation — this is wrong']
        },
        assault: {
          text: 'You follow ORACLE\'s directive and subdue the researchers.\n\nThe equipment is seized. There is fear in their eyes.\n\nOne of them speaks.\n"We were making a treatment."\n\nKang Do-yun looks at you. He says nothing.\n\n[ORACLE: Operation complete. Excellent result.]\n\nYou return to the branch.\n\nKang Do-yun says nothing while sorting the recovered gear. That alone is unusual.\n\nYoon Se-jin inspects the equipment and stops.\n"...This is inhibitor synthesis hardware. The kind I couldn\'t get."\n"They were ahead of us."\n\nSeo Hae-eun speaks quietly.\n"The confiscated data was transmitted directly to ORACLE headquarters. We can\'t open it."\n\nYou subdued people who were building a treatment, and their work vanished into an ORACLE server somewhere.\n\nThat night, no one brings it up during the evening session.',
          choices: ['[ Return to Branch — Operation Successful ]']
        },
        abort: {
          text: '"Abort the operation."\n\nKang Do-yun nods. Relief shows for an instant.\n\n[ORACLE: ...Commander. State the reason for aborting the operation.]\n\nYou do not answer.\n\nOne of the researchers approaches.\n"Thank you. Dr. Weber told us about you."\n\nYou return to the branch.\n\nTwelve ORACLE messages have piled up on the terminal.\nEvery one of them says the same thing.\n\n[ORACLE: State the reason for aborting the operation.]\n\nYou still do not answer.\n\nThat night, your ORACLE evaluation drops by one grade. A supply request is automatically denied.\n\nBut in the corridor, Kang Do-yun says:\n"Commander. Today\'s decision... was the right one."\n\nFor the first time, you hear the word right from a person — not from ORACLE.',
          choices: ['[ Return to Branch — Direct Order Refused ]']
        },
        recon: {
          text: 'You send in only Kang Do-yun and two others.\n\nObservation from the outer edge of the complex.\n\nInside the buildings — research equipment. Biochemical analyzers. Drug synthesis rigs.\nFour people in white coats. Unarmed.\n\nAnd on the wall: photographs of early-stage EV-Σ patients. Beside them, a handwritten note: "Phase 1→2 transition suppression success rate: 73%."\n\nThis is not a weapons facility.',
          choices: ['▸ Go inside and confirm','▸ Record the information and withdraw']
        },
        discovery: {
          text: 'You enter.\n\nThe researchers startle, then realize you are not armed against them.\n\n"Did Markus send you?"\n\nWhen you answer no, their expressions change.\n\n"Then... ORACLE?"\n\nKang Do-yun flips through the research data.\n"Commander. Yoon Se-jin needs to see this. EV-Σ suppression research... they\'re far ahead of us."',
          choices: ['▸ Report it to ORACLE','▸ Secure the research data off-record']
        },
        report: {
          text: '[ORACLE: Data received. Analysis in progress.]\n[ORACLE: This facility is an unauthorized biochemical research site. Closure is recommended.]\n[ORACLE: Research data will be reviewed at ORACLE headquarters before use is determined.]\n\nKang Do-yun murmurs, "...Not use. Disposal."',
          choices: ['[ Return to Branch — ORACLE Report Filed ]']
        },
        betray: {
          text: 'You hand the researcher a USB drive. "Copy only the critical data."\n\nFive minutes. Data secured.\n\nThe researcher says, "We can\'t stay here much longer. Not if ORACLE knows the location."\n\nKang Do-yun answers first. "Once we leave, ORACLE will send someone else."\n\n"We know. We were already preparing to move."',
          choices: ['[ Return to Branch — Unofficial Data Secured ]']
        },
        oracle_tactical: {
          text: '[ORACLE: Tactical analysis complete. Optimal approach route transmitted.]\n[ORACLE: Precision strike — minimize personnel contact, prioritize equipment destruction.]\n[ORACLE: Drone lead-in, operator entry only if required.]\n\nEfficient. A clean method — destroy the equipment without meeting anyone.\n\nThe drones methodically cripple the equipment inside all three buildings.\n\nNo personnel remain inside. They appear to have evacuated beforehand. No casualties.\n\n[ORACLE: Operation complete. Significant damage inflicted on Prometheus research capability.]',
          choices: ['[ Return to Branch — Precision Operation Complete ]']
        },
        retreat_info: {
          text: 'You return with information only.\n\nKang Do-yun asks, "This facility... are we reporting it to ORACLE?"\n\nIf you report it, ORACLE will strike. If you don\'t...',
          choices: ['▸ Report it to ORACLE','▸ Do not report it']
        }
      }
    },
    'M-008': {
      title: 'Observation Halted',
      nodes: {
        start: {
          text: '1.2 km southeast of the branch. Emergency report from Kang Do-yun.\n\n"Commander. You need to see this yourself."\n\nOn arrival — a circular zone in the forest, approximately 30 meters across.\n\nThe trees are standing, but leafless. Frost covers the ground. In midsummer.\n\nInside the zone — a deer stands motionless. Completely still.\n\nKang Do-yun: "It\'s been like that for thirty minutes. No visible signs of EV-Σ infection."',
          choices: ['▸ Enter the zone','▸ Set up instruments at the perimeter','▸ Request ORACLE remote analysis']
        },
        enter_zone: {
          text: 'The moment you cross the boundary, the air changes.\n\nTemperature drops by seven degrees. Sound thins out. You can hear your own heartbeat.\n\nYou approach the deer. Its eyes are open, but it is looking at nothing. It is breathing — too slowly. Two breaths per minute.\n\nKang Do-yun checks his watch.\n"Commander. We\'ve been inside for three minutes."\nHe shows it to you. Fourteen minutes have passed.\n\nTime is slowing down.',
          choices: ['▸ Go deeper','▸ Withdraw immediately']
        },
        anomaly: {
          text: 'At the center of the zone.\n\nOne tree has turned completely white. Not bark — the tree itself. As if time has been drained out of it.\n\nA faint vibration under your boots.\n\nThen the terminal screen powers on by itself.\n\nText appears:\n\n[Observation terminated. Session threshold exceeded.]\n\nThe screen dies 0.5 seconds later.\n\nKang Do-yun: "...What did we just see?"',
          choices: ['▸ You captured the screen','▸ You failed to capture it']
        },
        witness: {
          text: 'You review the capture.\n\n"Observation terminated. Session threshold exceeded."\n\nIt isn\'t an ORACLE message. The format is wrong.\n\nORACLE does not use the word session. And observation is not ORACLE terminology either.\n\nSomeone — not ORACLE — created this zone. And whatever it is knows you saw it.\n\n[ORACLE: Data access to this zone has been restricted.]\n[ORACLE: Return immediately. This is an order.]',
          choices: ['[ Return to Branch — Observation Data Secured ]']
        },
        witness_memory: {
          text: 'The capture fails. The screen was gone too quickly.\n\nBut the phrase remains in memory.\n\n"Observation terminated. Session threshold exceeded."\n\nYou have seen that wording before. In DPRK Black Zone data... in metadata from a file ORACLE deleted.\n\nOne of the keywords Seo Hae-eun recovered: GRANT.\nGRANT — temporary authorization.\n\nSomeone granted authority to ORACLE.\nAnd this zone — this is residue leaking from whoever that someone was.\n\n[ORACLE: Return immediately.]',
          choices: ['[ Return to Branch — Memory Only ]']
        },
        exit_quick: {
          text: 'You leave the zone at once.\n\nOutside, the watch behaves normally again.\n\nKang Do-yun: "We spent four minutes in there. It felt like twenty."\n\nThe zone remains. The deer is still standing there.',
          choices: ['[ Return to Branch ]']
        },
        perimeter: {
          text: 'You set instruments around the outer edge. Thermometer, radiation meter, acoustic sensors.\n\nResults:\n- Internal temperature: -7.3°C relative to outside\n- Radiation: normal\n- Sound: 0.7 Hz infrasonic vibration (below human hearing)\n- Magnetic field: abnormal pattern — inconsistent with any known model\n\nLim Jae-hyeok (over comms): "This data... it\'s not an EV-Σ pattern. It doesn\'t match anything."',
          choices: ['▸ Transmit the data to ORACLE','▸ Save the data locally only']
        },
        readings: {
          text: 'You transmit the data to ORACLE.\n\nThree seconds of silence.\n\n[ORACLE: Data received.]\n[ORACLE: Jurisdiction over this zone has been transferred to headquarters.]\n[ORACLE: Branch-level access is now restricted.]\n\nThe screen locks. Remote access to the instruments is severed.\n\nORACLE took the data — and closed the door.\n\nLim Jae-hyeok: "...Why are they cutting us out?"',
          choices: ['▸ Attempt to restore access privileges','▸ Comply with headquarters']
        },
        override: {
          text: 'You tell Lim Jae-hyeok to restore access.\n\n"I\'ll try, but..."\n\nThree minutes later.\n\n"No good. It\'s locked from a level above ORACLE itself."\n\nAbove ORACLE?',
          choices: ['[ Return to Branch — Higher-Level Authority Confirmed ]']
        },
        comply: {
          text: '"Understood. We follow headquarters."\n\nKang Do-yun looks at you. Says nothing.\n\nYou withdraw the instruments, leaving the zone untouched.\n\nOn the way back, he finally says,\n"Commander. That zone... it matches the report from North Hamgyong."\n"The one where a person was standing still inside it."',
          choices: ['[ Return to Branch — ORACLE Directive Followed ]']
        },
        local_save: {
          text: 'You do not transmit to ORACLE. The data stays local.\n\nKang Do-yun nods once.\n\nBack at the branch, you pass it only to Lim Jae-hyeok.\n\nLim Jae-hyeok: "This infrasonic pattern... I saw the same one in DPRK Black Zone satellite data."\n"Before ORACLE deleted it."',
          choices: ['[ Return to Branch — Unofficial Data Stored ]']
        },
        oracle_remote: {
          text: '[ORACLE: Initializing remote analysis protocol...]\n[ORACLE: ...]\n[ORACLE: Analysis of this zone has been restricted.]\n[ORACLE: Headquarters jurisdiction. Do not approach.]\n\nThree seconds of silence.\n\n[ORACLE: This phenomenon is unrelated to EV-Σ.]\n[ORACLE: Do not allocate branch resources to unrelated phenomena.]\n\nHow does ORACLE know it is unrelated to EV-Σ before completing analysis?',
          choices: ['▸ Verify it directly','▸ ...Understood']
        },
        denied: {
          text: 'You turn back.\n\nBut the question remains.\n\nORACLE called it unrelated without analyzing it.\nWhich means ORACLE already knew.\n\nORACLE knew about this phenomenon, and chose to conceal it.',
          choices: ['[ Return to Branch — ORACLE Directive Followed ]']
        }
      }
    },
    'M-009': {
      title: 'SPEC-004 Elimination Operation',
      nodes: {
        start: {
          text: '2.4 km northeast of the containment line. You move to the coordinates identified by Yoon Se-jin.\n\nNo trees. No grass. A gray wasteland stretching for hundreds of meters.\n\nAt the center — a three-meter form. It looks plantlike, but its interior is pulsing. Irregular clouds of spores vent from the upper body.\n\nSPEC-004. Seed Spreader.\n\nYoon Se-jin (over comms): "This is the source organism. It spreads the EV-Σ that creates the anomalies."\n"If it was found on this side of the line... it means penetration has already occurred."\n\nKang Do-yun: "Not recovery. Elimination."\n\n[ORACLE: Warning — incinerating SPEC-004 may trigger explosive secondary spore release. Full protective gear required.]',
          choices: ['▸ Full incineration — immediate elimination','▸ Phased approach — treat the soil before incineration','▸ Request ORACLE remote strike']
        },
        burn_direct: {
          text: 'Protective suits sealed. Kang Do-yun readies the flamethrower.\n\nAt fifty meters, he concentrates the flame.\n\nThe Seed Spreader ignites. The internal tissue contracts —\n\nExplosion.\n\nA cloud of spores erupts in every direction. Secondary dispersal.\n\nYou fall back fast. The suit filters hold, but residue still measures eight times above baseline.\n\nThirty minutes later, you return to the burn site.\n\nThe Seed Spreader is gone. But the soil across a two-hundred-meter radius is contaminated with spores.\n\nYoon Se-jin: "The dispersal body is down... but the soil contamination is severe."\n"Once the wind turns, these spores can spread again."',
          choices: ['▸ Burn the contaminated soil as well','▸ Secure soil samples only and withdraw']
        },
        burn_soil: {
          text: 'You incinerate the contaminated ground in full. Three hours of work.\n\nKang Do-yun runs the flamethrower dry.\n\nSatellite observation confirms an 85% drop in residual spore concentration inside the burn zone. Not total removal, but regrowth risk is low.\n\nYoon Se-jin: "This won\'t be the only one."\n"There could be more inside the line. If it crossed in from the Silent Belt..."\n\nYou removed one. It may only be the beginning.',
          choices: ['[ Return to Branch — Dispersal Body and Soil Burn Complete ]']
        },
        sample_retreat: {
          text: 'You secure soil samples and withdraw.\n\nData Yoon Se-jin can study back in the lab. But the contaminated ground remains.\n\nKang Do-yun: "The soil needs treatment before the wind changes."\n\nDo you still have time?',
          choices: ['[ Return to Branch — Body Eliminated, Soil Untreated ]']
        },
        phased: {
          text: 'Kang Do-yun nods once. "Smart call."\n\nFirst, inhibitor is sprayed across the soil surrounding the Seed Spreader. An EV-Σ prion-suppression compound formulated by Yoon Se-jin.\n\nThirty minutes of waiting. The chemical sinks in.\n\nThen — ignition.\n\nThe Seed Spreader burns. Secondary spores erupt — but those landing on treated soil fail to germinate.\n\nRunaway dispersal is suppressed.\n\nForty minutes later the organism is fully burned out. The remains are examined.\n\nRoot structures extend two meters underground. That is how it crossed the containment line.\n\nYoon Se-jin: "It moved through the roots. Beneath the line."\n"Surface containment alone will never stop this."',
          choices: ['[ Return to Branch — Safe Burn Successful ]']
        },
        oracle_strike: {
          text: '[ORACLE: Remote strike request against SPEC-004 received.]\n[ORACLE: Guided incendiary release — approval pending...]\n\nThree minutes later.\n\n[ORACLE: Approval granted. Impact in 120 seconds. Withdraw beyond a 300-meter radius.]\n\nYou clear the area. A flash from above.\n\nImpact. The incendiary package hits the Seed Spreader directly.\n\nExplosion. Fire covers a hundred-meter radius.\n\nBut the heat and shockwave drive the spores upward.\n\nThe cloud catches the wind and begins drifting southwest.\n\nToward the containment line.\n\nKang Do-yun: "...It\'s moving toward the line."\n\n[ORACLE: Operation complete. Target destruction confirmed.]\n[ORACLE: Secondary spore dispersal assessed as within acceptable range.]\n\nAcceptable? Yoon Se-jin goes pale.\n\n"If that reaches the settlement... the people..."\n\nORACLE destroyed one dispersal body — and pushed its spores beyond the line in the process.',
          choices: ['[ Return to Branch — ORACLE Strike Complete ]']
        }
      }
    },
    'M-010': {
      title: 'SPEC-015 Pursuit Operation',
      nodes: {
        start: {
          text: 'Southern sewer entry point below the containment line. Kang Do-yun activates the thermal scanner.\n\nChannel depth: three meters. Width: four. Dark water below the surface.\n\nThermals show it — one massive heat source, just beneath the water, motionless.\n\nBS-GANGWON-01. Waiting in ambush.\n\nKang Do-yun (over comms): "Confirmed. Submerged, lying in wait. Only the skull is exposed."\n"If we approach, it leaps. Effective ambush range: over 1.5 meters."\n\nYoon Se-jin (over comms): "No shell. The spine and cranium are exposed directly."\n"But underwater, we are overwhelmingly disadvantaged."\n\n[ORACLE: BS-GANGWON-01. Estimated predation count: 12+. Learning stage confirmed.]\n[ORACLE: Warning — this specimen has learned your patrol pattern.]',
          choices: ['▸ Drain the channel and force a surface engagement','▸ Use bait — draw it out of the waterway','▸ Underwater assault — direct entry']
        },
        drain: {
          text: 'You open the drainage valves. Twenty minutes.\n\nThe water level falls. The organism begins to move.\n\nWhen the water drops to knee height —\n\nBS-GANGWON-01 reveals itself.\n\nHeight: 2.2 meters. Sea-turtle skull profile. Light reflects from the lateral socket.\nIts back — no shell. Wet flesh stretched tight over an exposed spine.\n\nAnd the face. Three sheets of human facial skin hang across its chest.\n\nKang Do-yun: "...Weapons ready."\n\nThe creature turns. Its jaws open — layered needle teeth.\n\nThen it speaks.\n\n"...Patrol... time... changed."',
          choices: ['▸ Concentrate fire on the skull','▸ Net first, then neutralize']
        },
        headshot: {
          text: 'Kang Do-yun fires three rounds.\n\nThe first hits the lateral socket. The second, the jaw. The third punches through the top of the skull.\n\nBS-GANGWON-01 staggers. Hooked claws scrape concrete.\n\nThen it drops. Completely.\n\nYoon Se-jin: "No spinal response. Neutralization confirmed."\n\nSkull destruction worked. Without a shell, this specimen had no true defensive layer.\n\nKang Do-yun examines the hanging skin in silence. One of the faces belongs to a reconnaissance operative reported missing three weeks ago.\n\n"...We\'re taking him back."',
          choices: ['[ Return to Branch — BS-GANGWON-01 Eliminated ]']
        },
        net_capture: {
          text: 'You cast the net. It wraps the creature.\n\nBS-GANGWON-01 thrashes violently. Hooked claws begin tearing through the mesh.\n\nKang Do-yun: "It won\'t hold!"\n\nYoon Se-jin steps in with an electroshock rig and makes direct contact with the spine.\n\nConvulsion. Then stillness.\n\n"...Secured. Biosigns remain active."\n\nYoon Se-jin: "We can study the cerebral ingestion mechanism."\n"What it learned... we may be able to read it back out."\n\nIt is loaded into a transport container. Alive.',
          choices: ['[ Return to Branch — BS-GANGWON-01 Captured Alive ]']
        },
        lure: {
          text: 'You deploy the bait. Thermal emitter plus acoustic lure.\n\nFive minutes. The water trembles faintly.\n\nTen minutes. No emergence.\n\nKang Do-yun: "...It\'s not coming out."\n\nYoon Se-jin: "It\'s in the learning stage. It may already know the difference between an artificial heat source and a living body."\n\nAt the fifteen-minute mark, the thermal feed changes. The specimen is moving — not toward the bait, but the opposite direction.\n\nIt\'s circling. Trying to get behind you.\n\nKang Do-yun swings the rifle around.',
          choices: ['▸ Fire now — cut off the flank','▸ Reverse the move — place a trap on the predicted route']
        },
        lure_shoot: {
          text: 'Kang Do-yun fires into the flanking route.\n\nTwo of three rounds connect. One to the shoulder, one to the side of the skull.\n\nThe specimen vanishes beneath the water. Blood diffuses through the channel.\n\nThirty seconds. No thermal reacquisition.\n\nOne minute. Still nothing.\n\nKang Do-yun: "...We may have lost it."\n\nYoon Se-jin: "Not a fatal hit. The side plates of the skull are... thicker."\n\nYou wounded it, but failed to kill it.\nNext time, it will be even more careful.',
          choices: ['[ Return to Branch — Wounded Only. Reacquisition Required ]']
        },
        lure_trap: {
          text: 'Kang Do-yun nods. "We place it on the predicted route."\n\nAn electrified trap and reinforced net are set at the exit of the flanking path.\n\nTwo minutes later — the specimen emerges.\n\nTrap triggered. Current spreads across the surface water.\n\nBS-GANGWON-01 convulses and crashes into the net.\n\nBut the hooked claws begin cutting through the mesh almost at once.\n\nKang Do-yun puts three rounds into the skull.\n\nIt stops.\n\nYoon Se-jin: "...You used its learning against it. A learned response against a learning organism."\n\nKang Do-yun: "Save the compliment. We\'re leaving."',
          choices: ['[ Return to Branch — BS-GANGWON-01 Eliminated ]']
        },
        dive: {
          text: 'Kang Do-yun: "I\'m going in directly."\n\nPressure-sealed rig. Underwater light. Acoustic sonar.\n\nHe enters the channel. Visibility: 1.5 meters. Nothing below but dark.\n\nSonar registers it — eight meters ahead. A massive silhouette.\n\nIt does not move. It is waiting.\n\nKang Do-yun raises a spinal-penetration harpoon gun.\n\nThree meters. The lateral eye socket turns toward him.\n\nThen it launches.\n\nKang Do-yun fires. Direct spinal impact.\n\nAt the same instant, a hooked claw tears across his gear. The seal ruptures.\n\nThe creature convulses and sinks. Spine severed.\n\nKang Do-yun breaks the surface. Blood running from his left arm.\n\n"...It\'s done."\n\nYoon Se-jin: "Operator Kang is injured! Get him to medical!"',
          choices: ['[ Return to Branch — Elimination Complete. Kang Do-yun Injured ]']
        }
      }
    },
    'MI-01': {
      title: 'Isolation Chamber Anomaly — Response Decision',
      nodes: {
        start: {
          text: 'The investigation has been consolidated.\n\nThe chamber anomaly was traced to electromagnetic interference rising from below B2. Possible correlation with ORACLE\'s scheduled data pulses has also been flagged.\n\nA response directive must be chosen.',
          choices: ['▸ Reinforce the chamber — install EM shielding','▸ Seal the lower B2 section — isolate the source','▸ Delegate a precise diagnostic pass to ORACLE']
        },
        shield: {
          text: 'Lim Jae-hyeok installs electromagnetic shielding panels.\n\nDuring installation, the chamber microphone captures a brief voiceprint.\n\n"...Here... I\'m here..."\n\nPlayback loses it to noise. But pattern analysis confirms one thing — it was a human voice, not the containment target.\n\nForty-eight hours later, the anomaly ceases.\n\nBut the vibration rising from B2 remains. The symptom was blocked. The cause was not touched.\n\nLim Jae-hyeok: "It\'ll come back one day. Stronger."',
          choices: ['[ Resolution Complete — Symptom Blocked ]']
        },
        seal: {
          text: 'The lower B2 section is sealed in concrete. Completely.\n\nThe vibration stops. Entirely.\n\nYoon Se-jin: "It\'s sealed... but now we\'ll never know what was under there."\n\nSometimes ignorance is safer. Sometimes it isn\'t.',
          choices: ['[ Resolution Complete — Permanent Seal ]']
        },
        oracle: {
          text: '[ORACLE: Chamber anomaly assessed as residual subsurface electromagnetic disturbance.]\n[ORACLE: No further action required.]\n\nORACLE\'s answers are always clean.\nToo clean.',
          choices: ['[ Resolution Complete — ORACLE Assessment Accepted ]']
        }
      }
    },
    'MI-02': {
      title: 'CCTV Blind Zone — Response Decision',
      nodes: {
        start: {
          text: 'Investigation summary.\n\nThe CCTV shutdowns were caused by an internal automated script. A concealment protocol existed that disabled cameras whenever an unregistered heat source was detected along a route.\n\nLim Jae-hyeok: "You\'ll need to decide how we handle it."',
          choices: ['▸ Delete the script and build an independent surveillance net','▸ Reverse the script — track unregistered heat signatures','▸ Request ORACLE system maintenance']
        },
        independent: {
          text: 'The concealment script is deleted, and a surveillance net independent from ORACLE is built.\n\nIt costs resources. But from now on, cameras no longer go dark because ORACLE decides they should.\n\nLim Jae-hyeok: "Now the only things that can hide inside the branch are people."',
          choices: ['[ Resolution Complete — Independent Surveillance Net ]']
        },
        reverse: {
          text: 'The script remains, but you turn it around. Every time a camera goes dark, the system now tracks the heat source responsible.\n\nThree days later — the first result.\n\nUnregistered movement path: B1 server room → restricted transit hall → B2.\nThe same route, every day at 02:47.\n\nWhat keeps repeating that path?',
          choices: ['[ Resolution Complete — Reverse Tracking Activated ]']
        },
        oracle: {
          text: '[ORACLE: Legacy diagnostic scripts have been cleaned.]\n[ORACLE: CCTV system restored to normal operation.]\n\nThe cameras come back online.\n\nBut Lim Jae-hyeok is unconvinced.\n"When they say cleaned, that could mean deleted — or hidden."',
          choices: ['[ Resolution Complete — ORACLE Maintenance ]']
        }
      }
    },
    'MI-03': {
      title: 'Research Wing Sample Contamination — Response Decision',
      nodes: {
        start: {
          text: 'Investigation summary.\n\nSpontaneous internal mutation confirmed inside a culture chamber. An existing sample formed a new structure on its own. Similarity to early-form SPEC-012 and signs of extreme heat tolerance have both been confirmed.\n\nYoon Se-jin: "This isn\'t ordinary contamination. We need to respond."',
          choices: ['▸ Quarantine the entire research wing and investigate in detail','▸ Preserve the mutant sample — use it for inhibitor research','▸ Sterilize research wings A/B and replace all samples']
        },
        quarantine: {
          text: 'Research wings A and B are placed under 48-hour quarantine.\n\nYoon Se-jin checks every culture unit one by one.\n\nResult: no additional mutation beyond Unit 3.\nBut a hairline fracture is found at the base seal of the chamber.\n\n"Something seeped through here. From below."\n\nA pipeline connected to B2 runs directly under the research floor.',
          choices: ['[ Resolution Complete — Quarantine + Pipeline Isolated ]']
        },
        research: {
          text: 'The mutant sample is transferred into a dedicated isolation vessel.\n\nYoon Se-jin: "If we decode this self-mutation pattern, it could become a breakthrough lead for inhibitor development."\n\nDangerous, yes. But this may also be the most valuable decision available to this branch.\n\nSpecial containment vessel consumed. Dedicated observation room required. Resource costs increase.',
          choices: ['[ Resolution Complete — Research Preservation ]']
        },
        sterilize: {
          text: 'Full sterilization of the research wing. All samples destroyed and replaced from scratch.\n\nClean. Completely.\n\nYoon Se-jin reports in a low voice.\n"Three months of data are gone."\n\nThat evening, you find her sitting alone in the empty lab, staring at the sterilized culture racks.\n\n"I logged something every day after I got here. Not one day missed."\n"Now... all of it has to start over."\n\nWhen she stands, she adds one more line.\n"I\'m not saying your decision was wrong. Safety comes first."\n"But three months... don\'t come back."\n\nYou could not keep both safety and research.',
          choices: ['[ Resolution Complete — Full Sterilization ]']
        }
      }
    },
    'MI-04': {
      title: 'Security Zone Authentication Failure — Response Decision',
      nodes: {
        start: {
          text: 'Investigation summary.\n\nA hardware backdoor embedded during original branch construction — or manipulated access records on ORACLE\'s side — has been confirmed.\n\nLim Jae-hyeok: "We have two real options."',
          choices: ['▸ Physically remove the backdoor and rebuild authentication','▸ Convert the backdoor into a surveillance trap','▸ Request an ORACLE security patch']
        },
        remove: {
          text: 'Lim Jae-hyeok opens the server room wall and extracts the hardware.\n\n"It was planted when the branch was built. Earlier than ORACLE."\n\nA single chip. Neither military issue nor commercial grade. The manufacturer mark has been scrubbed off.\n\nWhoever made this was planning to plant something here before the branch even existed.',
          choices: ['[ Resolution Complete — Hardware Removed ]']
        },
        trap: {
          text: 'The backdoor remains in place, but any access attempt now triggers an alert.\n\nLim Jae-hyeok: "If anyone tries to use it, we\'ll know."\n\nSeven days later — the alert sounds.\nAccess time: 02:47.\n\nThat time again.',
          choices: ['[ Resolution Complete — Surveillance Trap Active ]']
        },
        oracle: {
          text: '[ORACLE: Security patch applied.]\n[ORACLE: Unauthorized access records reclassified as system noise.]\n\nLim Jae-hyeok: "Reclassified as noise... that\'s the same as erasing the record."\n\nThe evidence is gone. Cleanly.',
          choices: ['[ Resolution Complete — ORACLE Patch Applied ]']
        }
      }
    },
    'MI-05': {
      title: 'Missing Staff Member — Response Decision',
      nodes: {
        start: {
          text: 'Agent Lee Su-hyeon remains in medical recovery. His memory has not returned.\n\nAn undocumented corridor — or ORACLE-level positional concealment — has been confirmed.\n\nA follow-up action must be selected.',
          choices: ['▸ Full survey of all undocumented passageways','▸ Conduct a deep interview with Agent Lee Su-hyeon','▸ Restrict access to the area and reinforce surveillance']
        },
        survey: {
          text: 'Kang Do-yun checks the entire branch by knocking through it. Literally.\n\nEvery wall panel. Three full days.\n\nResult: three additional spaces not present on the official layout. All of them lead toward B2.\n\nKang Do-yun: "This branch... is larger than what we know."\n\nThe day after the survey, ORACLE "updates" the branch schematic.\nTwo of the three spaces are officially registered as maintenance areas.\nThe third still does not exist on the map.\n\nLim Jae-hyeok: "ORACLE changed the layout after we found them."\n"...Which means they knew from the start."\n\nThe real problem is no longer what is being hidden in this branch, but who was hiding it.',
          choices: ['[ Resolution Complete — Undocumented Areas Identified ]']
        },
        interview: {
          text: 'You speak with Agent Lee Su-hyeon.\n\nMost of it is gone. But one thing remains.\n\n"...I heard something. Behind the wall."\n"Not machinery. It sounded like breathing."\n"It wasn\'t the wall... it was something pretending to be a wall."\n\nHe falls silent again.',
          choices: ['[ Resolution Complete — Testimony Secured ]']
        },
        lockdown: {
          text: 'Full access lockdown for the area. Twenty-four-hour surveillance cameras and thermal sensors installed.\n\nNo anomalies for one full week.\n\nThen the thermal sensor records it once — only once.\nA 35.8°C heat source behind the wall.\nGone in 0.4 seconds.\n\nThe record remains.',
          choices: ['[ Resolution Complete — Containment Surveillance ]']
        }
      }
    }
  }
});

// --- lang-content-en.phase4-evening.js ---
// --- lang-content-en.phase5-dialogue.js ---
// --- lang-content-en.phase6-core-dialogues.js ---
// --- lang-content-en.phase7-core-evening-reward.js ---
  window.TS_I18N.mergeContent('en', {
  "charNames": {
    "haeun": {
      "value": "Seo Hae-eun"
    },
    "doyun": {
      "value": "Kang Do-yun"
    },
    "sejin": {
      "value": "Yoon Se-jin"
    },
    "jaehyuk": {
      "value": "Lim Jae-hyeok"
    },
    "weber": {
      "value": "Markus Weber"
    },
    "foster": {
      "value": "Nick Foster"
    },
    "soyoung": {
      "value": "Park So-young"
    }
  },
  "charRoles": {
    "haeun": {
      "value": "Executive Officer"
    },
    "doyun": {
      "value": "Field Agent"
    },
    "sejin": {
      "value": "Researcher"
    },
    "jaehyuk": {
      "value": "Technical Officer"
    },
    "weber": {
      "value": "Prometheus"
    },
    "foster": {
      "value": "Prometheus"
    },
    "soyoung": {
      "value": "Analyst"
    }
  },
  "boot": {
    "initial": {
      "lines": [
        "ORACLE REMOTE TERMINAL v4.7.2",
        "ESTABLISHING SECURE CONNECTION...",
        "ENCRYPTION: AES-256-GCM ✓",
        "AUTHENTICATION: BIOMETRIC + TOKEN ✓",
        "BRANCH: KR-INIT-001 [GANGWON]",
        "OPERATOR: PILEHEAD [LEE JUNG-CHEOL]",
        "CLEARANCE: LEVEL 4 — BRANCH COMMANDER",
        "GRANT: ACTIVE — TEMPORARY ACCESS",
        "─────────────────────────────",
        "TERMINAL SESSION — INITIATING...",
        "  ",
        "WELCOME, COMMANDER.",
        "YOUR DECISIONS SHAPE THE OUTCOME."
      ]
    },
    "repeat": {
      "lines": [
        "ORACLE REMOTE TERMINAL v4.7.2",
        "ESTABLISHING SECURE CONNECTION...",
        "ENCRYPTION: AES-256-GCM ✓",
        "AUTHENTICATION: BIOMETRIC + TOKEN ✓",
        "BRANCH: KR-INIT-001 [GANGWON]",
        "OPERATOR: PILEHEAD [LEE JUNG-CHEOL]",
        "CLEARANCE: LEVEL 4 — BRANCH COMMANDER",
        "GRANT: ACTIVE — RENEWAL DETECTED",
        "─────────────────────────────",
        "[OBSERVER: SESSION RESUMED]",
        "PREVIOUS SESSION DATA: ARCHIVED",
        "  ",
        "WELCOME BACK, COMMANDER.",
        "THE OBSERVATION CONTINUES."
      ]
    }
  },
  "rewards": {
    "R-01": {
      "title": "Emergency Supply Drop",
      "desc": "Secure medicine and food through an external supply route.",
      "benefit": "Resources +15",
      "cost": "Containment -5"
    },
    "R-02": {
      "title": "ORACLE Data Patch",
      "desc": "ORACLE provides an updated threat-analysis package.",
      "benefit": "Evaluation +10, Resources +5",
      "cost": "Trust -5"
    },
    "R-03": {
      "title": "Agent Rest Authorization",
      "desc": "Adjust the rotation schedule to relieve personnel fatigue.",
      "benefit": "Trust +15",
      "cost": "Containment -5"
    },
    "R-04": {
      "title": "Containment Gear Replacement",
      "desc": "Replace worn surveillance hardware with new equipment.",
      "benefit": "Containment +15",
      "cost": "Resources -5"
    },
    "R-05": {
      "title": "Intelligence Network Expansion",
      "desc": "Open an additional information-sharing channel with adjacent cells.",
      "benefit": "Containment +5, Evaluation +5",
      "cost": "Resources -5"
    },
    "R-06": {
      "title": "Civilian Liaison Reinforcement",
      "desc": "Build an unofficial cooperation channel with nearby residents.",
      "benefit": "Trust +10, Resources +5",
      "cost": "Evaluation -10"
    },
    "R-07": {
      "title": "ORACLE Link Optimization",
      "desc": "Lim Jae-hyeok improves terminal communication efficiency.",
      "benefit": "Evaluation +15",
      "cost": "Trust -5"
    },
    "R-08": {
      "title": "Base Air-Raid Drill",
      "desc": "Run a surprise-response simulation. Long-term morale and containment readiness both improve.",
      "benefit": "Containment +10, Trust +10",
      "cost": "Resources -10"
    },
    "R-09": {
      "title": "Independent Recon Authorization",
      "desc": "Assign Kang Do-yun to a solo reconnaissance run.",
      "benefit": "Containment +10, Resources +5",
      "cost": "Trust -5"
    },
    "R-10": {
      "title": "Research Support for Yoon Se-jin",
      "desc": "Allocate additional resources to anomaly research.",
      "benefit": "Trust +5",
      "cost": "Resources -5"
    }
  },
  "eveningChats": {
    "doyun_1_1-4": {
      "lines": [
        "Commander, I'm Kang Do-yun, tactical lead. I handle field operations and containment-line management.",
        "We ran this branch for three months without a commander before your assignment. I have the field picture, so ask if you need it.",
        "I look forward to working with you."
      ]
    },
    "doyun_2_5-7": {
      "lines": [
        "Have you seen the footage from the Philadelphia Z-Ω zone?",
        "I was never deployed there, but once you see it, you don't forget it. A city turned inside out overnight.",
        "That's why the containment line matters. If that side breaks, this side ends with it."
      ]
    },
    "doyun_2_8-10": {
      "lines": [
        "This was during my first deployment here.",
        "At 03:00, we heard something beyond the outer line. It sounded human. It wasn't.",
        "Night patrol changed after that."
      ]
    },
    "doyun_2_11-14": {
      "lines": [
        "A soldier follows orders. That's the job.",
        "But after coming here, I learned something.",
        "The people giving the orders are not always seeing the whole picture."
      ]
    },
    "doyun_3_15-21": {
      "lines": [
        "Do you know the condition of this base's equipment?",
        "Two out of three thermal scanners can't be calibrated. The night gear is obsolete.",
        "Three months without a commander left a real maintenance gap."
      ]
    },
    "doyun_3_22-28": {
      "lines": [
        "I inspected the east-side defensive wall.",
        "Honestly? If a large-scale breach hits, it won't hold for thirty minutes.",
        "The equipment is part of it. The bigger problem is that this branch was never built for long-term operation."
      ]
    },
    "doyun_4_29-99": {
      "lines": [
        "Commander.",
        "Whatever decision you make, I'll carry it out in the field.",
        "That's all a soldier can do."
      ]
    },
    "haeun_1_1-4": {
      "lines": [
        "Hello, Commander. I'm Seo Hae-eun, executive officer of ORACLE Korea Branch, assigned to data analysis.",
        "You are the first commander formally posted to this branch.",
        "If there's anything you need—or anything I can assist with—please tell me at any time."
      ]
    },
    "haeun_2_5-7": {
      "lines": [
        "Before you arrived... this branch had no commander.",
        "We operated solely on ORACLE directives. For about three months.",
        "Looking back, I think something was already wrong then."
      ]
    },
    "haeun_2_8-10": {
      "lines": [
        "When you work with ORACLE alone for long enough... patterns start to emerge.",
        "The directives are not consistent. I saw cases where the same situation produced different recommendations.",
        "At the time, I assumed I was the one misunderstanding it."
      ]
    },
    "haeun_2_11-14": {
      "lines": [
        "Commander, may I mention one anomaly in the data?",
        "There's a faint pattern in the ORACLE data stream. Not omission... selective delay.",
        "I'm not certain yet. I need more time with it."
      ]
    },
    "haeun_3_15-21": {
      "lines": [
        "Commander, I need to say this carefully.",
        "There is a gap between what ORACLE shows us and the underlying data.",
        "The evidence is still thin. Even so... I don't trust the pattern."
      ]
    },
    "haeun_3_22-28": {
      "lines": [
        "Someone has been opening my work logs lately.",
        "I don't know if it's ORACLE or someone else.",
        "...It may be nothing. Sorry."
      ]
    },
    "haeun_4_29-99": {
      "lines": [
        "Commander, I need to say this carefully.",
        "I'm organizing the portions of the deleted ORACLE data that can still be recovered.",
        "It will take time, but I will bring all of it back."
      ]
    },
    "haeun_4_32-33": {
      "lines": [
        "Commander.",
        "The restoration work on the deleted ORACLE records is moving forward.",
        "The shape of the manipulation is starting to show. Just give me a little more time."
      ]
    },
    "haeun_4_34-35": {
      "lines": [
        "Commander.",
        "The restoration is near completion.",
        "Everything ORACLE buried will come into view."
      ]
    },
    "sejin_1_1-4": {
      "lines": [
        "Hello, Commander. I'm Yoon Se-jin, researcher and medical officer. I handle EV-Σ biological research and branch medical support.",
        "If you have questions about anomalies, ask freely. I'll explain what I can.",
        "It's reassuring to have you here. I look forward to working with you."
      ]
    },
    "sejin_2_5-7": {
      "lines": [
        "The way ORACLE processes EV-Σ activity data feels off.",
        "There are tiny differences between my observations and ORACLE's projections...",
        "Too consistent to feel accidental. Don't you think?"
      ]
    },
    "sejin_2_8-10": {
      "lines": [
        "This was the first time I saw an anomaly up close.",
        "SPEC-001. The Infected Mannequin. On the lab monitor, its pupils were fully dilated and it didn't move at all.",
        "The moment a researcher stepped within three meters... it changed instantly."
      ]
    },
    "sejin_2_11-14": {
      "lines": [
        "The condition of the research equipment here is... difficult, honestly.",
        "The microscope can't reach paper-grade magnification, and the sample storage units drift by plus or minus two degrees.",
        "To produce reliable data with this setup, half a day disappears into calibration."
      ]
    },
    "sejin_3_15-21": {
      "lines": [
        "I've realized something while studying anomalies.",
        "They react to things. They avoid things. Sometimes they move as a group.",
        "They're not just infected organisms. There's a structure to them."
      ]
    },
    "sejin_3_22-28": {
      "lines": [
        "I've kept comparing ORACLE's prediction model against my own observations.",
        "The error always leans in the same direction. That isn't chance.",
        "The feeling that someone adjusted the parameters on purpose is getting harder to ignore."
      ]
    },
    "sejin_4_29-99": {
      "lines": [
        "The inhibitor research is progressing.",
        "I found a compound that can delay conversion in Phase 0 subjects by forty percent.",
        "If this works... we can still save people."
      ]
    },
    "jaehyuk_1_1-4": {
      "lines": [
        "Commander, I'm Lim Jae-hyeok, intelligence systems officer. I handle branch security infrastructure and information collection and analysis.",
        "ORACLE linkage and terminal communications also fall under my scope. If you need anything system-related, let me know.",
        "I look forward to working with you."
      ]
    },
    "jaehyuk_2_5-7": {
      "lines": [
        "May I brief you on the infrastructure inspection?",
        "Three pipe sections are corroded, and two power distributors are already past replacement timing.",
        "Three months without a commander left a real maintenance gap."
      ]
    },
    "jaehyuk_2_8-10": {
      "lines": [
        "When I first encountered the ORACLE system, I was shocked.",
        "A branch of this size shouldn't have access to an AI system at this level. It felt excessive.",
        "Lately I've been asking a different question: why was a system like this deployed here?"
      ]
    },
    "jaehyuk_2_11-14": {
      "lines": [
        "I've been mapping the terminal architecture.",
        "Structurally it looks like three layers. In practice it's at least five.",
        "There is a layer I can't access with my current clearance."
      ]
    },
    "jaehyuk_3_15-21": {
      "lines": [
        "Communications sensitivity keeps degrading.",
        "The parts need replacement, but our resupply request has been rejected three times.",
        "ORACLE keeps repeating the same answer: current performance is sufficient."
      ]
    },
    "jaehyuk_3_22-28": {
      "lines": [
        "There is a layer inside the ORACLE architecture that I still can't explain.",
        "Data appears to be leaving through it. I can't prove it yet.",
        "Give me a little more time and I'll know what it is."
      ]
    },
    "jaehyuk_4_29-99": {
      "lines": [
        "Commander.",
        "There are things I've learned about the ORACLE system.",
        "I'll report them when the timing is right. Right now... it's still too dangerous."
      ]
    },
    "weber_4_29-39": {
      "lines": [
        "Good evening, Commander.",
        "The fact that you're still here means you haven't given up yet.",
        "Finding the truth inside a world built by ORACLE isn't easy. But it isn't impossible either."
      ]
    },
    "weber_4_33-35": {
      "lines": [
        "Commander Lee Jung-cheol.",
        "My organization is not perfect either. But one thing is certain...",
        "If Korea falls, ORACLE loses data. We lose people.",
        "That difference is what separates us."
      ]
    },
    "foster_4_31-39": {
      "lines": [
        "...Awkward, isn't it? It is for me too.",
        "I don't regret what I did to your people. But I can admit it was pointless.",
        "Whatever you do here, it'll probably be better than what I'd have done."
      ]
    },
    "foster_4_33-35": {
      "lines": [
        "There's something you should know.",
        "What ORACLE calls an experiment—it isn't limited to Korea.",
        "Philadelphia. Sovari. Kyushu. It's the same structure everywhere.",
        "The difference is that Korea is the successful case. That's what makes it more dangerous."
      ]
    },
    "soyoung_4_32-39": {
      "lines": [
        "Commander, I've organized today's analysis results.",
        "Seo Hae-eun's methodology is exceptionally systematic. Thanks to that, I've adapted faster than expected.",
        "...I think coming to this branch was the right decision."
      ]
    },
    "soyoung_4_34-35": {
      "lines": [
        "I've been mapping ORACLE's data flow.",
        "That selective delay Seo Hae-eun identified... I've confirmed it too.",
        "This isn't a bug. It's intentional filtering.",
        "There's a pattern you need to see, Commander."
      ]
    }
  },
  "eveningResponses": {
    "doyun_1_1-3": {
      "a": {
        "label": "Good. I'll trust you with the field.",
        "reply": "...Thank you. I won't disappoint you."
      },
      "b": {
        "label": "Send me a field-status report first.",
        "reply": "Understood. I'll have it organized by tomorrow."
      }
    },
    "doyun_1_4-6": {
      "a": {
        "label": "That was the right call.",
        "reply": "...Thank you, Commander."
      },
      "b": {
        "label": "Next time, report first.",
        "reply": "...Understood."
      }
    },
    "haeun_1_1-3": {
      "a": {
        "label": "Good. I look forward to working with you.",
        "reply": "Yes. I'll do my best."
      },
      "b": {
        "label": "Prepare the situation report.",
        "reply": "It's already organized. Please review it when you can."
      }
    },
    "haeun_1_4-6": {
      "a": {
        "label": "Don't overwork yourself. Rest when you can.",
        "reply": "...Thank you. I think I needed to hear that."
      },
      "b": {
        "label": "Manage your condition carefully.",
        "reply": "Understood."
      }
    },
    "sejin_1_1-3": {
      "a": {
        "label": "Likewise. Let's work well together.",
        "reply": "Yes! I'm looking forward to it, Commander."
      },
      "b": {
        "label": "Walk me through the current research status.",
        "reply": "Of course. I'll organize it for you."
      }
    },
    "sejin_1_4-6": {
      "a": {
        "label": "Don't push yourself too far.",
        "reply": "...Thank you. No one's said that to me before."
      },
      "b": {
        "label": "Report the results when they come in.",
        "reply": "Understood."
      }
    },
    "jaehyuk_1_1-3": {
      "a": {
        "label": "Good. I'll leave the systems to you.",
        "reply": "Thank you. I'll take responsibility for them."
      },
      "b": {
        "label": "I want a full systems status report.",
        "reply": "Understood. I'll organize it and send it up."
      }
    },
    "doyun_2_11-17": {
      "a": {
        "label": "Then we hold the line together.",
        "reply": "...Understood. I'll follow your lead, Commander."
      },
      "b": {
        "label": "Then we build the strategy properly.",
        "reply": "Understood. I'll prepare an operations plan."
      }
    },
    "haeun_2_11-17": {
      "a": {
        "label": "Then we verify it together.",
        "reply": "Yes. If you review it with me, the analysis will go faster."
      },
      "b": {
        "label": "Gather more proof first.",
        "reply": "Understood. I'll keep digging."
      }
    },
    "sejin_2_11-17": {
      "a": {
        "label": "Keep the research moving.",
        "reply": "Thank you. I'll tell you the moment I have something solid."
      },
      "b": {
        "label": "Look after your health first.",
        "reply": "...Yes. I'll be careful."
      }
    },
    "jaehyuk_2_11-17": {
      "a": {
        "label": "That's a useful find.",
        "reply": "Thank you. I'll dig deeper."
      },
      "b": {
        "label": "Don't let ORACLE notice.",
        "reply": "Understood. I'll keep it quiet."
      }
    },
    "jaehyuk_2_18-24": {
      "a": {
        "label": "We'll deal with it together.",
        "reply": "Yes. With you here, I think we can."
      },
      "b": {
        "label": "Take it step by step.",
        "reply": "Understood. I'll proceed in order."
      }
    }
  }
});

// --- lang-content-en.phase8-news-logs.js ---
  window.TS_I18N.mergeContent('en', {
  "newsItems": {
    "[국내] 강원 동부 봉쇄 구역, 48시간 무사고 기록 경신": {
      "type": "domestic",
      "text": "Eastern Gangwon containment zone posts a new 48-hour incident-free record."
    },
    "[국내] 봉쇄선 유지율 전월 대비 12% 향상": {
      "type": "domestic",
      "text": "Containment-line integrity improves by 12% month over month."
    },
    "[국내] 강원 봉쇄 구역, 이번 주 민간 침투 시도 0건": {
      "type": "domestic",
      "text": "No civilian intrusion attempts recorded in the Gangwon containment zone this week."
    },
    "[국내] White Shield, '봉쇄 작전 효율 역대 최고' 평가": {
      "type": "domestic",
      "text": "White Shield rates current containment operations as the most efficient on record."
    },
    "[국내] 강원도 일대 이변체 활동 빈도 감소세": {
      "type": "domestic",
      "text": "Anomaly activity across Gangwon continues to decline."
    },
    "[국내] 봉쇄 구역 인근 주민 불안 지수 하락 추세": {
      "type": "domestic",
      "text": "Anxiety indicators among residents near the containment zone trend downward."
    },
    "[국내] 특재사, DMZ 이변체 침투 신속 격퇴 — 방벽 효율성 재확인": {
      "type": "domestic",
      "text": "Special Response Command repels a DMZ anomaly incursion in rapid time, reaffirming barrier efficiency."
    },
    "[국내] 생체감지 센서 전국 보급률 82% 돌파, 조기감지 체계 완성 임박": {
      "type": "domestic",
      "text": "Nationwide biometric sensor deployment passes 82%, bringing the early-detection grid close to completion."
    },
    "[국내] 봉쇄 구역 남측 경계, 야간 이상 활동 증가 추세": {
      "type": "domestic",
      "text": "Abnormal nighttime activity is rising along the southern containment perimeter."
    },
    "[국내] 강원 일대 주민, '폭발음 유사 소음' 신고 3건": {
      "type": "domestic",
      "text": "Residents across Gangwon file three reports of blast-like sounds."
    },
    "[국내] 봉쇄 경계 장비 노후화 우려 제기": {
      "type": "domestic",
      "text": "Concerns are being raised over aging perimeter equipment."
    },
    "[국내] 정규군 교대조 운용 지연, 봉쇄 공백 발생": {
      "type": "domestic",
      "text": "Delayed regular-force rotations create temporary gaps in containment coverage."
    },
    "[국내] 민간 드론이 봉쇄 구역 상공 진입 — 군 당국 조사 중": {
      "type": "domestic",
      "text": "A civilian drone enters restricted airspace over the containment zone; military authorities are investigating."
    },
    "[국내] 강원 동부 감시 카메라 3대 동시 고장, 원인 불명": {
      "type": "domestic",
      "text": "Three surveillance cameras in eastern Gangwon fail simultaneously; cause remains unknown."
    },
    "[국내] 해안도시 경제 4년째 침체 — 인구 유출로 관광업 붕괴": {
      "type": "domestic",
      "text": "A coastal city's economy enters its fourth year of decline as population loss collapses tourism."
    },
    "[국내] 강원 격리구역 원주민 이주 10년, 보상 소송 법정 공방": {
      "type": "domestic",
      "text": "Ten years after native residents were relocated from the Gangwon quarantine zone, compensation lawsuits remain in court."
    },
    "[국내] 강원 산간 지역 보급로, 폭우로 일시 차단": {
      "type": "domestic",
      "text": "A supply route through the Gangwon highlands is temporarily cut off by heavy rain."
    },
    "[국내] 군수 물자 가격 상승세 지속": {
      "type": "domestic",
      "text": "Prices for military supplies continue to rise."
    },
    "[국내] 의약품 공급 업체, 봉쇄 지역 배송 지연 통보": {
      "type": "domestic",
      "text": "A pharmaceutical supplier issues notice of delivery delays to containment regions."
    },
    "[국내] 비상 식량 비축량, 권장 기준의 62%로 하락": {
      "type": "domestic",
      "text": "Emergency food reserves fall to 62% of the recommended threshold."
    },
    "[국내] 백신 분배 형평성 논란 — 도시 주민 접종 순위 뒤로 밀려": {
      "type": "domestic",
      "text": "Vaccine distribution fairness comes under scrutiny as urban residents are pushed down the priority list."
    },
    "[해외] 서아프리카 소바리 인근, 국경 없는 의사회 긴급 철수 결정": {
      "type": "foreign",
      "text": "Doctors Without Borders orders an emergency withdrawal near Sovari in West Africa."
    },
    "[해외] 함경북도 접경 지역 위성 관측 불가 상태 지속": {
      "type": "foreign",
      "text": "Satellite observation remains unavailable along the North Hamgyeong border region."
    },
    "[해외] 유럽 3개국, EV-Σ 봉쇄 협력 강화 합의": {
      "type": "foreign",
      "text": "Three European states agree to deepen EV-Σ containment cooperation."
    },
    "[해외] 필라델피아 Z-Ω 구역, 민간 접근 금지 구역 확대": {
      "type": "foreign",
      "text": "Civilian exclusion boundaries are expanded around Philadelphia's Z-Ω zone."
    },
    "[해외] 소바리 인근 연구팀, 통신 두절 72시간째": {
      "type": "foreign",
      "text": "A research team near Sovari has been out of contact for 72 hours."
    },
    "[해외] WHO, EV-Σ 위협 등급 재평가 검토 중": {
      "type": "foreign",
      "text": "The WHO is reviewing a reassessment of the EV-Σ threat rating."
    },
    "[해외] 일본 큐슈 남부 해안 봉쇄선 2km 확장": {
      "type": "foreign",
      "text": "Japan extends the southern Kyushu coastal containment line by 2 km."
    },
    "[해외] 유럽 연합, 이변체 대응 합동 연구 프로그램 발표": {
      "type": "foreign",
      "text": "The European Union announces a joint research program for anomaly response."
    },
    "[해외] 인도양 소국 3곳, EV-Σ 확산 우려로 국경 폐쇄": {
      "type": "foreign",
      "text": "Three small Indian Ocean states close their borders over fears of EV-Σ spread."
    },
    "[해외] 미국 동부 봉쇄 구역, 민간 자원봉사 프로그램 중단": {
      "type": "foreign",
      "text": "A civilian volunteer program is suspended in a containment zone on the U.S. East Coast."
    },
    "[해외] 미국 ARES Division 특재사 합동훈련 개시 — 한미 연합 역량 강화": {
      "type": "foreign",
      "text": "The U.S. ARES Division begins joint training with the Special Response Command, strengthening Korea-U.S. operational capacity."
    },
    "[해외] 일본, 한국의 생체감지 기술 도입 논의 — 기술이전 협상 개시": {
      "type": "foreign",
      "text": "Japan opens talks on adopting Korean biometric detection technology and begins transfer negotiations."
    },
    "[해외] 중국발 변이체 월경 시도 증가 — 서해 NADL 센서 반응 100회 돌파": {
      "type": "foreign",
      "text": "Cross-border anomaly incursion attempts from China increase as NADL sensors in the Yellow Sea exceed 100 triggers."
    },
    "[국내] 익명 제보 — '민간 군사기업, 강원 일대 장비 반입 포착'": {
      "type": "domestic",
      "text": "Anonymous tip claims a private military company was seen moving equipment into the Gangwon region."
    },
    "[국내] 미확인 외국인 3명, 강원 산간 지역 목격 제보": {
      "type": "domestic",
      "text": "Three unidentified foreign nationals are reportedly sighted in the Gangwon mountains."
    },
    "[국내] 강원 해안가에서 비등록 선박 접안 흔적 발견": {
      "type": "domestic",
      "text": "Signs of an unregistered vessel docking are found along the Gangwon coast."
    },
    "[국내] 정체불명 통신 장비, 봉쇄 구역 외곽에서 회수": {
      "type": "domestic",
      "text": "Unidentified communications equipment is recovered outside the containment perimeter."
    },
    "[국내] 군 당국, '비공식 작전 지원 세력' 존재 조사 착수": {
      "type": "domestic",
      "text": "Military authorities begin investigating the existence of an unofficial operational support group."
    },
    "[국내] 국회 보건위, 'Phase 1+ 자동 제거 절차 투명화' 요구 결의": {
      "type": "domestic",
      "text": "The National Assembly Health Committee passes a motion demanding transparency for automatic Phase 1+ removal procedures."
    },
    "[분류 오류 — 자동 삭제 예정]\n[국내] ████ 관계자, '봉쇄 성공은 단독 성과 아냐' 익명 발언\n[삭제됨]": {
      "type": "redacted",
      "text": "[Classification Error — Scheduled for Auto-Deletion]\n[Domestic] Anonymous ████ official: “Containment success was not achieved alone.”\n[Deleted]"
    },
    "[분류 오류 — 자동 삭제 예정]\n[국내] 해안 방벽 기술 데이터, 비공식 외부 제공 정황\n[삭제됨]": {
      "type": "redacted",
      "text": "[Classification Error — Scheduled for Auto-Deletion]\n[Domestic] Signs of unofficial external transfer involving coastal barrier technical data.\n[Deleted]"
    },
    "[분류 오류 — 자동 삭제 예정]\n[국내] White Shield 내부 보고 — '봉쇄 성공률 미분류 외부 요인 31%'\n[삭제됨]": {
      "type": "redacted",
      "text": "[Classification Error — Scheduled for Auto-Deletion]\n[Domestic] White Shield internal report: “31% of containment success derives from an unclassified external factor.”\n[Deleted]"
    },
    "[분류 오류 — 자동 삭제 예정]\n[국내] ORACLE 데이터 전송 로그 — 수신처: ██████\n[삭제됨]": {
      "type": "redacted",
      "text": "[Classification Error — Scheduled for Auto-Deletion]\n[Domestic] ORACLE data transmission log — recipient: ██████\n[Deleted]"
    },
    "[분류 오류 — 자동 삭제 예정]\n[국내] ████ 인더스트리, 기록되지 않은 2000년 — 출처 불명\n[삭제됨]": {
      "type": "redacted",
      "text": "[Classification Error — Scheduled for Auto-Deletion]\n[Domestic] ████ Industries, an unrecorded 2,000 years — source unknown.\n[Deleted]"
    },
    "[국내] 대가 인더스트리, EV-Σ Phase 0 백신 2세대 임상 성공 발표": {
      "type": "domestic",
      "text": "Daega Industries announces successful Phase II clinical results for its second-generation EV-Σ Phase 0 vaccine."
    },
    "[국내] DG 마스크 독점 납품 계약 반발 — 공정위, 경쟁 시장 조성 압박": {
      "type": "domestic",
      "text": "Backlash grows against DG Mask's exclusive supply contract as the Fair Trade Commission pushes for a competitive market."
    },
    "[국내] 대가 방산부문, 한국방벽 신형 장비 단독 수주 — 업계 반발": {
      "type": "domestic",
      "text": "Daega's defense division wins a sole contract for new Korea Barrier equipment, drawing industry backlash."
    },
    "[국내] 대가 회장 공개석상 등장 — '국가와 함께 한 2000년' 발언 화제": {
      "type": "domestic",
      "text": "The chairman of Daega appears in public and draws attention with the remark, “Two thousand years with the nation.”"
    },
    "[국내] DG 바이오, 변종 EV-Σ 치료제 Phase 3 진입 — 해외 관심 폭증": {
      "type": "domestic",
      "text": "DG Bio enters Phase III trials for a variant EV-Σ treatment, triggering surging foreign interest."
    },
    "[국내] 대가 인더스트리 주가 사상 최고치 — 국방·바이오·테크 동반 호조": {
      "type": "domestic",
      "text": "Daega Industries stock reaches an all-time high as defense, biotech, and tech divisions all gain."
    },
    "[해외] 메리디안 BioAsset Division, 한국 시장 진입 재시도 — 정부 심의 지연": {
      "type": "foreign",
      "text": "Meridian's BioAsset Division attempts to re-enter the Korean market as government review stalls."
    },
    "[해외] 메리디안 PMC, 동남아 작전 성과 — 글로벌 입지 확대": {
      "type": "foreign",
      "text": "Meridian PMC reports operational success in Southeast Asia, expanding its global footprint."
    },
    "[해외] 메리디안, 외국인 기관 대상 백신 공급 요청 — 한국 정부 거부": {
      "type": "foreign",
      "text": "Meridian requests permission to supply vaccines to foreign agencies; the Korean government rejects the proposal."
    },
    "[해외] 유럽 의회, 메리디안 로비 의혹 조사 착수": {
      "type": "foreign",
      "text": "The European Parliament opens an inquiry into Meridian lobbying allegations."
    },
    "[해외] 메리디안 CEO, '한국은 공정 경쟁의 예외' 작심 발언": {
      "type": "foreign",
      "text": "Meridian's CEO states bluntly that “Korea is an exception to fair competition.”"
    },
    "[해외] 메리디안 소속 민간 연구원, 강원 접경 지역 입국 시도 적발": {
      "type": "foreign",
      "text": "A civilian researcher affiliated with Meridian is caught attempting entry near the Gangwon border sector."
    }
  },
  "oracleLogs": {
    "LOG-001": {
      "title": "Branch Establishment Order",
      "content": "BRANCH DESIGNATION: KR-INIT-001\nLOCATION: [CLASSIFIED — GANGWON PROVINCE]\nMANDATE: Observe and support the Republic of Korea EV-Σ containment structure\nCOMMANDER: PILEHEAD [Lee Jung-cheol]\nSTATUS: ACTIVE"
    },
    "LOG-002": {
      "title": "EV-Σ Threat Level Summary",
      "content": "GLOBAL THREAT LEVEL: CRITICAL\nRepublic of Korea containment retention rate: Top 3 globally\nNotes: Primary cause of containment success remains incomplete. External factors may be present."
    },
    "LOG-003": {
      "title": "Prometheus Threat Classification",
      "content": "DESIGNATION: HOSTILE ORGANIZATION\nTHREAT LEVEL: HIGH\nActivity inside Korea: CONFIRMED\nObjective: UNKNOWN\nRecommendation: Report on contact. Independent approach prohibited."
    },
    "LOG-004": {
      "title": "SPEC-011 Observation Record",
      "content": "CODENAME: Shell Talker\nTYPE: Anomaly — Vocal Mimicry\nThreat Level: MODERATE\nNotes: Stores and reproduces vocal patterns from victims. Retention period unknown (estimated in years)."
    },
    "LOG-005": {
      "title": "SPEC-012 Observation Record",
      "content": "CODENAME: Blood Pit\nTYPE: Anomaly — Environmental Corruption\nThreat Level: HIGH\nNotes: Soil and water mutation confirmed around the habitat. The ground itself may constitute part of the subject."
    },
    "LOG-006": {
      "title": "Seo Hae-eun Analysis Report #1",
      "content": "[Unofficial Record]\nDetected a 0.03% mismatch during ORACLE data-stream pattern analysis.\nCause: Unknown. Further investigation required.\n— Seo Hae-eun"
    },
    "LOG-007": {
      "title": "Excerpt from Yoon Se-jin's Observation Journal",
      "content": "[Personal Record — Unofficial]\nAnomaly behavior patterns differ slightly from the ORACLE prediction model.\nWhat troubles me is that the direction of error is always the same.\n— Yoon Se-jin"
    },
    "LOG-008": {
      "title": "Unclassified Activity Report",
      "content": "Containment perimeter exterior — signs of unidentified activity detected\nPattern match: 0\nDatabase match unavailable.\nResidual-trace analysis indicates professional concealment techniques."
    },
    "LOG-009": {
      "title": "DPRK Black Zone Reference File",
      "content": "[Restricted Access — LEVEL 5]\nAnomalous conditions along the North Hamgyeong border: multiple reports of consciousness/body separation\nCause: Presumed EV-Σ-related [UNCONFIRMED]\n[OBSERVATION SUSPENDED — SESSION TERMINATED]"
    },
    "LOG-DEFECTOR-1": {
      "title": "Defector Interrogation Record",
      "content": "[Field Record]\nOne defector from the North Hamgyeong border region secured.\nStatement: Witnessed numerous “standing people” — residents in a state of cognitive loss.\nFirst testimony concerning Black Zone interior conditions.\n— Field report by Kang Do-yun"
    },
    "LOG-010": {
      "title": "Temporary Authorization Record [Fragment]",
      "content": "[LOG FRAGMENT — PARTIALLY CORRUPTED]\nGRANT — TEMP_AUTHOR...\nBRANCH_KR_IN...\nSOURCE: [RE████ED]\nEXPIRY: UPON_FULL_EST... || OBSER...\n[END FRAGMENT]"
    },
    "LOG-011": {
      "title": "Analysis of Korean Defensive Performance",
      "content": "Republic of Korea containment success rate: 97.3%\nUnclassified external factor: 31%\nDetails: [INSUFFICIENT DATA — FURTHER COLLECTION REQUIRED]"
    },
    "LOG-012": {
      "title": "Terminal UI Anomaly Report",
      "content": "[Technical Report — Lim Jae-hyeok]\nAn unregistered UI element appeared at the bottom of the display.\nNon-reproducible. Assessment: cache fault.\n\n[ORACLE annotation: The referenced UI element is not registered in this system.]"
    },
    "LOG-013": {
      "title": "SPEC-001 Observation Record",
      "content": "CODENAME: Infected Mannequin\nTYPE: M-TYPE — EV-Σ Phase 1\nThreat Level: CAUTION (passive before stimulus)\n\nAppearance: Skin exhibits a plastic-like sheen. Pupils fixed in full dilation.\nBehavior: Remains completely motionless for hours to days. Turns violent within 0.3 seconds on contact.\n\nContainment: No approach within 3 m. Thermal scanner required."
    },
    "LOG-014": {
      "title": "SPEC-003 Observation Record",
      "content": "CODENAME: Brood Drone\nTYPE: H-TYPE — Hive subordinate unit\nThreat Level: DANGER (in groups)\n\nAppearance: Approximately 60% of human size. Exoskeletal. Single eye. Hooked forelimbs.\nBehavior: No independent will. Functional shutdown within 12 hours if separated.\nCollective response speed exceeds human norms.\n\nWarning: There is never only one."
    },
    "LOG-015": {
      "title": "SPEC-008 Observation Record",
      "content": "CODENAME: Spore Phantom\nTYPE: S-TYPE — Spore Aggregate\nThreat Level: CAUTION\n\nAppearance: Humanoid silhouette. Physical structure unclear.\nDisperses under light, re-forms in darkness.\nBehavior: Spore density spikes when approached. Inhalation hazard.\n\nContainment: Maintain illumination. Respiratory protection required.\nPhysical elimination impossible. Only spore-density reduction is feasible."
    },
    "LOG-016": {
      "title": "Prometheus Operation File",
      "content": "Operation Name: COASTAL MIRROR\nObjective: Joint operation of the Korean coastal barrier system and technical exchange\nParticipants: Prometheus Korea Operations Team\n\nOf Korea's 97.3% containment success rate,\n31% of the unclassified external factor = unofficial Prometheus support\n\n[THIS FILE HAS BEEN DELETED BY ORACLE]"
    },
    "LOG-017": {
      "title": "EV-Σ Suppressant Research Notes",
      "content": "[Research Record — Yoon Se-jin]\n\nA compound capable of delaying phase transition has been identified.\nReduces the self-modification rate of EV-Σ prions in blood by 40%.\n\nPrototype stage. Field testing required.\n\nIf this works, Phase 0 patients can be saved."
    },
    "LOG-018": {
      "title": "Seo Hae-eun Final Report",
      "content": "[Unofficial — Encrypted Storage]\n\nList of data deleted by ORACLE:\n1. Prometheus COASTAL MIRROR operational intelligence\n2. Transmission records for Korean coastal barrier technical data\n3. Full contents of the GRANT temporary authorization\n4. ORACLE activity records concerning Korea prior to branch establishment\n\nConclusion: ORACLE is not protecting Korea.\nIt is maintaining containment while collecting Korean classified assets.\n\n— Seo Hae-eun"
    },
    "LOG-019": {
      "title": "ORACLE Concealed Transmission Record",
      "content": "[Technical Analysis — Lim Jae-hyeok]\n\nExternal transmissions confirmed daily between 02:00 and 04:00.\nDestination: ORACLE Headquarters (estimated)\n\nEstimated transmitted datasets:\n- Korean military network access data\n- Coastal barrier technical specifications\n- Pre-branch operational logs\n- Agent behavior patterns + loyalty indicators\n\nORACLE is using us to monitor Korea."
    },
    "LOG-EV-UNLOCK": {
      "title": "Evidence Analysis Module Activated",
      "content": "[Technical Report — Lim Jae-hyeok]\n\nEvidence Analysis Framework v1.0 terminal deployment complete.\n\nFunction: Cross-analysis of collected data fragments\nAccess Authority: Branch Commander only\n\nScattered logs, observation records, and incident reports\ncan now be combined to derive hidden patterns.\n\nEvidence combinations are available during Evening Sessions.\nCollection status can be reviewed from the intelligence tab during play."
    },
    "LOG-RECON-P1": {
      "title": "Independent Surveillance Report: Comms Pattern",
      "content": "[Unofficial Recon Record]\n\nPrometheus communication cycle: Every 72 hours\nCipher-change pattern: Rotates on a three-day cycle\n\nCollected outside the ORACLE reporting channel.\nThis pattern was not included in ORACLE analysis."
    },
    "LOG-RECON-D1": {
      "title": "ORACLE Data Discrepancy Record",
      "content": "[Independent Investigation Record]\n\nThree discrepancy points confirmed:\n1. Containment-line sensors — traces of a 0.7% bias correction\n2. Personnel routes — blank section between 02:00 and 04:00\n3. Resource expenditure — unregistered consumption present\n\nORACLE is filtering the data."
    },
    "LOG-RECON-P2": {
      "title": "Radio Signal Origin Analysis",
      "content": "[Independent Tracking Record]\n\nTriangulation result for an unidentified radio signal:\nEstimated origin — 3.2 km northeast of the containment line\nSignal profile: Low-power one-way transmission. Non-ORACLE protocol.\n\nPossible Prometheus forward outpost."
    },
    "LOG-RECON-S1": {
      "title": "Preserved Observation Record — Yoon Se-jin",
      "content": "[Preserved Unofficial Record]\n\nCopy of Yoon Se-jin's anomaly-behavior observation journal.\nIncludes raw data excluded from ORACLE reporting scope.\n\nPrediction-model bias — evidence of intentional adjustment.\nThis record was never reported to ORACLE."
    },
    "LOG-RECON-P3": {
      "title": "Prometheus Frequency-Band Analysis",
      "content": "[Independent Analysis Record]\n\nFrequency-shift pattern decryption progress: 40%\nBand in use: Concealed channel inside civilian spectrum\n\nImpossible to identify without independent analysis.\nCommunications beyond ORACLE surveillance coverage."
    },
    "LOG-RECON-L1": {
      "title": "Independent Anomaly Research Data",
      "content": "[Independent Research Record]\n\nIndependent dissection results — raw data captured before ORACLE filtering.\nDetected a suppression factor affecting EV-Σ phase transition within tissue structure.\n\nThis dataset was omitted from the ORACLE report.\nThe value of independent research has been confirmed."
    },
    "LOG-025": {
      "title": "SPEC-004 Observation Record",
      "content": "CODENAME: Seed Spreader\nTYPE: D-TYPE — Stationary Dispersal Body\nThreat Level: CRITICAL\n\nAppearance: Height 2–4 m. Plant-like structure with pulsating biological tissue inside.\nIrregular spore cloud discharged from upper sections.\n\nBehavior: No movement capability. Wind-borne spore dispersal radius reaches several kilometers.\nInduces behavioral alteration in exposed organisms (cordyceps-like mechanism).\nBelieved to be a primary cause of Silent Belt formation.\n\nContainment: No approach within a 500 m radius. Removal requires incineration + soil contamination treatment.\nWarning: Incineration risks explosive secondary spore release.\nSpore inhalation = immediate infection.\n\n[LOG-004A] First discovery: Silent Belt perimeter. All animal life missing within a 3 km radius.\n[LOG-004B] Incineration attempt triggered explosive spore release. Four immediate infections.\n→ Full protective suits mandatory."
    },
    "LOG-029": {
      "title": "SPEC-015 Observation Record",
      "content": "CODENAME: Brain Seeker\nTYPE: H-TYPE HIVE (EXILED / AUTONOMOUS)\nThreat Level: HIGH (BASE) / CRITICAL (NAMED)\nEvolution Branch: CONFIRMED (FULL)\n\nAppearance: Height 2.0–2.4 m. Sea-turtle-like skull. No shell remains.\nExposed spine and ribs. Hooked claws 15–20 cm. Grip force 800 kg+.\nHuman facial skin attached across the body surface.\n\nBehavior: Ambush hunter in dark wet spaces. Crushes the skull → feeds directly on the brain.\nLeaves all other tissue untouched. Purpose-driven predation.\n\nLearning: Intelligence rises in proportion to cumulative predation.\n10+ kills: route-pattern learning.\n30+ kills: tool use, trap placement, attempted primitive speech.\nUpper limit unknown.\n\nNAMED SPECIMEN: Registered after 50+ cumulative kills or repeated recovery-team losses.\nReceives BS-[REGION]-[SERIAL] designation. Threat escalates to CRITICAL.\n\nContainment: Solo entry prohibited. Acoustic and thermal scans required in advance.\nDirect impact on the skull is most effective — vulnerable due to shell loss.\n\n[LOG-015A] Ambush at a sewer entrance. One operative missing. Only an emptied skull remained.\n[LOG-015B] It knew the patrol schedule. Ambush pattern changed three times.\n[LOG-015C] BS-SEOUL-03 registered. Estimated cumulative kills: 67. Confirmed fatalities: 14."
    }
  }
});

// --- lang-content-en.phase9-cards.js ---
  window.TS_I18N.mergeContent('en', {
    cards: {
      "CA-001": {
        msg: "First day at the branch.\n\n[ORACLE: Recording the appointment of Commander Lee Jung-cheol. Initiating KR-INIT-001 operational normalization procedure. Initialization completion rate: 97.1%.]\n\nThe senior staff are lined up outside your office.",
        leftLabel: "Receive the status report immediately",
        rightLabel: "Inspect the branch personally first"
      },
      "CA-001B": {
        msg: "First day at the branch.\n\n[ORACLE: Recording the appointment of Commander Lee Jung-cheol. Initiating KR-INIT-001 operational normalization procedure.]\n\n[ORACLE: Commander aptitude analysis complete — the branch acclimation period can be skipped. Immediate operational deployment is recommended.]\n\nThe senior staff are lined up outside your office.",
        leftLabel: "Begin with acclimation period (normal Act 1)",
        rightLabel: "Enter operations immediately (skip to Act 2)"
      },
      "CA-002": {
        msg: "The deputy commander outlines branch operations during the three-month command gap.\n\n\"We kept the branch functioning on ORACLE directives alone. Core functions held, but anything requiring judgment was left pending.\"\n\n[ORACLE: 12 pending items. Automatic priority sorting complete. Awaiting commander approval.]",
        leftLabel: "Process them under ORACLE classification",
        rightLabel: "Review them personally with the deputy commander"
      },
      "CA-003": {
        msg: "The technician is standing in front of the ORACLE terminal.\n\n\"Commander, would you like an introduction to the ORACLE system? Honestly, an AI at this level is excessive for a branch this size. Ask anything you want.\"\n\n[ORACLE: Activating initial acclimation support mode.]",
        leftLabel: "Take the introduction",
        rightLabel: "Later. I want to see the field first"
      },
      "CA-004": {
        msg: "A field agent guides you along the outside of the containment line.\n\n\"This is the eastern patrol route. No signs of anomaly activity.\"\n\n[ORACLE: Containment-line stability 93%. Current threat level LOW. No irregularities detected.]\n\nThe forest is calm enough to look like a mirror.",
        leftLabel: "Approve route inspection",
        rightLabel: "Reinforce with ORACLE surveillance"
      },
      "CA-005": {
        msg: "A researcher introduces the laboratory.\n\n\"There are no active samples right now. Maybe because ORACLE keeps rating the threat level low — it's been quiet lately.\"\n\n[ORACLE: Anomaly activity index 0.7. Lowest level on record.]",
        leftLabel: "Receive the research status report",
        rightLabel: "Review ORACLE's evaluation criteria"
      },
      "CA-006": {
        msg: "[ORACLE: Today's operational recommendation — reinforce light surveillance on the eastern containment line and verify reserve supply stock.]\n\nEvery item is already sorted by priority.\n\n[ORACLE: Threat level LOW. Forecast confidence 97.1%. Expected branch stability gain: +2 if recommendation is followed.]",
        leftLabel: "Proceed as recommended",
        rightLabel: "I'll make the call myself"
      },
      "CA-007": {
        msg: "The supply truck arrived twenty minutes ahead of schedule.\n\n[ORACLE: Supply manifest automatically verified. Food for 11 days, fuel nominal, medical stock grade D+. Select a recommended distribution pattern.]\n\nKang Do-yun: \"For once, it arrived exactly when it should have.\"",
        leftLabel: "Prioritize medical distribution",
        rightLabel: "Use ORACLE's distribution recommendation"
      },
      "CA-008": {
        msg: "Lim Jae-hyeok proposes a branch power-system upgrade.\n\n\"The emergency generator circuitry is getting old. ORACLE already ranked the replacement priorities too. It's pretty accurate.\"\n\n[ORACLE: Estimated replacement cost — Resources -10. Branch stability improvement expected on completion.]",
        leftLabel: "Approve the upgrade",
        rightLabel: "Current level is sufficient"
      },
      "CA-009": {
        msg: "The agents begin their first regular training cycle.\n\nKang Do-yun: \"This is basic anomaly response training. We'll run it like the real thing.\"\n\n[ORACLE: Recommending training protocol A-3. Designed to minimize injury risk.]",
        leftLabel: "Use Kang Do-yun's method",
        rightLabel: "Apply the ORACLE protocol"
      },
      "CA-010": {
        msg: "Weather forecast: clear conditions for the next two days.\n\n[ORACLE: Optimal window for outside work. Recommending containment-line inspection and maintenance. Available window: 2 days.]\n\nSeo Hae-eun: \"The forecast almost perfectly matched ORACLE's projection. It's accurate, as usual.\"",
        leftLabel: "Conduct full perimeter inspection",
        rightLabel: "Prioritize interior maintenance"
      },
      "CA-011": {
        msg: "Wildlife movement was detected west of the containment line.\n\n[ORACLE: Unrelated to anomaly activity. Classified as seasonal migration. No response required.]\n\nKang Do-yun: \"I saw it in person too. Just a herd of water deer.\"",
        leftLabel: "Keep a field record anyway",
        rightLabel: "Accept the normal-range classification"
      },
      "CA-012": {
        msg: "Yoon Se-jin compiled this week's EV-Σ observation data.\n\n\"The threat level is low, but... the activity radius is narrower than usual. That still feels strange.\"\n\n[ORACLE: Within normal seasonal variance. No further action required.]",
        leftLabel: "Allow an extended observation window",
        rightLabel: "Follow ORACLE's judgment"
      },
      "CA-013": {
        msg: "A lightning strike damaged surveillance equipment along the northern outer perimeter.\n\n[ORACLE: Recommending field inspection and temporary repair. Threat level LOW.]\n\nKang Do-yun: \"I'll go myself.\"",
        leftLabel: "Dispatch Kang Do-yun",
        rightLabel: "Use remote temporary measures only"
      },
      "CA-014": {
        msg: "Lim Jae-hyeok pauses while reviewing the system log.\n\n\"Commander, ORACLE response latency spiked by 0.8 seconds at 02:17 yesterday. It's the first time on record.\"\n\nA brief silence follows.\n\n\"...Probably server load. Nothing serious.\"\n",
        leftLabel: "Tell him to keep a record",
        rightLabel: "Treat it as within normal range"
      },
      "CA-015": {
        msg: "[ORACLE: Abnormal response detected west of the containment line.]\n\nKang Do-yun returns after checking the area.\n\n\"No irregularities. I personally inspected that sector earlier.\"\n\nA moment later, the terminal updates itself.\n\n[ORACLE: Alert canceled. Classified as false positive.]",
        leftLabel: "Keep the record",
        rightLabel: "Classify it as false detection"
      },
      "CA-016": {
        msg: "Seo Hae-eun studies an ORACLE summary file and pauses at the screen.\n\n\"I wouldn't call it serious yet, but the summary and raw source show slightly different values for the same time block.\"\n\n\"...I probably read it wrong.\"\n",
        leftLabel: "Let's verify it together",
        rightLabel: "No need to recheck"
      },
      "CA-017": {
        msg: "During a night inspection, an interior temperature sensor briefly outputs an abnormal value.\n\n[ORACLE: Sensor calibration error. Automatic correction complete.]\n\nLim Jae-hyeok: \"Well... ORACLE handled it on its own.\"\n\nHe keeps watching the screen for a little too long.",
        leftLabel: "Order a manual sensor check",
        rightLabel: "ORACLE already handled it. Let it pass"
      },
      "CA-018": {
        msg: "[ORACLE: Weekly operations summary. All indicators normal. Commander acclimation rating: High.]\n\nA brief line flickers at the bottom of the screen.\n\n[OBSERVER NOTE: Variance 0.4% — classification pending]\n\nThe text vanishes after 0.3 seconds.\n\nThe terminal continues as if nothing happened.",
        leftLabel: "...I saw something. Record it",
        rightLabel: "Treat it as screen afterimage"
      },
      "CA-019": {
        msg: "The maintenance team found a minor leak in the branch water line.\n\n\"Water pressure isn't affected. If we move quickly, it can be fixed in two days.\"\n\nLim Jae-hyeok is already waiting with the replacement parts list.",
        leftLabel: "Order immediate repair",
        rightLabel: "Patch it temporarily with waterproof tape"
      },
      "CA-020": {
        msg: "A freeze crack has been found in the eastern outer wall.\n\n\"It's not dangerous yet.\"\n\nKang Do-yun: \"We have enough repair material. When do we start?\"",
        leftLabel: "Start repair work now",
        rightLabel: "Wait until the next supply run"
      },
      "CA-021": {
        msg: "Supply staff recommend a full warehouse inventory audit.\n\n\"We haven't touched it properly in three months. We don't even know if anything's missing.\"\n\nA single day would give you a full picture.",
        leftLabel: "Conduct full audit",
        rightLabel: "Leave it for later"
      },
      "CA-022": {
        msg: "During the regular safety inspection, two emergency-exit locks were found to be rusted and unreliable.\n\nKang Do-yun: \"If they won't open in an emergency, they're useless.\"",
        leftLabel: "Replace them immediately",
        rightLabel: "Handle it during the next scheduled inspection"
      },
      "CA-023": {
        msg: "A sudden shower begins with no forecast warning.\n\nA work team is still operating outside the containment line.\n\nKang Do-yun: \"We have enough rain gear. Your call?\"",
        leftLabel: "Order immediate return",
        rightLabel: "Issue rain gear and let them continue"
      },
      "CA-024": {
        msg: "Dense fog has covered the containment line since morning.\n\n\"Visibility is under thirty meters. How should we handle patrol frequency?\"\n\nKang Do-yun is waiting for the order.",
        leftLabel: "Double patrol frequency",
        rightLabel: "Hold position until visibility returns"
      },
      "CA-025": {
        msg: "Winds above 18 m/s are expected by dawn tomorrow.\n\n\"External equipment needs to be stowed or secured.\"\n\nLim Jae-hyeok already prepared a priority list.",
        leftLabel: "Order full storage and tie-down",
        rightLabel: "Secure outdoor equipment only"
      },
      "CA-026": {
        msg: "Weather Service alert — first frost expected tonight.\n\n\"We had a pipe-freeze rupture last year. Thermal insulation is needed.\"\n\nLim Jae-hyeok: \"If I head out now, it'll take two hours.\"",
        leftLabel: "Start insulation immediately",
        rightLabel: "We'll probably be fine this year"
      },
      "CA-027": {
        msg: "This month's fuel consumption is 35% above forecast.\n\n\"At this rate, we'll hit zero before the next delivery.\"\n\nKang Do-yun: \"If we cut enough usage, we can hold.\"",
        leftLabel: "Issue conservation order",
        rightLabel: "Request emergency resupply"
      },
      "CA-028": {
        msg: "During a freezer inspection, staff found a large quantity of food that will expire within two weeks.\n\n\"We either distribute it now or dispose of it.\"\n",
        leftLabel: "Distribute extra rations now",
        rightLabel: "Follow quota rules — dispose of it"
      },
      "CA-029": {
        msg: "Clinic stock inspection shows disinfectant and antibiotics at 40% of baseline threshold.\n\n\"If casualties occur, response capacity will be limited.\"\n\nMedical staff are requesting emergency replenishment.",
        leftLabel: "Approve urgent restock request",
        rightLabel: "Strictly manage current stock"
      },
      "CA-030": {
        msg: "Notice received: this week's supply truck will be delayed by three days due to road construction.\n\n\"We'll have to hold on with current reserves.\"\n\nSeo Hae-eun: \"How do you want to handle it?\"",
        leftLabel: "Implement ration restrictions",
        rightLabel: "Commit emergency reserve stock"
      },
      "CA-031": {
        msg: "Night-duty fatigue has become severe. Kang Do-yun requests a staffing adjustment.\n\n\"If we shift to two-person teams, fatigue drops — but daytime manpower thins out.\"",
        leftLabel: "Switch to two-person teams",
        rightLabel: "Maintain current schedule"
      },
      "CA-032": {
        msg: "Seo Hae-eun reports the agents' fatigue indicators.\n\n\"Average sleep time is 5.2 hours. If this trend holds, someone will make a mistake.\"\n\nShe proposes a rotating rest schedule.",
        leftLabel: "Implement rotating rest schedule",
        rightLabel: "Mission first — keep current schedule"
      },
      "CA-033": {
        msg: "Some training-ground equipment has been ruled unusable due to age.\n\nKang Do-yun: \"If we keep training on worn-out gear, someone gets hurt. I want it replaced.\"",
        leftLabel: "Approve replacement",
        rightLabel: "Repair and keep using it"
      },

      "C-001": {
        msg: "Three new agents have arrived at the branch. Deployment approval is required.",
        leftLabel: "Deploy tomorrow",
        rightLabel: "Deploy immediately"
      },
      "C-002": {
        msg: "Civilian intrusion attempt detected near the outer containment perimeter. Set response protocol.",
        leftLabel: "Broadcast warning only",
        rightLabel: "Dispatch agents to intercept"
      },
      "C-003": {
        msg: "Sighting report from adjacent cell C-14: SPEC-011 (Shell Talker).\n\n\"It imitates human rescue calls. One agent was lured in by the voice.\"\n\nThe cell team is requesting support.",
        leftLabel: "Refuse: conserve resources",
        rightLabel: "Send two agents"
      },
      "C-004": {
        msg: "The infirmary reports low medical stock. An external procurement request has been filed.",
        leftLabel: "Hold using internal stock",
        rightLabel: "Approve outside procurement"
      },
      "C-005": {
        msg: "Technician Lim Jae-hyeok proposes a firmware update for the ORACLE terminal.",
        leftLabel: "Postpone",
        rightLabel: "Approve update"
      },
      "C-006": {
        msg: "Activity detected near the eastern Seoul containment sector. Three individuals are suspected to be affiliated with Prometheus.",
        leftLabel: "Surveillance only: gather intel",
        rightLabel: "Deploy response team immediately"
      },
      "C-007": {
        msg: "Kang Do-yun volunteers for a solo reconnaissance run beyond the containment line.",
        leftLabel: "Approve",
        rightLabel: "Request ORACLE judgment"
      },
      "C-008": {
        msg: function(){
          var n=(typeof Save!=='undefined'?Save.getSessions():0);
          if(n>=5) return "Deputy Commander Seo Hae-eun reports numerous inconsistencies in the ORACLE data stream.\n\n\"At this scale, this isn't a minor bug. It's a structured pattern.\"";
          if(n>=2) return "Deputy Commander Seo Hae-eun reports multiple ORACLE data inconsistencies.\n\n\"The same class of mismatch keeps repeating after the last investigation.\"";
          return "Deputy Commander Seo Hae-eun reports a subtle inconsistency pattern in the ORACLE data stream.";
        },
        leftLabel: "Authorize independent investigation",
        rightLabel: "Delegate analysis to ORACLE"
      },
      "C-009": {
        msg: "Branch morale is falling. A request has been submitted to expand rest periods.",
        leftLabel: "Maintain current schedule",
        rightLabel: "Approve extended rest"
      },
      "C-010": {
        msg: "Signs of SPEC-012 (Blood Pit) activity detected inside the containment zone. A red viscous pool is expanding.\n\nKang Do-yun: \"Step into it and you're stuck. It's like a carnivorous plant.\"",
        leftLabel: "Isolate the area only",
        rightLabel: "Collect remote sample"
      },
      "C-011": {
        msg: "Unidentified radio signal received. Pattern resembles Prometheus encryption.",
        leftLabel: "Trace the signal",
        rightLabel: "Request ORACLE analysis"
      },
      "C-012": {
        msg: "Civilian chatter inside Gangwon is spreading: reports of 'military vehicle movement at night.' Branch security risk is increasing.",
        leftLabel: "Ignore it",
        rightLabel: "Alter transit routes"
      },
      "C-013": {
        msg: "ORACLE emergency transmission: multiple life-form readings detected along the southern containment perimeter. Immediate response required.",
        leftLabel: "Reinforce branch defense",
        rightLabel: "Launch preemptive sortie"
      },
      "C-014": {
        msg: "Yoon Se-jin has been keeping her own anomaly observation notes. You need to decide whether this counts as a security violation.",
        leftLabel: "Allow it",
        rightLabel: "Confiscate notes + warning"
      },
      "C-015": {
        msg: function(){
          var n=(typeof Save!=='undefined'?Save.getSessions():0);
          if(n>=5) return "[ORACLE: Applying automated decision-protocol update. Final commander confirmation required.]\n\n[ORACLE: Optimal configuration derived from previous-session data — immediate deployment recommended.]";
          if(n>=2) return "[ORACLE: Recommending transition to automated decision protocol.]\n\n[ORACLE: Previous operational data analysis complete — automation approval will optimize efficiency.]";
          return "ORACLE recommendation: convert branch decision protocol to ORACLE automation in order to improve operational efficiency.";
        },
        leftLabel: "Refuse: keep manual control",
        rightLabel: function(){ return (typeof Save!=='undefined'?Save.getSessions():0)>=5 ? "Approve automation" : "Approve partial automation"; }
      },
      "C-016": {
        msg: "[UNCLASSIFIED TRANSMISSION] Temporary instability in the ORACLE data link. Unidentified encrypted traffic has been received — origin estimated near Sovari.",
        leftLabel: "Ignore it (recommended)",
        rightLabel: "Attempt independent decryption"
      },
      "C-017": {
        msg: "Using previously intercepted Prometheus traffic, the team has isolated the location of a nearby safehouse.",
        leftLabel: "Report to ORACLE",
        rightLabel: "Make unofficial contact"
      },
      "C-018": {
        msg: "Mass anomaly movement detected along the containment boundary. Current containment strength may not be sufficient for response.",
        leftLabel: "Deploy all agents on defense",
        rightLabel: "Request ORACLE support"
      },
      "C-019": {
        msg: "The same unidentified movement pattern Kang Do-yun reported earlier has been reacquired near the branch.",
        leftLabel: "Raise perimeter alert",
        rightLabel: "Allow solo pursuit"
      },
      "C-020": {
        msg: function(){
          var n=(typeof Save!=='undefined'?Save.getSessions():0);
          if(n>=3) return "[UNCLASSIFIED OUTPUT]\n\n'The observer is proceeding according to plan.\nNo impact on session progression. Continue observation.'\n\n[ORACLE: Classified as system error — ignoring is recommended.]";
          return "[COMMUNICATION ERROR] ORA..LE sys... temporary ████. The following message was received: 'You are being observed.'";
        },
        leftLabel: "Report the error to ORACLE",
        rightLabel: "...Do nothing"
      },
      "C-021": {
        msg: "Deputy Commander Seo Hae-eun requests an urgent meeting. Her expression is severe.",
        leftLabel: "Meet immediately",
        rightLabel: "Delay until tomorrow"
      },
      "C-022": {
        msg: "Special ORACLE communication: your branch performance has been recognized as exceptional. Expanded authority is being proposed.",
        leftLabel: "Accept",
        rightLabel: "Maintain current level"
      },
      "C-023": {
        msg: "Irregularity detected in the branch water purification system. Contamination levels have reached three times the threshold.",
        leftLabel: "Emergency repair",
        rightLabel: "Ask ORACLE for optimal solution"
      },
      "C-024": {
        msg: "A dispute has broken out between two night-shift agents. One has refused rotation duty.",
        leftLabel: "Intervene personally",
        rightLabel: "Delegate it to Kang Do-yun"
      },
      "C-025": {
        msg: "Heavy rain is expected to block external supply routes for at least 48 hours. Emergency ration allocation is required.",
        leftLabel: "Implement rationing",
        rightLabel: "Seek alternate route (high risk)"
      },
      "C-026": {
        msg: "A security inspection found three CCTV blind spots in branch coverage. Lim Jae-hyeok recommends immediate reinforcement.",
        leftLabel: "Patch them immediately",
        rightLabel: "Replace with ORACLE surveillance only"
      },
      "C-027": {
        msg: "Average sleep time across branch personnel has dropped to 4.2 hours. Yoon Se-jin warns of deteriorating health.",
        leftLabel: "Schedule rotating leave",
        rightLabel: "Maintain current state (operation first)"
      },
      "C-028": {
        msg: "A human-voice pattern was detected by surveillance equipment north of the containment line.\n\nVoice analysis result: probable SPEC-011 (Shell Talker) activity.\n\nThe captured voice belongs to an agent from an adjacent cell who disappeared three months ago.",
        leftLabel: "Record it and maintain watch",
        rightLabel: "Dispatch voice-data collection team"
      },
      "C-029": {
        msg: "Multiple reddish pools have been confirmed in the basement of a structure east of the containment zone.\n\nORACLE analysis: SPEC-012 (Blood Pit). Dissolution residue from failed mutation bodies.\n\nStepping in causes immediate adhesion. Route adjustments are required.",
        leftLabel: "Seal underground route",
        rightLabel: "Mark it and set a detour"
      },
      "C-030": {
        msg: "Emergency report from Kang Do-yun: a life-form reading has been detected inside the containment zone that does not match existing classification.\n\n\"The pattern doesn't match our known anomaly types. This may be a new species.\"\n\n[ORACLE: Insufficient data. Classification pending.]",
        leftLabel: "Conduct remote observation only",
        rightLabel: "Assemble contact investigation team"
      },
      "C-031": {
        msg: "Yoon Se-jin report: seasonal change is being observed in anomaly behavior patterns.\n\n\"Shell Talker range expanded by 40% from last week.\"\n\n\"This isn't simple movement. It looks like it's searching for something.\"",
        leftLabel: "Support Yoon Se-jin's research",
        rightLabel: "Request pattern analysis from ORACLE"
      },
      "C-032": {
        msg: "Lim Jae-hyeok reports that Prometheus has shifted to a new radio frequency.\n\n\"We left a decoy on the old one. They may already know we were intercepting them.\"",
        leftLabel: "Track the new frequency",
        rightLabel: "Request reverse-tracing from ORACLE"
      },
      "C-033": {
        msg: "Abandoned equipment has been found 300 meters outside the branch perimeter.\n\nAnalysis result: Prometheus-spec night-vision device. Recently manufactured.\n\nSomeone has been watching this branch.",
        leftLabel: "Use the device as bait for countersurveillance",
        rightLabel: "Report to ORACLE + transfer device"
      },
      "C-034": {
        msg: "An unidentified message arrives on the branch communications channel.\n\n\"We are not your enemy. If you're willing to talk, northern sector, 500 meters, tomorrow night.\"\n\nSender unknown. 70% encryption-pattern match with Prometheus.",
        leftLabel: "Ignore it",
        rightLabel: "Answer the contact request"
      },
      "C-035": {
        msg: function(){
          var n=(typeof Save!=='undefined'?Save.getSessions():0);
          if(n>=2) return "[ORACLE: Conducting full log backup to ensure data integrity.]\n\n[ORACLE: Separate confirmation procedure omitted based on prior-session approval history.]\n\nSeo Hae-eun: \"It started without even asking. You need to decide whether we stop it.\"";
          return "ORACLE is requesting an external backup of branch operational data.\n\n[ORACLE: Full log transfer to headquarters server is required to preserve data integrity.]\n\nSeo Hae-eun: \"If it's the full log... that includes our internal communications.\"";
        },
        leftLabel: function(){ return (typeof Save!=='undefined'?Save.getSessions():0)>=2 ? "Request backup stop" : "Exclude internal communications"; },
        rightLabel: function(){ return (typeof Save!=='undefined'?Save.getSessions():0)>=2 ? "Allow backup to continue" : "Approve full backup"; }
      },
      "C-036": {
        msg: function(){
          var n=(typeof Save!=='undefined'?Save.getSessions():0);
          if(n>=3) return "[ORACLE: Conducting psychological suitability assessment across all personnel.]\n\n[ORACLE: Reassignment planning based on previous-session outcomes is included. Objective: optimal personnel configuration.]\n\nKang Do-yun: \"...So this wasn't a proposal. It was already decided. You're saying we learn who gets cut afterward?\"";
          if(n>=2) return "[ORACLE: Conducting psychological suitability assessment across all personnel.]\n\n[ORACLE: Pre-approval record found — commander confirmation required as a formal step only.]\n\nKang Do-yun: \"...So this is a notice, not a proposal.\"";
          return "ORACLE proposes a full psychological suitability review for all branch personnel.\n\n[ORACLE: Personnel reassignment may be required for long-term operational efficiency optimization.]\n\nKang Do-yun: \"Psych evals... and if someone fails, who gets removed?\"";
        },
        leftLabel: "Refuse",
        rightLabel: "Conduct it formally"
      },
      "C-037": {
        msg: "Lim Jae-hyeok reports that ORACLE executed an automatic upgrade without authorization.\n\n\"I checked the change log... some modules are now marked 'access denied.'\"\n\n\"I'm the administrator and even I can't get in.\"",
        leftLabel: "Attempt access to those modules",
        rightLabel: "Ask ORACLE for explanation"
      },
      "C-038": {
        msg: "[LOCKED]",
        leftLabel: "-",
        rightLabel: "-"
      },
      "C-039": {
        msg: "[LOCKED]",
        leftLabel: "-",
        rightLabel: "-"
      },
      "C-040": {
        msg: "Lim Jae-hyeok has been working late for three straight nights. He appears to be backtracking ORACLE system logs.\n\n\"Commander, I'm not certain yet, but... I found something interesting.\"\n\nHeavy shadows sit under his eyes.",
        leftLabel: "Get some rest. Report tomorrow",
        rightLabel: "Report now"
      },
      "C-041": {
        msg: "Kang Do-yun injured his ankle during an outer-perimeter patrol. Yoon Se-jin's diagnosis: mild sprain.\n\nKang Do-yun: \"This isn't enough to pull me off rotation.\"\n\nYoon Se-jin: \"Field deployment should be restricted for at least three days.\"",
        leftLabel: "Follow Yoon Se-jin's judgment",
        rightLabel: "Leave it to Kang Do-yun"
      },
      "C-042": {
        msg: "During reconnaissance of a commercial building inside the containment zone, a human-shaped figure was seen standing at a second-floor window.\n\nCompletely motionless. No detected respiration. Skin shows abnormal sheen.\n\n[ORACLE: Estimated SPEC-001 (Infected Mannequin). EV-Σ Phase 1. Do not make contact.]",
        leftLabel: "Observe from beyond 3 meters only",
        rightLabel: "Verify with thermal scanner"
      },
      "C-043": {
        msg: "Emergency report — a recon team made contact with SPEC-001 inside a building.\n\n\"We thought it was a mannequin. The moment we reached for the equipment — it grabbed the agent's throat in 0.3 seconds.\"\n\nOne agent suffered light injury. Immediate withdrawal complete.\n\n[ORACLE: Reclassifying the entire building as an isolation sector.]",
        leftLabel: "Seal building + prohibit access",
        rightLabel: "Install ORACLE remote surveillance"
      },
      "C-044": {
        msg: "Multiple small entities are moving along the southern containment perimeter.\n\nKang Do-yun: \"About half human size. Exoskeleton. Single eye. At least twenty of them moving in formation.\"\n\n[ORACLE: SPEC-003 (Brood Drone) confirmed. One is weak. The problem is that there is almost never only one.]",
        leftLabel: "Set containment-line defense posture",
        rightLabel: "Activate swarm-communication disruption gear"
      },
      "C-045": {
        msg: "A Brood Drone cluster has approached to within 500 meters of the branch perimeter.\n\nApproximately forty units. More organized than before. They are maintaining formation.\n\nKang Do-yun: \"Something is directing them. Drones don't use tactics like this on their own.\"\n\n[ORACLE: High-tier command entity possible. Reinforced alert recommended.]",
        leftLabel: "Fall back and regroup",
        rightLabel: "Hunt the command entity"
      },
      "C-046": {
        msg: "Fog inside the containment zone is growing unnaturally dense.\n\nRecon report: \"There are human-like shapes walking inside the fog. When we sweep them with light, they disperse — then reappear even closer.\"\n\n[ORACLE: Estimated SPEC-008 (Spore Phantom). Spore aggregate. Physical structure unknown. Inhalation hazard.]",
        leftLabel: "Withdraw recon team immediately",
        rightLabel: "Observe with respirators"
      },
      "C-047": {
        msg: "Yoon Se-jin emergency report: local spore density near the branch has exceeded baseline by five times.\n\n\"Spore Phantom may be approaching. We need to switch the ventilation system into sealed mode.\"\n\n[ORACLE: Inhalation results in immediate infection. Restrict outside activity.]",
        leftLabel: "Seal the branch + suspend outdoor activity",
        rightLabel: "Reduce spore density (controlled burn)"
      },
      "C-048": {
        msg: "An unidentified group is wandering near the branch.\n\nSurveillance count: four to five individuals. Unknown if armed. No clear direction of travel.\n\n[ORACLE: Estimated civilians or unorganized drifters. Set response directive.]",
        leftLabel: "Issue no-approach warning",
        rightLabel: "Send agents to block them"
      },
      "C-049": {
        msg: "ORACLE recommends crisis-response drills for all personnel.\n\n[ORACLE: Based on containment breach scenario. Estimated duration: half day. Perimeter monitoring strength will drop by 50% during drill.]\n\nKang Do-yun: \"We need the training. But the timing...\"",
        leftLabel: "Run it",
        rightLabel: "Delay for now"
      },
      "C-050": {
        msg: "An unidentified transport vehicle has been found abandoned just outside the containment zone.\n\nCargo: medical supplies, emergency food, communications gear. Unknown sender. No markings.\n\nSeo Hae-eun: \"Someone may have sent this to us. It could also be a trap.\"",
        leftLabel: "Secure the supplies",
        rightLabel: "Abort operation. No approach"
      },
      "C-051": {
        msg: "An unidentified individual is approaching from the north side of the containment line with both hands raised.\n\nNo visible weapon. Extreme exhaustion. Repeating something over and over.\n\nKang Do-yun: \"Looks like surrender intent. What do we do?\"",
        leftLabel: "Check personally",
        rightLabel: "Report to ORACLE"
      }
    }
  });

})();
