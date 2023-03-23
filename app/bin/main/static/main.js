import clientPlayer from './game/ClientPlayer/CreateClientPlayer.js'
import connectedPlayer from './game/ExtraPlayers/CreateSecondPlayer.js'
import {InputHandler} from './inputHandling/InputHandler.js'
import {ping} from './net/Pinger.js'

let playerBoard = clientPlayer;

console.log(connectedPlayer)

// let pingATestButton = document.createElement('button')
// let pingBTestButton = document.createElement('button')

// pingATestButton.innerHTML = 'PINGA'
// pingATestButton.addEventListener('click', () => {
//     ping('A')
// })

// pingBTestButton.innerHTML = 'PINGB'
// pingBTestButton.addEventListener('click', () => {
//     ping('B')
// })

// document.body.appendChild(pingATestButton)
// document.body.appendChild(pingBTestButton)


let clientInputHandler = new InputHandler(playerBoard);
clientInputHandler.bindHandlerToDocument(document);
