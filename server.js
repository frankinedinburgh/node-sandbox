const dotenv = require('dotenv')
dotenv.config({path: '.env'});
const express = require('express')
const mailer = require('express-mailer');
const app = express()
const port = process.env.PORT || 3000
const tickets = require('./tickets.json')
app.set('view engine', 'pug')


const indexRoute = require('./routes/index')
const stravaRoute = require('./routes/strava')
const ticketsRoute = require('./routes/tickets')


mailer.extend(app, {
	from: 'frank@altv.com',
	host: 'smtp.office365.com',
	secureConnection: false, // use SSL
	port: 587, // port for secure SMTP
	transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
	auth: {
		user: process.env.EMAIL_ACCOUNT,
		pass: process.env.EMAIL_PASSWORD
	}
});


app.get('/', function (req, res, next) {

	res.send(tickets)
	//app.mailer.send('email', {
	//	to: 'frank@altv.com', // REQUIRED. This can be a comma delimited string just like a normal email to field.
	//	subject: 'Test Email', // REQUIRED.
	//	otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables.
	//}, function (err) {
	//	if (err) {
	//		// handle error
	//		console.log(err);
	//		res.send('There was an error sending the email');
	//		return;
	//	}
	//	res.send('Email Sent');
	//});
});








/**
 * Index
 */
app.get('/', indexRoute);
app.get('/strava/', stravaRoute);
app.get('/tickets/', ticketsRoute);




app.listen(port, () => console.log(`Example app listening on port ${port}!`))
