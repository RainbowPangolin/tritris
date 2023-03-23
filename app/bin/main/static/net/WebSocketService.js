// Create a WebSocket service object
import GameStateMessageHandler from './MessageHandlers/GameStateMessageHandler.js'
import RoomNegotiationMessageHandler from './MessageHandlers/RoomNegotiationMessageHandler.js'

let messageHandlers = new Map()
function initializeMessageHandlers(){
    const gameStateHandler = new GameStateMessageHandler();
    const roomNegotiationMessageHandler = new RoomNegotiationMessageHandler();
    messageHandlers.set("gamestate", gameStateHandler);
    messageHandlers.set("clientroomnegotiation", roomNegotiationMessageHandler);
}

class WebSocketService {
    constructor(url) {
        initializeMessageHandlers();
        this.socket = new WebSocket(url);

        this.socket.onopen = function(event) {
            console.log('WebSocket connection established, ' + JSON.stringify(event));
        };

        this.socket.onmessage = function(event) {
            //todo add try catch for messages of no type
            try {
                let messageJSON = JSON.parse(event.data);
                let messageType = messageJSON.messageType;
                let payload = messageJSON.rawMessage;
                let handler = messageHandlers.get(messageType);
                handler.handle(payload)
                console.log(`Received a ${messageType} message`);
            } catch (error) {
                console.log('Received message: ' + event.data);
                console.log('Not well formulated message: ' + error);
            }

        };

        this.socket.onerror = function(event) {
            console.error('WebSocket error: ' + JSON.stringify(event));
        };

        this.socket.onclose = function(event) {
            console.log('WebSocket connection closed: ' + event.code + ' - ' + event.reason);
        };
    }
    
    send(data) {
      this.socket.send(data);
    }

}

const localURL = 'ws://localhost:8080/game'

const webURL = 'ws://dangle-fourwide.azuremicroservices.io/game'

const webSocketService = new WebSocketService(webURL);
export default webSocketService;
  