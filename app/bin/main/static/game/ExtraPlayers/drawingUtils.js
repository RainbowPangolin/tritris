import {Block} from '../ClientPlayer/Block.js'


export function drawPlacedMinoBoard({canvas, blockGrid} = {}){
    clear(canvas);
    for (let line of blockGrid){
        for(let tile of line){
            if(tile instanceof Block){
                tile.draw()
            }
        }
    }
}

export function drawActivePiece({canvas, piece} = {}){
    clear(canvas);
    piece.draw()
}


function clear(canvas){
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}