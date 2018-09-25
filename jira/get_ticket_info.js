const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const exec = require('child_process').exec;

dotenv.config({path: path.join(__dirname, '../.env')});

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

			//console.log(`stdout: ${stdout}`);
			//console.log(`stderr: ${stderr}`);
		});

	})

)


module.exports = {
	getTicket
};




