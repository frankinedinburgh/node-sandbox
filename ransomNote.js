#!/usr/local/bin/node
// Time complexity && Big O notation
// Big O notation = how performant a function is
// Constant runtime
// Linear runtime
// Exponential runtime
// Logarithmic runtime

const harmlessRansomNote = (noteText='', magazineText='') => {
    const noteArr = noteText.split(' ');
    const magazineArr = magazineText.split(' ');

    // using a hash table
    const magazineObj = {};

    magazineArr.forEach(word => {
        if(!magazineObj[word]) magazineObj[word] = 0;
        magazineObj[word]++;

    });

    let noteIsPossible = true;
    noteArr.forEach(word => {
        if(magazineObj[word]) {
            magazineObj[word]--;
            if(magazineObj[word] < 0) noteIsPossible = false;
        } else {
            noteIsPossible = false;
        }
    });

    console.log(noteIsPossible);
    return noteIsPossible;
};


harmlessRansomNote('i am going to ', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas maximus, magna nec mattis sollicitudin, lorem tellus rutrum augue, a gravida turpis sapien at ipsum.');


// Linear time complexity is more performant
