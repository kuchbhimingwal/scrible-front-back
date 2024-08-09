"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const Game_1 = require("./Game");
class GameManager {
    constructor() {
        this.games = [];
        this.pendingUsers = [];
        this.users = [];
    }
    addUsers(socket) {
        this.users.push(socket);
        this.handlUser(socket);
    }
    handlUser(socket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            if (message.type == "INIT_GAME") {
                if (this.pendingUsers.length === 4) {
                    this.pendingUsers.push(socket);
                    const game = new Game_1.Game(this.pendingUsers);
                    this.games.push(game);
                    this.pendingUsers = [];
                }
                else {
                    // console.log("games runnig", this.games.length);
                    this.pendingUsers.push(socket);
                }
            }
            if (message.type === "GUESS") {
                // console.log("inside guess")
                const game = this.games.find(game => game.players[0] === socket || game.players[1] === socket || game.players[2] === socket || game.players[3] === socket || game.players[4] === socket);
                if (game) {
                    game.guess(socket, message.payload.guess);
                }
            }
            if (message.type === "DRAW_LINES") {
                const game = this.games.find(game => game.players[0] === socket || game.players[1] === socket || game.players[2] === socket || game.players[3] === socket || game.players[4] === socket);
                if (game) {
                    game.draw(socket, message.payload);
                }
            }
        });
    }
}
exports.GameManager = GameManager;
