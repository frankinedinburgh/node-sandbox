const express = require('express')
const router = express.Router()
const { geocodeAddress } = require('../../weather-app/geocode/geocode.js')
const { forecast } = require('../../weather-app/forecast/forecast.js')

/* GET home page. */
router.get('/', (req, res, next) => {
	geocodeAddress('52 merrion square, Dublin, Ireland').then(response => {
		const {latitude, longitude} = response;
		forecast(latitude, longitude)
			.then(data => res.json(data))
			.catch(err => res.json(err))

	}).catch(err => res.json(err));
});

module.exports = router;
