// data-evening-responses-2.js — Act 2 후반 / Act 3 / Act 4 응답 + 외부 인물 응답
// EVENING_RESPONSES에 병합 (getEveningResponse가 인식 가능한 키 형식)

var _ER_MISSING = {
  // ═══ 강도윤 (doyun) ═══
  'doyun_1_5-7': {
    a: { label: '필라델피아는 잊지 말자.', trust: 2, reply: '...네. 저도 그렇게 생각합니다.' },
    b: { label: '봉쇄선 유지에 집중해.', trust: 1, reply: '알겠습니다. 그게 제 본분이니까요.' }
  },
  'doyun_1_8-10': {
    a: { label: '야간 순찰 강화해.', trust: 2, reply: '바로 편성 조정하겠습니다.' },
    b: { label: '경험담으로 넘기자.', trust: -1, reply: '...알겠습니다.' }
  },
  'doyun_2_15-21': {
    a: { label: '장비 교체 예산 배정하자.', trust: 2, reply: '감사합니다. 우선순위 정리해서 올리겠습니다.' },
    b: { label: '현 장비로 버텨봐.', trust: -1, reply: '...네. 최대한 활용해보겠습니다.' }
  },
  'doyun_2_22-28': {
    a: { label: '방어벽 보강 진행해.', trust: 2, reply: '네. 자재 목록부터 정리하겠습니다.' },
    b: { label: '현장 판단에 맡기겠다.', trust: 1, reply: '...알겠습니다. 책임지고 하겠습니다.' }
  },
  'doyun_3_29-99': {
    a: { label: '함께 가자.', trust: 2, reply: '...네. 끝까지 따르겠습니다.' },
    b: { label: '네 역할을 다해줘.', trust: 1, reply: '알겠습니다, 지휘관.' }
  },

  // ═══ 서하은 (haeun) ═══
  'haeun_1_5-7': {
    a: { label: '그때 기록 남아있나?', trust: 2, reply: '일부는요. 정리해서 공유드리겠습니다.' },
    b: { label: '지금은 정상이니 괜찮다.', trust: 0, reply: '...그렇다면 다행이네요.' }
  },
  'haeun_1_8-10': {
    a: { label: '패턴 기록 시작해.', trust: 2, reply: '네. 조심히 진행하겠습니다.' },
    b: { label: '착각일 수 있다.', trust: -1, reply: '...그럴 수도 있죠.' }
  },
  'haeun_2_15-21': {
    a: { label: '불안 믿는다. 계속 추적해.', trust: 2, reply: '...감사합니다. 안심이 됩니다.' },
    b: { label: '증거 확보부터.', trust: 0, reply: '네, 신중하게 모으겠습니다.' }
  },
  'haeun_2_22-28': {
    a: { label: '누가 그러는지 찾아내자.', trust: 2, reply: '...지휘관님이 계셔서 다행입니다.' },
    b: { label: '로그 접근 제한 걸어.', trust: 1, reply: '네, 제 권한 범위에서 조치하겠습니다.' }
  },
  'haeun_4_31-36': {
    a: { label: '서둘지 말고 확실하게.', trust: 2, reply: '네. 한 조각도 놓치지 않겠습니다.' },
    b: { label: '진행 상황 공유해줘.', trust: 1, reply: '매일 정리해서 올리겠습니다.' }
  },
  'haeun_4_37-99': {
    a: { label: '끝까지 파고들어.', trust: 2, reply: '...반드시 밝혀내겠습니다.' },
    b: { label: '복원본 안전히 보관해.', trust: 1, reply: '네. 이중 백업으로 관리하고 있습니다.' }
  },
  'haeun_3_29-99': {
    a: { label: '함께 진실을 밝히자.', trust: 2, reply: '...네. 끝까지 함께 가겠습니다.' },
    b: { label: '무리하지 말고.', trust: 1, reply: '...감사합니다. 조심할게요.' }
  },

  // ═══ 윤세진 (sejin) ═══
  'sejin_1_5-7': {
    a: { label: '이상하다고 생각한다.', trust: 2, reply: '...그렇죠? 저만 그렇게 느낀 게 아니네요.' },
    b: { label: '우연일 수 있다.', trust: -1, reply: '...그럴 수도 있겠네요.' }
  },
  'sejin_1_8-10': {
    a: { label: '그날 기억은 연구에 활용해.', trust: 2, reply: '네... 잊지 않겠습니다.' },
    b: { label: '감정 배제하고 데이터로만.', trust: 0, reply: '알겠습니다. 객관적으로 보겠습니다.' }
  },
  'sejin_2_15-21': {
    a: { label: '그 체계 밝혀내.', trust: 2, reply: '네! 관찰 프로토콜 정리해볼게요.' },
    b: { label: '가설은 증명부터.', trust: 0, reply: '...알겠습니다. 신중히 접근할게요.' }
  },
  'sejin_2_22-28': {
    a: { label: '파라미터 조작 증거 찾자.', trust: 2, reply: '감사합니다. 같이 확인해주실 거죠?' },
    b: { label: '관찰만 계속해.', trust: 0, reply: '...네. 기록은 계속 남기겠습니다.' }
  },
  'sejin_3_29-99': {
    a: { label: '억제제 연구 최우선이다.', trust: 2, reply: '...감사합니다. 반드시 완성할게요.' },
    b: { label: '안전한 범위에서 해.', trust: 1, reply: '네, 조심히 진행하겠습니다.' }
  },

  // ═══ 임재혁 (jaehyuk) ═══
  'jaehyuk_1_5-7': {
    a: { label: '배관과 분배기 교체 승인.', trust: 2, reply: '감사합니다. 내일부터 작업 시작하겠습니다.' },
    b: { label: '우선순위 낮은 건 미뤄.', trust: 0, reply: '...알겠습니다. 긴급한 것부터 처리할게요.' }
  },
  'jaehyuk_1_8-10': {
    a: { label: '나도 같은 생각이다.', trust: 2, reply: '...지휘관님도 그러시군요. 혼자만의 고민이 아니었네요.' },
    b: { label: '주어진 일에 집중해.', trust: -1, reply: '...네. 알겠습니다.' }
  },
  'jaehyuk_2_15-21': {
    a: { label: '우회 경로 구해봐.', trust: 2, reply: '...네. 비공식 루트 알아보겠습니다.' },
    b: { label: 'ORACLE 판단 따르자.', trust: -1, reply: '...알겠습니다.' }
  },
  'jaehyuk_2_22-28': {
    a: { label: '그 레이어 파고들어.', trust: 2, reply: '...조심하겠습니다. 기록 남기겠습니다.' },
    b: { label: '위험하다. 거리 두자.', trust: 0, reply: '...네. 신중히 판단하겠습니다.' }
  },
  'jaehyuk_3_29-99': {
    a: { label: '알아낸 것 전부 공유해.', trust: 2, reply: '...네. 지휘관님만 믿겠습니다.' },
    b: { label: '안전할 때까지 숨겨둬.', trust: 1, reply: '알겠습니다. 적절한 시기에.' }
  },

  // ═══ 마르쿠스 베버 (weber) — 프로메테우스 ═══
  'weber_3_29-39': {
    a: { label: '진실을 찾고 싶다.', trust: 2, reply: '...좋습니다. 우리가 가진 정보를 공유하겠습니다.' },
    b: { label: '아직은 판단 보류하겠다.', trust: 0, reply: '현명한 태도입니다. 시간은 충분합니다.' }
  },
  'weber_4_40-99': {
    a: { label: '그 차이를 이해한다.', trust: 2, reply: '...함께 해주시길 바랍니다, 지휘관.' },
    b: { label: '아직 조직은 믿을 수 없다.', trust: 0, reply: '...그 또한 합리적인 태도군요.' }
  },

  // ═══ 닉 포스터 (foster) — 전 ORACLE 요원 ═══
  'foster_4_31-39': {
    a: { label: '지금이라도 바뀔 수 있다.', trust: 2, reply: '...고맙습니다. 그런 말 들을 자격은 없지만.' },
    b: { label: '과거는 묻어두자.', trust: 1, reply: '...감사합니다. 덕분에 한 걸음 나갈 수 있겠네요.' }
  },
  'foster_4_40-99': {
    a: { label: '한국이 성공 사례라는 게 위험이다.', trust: 2, reply: '정확합니다. 그래서 당신이 중요한 겁니다.' },
    b: { label: '정보는 고맙다.', trust: 1, reply: '...필요하면 더 드리겠습니다.' }
  },

  // ═══ 박소영 (soyoung) — 분석관 ═══
  'soyoung_4_32-39': {
    a: { label: '서하은 몫까지 부탁한다.', trust: 2, reply: '...네. 반드시 이어가겠습니다.' },
    b: { label: '적응했으면 됐다.', trust: 1, reply: '감사합니다. 기대에 부응하겠습니다.' }
  },
  'soyoung_4_40-99': {
    a: { label: '그 패턴 즉시 공유해.', trust: 2, reply: '네. 분석 자료 전부 전달드리겠습니다.' },
    b: { label: '확증 나올 때까지 보류.', trust: 0, reply: '...알겠습니다. 조금 더 모아보겠습니다.' }
  }
};

for (var _ek2 in _ER_MISSING) {
  if (_ER_MISSING.hasOwnProperty(_ek2)) EVENING_RESPONSES[_ek2] = _ER_MISSING[_ek2];
}
