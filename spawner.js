class Spawner{
    constructor(canvasX,canvasY,spawnTime){
        this.canvasX = canvasX;
        this.canvasY = canvasY;
        this.spawnTime = spawnTime;
        this.obstacles = [];
    }
    spawnProjectiles(){
        for(let i=0; i<10;i++){
            let id = 0;
            if(this.obstacles[i-1] != undefined){
                id = this.obstacles[i-1].id + 1;
            }
            
            this.obstacles.push(new Obstacle(Math.floor(Math.random() * this.canvasX), Math.floor(Math.random() * this.canvasY), (Math.random() * 2) -1, (Math.random() * 2)-1, id));
            //console.log(this.obstacles[0].vx);
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