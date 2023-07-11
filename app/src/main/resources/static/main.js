import clientPlayer from './game/ClientPlayer/CreateClientPlayer.js'
import connectedPlayer from './game/ExtraPlayers/CreateSecondPlayer.js'
import {InputHandler} from './inputHandling/InputHandler.js'

//TODO Use WindowStateHandler to handle opening/closing of panes

let playerBoard = clientPlayer;

let clientInputHandler = new InputHandler(playerBoard);
clientInputHandler.bindHandlerToDocument(document);



document.getElementById("startsingleplayer").addEventListener("click", function() {
    document.querySelector("#clientplayer").classList.remove('hidden')
    hideStartScreen();
    hideMultiplayer();
});


document.getElementById("startmultiplayer").addEventListener("click", function() {
    document.querySelector("#clientplayer").classList.remove('hidden')
    document.querySelector("#onlineplayer").classList.remove('hidden')
    hideStartScreen();
});

function hideStartScreen(){
    document.querySelector("#startscreen").classList.add('hidden')
    document.querySelector("#backbutton").classList.remove('hidden')
}

function hideMultiplayer(){

}

function hideSingleplayer(){

}

document.querySelector("#backbutton").addEventListener('click', () => {
    document.querySelector("#clientplayer").classList.add('hidden')
    document.querySelector("#onlineplayer").classList.add('hidden')

    document.querySelector("#startscreen").classList.remove('hidden')
    document.querySelector("#backbutton").classList.add('hidden')
})