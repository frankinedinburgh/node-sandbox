const runAll = require("npm-run-all");

runAll(["backlog", "email"], { parallel: false })
	.then(() => {
		console.log("done!");
	})
	.catch(err => {
		console.log("failed!");
	});

