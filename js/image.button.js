export default class ImageButton {

    #ctx;
    #image;

    constructor(ctx) {
        this.#ctx = ctx;
        document.getElementById('btn-setImage').onclick = () => this.uploadImage();
    }

    uploadImage() {
        this.#image = new Image();
        this.#image.src = "./img/tomandjerry.jpg";
        this.#image.onload = () => {
            this.#ctx.drawImage(this.#image, this.#ctx.canvas.width / 4, this.#ctx.canvas.height / 5);
        }
    }

    getImage() {
        this.#image = new Image();
        this.#image.src = "./img/tomandjerry.jpg";
        return this.#image;
    }

}