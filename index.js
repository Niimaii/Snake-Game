//board
var blockSize = 25;
var rows = 25;
var cols = 25;
var board;
var context;
var speed = 10;

// Snake head
// https://youtu.be/baBq5GAL0_U?t=660
// These are the coordinates for the snake head. Watch video to see why multiply by blockSize
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

// Food
var foodX;
var foodY;

var gameOver = false;

window.onload = function () {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d"); // Used for drawing on the board

  placeFood();
  // This waits for you to press a key and when you do it calls "changeDirection"
  document.addEventListener("keyup", changeDirection);
  //   update();
  setInterval(update, 1000 / speed);
};

function update() {
  if (gameOver) {
    return;
  }

  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  // Food
  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  // If there is a body
  if (snakeBody.length) {
    // Make the first item of the list the snake head
    snakeBody[0] = [snakeX, snakeY];
  }

  // Snake
  context.fillStyle = "lime";
  // Snakes Position
  // blockSize so it moves 1 unit and not 1 pixel
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);

  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  // Game over conditions
  if (
    snakeX < 0 ||
    snakeX > cols * blockSize ||
    snakeY < 0 ||
    snakeY > rows * blockSize
  ) {
    gameOver = true;
    alert("Game Over");
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
      alert("Game Over");
    }
  }
}

function changeDirection(e) {
  if (e.code == "ArrowUp" && velocityY != 1) {
    // Stop Movement
    velocityX = 0;
    // Move Up
    velocityY = -1;
  } else if (e.code == "ArrowDown" && velocityY != -1) {
    // Stop Movement
    velocityX = 0;
    // Move Down
    velocityY = 1;
  } else if (e.code == "ArrowLeft" && velocityX != 1) {
    // Move Left
    velocityX = -1;
    // Stop Movement
    velocityY = 0;
  } else if (e.code == "ArrowRight" && velocityX != -1) {
    // Move Right
    velocityX = 1;
    // Stop Movement
    velocityY = 0;
  }
}

function placeFood() {
  // Random produces a number between 0-1 and multiply it by cols (25). Ex: 22.3816. Floor removes the decimals so Ex = 22. Now multiply by blockSize to get the coordinates.
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}
