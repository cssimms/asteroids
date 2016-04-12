/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(1);
	var GameView = __webpack_require__(6);

	var element = document.getElementById("game-canvas");
	var ctx = element.getContext("2d");

	var newGame = new Game();
	var newGameView = new GameView(newGame, ctx);
	newGameView.start();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Asteroid = __webpack_require__(2);
	var Ship = __webpack_require__(5);

	var Game = function(){
	  this.addAsteroids(Game.NUM_ASTEROIDS);
	  this.ship = new Ship(this);
	};

	Game.DIM_X = 800;
	Game.DIM_Y = 800;
	Game.NUM_ASTEROIDS = 20;

	Game.prototype.randoPo = function () {
	  var x = Math.floor(Math.random() * Game.DIM_X);
	  var y = Math.floor(Math.random() * Game.DIM_Y);
	  return [x, y];
	};

	Game.prototype.allObjects = function () {
	  var allObjs = this.asteroids.slice();
	  allObjs.push(this.ship);
	  return allObjs;
	};

	Game.prototype.checkCollisions = function () {
	  var that = this;
	  that.allObjects().forEach(function(spaceJunk){
	    for (var i = 0; i < that.allObjects().length - 1; i++){
	      var otherJunk = that.allObjects()[i];
	      if (spaceJunk.isCollidedWith(otherJunk) &&
	          spaceJunk !== otherJunk){
	        spaceJunk.collideWith(otherJunk);
	        otherJunk.collideWith(spaceJunk);
	      }
	    }
	  });
	};

	Game.prototype.step = function () {
	  this.moveObjects();
	  this.checkCollisions();
	};

	Game.prototype.remove = function(asteroid){
	  var getRidOfThisOne = this.asteroids.indexOf(asteroid);
	  this.asteroids.splice(getRidOfThisOne, 1);
	};



	Game.prototype.wrap = function (pos){
	  var x = pos[0];
	  var y = pos[1];
	  if (x > Game.DIM_X){
	    x -= Game.DIM_X;
	  } else if(x < 0){
	    x += Game.DIM_X;
	  }
	  if (y > Game.DIM_Y){
	    y -= Game.DIM_Y;
	  }
	  else if(y < 0){
	    y += Game.DIM_Y;
	  }
	  return [x, y];
	};

	Game.prototype.addAsteroids = function (num) {
	  this.asteroids = [];
	  var that = this;
	  while (this.asteroids.length < num){
	    this.asteroids.push(new Asteroid(that, that.randoPo()));
	  }
	  return this.asteroids;
	};


	Game.prototype.draw = function (ctx) {
	  ctx.clearRect(0, 0, 800, 800);
	  ctx.fillStyle = "#000000";
	  ctx.fillRect(0,0,800,800);
	  this.allObjects().forEach(function(spaceJunk){
	    spaceJunk.draw(ctx);
	  });

	};

	Game.prototype.moveObjects = function () {
	  this.allObjects().forEach(function(spaceJunk){
	    spaceJunk.move();
	  });
	};

	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(3);
	var MovingObject = __webpack_require__(4);
	var Ship = __webpack_require__(5);

	var Asteroid = function(game, position){
	  this.COLOR = "#ff0000";
	  this.RADIUS = Math.floor((Math.random() * 30) + 5);
	  var vel = Util.randomVec(8);
	  MovingObject.call(this, {"game": game,
	                    "pos": position,
	                    "vel": vel,
	                    radius: this.RADIUS,
	                    color: this.COLOR});
	};

	Util.inherits(Asteroid, MovingObject);

	module.exports = Asteroid;

	Asteroid.prototype.collideWith = function (otherObject) {
	  if(otherObject instanceof Ship){
	    otherObject.relocate();
	    this.game.remove(this);
	  }
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

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


/***/ },
/* 4 */
/***/ function(module, exports) {

	var MovingObject = function(args){
	  this.game = args["game"];
	  this.pos = args["pos"];
	  this.vel = args["vel"];
	  this.radius = args["radius"];
	  this.color = args["color"];
	};

	MovingObject.prototype.draw = function(ctx){
	  ctx.fillStyle = this.color;
	    ctx.beginPath();

	    ctx.arc(
	      this.pos[0],
	      this.pos[1],
	      this.radius,
	      0,
	      2 * Math.PI,
	      false
	    );

	    ctx.fill();
	  };

	MovingObject.prototype.move = function(){
	  this.pos[0] += this.vel[0];
	  this.pos[1] += this.vel[1];
	  this.pos = this.game.wrap(this.pos);
	};

	MovingObject.prototype.collideWith = function (otherObject) {
	  // this.game.remove(otherObject);
	  // this.game.remove(this);
	};

	MovingObject.prototype.isCollidedWith = function (otherObject) {
	  var xDiff = (this.pos[0] - otherObject.pos[0]);
	  var yDiff = (this.pos[1] - otherObject.pos[1]);
	  var radii = this.radius + otherObject.radius;
	  var distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
	  if (distance < radii) {
	    return true;
	  }
	  return false;
	};

	module.exports = MovingObject;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(3);
	var MovingObject = __webpack_require__(4);

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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(3);
	var MovingObject = __webpack_require__(4);
	var Asteroid = __webpack_require__(2);
	var Game = __webpack_require__(1);

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


/***/ }
/******/ ]);