const express = require('express')
const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const apiKey ="1b6692cea3e385932f5a35d849734e88";
const request = require('request')

app.get('/', function (req, res) {
  res.render('index',{weather:null , error : null})
})

app.post('/', function (req, res) {
  var city = req.body.city;
  console.log(city);
  var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + apiKey;
  request(url, function (err, response, body) {
    if(err){
	console.log(err);
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      var weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        var weatherText = 'Its ' + weather.main.temp + " degrees in" + weather.name;
	console.log(weatherText)
        res.render('index', {weather: weatherText, error: null});
      }
    }
   });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
