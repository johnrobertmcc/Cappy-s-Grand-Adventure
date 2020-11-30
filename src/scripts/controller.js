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

