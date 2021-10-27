

export default class Map {

    layers = [];

    constructor() {
        this.layers = document.querySelectorAll(".layer");
        this.layers[3].style.animation = "background 50s linear infinite";
    }

    setLayers(layers) {
        this.layers = layers;
    }

    startLayersAnimation() {
        this.layers[1].style.animation = "background 70s linear infinite";
        this.layers[2].style.animation = "background 120s linear infinite";
        this.layers[4].style.animation = "background 80s linear infinite";
        this.layers[5].style.animation = "background 40s linear infinite";
        this.layers[6].style.animation = "background 10s linear infinite";
        this.layers[7].style.animation = "background 10s linear infinite";
    }

    stop() {
        this.layers.forEach(layer => {
            if (layer != this.layers[3]) 
            layer.style.animationPlayState = "paused";
        });
    }

    generateRandomCoins() {
        
    }

}