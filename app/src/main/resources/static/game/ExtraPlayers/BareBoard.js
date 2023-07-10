import { CanvasCreator } from './CanvasCreator.js';
import * as drawingUtils from './drawingUtils.js'
import {Block} from '../ClientPlayer/Block.js'

const DEFAULT_BLOCK_SIZE = 25;

//Just draws a board and active piece, has no lo

export class BareBoard{
    constructor({blockSize, height, width, domDocument, containerDiv, player}){
        Object.assign(this, {blockSize, height, width, domDocument, containerDiv, player})

        this.blockSize = blockSize;
        this.canvasCreator = new CanvasCreator(domDocument, width, height, blockSize);
        this.initializeContainerDiv();
        this.initializeCanvases();
        this.createFreshGameStateGrid();
        this.player = player;
    }

    initializeContainerDiv(){
        let containerDiv = this.domDocument.createElement("div");
        this.containerDiv = containerDiv;
        containerDiv.id ="onlineplayer";
        this.containerDiv.classList.add('hidden');
        this.containerDiv.classList.add('gameboard');

        this.domDocument.body.append(containerDiv);

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
    
        this.containerDiv.append(mainCanvasDiv)
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

        this.containerDiv.append(previewCanvasDiv)
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

    setGameStateGridFromSimple(grid){
        let fullGameStateGrid = this.getFullGridFromSimple(grid)
        this.gameStateGrid = fullGameStateGrid;
        this.refreshDisplay();
    }

    getFullGridFromSimple(grid){
        let returnGrid = grid.map((row, y) => {
            return row.map((item, x) => {
                if (item === 'EMPTY') {
                return 0
                } else {
                    let newBlock = new Block({
                    canvas: this.placedMinoBoardCanvas,
                    grid: this.gameStateGrid,
                    blockSize: this.blockSize,
                    positionOfCenterBlock: [y,x],
                    color: item
                    })
                    return newBlock;
                }
            });
        });
        return returnGrid
    }
    
    setPlayerID(id){
        this.playerID = id;
        let clientPlayerIDDisplay = this.domDocument.createElement("p");
        clientPlayerIDDisplay.innerHTML = this.playerID;
        this.containerDiv.append(clientPlayerIDDisplay)
    }

    show(){
        this.containerDiv.classList.remove('hidden');
    }

    hide(){
        this.containerDiv.classList.add('hidden');
    }
    
    

}

