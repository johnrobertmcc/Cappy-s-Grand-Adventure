//index.js
let fps, fpsInterval, startTime, now, then, elapsed; //global variables
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
// let limbo = document.getElementById('sound').loop; //ily Limbo
const audio = document.querySelector("audio");
// let death = document.getElementById('death');
canvas.height = 700;
canvas.width = 1000;
let gameBegun = false;
let difficulty = getRandomInt(50,70);

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
    // document.getElementById("one").className ='temp';
}

// difficulty.js

function addDifficulty(key){
    switch (key) {
        case 'easy':
            difficulty = 10;
        case 'med':
            difficulty = 50;
        case 'hard':
            difficulty = 100;
        default:
            difficulty = 50;
    }
}

//controller.js
const keys = []

window.addEventListener('keydown', function(e){
    e.preventDefault();
    keys[e.keyCode] = true;
    // player.moving = true;
    if(keys[13]){
        if(!gameBegun){
            mode = 1;
            enterGame();
            toggleText();
            gameBegun = true;
        }else if(gameBegun && mode == 2 || mode == 3 || mode ==4){
           resetGame();
        }
    }

});

window.addEventListener('keyup', function(e){
    e.preventDefault();
    delete keys[e.keyCode];
    player.moving = player.jumping ? true: false;
    player.running = false;

});

function moveThisLad(){
    //move right
    
    if(keys[39] && !keys[37]) {
        player.frameY = player.jumping ? 4 : 0;
        player.position -= player.speed;
        player.moving = true;
        player.faceLeft = false;
        player.h = player.jumping && player.faceLeft ? 138 : 125;
    }

    if(player.y === 575 && keys[16] && keys[39]){
        player.position -= player.speed * 1.5;
        player.frameY = 2;
        player.h = 130;
        player.running = true;
        player.faceLeft = false;
    }


    //move left
    if(keys[37] && !keys[39]) {
        player.moving = true;
        player.frameY = player.jumping ? 9 : 1;;
        player.h = player.jumping && player.faceLeft ? 138 : 125;
        player.position += player.speed;
        player.faceLeft = true;

    }
    if(player.y === 575 && keys[16] && keys[37]){
        player.frameY = 3;
        player.h = 125;
        player.position += player.speed * 1.5;
        player.running = true;
        player.faceLeft = true;
    }

    //jumping
    if(keys[38] && !player.faceLeft && !player.jumping){
        player.frameX = 0;
        player.frameY = 4;
        player.yVel -= 60
        player.h = 130
        player.jumping = true;
        player.moving = true;
    }
    if(keys[38] && !player.jumping && player.faceLeft){
        player.h = 138
        player.frameX = 0;
        player.frameY = 9;
        player.yVel -= 60
        player.jumping = true;
        player.moving = true;
    }
    if(player.y !== 575){
        player.jumping = true;
        player.moving = true;
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
let inFrame = true;

function stayInFrame(){
        if(player.position <= 0){
            inFrame = false;
            player.position += 1;
            
        }else if(player.position > 0){         
            inFrame = true;
        }else if(player.position >= 2000){
            inFrame = false;
            player.position -= 1;
            // ctx.drawImage(first, -2000, 0, first.width, canvas.height);
        }

  
}

// function ohLordHeRunninNJumpin(){
//     if(player.running && player.jumping && !player.faceLeft){
//         player.frameX = 0;
//         player.frameY = 4;
//         player.yVel += 5;
//         player.xVel += 5;
//         player.y += player.yVel;
//         player.yVel *= 0.9;
//         // player.position += player.xVal;
//         // player.xVal *= 0.9
//     }

//     // if(player.running && player.jumping && player.y === 520 && player.faceLeft){
//     //     player.frameX = 0;
//     //     player.frameY = 9;
//     //     player.h = 138;
//     //     player.y -= 68;
//     // }

//     // while(player.y > 575){
//     //     if(player.faceLeft){
//     //      player.position += player.speed*2;
//     //     }else{
//     //         player.position -= player.speed*2;
//     //     }
//     // }
    

// }

function toggleRun(){
    if(player.moving === true){
        player.running = false;
    }else if(player.running === true){
        player.moving = false
    }
}

function applyGravity(){
    if(player.jumping|| player.y < 520){
      player.yVel += 5;
      player.y += player.yVel;
      player.yVel *= 0.9;
    }
    if(player.y > 575){
      player.y = 575;
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
    w: 141,
    h: 135,
    frameX: 0,
    frameY: 0,
    speed: 5,
    xVel: 0,
    yVel: 0,
    moving: false,
    jumping: false,
    position: 0,
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
const mouseImg = new Image();
mouseImg.src = 'src/styles/images/mouse_sprite.png'

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function drawMouse(img, sX, sY, sW, sH, dX, dY, dW, dH){
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
}

let mice = [];

function generateMouse(name){
     return (name = {
        img: mouseImg, 
        x: getRandomInt(900, 5000),
        y: 580,
        w: 48,
        h: 48,
        frameX: 0,
        frameY: 1,
        position: 0,
        speed: getRandomInt(5, 12),
        dead: false
    })

}

function generateMice(num){
    for(let i = 0; i < num; i++){
        mice.push(generateMouse(i))
    }
}

function drawMice(){

    for(let i = 0; i < mice.length; i++){

        if(!mice[i].dead){
            drawMouse(
                mice[i].img, 
                mice[i].w * mice[i].frameX, 
                mice[i].h * mice[i].frameY, 
                mice[i].w, 
                mice[i].h, 
                mice[i].x, 
                mice[i].y, 
                mice[i].w * 2, 
                mice[i].h * 2,            
            )
        }
    }
}

function moveThatMouse(){
    
    for(let i = 0; i < mice.length; i++){
        if(mice[i].frameX < 3){
            mice[i].frameX ++
        }else{
            mice[i].frameX = 0;
        }

        let mouseSpeed;

        if((player.moving || player.jumping) && !player.faceLeft && inFrame){
            mouseSpeed = (mice[i].speed + player.speed)
        }else if((player.moving || player.jumping) && player.faceLeft){
            mouseSpeed = (mice[i].speed - player.speed)
        }else{
            mouseSpeed = mice[i].speed
        }
            mice[i].x -= mouseSpeed;
        }
}

//score.js
let score = 0;
let escaped;

function drawScore() {
    ctx.font = "20px Monospace";
    ctx.fillStyle = "#F8F8FF";
    ctx.textAlign = 'left'
    ctx.fillText("Rats Killed: "+score, 8, 20);
}

function scoreCheck(){
    let temp = [];
    let outOfBounds = [];

    for(let i = 0; i < mice.length; i++){
        if(mice[i].dead && !temp.includes(mice[i])){
            temp.push(mice[i])
        }
        if(mice[i].x < 0 && !mice[i].dead){
            outOfBounds.push(mice[i]);
        }
    }

    score = temp.length;

    if(score == mice.length){
        mode = 3;
        enterGame();
    }

    escaped = difficulty - temp.length;

    if(escaped == outOfBounds.length && escaped > 0){
        mode = 4;
        enterGame();
    }
}

//collision.js

function collision(cappy, mouse) {
  
    if (mouse.x > 290 && mouse.x < 350  && cappy.y > 500 && cappy.y <= 574) {
        return 'kill'
    }else if(mouse.x > 290 && mouse.x < 310  && cappy.y == 575 && !mouse.dead){
        return 'dead';
    }
};

function collisionCheck(){


    for(let i = 0; i < mice.length; i++){

        if(collision(player, mice[i]) == 'kill'){
            death.volume = 0.1;
            death.play();
            mice[i].dead = true;
        }else if(collision(player, mice[i]) == 'dead'){
            mode = 2;
            rip.volume = 0.2;
            audio.pause();
            rip.play();
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

function animate() {
    
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if(elapsed > fpsInterval){
        then = now - (elapsed % fpsInterval);

        ctx.clearRect(0,0, canvas.width, canvas.height);

        // stayInFrame();
        ctx.drawImage(first, 0, 0, first.width, canvas.height);
        ctx.drawImage(first, 200, 0, first.width, canvas.height);
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
        makeHimWalk();
        makeHimJump();
        applyGravity();
        // ohLordHeRunninNJumpin();
        scoreCheck();
        drawMice();
        letHimRest();
        makeHimJump();
        resetOnStand();
        toggleRun();
        moveThatMouse();
        drawScore();
        collisionCheck();

    }
}


//gameover.js
const backdrop = new Image(); //a.1
backdrop.src = 'src/styles/images/backdrop.png'

function gameOver(result){
    ctx.drawImage(backdrop, 0, 0, canvas.width, canvas.height);
    animation(18);    

    let x = canvas.width/2;
    let y = canvas.height/2;
    switch (result) {
        case 'lose':
            ctx.font = "20px Monospace";
            ctx.fillStyle = "#F8F8FF";
            ctx.textAlign = 'center'
            ctx.fillText("The rats got you.", x, y);
            ctx.font = "15px Monospace";
            ctx.fillStyle = "#F8F8FF";
            ctx.textAlign = 'center'
            ctx.fillText("press 'Enter' to restart", x, y+50);
            ctx.font = "10px Monospace";
            ctx.fillStyle = "#F8F8FF";
            ctx.textAlign = 'center'
            ctx.fillText("do better.", x, y+75);
            animation(0);
            break;   

        case 'won':
            ctx.font = "20px Monospace";
            ctx.fillStyle = "#F8F8FF";
            ctx.textAlign = 'center'
            ctx.fillText("Great job, you've killed all the rats!", x, y);
            ctx.font = "15px Monospace";
            ctx.fillStyle = "#F8F8FF";
            ctx.textAlign = 'center'
            ctx.fillText("press 'Enter' to restart", x, y+50);
            animation(0);
            break;
    
        case 'gone':
            ctx.font = "20px Monospace";
            ctx.fillStyle = "#F8F8FF";
            ctx.textAlign = 'center'
            ctx.fillText("You've survived, but " +escaped + " rats got away!" , x, y);
            ctx.font = "15px Monospace";
            ctx.fillStyle = "#F8F8FF";
            ctx.textAlign = 'center'
            ctx.fillText("press 'Enter' to restart", x, y+50);

            animation(0);
            break;

        default:
            break;
    }
}


//FOR START SCREEN
let mode = 0;

function enterGame(){
    
    if(mode==0) {
        // init('white');
        init('rgba(255, 255, 255, 0.1)');
    }else if(mode==1){ 
        generateMice(difficulty);
        animation(18); 
        audio.volume = 0.2;
        audio.play();
        player.moving = false;
    }else if(mode == 2){
        gameOver('lose');
    }else if(mode == 3 ){
        gameOver('won')
    }else if(mode == 4){
        gameOver('gone')
    }
}

function resetGame(){
    gameBegun = false;
    mice = [];
    score = 0;
    audio.currentTime = 0;
    mode = 0;
    player.position = 0;
    enterGame();
}
// addDifficulty()
enterGame();