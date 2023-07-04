import clientPlayer from './game/ClientPlayer/CreateClientPlayer.js'
import connectedPlayer from './game/ExtraPlayers/CreateSecondPlayer.js'
import {InputHandler} from './inputHandling/InputHandler.js'

document.getElementById("startsingleplayer").addEventListener("click", function() {
    // Code to execute when the button is clicked
    console.log("Button clicked!");

    let playerBoard = clientPlayer;

    let clientInputHandler = new InputHandler(playerBoard);
    clientInputHandler.bindHandlerToDocument(document);

    playerBoard.show();
});