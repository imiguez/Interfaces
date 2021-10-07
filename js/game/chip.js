import Figure from "./figure";

export default class Chip extends Figure {

    radius;
    highlight = false;

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

    getRadius() {
        return this.radius;
    }

    isPointInside(x, y) {
        let x2 = this.posX - x;
        let y2 = this.posY - y;
        return Math.sqrt(x2*x2 + y2*y2) < this.radius;
    }
}