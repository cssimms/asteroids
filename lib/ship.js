var Util = require("./util.js");
var MovingObject = require("./movingObject.js");

var Ship = function(game){
  this.RADIUS = 10;
  this.COLOR = "#0000FF";
  MovingObject.call(this, {"game": game,
                    "pos": [400,400],
                    "vel": [0,0],
                    radius: this.RADIUS,
                    color: this.COLOR});
};

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function () {
  this.pos = this.game.randoPo();
  this.vel = [0, 0];
};

Ship.prototype.power = function (impulse) {
  this.vel[0] += impulse;
  this.vel[1] += impulse;
};

module.exports = Ship;
