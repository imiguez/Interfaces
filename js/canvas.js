export default class Canvas {

    #env;
    #canvasEl;
    #canvas;
    #ctx;

    constructor() {
        this.#env = document.querySelector('.canvas-section');
        this.#canvasEl = document.createElement('canvas');
        this.#env.appendChild(this.#canvasEl);
        this.#canvasEl.id = 'canvas';

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