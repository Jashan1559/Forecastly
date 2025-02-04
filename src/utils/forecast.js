const request = require('request');

const forecast = (lat, long, callback) =>{
    const url = 'https://api.weatherstack.com/current?access_key=e8d56fba863f6c35f0baee9fb87880ac&query='+ lat + ',' + long+'&units=m';
    //e8d56fba863f6c35f0baee9fb87880ac
    //35a5f58661c7edd303383714abca3da5
    request({url, json:true}, (error, {body}) =>{
        if(error){
            callback('Unable to get weather services', undefined);
        }
        else if(body.error){
            callback(body.error.info, undefined);
        }
        else{
            // const data = response.body;
            // callback(undefined, "It is " + data.current.weather_descriptions[0] + ". Temprature: " + data.current.temperature +"C. Wind speed: " + data.current.wind_speed + ". humidity: " + data.current.humidity + ". Feels like: " + data.current.feelslike);

            const {weather_descriptions, temperature, wind_speed, humidity, feelslike, is_day} = body.current;
            // callback(undefined, "It is " + weather_descriptions[0] + ". Temprature: " + temperature +"C. Wind speed: " + wind_speed + ". humidity: " + humidity + ". Feels like: " + feelslike);
            callback(undefined, {
                forecast: weather_descriptions[0],
                temperature: temperature,
                wind_speed: wind_speed,
                humidity : humidity,
                feels_like: feelslike,
                is_day : is_day
            })
        }
    })
}

module.exports = forecast;