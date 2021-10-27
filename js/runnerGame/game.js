const left = 37
const up = 38
const right = 39
const down = 40

export default class Game {

    character;
    map;
    coins;
    finished;

    constructor(character, map) {
        this.character = character;
        this.map = map;
    }


    startGame() {
        this.finished = false;
        let jump;
        this.coins = 0;
        this.map.startLayersAnimation();
        this.character.setHasStarted(true);
        let createObs = setInterval(() => {
            if (!this.finished) 
                this.createObstacle();
            else
                clearInterval(createObs);
        }, 2000);
        window.onkeydown = (e) => {
            if (e.keyCode == up && !jump) {
                jump = true;
                this.character.jump();
                setTimeout(() => {jump = false}, 600);
            }
        }
    }

    createObstacle() {
        let obstacle = document.createElement("div");
        obstacle.style.width = "60px";
        obstacle.style.height = "60px";
        obstacle.style.backgroundColor = "red";
        obstacle.style.position = "absolute";
        obstacle.style.right = "0";
        obstacle.style.top = "410px";
        document.body.insertBefore(obstacle, document.getElementById("character-3"));
        setInterval(() => {
            if (obstacle.offsetLeft + obstacle.offsetWidth >= 250 && obstacle.offsetLeft <= 250) {
                let charTop = this.character.getOffsetTop();
                let charHeight = this.character.getOffsetHeight();
                if (obstacle.offsetTop <= charTop+charHeight && obstacle.offsetTop >= charTop) {
                    obstacle.style.animationPlayState = "paused";
                    this.map.stop();
                    this.character.die();
                    this.finished = true;
                }
            }
        }, 10);

        obstacle.style.animation = "obstacle-1 2s linear infinite";
        return obstacle;
    }

}