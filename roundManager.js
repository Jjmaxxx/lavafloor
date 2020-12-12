const Spawner = require('./spawner');
class RoundManager{
    constructor(){
        // no errors and nothing gets called probably means that all of these requires are undefined or something idk maybe connections are getting screwed
        this.spawner = new Spawner(1000,1000,5000);
        this.spawnerTime = this.spawner.spawnTime;
        this.obstacles = this.spawner.obstacles;
        // console.log(this.spawnerTime+ "dsad");
    }
    //call update through internalclock
    //get something on the screen spawning every couple seconds
    update(){
        this.spawnerTime -= 100;
        //console.log(this);
        // console.log(this.spawnerTime);
        if(this.spawnerTime <= 0){
            this.spawner.spawnProjectiles();
            this.obstacles = this.spawner.obstacles;
            this.spawner.clearObstacles();
            this.spawnerTime = this.spawner.spawnTime;
        }
    }
    
}
module.exports = RoundManager;