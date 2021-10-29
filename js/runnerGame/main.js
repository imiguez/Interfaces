import Map from "./map.js";
import Character from "./character.js";
import Game from "./game.js";


document.addEventListener("DOMContentLoaded", () => {
    let character = new Character(60, 65, 490, 250, "../../img/character3.png", "-10px -292px", 1.5);//w, h, t, l, img, bgPos, scale
    let map = new Map();
    
    let maps = document.querySelectorAll(".maps");
    maps[0].onclick = () => {
        console.log("mapa 1 seleccionado");
    }
    maps[1].onclick = () => {
        console.log("mapa 2 seleccionado");
    }
    document.getElementById("start-btn").onclick = () => {



        let game = new Game(character, map);
        setTimeout(game.startGame(), 1000);
        document.getElementById("menu").setAttribute("style", "display: none");
        document.getElementById("coins-counter").setAttribute("style", "display: flex;");
    } 

});
