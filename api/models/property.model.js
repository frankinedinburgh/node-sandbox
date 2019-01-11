/**
 * @link https://codeburst.io/writing-a-crud-app-with-node-js-and-mongodb-e0827cbbdafb
 * @link https://www.tutorialkart.com/nodejs/mongoose/insert-multiple-documents-to-mongodb/
 * @type {Mongoose}
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const housesSchema = new Schema({
	address: { type: String },
	link: { type: String },
	desc: { type: String },
	price: { type: String },
	viewings: { type: String }
});

module.exports = mongoose.model('House', housesSchema, 'Property');


