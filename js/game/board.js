document.addEventListener('DOMContentLoaded', () => {
    let board = new Board();
    console.log("paso");
    board.paint();
});


class Board {

    #canvas;
    #ctx;
    #width;
    #height;

    constructor() {
        this.#canvas = document.getElementById('board');
        this.#ctx = this.#canvas.getContext("2d");
        this.#height = this.#canvas.getAttribute("height");
        this.#width = this.#canvas.getAttribute("width");
    }

    paint() {
        let imgData = this.#ctx.getImageData(0, 0, this.#width, this.#height);
        this.#ctx.beginPath();
        this.#ctx.lineWidth = "1";
        this.#ctx.strokeStyle = "red";
        this.#ctx.rect(5, 30, this.#width-120, this.#height-20);
        this.#ctx.stroke();
    }


    setPixel(imageData, x, y, r, g, b, a = 255) {
        let index = (x + y * imageData.width) * 4;
        imageData.data[index + 0] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
        imageData.data[index + 3] = a;
    }
}