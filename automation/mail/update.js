const path = require('path');
const pug = require('pug');
const _ = require('lodash');
const nodemailer = require('nodemailer');
const env = path.join(__dirname, '../../.env');
require('dotenv').config({path: env});
const emails = require('./emails');
const size = require('../../modules/size');
const compiledFunction = pug.compileFile(path.join(__dirname, './mail.pug'));
const houses = require(path.relative(__dirname, 'playground/houses.json'));
const trovit = require(path.relative(__dirname, 'playground/trovit.json'));


let filteredHouses = _.chain(trovit)
    .filter(d => /Fernleigh/g.test(d.text))
    .value();

// console.log(filteredHouses);
// process.exit();

console.log(compiledFunction({
    houses: houses,
    trovit: filteredHouses
}))



//message(tickets)
//process.exit();


//let obj;
//fs.readFile(tickets, 'utf8', function (err, data) {
//	if (err) throw err;
//	obj = JSON.parse(data);
//	console.log(obj);
//	process.exit();
//});

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false, // use SSL
    auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD
    }
});

const mailOptions = {
    from: `"${process.env.EMAIL_ACCOUNT} " <${process.env.EMAIL_ACCOUNT}>`, // sender address (who sends)
    to: emails.to,
    cc: emails.cc,
    subject: 'Properties for sale in Fernleigh', // Subject line
    html: compiledFunction({
        trovit: filteredHouses
    })
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error) return console.log(error);
    console.log('Message sent: ' + info.response);
});

process.on('exit', (code) => {
    console.log(`EMAIL has been sent at ${process.env.EMAIL_ACCOUNT}`);
    //console.log(Object.keys(transporter));
});
