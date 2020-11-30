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
    document.getElementById("one").className ='temp';
}