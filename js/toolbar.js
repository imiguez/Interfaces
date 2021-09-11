import SaveButton from './save.button.js';
import Pen from "./pen.js";
import ImageButton from "./image.button.js";
import FilterSwitch from "./filter.switch.js";

export default class ToolBar {

    #toolBar;
    #pen;
    #imageBtn;

    constructor(canvas, ctx) {
        // btn Pen
        this.#pen = new Pen(ctx);
        this.#pen.setMode("draw");
        // btn Save
        new SaveButton(canvas.getCanvas());
        // btn Clear
        document.getElementById('btn-newCanvas').onclick = () => canvas.clearCanvas();
        // btn Image
        this.#imageBtn = new ImageButton(ctx);
        // btn Filters
        new FilterSwitch(this.#imageBtn.getImage(), ctx);
    }

}