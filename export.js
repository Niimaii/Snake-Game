// let rows = 25;
// let cols = 25;
// let speed = 10;
// let wrappingScreen = false;

export let rows = 25;
export let cols = 25;
export let speed = 10;
export let wrappingScreen = false;

export let rowsMod = function (change) {
  rows = change;
};

export let colsMod = function (change) {
  cols = change;
};

export let speedMod = function (change) {
  speed = change;
};

export let screenMod = function (change) {
  wrappingScreen = change;
};
