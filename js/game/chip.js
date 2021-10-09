import Figure from "./figure.js";

export default class Chip extends Figure {

    radius;
    highlight = false;
    canMove = false;
    image = new Image();//"../../img/poker-chip.png";

    constructor(x, y, context, radius) {
        super(x, y, context);
        this.radius = radius;
        this.image.src = "../../img/poker-chip.png";

    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2*Math.PI);
        if (this.image.src != null)
            this.ctx.drawImage(this.image, this.posX-this.radius, this.posY-this.radius, this.radius*2, this.radius*2);
        if (this.highlight) {
            this.ctx.strokeStyle = "red";
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        } else 
            this.ctx.lineWidth = 0;
        this.ctx.closePath();
    }

    setChipImage(image) {
        this.image = image;
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