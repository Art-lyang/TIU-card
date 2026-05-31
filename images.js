// TERMINAL SESSION - base image registry. P1 patch mappings load later via images_p1.js.
const IMG = {
  bg_seoul_a: "assets/images/backgrounds/bg_seoul_a.jpg",
  bg_seoul_b: "assets/images/backgrounds/bg_seoul_b.jpg",
  char_doyun: "assets/images/characters/char_doyun_hq_v3.jpg",
  char_doyun_panel: "assets/images/characters/char_doyun_hq_v3.jpg",
  char_foster: "assets/images/characters/char_foster.jpg",
  char_foster_panel: "assets/images/characters/char_foster_v2.jpg",
  char_haeun_tense: "assets/images/characters/char_haeun_tense.jpg",
  char_haeun_tense_panel: "assets/images/characters/char_haeun_tense_v2.jpg",
  char_haeun: "assets/images/characters/char_haeun.jpg",
  char_haeun_panel: "assets/images/characters/char_haeun_v2.jpg",
  char_jaehyuk_sad: "assets/images/characters/char_jaehyuk_sad.jpg",
  char_jaehyuk_sad_panel: "assets/images/characters/char_jaehyuk_sad_v2.jpg",
  char_jaehyuk: "assets/images/characters/char_jaehyuk.jpg",
  char_jaehyuk_panel: "assets/images/characters/char_jaehyuk_v2.jpg",
  char_jungchul: "assets/images/characters/char_jungchul.jpg",
  char_jungchul_panel: "assets/images/characters/char_jungchul_v2.jpg",
  char_sejin: "assets/images/characters/char_sejin.jpg",
  char_sejin_panel: "assets/images/characters/char_sejin_v2.jpg",
  char_soyoung_shadow: "assets/images/characters/char_soyoung_shadow.jpg",
  char_soyoung_shadow_panel: "assets/images/characters/char_soyoung_shadow_v2.jpg",
  char_soyoung: "assets/images/characters/char_soyoung.jpg",
  char_soyoung_panel: "assets/images/characters/char_soyoung_v2.jpg",
  char_weber: "assets/images/characters/char_weber.jpg",
  char_weber_panel: "assets/images/characters/char_weber_v2.jpg",
  spec_011_shelltalker: "assets/images/specs/spec_011_shelltalker.jpg",
  spec_012_bloodpit: "assets/images/specs/spec_012_bloodpit.jpg",
  spec_004_seedspreader: "assets/images/specs/spec_004_seedspreader.jpg",
  spec_015_brainseeker: "assets/images/specs/spec_015_brainseeker.jpg",
  bg_command: "assets/images/backgrounds/bg_command.jpg",
  bg_corridor: "assets/images/backgrounds/bg_corridor.jpg",
  title_screen: "assets/images/backgrounds/title_screen.jpg",
  bg_restricted: "assets/images/backgrounds/bg_restricted.jpg",
  spec_001_mannequin: "assets/images/specs/spec_001_mannequin_hq_v2.jpg",
  spec_003_brood: "assets/images/specs/spec_003_brood_hq_v2.jpg",
  spec_008_spore: "assets/images/specs/spec_008_spore.jpg",
  ending_A: "assets/images/endings/ending_A.png",
  ending_B: "assets/images/endings/ending_B.png",
  ending_C_c: "assets/images/endings/ending_C_c.png",
  ending_C_cs: "assets/images/endings/ending_C_cs.png",
  ending_C_cst: "assets/images/endings/ending_C_cst.png",
  ending_C_o: "assets/images/endings/ending_C_o.png",
  ending_C_r: "assets/images/endings/ending_C_r.png",
  ending_C_t: "assets/images/endings/ending_C_t.png",
  ending_D: "assets/images/endings/ending_D.png",
  ending_E: "assets/images/endings/ending_E.png",
  ending_E_bad: "assets/images/endings/ending_E_bad.png",
  ending_E_c: "assets/images/endings/ending_E_c.png",
  ending_F: "assets/images/endings/ending_F.png",
  ending_G: "assets/images/endings/ending_G.png",
  ending_H: "assets/images/endings/ending_H.png",
  ending_TIME_UP: "assets/images/endings/ending_TIME_UP.svg",
};

const CHAR_IMG = {
  "이중철": IMG.char_jungchul,
  "서하은": IMG.char_haeun,
  "서하은_긴장": IMG.char_haeun_tense,
  "강도윤": IMG.char_doyun,
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
