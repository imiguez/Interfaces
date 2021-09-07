export default class ImageButton {

    #ctx;
    #image;

    constructor(ctx) {
        this.#ctx = ctx;
        document.getElementById('btn-setImage').onclick = () => this.uploadImage();
    }

    uploadImage() {
        this.#image = new Image();
        this.#image.src = "https://i.pinimg.com/originals/02/8f/a3/028fa3fc63d343a6f349c46ea339d5b8.jpg";
        this.#image.onload = () => {
            this.#ctx.drawImage(this.#image, 0, 0);
        }
    }

}