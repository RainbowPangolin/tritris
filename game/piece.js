import {Block} from './block.js'

const PIECES = {
    // '3I': [
    //     //position 1
    //     [[0, 1, 0],
    //      [0, 1, 1],
    //      [0, 0, 0],], 
    //     //position 2
    //     [[0, 1, 1],
    //      [0, 1, 0],
    //      [0, 1, 0],], 
    //     //position 3
    //     [[0, 0, 0],
    //      [1, 1, 0],
    //      [0, 1, 0],], 
    //     //position 4
    //     [[0, 1, 0],
    //      [0, 1, 0],
    //      [1, 1, 0],], 
    // ],
    // '3J': [
    //     //position 1
    //     [[1, 0, 0],
    //      [1, 1, 1],
    //      [0, 0, 0],], 
    //     //position 2
    //     [[0, 1, 1],
    //      [0, 1, 0],
    //      [0, 1, 0],], 
    //     //position 3
    //     [[0, 0, 0],
    //      [1, 1, 1],
    //      [0, 0, 1],], 
    //     //position 4
    //     [[0, 1, 0],
    //      [0, 1, 0],
    //      [1, 1, 0],], 
    // ],
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
         [0, 0, 1],], 
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

let v
const KICK_TABLE = {
    //see Tetris Guideline SRS kick data table https://tetris.fandom.com/wiki/SRS

    'L': (v = {
        '0,1': [[0, -1], [1, -1], [-2, 0], [-2, -1]],
        '1,0': [[0, 1], [-1, 1], [2, 0], [2,1]],
        '1,2': [[0,1], [-1, 1], [2,0], [2,1]],
        '2,1': [[0,-1], [1, -1], [-2,0], [-2,-1]],
        '2,3': [[0,1], [1,1], [-2,0], [-2,1]],
        '3,2': [[0,-1], [-1,-1], [2,0], [2,-1]],
        '3,0': [[0,-1], [-1,-1], [2,0], [2,-1]],
        '0,3': [[0,1], [1,1], [-2,0], [-2, 1]]
    }),
    'J': v,
    'S': v,
    'Z': v,
    'T': v,
    'I': {
        '0,1': [[0, -1], [1, -1], [-2, 0], [-2, -1]],
        '1,0': [[0, 1], [-1, 1], [2, 0], [2,1]],
        '1,2': [[0,1], [-1, 1], [2,0], [2,1]],
        '2,1': [[0,-1], [1, -1], [-2,0], [-2,-1]],
        '2,3': [[0,1], [1,1], [-2,0], [-2,1]],
        '3,2': [[0,-1], [-1,-1], [2,0], [2,-1]],
        '3,0': [[0,-1], [-1,-1], [2,0], [2,-1]],
        '0,3': [[0,1], [1,1], [-2,0], [-2, 1]]
    },

    'O': {
        '0,1': [[0, 0]],
        '1,0': [[0, 0]],
        '1,2': [[0, 0]],
        '2,1': [[0, 0]],
        '2,3': [[0, 0]],
        '3,2': [[0, 0]],
        '3,0': [[0, 0]],
        '0,3': [[0, 0]],
    },
    '3I': { // adjusted for 3 long I piece
        '0,1': [[0, -2], [0, 1], [-1, -2], [2, 1]],
        '1,0': [[0, 2], [0, -1], [1, 2], [-2,-1]],
        '1,2': [[0,-1], [0, 2], [2,-1], [-1,2]],
        '2,1': [[0,1], [0, -2], [-2,1], [1,-2]],
        '2,3': [[0,2], [0,-1], [1,2], [-2,-1]],
        '3,2': [[0,-2], [0,1], [-1,-2], [2,1]],
        '3,0': [[0,1], [0,-2], [-2,1], [1,-2]],
        '0,3': [[0,-1], [0,2], [2,-1], [-1,2]]
    }
    
}


export class Piece {
    constructor(shape, canvas, grid, blockSize, centerPosition, orientation = 0, shadowEnabled = true, debugCanvas, options = {}){
        this.shape = shape
        this.canvas = canvas
        this.debugCanvas = debugCanvas
        this.grid = grid
        this.blockSize = blockSize
        this.centerPosition = centerPosition
        this.orientation = orientation //4 positions, 0 1 2 3  
        this.isActive = true
        this.grace = 5
        this.spawn(centerPosition)
        this.shadowEnabled = shadowEnabled
    }

    spawn(coords){
        let y = coords[0]
        let x = coords[1]
        this.centerPosition = [y, x]

        let centerBlock = new Block(this.canvas, this.grid, this.blockSize, [y,x])
        let block2 = new Block(this.canvas, this.grid, this.blockSize, [y,x])
        let block3 = new Block(this.canvas, this.grid, this.blockSize, [y,x])
        let block4 = new Block(this.canvas, this.grid, this.blockSize, [y,x])
 
        this.blocks = [centerBlock, block2, block3, block4]
        this.setOffsets()
    }

    showShadow(shadowColor){
        this?.shadowPiece?.erase()
        this.shadowPiece = new Piece(this.shape, this.canvas, this.grid, this.blockSize, this.centerPosition, this.orientation, this.debugCanvas)
        while(this.shadowPiece.attemptTranslate('MOVEDOWN')) {}
        this.shadowPiece.draw(shadowColor)
    }

    //returns true if rotation worked, false if failed
    attemptRotate(direction){
        //rotate, then check if blocks from current position
        //if blocks, unrotate
        //Note- this is probably a silly way to do rotation collision checks but it's requires less code for now
        let initialOrientation = this.orientation
        this.rotate(direction)
        let newOrientation = this.orientation 
        console.log( String([initialOrientation, newOrientation]))
        if (this.illegalPosition()) {
            //attempt to kick
            if(this.attemptKick(initialOrientation, newOrientation) == false){ //kick failed
                //any 4 rotations returns to original position, easier than getting opposite direction
                this.rotate(direction)
                this.rotate(direction)
                this.rotate(direction)
                return false
            }
        } 
        return true
    }

    //returns true if kick worked, false if failed
    attemptKick(initialOrientation, newOrientation){
        
        let kickTable = KICK_TABLE
        let rotation = String([initialOrientation, newOrientation])

        for (let coordinates of kickTable[this.shape][rotation]){
            console.log(rotation, coordinates)
            if(this.attemptTranslate(coordinates, true)){
                return true
            }
        }
        

        //attempt translation to every test point
        return false
    }

    getShapeOffsets(piece, orientation){
        let tiles = piece[orientation]
        // let center = Math.trunc(tiles.length / 2) in case we add objects with more than 4 tiles
        let offsets = []
        let center = 1 //all pieces are size 3 except I and O which rotate their centers around point 1,1
        tiles.forEach((arr, row) => {
            arr.forEach((element, column) => {
                if (element) { //if non-zero element
                    offsets.push([row - center, column - center])
                }
            })
        })
        return offsets
    }

    //Takes changes block offsets(i.e. a piece's displayed shape and rotation0 based on this.orientation)
    setOffsets(){
        //updates centerOffset of each block based on new orientation
        this.blocks[0].centerOffset = [0,0]
        // console.log(this.shape, this.orientation)
        let offsets = this.getShapeOffsets(PIECES[this.shape], this.orientation)
        this.blocks.forEach( (block, index) => {
            block.centerOffset = offsets[index]
        })

    }

    rotate(direction){
        if(direction == 'ROTATERIGHT'){
            this.orientation = (4 + (this.orientation + 1)) % 4 
        } else if (direction == 'ROTATELEFT') {
            this.orientation = (4 + (this.orientation - 1)) % 4 
        } else if (direction == 'ROTATE180'){
            this.orientation = (4 + (this.orientation + 2)) % 4 
        }
        this.setOffsets()        
    }

    //Attempts to move piece in the specified direction/location, 'does nothing' if the move is illegal (OOB, collision)
        //returns true if translation worked, false if failed
    attemptTranslate(action, fromKick = false){
        // console.log('asdf')
        let newPosition
        const lastPosition = this.centerPosition
        newPosition = structuredClone(lastPosition)
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
            //Maybe a default option for moving to a specific place if necessary
        }
        
        this.translate(newPosition)
        if(fromKick){
            this.draw('green', this.debugCanvas)
            debugger
            this.erase(this.debugCanvas)
        }
        if( this.illegalPosition() ){

            this.translate(lastPosition)
            return false
        } 
        return true
    }

    translate(coords){ //translation on a plane- move left right or down 
        let y = coords[0]
        let x = coords[1]
        this.centerPosition = [y, x]
        this.blocks.forEach( (block) => {
            block.centerPosition = [y, x]
        })
    }

    //checks if current position overlaps with existing blocks or OOB
    illegalPosition(){
        for (let block of this.blocks){
            let [y, x] = block.getAbsolutePosition()
            let gridSpot = this.grid?.[y]?.[x]
            if(gridSpot != 0){
                //TODO breakpoint feature?
                // block.draw('green')
                // block.erase()
                return true
            }
        }
        return false
    }

    delete(){
        this.blocks.forEach((block) => {
            block.delete()
        })
    }

    hardDrop(){ //keeps moving down until dropped. Inputs should be blocked in transit, if transit time not 0
        console.log('piece being placed')

        while(this.attemptTranslate('MOVEDOWN')){
            //do nothing
        }
        this.isActive = false
        this.blocks.forEach((block) => {
            console.log('attempting to place: ', block)
            block.place()
        })
    }

    useGrace() { //each piece has 5/gravity seconds of grace time- how long a piece can sit on the ground before automatically being placed
        if (this.grace >= 0){
            this.place()
        } else {
            this.grace -= 1
        }
    }
    
    draw(color, selectedCanvas){
        this.blocks.forEach( (block) => {
            block.draw(color, selectedCanvas)
        })
    }

    erase(selectedCanvas){
        this.blocks.forEach( (block) => {
            block.erase(selectedCanvas)
        })
    }

    update(action){
        this.erase()
        //could probably be easily cleaned up but this isn't that bad
        const actions = {
            'NONE': () => {this.attemptTranslate(this.centerPosition)},
            'MOVEDOWN': () => {this.attemptTranslate(action)},
            'MOVELEFT': () => {this.attemptTranslate(action)},
            'MOVERIGHT': () => {this.attemptTranslate(action)},

            'ROTATERIGHT': () => {this.attemptRotate(action)},
            'ROTATELEFT': () => {this.attemptRotate(action)},
            'ROTATE180': () => {this.attemptRotate(action)},
            'HARDDROP': () => {
                this.hardDrop()
                // this.addPiece('L')
            },
        }
        actions[action]?.call(this)
        if(this.shadowEnabled){
            this.showShadow('#AA7777') //TODO Change Color
        }
        this.draw()

    }
}

// console.log(getShapeOffsets(PIECES.J, 3))