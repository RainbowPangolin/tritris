import {ActivePiece} from './activePiece.js'
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
        shapeQueue = [],
        spawnPoint = [2, 4]
    } = {}){ 
        Object.assign(this, {width, height, domDocument, bagSystem, gravity, shadowEnabled, previewSize, shapeQueue, spawnPoint})
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

        this.placedMinoBoardCanvas = this.getNewCanvas()
        this.activeMinoBoardCanvas = this.getNewCanvas()
        this.debugCanvas = this.getNewCanvas()

        this.placedMinoBoardCanvas.classList.add('mainCanvas')
        this.activeMinoBoardCanvas.classList.add('mainCanvas')
        this.debugCanvas.classList.add('debug')

        this.domDocument.body.append(this.placedMinoBoardCanvas) 
        this.domDocument.body.append(this.debugCanvas)
        this.domDocument.body.append(this.activeMinoBoardCanvas)
    }

    //TODO All this is garbage still, I shoudl abstract it into a new object or interface
    getNewCanvas(){
        let newCanvas = this.domDocument.createElement("canvas");
        newCanvas.width = this.blockSize*this.width 
        newCanvas.height = this.blockSize*this.height   
        return newCanvas
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
        let activePiece = new ActivePiece({
            shape: shape, 
            activeCanvas: this.activeMinoBoardCanvas, 
            gameStateGrid: this.gameStateGrid, 
            blockSize: this.blockSize, 
            positionOfCenterBlock: location, 
            orientation: 0, 
            shadowEnabled: this.shadowEnabled,
            availableCanvases: {
                'activeMinoBoardCanvas': this.activeMinoBoardCanvas, 
                'debugCanvas': this.debugCanvas,
                'placedMinoBoardCanvas': this.placedMinoBoardCanvas
            }, 
            spawnPoint: this.spawnPoint
        })
        this.activePiece = activePiece
        this.activePiece.performAction('SPAWN')
    }
    
    //TODO Write method that takes an array of actions and keeps doing receiveInput for testing
    receiveTheArrayOfInputs(array){
        array.forEach((action) => {
            this.receiveInput(action)
        })
    }

    receiveInput(action = 'MOVEDOWN'){
        this.activePiece.performAction(action)
        if(action == 'HARDDROP'){ //TODO These if statements are inelegant, and more functionality is down in Piece.js
            this.placePiece()
        } else if (action == 'HOLD'){
            this.swapHeldAndActivePieces()
        }
        //TODO this.refreshDisplay()???
    }

    placePiece(){ //TODO Rename, this is an incorrect name
        //Also, for some reason in the Piece class, it has it's own placePiece that actually places the piece after the associated action is passed into receiveInput()
        this.insertNewPieceWithShapeAndLocation(this.getUpcomingShape())
        this.removeUpcomingPieceFromQueue()
    }

    swapHeldAndActivePieces(){
        if(this.heldPiece){
            let tempPiece = this.heldPiece
            this.heldPiece = this.activePiece
            this.activePiece = tempPiece
        } else {
            this.heldPiece = this.activePiece
            this.insertNewPieceWithShapeAndLocation(this.getUpcomingShape())
            this.removeUpcomingPieceFromQueue()
        }

    }

    removeUpcomingPieceFromQueue(stepsAhead = 0){
        this.shapeQueue.shift() 
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
