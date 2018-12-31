const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017';
const dbName = url + '/test';


mongoose.Promise = global.Promise;
mongoose.connect(dbName)


let Todo = mongoose.model('Todos', {
	text: {
		type: String
	},
	completed: {
		type: Boolean
	},
	completedAt: {
		type: Number
	}
})




let newTodo = new Todo({
	text: 'Save to the database'
});


newTodo.save().then((doc) => {
	console.log('Saved todo', doc)
}, (e) => {
	console.log('unable to save todo')
})



