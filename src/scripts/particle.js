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
