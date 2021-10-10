export default class Figure {

    posX;
    posY;
    ctx;
    fill;

    constructor(x, y, context) {
        this.posX = x;
        this.posY = y;
        this.ctx = context;
    }


    getPosition() {
        return {
            x: this.posX,
            y: this.posY
        };
    }

    setPosition(x, y) {
        this.posX = x;
        this.posY = y;
    }

    getPosX() {
        return this.posX;
    }

    getPosY() {
        return this.posY;
    }

    setFill(fill) {
        this.fill = fill;
    }

    // draw() {
    //     this.ctx.fillStyle = this.fill;
    // }

    isPointInside(x, y) {};
}