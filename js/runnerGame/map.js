

export default class Map {

    layers = [];
    animations = [];

    constructor() {
    }

    setLayers(mapLayers) {
        if (this.layers.length > 0) {
            for (let i = 0; i < this.layers.length; i++) {
                this.layers[i].remove();
            }
            this.animations = [];
        }
        for (let i = 0; i < mapLayers.length; i++) {
            this.layers[i] = document.createElement("div");
            this.layers[i].setAttribute("class", "layer");
            if (mapLayers[i].src.includes("plant")) {
                this.layers[i].setAttribute("id", "layer-plant");
            }
            this.layers[i].style.backgroundImage = "url('"+mapLayers[i].src+"')";
            this.animations[i] = mapLayers[i].animation;
            console.log(this.animations[i]);
            // this.layers[i].style.animation = mapLayers[i].animation;
            document.body.insertBefore(this.layers[i], document.getElementById("menu"));
        }

    }

    startLayersAnimation() {
        for (let i = 0; i < this.layers.length; i++) {
            this.layers[i].style.animation = this.animations[i];
        }
        // this.layers[1].style.animation = "background 70s linear infinite";
        // this.layers[2].style.animation = "background 120s linear infinite";
        // this.layers[4].style.animation = "background 80s linear infinite";
        // this.layers[5].style.animation = "background 40s linear infinite";
        // this.layers[6].style.animation = "background 10s linear infinite";
        // this.layers[7].style.animation = "background 10s linear infinite";
    }

    stop() {
        this.layers.forEach(layer => {
            // if (layer != this.layers[3]) 
            layer.style.animationPlayState = "paused";
        });
    }


}