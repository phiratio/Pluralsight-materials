'use strict';
var obj = {
  a: {
    b: {
      c: 'hello'
    }
  }
}

var c = 'this is important';

(function(newVar){
  console.log(newVar);
}(obj.a.b.c))



