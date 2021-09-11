export default class ImageButton {

    #ctx;
    #image;

    constructor(ctx) {
        this.#ctx = ctx;
        document.getElementById('btn-setImage').onclick = () => this.showUrlInput();
        document.getElementById('btn-uploadImage').onclick = () => this.uploadImage();
    }

    showUrlInput() {
        document.querySelector('.input-url-img-section').classList.toggle('display-none');
    }

    uploadImage() {
        this.showUrlInput();
        this.#image = new Image();
        this.#image.src = document.getElementById('input-url-img').value;
        this.#image.onload = () => {
            this.#ctx.drawImage(this.#image, this.#ctx.canvas.width / 4, this.#ctx.canvas.height / 5);
        }
        document.getElementById('input-url-img').value = "";
    }

    getImage() {
        this.#image = new Image();
        this.#image.src = "./img/tomandjerry.jpg";
        return this.#image;
    }

}