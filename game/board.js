import {Piece} from './piece.js'
import {generateNewBagUsing} from './bagSystem.js'

const DEFAULT_BLOCK_SIZE = 25

export class Board {
    constructor({
        width = 9, 
        height = 22, 
        domDocument = null,  
        bagSystem = '7-bag',
        gravity = 1,
        shadowEnabled = true,
        previewSize = 5,
        shapeQueue = []
    } = {}){ 
        Object.assign(this, {width, height, domDocument, bagSystem, gravity, shadowEnabled, previewSize, shapeQueue})
        this.createGameStateGrid()
        this.initializeGameSettings()
        this.initializeCanvasDisplay()
        this.addRequiredBags()
    }

    createGameStateGrid(){
        let gameStateGrid = []
        for (let i = 0; i < this.height; i++){
            let innerGrid = []
            for( let j = 0; j < this.width; j++){
                innerGrid.push(0)
            }
            gameStateGrid.push(innerGrid)
        }
        let floorArr = []
        for (let i = 0; i < this.width; i++){
            floorArr.push(1)
        }
        gameStateGrid.push(floorArr)
        this.gameStateGrid = gameStateGrid
    }

    initializeGameSettings(){
        //does nothing?
    }

    initializeCanvasDisplay(){
        this.blockSize = DEFAULT_BLOCK_SIZE
        let minoBoardCanvas = this.domDocument.createElement("canvas");
        let debugCanvas = this.domDocument.createElement("canvas");
        debugCanvas.classList.add('debug')
        minoBoardCanvas.classList.add('mainBoard')
        minoBoardCanvas.width = DEFAULT_BLOCK_SIZE*this.width //TODO make size modular
        minoBoardCanvas.height = DEFAULT_BLOCK_SIZE*this.height        
        debugCanvas.width = DEFAULT_BLOCK_SIZE*this.width 
        debugCanvas.height = DEFAULT_BLOCK_SIZE*this.height 
        this.debugCanvas = debugCanvas
        this.minoBoardCanvas = minoBoardCanvas

        this.domDocument.body.append(minoBoardCanvas) 
        this.domDocument.body.append(debugCanvas)
    }

    addRequiredBags(){
        while(this.previewSize > this.shapeQueue.length){
            let newBag = this.getNewBag()
            this.shapeQueue.push(...newBag)
        }
    }

    getNewBag(){
        return generateNewBagUsing(this.bagSystem)
    }

    startGame(){
        this.insertNewPieceWithShapeAndLocation(this.getUpcomingShape())
        this.removeUpcomingPieceFromQueue()
    }

    changeGravity(gravity){
        this.gravity = gravity
    }
    
    insertNewPieceWithShapeAndLocation(shape, location = [2, 4]){
        let activePiece = new Piece({
            shape: shape, 
            minoBoardCanvas: this.minoBoardCanvas, 
            debugCanvas: this.debugCanvas,
            gameStateGrid: this.gameStateGrid, 
            blockSize: this.blockSize, 
            positionOfCenterBlock: location, 
            orientation: 0, 
            shadowEnabled: this.shadowEnabled,  
        })
        this.activePiece = activePiece
        this.activePiece.performAction('SPAWN')
    }

    receiveInput(action = 'MOVEDOWN'){
        this.activePiece.performAction(action)
        if(action == 'HARDDROP'){ //TODO These if statements are inelegant, and more functionality is down in Piece.js
            this.placePiece()
        } else if (action == 'HOLD'){
            //TODO
        }
    }

    placePiece(){
        this.insertNewPieceWithShapeAndLocation(this.getUpcomingShape())
        this.removeUpcomingPieceFromQueue()
    }

    holdPiece(){
        //For hold (i.e. swap) functionality
    }

    removeUpcomingPieceFromQueue(stepsAhead = 0){
        this.shapeQueue.shift() //...
        this.addRequiredBags()
    }

    getUpcomingShape(stepsAhead = 0){
        return this.shapeQueue[stepsAhead]
    }

    blockDropped(){
        if(!this.activePiece.isActive){
            return true
        }
        return false
    }

    get shadowPiece(){
        return this.activePiece.shadow
    }

}
