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
            case "sepia": this.drawSepiaFilter(); break; // gaspar
            case "negativo": this.drawNegativoFilter(); break; // gaspar
            case "brillo": this.drawBrilloFilter(); break; // ignacio
            case "binarizacion": this.drawBinarizacionFilter(); break; // ignacio

            case "saturacion": this.drawSaturacionFilter(); break; // gaspar
            case "bordes": this.drawBordesFilter(); break; // ignacio
            case "blur": this.drawBlurFilter(); break;
        }
    }

    drawSepiaFilter() {
        let imageData = this.#ctx.getImageData(this.#ctx.canvas.width / 4, this.#ctx.canvas.height / 5, this.#image.width, this.#image.height);
<<<<<<< Updated upstream
        for (let x = 0; x < this.#ctx.canvas.width; x++) {
            for (let y = 0; y < this.#ctx.canvas.height; y++) {
                // calculo el color gris del pixel
                let grey = (this.getRed(imageData, x, y) + this.getBlue(imageData, x, y) + this.getGreen(imageData, x, y)) / 3;
                let index = (x + y * imageData.width) * 4;
                imageData.data[index + 0] = grey;
                imageData.data[index + 1] = grey;
                imageData.data[index + 2] = grey;
                imageData.data[index + 3] = 255;
            }
=======
        let pixels = imageData.data;
        let numPixels = imageData.width * imageData.height;
        for (let i = 0; i < numPixels; i++) {
            let r = pixels[i * 4];
            let g = pixels[i * 4 + 1];
            let b = pixels[i * 4 + 2];

            pixels[i * 4] = 255 - r;
            pixels[i * 4 + 1] = 255 - g;
            pixels[i * 4 + 2] = 255 - b;

            pixels[i * 4] = (r * .393) + (g * .769) + (b * .189);
            pixels[i * 4 + 1] = (r * .349) + (g * .686) + (b * .168);
            pixels[i * 4 + 2] = (r * .272) + (g * .534) + (b * .131);
>>>>>>> Stashed changes
        }
        this.#ctx.putImageData(imageData, this.#ctx.canvas.width / 4, this.#ctx.canvas.height / 5);
    }

    // getRed(imageData, x, y) {
    //     let index = (x + y * imageData.width) * 4;
    //     return imageData.data[index + 0];
    // }
    // getGreen(imageData, x, y) {
    //     let index = (x + y * imageData.width) * 4;
    //     return imageData.data[index + 1];
    // }
    // getBlue(imageData, x, y) {
    //     let index = (x + y * imageData.width) * 4;
    //     return imageData.data[index + 2];
    // }

    drawNegativoFilter() {
        let imageData = this.#ctx.getImageData(this.#ctx.canvas.width / 4, this.#ctx.canvas.height / 5, this.#image.width, this.#image.height);
        let pixels = imageData.data;
        let numPixels = imageData.width * imageData.height;
        for (let i = 0; i < numPixels; i++) {
            let r = pixels[i * 4];
            let g = pixels[i * 4 + 1];
            let b = pixels[i * 4 + 2];
            pixels[i * 4] = 255 - r;
            pixels[i * 4 + 1] = 255 - g;
            pixels[i * 4 + 2] = 255 - b;
        }
        this.#ctx.putImageData(imageData, this.#ctx.canvas.width / 4, this.#ctx.canvas.height / 5);
    }

    drawBrilloFilter() { }
    drawBinarizacionFilter() { }
    drawSaturacionFilter() { }
    drawBordesFilter() { }
    drawBlurFilter() { }

}