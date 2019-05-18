

   var score = 0;
   var canvas = document.getElementById("myCanvas");
   var ctx = canvas.getContext("2d");
   // showing the current condions of the block (broken or not): 
   var blockarray= [1, 1, 1, 1, 1];;
   
   // declarating variable
   var blockWidth = 100;
   var blockHeight = 25;

   var x = 245;
   var y = 275;

   var dx = -1.5;
   var dy = -1.75;

   var stickH = 15;
   var stickW = 80;
   var stickX = 215;
   var stichY = 290;

   var ballRadius = 7;
   var ballColor = "lightBlue";

   var rightPressed = false;
   var leftPressed = false;
   

   function drawObstackle() {
    //drawing the obstacle
   ctx.beginPath();
   ctx.rect(125, 185, 135, 10);
   ctx.fillStyle = "black";
   ctx.fill();
   ctx.closePath(); 
}

  function drawBall() {
   //ball
   ctx.beginPath();
   ctx.arc(x, y, ballRadius, 0, Math.PI*2);
   ctx.fillStyle = ballColor;
   ctx.fill();
   ctx.closePath();
   x += dx;
   y += dy;
}
 function drawStick() {
   //tmoving bar
   ctx.beginPath();
   ctx.rect(stickX, canvas.height - stickH, stickW, stickH);
   ctx.fillStyle = "lightBlue";
   ctx.fill();
   ctx.closePath();

}
var greenX = 320;
var greenY = 20;
function drawGreenBlock() {
    //green block
   ctx.beginPath();
   ctx.rect(greenX, greenY, blockWidth, blockHeight);
   ctx.fillStyle = "green";
   ctx.fill();
   ctx.closePath();
}

var purpleX = 115;
var purpleY = 60;

function drawPurpleBlock() {
   //purple block
   ctx.beginPath();
   ctx.rect(purpleX, purpleY, blockWidth, blockHeight);
   ctx.fillStyle = "purple";
   ctx.fill();
   ctx.closePath();
}


var yellowX = 240;
var yellowY = 60;
function drawYellowBlock() {
   //yellow block
   ctx.beginPath();
   ctx.rect(yellowX, yellowY, blockWidth, blockHeight);
   ctx.fillStyle = "yellow";
   ctx.fill();
   ctx.closePath();
}



var redX = 50;
var redY = 20;

function drawRedBlock() {
    //red block
   ctx.beginPath();
   ctx.rect(redX, redY, blockWidth, blockHeight);
   ctx.fillStyle = "red";
   ctx.fill();
   ctx.closePath();
}

var blueX = 180;
var blueY = 20;
function drawBlueBlock() {
    //blue block
   ctx.beginPath();
   ctx.rect(blueX, blueY, blockWidth, blockHeight);
   ctx.fillStyle = "blue";
   ctx.fill();
   ctx.closePath();
}



function drawBlocks() {
  if(blockarray[0]==1) {drawRedBlock();}
  if(blockarray[1]==1) {drawBlueBlock();}
  if(blockarray[2]==1) {drawGreenBlock();}
  if(blockarray[3]==1) {drawPurpleBlock();}
  if(blockarray[4]==1) {drawYellowBlock();}
}



function draw() {

    //when all blocks are broken 
    if(blockarray[0]==0 && blockarray[1]==0 && blockarray[2]==0 && blockarray[3]==0 && blockarray[4]==0 ){
          alert("CONGRATULATIONS YOU WIN!");
          document.location.reload();
          clearInterval(interval);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawStick();
    drawObstackle();
    drawBlocks();


   //collide with right, left walls 
   if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    //collide with top wall
    if(y + dy < ballRadius) {
        dy = -dy;
    } // collide with bottom wall (lose)
    else if(y + dy > canvas.height-ballRadius) {
        //collide with paddle
        if(x > stickX-ballRadius && x < stickX + ballRadius + stickW) { 
            dy = -dy;
        }
        else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval); // Needed for Chrome to end game
        }
    }
    //collide with the stick 
    // if(RectCircleColliding(x,y,ballRadius,stickW,stickH,stickX,stichY)){
    //  dy = -dy; 
   // }

    //collide with the obstacle
    if((x+ballRadius==125 || x-ballRadius==260) && y>175 && y<205){
      dx = -dx;
      dy = -dy;
    }
    if(RectCircleColliding(x,y,ballRadius,135,10,125,185)){
      dy = -dy;
    }

    //collide with the red break
    if(RectCircleColliding(x,y,ballRadius,blockWidth, blockHeight,redX, redY)){
      dy = -dy;
      blockarray[0] = 0;
      redY = -1000;
      redX = -1000;
      ballColor = "red";
      score += 20;
      var scoreStr = "Score: "+ score;
      document.getElementById("scored").innerHTML = scoreStr;
    }


    //collide with the blue break
    if(RectCircleColliding(x,y,ballRadius,blockWidth, blockHeight,blueX, blueY)){
      dy = -dy;
      blockarray[1] = 0;
      blueY = -1000;
      blueX = -1000;
      ballColor = "blue";
      score += 40;
      var scoreStr = "Score: "+ score;
      document.getElementById("scored").innerHTML = scoreStr;
    }

     //collide with the green break
    if(RectCircleColliding(x,y,ballRadius,blockWidth, blockHeight,greenX, greenY)){
      dy = -dy;
      blockarray[2] = 0;
      greenY = -1000;
      greenX = -1000;
      ballColor = "green";
      score += 80;
      var scoreStr = "Score: "+ score;
      document.getElementById("scored").innerHTML = scoreStr;
    }

    //collide with the purple break
    if(RectCircleColliding(x,y,ballRadius,blockWidth, blockHeight,purpleX, purpleY)){
      dy = -dy;
      blockarray[3] = 0;
      purpleY = -1000;
      purpleX = -1000;
      ballColor = "purple";
      score += 60;
      var scoreStr = "Score: "+ score;
      document.getElementById("scored").innerHTML = scoreStr;
    }

    //collide with the yellow break
    if(RectCircleColliding(x,y,ballRadius,blockWidth, blockHeight,yellowX, yellowY)){
      dy = -dy;
      blockarray[4] = 0;
      yellowY = -1000;
      yellowX = -1000;
      ballColor = "yellow";
      score += 50;
      var scoreStr = "Score: "+ score;
      document.getElementById("scored").innerHTML = scoreStr;
    }

    //handling moving the stick using left and right arrow buttons
    if(rightPressed && stickX < canvas.width - stickW) {
    stickX += 5;
    }
    else if(leftPressed && stickX > 0) {
    stickX -= 5;
}
    
    
}
function RectCircleColliding(cx, cy, cr, rw, rh, rx, ry){
     //  center-to-center vector
    var half = { x: rw/2, y: rh/2 };
    var center = {
        x: cx - (rx+half.x),
        y: cy - (ry+half.y)};

    // circle position checking
    var side = {
        x: Math.abs (center.x) - half.x,
        y: Math.abs (center.y) - half.y};
    if (side.x >  cr || side.y >  cr) // outside
        return false; 
    if (side.x < -cr && side.y < -cr) // inside
        return true;
    if (side.x < 0 || side.y < 0) // intersects side or corner
        return true;

    // circle  near corner
    return side.x*side.x + side.y*side.y  < cr*cr;
}


function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var interval = setInterval(draw, 10);

 