import Canvas from "./canvas.js";
import Pen from "./pen.js";
import ImageButton from "./image.button.js";
import FilterSwitch from "./filter.switch.js";

const initApp = () => {
    document.addEventListener('DOMContentLoaded', () => {
        new Main();
    });
}

initApp();

class Main {

    #canvas;
    #ctx;
    #pen;
    #imageBtn;

    constructor() {
        // canvas
        this.#canvas = new Canvas();
        this.#ctx = this.#canvas.getContext();
        // pen
        this.#pen = new Pen(this.#ctx);
        this.#pen.setMode("draw");
        // new canvas
        document.getElementById('btn-newCanvas').onclick = () => this.#canvas.createNewCanvas();
        // new image
        this.#imageBtn = new ImageButton(this.#ctx);
        // filters
        new FilterSwitch(this.#imageBtn.getImage(), this.#ctx);
    }

}