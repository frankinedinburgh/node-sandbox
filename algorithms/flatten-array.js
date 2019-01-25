/*

Flatten Array

Instructions


flatten(['abc', ['def', ['ghi', 'jkl', 'mno', 'p']]])

*/

function flatten(array) {
	let answer = [];

	for(let i=0; i<array.length; i++) {
		const item = array[i];
		if(Array.isArray(item)) {
			const flatItem = flatten(item);
			for(let j=0; j < flatItem.length; j++) {
				answer.push(flatItem[j])
			}
		} else {
			answer.push(item)
		}
	}

	return answer;
}


console.log(
	flatten([ 'abc', [ 'def', [ 'ghi', 'jkl', 'mno', 'p' ] ] ])
)



function flatten2(str) {
    let uniqueChars = [];

    for(let i=0; i<str.length; i++) {
    	const thisChar = str[i];
        if(uniqueChars.includes(thisChar)) {
            continue;
		} else {
            uniqueChars.push(thisChar)
		}
    }

    return uniqueChars
}

console.log('Flatten 2');
console.log(
    flatten2('abcfdgabdcd')
)

