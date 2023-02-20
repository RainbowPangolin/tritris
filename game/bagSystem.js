export function generateNewBagUsing(bagSystem){
    if (Array.isArray(bagSystem)){
        let newBag = structuredClone(bagSystem)
        return newBag
    }
    switch (bagSystem){
        case '7-bag':
            return new sevenBagGenerator().bag
        default:
            throw new Error(`Invalid bag system used: ${bagSystem} which is represented by ${typeof bagSystem}`)
    }
}


function sevenBagGenerator(){
    let defaultOrderedBag = ['S', 'Z', 'L', 'J', 'T', 'I', 'O']
    this.bag = getShuffledArrayFrom(defaultOrderedBag)
}

//Basic Fisher-Yates implementation 
function getShuffledArrayFrom(array){
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    
    return array;
}