import Board from "./board.js";

export default class Game {

    player1;
    player2;
    board;
    ctx;

    constructor(board, ctx, player1, player2) {
        this.ctx = ctx;
        this.board = board;
        this.player1 = player1;
        this.player2 = player2;
    }

    startGame() {
        console.log("Game has started");
        this.board.setGameStarted(true);
        this.player1.setGameStarted(true);
        this.player2.setGameStarted(true);
    }


}