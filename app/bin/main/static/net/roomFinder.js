import webSocketService from './webSocketService.js';


function connectToRoom(roomID){
    const playerInfo = {name: 'playerName', id: 'playerID', roomID: roomID}
    const trisMessage = { messageType: "roomnegotiation", rawMessage: playerInfo}
    webSocketService.send(JSON.stringify(trisMessage));
}

let connectTestButton = document.createElement('button')

connectTestButton.innerHTML = 'CONNECT TO ROOM'
connectTestButton.addEventListener('click', () => connectToRoom('TEST'))

document.body.appendChild(connectTestButton)

