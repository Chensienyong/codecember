function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

var canvasWidth = 600,
    canvasHeight = 600,
    length = 8,
    strokeWidth = 2,
    margin = 10,
    columns = getAmountFromWidth(canvasWidth, length),
    rows = getAmountFromWidth(canvasHeight, strokeWidth);

function getAmountFromWidth(width, length) {
  remainingWidth = width - margin;

  amount = 0;
  while(remainingWidth > length + margin) {
    amount++;
    remainingWidth -= length + margin;
  }
  return amount;
}

function draw() {
  background(255);
  stroke("#2e43eb");
  strokeWeight(strokeWidth);
  frameRate(60);
  for(let i=0; i<rows; i++) {
    for(let j=0; j<columns; j++) {
      let offset = {
        x: margin + (j * (margin + length)),
        y: margin + (i * (margin + strokeWidth))
      };
      let delta = {
        x: offset.x - mouseX,
        y: offset.y - mouseY
      };

      if (Math.abs(delta.x) < 800 && Math.abs(delta.y) < 800) {
        var amt = (Math.abs(delta.x) + Math.abs(delta.y)) / 2;
        var amtMapped = map(amt, 0, 100, -20, 255);
        stroke(100, amtMapped)
      }

      push();
      translate(offset.x, offset.y);
      rotate(Math.atan2(delta.y, delta.x));
      line(0, 0, length, 0);
      pop();
    }
  }
}
