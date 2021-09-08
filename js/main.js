import Canvas from "./canvas.js";
import ToolBar from "./toolbar.js";

const initApp = () => {
    document.addEventListener('DOMContentLoaded', () => {
        new Main();
    });
}

initApp();

class Main {

    #canvas;
    #ctx;

    constructor() {
        this.#canvas = new Canvas();
        this.#ctx = this.#canvas.getContext();
        new ToolBar(this.#canvas, this.#ctx);
    }

}