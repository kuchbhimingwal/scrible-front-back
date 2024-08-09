import express from 'express'
import { WebSocketServer, WebSocket } from 'ws'
import { GameManager } from './GameManger';

const app = express()
const httpServer = app.listen(8080)

const wss = new WebSocketServer({ server: httpServer });

const gameManager = new GameManager();


wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  gameManager.addUsers(ws)

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