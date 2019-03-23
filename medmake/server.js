// imports
var express = require('express');
var webSocketServer = require('ws').Server;
var fs = require('fs');
const app = express();
var http = require('http').Server(app);
const bodyParser = require('body-parser');
var config = require('./config');
var jwt = require('jsonwebtoken');
app.use(bodyParser.json());
var token;

// server start listening
http.listen(3000,'0.0.0.0',()=>{
    console.log('listening on : 3000');
});

//socket creation
try{const wss = new webSocketServer({ port : 9060});

wss.on('connection', (ws)=>{
    console.log('user is connected');
    ws.on('message', (message)=>{
        console.log(message);
        var recieved = JSON.parse(message);
        if(recieved.name_id == "ravi"){
        var patient_name = recieved.name_id;
        var patient_contact = recieved.contact_id;
        var patient_message = recieved.message_id;
            console.log(patient_name);
         //patient_data = {
            //p_name : patient_name,
            //p_contact : patient_contact,
            //p_name : patient_message

        //};
        ws.send(JSON.stringify({p_name: patient_name,patient_contact: patient_contact,patient_message: patient_message}));
    }
        // if(recieved.name == "ravi"){
        //     var name = recieved.name;
        //     var contact= recieved.contact;
        //     var messages = recieved.message;
        // }
        // else{
        //     patient_name = name;
        //     patient_contact = contact;
        //     patient_message = messages;
        //     var patient_datas = {
        //         patient_names : patient_name,
        //     patient_contacts : patient_contact,
        //     patient_messagess : patient_message
        //     } ;
        //     ws.send(JSON.stringify(patient_datas));
        // }
        //app.post('/send',(req,res)=>{
        //     var name = req.body.name;
        //     var message = req.body.message;
        //     var contact = req.body.contact;
        //     console.log(name);
        //     res.send('recieved');
        // if(recieved.name == "sachin"){
        //     var name = req.body.name;
        //     var message = req.body.message;
        //     var contact = req.body.contact;
        //     console.log(name);
        //     var patient_data={
        //         patient_name : name,
        //         patient_message : message,
        //         patient_contact: contact
        //     }
            //ws.send(JSON.stringify(patient_data));
        //}
        });
        //console.log(client_received_id);
        //var client_userid = client_received_id.client_id;
    });
//});

}catch(e){
    console.error(e);
}

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/public/client.html');
});


app.post('/login',(req,res) =>{
    let username = req.body.username;
    let password = req.body.password;
    token = tokeneration(username, password);
    res.json({
        success : true ,
        message : 'Authenticated',
        token : token,
    });
});


//token generation for authenticated user
function tokeneration(username,password){
    
    let user = {
        username : 'ravi',
        password : 's13'
    }
        
    

    if(username && password){
        if(username == user.username && password == user.password){
            token = jwt.sign(user, config.secret, {
                expiresIn : '24h'
            });
            return token;
        }
    }
}

    //console.log(decoded.username);
    


