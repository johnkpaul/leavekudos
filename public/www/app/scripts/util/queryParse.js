define([], function(){
  return function(queryString){
    var oGetVars = {};
 
    for (var aItKey, nKeyId = 0, aCouples = queryString.substr(1).split("&"); nKeyId < aCouples.length; nKeyId++) {
      aItKey = aCouples[nKeyId].split("=");
      oGetVars[unescape(aItKey[0])] = aItKey.length > 1 ? unescape(aItKey[1]) : "";
    }

    return oGetVars;
  
  } 
});

