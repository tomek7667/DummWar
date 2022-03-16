import {CanvasManager} from "./canvasManager.js";
import {MapCell} from "./mapCell.js";
import {MapManager} from './mapManager.js';

class GameManager {
    constructor() {
        console.log("GameManager constructor!");
        this.canvasManager = new CanvasManager();
        this.map = new MapManager(this.canvasManager.ctx);

        this.isGameOpen = false;
        this.gameData = {
            players: null,
            cells: null
        }

        this.mousePosition = {x: 0, y: 0};

        this.canvasManager.canvas.addEventListener("click", () => {
            let clickedCell = this.map.getCellUnderTheCursor();
            if (clickedCell && !clickedCell.cellOwner) {
                socket.emit('occupyCell', clickedCell);
            } else if (clickedCell) {
                socket.emit('attackCell', clickedCell); // zrobić atak na komure;
            }
        });

        this.canvasManager.canvas.addEventListener("mousemove", (event) => {
            this.mousePosition.x = event.clientX;
            this.mousePosition.y = event.clientY;
        });
    }

    clearGameData() {
        this.gameData = {
            players: [],
            cells: []
        }
    }

    updateGameData() {
        if (globalGameData) {
            this.clearGameData();
            this.isGameOpen = true;

            for (let i = 0; i < globalGameData.players.length; i++) {
                let newPlayer = new Player();
                newPlayer.setId(globalGameData.players[i].socketId);
                newPlayer.setScore(globalGameData.players[i].score);
                newPlayer.setColor(globalGameData.players[i].color);
                newPlayer.setSoldiers(globalGameData.players[i].soldiers);
                newPlayer.setName(globalGameData.players[i].name);
                this.gameData.players.push(newPlayer);
            }

            for (let y = 0; y < globalGameData.size.height; y++) {
                this.gameData.cells[y].push([]);
                for (let x = 0; x < globalGameData.size.width; x++) {
                    this.gameData.cells[y][x] = new MapCell(x, y);
                }
            }
        }
    }

    update() {
        this.updateGameData();
        if (!this.isGameOpen) return;
        this.canvasManager.update();
    }

    draw() {
        if (!this.isGameOpen) return;
        this.canvasManager.draw();
    }
}

export { GameManager };