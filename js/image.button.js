export default class ImageButton {

    #canvas;
    #ctx;
    #image;
    #MAX_WIDTH = 1200;
    #MAX_HEIGHT = 500;
    #imgURL = document.getElementById('input-url-img').value;

    constructor(canvas, ctx) {
        this.#canvas = canvas;
        this.#ctx = ctx;
        document.getElementById('btn-setImage').onclick = () => this.showUrlInput();
        document.getElementById('btn-uploadImage').onclick = () => this.uploadImage();
        document.querySelector('.input-url-img-section').onmouseleave = () => this.showUrlInput();
        document.getElementById("input-local-img").onchange = (e) => this.uploadImageFromInput(e);
    }

    uploadImageFromInput(e) {
        if(e.target.files) {
            let image = e.target.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onloadend = (e) => {
                var myImage = new Image();
                myImage.src = e.target.result; 
                myImage.onload =() => {
                    let size = {
                        width: myImage.width,
                        height: myImage.height,
                    }
                    if (!this.isValidSize(size)) {
                        this.showError("Invalid size");
                        return;
                    }
                    this.#canvas.setCanvasSize(size);
                    this.#ctx.drawImage(myImage, 0, 0);
                }
            }
        }
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