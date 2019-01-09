const dotenv = require('dotenv')
dotenv.config({path: '.env'})
const _ = require('lodash')
const mongoose = require('mongoose');
const express = require('express')
const mailer = require('express-mailer')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000

app.set('view engine', 'pug');
app.use(bodyParser.json());// for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use((req, res, next) => {
    let now = new Date().toString()
    console.log(now)
    next()
})


const indexRoute = require('./routes/index')
const stravaRoute = require('./routes/strava')
const emailRoute = require('./routes/email')
const ticketsRoute = require('./routes/tickets')
const trainingRoute = require('./routes/training')
const propertyRoute = require('./routes/property')


/**
 * @description setup mongoose configurations
 */
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.set('debug', function (collectionName, method, query, doc, options){
	console.log('collectionName', collectionName)
	console.log('query', query)
	console.log('doc', doc)
});

/**
 * @description gte the reference to the database
 */
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//mailer.extend(app, {
//    from: 'frank@altv.com',
//    cc: ['frankinedinburgh@yahoo.ie', 'frankhaguemail@gmail.com'],
//    host: 'smtp.office365.com',
//    secureConnection: false, // use SSL
//    port: 587, // port for secure SMTP
//    transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
//    auth: {
//        user: process.env.EMAIL_ACCOUNT,
//        pass: process.env.EMAIL_PASSWORD
//    }
//});

//app.get('/', function (req, res, next) {
//
//    app.mailer.render('email', {
//        to: ['frank@altv.com', 'frankinedinburgh@yahoo.ie'],
//        subject: 'Test Email'
//    }, function (err, message) {
//        if (err) {
//            // handle error
//            console.log(err);
//            res.send('There was an error rendering the email');
//            return;
//        }
//        res.header('Content-Type', 'text/plain');
//        res.send(message);
//    }, { name: 'my name is frank'});
//
//});
//
//
//app.get('/send', function (req, res, next) {
//
//    app.mailer.send('email', {  // send the email
//        to: ['frank@altv.com', 'frankinedinburgh@yahoo.ie'],
//        subject: 'Test Email'
//    }, function (err, message) {
//        if (err) {
//            // handle error
//            console.log(err);
//            res.send('There was an error rendering the email');
//            return;
//        }
//        res.header('Content-Type', 'text/plain');
//        res.send(message);
//    }, { name: 'my name is frank'});
//
//});


/**
 * Index
 */
app.get('/', indexRoute)
app.get('/strava/', stravaRoute)
app.get('/tickets/', ticketsRoute)
app.get('/email/', emailRoute)
app.get('/training/', trainingRoute)
app.get('/property/', propertyRoute)




const Training = require('./models/training.model')
app.get('/testing/', function(req, res){
	Training.find({}).exec(function (err, books){
			if (err) {
				res.send('error occured')
			} else {
				console.log(books);
				res.json(books);
			}
		});
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
