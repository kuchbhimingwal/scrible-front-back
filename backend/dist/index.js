"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const GameManger_1 = require("./GameManger");
const app = (0, express_1.default)();
const httpServer = app.listen(8080);
const wss = new ws_1.WebSocketServer({ server: httpServer });
const gameManager = new GameManger_1.GameManager();
wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
    gameManager.addUsers(ws);
    // ws.send('Hello! Message From Server!!');
});
// const message = JSON.parse(data);
// if (message.type === 'sender') {
//   console.log("sender assigned");
//   senderSocket = ws;
// } else if (message.type === 'receiver') {
//   console.log("receiver assigned");
//   receiverSocket = ws;
// } else if (message.type === 'createLine') {
//   if (ws !== senderSocket) {
//     return;
//   }
//   receiverSocket?.send(JSON.stringify({ type: 'createLine', sdp: message.sdp }));
// }
