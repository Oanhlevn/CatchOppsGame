let canvas;
let context;

canvas = document.createElement("canvas");
context = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 500;

document.body.appendChild(canvas);

let startTime = Date.now();
let elapsedTime;
let roundTime = 30;

let bgImage;
let oppImage;
let catcherImage;

let bgReady;
let oppReady;
let catcherReady;

function loadImages() {
  bgImage = new Image();
  bgImage.onload = function () { bgReady = true; };
  bgImage.src = "images/catchoppsbg.jpeg";

  oppImage = new Image();
  oppImage.onload = function () { oppReady = true; };
  oppImage.src = "images/opps2.png";

  catcherImage = new Image();
  catcherImage.onload = function () { catcherReady = true; };
  catcherImage.src = "images/catcher4.png"
}
let oppX = 100;
let oppY = 100;
let catcherX = canvas.width / 2;
let catcherY = canvas.height / 2;
let keyDown = {};

function setupKeyboardListeners() {
  addEventListener("keydown", function (key) { keyDown[key.keyCode] = true; }, false);
  addEventListener("keyup", function (key) { delete keyDown[key.keyCode] }, false);
}
let update = function () {
  elapsedTime = Math.floor((Date.now() - startTime) / 1000);


  if (38 in keyDown) { // up key
    if (catcherY >= 10 && catcherY <= canvas.height)
      catcherY -= 5;
  }

  if (40 in keyDown) { // down key
    if (catcherY >= 0 && catcherY + 139 <= canvas.height)
      catcherY += 5;
  }

  if (37 in keyDown) { // left key
    if (catcherX >= 5 && catcherX <= canvas.width)
      catcherX -= 5;
  }
  if (39 in keyDown) { // right key
    if (catcherX >= 0 && catcherX + 100 <= canvas.width) {
      catcherX += 5;
    }
  }

  if (
    catcherX <= (oppX + 70)
    && oppX <= (catcherX + 100)
    && catcherY <= (oppY + 75)
    && oppY <= (catcherY + 132)
  ) {
    // Pick a new location for the monster.
    // Note: Change this to place the monster at a new, random location.
    oppX = Math.random() * (canvas.width - 80);
    oppY = Math.random() * (canvas.height - 80);
  }
};
let render = function()
{    let timeleft =roundTime-elapsedTime; 
    
    if (bgReady ) {context.drawImage(bgImage,0,0); }
    if (oppReady) {context.drawImage(oppImage,oppX,oppY); }
    if (catcherReady) { context.drawImage(catcherImage, catcherX, catcherY); }
    if (timeleft>0)
    {context.fillText(`Remaining time: ${timeleft}`,20,50);}
    else {context.fillText(`Game Over`,250,200); deleteAnimationFram (main); }
    context.fillText(`Caught stars: ${oppNum}`,20,30);
    //if ( catcherX == canvas.width || catcherY == canvas.height ) 
    //{ catcherX = canvas.width; catcherY = canvas.height; }

 };
let main = function () {
  update(); render(); requestAnimationFrame(main);
}
let w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

loadImages();
setupKeyboardListeners();
main();











