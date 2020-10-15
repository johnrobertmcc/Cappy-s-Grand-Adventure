const text = document.querySelector('.fancy');
const str = text.textContent;
let arr = str.split("");
text.textContent = '';

// console.log(str)

for(let i=0; i < arr.length; i++){
    text.innerHTML += "<span>" + arr[i] + "</span>";
}

let char = 0;

let timer = setInterval(onTick, 60);

function onTick(){
    const span = text.querySelectorAll('span')[char];
    span.classList.add('fade');
    char++

    if(char === arr.length){
        complete();
        return;
    }
}

function complete(){
    clearInterval(timer);
    timer = null;
}
