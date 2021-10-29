import Map from "./map.js";
import Character from "./character.js";
import Game from "./game.js";


document.addEventListener("DOMContentLoaded", () => {
    let map = new Map();
    let character = new Character();
    
    document.getElementById("start-btn").onclick = () => {
        let game = new Game(character, map);
        setTimeout(game.startGame(), 1000);
        document.getElementById("menu").setAttribute("style", "display: none");
        document.getElementById("coins-counter").setAttribute("style", "display: flex;");
    } 

});
