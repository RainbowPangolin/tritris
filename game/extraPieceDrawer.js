import {Piece} from './piece.js'
const FOUR_GRID = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]

// This is a very hacky solution to drawing the previews and holds. I might want to consider redoing the drawing system.

export class ExtraPieceDrawer{
    constructor(){
        //Does nothing, I might not want to use a class for this.    
    }
    setShapeToDisplayHeld(piece){
        //TODO How bad is it that this relies on another class populating the field?
        let curCanvas = this.availableCanvases['heldPieceCanvas']
        //TODO Maybe rewrite the drawing system so I don't have do keep instantiating new classes if it becomes a major performance bottleneck
        //--But it probably won't become a major bottleneck so I'll ignore it for now.
        this.clearCanvas(curCanvas)
        let heldPiece = new Piece({
            shape: piece,
            activeCanvas: curCanvas,
            gameStateGrid: FOUR_GRID,
            blockSize: this.previewBlockSize,
            positionOfCenterBlock: [1,1],
            orientation: 0,
            shadowEnabled: false,
            availableCanvases: [curCanvas],
            spawnPoint: [1,1]
        })

        heldPiece.performAction('SPAWN')
    }

    setNewPreviewsTo(arrayOfPieces){
        arrayOfPieces.forEach((shape, index) => {
            let curCanvas = this.availableCanvases['previewCanvasList'][index] 
            this.clearCanvas(curCanvas)
            let queuePiece = new Piece({
                shape: shape,
                activeCanvas: curCanvas,
                gameStateGrid: FOUR_GRID,
                blockSize: this.previewBlockSize,
                positionOfCenterBlock: [1,1],
                orientation: 0,
                shadowEnabled: false,
                availableCanvases: [curCanvas],
                spawnPoint: [1,1]
            })
            queuePiece.performAction('SPAWN')
        })
    }

    clearCanvas(canvas){
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

}