import SaveButton from './save.button.js';
import Pen from "./pen.js";
import ImageButton from "./image.button.js";
import FilterSwitch from "./filter.switch.js";

export default class ToolBar {

    #toolBar;
    #pen;
    #imageBtn;

    constructor(canvas, ctx) {
        this.setMotion();
        // btn Pen
        this.#pen = new Pen(ctx);
        this.#pen.setMode("draw");
        // btn Save
        new SaveButton(canvas.getCanvas());
        // btn Clear
        document.getElementById('btn-newCanvas').onclick = () => canvas.clearCanvas();
        // btn Image
        this.#imageBtn = new ImageButton(canvas, ctx);
        console.log(this.#imageBtn);
        // btn Filters
        // new FilterSwitch(canvas, ctx);
        new FilterSwitch(this.#imageBtn.getImage(), ctx, canvas.getCanvas());
    }

    setMotion() {
        this.#toolBar = document.querySelector('.toolbar-section');
        this.#toolBar.classList.add('motion-slide-out');
        this.#toolBar.onmouseenter = () => {
            this.#toolBar.classList.remove('motion-slide-out');
            this.#toolBar.classList.add('motion-slide-in');
        }
        this.#toolBar.onmouseleave = () => {
            this.#toolBar.classList.remove('motion-slide-in');
            this.#toolBar.classList.add('motion-slide-out');
        }
    }

}