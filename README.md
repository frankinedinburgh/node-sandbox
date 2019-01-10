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
  
  <sup>Use parcel for transpiling all client side javascript files</sup>

- [08/01/2019 => Mongoose 101](https://mongoosejs.com/)
- [08/01/2019 => Mongoose 102](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose)
- [08/01/2019 - 09/01/2019 => Build a CRUD application with Mongoose](https://codeburst.io/writing-a-crud-app-with-node-js-and-mongodb-e0827cbbdafb)
    
  <sup>learn how to build a CRUD application with node, ongoose and express</sup>

- [10/01/2019 => Working with Redis](https://medium.com/@petehouston/install-and-config-redis-on-mac-os-x-via-homebrew-eb8df9a4f298)
- [10/01/2019 => Redis 101](https://www.youtube.com/watch?v=Hbt56gFj998)

    <sup>It's a mix between mongodb and memcache</sup>
- [10/01/2019 Debuging Express Routing issues](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes)
- [Bad habits to avoid as a developer](https://www.youtube.com/watch?v=BQGxEn9oWxc)
    
  
  




 ### Routes to test
 
