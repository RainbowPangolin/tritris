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
        let y = this.centerPosition[0] + this.centerOffset[0]
        let x = this.centerPosition[1] + this.centerOffset[1]
        const ctx = this.canvas.getContext("2d");
        ctx.fillStyle = this.options['color'];
        ctx.fillRect(x * this.blockSize, y * this.blockSize, this.blockSize, this.blockSize);
    }

    erase(){ //removes block, does not affect logic
        let y = this.centerPosition[0] + this.centerOffset[0]
        let x = this.centerPosition[1] + this.centerOffset[1]
        const ctx = this.canvas.getContext("2d");
        ctx.clearRect(x * this.blockSize, y * this.blockSize, this.blockSize, this.blockSize);
    }

    place(){ //places block in current, final position
        this.isActive = false
        let y = this.centerPosition[0] + this.centerOffset[0]
        let x = this.centerPosition[1] + this.centerOffset[1]
        this.grid[y][x] = this
        this.draw()
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
            block2.centerOffset = [-1,0]
            block3.centerOffset = [1,0]
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

    attemptRotate(direction){
        //rotate, then check if blocks from current position
        //if blocks, unrotate

        this.rotate(direction)
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
                    this.blocks[1].centerOffset = [-1,0]
                    this.blocks[2].centerOffset = [1,0]
                    break
                case 1:
                    this.blocks[1].centerOffset = [0,1]
                    this.blocks[2].centerOffset = [0,-1]
                    break
                case 2:
                    this.blocks[1].centerOffset = [1,0]
                    this.blocks[2].centerOffset = [-1,0]
                    break
                case 3: 
                    this.blocks[1].centerOffset = [0,-1]
                    this.blocks[2].centerOffset = [0,1]
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

    attemptTranslate(direction){
        let newPosition
        let lastPosition = this.centerPosition
        newPosition = lastPosition
        switch(direction){
            case 'MOVEDOWN':
                newPosition[0] += 1
                break
            case 'MOVELEFT':
                newPosition[1] -= 1
                break
            case 'MOVERIGHT':
                newPosition[1] += 1
                break
        }
        if( this.wouldBlock(newPosition) ){
            //do nothing
        } else {
            this.translate(newPosition)
        }
        
    }

    translate(coords){ //translation on a plane- move left right or down 
        let y = coords[0]
        let x = coords[1]
        this.centerPosition = [y, x]
        this.blocks.forEach( (block) => {
            block.centerPosition = [y, x]
        })
    }

    //checks if moving to coords would be illegal
    wouldBlock(coords){ 
        //for each block, check if
    }

    delete(){
        this.blocks.forEach((block) => {
            block.delete()
        })
    }

    hardDrop(){ //keeps moving down until dropped. Inputs should be blocked in transit, if transit time not 0
        console.log('piece being placed')
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

    findGround(){ //used for shadow piece and harddrop. checks where the piece would land on hard drop
        
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
        
        this.curPiece.blocks.forEach( (block) => {
            block.erase()
        })


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
        actions[action]?.call(null) ?? console.log('illegal move')

        this.curPiece.blocks.forEach( (block) => {
            block.draw()
        })
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