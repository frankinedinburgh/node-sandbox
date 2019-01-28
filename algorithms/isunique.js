
console.time("isUnique version 1");
function isUnique(str) { // 0(n)
	for(let i=0; i<str.length; i++) { // 0(n)
		if(str.lastIndexOf(str[ i ]) !== i) {
			return false
		}
	}
	return true;
}
console.timeEnd("isUnique version 1");
console.log(
	isUnique('abcdefg'),
	isUnique('JanFebMArchAprilMay')
); // true false false true


// version 2 with sorting
console.time("isUnique version 2");
function isUnique2(str){ // 0(n)
	const chars = str.split("").sort()

	for (let i=1; i<=chars.length; i++) {
		if(chars[i] === chars[i - 1]) {
			return false
		}
	}
	return true;
}
console.timeEnd("isUnique version 2");
console.log(
	isUnique2('abcdefg'),
	isUnique2('JanFebMArchAprilMay')
);


console.time("isUnique version 3");
function isUnique3(str){ // 0(n)
	const chars = new Set();

	for(let i=0; i<str.length; i++) {
		const thisChar = str[i];

		if(chars.has(thisChar)) {
			return false;
		}

		chars.add(thisChar);
	}

	return true;
}
console.timeEnd("isUnique version 3");
console.log(
	isUnique3('abcdefg'),
	isUnique3('JanFebMArchAprilMay')
);


console.time("isUnique version 4");
function isUnique4(str){ // 0(n)
	return new Set(str).size === str.length;
}
console.timeEnd("isUnique version 4");
console.log(
	isUnique4('abcdefg'),
	isUnique4('JanFebMArchAprilMay'),
	isUnique4([5,7,8,'f','f','g','this isafhjds'])
);
