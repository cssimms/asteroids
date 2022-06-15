var Game = require("./game.js");
var GameView = require("./gameView.js");

var element = document.getElementById("game-canvas");
var ctx = element.getContext("2d");

var newGame = new Game();
var newGameView = new GameView(newGame, ctx);
var startButton = document.getElementById("start-button");

startButton.addEventListener("click", (event) => {
  console.log("Starting Asteroids...");
  newGameView.start();
});
