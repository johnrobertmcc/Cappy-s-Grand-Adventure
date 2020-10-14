
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.height = 300;
canvas.width = 500;

const keys = []

const player = {

    x: 0,
    y: 200,
    w: 32,
    h: 33,
    frameX: 3,
    frameY: 1,
    speed: 2,
    moving: false,
    jumping: false


}

const captain = new Image();
captain.src = 'src/styles/images/new-temp.png'

// let position = 0;
// function animate() {
//     ctx.clearRect(0,0 canvas.width, canvas.height)
//     ctx.drawImage(captain, 0, 0, canvas.width, canvas.height)
//     position ++;
//    
// }

function drawCaptain(img, sX, sY, sW, sH, dX, dY, dW, dH){
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
}
//source
//desination



window.addEventListener('keydown', function(e){
    keys[e.keyCode] = true;
    player.moving = true;

});

window.addEventListener('keyup', function(e){
    // keys[e.keyCode] = false;
    delete keys[e.keyCode];
    player.moving = false;
    player.jumping = true;
});

function moveThisLad(){
    if(keys[39] && player.x < 400) {
         player.frameY = 1;
        player.x += player.speed;
        player.moving = true;
    }
    if(keys[37] && player.x > 0) {
        player.frameX = 0;
        player.frameY = 3;
        player.x -= player.speed
        player.moving = true;

    }
    if(keys[38] && player.y === 200){
        player.y -= 10
        player.moving = true;
        player.jumping = true;

    }
    if(player.y !== 200){
        player.moving = false;
        player.jumping = true;
        player.frameX = 0;
        player.frameY = 8;
        player.y += 1

    }
}

function makeHimWalk(){
    if( player.frameX < 3 && player.frameY === 1 && player.moving){
        player.frameX ++;

    } else if( player.frameX < 2 && player.frameY === 3 && player.moving){
        player.frameX ++;
    } else if(player.jumping === true && player.y > 200) {
        player.frameX ++;
    }
    else {
        player.frameX = 6 && player.frameY === 1
    };
}

let fps, fpsInterval, startTime, now, then, elapsed; //global variables

function animation(fps){
    fpsInterval = 1000/fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate() {
    
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if(elapsed > fpsInterval){
        then = now - (elapsed % fpsInterval);
        ctx.clearRect(0,0, canvas.width, canvas.height);
        drawCaptain(
            captain, 
            player.w * player.frameX, 
            player.h * player.frameY, 
            player.w, 
            player.h, 
            player.x, 
            player.y, 
            player.w * 3, 
            player.h * 3,
            //   height: 50,
            //   width: 50,
            //   x: 0,
            //   xVelocity: 0,
            //   y: 0,
            //   yVelocity: 0
            
        )
        
        moveThisLad();
        makeHimWalk();
    }
}

animation(40);

// const playerWidth = 32;
// const playerHeight = 32;

// let playerFrameX = 0; //where to draw on sprite sheet
// let playerFrameY = 1;

// let playerX = 0; //where to draw on canvas
// let playerY = 250;

// const playerSpeed = 6;

//   Creates the backdrop for each frame
//   context.fillStyle = "white";
//   ctx.fillRect(0, 0, 1220, 400); // x, y, width, height
//   ctx.strokeStyle = "black";
//   ctx.lineWidth = 30;
//   ctx.beginPath();
//   ctx.moveTo(0, 385);
//   ctx.lineTo(1220, 385);
//   ctx.stroke();

//   window.requestAnimationFrame(loop);

// window.onload = setInterval(animate, 1000/10);

// window.addEventListener("keydown", keyboard.keyListener)
// window.addEventListener("keyup", keyboard.keyListener);

// window.addEventListener('resize', function() {
//    canvas.height = window.innerHeight;
//     canvas.width = window.innerWidth;
// })



// // context.drawImage (imagesrcfile, x y h w)
//   // call update when the browser is ready to draw again
//   window.requestAnimationFrame(loop);
// // draw -- used for background
// //  ctw. draw image (background, 0 0)
// // //  context.drawImage top bottom pipe -- use constant of gap for top downimages
// // request animation frameCount(draw)

// // draw()
// // for jump decrement y position on keydown
// // on key press decrement x for packground image

// //load images



