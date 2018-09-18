const express = require('express');
const router = express.Router();
const { getActivities, athlete } = require('../weather-app/strava/strava.js')


router.on('mount', function (parent) {
	console.log('Admin Mounted');
	console.log(parent); // refers to the parent app
});

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
