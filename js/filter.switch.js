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
            case "brillo": this.drawBrightFilter(20); break; // ignacio
            case "binarizacion": this.drawBinarizationFilter(); break; // ignacio

            case "saturacion": this.drawSaturacionFilter(); break; // gaspar
            case "bordes": this.drawBordesFilter(); break; // ignacio
            case "blur": this.drawBlurFilter(); break;
        }
    }

    drawSepiaFilter() {
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

            pixels[i * 4] = (r * .393) + (g * .769) + (b * .189);
            pixels[i * 4 + 1] = (r * .349) + (g * .686) + (b * .168);
            pixels[i * 4 + 2] = (r * .272) + (g * .534) + (b * .131);
        }
        this.#ctx.putImageData(imageData, this.#ctx.canvas.width / 4, this.#ctx.canvas.height / 5);
    }
    
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
    
    drawBrightFilter(bright = 0) { // En un futuro puede ser dinamico
        let imageData = this.#ctx.getImageData(this.#ctx.canvas.width / 4, this.#ctx.canvas.height / 5, this.#image.width, this.#image.height);
        for (let x = 1; x <= imageData.width; x++) {
            for (let y = 1; y <= imageData.height; y++) {
                let hsb = this.RGBToHSB(this.getRed(imageData, x, y), this.getGreen(imageData, x, y), this.getBlue(imageData, x, y))
                hsb[2] += bright;
                let rgb = this.HSBToRGB(hsb[0], hsb[1], hsb[2]);
                this.setPixel(imageData, x, y, rgb[0], rgb[1], rgb[2]);
            }
        }
        this.#ctx.putImageData(imageData, this.#ctx.canvas.width / 4, this.#ctx.canvas.height / 5);
    }

    drawBinarizationFilter() {
        let imageData = this.#ctx.getImageData(this.#ctx.canvas.width / 4, this.#ctx.canvas.height / 5, this.#image.width, this.#image.height);
        for (let x = 1; x <= imageData.width; x++) {
            for (let y = 1; y <= imageData.height; y++) {
                let r = this.getRed(imageData, x, y);
                let g = this.getGreen(imageData, x, y);
                let b = this.getBlue(imageData, x, y);
                let avg = Math.round((r + g + b)/3);
                let rgbValue = 0;
                if (avg > 255/2)
                    rgbValue = 255;
                this.setPixel(imageData, x, y, rgbValue, rgbValue, rgbValue);
            }
        }
        this.#ctx.putImageData(imageData, this.#ctx.canvas.width / 4, this.#ctx.canvas.height / 5);
    }
    drawSaturacionFilter() { }
    drawBordesFilter() { }
    
    drawBlurFilter() {
        /* Box blur (image)
        {
            Declare newImage as a copy of the image;
            For each pixel (x, y) on the image do:
            {
                // Kernel would not fit!
                If x < 1 or y < 1 or x + 1 == width or y + 1 == height
                Continue;
                // Set P to the average of 9 pixels:
                X X X
                X P X
                X X X
                // Calculate average.
                Sum = image[x - 1, y + 1] + // Top left
                image[x + 0, y + 1] + // Top center
                image[x + 1, y + 1] + // Top right
                image[x - 1, y + 0] + // Mid left
                image[x + 0, y + 0] + // Current pixel
                image[x + 1, y + 0] + // Mid right
                image[x - 1, y - 1] + // Low left
                image[x + 0, y - 1] + // Low center
                image[x + 1, y - 1];  // Low right
                
                newImage[x, y] = Sum / 9;
            }
            Return newImage;
        } */
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

    setPixel(imageData, x, y, r, g, b, a = 255) {
        let index = (x + y * imageData.width) * 4;
        imageData.data[index+0] = r;
        imageData.data[index+1] = g;
        imageData.data[index+2] = b;
        imageData.data[index+3] = a;
    }
    
    RGBToHSB = (r, g, b) => {
        r /= 255;
        g /= 255;
        b /= 255;
        const v = Math.max(r, g, b),
        n = v - Math.min(r, g, b);
        const h =
        n === 0 ? 0 : n && v === r ? (g - b) / n : v === g ? 2 + (b - r) / n : 4 + (r - g) / n;
        return [60 * (h < 0 ? h + 6 : h), v && (n / v) * 100, v * 100];
    };
    
    HSBToRGB = (h, s, b) => {
        s /= 100;
        b /= 100;
        const k = (n) => (n + h / 60) % 6;
        const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
        return [255 * f(5), 255 * f(3), 255 * f(1)];
    };
}