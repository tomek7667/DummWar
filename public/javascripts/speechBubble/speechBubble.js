import {GameManager} from "../gameManager.js";

class SpeechBubble {
    constructor(ctx) {
        this.ctx = ctx;
        this.width = 160;
        this.height = 50;

        this.data = {
            cellX: 0,
            cellY: 0,
            text: ""
        }
        this.isVisible = false;
    }

    setData() {

    }

    update() {

    }

    draw() {
        if (!this.isVisible) return;
        this.ctx.fillStyle = "orange";
        this.ctx.fillRect(GameManager.mousePosition.x, GameManager.mousePosition.y, this.width, this.height);
    }
}

export { SpeechBubble };