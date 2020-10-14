
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let limbo = document.getElementById('sound');
canvas.height = 700;
canvas.width = 1000;

const keys = []

const player = {

    x: 11,
    y: 575,
    w: 32,
    h: 32,
    frameX: 0,
    frameY: 0,
    speed: 5,
    moving: false,
    jumping: false,
    position: 0,
}

const captain = new Image();
captain.src = 'src/styles/images/Captain-beta.png'

const background = new Image();
background.src = 'src/styles/images/city.png'


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
    delete keys[e.keyCode];
    player.moving = false;
});

function moveThisLad(){
    if(keys[39] && player.x < 550) {
        //right facing x 0-3 y 0
        player.position -= 5
        player.frameY = 0;
        player.x += player.speed;
        player.moving = true;
    }
    if(keys[39] && player.x >=550) {
        player.moving = true;
        player.position -= 5;
    }
    if(keys[37] && player.x > 0) {
        //left facing x0-3 y 1
        player.position += 5
        player.moving = true;
        player.frameY = 1;
        player.x -= player.speed

    }
    if(keys[37] && player.x <=10) {
        player.moving = true;
        player.position += 5;
    }
    if(keys[38] && player.y === 575){
        player.y -= 50
        player.jumping = true;

    }
    if(player.y !== 575){
        player.moving = false;
        player.jumping = true;
        player.frameX = 0;
        player.frameY = 8;
        player.y += 1
    }
    if(keys[40] && player.y === 575){

        player.frameY = 7;
        player.frameX = 0;
        player.moving = false;
        
    }
}

function applyGravity(){
    while(player.y > 602){
        player.y += 3;
        player.frameX = 0;
        player.frameY = 8;
    }
}

function makeHimWalk(){
    if( player.frameX < 3 && player.frameY === 0 && player.moving){
        player.frameX ++;

    } else if( player.frameX < 3 && player.frameY === 1 && player.moving){
        player.frameX ++;
    } else if(player.jumping === true && player.y > 600) {
        player.frameX ++;
    }
    else {
        player.frameX = 0 && player.frameY === 0
    };
}

let fps, fpsInterval, startTime, now, then, elapsed; //global variables


function animation(fps){
    fpsInterval = 1000/fps;
    then = Date.now();
    startTime = then;
    animate();
}

window.addEventListener("DOMContentLoaded", event => {
  const audio = document.querySelector("audio");
  audio.volume = 0.2;
  audio.play();
});


function animate() {
    
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if(elapsed > fpsInterval){
        then = now - (elapsed % fpsInterval);

        ctx.clearRect(0,0, canvas.width, canvas.height);

        ctx.drawImage(background, player.position, 0, background.width, canvas.height);

        drawCaptain(
            captain, 
            player.w * player.frameX, 
            player.h * player.frameY, 
            player.w, 
            player.h, 
            player.x, 
            player.y, 
            player.w * 3.7, 
            player.h * 3.7,            
        )
        
        moveThisLad();
        makeHimWalk();
        applyGravity();
    

    }
}
// limbo.play();

animation(20);




