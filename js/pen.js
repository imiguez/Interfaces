import Color from "./color.js";
export default class Pen {

    #pen = document.getElementById('btn-pen');
    #ctx;
    #mode;
    #colorObj;
    #color;
    #painting = false;
    #thickness = 1; //default

    constructor(ctx, canvas) {
        this.#ctx = ctx;
        // comente esto porque me tiraba error y no se bien que era jeje
        // document.getElementById('mode-select').onchange = () => {
        //     this.setMode(document.getElementById('mode-select').value);
        // }
        this.#colorObj = new Color();
        document.getElementById("pen-thickness").onchange = () => {
            this.#thickness = document.getElementById("pen-thickness").value * 2;
        }
        canvas.getCanvas().onmousedown = () => {this.preparePainting()};
        canvas.getCanvas().onmousemove = (e) => {this.startPainting(e)};
        canvas.getCanvas().onmouseup = () => {this.stopPainting()};
    }

    preparePainting() {
        this.#color = document.getElementById("btn-color").value;
        this.#ctx.beginPath();
        this.#painting = true;
        this.#ctx.strokeStyle = this.#color;
        this.#ctx.lineWidth = this.#thickness;    
    }

    startPainting(e) {
        if (this.#painting) {
            this.#ctx.lineCap = "round";
            this.#ctx.lineTo(e.offsetX, e.offsetY);
            this.#ctx.stroke();
            this.#ctx.moveTo(e.offsetX, e.offsetY); 
        }
    }

    stopPainting() {
        this.#ctx.closePath();
        this.#painting = false;
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