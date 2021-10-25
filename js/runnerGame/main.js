import Map from "./map.js";
import Character from "./character.js";
import Game from "./game.js";


document.addEventListener("DOMContentLoaded", () => {
    let layers = document.querySelectorAll(".layer");
    layers.forEach(layer => {
        if (layer == layers[3])
            layer.style.animation = "background 50s linear infinite";    
        else 
            layer.style.animation = "none";
    });

    let map = new Map();
    let character = new Character();
    
    document.getElementById("start-btn").onclick = () => {
        let game = new Game(character, map);
        game.startGame();
        document.getElementById("menu").setAttribute("style", "display: none");
    } 

});
