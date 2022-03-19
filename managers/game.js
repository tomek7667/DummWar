let Game = {
    map: [],
    players: {},
    height: null,
    width: null,
    maxScore: null,
    gameNumber: null,
    endGame: function () {
        console.log(`Ending game with number: ${this.gameNumber}`);
        this.map = [];
        this.players = {};
    },
    beginGame: function (height, width) {
        this.gameNumber = Math.round(Math.random()*10000);
        console.log(`Starting game with number: ${this.gameNumber}`);
        this.height = height;
        this.width = width;
        for (let y = 0; y < height; y++) {
            this.map.push([]);
            for (let x = 0; x < width; x++) {
                this.map[y].push(new Cell(x,y));
            }
        }
        this.maxScore = this.height * this.width;
    },
    checkNicknameAvailability: function (nickname) {
        for (let socketId in this.players) {
            if (this.players[socketId].name == nickname) return false;
        }
        return true;
    },
    newPlayer: function (name, socketId) {
      this.players[socketId] = new Player(name, socketId);
    },
    removePlayer: function (socketId) {
        for (let column of this.map) {
            for (let cell of column) {
                if (cell.cellOwner === socketId) {
                    cell.cellOwner = null;
                }
            }
        }
        this.calculateScoreboard();
        delete this.players[socketId];
    },
    occupyCell: function (socketId, x, y) {
        if (!this.map[y][x].cellOwner) {
            if (this.players[socketId].soldiers === 0) {
                this.map[y][x].cellOwner = socketId;
                this.players[socketId].soldiers++;
            }
        }
    },
    calculateScoreboard: function () {
        this.clearScoreboard();
        for (let column of this.map) {
            for (let cell of column) {
                if (cell.cellOwner) {
                    this.players[cell.cellOwner].score += 1;
                }
            }
        }
    },
    calculateSoldiers: function () {
        for (let player in this.players) {
            let x = this.players[player].score/this.maxScore;
            let tempRatio = 1 + Math.pow((5 * x), 1/2);
            if (this.players[player].soldiers > this.maxScore * 100) continue;
            this.players[player].soldiers = Math.ceil(this.players[player].soldiers * tempRatio);
        }
    },
    clearScoreboard: function () {
        for (let player in this.players) {
           this.players[player].score = 0;
        }
    },
    getStatus: function () {
        this.calculateScoreboard();
        return {map: this.map, players: this.players, size: {width: this.width, height: this.height}};
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
    soldiers = 0;
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
