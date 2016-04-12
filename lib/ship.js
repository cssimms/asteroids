var Util = require("./util.js");
var MovingObject = require("./movingObject.js");

var Ship = function(game){
  this.RADIUS = 20;
  this.COLOR = "#0000FF";
  MovingObject.call(this, {"game": game,
                    "pos": [400,400],
                    "vel": [0,0],
                    radius: this.RADIUS,
                    color: this.COLOR});
};


Ship.prototype.relocate = function () {
  this.pos = [400, 400];
  this.vel = [0, 0];
};

Util.inherits(Ship, MovingObject);


module.exports = Ship;
