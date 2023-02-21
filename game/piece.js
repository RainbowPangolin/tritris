import {Block} from './block.js'

//Contains a 2d matrix of each piece in each orientation
const PIECES = {
    'J': [
        //position 1
        [[1, 0, 0],
         [1, 1, 1],
         [0, 0, 0],], 
        //position 2
        [[0, 1, 1],
         [0, 1, 0],
         [0, 1, 0],], 
        //position 3
        [[0, 0, 0],
         [1, 1, 1],
         [0, 0, 1],], 
        //position 4
        [[0, 1, 0],
         [0, 1, 0],
         [1, 1, 0],], 
    ],
    'L': [
        //position 1
        [[0, 0, 1],
         [1, 1, 1],
         [0, 0, 0],], 
        //position 2
        [[0, 1, 0],
         [0, 1, 0],
         [0, 1, 1],], 
        //position 3
        [[0, 0, 0],
         [1, 1, 1],
         [1, 0, 0],], 
        //position 4
        [[1, 1, 0],
         [0, 1, 0],
         [0, 1, 0],], 
    ],
    'S': [
        //position 1
        [[0, 1, 1],
         [1, 1, 0],
         [0, 0, 0],], 
        //position 2
        [[0, 1, 0],
         [0, 1, 1],
         [0, 0, 1],], 
        //position 3
        [[0, 0, 0],
         [0, 1, 1],
         [1, 1, 0],], 
        //position 4
        [[1, 0, 0],
         [1, 1, 0],
         [0, 1, 0],], 
    ],
    'Z': [
        //position 1
        [[1, 1, 0],
         [0, 1, 1],
         [0, 0, 0],], 
        //position 2
        [[0, 0, 1],
         [0, 1, 1],
         [0, 1, 0],], 
        //position 3
        [[0, 0, 0],
         [1, 1, 0],
         [0, 1, 1],], 
        //position 4
        [[0, 1, 0],
         [1, 1, 0],
         [1, 0, 0],], 
    ],
    'T': [
        //position 1
        [[0, 1, 0],
         [1, 1, 1],
         [0, 0, 0],], 
        //position 2
        [[0, 1, 0],
         [0, 1, 1],
         [0, 1, 0],], 
        //position 3
        [[0, 0, 0],
         [1, 1, 1],
         [0, 1, 0],], 
        //position 4
        [[0, 1, 0],
         [1, 1, 0],
         [0, 1, 0],], 
    ],
    'I': [
        //position 1
        [[0, 0, 0, 0],
         [1, 1, 1, 1],
         [0, 0, 0, 0],
         [0, 0, 0, 0],], 
        //position 2
        [[0, 0, 1, 0],
         [0, 0, 1, 0],
         [0, 0, 1, 0],
         [0, 0, 1, 0],], 
        //position 3
        [[0, 0, 0, 0],
         [0, 0, 0, 0],
         [1, 1, 1, 1],
         [0, 0, 0, 0],], 
        //position 4
        [[0, 1, 0, 0],
         [0, 1, 0, 0],
         [0, 1, 0, 0],
         [0, 1, 0, 0],], 
    ],
    'O': [
        //position 1
        [[0, 1, 1, 0],
         [0, 1, 1, 0],
         [0, 0, 0, 0],
         [0, 0, 0, 0],],
        //position 2
        [[0, 1, 1, 0],
         [0, 1, 1, 0],
         [0, 0, 0, 0],
         [0, 0, 0, 0],],
        //position 3
        [[0, 1, 1, 0],
         [0, 1, 1, 0],
         [0, 0, 0, 0],
         [0, 0, 0, 0],],
        //position 4
        [[0, 1, 1, 0],
         [0, 1, 1, 0],
         [0, 0, 0, 0],
         [0, 0, 0, 0],],  
    ]
}

const PIECE_COLOR_MAP = {
    "J": 'blue',
    "L": 'orange',
    "S": 'limegreen',
    "Z": 'red',
    "T": 'magenta',
    "I": 'aqua',
    "O": 'yellow'
}

let u, v 
const KICK_TABLE = {
    //see Tetris Guideline SRS kick data table https://tetris.fandom.com/wiki/SRS
    //180 kicks based on TETR.IO kick table
    // https://pbs.twimg.com/media/EaWH8QgXgAArDEV?format=png&name=large
    'L': (v = {
        '0,1': [[0, -1], [-1, -1], [2, 0], [2, -1]],
        '1,0': [[0, 1], [1, 1], [-2, 0], [-2,1]],
        '1,2': [[0,1], [1, 1], [-2,0], [-2,1]],
        '2,1': [[0,-1], [-1, -1], [2,0], [2,-1]],
        '2,3': [[0,1], [-1,1], [2,0], [2,1]],
        '3,2': [[0,-1], [1,-1], [-2,0], [-2,-1]],
        '3,0': [[0,-1], [1,-1], [-2,0], [-2,-1]],
        '0,3': [[0,1], [-1,1], [2,0], [2, 1]],
        '0,2': [[-1, 0], [-1,1], [1,1], [0,1], [0,-1],],
        '2,0': [[1,0], [1, -1], [1, 1], [0, -1], [0,1]],
        '1,3': [[0, 1], [-2, 1], [-1, 1], [-2, 0], [-1,0]],
        '3,1': [[0, -1], [-2, -1], [-1,-1], [-2, 0], [-1,0]],

        
    }),
    'J': v,
    'S': v,
    'Z': v,
    'T': v,
    '3L': v,
    'I': (u = {
        '0,1': [[0, -2], [0, 1], [1, -2], [-2,1]],
        '1,0': [[0, 2], [0, -1], [-1,2], [2,-1]],
        '1,2': [[0, -1], [0, 2], [-2,-1], [1,2]],
        '2,1': [[0,1], [0, -2], [2,1], [-1,-2]],
        '2,3': [[0,2], [0, -1], [-1,2], [2,-1]],
        '3,2': [[0,-2], [0, 1], [1,-2], [2,1]],
        '3,0': [[0,1], [0, -2], [2,1], [-1,-2]],
        '0,3': [[0,-1], [0, 2], [-2,-1], [1,2]],
        '0,2': [[0, 0]],
        '2,0': [[0, 0]],
        '1,3': [[0, 0]],
        '3,1': [[0, 0]],
    }),
    '3I': u,
    'O': {
        '0,1': [[0, 0]],
        '1,0': [[0, 0]],
        '1,2': [[0, 0]],
        '2,1': [[0, 0]],
        '2,3': [[0, 0]],
        '3,2': [[0, 0]],
        '3,0': [[0, 0]],
        '0,3': [[0, 0]],
        '0,2': [[0, 0]],
        '2,0': [[0, 0]],
        '1,3': [[0, 0]],
        '3,1': [[0, 0]],
    },

}

function getDefaultColorOfPiece(shape){
    return PIECE_COLOR_MAP[shape]
}

export class Piece extends EventTarget{
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

        super()
        this.blocksList = []
        Object.assign(this, {shape, activeCanvas, gameStateGrid, blockSize, positionOfCenterBlock, orientation, shadowEnabled, availableCanvases, spawnPoint})
        this.spawnBlocks()
        //TODO super inelegant, but I can't think of a better solution right now
        this.activeCanvas = activeCanvas

        this.shadowEnabled = shadowEnabled
        this.isActive = true
        /// TODO Grace system
        this.grace = 5
    }

    spawnBlocks(){
        let y = this.spawnPoint[0]
        let x = this.spawnPoint[1]
        this.positionOfCenterBlock = [y, x]
        for (let i = 0; i < 4; i++){
            this.blocksList.push(
                new Block({
                    canvas: this.activeCanvas, 
                    grid: this.gameStateGrid, 
                    blockSize: this.blockSize, 
                    positionOfCenterBlock: [y,x],
                    color: getDefaultColorOfPiece(this.shape)
                })
            )
        }
        this.applyBlockOffsets()
    }

    set activeCanvas(activeCanvas){
        this._activeCanvas = activeCanvas
        this.blocksList.forEach((block) => {
            block.activeCanvas = activeCanvas
        })
    }

    get activeCanvas(){
        return this._activeCanvas
    }

    get color(){
        return this.blocksList[0].color
    }

    set color(color){ //redundant method but /shrug
        this._color = color
        this.blocksList.forEach((block) => {
            block.color = color
        })
    }




    applyBlockOffsets(){
        this.blocksList[0].centerOffset = [0,0]
        let offsetsList = this.getBlockOffsets(this.shape, this.orientation)
        this.blocksList.forEach( 
            (block, index) => {
            block.centerOffset = offsetsList[index]
        })
    }

    getBlockOffsets(piece, orientation){
        let tilesMatrix = PIECES[piece][orientation]
        // let center = Math.trunc(tilesMatrix.length / 2) in case we add objects with more than 4 tiles
        let offsets = []
        let center = 1 //all pieces rotate their centers around point 1,1, except I and O but that doesn't matter
        tilesMatrix.forEach((array, row) => {
            array.forEach((element, column) => {
                if (element != 0) {
                    offsets.push([row - center, column - center])
                }
            })
        })
        return offsets
    }

    //returns true if rotation worked, false if failed
    //TODO Refactor to throw exception that gets handled instead of just returning true/false
    attemptRotate(direction){
        let initialOrientation = this.orientation
        this.rotate(direction)
        let newOrientation = this.orientation 
        if (this.isIllegalPosition()) {
            //TODO A try-catch herek would read a lot better
            if(this.attemptKick(initialOrientation, newOrientation) == false){ //if kick failed
                //any 4 rotations returns to original position, easier than getting opposite direction sorry
                this.rotate(direction)
                this.rotate(direction)
                this.rotate(direction)
                return false
            }
        } 
        return true
    }

    rotate(direction){
        //change orientation based on rotation
        if(direction == 'ROTATERIGHT'){
            this.orientation = (4 + (this.orientation + 1)) % 4 
        } else if (direction == 'ROTATELEFT') {
            this.orientation = (4 + (this.orientation - 1)) % 4 
        } else if (direction == 'ROTATE180') {
            this.orientation = (4 + (this.orientation - 2)) % 4 
        } else {
            throw new Error('Illegal rotation attempted')
        }
        this.applyBlockOffsets()        
    }

    //checks if current position overlaps with existing blocks or OOB
    isIllegalPosition(){
        for (let block of this.blocksList){
            let [y, x] = block.getAbsolutePosition()
            let gridSpot = this.gameStateGrid?.[y]?.[x]
            if(gridSpot != 0){
                return true
            }
        }
        return false
    }

    //returns true if kick worked, false if failed
    //TODO Refactor to throw exception that gets handled instead of just returning true/false
    attemptKick(initialOrientation, newOrientation){
        let rotation = String([initialOrientation, newOrientation])
        for (let coordinates of KICK_TABLE[this.shape][rotation]){
            if(this.attemptTranslate(coordinates, true)){
                return true
            }
        }
        return false
    }

    //Attempts to move piece in the specified direction/location, 'does nothing' if the move is illegal (OOB, collision)
    //returns true if translation worked, false if failed
    //TODO Refactor to throw exception that gets handled instead of just returning true/false
    attemptTranslate(action, options = {fromKick: false}){
        const lastPosition = this.positionOfCenterBlock
        const newPosition = this.getNewPositionFrom({action: action, lastPosition: lastPosition})        
        this.translate(newPosition)
        if(options.fromKick){
            this.canvas = this.availableCanvases['debugCanvas']
            this.draw()
            // debugger
            this.erase()
            this.canvas = this.availableCanvases['activeMino']

            this.resetBlockSettings()
        }
        if(this.isIllegalPosition()){
            this.translate(lastPosition)
            return false
        } 
        return true
    }

    resetBlockSettings(){
        this.blocksList.forEach((block) => {
            block.resetSettings()
        })
    }

    getNewPositionFrom({action, lastPosition}){
        let newPosition = structuredClone(lastPosition)
        switch(action){
            case 'NONE':
                break
            case 'MOVEDOWN':
                newPosition[0] += 1
                break
            case 'MOVELEFT':
                newPosition[1] -= 1
                break
            case 'MOVERIGHT':
                newPosition[1] += 1
                break
            default: //given relative coordinates, move to this location
                newPosition[1] = newPosition[1] + action[1]
                newPosition[0] = newPosition[0] + action[0]
        }
        return newPosition
    }

    //translation on a plane- move left right or down 
    translate(coords){ 
        let y = coords[0]
        let x = coords[1]
        this.positionOfCenterBlock = [y, x]
        this.blocksList.forEach( (block) => {
            block.positionOfCenterBlock = [y, x]
        })
    }

    delete(){
        this.blocksList.forEach((block) => {
            block.delete()
        })
    }

    //keeps moving down until dropped. 
    //Inputs should be blocked in transit, if transit time not 0
    fallToBottom(){ 
        while(this.attemptTranslate('MOVEDOWN')){
            //do nothing
        }        
    }

    hardDrop(){
        this.fallToBottom()
        this.isActive = false
        this.placePiece()
    }

    //TODO Change which canvas blocks are 'placed' to
    placePiece(){
        this.activeCanvas = this.availableCanvases['placedMinoBoardCanvas']
        this.blocksList.forEach((block) => {
            block.place()
        })
        this.dispatchEvent(new CustomEvent('onPiecePlaceEvent')); 
    }


    //TODO
    //each piece has 5/gravity seconds of grace time- how long a piece can sit on the ground before automatically being place
    //this function should deplete that meter... somehow
    useGrace() { 
        if (this.grace >= 0){
            this.place()
        } else {
            this.grace -= 1
        }
    }
    
    draw(){
        this.blocksList.forEach( (block) => {
            block.draw()
        })
    }

    erase(){
        this.blocksList.forEach( (block) => {
            block.erase()
        })
    }

    updateGameStateWithAction(action){
        //TODO This whole thing is inelegant, I should find a way to refresh the page without having to call the piece to render. 
        if (action === 'HOLD') {
            return;
        }
        const actions = {
            'SPAWN': () => {
                this.attemptTranslate(this.positionOfCenterBlock)
                this.dispatchEvent(new CustomEvent('onPieceSpawnEvent', {
                }));
            },
            'MOVEDOWN': () => {this.attemptTranslate(action)},
            'MOVELEFT': () => {this.attemptTranslate(action)},
            'MOVERIGHT': () => {this.attemptTranslate(action)},

            'ROTATERIGHT': () => {this.attemptRotate(action)},
            'ROTATELEFT': () => {this.attemptRotate(action)},
            'ROTATE180': () => {this.attemptRotate(action)},
            'HARDDROP': () => {
                this.hardDrop()
            }
        }
        actions[action]?.call(this)
    }

    performAction(action){
        this.erase()

        
        //could probably be easily cleaned up but this isn't that bad
        
        this.updateGameStateWithAction(action)

        this.dispatchEvent(new CustomEvent('onPieceUpdateEvent', {
            detail: {
                isActive: this.isActive,
                action: action,
                newPosition: this.positionOfCenterBlock,
                newOrientation: this.orientation
            }
        }));

        this.draw()

        

    }
}