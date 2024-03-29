import {Piece} from "./Piece.js"

export class ShadowPiece extends Piece{
    constructor({
        shape,
        activeCanvas,
        gameStateGrid,
        blockSize, 
        positionOfCenterBlock, 
        orientation, 
        shadowEnabled,
        availableCanvases,
        spawnPoint,
    }){
        super({
            shape,
            activeCanvas,
            gameStateGrid,
            blockSize, 
            positionOfCenterBlock, 
            orientation, 
            shadowEnabled,
            availableCanvases,
            spawnPoint,
        });
        this.color = 'lightgray'
        //FUTURE REFERENCE- Shadows only appear clientside, might be worth rebuilding the object instead of updating it?
    }

    handleUpdateEvent(event){
        if(!event.detail.isActive){
            return
        }
        let parentPosition = event.detail.newPosition
        let parentOrientation = event.detail.newOrientation
        this.translate(parentPosition)
        this.orientation = parentOrientation
        this.applyBlockOffsets()   
        this.fallToBottom()
    }

    eraseCurrentShadow(){
        this.fallToBottom()
        this.erase()
    }

}