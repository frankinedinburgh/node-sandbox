/**
 * @type {Mongoose}
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jobsSchema = new Schema({
	title: {
		type: String,
		default: null
	},
	company: {
		type: String,
		default: null
	}
});

module.exports = mongoose.model('Jobs', jobsSchema);
