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
        socket.on('join', (player)=>{
            console.log(player[1],player[2]);
            playerData.id = player[0];
            playerX = player[1];
            playerY = player[2];
            // console.log(playX,playY);
            // playerData.x = playX;
            // playerData.y = playY;
        })
        //access canvas width and height through variables width and height
        sketch.createCanvas(currWindowWidth * .90, currWindowHeight * .80);
        sketch.background(200,100,200);
        console.log('a');

   

        // socket.on('playerMove',(otherPlayerData)=>{
        //     console.log(otherPlayerData.x,otherPlayerData.y);
        //     sketch.ellipse(otherPlayerData.x,otherPlayerData.y, 30, 30);
        // })
        socket.on('tick',(user)=>{
            users = user;
        })
        socket.on('spawnObstacles', (obstacles)=>{
            for(let i=0; i<obstacles[1].length; i++){
                new Obstacle(obstacles[1][i].x,obstacles[1][i].y,obstacles[1][i].vx,obstacles[1][i].vy,obstacles[1][i].id);
            }
        })
    sketch.draw = function(){
        sketch.background(200,100,200);
        sketch.fill(0,0,255);
        sketch.noStroke();
        for(let i=0; i< obstacles.length; i++){
            obstacles[i].update();
        }
        if(keyIsPressed){
            sketch.movement();
           
        }

        sketch.ellipse(playerX,playerY,30);
        //foreach id in users
        //pm2 logs game pm2 stop all
  
        for(let id in users){
            if(id != socket.id ){
                console.log(users[id]);
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
        console.log(playerData.x, playerData.y, playerData.id);
        socket.emit('playerMove',playerData);
        
    }
    class Obstacle{
        constructor(x,y,vx,vy,id){
            this.x = x,
            this.y = y,
            this.vx = vx,
            this.yy = vy,
            this.id = id,
            obstacles.push(this);
        }
        update(){
            sketch.ellipse(this.x,this.y, 15);
            this.x += this.vx;
            this.y += this.vy;
        }
    }
    }
}

new p5(gameCanvas, 'gameCanvas');