const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });
const { getTicket:ticket, getJiraTicketsByQuery:backlog } = require('../jira/get_ticket_info');





//console.log(url)
//process.exit();


//
//ticket('ALTV-1890').then(res => {
//
//	const { summary } = JSON.parse(res).fields;
//	console.log(summary);
//
//}).catch(err => {
//
//	return console.log(err)
//
//})


let QUERY = encodeURIComponent('project = ALTV AND resolution=Unresolved AND assignee=frank');
QUERY = `${process.env.JIRA_URL}/rest/api/2/search?jql=${QUERY}`;
// Fetch tickets from the Backlog
backlog(QUERY).then(res => {

	const { issues } = res;
	issues.map(d => {

		//console.log(Object.keys(d))
		console.log(d.key + ' => ' + d.fields.summary)
		//console.log(d.fields.summary)
		//console.log(d.fields.description)
	});


}).catch(err => {

	console.log(err)

});
