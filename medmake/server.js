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
var req = require('requests');
// server start listening
http.listen(3000,'0.0.0.0',()=>{
    console.log('listening on : 3000');
});

//socket creation
try{const wss = new webSocketServer({ port : 9060});

wss.on('connection', (ws)=>{
    console.log('user is connected');
    ws.on('message', (message)=>{
        //console.log(message);
        var recieved = JSON.parse(message);
        var buff;
        var patient_name = recieved.name_id;
         var patient_contact = recieved.contact_id;
         var patient_message = recieved.message_id;
         var patient_latitude = recieved.latitude;
         var patient_longitude = recieved.longitude;
         var patient_address_id = recieved.address_id;

          var patient_data = {
              p_name : patient_name,
              p_contact : patient_contact,
              p_message : patient_message,
              p_longitude: patient_longitude,
              p_latitude: patient_latitude,
              p_address: patient_address_id

           };

           console.log(patient_data);
           if(patient_name == "ravi"){
        fs.readFile('database.json',(err,buf)=>{
            if(err) throw err;
            let buff = JSON.parse(buf);
            console.log(buff);
            ws.send(JSON.stringify(buff));

        });
        fs.truncate('database.json',0, function(){console.log('done')});
        let data = JSON.stringify(patient_data,null, 2);
        fs.writeFile('database.json',data,(err)=>{
            if(err) throw err;
        
            console.log("the file was saved");
        });
    }
    else{
        fs.readFile('database.json',(err,buf)=>{
            if(err) throw err;
            let buff = JSON.parse(buf);
            console.log(buff);
            ws.send(JSON.stringify(buff));

        });
    }
       
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
    


