var Util = require('./util.js');
var MovingObject = require('./movingObject.js');
var Asteroid = require('./asteroid.js');
var Game = require('./game.js');

var GameView = function(game, ctx){
  this.game = game;
  this.ctx = ctx;
};

GameView.prototype.start = function () {
  var that = this;
  setInterval(function(){
    that.game.step();
    that.game.draw(that.ctx);
  }, 20);
};


module.exports = GameView;
