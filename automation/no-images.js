const path = require('path');
const fs = require('fs');
const command = require('../modules/command');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../.env') });

const faker = require('faker');


const text =  JSON.stringify({
	title: faker.name.jobTitle(),
	excerpt: faker.lorem.lines(3),
	description: faker.lorem.sentences(6, ' '),
	tags: faker.lorem.words(3).split(' '),
	image: faker.image.imageUrl(),

}, null, 4);

fs.writeFile(path.join(__dirname, '../faker.txt'), text, function(err) {
	if(err) {
		return console.log(err);
	}

	const { image } = JSON.parse(text);

	command(`curl -O ${process.env.HOME}/Sites/node-sandbox/images/${image}.jpg`, (error, data) => {
		if(error) return console.log('There is an error \n' + JSON.stringify(error))
		console.log('Successfully downloaded image \n' + data)
		process.exit();
	});

});







