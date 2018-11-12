const path = require('path');
const command = require('../modules/command');
const faker = require('faker');

let arr = [1,2,3,4];
for(let i =0; i<=arr.length; i++) {

	const image = faker.image.imageUrl();
	const filename = faker.lorem.slug(1);
	const cm = `curl ${image}/ -o ${process.env.HOME}/Desktop/images/${filename}.jpg`;

	command(cm , (error, data) => {
		if(error) return console.log(`There is an error \n${cm}`)
		console.log(`Successfully downloaded image \n${cm}`)
	});
}








