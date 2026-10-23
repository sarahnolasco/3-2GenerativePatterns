
let gridSize = 100;
let cols, rows;

let colors = [
  "#FFB7E8", // Cotton candy pink
  "#C8A2FF", // Lilac
  "#FFD6A5", // Peach
  "#FDFFB6", // Butter yellow
  "#CAFFBF", // Mint
  "#A0C4FF", // Baby blue
  "#FFC6FF", // Pastel pink
  "#BDB2FF"  // Periwinkle
];

let hoverColor = "#70faff"; // Bright teal

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
  // Dark plum background with fading trails
  background(45, 30, 48, 40);
  noStroke();

  // Nested loops create the star grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {

      // Grid position
      let x = i * gridSize + gridSize / 2;
      let y = j * gridSize + gridSize / 2;

      // Distance between mouse and star
      let d = dist(mouseX, mouseY, x, y);

      // Stars grow near the mouse
      let growth = map(d, 0, 180, 1.8, 1);
      growth = constrain(growth, 1, 1.8);

      // Different star shapes and sizes
      let points = 4 + (i + j) % 5;
      let baseSize = 25 + ((i * 13 + j * 17) % 20);

      // Gentle pulsing animation
      let pulse = sin(frameCount * 0.04 + i + j) * 3;

      // Each star has its own pastel color
      let colorIndex = (i * 3 + j * 2) % colors.length;

      // Hovered stars turn teal
      if (d < baseSize * growth * 0.65) {
        fill(hoverColor);
      } else {
        fill(colors[colorIndex]);
      }

      push();
      translate(x, y);

      // Rotate each star
      rotate(frameCount * 0.01 + (i + j) * 0.3);

      // Gently shear each star horizontally
      shearX(sin(frameCount * 0.03 + i + j) * 0.3);

      // Scale stars for the mouse wave effect
      let finalSize = (baseSize + pulse) * growth;
      scale(finalSize / 45);

      // Draw the star
      star(0, 0, 22.5, 45, points);

      pop();
    }
  }
}