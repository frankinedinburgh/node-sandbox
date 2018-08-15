#!/usr/local/bin/node
const { spawn } = require('child_process');
const ls = spawn('ls', ['-al', '/Users/frankhague/Desktop']);

ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);

    process.chdir('../../');
    process.cwd();


    spawn('ls', ['-al', process.cwd()]).on('data', (data) => {
        console.log(`stdout: ${data}`);
    });
});

ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});


