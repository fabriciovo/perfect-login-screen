

export default class Input {
    constructor() {
        this.keyDown = new Set();


        this.init();
    }

    init() {
        document.addEventListener('keydown', this.handleKeyDown)
        document.addEventListener('keyup', this.handleKeyUp)
    }


    handleKeyDown = (event) => {
        console.log(event)
        this.keyDown.add(event.key.toLowerCase());
    }

    handleKeyUp = (event) => {
        this.keyDown.delete(event.key.toLowerCase());
    }

    inputPressed(key){
        if(this.keyDown.has(key)){
            debugger

            return true;
        }else{
            return false;
        }
    }


}