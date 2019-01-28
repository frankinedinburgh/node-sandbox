console.log(
	removeDupesEx1('bacdefghijjjjj'),
	removeDupesEx2('bacdefghijjjjj')
)

console.time('Example One')
function removeDupesEx1(str) {
	str = new Set(str);
	let result = '';

	for(let i of str) {
		result += i;
	}
	return result;
}
console.timeEnd('Example One')

console.time('Example Two')
function removeDupesEx2(str){
	str = new Set(str);
	return Array.from(str).join('');
}

console.timeEnd('Example Two')
