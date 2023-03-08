const URL = "ws://localhost:8080/game"
const PROTOCOLS = ["json"]

let socket
let ID

function connectToServer(){
    // Create a WebSocket connection
    socket = new WebSocket(URL);

    // Wait for the connection to be established
    socket.onopen = function(event) {
    console.log('WebSocket connection established');
    };

    // Handle incoming messages from the server
    socket.onmessage = function(event) {
    console.log('Received message: ' + event.data);
    };

    // Handle errors
    socket.onerror = function(event) {
    console.error('WebSocket error: ' + event);
    };

    // Handle the connection being closed
    socket.onclose = function(event) {
    console.log('WebSocket connection closed: ' + event.code + ' - ' + event.reason);
    };
    
}

function ping(socket, id){
    const payload = { name: "ping!", id: id };
    const message = { messageType: "ping", payload: payload}
    socket.send(JSON.stringify(message));
}

let connectTestButton = document.createElement('button')
let pingATestButton = document.createElement('button')
let pingBTestButton = document.createElement('button')

connectTestButton.innerHTML = 'CONNECT TO ROOM'
connectTestButton.addEventListener('click', () => connectToServer())

pingATestButton.innerHTML = 'PINGA'
pingATestButton.addEventListener('click', () => {
    ping(socket, 'A')
})

pingBTestButton.innerHTML = 'PINGB'
pingBTestButton.addEventListener('click', () => {
    ping(socket, 'B')
})

document.body.appendChild(connectTestButton)
document.body.appendChild(pingATestButton)
document.body.appendChild(pingBTestButton)