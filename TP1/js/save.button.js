export default class SaveButton {

    #canvas;

    constructor(canvas) {
        this.#canvas = canvas;
        document.getElementById('btn-save').onclick = () => this.saveImage();
    }

    saveImage() {
        let link = window.document.createElement('a');
        let url = this.#canvas.toDataURL();
        let filename = 'image.jpg';

        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        window.document.body.appendChild(link);
        link.click();
        window.document.body.removeChild(link);
    }

}