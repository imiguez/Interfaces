const up = 38;

export default class Character {
    
    hasStarted = false;
    character = document.getElementById("character3");

    constructor() {

    }

    setHasStarted(hasStarted) {
        this.hasStarted = hasStarted;
        this.character.style.animation = "run 1s steps(6) infinite";
        window.onkeydown = (e) => {
            if (e.keyCode == up) {
                this.jump();
            }
        }
    }

    jump() {
        this.character.style.animation = "jump 0.9s steps(3) 1";
        this.character.onanimationcancel = () => {
            if (this.hasStarted) 
                character.style.animation = "jump 0.9s steps(3) 1";
            }
        setTimeout(() => {
            window.onkeydown = (e) => {
                if (e.keyCode == up) 
                    this.jump();
            }
            this.character.style.animation = "run 1s steps(6) infinite";
        }, 1100);
    }

}