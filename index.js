const express = require('express');
const app = express();
const port = process.env.PORT || 4000 ;
const http = require('http');
const Clock = require('./internalClock');
const bodyParser = require('body-parser');
const session = require('express-session')({
    secret: "secret",
    resave:true,
    saveUninitialized: true
})
const cookieParser = require('cookie-parser');
const sharedSession = require('express-socket.io-session');

const server = http.Server(app);
server.listen(port);
console.log("app started");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session);


const mongo = require("mongodb");
let mongoClient = mongo.MongoClient;
let url = "mongodb://localhost:27017/Users";
let db0;
//nav bar
mongoClient.connect(url,{useUnifiedTopology:true},(err,db)=>{
    db0 = db.db("Users");
    if(err){
        throw err;
    }
})
//yarn run start
app.get('/', (request,response)=>{
    response.sendFile(__dirname + '/login.html');
})
app.get('/game', (request,response)=>{
    response.sendFile(__dirname + '/index.html');
})
app.get('/register', (request,response)=>{
    response.sendFile(__dirname + '/register.html');
})
app.post('/register',(request,response)=>{
    //console.log(request.body);
    db0.collection('Users').insertOne({username:request.body.username, password:request.body.password,position:{x:500,y:500}});
    response.redirect('/login');
})

app.get('/login', (request,response)=>{
    response.sendFile(__dirname + '/login.html');
})
app.post('/login',(request,response)=>{
    //console.log(request.body);
    db0.collection('Users').findOne({username:request.body.username, password:request.body.password}).then((user)=>{
        console.log(user);
        if(user == null){
            response.redirect('/login');
        }else{
            //auto creates var if doesnt exist
            request.session.username = request.body.username;
            response.redirect('/game');
        }
    });
})

let io = require("socket.io")(server);
io.use(sharedSession(session, {autoSave:true}));

let users = {};
const RoundManager = require('./roundManager');
let roundManager = new RoundManager();
const clock = new Clock(0.1);
function tickUpdate(){
    io.emit('tick',(users));
    io.emit('obstacleTick', (timeElapsed));
    if(roundManager.spawnerTime <= 100){
        //console.log('asdasdasdads');
        io.emit('spawnObstacles', {obstacle: roundManager.obstacles, timeElapsed: timeElapsed});
    }
}
function roundUpdate(){
    roundManager.update();
}

clock.startTick([tickUpdate, roundUpdate]);

const start = Date.now();
var timeElapsed = 0;
setInterval(()=>{
    timeElapsed = Date.now() - start;
},100)

io.on('connection',(socket)=>{
    console.log('client connected with ' + socket.id);
    // console.log(socket.handshake.session);

    //check and see if the username in the socket handshake session object is in the db 
    db0.collection('Users').findOne({username:socket.handshake.session.username}).then((user)=>{
        // console.log(user);
        if(user == null){
            //oh crap how did that happen?
        }
        else{
            //create a player object with the x and y cordinate from the user
            let player = {
                id: socket.id,
                x:user.position.x,
                y:user.position.y,
            }
            //console.log(player.x,player.y);
            users[player.id] = player;
            socket.emit('join',{id: socket.id, x: player.x, y: player.y,allObstacles: roundManager.allObstacles});
        }
    });



    
    //register login page two input fields and button html
 
    socket.on('playerMove',(playerData)=>{
        //make sure that the id is not undefined 
        if(playerData.id != undefined){
            users[playerData.id] = playerData;
            
        }
        else{
            //console.log("got player move but no id :(")
        }
    })

    socket.on('disconnect',()=>{
        //TODO: 
        //add the user to the db 

        db0.collection('Users').updateOne({username:socket.handshake.session.username},
            {$set:{position: {x: users[socket.id].x, y:users[socket.id].y}}}).then(()=>{
                delete users[socket.id];
                console.log(socket.id + " disconnected");
            })
    })
});

//git branch name
///git checkout name
//spawnerwork
//asdasdasdsadsa