const staticCacheName = "site-static";
import { del, entries } from "https://cdn.jsdelivr.net/npm/idb-keyval@6/+esm";

const assets = [
  "/",
  "/index.html",
  "/manifest.json",
  "/favicon.ico",
  "/images/guitar-icon.jpg",
  "/images/guitar-icon(1).jpg",
  "/images/guitar-icon(2).jpg",
  "/images/guitar-icon(3).jpg",
  "/images/guitar-icon(4).jpg",
  "/images/guitar-icon(5).jpg",
  "/images/guitar-icon(7).jpg",
  "/images/guitar-icon(8).jpg",
  "/images/SweetAlabamaTab.png",
];

self.addEventListener("install", (event) => {
  //console.log("service worker has been installed");
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("cashing shell assets");
      return cache.addAll(assets);
    })
  );
});

//activate event
self.addEventListener("activate", (event) => {
  //console.log("service worker has been activated");
});

//fetch event
self.addEventListener("fetch", (event) => {
  //console.log("fetch event", evt);
  event.respondWith(
    caches.match(event.request).then((cacheResponse) => {
      return cacheResponse || fetch(event.request);
    })
  );
});

self.addEventListener("sync", (event) => {
  console.log("sync event", event);
  if (event.tag === "sync") {
    //call method
    event.waitUntil(pushNotify());
  }
});
function pushNotify() {
  let obj = { name: "Bruno" };
  fetch("http://localhost:3000/data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  })
    .then(() => Promise.resolve())
    .catch(() => Promise.reject());

  self.registration.showNotification(`Background sync succesful`);
}
