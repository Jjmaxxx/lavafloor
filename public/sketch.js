let socket;
let currWindowWidth, currWindowHeight;


function setup(){
    createCanvas(windowWidth,windowHeight);
    currWindowWidth = windowWidth;
    currWindowHeight = windowHeight;
    socket = io();
    socket.on('join',()=>{
        console.log('hello');
    })

}
function draw(){
    
}
let gameCanvas = function(sketch){
    let playerX = 500;
    let playerY = 500;
    let speed = 2;
    // let color = color(random(0,255),random(0,255),random(0,255));
    let playerData = {
        x: playerX,
        y: playerY,
    }
    sketch.setup = function(){
        sketch.createCanvas(currWindowWidth * .90, currWindowHeight * .80);
        sketch.background(200,100,200);
        console.log('a');
        socket = io();
        socket.on('playerMove',(playerData)=>{
            console.log(playerData.x,playerData.y);
            sketch.ellipse(playerData.x,playerData.y, 30);
        })
    }
    sketch.draw = function(){
        sketch.fill(0,0,255);
        sketch.noStroke();
        sketch.ellipse(playerX,playerY,30);
        if(keyIsPressed){
            sketch.movement();
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
        socket.emit('playerMove',(playerData));
    }
}

new p5(gameCanvas, 'gameCanvas');