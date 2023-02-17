import {Piece} from './piece.js'

export class Board {
    constructor(width = 9, height = 22){ // playable board is only up to 18. buffer above for new pieces, buffer below for floor
        const BLOCK_SIZE = 25
        this.blockSize = BLOCK_SIZE
        let canvas = document.createElement("canvas");
        let debugCanvas = document.createElement("canvas");
        // debugCanvas.classList.add('debug')
        // canvas.classList.add('mainBoard')
        canvas.width = BLOCK_SIZE*width //TODO make size modular
        canvas.height = BLOCK_SIZE*height        
        debugCanvas.width = BLOCK_SIZE*width 
        debugCanvas.height = BLOCK_SIZE*height 
        this.debugCanvas = debugCanvas
        this.canvas = canvas
        this.gravity = 1

        document.body.append(canvas) //TODO Return this canvas object instead of attaching to document in constructor
        document.body.append(debugCanvas)
        // this.mode = mode

        //create internal representaion of game state
        let grid = []
        for (let i = 0; i < height; i++){
            let innerGrid = []
            for( let j = 0; j < width; j++){
                innerGrid.push(0)
            }
            grid.push(innerGrid)
        }
        let floorArr = []
        for (let i = 0; i < width; i++){
            floorArr.push(1)
        }
        grid.push(floorArr)
        this.grid = grid
    }

    changeGravity(gravity){
        this.gravity = gravity
    }
    
    addPiece(shape, location = [2, 4], shadowEnabled = false){
        let curPiece = new Piece(shape, this.canvas, this.grid, this.blockSize, location, 0, shadowEnabled, this.debugCanvas, {'debugCanvas': this.debugCanvas})
        this.curPiece = curPiece
        this.curPiece.update('NONE')
    }

    update(action = 'MOVEDOWN'){
        this.curPiece.update(action)
        if(action == 'HARDDROP'){ //TODO These if statements are inelegant
            this.addPiece(this.nextPiece())
        } else if (action == 'HOLD'){
            
        }
    }

    nextPiece(curShape = this.curPiece.shape){
        //TODO- Offer different bag types
        if (curShape == 'L'){
            return 'I'
        } else if (curShape == 'I'){
            return 'L'
        }
    }

    blockDropped(){
        if(!this.curPiece.isActive){
            return true
        }
        return false
    }


    

}
