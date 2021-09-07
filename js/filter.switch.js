export default class FilterSwitch {

    #image;
    #ctx;

    constructor(img, ctx) {
        this.#image = img;
        this.#ctx = ctx;
        document.getElementById('filter-select').onchange = () => this.setFilter();
    }

    setFilter() {
        switch (document.getElementById('filter-select').value) {
            case "sepia": this.drawSepiaFilter(); break;
            case "negativo": this.drawNegativoFilter(); break;
            case "brillo": this.drawBrilloFilter(); break;
            case "binarizacion": this.drawBinarizacionFilter(); break;
            case "saturacion": this.drawSaturacionFilter(); break;
            case "bordes": this.drawBordesFilter(); break;
            case "blur": this.drawBlurFilter(); break;
        }
    }

    drawSepiaFilter() {
        let dataImg = this.#ctx.getImageData(this.#ctx.canvas.width / 4, this.#ctx.canvas.height / 5, this.#image.width, this.#image.height);
        for (let x = 0; x < this.#ctx.canvas.width; x++) {
            for (let y = 0; y < this.#ctx.canvas.height; y++) {
                // calculo el color gris del pixel
                let grey = (this.getRed(dataImg, x, y) + this.getBlue(dataImg, x, y) + this.getGreen(dataImg, x, y)) / 3
                let index = (x + y * dataImg.width) * 4;
                dataImg.data[index + 0] = grey;
                dataImg.data[index + 1] = grey;
                dataImg.data[index + 2] = grey;
                dataImg.data[index + 3] = 255;
            }
        }
        this.#ctx.putImageData(dataImg, this.#ctx.canvas.width / 4, this.#ctx.canvas.height / 5);
    }

    getRed(imageData, x, y) {
        let index = (x + y * imageData.width) * 4;
        return imageData.data[index + 0];
    }
    getGreen(imageData, x, y) {
        let index = (x + y * imageData.width) * 4;
        return imageData.data[index + 1];
    }
    getBlue(imageData, x, y) {
        let index = (x + y * imageData.width) * 4;
        return imageData.data[index + 2];
    }

    drawNegativoFilter() { }
    drawBrilloFilter() { }
    drawBinarizacionFilter() { }
    drawSaturacionFilter() { }
    drawBordesFilter() { }
    drawBlurFilter() { }

}