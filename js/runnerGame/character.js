const up = 38;

export default class Character {
    
    hasStarted = false;
    character = document.getElementById("character3");

    constructor() {
    }

    setHasStarted(hasStarted) {
        this.hasStarted = hasStarted;
        if (hasStarted) 
            this.character.style.animation = "run 1s steps(6) infinite";
    }

    die() {
        if (this.hasStarted) {
            this.character.style.top = this.character.offsetTop+"px";
            this.character.style.animation = "die 1s steps(3) 1 forwards";
            this.setHasStarted(false);
        }
    }

    jump() {
        if (this.hasStarted && this.character.style.animationName != "jump") 
            this.character.style.animation = "jump 0.3s cubic-bezier(0, 0, 0.08, 1.08) 2 alternate";
        setTimeout(() => {
            if (this.hasStarted) 
                this.character.style.animation = "run 1s steps(6) infinite";
        }, 600);
    }

    getOffsetTop() {
        return this.character.offsetTop;
    }

    getOffsetHeight() {
        return this.character.offsetHeight;
    }
}