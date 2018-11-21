/**
 * @param str
 * @input string
 * @output boolean
 */

console.log(
	isUnique('abcdefA'),
	isUnique('56478956hjhdsafh'),
	isUnique('£@£$£$£%£^DSgfsdgsfdgdfs'),
	isUnique('7890@£$bnmfgER'),
); // true false false true

function isUnique(str) {
	const chars = new Set();
	for(let i = 0; i < str.length; i++) { // O(n)
		const thisChar = str[i]

		if(chars.has(thisChar) === true) {
			return false
		}

		chars.add(thisChar)
	}

	return false
}




// Time: O(n * log(n))
// Space:
