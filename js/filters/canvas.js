export default class Canvas {

    #canvas;
    #ctx;

    constructor() {
        this.#canvas = document.getElementById('canvas');
        this.#ctx = this.#canvas.getContext("2d");
    }

    setCanvasSize(size) {
        this.#canvas.width = size.width;
        this.#canvas.height = size.height;
    }

    getCanvas() {
        return this.#canvas;
    }

    getContext() {
        return this.#ctx;
    }

    clearCanvas() {
        this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    }

}