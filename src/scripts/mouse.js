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
