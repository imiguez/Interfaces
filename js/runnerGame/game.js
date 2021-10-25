import Map from "./map.js";
import Character from "./character.js";

const left = 37
const up = 38
const right = 39
const down = 40

export default class Game {

    character;
    map;
    coins;

    constructor(character, map) {
        this.character = character;
        this.map = map;
    }


    startGame() {
        this.coins = 0;
        this.map.startLayersAnimation();
        this.character.setHasStarted(true);
    }


}