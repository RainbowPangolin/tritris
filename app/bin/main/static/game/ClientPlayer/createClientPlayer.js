import {BoardSession} from '../ClientPlayer/boardSession.js'
import {sendClientStateToServer} from '../../net/GameStateSender.js'


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
    player: generateRandomPlayerID()
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

export default playerBoard;