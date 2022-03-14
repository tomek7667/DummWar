import { Map } from "./map.js";

class Canvas {
    constructor() {
        console.log("Canvas constructor!");
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width  = 1200;
        this.canvas.height = 600;

        this.map = new Map(this.ctx);
    }

    update() {
        if (map) {
            this.map.setMap(map);
        }
    }

    draw() {
        this.ctx.fillStyle = `blue`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.map.draw();
    }
}

export { Canvas };