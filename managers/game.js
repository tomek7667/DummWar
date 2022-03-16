let Game = {
    map: [],
    players: {},
    height: null,
    width: null,
    maxScore: null,
    beginGame: function (height, width) {
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
    calculateScores: function () {
        this.clearScores();
        for (let column of this.map) {
            for (let cell of column) {
                if (cell.cellOwner) {
                    this.players[cell.cellOwner].score += 1;
                }
            }
        }
    },
    clearScores: function () {
        for (let player in this.players) {
           this.players[player].score = 0;
        }
    },
    getStatus: function () {
        this.calculateScores();
        let playersArray = [];
        for (let i = 0; i < Object.keys(this.players).length; i++) {
            playersArray.push(this.players[Object.keys(this.players)[i]]);
        }
        return {map: this.map, playersArray: playersArray, players: this.players, size: {width: this.width, height: this.height}};
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
