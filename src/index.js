const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let limbo = document.getElementById('sound'); //ily Limbo

canvas.height = 700;
canvas.width = 1000;

const first = new Image();
first.src = 'src/styles/images/city.png'

const second = new Image();
second.src = 'src/styles/images/two.jpg'

const backgrounds = [
    first,
    second
]

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
    position: -20,
    running: false
}

const captain = new Image();
captain.src = 'src/styles/images/captainV2.png'

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
    player.running = false;
});

function moveThisLad(){

    //move right
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
    if(player.y === 575 && keys[16] && keys[39]){
        player.position = player.position * 1.25;
        player.frameY = 2;
        // debugger
        player.running = true;
    }


    //move left
    if(keys[37] && player.x > 0) {
        //left facing x0-3 y 1
        player.position += 5
        player.moving = true;
        player.frameY = 1;
        player.x -= player.speed

    }
    if(keys[37] && player.x >= -10) {
        player.moving = true;
        // player.position += 5;
    }
    if(player.y === 575 && keys[16] && keys[37]){
        player.position = player.position * 1.25;
        // debugger
        player.frameY = 3;
        player.running = true;
    }

    //jumping
    if(keys[38] && player.y === 575){
        player.frameX = 0;
        player.frameY = 4;
        player.y -= 50
        player.jumping = true;

    }
    if(player.y !== 575){
        player.moving = false;
        player.jumping = true;
        player.y += 5
    }

    ////for sitting
    // if(keys[40] && player.y === 575){

    //     player.frameY = 7;
    //     player.frameX = 0;
    //     player.moving = false;   
    // }

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
        player.y += 5;
        player.frameX = 0;
        player.frameY = 0;
    }
    // if(player.y === 601){
    //     player.frameX = 0;
    //     player.frameY = 0;
    // }
}

function resetOnStand(){
    if(!player.moving || !player.jumping || !player.running){
        player.frameX = 0;
        player.frameY = 0;
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


let bgn_idx = 0;
let bgn = backgrounds[bgn_idx];

function changeBackground(){
    let temp = (bgn.width * -1)
    let next_state = (temp + 1000)
    if(player.position <= next_state){
        bgn_idx++
        bgn = backgrounds[bgn_idx]
        player.position = -10;
    }
    // else if(player.position > 0){
    //     debugger
    //     bgn_idx = bgn_idx - 1;
    //     bgn = backgrounds[bgn_idx];
    //     player.position = bgn.width - 1000;
    // }
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

        ctx.drawImage(first, (player.position % first.width - 500), 0, first.width, canvas.height);

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
        // changeBackground();
        // makeHimRun();
        makeHimJump();
        // resetOnStand();
        toggleRun();
    

    }
}
// limbo.play();

animation(20);




