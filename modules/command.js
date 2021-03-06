const exec = require('child_process').exec;
const os= require('os');

const result = (command, cb) => {
	const child = exec(command, (err, stdout, stderr) => {
		if(err !== null){
			return cb(new Error(err), null);
		}else if(typeof(stderr) !== "string"){
			return cb(new Error(stderr), null);
		}else{
			return cb(null, stdout);
		}
	});
}

module.exports = result;
