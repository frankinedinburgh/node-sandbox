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




- [07/01/2019 => learning to use parcel js](https://parceljs.org/)
  
  Use parcel for transpiling all client side javascript files 

- [08/01/2019 => Mongoose 101](https://mongoosejs.com/)
- [08/01/2019 => Mongoose 102](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose)
- [09/01/2019 - 10/01/2019 => Build a CRUD application with Mongoose](https://codeburst.io/writing-a-crud-app-with-node-js-and-mongodb-e0827cbbdafb)
  
  learn how to build a CRUD application with node, ongoose and express




 ### Routes to test
 
