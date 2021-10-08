import Board from "./board.js";
import Game from "./game.js";
import Player from "./player.js";


document.addEventListener("DOMContentLoaded", () => {
    let canvas = document.getElementById('board');
    canvas.width = 1000;//window.screen.width;
    canvas.height = 600;
    let ctx = canvas.getContext("2d");
    let xInLine = 4;
    let board = new Board(ctx, canvas.width / 4, 0, canvas.width / 2, (canvas.height / 4)*3);
    board.draw(xInLine);
    let player1 = new Player(ctx, 25, 50, (canvas.width/4)-25, canvas.height-50, xInLine*xInLine/2);
    let player2 = new Player(ctx, (canvas.width/4)*3+25, 50, (canvas.width/4)-25, canvas.height-50, xInLine*xInLine/2);
    document.getElementById("x-in-line").onchange = () => {
        xInLine = document.getElementById("x-in-line").value;
        board.draw(xInLine);
        player1.setChipsAmount(xInLine*xInLine/2);
        player2.setChipsAmount(xInLine*xInLine/2);
    };
    document.getElementById("start-btn").addEventListener("click", () => {
        let game = new Game(board, ctx, player1, player2);
        game.startGame();
    });
});


class Main {

    canvas;
    board;

    constructor() {
        this.canvas = document.getElementById('board');
    }

    startMain() {
        this.canvas.width = 1000;
        this.canvas.height = 600;
        let ctx = this.canvas.getContext("2d");
        board = new Board(ctx);
        board.draw(xInLine);
    }

    startGame(xInLine) {
        this.canvas.width = 1000;
        this.canvas.height = 600;
        let ctx = this.canvas.getContext("2d");
        this.board = new Board(ctx);
        this.board.draw(xInLine);
    }

}