// Retirement worker for the former public game. Never touches localStorage saves.
self.addEventListener('install',function(event){event.waitUntil(self.skipWaiting());});
self.addEventListener('activate',function(event){
  event.waitUntil((async function(){
    var scope=self.registration.scope;
    var names=(await caches.keys()).filter(function(name){return name.indexOf('tiu-')===0;});
    for(var name of names){
      var cache=await caches.open(name);
      var entries=await cache.keys();
      await Promise.all(entries.filter(function(request){return request.url.indexOf(scope)===0;}).map(function(request){return cache.delete(request);}));
      if((await cache.keys()).length===0)await caches.delete(name);
    }
    await self.registration.unregister();
  })());
});
