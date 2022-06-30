var hotkeys = require("hotkeys-js/dist/hotkeys.common");
var Util = require("./util.js");
var MovingObject = require("./movingObject.js");
var Asteroid = require("./asteroid.js");
var Game = require("./game.js");

var GameView = function (game, ctx) {
  this.game = game;
  this.ctx = ctx;
};

GameView.prototype.start = function () {
  var that = this;
  that.bindKeyHandlers();
  setInterval(function () {
    that.game.step();
    that.game.draw(that.ctx);
  }, 20);
};

GameView.prototype.bindKeyHandlers = function () {
  const that = this;
  hotkeys("d", () => {
    console.log("blamo");
  });
  hotkeys("up", function (event) {
    that.game.ship.power(1);
  });
  hotkeys("down", function (event) {
    that.game.ship.power(-1);
  });
  hotkeys("left", function (event) {
    // 15 degree increments, will likely need tuning later
    that.game.ship.turn(-15);
  });
  hotkeys("right", function (event) {
    // 15 degree increments, will likely need tuning later
    that.game.ship.turn(15);
  });
};
module.exports = GameView;
