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

export function getConfig(){

    const curBindings = localStorage.getItem('inputconfig');

    if(curBindings){
        return curBindings;
    } else {
        localStorage.setItem('inputconfig', JSON.stringify(defaultConfig));
        return defaultConfig;
    }

}


export function setConfig(key_value_pair){

}