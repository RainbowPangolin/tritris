import {BoardSession} from './boardSession.js'

let playerBoard = new BoardSession({
    width: 10,
    height: 22,
    domDocument: document,
    bagSystem: '7-bag'
})

playerBoard.startGame()

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
    }
    
})