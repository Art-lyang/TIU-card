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
    }
  }
});
})();