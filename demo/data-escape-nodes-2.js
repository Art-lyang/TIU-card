// data-escape-nodes-2.js — supplemental escape node tuning
if (typeof ESCAPE_NODES !== 'undefined') {
  Object.keys(ESCAPE_NODES).forEach(function(k){
    var n = ESCAPE_NODES[k];
    if (!n.body || !Array.isArray(n.body)) n.body = ['...'];
    if (!n.choices || !n.choices.length) {
      n.choices = [{ label:'계속', to:'ENDING', effect:{}, onSuccess:['계속 전진한다.'] }];
    }
  });
}

var ESCAPE_NODES_EN = {
  general_entry: {
    title: 'Gate Breakout Prep',
    body: [
      'Vehicle ignition is forbidden. Foot movement only.',
      'Observers on the gate side are counting personnel.',
      'If you do not cross while the relay channel stays quiet, it is over.',
      '"Gate route. If we survive the first two minutes, we can slip into the field."'
    ],
    choices: [
      { label:'Slip through weeds and concealment smoke', hint:'Containment-based roll', onSuccess:['The weeds swallow your sightline.', 'Initial surveillance shakes loose.'], onFail:['The weed cover opens too early.', 'Outer surveillance catches your movement.'] },
      { label:'Wait for the guard gap', hint:'Evaluation-based roll', onSuccess:['Now. A short gap opens.'], onFail:['The forest interval is shorter than expected.'] }
    ]
  },
  general_checkpoint: {
    title: 'Inner Check Line',
    body: [
      'A mechanical sound clicks at the side of the first checkpoint.',
      'The night-watch drone slowly rotates.',
      'You crossed the gate, but you are not safe yet.'
    ],
    choices: [
      { label:'Detour behind the drone sightline', hint:'Trust-based roll', onSuccess:['You leave the drone gaze behind.'], onFail:['The drone light catches your back.'] },
      { label:'Increase speed and break through', hint:'Resource-based roll', onSuccess:['The gate-control structure slides past.'], onFail:['Fragments and dust cling to you.'] }
    ]
  },
  general_final: {
    title: 'Coastal Access Line',
    body: [
      'A long shadow stretches across the outer infection zone.',
      'You hear the waves.',
      'Last 200 meters. The question is who finds whom first.'
    ],
    choices: [
      { label:'Keep the width and approach carefully', hint:'Stable route', onSuccess:['The outer perimeter opens ahead.'], onFail:['A final exchange breaks out.'] },
      { label:'Run straight into the extraction point', hint:'Breakthrough route', onSuccess:['You arrive at the extraction point without losing the team.'], onFail:['You are caught in open ground.'] }
    ]
  },
  b3_entry: {
    title: 'B3 Emergency Entrance',
    body: [
      'B3 descent. Metallic dust is thick in the air.',
      'The power corridor is quiet.',
      'The quarantine-direction sign is broken in two places.'
    ],
    choices: [
      { label:'Detour through the maintenance passage', hint:'Evaluation-based roll', onSuccess:['You pass a dead surveillance angle.'], onFail:['A locked door delays you.'] },
      { label:'Take the shortest route', hint:'Containment-based roll', onSuccess:['You pass the zone before the alarm sounds.'], onFail:['The sensor strikes late.'] }
    ]
  },
  b3_quarantine: {
    title: 'Quarantine Ward',
    body: [
      'The quarantine ward doors are half open.',
      'Something is imitating a human voice.',
      'A soft whisper. Record says the entity is here.'
    ],
    choices: [
      { label:'Pass without responding to the voice', hint:'Evaluation maintained', onSuccess:['You ignore the voice. That may have been the correct answer.'], onFail:['The mannequin notices your hesitation.'] },
      { label:'Break through with covering fire', hint:'Resource consumption', onSuccess:['Tracer fire cuts across the corridor.'], onFail:['It was too close.'] }
    ]
  },
  b3_final: {
    title: 'Emergency Vertical Route',
    body: [
      'An open hatch above the shaft.',
      'Outside air begins to flow in.',
      'Only the final climb remains.'
    ],
    choices: [
      { label:'Send companions up first', hint:'Trust correction', onSuccess:['Order holds until the end.'], onFail:['The lights turn on mid-climb.'] },
      { label:'Climb first and secure the exit', hint:'Speed correction', onSuccess:['You force the hatch open.'], onFail:['The hatch lock delays you.'] }
    ]
  }
};
