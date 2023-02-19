import {GameBoard} from './subBoards.js'

let playerBoard = new GameBoard({
    width: 9,
    height: 22,
    domDocument: document
})

playerBoard.startGame()


console.log(playerBoard.shadowPiece.color)
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

document.addEventListener("keydown", (event) => {
    switch(event.key){
        case 'k':
            playerBoard.receiveInput('MOVEDOWN')
            break
        case 'l':
            playerBoard.receiveInput('MOVERIGHT')
            break
        case 'j':
            playerBoard.receiveInput('MOVELEFT')
            break        
        case 'a':
            playerBoard.receiveInput('ROTATELEFT')
            break
        case 'd':
            playerBoard.receiveInput('ROTATERIGHT')
            break
        case 'w':
            playerBoard.receiveInput('ROTATE180')
            break
        case 'i':
            playerBoard.receiveInput('HOLD')
            break
        case ' ':
            playerBoard.receiveInput('HARDDROP')
            break
            
    }
    
})