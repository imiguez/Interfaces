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
        this.ctx.fillStyle = "gray";
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height); // Limpia las fichas
        let chipSize = 40;
        let y2 = this.posY + chipSize/2;
        let x2 = this.posX + chipSize/2;
        let yCount = 1;
        for (let c = 0; c < this.chipsAmount; c++) {
            if (this.width-chipSize <= chipSize * (c/yCount)) {
                y2 = y2 + chipSize;
                x2 = this.posX + chipSize/2;
                yCount++;
            }
            this.chips[c] = new Chip(x2, y2, this.ctx, chipSize/2);
            let img = new Image();
            img.src = this.chipsImage;
            img.onload = () => {
                this.chips[c].setChipImage(img);
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

    setGameStarted(gameStarted) {
        this.gameStarted = gameStarted;
    }
}