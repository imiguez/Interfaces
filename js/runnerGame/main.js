import Map from "./map.js";
import Character from "./character.js";
import Game from "./game.js";


document.addEventListener("DOMContentLoaded", () => {
    let winCondition = 10;
    let character = new Character(90, 99, 88, 250, "../img/character3.png", "-20px -310px", "945px 693px");//w, h, t, l, img, bgPos, scale
    let map = new Map();
    let layers1 = [
        {
            "src": "../img/layers-1/sky.png",
            "animation": "none"
        }, {
            "src": "../img/layers-1/clouds_2.png",
            "animation": "background 70s linear infinite"
        }, {
            "src": "../img/layers-1/rocks.png",
            "animation": "background 120s linear infinite"
        }, {
            "src": "../img/layers-1/clouds_1.png",
            "animation": "background 50s linear infinite"
        }, {
            "src": "../img/layers-1/ground_1.png",
            "animation": "background 80s linear infinite"
        }, {
            "src": "../img/layers-1/ground_2.png",
            "animation": "background 40s linear infinite"
        }, {
            "src": "../img/layers-1/ground_3.png",
            "animation": "background 10s linear infinite"
        }, {
            "src": "../img/layers-1/plant.png",
            "animation": "background 5s linear infinite"
        }
    ];
    let layers2 = [
        {
            "src": "../img/layers-2/sky.png",
            "animation": "none"
        }, {
            "src": "../img/layers-2/clouds_1.png",
            "animation": "background 90s linear infinite"
        }, {
            "src": "../img/layers-2/rocks.png",
            "animation": "background 120s linear infinite"
        }, {
            "src": "../img/layers-2/clouds_2.png",
            "animation": "background 40s linear infinite"
        }, {
            "src": "../img/layers-2/ground.png",
            "animation": "background 10s linear infinite"
        }
    ]
    map.setLayers(layers1); //default
    let maps = document.querySelectorAll(".maps");
    let coinsToWin = document.getElementsByName("coins-to-win");
    maps[0].onclick = () => {
        console.log("mapa 1 seleccionado");
        console.log(layers1);
        map.setLayers(layers1);
    }
    maps[1].onclick = () => {
        console.log("mapa 2 seleccionado");
        console.log(layers2);
        map.setLayers(layers2);
    }
    coinsToWin[0].onclick = () => {
        winCondition = 10;
        document.getElementById("coins-collected").innerHTML = "0/10";
    }
    coinsToWin[1].onclick = () => {
        winCondition = 40;
        document.getElementById("coins-collected").innerHTML = "0/40";
    }
    coinsToWin[2].onclick = () => {
        winCondition = 80;
        document.getElementById("coins-collected").innerHTML = "0/80";
    }
    document.getElementById("start-btn").onclick = () => {
        let game = new Game(character, map);
        game.setCoinsToWin(winCondition);
        map.startLayersAnimation();
        setTimeout(game.startGame(), 1000);
        document.getElementById("menu").setAttribute("style", "display: none");
        document.getElementById("coins-counter").setAttribute("style", "display: flex;");
    } 
    document.getElementById("restart-btn").onclick = () => {
        window.location.reload();
    }
});
