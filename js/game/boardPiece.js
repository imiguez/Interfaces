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

    draw() {
        let myImage = new Image(this.width, this.height);
        myImage.src = this.imgSrc;
        myImage.onload = () => {
            this.ctx.drawImage(myImage, this.posX, this.posY, this.width, this.height);
        }
    }

    
}