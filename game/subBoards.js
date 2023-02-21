import {Board} from './board.js'


export class GameBoard extends Board {
    constructor({width, height, domDocument, bagSystem}){
        super({width, height, domDocument, bagSystem})
        this.debugCanvas.classList.add('debugCanvas')
        this.placedMinoBoardCanvas.classList.add('placedMinoCanvas')
        this.activeMinoBoardCanvas.classList.add('activeMinoCanvas')

    } 
    //emit event for piece being placed?
    //TODO Scoring
}

export class PreviewSquare extends Board {
    constructor(width, height){ //TODO allow for single argument to determine square length
        super(width, height)
        this.canvas.classList.add('previewSquare')
        // delete this.debugCanvas
    }
    showPiece(shape){
        this?.curPiece?.erase()
        this.addPiece(shape, [2,1], false) //Location is ???
    }
}