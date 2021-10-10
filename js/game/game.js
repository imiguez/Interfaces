import Board from "./board.js";

export default class Game {

    player1;
    player2;
    board;
    ctx;
    turn;
    isMouseDown = false;
    clickedChip;
    xInLineWinCondition;
    gameHasFinished = false;

    constructor(board, ctx, player1, player2, xInLineWinCondition) {
        this.ctx = ctx;
        this.board = board;
        this.player1 = player1;
        this.player2 = player2;
        this.xInLineWinCondition = xInLineWinCondition;
    }

    setXInLineWinCondition(xInLine) {
        this.xInLineWinCondition = xInLine;
    }

    startGame() {
        this.gameHasFinished = false;
        this.turn = 1;
        console.log("Game has started");
        this.board.setGameStarted(true);
        this.player1.setGameStarted(true);
        this.player2.setGameStarted(true);
        let timer = document.getElementById("timer");
        let minutes = 5;
        let seconds = 0;
        setInterval(() => {
            if (this.gameHasFinished) 
                return;
            if(minutes == 0 && seconds < 1){
                this.finishGame();
                return;
            } else if(seconds == 0){
                minutes--;
                seconds = 60;
            }
            seconds--;
            if(seconds < 10) 
                timer.innerHTML = "0" + minutes + ":" + "0" + seconds;
            else
                timer.innerHTML = "0" + minutes + ":" + seconds;
      
            }, 1000)
    }

    finishGame(winner = null) { // Parar timer cuando se gana
        this.gameHasFinished = true;
        let h2 = document.getElementById("winner");
        if (winner == null) 
            h2.innerHTML = "Its a Tie!";    
        else 
            h2.innerHTML = winner.getName()+" has won!";
        h2.setAttribute("style", "visibility: visible");
        this.player1.setGameStarted(false);
        this.player2.setGameStarted(false);
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
            let player;
            switch (this.turn) {
                case 1:
                    player = this.player1;
                    break;
                case 2:
                    player = this.player2;
                    break;
            }
            let boardPosX = this.board.getPosX() + (this.board.getWidth() - this.board.getXInLine() * this.board.getBoardPieceSize()) / 2; // 50 es el tamaño de las boardPieces
            let realBoardWidth = boardPosX + this.board.getXInLine() * this.board.getBoardPieceSize();
            //console.log(this.clickedChip.getPosX(), boardPosX, realBoardWidth);
            if (this.clickedChip.getPosX() > boardPosX && this.clickedChip.getPosX() < realBoardWidth) { // Se fija si la pos x de la ficha esta entre la primer y ultima boardPiece
                let boardPosY = this.board.getHeight() - this.board.getXInLine() * this.board.getBoardPieceSize();
                if (this.clickedChip.getPosY() < boardPosY) {
                    console.log("paso");
                    let chipWasAdded = this.board.addChip(this.clickedChip);
                    if (chipWasAdded) {
                        if (this.didPlayerWin(player, this.clickedChip.getPosX(), this.clickedChip.getPosY())) {
                            this.finishGame(player);
                        } else if (this.board.getChips().length == this.board.getXInLine() * this.board.getXInLine()) {
                            this.finishGame();
                        }
                        switch (this.turn) {
                            case 1:
                                this.turn = 2;
                                break;
                            case 2:
                                this.turn = 1;
                                break;
                        }
                    }
                }
                
            }
            this.board.draw();
            player.refreshChipsPosition();
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
        this.board.draw();
        this.player1.refreshChipsPosition()
        this.player2.refreshChipsPosition()
    }

    didPlayerWin(player, x, y) {
        let horizontalChips = 1 + this.getChipsInLine(player, x, y, 1, "horizontal");
        horizontalChips = horizontalChips + this.getChipsInLine(player, x, y, -1, "horizontal");
        let verticalChips = 1 + this.getChipsInLine(player, x, y, 1, "vertical");
        verticalChips = verticalChips + this.getChipsInLine(player, x, y, -1, "vertical");
        let diagonalLeftRightChips = 1 + this.getChipsInLine(player, x, y, 1, "diagonal-left-right");
        diagonalLeftRightChips = diagonalLeftRightChips + this.getChipsInLine(player, x, y, -1, "diagonal-left-right");
        let diagonalRightLeftChips = 1 + this.getChipsInLine(player, x, y, 1, "diagonal-right-left");
        diagonalRightLeftChips = diagonalRightLeftChips + this.getChipsInLine(player, x, y, -1, "diagonal-right-left");
        if (horizontalChips >= this.xInLineWinCondition || verticalChips >= this.xInLineWinCondition
             || diagonalLeftRightChips >= this.xInLineWinCondition || diagonalRightLeftChips >= this.xInLineWinCondition) {
            return true;
        }
        return false;
    }

    getChipsInLine(player, x, y, direction, typeOfSearch) {
        switch (typeOfSearch) {
            case "horizontal":
                x = x + this.board.getBoardPieceSize() * direction; // Direction cambia el sentido en el que se recorrera horizontalmente
                break;
            case "vertical":
                y = y + this.board.getBoardPieceSize() * direction; // Direction cambia el sentido en el que se recorrera verticalmente
                break;
            case "diagonal-left-right":
                x = x + this.board.getBoardPieceSize() * direction; // Direction cambia el sentido en el que se recorrera horizontalmente
                y = y + this.board.getBoardPieceSize() * direction * -1; // 
                break;
            case "diagonal-right-left":
                x = x + this.board.getBoardPieceSize() * direction; // Direction cambia el sentido en el que se recorrera horizontalmente
                y = y + this.board.getBoardPieceSize() * direction; // 
                break;
        }
        let count=0;
        if (player.hasChipInPosition(x, y)) {
            count = 1 + this.getChipsInLine(player, x, y, direction, typeOfSearch);
        }
        return count;
    }

}