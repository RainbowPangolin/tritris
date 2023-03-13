import {BoardSession} from './game/boardSession.js'
import {sendClientStateToServer} from './net/GameStateSender.js'

let playerBoard = new BoardSession({
    width: 10,
    height: 22,
    domDocument: document,
    bagSystem: '7-bag'
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
    sendClientStateToServer(playerBoard.player, simplifiedGameStateGrid);
}

document.addEventListener("keydown", (event) => {
    switch(event.key){
        case 'k':
            playerBoard.receiveInput('MOVEDOWN')
            break
        case 'l':
            playerBoard.receiveInput('MOVERIGHT')
            break
        case 'j':
            playerBoard.receiveInput('MOVELEFT')
            break        
        case 'a':
            playerBoard.receiveInput('ROTATELEFT')
            break
        case 'd':
            playerBoard.receiveInput('ROTATERIGHT')
            break
        case 'w':
            playerBoard.receiveInput('ROTATE180')
            break
        case 'i':
            playerBoard.receiveInput('HOLD')
            break
        case ' ':
            playerBoard.receiveInput('HARDDROP')
            break
        case 't':
            playerBoard.receiveInput('START')
            break   
        case 'y':
            playerBoard.receiveInput('END')
            break 
        case 'r':
            playerBoard.receiveInput('RESTART')
            break                   

    }
    
})