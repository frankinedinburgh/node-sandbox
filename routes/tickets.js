const express = require('express');
const router = express.Router();
const axios = require('axios');


let BACKLOG = encodeURIComponent(process.env.QUERY);
const auth = Buffer.from(`${process.env.JIRA_USERNAME}:${process.env.JIRA_PASSWORD}`, 'utf8').toString('base64');








router.get('/tickets/', (req, res) => {


	const instance = axios({
		method: 'get',
		url: `${process.env.JIRA_URL}/rest/api/2/search?jql=${BACKLOG}`,
		headers: {
			'Authorization': `Basic ${auth}`,
			'Content-Type': 'application/json'
		}
	})

	instance.catch(function onError(error) {
		if (error.response) {
			res.send(error.response)
		} else if (error.request) {
			res.send(error.request)
		} else {
			res.send(error.message)
		}
	}).then(function(res) {
		if(res.status !== 200) {
			res.send(error.statusText)
		}
		//const { issues } = res.data;
		//let results = [];
		//issues.map(d => {
		//	results.push({
		//		key: d.key,
		//		summary: d.fields.summary
		//	})
		//})
		res.send(res)
	});
})

module.exports = router;


