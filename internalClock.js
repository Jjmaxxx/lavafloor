const RoundManager = require('./roundManager');
class InternalClock{
    constructor(tickTime){
        this.tickTime = tickTime;
    }
    startTick(functions){
        setTimeout(()=>{
            for(let i=0; i<functions.length;i++){
                //if there are more functions to put through this than separate the function call from this.obstacles, but for now is fine bc only one function being called
                functions[i]();
            }
            this.startTick(functions);
        }, this.tickTime * 1000)
    }
}

module.exports = InternalClock;