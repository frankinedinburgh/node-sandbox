
/**
 * @link https://codeburst.io/writing-a-crud-app-with-node-js-and-mongodb-e0827cbbdafb
 * @link https://www.tutorialkart.com/nodejs/mongoose/insert-multiple-documents-to-mongodb/
 * @type {Mongoose}
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trainingSchema = new Schema({
	date: Date,
	day: String,
	session: String,
	details: String,
	notes: String
});


module.exports = mongoose.model('Session', trainingSchema, 'Training');


