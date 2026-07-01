# 카드 이미지 플래시 연출 — 구현 스펙 (PC 작업용)

> 서하은 전출 / USB 전달처럼 **서사 무게가 있는 이벤트 카드**에서, 전용 이미지를 화면
> 중앙에 잠깐(≈2초) 띄웠다가 사라지게 하는 시각 연출. 풀스크린 아님, 비파괴적.
> 목표: 있는 에셋을 더 살려서 "이 순간은 특별하다"는 비트를 만드는 것. 추가 아트 비용 0.

---

## 0. 설계 원칙 (먼저 합의)

1. **Opt-in only** — 모든 카드에 자동 적용 ❌. 카드에 명시적 플래그가 있을 때만 발동.
   전 카드 자동이면 연출이 인플레돼서 오히려 흔해진다.
2. **논블로킹** — 플래시가 떠 있어도 스와이프·선택은 즉시 가능. 강제 대기 없음.
3. **스킵 가능** — 탭/클릭 시 즉시 사라짐. 자동 페이드아웃 ≈2~2.5초.
4. **접근성 존중** — 기존 `fxMode`(`ts_fxMode`: `full`/`reduced`/`off`) 재사용.
   - `full`: 글리치/스캔라인 페이드 인 → 홀드 → 디졸브
   - `reduced`: 단순 페이드(글리치·흔들림 제거), 홀드 짧게
   - `off`: **연출 완전 생략** (이미지 자체를 띄우지 않음)
5. **1회성** — 같은 카드에서 재출현/리렌더 시 반복 재생 금지(카드당 세션 1회).

---

## 1. 데이터 스키마 (카드에 필드 추가)

카드 객체에 **선택 필드 하나** 추가. 엔진 로직·세이브 스키마는 안 건드림.

```js
// 예: data-cards-2.js C-074 (USB 카드) — 이미 img: "card_haeun_usb" 보유
{ id: "C-074", act: [3,4], priority: "상",
  img: "card_haeun_usb",
  flashImg: "card_haeun_usb",   // ← 추가. IMG 레지스트리 키 (card.img와 같아도 됨)
  // flashImg 생략 시 연출 없음(기존과 동일)
  req: ..., msg: ..., left: ..., right: ... }
```

- **`flashImg`**: `IMG[flashImg]` 로 해석되는 레지스트리 키 문자열.
  - `card.img`와 동일 키를 재사용해도 되고, 플래시 전용 크롭/구도 이미지를 따로 등록해도 됨.
  - 없으면(`undefined`) 연출 미발동 → 100% 하위호환.
- (선택) **`flashCaption`**: 이미지 아래 한 줄 캡션. i18n 필요 시 `tc('cardFlash', id, ...)`.
  1차 구현에서는 생략 권장(이미지만).

> 검증: `flashImg`가 IMG에 실제 등록된 키인지 `tools/validator.js`에 정적 체크 1줄
> 추가 권장(존재하지 않는 키면 경고). 미등록 키는 조용히 무시되게 컴포넌트에서 guard.

---

## 2. 렌더 통합 지점

- 카드 뷰는 `components-game.js`의 카드 컴포넌트에서 렌더된다.
  - 배경 이미지: L723 `var specBg=card.img?IMG[card.img]:...` → L762 `.card-img-bg`.
- 플래시는 **카드 배경(`card-img-bg`)과 별개 레이어**로, 카드 컨테이너 위(또는 루트 오버레이)에 올린다.
  - 카드 내부에 넣으면 스와이프 트랜스폼을 같이 먹으니, **카드 스와이프에 영향받지 않는 상위 레이어**(예: 게임 화면 루트 직하) 권장.
- 마운트 트리거: `curCard`가 바뀌고 그 카드에 `flashImg`가 있으며, `fxMode!=='off'` 이고,
  아직 이 카드에서 재생 안 했을 때 1회 마운트.

```js
// 개념 스케치 (실제 구현은 컴포넌트 스타일에 맞춰)
function CardImageFlash(p){
  // p.src (해석된 이미지 URL), p.fxMode, p.onDone
  var _v=useState(true),vis=_v[0],setVis=_v[1];
  useEffect(function(){
    if(p.fxMode==='off'){ setVis(false); return; }
    var hold = p.fxMode==='reduced' ? 1600 : 2200;   // ms
    var t=setTimeout(function(){ setVis(false); }, hold);
    return function(){ clearTimeout(t); };
  },[]);
  if(!vis||!p.src) return null;
  return h('div',{
    className:'card-flash'+(p.fxMode==='reduced'?' card-flash--reduced':''),
    onClick:function(){ setVis(false); },              // 탭 즉시 스킵
    onAnimationEnd:function(e){ if(e.animationName==='cardFlashOut'&&p.onDone)p.onDone(); }
  }, h('div',{className:'card-flash-img',style:{backgroundImage:'url('+p.src+')'}}));
}
```

- 상위(게임 화면)에서:
```js
var _flash=useState(null), flash=_flash[0], setFlash=_flash[1];
var flashShownRef = useRef({});   // { [cardId]: true } 세션 1회 가드
useEffect(function(){
  if(!curCard) return;
  var key=curCard.flashImg;
  if(key && fxMode!=='off' && !flashShownRef.current[curCard.id] && typeof IMG!=='undefined' && IMG[key]){
    flashShownRef.current[curCard.id]=true;
    setFlash(IMG[key]);
  }
},[curCard && curCard.id]);
// 렌더: flash && h(CardImageFlash,{src:flash,fxMode:fxMode,onDone:function(){setFlash(null);}})
```

> ⚠ **다음 카드 draw와 타이밍 충돌 주의**: 플래시가 떠 있는 동안 사용자가 스와이프해서
> 다음 카드가 뽑히면, 새 `curCard.id`로 effect가 다시 돌며 이전 플래시를 교체한다.
> `curCard.id` 의존성으로 묶어두면 자연스럽게 새 카드 플래시로 갱신되니 문제 없음.
> 단 `onDone`이 늦게 불려 이전 카드 플래시가 새 카드 위에 남지 않도록, `setFlash`는 항상
> 최신 `curCard` 기준으로만 세팅되게 한다(위 스케치가 그 형태).

---

## 3. CSS (신규 파일 권장: `style-cardflash.css`)

기존 `style-glitch.css` 톤(스캔라인/글리치)과 맞춘다. `fx-off` 루트 클래스일 때는
어차피 컴포넌트가 마운트 안 되지만, CSS에서도 이중 안전망.

```css
.card-flash{
  position:absolute; inset:0; z-index:60;
  display:flex; align-items:center; justify-content:center;
  pointer-events:auto;               /* 탭 스킵용. 스와이프 막지 않도록 카드 위가 아니라 별 레이어 */
  background:rgba(3,7,8,.28);         /* 살짝 어둡게. 완전 블랙아웃 금지(논블로킹 인상) */
  animation:cardFlashBgIn .18s ease both;
}
.card-flash-img{
  width:min(62%,320px); aspect-ratio:4/3;
  background-size:cover; background-position:center;
  border:1px solid rgba(var(--ui-rgb),.5);
  box-shadow:0 0 40px rgba(0,0,0,.6), 0 0 18px rgba(var(--ui-rgb),.18);
  animation:cardFlashIn .35s cubic-bezier(.2,.8,.2,1) both,
            cardFlashOut .5s ease 1.7s both;   /* 홀드 후 디졸브. full 기준 */
}
@keyframes cardFlashIn{
  from{ opacity:0; transform:scale(.94); filter:brightness(1.6) blur(2px); }
  to  { opacity:1; transform:scale(1);   filter:none; }
}
@keyframes cardFlashOut{ from{opacity:1;} to{opacity:0;} }
@keyframes cardFlashBgIn{ from{opacity:0;} to{opacity:1;} }

/* reduced: 글리치/스케일 제거, 단순 페이드, 홀드 짧게 */
.card-flash--reduced .card-flash-img{
  animation:cardFlashIn .2s ease both, cardFlashOut .4s ease 1.2s both;
}
.card-flash--reduced .card-flash-img{ filter:none; }

/* off는 컴포넌트 미마운트가 1차, CSS 이중 안전망 */
.fx-off .card-flash{ display:none; }
@media (prefers-reduced-motion: reduce){
  .card-flash-img{ animation:cardFlashIn .01s linear both, cardFlashOut .3s ease 1.2s both; }
}
```

- 스캔라인 느낌을 더 주고 싶으면 `.card-flash-img::after`에 반복 그라디언트 오버레이 추가.
- `index.html` + `demo/index.html` `<head>`에 `<link ... style-cardflash.css?v=1>` 추가.

---

## 4. 대상 카드 리스트 (1차 후보)

전용 이미지가 이미 있거나 서사 정점인 카드 위주. **소수 정예**로 시작.

| 카드 | 내용 | 현재 img | flashImg 제안 |
|---|---|---|---|
| `C-073` | 서하은 전출 명령 | (없음) | 신규 or `card_haeun_usb` 계열 |
| `C-074` | 서하은 USB 전달 | `card_haeun_usb` ✓ | `card_haeun_usb` 재사용 |
| `C-081` | 박소영/후보 선발 | (없음) | 필요 시 신규 |
| `C-253` | 박소영 정체(포스터 폭로) | bg:forest | 필요 시 신규 |
| `CS-018` | 박소영 정체(통신 감사 폴백) | bg:comms | 필요 시 신규 |
| 엔딩 트리거류 | `CE-042*` 등 | 각기 | 케이스별 |

- **최소 시작 세트**: `C-074`(이미지 이미 있음) 하나로 프로토타입 → 손맛 확인 후 확장.
- 전용 이미지가 없는 카드는 `ASSET-IMAGE-REGEN-TODO.md`에 생성 항목으로 추가 후 붙이기.

---

## 5. 결정 필요 항목 (구현 전 확정)

1. **홀드 시간**: full 2.2s / reduced 1.6s 제안 — 실제 플레이로 미세조정.
2. **배경 딤 정도**: `rgba(3,7,8,.28)` 제안. 더 강하면 블로킹 느낌 → 논블로킹 원칙과 상충.
3. **캡션 노출 여부**: 1차 이미지-only 권장. 넣으면 i18n(`cardFlash` ns) 2파일 갱신 필요.
4. **1회성 범위**: "세션 1회"(`flashShownRef`, 새 캠페인마다 리셋) vs "영구 1회"(로그 기반).
   재플레이 감성상 **세션 1회** 권장.
5. **전용 크롭 이미지 여부**: 카드 배경과 같은 이미지 재사용 vs 플래시용 중앙 구도 별도 제작.

---

## 6. 작업 체크리스트

- [ ] `flashImg` 필드 대상 카드에 추가 (root + `demo/`)
- [ ] `CardImageFlash` 컴포넌트 + 상위 마운트 로직 (`components-game.js` 또는 `app.js`)
- [ ] `style-cardflash.css` 신규 + `index.html`/`demo/index.html` `<link>` 추가
- [ ] `fxMode` off/reduced/full 3분기 동작 확인
- [ ] 논블로킹·탭스킵·다음카드 전환 충돌 확인
- [ ] (선택) `tools/validator.js`에 `flashImg` 키 존재 정적 체크 1줄
- [ ] `node tools/validator.js` 0건
- [ ] 캐시 태그(`?v=`) 범프: 변경된 js/css/html
- [ ] `demo/` 미러 동기화
- [ ] 커밋 → branch + main 푸시

---

## 7. 참고 (코드 좌표)

- 카드 렌더/배경: `components-game.js` L723(`specBg`), L762(`.card-img-bg`)
- FX 모드 상태/루트 클래스: `app.js` L220(`fx-reduced`/`fx-off`), L289(`ts_fxMode`)
- FX 설정 UI: `components-settings.js` `SettingsDisplayTab`(fxModes full/reduced/off)
- 글리치 톤 참고: `style-glitch.css`
- USB 카드 실물: `data-cards-2.js` `C-074`(`img:"card_haeun_usb"`)
- 이미지 레지스트리: `images.js` / `images_p1.js`(후패치)
