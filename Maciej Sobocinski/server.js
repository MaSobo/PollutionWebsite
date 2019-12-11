//declering neded modules
const fetch = require("node-fetch");
const fs = require('fs');    
const schedule = require('node-schedule');    
const express = require("express");
//declering global variables
const app = express();
const PORT = 5000;
//API adress and key
const ROOT_URL = "http://api.airvisual.com/v2/nearest_city";
const API_KEY = "wQEvjTr99hYzRtDM2";
//middleware
app.use("/public", express.static(__dirname + "/static"));

//peridoically getting the data
var j = schedule.scheduleJob(`*/1 * * * *`, function(){                 //do this every minute but can be set to other time periods
console.log("saving");                                                  //just to see its doing something
fetch(`${ROOT_URL}?key=${API_KEY}`)
     .then((res) => res.json())
     .then((res) => {  
           let info= {                                                  //creating my own object from the downloaded data
      
                 city: res.data.city,
                 date: res.data.current.weather.ts.split("T")[0],       //trimming the time stamp from useless stuff
                 temperature: res.data.current.weather.tp,
                 pressure: res.data.current.weather.pr,
                 humidity: res.data.current.weather.hu,
                 winddirection: res.data.current.weather.wd,
                 windspeed: res.data.current.weather.ws,
                 airquality: res.data.current.pollution.aqius
            
            };
            fs.readFile('db.json', (err, file) => {                     //loading existing data
            let jsonArray = JSON.parse(file);
            jsonArray.cities.push(info);                                //adding new data to the exsiting

          
            let infoString=JSON.stringify(jsonArray); 
      
            fs.writeFile("db.json", infoString, function(err)           //saving all data back to file
                  {   
                        if (err) 
                              {       
                              console.log(err);   
                              }
                  });
            });
      });
});


app.get("/", (req, res) => {                                            //loading the index.html 
      res.sendFile(__dirname + "/static"+"/index.html");
  });

app.get("/getdata", (req, res) => {                                     //sending data on request
      console.log("user fetching data");

     fs.readFile('db.json', (err, file) => {                            //reading the file
            let jsonArray = JSON.parse(file);                           
            let jstring=JSON.stringify(jsonArray);    
            res.send(jstring); 

     })});


console.log("Listening port " + PORT);
app.listen(PORT);
