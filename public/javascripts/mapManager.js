import {GameManager} from "./gameManager.js";
import {SpeechBubble} from "./speechBubble/speechBubble.js";

class MapManager {
    constructor(ctx) {
        this.ctx = ctx;
        this.size = {x: 10, y: 10};
        this.cellSize = {x: 8, y: 8};
        this.cellMargin = {x: 1, y: 1};

        this.shift = {x: 0, y: 0};
        this.scroll = 3.5;
        this.cells = null;

        document.getElementById('gameCanvas').addEventListener('wheel', (event) => {
            if (event.wheelDeltaY > 0) {
                this.scroll += 0.1;
            } else {
                this.scroll -= 0.1;
            }
        })

        window.addEventListener('keydown', (event) => {
           if (event.key === "W" || event.key === "w") {
               this.shift.y += 10;
           } else if (event.key === "A" || event.key === "a") {
               this.shift.x += 10;
           } else if (event.key === "S" || event.key === "s") {
               this.shift.y -= 10;
           } else if (event.key === "D" || event.key === "d") {
               this.shift.x -= 10;
           }
        });

        this.speechBubble = new SpeechBubble(GameManager.canvasManager.ctx);
    }

    draw() {
        for (let y = 0; y < this.size.y; y++) {
            for (let x = 0; x < this.size.x; x++) {
                this.drawCell(this.cells[y][x]);
            }
        }

        this.speechBubble.draw();
    }

    drawCell(cell) {
        let x = cell.x;
        let y = cell.y;
        this.ctx.fillStyle = cell.getColor();
        let realX = this.shift.x + (x * (this.cellSize.x * this.scroll + this.cellMargin.x * this.scroll) + this.cellMargin.x * this.scroll);
        let realY = this.shift.y + this.scroll * (y * (this.cellSize.y + this.cellMargin.y) + this.cellMargin.y);
        let realWidth = this.cellSize.x * this.scroll;
        let realHeight = this.cellSize.y * this.scroll;
        if (realX > GameManager.canvasManager.canvas.width || realX + realWidth < 0) return;
        if (realY > GameManager.canvasManager.canvas.height || realY + realHeight < 0) return;

        this.ctx.fillRect(realX, realY, realWidth, realHeight);
    }

    update() {
        if (this.getCellUnderTheCursor()) {
            console.log('a')
            this.speechBubble.isVisible = true;
        } else {
            this.speechBubble.isVisible = false;
        }

        this.speechBubble.update();
    }

    getCellUnderTheCursor() {
        return this.getCellOnThePoint(GameManager.mousePosition.x, GameManager.mousePosition.y);
    }

    getCellOnThePoint(pointX, pointY) {
        for (let y = 0; y < this.size.y; y++) {
            for (let x = 0; x < this.size.x; x++) {
                let realX = this.shift.x + (x * (this.cellSize.x * this.scroll + this.cellMargin.x * this.scroll) + this.cellMargin.x * this.scroll);
                let realY = this.shift.y + this.scroll * (y * (this.cellSize.y + this.cellMargin.y) + this.cellMargin.y);
                let realWidth = this.cellSize.x * this.scroll;
                let realHeight = this.cellSize.y * this.scroll;
                if (pointX >= realX && pointX <= realX + realWidth) {
                    if (pointY >= realY && pointY <= realY + realHeight) {
                        return this.cells[y][x];
                    }
                }
            }
        }
        return null;
    }

    getCellsAdjacent(cell) {
        let adjacentCells = [];
        for (let y = -1; y <= 1; y++) {
            for (let x = -1; x <= 1; x++) {
                if (cell.y + y >= this.size.y || cell.x + x >= this.size.x) {

                } else {
                    adjacentCells.push(this.cells[cell.y + y][cell.x + x]);
                }
            }
        }
        return adjacentCells;
    }

    isCellAdjacent(cellA, cellB) {
        return (Math.abs(cellA.x - cellB.x) <= 1) && (Math.abs(cellA.y - cellB.y) <= 1);
    }

}

export { MapManager };