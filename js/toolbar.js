import SaveButton from './save.button.js';

export default class ToolBar {

    #toolBar;

    constructor(canvas) {
        this.#toolBar = document.querySelector('.toolbar-section');
        this.#toolBar.classList.add('motion-slide-out');
        this.#toolBar.onmouseenter = () => {
            this.#toolBar.classList.remove('motion-slide-out');
            this.#toolBar.classList.add('motion-slide-in');
        }
        this.#toolBar.onmouseleave = () => {
            this.#toolBar.classList.remove('motion-slide-in');
            this.#toolBar.classList.add('motion-slide-out');
        }
        new SaveButton(canvas);
    }

}