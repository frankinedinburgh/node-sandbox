let bufferOne = Buffer.from('This is a buffer example.');
console.log(bufferOne);

// Output: <Buffer 54 68 69 73 20 69 73 20 61 20 62 75 66 66 65 72 20 65 78 61 6d 70 6c 65 2e>

let json = JSON.stringify(bufferOne, null, 4);
console.log(json);

// Output: {"type":"Buffer","data":[84,104,105,115,32,105,115,32,97,32,98,117,102,102,101,114,32,101,120,97,109,112,108,101,46]}
