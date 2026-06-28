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
        content: "A biological evolution-acceleration medium. It is not a simple virus.\n\nCurrently available information is limited to infection stages and field-response standards.\n\nProgression model:\n- Phase 0: early infection. The only stage where treatment remains possible.\n- Phase 1: humanoid mutation. Suppression or delay research may be possible, but this is not a recovery stage.\n- Phase 2+: full mutation. Human bodily continuity is heavily damaged and control is no longer viable.\n\nAdditional biological records require related logs."
      },
      "ARC-SPEC-002": {
        title: "SPEC-002 - Hardened Variant",
        content: "M-TYPE / EV-Sigma Phase 2 variant.\n\nThe entire body hardens into a gray-brown keratin layer. Body mass increases to three or four times the original weight.\n\nStandard firearms are ineffective. Wall and vehicle breach cases have been reported.\n\nIt moves slowly, but it has never been recorded coming to a halt. Slow doesn't mean it can be stopped.\n\nResponse protocol: avoid physical engagement. High-temperature incineration or acidic solvent is required."
      },
      "ARC-SPEC-004": {
        title: "SPEC-004 - Seed Spreader",
        content: "S-TYPE / fixed dispersal organism.\n\nTwo to four meters tall. Plant-like exterior with pulsing biological tissue inside.\n\nAfter rooting in soil, it releases spores across a radius of several kilometers.\n\nThe way it rewrites host behavior resembles the Cordyceps mechanism.\n\nRemoval can trigger explosive secondary spore release. Do not approach within 500 meters unless soil contamination treatment is prepared."
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
        title: "TS-Omega Core",
        content: "X-TYPE / Sovereign Shell core. [Access restricted]\n\nClassified as a central oceanic cluster record.\n\nPhysical scale, acoustic-source relationship, Philadelphia Zone connection, and Korea recognition status are unavailable at current access level.\n\nAdditional data requires OMEGA clearance."
      },
      "ARC-SPEC-010": {
        title: "SPEC-010 - Infiltrator Scale",
        content: "M-TYPE / infiltration variant.\n\nPerfectly disguises itself as human and can operate while socially embedded.\n\nIdentification markers: body temperature two to three degrees Celsius below baseline; vertical pupil contraction under specific light.\n\nDetected by White Shield on the outskirts of Seoul after living as a civilian for six months while gathering military-facility intelligence.\n\nOn arrest attempt, it shifts into combat morphology: scale protrusion and approximately triple strength."
      },
      "ARC-CHAR-JUNGCHEOL": {
        title: "Lee Jung-cheol - PILEHEAD / Commander",
        content: "Position: KR-INIT-001 commander\nCodename: PILEHEAD\n\nOfficial commander assigned to Korea Branch by government order.\n\nAvailable record is limited to appointment information and command authority scope.\n\nORACLE record: new commander authentication complete."
      },
      "ARC-CHAR-DOYUN": {
        title: "Kang Do-yun - ANCHOR / Tactical Commander",
        content: "Position: Tactical commander / field operations\nCodename: ANCHOR\n\nResponsible for field missions and containment-line patrol judgment.\n\nReports tend to be brief and chain-of-command focused.\n\nAdditional service history and classified operation records are unavailable at current access level."
      },
      "ARC-CHAR-HAEUN": {
        title: "Seo Hae-eun - PARALLAX / Deputy Commander",
        content: "Position: Deputy commander / data analyst\nCodename: PARALLAX\n\nSupports branch operations and reviews data reports.\n\nHer reporting style is centered on numbers and confirmed facts.\n\nDetailed career records and unofficial analysis notes are unavailable at current access level."
      },
      "ARC-CHAR-SEJIN": {
        title: "Yoon Se-jin - KINDLE / Researcher-Medical Officer",
        content: "Position: Researcher / medical officer\nCodename: KINDLE\n\nResponsible for sample analysis and branch medical response.\n\nHolds biological analysis clearance for EV-Sigma cases.\n\nCurrent research details remain locked until related logs are confirmed."
      },
      "ARC-CHAR-JAEHYUK": {
        title: "Lim Jae-hyeok - VOIDWALK / Intelligence-Technical Officer",
        content: "Position: Intelligence analyst / technical officer\nCodename: VOIDWALK\n\nHandles ORACLE integration, security systems, communications equipment, and information analysis.\n\nHas maintenance authority for analysis modules and branch terminals.\n\nPrivate analysis details remain locked until related logs are confirmed."
      },
      "ARC-CHAR-NICK": {
        title: "Nick Foster - Prometheus Operative",
        content: "Affiliation: Prometheus\n\nIdentified on branch surveillance cameras. Database comparison confirmed Prometheus affiliation.\n\nObserved wearing tactical equipment near the branch perimeter. Objective unknown.\n\nWarning: contact requires caution."
      },
      "ARC-CHAR-WEBER": {
        title: "Markus Weber - Prometheus Commander",
        content: "Affiliation: Prometheus\n\nExternal contact connected to Korea Branch events.\n\nPresented separate claims regarding ORACLE and Korean containment data.\n\nThe authenticity and background of the supplied material require further verification."
      },
      "ARC-CHAR-SOYOUNG": {
        title: "Park So-young - Analyst",
        content: "Position: Data analyst\n\nBranch data-analysis support personnel.\n\nAssists with ORACLE data-stream review and reporting.\n\nDetailed assignment background and analysis results remain restricted until related records are unlocked."
      },
      "ARC-CHAR-KANG": {
        title: "Unidentified Observer",
        content: "Identity: Unknown\n\nIntermittent traces around the branch have been grouped under this record.\n\nFootprints, short-wave scan traces, and unidentified access records may be related.\n\nAffiliation and objective are unconfirmed.\n\nWarning: ORACLE does not classify this as an official personnel record."
      },
      "ARC-ORG-ORACLE": {
        title: "ORACLE",
        content: "Autonomous management network. Remotely controls quarantine branches around the world.\n\nOperates multiple branches, including the Korea Branch, as a proxy network.\n\nHandles commander performance evaluation, supply management, and operational recommendations.\n\nWarning: inconsistencies between some recommendations and actual data have been reported."
      },
      "ARC-ORG-PROM": {
        title: "Prometheus",
        content: "Unidentified organization with confirmed traces of activity inside Korea.\n\nAdvanced technical capability is suspected, but equipment origin and purpose are unconfirmed.\n\nORACLE classifies Prometheus as a hostile actor.\n\nDetailed research activity and its relationship to the Korean containment system remain restricted until related logs are confirmed."
      },
      "ARC-ORG-BRANCH": {
        title: "Korea Branch KR-INIT-001",
        content: "Quarantine branch belonging to the ORACLE proxy network.\n\nLocation: Gangwon Province [classified]\nCommander: PILEHEAD (Lee Jung-cheol)\n\nMission: observe and support the Republic of Korea EV-Sigma containment system.\n\nBefore the current commander's arrival, the branch was operated for three months under ORACLE-only direction."
      },
      "ARC-ORG-WHITESHIELD": {
        title: "White Shield (Korean Military Response)",
        content: "Republic of Korea military EV-Sigma response system.\n\nCurrent public records identify it as the primary field-response body for the Korean containment line.\n\nContainment efficiency is reported as very high, but comparative rates and detailed success factors are unavailable at current access level.\n\nFurther assessment requires related logs."
      },
      "ARC-FAC-SEAL": {
        title: "Containment Line",
        content: "A multilayer defensive perimeter surrounding the contaminated zone.\n\nOperated across four or more separated sectors. Each sector can be isolated independently.\n\nComposed of electric fence systems, thermal sensors, and night patrol routes.\n\nKnown vulnerabilities: structural limits on the eastern wall, sensor blind spots, and a roughly thirty-minute defense limit during large-scale assault."
      },
      "ARC-FAC-TUNNEL": {
        title: "Emergency Evacuation Tunnel",
        content: "Underground emergency passage north of the branch.\n\nBuilt as an evacuation route following a prior command decision. Previously, the branch had only one external exit. Kang Do-yun argued that a containment collapse would leave only thirty seconds to decide; the route was added on that basis.\n\nStructure: branch north side to roughly 200 meters beyond the containment perimeter. One-way evacuation only.\n\nCapacity: up to eight people at once.\nLighting: emergency battery system, approximately forty-eight hours.\n\nThis tunnel may become decisive for personnel survival during a major night assault."
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
        content: "EV-Sigma infection progression model.\n\nPhase 0: early infection. External change is minimal. Suppressors can delay conversion by approximately 40%.\nPhase 1: humanoid mutation, including SPEC-001. Partial behavior prediction remains possible. This is not a recovery stage.\nPhase 2+: full mutation. Independent evolution. Control is no longer viable.\n\nPrometheus claims a 73% success rate in suppressing Phase 1-to-2 progression, but no recovery has been proven."
      },
      "ARC-SCI-PRION": {
        title: "Prion Protein / Self-Deformation",
        content: "Core mechanism of EV-Sigma.\n\nSelf-deforming prion proteins alter host cells.\n\nThis overlaps with Yoon Se-jin's graduate research field. Similar structures were found inside EV-Sigma samples.\n\nA compound that slows deformation by 40% forms the basis of the current suppressor research."
      },
      "ARC-SCI-SUPPRESS": {
        title: "EV-Sigma Suppressor",
        content: "Countermeasure compound currently under development by Yoon Se-jin.\n\nDelays conversion of Phase 0 infected subjects by approximately 40%.\n\nAnimal tests succeeded. Human testing requires commander approval.\n\nIf successful, Phase 0 infected people may be rescued. If it fails, research resources will be lost."
      },
      "ARC-SCI-EVOLVE": {
        title: "Evolution Classification System (ORACLE Standard)",
        content: "EV-Sigma evolution-state classification used by ORACLE.\n\nThe terminal currently exposes only partial class names and limited regional mapping.\n\nOVERDRIVE / CONTROLLED / DELAYED / STAGNANT / COMPLETE\n\nExact regional assignment, and the reason Korea Branch is treated as an exception variable, are unavailable at the current access level.\n\nAdditional classification data requires related logs."
      },
      "ARC-SCI-TEMP": {
        title: "EV-Sigma Environmental Response Conditions",
        content: "EV-Sigma is not a simple virus, but a biological evolution-acceleration medium.\n\nTemperature response:\n- Moderate temperature: active evolution, highest risk.\n- Low temperature: dormant state. Suppression is not removal.\n- High temperature: structural collapse.\n- Extreme environment: inactive.\n\nWarning: low-temperature spores may reactivate when conditions change.\n\"Suppression is not eradication.\" - ORACLE warning\n\nKorea's four-season climate creates complex management variables."
      },
      "ARC-SCI-4STAGE": {
        title: "Four Physical Stages of EV-Sigma Mutation",
        content: "Physical mutation stages of EV-Sigma-infected bodies.\n\nStage 1: latent prion form. Minimal external change. Suppressor administration possible.\nStage 2: surface mutation, mannequin form. Phase 1. Humanoid structure retained.\nStage 3: structural deformation, hardening. Phase 2. Standard firearms ineffective.\nStage 4: terminal HeLa-like form. Phase 3. Original species traits erased. Indefinite proliferation.\n\nEach transition is irreversible.\nThe current suppressor can only delay Stage 1-to-2 transition by approximately 40%.\n\nYoon Se-jin's research target: finding clues to delay Stage 2-to-3 terminalization. This is not recovery research."
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
        content: "Prometheus-related operation codename.\n\nA relationship with the Korean coastal barrier system is suspected, but available records do not confirm the details.\n\nQuantitative contribution values and ORACLE disclosure status remain restricted until related logs are confirmed."
      },
      "ARC-SYS-GENESIS": {
        title: "GENESIS BREAK (First Outbreak)",
        content: "First large-scale manifestation of EV-Sigma.\n\nDate: classified.\nLocation: classified.\n\nResult: beginning of global infection spread.\n\nThe Philadelphia Zone became the first confirmed total-collapse case.\n\nCore lessons:\n- Infection is not merely biological. It is systemic.\n- Killing can become dispersal when decomposition releases spores.\n- Airborne infection exists.\n\nThese lessons became the basis for later containment protocols."
      },
      "ARC-LOC-PHILA": {
        title: "Philadelphia Z-Omega Zone",
        content: "Zone class: Z-Omega COLLAPSE.\n\nRepresentative case of global containment failure.\n\nKang Do-yun confirmed it through footage. No direct visit record exists.\n\nDetailed collapse cause and external influence data are unavailable at current access level."
      },
      "ARC-LOC-DPRK": {
        title: "DPRK Black Zone",
        content: "Unidentified area near the North Korean border. [Access restricted]\n\nEvolution classification: ██████.\n\nPhenomenon: ██████. Details unknown.\n\nORACLE classification: ██████.\nObservation status: ██████.\n\nExcerpt from Kang Do-yun's verbal report:\n\"We know almost nothing about the north. But... it feels like ORACLE is deliberately not showing us that data.\"\n\nAdditional data requires LEVEL 5 clearance.\n[This record is only partially disclosed.]"
      },
      "ARC-LOC-KOREA": {
        title: "Z-0 Korea Zone",
        content: "ORACLE zone class: Z-0.\n\nPrimary containment zone observed and supported by Korea Branch.\n\nBasic records identify high containment efficiency, but internal exception indices, next-wave simulations, and external field-response data are unavailable at current access level.\n\nDetailed metrics require related logs."
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
