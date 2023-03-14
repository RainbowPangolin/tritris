import { CanvasCreator } from './CanvasCreator.js';
import * as drawingUtils from './drawingUtils.js'
const DEFAULT_BLOCK_SIZE = 25;

//Just draws a board and active piece, has no lo

export class BareBoard{
    constructor({blockSize, height, width, domDocument, player}){
        Object.assign(this, {blockSize, height, width, domDocument, player})

        this.blockSize = blockSize;
        this.canvasCreator = new CanvasCreator(domDocument, width, height, blockSize);
        this.initializeCanvases();
        this.createFreshGameStateGrid();
        this.player = player;
    }

    initializeCanvases(){
        this.placedMinoBoardCanvas = this.canvasCreator.getNewCanvas()
        this.activeMinoBoardCanvas = this.canvasCreator.getNewCanvas()
        let mainCanvasDiv = this.domDocument.createElement('div')
        this.heldPieceCanvas = this.canvasCreator.getNewCanvas({type: 'heldPieceCanvas'})

        let backgroundCanvas = this.canvasCreator.getNewCanvas()
        backgroundCanvas.style.background = '#eae'
        mainCanvasDiv.append(backgroundCanvas)
    
        mainCanvasDiv.style.width = String(this.width*this.blockSize+'px')
        mainCanvasDiv.append(this.placedMinoBoardCanvas) 
        mainCanvasDiv.append(this.debugCanvas)
        mainCanvasDiv.append(this.activeMinoBoardCanvas)
    
        this.domDocument.body.append(mainCanvasDiv)
        //Equivalent call for previewCanvases called in getNewPreviewCanvases
    
        this.placedMinoBoardCanvas.classList.add('placedMinoCanvas')
        this.activeMinoBoardCanvas.classList.add('activeMinoCanvas')
        //Equivalent call for previewCanvases called in getNewPreviewCanvases
        this.heldPieceCanvas.classList.add('heldPieceCanvas')
    
        this.previewCanvasList = this.getNewPreviewCanvases()
    
        this.previewCanvasDiv.prepend(this.heldPieceCanvas) 
    }
    
    getNewPreviewCanvases(){
        let listOfPreviewCanvases = []
        let previewCanvasDiv = this.domDocument.createElement("div");
        for (let i = 0; i < this.previewSize; i++){
            let newPreviewCanvas = this.getNewCanvas({type: 'previewCanvas'})
            listOfPreviewCanvases.push(newPreviewCanvas)
            previewCanvasDiv.append(newPreviewCanvas) 
            newPreviewCanvas.classList.add('previewCanvas')
        }

        this.domDocument.body.append(previewCanvasDiv)
        this.previewCanvasDiv = previewCanvasDiv
        return listOfPreviewCanvases
    }

    createFreshGameStateGrid(){
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
    }

    refreshDisplay(){
        drawingUtils.drawPlacedMinoBoard({
            canvas: this.placedMinoBoardCanvas,
            blockGrid: this.gameStateGrid
        });
    }

    setGameStateGrid(gameStateGrid){
        this.gameStateGrid = gameStateGrid;
        this.refreshDisplay();
    }

}

