class CanvasCreator {
  constructor(domDocument, width, height, blockSize) {
    this.domDocument = domDocument;
    this.width = width;
    this.height = height;
    this.blockSize = blockSize;
  }

  getNewCanvas({type = 'minoBoardCanvas'} = {}) {
    let newCanvas = this.domDocument.createElement("canvas");
    if(type == 'minoBoardCanvas') {
      newCanvas.width = this.blockSize * this.width;
      newCanvas.height = this.blockSize * this.height;
    } else {
      // Just enough to draw a piece
      newCanvas.width = this.blockSize * 4;
      newCanvas.height = this.blockSize * 3;
    }

    return newCanvas;
  }
}
