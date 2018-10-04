const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });
const { getTicket:ticket, getJiraTicketsByQuery:backlog, postComment:comment } = require('../jira/get_ticket_info');


let QUERY = encodeURIComponent('project = ALTV AND resolution=Unresolved AND status="To Do"');
QUERY = `${process.env.JIRA_URL}/rest/api/2/search?jql=${QUERY}`;


let DONE = encodeURIComponent(`project="ALTV" AND resolution=Unresolved AND status="Developer Test"`);
DONE = `${process.env.JIRA_URL}/rest/api/2/search?jql=${DONE}`;


let SPRINT = encodeURIComponent(`project="ALTV" AND Status="In Progress" AND Sprint="Sprint 70-Go Live"`);
SPRINT = `${process.env.JIRA_URL}/rest/api/2/search?jql=${SPRINT}`;
// Fetch tickets from the Backlog
backlog(SPRINT).then(res => {

	const { issues } = res;
	issues.map(d => {
		var reg = new RegExp('ALTV Web V2', 'i');
		//console.log(Object.keys(d))
		if(reg.test(d.fields.summary)) {
			console.log(d.key + ' => ' + d.fields.summary)
		}


		//comment(d.key, 'Ready to test on next deployment').then(res => {
		//
		//	return console.log(res);
		//
		//}).catch(err => {
		//
		//	return console.log('Unable to post a comment');
		//})
		//console.log(d.fields.summary)
		//console.log(d.fields.description)
	});


}).catch(err => {

	console.log(err)

});


