const path = require('path')
const dotenv = require('dotenv')
dotenv.config({path: path.join(__dirname, '../../.env')});



const request = require('request');
const mykey = process.env.FORECAST_API_KEY;

/**
 * @param address
 * @param callback
 * @url https://developer.mapquest.com/documentation/geocoding-api/address/get/
 */
const forecast = (lat, long) => (
	new Promise((resolve, reject) => {
        request({
            url: `https://api.darksky.net/forecast/${mykey}/${lat},${long}`,
            json: true
        }, (error, response, body) => {
            //console.log(JSON.stringify(body, null, 4));
            if(error) {

                reject('Unable to connect to the Darksky Servers')

            } else if(response.statuscode !== 200) {

				reject(response)

            } else {

				resolve(body)

            }
        });
    })
)




module.exports = {
	forecast
};
