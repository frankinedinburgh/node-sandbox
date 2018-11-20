/**
 * @param str
 * @input string
 * @output boolean
 */

console.log(isUnique('abcdefA'));
function isUnique(str) {
    let arr = str.split('')
    let newArr = [];
    for(let i=0; i<= arr.length; i++) {
        console.log(arr[i])
        if(newArr.indexOf(arr[i]) === -1) {
            newArr.push(arr[i]);
        }
    }

    if(newArr.length === arr.length) {
        return true;
    }
    return false;
}




