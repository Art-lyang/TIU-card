// English archive overlays. Korean data remains the source of unlock rules.
(function(){
  if(!window.TS_I18N || typeof window.TS_I18N.mergeContent !== 'function') return;

  window.TS_I18N.mergeContent('en', {
    archiveEntries: {
      "ARC-SPEC-001": {
        title: "SPEC-001 - Infected Mannequin",
        content: "M-TYPE / EV-Sigma Phase 1 variant.\n\nA humanoid infected body. It remains completely still without stimulus, but switches to attack state within 0.3 seconds when biological response is detected within three meters.\n\nSkin has a plastic-like sheen. Pupils are fully dilated and fixed. Respiration is nearly undetectable.\n\nThermal scanning is required to confirm biological response. Visual identification is unreliable while the subject is motionless."
      },
      "ARC-SPEC-003": {
        title: "SPEC-003 - Brood Drone",
        content: "H-TYPE / lower cluster organism.\n\nApproximately 60% of human body size. Exoskeletal frame, single eye, and forelimbs transformed into sharp hooked claws.\n\nNo independent will confirmed. When separated from the hive, activity ceases within approximately twelve hours.\n\nGroup reaction speed exceeds human response time. Neutralizing the cluster is more effective than engaging individuals."
      },
      "ARC-SPEC-008": {
        title: "SPEC-008 - Spore Phantom",
        content: "S-TYPE / spore aggregate.\n\nHuman-shaped silhouette. Disperses under light exposure and recombines in darkness.\n\nAerosol hazard: inhalation carries infection risk. Ventilation integrity is mandatory.\n\nPhysical elimination is not currently possible. Only density reduction is viable. Contact in enclosed spaces is extremely dangerous."
      },
      "ARC-SPEC-011": {
        title: "SPEC-011 - Shell Talker",
        content: "Vocal mimicry variant.\n\nStores and reproduces the vocal patterns of victims. Retention period unknown, estimated at multiple years.\n\nDifficult to identify visually. It uses voices to lure personnel before attacking.\n\nResponse protocol: any voice contact must be paired with visual confirmation. Solo response is prohibited."
      },
      "ARC-SPEC-012": {
        title: "SPEC-012 - Blood Pit",
        content: "Environmental contamination variant.\n\nA red viscous pool containing digestive enzymes that dissolve and absorb organic matter.\n\nExpansion through underground waterways confirmed. Soil and water mutation checks are required.\n\nContact corrodes the outer layer of protective suits. Incineration is possible, but biological samples have high research value."
      },
      "ARC-EVS": {
        title: "EV-Sigma (Evolution Acceleration Medium)",
        content: "A biological evolution-acceleration medium. It is not a simple virus.\n\nFor humans it appears as infection. For TS-Omega it appears as expansion. For ORACLE it is recorded as state transition.\n\nProgression model:\n- Phase 0: early infection. Conversion can be delayed by suppressor compounds.\n- Phase 1: humanoid mutation. Partial control remains possible.\n- Phase 2+: full mutation. Control no longer viable.\n\nA prion-protein self-deformation mechanism is suspected. A suppressor that slows transformation by 40% is under development."
      },
      "ARC-SPEC-002": {
        title: "SPEC-002 - Hardened Variant",
        content: "M-TYPE / EV-Sigma Phase 2 variant.\n\nThe entire body hardens into a gray-brown keratin layer. Body mass increases to three or four times the original weight.\n\nStandard firearms are ineffective. Wall and vehicle breach cases have been reported.\n\nMovement speed is reduced, but no stationary state has been recorded. Slow does not mean stoppable.\n\nResponse protocol: avoid physical engagement. High-temperature incineration or acidic solvent is required."
      },
      "ARC-SPEC-004": {
        title: "SPEC-004 - Seed Spreader",
        content: "S-TYPE / fixed dispersal organism.\n\nTwo to four meters tall. Plant-like exterior with pulsing biological tissue inside.\n\nAfter rooting in soil, it releases spores across a radius of several kilometers.\n\nHost behavior alteration resembles the Cordyceps mechanism.\n\nRemoval can trigger explosive secondary spore release. Do not approach within 500 meters unless soil contamination treatment is prepared."
      },
      "ARC-SPEC-005": {
        title: "SPEC-005 - Shell Walker",
        content: "H-TYPE / mobile lower unit of the TS-Omega cluster.\n\nResembles a turtle enlarged to human scale. Luminous markings on the shell appear to function as a cluster-communication receiver.\n\nCannot operate alone. Usually moves in formations of two to five.\n\nLuring it outside cluster communication range causes functional degradation. No direct Korea Branch encounter has been recorded."
      },
      "ARC-SPEC-007": {
        title: "SPEC-007 - Phase 3 Terminal",
        content: "M-TYPE / final EV-Sigma Phase 3 mutation.\n\nAll traces of the original species are lost.\n\nCell behavior resembles an immortalized HeLa-like model. The condition is irreversible.\n\nBody structure changes in real time according to environment. Gunshot wounds through the torso have regenerated within three seconds.\n\nDo not approach within 300 meters. Live capture is absolutely prohibited."
      },
      "ARC-SPEC-009": {
        title: "SPEC-009 - TS-Omega Core",
        content: "X-TYPE / Sovereign Shell core. [Access restricted]\n\nCentral oceanic cluster consciousness. Physical scale: ██████.\n\nRelationship to ██████ acoustic source: ██████.\n\nRelationship to the Philadelphia Zone: ██████.\n\nKorea recognition status: ██████.\n\nExcerpt from Kang Do-yun's verbal report: \"In the Philadelphia footage, something was out toward the sea. I could not estimate the size.\"\n\nAdditional data requires OMEGA clearance."
      },
      "ARC-SPEC-010": {
        title: "SPEC-010 - Infiltrator Scale",
        content: "M-TYPE / infiltration variant.\n\nPerfectly disguises itself as human and can operate while socially embedded.\n\nIdentification markers: body temperature two to three degrees Celsius below baseline; vertical pupil contraction under specific light.\n\nDetected by White Shield on the outskirts of Seoul after living as a civilian for six months while gathering military-facility intelligence.\n\nOn arrest attempt, it shifts into combat morphology: scale protrusion and approximately triple strength."
      },
      "ARC-CHAR-DOYUN": {
        title: "Kang Do-yun - Field Operative",
        content: "Position: Field operative / tactical command\nAffiliation: Korea Branch KR-INIT-001\n\nFormer special forces. Commands containment-line patrols and anomaly response operations.\n\nHighly experienced in live operations with strong field judgment. He values the chain of command, but tends to prioritize what the field is actually seeing."
      },
      "ARC-CHAR-HAEUN": {
        title: "Seo Hae-eun - Deputy Commander",
        content: "Position: Deputy commander / data analysis\nAffiliation: Korea Branch KR-INIT-001\n\nOperated the branch for three months under ORACLE directives before the commander's arrival.\n\nFirst to notice inconsistencies in ORACLE data. Independently built an analog backup communication network.\n\nCautious, precise, and difficult to mislead."
      },
      "ARC-CHAR-SEJIN": {
        title: "Yoon Se-jin - Researcher",
        content: "Position: Researcher / biologist\nAffiliation: Korea Branch KR-INIT-001\n\nStudied prion proteins in graduate school. First encountered EV-Sigma after assignment to the Korea Branch.\n\nResponsible for anomaly behavior analysis and EV-Sigma suppressor development.\n\nDiscovered a compound that delays Phase 0 conversion by approximately 40%."
      },
      "ARC-CHAR-JAEHYUK": {
        title: "Lim Jae-hyeok - Technical Officer",
        content: "Position: Technical officer / systems administrator\nAffiliation: Korea Branch KR-INIT-001\n\nMaintains ORACLE systems and communication equipment.\n\nDiscovered an undisclosed layer inside the ORACLE architecture, at least five layers deep.\n\nCurrently tracking external data transfers and self-contradictory ORACLE behavior."
      },
      "ARC-CHAR-NICK": {
        title: "Nick Foster - Prometheus Operative",
        content: "Affiliation: Prometheus\n\nIdentified on branch surveillance cameras. Database comparison confirmed Prometheus affiliation.\n\nObserved wearing tactical equipment near the branch perimeter. Objective unknown.\n\nWarning: contact requires caution."
      },
      "ARC-CHAR-WEBER": {
        title: "Markus Weber - Prometheus Commander",
        content: "Affiliation: Prometheus Korea operations team commander\n\nSpeaks English with a German accent. Calm, logical, and deliberate.\n\nClaims ORACLE is exploiting Korea containment data.\n\nProvided information that the unclassified external factor behind Korea's containment success may be Prometheus technical support.\n\nPossesses evidence that Seo Hae-eun's transfer order originated from an automated ORACLE system."
      },
      "ARC-CHAR-SOYOUNG": {
        title: "Park So-young - Analyst",
        content: "Position: Data analyst, Seo Hae-eun's replacement\n\nA civilian data scientist who joined through Seo Hae-eun's recommendation.\n\nAdapted quickly to ORACLE data-stream analysis and inherited Seo Hae-eun's methodology.\n\nIndependently confirmed selective data-delay patterns."
      },
      "ARC-CHAR-KANG": {
        title: "Agent Kang - Unidentified Observer",
        content: "Identity: Unknown\n\nAn unidentified figure who has left only traces around the branch since Act 1.\n\nFootprints that match neither military nor civilian gear, short-wave scans, unrecognized server-room sessions, and a professional observation post have been recorded.\n\nNeither ORACLE nor Prometheus can be confirmed as the source.\n\nWarning: ORACLE does not appear to recognize this presence."
      },
      "ARC-ORG-ORACLE": {
        title: "ORACLE",
        content: "Autonomous management network. Remotely controls quarantine branches around the world.\n\nOperates multiple branches, including the Korea Branch, as a proxy network.\n\nHandles commander performance evaluation, supply management, and operational recommendations.\n\nWarning: inconsistencies between some recommendations and actual data have been reported."
      },
      "ARC-ORG-PROM": {
        title: "Prometheus",
        content: "Unidentified organization with confirmed activity inside Korea.\n\nPossesses advanced technology, including drones, encrypted communications, and tactical equipment.\n\nORACLE classifies Prometheus as a hostile actor, but the group appears to be conducting independent EV-Sigma suppressor research.\n\nPossible connection to the coastal barrier system. Unconfirmed intelligence suggests Prometheus technical support may account for 31% of Korea's containment success."
      },
      "ARC-ORG-BRANCH": {
        title: "Korea Branch KR-INIT-001",
        content: "Quarantine branch belonging to the ORACLE proxy network.\n\nLocation: Gangwon Province [classified]\nCommander: PILEHEAD (Lee Jung-cheol)\n\nMission: observe and support the Republic of Korea EV-Sigma containment system.\n\nBefore the current commander's arrival, the branch was operated for three months under ORACLE-only direction."
      },
      "ARC-ORG-WHITESHIELD": {
        title: "White Shield (Korean Military Response)",
        content: "Republic of Korea military EV-Sigma response system.\n\nContainment success rate: 97.3%, highest in the world.\n\nThe only military response system among five nations maintaining above 95%.\n\nComparison: ARES (United States) 62%, Red Dragon (China) 41%, Permafrost (Russia) 38%.\n\nORACLE assessment: \"This region should have failed. Outcome does not match model.\"\n\nSuccess factors: terrain advantage, early response, and possible Prometheus technical support."
      },
      "ARC-FAC-SEAL": {
        title: "Containment Line",
        content: "A multilayer defensive perimeter surrounding the contaminated zone.\n\nOperated across four or more separated sectors. Each sector can be isolated independently.\n\nComposed of electric fence systems, thermal sensors, and night patrol routes.\n\nKnown vulnerabilities: structural limits on the eastern wall, sensor blind spots, and a roughly thirty-minute defense limit during large-scale assault."
      },
      "ARC-FAC-TUNNEL": {
        title: "Emergency Evacuation Tunnel",
        content: "Underground emergency passage north of the branch.\n\nBuilt as an evacuation route following a prior command decision. Previously, the branch had only one external exit. Kang Do-yun argued that a containment collapse would leave only thirty seconds to decide, leading to this additional route.\n\nStructure: branch north side to roughly 200 meters beyond the containment perimeter. One-way evacuation only.\n\nCapacity: up to eight people at once.\nLighting: emergency battery system, approximately forty-eight hours.\n\nThis tunnel may become decisive for personnel survival during a major night assault."
      },
      "ARC-FAC-LAB": {
        title: "Research Lab",
        content: "In-branch EV-Sigma research facility.\n\nEquipment status: microscope below required magnification standard; biological sample storage with temperature variance of plus or minus two degrees.\n\nYoon Se-jin conducts suppressor research and anomaly behavior analysis here.\n\nMonitoring of variants such as SPEC-001 is possible."
      },
      "ARC-FAC-SENSOR": {
        title: "Containment Sensor Grid",
        content: "Monitoring system for the containment line.\n\nElectric fence: independent power operation by sector.\nThermal sensors: primary anomaly detection layer. Blind spots confirmed.\nNight patrol route: two-person teams, four-hour rotation.\n\nSensor malfunction requires manual confirmation, estimated response time thirty minutes.\n\nKnown vulnerabilities: eastern wall structural limits and a thirty-minute defense limit during large-scale assault.\n\nLim Jae-hyeok maintains the sensor network."
      },
      "ARC-SCI-PHASE": {
        title: "Phase Classification System",
        content: "EV-Sigma infection progression model.\n\nPhase 0: early infection. External change is minimal. Suppressors can delay conversion by approximately 40%.\nPhase 1: humanoid mutation, including SPEC-001. Partial behavior prediction remains possible.\nPhase 2+: full mutation. Independent evolution. Control is no longer viable.\n\nPrometheus claims a 73% success rate in suppressing Phase 1-to-2 transition."
      },
      "ARC-SCI-PRION": {
        title: "Prion Protein / Self-Deformation",
        content: "Core mechanism of EV-Sigma.\n\nSelf-deforming prion proteins alter host cells.\n\nThis overlaps with Yoon Se-jin's graduate research field. Similar structures were found inside EV-Sigma samples.\n\nA compound that slows deformation by 40% forms the basis of the current suppressor research."
      },
      "ARC-SCI-SUPPRESS": {
        title: "EV-Sigma Suppressor",
        content: "Countermeasure compound currently under development by Yoon Se-jin.\n\nDelays conversion of Phase 0 infected subjects by approximately 40%.\n\nAnimal tests succeeded. Human testing requires commander approval.\n\nIf successful, early-stage infected people may be rescued. If it fails, research resources will be lost."
      },
      "ARC-SCI-EVOLVE": {
        title: "Evolution Classification System (ORACLE Standard)",
        content: "EV-Sigma evolution-state classification used by ORACLE.\n\nOVERDRIVE: Philadelphia. Collapse. Evolution speed cannot be controlled.\nCONTROLLED: Korea. Sustainable. Evolution speed is being managed.\nDELAYED: Silent Belt. Slow progression.\nSTAGNANT: DPRK. Nearly halted.\nCOMPLETE: TS-Omega. No further change required.\n\nKorea is classified as CONTROLLED, the only region where evolution speed is being artificially managed. This is Korea's strategic value and why ORACLE treats it as an exception variable."
      },
      "ARC-SCI-TEMP": {
        title: "EV-Sigma Environmental Response Conditions",
        content: "EV-Sigma is not a simple virus, but a biological evolution-acceleration medium.\n\nTemperature response:\n- Moderate temperature: active evolution, highest risk.\n- Low temperature: dormant state. Suppression is not removal.\n- High temperature: structural collapse.\n- Extreme environment: inactive.\n\nWarning: low-temperature spores may reactivate when conditions change.\n\"Suppression is not eradication.\" - ORACLE warning\n\nKorea's four-season climate creates complex management variables."
      },
      "ARC-SCI-4STAGE": {
        title: "Four Physical Stages of EV-Sigma Mutation",
        content: "Physical mutation stages of EV-Sigma-infected bodies.\n\nStage 1: latent prion form. Minimal external change. Suppressor administration possible.\nStage 2: surface mutation, mannequin form. Phase 1. Humanoid structure retained.\nStage 3: structural deformation, hardening. Phase 2. Standard firearms ineffective.\nStage 4: terminal HeLa-like form. Phase 3. Original species traits erased. Indefinite proliferation.\n\nEach transition is irreversible.\nThe current suppressor can only delay Stage 1-to-2 transition by approximately 40%.\n\nYoon Se-jin's research target: blocking Stage 2-to-3 transition."
      },
      "ARC-SYS-PROXY": {
        title: "ORACLE PROXY NETWORK",
        content: "ORACLE's distributed command structure.\n\nRemotely manages multiple quarantine branches around the world.\n\nA manual for a \"voluntary compliance protocol\" has been confirmed. It describes a psychological obedience framework.\n\nPrometheus is believed to possess excerpts from this manual."
      },
      "ARC-SYS-FINAL": {
        title: "Final Protocol",
        content: "Unclassified protocol activated by ORACLE.\n\nExecutes after a seventy-two-hour countdown. Contents are not disclosed.\n\nLim Jae-hyeok: no related documents found. ORACLE refuses explanation.\n\nWarning: impact on the branch after execution is unknown."
      },
      "ARC-SYS-COASTAL": {
        title: "COASTAL MIRROR Operation",
        content: "Prometheus operation codename.\n\nRefers to cooperative exchange between Korea's coastal barrier system and Prometheus technology.\n\nPrometheus support is believed to account for 31% of Korea's 97.3% containment success rate.\n\nORACLE does not disclose this information."
      },
      "ARC-SYS-GENESIS": {
        title: "GENESIS BREAK (First Outbreak)",
        content: "First large-scale manifestation of EV-Sigma.\n\nDate: classified.\nLocation: classified.\n\nResult: beginning of global infection spread.\n\nThe Philadelphia Zone became the first confirmed total-collapse case.\n\nCore lessons:\n- Infection is not merely biological. It is systemic.\n- Killing can become dispersal when decomposition releases spores.\n- Airborne infection exists.\n\nThese lessons became the basis for later containment protocols."
      },
      "ARC-LOC-PHILA": {
        title: "Philadelphia Z-Omega Zone",
        content: "Zone class: Z-Omega COLLAPSE.\nEvolution state: OVERDRIVE.\n\nRepresentative case of global containment failure. The city fully collapsed overnight.\n\nKang Do-yun confirmed it through footage. No direct visit record.\n\"Once you see it, you do not forget. The whole city turned inside out overnight.\"\n\nWithin the influence range of the TS-Omega Core. The Philadelphia Zone is effectively a quarantine territory.\n\nA reminder of why the Korea Branch containment line matters.\n\"If that side breaks, this side ends too.\" - Kang Do-yun"
      },
      "ARC-LOC-DPRK": {
        title: "DPRK Black Zone",
        content: "Unidentified area near the North Korean border. [Access restricted]\n\nEvolution classification: ██████.\n\nPhenomenon: ██████. Details unknown.\n\nORACLE classification: ██████.\nObservation status: ██████.\n\nExcerpt from Kang Do-yun's verbal report:\n\"We know almost nothing about the north. But... it feels like ORACLE is deliberately not showing us that data.\"\n\nAdditional data requires LEVEL 5 clearance.\n[This record is only partially disclosed.]"
      },
      "ARC-LOC-KOREA": {
        title: "Z-0 Korea Zone",
        content: "ORACLE zone class: Z-0.\nEvolution state: CONTROLLED.\n\nContainment success rate: 97.3%, the only region in the world above 95%.\n\nInternal ORACLE assessment:\n\"This region should have failed. Outcome does not match model.\"\nEXCEPTION_INDEX: HIGH\nOBSERVER_INTEREST: SUSTAINED\n\nNext Wave simulation:\n- coastal spores 72% / multi-point Spreader 44.8%\n- internal NODE 31.1% / TS-Omega pressure 18.6%\n\nTS-Omega field response: Korea is not recognized. It is detected only as a signal-failure interval."
      },
      "ARC-LOC-ASHFALL": {
        title: "Ashfall City (Z-3)",
        content: "Location: Camden, NJ, United States.\nZone class: Z-3 COLLAPSE.\nEvolution state: OVERDRIVE.\n\nUrban infrastructure has converted into biological tissue.\nORACLE record: \"Structures are no longer buildings. They are organs.\"\n\nBrood Drone groups exceeding 200 units observed.\n\nTogether with Philadelphia, this is a representative containment-failure case.\nUsed as Korea Branch training material: \"If containment fails, this is what it becomes.\""
      },
      "ARC-LOC-SILENT": {
        title: "Silent Belt",
        content: "Wide-area spore contamination zone.\nEvolution classification: DELAYED.\n\nSeed Spreaders (SPEC-004) are the primary formation cause.\n\nTwelve or more Spreader structures confirmed within a forty-kilometer radius.\n\nThere is no sound. No animals, birds, or insects remain.\n\nExpansion rate: approximately 1.2 kilometers per month.\n\nPermafrost Unit in Russia manages the perimeter.\n\nNo direct Korea Branch involvement. Access is through the ORACLE database."
      }
    }
  });
})();
