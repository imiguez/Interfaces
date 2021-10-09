import Board from "./board.js";

export default class Game {

    player1;
    player2;
    board;
    ctx;
    turn;
    isMouseDown = false;
    clickedChip;

    constructor(board, ctx, player1, player2) {
        this.ctx = ctx;
        this.board = board;
        this.player1 = player1;
        this.player2 = player2;
    }

    startGame() {
        this.turn = 1;
        console.log("Game has started");
        this.board.setGameStarted(true);
        this.player1.setGameStarted(true);
        this.player2.setGameStarted(true);
        //document.getElementById("board").addEventListener("mousedown", this.onMouseDown(e));
    }

    onMouseDown(e) {
        console.log(e);
        this.isMouseDown = true;
        let player = this.player1;
        if (this.turn == 2) 
            player = this.player2
        let chip = this.findClickedChip(e.layerX, e.layerY, player);
        if (chip != null && chip.getCanMove()) {
            this.clickedChip = chip;
            //chip.highlight = true;
            chip.draw();
        }
    }
    
    onMouseMove(e) {
        if (this.isMouseDown && this.clickedChip != null) {
            this.clickedChip.setPosition(e.layerX, e.layerY);
            this.refreshScreen();
            this.clickedChip.draw();
        }
    }

    onMouseUp(e) { // TODO
        this.isMouseDown = false;
        if (this.clickedChip != null) {
            this.clickedChip.highlight = false;
            let boardPosX = this.board.getPosX() + (this.board.getWidth() - this.board.getXInLine() * 50); // 50 es el tamaño de las boardPieces
            let realBoardWidth = boardPosX + this.board.getXInLine() * 50;
            if (this.clickedChip.getPosX() > boardPosX && this.clickedChip.getPosX() < realBoardWidth) { // Se fija si la pos x de la ficha esta entre la primer y ultima boardPiece
                let boardPosY = this.board.getHeight() - this.board.getXInLine() * 50;//this.height - (y+1) * h;
                if (this.clickedChip.getPosY() < boardPosY) {
                    
                }
                
            }
            this.clickedChip.draw();
            this.clickedChip = null
        }
    }

    findClickedChip(x, y, player) {
        let chipsFromPlayer = player.getChips();
        for (let c = 0; c < player.getChipsAmount(); c++) {
            if (chipsFromPlayer[c].isPointInside(x, y))
            return chipsFromPlayer[c];
        }
    }

    refreshScreen() {
        this.board.drawBoard();
        this.player1.refreshChipsPosition()
        this.player2.refreshChipsPosition()
    }

}