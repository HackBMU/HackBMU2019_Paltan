var express = require('express');
var webSocketServer = require('ws').Server;
var fs = require('fs');
const app = express();
var http = require('http').Server(app);
const bodyParser= require('body-parser');
//var config = require('./config');
app.use(bodyParser.json());

http.listen(3000, '0.0.0.0',()=>{
    console.log('listening on : 3000');
});

try{
    const wss = new webSocketServer({port : 9060});
    console.log('user is connected');
    wss.on('message', (message)=>{
        console.log('message');
    });
}  catch(e){
    console.error(e);

}

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/index.html');
})