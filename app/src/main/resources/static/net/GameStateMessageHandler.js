import MessageHandler from './MessageHandlerInterface.js';
import {Mediator} from '../mediator/Mediator.js'

const mediator = Mediator.getInstance();

export default class GameStateMessageHandler extends MessageHandler {
  handle(payload) {
    let strBoard = payload.board;
    let board = JSON.parse(strBoard);
    mediator.publish('onReceivedServerGameState', board)
    console.log("GameStateMessageHandler: ", board);
    // do something 
  }
}

