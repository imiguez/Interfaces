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
        this.generateWolf()
        // this.generateGoblins();
        window.onkeydown = (e) => {
            if (e.keyCode == up && !jump) {
                jump = true;
                this.character.jump();
                setTimeout(() => {jump = false}, 600);
            }
        }
    }
    
    generateLifes() {
        let random = (Math.floor(Math.random() * 6000) + 10000);
        let createLifes = setInterval(() => {
            if (!this.finished || this.lifes > 0) {
                let life = new Object("../../img/hearts.png", 30, 30, 40, 0, true, "90px 30px", true, "heart", this);
                life.playAnimation("having-lifes 0.8s linear infinite", "interactable-object 2s linear forwards");
            } else
                clearInterval(createLifes);
            setTimeout(() => {
                random = (Math.floor(Math.random() * 6000) + 10000);
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
            } else {
                clearInterval(createBats);

            }
            setTimeout(() => {
                random = (Math.floor(Math.random() * 6000) + 3000);
            }, random);
        }, random);
    }

    generateWolf() {
        let random = (Math.floor(Math.random() * 6000) + 3000);
        let createWolfs = setInterval(() => {
            if (!this.finished || this.lifes > 0) {
                let wolf = new Object("../../img/wolf.png", 64, 32, 540, 0, false, "640px 384px", false, "wolf", this);
                wolf.playAnimation("wolf 0.5s steps(4) infinite", "interactable-object 3s linear forwards");
            } else {
                clearInterval(createWolfs);

            }
            setTimeout(() => {
                random = (Math.floor(Math.random() * 6000) + 3000);
            }, random);
        }, random);
    }

    generateGoblins() {
        let random = (Math.floor(Math.random() * 6000) + 3000);
        let createGoblins = setInterval(() => {
            if (!this.finished || this.lifes > 0) {
                let goblin = new Object("../../img/goblin.png", 60, 60, 506, 0, false, "704px 320px", false, "goblin", this);
                goblin.playAnimation("goblin 1s steps(7) infinite", "interactable-object 50s linear forwards");
            } else {
                clearInterval(createGoblins);

            }
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

    addObjectCollectable(type) {
        switch (type) {
            case "coin":
                this.coins++;
                this.coinsCounter.innerHTML = this.coins;
                break;
            case "heart":
                if (this.lifes < 3) {
                    this.lifes++;
                    console.log("le quedan: "+this.lifes+" vidas");
                    this.lifesCounter.innerHTML = this.lifes;
                }
                break;
            default:
                break;
        }
    }

    removeLife() {
        if (!this.character.getIsGettingDamage()) {
            this.character.setIsGettingDamage(true);
            this.lifes--;
            if (this.lifes < 1) {
                this.finished = true;
                this.map.stop();
                this.character.die();
            } else {
                this.character.getHurts();
            }
            this.lifesCounter.innerHTML = this.lifes;
            setTimeout(() => {
                this.character.setIsGettingDamage(false);
            }, 600);
        }
        console.log("le quedan: "+this.lifes+" vidas");
    }

    getFinished() {
        return this.finished;
    }
}