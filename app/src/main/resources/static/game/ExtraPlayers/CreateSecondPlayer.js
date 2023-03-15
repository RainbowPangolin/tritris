import {BareBoard} from './BareBoard.js'
import {Mediator} from '../../mediator/Mediator.js'


const mediator = Mediator.getInstance();

const testStrGrid = [
    [
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY"
    ],
    [
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY"
    ],
    [
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY"
    ],
    [
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY"
    ],
    [
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY"
    ],
    [
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY"
    ],
    [
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY"
    ],
    [
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY"
    ],
    [
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY"
    ],
    [
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY"
    ],
    [
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY"
    ],
    [
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY"
    ],
    [
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY"
    ],
    [
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY"
    ],
    [
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY"
    ],
    [
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY"
    ],
    [
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "orange",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY"
    ],
    [
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "orange",
        "orange",
        "orange",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY"
    ],
    [
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "aqua",
        "aqua",
        "aqua",
        "aqua",
        "EMPTY",
        "EMPTY",
        "EMPTY"
    ],
    [
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "red",
        "red",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY"
    ],
    [
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "blue",
        "red",
        "red",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY"
    ],
    [
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "blue",
        "blue",
        "blue",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY"
    ],
    [
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY",
        "EMPTY"
    ]
]

let secondBoard = new BareBoard({
    blockSize: 25,
    width: 10,
    height: 22,
    domDocument: document,
    player: 'TEST'
})

mediator.subscribe('onReceivedServerGameState', secondBoard, secondBoard.setGameStateGridFromSimple)
mediator.subscribe('onSecondPlayerConnected', secondBoard, secondBoard.setPlayerID)


export default secondBoard;

