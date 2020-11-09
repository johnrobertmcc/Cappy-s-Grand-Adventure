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
    y: 570,
    w: 140.5,
    h: 135,
    frameX: 0,
    frameY: 0,
    speed: 5,
    moving: false,
    jumping: false,
    position: -20,
    running: false,
    faceLeft: false
}

const captain = new Image();
captain.src = 'src/styles/images/captainv6.png';

function drawCaptain(img, sX, sY, sW, sH, dX, dY, dW, dH){
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
}

window.addEventListener('keydown', function(e){
    keys[e.keyCode] = true;
    player.moving = true;
    if(keys[13]){
        mode = 1;
        enterGame();
    }

});

window.addEventListener('keyup', function(e){
    delete keys[e.keyCode];
    player.moving = false;
    player.running = false;
});




function moveThisLad(){
    //move right
    
    if(keys[39] && player.x < 550) {
        player.position -= 5
        player.frameY = 0;
        player.x += player.speed;
        player.moving = true;
        player.faceLeft = false;
    }

    if(keys[39] && player.x >=550) {
        player.moving = true;
        player.position -= 5;
        player.faceLeft = false;
    }
    if(player.y === 575 && keys[16] && keys[39]){
        // player.position = player.position * 1.02;
        // player.speed = 10;
        player.frameY = 2;
        player.h = 130;
        player.running = true;
        player.faceLeft = false;
    }


    //move left
    if(keys[37] && player.x > 0) {
        //left facing x0-3 y 1
        player.position += 5
        player.moving = true;
        player.frameY = 1;
         player.h = 125;
        player.x -= player.speed;
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
        player.y -= 40
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
        player.y += 5;
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


//FOR PARTICLE CANVAS
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
    console.log(`t   init('white')he mode is ${mode} and the color is ${color}`)
    for(let i = 0; i < 100; i++){
        let size = Math.floor(Math.random() * 6 + 1)
        let x = Math.random() * (innerWidth - size * 2);
        let y = Math.random() * (innerHeight - size * 2);
        let dX = (Math.random() * .4) - .5;
        let dY = (Math.random() * .4) - .5;
        particleArray.push(new Particle(x, y, dX, dY, size, color))
    }
}


let mice;

function makeMice(){

    mice = [];
    console.log(`there are ${mice.length} mice here`)
    for(let i = 0; i < first.width; i ++){
        mice.push(new Mouse())
    }

}

const mouse = new Image();
mouse.src = 'src/styles/images/mouse_sprite.png'

function drawMouse(img, sX, sY, sW, sH, dX, dY, dW, dH){
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
}

const mouseStuff = {

    x: 500,
    y: 580,
    w: 48,
    h: 48,
    frameX: 0,
    frameY: 1,
}

function moveThatMouse(){
    if(mouseStuff.frameX < 3){
        mouseStuff.frameX ++
    }else{
        mouseStuff.frameX = 0
    }
    if(mouseStuff.x !== 0){
        mouseStuff.x--
    }
    
}



let bgn_idx = 0;
let bgn = backgrounds[bgn_idx];

//FOR LEVELS
// function changeBackground(){
//     let temp = (bgn.width * -1)
//     let next_state = (temp + 1000)
//     if(player.position <= next_state){
//         bgn_idx++
//         bgn = backgrounds[bgn_idx]
//         player.position = -10;
//     }
// }

let fps, fpsInterval, startTime, now, then, elapsed; //global variables


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

        ctx.drawImage(first, (player.position % first.width - 500), 0, first.width, canvas.height);

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

        drawMouse(
            mouse, 
            mouseStuff.w * mouseStuff.frameX, 
            mouseStuff.h * mouseStuff.frameY, 
            mouseStuff.w, 
            mouseStuff.h, 
            mouseStuff.x, 
            mouseStuff.y, 
            mouseStuff.w*2, 
            mouseStuff.h*2)

        //for particles -- 

        for(i = 0; i < particleArray.length; i ++){
            particleArray[i].update();
        }
        
        moveThisLad();
        makeHimWalk();
        applyGravity();
        // changeBackground();
        letHimRest();
        makeHimJump();
        resetOnStand();
        toggleRun();
        moveThatMouse();
    }
}


//FOR START SCREEN
let mode = 0;

function enterGame(){
    
    if(mode==0) {
        init('white');
    }
    
    if(mode==1){ 
        animation(20); 
        init('rgba(255, 255, 255, 0.2)');
        const audio = document.querySelector("audio");
        audio.volume = 0.2;
        audio.play();
    }
}

enterGame();



