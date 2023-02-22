//TODO- Find a better way of representing colors?

export class Block {
    constructor({
        canvas, 
        grid, 
        blockSize,
        positionOfCenterBlock, 
        color} = {}
        ){
        Object.assign(this, {canvas, grid, blockSize, positionOfCenterBlock, color})
        this.defaults =  {canvas, grid, blockSize, positionOfCenterBlock, color}
        this.isActive = true
        this.centerOffset = [0,0] 
    }

    set activeCanvas(canvas){
        this.canvas = canvas
    }

    get activeCanvas(){
        return this.canvas
    }

    draw(){ 
        let [y,x] = this.getAbsolutePosition()
        const ctx = this.canvas.getContext("2d");
        ctx.fillStyle = 'black';
        ctx.fillRect(x * this.blockSize, y * this.blockSize, this.blockSize, this.blockSize);        
        ctx.fillStyle = this.color;
        ctx.fillRect(x * this.blockSize + 1, y * this.blockSize + 1, this.blockSize -  2, this.blockSize - 2);
    }

    erase(){ //removes block, does not affect logic
        let [y,x] = this.getAbsolutePosition()
        const ctx = this.canvas.getContext("2d");
        ctx.clearRect(x * this.blockSize, y * this.blockSize, this.blockSize , this.blockSize);
    }

    place(){ //places block in current, final position
        let [y,x] = this.getAbsolutePosition()
        this.isActive = false
        this.grid[y][x] = this
        this.draw()
    }

    resetSettings(){
        Object.assign(this, this.defaults)
    }

    getAbsolutePosition(){ //returns y,x coordinates to this.grid based on center's position and offset
        let y = this.positionOfCenterBlock[0] + this.centerOffset[0]
        let x = this.positionOfCenterBlock[1] + this.centerOffset[1]
        return [y, x]
    }

}