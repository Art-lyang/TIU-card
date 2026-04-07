// data-cards-11.js — 연계 체인 카드 (C-179~C-192)
// 신규요원 훈련 체인, 식수 오염 체인, 야간 습격+강도윤 생존/사망 체인

var CARDS_CHAINS = [

  // ═══ 체인 1: 신규요원 훈련 ═══
  // C-001 즉시배치(right) → LOG-062 → C-179 훈련 기준미달
  { id: "C-179", act: [1,2], priority: "\uc911", bg: "base",
    cond: function(s,g,logs){ return logs.includes("LOG-062") && !logs.includes("LOG-063") && !logs.includes("LOG-064") },
    msg: "\uc2e0\uaddc \uc694\uc6d0 \ud6c8\ub828 \uacb0\uacfc\uac00 \ubcf4\uace0\ub418\uc5c8\uc2b5\ub2c8\ub2e4.\n\n\uac15\ub3c4\uc724: \"\uc2e4\uc804 \ub300\uc751 \uae30\uc900 \ubbf8\ub2ec. \uc0ac\uaca9 \uc815\ud655\ub3c4, \ud1b5\uc2e0 \uc808\ucc28 \ubaa8\ub450 \ubd80\uc871\ud569\ub2c8\ub2e4.\"\n\n\"\uc774\ub300\ub85c \ud604\uc7a5\uc5d0 \ub0b4\ubcf4\ub0b4\uba74 \uc704\ud5d8\ud569\ub2c8\ub2e4.\"",
    left: { label: "\uc5c4\uaca9\ud55c \uc7ac\ud6c8\ub828 \uc2e4\uc2dc", fx: { c: 0, r: -1, t: -1, o: 1 }, g: 1 },
    right: { label: "\uc2e4\uc804\uc774 \ucd5c\uace0\uc758 \ud6c8\ub828\uc774\ub2e4", fx: { c: 0, r: 0, t: 1, o: -1 }, g: -1 } },

  // 엄격교육 성공 루트: LOG-063 → C-180
  { id: "C-180", act: [1,2], priority: "\uc911", bg: "forest",
    cond: function(s,g,logs){ return logs.includes("LOG-063") && !logs.includes("LOG-063-DONE") },
    msg: "\uc7ac\ud6c8\ub828\uc744 \ub9c8\uce5c \uc2e0\uaddc \uc694\uc6d0\uc774 \ud604\uc7a5 \uc784\ubb34\uc5d0 \ud22c\uc785\ub418\uc5c8\uc2b5\ub2c8\ub2e4.\n\n\uac15\ub3c4\uc724: \"\ud6c8\ub828 \uc131\uacfc\uac00 \ub098\uc654\uc2b5\ub2c8\ub2e4. \ubcf4\uace0\ub4dc\ub9ac\uaca0\uc2b5\ub2c8\ub2e4.\"\n\n\ubd09\uc1c4\uc120 3\uad6c\uc5ed \uc21c\ucc30 \uc911 \uc774\ubcc0\uccb4 \uc811\ucd09 \u2014 \uc2e0\uaddc \uc694\uc6d0\uc774 \uce68\ucc29\ud558\uac8c \ub300\uc751\ud588\uc2b5\ub2c8\ub2e4.\n\n\"\ud6c8\ub828\ub300\ub85c \uc6c0\uc9c1\uc600\uc2b5\ub2c8\ub2e4. \ud6c8\ub96d\ud55c \uc784\ubb34 \uc218\ud589\uc774\uc5c8\uc2b5\ub2c8\ub2e4.\"",
    left: { label: "\uc798\ud588\ub2e4\uace0 \uc804\ud574\ub77c", fx: { c: 1, r: 0, t: 2, o: 1 }, g: 1 },
    right: { label: "\uae30\ub85d\ub9cc \ub0a8\uaca8\ub450\uc5b4\ub77c", fx: { c: 1, r: 0, t: 1, o: 1 }, g: 1 } },

  // 안일한 대처 실패 루트: LOG-064 → C-181
  { id: "C-181", act: [1,2], priority: "\uc0c1", bg: "forest",
    cond: function(s,g,logs){ return logs.includes("LOG-064") && !logs.includes("LOG-065") },
    msg: "\uae34\uae09 \ubcf4\uace0.\n\n\uc2e0\uaddc \uc694\uc6d0\uc774 \ud604\uc7a5 \uc784\ubb34 \uc911 \uc774\ubcc0\uccb4\uc640 \uc870\uc6b0\ud588\uc2b5\ub2c8\ub2e4. \ud6c8\ub828 \ubd80\uc871\uc73c\ub85c \ub300\uc751\uc774 \ub2a6\uc5c8\uace0, \uac15\ub3c4\uc724\uc774 \uad6c\ucd9c\uc5d0 \ub098\uc11c\uba74\uc11c \ubd80\uc0c1\uc744 \uc785\uc5c8\uc2b5\ub2c8\ub2e4.\n\n\uc724\uc138\uc9c4: \"\uc2e0\uaddc \uc694\uc6d0\uc740 \uacbd\uc0c1. \uac15\ub3c4\uc724\uc740... \uc624\ub978\ucabd \uc5b4\uae68\uc5d0 \uc5f4\uc0c1\uc785\ub2c8\ub2e4. 2\uc8fc \uc774\uc0c1 \ud604\uc7a5 \ubcf5\uadc0 \ubd88\uac00.\"\n\n\uac15\ub3c4\uc724: \"...\uc81c \ud0d3\uc774 \uc544\ub2d9\ub2c8\ub2e4. \uc9c0\ud718\uad00.\"",
    left: { label: "\ucc45\uc784\uc740 \ub098\uc5d0\uac8c \uc788\ub2e4", fx: { c: -1, r: -1, t: 1, o: -2 }, g: -2 },
    right: { label: "\ubcf4\uace0\uc11c \uc791\uc131\ud574\ub77c", fx: { c: -1, r: 0, t: -1, o: 0 }, g: 0 } },

  // 실패 후 변이체 습격: LOG-065 → C-182
  { id: "C-182", act: [1,2], priority: "\uc0c1", bg: "forest",
    cond: function(s,g,logs){ return logs.includes("LOG-065") && !logs.includes("LOG-065-ATK") },
    msg: "\uc57c\uac04 \uacbd\ubcf4.\n\n\uc774\uc804 \uc784\ubb34 \uc2e4\ud328 \uc9c0\uc810 \ubc18\uacbd 500m\uc5d0\uc11c \uc774\ubcc0\uccb4 \ubc18\uc751 \uac10\uc9c0. \ud53c\ub0c4\uc0c8\ub97c \ub530\ub77c\uc628 \uac83\uc73c\ub85c \ucd94\uc815.\n\n\uac15\ub3c4\uc724 \ubd80\uc0c1\uc73c\ub85c \ud604\uc7a5 \uc9c0\ud718 \ubd88\uac00. \ub300\uccb4 \uc694\uc6d0 \ubd80\uc871.\n\n\"\ubd09\uc1c4\uc120 2\uad6c\uc5ed \uc774\uc0c1 \uc9c4\ub3d9 \uac10\uc9c0!\"",
    left: { label: "\uc794\uc5ec \uc694\uc6d0 \ucd1d\ub3d9\uc6d0", fx: { c: -2, r: -2, t: 0, o: 0 }, g: 0 },
    right: { label: "\ubc29\uc5b4 \uc9c4\uc9c0 \uace0\uc218", fx: { c: -1, r: -1, t: -1, o: 0 }, g: 0 } },

  // ORACLE 신입교육 강경대응 권고: LOG-065-ATK → C-183
  { id: "C-183", act: [1,2], priority: "\uc911", bg: "oracle",
    cond: function(s,g,logs){ return logs.includes("LOG-065-ATK") && !logs.includes("LOG-065-END") },
    msg: "[ORACLE \uad8c\uace0\uc0ac\ud56d]\n\n\"\uc2e0\uaddc \uc694\uc6d0 \ud6c8\ub828 \ubd80\uc871\uc73c\ub85c \uc778\ud55c \uc5f0\uc1c4 \uc0ac\uace0\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4.\n\ud5a5\ud6c4 \uc2e0\uaddc \uc694\uc6d0 \ubc30\uce58 \uc2dc ORACLE \uac15\ud654 \uad50\uc721 \ud504\ub85c\ud1a0\ucf5c\uc744 \uc801\uc6a9\ud560 \uac83\uc744 \uad8c\uace0\ud569\ub2c8\ub2e4.\"\n\n\"\uc774\ud589\ub960 100%\ub97c \ubcf4\uc7a5\ud569\ub2c8\ub2e4. \uc2b9\uc778\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?\"",
    left: { label: "\uc2b9\uc778\ud55c\ub2e4", fx: { c: 1, r: 0, t: -2, o: 2 }, g: 3 },
    right: { label: "\uc778\uac04\uc774 \uad50\uc721\ud55c\ub2e4", fx: { c: 0, r: -1, t: 1, o: -1 }, g: -2 } },

  // ═══ 체인 2: 식수 오염 연쇄 ═══
  // 조건: LOG-066, LOG-067, LOG-068 중 2개 이상 → C-184 집단 식중독
  { id: "C-184", act: [1,2], priority: "\uc0c1", bg: "base",
    cond: function(s,g,logs){
      var cnt = 0;
      if(logs.includes("LOG-066")) cnt++;
      if(logs.includes("LOG-067")) cnt++;
      if(logs.includes("LOG-068")) cnt++;
      return cnt >= 2 && !logs.includes("LOG-069") },
    msg: "\uae34\uae09 \ubcf4\uace0.\n\n\uae30\uc9c0 \uc694\uc6d0 12\uba85\uc774 \uc9d1\ub2e8 \uc2dd\uc911\ub3c5 \uc99d\uc0c1\uc744 \ubcf4\uc774\uace0 \uc788\uc2b5\ub2c8\ub2e4.\n\n\uc724\uc138\uc9c4: \"\uc218\uc9c8 \uc624\uc5fc\uc774 \ub204\uc801\ub41c \uacb0\uacfc\uc785\ub2c8\ub2e4. \uc815\ud654 \uc2dc\uc2a4\ud15c\uc774 \uc81c\ub300\ub85c \uc791\ub3d9\ud558\uc9c0 \uc54a\uc558\uc2b5\ub2c8\ub2e4.\"\n\n\"\uc989\uc2dc \uc218\ub9ac\uc640 \uc815\ud654\uac00 \ud544\uc694\ud569\ub2c8\ub2e4. \ub458 \ub2e4 \uc790\uc6d0\uc774 \ub4e4\uc9c0\ub9cc... \uc120\ud0dd\ud574\uc57c \ud569\ub2c8\ub2e4.\"",
    left: { label: "\uc804\uccb4 \uc815\ud654 \uc2dc\uc2a4\ud15c \uad50\uccb4", fx: { c: 0, r: -3, t: 1, o: 0 }, g: 0 },
    right: { label: "\uc751\uae09 \uc218\ub9ac + \uc758\uc57d\ud488 \ud22c\uc785", fx: { c: 0, r: -2, t: 0, o: 0 }, g: 0 } },

  // 식중독 후속: 현장임무 요원 감소 — LOG-069 → C-185
  { id: "C-185", act: [1,2], priority: "\uc911", bg: "base",
    cond: function(s,g,logs){ return logs.includes("LOG-069") && !logs.includes("LOG-069-CREW") },
    msg: "\uc2dd\uc911\ub3c5 \ud6c4\uc720\uc99d\uc73c\ub85c \ud604\uc7a5 \ud22c\uc785 \uac00\ub2a5 \uc694\uc6d0\uc774 \uac10\uc18c\ud588\uc2b5\ub2c8\ub2e4.\n\n\uac15\ub3c4\uc724: \"\uc21c\ucc30 \uc778\uc6d0\uc774 \uc808\ubc18\uc73c\ub85c \uc904\uc5c8\uc2b5\ub2c8\ub2e4. \ubd09\uc1c4\uc120 \uc0ac\uac01\uc9c0\ub300\uac00 \ub298\uc5c8\uc2b5\ub2c8\ub2e4.\"\n\n\"\ucd5c\uc18c 5\uc77c\uc740 \uac10\ucd95 \uc6b4\uc601\uc774 \ubd88\uac00\ud53c\ud569\ub2c8\ub2e4.\"",
    left: { label: "\uc21c\ucc30 \uc8fc\uae30 \uc870\uc815", fx: { c: -2, r: 0, t: 0, o: 0 }, g: 0 },
    right: { label: "\uacbd\uc0c1\uc790\ub3c4 \uadfc\ubb34 \ubcf5\uadc0", fx: { c: -1, r: 0, t: -2, o: 0 }, g: 0 } },

  // ORACLE 경고: LOG-069-CREW → C-186
  { id: "C-186", act: [1,2], priority: "\uc911", bg: "oracle",
    cond: function(s,g,logs){ return logs.includes("LOG-069-CREW") && !logs.includes("LOG-069-END") },
    msg: "[ORACLE \uacbd\uace0]\n\n\"\uae30\uc9c0 \uc704\uc0dd \uad00\ub9ac \uc2e4\ud328\ub85c \uc778\ud55c \uc804\ub825 \uc800\ud558\uac00 \uac10\uc9c0\ub418\uc5c8\uc2b5\ub2c8\ub2e4.\n\uc9c0\ud718\uad00\uc758 \uc778\ud504\ub77c \uad00\ub9ac \uc5ed\ub7c9\uc5d0 \ub300\ud574 \uc7ac\ud3c9\uac00\uac00 \uc608\uc815\ub418\uc5b4 \uc788\uc2b5\ub2c8\ub2e4.\"\n\n\"\ud5a5\ud6c4 \uc720\uc0ac \uc0ac\ud0dc \ubc1c\uc0dd \uc2dc ORACLE \uc790\ub3d9 \uad00\ub9ac \uc2dc\uc2a4\ud15c\uc73c\ub85c \uc804\ud658\ub429\ub2c8\ub2e4.\"",
    left: { label: "\uac1c\uc120 \uacc4\ud68d\uc11c \uc81c\ucd9c", fx: { c: 0, r: 0, t: 0, o: 1 }, g: 1 },
    right: { label: "\ud604\uc7a5 \ud310\ub2e8\uc744 \uc874\uc911\ud574\ub77c", fx: { c: 0, r: 0, t: 1, o: -2 }, g: -3 } },

  // ═══ 체인 3: 야간 변이체 습격 + 강도윤 생존/사망 ═══
  // 조건: LOG-070(미휴식) + LOG-071(미개편) + LOG-072(ORACLE 의존) 중 2개 이상
  // C-188: 야간 습격 전조
  { id: "C-188", act: [2], priority: "\uc0c1", bg: "forest",
    cond: function(s,g,logs){
      var cnt = 0;
      if(logs.includes("LOG-070")) cnt++;
      if(logs.includes("LOG-071")) cnt++;
      if(logs.includes("LOG-072")) cnt++;
      return cnt >= 2 && !logs.includes("LOG-074") && !logs.includes("LOG-075") && s.day >= 14 },
    msg: "\uc57c\uac04 \uacbd\ubcf4 \ubc1c\ub839.\n\n\ubd09\uc1c4\uc120 \uc804 \uad6c\uc5ed\uc5d0\uc11c \ub3d9\uc2dc\ub2e4\ubc1c \uc0dd\uccb4 \ubc18\uc751 \uac10\uc9c0. \uc774\uc804 \uacbd\ud5d8\uacfc\ub294 \uaddc\ubaa8\uac00 \ub2e4\ub985\ub2c8\ub2e4.\n\n\uac15\ub3c4\uc724: \"\uc804 \ubc29\uc704\uc785\ub2c8\ub2e4! \uc22b\uc790\uac00 \ub108\ubb34 \ub9ce\uc2b5\ub2c8\ub2e4 \u2014 \uc0ac\uac01\uc9c0\ub300\ub85c \ubab0\ub824\ub4e4\uace0 \uc788\uc2b5\ub2c8\ub2e4!\"\n\n\uc57c\uac04 \uc21c\ucc30 \ub8e8\ud2b8\uc758 \ud5c8\uc810\uc744 \uc815\ud655\ud788 \ud30c\uace0\ub4e0 \uc2b5\uaca9\uc785\ub2c8\ub2e4.",
    left: { label: "\uc804\uc6d0 \uc804\ud22c \ubc30\uce58", fx: { c: -2, r: -2, t: 0, o: 0 }, g: 0 },
    right: { label: "\ubc29\uc5b4 \uac70\uc810 \uc9d1\uc911", fx: { c: -1, r: -1, t: -1, o: 0 }, g: 0 } },

  // C-189: 비상터널 있음 (LOG-073) → 강도윤 생존
  { id: "C-189", act: [2], priority: "\uc0c1", bg: "forest",
    cond: function(s,g,logs){ return logs.includes("LOG-074") && logs.includes("LOG-073") && !logs.includes("LOG-074-DONE") },
    msg: "\uc2b5\uaca9\uc774 \uacc4\uc18d\ub429\ub2c8\ub2e4. \uae30\uc9c0 \ub3d9\ucabd \ubcbd\uc774 \ubb34\ub108\uc84c\uc2b5\ub2c8\ub2e4.\n\n\uac15\ub3c4\uc724: \"\ub3d9\ucabd \ubb34\ub108\uc84c\ub2e4! \uc804\uc6d0 \ub300\ud53c \u2014\"\n\n\ube44\uc0c1 \ud130\ub110\uc744 \ud1b5\ud574 \uc694\uc6d0\ub4e4\uc774 \ub300\ud53c\ud569\ub2c8\ub2e4.\n\n\uac15\ub3c4\uc724\uc774 \ud6c4\ubbf8\ub97c \ub9e1\uc544 \ub9c8\uc9c0\ub9c9\uc73c\ub85c \ud130\ub110\uc5d0 \uc9c4\uc785. \uc624\ub978\ucabd \ub2e4\ub9ac\uc5d0 \uc911\uc0c1\uc744 \uc785\uc5c8\uc9c0\ub9cc \uc0b4\uc558\uc2b5\ub2c8\ub2e4.\n\n\uc724\uc138\uc9c4: \"\ub2e4\ub9ac\uc5d0 \uc5f4\uc0c1. \ud604\uc7a5 \ubcf5\uadc0\ub294 \ubd88\uac00\ub2a5\ud569\ub2c8\ub2e4. \ud558\uc9c0\ub9cc \uc0b4\uc558\uc2b5\ub2c8\ub2e4.\"",
    left: { label: "\uc7a5\ube44 \ud655\uc778 \ubc0f \ub300\uc751", fx: { c: -1, r: -2, t: 2, o: 0 }, g: 0 },
    right: { label: "\ubd80\uc0c1\uc790 \uce58\ub8cc \uc6b0\uc120", fx: { c: -2, r: -1, t: 2, o: 0 }, g: 0 } },

  // C-190: 비상터널 없음 (!LOG-073) → 강도윤 행방불명/사망
  { id: "C-190", act: [2], priority: "\uc0c1", bg: "forest",
    cond: function(s,g,logs){ return logs.includes("LOG-074") && !logs.includes("LOG-073") && !logs.includes("LOG-075") },
    msg: "\uc2b5\uaca9\uc774 \uacc4\uc18d\ub429\ub2c8\ub2e4. \uae30\uc9c0 \ub3d9\ucabd \ubcbd\uc774 \ubb34\ub108\uc84c\uc2b5\ub2c8\ub2e4.\n\n\uac15\ub3c4\uc724: \"\ub3d9\ucabd \ubb34\ub108\uc84c\ub2e4! \uc804\uc6d0 \ub300\ud53c \u2014 \uc81c\uac00 \ub9c9\uaca0\uc2b5\ub2c8\ub2e4!\"\n\n\ub300\ud53c \uacbd\ub85c\uac00 \ud558\ub098\ubfd0\uc785\ub2c8\ub2e4. \uc694\uc6d0\ub4e4\uc774 \ube60\uc838\ub098\uac00\ub294 \ub3d9\uc548 \uac15\ub3c4\uc724\uc774 \ud640\ub85c \uc785\uad6c\ub97c \ub9c9\uc2b5\ub2c8\ub2e4.\n\n\ud1b5\uc2e0\uc774 \ub04a\uacbc\uc2b5\ub2c8\ub2e4.\n\n\uc218\uc0c9 \uacb0\uacfc \u2014 \uac15\ub3c4\uc724 \ud589\ubc29\ubd88\uba85. \ub9c9\uc544\ub0b8 \uac83\uc73c\ub85c \ubcf4\uc774\ub098, \ub300\ud53c\ud558\uc9c0 \ubabb\ud55c \uac83\uc73c\ub85c \ucd94\uc815.\n\n\"\uac15\ub3c4\uc724 \ud604\uc7a5\uc694\uc6d0\uc758 \uc0c1\ud0dc\ub97c \ud655\uc778\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4.\"",
    left: { label: "...\uad70\uc778\uc758 \uc608\uc6b0\ub97c \uac16\ucda4\ub2e4", fx: { c: -2, r: -1, t: -3, o: 0 }, g: -2 },
    right: { label: "\uc218\uc0c9\uc744 \uacc4\uc18d\ud55c\ub2e4", fx: { c: -2, r: -2, t: -1, o: 0 }, g: -1 } },

  // C-191: 강도윤 생존 후 ORACLE 경고
  { id: "C-191", act: [2,3], priority: "\uc911", bg: "oracle",
    cond: function(s,g,logs){ return logs.includes("LOG-074-DONE") && !logs.includes("LOG-074-ORC") },
    msg: "[ORACLE \uc0c1\ud669 \ubcf4\uace0]\n\n\"\uc57c\uac04 \uc2b5\uaca9\uc73c\ub85c \uc778\ud574 \uae30\uc9c0 \ub3d9\ucabd \ubc29\uc5b4\ubcbd \uc190\uc0c1. \uad00\ub9ac \uccb4\uacc4 \ubbf8\ube44 \uc0ac\ud56d \ub2e4\uc218 \ubc1c\uacac.\"\n\n\"\uc57c\uac04 \uc21c\ucc30 \ub8e8\ud2b8\uc758 \uc0ac\uac01\uc9c0\ub300\uac00 \uc2b5\uaca9 \uacbd\ub85c\ub85c \uc774\uc6a9\ub418\uc5c8\uc2b5\ub2c8\ub2e4.\"\n\n\"\ud5a5\ud6c4 ORACLE \uad8c\uace0 \uae30\ubc18 \uc6b4\uc601\uc744 \uac15\ub825\ud788 \uad8c\uace0\ud569\ub2c8\ub2e4.\"",
    left: { label: "\uac1c\uc120 \uacc4\ud68d \uc218\ub9bd", fx: { c: 1, r: -1, t: 0, o: 1 }, g: 1 },
    right: { label: "\ud604\uc7a5 \ud310\ub2e8\uc774 \uc6b0\uc120\uc774\ub2e4", fx: { c: 0, r: 0, t: 1, o: -2 }, g: -3 } },

  // C-192: 강도윤 사망 후 ORACLE 경고
  { id: "C-192", act: [2,3], priority: "\uc0c1", bg: "oracle",
    cond: function(s,g,logs){ return logs.includes("LOG-075") && !logs.includes("LOG-075-ORC") },
    msg: "[ORACLE \uae34\uae09 \ubcf4\uace0]\n\n\"\ud604\uc7a5\uc694\uc6d0 \uac15\ub3c4\uc724\uc758 \uc0c1\ud0dc\ub97c \ud655\uc778\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. \uc0ac\uc2e4\uc0c1 \uc784\ubb34 \uc218\ud589 \ubd88\uac00.\"\n\n\"\ube44\uc0c1 \ub300\ud53c \uacbd\ub85c\uac00 \ubd80\uc7ac\ud55c \uc0c1\ud669\uc5d0\uc11c \uc694\uc6d0\uc744 \uc783\uc5c8\uc2b5\ub2c8\ub2e4.\"\n\n\"\uc9c0\ud718\uad00\uc758 \uc778\ud504\ub77c \uad00\ub9ac \uc5ed\ub7c9\uc5d0 \ub300\ud574 \uc2ec\uac01\ud55c \uc7ac\ud3c9\uac00\uac00 \uc608\uc815\ub418\uc5b4 \uc788\uc2b5\ub2c8\ub2e4.\"\n\n[ORACLE: \ud3c9\uac00 \uc9c0\ud45c \ud558\ud5a5 \uc870\uc815]",
    left: { label: "...\ucc45\uc784\uc744 \uc9c4\ub2e4", fx: { c: -1, r: 0, t: -2, o: -3 }, g: -4 },
    right: { label: "\uc218\uc0c9\uc744 \uba48\ucd94\uc9c0 \uc54a\ub294\ub2e4", fx: { c: -1, r: -1, t: 0, o: -2 }, g: -2 } },

];

// CARDS 배열에 합류
if(typeof CARDS !== 'undefined') CARDS = CARDS.concat(CARDS_CHAINS);
