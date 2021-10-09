import Board from "./board.js";
import Game from "./game.js";
import Player from "./player.js";


document.addEventListener("DOMContentLoaded", () => {
    let canvas = document.getElementById('board');
    canvas.width = 1200;//window.screen.width;
    canvas.height = 500;
    let ctx = canvas.getContext("2d");
    let xInLine = 4;
    let playersWidth = canvas.width/2 - 3.5*50;
    let posXBoard = playersWidth;
    let board = new Board(ctx, posXBoard, 0, 7*50, canvas.height, xInLine);
    board.setBoard();
    let player1 = new Player(ctx, 0, 0, playersWidth, canvas.height, xInLine*xInLine/2);
    let player2 = new Player(ctx, (canvas.width/2 + 3.5*50), 0, playersWidth, canvas.height, xInLine*xInLine/2);
    let game = new Game(board, ctx, player1, player2);
    document.getElementById("x-in-line").onchange = () => {
        xInLine = document.getElementById("x-in-line").value;
        board.setXInLine(xInLine);
        player1.setChipsAmount(xInLine*xInLine/2);
        player2.setChipsAmount(xInLine*xInLine/2);
    };
    document.getElementById("start-btn").addEventListener("click", () => {
        game.startGame();
        document.getElementById("x-in-line").setAttribute("disabled", true);
    });
    canvas.addEventListener("mousedown", (e) => game.onMouseDown(e));
    canvas.addEventListener("mousemove", (e) => game.onMouseMove(e));
    canvas.addEventListener("mouseup", (e) => game.onMouseUp(e));
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
        board.setBoard(xInLine);
    }

    startGame(xInLine) {
        this.canvas.width = 1000;
        this.canvas.height = 600;
        let ctx = this.canvas.getContext("2d");
        this.board = new Board(ctx);
        this.board.setBoard(xInLine);
    }

}