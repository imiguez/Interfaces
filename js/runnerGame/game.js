import Object from "./object.js";

const left = 37
const up = 38
const right = 39
const down = 40

export default class Game {

    character;
    map;
    coins;
    coinsCounter;
    lifes;
    lifesCounter;
    finished;

    constructor(character, map) {
        this.character = character;
        this.map = map;
        this.coinsCounter = document.getElementById("coins-collected");
        this.lifesCounter = document.getElementById("lifes-collected");
    }


    startGame() {
        this.finished = false;
        let jump;
        this.coins = 0;
        this.lifes = 1;
        this.map.startLayersAnimation();
        this.character.setHasStarted(true);
        this.generateCoins();
        this.generateLifes();
        this.generateBat();
        window.onkeydown = (e) => {
            if (e.keyCode == up && !jump) {
                jump = true;
                this.character.jump();
                setTimeout(() => {jump = false}, 600);
            }
        }
    }
    
    generateLifes() {
        let random = (Math.floor(Math.random() * 6000) + 20000);
        let createLifes = setInterval(() => {
            if (!this.finished || this.lifes > 0) {
                let life = new Object("../../img/hearts.png", 30, 30, 40, 0, true, "90px 30px", true, "heart", this);
                life.playAnimation("having-lifes 0.8s linear infinite", "interactable-object 2s linear forwards");
            } else
                clearInterval(createLifes);
            setTimeout(() => {
                random = (Math.floor(Math.random() * 6000) + 20000);
            }, random);
        }, random);
    }

    generateCoins() {
        let random = (Math.floor(Math.random() * 6000) + 8000);
        let createCoins = setInterval(() => {
            if (!this.finished || this.lifes > 0) {
                let coin = new Object("../../img/coin.png", 50, 50, 40, 0, true, "500px 50px", true, "coin", this);
                coin.playAnimation("coin 0.5s steps(9) infinite", "interactable-object 4s linear forwards");
            } else
                clearInterval(createCoins);
            setTimeout(() => {
                random = (Math.floor(Math.random() * 6000) + 8000);
            }, random);
        }, random);
    }

    generateBat() {
        let random = (Math.floor(Math.random() * 6000) + 3000);
        let createBats = setInterval(() => {
            if (!this.finished || this.lifes > 0) {
                let bat = new Object("../../img/bat.png", 48, 48, 40, 0, true, "192px 192px", false, "bat", this);
                bat.playAnimation("bat 0.5s steps(3) infinite", "interactable-object 4s linear forwards");
            } else
                clearInterval(createBats);
            setTimeout(() => {
                random = (Math.floor(Math.random() * 6000) + 3000);
            }, random);
        }, random);
    }

    createObstacle(canFloat) { // Las propiedades del objeto deberian venir por parametro con una clase obstacle
        let top = (490 - 60) + "px";
        if (canFloat) 
            top = (40 * (Math.floor(Math.random() * 4) + 7)) + "px"; //numero random entre 7 y 10
        let obstacle = document.createElement("div");
        obstacle.style.width = "60px";
        obstacle.style.height = "60px";
        obstacle.style.backgroundColor = "red";
        obstacle.style.position = "absolute";
        obstacle.style.right = "0";
        obstacle.style.top = top;
        document.body.insertBefore(obstacle, document.getElementById("character"));
        setInterval(() => {
            if (this.isCollidingWithTheCharacter(obstacle)) {
                obstacle.style.animationPlayState = "paused";
                this.map.stop();
                this.character.removeLife();
                this.finished = true;
            }
            if (this.finished) 
                obstacle.style.animationPlayState = "paused";
        }, 10);
        obstacle.style.animation = "interactable-object 3s linear forwards";
    }

    isCollidingWithTheCharacter(object) {
        let charLeft = this.character.getOffsetLeft();
        let charWidth = this.character.getOffsetWidth();
        if ((object.offsetLeft >= charLeft && object.offsetLeft <= charLeft + charWidth)
          || object.offsetLeft+object.offsetWidth >= charLeft && object.offsetLeft+object.offsetWidth <= charLeft + charWidth) {
            let charTop = this.character.getOffsetTop();
            let charHeight = this.character.getOffsetHeight();
            if (object.offsetTop <= charTop+charHeight && object.offsetTop >= charTop) {
                return true;
            }
        }
        return false;
    }

    addObjectCollectable(type) {
        switch (type) {
            case "coin":
                this.coins++;
                this.coinsCounter.innerHTML = this.coins;
                break;
            case "heart":
                if (this.lifes < 3) {
                    this.lifes++;
                    console.log(this.lifes);
                    console.log(this.lifesCounter);
                    this.lifesCounter.innerHTML = this.lifes;
                }
                break;
            default:
                break;
        }
    }

    removeLife() {
        this.lifes--;
        if (this.lifes < 1) {
            this.finished = true;
        }
        this.lifesCounter.innerHTM = this.lifes;
    }

    getFinished() {
        return this.finished;
    }
}