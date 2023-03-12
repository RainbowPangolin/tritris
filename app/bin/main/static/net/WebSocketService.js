// Create a WebSocket service object
class WebSocketService {
    constructor(url) {
        this.socket = new WebSocket(url);

        this.socket.onopen = function(event) {
            console.log('WebSocket connection established, ' + JSON.stringify(event));
        };

        this.socket.onmessage = function(event) {
            console.log('Received message: ' + event.data);
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
  
const webSocketService = new WebSocketService('ws://localhost:8080/game');
export default webSocketService;
  