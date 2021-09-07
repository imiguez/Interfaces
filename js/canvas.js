export default class Canvas {
    
    #environment;
    #canvasEl;
    #canvas;
    #context;

    constructor() {
        this.createNewCanvas();
    }

    getCanvas() {
        return this.#canvas;
    }

    getContext() {
        return this.#context;
    }

    createNewCanvas() {
        this.#environment = document.querySelector('.canvas-section');
        this.#environment.innerHTML = ''
        
        this.#canvasEl = document.createElement('canvas');
        this.#environment.appendChild(this.#canvasEl);
        this.#canvasEl.id = 'canvas';
        
        this.#canvas = document.getElementById('canvas');
        this.#canvas.width = window.innerWidth;
        this.#canvas.height = window.innerHeight;
        this.#context = this.#canvas.getContext("2d");
    }

}