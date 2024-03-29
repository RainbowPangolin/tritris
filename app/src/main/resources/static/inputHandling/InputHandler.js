import { getConfig } from "./ConfigHandler.js";

const TURBO_ELIGIBLE_MOVES = ['MOVERIGHT', 'MOVELEFT', 'MOVEDOWN']
const LR_MOVES = ['MOVERIGHT', 'MOVELEFT']

// const defaultConfig = {
//     bindings: {
//         'k': 'MOVEDOWN',
//         'l': 'MOVERIGHT',
//         'j': 'MOVELEFT',
//         'a': 'ROTATELEFT',
//         'd': 'ROTATERIGHT',
//         'w': 'ROTATE180',
//         'i': 'HOLD',
//         ' ': 'HARDDROP',
//         't': 'START',
//         'y': 'END',
//         'r': 'RESTART',
//         'p': 'PAUSE',
//     },
//     turboDelay: 200, // milliseconds before the first repeat
//     turboInterval: 20 // milliseconds between repeats
// }

export class InputHandler{
    constructor(playerBoard){
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.playerBoard = playerBoard;
        this.config = getConfig();
        this.lastTime = 0;
        this.turboRepeat = null;
        this.turboDelay = 170; // default turbo delay in ms
        this.turboInterval = 20;
        this.softDropInterval = 20;

        this.keysPressed = new Set();
        this.keysToHoldRequestID = new Map();
        this.keysToLastDASTime = new Map();
        this.moveDirBuffer = [];
    }

    handleTurbo(timestamp, key){
        try {          
            const performanceMarkObj = performance.getEntriesByName(key)
            const startTime = performanceMarkObj[0].startTime
            const holdTime = timestamp - startTime;
            
            let lastTime = this.keysToLastDASTime.get(key)    
            let curTime = performance.now()

            const holdReqID = window.requestAnimationFrame((timestamp) => {
                this.handleTurbo(timestamp, key)
            })
            const input = this.config.bindings[key]

            this.keysToHoldRequestID.set(key, holdReqID)    

            let interval
            if (input == 'MOVEDOWN'){
                interval = this.softDropInterval
            } else {
                interval = this.turboInterval
            }

            let mappedAction = this.config.bindings[key]

            if(LR_MOVES.includes(mappedAction) && (this.moveDirBuffer[0] != mappedAction)){
                return
            }

            if (input == 'MOVEDOWN'){
                if((curTime - lastTime >= interval)){
                    this.keysToLastDASTime.set(key, curTime) 
                    this.playerBoard.receiveInput(input)
                }
            } else {
                if(holdTime >= this.turboDelay && (curTime - lastTime >= interval)){
                    this.keysToLastDASTime.set(key, curTime) 
                    this.playerBoard.receiveInput(input)
                }
            }
            

        } catch (error){
            console.log(error, "Caused by key:", key)
        }


    }

    

    handleKeyDown(event) {
        const keyCode = event.keyCode || event.which;
        const pressedKey = String.fromCharCode(keyCode).toLowerCase();
        let isInputElement = event.target.tagName.toLowerCase() == 'input' || event.target.closest('input') != null;
       
        if (isInputElement) {
            return
        }
        if(!(pressedKey in this.config.bindings)){
            return
        }

        event.preventDefault()
        //TODO- prevent simultaneously moving left and right
        if((this.keysPressed.has(pressedKey))){
            return
        }
  
        this.keysPressed.add(pressedKey)
        this.processInput(pressedKey)
        
        //TODO consider refactoring to use mapped action rather than key
        let mappedAction = this.config.bindings[pressedKey]

        if(LR_MOVES.includes(mappedAction)){
            this.moveDirBuffer.unshift(mappedAction) 
        }


    }

    processInput(key){
        const input = this.config.bindings[key]
        this.playerBoard.receiveInput(input)
        if(this.isTurboEligible(key)){
            this.startDAS(key);
        }
    }

    isTurboEligible(key){
        let mappedAction = this.config.bindings[key]
        if (TURBO_ELIGIBLE_MOVES.includes(mappedAction)){
            return true
        } else {
            return false
        }
    }

    startDAS(pressedKey){
        performance.mark(pressedKey)
        this.keysToLastDASTime.set(pressedKey, performance.now())    
        window.requestAnimationFrame((timestamp) => {
            this.handleTurbo(timestamp, pressedKey)
        })
    }

    handleKeyUp(event) {
        event.preventDefault()
        let unPressedKey = event.key
        this.keysPressed.delete(unPressedKey)

        let mappedAction = this.config.bindings[unPressedKey]

        this.moveDirBuffer = this.moveDirBuffer.filter(item => item != mappedAction);

        let holdReqID = this.keysToHoldRequestID.get(unPressedKey)
        cancelAnimationFrame(holdReqID);

        this.keysToHoldRequestID.delete(unPressedKey)
        performance.clearMarks(unPressedKey)

    }

    bindHandlerToDocument(domDocument){
        domDocument.addEventListener("keydown", this.handleKeyDown);
        domDocument.addEventListener("keyup", this.handleKeyUp);
    }

    updateBindings(bindings) {
        this.config.bindings = bindings
        localStorage.setItem('config', JSON.stringify(this.config))
    }

    updateTurboDelay(delay) {
        this.config.turboDelay = delay
        localStorage.setItem('config', JSON.stringify(this.config))
    }

    updateTurboInterval(interval) {
        this.config.turboInterval = interval
        localStorage.setItem('config', JSON.stringify(this.config))
    }
}
