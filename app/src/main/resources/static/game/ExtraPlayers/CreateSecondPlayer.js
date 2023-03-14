import {BareBoard} from './BareBoard.js'
import {Block} from '../ClientPlayer/Block.js'

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

// const testGrid = testStrGrid.map((row, y) => {
//     return row.map(e => {
//       if (e === 'EMPTY') {
//         return 0;
//       } else {
//         let newBlock = new Block({
//         canvas: secondBoard.placedMinoBoardCanvas,
//         grid: secondBoard.gameStateGrid,
//         blockSize: secondBoard.blockSize,
//         positionOfCenterBlock: [0,0],
//         color: e
//         })
//         return newBlock;
//       }
//     });
//   });


const testGrid = testStrGrid.map((row, y) => {
return row.map((item, x) => {
    if (item === 'EMPTY') {
    return 0
    } else {
        let newBlock = new Block({
        canvas: secondBoard.placedMinoBoardCanvas,
        grid: secondBoard.gameStateGrid,
        blockSize: secondBoard.blockSize,
        positionOfCenterBlock: [y,x],
        color: item
        })
        return newBlock;
    }
});
});


secondBoard.setGameStateGrid(testGrid);

export default secondBoard;