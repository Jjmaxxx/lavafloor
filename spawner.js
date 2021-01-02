
class Spawner{
    constructor(canvasX,canvasY,spawnTime){
        this.canvasX = canvasX;
        this.canvasY = canvasY;
        this.spawnTime = spawnTime;
        this.obstacles = [];
        this.allObstacles = [];
    }
    pickSide(num){
        let randInt = Math.floor(Math.random() * 5);
        let x = 0;
        let y = 0;
        switch(randInt){
            case 1:
                x = Math.floor((Math.random() * this.canvasX));
                y = 0;
                break;
            case 2:
                x = this.canvasX;
                y = Math.floor((Math.random() * this.canvasY)); 
                break;
            case 3:
                x = Math.floor((Math.random() * this.canvasX));
                y = this.canvasY;
                break;
            case 4:
                x = 0;
                y = Math.floor((Math.random() * this.canvasY));
                break;
        }
        if(num == 1){
            return x;
        }
        if(num == 2){
            return y;
        }
    }
    spawnProjectiles(){
        for(let i=0; i<30;i++){
            let id = 0;
            if(this.obstacles[i-1] != undefined){
                id = this.obstacles[i-1].id + 1;
            }
               
            this.obstacles.push(new Obstacle(this.pickSide(1), this.pickSide(2), id, this.pickSide(1), this.pickSide(2), Math.random()* 0.05));
            //console.log(this.obstacles[0].vx);
        }
        this.allObstacles.push(this.obstacles);
        //console.log(this.allObstacles);
    }
    
    clearObstacles(){
        this.obstacles = [];
    }
}
class Obstacle{
    constructor(x,y,id, destinationX, destinationY,speed){
        this.x = x;
        this.y = y;
        this.id = id;
        this.destinationX = destinationX;
        this.destinationY = destinationY;
        this.speed = speed;
    }
      
}
module.exports = Spawner;