let brushImage;

let images = [];

function preload() {
  
  brushImage = loadImage('flower.png'); 

  // load decorations for horizonal display
  images.push(loadImage('cat1.png'));
  images.push(loadImage('cat2.png'));
  images.push(loadImage('cat3.png'));
  images.push(loadImage('cat4.png'));
  images.push(loadImage('cat5.png'));
  images.push(loadImage('cat6.png'));
}


function setup() {
  createCanvas(960, 540);
  background(180, 200, 300); 
  noStroke(); 
  
  
  fill(0); 
  textSize(18); 
  textFont('Georgia');
  textAlign(CENTER, CENTER);
  text('Group 21 Avengers Assemble!', 460, height / 2); 
  
  drawImages(); // Draw images in the center horizontally
}

function draw() {
  if (mouseIsPressed) {
    
    let steps = 200;
    let dx = (mouseX - pmouseX) / steps; 
    let dy = (mouseY - pmouseY) / steps; 

    for (let i = 0; i <= steps; i++) {
      let x = pmouseX + dx * i;
      let y = pmouseY + dy * i;

      // draw images
      push();
      translate(x, y);
      let scaleFactor = random(0.05, 0.3);
      imageMode(CENTER);
      image(brushImage, 0, 0, 100 * scaleFactor, 100 * scaleFactor); 
      pop();

    
      strokeWeight(1);
      stroke(random(255), random(255), random(255)); 
      line(pmouseX, pmouseY, mouseX, mouseY); 
    }
  }
}

function drawImages() {
  let totalImages = images.length;
  let imageWidth = 60;
  let imageHeight = 75;
  let totalWidth = totalImages * imageWidth + (totalImages - 1) * 10; 
  let startX = (width - totalWidth) / 2; 
  let startY = (height - imageHeight) / 2 + 40; 

  for (let i = 0; i < totalImages; i++) {
    image(images[i], startX + i * (imageWidth + 3), startY, imageWidth, imageHeight); // Draw images
  }
}
