import SaveButton from './save.button.js';
import Pen from "./pen.js";
import ImageButton from "./image.button.js";
import FilterSwitch from "./filter.switch.js";

export default class ToolBar {

    constructor(canvas, ctx) {
        // btn lápiz y goma
        new Pen(ctx, canvas);
        // btn guardar
        new SaveButton(canvas.getCanvas());
        // btn limpiar canvas
        document.getElementById('btn-newCanvas').onclick = () => canvas.clearCanvas();
        // btn imagen
        new ImageButton(canvas, ctx);
        // btn filtros
        new FilterSwitch(ctx, canvas.getCanvas());
    }

}