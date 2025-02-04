const request = require('request');

const geocode = (address, callback) =>{
    const url = 'https://geocode.maps.co/search?q=' + encodeURIComponent(address) + '&api_key=6752d61bac532475480797iuj2abc8b';

    request({url, json:true}, (error,{body}) =>{ // response/body shorthand ES6 destructing
        if(error){
            callback('Unable to connect to location services!', undefined);
        }
        else if(body.length === 0){
            callback('Location not found. Try another location!', undefined);
        }
        else{
            const {display_name, lat, lon} = body[0];
            callback(undefined, {display_name, lat, lon});
        }
    })
}


module.exports = geocode;