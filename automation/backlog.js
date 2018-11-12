const path = require('path');
const env = path.join(__dirname, '../.env');
require('dotenv').config({path: env})
const axios = require('axios');
const chalk = require('chalk');
const fs = require('fs');
let BACKLOG = encodeURIComponent(process.env.QUERY);
const auth = Buffer.from(`${process.env.JIRA_USERNAME}:${process.env.JIRA_PASSWORD}`, 'utf8').toString('base64');

const instance = axios({
	method: 'get',
	url: `${process.env.JIRA_URL}/rest/api/2/search?jql=${BACKLOG}`,
	headers: {
		'Authorization': `Basic ${auth}`,
		'Content-Type': 'application/json'
	}
})

const saveToFile = function(dest, data) {
	fs.writeFile(dest, data, function(err) {
		if(err) {
			return console.log(err);
		}
		console.log("The file was saved!");
	});
}

instance.catch(onError).then(onSuccess);



function onError(error) {
	if (error.response) {
		//console.log(error.response.data);
		//console.log(error.response.status);
		//console.log(error.response.headers);
	} else if (error.request) {
		console.log('ERRRRROOOORRRR => ');
		console.log(error.request);
	} else {
		//console.log('Error', error.message);
	}
}

function onSuccess(res) {
	console.log(Object.keys(res));
	if(res.status !== 200) return console.log(res.statusText)
	const { issues } = res.data;
	let results = [];
	issues.map(d => {
		results.push({
			key: d.key,
			summary: d.fields.summary
		})
	})

	saveToFile('./tickets.json', JSON.stringify(results, null, 4));
	console.log(results)
}





//
//
//backlog(BACKLOG).then(res => {
//
//	const { issues } = res;
//	let results = [];
//	issues.map(d => {
//		var reg = new RegExp('ALTV Web V2', 'i');
//		//console.log(Object.keys(d))
//		if(reg.test(d.fields.summary)) {
//			console.log(chalk.blueBright(d.key + ' => ' + d.fields.summary))
//			//console.log(chalk.blueBright(d.key + ' => ' + d.fields.description))
//			results.push({
//				key: d.key,
//				summary: d.fields.summary
//			})
//		}
//	});
//
//
//	const destination = `${process.env.HOME}/Sites/041018/src/001/backlog.json`;
//	saveToFile(destination, results)
//
//
//
//}).catch(err => {
//
//	console.log(err)
//
//});




