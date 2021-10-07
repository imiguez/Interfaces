import Figure from "./figure.js";
import BoardPiece from "./boardPiece.js";


export default class Board extends Figure{

    width;
    height;

    constructor(canvas) {
        // Se distorcionan 'x' e 'y'  en el canvas, por ejemplo, teniendo el valor 20 se representa como 100px aprox
        super(0, 50, canvas.getContext("2d"));
        // Le pongo  y=50  y en el navegador se ve como 100 o 150 px
    }

    draw(nInLine) {
        let w = 15; // width de la imagen del pedazo de tablero
        let h = 15; // height de la imagen del pedazo de tablero
        
        for (let x = 0; x < nInLine; x++) { 
            let x2 = (x * w) + this.posX; 
            // x2 sera el valor de x para la nueva pieza y se calcula como: 
            //la posicion x del tablero + la cantidad de piezas * su anchura
            for (let y = 0; y < nInLine; y++) {
                let y2 = (y * h) + this.posY;
                // y2 sera el valor de y para la nueva pieza y se calcula como: 
                //la posicion y del tablero + la cantidad de piezas * su altura
                let piece = new BoardPiece(x2, y2, this.ctx, w, h); // Posicion (x, y), context, ancho y alto de la imagen
                piece.draw();
            }
        }
    }


}