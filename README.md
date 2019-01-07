# node-sandbox


```npm install ```
 
```node weather-app/ap.js --address 'some address''```





```JIRA```
the jira directory contains snippets for calling the JIRA api

1: create a .env file in the root of this directory that include the below variables
- JIRA_USERNAME=username
- JIRA_PASSWORD=password
- JIRA_URL=jira url
- JIRA_TICKET=JRA_109

2: The below method will write the out put to a file named jira_${ ticket number }.json

```
   const jira = require('../jira/get_ticket_info.js');
   jira.getTicket('YOUR_JIRA_TICKET_NUMBER').then(res => {
   	return console.log(res)
   }).catch(err => {
   	return console.log('wooops!')
   });

```



07/01/2019
- [learning to use parcel js](https://parceljs.org/)



