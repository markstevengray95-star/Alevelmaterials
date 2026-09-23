const CACHE_NAME = 'alevel-materials-v3';
const APP_SHELL = [
  './','./index.html','./styles.css?v=3','./upgrade-v3.css?v=3','./materials-data.js?v=2','./textbook-visuals-v3.js?v=3','./textbook-part1-v3.js?v=3','./textbook-part2-v3.js?v=3','./extended-bank-v3.js?v=3','./app.js?v=2','./simulation-upgrade-v3.js?v=3','./exam-coach-v3.js?v=3','./netlify-runtime.js?v=2','./manifest.webmanifest','./physics-icon.svg','./offline.html'
];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(APP_SHELL)));self.skipWaiting();});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE_NAME).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;const url=new URL(event.request.url);if(url.origin!==self.location.origin)return;
  if(event.request.mode==='navigate'){event.respondWith(fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put('./index.html',copy));return response;}).catch(async()=>await caches.match('./index.html')||caches.match('./offline.html')));return;}
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{if(response.ok&&['style','script','image','font'].includes(event.request.destination)){const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy));}return response;})));
});
