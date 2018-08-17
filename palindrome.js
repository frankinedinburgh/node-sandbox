#!/usr/local/bin/node

const isPalindrome = string => {
    // return true or false
    string = string.toLocaleString();
    let charactersArr = string.split('');
    let validCharacters = 'abcdefghijklmnopqrstuvwxyz'.split('');

    let lettersArr = [];
    charactersArr.forEach(char => {
        if(validCharacters.indexOf(char) > -1) lettersArr.push(char);
    });


    if(lettersArr.join('') !== lettersArr.reverse().join('')) {                              1
        return false;
    }

    return true;

};

const test = isPalindrome('reverse array in place');
console.log(test);
