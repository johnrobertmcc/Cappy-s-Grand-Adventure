# Cappy-s-Grand-Adventure

Cappy's Grand Adventure is a side-scroller game writtten in vanilla javascript and implemented with original design

<hr></hr>

**Javascript**
This game was written soloely with vanilla Javascript, without the addition of any libraries

## Features

##### Original Design

The core of any game, original design with sprites made in PiskellApp and backgrounds made in Inkscape

![alt-text](https://github.com/johnrobertmcc/Cappy-s-Grand-Adventure/blob/master/src/styles/images/meta-tag2.gif "demo")


##### Dynamic motion
Cappy can run, jump, and even sit through keyboard Event Listeners. As demoed below, the code for these movements is kept clean and concise through toggling the 
frame of the spritesheet based on conditionals. This allows for a more varied range of movements and an easier way to continuously build:

```
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
```

##### Scrolling background
Run throught he streets of New York as a simple lad who wants nothing else but a steak dinner

![alt-text](https://github.com/johnrobertmcc/Cappy-s-Grand-Adventure/blob/master/src/styles/images/meta-tag.gif 'index')


## Planned updates
More levels, more characters, smoother animation
