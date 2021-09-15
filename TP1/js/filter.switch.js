export default class FilterSwitch {

    #ctx;
    #canvas;
    #filter;

    constructor(ctx, canvas) {
        this.#ctx = ctx;
        this.#canvas = canvas;
        document.getElementById('filter-select').onchange = () => this.setFilter();
    }

    setFilter() {
        let defOption = document.getElementById('default-option');
        switch (document.getElementById('filter-select').value) {
            case "sepia": this.drawSepiaFilter(); break;
            case "negativo": this.drawNegativoFilter(); break;
            case "brillo": this.drawBrightFilter(20); break;
            case "binarizacion": this.drawBinarizationFilter(); break;
            case "saturacion": this.drawSaturacionFilter(); break;
            case "escala-grises": this.drawGreyScaleFilter(); break;
            case "bordes-sobel": this.drawSobelBorderFilter(); break;
            case "bordes-horizontal-blanco": this.drawWhiteHorizontalBorderFilter(); break;
            case "bordes-horizontal-negro": this.drawHorizontalBorderFilter(); break;
            case "bordes-vertical-blanco": this.drawWhiteVerticalBorderFilter(); break;
            case "bordes-vertical-negro": this.drawVerticalBorderFilter(); break;
            case "blur": this.drawBlurFilter(); break;
        }
        defOption.selected = "selected";
        defOption.textContent = this.#filter;
    }

    drawSepiaFilter() {
        let imageData = this.#ctx.getImageData(0, 0, this.#canvas.width, this.#canvas.height);
        for (let x = 0; x <= imageData.width; x++) {
            for (let y = 0; y <= imageData.height; y++) {
                let r = this.getRed(imageData, x, y);
                let g = this.getGreen(imageData, x, y);
                let b = this.getBlue(imageData, x, y);
                this.setPixel(imageData, x, y,
                    (r * .393) + (g * .769) + (b * .189), // Valores basados en línea de comando FFMPEG del filtro mezclador de canales para filtro sepia (.393: .769: .189: 0: .349: .686: .168: 0: .272: .534: .131)
                    (r * .349) + (g * .686) + (b * .168),
                    (r * .272) + (g * .534) + (b * .131)
                );
            }
        }
        this.#ctx.putImageData(imageData, 0, 0);
        this.#filter = "Sepia";
    }

    drawNegativoFilter() {
        let imageData = this.#ctx.getImageData(0, 0, this.#canvas.width, this.#canvas.height);
        for (let x = 0; x <= imageData.width; x++) {
            for (let y = 0; y <= imageData.height; y++) {
                let r = this.getRed(imageData, x, y);
                let g = this.getGreen(imageData, x, y);
                let b = this.getBlue(imageData, x, y);
                this.setPixel(imageData, x, y, 255 - r, 255 - g, 255 - b); // Se invierten los valores de rgb en cada iteración (cambia el color por el complementario)
            }
        }
        this.#ctx.putImageData(imageData, 0, 0);
        this.#filter = "Negativo";
    }

    drawBrightFilter(bright = 0) { // En un futuro puede ser dinamico
        let imageData = this.#ctx.getImageData(0, 0, this.#canvas.width, this.#canvas.height);
        for (let x = 0; x <= imageData.width; x++) {
            for (let y = 0; y <= imageData.height; y++) {
                /*let hsb = this.RGBToHSB(this.getRed(imageData, x, y), this.getGreen(imageData, x, y), this.getBlue(imageData, x, y))
                hsb[2] += bright;
                let rgb = this.HSBToRGB(hsb[0], hsb[1], hsb[2]);
                this.setPixel(imageData, x, y, rgb[0], rgb[1], rgb[2]);*/
                // Les agrego bright a los valores rgb para que se acerquen más al blanco y por ende haga un efecto de brillo
                // En el caso de que bright sea negativo el efecto seria inverso, oscureceria la imagen
                let r = this.getRed(imageData, x, y) + bright;
                let g = this.getGreen(imageData, x, y) + bright;
                let b = this.getBlue(imageData, x, y) + bright;
                this.setPixel(imageData, x, y, r, g, b);
            }
        }
        this.#ctx.putImageData(imageData, 0, 0);
        this.#filter = "Brillo";
    }

    drawGreyScaleFilter() {
        let imageData = this.#ctx.getImageData(0, 0, this.#canvas.width, this.#canvas.height);
        for (let x = 0; x <= imageData.width; x++) {
            for (let y = 0; y <= imageData.height; y++) {
                let r = this.getRed(imageData, x, y);
                let g = this.getGreen(imageData, x, y);
                let b = this.getBlue(imageData, x, y);
                let avg = Math.round((r + g + b) / 3);
                // Seteo el valor de r, g y b en su promedio ya que al ser todos el mismo valor la imagen queda gris
                this.setPixel(imageData, x, y, avg, avg, avg);
            }
        }
        this.#ctx.putImageData(imageData, 0, 0);
        this.#filter = "Escala de grises";
    }

    drawSaturacionFilter() {
        let imageData = this.#ctx.getImageData(0, 0, this.#canvas.width, this.#canvas.height);
        for (let x = 0; x <= imageData.width; x++) {
            for (let y = 0; y <= imageData.height; y++) {
                let r = this.getRed(imageData, x, y);
                let g = this.getGreen(imageData, x, y);
                let b = this.getBlue(imageData, x, y);
                // Aumento la cantidad de cada pixel 
                this.setPixel(imageData, x, y, 
                    Math.round(r + r - 100),
                    Math.round(g + g - 100),
                    Math.round(b + b - 100)
                );
            }
        }
        this.#ctx.putImageData(imageData, 0, 0);
        this.#filter = "Saturación";
    }

    drawBinarizationFilter() {
        let imageData = this.#ctx.getImageData(0, 0, this.#canvas.width, this.#canvas.height);
        for (let x = 0; x <= imageData.width; x++) {
            for (let y = 0; y <= imageData.height; y++) {
                let r = this.getRed(imageData, x, y);
                let g = this.getGreen(imageData, x, y);
                let b = this.getBlue(imageData, x, y);
                let avg = Math.round((r + g + b) / 3); // Calculo el promedio de los valores rgb
                let rgbValue = 0;
                if (avg > 255 / 2) // Si es mayor a la mitad de 255 se seteara en blanco, sino es negro
                    rgbValue = 255;
                this.setPixel(imageData, x, y, rgbValue, rgbValue, rgbValue);
            }
        }
        this.#ctx.putImageData(imageData, 0, 0);
        this.#filter = "Binarización";
    }

    drawHorizontalAndVerticalBorderFilter(mat) { // Se le puede mandar una matriz horizontal o vertical
        this.drawGreyScaleFilter(); // Lo paso primero a escala de grises para que quede un mejor resultado
        let originImgData = this.#ctx.getImageData(0, 0, this.#canvas.width, this.#canvas.height); // ImageData original que no modificaremos
        let finalImgData = this.#ctx.getImageData(0, 0, this.#canvas.width, this.#canvas.height); // ImageData en el que haremos modificaciones
        for (let x = 0; x <= originImgData.width; x++) {
            for (let y = 0; y <= originImgData.height; y++) {
                let sumRGB = this.getSumOfRGBFromNeighborPixels(originImgData, x, y, mat); // Obtengo la suma de los valores rgb de los pixeles vecinos
                this.setPixel(finalImgData, x, y, sumRGB[0], sumRGB[1], sumRGB[2], 255); // Seteo el pixel con la suma de los valores rgb de los pixeles vecinos
            }
        }
        this.#ctx.putImageData(finalImgData, 0, 0);
    }

    drawSobelBorderFilter() {
        let matHorizontal = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]];
        let matVertical = [[-1, -2, -1], [0, 0, 0], [1, 2, 1]];
        this.drawGreyScaleFilter(); // Lo paso primero a escala de grises para que quede un mejor resultado
        let originImgData = this.#ctx.getImageData(0, 0, this.#canvas.width, this.#canvas.height);
        let finalImgData = this.#ctx.getImageData(0, 0, this.#canvas.width, this.#canvas.height);
        for (let x = 0; x <= originImgData.width; x++) {
            for (let y = 0; y <= originImgData.height; y++) {
                let sumRGBHorizontal = this.getSumOfRGBFromNeighborPixels(originImgData, x, y, matHorizontal); // ImageData original que no modificaremos
                let sumRGBVertical = this.getSumOfRGBFromNeighborPixels(originImgData, x, y, matVertical); // ImageData en el que haremos modificaciones
                // R = raiz cuadrada(resultado de r de la matriz horizontal al cuadrado    +    resultado de r de la matriz vertical al cuadrado)
                let r = Math.sqrt(Math.pow(sumRGBHorizontal[0], 2) + Math.pow(sumRGBVertical[0], 2)); // Calculo la funcion anterior para r
                let g = Math.sqrt(Math.pow(sumRGBHorizontal[1], 2) + Math.pow(sumRGBVertical[1], 2)); // Calculo la funcion anterior para g
                let b = Math.sqrt(Math.pow(sumRGBHorizontal[2], 2) + Math.pow(sumRGBVertical[2], 2)); // Calculo la funcion anterior para b
                this.setPixel(finalImgData, x, y, r, g, b, 255);
            }
        }
        this.#ctx.putImageData(finalImgData, 0, 0);
        this.drawNegativoFilter(); // Lo invierto para que quede en blanco y no en negro
        this.#filter = "Borde Sobel";
    }

    getSumOfRGBFromNeighborPixels(originImgData, x, y, mat) {
        let sumR = 0;
        let sumG = 0;
        let sumB = 0;
        let sumCount = 0; // Contador de sumas hechas para saber por cuanto divir el resultado en caso de que se necesite el promedio
        if (y - 1 >= 0 && x + 1 <= originImgData.width) { //Arriba a la derecha
            //Multiplica valor de arriba a la derecha de la mat con los valores del pixel de arriba a la derecha
            sumR += mat[0][2] * this.getRed(originImgData, x + 1, y - 1);//a1*a2
            sumG += mat[0][2] * this.getGreen(originImgData, x + 1, y - 1);//a1*a2
            sumB += mat[0][2] * this.getBlue(originImgData, x + 1, y - 1);//a1*a2
            sumCount++;
        }
        if (x + 1 <= originImgData.width) { //A la derecha
            //Multiplica valor de la derecha de la mat con los valores del pixel de la derecha
            sumR += mat[1][2] * this.getRed(originImgData, x + 1, y);//b1*b2
            sumG += mat[1][2] * this.getGreen(originImgData, x + 1, y);//b1*b2
            sumB += mat[1][2] * this.getBlue(originImgData, x + 1, y);//b1*b2
            sumCount++;
        }
        if (y + 1 <= originImgData.height && x + 1 <= originImgData.width) { //Abajo a la derecha
            //Multiplica valor de abajo a la derecha de la mat con los valores del pixel de abajo a de la derecha
            sumR += mat[2][2] * this.getRed(originImgData, x + 1, y + 1);//c1*c2
            sumG += mat[2][2] * this.getGreen(originImgData, x + 1, y + 1);//c1*c2
            sumB += mat[2][2] * this.getBlue(originImgData, x + 1, y + 1);//c1*c2
            sumCount++;
        }
        if (y + 1 <= originImgData.height) { //Abajo
            //Multiplica valor de abajo de la mat con los valores del pixel de abajo
            sumR += mat[2][1] * this.getRed(originImgData, x, y + 1);//d1*d2
            sumG += mat[2][1] * this.getGreen(originImgData, x, y + 1);//d1*d2
            sumB += mat[2][1] * this.getBlue(originImgData, x, y + 1);//d1*d2
            sumCount++;
        }
        if (y + 1 <= originImgData.height && x - 1 >= 0) { //Abajo a la izquierda
            //Multiplica valor de abajo a la izquierda de la mat con los valores del pixel de abajo a la izquierda
            sumR += mat[2][0] * this.getRed(originImgData, x - 1, y + 1);//e1*e2
            sumG += mat[2][0] * this.getGreen(originImgData, x - 1, y + 1);//e1*e2
            sumB += mat[2][0] * this.getBlue(originImgData, x - 1, y + 1);//e1*e2
            sumCount++;
        }
        if (x - 1 >= 0) { //A la izquierda
            //Multiplica valor de la izquierda de la mat con los valores del pixel de la izquierda
            sumR += mat[1][0] * this.getRed(originImgData, x - 1, y);//f1*f2
            sumG += mat[1][0] * this.getGreen(originImgData, x - 1, y);//f1*f2
            sumB += mat[1][0] * this.getBlue(originImgData, x - 1, y);//f1*f2
            sumCount++;
        }
        if (y - 1 >= 0 && x - 1 >= 0) { //Arriba a la izquierda
            //Multiplica valor de arriba a la izquierda de la mat con los valores del pixel de arriba a la izquierda
            sumR += mat[0][0] * this.getRed(originImgData, x - 1, y - 1);//g1*g2
            sumG += mat[0][0] * this.getGreen(originImgData, x - 1, y - 1);//g1*g2
            sumB += mat[0][0] * this.getBlue(originImgData, x - 1, y - 1);//g1*g2
            sumCount++;
        }
        if (y - 1 >= 0) { //Arriba
            //Multiplica valor de arriba de la mat con los valores del pixel de arriba
            sumR += mat[0][1] * this.getRed(originImgData, x, y - 1);//h1*h2
            sumG += mat[0][1] * this.getGreen(originImgData, x, y - 1);//h1*h2
            sumB += mat[0][1] * this.getBlue(originImgData, x, y - 1);//h1*h2
            sumCount++;
        }
        return new Array(sumR, sumG, sumB, sumCount); // Retorna un arreglo con el resultado de las sumas de los valores RGB
    }

    drawHorizontalBorderFilter() {
        let matHorizontal = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]];
        this.drawHorizontalAndVerticalBorderFilter(matHorizontal);
        this.#filter = "Borde Horizontal Negro";
    }

    drawWhiteHorizontalBorderFilter() {
        this.drawHorizontalBorderFilter();
        this.drawNegativoFilter();
        this.#filter = "Borde Horizontal Blanco";
    }

    drawWhiteVerticalBorderFilter() {
        this.drawVerticalBorderFilter();
        this.drawNegativoFilter();
        this.#filter = "Borde Vertical Blanco";
    }

    drawVerticalBorderFilter() {
        let matVertical = [[-1, -2, -1], [0, 0, 0], [1, 2, 1]];
        this.drawHorizontalAndVerticalBorderFilter(matVertical);
        this.#filter = "Borde Vertical Negro";
    }

    drawBlurFilter() {
        let mat = [[1, 1, 1], [1, 1, 1], [1, 1, 1]];
        let originImgData = this.#ctx.getImageData(0, 0, this.#canvas.width, this.#canvas.height); // ImageData original que no modificaremos
        let finalImgData = this.#ctx.getImageData(0, 0, this.#canvas.width, this.#canvas.height); // ImageData en el que haremos modificaciones
        for (let x = 0; x < originImgData.width; x++) {
            for (let y = 0; y < originImgData.height; y++) {
                let sumRGB = this.getSumOfRGBFromNeighborPixels(originImgData, x, y, mat); // Obtengo la suma de los valores rgb de los pixeles vecinos
                let neighbors = sumRGB[3]; // Obtiene la cantidad de pixeles vecinos que se tuvieron en cuenta
                // Seteo los pixeles con el promedio de los valores rgb de los pixeles vecinos
                this.setPixel(finalImgData, x, y, sumRGB[0] / neighbors, sumRGB[1] / neighbors, sumRGB[2] / neighbors, 255);
            }
        }
        this.#ctx.putImageData(finalImgData, 0, 0);
        this.#filter = "Desenfoque Gaussiano";
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
        imageData.data[index + 0] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
        imageData.data[index + 3] = a;
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