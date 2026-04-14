with open('data-evening-trust.js', 'r', encoding='utf-8') as f:
    content = f.read()

# ── Step 1: Rename all keys ──
renames = [
    ("'doyun_1_1-3'",      "'doyun_2_5-7'"),
    ("'doyun_1_4-6'",      "'doyun_2_8-10'"),
    ("'doyun_1_7-10'",     "'doyun_2_11-14'"),
    ("'doyun_2_11-17'",    "'doyun_3_15-21'"),
    ("'doyun_2_18-24'",    "'doyun_3_22-28'"),
    ("'doyun_3_25-99'",    "'doyun_4_29-99'"),
    ("'haeun_1_1-3'",      "'haeun_2_5-7'"),
    ("'haeun_1_4-6'",      "'haeun_2_8-10'"),
    ("'haeun_1_7-10'",     "'haeun_2_11-14'"),
    ("'haeun_2_11-17'",    "'haeun_3_15-21'"),
    ("'haeun_2_18-24'",    "'haeun_3_22-28'"),
    ("'haeun_3_25-99'",    "'haeun_4_29-99'"),
    ("'sejin_1_1-3'",      "'sejin_2_5-7'"),
    ("'sejin_1_4-6'",      "'sejin_2_8-10'"),
    ("'sejin_1_7-10'",     "'sejin_2_11-14'"),
    ("'sejin_2_11-17'",    "'sejin_3_15-21'"),
    ("'sejin_2_18-24'",    "'sejin_3_22-28'"),
    ("'sejin_3_25-99'",    "'sejin_4_29-99'"),
    ("'jaehyuk_1_1-3'",    "'jaehyuk_2_5-7'"),
    ("'jaehyuk_1_4-6'",    "'jaehyuk_2_8-10'"),
    ("'jaehyuk_1_7-10'",   "'jaehyuk_2_11-14'"),
    ("'jaehyuk_2_11-17'",  "'jaehyuk_3_15-21'"),
    ("'jaehyuk_2_18-24'",  "'jaehyuk_3_22-28'"),
    ("'jaehyuk_3_25-99'",  "'jaehyuk_4_29-99'"),
    ("'weber_3_25-35'",    "'weber_4_29-39'"),
    ("'weber_3_36-99'",    "'weber_4_40-99'"),
    ("'foster_3_27-35'",   "'foster_4_31-39'"),
    ("'foster_3_36-99'",   "'foster_4_40-99'"),
    ("'soyoung_3_28-35'",  "'soyoung_4_32-39'"),
    ("'soyoung_3_36-99'",  "'soyoung_4_40-99'"),
]
for old, new in renames:
    count = content.count(old)
    if count != 1:
        print(f"WARNING: '{old}' found {count} times")
    content = content.replace(old, new)

# ── Step 2: Replace sejin_2_5-7 content (remove "프리온 단백질" intro) ──
old_sejin = """  'sejin_2_5-7': {
    low: ["대학원에서는 프리온 단백질을 연구했습니다.", "EV-Σ는 여기 와서 처음 접했습니다.", "연구 진행 중입니다. 이상입니다."],
    high: ["대학원에서는 프리온 단백질을 연구했어요. EV-Σ는 논문으로만 알고 있었고요.", "여기 와서 처음 직접 접했는데... 논문으로 읽던 것과는 완전히 달랐어요.", "살아 있다는 느낌이었어요. 무서운 것보다, 알고 싶다는 마음이 먼저였어요.", "...지금도 그래요."],
    bond: ["대학원에서는 프리온 단백질만 봤어요. EV-Σ는 여기 와서 처음이었는데...", "논문이랑 현실은 완전히 달랐어요. 처음 봤을 때 손이 떨렸어요.", "그때 도망칠 수도 있었는데, 안 갔어요. 여기 연구가 필요하다고 느꼈으니까.", "...지휘관님 밑에서 연구할 수 있어서 다행이에요. 진심이에요."]
  },"""
new_sejin = """  'sejin_2_5-7': {
    low: ["ORACLE EV-Σ 활동 데이터 분석 보고입니다.", "예측 수치와 관찰 결과 사이에 편차가 있습니다.", "추가 분석 진행하겠습니다."],
    high: ["ORACLE이 EV-Σ 활동 데이터를 처리하는 방식이 좀 이상해요.", "제 관찰 결과랑 ORACLE 예측 사이에 미세한 차이가 있는데...", "우연치고는 방향이 항상 같아요. 이상하다고 생각하지 않으세요?", "...이게 그냥 넘어갈 부분이 아닌 것 같아서요."],
    bond: ["지휘관님, 이거 말씀드려도 될까요.", "ORACLE 예측이랑 제 관찰 데이터가 계속 어긋나요.", "방향이 항상 같아요. 우연이 아닙니다.", "...지휘관님한테만 먼저 말씀드리는 거예요. 아직 확신은 없으니까."]
  },"""
if old_sejin in content:
    content = content.replace(old_sejin, new_sejin)
    print("sejin_2_5-7 content replaced")
else:
    print("ERROR: sejin_2_5-7 old content not found")

# ── Step 3: Fix haeun_2_5-7 low tier (remove name introduction) ──
old_haeun_low = '    low: ["서하은입니다. 보고드립니다.", "지휘관님 부임 전 이 기지에 지휘관이 없었습니다.", "ORACLE 지시만으로 운영했습니다.", "이상입니다."],'
new_haeun_low = '    low: ["보고드립니다.", "지휘관님 부임 전 이 기지에 지휘관이 없었습니다.", "ORACLE 지시만으로 운영했습니다.", "이상입니다."],'
if old_haeun_low in content:
    content = content.replace(old_haeun_low, new_haeun_low)
    print("haeun_2_5-7 low tier fixed")
else:
    print("WARNING: haeun low tier string not found (may already be fixed)")

# ── Step 4: Insert new Act 1 entries before doyun_2_5-7 ──
act1_entries = """  // ── Act 1 이브닝 챗 신뢰도 변형 (프롤로그 — 첫 인사/적응) ──

  'doyun_1_1-4': {
    low: ["...보고드립니다.", "이상입니다."],
    high: ["지휘관님, 기지에 오신 걸 환영합니다.", "솔직히 말씀드리면... 지휘관이 없는 3개월이 길었습니다.", "앞으로 잘 부탁드립니다.", "...여기 와주셔서 다행입니다."],
    bond: ["지휘관님.", "기지에 오신 걸 환영합니다. 진심으로.", "3개월 동안 ORACLE만 믿고 버텼는데... 이제 사람이 왔습니다.", "잘 부탁드립니다. 반드시 지키겠습니다."]
  },
  'haeun_1_1-4': {
    low: ["서하은입니다.", "오늘 기지 현황 파악하신 것 같습니다.", "추가 질문 있으시면 말씀해 주십시오."],
    high: ["지휘관님, 오늘 많이 바쁘셨죠.", "기지 현황 보셨겠지만... ORACLE 없이는 이 기지가 돌아가지 않는다는 걸 느끼셨을 겁니다.", "그게 좋은 건지 나쁜 건지는... 아직 잘 모르겠어요.", "...지휘관님이 판단해주셨으면 합니다."],
    bond: ["지휘관님.", "첫날이시라 많이 피곤하시죠.", "기지 현황 궁금하신 거 있으면 편하게 물어봐 주세요.", "ORACLE이 다 해준다고들 하는데... 저는 사람이 판단해줬으면 해서요."]
  },
  'sejin_1_1-4': {
    low: ["윤세진입니다. 생물학 담당입니다.", "EV-Σ 관련 보고는 정기적으로 올리겠습니다.", "이상입니다."],
    high: ["지휘관님, 생물학 담당 윤세진입니다.", "EV-Σ 관련 궁금하신 게 있으시면 편하게 물어봐 주세요.", "여기 온 지 좀 됐는데... 지휘관님이 계시니까 든든합니다.", "잘 부탁드려요!"],
    bond: ["지휘관님, 안녕하세요.", "생물학 담당 윤세진이에요. EV-Σ 연구 관련해서 궁금하신 거 있으면 아무때나 말씀해 주세요.", "...지휘관님이 오시길 기다렸어요.", "앞으로 잘 부탁드려요."]
  },
  'jaehyuk_1_1-4': {
    low: ["임재혁입니다. 기술 담당입니다.", "기지 시스템 및 ORACLE 연동 담당합니다.", "이상입니다."],
    high: ["지휘관님, 기술 담당 임재혁입니다.", "기지 시스템 전반을 담당합니다. ORACLE 연동 포함해서요.", "궁금하신 게 있으면 편하게 말씀해 주십시오.", "잘 부탁드립니다."],
    bond: ["지휘관님, 기술 담당 임재혁입니다.", "기지 시스템부터 ORACLE까지 전부 담당하고 있습니다.", "뭔가 이상한 거 발견하시면 바로 말씀해 주십시오.", "...사실 궁금한 게 좀 있는데, 나중에 시간 되실 때 여쭤봐도 될까요?"]
  },

"""
# Insert before 'doyun_2_5-7'
marker = "  'doyun_2_5-7':"
if marker in content:
    content = content.replace(marker, act1_entries + marker, 1)
    print("Act 1 entries inserted")
else:
    print("ERROR: marker 'doyun_2_5-7' not found")

with open('data-evening-trust.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done.")
