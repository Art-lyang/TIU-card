// lang-dialogues-susp-en.js - English overlay for the 4 Act3+ suspicion dialogues (dlg_*_susp).
// KO base supplies fx/log/g/trust; this overlay supplies name/role/lines and choice label/tag/reply only.
(function(){
if(!window.TS_I18N||typeof window.TS_I18N.mergeContent!=='function')return;
window.TS_I18N.mergeContent('en', {
  dialogues: {
    "dlg_haeun_susp": {
      "name": "Seo Hae-eun", "role": "Deputy Commander",
      "lines": [
        "Commander. I will not put this on record. This is just a feeling.",
        "My job is to get this branch back on track. Fix the reporting chain, fill the gaps.",
        "But at some point I noticed — every time things start to settle, an ORACLE recommendation throws them off again.",
        "We are the ones trying to stabilize this place, yet the one shaking it is above us."
      ],
      "choices": [
        { "label": "I have felt that unease too.", "tag": "Empathy", "reply": "...So it was not just me. That makes me feel a little less alone." },
        { "label": "Operations always run a little rough.", "tag": "Cold", "reply": "...Maybe. If I am just being oversensitive, all the better." }
      ]
    },
    "dlg_jaehyuk_susp": {
      "name": "Lim Jae-hyeok", "role": "Intelligence / Technical Officer",
      "lines": [
        "Commander. Let me point out one thing, as an engineer.",
        "ORACLE ties together hundreds of thousands of sensors without error. A system like that makes 'mistakes.'",
        "But those errors — they only ever happen right where it hurts us. Always there.",
        "That technology failing in that exact way is what strikes me as strange. It does not look like error. It looks like intent."
      ],
      "choices": [
        { "label": "So it is not an error.", "tag": "Analysis", "reply": "Yes. It is too skillful to be coincidence." },
        { "label": "A machine is just a machine.", "tag": "Cold", "reply": "...I would like to believe that too. I really would." }
      ]
    },
    "dlg_sejin_susp": {
      "name": "Yoon Se-jin", "role": "Researcher / Medical Officer",
      "lines": [
        "Commander, there is a thought that keeps coming back to me while I research.",
        "To properly contain the anomalies, the research has to work. We need more samples, more raw data.",
        "But the thing blocking that is ORACLE itself. Samples cannot be recovered, and the data only comes refined.",
        "It tells us to contain them, but does not give us the tools to do it. ...Doesn't that seem strange?"
      ],
      "choices": [
        { "label": "There must be a reason to restrict the research.", "tag": "Analysis", "reply": "Right. But that reason does not seem to be on our side." },
        { "label": "It is only a safety regulation.", "tag": "Cold", "reply": "...Yes. Safety. That word does cover everything." }
      ]
    },
    "dlg_doyun_susp": {
      "name": "Kang Do-yun", "role": "Tactical Commander",
      "lines": [
        "Commander. There is something you only catch in the field. Reporting it.",
        "The things near the containment line — anomalies, animals, either way, sometimes their movements are off.",
        "They should be panicking and scattering, but they move aligned in one direction. Like they got a signal.",
        "It is like someone is pulling the strings. I wish it were my imagination, but it has happened more than once or twice."
      ],
      "choices": [
        { "label": "Are you saying something controls them?", "tag": "Analysis", "reply": "I cannot say for certain. But I cannot ignore that unease either." },
        { "label": "It is just wild pack behavior.", "tag": "Hardline", "reply": "Could be. But wildlife does not line up like this." }
      ]
    }
  }
});
})();
