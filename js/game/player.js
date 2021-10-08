import Chip from "./chip.js";

export default class Player {

    posX;
    posY;
    width;
    height;
    ctx;
    chipsImage = "../../img/poker-chip.png";
    chips = [];
    chipsAmount;
    gameStarted = false;

    constructor(ctx, x, y, width, height, chipsAmount) {
        this.ctx = ctx;
        this.posX = x;
        this.posY = y;
        this.width = width;
        this.height = height;
        this.chipsAmount = chipsAmount;
        this.setChips();
    }

    setChips() {
        if (this.gameStarted)
            return;
        this.refreshChipsPosition(true);        
        }
        
        refreshChipsPosition(isSetChips = false) {
        this.ctx.fillStyle = "gray";
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height); // Limpia las fichas
        let chipSize = 40;
        let y2 = this.posY + chipSize/2;
        let x2 = this.posX + chipSize/2;
        let yCount = 1;
        for (let c = 0; c < this.chipsAmount; c++) {
            if (this.width-(chipSize*2) <= chipSize * (c/yCount)) {
                y2 = y2 + chipSize;
                x2 = this.posX + chipSize/2;
                yCount++;
            }
            if (isSetChips) {
                this.chips[c] = new Chip(x2, y2, this.ctx, chipSize/2);
                if (this.chipsImage != null) {
                    let img = new Image();
                    img.src = this.chipsImage;
                    img.onload = () => {
                        this.chips[c].setChipImage(img);
                        this.chips[c].draw();
                    }
                }
            }else {
                this.chips[c].draw();
            }
            x2 = x2+ chipSize;
        }
    }

    setChipsImage(chipImage) {
        this.chipsImage = chipImage;
    }

    setChipsAmount(amount) {
        this.chipsAmount = amount;
        this.setChips();
    }

    getChipsAmount() {
        return this.chipsAmount;
    }

    getChips() {
        return this.chips;
    }

    setGameStarted(gameStarted) {
        this.gameStarted = gameStarted;
        for (let c = 0; c < this.chipsAmount; c++) {
            this.chips[c].setCanMove(true); // Cuando empieza el juego las fichas se pueden mover
        }
    }
}