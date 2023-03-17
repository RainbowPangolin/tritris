// Define a default configuration object

const DAS_ELIGIBLE_MOVES = ['MOVERIGHT', 'MOVELEFT']

const defaultConfig = {
    bindings: {
        'k': 'MOVEDOWN',
        'l': 'MOVERIGHT',
        'j': 'MOVELEFT',
        'a': 'ROTATELEFT',
        'd': 'ROTATERIGHT',
        'w': 'ROTATE180',
        'i': 'HOLD',
        ' ': 'HARDDROP',
        't': 'START',
        'y': 'END',
        'r': 'RESTART'
    },
    turboDelay: 200, // milliseconds before the first repeat
    turboInterval: 200 // milliseconds between repeats
}

export class InputHandler{
    constructor(playerBoard){
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.playerBoard = playerBoard
        this.config = JSON.parse(localStorage.getItem('config')) || defaultConfig
        this.lastTime = 0
        this.turboRepeat = null
        this.turboDelay = 200 // default turbo delay in ms
        this.turboInterval = 20 

        this.keysPressed = new Set()
        this.keysToHoldRequestID = new Map()
    }

    handleTurbo(timestamp, key){
        const performanceMarkObj = performance.getEntriesByName(key)
        const startTime = performanceMarkObj[0].startTime
        const holdTime = timestamp - startTime;
        const elapsedTime = holdTime - this.turboDelay
        const shouldFire = ((elapsedTime % this.turboInterval) == 0)

        const holdReqID = window.requestAnimationFrame((timestamp) => {
            this.handleTurbo(timestamp, key)
        })

        //TODO Concerned this has a large memory impact as it fires hundreds of times per second.
        this.keysToHoldRequestID.set(key, holdReqID)    

        if(holdTime >= this.turboDelay){
            console.log(`Key ${key} held; DASing`);

        }


    }

    handleKeyDown(event) {
        event.preventDefault()
        const pressedKey = event.key
        if((this.keysPressed.has(pressedKey))){
            return
        }

        if(this.isDASEligible(pressedKey)){
            this.startDAS(pressedKey);
        }
        // console.log("keyDown: ", pressedKey)
        // this.playerBoard.receiveInput(input)
    }

    isDASEligible(key){
        let mappedAction = this.config.bindings[key]
        if (DAS_ELIGIBLE_MOVES.includes(mappedAction)){
            return true
        } else {
            return false
        }
    }

    startDAS(pressedKey){
        this.keysPressed.add(pressedKey)
        performance.mark(pressedKey)

        window.requestAnimationFrame((timestamp) => {
            this.handleTurbo(timestamp, pressedKey)
        })
    }

    handleKeyUp(event) {
        event.preventDefault()
        let pressedKey = event.key
        this.keysPressed.delete(pressedKey)

        let holdReqID = this.keysToHoldRequestID.get(pressedKey)
        cancelAnimationFrame(holdReqID);

        this.keysToHoldRequestID.delete(pressedKey)
        performance.clearMarks(pressedKey)
        console.log("keyUp")
    }

    turboInput(input, timestamp) {
        if (timestamp - this.lastTime >= this.turboInterval) {
            this.playerBoard.receiveInput(input)
            this.lastTime = timestamp
        }
        this.turboRepeat = requestAnimationFrame(turboInput.bind(null, input))
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
