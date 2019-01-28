/*

Highest Frequency

Instructions:
Write a function that takes an array of strings
and returns the most commonly occurring string
in that array.

If there are multiple strings with the same high
frequency, return the one that appears first in the array

Input: Array of Strings
Output: String

*/


// Examples:
console.log(
	highestFrequency(['a','b','c','d','e', 'e', 'ghi', 'ghi', 'ghi', 'a','a','a'])
)

function highestFrequency(strings){
	const frequencies = {};
	let maxFrequency = 0;
	let mostFrequentString = strings[0];

	for(let i=0; i < strings.length; i++) {
		const thisStr = strings[i];
		if(frequencies[ thisStr ]) {
			frequencies[ thisStr ]++;
		} else {
			frequencies[ thisStr ] = 1;
		}

		if (frequencies[ thisStr ] > maxFrequency) {
			maxFrequency = frequencies[ thisStr ]
			mostFrequentString = thisStr
		}
	}
	return mostFrequentString;
}
