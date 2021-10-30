const up = 38;

export default class Character {
    
    hasStarted = false;
    characterContainer;
    character;
    isGettingDamage = false;
    width;
    height;
    top;
    left;
    sprite;
    backgroundPos;
    backgroundSize;

    constructor(w, h, t, l, img, bgPos, bgSize) {
        this.characterContainer = document.createElement("div");
        this.character = document.createElement("div");
        this.width = w;
        this.height = h;
        this.top = t;
        this.left = l;
        this.sprite = img;
        this.backgroundPos = bgPos;
        this.backgroundSize = bgSize;
        this.createCharacter();
    }

    createCharacter() {
        this.character.style.width = this.width+"px";
        this.character.style.height = this.height+"px";
        this.character.style.backgroundImage = "url('"+this.sprite+"')";
        this.character.style.backgroundPosition = this.backgroundPos;
        this.character.style.backgroundSize = this.backgroundSize;
        this.characterContainer.style.width = this.width+"px";
        this.characterContainer.style.height = this.height+"px";
        this.characterContainer.style.position = "absolute";
        this.characterContainer.style.top = this.top+"vh";
        this.characterContainer.style.left = this.left+"px";
        this.characterContainer.setAttribute("id", "character-container");
        this.character.setAttribute("id", "character");
        this.characterContainer.appendChild(this.character);
        document.body.insertBefore(this.characterContainer, document.getElementById("coins-counter"));
    }

    setHasStarted(hasStarted) {
        this.hasStarted = hasStarted;
        if (hasStarted) {
            this.characterContainer.style.animation = "none";
            this.character.style.animation = "run 1s steps(6) infinite";
        }
    }

    die() {
        if (this.hasStarted) {
            this.setHasStarted(false);
            this.characterContainer.style.top = this.characterContainer.offsetTop+"px";
            this.character.style.animation = "character-die 0.8s steps(3) 1 forwards";
            this.characterContainer.style.animation = "character-container-die 0.8s linear 1 forwards";
        }
    }

    jump() {
        if (this.hasStarted && this.character.style.animationName != "jump") {
            this.characterContainer.style.animation = "character-container-jump 0.5s cubic-bezier(0, 0, 0.08, 1.08) 2 alternate"
            this.character.style.animation = "character-jump 0.5s steps(3) 2 alternate";
        }
        setTimeout(() => {
            if (this.hasStarted) {
                this.character.style.animation = "run 1s steps(6) infinite";
                this.characterContainer.style.animation = "none";
            }
        }, 1050);
    }

    getHurts() {
        if (this.hasStarted) {
            this.character.style.animation = "character-die 0.5s steps(3) 1";
            setTimeout(() => {
                this.character.style.animation = "run 1s steps(6) infinite";    
            }, 500);
        }
    }

    getIsGettingDamage() {
        return this.isGettingDamage;
    }

    setIsGettingDamage(isGettingDamage) {
        this.isGettingDamage = isGettingDamage;
    }
}