class MapCell {
    constructor(x, y) {
        this.owner = null;
        this.x = x;
        this.y = y;
    }

    getOwner(player) {
        return this.owner;
    }

    setOwner(player) {
        this.owner = player;
    }

    getColor() {
        if (!this.owner) return "gray";
        else {
            return this.owner.color;
        }
    }
}

export { MapCell };