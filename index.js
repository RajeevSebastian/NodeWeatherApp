const request = require('request');
const argv = require('yargs').argv;
const apiKey ="1b6692cea3e385932f5a35d849734e88";
const city = argv.c || 'Portland'
const url ='https://api.openweathermap.org/data/2.5/weather?q='+ city+ '&appid=' + apiKey;

request(url, function (err, response, body) {
  if(err){
    console.log('error:', err);
  } else {
    console.log('body:', body);
     var weather = JSON.parse(body)
    var message = "It's "+weather.main.temp +" degrees in " + weather.name;
    console.log(message);
  }
});