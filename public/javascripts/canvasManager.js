import { MapManager } from "./mapManager.js";
import { GameManager } from "./gameManager.js";

class CanvasManager {
    constructor() {
        console.log("Canvas constructor!");
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width  = 1200;
        this.canvas.height = 600;

        // this.canvas.addEventListener("click", () => {
        //     let clickedCell = this.map.getCellUnderTheCursor();
        //     if (clickedCell && !clickedCell.cellOwner) {
        //         socket.emit('occupyCell', clickedCell);
        //     } else if (clickedCell) {
        //         socket.emit('attackCell', clickedCell); // zrobić atak na komure;
        //     }
        // });

        // this.canvas.addEventListener("mousemove", (event) => {
        //     this.map.mousePosition.x = event.clientX;
        //     this.map.mousePosition.y = event.clientY;
        // });
    }

    update() {
        // if (map && players) {
        //     this.map.setMapData(map);
        //     this.map.setPlayersData(players);
        // }
    }

    draw() { // do naprawienia - michal nie umie programowac obiektowo
        if (!gameManager || !gameManager.isGameOpen) return;
        this.ctx.fillStyle = `blue`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        gameManager.map.draw(); // to nie dziala
    }
}

export { CanvasManager };