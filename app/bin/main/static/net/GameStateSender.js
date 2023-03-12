import webSocketService from './webSocketService.js';

export function sendClientStateToServer(id, board){
    const payload = {playerID: id, board: board};
    const trisMessage = { messageType: "clientgamestate", rawMessage: payload}
    webSocketService.send(JSON.stringify(trisMessage));
}
