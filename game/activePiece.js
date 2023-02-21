//TODO: Attach a ShadowPiece as an Observer?

import { Piece } from "./piece.js";
import {ShadowPiece} from "./shadowPiece.js"

export class ActivePiece extends Piece{
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
        const constructorArgs = {
            shape,
            activeCanvas,
            gameStateGrid,
            blockSize, 
            positionOfCenterBlock, 
            orientation, 
            shadowEnabled,
            availableCanvases,
            spawnPoint,
        }
        super(constructorArgs);

        this.addNewShadow(new ShadowPiece(constructorArgs))
    }

    addNewShadow(newPiece){
        this.addEventListener('onPieceUpdateEvent', newPiece.handleUpdateEvent.bind(newPiece));
        this.shadowPiece = newPiece
    }
}