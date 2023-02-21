import {Piece} from "./piece.js"

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
        // this.update()
        
        // this.fallToBottom()
        // this.draw()
    }

    handleUpdateEvent(event){
        //TODO can be easily cleaned up
        if(!event.detail.isActive){
            return
        }
        this.eraseCurrentShadow()
        let parentPosition = event.detail.newPosition
        let parentOrientation = event.detail.newOrientation
        this.translate(parentPosition)
        this.orientation = parentOrientation
        this.applyBlockOffsets()   
        this.fallToBottom()
        this.draw()
    }

    handlePlaceEvent(event){
        this.eraseCurrentShadow()
    }

    eraseCurrentShadow(){
        this.fallToBottom()
        this.erase()
    }

}