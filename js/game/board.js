import Figure from "./figure.js";
import BoardPiece from "./boardPiece.js";


export default class Board extends Figure{

    width;
    height;
    boardPieces = [];
    chips = [];
    gameStarted = false;
    xInLine;

    constructor(ctx, x, y, width, height, xInLine) {
        super(x, y, ctx);
        this.width = width;
        this.height = height;
        this.xInLine = xInLine;
    }

    setBoard() {
        this.ctx.fillStyle = "gray";
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height); // Limpia el tablero
        let w = 50; // width de la imagen del pedazo de tablero
        let h = 50; // height de la imagen del pedazo de tablero
        let centerBoard = (this.width - w*this.xInLine) / 2; // Se encarga de centrar el tablero dependiendo de su tamaño
        for (let x = 0; x < this.xInLine; x++) { 
            let x2 = (x * w) + this.posX + centerBoard; 
            // x2 sera el valor de x para la nueva pieza y se calcula como: 
            // la cantidad de piezas * su anchura + la posicion x del tablero + el centrado del tablero
            this.boardPieces[x] = [];
            for (let y = 0; y < this.xInLine; y++) {
                let y2 = this.height - (y+1) * h;
                // y2 sera el valor de y para la nueva pieza y se calcula como: 
                // la altura del tablero - la cantidad de piezas+1 * su altura
                let piece = new BoardPiece(x2, y2, this.ctx, w, h); // Posicion (x, y), context, ancho y alto de la imagen
                //piece.draw();
                this.boardPieces[x][y] = piece;
            }
        }
        this.drawBoard();
    }

    setGameStarted(gameStarted) {
        this.gameStarted = gameStarted;
        // for (let x = 0; x < this.xInLine; x++) {
        //     for (let y = 0; y < this.xInLine; y++) {
        //         this.chips[x][y] = null;
        //     }
        // }
    }

    drawBoard() {
        this.ctx.fillStyle = "gray";
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height); // Limpia el tablero
        for (let x = 0; x < this.xInLine; x++) { // Dibuja el tablero
            for (let y = 0; y < this.xInLine; y++) {
                this.boardPieces[x][y].draw();
            }
        }
    }

    addChip(chip) { // TODO
        //let newXPos = ;
        let newYPos = this.height - chip.getRadius() + 5;
        for (let c = 0; c < this.chips.length; c++) {
            for (let bp = 0; bp < this.xInLine; bp++) {
                let boardPiece = this.boardPieces[0][bp]
                if (boardPiece.getPosX() <= chip.getPosX() && boardPiece.getPosX() + boardPiece.getWidth() >= chip.getPosX()) { // 
                    if (this.chips[c].getPosY() <= newYPos) { 
                        newYPos = newYPos - 50;
                    }
                }
                
            }
        }
        if (newYPos > this.height- this.xInLine*50) { // Si la columna esta llena no se inserta
            this.chips[this.chips.length] = chip;
            chip.setPosition();
        }
    }

    setXInLine(xInLine) {
        if (!this.gameStarted) { // Si el juego ya empezo no se puede modificar el xInLine
            this.xInLine = xInLine;
            this.setBoard();
        }
    }

    getXInLine() {
        return this.xInLine;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

}