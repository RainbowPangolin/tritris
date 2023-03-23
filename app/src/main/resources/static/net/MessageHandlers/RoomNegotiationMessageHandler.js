import MessageHandler from './MessageHandlerInterface.js';
import {Mediator} from '../../mediator/Mediator.js'

const mediator = Mediator.getInstance();

export default class RoomNegotiationMessageHandler extends MessageHandler {
  handle(payload) {
    // mediator.publish('onSecondPlayerConnected', payload.id)

    mediator.publish('onNewPlayerConnected', payload.id)
    console.log("RoomNegotiationMessageHandler: ", payload.message);
    // do something 
  }
}

