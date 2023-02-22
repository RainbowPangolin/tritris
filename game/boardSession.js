import {ActivePiece} from './activePiece.js'
import {generateNewBagUsing} from './bagSystem.js'
import {ExtraPieceDrawer} from './extraPieceDrawer.js'
import {Block} from './block.js'
import {PIECE_ACTIONS, MISC_ACTIONS} from './constants.js'

const DEFAULT_BLOCK_SIZE = 25



export class BoardSession extends EventTarget{
    gameOngoing
    gameStateGrid = []
    constructor({
        width = 10, 
        height = 22, 
        domDocument = null,  
        bagSystem = '7-bag',
        gravity = 1,
        shadowEnabled = true,
        previewSize = 5,
        pieceQueue = [],
        spawnPoint = [2, Math.floor(width/2) - 1]
    } = {}){ 
        super()
        Object.assign(this, {width, height, domDocument, bagSystem, gravity, shadowEnabled, previewSize, pieceQueue, spawnPoint})
        this.creatFreshGameStateGrid()
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

    creatFreshGameStateGrid(){
        this.gameStateGrid = []
        for (let i = 0; i < this.height; i++){
            let innerGrid = []
            for( let j = 0; j < this.width; j++){
                innerGrid.push(0)
            }
            this.gameStateGrid.push(innerGrid)
        }
        let floorArr = []
        for (let i = 0; i < this.width; i++){
            floorArr.push(1)
        }
        this.gameStateGrid.push(floorArr)
        // this.gameStateGrid = gameStateGrid
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
            newCanvas.height = this.blockSize*3
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
        if (this.gameOngoing){
            return
        }
        this.gameOngoing = true
        this.insertNewPieceWithShapeAndLocation(this.getUpcomingShape())
        this.removeNextPieceFromQueue()
    }

    //TODO Block inputs here.
    endGame(){
        if(!this.gameOngoing){
            return
        }
        this.gameOngoing = false
    }

    restartGame(){
        this.gameOngoing = false
        this.activePiece = null
        this.pieceQueue = []
        this.heldPiece = null
        this.clearHeldPieceDisplay()
        this.clearActiveDisplay()
        this.clearPlacedDisplay()
        this.creatFreshGameStateGrid()

        this.addRequiredBags()
        this.performBoardAction('START')
    }

    changeGravity(gravity){
        this.gravity = gravity
    }
    
    insertNewPieceWithShapeAndLocation(shape, location = [2, 4]){
        try{
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
            this.activePiece.addEventListener('onPiecePlacedEvent', this.handlePiecePlacedEvent.bind(this))
            this.activePiece.addEventListener('onPieceHeldEvent', this.handlePieceHeldEvent.bind(this))
            this.activePiece.addEventListener('onPieceTransformEvent', this.handleActivePieceTransformEvent.bind(this))

        } catch (error) {
            this.activePiece = null
        }
        this.refreshActiveMinoBoard()

    }

    handlePiecePlacedEvent(){
        this.clearFilledLines()

        if(this.hasMetFailCondition()){
            console.log('poo')

            return}
        
        this.insertNewPieceWithShapeAndLocation(this.getUpcomingShape())
        this.removeNextPieceFromQueue()

    }

    hasMetFailCondition(){ 
    if(!this.isLineEmpty(this.gameStateGrid[2])){
        //TODO Why do I have these as events again?
        this.performBoardAction('END')
    }

    }

    isLineEmpty(line){
        for (let tile of line){
            if (tile != 0){
                return false
            }
        }
        return true
    }

    clearFilledLines(){
        let lines = this.gameStateGrid
        lines.forEach((line, depth) => {
            if (this.lineFilled(line)){
                this.clearLineAtHeight(depth)
            }
        })
        this.refreshPlacedMinoBoard()
    }

    lineFilled(tileArray){
        for (let tile of tileArray) {
            if (typeof tile === 'number') {
                return false
            }
        }
        return true
    }

    handleActivePieceTransformEvent(){
        this.refreshActiveMinoBoard()
    }

    refreshActiveMinoBoard(){
        this.clearActiveDisplay()
        if (this.gameOngoing){
            this.activePiece.draw()
        }
    }

    clearLineAtHeight(depth){
        let tileArray = this.gameStateGrid[depth]
        tileArray.forEach((block) => {
            block.delete()
        })

        //FUTURE REFERENCE- I might want to consider using a 'fail-zone'

        //Also a recursive solution might look neater
        for (let i = depth; i >= 0; i--){
            let curLine = this.gameStateGrid[i]
            curLine.forEach((block) => {
                if (block instanceof Block){
                    block.setPositionOneTileDown()
                }
            })
        }
        
        //removes last line
        this.gameStateGrid.splice(depth, 1)

        this.pushNewLineToTop()
    }

    pushNewLineToTop(){
        let newLine = []
        for (let i = 0; i < this.width; i++){
            newLine.push(0)
        }
        this.gameStateGrid.unshift(newLine)
    }

    refreshPlacedMinoBoard(){
        this.clearPlacedDisplay()
        for (let line of this.gameStateGrid){
            for(let tile of line){
                if(tile instanceof Block){
                    tile.draw()
                }
            }
        }
    }

    handlePieceHeldEvent(){
        this.swapHeldAndActivePieces()
    }

    //TODO Write method that takes an array of actions and keeps doing receiveInput for testing
    receiveTheArrayOfInputs(array){
        array.forEach((action) => {
            this.receiveInput(action)
        })
    }

    //TODO This is inelegant, there is probably a smarter way of doing this.
    receiveInput(action = 'MOVEDOWN'){
        if(PIECE_ACTIONS.has(action)){
            if(this.gameOngoing){
                this.activePiece.performAction(action)
            }
        } else if (MISC_ACTIONS.has(action)){
            this.performBoardAction(action)
        } else {
            throw new Error('Illegal action attempted')
        }
    }

    performBoardAction(action){
        const actions = {
            'START': () => {
                this.dispatchEvent(new CustomEvent('onStartGameEvent', {}))
                console.log("Attempting start")
                this.startGame()

            }, 
            'END': () => {
                this.dispatchEvent(new CustomEvent('onEndGameEvent', {}));
                console.log("Attempting end")
                this.endGame()
            },
            'RESTART': () => {
                this.dispatchEvent(new CustomEvent('onRestartGameEvent', {}))
                console.log("Attempting restart")
                this.restartGame()
            },
        }
        actions[action]?.call(this)
    }
    
    clearActiveDisplay(){
        let canvas = this.activeMinoBoardCanvas
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    clearPlacedDisplay(){
        let canvas = this.placedMinoBoardCanvas
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }



    swapHeldAndActivePieces(){
        //TODO This should probably be done during receiveInput() or something
        this.clearActiveDisplay()
        if(this.heldPiece){
            let tempPiece = this.heldPiece
            this.heldPiece = this.activePiece
            this.activePiece = tempPiece
            this.activePiece.performAction('SPAWN')
        } else {
            this.heldPiece = this.activePiece
            this.insertNewPieceWithShapeAndLocation(this.getUpcomingShape())
            this.removeNextPieceFromQueue()
        }
        this.updateHeldPieceDisplay()
    }
    updateHeldPieceDisplay(){
        this.extraPieceDrawer.setShapeToDisplayHeld(this.heldPiece.shape)
    }

    clearHeldPieceDisplay(){
        this.extraPieceDrawer.clearHeldPieceDisplay()
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
