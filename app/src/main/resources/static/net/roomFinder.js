import webSocketService from './webSocketService.js';


function connectToRoom(roomID){
    const playerInfo = {name: 'playerName', id: 'playerID', roomID: roomID}
    const trisMessage = { messageType: "roomnegotiation", rawMessage: playerInfo}
    webSocketService.send(JSON.stringify(trisMessage));
}

function ping(id){
    const payload = { name: "ping!", id: id };
    const trisMessage = { messageType: "ping", rawMessage: payload}
    webSocketService.send(JSON.stringify(trisMessage));
}

let connectTestButton = document.createElement('button')
let pingATestButton = document.createElement('button')
let pingBTestButton = document.createElement('button')

connectTestButton.innerHTML = 'CONNECT TO ROOM'
connectTestButton.addEventListener('click', () => connectToRoom('TEST'))

pingATestButton.innerHTML = 'PINGA'
pingATestButton.addEventListener('click', () => {
    ping('A')
})

pingBTestButton.innerHTML = 'PINGB'
pingBTestButton.addEventListener('click', () => {
    ping('B')
})

document.body.appendChild(connectTestButton)
document.body.appendChild(pingATestButton)
document.body.appendChild(pingBTestButton)
