import clientPlayer from './game/ClientPlayer/CreateClientPlayer.js'
import connectedPlayer from './game/ExtraPlayers/CreateSecondPlayer.js'
import {InputHandler} from './inputHandling/InputHandler.js'
import {ping} from './net/Pinger.js'

let playerBoard = clientPlayer;

console.log(connectedPlayer)

let pingATestButton = document.createElement('button')
let pingBTestButton = document.createElement('button')

pingATestButton.innerHTML = 'PINGA'
pingATestButton.addEventListener('click', () => {
    ping('A')
})

pingBTestButton.innerHTML = 'PINGB'
pingBTestButton.addEventListener('click', () => {
    ping('B')
})

document.body.appendChild(pingATestButton)
document.body.appendChild(pingBTestButton)


let clientInputHandler = new InputHandler(playerBoard);
clientInputHandler.bindHandlerToDocument(document);


// document.addEventListener("keydown", (event) => {
//     switch(event.key){
//         case 'k':
//             playerBoard.receiveInput('MOVEDOWN')
//             break
//         case 'l':
//             playerBoard.receiveInput('MOVERIGHT')
//             break
//         case 'j':
//             playerBoard.receiveInput('MOVELEFT')
//             break        
//         case 'a':
//             playerBoard.receiveInput('ROTATELEFT')
//             break
//         case 'd':
//             playerBoard.receiveInput('ROTATERIGHT')
//             break
//         case 'w':
//             playerBoard.receiveInput('ROTATE180')
//             break
//         case 'i':
//             playerBoard.receiveInput('HOLD')
//             break
//         case ' ':
//             playerBoard.receiveInput('HARDDROP')
//             break
//         case 't':
//             playerBoard.receiveInput('START')
//             break   
//         case 'y':
//             playerBoard.receiveInput('END')
//             break 
//         case 'r':
//             playerBoard.receiveInput('RESTART')
//             break                   

//     }
    
// })