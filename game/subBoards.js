import {BoardSession} from './boardSession.js'

//TODO- Not sure I need to have this inheritance hierarchy, might just call straight from BoardSession
export class GameBoardSession extends BoardSession {
    constructor({width, height, domDocument, bagSystem}){
        super({width, height, domDocument, bagSystem})


    } 
    //emit event for piece being placed?
    //TODO Scoring
}

export class PreviewSquare extends BoardSession {
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