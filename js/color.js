export default class Color {

    #color;

    constructor() {
        document.getElementById('btn-color').onchange = () => this.setColor(document.getElementById('btn-color').value);
    }

    // investigar cómo obtener el parámetro alpha
    setColor(colorHex) {
        colorHex.charAt(0) === '#' ? colorHex = colorHex.substr(1) : '';
        (colorHex.length < 2) || (colorHex.length > 6) ? '' : '';
        let values = colorHex.split('');
        let r, g, b;
        if (colorHex.length === 2) {
            r = parseInt(values[0].toString() + values[1].toString(), 16);
            g = r;
            b = r;
        } else if (colorHex.length === 3) {
            r = parseInt(values[0].toString() + values[0].toString(), 16);
            g = parseInt(values[1].toString() + values[1].toString(), 16);
            b = parseInt(values[2].toString() + values[2].toString(), 16);
        } else if (colorHex.length === 6) {
            r = parseInt(values[0].toString() + values[1].toString(), 16);
            g = parseInt(values[2].toString() + values[3].toString(), 16);
            b = parseInt(values[4].toString() + values[5].toString(), 16);
        }
        this.#color = {
            hex: '#' + colorHex,
            rgb: { r, g, b }
        };
        console.log(this.#color);
    }

    getColor() {
        return this.#color;
    }

}