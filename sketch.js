
let gridSize = 100;
let cols, rows;

function setup() {
  createCanvas(800, 800);
  cols = int(width / gridSize);
  rows = int(height / gridSize);
}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2;

  beginShape();

  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);

    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }

  endShape(CLOSE);
}

function draw() {
  background(0,0,0, 20);
  noStroke();

  // Nested for loops create the grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {

      let x = i * gridSize + gridSize / 2;
      let y = j * gridSize + gridSize / 2;

      // Measure distance from the mouse
      let d = dist(mouseX, mouseY, x, y);

      // Map mouse distance to star size
      let growth = map(d, 0, 220, 1.8, 1);
      growth = constrain(growth, 1, 1.8);

      // Modulo creates different star shapes
      let points = 4 + (i + j) % 5;

      // Modulo creates different starting sizes
      let baseSize = 25 + ((i * 13 + j * 17) % 20);

      // Sin creates a pulsing animation
      let pulse = sin(frameCount * 0.04 + i + j) * 3;

      // Conditional changes star colors
      if ((i + j) % 3 == 0) {
        fill("#F3DFA2");
      } else {
        fill("#E8C66A");
      }

      push();
      translate(x, y);

      // Rotate stars at different angles
      rotate(frameCount * 0.01 + (i + j) * 0.3);

      // Scale stars based on mouse distance
      let finalSize = (baseSize + pulse) * growth;
      scale(finalSize / 45);

      // Draw each star
      star(0, 0, 22.5, 45, points);

      pop();
    }
  }
}