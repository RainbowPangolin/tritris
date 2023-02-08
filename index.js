class Block {
    constructor(canvas, grid, blockSize, position, options = {'color':"#FF0000"}){
        this.canvas = canvas
        this.grid = grid
        this.blockSize = blockSize
        this.centerPosition = position
        this.options = options
        this.isActive = true
        this.centerOffset = [0,0] 
    }

    draw(color = this.options['color']){ //TODO- Find a better way of representing colors
        let [y,x] = this.getAbsolutePosition()
        const ctx = this.canvas.getContext("2d");
        ctx.fillStyle = color;
        ctx.fillRect(x * this.blockSize, y * this.blockSize, this.blockSize, this.blockSize);
    }

    erase(){ //removes block, does not affect logic
        let [y,x] = this.getAbsolutePosition()
        const ctx = this.canvas.getContext("2d");
        ctx.clearRect(x * this.blockSize, y * this.blockSize, this.blockSize, this.blockSize);
    }

    place(){ //places block in current, final position
        let [y,x] = this.getAbsolutePosition()
        this.isActive = false
        this.grid[y][x] = this
        this.draw()
    }

    getAbsolutePosition(){ //returns y,x coordinates relative to Grid based on center's osition and offset
        let y = this.centerPosition[0] + this.centerOffset[0]
        let x = this.centerPosition[1] + this.centerOffset[1]
        return [y, x]
    }

}

class Piece {
    constructor(shape, canvas, grid, blockSize, centerPosition, orientation = 0, shadowEnabled = true){
        this.shape = shape
        this.canvas = canvas
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

        this.blocks = [centerBlock, block2, block3]
        this.setOffsets()
    }

    showShadow(shadowColor){
        this?.shadowPiece?.erase()
        this.shadowPiece = new Piece(this.shape, this.canvas, this.grid, this.blockSize, this.centerPosition, this.orientation)
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

        if (this.illegalPosition()) {
            //attempt to kick
            if(this.attemptKick(initialOrientation, newOrientation) == false){ //kick failed
                //any 4 rotations returns to original position
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
        //see Tetris Guideline SRS kick data table https://tetris.fandom.com/wiki/SRS
        //test1 was alrteady tried, so table contains test2, 3, 4, and 5
        const kickTable = {
            'L': {
                '0,1': [[0, -1], [1, -1], [-2, 0], [-2, -1]],
                '1,0': [[0, 1], [-1, 1], [2, 0], [2,1]],
                '1,2': [[0,1], [-1, 1], [2,0], [2,1]],
                '2,1': [[0,-1], [1, -1], [-2,0], [-2,-1]],
                '2,3': [[0,1], [1,1], [-2,0], [-2,1]],
                '3,2': [[0,-1], [-1,-1], [2,0], [2,-1]],
                '3,0': [[0,-1], [-1,-1], [2,0], [2,-1]],
                '0,3': [[0,1], [1,1], [-2,0], [-2, 1]]
            },
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
            'I4': { // adjusted for 3 long I piece
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
        let rotation = String([initialOrientation, newOrientation])

        for (let coordinates of kickTable[this.shape][rotation]){
            console.log(rotation, coordinates)

            if(this.attemptTranslate(coordinates)){
                return true
            }
        }
        

        //attempt translation to every test point
        return false
    }

    //Takes changes block offsets(i.e. a piece's displayed shape and rotation0 based on this.orientation)
    setOffsets(){
        //updates centerOffset of each block based on new orientation
        this.blocks[0].centerOffset = [0,0]
        if(this.shape == '3I') {
            switch(this.orientation){
                case 0:
                    this.blocks[1].centerOffset = [0,1]
                    this.blocks[2].centerOffset = [0,-1]
                    break
                case 1:
                    this.blocks[1].centerOffset = [1,0]
                    this.blocks[2].centerOffset = [-1,0]
                    break
                case 2: 
                    this.blocks[1].centerOffset = [0,-1]
                    this.blocks[2].centerOffset = [0,1]
                    break
                case 3:
                    this.blocks[1].centerOffset = [-1,0]
                    this.blocks[2].centerOffset = [1,0]
                    break
            }
        } else { //shape is '3L'
            switch(this.orientation){
                case 0:
                    this.blocks[1].centerOffset = [-1,0]
                    this.blocks[2].centerOffset = [0,1]
                    break
                case 1:
                    this.blocks[1].centerOffset = [0,1]
                    this.blocks[2].centerOffset = [1,0]
                    break
                case 2:
                    this.blocks[1].centerOffset = [1,0]
                    this.blocks[2].centerOffset = [0,-1]
                    break
                case 3: 
                    this.blocks[1].centerOffset = [-1,0]
                    this.blocks[2].centerOffset = [0,-1]
                    break
            }
        }
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
    attemptTranslate(action){
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

        // console.log(this.illegalPosition())
        if( this.illegalPosition() ){
            //undo move
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
            if(this.grid?.[y]?.[x] != 0){
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
    
    draw(color){
        this.blocks.forEach( (block) => {
            block.draw(color)
        })
    }

    erase(){
        this.blocks.forEach( (block) => {
            block.erase()
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
        this.draw()
        if(this.shadowEnabled){
            this.showShadow('#AA7777') //TODO Change Color
        }
    }
}

class Board {
    constructor(width = 9, height = 22){ // playable board is only up to 18. buffer above for new pieces, buffer below for floor
        const BLOCK_SIZE = 25
        this.blockSize = BLOCK_SIZE
        let canvas = document.createElement("canvas");
        canvas.width = BLOCK_SIZE*width //TODO make size modular
        canvas.height = BLOCK_SIZE*height //TODO make size modular
        this.canvas = canvas
        this.gravity = 1
        document.body.append(canvas) //TODO Return this canvas object instead of attaching to document in constructor
        // this.mode = mode

        //create internal representaion of game state
        let grid = []
        for (let i = 0; i < height; i++){
            let innerGrid = []
            for( let j = 0; j < width; j++){
                innerGrid.push(0)
            }
            grid.push(innerGrid)
        }
        let floorArr = []
        for (let i = 0; i < width; i++){
            floorArr.push(1)
        }
        grid.push(floorArr)
        this.grid = grid
    }

    changeGravity(gravity){
        this.gravity = gravity
    }
    
    addPiece(shape, location = [2, 4], shadowEnabled){
        let curPiece = new Piece(shape, this.canvas, this.grid, this.blockSize, location, 0, shadowEnabled)
        this.curPiece = curPiece
        this.curPiece.update('NONE')
    }

    update(action = 'MOVEDOWN'){
        this.curPiece.update(action)
        if(action == 'HARDDROP'){ //TODO These if statements are inelegant
            this.addPiece(this.nextPiece())
        } else if (action == 'HOLD'){
            
        }
    }

    nextPiece(curShape = this.curPiece.shape){
        //TODO- Offer different bag types
        if (curShape == '3L'){
            return '3I'
        } else if (curShape == '3I'){
            return '3L'
        }
    }

    blockDropped(){
        if(!this.curPiece.isActive){
            return true
        }
        return false
    }


    

}

class GameBoard extends Board {
    constructor(width, height){
        super(width, height)
    } 
    //emit event for piece being placed
    //TODO Scoring
}

class PreviewSquare extends Board {
    constructor(width, height){ //TODO allow for single argument to determine square length
        super(width, height)
    }
    showPiece(shape){
        this?.curPiece?.erase()
        this.addPiece(shape, [2,1], false) //Location is ???
    }
}

let playerBoard = new GameBoard()

// let preview = new PreviewSquare(4, 4)
const previewWindow = {
    'previewArray': [],

    updatePieces(){
        let nextPiece = playerBoard.nextPiece() //TODO Make this a non singleton?
        this.previewArray.forEach( (previewSquare) => {
            previewSquare.showPiece(nextPiece)
            nextPiece = playerBoard.nextPiece(nextPiece)
        })
    }
}

for (let i = 0 ; i < 3; i++){
    previewWindow.previewArray.push(new PreviewSquare(4, 4))
}



playerBoard.addPiece('3I')

previewWindow.updatePieces()


console.log(playerBoard.grid)

// setInterval(function () {
//     newBoard.update()
//     console.log('translated')
// }, 1000);

document.addEventListener("keydown", (event) => {
    switch(event.key){
        case 'k':
            playerBoard.update('MOVEDOWN')
            break
        case 'l':
            playerBoard.update('MOVERIGHT')
            break
        case 'j':
            playerBoard.update('MOVELEFT')
            break        
        case 'a':
            playerBoard.update('ROTATELEFT')
            break
        case 'd':
            playerBoard.update('ROTATERIGHT')
            break
        case 'i':
            playerBoard.update('HOLD')
            break
        case ' ':
            playerBoard.update('HARDDROP')
            break
            
    }
    
})