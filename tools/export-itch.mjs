// export-itch.mjs — itch.io 업로드용 zip 2종(본편/데모)을 생성한다.
// 사용: node tools/export-itch.mjs   → _dist/tiu-card-full.zip, _dist/tiu-card-demo.zip
//
// 변형 규칙:
//   공통: SW 등록 제거(sw.js 제외 — itch iframe에서 SW 불안정), firebase-config 스텁
//         (itch 도메인은 OAuth 미승인 — 클라우드 세이브 비활성, 로컬 저장만),
//         연속 <script> 번들 병합(itch CDN 요청 수 절감 — app-android/sync-www.mjs와 동일 로직)
//   full: demo-flag.js → window.TS_DEMO=false (전체 게임)
//   demo: demo-flag.js → window.TS_DEMO=true  (Act 2 종료 게이트, URL 오버라이드 없음)
import { rmSync, mkdirSync, readFileSync, writeFileSync, cpSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, '_dist');
const ASSET_DIRS = ['assets', 'audio', 'fonts', 'icons', 'vendor', 'img'];
const BS = String.fromCharCode(92); // backslash (전송 이스케이프 사고 방지용)

function buildVariant(name, demoFlagValue) {
  const OUT = join(DIST, name);
  rmSync(OUT, { recursive: true, force: true });
  mkdirSync(OUT, { recursive: true });

  let html = readFileSync(join(ROOT, 'index.html'), 'utf8');
  const refs = new Set();
  for (const m of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    let p = m[1];
    if (/^(https?:|data:|mailto:|#)/.test(p)) continue;
    p = p.split('?')[0];
    if (p) refs.add(p);
  }

  // SW 제거 (itch iframe에서 스코프·캐시 문제)
  html = html.replace(/\s*<script>if\("serviceWorker"[\s\S]*?<\/script>/, '');
  refs.delete('sw.js');
  writeFileSync(join(OUT, 'index.html'), html);

  let n = 1;
  for (const p of refs) {
    const dst = join(OUT, p);
    mkdirSync(dirname(dst), { recursive: true });
    if (p === 'demo-flag.js') { writeFileSync(dst, 'window.TS_DEMO=' + demoFlagValue + '; // itch ' + name + ' build' + BS + 'n'.replace(BS + 'n', String.fromCharCode(10))); n++; continue; }
    if (p === 'firebase-config.js') { writeFileSync(dst, '// itch build: cloud save disabled (local storage only)' + String.fromCharCode(10)); n++; continue; }
    const src = join(ROOT, p);
    if (!existsSync(src)) { console.warn('  missing ref:', p); continue; }
    cpSync(src, dst);
    n++;
  }
  for (const d of ASSET_DIRS) {
    const src = join(ROOT, d);
    if (existsSync(src)) cpSync(src, join(OUT, d), { recursive: true });
  }

  // 스크립트 번들 병합 (sync-www.mjs와 동일 로직)
  let outHtml = readFileSync(join(OUT, 'index.html'), 'utf8');
  const tagRe = /<script\s+src="([^"]+)"\s*><\/script>/g;
  const tags = [];
  let m;
  while ((m = tagRe.exec(outHtml)) !== null) {
    if (/^https?:/.test(m[1])) continue;
    tags.push({ tag: m[0], src: m[1].split('?')[0], idx: m.index });
  }
  const inert = /^(\s|<!--[\s\S]*?-->)*$/;
  const groups = [];
  let cur = [];
  for (const t of tags) {
    if (cur.length && !inert.test(outHtml.slice(cur[cur.length - 1].idx + cur[cur.length - 1].tag.length, t.idx))) { groups.push(cur); cur = []; }
    cur.push(t);
  }
  if (cur.length) groups.push(cur);
  let bundled = 0;
  for (let gi = groups.length - 1; gi >= 0; gi--) {
    const g = groups[gi];
    if (g.length < 2) continue;
    const bn = 'game-bundle-' + gi + '.js';
    const NLSEMI = String.fromCharCode(10) + ';' + String.fromCharCode(10);
    const parts = g.map(t => {
      const p = join(OUT, t.src);
      const code = readFileSync(p, 'utf8');
      rmSync(p, { force: true });
      return '// == ' + t.src + String.fromCharCode(10) + code;
    });
    writeFileSync(join(OUT, bn), parts.join(NLSEMI));
    outHtml = outHtml.slice(0, g[0].idx) + '<script src="' + bn + '"></script>' + outHtml.slice(g[g.length - 1].idx + g[g.length - 1].tag.length);
    bundled += g.length;
  }
  writeFileSync(join(OUT, 'index.html'), outHtml);
  console.log('  ' + name + ': 파일 ' + n + '개, 스크립트 ' + bundled + '개 번들 병합, TS_DEMO=' + demoFlagValue);
  return OUT;
}

mkdirSync(DIST, { recursive: true });
const fullDir = buildVariant('itch-full', 'false');
const demoDir = buildVariant('itch-demo', 'true');

// zip (PowerShell Compress-Archive)
for (const [dir, zipName] of [[fullDir, 'tiu-card-full.zip'], [demoDir, 'tiu-card-demo.zip']]) {
  const zip = join(DIST, zipName);
  rmSync(zip, { force: true });
  execSync('powershell -NoProfile -Command "Compress-Archive -Path ' + BS + '"' + dir + BS + '\\*' + BS + '" -DestinationPath ' + BS + '"' + zip + BS + '""', { stdio: 'inherit' });
  console.log('  zip: ' + zip);
}
console.log('완료 — itch 업로드 파일: _dist/tiu-card-full.zip (유료 본편), _dist/tiu-card-demo.zip (무료 데모)');
