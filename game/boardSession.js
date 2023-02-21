import {ActivePiece} from './activePiece.js'
import {generateNewBagUsing} from './bagSystem.js'
import {ExtraPieceDrawer} from './extraPieceDrawer.js'

const DEFAULT_BLOCK_SIZE = 25

export class BoardSession {
    constructor({
        width = 9, 
        height = 22, 
        domDocument = null,  
        bagSystem = '7-bag',
        gravity = 1,
        shadowEnabled = true,
        previewSize = 5,
        pieceQueue = [],
        spawnPoint = [2, 4]
    } = {}){ 
        Object.assign(this, {width, height, domDocument, bagSystem, gravity, shadowEnabled, previewSize, pieceQueue, spawnPoint})
        this.createGameStateGrid()
        this.initializeGameSettings()
        this.initializeCanvasDisplay()
        this.initializeExtraPieceDrawer()
        this.addRequiredBags()
    }

    initializeExtraPieceDrawer(){
        this.extraPieceDrawer = new ExtraPieceDrawer()
        this.extraPieceDrawer.availableCanvases = {                
            'previewCanvasList': this.previewCanvasList,
            'heldPieceCanvas': this.heldPieceCanvas,
        }
        this.extraPieceDrawer.previewBlockSize = this.blockSize
        this.extraPieceDrawer.heldBlockSize = this.blockSize
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

    //TODO This might be worth refactoring to be less dumb
    initializeCanvasDisplay(){
        this.blockSize = DEFAULT_BLOCK_SIZE

        this.placedMinoBoardCanvas = this.getNewCanvas()
        this.activeMinoBoardCanvas = this.getNewCanvas()
        this.debugCanvas = this.getNewCanvas()
        this.heldPieceCanvas = this.getNewCanvas({type: 'heldPieceCanvas'})

        
        this.domDocument.body.append(this.placedMinoBoardCanvas) 
        this.domDocument.body.append(this.debugCanvas)
        this.domDocument.body.append(this.activeMinoBoardCanvas)
        //Equivalent call for previewCanvases called in getNewPreviewCanvases
        this.domDocument.body.append(this.heldPieceCanvas) 

        this.debugCanvas.classList.add('debugCanvas')
        this.placedMinoBoardCanvas.classList.add('placedMinoCanvas')
        this.activeMinoBoardCanvas.classList.add('activeMinoCanvas')
        //Equivalent call for previewCanvases called in getNewPreviewCanvases
        this.heldPieceCanvas.classList.add('heldPieceCanvas')

        this.previewCanvasList = this.getNewPreviewCanvases()


    }

    //TODO All this is garbage still, I shoudl abstract it into a new object or interface
    getNewCanvas({type = 'minoBoardCanvas'} = {}){
        let newCanvas = this.domDocument.createElement("canvas");
        if(type == 'minoBoardCanvas'){
            newCanvas.width = this.blockSize*this.width 
            newCanvas.height = this.blockSize*this.height   
        } else {
            //Just enough to draw a piece
            newCanvas.width = this.blockSize*4
            newCanvas.height = this.blockSize*4
        }

        return newCanvas
    }

    getNewPreviewCanvases(){
        let listOfPreviewCanvases = []
        for (let i = 0; i < this.previewSize; i++){
            let newPreviewCanvas = this.getNewCanvas({type: 'previewCanvas'})
            listOfPreviewCanvases.push(newPreviewCanvas)
            this.domDocument.body.append(newPreviewCanvas) 
            newPreviewCanvas.classList.add('previewCanvas')
        }
        return listOfPreviewCanvases
    }

    addRequiredBags(){
        while(this.previewSize > this.pieceQueue.length){
            let newBag = this.getNewBag()
            this.pieceQueue.push(...newBag)
        }
    }

    getNewBag(){
        return generateNewBagUsing(this.bagSystem)
    }

    startGame(){
        this.insertNewPieceWithShapeAndLocation(this.getUpcomingShape())
        this.removeNextPieceFromQueue()
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
            availableCanvases: {//TODO Possibly just dissolve this object?
                'activeMinoBoardCanvas': this.activeMinoBoardCanvas, 
                'debugCanvas': this.debugCanvas,
                'placedMinoBoardCanvas': this.placedMinoBoardCanvas,
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
    }
    
    clearActiveDisplay(){
        let canvas = this.activeMinoBoardCanvas
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    placePiece(){ //TODO Rename, this is an incorrect name
        //Also, for some reason in the Piece class, it has it's own placePiece that actually places the piece after the associated action is passed into receiveInput()
        this.insertNewPieceWithShapeAndLocation(this.getUpcomingShape())
        this.removeNextPieceFromQueue()
    }

    swapHeldAndActivePieces(){
        //TODO This should probably be done during receiveInput() or something
        this.clearActiveDisplay()
        if(this.heldPiece){
            let tempPiece = this.heldPiece
            this.heldPiece = this.activePiece
            this.activePiece = tempPiece
        } else {
            this.heldPiece = this.activePiece
            this.insertNewPieceWithShapeAndLocation(this.getUpcomingShape())
            this.removeNextPieceFromQueue()
        }
        this.updateHeldPieceDisplay()
        this.activePiece.performAction('SPAWN')
    }
    updateHeldPieceDisplay(){
        this.extraPieceDrawer.setShapeToDisplayHeld(this.heldPiece.shape)
    }

    removeNextPieceFromQueue(stepsAhead = 0){
        this.pieceQueue.shift() 
        this.addRequiredBags()
        this.updatePreviewDisplay()
    }
    updatePreviewDisplay(){
        let piecesInQueueToDisplay = []
        for (let i = 0; i < this.previewSize; i++){
            piecesInQueueToDisplay.push(this.pieceQueue[i])
        }
        this.extraPieceDrawer.setNewPreviewsTo(piecesInQueueToDisplay)
    }

    getUpcomingShape(stepsAhead = 0){
        return this.pieceQueue[stepsAhead]
    }

    blockDropped(){
        if(!this.activePiece.isActive){
            return true
        }
        return false
    }

    get shadowPiece(){
        return this.activePiece.shadowPiece
    }

}
