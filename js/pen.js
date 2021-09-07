import Color from "./color.js";
export default class Pen {

    #pen = document.getElementById('btn-pen');
    #ctx;
    #mode;
    #colorObj;
    #color;

    constructor(ctx) {
        this.#ctx = ctx;
        document.getElementById('mode-select').onchange = () => {
            this.setMode(document.getElementById('mode-select').value);
        }
        this.#colorObj = new Color();
    }

    setMode(mode) {
        this.#mode = mode;
        switch (this.#mode) {
            case "draw":
                this.#pen.onclick = () => this.draw(); break;
            case "paint":
                this.#pen.onclick = () => this.paint(); break;
        }
    }

    setColor() {
        let colorHex = document.getElementById('btn-color').value;
        this.#colorObj.setColor(colorHex);
        this.#color = this.#colorObj.getColor();
    }

    /**
     * test functions
     */

    draw() {
        this.#ctx.beginPath();
        this.setColor();
        this.#ctx.fillStyle = `rgb(${this.#color.rgb.r}, ${this.#color.rgb.g}, ${this.#color.rgb.b})`;
        this.#ctx.fillRect(0, 0, this.#ctx.canvas.width / 3, this.#ctx.canvas.height / 3);
        this.#ctx.stroke();
    }

    paint() {
        this.#ctx.beginPath();
        this.setColor();
        this.#ctx.fillStyle = `rgb(${this.#color.rgb.r}, ${this.#color.rgb.g}, ${this.#color.rgb.b})`;
        this.#ctx.fillRect(500, 500, 80, 150);
        this.#ctx.stroke();
    }

}