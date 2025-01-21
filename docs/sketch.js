// set default draw colour
let col = 255;
let bSize = 10;
let sSize = 14;

function setup() {
  createCanvas(650, 400);
  background(255);
  
  fill(255);
  rect(0, 0, 650, 400);
  
  fill(0);
  text('Press ? for info', 20, 21);

}

function draw() {
  
  fill(255);
  stroke(0);
  strokeWeight(2);
  rect(580, 7, 60, 20);
  strokeWeight(0);
  fill(0);
  text(`Size: ${sSize}`, 590, 21)

  // draw only when key key is held
  if (mouseIsPressed) {
    stroke(col);
    strokeWeight(bSize);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
  //circle(mouseX, mouseY, bSize);
  
  
  
}

function keyPressed() {
  if (key === 'r') {
    col = color('#FF0000');
  }
  else if (key === 'b'){
    col = color('#0000FF');
  }
  else if (key === 'g') {
    col = color('#00FF00');
  }
  else if (key === 'y') {
    col = color('#FFFF00');
  }
  else if (key === 'k') {
    col = color('#000000');
  }
  else if (key === 'x') {
    col = color('#FFFFFF');
  }
  
  
  if (key === 'ArrowUp') {
    if (bSize < 500) {
      bSize *= 1.2;
      sSize += 1;
    }
  }
  else if (key === 'ArrowDown') {
    if (bSize > 1) {
      bSize /= 1.2;
      sSize -= 1;
    }
  }
  
  if (key === '/') {
    infoDisplay();
  }
  
  if (key === 'c') {
    strokeWeight(1);
    stroke('black')
    fill(255);
    rect(0, 0, 650, 400);
  }
  
}

function infoDisplay() {
  
  fill(255);
  stroke(0);
  strokeWeight(2);
  rect(10, 7, 210, 20);
  rect(10, 30, 90, 130);
  
  strokeWeight(0);
  fill(0);
  text('Use Up/Down to change brush size', 20, 21);
  
  // fill(255);
  // rect(20, 20, 200, 200);
  
  fill(0)
  text('Press \'R\'', 40, 49);
  fill('red')
  circle(25, 45, 15);
  
  fill(0)
  text('Press \'B\'', 40, 69);
  fill('blue')
  circle(25, 65, 15);
  
  fill(0)
  text('Press \'G\'', 40, 89);
  fill('#00FF00')
  circle(25, 85, 15);
  
  fill(0)
  text('Press \'Y\'', 40, 109);
  fill('yellow')
  circle(25, 105, 15);
  
  fill(0)
  text('Press \'K\'', 40, 129);
  fill('black')
  circle(25, 125, 15);
  
  fill(0)
  text('Press \'X\'', 40, 149);
  strokeWeight(2);
  fill('white')
  circle(25, 145, 14);
  strokeWeight(0);
}
