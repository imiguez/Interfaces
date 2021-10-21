const left = 37
const up = 38
const right = 39
const down = 40

export default class Character {
    
    hasStarted = false;
    character = document.getElementById("character3");

    constructor() {
    }

    setHasStarted(hasStarted) {
        this.hasStarted = hasStarted;
    }

    this.character.onanimationend = () => {
        if (this.hasStarted) 
            character.style.animation = "run 1s steps(6) infinite";
    }
    this.character.onanimationcancel = () => {
        if (this.hasStarted) 
            character.style.animation = "run 1s steps(6) infinite";
    }
    window.onkeydown = (e) => {
        switch (e.keyCode) {
            case up:
                character.style.animation = "jump 0.8s steps(3) 2 alternate";
                break;
                
                default:
                    character.style.animation = "run 1s steps(6) infinite";
                    break;
        }
    }
