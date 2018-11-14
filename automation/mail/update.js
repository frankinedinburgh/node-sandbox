const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const env = path.join(__dirname, '../../.env');
require('dotenv').config({path: env});
const emails = require('./emails');
const file = path.join(__dirname, '../../tickets.json')
const tickets = JSON.parse(fs.readFileSync(file, 'utf8'));
const size = require('../../modules/size');
const dist = path.join(process.env.HOME, '/Sites/dugout-mena-v2/dist');
const totalSize = size(dist);

const revision = require('../../modules/track-git-version.js');
console.log(revision)
process.exit();

const message = function(arr) {
    const list = arr.map(d => {
        return `<li><a href="${process.env.JIRA_URL}/browse/${d.key}">${d.key}</a><br/><small><strong>Summary:</strong> ${d.summary}</small></li>`;
    });

    let footer = `<small><b>Size: </b></small>${totalSize}</small><br/>`;
    footer += `<small><b>Size: </b></small>${totalSize}</small><br/>`

    return `<div>
					<ol>${list}</ol>
					${footer}
			</div>`
}


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
    subject: 'TEST AUTOMATED EMAIL', // Subject line
    html: message(tickets) // html body
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
