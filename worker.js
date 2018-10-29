const https = require("https");
const xml = require('xml-parse');

const towns = [
  'kyiv', 'lviv', 'zhytomyr',
  'lutsk', 'odessa', 'vinnytsya',
  'ternopil', 'uzhgorod', 'ivano frankivsk',
  'chernivtsi', 'rivne', 'hmelnytskyi',
  'chernihiv', 'cherkasy', 'kirovohrad',
  'mykolaiv', 'dnipropetrovsk', 'kherson',
  'zaporizhia', 'sumy', 'kharkiv',
  'luhansk', 'donetsk', 'simferopol',
];
const apiQuery = 'https://query.yahooapis.com/v1/public/yql';

function convertToCelsius(farenheit) {
	farenheit = parseFloat(farenheit);
	return ((farenheit - 32)/1.8).toFixed(1);
}


function performARequest(town, success) {
	let response = '';
	const query = `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${town}, ua")`;
	var req = https.get(`${apiQuery}?q=${query}`, resp => {
		resp.on('data', function(d){
            response += d;
        })
        resp.on('end', function(){
            success(response);
        })
	});
	req.end();
}


function getWeatherData(success) {
	let result = [];
	for (let i = 0;i<towns.length;i++) {
		performARequest(towns[i], data => {
		  const parsedData = xml.parse(data);
		  const townName = parsedData[2].childNodes[0].childNodes[0].childNodes[1].innerXML;
		  let weather = parsedData[2].childNodes[0].childNodes[0].childNodes[9].childNodes[4].text;
		  weather = weather.split("/>")[0].split("=");
		  weather = {
		  	title: townName,
		  	town: towns[i],
		  	temp: convertToCelsius(weather[4].split("\"")[1]),
		  	text: weather[5].replace(/"/g, ""),
		  }
		  result.push(weather);
		  if (result.length === towns.length) {
		  	success(result);
		  }
		});
	}
}

module.exports = { getWeatherData };