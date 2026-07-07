// TERMINAL SESSION - P1 image pack mappings
// Loads after images.js/images_bg.js/images_cards.js as a deliberate patch layer:
// Object.assign upgrades existing IMG keys, then CARD_IMAGE_PATCHES mutates loaded
// card arrays so the static runtime can use the new P1 artwork without a build step.
(function(){
  if (typeof IMG === 'undefined') return;

  Object.assign(IMG, {
    mission_m001: 'assets/images/missions/mission_m001_blood_pit_hero.webp',
    mission_m002: 'assets/images/missions/mission_m002_shell_talker_hero.webp',
    mission_m003: 'assets/images/missions/mission_m003_unclassified_trace_hero.webp',
    mission_m004: 'assets/images/missions/mission_m004_mannequin_encounter_hero_v2.webp',
    mission_m005: 'assets/images/missions/mission_m005_brood_drone_corridor_hero_v2.webp',
    mission_m006: 'assets/images/missions/mission_m006_spore_phantom_hero.webp',
    mission_m007: 'assets/images/missions/mission_m007_decisive_strike_hero.webp?v=2',
    mission_m008: 'assets/images/missions/mission_m008_observation_stop_clean.webp',
    mission_m009: 'assets/images/missions/mission_m009_seed_spreader_hero.webp',
    mission_m010: 'assets/images/missions/mission_m010_brain_seeker_hero.webp',
    incident_mi01: 'assets/images/missions/incident_mi01_quarantine_seal_hero.webp',
    incident_mi02: 'assets/images/missions/incident_mi02_cctv_gap_hero.webp',
    incident_mi03: 'assets/images/missions/incident_mi03_sample_contamination_hero.webp',
    incident_mi04: 'assets/images/missions/incident_mi04_auth_trace_hero.webp',
    incident_mi05: 'assets/images/missions/incident_mi05_missing_route_hero.webp',
    // spec_* 키는 images.js가 최종(_hq) 경로를 직접 가리킨다 — 패치 불필요

    // 2026-07 신규 아트 배치 (채팅 업로드분 — 해안기지/복도/관제실/연구원/습격후/침투조)
    bg_base_coast: 'assets/images/backgrounds/bg_base_coast.webp',
    bg_corridor_b1: 'assets/images/backgrounds/bg_corridor_b1.webp',
    bg_control_room: 'assets/images/backgrounds/bg_control_room.webp',
    card_researcher_lab: 'assets/images/cards/card_researcher_lab.webp',
    card_raid_aftermath: 'assets/images/cards/card_raid_aftermath.webp',
    card_prometheus_infil: 'assets/images/cards/card_prometheus_infil.webp',
    card_core_jaehyuk_overnight_data: 'assets/images/cards/core/card_core_jaehyuk_overnight_data.webp',
    card_core_haeun_usb: 'assets/images/cards/core/card_core_haeun_usb.webp',
    card_core_haeun_surveillance: 'assets/images/cards/core/card_core_haeun_surveillance.webp',
    card_core_oracle_loyalty: 'assets/images/cards/core/card_core_oracle_loyalty.webp',
    card_core_oracle_firmware: 'assets/images/cards/core/card_core_oracle_firmware.webp',
    card_core_weber_arrival: 'assets/images/cards/core/card_core_weber_arrival.webp',
    card_core_officers_command_room: 'assets/images/cards/core/card_core_officers_command_room.webp',
    card_core_lab_corridor: 'assets/images/cards/core/card_core_lab_corridor.webp',
    card_core_lab_corridor_alt: 'assets/images/cards/core/card_core_lab_corridor_alt.webp',
    card_core_sewer_leak: 'assets/images/cards/core/card_core_sewer_leak.webp',
    card_core_wastewater_discharge: 'assets/images/cards/core/card_core_wastewater_discharge.webp',
    card_core_road_collapse: 'assets/images/cards/core/card_core_road_collapse.webp',
    card_core_secret_passage: 'assets/images/cards/core/card_core_secret_passage.webp',

    card_story_bloodpit_friendly_noise: 'assets/images/cards/story/card_story_bloodpit_friendly_noise.webp',
    card_story_shelltalker_lure: 'assets/images/cards/story/card_story_shelltalker_lure.webp',
    card_story_shelltalker_body_bait: 'assets/images/cards/story/card_story_shelltalker_body_bait.webp',
    card_story_shelltalker_capture: 'assets/images/cards/story/card_story_shelltalker_capture.webp',
    card_story_shelltalker_lab_containment: 'assets/images/cards/story/card_story_shelltalker_lab_containment.webp',
    card_story_shell_walker: 'assets/images/cards/story/card_story_shell_walker.webp',
    card_story_shelltalker_breach_escape: 'assets/images/cards/story/card_story_shelltalker_breach_escape.webp',
    card_story_base_occupation: 'assets/images/cards/story/card_story_base_occupation.webp',
    card_story_base_escape: 'assets/images/cards/story/card_story_base_escape.webp',
    card_story_commander_subdued: 'assets/images/cards/story/card_story_commander_subdued.webp',
    card_story_power_crisis: 'assets/images/cards/story/card_story_power_crisis.jpg',
    card_story_prometheus_wounded: 'assets/images/cards/story/card_story_prometheus_wounded.webp',
    card_story_kang_laststand: 'assets/images/cards/story/card_story_kang_laststand.webp',
    card_story_sejin_death: 'assets/images/cards/story/card_story_sejin_death.webp',
    card_story_kang_wounded: 'assets/images/cards/story/card_story_kang_wounded.jpg',
    card_story_mannequin_contact: 'assets/images/cards/story/card_story_mannequin_contact.webp',
    card_story_spore_phantom: 'assets/images/cards/story/card_story_spore_phantom.webp',
    card_story_shelltalker_corridor: 'assets/images/cards/story/card_story_shelltalker_corridor.jpg',
    card_story_secret_escape_group: 'assets/images/cards/story/card_story_secret_escape_group.webp',
    card_story_giant: 'assets/images/cards/story/card_story_giant.webp',

    card_helicopter_crash: 'assets/images/cards/card_helicopter_crash.webp',
    card_helicopter_crash_cctv: 'assets/video/navcam_helicopter.mp4',
    card_civilian_perimeter: 'assets/images/cards/card_civilian_perimeter.webp',
    card_civilian_perimeter_cctv: 'assets/video/navcam_civilian.mp4',
    card_prometheus_sighting: 'assets/images/cards/card_prometheus_sighting.webp',
    card_prometheus_sighting_cctv: 'assets/video/navcam_prometheus.mp4',
    card_foster_sighting: 'assets/images/cards/card_foster_sighting.webp',
    card_foster_sighting_cctv: 'assets/video/navcam_foster.mp4',
    card_mannequin_sighting: 'assets/images/cards/card_mannequin_sighting.webp',
    card_mannequin_sighting_cctv: 'assets/video/navcam_mannequin.mp4?v=2',
    card_brainseeker_breach: 'assets/images/cards/card_brainseeker_breach.webp',
    card_brainseeker_breach_cctv: 'assets/video/navcam_brainseeker.mp4',
    card_breach_horde: 'assets/images/cards/card_breach_horde.webp',
    card_breach_horde_cctv: 'assets/video/navcam_breach_horde.mp4',
    card_feed_gap: 'assets/images/cards/card_feed_gap.webp',
    card_feed_gap_cctv: 'assets/video/navcam_feed_gap.mp4',
    card_escape_route: 'assets/images/cards/card_escape_route.webp',
    card_escape_route_cctv: 'assets/video/navcam_escape_route.mp4',
    result_great: 'assets/images/missions/result_great.webp',
    result_success: 'assets/images/missions/result_success.webp',
    result_partial: 'assets/images/missions/result_partial.webp',
    result_setback: 'assets/images/missions/result_setback.webp',
    result_neutral: 'assets/images/missions/result_neutral.webp',
    result_mannequin: 'assets/images/missions/result_mannequin.webp',
    result_brood: 'assets/images/missions/result_brood.webp',
    result_seedspreader: 'assets/images/missions/result_seedspreader.webp',
    result_spore: 'assets/images/missions/result_spore.webp',
    result_shelltalker: 'assets/images/missions/result_shelltalker.webp',
    result_bloodpit: 'assets/images/missions/result_bloodpit.webp',
    result_brainseeker: 'assets/images/missions/result_brainseeker.webp',

    facility_fe001_cryo_storage: 'assets/images/facility/facility_fe001_cryo_storage.webp',
    facility_fe002_training_ground: 'assets/images/facility/facility_fe002_training_ground.webp',
    facility_fe003_sensor_array: 'assets/images/facility/facility_fe003_sensor_array.webp',
    facility_fe004_medical_bay: 'assets/images/facility/facility_fe004_medical_bay.webp',
    facility_fe005_supply_route: 'assets/images/facility/facility_fe005_supply_route.webp',
    facility_fe006_cctv_control: 'assets/images/facility/facility_fe006_cctv_control.webp',
    facility_fe007_emergency_bunker: 'assets/images/facility/facility_fe007_emergency_bunker.webp',
    facility_fe008_north_patrol: 'assets/images/facility/facility_fe008_north_patrol.webp',

    logo_oracle_hq: 'assets/images/logos/logo_oracle_hq_v1.webp',
    logo_oracle_emblem: 'assets/images/logos/logo_oracle_emblem.png',
    logo_oracle_mark: 'assets/images/logos/logo_oracle_mark.png',
    logo_prometheus_hq: 'assets/images/logos/logo_prometheus_hq_v1.webp',
    char_doyun_hq: 'assets/images/characters/char_doyun_hq_v3.webp',
    // 미확인 관찰자는 정체 공개 전까지 패널 자동 연결 없이 명시 장면에서만 사용한다.
    char_agent_kang_hq: 'assets/images/characters/char_agent_kang_hq_v1.webp',
    char_foster_hq: 'assets/images/characters/char_foster_hq_v1.webp',
    char_weber_hq: 'assets/images/characters/char_weber_hq_v1.webp'
  });

  IMG.char_doyun = IMG.char_doyun_hq;
  IMG.char_doyun_panel = IMG.char_doyun_hq;
  IMG.char_foster_panel = IMG.char_foster_hq;
  IMG.char_weber_panel = IMG.char_weber_hq;

  var CHARACTER_IMAGE_UPGRADES = {
    '\uC11C\uD558\uC740': { base: 'char_haeun_panel', panel: 'char_haeun_panel' },
    '\uC11C\uD558\uC740_\uAE34\uC7A5': { base: 'char_haeun_tense_panel', panel: 'char_haeun_tense_panel' },
    '\uAC15\uB3C4\uC724': { base: 'char_doyun_panel', panel: 'char_doyun_panel' },
    '\uC724\uC138\uC9C4': { base: 'char_sejin_panel', panel: 'char_sejin_panel' },
    '\uC784\uC7AC\uD601': { base: 'char_jaehyuk_panel', panel: 'char_jaehyuk_panel' },
    '\uC784\uC7AC\uD601_\uC2E4\uB9DD': { base: 'char_jaehyuk_sad_panel', panel: 'char_jaehyuk_sad_panel' },
    '\uB9C8\uB974\uCFE0\uC2A4 \uBCA0\uBC84': { base: 'char_weber_panel', panel: 'char_weber_panel' },
    '\uB2C9 \uD3EC\uC2A4\uD130': { base: 'char_foster_panel', panel: 'char_foster_panel' },
    '\uBC15\uC18C\uC601': { base: 'char_soyoung_panel', panel: 'char_soyoung_panel' },
    '\uBC15\uC18C\uC601_\uADF8\uB9BC\uC790': { base: 'char_soyoung_shadow_panel', panel: 'char_soyoung_shadow_panel' },
    '\uC774\uC911\uCCA0': { base: 'char_jungchul_panel', panel: 'char_jungchul_panel' }
  };

  Object.keys(CHARACTER_IMAGE_UPGRADES).forEach(function(name){
    var cfg = CHARACTER_IMAGE_UPGRADES[name];
    var base = cfg && IMG[cfg.base];
    var panel = cfg && IMG[cfg.panel];
    if (base && typeof CHAR_IMG !== 'undefined') CHAR_IMG[name] = base;
    if (panel && typeof CHAR_PANEL_IMG !== 'undefined') CHAR_PANEL_IMG[name] = panel;
  });

  Object.assign(IMG, {
    char_haeun: IMG.char_haeun_panel,
    char_haeun_tense: IMG.char_haeun_tense_panel,
    char_jaehyuk: IMG.char_jaehyuk_panel,
    char_jaehyuk_sad: IMG.char_jaehyuk_sad_panel,
    char_jungchul: IMG.char_jungchul_panel,
    char_sejin: IMG.char_sejin_panel,
    char_soyoung: IMG.char_soyoung_panel,
    char_soyoung_shadow: IMG.char_soyoung_shadow_panel,
    char_weber: IMG.char_weber_panel,
    char_foster: IMG.char_foster_panel
  });

  var CARD_IMAGE_PATCHES = {
    'CE-036': 'card_researcher_lab',      // 윤세진 이변체 샘플 연구
    'C-052': 'card_prometheus_infil',     // 프로메테우스 정찰 드론 잔해
    'C-001': 'card_core_officers_command_room',
    'C-004': 'card_core_lab_corridor',
    'C-005': 'card_core_oracle_firmware',
    'C-007': 'card_core_road_collapse',
    'C-008': 'card_core_haeun_surveillance',
    'C-009': 'card_core_jaehyuk_overnight_data',
    'C-023': 'card_core_wastewater_discharge',
    'C-024': 'card_core_lab_corridor_alt',
    'C-026': 'facility_fe006_cctv_control',
    'C-027': 'card_core_secret_passage',
    'C-035': 'card_core_haeun_usb',

    'C-010': 'card_story_bloodpit_friendly_noise',
    'C-028': 'card_story_shelltalker_lure',
    'C-029': 'mission_m001',
    'C-031': 'card_story_shelltalker_body_bait',
    'C-040': 'card_core_jaehyuk_overnight_data',
    'C-044': 'mission_m005',
    'C-046': 'mission_m006',
    'C-272': 'mission_m009',
    'C-275': 'mission_m010',
    'C-050': 'card_story_shell_walker',
    'C-051': 'card_story_shelltalker_capture',
    'CA4-R005': 'card_story_base_escape',
    'CR-004': 'card_story_power_crisis',
    'C-054': 'card_story_prometheus_wounded',
    'C-190': 'card_story_kang_laststand',
    'C-YS-DEATH': 'card_story_sejin_death',
    'C-181': 'card_story_kang_wounded',
    'C-043': 'card_story_mannequin_contact',
    'C-095': 'card_story_spore_phantom',
    'C-003': 'card_story_shelltalker_corridor',

    'CH-I01A-2': 'incident_mi01',
    'CH-I01B-2': 'incident_mi01',
    'CH-I02A-2': 'incident_mi02',
    'CH-I02B-2': 'incident_mi02',
    'CH-I03A-2': 'incident_mi03',
    'CH-I03B-2': 'incident_mi03',
    'CH-I04A-2': 'incident_mi04',
    'CH-I04B-2': 'incident_mi04',
    'CH-I05A-2': 'incident_mi05',
    'CH-I05B-2': 'incident_mi05',

    'FP-FE-001': 'facility_fe001_cryo_storage',
    'FP-FE-002': 'facility_fe002_training_ground',
    'FP-FE-003': 'facility_fe003_sensor_array',
    'FP-FE-004': 'facility_fe004_medical_bay',
    'FP-FE-005': 'facility_fe005_supply_route',
    'FP-FE-006': 'facility_fe006_cctv_control',
    'FP-FE-007': 'facility_fe007_emergency_bunker',
    'FP-FE-008': 'facility_fe008_north_patrol',
    'FP-FE-009': 'facility_fe001_cryo_storage',
    'FP-FE-010': 'facility_fe006_cctv_control',
    'FP-FE-011': 'facility_fe004_medical_bay',
    'FP-FE-012': 'facility_fe006_cctv_control',
    'FP-FE-013': 'card_core_jaehyuk_overnight_data',
    'FP-FE-014': 'facility_fe005_supply_route',
    'FP-FE-015': 'card_core_officers_command_room',
    'FP-FE-016': 'facility_fe002_training_ground',
    'C-FE009-A': 'facility_fe001_cryo_storage',
    'C-FE010-A': 'facility_fe006_cctv_control',
    'C-FE011-A': 'facility_fe004_medical_bay',
    'C-FE012-A': 'facility_fe006_cctv_control',
    'C-FE013-A': 'card_core_jaehyuk_overnight_data',
    'C-FE014-A': 'facility_fe005_supply_route',
    'C-FE015-A': 'card_core_officers_command_room',
    'C-FE016-A': 'facility_fe002_training_ground'
  };

  function patchList(list){
    if (!Array.isArray(list)) return;
    list.forEach(function(card){
      if (card && card.id && CARD_IMAGE_PATCHES[card.id]) {
        card.img = CARD_IMAGE_PATCHES[card.id];
      }
    });
  }

  function patchChains(chains){
    if (!chains) return;
    Object.keys(chains).forEach(function(key){
      patchList(chains[key] && chains[key].cards);
    });
  }

  if (typeof window !== 'undefined') {
    window.IMG = IMG;
    window.TIU_CHARACTER_IMAGE_UPGRADES = CHARACTER_IMAGE_UPGRADES;
    window.TIU_P1_CARD_IMAGE_PATCHES = CARD_IMAGE_PATCHES;
    Object.keys(window).forEach(function(key){
      if (/^CARDS_/.test(key)) patchList(window[key]);
    });
    if (typeof CHAINS !== 'undefined') patchChains(CHAINS);
  }
})();
