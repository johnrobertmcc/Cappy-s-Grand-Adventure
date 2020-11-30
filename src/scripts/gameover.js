const gO = new Image(); //a.1
gO.src = 'src/styles/images/gameover.jpg'

function gameOver(){
    ctx.drawImage(gO, 0, 0, canvas.width, canvas.height);
    animation(0)
}