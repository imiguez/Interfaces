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
        if (chip != null) {
            this.clickedChip = chip;
            chip.highlight = true;
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

    onMouseUp(e) {
        this.isMouseDown = false;
        if (this.clickedChip != null) {
            this.clickedChip.highlight = false;
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
        this.board.refreshBoard();
        this.player1.refreshChipsPosition()
        this.player2.refreshChipsPosition()
    }

}