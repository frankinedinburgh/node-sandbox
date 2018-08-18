const request = require('request');
const stravaToken = process.env.STRAVA_ACCESS_TOKEN;
/**
 * @param address
 * @param callback
 * @url https://developer.mapquest.com/documentation/geocoding-api/address/get/
 */



const athlete = (callback) => {
    request({
        url: `https://www.strava.com/api/v3/athlete`,
        json: true,
        headers: {
            'Authorization': `Bearer ${stravaToken}`
        }
    }, (error, response, body) => {
        if(error) {
            console.log('Unable to connect to the Strava Servers');
        } else if(response.statusCode !== 200) {
            console.log(response.statusMessage);
        } else {
            //console.log(Object.keys(body));
            callback(undefined, body);
        }

    });
};


/**
 * @link https://www.strava.com/api/v3/athlete/activities?before=&after=&page=&per_page=" "Authorization: Bearer [[token]]
 * @param id
 * @param callback
 */
const getActivities = (callback) => {
    request({
        url: `https://www.strava.com/api/v3/athlete/activities`,
        json: true,
        headers: {
            'Authorization': `Bearer ${stravaToken}`
        }
    }, (error, response, body) => {
        if(error) {
            console.log('Unable to connect to the Strava Servers');
        } else if(response.statusCode !== 200) {
            console.log(response.statusMessage);
        } else {
            //console.log(Object.keys(body));
            callback(undefined, body);
        }

    });


};







module.exports = {
    athlete,
    getActivities
};
