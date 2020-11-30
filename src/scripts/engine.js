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

        for(i = 0; i < particleArray.length; i ++){
            particleArray[i].update();
        }
        
        moveThisLad();
        makeHimWalk();
        applyGravity();
        drawMice();
        letHimRest();
        makeHimJump();
        resetOnStand();
        toggleRun();
        moveThatMouse();
        collisionCheck();
    }
}