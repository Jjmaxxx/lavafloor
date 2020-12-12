const Spawner = require('./spawner');
class RoundManager{
    constructor(){
        this.spawner = new Spawner(1000,1000,5000);
        this.spawnerTime = this.spawner.spawnTime;
        this.obstacles = this.spawner.obstacles;
    }
    //call update through internalclock
    //get something on the screen spawning every couple seconds
    update(){
        this.spawnerTime -= 1000;
        if(this.spawnerTime <= 0){
            this.spawner.spawnProjectiles();
            this.obstacles = this.spawner.obstacles;
            this.spawner.clearObstacles();
            this.spawnerTime = this.spawner.spawnTime;
        }
    }
    
}
module.exports = RoundManager;