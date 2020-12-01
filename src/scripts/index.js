//index.js

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let limbo = document.getElementById('sound'); //ily Limbo
canvas.height = 700;
canvas.width = 1000;

let fps, fpsInterval, startTime, now, then, elapsed; //global variables


//backgrounds.js
const first = new Image();
first.src = 'src/styles/images/city.png'
const second = new Image();
second.src = 'src/styles/images/two.jpg'
const backgrounds = [
    first,
    second
]

function toggleText() {
    document.getElementById("begin").className ='none';
    document.getElementById("one").className ='temp';
}

//controller.js
const keys = []

window.addEventListener('keydown', function(e){
    keys[e.keyCode] = true;
    player.moving = true;
    if(keys[13]){
        mode = 1;
        enterGame();
        toggleText();
    }

});

window.addEventListener('keyup', function(e){
    delete keys[e.keyCode];
    player.moving = false;
    player.running = false;
});

function moveThisLad(){
    //move right
    
    if(keys[39] && player.x < 300) {
        player.x += 5
        player.frameY = 0;
        player.position -= player.speed;
        player.moving = true;
        player.faceLeft = false;
    }

    if(keys[39] && player.x >=300) {
        player.moving = true;
        player.position -= 5;
        player.faceLeft = false;
    }
    if(player.y === 575 && keys[16] && keys[39]){
        // player.position = player.position * 1.02;
        player.speed = 10;
        player.frameY = 2;
        player.h = 130;
        player.running = true;
        player.faceLeft = false;
    }


    //move left
    if(keys[37] && player.x > 0) {
        //left facing x0-3 y 1
        // player.position += 5
        player.moving = true;
        player.frameY = 1;
        player.h = 125;
        player.position += player.speed;
        player.faceLeft = true;

    }
    if(keys[37] && player.x >= -10) {
        player.moving = true;
         player.faceLeft = true;
        // player.position += 5;
    }
    if(player.y === 575 && keys[16] && keys[37]){
        // player.position = player.position * -1.02;
        player.frameY = 3;
        player.h = 125;
        player.running = true;
        player.faceLeft = true;
    }

    //jumping
    if(keys[38] && player.y === 575 && !player.faceLeft){
        player.frameX = 0;
        player.frameY = 4;
        player.h = 130
        player.y -= 50
        // player.position += 10
        player.jumping = true;
    }
    if(keys[38] && player.y === 575 && player.faceLeft){
        player.frameX = 0;
        player.frameY = 9;
         player.h = 138
        player.y -= 50
        player.jumping = true;
    }
    if(player.y !== 575){
        player.moving = false;
        player.jumping = true;
        player.y += 5
    }

    //for sitting
    if(keys[40] && player.y === 575){
        player.frameY = 12;
        player.frameX = 0;
        player.moving = false;   
        player.h = 134;
    }
     if(keys[40] && player.y === 575 && player.faceLeft){
        player.frameY = 13;
        player.frameX = 0;
        player.moving = false;   
        player.h = 134;
    }

}

function toggleRun(){
    if(player.moving === true){
        player.running = false;
    }else if(player.running === true){
        player.moving = false
    }
}

function applyGravity(){
    while(player.y > 602){
        player.y += 10;
        player.frameX = 0;
        player.frameY = 0;
    }
    if(player.y === 575){
        player.jumping = false
    }
}

function resetOnStand(){
    if(!player.moving && !player.jumping && !player.running && player.y === 575 && !player.faceLeft && player.frameY !== 12){
        player.frameX = 0;
        player.frameY = 0;
    } else if(!player.moving && !player.jumping && !player.running && player.faceLeft && player.frameY !== 13){
        player.frameX = 0;
        player.frameY = 1
    }
}

function makeHimWalk(){
    if( player.frameX < 3 && player.frameY === 0 && player.moving){
        player.frameX ++;
    } else if( player.frameX < 3 && player.frameY === 1 && player.moving){
        player.frameX ++;
    } else if(player.frameX < 3 && player.frameY === 2 ){
        player.frameX ++;
    }else if(player.frameX < 3 && player.frameY === 3 ){
        player.frameX ++;
    } 
    else {
        player.frameX = 0 && player.frameY === 0;
    };
}

function makeHimJump() {
    if(player.frameX < 3 && player.frameY === 4){
        player.frameX ++
    }else if(player.jumping === true && player.y > 600) {
        player.frameX ++;
    }else if(player.moving === false && player.y <= 601){
        player.jumping === false
    }
}

function letHimRest() {
    if(player.frameX < 3 && player.frameY === 12){
        player.frameX ++
    }
}




//player.js

const player = {

    x: 300,
    y: 570,
    w: 140.5,
    h: 135,
    frameX: 0,
    frameY: 0,
    speed: 5,
    moving: false,
    jumping: false,
    position: -10,
    running: false,
    faceLeft: false
}

const captain = new Image();
captain.src = 'src/styles/images/captainv6.png';

function drawCaptain(img, sX, sY, sW, sH, dX, dY, dW, dH){
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
}







//particle.js
function Particle(x, y, dX, dY, size, color){
    this.x = x;
    this.y = y;
    this.dX = dX;
    this.dY = dY;
    this.size = size;
    this.color = color;
}

let particleArray;

Particle.prototype.draw = function(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2, false);
    ctx.fillStyle = this.color
    ctx.alpha = 0.4
    ctx.fill();
}

Particle.prototype.update = function() {
    if(this.x + this.size > canvas.width || this.x - this.size < 0){
        this.dX = -this.dX;
    }
    if(this.y + this.size > canvas.height || this.y - this.size < 0){
        this.dY = -this.dY;
    }
    
    this.x += this.dX;
    this.y += this.dY;
    this.draw();
}

function init(color){
    particleArray = [];
    
    for(let i = 0; i < 100; i++){
        let size = Math.floor(Math.random() * 6 + 1)
        let x = Math.random() * (innerWidth - size * 2);
        let y = getRandomInt(300);
        let dX = (Math.random() * .4) - .5;
        let dY = (Math.random() * .4) - .5;
        particleArray.push(new Particle(x, y, dX, dY, size, color))
    }
}


//mice.js

const mouseImg = new Image(); //a.1
mouseImg.src = 'src/styles/images/mouse_sprite.png'

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//c
function drawMouse(img, sX, sY, sW, sH, dX, dY, dW, dH){
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
}

//b
function Mouse(img, x, y, w, h, fX, fY, position, speed){
    this.img = img;
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
    this.fX = fX;
    this.fY = fY;
    this.speed = speed;
    this.position = position;
}


const mice = {
    mouse1 : {
        img: mouseImg, 
        x: 500,
        y: 580,
        w: 48,
        h: 48,
        frameX: 0,
        frameY: 1,
        position: 0,
        speed: 3
    },
    mouse2 : {
        img: mouseImg, 
        x: 1100,
        y: 580,
        w: 48,
        h: 48,
        frameX: 0,
        frameY: 1,
        position: 0,
        speed: 6
    },
    mouse3 : {
        img: mouseImg, 
        x: 3000,
        y: 580,
        w: 48,
        h: 48,
        frameX: 0,
        frameY: 1,
        position: 0,
        speed: 8
    },
    mouse4 : {
        img: mouseImg, 
        x: 2000,
        y: 580,
        w: 48,
        h: 48,
        frameX: 0,
        frameY: 1,
        position: 0,
        speed: 6
    },
    mouse5 : {
        img: mouseImg, 
        x: 1500,
        y: 580,
        w: 48,
        h: 48,
        frameX: 0,
        frameY: 1,
        position: 0,
        speed: 9
    },
    mouse6 : {
        img: mouseImg, 
        x: 2500,
        y: 580,
        w: 48,
        h: 48,
        frameX: 0,
        frameY: 1,
        position: 0,
        speed: 10
    },
    mouse7 : {
        img: mouseImg, 
        x: 6000,
        y: 580,
        w: 48,
        h: 48,
        frameX: 0,
        frameY: 1,
        position: 0,
        speed: 6
    },
    mouse8 : {
        img: mouseImg, 
        x: 7100,
        y: 580,
        w: 48,
        h: 48,
        frameX: 0,
        frameY: 1,
        position: 0,
        speed: 9
    },
    mouse9 : {
        img: mouseImg, 
        x: 40000,
        y: 580,
        w: 48,
        h: 48,
        frameX: 0,
        frameY: 1,
        position: 0,
        speed: 10
    },
    mouse10 : {
        img: mouseImg, 
        x: 2800,
        y: 580,
        w: 48,
        h: 48,
        frameX: 0,
        frameY: 1,
        position: 0,
        speed: 6
    },
    mouse11 : {
        img: mouseImg, 
        x: 1570,
        y: 580,
        w: 48,
        h: 48,
        frameX: 0,
        frameY: 1,
        position: 0,
        speed: 8
    },
    mouse12 : {
        img: mouseImg, 
        x: 1500,
        y: 580,
        w: 48,
        h: 48,
        frameX: 0,
        frameY: 1,
        position: 0,
        speed: 5
    },
    mouse13 : {
        img: mouseImg, 
        x: 2000,
        y: 580,
        w: 48,
        h: 48,
        frameX: 0,
        frameY: 1,
        position: 0,
        speed: 5
    },
    mouse14 : {
        img: mouseImg, 
        x: 1900,
        y: 580,
        w: 48,
        h: 48,
        frameX: 0,
        frameY: 1,
        position: 0,
        speed: 6
    },
    mouse15 : {
        img: mouseImg, 
        x: 2500,
        y: 580,
        w: 48,
        h: 48,
        frameX: 0,
        frameY: 1,
        position: 0,
        speed: 6
    },

}

function drawMice(){

    // debugger
    let arr = Object.values(mice)

    for(let i = 0; i < arr.length; i++){

        drawMouse(
            arr[i].img, 
            arr[i].w * arr[i].frameX, 
            arr[i].h * arr[i].frameY, 
            arr[i].w, 
            arr[i].h, 
            arr[i].x, 
            arr[i].y, 
            arr[i].w * 2, 
            arr[i].h * 2,            
        )
    }
}

function moveThatMouse(){
    let arr = Object.values(mice);
    
    for(let i = 0; i < arr.length; i++){
        if(arr[i].frameX < 3){
            arr[i].frameX ++
            // arr[i].position --;
        }else{
            arr[i].frameX = 0;
        }
        if(arr[i].x > -200){
            arr[i].x -= arr[i].speed;
            arr[i].position --;
        }
    }
}


//obstacles.js

function drawObstacle(color, shape){
        ctx.beginPath();
        ctx.rect(575,575,150,100);
        ctx.fillStyle = 'white';
        ctx.stroke();
}


//collision.js
function collisionCheck(){

    let arr = Object.values(mice)

    for(let i = 0; i < arr.length; i++){
        if(player.x === arr[i].x - 48){
        mode = 2;
        enterGame();
        }
    }
}

//engine.js
function animation(fps){
    
    fpsInterval = 1000/fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate() { //MAIN GAME
    
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if(elapsed > fpsInterval){
        then = now - (elapsed % fpsInterval);

        ctx.clearRect(0,0, canvas.width, canvas.height);

        ctx.drawImage(first, player.position, 0, first.width, canvas.height);

        drawCaptain(
            captain, 
            player.w * player.frameX, 
            player.h * player.frameY, 
            player.w, 
            player.h, 
            player.x, 
            player.y, 
            player.w * .9, 
            player.h * .9,            
            )

        for(let i = 0; i < particleArray.length; i ++){
            particleArray[i].update();
        }

      
        
        moveThisLad();
        drawObstacle('white');
        makeHimWalk();
        applyGravity();
        // drawMice();
        letHimRest();
        makeHimJump();
        resetOnStand();
        toggleRun();
        // moveThatMouse();
        // collisionCheck();
    }
}


//gameover.js
const gO = new Image(); //a.1
gO.src = 'src/styles/images/gameover.jpg'

function gameOver(){
    ctx.drawImage(gO, 0, 0, canvas.width, canvas.height);
    animation(0)
}


//FOR START SCREEN
let mode = 0;

function enterGame(){
    
    if(mode==0) {
        // init('white');
        init('rgba(255, 255, 255, 0.1)');
    }else if(mode==1){ 
        animation(18); 
        init('rgba(255, 255, 255, 0.1)');
        const audio = document.querySelector("audio");
        audio.volume = 0.2;
        // audio.play();
    }else if(mode == 2){
        gameOver();
        
    }
}

enterGame();




// const context = document.querySelector("canvas").getContext("2d");

// context.canvas.height = 400;
// context.canvas.width = 1220;

// // Start the frame count at 1
// let frameCount = 1;
// // Set the number of obstacles to match the current "level"
// let obCount = frameCount;
// // Create a collection to hold the generated x coordinates
// const obXCoors = [];

// const square = {

//   height: 32,
//   jumping: true,
//   width: 32,
//   x: 0,
//   xVelocity: 0,
//   y: 0,
//   yVelocity: 0

// };
// // Create the obstacles for each frame
// const nextFrame = () => {
//   // increase the frame / "level" count
//   frameCount++;
  
//   for (let i = 0; i < obCount; i++) {
//     // Randomly generate the x coordinate for the top corner start of the triangles
//     let obXCoor = Math.floor(Math.random() * (1165 - 140 + 1) + 140);
//     obXCoors.push(obXCoor);
//   }

// }

// const controller = {

//   left: false,
//   right: false,
//   up: false,
//   keyListener: function (event) {

//     var key_state = (event.type == "keydown") ? true : false;

//     switch (event.keyCode) {

//       case 37:// left key
//         controller.left = key_state;
//         break;
//       case 38:// up key
//         controller.up = key_state;
//         break;
//       case 39:// right key
//         controller.right = key_state;
//         break;

//     }

//   }

// };

// const loop = function () {

//   if (controller.up && square.jumping == false) {

//     square.yVelocity -= 20;
//     square.jumping = true;

//   }

//   if (controller.left) {

//     square.xVelocity -= 0.5;

//   }

//   if (controller.right) {

//     square.xVelocity += 0.5;

//   }

//   square.yVelocity += 1.5;// gravity
//   square.x += square.xVelocity;
//   square.y += square.yVelocity;
//   square.xVelocity *= 0.9;// friction
//   square.yVelocity *= 0.9;// friction

//   // if square is falling below floor line
//   if (square.y > 386 - 16 - 32) {

//     square.jumping = false;
//     square.y = 386 - 16 - 32;
//     square.yVelocity = 0;

//   }

//   // if square is going off the left of the screen
//   if (square.x < -20) {

//     square.x = 1220;

//   } else if (square.x > 1220) {// if square goes past right boundary

//     square.x = -20;
//     nextFrame();

//   }
//   // Creates the backdrop for each frame
//   context.fillStyle = "#201A23";
//   context.fillRect(0, 0, 1220, 400); // x, y, width, height


//   // Creates and fills the cube for each frame
//   context.fillStyle = "#8DAA9D"; // hex for cube color
//   context.beginPath();
//   context.rect(square.x, square.y, square.width, square.height);
//   context.fill();


//   // Create the obstacles for each frame
//   // Set the standard obstacle height
//   const height = 200 * Math.cos(Math.PI / 6);

//   context.fillStyle = "#FBF5F3"; // hex for triangle color
//   obXCoors.forEach((obXCoor) => {
//     context.beginPath();

//     context.moveTo(obXCoor, 385); // x = random, y = coor. on "ground"
//     context.lineTo(obXCoor + 20, 385); // x = ^random + 20, y = coor. on "ground"
//     context.lineTo(obXCoor + 10, 510 - height); // x = ^random + 10, y = peak of triangle
  
//     context.closePath();
//     context.fill();
//   })


//   // Creates the "ground" for each frame
//   context.strokeStyle = "#2E2532";
//   context.lineWidth = 30;
//   context.beginPath();
//   context.moveTo(0, 385);
//   context.lineTo(1220, 385);
//   context.stroke();

//   // call update when the browser is ready to draw again
//   window.requestAnimationFrame(loop);

// };

// window.addEventListener("keydown", controller.keyListener)
// window.addEventListener("keyup", controller.keyListener);
// window.requestAnimationFrame(loop);
