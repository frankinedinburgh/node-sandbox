const request = require('request');
/**
 * @param address
 * @param callback
 * @url https://developer.mapquest.com/documentation/geocoding-api/address/get/
 */
const forecast = (lat, long, callback) => {

    const mykey = process.env.FORECAST_API_KEY;

    request({
        url: `https://api.darksky.net/forecast/${mykey}/${lat},${long}`,
        json: true
    }, (error, response, body) => {
        //console.log(JSON.stringify(body, null, 4));
        if(error) {
            console.log('Unable to connect to the Darksky Servers');
        } else if(response.statusCode !== 200) {
            console.log(response.statusMessage);
        } else {
            //console.log(Object.keys(body));
            callback(undefined, body);
        }


    });

};




module.exports = forecast;
