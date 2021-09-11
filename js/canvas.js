export default class Canvas {

    #env;
    #canvasEl;
    #canvas;
    #ctx;
    #width;
    #height;

    constructor() {
        this.#env = document.querySelector('.canvas-section');
        this.#canvasEl = document.createElement('canvas');
        this.#env.appendChild(this.#canvasEl);
        this.#canvasEl.id = 'canvas';

        this.#canvas = document.getElementById('canvas');
        this.#canvas.width = this.#width;
        this.#canvas.height = this.#height;
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
        this.#ctx.clearRect(0, 0, this.#width, this.#height);
    }

}