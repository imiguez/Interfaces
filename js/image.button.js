export default class ImageButton {

    #ctx;
    #image;
    #canvas;
    #MAX_WIDTH = 1200;
    #MAX_HEIGHT = 500;
    #imgURL = document.getElementById('input-url-img').value;

    constructor(canvas, ctx) {
        this.#canvas = canvas;
        this.#ctx = ctx;
        document.getElementById('btn-setImage').onclick = () => this.showUrlInput();
        document.getElementById('btn-uploadImage').onclick = () => this.uploadImage();
        document.querySelector('.input-url-img-section').onmouseleave = () => this.showUrlInput();
    }

    showUrlInput() {
        document.querySelector('.input-url-img-section').classList.toggle('display-none');
    }

    uploadImage() {
        this.showUrlInput();
        this.#image = new Image();
        this.#imgURL = document.getElementById('input-url-img').value;
        this.#image.src = this.#imgURL;
        console.log(this.#imgURL)
        if (this.#imgURL == "") {
            this.showError("Invalid URL");
            return;
        }
        this.#image.onload = () => {
            let size = {
                width: this.#image.width,
                height: this.#image.height,
            }
            if (!this.isValidSize(size)) {
                this.showError("Invalid size");
                return;
            }
            this.#canvas.setCanvasSize(size);
            this.#ctx.drawImage(this.#image, 0, 0);
        }
        // document.getElementById('input-url-img').value = "";
    }

    getImage() {
        // this.#image = new Image();
        // this.#image.src = this.#imgURL;
        console.log(this.#image);
        return this.#image;
    }

    isValidSize(size) {
        return (
            size.width <= this.#MAX_WIDTH &&
            size.height <= this.#MAX_HEIGHT &&
            size.width > 0 &&
            size.height > 0
        );
    }

    showError(error) {
        alert(error);
    }

}