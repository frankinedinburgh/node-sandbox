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
	let filename = image.split('/');
	filename = filename[filename.length -1];
	const newFileName = faker.lorem.slug(1);

	const cm = `cd ${path.join(__dirname, '../images/')} && curl -o ${newFileName}.jpeg ${image}`;

	command(cm , (error, data) => {
		if(error) return console.log(`There is an error \n${cm}`)
		console.log(`Successfully downloaded image \n${cm}`)

	});

});



