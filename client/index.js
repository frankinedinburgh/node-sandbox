import 'babel-polyfill'
import './src/app'
import './src/buffers'
import './src/examples/prototype_inheritence'
import './src/examples/uint8array'
console.log('you are here')

// async function fetchLaunches(url){
//     try {
//         const result = await fetch(url);
//         const todos = await result.json();
//         //console.log(todos)
//         return todos;
//     } catch (err) {
//         console.log(err)
//     }
// }
//
// fetchLaunches('https://api.spacexdata.com/v3/launches')
//     .then(res => printToScreen(res))
//     .then(res => document.getElementById('demo').appendChild(res))
//     .catch(err => console.log(err))
//
//
//
// function printToScreen(data) {
//     let list = document.createElement("ul");
//     for (let i in data) {
//         let li = document.createElement("li");
//         let pre = document.createElement('pre');
//
//         pre.innerText = JSON.stringify(data[i], null, 4);
//         pre.style.color = "#ff0000";
//         li.appendChild(pre)
//         list.appendChild(li);
//     }
//     return list;
// }
