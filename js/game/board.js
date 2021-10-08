import Figure from "./figure.js";
import BoardPiece from "./boardPiece.js";


export default class Board extends Figure{

    width;
    height;
    boardPieces = [];
    gameStarted = false;

    constructor(ctx, x, y, width, height) {
        super(x, y, ctx);
        this.width = width;
        this.height = height;
    }

    draw(nInLine) {
        if (this.gameStarted) // Si el juego ya empezo no se puede modificar el tablero
            return;
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height); // Limpia el tablero
        let w = 50; // width de la imagen del pedazo de tablero
        let h = 50; // height de la imagen del pedazo de tablero
        let centerBoard = (this.width - w*nInLine) / 2; // Se encarga de centrar el tablero dependiendo de su tamaño
        for (let x = 0; x < nInLine; x++) { 
            let x2 = (x * w) + this.posX + centerBoard; 
            // x2 sera el valor de x para la nueva pieza y se calcula como: 
            // la cantidad de piezas * su anchura + la posicion x del tablero + el centrado del tablero
            this.boardPieces[x] = [];
            for (let y = 0; y < nInLine; y++) {
                let y2 = this.height - (y+1) * h;
                // y2 sera el valor de y para la nueva pieza y se calcula como: 
                // la altura del tablero - la cantidad de piezas+1 * su altura
                let piece = new BoardPiece(x2, y2, this.ctx, w, h); // Posicion (x, y), context, ancho y alto de la imagen
                piece.draw();
                this.boardPieces[x][y] = piece;
            }
        }
    }

    setGameStarted(gameStarted) {
        this.gameStarted = gameStarted;
    }


}