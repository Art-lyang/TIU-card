// tools/stamp-cache.js — 캐시 태그 일괄 스탬프
// index.html / demo/index.html 의 BUILD_VER 를 올리고, 모든 로컬 `?v=N` 태그를
// 그 값으로 통일한다. 파일별 수동 범프(162개 태그)를 사람이 관리하다 빠뜨리면
// 배포 후 구버전 캐시로 회귀하는 사고를 막기 위한 도구.
// 정적 게임이라 전량 캐시 리프레시 비용은 무시할 만하다.
//
// 사용:
//   node tools/stamp-cache.js          → BUILD_VER+1 로 스탬프
//   node tools/stamp-cache.js --set N  → 지정 정수 N 으로 스탬프
//
// 실행 후 node tools/validator.js 로 root↔demo ?v= 일치(검사 13b)가 자동 확인된다.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FILES = ['index.html', 'demo/index.html'];

const rootHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const m = rootHtml.match(/var BUILD_VER=(\d+)/);
if (!m) { console.error('✘ index.html 에서 BUILD_VER 를 찾지 못함'); process.exit(1); }

let ver = parseInt(m[1], 10) + 1;
const setIdx = process.argv.indexOf('--set');
if (setIdx >= 0) ver = parseInt(process.argv[setIdx + 1], 10);
if (!Number.isInteger(ver) || ver <= 0) { console.error('✘ 버전은 양의 정수여야 함'); process.exit(1); }

for (const f of FILES) {
  const p = path.join(ROOT, f);
  let s = fs.readFileSync(p, 'utf8');
  const tagCount = (s.match(/\?v=\d+"/g) || []).length;
  s = s.replace(/var BUILD_VER=\d+/, 'var BUILD_VER=' + ver);
  s = s.replace(/\?v=\d+"/g, '?v=' + ver + '"');
  fs.writeFileSync(p, s);
  console.log('  ✔ ' + f + ' — BUILD_VER=' + ver + ', ?v= 태그 ' + tagCount + '개 스탬프');
}
console.log('완료. 배포 전 node tools/validator.js 실행 권장.');
