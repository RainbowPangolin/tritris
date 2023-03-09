//Contains a 2d matrix of each piece in each orientation
export const PIECES = {
    'J': [
        //position 1
        [[1, 0, 0],
         [1, 1, 1],
         [0, 0, 0],], 
        //position 2
        [[0, 1, 1],
         [0, 1, 0],
         [0, 1, 0],], 
        //position 3
        [[0, 0, 0],
         [1, 1, 1],
         [0, 0, 1],], 
        //position 4
        [[0, 1, 0],
         [0, 1, 0],
         [1, 1, 0],], 
    ],
    'L': [
        //position 1
        [[0, 0, 1],
         [1, 1, 1],
         [0, 0, 0],], 
        //position 2
        [[0, 1, 0],
         [0, 1, 0],
         [0, 1, 1],], 
        //position 3
        [[0, 0, 0],
         [1, 1, 1],
         [1, 0, 0],], 
        //position 4
        [[1, 1, 0],
         [0, 1, 0],
         [0, 1, 0],], 
    ],
    'S': [
        //position 1
        [[0, 1, 1],
         [1, 1, 0],
         [0, 0, 0],], 
        //position 2
        [[0, 1, 0],
         [0, 1, 1],
         [0, 0, 1],], 
        //position 3
        [[0, 0, 0],
         [0, 1, 1],
         [1, 1, 0],], 
        //position 4
        [[1, 0, 0],
         [1, 1, 0],
         [0, 1, 0],], 
    ],
    'Z': [
        //position 1
        [[1, 1, 0],
         [0, 1, 1],
         [0, 0, 0],], 
        //position 2
        [[0, 0, 1],
         [0, 1, 1],
         [0, 1, 0],], 
        //position 3
        [[0, 0, 0],
         [1, 1, 0],
         [0, 1, 1],], 
        //position 4
        [[0, 1, 0],
         [1, 1, 0],
         [1, 0, 0],], 
    ],
    'T': [
        //position 1
        [[0, 1, 0],
         [1, 1, 1],
         [0, 0, 0],], 
        //position 2
        [[0, 1, 0],
         [0, 1, 1],
         [0, 1, 0],], 
        //position 3
        [[0, 0, 0],
         [1, 1, 1],
         [0, 1, 0],], 
        //position 4
        [[0, 1, 0],
         [1, 1, 0],
         [0, 1, 0],], 
    ],
    'I': [
        //position 1
        [[0, 0, 0, 0],
         [1, 1, 1, 1],
         [0, 0, 0, 0],
         [0, 0, 0, 0],], 
        //position 2
        [[0, 0, 1, 0],
         [0, 0, 1, 0],
         [0, 0, 1, 0],
         [0, 0, 1, 0],], 
        //position 3
        [[0, 0, 0, 0],
         [0, 0, 0, 0],
         [1, 1, 1, 1],
         [0, 0, 0, 0],], 
        //position 4
        [[0, 1, 0, 0],
         [0, 1, 0, 0],
         [0, 1, 0, 0],
         [0, 1, 0, 0],], 
    ],
    'O': [
        //position 1
        [[0, 1, 1, 0],
         [0, 1, 1, 0],
         [0, 0, 0, 0],
         [0, 0, 0, 0],],
        //position 2
        [[0, 1, 1, 0],
         [0, 1, 1, 0],
         [0, 0, 0, 0],
         [0, 0, 0, 0],],
        //position 3
        [[0, 1, 1, 0],
         [0, 1, 1, 0],
         [0, 0, 0, 0],
         [0, 0, 0, 0],],
        //position 4
        [[0, 1, 1, 0],
         [0, 1, 1, 0],
         [0, 0, 0, 0],
         [0, 0, 0, 0],],  
    ]
}

export const PIECE_COLOR_MAP = {
    "J": 'blue',
    "L": 'orange',
    "S": 'limegreen',
    "Z": 'red',
    "T": 'magenta',
    "I": 'aqua',
    "O": 'yellow'
}

let u, v 
export const KICK_TABLE = {
    //see Tetris Guideline SRS kick data table https://tetris.fandom.com/wiki/SRS
    //180 kicks based on TETR.IO kick table
    // https://pbs.twimg.com/media/EaWH8QgXgAArDEV?format=png&name=large
    'L': (v = {
        '0,1': [[0, -1], [-1, -1], [2, 0], [2, -1]],
        '1,0': [[0, 1], [1, 1], [-2, 0], [-2,1]],
        '1,2': [[0,1], [1, 1], [-2,0], [-2,1]],
        '2,1': [[0,-1], [-1, -1], [2,0], [2,-1]],
        '2,3': [[0,1], [-1,1], [2,0], [2,1]],
        '3,2': [[0,-1], [1,-1], [-2,0], [-2,-1]],
        '3,0': [[0,-1], [1,-1], [-2,0], [-2,-1]],
        '0,3': [[0,1], [-1,1], [2,0], [2, 1]],
        '0,2': [[-1, 0], [-1,1], [1,1], [0,1], [0,-1],],
        '2,0': [[1,0], [1, -1], [1, 1], [0, -1], [0,1]],
        '1,3': [[0, 1], [-2, 1], [-1, 1], [-2, 0], [-1,0]],
        '3,1': [[0, -1], [-2, -1], [-1,-1], [-2, 0], [-1,0]],

        
    }),
    'J': v,
    'S': v,
    'Z': v,
    'T': v,
    '3L': v,
    'I': (u = {
        '0,1': [[0, -2], [0, 1], [1, -2], [-2,1]],
        '1,0': [[0, 2], [0, -1], [-1,2], [2,-1]],
        '1,2': [[0, -1], [0, 2], [-2,-1], [1,2]],
        '2,1': [[0,1], [0, -2], [2,1], [-1,-2]],
        '2,3': [[0,2], [0, -1], [-1,2], [2,-1]],
        '3,2': [[0,-2], [0, 1], [1,-2], [2,1]],
        '3,0': [[0,1], [0, -2], [2,1], [-1,-2]],
        '0,3': [[0,-1], [0, 2], [-2,-1], [1,2]],
        '0,2': [[0, 0]],
        '2,0': [[0, 0]],
        '1,3': [[0, 0]],
        '3,1': [[0, 0]],
    }),
    '3I': u,
    'O': {
        '0,1': [[0, 0]],
        '1,0': [[0, 0]],
        '1,2': [[0, 0]],
        '2,1': [[0, 0]],
        '2,3': [[0, 0]],
        '3,2': [[0, 0]],
        '3,0': [[0, 0]],
        '0,3': [[0, 0]],
        '0,2': [[0, 0]],
        '2,0': [[0, 0]],
        '1,3': [[0, 0]],
        '3,1': [[0, 0]],
    },

}

export const PIECE_ACTIONS = new Set()
let pieceActionsArray = [
    'MOVELEFT', 
    'MOVERIGHT',
    'MOVEDOWN',
    'HARDDROP',
    'ROTATELEFT',
    'ROTATERIGHT',
    'ROTATE180',
    'HOLD',
    'SPAWN',
]
pieceActionsArray.forEach( (action) => {
    PIECE_ACTIONS.add(action)
})

export const MISC_ACTIONS = new Set()
let miscActionsArray = [
    'START',
    'END',
    'RESTART'
]
miscActionsArray.forEach( (action) => {
    MISC_ACTIONS.add(action)
})