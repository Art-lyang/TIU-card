(function(){
  var cfg={
    enabled:true,
    storagePrefix:'tiu_demo_',
    maxAct:2,
    endDay:10,
    fullVersionHref:'../index.html',
    cardsPerDay:{1:3,2:4}
  };
  window.TIU_DEMO=cfg;

  if(typeof Storage==='undefined'||!window.localStorage)return;

  var raw={
    getItem:Storage.prototype.getItem,
    setItem:Storage.prototype.setItem,
    removeItem:Storage.prototype.removeItem,
    key:Storage.prototype.key,
    clear:Storage.prototype.clear
  };
  var isLocal=function(store){return store===window.localStorage};
  var mapKey=function(key){
    key=String(key);
    return key.indexOf('ts_')===0?cfg.storagePrefix+key:key;
  };
  var unmapKey=function(key){
    return key&&key.indexOf(cfg.storagePrefix+'ts_')===0?key.slice(cfg.storagePrefix.length):key;
  };

  Storage.prototype.getItem=function(key){
    return raw.getItem.call(this,isLocal(this)?mapKey(key):key);
  };
  Storage.prototype.setItem=function(key,value){
    return raw.setItem.call(this,isLocal(this)?mapKey(key):key,value);
  };
  Storage.prototype.removeItem=function(key){
    return raw.removeItem.call(this,isLocal(this)?mapKey(key):key);
  };
  Storage.prototype.key=function(index){
    var key=raw.key.call(this,index);
    return isLocal(this)?unmapKey(key):key;
  };

  window.TIU_DEMO_CLEAR=function(){
    try{
      for(var i=window.localStorage.length-1;i>=0;i--){
        var key=raw.key.call(window.localStorage,i);
        if(key&&key.indexOf(cfg.storagePrefix)===0)raw.removeItem.call(window.localStorage,key);
      }
    }catch(e){}
  };
})();
