const start = document.getElementById("start");

// This is the toggle setting names
const size = ["Small Box", "Large Box", "Small Rect", "Large Rect"];
const speed = ["Normal", "Fast", "Very Fast"];
const screenWrapping = ["On", "Off"];

// ↓↓↓↓↓ Initiating variables ↓↓↓↓↓
let sizeToggle = document.getElementById("size");

// const leftSizeArrow = document.getElementById("leftSizeArrow");
// const rightSizeArrow = document.getElementById("rightSizeArrow");
// const leftSpeedArrow = document.getElementById("leftSpeedArrow");
// const rightSpeedArrow = document.getElementById("rightSpeedArrow");
// const leftScreenArrow = document.getElementById("leftScreenArrow");
// const rightScreenArrow = document.getElementById("rightScreenArrow");

const sizeText = document.getElementById("size");
const speedText = document.getElementById("speed");
const screenText = document.getElementById("screenWrapping");
// ↑↑↑↑↑ Initiating variables ↑↑↑↑↑

const leftArrows = document.querySelectorAll(".leftArrow");
const rightArrows = document.querySelectorAll(".rightArrow");

// ↓↓↓ Change Toggle ↓↓↓
let sizePos = 0;
let speedPos = 0;
let screenPos = 0;

// Needed to loop because I targted multiple elements with my querySelctAll
for (let i = 0; i < leftArrows.length; i++) {
  leftArrows[i].addEventListener("click", changeLeftToggle);
}

for (let i = 0; i < rightArrows.length; i++) {
  rightArrows[i].addEventListener("click", changeRightToggle);
}

function changeLeftToggle(e) {
  let nextSibling = e.target.nextElementSibling.firstChild;
  // This returns the targted element associated array
  let currentArray = toggleMap.get(nextSibling);
  // This returns the position of the associated array
  let currentPos = toggleMap.get(currentArray);

  if (currentPos > 0) {
    currentPos = currentPos - 1;
    toggleMap.set(currentArray, currentPos);

    // TODO: This only runs once?
    nextSibling.textContent = currentArray[currentPos];
  }
}

function changeRightToggle(e) {
  let previousSibling = e.target.previousElementSibling.firstChild;
  // This returns the targted element associated array
  let currentArray = toggleMap.get(previousSibling);
  // This returns the position of the associated array
  let currentPos = toggleMap.get(currentArray);

  console.log(toggleMap.get(previousSibling));

  if (currentPos < currentArray.length - 1) {
    currentPos = currentPos + 1;
    toggleMap.set(currentArray, currentPos);

    // TODO: This only runs once?
    previousSibling.textContent = currentArray[currentPos];
  }
}

start.addEventListener("click", () => {
  document.location.href = "game.html";
});
// ↑↑↑ Change Toggle ↑↑↑

// ↓↓↓ Map stuff ↓↓↓
let toggleMap = new Map([
  [sizeText, size],
  [speedText, speed],
  [screenText, screenWrapping],
  [size, sizePos],
  [speed, speedPos],
  [screenWrapping, screenPos],
]);
// ↑↑↑ Map stuff ↑↑↑
