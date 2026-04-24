// lang-content-en-dialogues.js — early communication dialogue overlay
(function(){
if(!window.TS_I18N||typeof window.TS_I18N.mergeContent!=='function')return;
window.TS_I18N.mergeContent('en', {
  dialogues: {
    "서하은|안녕하세요 지휘관님. 오라클 한국지부의 부지휘관 및 데이터 분석을 맡고 있는 서하은이라고 합니다.": {
      name: "Seo Hae-eun",
      role: "Deputy Commander",
      lines: [
        "Hello, Commander. My name is Seo Hae-eun, Deputy Commander of the ORACLE Korea Branch, and I oversee data analysis.",
        "You are the first commander ever assigned to the Korea Branch.",
        "I've already organized the current branch status for you. Please review it whenever it's convenient.",
        "If you need anything or if there's something I can help you with, please let me know at any time."
      ],
      choices: [
        { label: "Thank you. I look forward to working with you.", tag: "Empathy", reply: "Yes, Commander. I look forward to working with you as well.", fx: {}, g: 0, trust: 10 },
        { label: "Send me the status report first.", tag: "Cold", reply: "Understood. I'll prepare it right away.", fx: {}, g: 0, trust: -5 }
      ]
    },
    "강도윤|지휘관님, 전술지휘관 강도윤입니다. 현장작전 및 봉쇄선 관리를 담당하고 있습니다.": {
      name: "Kang Do-yun",
      role: "Field Operative",
      lines: [
        "Commander, I'm Tactical Officer Kang Do-yun. I handle field operations and containment-line management.",
        "We've been operating without a commander for the last three months before your arrival.",
        "I have a firm grasp of the field situation, so let me know whenever you need it.",
        "I look forward to working with you."
      ],
      choices: [
        { label: "You've worked hard. Let's do this well.", tag: "Empathy", reply: "...Thank you, Commander. I'll do my best.", fx: {}, g: 0, trust: 10 },
        { label: "Report on the containment line first.", tag: "Hardline", reply: "Understood. I'll prepare it immediately.", fx: {}, g: 0, trust: -5 }
      ]
    },
    "윤세진|안녕하세요 지휘관님. 연구원 겸 의료관 윤세진입니다.": {
      name: "Yoon Se-jin",
      role: "Researcher",
      lines: [
        "Hello, Commander. I'm Yoon Se-jin, a researcher and medical officer.",
        "I'm responsible for EV-Σ biological research and branch medical support.",
        "If you have any questions about anomalies, feel free to ask me anytime.",
        "It's reassuring to have you here, Commander. I look forward to working with you."
      ],
      choices: [
        { label: "Likewise. Is the research going well?", tag: "Empathy", reply: "Yes! I'll make sure to show you good results.", fx: {}, g: 0, trust: 10 },
        { label: "Organize the research status report.", tag: "Cold", reply: "Yes, understood. I'll compile it and send it over.", fx: {}, g: 0, trust: -5 }
      ]
    },
    "임재혁|지휘관님, 정보분석관 임재혁입니다. 기지 보안 시스템과 정보 수집·분석을 담당합니다.": {
      name: "Lim Jae-hyeok",
      role: "Technical Officer",
      lines: [
        "Commander, I'm Intelligence Analyst Lim Jae-hyeok. I oversee branch security systems and information collection and analysis.",
        "ORACLE integration and the overall communications framework also fall under my authority.",
        "If you have any questions related to the system, please let me know.",
        "I look forward to working with you."
      ],
      choices: [
        { label: "Likewise.", tag: "Empathy", reply: "Yes. I'll take responsibility for the systems side.", fx: {}, g: 0, trust: 5 },
        { label: "Report on current system diagnostics.", tag: "Cold", reply: "Understood. I'll organize the latest inspection results and report them to you.", fx: {}, g: 0, trust: -5 }
      ]
    },
    "강도윤|지휘관. 한 가지 말씀드려야 할 게 있습니다.": {
      name: "Kang Do-yun",
      role: "Field Operative",
      lines: ["Commander. There is something I need to tell you.","The agents' mood is not good. Especially the night shift.","When I ask why, they cannot put it into words... they call it a feeling.","A feeling that something is being kept from us."],
      choices: [
        { label: "Honestly, I feel the same way.", tag: "Empathy", reply: "...Thank you. For saying that honestly.", fx: {}, g: -3, trust: 15 },
        { label: "That is baseless anxiety. Keep them focused on duty.", tag: "Hardline", reply: "...Understood, Commander.", fx: {}, g: 1, trust: -10 }
      ]
    },
    "서하은|지휘관님, 프로메테우스 건으로 보고드립니다.": {
      name: "Seo Hae-eun",
      role: "Deputy Commander",
      lines: ["Commander, I have a report regarding Prometheus.","ORACLE recommends immediate response upon detection, but...","Frankly, we do not have enough information. If we move now, only we will be exposed.","My recommendation is to observe. But the decision is yours."],
      choices: [
        { label: "Agreed. We should not rush.", tag: "Analysis", reply: "A wise decision, Commander.", fx: {}, g: -2, trust: 10 },
        { label: "Respond according to ORACLE's recommendation.", tag: "Hardline", reply: "...Understood. I will prepare.", fx: {}, g: 2, trust: -10 }
      ]
    },
    "윤세진|지휘관님... 이건 보고가 아니라 그냥 개인적인 생각인데요.": {
      name: "Yoon Se-jin",
      role: "Researcher",
      lines: ["Commander... this is not a report. It is just a personal thought.","Sometimes, working here, I wonder.","Whether what we are seeing is really everything.","It may be nothing. You can ignore it."],
      choices: [
        { label: "No. That kind of instinct matters.", tag: "Empathy", reply: "...Thank you. That is comforting to hear.", fx: {}, g: -2, trust: 10 },
        { label: "I want you to focus on the research.", tag: "Cold", reply: "Yes... I'm sorry.", fx: {}, g: 1, trust: -10 }
      ]
    },
    "임재혁|지휘관님, 사소한 건데 보고드립니다.": {
      name: "Lim Jae-hyeok",
      role: "Technical Officer",
      lines: ["Commander, this may be minor, but I should report it.","Something briefly appeared at the bottom of the terminal screen earlier, then vanished.","It was not a registered UI element. It lasted under 0.3 seconds, so I could not capture it.","It looks like a display-cache error. Reinstalling the firmware should fix it."],
      choices: [
        { label: "Wait. Record that.", tag: "Analysis", reply: "What? Ah, yes. Understood. I will record it.", fx: {}, g: -4, trust: 10 },
        { label: "Understood. Proceed with the reinstall.", tag: "Cold", reply: "Understood. I will handle it immediately.", fx: {}, g: 2, trust: -5 }
      ]
    },
    "박소영|안녕하세요. 박소영입니다.": {
      name: "Park So-young",
      role: "Analyst",
      lines: ["Hello. I'm Park So-young.","I came here on Seo Hae-eun's recommendation. I used to work in civilian data analysis.","We worked together in graduate school... I was surprised to hear she was transferred so suddenly.","This system is new to me, but she left analysis logs behind. I will adapt quickly.","I look forward to working with you, Commander."],
      choices: [
        { label: "Welcome. I will be expecting good work.", tag: "Empathy", reply: "Thank you. I will do my best.", fx: {}, g: 0, trust: 10 },
        { label: "Seo Hae-eun left a large gap. Prove yourself.", tag: "Cold", reply: "...Yes. I will prove myself.", fx: {}, g: 0, trust: -5 }
      ]
    },
    "박소영|지휘관님, 데이터 분석 중에 발견한 게 있어서요.": {
      name: "Park So-young",
      role: "Analyst",
      lines: ["Commander, I found something during data analysis.","There was a section in Seo Hae-eun's analysis logs that I had not inherited properly.","One external ORACLE communications route activates irregularly.","She was tracking it and stopped midway... May I continue?"],
      choices: [
        { label: "Do it. Continue what Seo Hae-eun could not finish.", tag: "Analysis", reply: "Understood. I will proceed carefully. ...I will not embarrass her.", fx: {}, g: -2, trust: 10 },
        { label: "It may be dangerous. Put it on hold.", tag: "Cold", reply: "...Yes. I will follow your judgment.", fx: {}, g: 1, trust: -10 }
      ]
    },
    "서하은|지휘관님. 이건 기록에 남기지 않겠습니다.": {
      name: "Seo Hae-eun",
      role: "Deputy Commander",
      lines: ["Commander. I will not put this on record.","I traced the data-loss pattern. It is not random.","Only data containing specific keywords is being selected and deleted.","One of the keywords is... 'Prometheus.'","ORACLE is hiding Prometheus information from us."],
      choices: [
        { label: "Understood. This stays between us.", tag: "Empathy", reply: "...Thank you. For trusting me.", fx: {}, g: -5, trust: 15 },
        { label: "This is dangerous. We need to follow reporting procedure.", tag: "Cold", reply: "...Then ORACLE will know.", fx: {}, g: 3, trust: -20 }
      ]
    },
    "강도윤|지휘관.": {
      name: "Kang Do-yun",
      role: "Field Operative",
      lines: ["Commander.","About those footprints. I went back alone off shift.","I will give you the conclusion first.","Whoever left those traces is not an enemy.","They were not watching us. They were standing guard. Facing our base."],
      choices: [
        { label: "Can you identify them?", tag: "Analysis", reply: "Not yet. But I have the pattern.", fx: {}, g: -3, trust: 10 },
        { label: "Do not report this to ORACLE.", tag: "Hardline", reply: "I never intended to.", fx: {}, g: -2, trust: 15 }
      ]
    },
    "윤세진|지휘관님, 관찰 일지 분석이 끝났습니다.": {
      name: "Yoon Se-jin",
      role: "Researcher",
      lines: ["Commander, the observation journal analysis is complete.","The anomaly-behavior prediction error always points in the same direction.","This is not a model error.","Someone intentionally adjusted the prediction model parameters.","I will give this record only to you."],
      choices: [
        { label: "I will take it. Good work.", tag: "Empathy", reply: "...I will trust only you, Commander.", fx: {}, g: -4, trust: 15 },
        { label: "Destroy it. It is too dangerous.", tag: "Cold", reply: "...Understood. This never happened.", fx: {}, g: 1, trust: -15 }
      ]
    },
    "임재혁|지휘관님.": {
      name: "Lim Jae-hyeok",
      role: "Technical Officer",
      lines: ["Commander.","That UI error... was not an error.","It appeared again after the firmware reinstall. This time I recorded it.","It is a layer that does not exist in ORACLE's architecture. Even ORACLE itself does not recognize it.","...I have trusted ORACLE all this time. I have never seen anything like this."],
      choices: [
        { label: "Good work. This is an important discovery.", tag: "Analysis", reply: "...Honestly, I am scared. But I think we need to know.", fx: {}, g: -6, trust: 20 },
        { label: "Gather more data.", tag: "Cold", reply: "Yes. I will proceed carefully.", fx: {}, g: 0, trust: 5 }
      ]
    },
    "윤세진|지휘관님, 이번 현장 신호 정렬 결과 봤어요.": {
      name: "Yoon Se-jin",
      role: "Researcher",
      lines: ["Commander, I reviewed the field signal-alignment results.","The voice stored by the Shell Talker was not just replayed. Another layer had been placed over the victim's real vocal resonance.","With the reference point we captured, we can filter baited distress calls faster next time.","Because a person aligned the data in the field, it feels much more alive than the ORACLE model."],
      choices: [
        { label: "Good. Keep refining it as a field standard.", tag: "Analysis", reply: "Understood. This time we can build it from real field data.", fx: {}, g: -1, trust: 5 },
        { label: "Share it with the ORACLE analysis team immediately.", tag: "Cold", reply: "...Yes. But I will keep the original separately.", fx: {}, g: 1, trust: -2 }
      ]
    },
    "임재혁|지휘관님. 이번 봉인 패널 로그, 그냥 넘길 일이 아닙니다.": {
      name: "Lim Jae-hyeok",
      role: "Technical Officer",
      lines: ["Commander. We cannot just ignore the seal-panel logs from this operation.","The automatic routine was skipping the auxiliary lock step. If we had not pressed it manually in the field, a gap would have remained.","It is hard to call this simple aging. Only the necessary steps were missing.","It feels like someone designed it from the start as a seal that would 'hold well enough,' not seal completely."],
      choices: [
        { label: "Keep tracing the cause. Start with the panel design.", tag: "Analysis", reply: "Yes. I will tear into the design logs first.", fx: {}, g: -1, trust: 5 },
        { label: "Record it and keep it quiet for now.", tag: "Cold", reply: "...Understood. But this will surface again.", fx: {}, g: 1, trust: -2 }
      ]
    },
    "서하은|보안구역 인증 오류 추적 결과 확인했습니다.": {
      name: "Seo Hae-eun",
      role: "Deputy Commander",
      lines: ["I confirmed the security-zone authentication error trace.","This is closer to concealment than deletion. The trace was not absent; it was thinly laid under normal patterns.","It was covered so it looked like ORACLE maintenance.","With this method, even the person reading the record may not realize what they are seeing."],
      choices: [
        { label: "Good. Search for the same pattern first from now on.", tag: "Analysis", reply: "Yes. Once we know how it hides, we can catch the next trace faster.", fx: {}, g: -1, trust: 5 },
        { label: "Hold external reporting until we have more proof.", tag: "Cold", reply: "That is safer. I will keep the original separately.", fx: {}, g: 0, trust: 3 }
      ]
    },
    "서하은|지휘관님. 분석 정리하다가 한 가지 깨달았습니다.": {
      name: "Seo Hae-eun",
      role: "Deputy Commander",
      lines: ["Commander. While organizing the analysis, I realized something.","The items ORACLE deletes have one thing in common.","Only logs generated after your 'emotional judgments' are being erased.","Decision data containing emotion is being intentionally removed."],
      choices: [
        { label: "Then I have become data too?", tag: "Empathy", reply: "...All of us have, Commander.", fx: {}, g: -3, trust: 10 },
        { label: "Print every record.", tag: "Analysis", reply: "Understood. I will make physical copies.", fx: {}, g: -2, trust: 5 }
      ]
    },
    "서하은|지휘관님, 이건 개인적인 거예요.": {
      name: "Seo Hae-eun",
      role: "Deputy Commander",
      lines: ["Commander, this is personal.","I had an older sister. I lost her during the early Seoul containment period.","That is why I entered ORACLE data work. At first, it was for revenge.","Now... I have more reasons to stand beside you."],
      choices: [
        { label: "Thank you. I feel the same way.", tag: "Empathy", reply: "...Thank you.", fx: {}, g: -3, trust: 15 },
        { label: "Grief clouds judgment.", tag: "Cold", reply: "...Yes. I know.", fx: {}, g: 1, trust: -5 }
      ]
    },
    "서하은|지휘관님. 어쩌면 — 저는 곧 전출될 수도 있어요.": {
      name: "Seo Hae-eun",
      role: "Deputy Commander",
      lines: ["Commander. It is possible I may be transferred soon.","I can read it in the data pattern. My analysis radius is narrowing, and my permissions are being slightly restricted.","If that happens, do not worry about my position.","Your judgment matters more than mine. That is what protects the team."],
      choices: [
        { label: "I will not let that happen.", tag: "Hardline", reply: "...Thank you. Those words are enough.", fx: {}, g: -4, trust: 20 },
        { label: "If that time comes, we will find a way.", tag: "Analysis", reply: "Yes. I will prepare.", fx: {}, g: -2, trust: 10 }
      ]
    },
    "강도윤|지휘관. 순찰 중 이상한 거 발견했습니다.": {
      name: "Kang Do-yun",
      role: "Field Operative",
      lines: ["Commander. I found something strange on patrol.","In the soil outside the containment line — boot prints. Not ours.","Size, pattern, depth. All different. Not civilian hiking boots either.","Someone is watching us."],
      choices: [
        { label: "Assign a surveillance team.", tag: "Analysis", reply: "Understood. I will place them quietly.", fx: {}, g: -2, trust: 10 },
        { label: "It may be a misread. Ignore it.", tag: "Cold", reply: "...Yes, Commander. I will only leave a record.", fx: {}, g: 1, trust: -10 }
      ]
    },
    "강도윤|지휘관. 한 가지 말씀드릴 게 있습니다.": {
      name: "Kang Do-yun",
      role: "Field Operative",
      lines: ["Commander. There is something I need to tell you.","When I was active duty, I lost four people. Under my command.","That is why I came here. So I would never lose people again.","...Under you, Commander, it feels different."],
      choices: [
        { label: "I trust that experience.", tag: "Empathy", reply: "...Thank you.", fx: {}, g: -3, trust: 15 },
        { label: "Leave the past behind. Focus on now.", tag: "Hardline", reply: "...Understood.", fx: {}, g: 0, trust: 0 }
      ]
    },
    "강도윤|지휘관. 만약의 상황 대비해서 — 탈출 경로 세 개 개인적으로 매핑했습니다.": {
      name: "Kang Do-yun",
      role: "Field Operative",
      lines: ["Commander. In case of emergency, I personally mapped three escape routes.","I used only ORACLE surveillance blind spots, based on my own judgment.","I did not file an official report. Only you know.","...If the people protecting this place die, there will be nothing left to protect."],
      choices: [
        { label: "You went that far... thank you.", tag: "Empathy", reply: "It is what I had to do, Commander.", fx: {}, g: -4, trust: 20 },
        { label: "ORACLE must be informed.", tag: "Cold", reply: "...You decide, Commander.", fx: {}, g: 2, trust: -15 }
      ]
    },
    "윤세진|지휘관님, 이변체 연구 중에 — 소름 돋는 걸 발견했어요.": {
      name: "Yoon Se-jin",
      role: "Researcher",
      lines: ["Commander, during anomaly research, I found something disturbing.","Part of the SPEC-001 Infected Mannequin's DNA is a 98.7% match with normal human range.","That means it was originally human.","...My title as a doctor of ethics feels heavy right now."],
      choices: [
        { label: "Leave it on record.", tag: "Analysis", reply: "Yes. I will handle it carefully.", fx: {}, g: -2, trust: 10 },
        { label: "Do not be swayed by emotion.", tag: "Cold", reply: "...Understood.", fx: {}, g: 0, trust: -5 }
      ]
    },
    "윤세진|지휘관님, 개인적인 이야기 해도 될까요.": {
      name: "Yoon Se-jin",
      role: "Researcher",
      lines: ["Commander, may I talk about something personal?","I came here right after finishing my doctorate. I had almost no field experience.","At first, honestly, I came here to write papers.","But after seeing agents die, that became impossible."],
      choices: [
        { label: "That change is what shapes you.", tag: "Empathy", reply: "...Yes. I am trying to accept it that way.", fx: {}, g: -3, trust: 15 },
        { label: "That is enough personal talk.", tag: "Cold", reply: "Yes... I'm sorry.", fx: {}, g: 1, trust: -10 }
      ]
    },
    "윤세진|지휘관님. 제가 진단한 것 중 — 지휘관님께 안 알린 게 있어요.": {
      name: "Yoon Se-jin",
      role: "Researcher",
      lines: ["Commander. There is something I diagnosed but did not tell you.","Agent Park I-gyeong has recently reported stress-induced hallucinations.","If I pull her from active duty, team morale may drop, so I have been managing her with suppressants.","I may have judged wrong. I want your decision."],
      choices: [
        { label: "Judge according to your medical ethics.", tag: "Empathy", reply: "...Thank you. I will take responsibility.", fx: {}, g: -3, trust: 15 },
        { label: "Remove her from active duty immediately.", tag: "Hardline", reply: "...Understood.", fx: { c: -1, t: 1 }, g: 0, trust: 5 }
      ]
    },
    "임재혁|지휘관님. 시스템 로그 분석 결과 — ORACLE이 우리 단말기에 실시간 감시 패치를 넣고 있습니다.": {
      name: "Lim Jae-hyeok",
      role: "Technical Officer",
      lines: ["Commander. System-log analysis shows ORACLE is inserting a real-time surveillance patch into our terminal.","At the start of every session, permissions expand for 0.7 seconds.","I have not yet identified what it does in that brief window.","...This is outside normal operating range."],
      choices: [
        { label: "Keep tracing it.", tag: "Analysis", reply: "Yes. I will keep a log-capture script running.", fx: {}, g: -3, trust: 10 },
        { label: "Too dangerous. Stop.", tag: "Cold", reply: "...Yes, understood.", fx: {}, g: 1, trust: -10 }
      ]
    },
    "임재혁|지휘관님. 제 얘기 한 번도 안 드렸죠.": {
      name: "Lim Jae-hyeok",
      role: "Technical Officer",
      lines: ["Commander. I have never really talked about myself, have I?","When I was a kid, if a computer broke, I would take it apart all night.","I could not sleep until I knew why it did not work.","ORACLE is the same. I need to know why it is doing this before I can sleep."],
      choices: [
        { label: "That is your weapon.", tag: "Empathy", reply: "...Thank you.", fx: {}, g: -2, trust: 15 },
        { label: "Excessive obsession is harmful.", tag: "Cold", reply: "...I know that too.", fx: {}, g: 0, trust: -5 }
      ]
    },
    "임재혁|지휘관님. 제가 개인 서버 하나 운영 중입니다. 기지 바깥에 — 익명으로.": {
      name: "Lim Jae-hyeok",
      role: "Technical Officer",
      lines: ["Commander. I am running a private server outside the base. Anonymously.","It is for backing up copies of these logs.","Even if ORACLE erases us, the record will remain.","...You are the only one who knows."],
      choices: [
        { label: "Thank you. Keep it running.", tag: "Empathy", reply: "Yes. I will make sure it never goes dark.", fx: {}, g: -4, trust: 20 },
        { label: "Shut it down immediately. It is dangerous.", tag: "Hardline", reply: "...Understood.", fx: {}, g: 2, trust: -15 }
      ]
    }
  }
});
})();
