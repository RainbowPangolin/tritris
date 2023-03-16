// Define a default configuration object
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
    turboInterval: 2000 // milliseconds between repeats
}

export class InputHandler{
    constructor(playerBoard){
        this.handleKeyDown = this.handleKeyDown.bind(this);

        this.playerBoard = playerBoard
        // this.config = JSON.parse(localStorage.getItem('config')) || defaultConfig
        this.config = defaultConfig
        this.lastTime = 0
        this.turboRepeat = null
        this.turboDelay = 200 // default turbo delay in ms
        this.turboInterval = 20 
    }

    handleKeyDown(event) {
        event.preventDefault()
        const input = this.config.bindings[event.key]
        if (input) {
            this.playerBoard.receiveInput(input)
    
            // // Handle turbo mode
            // if (event.repeat && this.turboRepeat === null) {
            //     // Start turbo mode
            //     this.turboRepeat = requestAnimationFrame(this.turboInput.bind(null, input))
            // } else if (!event.repeat && this.turboRepeat !== null) {
            //     // End turbo mode
            //     cancelAnimationFrame(this.turboRepeat)
            //     this.turboRepeat = null
            // }
        }
    }

    turboInput(input, timestamp) {
        if (timestamp - this.lastTime >= this.turboInterval) {
            this.playerBoard.receiveInput(input)
            this.lastTime = timestamp
        }
        this.turboRepeat = requestAnimationFrame(turboInput.bind(null, input))
    }

    bindHandlerToDocument(domDocument){
        domDocument.addEventListener("keydown", this.handleKeyDown)
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
