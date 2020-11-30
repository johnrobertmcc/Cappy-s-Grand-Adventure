const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


canvas.height = 700;
canvas.width = 1000;


const player = {

    x: 10,
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

const first = new Image();
first.src = 'src/styles/images/city.png'

ctx.clearRect(0,0, canvas.width, canvas.height);

ctx.drawImage(first, player.position, 0, first.width, canvas.height);
