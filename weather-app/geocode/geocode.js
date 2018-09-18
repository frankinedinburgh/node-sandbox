const request = require('request')

/**
 * @param address
 * @param callback
 * @url https://developer.mapquest.com/documentation/geocoding-api/address/get/
 */
const geocodeAddress = (address) => {
	const encodedAddress = encodeURIComponent(address);
	const mykey = process.env.MAPQUEST_API_KEY;

	return new Promise((resolve, reject) => {
		request({
			url: `http://www.mapquestapi.com/geocoding/v1/address?key=${mykey}&location=${encodedAddress}`,
			json: true
		}, (error, response, body) => {

			// console.log(JSON.stringify(response, null, 4));
			if (error) {

				reject('Unable to connect to Mapquest API servers.');

			} else if(!body.hasOwnProperty('info')) {

				reject(body);

			} else if (body.info.statuscode === 0) {

				resolve({
					address: body.results[0].locations[0].street,
					latitude: body.results[0].locations[0].latLng.lat,
					longitude: body.results[0].locations[0].latLng.lng
				});

			} else if (body.info.statuscode !== 0) {

				reject(body.info);

			} else {

				reject(body)

			}
		});
	})
};




module.exports = {
    geocodeAddress
};
