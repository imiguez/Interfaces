export default class Pen {

    #ctx;
    #color;
    #painting = false;
    #thickness = 1; //default
    #erase = false; //goma de borrar

    constructor(ctx, canvas) {
        this.#ctx = ctx;
        let btnPen = document.getElementById("btn-pen");
        let btnErase = document.getElementById("btn-erase");
        btnPen.onclick = () => {
            this.#erase = false
            btnPen.setAttribute("style", "background: black");
            btnErase.setAttribute("style", "background: none");
        }
        btnErase.onclick = () => {
            this.#erase = true
            btnPen.setAttribute("style", "background: none");
            btnErase.setAttribute("style", "background: black");
        }
        document.getElementById("pen-thickness").onchange = () => {
            this.#thickness = document.getElementById("pen-thickness").value * 2;
        }
        canvas.getCanvas().onmousedown = () => {
            if (this.#erase)
                this.#color = "white";
            else
                this.#color = document.getElementById("btn-color").value;
            this.preparePainting()
        };
        canvas.getCanvas().onmousemove = (e) => this.startPainting(e);
        canvas.getCanvas().onmouseup = () => this.stopPainting();
    }

    preparePainting() {
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

}