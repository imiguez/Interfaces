export default class Pen {

    #ctx;
    #color;
    #thickness = 1; // espesor por defecto
    #painting = false; // pintando
    #erase = false; // borrando

    constructor(ctx, canvas) {
        this.#ctx = ctx;

        // Sobre los botones lápiz y goma:

        let btnPen = document.getElementById("btn-pen");
        let btnErase = document.getElementById("btn-erase");
        let btnThickness = document.getElementById("pen-thickness");
        // Desactiva la goma y activa estilo botón.
        btnPen.onclick = () => {
            this.#erase = false;
            btnPen.setAttribute("style", "background: black");
            btnErase.setAttribute("style", "background: none");
        }
        // Activa goma y estilo del botón.
        btnErase.onclick = () => {
            this.#erase = true;
            btnPen.setAttribute("style", "background: none");
            btnErase.setAttribute("style", "background: black");
        }
        // Setea espesor de lápiz y goma (* 2 para que sea un cambio más notable visualmente).
        btnThickness.onchange = () => this.#thickness = btnThickness.value * 2;

        // Sobre el canvas:

        // Cuando presiona, setea el valor de "color": 
        canvas.getCanvas().onmousedown = () => this.setColor();
        // Cuando mueve, pinta con las coordenadas que entrega el evento.
        canvas.getCanvas().onmousemove = e => this.startPainting(e);
        // Cuando para, deja de pitar.
        canvas.getCanvas().onmouseup = () => this.stopPainting();
    }

    setColor() {
        // Si esta activada la goma, en color blanco. Si no esta activada, en color seleccionado.
        let colorSelected = document.getElementById("btn-color").value;
        this.#color = this.#erase ? "#fff" : colorSelected;
        this.preparePainting();
    }

    preparePainting() {
        // Comienza el trazo.
        this.#ctx.beginPath();
        // Pinta cuadrados de color seteado.
        this.#painting = true;
        this.#ctx.strokeStyle = this.#color;
        // Del tamaño de 1 pixel por defecto.
        this.#ctx.lineWidth = this.#thickness;
    }

    startPainting(e) {
        // Si esta pintando:
        if (this.#painting) {
            // Con bordes redondeados.
            this.#ctx.lineCap = "round";
            // Dibuja una línea desde el punto donde se encuentra hasta donde se mueve.
            this.#ctx.lineTo(e.offsetX, e.offsetY);
            this.#ctx.stroke();
            this.#ctx.moveTo(e.offsetX, e.offsetY);
        }
    }

    stopPainting() {
        // Cierra.
        this.#ctx.closePath();
        // Deja de pintar.
        this.#painting = false;
    }

}