/**
 * @link https://codeburst.io/writing-a-crud-app-with-node-js-and-mongodb-e0827cbbdafb
 * @link https://www.tutorialkart.com/nodejs/mongoose/insert-multiple-documents-to-mongodb/
 * @type {Mongoose}
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const housesSchema = new Schema({
	address: { type: String, default: null },
	link: { type: String, default: null },
	desc: { type: String, default: null },
	price: { type: String, default: null },
	viewings: { type: String, default: null }
}, {
	strict: true,
	strictQuery: true
});


module.exports = mongoose.model('House', housesSchema, 'Property');


