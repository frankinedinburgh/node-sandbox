const _ = require('lodash');
let arr = [
    " Total Digital Limited",
    " reesmarx",
    " Global Shares",
    " Verisk",
    " TestReach",
    " Shaw Academy",
    " Ergo",
    " Red Pen eLearning",
    " Coastline Gaming",
    " Version 1",
    " Two Ten Health",
    " Xpertivity",
    " Distilled SCH",
    " Car Trawler",
    " Client Solutions",
    " Oliver James Associates"
];

console.log(_.difference(arr, [" Ergo"," Car Trawler"," Version 1"," Total Digital Limited"," reesmarx"]))
