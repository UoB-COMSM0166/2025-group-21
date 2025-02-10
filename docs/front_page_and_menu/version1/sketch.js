let startScreen_move;
let gameStarted = false;
let inMenu = false;

function preload() {
  myFont = loadFont('Pixeled.ttf');
  mouse = loadImage('mouse.png');
  //bg = loadImage();
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  startScreen_move = displayHeight;
  textFont(myFont);
}


function draw() {
  background(240, 248, 255);
  
  if(inMenu) {
    drawMenu();
  } else {
    drawStartScreen();
  }
}


function drawStartScreen() {
  startScreen_move *= 0.95;
  
  push();
  textSize(72);
  fill('black');
  stroke('white');
  strokeWeight(6);
  textAlign(CENTER);
  text('Learn to Fly', width/2, height * 0.4 + startScreen_move);
  pop();
  
  push();
  textSize(32);
  fill(isMouseOverPlayButton() ? 'blue' : 'red');
  stroke('black');
  strokeWeight(2);
  textAlign(CENTER);
  text('PLAY', width / 2, height * 0.7 + startScreen_move);
  pop();
}
  

function drawMenu() {
  textSize(32);
  fill('black');
  text('START GAME', width * 2/3, height * 0.35);
  text('SHOP', width * 2/3, height * 0.55);
  text('QUIT', width * 2/3, height * 0.75);
}

function mousePressed() {
  if (!gameStarted) {
    if (isMouseOverPlayButton()) { // ✅ 复用函数
      gameStarted = true;
      inMenu = true;
    }
  } else if (inMenu) {
    if (mouseY > height * 0.30 && mouseY < height * 0.40) {
      startGame();
    } else if (mouseY > height * 0.50 && mouseY < height * 0.60) {
      intoShop();
    } else if (mouseY > height * 0.70 && mouseY < height * 0.80) {
      inMenu = false;
      gameStarted = false;
      startScreen_move = displayHeight;
    }
  }
}

function isMouseOverPlayButton() {
  let playX = width / 2;
  let playY = height * 0.7 + startScreen_move;
  let playWidth = 100;
  let playHeight = 50;

  return mouseX > playX - playWidth / 2 && mouseX < playX + playWidth / 2 &&
         mouseY > playY - playHeight / 2 && mouseY < playY + playHeight / 2;
}




