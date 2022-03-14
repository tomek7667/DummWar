class Map {
    constructor(ctx) {
        this.ctx = ctx;
        this.size = {x: 10, y: 10};
        this.cellSize = {x: 8, y: 8};
        this.cellMargin = {x: 2, y: 2};

        this.shift = {x: 0, y: 0};
        this.scroll = 3.5;
        this.map = null;
    }

    setMap(map) {
        this.map = map;
    }

    update() {
        if (!this.map) return;
    }

    draw() {
        if (!this.map) return;
        for (let x = 0; x < this.size.x; x++) {
            for (let y = 0; y < this.size.y; y++) {
                let cellData;
                if (!this.map[y][x].cellOwner) {
                    cellData = {color: "gray"};
                } else {
                    cellData = {color: this.map[y][x].cellOwner};
                }
                this.drawCell(x, y, cellData);
            }
        }
    }

    drawCell(x, y, cellData) {
        this.ctx.fillStyle = cellData.color;
        let realX = this.shift.x + (x * (this.cellSize.x * this.scroll + this.cellMargin.x * this.scroll) + this.cellMargin.x * this.scroll);
        let realY = this.shift.y + this.scroll * (y * (this.cellSize.y + this.cellMargin.y) + this.cellMargin.y);

        this.ctx.fillRect(realX, realY, this.cellSize.x * this.scroll, this.cellSize.y * this.scroll);
    }
}

export { Map };