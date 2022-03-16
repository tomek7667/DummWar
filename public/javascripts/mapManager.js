class MapManager {
    constructor(ctx) {
        this.ctx = ctx;
        this.size = {x: 10, y: 10};
        this.cellSize = {x: 8, y: 8};
        this.cellMargin = {x: 2, y: 2};

        this.shift = {x: 0, y: 0};
        this.scroll = 3.5;
        this.cells = null;
    }

    draw() {
        for (let y = 0; y < this.size.y; y++) {
            for (let x = 0; x < this.size.x; x++) {
                this.drawCell(this.cells[y][x]);
            }
        }
    }

    drawCell(cell) {
        let x = cell.x;
        let y = cell.y;
        this.ctx.fillStyle = cell.getColor();
        let realX = this.shift.x + (x * (this.cellSize.x * this.scroll + this.cellMargin.x * this.scroll) + this.cellMargin.x * this.scroll);
        let realY = this.shift.y + this.scroll * (y * (this.cellSize.y + this.cellMargin.y) + this.cellMargin.y);

        this.ctx.fillRect(realX, realY, this.cellSize.x * this.scroll, this.cellSize.y * this.scroll);
    }

    getCellUnderTheCursor() {
        return this.getCellOnThePoint(gameManager.mousePosition.x, gameManager.mousePosition.y);
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

export { Map };