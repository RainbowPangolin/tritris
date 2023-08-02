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
        'r': 'RESTART',
        'p': 'PAUSE',
    },
    turboDelay: 200, // milliseconds before the first repeat
    turboInterval: 20 // milliseconds between repeats
}

const curBindings = localStorage.getItem('inputconfig');

if(curBindings){
    console.log(curBindings);
} else {
    console.log('no bindings found')
}

export function getConfig(){
    console.log(defaultConfig);
    return defaultConfig;
}