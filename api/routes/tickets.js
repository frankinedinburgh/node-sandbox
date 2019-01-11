const express = require('express');
const router = express.Router();
const axios = require('axios');
const _ = require('lodash');

let BACKLOG = encodeURIComponent('project="MENA"');
const auth = Buffer.from(`${process.env.JIRA_USERNAME}:${process.env.JIRA_PASSWORD}`, 'utf8').toString('base64');

router.get('/tickets/', (req, res) => {
	res.set('Access-Control-Allow-Origin', '*')

	const instance = axios({
		method: 'get',
		url: `${process.env.JIRA_URL}/rest/api/2/search?jql=${BACKLOG}`,
		headers: {
			'Authorization': `Basic ${auth}`,
			'Content-Type': 'application/json'
		}
	})

	instance.catch(function(error) {
		console.log(error.response)
		if (error.response) {
			res.json(error.response)
		} else if (error.request) {
			res.json(error.request)
		} else {
			res.json(error.message)
		}
	}).then(function(response) {
			console.log(JSON.stringify(response.data, null, 4))
		if(response.status !== 200) {
			res.json(response.statusText)
		}
		const { issues } = response.data;
        let results = _.chain(issues).map(d => ({
						key: d.key,
            summary: d.fields.summary,
            assignee: d.fields.assignee.displayName,
            status: d.fields.status.name
		})).sortBy(o => o.status === 'In Progress');
		// let results = [];
		// issues.map(d => {
		// 	results.push({
		// 		key: d.key,
		// 		summary: d.fields.summary
		// 	})
		// })
		res.json(results)
	});
})

module.exports = router;


