const express = require('express');
const https = require('node:https');
const { url } = require('node:inspector');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

// app.get('/', (req, res) => {
   
// }
// )
 
app.get('/',(req,res)=>{
    res.sendFile(__dirname +'/index.html');
})
app.post('/',(req,res)=>{
   
   const query=req.body.inputDataA;
   const apiKey='500d2021a67c083cebd2c5abf59c02a8';
   const url='https://api.openweathermap.org/data/2.5/weather?q='+query+'&appid='+apiKey+'&units=metric'
   https.get(url, (response) => {
       console.log(response.statusCode);
       response.on('data',(data)=>{
           const weatherData = JSON.parse(data);
           // console.log(weatherData);
           temp=weatherData.main.temp;
           description=weatherData.weather[0].description;
           // console.log(temp);
           res.write("The temperatue at "+query+" is "+temp+'\n')
           res.write("The weather is "+description)
           res.end();


       })
   });
})


app.listen(3000, () => {    
    console.log('Server is running on http://localhost:3000');
    });
