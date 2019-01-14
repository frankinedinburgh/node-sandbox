/**
 * @type {Mongoose}
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jobsSchema = new Schema({
	title: { type: String, default: null, required: false },
	company: { type: String, default: null, required: false }
});

module.exports = mongoose.model('Jobs', jobsSchema);
