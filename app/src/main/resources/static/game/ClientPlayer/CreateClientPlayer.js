import webSocketService from '../../net/WebSocketService.js';
import {BoardSession} from './BoardSession.js'
import {sendClientStateToServer} from '../../net/MessageHandlers/GameStateSender.js'


function generateRandomPlayerID() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    for ( let i = 0; i < 4; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

let playerBoard = new BoardSession({
    width: 10,
    height: 22,
    domDocument: document,
    bagSystem: '7-bag',
    playerID: generateRandomPlayerID()
})

playerBoard.addEventListener('onStartGameEvent', () => {
    console.log('game started')
})

playerBoard.addEventListener('sendClientUpdateToServer', () => {
    sendClientUpdateToServer();
})

function sendClientUpdateToServer(){
    const simplifiedGameStateGrid = playerBoard.gameStateGrid.map(row =>
        row.map(block => (typeof block === 'object' ? block.color : 'EMPTY'))
      );
    sendClientStateToServer(playerBoard.playerID, simplifiedGameStateGrid);
}

function connectToRoom(name, id, roomID){
    const playerInfo = {name: name, id: id, roomID: roomID}
    const trisMessage = { messageType: "roomnegotiation", rawMessage: playerInfo}
    webSocketService.send(JSON.stringify(trisMessage));
}

let connectTestButton = document.createElement('button')

connectTestButton.innerHTML = 'CONNECT TO ROOM'
connectTestButton.addEventListener('click', () => connectToRoom(playerBoard.playerName, playerBoard.playerID, 'TEST'))

document.body.appendChild(connectTestButton)




export default playerBoard;