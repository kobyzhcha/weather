var express = require('express');
var app = express();

const worker = require('./worker.js');

app.get('/weather_data', function (req, res) {
  worker.getWeatherData(resp => res.send(resp));
});

app.get('/', function (req, res) {
	res.send('Hello, world!');
});

app.listen(3000, function () {
  console.log('App is running on port 3000');
});
