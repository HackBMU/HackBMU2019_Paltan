import 'package:flutter/material.dart';
import 'package:web_socket_channel/io.dart';
import 'package:barcode_scan/barcode_scan.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:requests/requests.dart';
import 'dart:math';

void main() {

  runApp(MaterialApp(
    debugShowCheckedModeBanner: false,
    home: Scaffold(
      appBar: AppBar(
        title: Text("Medistance"),
        centerTitle: true,
      ),

      body: new Container(
          child: new OverflowBox(
              minWidth: 0.0,
              minHeight: 0.0,
              maxWidth: double.infinity,
              child: new Image(
                  image: new AssetImage('assets/map.jpg'),
                  fit: BoxFit.cover))
      ),








      floatingActionButton: FloatingActionButton.extended(
          onPressed: (){
            try {
              var channel = IOWebSocketChannel.connect("ws://192.168.43.17:9060");
              String res = "sss";
              var geocoder = new Random();
              var p ;
              var lot=28.66;
              var lat=77.21;
              for(var i = 0.01;i<0.05;i++){
                p = geocoder.nextInt(1);
              }
              lot = lot+p;
              lat = lat+p;
                var url = "http://192.168.43.17:3000/login/";
                //var urls = "http://192.168.43.17:3000/send/";
                //Map patient_data={
                  //"name":"ravi",
                  //"contact":"9643349193",
                  //"address":"shahdara",
                  //"message":"i m in trouble please come and help me "};
                Map data ={
                  'username' : 'ravi',
                  'password' : 's13'
                };

                //var patient = json.encode(patient_data);
                var body = json.encode(data);
                http.post(url, headers:{"Content-Type": "application/json"},body: body).then((response)
            {
                //print("${response.statusCode}");
                res = response.body;
                //print("${res}");

                  //print("${res}");
                  var pro = json.decode(res);
                  //print("${pro}");
                  var p = pro['token'];
                  //print("${p}");
                //http.post(urls, headers:{
                  //"Content-Type":"application/json"},body: patient).then((response){
                    //print(response.body);
                //});
                  channel.sink.add(json.encode({
                    "token" : p,
                    "name_id":"ravi",
                    "contact_id":"9643349193",
                    "address_id":"shahdara",
                    "longitude": lot,
                    "latitude": lat,
                    "message_id":"i m in trouble please come and help me "
                  }));

            });
            } catch(e){
            }
      },
          icon: Icon(Icons.add_circle_outline),
          label: Text("EMERGENCY"),
      ),
    )
  ));

}