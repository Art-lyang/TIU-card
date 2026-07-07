// sync-www.mjs — 게임 파일을 리포 루트에서 www/ 로 복사해 앱 번들을 구성한다.
// 앱 빌드 전용 변형 3가지:
//   1) firebase-config.js → 스텁으로 교체 (클라우드 세이브 비활성: 개인정보 수집 0)
//   2) 서비스워커 등록 스크립트 제거 (네이티브 오프라인이라 불필요)
//   3) 안드로이드 뒤로가기 즉시 종료 방지 히스토리 트랩 주입
// 사용: node sync-www.mjs   (또는 npm run sync → cap sync까지)
import { rmSync, mkdirSync, readFileSync, writeFileSync, cpSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const OUT = join(HERE, 'www');

// 통째로 복사할 자산 디렉토리 (런타임 참조 확인됨: img/는 브리핑 이미지)
const ASSET_DIRS = ['assets', 'audio', 'fonts', 'icons', 'vendor', 'img'];

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

let html = readFileSync(join(ROOT, 'index.html'), 'utf8');

// index.html의 src/href 참조 수집 (원본 기준, ?v= 캐시태그 제거)
const refs = new Set();
for (const m of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  let p = m[1];
  if (/^(https?:|data:|mailto:|#)/.test(p)) continue;
  p = p.split('?')[0];
  if (!p) continue;
  refs.add(p);
}

// 1) SW 등록 스크립트 제거 (앱은 로컬 번들이라 SW 불필요 — sw.js 자체도 복사 제외)
html = html.replace(/\s*<script>if\("serviceWorker"[\s\S]*?<\/script>/, '');
refs.delete('sw.js');

// 3) 뒤로가기 트랩 주입 — 안드로이드 back 제스처가 앱을 즉시 종료시키지 않게 함
const backTrap = `  <script>/* app build: Android back-gesture trap (즉시 종료 방지) */(function(){try{history.pushState({app:1},'');addEventListener('popstate',function(){history.pushState({app:1},'')})}catch(e){}})()</script>\n`;
html = html.replace('</body>', backTrap + '</body>');

writeFileSync(join(OUT, 'index.html'), html);

// 참조 파일 복사 (firebase-config.js는 스텁으로 대체)
let fileCount = 1; // index.html
for (const p of refs) {
  const dst = join(OUT, p);
  mkdirSync(dirname(dst), { recursive: true });
  if (p === 'firebase-config.js') {
    writeFileSync(dst, '// TIU app build: cloud save disabled (no Firebase config — zero data collection)\n');
    fileCount++;
    continue;
  }
  const src = join(ROOT, p);
  if (!existsSync(src)) { console.warn('  ⚠ missing ref:', p); continue; }
  cpSync(src, dst);
  fileCount++;
}

// 자산 디렉토리 통째 복사
for (const d of ASSET_DIRS) {
  const src = join(ROOT, d);
  if (!existsSync(src)) { console.warn('  ⚠ missing dir:', d); continue; }
  cpSync(src, join(OUT, d), { recursive: true });
}

console.log(`✔ www/ 구성 완료 — 참조 파일 ${fileCount}개 + 자산 디렉토리 ${ASSET_DIRS.join(', ')}`);
console.log('  (firebase-config.js → 스텁 / sw.js 제외 / back-trap 주입)');
