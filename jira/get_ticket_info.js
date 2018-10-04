const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const exec = require('child_process').exec;
const request = require('request');

dotenv.config({ path: path.join(__dirname, '../.env') });

const getTicket = (num) => (

	new Promise((resolve, reject) => {

		let command = "curl --request GET";
		command += ` --url '${process.env.JIRA_URL}/rest/api/latest/issue/${num}'`;
		command += ` --user '${process.env.JIRA_USERNAME}:${process.env.JIRA_PASSWORD}'`;
		command += " --header 'Accept: application/json'";
		exec(command, (err, stdout, stderr) => {
			if (err) {
				// node couldn't execute the command
				reject(err);
			}

			// the *entire* stdout and stderr (buffered)
			let ticket = JSON.parse(stdout);
			ticket = JSON.stringify(ticket, null, 4);


			fs.writeFile(path.join(__dirname, `../jira_${num}.json`), ticket, function(err) {
				if(err) {
					reject(err)
				}

				resolve(ticket)
			});

		});

	})

)


const getJiraTicketsByQuery = (query) => {
	return new Promise(function(resolve, reject){
		request(query, {
			json: true,
			auth: {
				username: process.env.JIRA_USERNAME,
				password: process.env.JIRA_PASSWORD
			}
		}, (error, response, body) => {

			if(error) return reject(error);

			if(response.statusCode !== 200) return reject(response.statusMessage);

			resolve(body);

		});
	});
};


const postComment = (ticket, comment) => {

	const options = {
		method: 'POST',
		url: `${process.env.JIRA_URL}/rest/api/2/issue/${ticket}/comment`,
		auth: {
			username: process.env.JIRA_USERNAME,
			password: process.env.JIRA_PASSWORD,
			sendImmediately: true
		},
		body: {
			body: comment
		},
		json: true
	};


	return new Promise(function(resolve, reject){
		request(options, (error, response, body) => {

			if(error) return reject(error);

			console.log(response.statusCode);

			if(response.statusCode !== 201) return reject(response.statusMessage);

			resolve(body);

		});
	});
};






module.exports = {
	getTicket,
	getJiraTicketsByQuery,
	postComment
};







//curl -D- -u fred:fred -X PUT --data {see below} -H "Content-Type: application/json" http://kelpie9:8081/rest/api/2/issue/QA-31



