import Figure from "./figure.js";

export default class Chip extends Figure {

    radius;
    highlight = false;
    canMove = true;

    constructor(x, y, context, radius) {
        super(x, y, context);
        this.radius = radius;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2*Math.PI);
        if (this.highlight) {
            this.ctx.strokeStyle = "red";
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        }
        this.ctx.closePath();
    }

    setChipImage(image) {
        this.ctx.drawImage(image, this.posX-this.radius, this.posY-this.radius, this.radius*2, this.radius*2);
    }

    getRadius() {
        return this.radius;
    }

    isPointInside(x, y) {
        let x2 = this.posX - x;
        let y2 = this.posY - y;
        return Math.sqrt(x2*x2 + y2*y2) < this.radius;
    }

    setCanMove(canMove) {
        this.canMove = canMove;
    }

    getCanMove() {
        return this.canMove;
    }
}