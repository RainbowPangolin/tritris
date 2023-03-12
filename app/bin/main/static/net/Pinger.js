import webSocketService from './webSocketService.js';

export function ping(id, message){
    const payload = { name: "ping!", id: id, message: message};
    const trisMessage = { messageType: "ping", rawMessage: payload}
    webSocketService.send(JSON.stringify(trisMessage));
}

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