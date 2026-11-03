const CACHE='fuerza77-v3';
const ASSETS=['./','./index.html','./styles.css','./app.js','./exercise-guides.js','./exercises/abwheel.svg','./exercises/bench.svg','./exercises/biceps.svg','./exercises/bulgarian.svg','./exercises/chestmachine.svg','./exercises/chestrow.svg','./exercises/crunch.svg','./exercises/incline.svg','./exercises/lateral.svg','./exercises/legcurl.svg','./exercises/machrow.svg','./exercises/ohp.svg','./exercises/pallof.svg','./exercises/pulldown.svg','./exercises/pullup.svg','./exercises/quadext.svg','./exercises/rdl.svg','./exercises/squat.svg','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
// Install the complete release before making it available. Existing clients keep v1.
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS.map(url=>new Request(url,{cache:'reload'}))))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('fuerza77-')&&k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;
  const url=new URL(e.request.url);
  const asset=ASSETS.find(path=>new URL(path,self.registration.scope).pathname===url.pathname);
  if(asset)e.respondWith(caches.open(CACHE).then(c=>c.match(new URL(asset,self.registration.scope).href)).then(r=>r||fetch(e.request)));
});
