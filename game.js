let canvas; 
let context; 

canvas=document.createElement("canvas"); 
context = canvas.getContext("2d"); 
canvas.width = 600; 
canvas.height = 500; 

document.body.appendChild(canvas); 

let startTime = Date.now(); 
let elapsedTime; 
let roundTime= 30; 

let bgImage; 
let oppImage; 
let catcherImage; 

let bgReady; 
let oppReady; 
let catcherReady; 

function loadImages()
{ bgImage = new Image(); 
  bgImage.onload = function(){ bgReady=true; };
  bgImage.src= "images/catchoppsbg.jpeg";
  oppImage = new Image(); 
  oppImage.onload = function(){ oppReady=true; };
  bgImage.src= "images/opps2.png"; 
  catcherImage= new Image();
  catcherImage.onload =function(){catcherReady=true;};
  catcherImage.src="images/catcher4.png"
}
let oppX=100;
let oppY=100;
let catcherX= canvas.width/2;
let catcherY= canvas.height/2; 
let keyDown={}; 

function setupKeyboardListeners()
{ addEventListener("keydown", function(key){ keyDown[key.keyCode]=true;  }, false);
 addEventListener("keyup", function(key){ delete keyDown[key.keyCode]},false );
}
let update = function ()
{elapsedTime= Math.floor((Date.now() - startTime)/1000);  

if (38 in keyDown){ catcherY -= 5; }
if (40 in keyDown){ catcherY += 5; }
if (37 in keyDown){ catcherX -= 5; }
if (39 in keyDown){ catcherX += 5; }

if (
    catcherX <= (oppX + 32)
    && oppX <= (catcherX + 32)
    && catcherY <= (oppY + 32)
    && oppY <= (catcherY + 32)
  ) {
    // Pick a new location for the monster.
    // Note: Change this to place the monster at a new, random location.
    oppX = oppX + 50;
    oppY = oppY + 70;
  }
};
let render = function()
{
    if (bgReady ) {context.drawImage(bgImage,0,0); }
    if (oppReady) {context.drawImage(oppImage,oppX,oppY); }
    if (catcherReady) { context.drawImage(catcherImage, catcherX, catcherY); }
    context.fillText (`Remaining time: ${roundTime-elapsedTime}`,20,100)
 }
let main = function()
{ update();  render(); requestAnimationFrame(main); 
}
let w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

loadImages();
setupKeyboardListeners(); 
main(); 









    

