import Chip from "./chip.js";

export default class Player {

    posX;
    posY;
    width;
    height;
    ctx;
    chipsImage;
    chips = [];
    chipsAmount;
    gameStarted = false;
    name;

    constructor(ctx, x, y, width, height, chipsAmount, name, image) {
        this.ctx = ctx;
        this.posX = x;
        this.posY = y;
        this.width = width;
        this.height = height;
        this.chipsAmount = chipsAmount;
        this.chipsImage = image;
        this.setChips();
        this.name = name;
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
            if (this.width-(chipSize*2) <= chipSize * (c/yCount)) {
                y2 = y2 + chipSize;
                x2 = this.posX + chipSize/2;
                yCount++;
            }
            this.chips[c] = new Chip(x2, y2, this.ctx, chipSize/2);
            if (this.chipsImage != null) {
                let img = new Image();
                img.src = this.chipsImage;
                img.onload = () => {
                    this.chips[c].setChipImage(img);
                    //this.chips[c].draw();
                }
            }
            x2 = x2+ chipSize;
        }
        this.refreshChipsPosition();        
    }
        
    refreshChipsPosition() {
        this.ctx.fillStyle = "gray";
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height); // Limpia las fichas
        for (let c = 0; c < this.chipsAmount; c++) 
            this.chips[c].draw();
    }

    setChipsImage(chipImage) {
        this.chipsImage = chipImage;
        this.setChips();
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

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setGameStarted(gameStarted) {
        this.gameStarted = gameStarted;
        for (let c = 0; c < this.chipsAmount; c++) {
            this.chips[c].setCanMove(gameStarted); // Cuando empieza el juego las fichas se pueden mover
        }
    }

    hasChipInPosition(x, y) {
        for (let c = 0; c < this.chips.length; c++) {
            if (this.chips[c].isPointInside(x, y)) {
                return true;
            }
        }
        return false;
    }
}