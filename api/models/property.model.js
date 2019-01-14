/**
 * @link https://codeburst.io/writing-a-crud-app-with-node-js-and-mongodb-e0827cbbdafb
 * @link https://www.tutorialkart.com/nodejs/mongoose/insert-multiple-documents-to-mongodb/
 * @type {Mongoose}
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const housesSchema = new Schema({
	address: { type: String, required: true },
	link: { type: String, required: false },
	desc: { type: String, required: false },
	price: { type: String, required: false },
	viewings: { type: String, required: false }
});

module.exports = mongoose.model('House', housesSchema, 'Property');


