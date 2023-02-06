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

    draw(){
        let [y,x] = this.getAbsolutePosition()
        const ctx = this.canvas.getContext("2d");
        ctx.fillStyle = this.options['color'];
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
    constructor(shape, canvas, grid, blockSize, centerPosition){
        this.shape = shape
        this.canvas = canvas
        this.grid = grid
        this.blockSize = blockSize
        this.centerPosition = centerPosition
        this.orientation = 0 //4 positions, 0 1 2 3  
        this.isActive = true
        this.grace = 5
        this.spawn(centerPosition)
    }

    spawn(coords){
        let y = coords[0]
        let x = coords[1]
        this.centerPosition = [y, x]

        let centerBlock = new Block(this.canvas, this.grid, this.blockSize, [y,x])
        let block2 = new Block(this.canvas, this.grid, this.blockSize, [y,x])
        let block3 = new Block(this.canvas, this.grid, this.blockSize, [y,x])
    
        if(this.shape == 'I'){
            centerBlock.centerOffset = [0,0]
            block2.centerOffset = [0,1]
            block3.centerOffset = [0,-1]
        } else if (this.shape == 'L'){
            centerBlock.centerOffset = [0,0]
            block2.centerOffset = [-1,0]
            block3.centerOffset = [0,1]
        } else {
            throw new Error("Illegal shap")
        }

        centerBlock.draw()
        block2.draw()
        block3.draw()

        this.blocks = [centerBlock, block2, block3]
    }

    // showShadow(){
    //     this.shadowPiece = new Piece(this.shape, this.canvas, this.grid, this.blockSize, this.centerPosition)
    //     while(this.shadowPiece.attemptTranslate('MOVEDOWN')) {}
    // }

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

    rotate(direction){
        if(direction == 'ROTATERIGHT'){
            this.orientation = (4 + (this.orientation + 1)) % 4 
        } else if (direction == 'ROTATELEFT') {
            this.orientation = (4 + (this.orientation - 1)) % 4 
        } else if (direction == 'ROTATE180'){
            this.orientation = (4 + (this.orientation + 2)) % 4 
        }

        //updates centerOffset of each block based on new orientation
        if(this.shape == 'I') {
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
        } else { //shape is 'L'
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
    
    draw(){
        this.blocks.forEach( (block) => {
            block.draw()
        })
    }

    erase(){
        this.blocks.forEach( (block) => {
            block.erase()
        })
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
        document.body.append(canvas)

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
    
    addPiece(shape){
        let curPiece = new Piece(shape, this.canvas, this.grid, this.blockSize, [2, 4])
        this.curPiece = curPiece
    }

    update(action = 'MOVEDOWN'){
        this.curPiece.erase()
        //could probably be easily cleaned up but this isn't that bad
        const actions = {
            'MOVEDOWN': () => {this.curPiece.attemptTranslate(action)},
            'MOVELEFT': () => {this.curPiece.attemptTranslate(action)},
            'MOVERIGHT': () => {this.curPiece.attemptTranslate(action)},

            'ROTATERIGHT': () => {this.curPiece.attemptRotate(action)},
            'ROTATELEFT': () => {this.curPiece.attemptRotate(action)},
            'ROTATE180': () => {this.curPiece.attemptRotate(action)},
            'HARDDROP': () => {
                this.curPiece.hardDrop()
                this.addPiece('L')
            },
        }
        actions[action]?.call(this)
        this.curPiece.draw()
    }

    blockDropped(piece){
        if(!this.curPiece.isActive){
            return true
        }
        return false
    }

}

let newBoard = new Board()

newBoard.addPiece('I')

console.log(newBoard.grid)

// setInterval(function () {
//     newBoard.update()
//     console.log('translated')
// }, 1000);

document.addEventListener("keydown", (event) => {
    switch(event.key){
        case 'k':
            newBoard.update('MOVEDOWN')
            break
        case 'l':
            newBoard.update('MOVERIGHT')
            break
        case 'j':
            newBoard.update('MOVELEFT')
            break        
        case 'a':
            newBoard.update('ROTATELEFT')
            break
        case 'd':
            newBoard.update('ROTATERIGHT')
            break
        case ' ':
            newBoard.update('HARDDROP')
            
    }
    
})