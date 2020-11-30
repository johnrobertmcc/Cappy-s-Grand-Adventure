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
