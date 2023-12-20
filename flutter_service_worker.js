'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "9b581b298a4c8ec46f0849032fc1ed94",
"assets/AssetManifest.bin.json": "41f493875f7738e879e425ae40962885",
"assets/AssetManifest.json": "e89e331792874a1efb3cb3112679be65",
"assets/assets/launcher_icons/motorcycle_icon_black.png": "cbe166b1080d84e7346b22fc126fe43c",
"assets/assets/launcher_icons/motorcycle_icon_white.png": "1d449f97f2b0ef81f9e86a71e2286f1b",
"assets/assets/lottiefiles/error_screens/404_page_not_found.json": "4a61d51cbb1148f2b3a8a3cbbb027f63",
"assets/assets/lottiefiles/error_screens/404_page_not_found_2.json": "40b411caffc52d5a3a7e6107b4192994",
"assets/assets/splash_screen/motorcycle_icon_black.png": "cbe166b1080d84e7346b22fc126fe43c",
"assets/assets/splash_screen/motorcycle_icon_white.png": "1d449f97f2b0ef81f9e86a71e2286f1b",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "01df524e46c3fde0a7b09703ca6dada2",
"assets/NOTICES": "92e01bf6af5ca35df9d0df3226d22c40",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "4096b5150bac93c41cbc9b45276bd90f",
"canvaskit/canvaskit.js": "93a63b18433d5c16dd17b5d9ab497edb",
"canvaskit/canvaskit.js.symbols": "76f70f32f4c39e1941aa15cd1ea94d03",
"canvaskit/canvaskit.wasm": "8461fc6a596323f2502287e254d2d4b2",
"canvaskit/chromium/canvaskit.js": "ee5174694d4a451c41b16dc39ef73808",
"canvaskit/chromium/canvaskit.js.symbols": "dfe5b7d6912ec0b72d47ef6ce0228dc4",
"canvaskit/chromium/canvaskit.wasm": "3713632cdac9285b8a2ad894df7564d2",
"canvaskit/skwasm.js": "87063acf45c5e1ab9565dcf06b0c18b8",
"canvaskit/skwasm.js.symbols": "1688ef160c22443677bba8945cd683a2",
"canvaskit/skwasm.wasm": "9e8c133145f469d72fe6d2f64f2144e9",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.png": "4e167b7c79c1b7ed370107c568744948",
"flutter.js": "59a12ab9d00ae8f8096fffc417b6e84f",
"icons/Icon-192.png": "a1be361cbb57455e36389f6dbaeb09d4",
"icons/Icon-512.png": "c6d62ae9e24a2b3c60a41ff21f94f3ec",
"icons/Icon-maskable-192.png": "a1be361cbb57455e36389f6dbaeb09d4",
"icons/Icon-maskable-512.png": "c6d62ae9e24a2b3c60a41ff21f94f3ec",
"index.html": "0f95a8ca13ca273508ab17ec660ce698",
"/": "0f95a8ca13ca273508ab17ec660ce698",
"main.dart.js": "3950b654120790900887804a36551c2d",
"manifest.json": "ec6b0405fab1814af4bbc653a6784a89",
"splash/img/dark-1x.gif": "26b6c892491f708c313ba37cf6db8628",
"splash/img/dark-1x.png": "ae75268c8b618fc8123a1942f1b7bb1b",
"splash/img/dark-2x.gif": "543efc6e9f8d8f2ae191ec630256b017",
"splash/img/dark-2x.png": "71616c5939692debe378fbbedc042e1b",
"splash/img/dark-3x.gif": "ea9a0bff8fe14c0b30ba93724513df32",
"splash/img/dark-3x.png": "c5003f36366489b0b51199afa728ff69",
"splash/img/dark-4x.gif": "7a394d26d4bc908134d3026fc9d437a4",
"splash/img/dark-4x.png": "fc0f08f57efd2f4d7d4277eca6d01970",
"splash/img/light-1x.gif": "26b6c892491f708c313ba37cf6db8628",
"splash/img/light-1x.png": "9872e06199fb6e060ef7374df0171dbb",
"splash/img/light-2x.gif": "543efc6e9f8d8f2ae191ec630256b017",
"splash/img/light-2x.png": "7fb5f6120d973de002c196cbd77a836e",
"splash/img/light-3x.gif": "ea9a0bff8fe14c0b30ba93724513df32",
"splash/img/light-3x.png": "e6f44062b5d8386140ed677d5efe8643",
"splash/img/light-4x.gif": "7a394d26d4bc908134d3026fc9d437a4",
"splash/img/light-4x.png": "a897fe6b273e4c7830b8544065489d54",
"splash/splash.js": "123c400b58bea74c1305ca3ac966748d",
"splash/style.css": "fd7e08a5fc9e29a741f7106de4c3c652",
"version.json": "ab9f4c14248d55e5b62e11241b1a6da1"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
