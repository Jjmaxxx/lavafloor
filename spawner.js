class Spawner{
    constructor(canvasX,canvasY,spawnTime){
        this.canvasX = canvasX;
        this.canvasY = canvasY;
        this.spawnTime = spawnTime;
        this.obstacles = [];
    }
    spawnProjectiles(){
        for(let i=0; i<10;i++){
            this.obstacles.push(new Obstacle(Math.floor(Math.random() * canvasX), Math.floor(Math.random() * canvasY), (Math.random() * 10) - 5, (Math.random()*10)-5), obstacles[this.obstacles.length - 1].id + 1);
        }
    }
    clearObstacles(){
        this.obstacles = [];
    }
}
class Obstacle{
    constructor(x,y,vx,vy,id){
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.id = id
    }
}
module.exports = Spawner;