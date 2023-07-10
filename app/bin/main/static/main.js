import clientPlayer from './game/ClientPlayer/CreateClientPlayer.js'
import connectedPlayer from './game/ExtraPlayers/CreateSecondPlayer.js'
import {InputHandler} from './inputHandling/InputHandler.js'

document.getElementById("startsingleplayer").addEventListener("click", function() {
let playerBoard = clientPlayer;

    let clientInputHandler = new InputHandler(playerBoard);
    clientInputHandler.bindHandlerToDocument(document);

    playerBoard.show();
    connectedPlayer.hide();
    hideStartScreen();
    hideMultiplayer();
});


document.getElementById("startmultiplayer").addEventListener("click", function() {
    let playerBoard = clientPlayer;

let clientInputHandler = new InputHandler(playerBoard);
clientInputHandler.bindHandlerToDocument(document);

    playerBoard.show();
    connectedPlayer.show();

    hideStartScreen();
    hideSingleplayer();
});

function hideStartScreen(){

}

function hideMultiplayer(){

}

function hideSingleplayer(){

}