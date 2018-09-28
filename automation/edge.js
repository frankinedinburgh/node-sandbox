const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });
const { getTicket:ticket, getJiraTicketsByQuery:backlog, postComment:comment } = require('../jira/get_ticket_info');





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


let QUERY = encodeURIComponent('project = ALTV AND resolution=Unresolved AND status="To Do"');
QUERY = `${process.env.JIRA_URL}/rest/api/2/search?jql=${QUERY}`;


let DONE = encodeURIComponent(`project="ALTV" AND resolution=Unresolved AND status="Developer Test"`);
DONE = `${process.env.JIRA_URL}/rest/api/2/search?jql=${DONE}`;
// Fetch tickets from the Backlog
backlog(QUERY).then(res => {

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


