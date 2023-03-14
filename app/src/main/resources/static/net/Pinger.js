import webSocketService from './webSocketService.js';

export function ping(id, message){
    const payload = { name: "ping!", id: id, message: message};
    const trisMessage = { messageType: "ping", rawMessage: payload}
    webSocketService.send(JSON.stringify(trisMessage));
}
