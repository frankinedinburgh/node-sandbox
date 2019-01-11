const express = require('express')
const _ = require('lodash')
const router = express.Router()

const { getJiraTicketsByQuery } = require('../../jira/get_ticket_info');


/* GET home page. */
router.get('/', (req, res, next) => {
    getJiraTicketsByQuery('project="MENA" AND assignee="frank"').then(response => {
        res.json(response)
    }).catch(error => {
        res.json(error)
    })
})




module.exports = router;
