import {GameBoard, PreviewSquare} from './subBoards.js'

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



playerBoard.addPiece('I')

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