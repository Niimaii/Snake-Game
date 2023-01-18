let rows;
let cols;
let speed;
let screen;

const sizeText = document.getElementById("size");
const speedText = document.getElementById("speed");
const screenText = document.getElementById("screenWrapping");

let wrappingScreen = false;
localStorage.setItem("screenLocal", wrappingScreen);

// Starts game
const start = document.getElementById("start");

// This is the toggle setting names
const size = ["Small Box", "Large Box", "Small Rect", "Large Rect"];
const speeds = ["Normal", "Fast", "Very Fast"];
const screenWrapping = ["Off", "On"];

// This updates the menu to the proper settings
sizeText.textContent = localStorage.getItem("sizeName") || size[0];
speedText.textContent = localStorage.getItem("speedName") || speeds[0];
screenText.textContent =
  localStorage.getItem("screenName") || screenWrapping[0];

// ↓↓↓↓↓ Initiating variables ↓↓↓↓↓
let sizeToggle = document.getElementById("size");

// ↑↑↑↑↑ Initiating variables ↑↑↑↑↑

const leftArrows = document.querySelectorAll(".leftArrow");
const rightArrows = document.querySelectorAll(".rightArrow");

// ↓↓↓ Change Toggle ↓↓↓

// This syncs the position with the index of the settings
let sizePos =
  size.indexOf(localStorage.getItem("sizeName")) > 0
    ? size.indexOf(localStorage.getItem("sizeName"))
    : 0;
let speedPos =
  speeds.indexOf(localStorage.getItem("speedName")) > 0
    ? speeds.indexOf(localStorage.getItem("speedName"))
    : 0;
let screenPos = screenWrapping.indexOf(localStorage.getItem("screenName")) || 0;

console.log(sizePos, speedPos);
// Needed to loop because I targted multiple elements with my querySelctAll
for (let i = 0; i < leftArrows.length; i++) {
  leftArrows[i].addEventListener("click", changeLeftToggle);
}

for (let i = 0; i < rightArrows.length; i++) {
  rightArrows[i].addEventListener("click", changeRightToggle);
}

function changeLeftToggle(e) {
  // "e" returns the left toggle, which is one behind of the element we are interested in. I target the next element, but since that element we want is within a div. We then target the first child of the element we initially selected.
  let nextSibling = e.target.nextElementSibling.firstChild;
  // This returns the targted element associated array
  let currentArray = toggleMap.get(nextSibling);
  // This returns the position of the associated array
  let currentPos = toggleMap.get(currentArray);

  if (currentPos > 0) {
    currentPos = currentPos - 1;
    // Update the currentPos, if you don't do this then the map does not update!
    toggleMap.set(currentArray, currentPos);

    // Change the elements content to match items on the array
    nextSibling.textContent = currentArray[currentPos];

    // Update Local Memory
    if (nextSibling.id == "size") {
      localStorage.setItem("sizeName", currentArray[currentPos]);
      // I am getting the rows/cols (check the settingsMap to understand)
      let positions = settingsMap.get(currentArray[currentPos]);

      rows = positions[0];
      cols = positions[1];

      localStorage.setItem("rowsLocal", rows);
      localStorage.setItem("colsLocal", cols);
    } else if (nextSibling.id == "speed") {
      localStorage.setItem("speedName", currentArray[currentPos]);

      let velocity = settingsMap.get(currentArray[currentPos]);

      speed = velocity;

      localStorage.setItem("speedLocal", speed);
    } else if (nextSibling.id == "screenWrapping") {
      localStorage.setItem("screenName", currentArray[currentPos]);

      let wrapping = settingsMap.get(currentArray[currentPos]);

      screen = wrapping;

      localStorage.setItem("screenLocal", screen);
    }
  }
}

function changeRightToggle(e) {
  // "e" returns the right toggle, which is one ahead of the element we are interested in. I target the previous element, but since that element we want is within a div. We then target the first child of the element we initially selected.
  let previousSibling = e.target.previousElementSibling.firstChild;
  // This returns the targted element associated array
  let currentArray = toggleMap.get(previousSibling);
  // This returns the position of the associated array
  let currentPos = toggleMap.get(currentArray);
  localStorage.setItem("rightName", currentPos);

  if (currentPos < currentArray.length - 1) {
    currentPos = currentPos + 1;
    // Update the currentPos, if you don't do this then the map does not update!
    toggleMap.set(currentArray, currentPos);

    // Change the elements content to match items on the array
    previousSibling.textContent = currentArray[currentPos];

    // Update Local Memory
    if (previousSibling.id == "size") {
      localStorage.setItem("sizeName", currentArray[currentPos]);
      // I am getting the rows/cols (check the settingsMap to understand)
      let positions = settingsMap.get(currentArray[currentPos]);

      rows = positions[0];
      cols = positions[1];

      localStorage.setItem("rowsLocal", rows);
      localStorage.setItem("colsLocal", cols);
    } else if (previousSibling.id == "speed") {
      localStorage.setItem("speedName", currentArray[currentPos]);

      let velocity = settingsMap.get(currentArray[currentPos]);

      speed = velocity;

      localStorage.setItem("speedLocal", speed);
    } else if (previousSibling.id == "screenWrapping") {
      localStorage.setItem("screenName", currentArray[currentPos]);
      let wrapping = settingsMap.get(currentArray[currentPos]);

      screen = wrapping;

      localStorage.setItem("screenLocal", screen);
    }
  }
}

start.addEventListener("click", () => {
  document.location.href = "game.html";
});
// ↑↑↑ Change Toggle ↑↑↑

// ↓↓↓ Map stuff ↓↓↓
let toggleMap = new Map([
  [sizeText, size],
  [speedText, speeds],
  [screenText, screenWrapping],
  [size, sizePos],
  [speeds, speedPos],
  [screenWrapping, screenPos],
]);

let settingsMap = new Map([
  ["Small Box", [25, 25]],
  ["Large Box", [32, 32]],
  ["Small Rect", [25, 40]],
  ["Large Rect", [32, 55]],
  ["Normal", 10],
  ["Fast", 15],
  ["Very Fast", 20],
  ["Off", false],
  ["On", true],
]);
// ↑↑↑ Map stuff ↑↑↑
