const CACHE_PREFIX = "app-cache-";
const CACHE_NAME = `${CACHE_PREFIX}v2`;
const ASSETS = ["./", "./index.html", "./manifest.webmanifest"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) =>
        cache.addAll(ASSETS.map((url) => new Request(url, { cache: "reload" })))
      )
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  const isHashed = url.pathname.includes("/assets/");
  event.respondWith(isHashed ? cacheFirst(request) : networkFirst(request));
});

async function fetchAndCache(request, options) {
  const response = await fetch(request, options);
  if (response.status === 200) {
    const copy = response.clone();
    const cache = await caches.open(CACHE_NAME);
    await cache.put(request, copy).catch(() => {});
  }
  return response;
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  return (await cache.match(request)) || fetchAndCache(request);
}

async function networkFirst(request) {
  try {
    return await fetchAndCache(request, { cache: "no-cache" });
  } catch (error) {
    const cache = await caches.open(CACHE_NAME);
    const cached =
      (await cache.match(request)) ||
      (request.mode === "navigate" && (await cache.match("./index.html")));
    if (cached) return cached;
    throw error;
  }
}