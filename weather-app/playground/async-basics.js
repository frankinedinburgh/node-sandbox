#!/usr/local/bin/node

console.log('Starting App');

setTimeout(() => {
    console.log('Inside of callback');
},2000);

setTimeout(() => {
    console.log('Second Timeout');
},0);


console.log('Finishing Up');

// Call stack and Event Loop
