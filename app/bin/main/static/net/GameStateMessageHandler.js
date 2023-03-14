import MessageHandler from './MessageHandlerInterface.js';

export default class GameStateMessageHandler extends MessageHandler {
  handle(payload) {
    let strBoard = payload.board;
    let board = JSON.parse(strBoard);
    console.log("GameStateMessageHandler: ", board);
    // do something 
  }
}

