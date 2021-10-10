import Figure from "./figure.js";

export default class BoardPiece extends Figure {

    imgSrc = "../../img/agujero.png";
    width;
    height;

    constructor(x, y, context, width, height) {
        super(x, y, context);
        this.width = width;
        this.height = height;
    }

    // draw() { // Comento este draw() ya que al cargar imagenes se puede ver un minimo atraso a la hora de cargar
    //     let myImage = new Image(this.width, this.height);
    //     myImage.src = this.imgSrc;
    //     myImage.onload = () => {
    //         this.ctx.drawImage(myImage, this.posX, this.posY, this.width, this.height);
    //     }
    // }

    draw() {
        this.ctx.beginPath();
        // Pedazo de tablero cuadrado
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = "black";
        this.ctx.fillStyle = "red";
        this.ctx.rect(this.posX, this.posY, this.width, this.height);
        this.ctx.fillRect(this.posX+1, this.posY+1, this.width-2, this.height-2);
        this.ctx.stroke();
        // Agujero del pedazo del tablero
        this.ctx.beginPath();
        let circlePosX = this.posX + this.width/2;
        let circlePosY = this.posY + this.height/2;
        this.ctx.arc(circlePosX, circlePosY, this.width/2-5, 0, 2*Math.PI);
        this.ctx.fillStyle = "black";
        this.ctx.fill();
        this.ctx.stroke();
    }

    getWidth() {
        return this.width;
    }
}