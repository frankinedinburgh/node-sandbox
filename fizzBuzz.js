#!/usr/local/bin/node
const arr = [435, 4325, 432, 544, 234, 1321, 342343, 345, 76];

// the modulus operator
function fizBuzz(arr) {
    return arr.map(d => {
        if((d % 3 === 0) && (d % 5 === 0)) {
            return "fizzbuzz";
        } else if(d % 3 === 0) {
            return "fizz";
        } else if(d % 5 === 0) {
            return "buzz";
        } else {
            return d;
        }
    });
}


console.log(fizBuzz(arr));



