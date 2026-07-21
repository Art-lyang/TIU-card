// TERMINAL SESSION - base image registry. P1 patch mappings load later via images_p1.js.
const IMG = {
  bg_seoul_a: "assets/images/backgrounds/bg_seoul_a.jpg",
  bg_seoul_b: "assets/images/backgrounds/bg_seoul_b.jpg",
  char_doyun: "assets/images/characters/char_doyun_hq_v3.webp",
  char_doyun_panel: "assets/images/characters/char_doyun_hq_v3.webp",
  char_foster: "assets/images/characters/char_foster.webp",
  char_foster_panel: "assets/images/characters/char_foster_v2.webp",
  char_haeun_tense: "assets/images/characters/char_haeun_tense.webp",
  char_haeun_tense_panel: "assets/images/characters/char_haeun_tense_v2.webp",
  char_haeun: "assets/images/characters/char_haeun.webp",
  char_haeun_panel: "assets/images/characters/char_haeun_v2.webp",
  char_jaehyuk_sad: "assets/images/characters/char_jaehyuk_sad.jpg",
  char_jaehyuk_sad_panel: "assets/images/characters/char_jaehyuk_sad_v2.webp",
  char_jaehyuk: "assets/images/characters/char_jaehyuk.jpg",
  char_jaehyuk_panel: "assets/images/characters/char_jaehyuk_v2.webp",
  char_jungchul: "assets/images/characters/char_jungchul.jpg",
  char_jungchul_panel: "assets/images/characters/char_jungchul_v2.webp",
  char_sejin: "assets/images/characters/char_sejin.webp",
  char_sejin_panel: "assets/images/characters/char_sejin_v2.webp",
  char_soyoung_shadow: "assets/images/characters/char_soyoung_shadow.webp",
  char_soyoung_shadow_panel: "assets/images/characters/char_soyoung_shadow_v2.webp",
  char_soyoung: "assets/images/characters/char_soyoung.jpg",
  char_soyoung_panel: "assets/images/characters/char_soyoung_v2.webp",
  char_weber: "assets/images/characters/char_weber.webp",
  char_weber_panel: "assets/images/characters/char_weber_v2.webp",
  spec_011_shelltalker: "assets/images/specs/spec_011_shelltalker_hq.webp",
  spec_012_bloodpit: "assets/images/specs/spec_012_bloodpit_hq.webp",
  spec_004_seedspreader: "assets/images/specs/spec_004_seedspreader_hq.webp",
  spec_015_brainseeker: "assets/images/specs/spec_015_brainseeker_hq.webp",
  bg_command: "assets/images/backgrounds/bg_command.jpg",
  bg_corridor: "assets/images/backgrounds/bg_corridor.jpg",
  title_screen: "assets/images/backgrounds/title_screen.webp",
  bg_restricted: "assets/images/backgrounds/bg_restricted.jpg",
  spec_001_mannequin: "assets/images/specs/spec_001_mannequin_hq_v2.webp",
  spec_003_brood: "assets/images/specs/spec_003_brood_hq_v2.webp",
  spec_008_spore: "assets/images/specs/spec_008_spore_hq.webp",
  // 엔딩 표시는 WebP(840px, ~20-90KB) 사용 — PNG 원본은 마스터로 보존
  ending_A: "assets/images/endings/ending_A.webp",
  ending_B: "assets/images/endings/ending_B.webp",
  ending_C_c: "assets/images/endings/ending_C_c.webp",
  ending_C_cs: "assets/images/endings/ending_C_cs.webp",
  ending_C_cst: "assets/images/endings/ending_C_cst.webp",
  ending_C_o: "assets/images/endings/ending_C_o.webp",
  ending_C_r: "assets/images/endings/ending_C_r.webp",
  ending_C_t: "assets/images/endings/ending_C_t.webp",
  ending_D: "assets/images/endings/ending_D.webp",
  ending_E: "assets/images/endings/ending_E.webp",
  ending_E_all: "assets/images/endings/ending_E_all.webp",
  ending_E_bad: "assets/images/endings/ending_E_bad.webp",
  ending_E_c: "assets/images/endings/ending_E_c.webp",
  ending_F: "assets/images/endings/ending_F.webp",
  ending_G: "assets/images/endings/ending_G.webp",
  ending_H: "assets/images/endings/ending_H.webp",
  ending_TIME_UP: "assets/images/endings/ending_TIME_UP.svg",
};

const CHAR_IMG = {
  "이중철": IMG.char_jungchul,
  "서하은": IMG.char_haeun,
  "서하은_긴장": IMG.char_haeun_tense,
  "강도윤": IMG.char_doyun,
  "강도윤_부상": 'assets/images/characters/emotions/char_doyun_wounded_v1.webp',
  "윤세진": IMG.char_sejin,
  "임재혁": IMG.char_jaehyuk,
  "임재혁_실망": IMG.char_jaehyuk_sad,
  "마르쿠스 베버": IMG.char_weber,
  "닉 포스터": IMG.char_foster,
  "박소영": IMG.char_soyoung,
  "박소영_그림자": IMG.char_soyoung_shadow,
};

const CHAR_PANEL_IMG = {
  "이중철": IMG.char_jungchul_panel,
  "서하은": IMG.char_haeun_panel,
  "서하은_긴장": IMG.char_haeun_tense_panel,
  "강도윤": IMG.char_doyun_panel,
  "윤세진": IMG.char_sejin_panel,
  "임재혁": IMG.char_jaehyuk_panel,
  "임재혁_실망": IMG.char_jaehyuk_sad_panel,
  "마르쿠스 베버": IMG.char_weber_panel,
  "닉 포스터": IMG.char_foster_panel,
  "박소영": IMG.char_soyoung_panel,
  "박소영_그림자": IMG.char_soyoung_shadow_panel,
};

const CHAR_IDENTITY = {
  haeun: { code: "KR-B3-CMD-02", bars: "|||| ||| || |||| | |||" },
  doyun: { code: "KR-B3-FIELD-03", bars: "||| |||| | || ||||| ||" },
  sejin: { code: "KR-B3-SCI-05", bars: "|| ||||| ||| | |||| ||" },
  jaehyuk: { code: "KR-B3-TECH-04", bars: "||| || |||| | ||| ||||| ||" },
  soyoung: { code: "KR-B3-ANL-07", bars: "|||| | ||| |||| || | ||" },
  weber: { code: "EXT-PROM-WBR", bars: "|| |||| || | ||||| |||" },
  foster: { code: "EXT-PROM-FST", bars: "||| | ||||| || |||| |" },
  jungchul: { code: "KR-B3-CMD-00", bars: "||||| || ||| | |||| ||" },
};

function getCharacterPanelInfo(name,key,role){
  var keyByName={"서하은":"haeun","서하은_긴장":"haeun","강도윤":"doyun","윤세진":"sejin","임재혁":"jaehyuk","임재혁_실망":"jaehyuk","박소영":"soyoung","박소영_그림자":"soyoung","마르쿠스 베버":"weber","닉 포스터":"foster","이중철":"jungchul"};
  var k=key||keyByName[name]||'';
  var ident=CHAR_IDENTITY[k]||{code:"KR-B3-UNREG",bars:"||| || | |||| |||"};
  return {
    image:(CHAR_PANEL_IMG&&CHAR_PANEL_IMG[name])||(CHAR_IMG&&CHAR_IMG[name])||null,
    code:ident.code,
    bars:ident.bars,
    role:role||''
  };
}
