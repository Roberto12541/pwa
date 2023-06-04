const VERSION = "1.2";
const CACHE = "FloraTech";

const ARCHIVOS = [
  "css/styles.css",
  "img/logo.png",
  "img/Sala.png",
  "img/Comedor.png",
  "img/Recamara.png",
  "img/Jardin.png",
  "img/Banner.png",
  "js/config.js",
  "lib/js/regSw.js",
  "favicon.ico",
  "index.html",
  "html/registro.html",
  "site.webmanifest",
  "/",
];

if (self instanceof ServiceWorkerGlobalScope) {
  // Evento al empezar a instalar
  self.addEventListener("install", instala);

  // Evento al solicitar a la red
  self.addEventListener("fetch", descargaDatos);

  // Evento cuando está activo.
  self.addEventListener("activate", activo);
}

function activo() {
  console.log("Service Worker activo.");
}

/** @param {ExtendableEvent} evt */
function instala(evt) {
  console.log("Service Worker instalando.");
  evt.waitUntil(cargaCache());
}

/** @param {FetchEvent} evt */
function descargaDatos(evt) {
  if (evt.request.method === "GET") {
    evt.respondWith(usaCache(evt));
  }
}

async function cargaCache() {
  console.log("Intentando cargar cache:", CACHE);
  // Borra todos los chaches.
  const keys = await caches.keys();
  for (const key of keys) {
    await caches.delete(key);
  }
  // Carga el nuevo contenido.
  const cache = await caches.open(CACHE);
  await cache.addAll(ARCHIVOS);
  console.log("Cache cargado:", CACHE);
  console.log("Versión:", VERSION);
}

/** @param {FetchEvent} evt */
async function usaCache(evt) {
  // Busca el contenido del cache.
  const cache = await caches.open(CACHE);
  const response = await cache.match(evt.request, { ignoreSearch: true });
  if (response !== undefined) {
    /* Si lo encuentra, devuelve el
     * archivo del cache. */
    return response;
  } else {
    /* Si no lo encuentra, lo
     * empieza a descargar de la red
     * y devuelve la promesa. */
    return fetch(evt.request);
  }
}
