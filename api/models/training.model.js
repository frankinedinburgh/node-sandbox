/**
 * @link https://codeburst.io/writing-a-crud-app-with-node-js-and-mongodb-e0827cbbdafb
 * @link https://www.tutorialkart.com/nodejs/mongoose/insert-multiple-documents-to-mongodb/
 * @type {Mongoose}
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Today = new Date().toLocaleDateString();

const trainingSchema = new Schema({
	date: { type: Date, required: false, default: Today },
	day: { type: String, required: false, default: 'Tuesday' },
	session: { type: String, required: false, default: 'Track' },
	details: { type: String, required: false, default: '' },
	notes: { type: String, required: false, default: '' }
});


module.exports = mongoose.model('Session', trainingSchema, 'Training');


