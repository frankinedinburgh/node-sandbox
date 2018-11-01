const dotenv = require('dotenv')
const path = require('path')
const chalk = require('chalk')
const fs = require('fs')

dotenv.config({ path: path.join(__dirname, '../.env') })
const { getTicket: ticket, getJiraTicketsByQuery: backlog, postComment: comment } = require('../jira/get_ticket_info')

let QUERY = encodeURIComponent('project="ALTV" AND status="To Do" AND Sprint=209');

let DONE = encodeURIComponent(`project="ALTV" AND status="To Do"`);

let SPRINT = encodeURIComponent(`project="ALTV" AND Status="In Progress" AND Sprint="Sprint 71-Go Live"`)
SPRINT = `${process.env.JIRA_URL}/rest/api/2/search?jql=${SPRINT}`
// Fetch tickets from the Backlognpm

let TICKET = encodeURIComponent(`project="ALTV" AND Key="ALTV-2066"`)
TICKET = `${process.env.JIRA_URL}/rest/api/2/search?jql=${TICKET}`

backlog(QUERY).then(res => {

  const { issues } = res
  let results = []
  issues.map(d => {
    var reg = new RegExp('ALTV Web V2', 'i')
    // console.log(Object.keys(d))
    if (reg.test(d.fields.summary)) {
      console.log(chalk.blueBright(d.key + ' => ' + d.fields.summary))
      // console.log(chalk.blueBright(d.key + ' => ' + d.fields.description))
      results.push({
        key: d.key,
        summary: d.fields.summary
      })
    }

     //comment(d.key, 'Ready to test on next deployment').then(res => {
	 //
    	//return console.log(res);
	 //
     //}).catch(err => {
	 //
    	//return console.log('Unable to post a comment');
     //})

    // console.log(d.fields.description)
  })

  const destination = `${process.env.HOME}/Sites/041018/src/001/data.json`
  fs.writeFile(destination, JSON.stringify(results, null, 4), function (err) {
    if (err) {
      return console.log(err)
    }

    console.log('The file was saved!')
  })
}).catch(err => {
  console.log('ERROR ' + JSON.stringify(err, null, 4))
})
