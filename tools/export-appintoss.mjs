// export-appintoss.mjs — 앱인토스 미니앱용 산출본을 생성한다.
// 사용: node tools/export-appintoss.mjs            → _dist/appintoss-demo/ (+zip 가능 시)
//       node tools/export-appintoss.mjs --full     → _dist/appintoss-full/
//
// 변형 규칙 (export-itch.mjs 패턴 준수):
//   · SW 등록 제거 (토스 WebView — 스코프·캐시 리스크 회피)
//   · firebase-config.js / cloud-save.js 스텁 (클라우드 세이브는 토스 네이티브 저장소로 대체)
//   · appintoss/config.js + toss-bridge.js + toss-save-adapter.js 를 crash-guard 직후 주입
//   · demo-flag.js → TS_DEMO (기본 데모 — 설계 M1~M3 단계)
//   · 연속 <script> 번들 병합 (첫 화면 10초 요건 — 요청 수 절감)
import { rmSync, mkdirSync, readFileSync, writeFileSync, cpSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, '_dist');
const ASSET_DIRS = ['assets', 'audio', 'fonts', 'icons', 'vendor', 'img'];
const NL = String.fromCharCode(10);
const TOSS_SCRIPTS = ['appintoss/config.js', 'appintoss/toss-bridge.js', 'appintoss/toss-save-adapter.js'];

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

  // SW 제거
  html = html.replace(/\s*<script>if\("serviceWorker"[\s\S]*?<\/script>/, '');
  refs.delete('sw.js');

  // 앱인토스 스크립트 주입 — 첫 게임 스크립트(crash-guard) 직후
  const anchor = html.match(/<script\s+src="crash-guard\.js[^"]*"\s*><\/script>/);
  if (!anchor) throw new Error('crash-guard.js 앵커를 찾지 못했습니다 — index.html 구조 변경 확인 필요');
  const inject = TOSS_SCRIPTS.map(s => '  <script src="' + s + '"></script>').join(NL);
  html = html.replace(anchor[0], anchor[0] + NL + inject);
  writeFileSync(join(OUT, 'index.html'), html);

  let n = 1;
  for (const p of refs) {
    const dst = join(OUT, p);
    mkdirSync(dirname(dst), { recursive: true });
    if (p === 'demo-flag.js') {
      // demo 변형: IAP 해금 플래그(ts_toss_full_unlock)를 읽는 동적 게이트 —
      // 결제 성공/복원 후 reload만으로 본편이 열린다. --full 변형은 정적 false(테스트용).
      const flagJs = demoFlagValue === 'true'
        ? "window.TS_DEMO=(function(){try{return localStorage.getItem('ts_toss_full_unlock')!=='1'}catch(e){return true}})(); // appintoss " + name + ' build' + NL
        : 'window.TS_DEMO=false; // appintoss ' + name + ' build' + NL;
      writeFileSync(dst, flagJs); n++; continue;
    }
    if (p === 'firebase-config.js') { writeFileSync(dst, '// appintoss build: firebase 미사용 (토스 네이티브 저장소 사용)' + NL); n++; continue; }
    if (p === 'cloud-save.js') { writeFileSync(dst, '// appintoss build: cloud-save 대체 — appintoss/toss-save-adapter.js 참조' + NL); n++; continue; }
    const src = join(ROOT, p);
    if (!existsSync(src)) { console.warn('  missing ref:', p); continue; }
    cpSync(src, dst);
    n++;
  }
  for (const s of TOSS_SCRIPTS) {
    mkdirSync(dirname(join(OUT, s)), { recursive: true });
    cpSync(join(ROOT, s), join(OUT, s));
    n++;
  }
  for (const d of ASSET_DIRS) {
    const src = join(ROOT, d);
    if (existsSync(src)) cpSync(src, join(OUT, d), { recursive: true });
  }

  // CSS url()이 참조하는 루트 레벨 파일 복사 (index.html refs 스캔에 안 잡히는 경로 —
  // screen_overlay.png, button_*.png, gauge_*.png 등. export-itch.mjs에는 없는 보강)
  let cssExtra = 0;
  for (const p of refs) {
    if (!p.endsWith('.css')) continue;
    const cssPath = join(ROOT, p);
    if (!existsSync(cssPath)) continue;
    const css = readFileSync(cssPath, 'utf8');
    for (const um of css.matchAll(/url\((['"]?)([^)'"]+)\1\)/g)) {
      const u = um[2];
      if (/^(data:|https?:|%23|#)/.test(u)) continue;
      const rel = u.split('?')[0];
      const src = join(ROOT, dirname(p), rel);
      const dst = join(OUT, dirname(p), rel);
      if (existsSync(src) && !existsSync(dst)) {
        mkdirSync(dirname(dst), { recursive: true });
        cpSync(src, dst);
        cssExtra++;
      }
    }
  }
  if (cssExtra) console.log('  css url() 참조 파일 ' + cssExtra + '개 추가 복사');

  // 스크립트 번들 병합 (export-itch.mjs / app-android sync-www.mjs와 동일 로직)
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
    const parts = g.map(t => {
      const p = join(OUT, t.src);
      const code = readFileSync(p, 'utf8');
      rmSync(p, { force: true });
      return '// == ' + t.src + NL + code;
    });
    writeFileSync(join(OUT, bn), parts.join(NL + ';' + NL));
    outHtml = outHtml.slice(0, g[0].idx) + '<script src="' + bn + '"></script>' + outHtml.slice(g[g.length - 1].idx + g[g.length - 1].tag.length);
    bundled += g.length;
  }
  writeFileSync(join(OUT, 'index.html'), outHtml);
  console.log('  ' + name + ': 파일 ' + n + '개, 스크립트 ' + bundled + '개 번들 병합, TS_DEMO=' + demoFlagValue);
  return OUT;
}

function tryZip(dir, zipName) {
  const zip = join(DIST, zipName);
  rmSync(zip, { force: true });
  try {
    if (process.platform === 'win32') {
      const BS = String.fromCharCode(92);
      execSync('powershell -NoProfile -Command "Compress-Archive -Path ' + BS + '"' + dir + BS + '\\*' + BS + '" -DestinationPath ' + BS + '"' + zip + BS + '""', { stdio: 'inherit' });
    } else {
      execSync('cd "' + dir + '" && zip -qr "' + zip + '" .', { stdio: 'inherit', shell: '/bin/bash' });
    }
    console.log('  zip: ' + zip);
  } catch (e) {
    console.warn('  zip 생략 (' + e.message.split(NL)[0] + ') — 폴더 산출본 사용: ' + dir);
  }
}

mkdirSync(DIST, { recursive: true });
const full = process.argv.includes('--full');
const name = full ? 'appintoss-full' : 'appintoss-demo';
const dir = buildVariant(name, full ? 'false' : 'true');
tryZip(dir, 'tiu-card-' + name + '.zip');
console.log('완료 — 앱인토스 산출본: _dist/' + name + '/ (콘솔 업로드/CLI 패키징 입력용)');
