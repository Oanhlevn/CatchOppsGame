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
let oppNum=0; 

function loadImages()
{ bgImage = new Image(); 
  bgImage.onload = function(){ bgReady=true; };
  bgImage.src= "images/catchoppsbg.jpeg";
  oppImage = new Image(); 
  oppImage.onload = function(){ oppReady=true; };
  oppImage.src= "images/opps2.png"; 
  catcherImage= new Image();
  catcherImage.onload =function(){catcherReady=true;};
  catcherImage.src="images/catcher4.png"; 
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

if (38 in keyDown){if (catcherY > 0 && catcherY < canvas.height) {catcherY -= 5;}
else {catcherY +=2; }}

if (40 in keyDown){if (catcherY > 0 && catcherY < canvas.height ) {catcherY += 5;} 
else {catcherY -=2; }} 

if (37 in keyDown){if (catcherX >= 0 && catcherY <= canvas.width  ) {catcherX -= 5;}}
if (39 in keyDown){if (catcherX >= 0 && catcherX <= canvas.width  ) {catcherX += 5;}}

if (
    catcherX <= (oppX + 50)
    && oppX <= (catcherX + 50)
    && catcherY <= (oppY + 50)
    && oppY <= (catcherY + 50)
  )
  { 
    oppNum++; 
    oppImage.src= "images/opp5.png"; 
    // Pick a new location for the monster.
    // Note: Change this to place the monster at a new, random location.
    oppX = Math.floor(Math.random()*550);
    oppY = Math.floor(Math.random()*450);
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
 
let main = function()
{ update();  render(); requestAnimationFrame(main); 
}; 
let w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

loadImages();
setupKeyboardListeners(); 
main(); 









    

