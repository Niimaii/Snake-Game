//board
const blockSize = 25;
let rows = localStorage.getItem("rowsLocal") || 25;
let cols = localStorage.getItem("colsLocal") || 25;
let speed = localStorage.getItem("speedLocal") || 10;
let wrappingScreen = localStorage.getItem("screenLocal") || false;
let board;
let context;
let moved = true;
const moveSpeed = 15;
const gg = document.getElementById("gameOver");

// console.log(localStorage.getItem("rowsLocal"));
// Snake head
// https://youtu.be/baBq5GAL0_U?t=660
// These are the coordinates for the snake head. Watch video to see why multiply by blockSize
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let velocityX = 0;
let velocityY = 0;

var snakeBody = [];

// Food
let foodX;
let foodY;

let gameOver = false;

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
    snakeX > (cols - 1) * blockSize ||
    snakeY < 0 ||
    snakeY > (rows - 1) * blockSize
  ) {
    gameOver = true;
    death();
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
      death();
    }
  }
}

function changeDirection(e) {
  if (e.code == "ArrowUp" && velocityY != 1) {
    if (moved) {
      // Stop Movement
      velocityX = 0;
      // Move Up
      velocityY = -1;

      moved = false;
    } else {
    }

    setTimeout(() => {
      moved = true;
    }, 1000 / moveSpeed);
  } else if (e.code == "ArrowDown" && velocityY != -1 && moved) {
    // Stop Movement
    velocityX = 0;
    // Move Down
    velocityY = 1;

    moved = false;

    setTimeout(() => {
      moved = true;
    }, 1000 / moveSpeed);
  } else if (e.code == "ArrowLeft" && velocityX != 1 && moved) {
    // Move Left
    velocityX = -1;
    // Stop Movement
    velocityY = 0;

    moved = false;

    setTimeout(() => {
      moved = true;
    }, 1000 / moveSpeed);
  } else if (e.code == "ArrowRight" && velocityX != -1 && moved) {
    // Move Right
    velocityX = 1;
    // Stop Movement
    velocityY = 0;

    moved = false;

    setTimeout(() => {
      moved = true;
    }, 1000 / moveSpeed);
  }
}

function placeFood() {
  // Random produces a number between 0-1 and multiply it by cols (25). Ex: 22.3816. Floor removes the decimals so Ex = 22. Now multiply by blockSize to get the coordinates.
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}

function resetGame() {
  snakeX = blockSize * 5;
  snakeY = blockSize * 5;
  velocityX = 0;
  velocityY = 0;
  snakeBody = [];
  gameOver = false;
  score = 0;
  gg.classList.remove("deathScreen");
  placeFood();
}

function death() {
  gg.classList.add("deathScreen");

  document.addEventListener("keyup", (e) => {
    if (e.key === "r") {
      resetGame();
    } else if (e.key === "m") {
      document.location.href = "index.html";
    }
  });
}
