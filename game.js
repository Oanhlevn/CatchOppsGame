let canvas; 
let context; 

canvas=document.createElement("canvas"); 
context = canvas.getContext("2d"); 
canvas.width = 600; 
canvas.height = 500; 
context.font = "20px Georgia"; 
context.font.fontcolor = "white"; 

document.body.appendChild(canvas); 

let startTime = Date.now(); 
let elapsedTime; 
let roundTime= 30; 

let bgImage; 
let oppImage; 
let oppImageStock = new Array() ; 
let catcherImage; 
let bgMusic ; 
let treeImage; 

let bgReady; 
let oppReady; 
let catcherReady; 
let treeReady; 
let oppNum=0; 


function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

function loadImages()
{ bgImage = new Image(); 
  bgImage.onload = function(){ bgReady=true; };
  bgImage.src= "images/catchoppsbg.jpeg";
  oppImage = new Image(); 
  oppImage.onload = function(){ oppReady=true; }; 
  catcherImage= new Image();
  catcherImage.onload =function(){catcherReady=true;};
  catcherImage.src="images/catcher4.png"; 
  treeImage = new Image(); 
  treeImage.onload = function() { treeReady=true; }
  treeImage.src = "images/tree1.png"; 
  oppImageStock.push("images/opped1.png"); 
  oppImageStock.push("images/opped2.png");
  oppImageStock.push("images/opped3.png");
  oppImage.src = oppImageStock[0]; 
  bgMusic = new sound("Musics/Mysjour.mp3");
  bgMusic.play(); 
  
}


let oppX=51;
let oppY=51;
let catcherX= 200;
let catcherY= 400; 
let keyDown={}; 
let directionX = 1; 
let directionY = 1; 
let oppSpeed = 5; 
let treeX = 246; 
let treeY =261; 

function setupKeyboardListeners()
{ addEventListener("keydown", function(key){ keyDown[key.keyCode]=true;  }, false);
 addEventListener("keyup", function(key){ delete keyDown[key.keyCode]},false );
}
let update = function ()
{elapsedTime= Math.floor((Date.now() - startTime)/1000);  

if (38 in keyDown){if (catcherY > 0 ) {catcherY -= 5;} }
if (40 in keyDown){if (catcherY <= (canvas.height - 150) ) {catcherY += 5;} }
if (37 in keyDown){if (catcherX > 0) {catcherX -= 5;}}
if (39 in keyDown){if ( catcherX <= (canvas.width - 100)  ) {catcherX += 5;}}



if (
    catcherX <= (oppX + 50)
    && oppX <= (catcherX + 50)
    && catcherY <= (oppY + 50)
    && oppY <= (catcherY + 50)
  )
  { 
    oppNum++; 
    oppImage.src= oppImageStock[Math.floor(Math.random()*oppImageStock.length)]; 

    // Pick a new location for the monster.
    // Note: Change this to place the monster at a new, random location.
   // oppX = Math.floor(Math.random()* (canvas.width-80) );
   // oppY = Math.floor(Math.random()* (canvas.height-50) );
  }
};


let render = function()
{    let timeleft =roundTime-elapsedTime; 
    
    if (bgReady ) {context.drawImage(bgImage,0,0); }
    if (oppReady) {context.drawImage(oppImage,oppX,oppY); }
    if (catcherReady) { context.drawImage(catcherImage, catcherX, catcherY); }
    if (treeReady) {context.drawImage(treeImage,treeX,treeY);}
    if (timeleft>0)
    {context.fillText(`Remaining time: ${timeleft}`,20,50);}
    else {context.fillText(`Game Over`,250,200); deleteAnimationFrame(main); }
    context.fillText(`Caught stars: ${oppNum}`,20,30);
    //if ( catcherX == canvas.width || catcherY == canvas.height ) 
    //{ catcherX = canvas.width; catcherY = canvas.height; }

 };
     function oppMove() 
    { if (oppX >= canvas.width - 100 || oppX <=50)
       {directionX = - directionX;}
     if (oppY >= canvas.height -100 || oppY <=50)
     { directionY = - directionY ;}
     oppX += oppSpeed * directionX; 
     oppY += oppSpeed * directionY; 
    }
    function obstacle()
    {
    if (
      treeX <= (catcherX + 70)
      && catcherX <= (treeX + 88)
      && catcherY <= (treeY + 139)
      && treeY <= (catcherY + 90)
    )
    { directionX = -directionX; directionY= -directionY; 
      catcherX += directionX*5 ; catcherY -= directionY*5 ;  }      
    }
  console.log(oppX,oppY);
     
    
    //  if (oppY >0 && oppY < (canvas.height -10) ) 
    //  {  oppY +=5; }
    //  else 
    //  {if (oppY <= 0)
    //   oppX += 5;
    //   else 
    //  {oppY -=5; } 
    //  }  
    
 
let main = function()
{ update(); obstacle(); oppMove();  render(); requestAnimationFrame(main); 
}; 
let w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

loadImages();
setupKeyboardListeners(); 
main(); 









    

