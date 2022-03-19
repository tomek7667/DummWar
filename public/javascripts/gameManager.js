import {CanvasManager} from "./canvasManager.js";
import {MapCell} from "./mapCell.js";
import {MapManager} from './mapManager.js';
import {Player} from './player.js';

class GameManager {
    static init() {
        console.log("GameManager constructor!");
        GameManager.canvasManager = new CanvasManager();
        GameManager.map = new MapManager(GameManager.canvasManager.ctx);

        GameManager.isGameOpen = false;
        GameManager.gameData = {
            players: null,
            cells: null
        }

        GameManager.mousePosition = {x: 0, y: 0};

        GameManager.canvasManager.canvas.addEventListener("click", () => {
            let clickedCell = GameManager.map.getCellUnderTheCursor();
            if (clickedCell && !clickedCell.cellOwner) {
                socket.emit('occupyCell', clickedCell);
            } else if (clickedCell) {
                socket.emit('attackCell', clickedCell); // zrobić atak na komure;
            }
        });

        GameManager.canvasManager.canvas.addEventListener("mousemove", (event) => {
            GameManager.mousePosition.x = event.clientX;
            GameManager.mousePosition.y = event.clientY;
        });
    }

    static clearGameData() {
        GameManager.gameData = {
            players: [],
            cells: []
        }
    }

    static updateGameData() {
        if (globalGameData) {
            GameManager.clearGameData();
            GameManager.isGameOpen = true;

            GameManager.map.size = {
                x: globalGameData.size.width,
                y: globalGameData.size.height
            }

            for (let i in globalGameData.players) {
                let newPlayer = new Player();
                newPlayer.setId(globalGameData.players[i].socketId);
                newPlayer.setScore(globalGameData.players[i].score);
                newPlayer.setColor(globalGameData.players[i].color);
                newPlayer.setSoldiers(globalGameData.players[i].soldiers);
                newPlayer.setName(globalGameData.players[i].name);
                GameManager.gameData.players.push(newPlayer);
            }

            for (let y = 0; y < globalGameData.size.height; y++) {
                GameManager.gameData.cells[y] = [];
                for (let x = 0; x < globalGameData.size.width; x++) {
                    let newCell = new MapCell(x, y);
                    let cellOwner = GameManager.getPlayerById(globalGameData.map[y][x].cellOwner);
                    newCell.setOwner(cellOwner);
                    GameManager.gameData.cells[y][x] = newCell;
                }
            }

            GameManager.map.cells = GameManager.gameData.cells;

            // console.log(GameManager.gameData)
        }
    }

    static getPlayerById(id) {
        for (let i = 0; i < GameManager.gameData.players.length; i++) {
            if (GameManager.gameData.players[i].id === id) {
                // console.log("Found player:")
                // console.log(GameManager.gameData.players[i]);
                return GameManager.gameData.players[i];
            }
        }
        return null;
    }

    static update() {
        GameManager.updateGameData();
        if (!GameManager.isGameOpen) return;
        GameManager.canvasManager.update();
    }

    static draw() {
        if (!GameManager.isGameOpen) return;
        GameManager.canvasManager.draw();
    }
}

export { GameManager };