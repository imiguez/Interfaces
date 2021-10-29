

export default class Object {

    objectContainer;
    object;
    sprite;
    width;
    height;
    top;
    right;
    canFloat;
    backgroundSize;
    character = document.getElementById("character-container");
    isCollectable;
    game;
    name = "";

    constructor(img, w, h, t, r, float, backgroundSize, collectable = false, name, game) {
        this.sprite = img;
        this.width = w;
        this.height = h;
        this.top = t;
        this.right = r;
        this.canFloat = float;
        this.object = document.createElement("div");
        this.objectContainer = document.createElement("div");
        this.backgroundSize = backgroundSize;
        this.isCollectable = collectable;
        this.name = name;
        this.game = game;
        this.createObject();
    }

    createObject() {
        if (this.canFloat) // Si puede flotar se calcula un valor random para top a partir del valor que se le da en el constructor
            this.top = (this.top * (Math.floor(Math.random() * 4) + 7)); // numero random entre 7 y 10, top = 40
        this.object.style.width = this.width+"px";
        this.object.style.height = this.height+"px";
        this.object.style.backgroundImage = "url('"+this.sprite+"')";
        this.object.style.backgroundSize = this.backgroundSize;
        this.objectContainer.style.width = this.width+"px";
        this.objectContainer.style.height = this.height+"px";
        this.objectContainer.style.position = "absolute";
        this.objectContainer.style.right = this.right+"px";
        this.objectContainer.style.top = this.top+"px";
        this.objectContainer.appendChild(this.object);
        document.body.insertBefore(this.objectContainer, this.character);
    }

    playAnimation(animationObject, animationContainer = null) {
        setInterval(() => {
            if (this.game.getFinished()) {
                this.objectContainer.style.animationPlayState = "paused";
            }
            if (this.isCollidingWithTheCharacter()) {
                if (this.isCollectable) {
                    this.game.addObjectCollectable(this.name);
                } else {
                    this.game.removeLife();
                }
                this.objectContainer.style.display = "none";
            }
        }, 10);
        this.object.style.animation = animationObject;
        if (animationContainer != null) 
            this.objectContainer.style.animation = animationContainer;
    }

    isCollidingWithTheCharacter() {
        let charLeft = this.character.offsetLeft;
        let charWidth = this.character.offsetWidth;
        if ((this.objectContainer.offsetLeft >= charLeft && this.objectContainer.offsetLeft <= charLeft + charWidth)
          || this.objectContainer.offsetLeft+this.objectContainer.offsetWidth >= charLeft && this.objectContainer.offsetLeft+this.objectContainer.offsetWidth <= charLeft + charWidth) {
            let charTop = this.character.offsetTop;
            let charHeight = this.character.offsetHeight;
            if (this.objectContainer.offsetTop <= charTop+charHeight &&
                 this.objectContainer.offsetTop+this.objectContainer.offsetHeight >= charTop) {
                return true;
            }
        }
        return false;
    }

}