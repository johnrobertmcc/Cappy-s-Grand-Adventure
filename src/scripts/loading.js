keys = [];

window.addEventListener('keydown', function(e){
    debugger
    keys[e.keyCode] = true;
});

if(keys.length !== 0){
    if ( document.getElementById("show").classList.contains('temp') ){
        document.getElementById("show").classList.remove('temp');
    }
}