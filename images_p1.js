// TERMINAL SESSION - P1 image pack mappings
(function(){
  if (typeof IMG === 'undefined') return;

  Object.assign(IMG, {
    mission_m001: 'assets/images/missions/mission_m001_blood_pit_hero.jpg',
    mission_m002: 'assets/images/missions/mission_m002_shell_talker_hero.jpg',
    mission_m003: 'assets/images/missions/mission_m003_unclassified_trace_hero.jpg',
    mission_m004: 'assets/images/missions/mission_m004_mannequin_encounter_hero_v2.jpg',
    mission_m005: 'assets/images/missions/mission_m005_brood_drone_corridor_hero_v2.jpg',
    mission_m006: 'assets/images/missions/mission_m006_spore_phantom_hero.jpg',
    mission_m007: 'assets/images/missions/mission_m007_decisive_strike_hero.jpg',
    mission_m008: 'assets/images/missions/mission_m008_observation_stop_hero.jpg',
    spec_001_mannequin: 'assets/images/specs/spec_001_mannequin_hq_v2.jpg',
    spec_003_brood: 'assets/images/specs/spec_003_brood_hq_v2.jpg',
    spec_004_seedspreader: 'assets/images/specs/spec_004_seedspreader_hq.jpg',
    spec_008_spore: 'assets/images/specs/spec_008_spore_hq.jpg',
    spec_011_shelltalker: 'assets/images/specs/spec_011_shelltalker_hq.jpg',
    spec_012_bloodpit: 'assets/images/specs/spec_012_bloodpit_hq.jpg',
    spec_015_brainseeker: 'assets/images/specs/spec_015_brainseeker_hq.jpg',

    card_core_jaehyuk_overnight_data: 'assets/images/cards/core/card_core_jaehyuk_overnight_data.jpg',
    card_core_haeun_usb: 'assets/images/cards/core/card_core_haeun_usb.jpg',
    card_core_haeun_surveillance: 'assets/images/cards/core/card_core_haeun_surveillance.jpg',
    card_core_oracle_loyalty: 'assets/images/cards/core/card_core_oracle_loyalty.jpg',
    card_core_weber_arrival: 'assets/images/cards/core/card_core_weber_arrival.jpg',
    card_core_officers_command_room: 'assets/images/cards/core/card_core_officers_command_room.jpg',
    card_core_lab_corridor: 'assets/images/cards/core/card_core_lab_corridor.jpg',
    card_core_lab_corridor_alt: 'assets/images/cards/core/card_core_lab_corridor_alt.jpg',
    card_core_sewer_leak: 'assets/images/cards/core/card_core_sewer_leak.jpg',
    card_core_wastewater_discharge: 'assets/images/cards/core/card_core_wastewater_discharge.jpg',
    card_core_road_collapse: 'assets/images/cards/core/card_core_road_collapse.jpg',
    card_core_secret_passage: 'assets/images/cards/core/card_core_secret_passage.jpg',

    card_story_bloodpit_friendly_noise: 'assets/images/cards/story/card_story_bloodpit_friendly_noise.jpg',
    card_story_shelltalker_lure: 'assets/images/cards/story/card_story_shelltalker_lure.jpg',
    card_story_shelltalker_body_bait: 'assets/images/cards/story/card_story_shelltalker_body_bait.jpg',
    card_story_shelltalker_capture: 'assets/images/cards/story/card_story_shelltalker_capture.jpg',
    card_story_shelltalker_lab_containment: 'assets/images/cards/story/card_story_shelltalker_lab_containment.jpg',
    card_story_shell_walker: 'assets/images/cards/story/card_story_shell_walker.jpg',
    card_story_shelltalker_breach_escape: 'assets/images/cards/story/card_story_shelltalker_breach_escape.jpg',
    card_story_base_occupation: 'assets/images/cards/story/card_story_base_occupation.jpg',
    card_story_base_escape: 'assets/images/cards/story/card_story_base_escape.jpg',
    card_story_commander_subdued: 'assets/images/cards/story/card_story_commander_subdued.jpg',
    card_story_secret_escape_group: 'assets/images/cards/story/card_story_secret_escape_group.jpg',
    card_story_giant: 'assets/images/cards/story/card_story_giant.jpg',

    facility_fe001_cryo_storage: 'assets/images/facility/facility_fe001_cryo_storage.jpg',
    facility_fe002_training_ground: 'assets/images/facility/facility_fe002_training_ground.jpg',
    facility_fe003_sensor_array: 'assets/images/facility/facility_fe003_sensor_array.jpg',
    facility_fe004_medical_bay: 'assets/images/facility/facility_fe004_medical_bay.jpg',
    facility_fe005_supply_route: 'assets/images/facility/facility_fe005_supply_route.jpg',
    facility_fe006_cctv_control: 'assets/images/facility/facility_fe006_cctv_control.jpg',
    facility_fe007_emergency_bunker: 'assets/images/facility/facility_fe007_emergency_bunker.jpg',
    facility_fe008_north_patrol: 'assets/images/facility/facility_fe008_north_patrol.jpg',

    ending_escape_p1_hq: 'assets/images/endings/ending_escape_p1_hq.jpg',
    char_doyun_hq: 'assets/images/characters/char_doyun_hq_v2.jpg',
    char_foster_hq: 'assets/images/characters/char_foster_hq_v1.jpg',
    char_weber_hq: 'assets/images/characters/char_weber_hq_v1.jpg'
  });

  IMG.ending_E = IMG.ending_escape_p1_hq;
  IMG.char_doyun_panel = IMG.char_doyun_hq;
  IMG.char_foster_panel = IMG.char_foster_hq;
  IMG.char_weber_panel = IMG.char_weber_hq;

  var CARD_IMAGE_PATCHES = {
    'C-001': 'card_core_officers_command_room',
    'C-004': 'card_core_lab_corridor',
    'C-005': 'card_core_oracle_loyalty',
    'C-007': 'card_core_road_collapse',
    'C-008': 'card_core_haeun_surveillance',
    'C-009': 'card_core_jaehyuk_overnight_data',
    'C-023': 'card_core_wastewater_discharge',
    'C-024': 'card_core_lab_corridor_alt',
    'C-025': 'card_core_sewer_leak',
    'C-026': 'facility_fe006_cctv_control',
    'C-027': 'card_core_secret_passage',
    'C-035': 'card_core_haeun_usb',

    'C-010': 'card_story_bloodpit_friendly_noise',
    'C-028': 'card_story_shelltalker_lure',
    'C-029': 'mission_m001',
    'C-031': 'card_story_shelltalker_body_bait',
    'C-040': 'card_story_secret_escape_group',
    'C-042': 'mission_m004',
    'C-044': 'mission_m005',
    'C-046': 'mission_m006',
    'C-050': 'card_story_shell_walker',
    'C-051': 'card_story_shelltalker_capture',
    'CA4-R005': 'card_story_base_escape',
    'CR-004': 'card_story_commander_subdued',

    'FP-FE-001': 'facility_fe001_cryo_storage',
    'FP-FE-002': 'facility_fe002_training_ground',
    'FP-FE-003': 'facility_fe003_sensor_array',
    'FP-FE-004': 'facility_fe004_medical_bay',
    'FP-FE-005': 'facility_fe005_supply_route',
    'FP-FE-006': 'facility_fe006_cctv_control',
    'FP-FE-007': 'facility_fe007_emergency_bunker',
    'FP-FE-008': 'facility_fe008_north_patrol'
  };

  function patchList(list){
    if (!Array.isArray(list)) return;
    list.forEach(function(card){
      if (card && card.id && CARD_IMAGE_PATCHES[card.id]) {
        card.img = CARD_IMAGE_PATCHES[card.id];
      }
    });
  }

  if (typeof window !== 'undefined') {
    window.IMG = IMG;
    window.TIU_P1_CARD_IMAGE_PATCHES = CARD_IMAGE_PATCHES;
    Object.keys(window).forEach(function(key){
      if (/^CARDS_/.test(key)) patchList(window[key]);
    });
  }
})();
