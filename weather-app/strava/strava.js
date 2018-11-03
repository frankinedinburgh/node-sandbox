const request = require('request');
const stravaToken = process.env.STRAVA_ACCESS_TOKEN;

/**
 * @param address
 * @param callback
 * @url https://developer.mapquest.com/documentation/geocoding-api/address/get/
 */

const athlete = () => (
	new Promise((resolve, reject) => {
		request({
			url: `https://www.strava.com/api/v3/athlete`,
			json: true,
			headers: {
				'Authorization': `Bearer ${stravaToken}`
			}
		}, (error, response, body) => {
			if(error) {

				reject('Unable to connect to the Strava Servers')

			} else if(response.statusCode !== 200) {

				reject(response.statusMessage)

			} else {

				resolve(body)

			}

		});
	})
)


/**
 * @link https://www.strava.com/api/v3/athlete/activities?before=&after=&page=&per_page=" "Authorization: Bearer [[token]]
 * @param id
 * @param callback
 */
const getActivities = () => (
	new Promise((resolve, reject) => {
		request({
			url: `https://www.strava.com/api/v3/athlete/activities`,
			json: true,
			param: {
				page: 1,
				per_page: 1
			},
			headers: {
				'Authorization': `Bearer ${stravaToken}`
			}
		}, (error, response, body) => {
			if(error) {

				reject('Unable to connect to the Strava Servers');
				//console.log('Unable to connect to the Strava Servers');
			} else if(response.statusCode !== 200) {

				reject(response.statusMessage);
				//console.log(response.statusMessage);
			} else {

				resolve(body);
				//console.log(Object.keys(body));
				//callback(undefined, body);
			}

		});
	})
)



module.exports = {
    athlete,
    getActivities
};
