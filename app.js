var CONSTANTS = require("./lib/constants.js");
var Game = require("./lib/game.js");
var GameView = require("./lib/gameView.js");

var gameContainer = document.getElementById("asteroids-container");
// var element = document.getElementById("game-canvas");
var canvasElement = document.createElement("canvas");
canvasElement.id = "game-canvas";
canvasElement.width = CONSTANTS.DEFAULT_GAME_WIDTH;
canvasElement.height = CONSTANTS.DEFAULT_GAME_HEIGHT;
var startButton = document.createElement("button");
startButton.id = "start-button";
startButton.innerText = "Start Asteroids!";

gameContainer.appendChild(canvasElement);
gameContainer.appendChild(startButton);
var ctx = canvasElement.getContext("2d");

var newGame = new Game();
var newGameView = new GameView(newGame, ctx);

// remove later
newGameView.start();
startButton.addEventListener("click", (event) => {
  console.log("Starting Asteroids...");
  newGameView.start();
});
