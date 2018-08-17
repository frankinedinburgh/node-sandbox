const request = require('request');
/**
 * @param address
 * @param callback
 * @url https://developer.mapquest.com/documentation/geocoding-api/address/get/
 */
const geocodeAddress = (address, callback) => {
    const encodedAddress = encodeURIComponent(address);
    const mykey = process.env.MAPQUEST_API_KEY;

    request({
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=${mykey}&location=${encodedAddress}`,
        json: true
    }, (error, response, body) => {
        // console.log(JSON.stringify(response, null, 4));
        if (error) {
            callback('Unable to connect to Mapquest API servers.');
        } else if (body.info.statuscode === 0) {
            //console.log(JSON.stringify(body, null, 4));
            callback(undefined, {
                address: body.results[0].locations[0].street,
                latitude: body.results[0].locations[0].latLng.lat,
                longitude: body.results[0].locations[0].latLng.lng
            });
        } else if (body.info.statuscode !== 0) {
            callback(body.info.messages);
        }
    });
};




module.exports = {
    geocodeAddress
};
