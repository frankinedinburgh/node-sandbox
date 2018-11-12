const commit = require('./command')

function timeOfCommit() {
	return new Promise(resolve => {
		commit(`git show -s --format="%ci"`, (err, data) => {
			if(err) return console.log(err)
			resolve({
				date: data.split(' ')[0],
				time: data.split(' ')[1]
			});
		})
	})
}

function getBranch() {
	return new Promise(resolve =>{
		commit(`git describe --all && git rev-parse --short HEAD`, (err, data) =>{
			if (err) return console.log(err);
			let arr = data.split('\n').filter(Boolean);
			resolve({
				branch: arr[ 0 ],
				commit: arr[ 1 ]
			})
		})
	})
}


function currentTime() {
	let d = new Date();
	let date = new Date().toDateString();
	let time = d.toLocaleString()
	time = time.split(' ');
	time = time[time.length - 1].replace(/[^\d:-]/g,'');
	return { date, time }
}


getBranch().then(res => {
	return res;
}).then(data => {
	timeOfCommit().then(res => {
		const obj = Object.assign(res, data);
		const { date, time }= currentTime();
		const message = `\n<!-- branch: ${obj.branch} commit: ${obj.commit} date: ${date} time: ${time} -->`;
		return message;
	})
});
