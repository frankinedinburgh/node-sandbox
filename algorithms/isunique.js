/**
 * @param str
 * @input string
 * @output boolean
 */

console.log(
	isUnique('abcdefg')
); // true false false true

function isUnique(str) {
	for(let i=0; i<str.length; i++) {
		if(str.lastIndexOf(str[i]) !== i) {
			return false;
		}
	}
	return true;
}






// Time: O(n * log(n))
// Space:
