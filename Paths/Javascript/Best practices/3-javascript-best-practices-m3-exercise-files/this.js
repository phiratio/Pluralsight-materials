'use strict';
var obj = {
  val: 'Hi there',
  printVal: function(){
    console.log(this);
    console.log(this.val);
  }
};
var obj2 = {
  val: 'Whats up'
};

var print = obj.printVal.bind(obj2);
print();

//obj2.printVal = obj.printVal;

//obj2.printVal();