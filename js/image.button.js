export default class ImageButton {

    #canvas;
    #ctx;
    #image;
    #MAX_WIDTH = 1920;
    #MAX_HEIGHT = 1080;

    constructor(canvas, ctx) {
        this.#canvas = canvas;
        this.#ctx = ctx;
        document.getElementById("input-local-img").onchange = e => this.uploadImageFromInput(e);
    }

    uploadImageFromInput(e) {
        if (e.target.files) {
            let image = e.target.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onloadend = (e) => {
                var myImage = new Image();
                myImage.src = e.target.result;
                myImage.onload = () => {
                    let size = {
                        width: myImage.width,
                        height: myImage.height,
                    }
                    if (!this.isValidSize(size)) {
                        this.showError(`Imagen demasiado grande. (MAX = ${this.#MAX_WIDTH} x ${this.#MAX_HEIGHT})`);
                        return;
                    }
                    this.#canvas.setCanvasSize(size);
                    this.#ctx.drawImage(myImage, 0, 0);
                }
            }
        }
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