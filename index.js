class Block {
    constructor(gravity, canvas, grid, blockSize, position, options = {'color':"#FF0000"}){
        // this.shape = shape
        this.gravity = gravity
        this.canvas = canvas
        this.grid = grid
        this.blockSize = blockSize
        this.centerPosition = position
        this.options = options
        this.isActive = true
        this.centerOffset = [0,0] //y, x 
        // this.draw()
    }

    draw(){ //draws block in temporary position
        let y = this.centerPosition[0] + this.centerOffset[0]
        let x = this.centerPosition[1] + this.centerOffset[1]
        //updating grid
        // this.grid[y][x] = 1

        //drawing to canvas
        const ctx = this.canvas.getContext("2d");
        ctx.fillStyle = this.options['color'];
        ctx.fillRect(x * this.blockSize, y * this.blockSize, this.blockSize, this.blockSize);
        // ctx.fill();
    }

    erase(){ //removes block
        let y = this.centerPosition[0] + this.centerOffset[0]
        let x = this.centerPosition[1] + this.centerOffset[1]
        // this.centerPosition = [-1,-1] //should dunno if I'll need this
        // this.grid[y][x] = 0
        const ctx = this.canvas.getContext("2d");
        ctx.clearRect(x * this.blockSize, y * this.blockSize, this.blockSize, this.blockSize);
    }

    place(){ //places block in current, final position
        this.isActive = false
        let y = this.centerPosition[0] + this.centerOffset[0]
        let x = this.centerPosition[1] + this.centerOffset[1]
        this.grid[y][x] = this
        console.log('block placed')
        console.log(this)
    }

    signal(){
        console.log('signaled')
    }
}

class Piece {
    constructor(shape, gravity, canvas, grid, blockSize, centerPosition){
        this.shape = shape
        this.gravity = gravity
        this.canvas = canvas
        this.grid = grid
        this.blockSize = blockSize
        this.centerPosition = centerPosition
        this.orientation = 0 //4 positions, 0 1 2 3
        this.isActive = true
        this.grace = 5
        // this.draw()

        this.spawn(centerPosition)
    }

    spawn(coords){
        let y = coords[0]
        let x = coords[1]
        this.centerPosition = [y, x]
        // this.blocks = []
        if(this.shape == 'I'){
            //block1 is the center block
            let centerBlock = new Block(1, this.canvas, this.grid, this.blockSize, [y,x])
            let block2 = new Block(1, this.canvas, this.grid, this.blockSize, [y,x])
            let block3 = new Block(1, this.canvas, this.grid, this.blockSize, [y,x])

            centerBlock.centerOffset = [0,0]
            block2.centerOffset = [-1,0]
            block3.centerOffset = [1,0]

            centerBlock.draw()
            block2.draw()
            block3.draw()

            this.blocks = [centerBlock, block2, block3]
        } else if (this.shape == 'L'){
            let centerBlock = new Block(1, this.canvas, this.grid, this.blockSize, [y,x])
            let block2 = new Block(1, this.canvas, this.grid, this.blockSize, [y,x])
            let block3 = new Block(1, this.canvas, this.grid, this.blockSize, [y,x])
            centerBlock.draw([y, x])
            block2.draw([y - 1, x])
            block3.draw([y, x + 1])
            centerBlock.centerOffset = [0,0]
            block2.centerOffset = [-1,0]
            block3.centerOffset = [1,0]
            this.blocks = [centerBlock, block2, block3]
        } else {
            throw new Error("bad bad")
        }
    }

    rotate(direction){
        //updates centerOffset of each block
        let y = this.centerPosition[0]
        let x = this.centerPosition[1]
        this.blocks.forEach( (block) => {
            // console.log(block)
            block.erase()
        })


        if(direction == 'RIGHT'){
            this.orientation = (4 + (this.orientation + 1)) % 4 
        } else if (direction == 'LEFT') {
            this.orientation = (4 + (this.orientation - 1)) % 4 
        }

        if(this.shape == 'I') {
            console.log(this.orientation)

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
            //updates centerOffset of each block based on new orientation
        } else { //shape is 'L'
            switch(this.orientation){
                case 0:
                    this.blocks[1].centerOffset = [-1,0]
                    this.blocks[2].centerOffset = [1,0]
                    break
                case 1:
                    this.blocks[1].centerOffset = [-1,0]
                    this.blocks[2].centerOffset = [1,0]
                    break
                case 2:
                    this.blocks[1].centerOffset = [-1,0]
                    this.blocks[2].centerOffset = [1,0]
                    break
                case 3: 
                    this.blocks[1].centerOffset = [-1,0]
                    this.blocks[2].centerOffset = [1,0]
                    break
            }
        }

        this.blocks.forEach( (block) => {
            // console.log(block)
            block.draw()
        })
    }

    attemptMove(coords){
        if( this.wouldBlock(coords) ){
            //do nothing
        } else {
            this.move(coords)
        }
    }

    move(coords){
        let y = coords[0]
        let x = coords[1]
        this.blocks.forEach( (block) => {
            console.log(block)
            block.erase()
        })

        this.centerPosition = [y, x]

        //erase then redraw
        //swithc case for  each orientation and shape
      
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

    place(){ //sets flag for board to place piece in current, final position
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
        let curPiece = new Piece(shape, this.gravity, this.canvas, this.grid, this.blockSize, [2, 4])
        // curPiece.move([2, 4])
        this.curPiece = curPiece
    }

    update(direction = 'down'){
        if(this.blockDropped(this.curPiece)){
            this.curPiece = new Piece('I', this.gravity, this.canvas, this.grid, this.blockSize, [2, 4])
            // this.curPiece.move([2, 4])
            return
        }  

        //bad code for testing rotation
        if(direction == "ROTATERIGHT"){
            // console.log('asdf')
            this.curPiece.rotate('RIGHT')
            return
        }


        let newPosition
        let lastPosition = this.curPiece.centerPosition
        newPosition = lastPosition
        switch(direction){
            case 'down':
                newPosition[0] += 1
                break
            case 'left':
                newPosition[1] -= 1
                break
            case 'right':
                newPosition[1] += 1
                break


        }
        this.curPiece.attemptMove(newPosition)

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
//     console.log('moved')
// }, 1000);

document.addEventListener("keydown", (event) => {
    switch(event.key){
        case 'l':
            newBoard.update('right')
            break
        case 'j':
            newBoard.update('left')
            break        
        case 'a':
            newBoard.update('ROTATERIGHT')
            break
        case 'd':
            newBoard.update('ROTATELEFT')
            break
        case ' ':
            newBoard.curPiece.place()
    }
    
})