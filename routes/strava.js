const express = require('express');
const router = express.Router();
const { getActivities, athlete } = require('../weather-app/strava/strava.js')

router.get('/strava/', (req, res) => {
	getActivities().then((response) => {

		res.json(response)

	}).catch(err => {

		res.json(err)

	});


	athlete().then((response) => {

		res.json(response)

	}).catch(err => {

		res.json(err)

	})
});




module.exports = router;
