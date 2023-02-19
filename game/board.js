const DEFAULT_CONFIG = {
    width: 9, 
    height: 22, // playable board is only up to 18. buffer above for new pieces, buffer below for floor
    domDocument: document}
const DEFAULT_BLOCK_SIZE = 25

import {Piece} from './piece.js'

export class Board {
    constructor(boardConfig = DEFAULT_CONFIG){ 
        this.boardConfig = boardConfig
        this.createGameStateGrid()
        this.initializeGameSettings()
        this.initializeCanvasDisplay()
    }

    createGameStateGrid(){
        let gameStateGrid = []
        for (let i = 0; i < this.boardConfig.height; i++){
            let innerGrid = []
            for( let j = 0; j < this.boardConfig.width; j++){
                innerGrid.push(0)
            }
            gameStateGrid.push(innerGrid)
        }
        let floorArr = []
        for (let i = 0; i < this.boardConfig.width; i++){
            floorArr.push(1)
        }
        gameStateGrid.push(floorArr)
        this.gameStateGrid = gameStateGrid
    }

    initializeGameSettings(){
        this.gravity = this.boardConfig.gravity
        this.shadowEnabled = this.boardConfig.shadowEnabled
    }

    initializeCanvasDisplay(){
        this.blockSize = DEFAULT_BLOCK_SIZE
        let minoBoardCanvas = this.boardConfig.domDocument.createElement("canvas");
        let debugCanvas = this.boardConfig.domDocument.createElement("canvas");
        debugCanvas.classList.add('debug')
        minoBoardCanvas.classList.add('mainBoard')
        minoBoardCanvas.width = DEFAULT_BLOCK_SIZE*this.boardConfig.width //TODO make size modular
        minoBoardCanvas.height = DEFAULT_BLOCK_SIZE*this.boardConfig.height        
        debugCanvas.width = DEFAULT_BLOCK_SIZE*this.boardConfig.width 
        debugCanvas.height = DEFAULT_BLOCK_SIZE*this.boardConfig.height 
        this.debugCanvas = debugCanvas
        this.minoBoardCanvas = minoBoardCanvas

        this.boardConfig.domDocument.body.append(minoBoardCanvas) 
        this.boardConfig.domDocument.body.append(debugCanvas)
    }

    startGame(){
        this.addPiece('T')
    }

    changeGravity(gravity){
        this.boardConfig.gravity = gravity
    }
    
    addPiece(shape, location = [2, 4]){
        let curPiece = new Piece({
            shape: shape, 
            minoBoardCanvas: this.minoBoardCanvas, 
            debugCanvas: this.debugCanvas,
            gameStateGrid: this.gameStateGrid, 
            blockSize: this.blockSize, 
            positionOfCenterBlock: location, 
            orientation: 0, 
            shadowEnabled: this.shadowEnabled,  
        })
        this.curPiece = curPiece
        this.curPiece.performAction('SPAWN')
    }

    receiveInput(action = 'MOVEDOWN'){
        this.curPiece.performAction(action)
        if(action == 'HARDDROP'){ //TODO These if statements are inelegant
            this.addPiece(this.nextPiece())
        } else if (action == 'HOLD'){
            //TODO
        }
    }

    nextPiece(curShape = this.curPiece.shape){
        //TODO- Offer different bag types
        if (curShape == 'L'){
            return 'I'
        } else if (curShape == 'I'){
            return 'L'
        } else {
            return 'O'
        }
    }

    blockDropped(){
        if(!this.curPiece.isActive){
            return true
        }
        return false
    }


    

}
