const express = require('express');
const app = express();
const port = process.env.PORT || 4000 ;
const http = require('http');

const server = http.Server(app);
server.listen(port);
console.log("app started");

app.use(express.static("public"));
//yarn run start
app.get('/', (request,response)=>{
    response.sendFile(__dirname + '/index.html');
})
let io = require("socket.io")(server);
let users = [];
io.on('connection',(socket)=>{
    console.log('client connected with ' + socket.id);
    users.push(socket.id);
    socket.emit('join');
    socket.on('playerMove',(playerData)=>{
        socket.broadcast.emit("playerMove", (playerData));
    })
});

// const User = require('./user');
// const mongo = require("mongodb");
// let mongoClient = mongo.MongoClient;
// let url = "";
// mongoClient.connect(url,(err,db)=>{
//     if(err){
//         throw err;
//     }
//     let dbO = db.db("");

// })