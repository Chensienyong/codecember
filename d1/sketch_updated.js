var colors = {
  a1: "#ff2d5d",
  a2: "#42dc8e",
  a3: "#2e43eb",
  a4: "#ffe359",
  b1: "#96bfed",
  b2: "#f5ead6",
  b3: "#f1f3f7",
  b4: "#e2e6ef"
};

var canvasWidth = 600,
  canvasHeight = canvasWidth,
  length = 8,
  margin = 10,
  strokeWidth = 2,
  columns = getNoOfCols(canvasWidth, length, margin),
  rows = getNoOfRows(canvasHeight, strokeWidth, margin),
  rotation = 90,
  rotateDirection = 5;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

function getNoOfCols(w, length, m) {
  var totalLength = 0,
    noOfCols = 0;

  m = m || 0;

  while (totalLength < w) {
    totalLength += m + length;
    noOfCols++;
  }

  return noOfCols;
}

function getNoOfRows(h, sw, m) {
  return getNoOfCols(h, sw, m);
}

function draw() {
  background(255);
  frameRate(60);
  for (var i = 0; i < rows - 1; i++) {
    for (var j = 0; j < columns - 1; j++) {
      var currentOffset = {
        x: ((j * length)) + ((j + 1) * margin),
        y: ((i + 1) * margin) + (i * strokeWidth) + strokeWidth
      };

      var centerPoint = {
        x: (currentOffset.x + (currentOffset.x + length)) / 2,
        y: (currentOffset.y + (currentOffset.y + length)) / 2
      };

      var delta = {
        x: (currentOffset.x + (length / 2) - (margin / 2)) - canvasWidth / 2,
        y: currentOffset.y - canvasHeight / 2
      };

      var theta = Math.atan2(delta.y, delta.x);

      strokeWeight(strokeWidth);
      stroke(colors['a3']);

      if (Math.abs(delta.x) < 800 && Math.abs(delta.y) < 800) {
        var amt = (Math.abs(delta.x) + Math.abs(delta.y)) / 2;
        var amtMapped = map(amt, 0, 100, -20, 255);
        stroke(100, amtMapped)
      }

      push();
      translate(currentOffset.x, currentOffset.y);

      angleMode(DEGREES);
      rotate(((theta + Math.PI) * 360 / 2 / Math.PI) + rotation);

      line(0, 0, 0 + length, 0);
      pop();

      fill(250, 150, 0);
      noStroke();
    }
  }
  if(rotation >= 360 || rotation < 0) rotateDirection *= -1;
  rotation = rotation + rotateDirection;
}
