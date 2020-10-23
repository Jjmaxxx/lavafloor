const express = require('express');
const app = express();
const port = process.env.PORT || 4000 ;

app.set('view-engine', 'pug');
app.use(express.static("public"));
app.listen(port, ()=>{
    console.log("app started");
})
//yarn run start
app.get('/', (request,response)=>{
    response.sendFile(__dirname + '/index.html');
})
const User = require('./user');
const mongo = require("mongodb");
let mongoClient = mongo.MongoClient;
let url = "";
mongoClient.connect(url,(err,db)=>{
    if(err){
        throw err;
    }
    let dbO = db.db("");

})