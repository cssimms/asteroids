var Util = function(){};

Util.inherits = function(ChildClass, ParentClass){
  var Surrogate = function(){};
  Surrogate.prototype = ParentClass.prototype;
  ChildClass.prototype = new Surrogate();
  ChildClass.prototype.constructor = ChildClass;
};

Util.randomVec = function(length){
  var isxNeg = (Math.random() > 0.5) ? -1 : 1;
  var isyNeg = (Math.random() > 0.5) ? -1 : 1;
  var dx = Math.floor(Math.random() * length + 1) * isxNeg;
  var dy = Math.floor(Math.random() * length + 1) * isyNeg;
  return [dx,dy];
};

module.exports = Util;
