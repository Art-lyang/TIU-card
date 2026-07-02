// sw.js — 오프라인/캐시 서비스워커 (TWA·PWA 대비)
// 캐시 이름은 등록 URL의 ?v= (BUILD_VER, stamp-cache.js 가 스탬프)에서 파생 —
// 배포마다 자동으로 새 캐시로 전환되고 이전 캐시는 activate 에서 정리된다.
// 전략:
//  - navigation(HTML): network-first, 실패 시 캐시된 index.html (오프라인 부팅)
//  - ?v= 붙은 정적 자산: cache-first (버전이 바뀌면 URL 이 바뀌므로 불변 취급)
//  - 그 외 same-origin GET(이미지/오디오 등 비버전 자산): stale-while-revalidate
var VER = (function () { try { return new URL(self.location.href).searchParams.get('v') || '0'; } catch (e) { return '0'; } })();
var CACHE = 'tiu-' + VER;

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return c.addAll(['./', './index.html']).catch(function () {});
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k.indexOf('tiu-') === 0 && k !== CACHE; })
        .map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url;
  try { url = new URL(req.url); } catch (err) { return; }
  if (url.origin !== self.location.origin) return; // CDN 등 외부는 관여하지 않음

  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put('./index.html', copy).catch(function () {}); });
        return res;
      }).catch(function () {
        return caches.match('./index.html').then(function (hit) {
          return hit || caches.match('./');
        });
      })
    );
    return;
  }

  if (url.searchParams.has('v')) {
    // 버전 스탬프 자산 — cache-first (URL 자체가 버전 키)
    e.respondWith(
      caches.match(req).then(function (hit) {
        if (hit) return hit;
        return fetch(req).then(function (res) {
          if (res && res.ok) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(req, copy).catch(function () {}); }); }
          return res;
        });
      })
    );
    return;
  }

  // 비버전 자산(이미지/오디오/폰트 파일) — stale-while-revalidate
  e.respondWith(
    caches.match(req).then(function (hit) {
      var net = fetch(req).then(function (res) {
        if (res && res.ok) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(req, copy).catch(function () {}); }); }
        return res;
      }).catch(function () { return hit; });
      return hit || net;
    })
  );
});
