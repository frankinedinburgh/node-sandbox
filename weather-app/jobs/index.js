//http://docs.mashape.com/api-keys
const dotenv = require('dotenv');
const path = require('path');
const command = require('../../modules/command');
//const request = require('request');

/**
 * @link https://market.mashape.com/indeed/indeed
 */

dotenv.config({ path: path.join(__dirname, '../../.env') });



let cmd = `curl --get --include 'https://indeed-indeed.p.mashape.com/apigetjobs?publisher=${process.env.INDEED_PUBLISHER_ID}&format=json&jobkeys=front+end+developer%2C+senior+front+end+develop&v=2'`;
cmd += `-H 'Accept: application/json'`;

console.log(`LOGGING => ${cmd}`);



command(cmd, (err, data) => {
	if(err) return console.log('' + JSON.stringify(err, null, 4))
	console.log(`DATA => ${data}`);
})
