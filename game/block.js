export class Block {
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
        // ctx.strokeStyle = "black";
        // ctx.strokeRect(x * this.blockSize, y * this.blockSize, this.blockSize, this.blockSize);
    }

    erase(){ //removes block, does not affect logic
        let [y,x] = this.getAbsolutePosition()
        const ctx = this.canvas.getContext("2d");
        ctx.clearRect(x * this.blockSize, y * this.blockSize, this.blockSize , this.blockSize);
        // ctx.clearStroke(x * this.blockSize, y * this.blockSize, this.blockSize, this.blockSize);
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