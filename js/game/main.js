import Board from "./board.js";
import Game from "./game.js";
import Player from "./player.js";


document.addEventListener("DOMContentLoaded", () => {
    let canvas = document.getElementById('board');
    canvas.width = 1200;//window.screen.width;
    canvas.height = 550;
    let ctx = canvas.getContext("2d");
    let xInLineWinCondition = 4;
    let chipsAndBoardPiecesAmount =  parseInt(xInLineWinCondition) + parseInt(xInLineWinCondition/2);
    let playersWidth = canvas.width/2 - 6*40;
    let posXBoard = playersWidth;
    let board = new Board(ctx, posXBoard, 0, 12*40, canvas.height, chipsAndBoardPiecesAmount);
    board.setBoard();
    let player1 = new Player(ctx, 0, 0, playersWidth, canvas.height, chipsAndBoardPiecesAmount*chipsAndBoardPiecesAmount/2, "player 1", "../../img/red-chip.png");
    let player2 = new Player(ctx, (canvas.width/2 + 6*40), 0, playersWidth, canvas.height, chipsAndBoardPiecesAmount*chipsAndBoardPiecesAmount/2, "player 2", "../img/black-chip.png");
    let game = new Game(board, ctx, player1, player2, xInLineWinCondition);
    document.getElementById("x-in-line").onchange = () => {
        xInLineWinCondition = document.getElementById("x-in-line").value;
        game.setXInLineWinCondition(xInLineWinCondition);
        chipsAndBoardPiecesAmount =  parseInt(xInLineWinCondition) + parseInt(xInLineWinCondition/2);
        board.setXInLine(chipsAndBoardPiecesAmount);
        player1.setChipsAmount(chipsAndBoardPiecesAmount*chipsAndBoardPiecesAmount/2);
        player2.setChipsAmount(chipsAndBoardPiecesAmount*chipsAndBoardPiecesAmount/2);
    };
    let imgPlayer1 = document.getElementById("chip-image-player-1");
    let imgPlayer2 = document.getElementById("chip-image-player-2");
    imgPlayer1.addEventListener("change", (e) => {
        if(e.target.files) {
            let imageFile = e.target.files[0];
            let reader = new FileReader();
            reader.onloadend = (e) => {
                player1.setChipsImage(reader.result);
            }
            reader.readAsDataURL(imageFile);
        }
    });
    imgPlayer2.addEventListener("change", (e) => {
        if(e.target.files) {
            let imageFile = e.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(imageFile);
            reader.onloadend = (e) => {
                player2.setChipsImage(reader.result);
            }
            reader.readAsDataURL(imageFile);
        }
    });
    document.getElementById("start-btn").addEventListener("click", () => {
        game.startGame();
        document.getElementById("x-in-line").setAttribute("style", "visibility: hidden;");
        imgPlayer1.setAttribute("style", "visibility: hidden;");
        imgPlayer2.setAttribute("style", "visibility: hidden;");
        document.getElementById("start-btn").innerHTML = "Retry";
        document.getElementById("start-btn").addEventListener("click", () => {location.reload();});
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
