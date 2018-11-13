const dotenv = require('dotenv')
dotenv.config({path: '.env'});
const _ = require('lodash')
const express = require('express')
const mailer = require('express-mailer');
const app = express()
const port = process.env.PORT || 3000
app.set('view engine', 'pug');
app.use((req, res, next) => {

    let now = new Date().toString();
    console.log(now)
    next();
})


const indexRoute = require('./routes/index')
const stravaRoute = require('./routes/strava')
const emailRoute = require('./routes/email')
const ticketsRoute = require('./routes/tickets')


mailer.extend(app, {
    from: 'frank@altv.com',
    cc: ['frankinedinburgh@yahoo.ie', 'frankhaguemail@gmail.com'],
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

	//res.render('email', { name: 'my name is frank'})

    // app.mailer.send('email', {  // send the email
    app.mailer.render('email', {
        to: ['frank@altv.com', 'frankinedinburgh@yahoo.ie'],
        subject: 'Test Email'
    }, function (err, message) {
        if (err) {
            // handle error
            console.log(err);
            res.send('There was an error rendering the email');
            return;
        }
        res.header('Content-Type', 'text/plain');
        res.send(message);
    }, { name: 'my name is frank'});

});


app.get('/send', function (req, res, next) {

    //res.render('email', { name: 'my name is frank'})

    app.mailer.send('email', {  // send the email
        to: ['frank@altv.com', 'frankinedinburgh@yahoo.ie'],
        subject: 'Test Email'
    }, function (err, message) {
        if (err) {
            // handle error
            console.log(err);
            res.send('There was an error rendering the email');
            return;
        }
        res.header('Content-Type', 'text/plain');
        res.send(message);
    }, { name: 'my name is frank'});

});








/**
 * Index
 */
app.get('/', indexRoute);
app.get('/strava/', stravaRoute);
app.get('/tickets/', ticketsRoute);
app.get('/email/', emailRoute);




app.listen(port, () => console.log(`Example app listening on port ${port}!`))
