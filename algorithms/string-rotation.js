/*

String Rotation

Instructions:

Create a function that takes in two strings as parameters.
Return true if the strings are rotations of each other.
Otherwise, return false;

Input: String, String
Output: Boolean

Examples - the following sets of strings are rotations:
"1234", "2341", "3412", "4123"
"rotation", "otationr", "tationro", "ationrot"
"Rotate me", "otate meR", "tate meRo", "ate meRot", "te meRota"

*/

console.log(stringRotation("my name is", " name ismy"))

function stringRotation(strA, strB) {

    return (strA.length === strB.length) && (strA + strA).includes(strB)

    // if(strA.length !== strB.length) {
    //     return false;
    // }
    //
    // let answer = [];
    //
    // for(let i=0; i<strA.length; i++) {
    //     let rotation = strA.slice(i, strA.length) + strA.slice(0, i);
    //     if(rotation === strB) {
    //         return true;
    //     }
    // }
    //
    // return false;

}
