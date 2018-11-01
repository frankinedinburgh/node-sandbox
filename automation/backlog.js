const chalk = require('chalk');
const fs = require('fs');

const {getJiraTicketsByQuery:backlog} = require('../jira/get_ticket_info');

let BACKLOG = encodeURIComponent(`project="ALTV" AND resolution="Unresolved" AND status="To Do"`);



backlog(BACKLOG).then(res => {

	const { issues } = res;
	let results = [];
	issues.map(d => {
		var reg = new RegExp('ALTV Web V2', 'i');
		//console.log(Object.keys(d))
		if(reg.test(d.fields.summary)) {
			console.log(chalk.blueBright(d.key + ' => ' + d.fields.summary))
			//console.log(chalk.blueBright(d.key + ' => ' + d.fields.description))
			results.push({
				key: d.key,
				summary: d.fields.summary
			})
		}
	});


	const destination = `${process.env.HOME}/Sites/041018/src/001/backlog.json`;
	fs.writeFile(destination, JSON.stringify(results, null, 4), function(err) {
		if(err) {
			return console.log(err);
		}

		console.log("The file was saved!");
	});


}).catch(err => {

	console.log(err)

});

