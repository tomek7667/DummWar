let Game = {
    map: [],
    players: {},
    beginGame: function (height, width) {
        for (let y = 0; y < height; y++) {
            this.map.push([]);
            for (let x = 0; x < width; x++) {
                this.map[y].push(new Cell(x,y));
            }
        }
    },
    newPlayer: function (name, socketId) {
      this.players[socketId] = new Player(name, socketId);
    },
    removePlayer: function (socketId) {
        delete this.players[socketId];
    },
    endGame: function () {
        this.map = [];
        this.players = {};
    },
    occupyCell: function (nickname, x, y) {
        if (!this.map[y][x].cellOwner) {
            this.map[y][x].cellOwner = nickname;
        }
    },
    getStatus: function () {
        return {map: this.map, players: this.players};
    }
}

class Cell {
    cellOwner = null;
    constructor (x, y) {
        this.x = x;
        this.y = y;
    }
}

class Player {
    score = 0;
    soldiers = 100;
    constructor(name, socketId) {
        this.name = name;
        this.socketId = socketId;
        this.color = getRandomColor();
    }
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

module.exports.Game = Game;
