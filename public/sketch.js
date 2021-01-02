let socket;
let currWindowWidth, currWindowHeight;


function setup(){
    createCanvas(windowWidth,windowHeight);
    currWindowWidth = windowWidth;
    currWindowHeight = windowHeight;

}
function draw(){
    
}
//let image;
let gameCanvas = function(sketch){
    let playerX = 500;
    let playerY = 500;
    let speed = 2;
    let users = {};
    let obstacles = [];
    // let color = color(random(0,255),random(0,255),random(0,255));
    let playerData = {
        x: playerX,
        y: playerY,
    }
    // sketch.preload = function(){
    //     image = loadImage("basic.png");
    // }
    sketch.setup = function(){
        socket = io();
        socket.on('join', (fetchInfo)=>{
            //console.log(player[1],player[2]);
            playerData.id = fetchInfo.id;
            playerX = fetchInfo.x;
            playerY = fetchInfo.y;
            console.log(fetchInfo.allObstacles);
            for(let i=0;i<fetchInfo.allObstacles.length;i++){
                for(let j=0; j<fetchInfo.allObstacles[i].length;j++){
                    new Obstacle(fetchInfo.allObstacles[i][j].x,fetchInfo.allObstacles[i][j].y, fetchInfo.allObstacles[i][j].destinationX, fetchInfo.allObstacles[i][j].destinationY, fetchInfo.allObstacles[i][j].id, fetchInfo.allObstacles[i][i].speed);
                }
            }
            // console.log(playX,playY);
            // playerData.x = playX;
            // playerData.y = playY;
        })
        //access canvas width and height through variables width and height
        sketch.createCanvas(currWindowWidth * .90, currWindowHeight * .80);
        sketch.background(200,100,200);
        //console.log('a');

   

        // socket.on('playerMove',(otherPlayerData)=>{
        //     console.log(otherPlayerData.x,otherPlayerData.y);
        //     sketch.ellipse(otherPlayerData.x,otherPlayerData.y, 30, 30);
        // })
        socket.on('tick',(user)=>{
            users = user;
        })
        socket.on('spawnObstacles', (obstacles)=>{
            console.log('message recieved');
            for(let i=0; i<obstacles.obstacle.length; i++){
                new Obstacle(obstacles.obstacle[i].x,obstacles.obstacle[i].y,obstacles.obstacle[i].id, obstacles.obstacle[i].destinationX, obstacles.obstacle[i].destinationY, obstacles.obstacle[i].speed, obstacles.timeElapsed);
            }
        })
        socket.on('obstacleTick',(timeElapsed)=>{
            for(let i=0; i< obstacles.length; i++){
                obstacles[i].tickUpdate(timeElapsed);
            }
        })
    sketch.draw = function(){
        sketch.background(200,100,200);
        sketch.fill(0,0,255);
        sketch.noStroke();
        if(keyIsPressed){
            sketch.movement();
        }
        for(let i=0; i< obstacles.length; i++){
            obstacles[i].update();
        }
        sketch.fill(0,0,255);
        sketch.ellipse(playerX,playerY,30);
        //foreach id in users
        //pm2 logs game pm2 stop all
  
        for(let id in users){
            if(id != socket.id ){
                //console.log(users[id]);
                sketch.fill(0,0,255);
                sketch.ellipse(users[id].x,users[id].y,30);
            }    
        }
      
    }
    sketch.movement = function(){
        if(keyIsDown(87)){
            playerY -= speed;
        }
        if(keyIsDown(65)){
            playerX -= speed;
        }
        if(keyIsDown(83)){
            playerY += speed;
        }
        if(keyIsDown(68)){
            playerX += speed;
        }
        playerData.x = playerX;
        playerData.y = playerY;
        //console.log(playerData.x, playerData.y, playerData.id);
        socket.emit('playerMove',playerData);
        
    }
    class Obstacle{
        constructor(x,y,id, destinationX, destinationY, speed, timeCreated){
            this.x = x;
            this.y = y;
            this.id = id;
            this.destinationX = destinationX;
            this.destinationY = destinationY;
            this.speed = speed;
            this.timeCreated = timeCreated;
            this.travelTime = dist(this.x, this.y, this.destinationX, this.destinationY)/this.speed;
            obstacles.push(this);
            console.log('created');
        }
        update(){
            sketch.fill(255,0,0);
            sketch.ellipse(this.x,this.y, 15);
        }
        // delete(){
        //     obstacles[id].pop?
        // }
        tickUpdate(timeElapsed){
            console.log(timeElapsed, this.timeCreated);
            this.x = lerp(this.x, this.destinationX, (timeElapsed - this.timeCreated)/this.travelTime);
            this.y = lerp(this.y, this.destinationY, (timeElapsed - this.timeCreated)/this.travelTime)
            // if(this.x >= currWindowWidth * .80){
            //     this.x * -1;
            // }else if(this.x <= currWindowWidth * .20){
            //     this.x*-1;
            // }
            // if(this.y >= currWindowHeight * .90){
            //     this.y * -1;
            // }else if(this.y <= currWindowHeight * .10){
            //     this.y*-1;
            // }
        }
    }
    }
}

new p5(gameCanvas, 'gameCanvas');