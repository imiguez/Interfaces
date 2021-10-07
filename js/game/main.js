import Board from "./board.js";
document.addEventListener("DOMContentLoaded", () => {
    let main = new Main();
    main.startGame(5);
});


class Main {

    canvas;
    board;

    constructor() {
        this.canvas = document.getElementById('board');
    }

    startGame(xInLine) {
        this.canvas.setAttribute("width", xInLine*15 +"");
        //let ctx = this.canvas.getContext("2d");
        this.board = new Board(this.canvas);
        this.board.draw(xInLine);
    }

}