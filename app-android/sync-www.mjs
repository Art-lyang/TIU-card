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

// 4) 스크립트 번들 병합 — WebView의 150+회 개별 fetch+파싱 오버헤드 제거 (콜드 스타트 단축)
//    연속된 로컬 <script src> 블록을 그룹 단위로 한 파일로 합친다. 인라인 스크립트 경계·속성 있는 태그는 보존.
//    파일 사이는 '\n;\n' 구분자 — 세미콜론 없이 끝나는 파일이 다음 파일과 이어붙는 사고 방지.
let bundleStat = '';
{
  let outHtml = readFileSync(join(OUT, 'index.html'), 'utf8');
  const tagRe = /<script\s+src="([^"]+)"\s*><\/script>/g;
  const tags = [];
  let m;
  while ((m = tagRe.exec(outHtml)) !== null) {
    if (/^https?:/.test(m[1])) continue;
    tags.push({ tag: m[0], src: m[1].split('?')[0], idx: m.index });
  }
  // 연속 그룹 묶기: 태그 사이가 공백/HTML주석뿐이면 같은 그룹 (섹션 주석은 무해 — 병합 시 제거됨)
  const inert = /^(\s|<!--[\s\S]*?-->)*$/;
  const groups = [];
  let cur = [];
  for (const t of tags) {
    if (cur.length && !inert.test(outHtml.slice(cur[cur.length - 1].idx + cur[cur.length - 1].tag.length, t.idx))) {
      groups.push(cur); cur = [];
    }
    cur.push(t);
  }
  if (cur.length) groups.push(cur);
  let bundled = 0, bundleFiles = 0;
  // 역순 처리 — 앞쪽 치환이 뒤쪽 인덱스를 흔들지 않게
  for (let gi = groups.length - 1; gi >= 0; gi--) {
    const g = groups[gi];
    if (g.length < 2) continue;
    const name = `game-bundle-${gi}.js`;
    const parts = g.map(t => {
      const p = join(OUT, t.src);
      const code = readFileSync(p, 'utf8');
      rmSync(p, { force: true });
      return `// ══ ${t.src}\n` + code;
    });
    writeFileSync(join(OUT, name), parts.join('\n;\n'));
    const start = g[0].idx, end = g[g.length - 1].idx + g[g.length - 1].tag.length;
    outHtml = outHtml.slice(0, start) + `<script src="${name}"></script>` + outHtml.slice(end);
    bundled += g.length; bundleFiles++;
  }
  writeFileSync(join(OUT, 'index.html'), outHtml);
  bundleStat = `스크립트 ${bundled}개 → 번들 ${bundleFiles}개`;
}

console.log(`✔ www/ 구성 완료 — 참조 파일 ${fileCount}개 + 자산 디렉토리 ${ASSET_DIRS.join(', ')}`);
console.log(`  (firebase-config.js → 스텁 / sw.js 제외 / back-trap 주입 / ${bundleStat})`);
