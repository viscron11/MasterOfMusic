let time = new Date();
let hour = time.getHours();
console.log(hour);

let h1 = document.querySelector('h1');

if(hour >4 && hour <= 11) h1.innerText = "Good morning";
else if(hour >11 && hour <= 17) h1.innerText = "Good afternoon";
else h1.innerText = "Good evening";


const fs = require("fs");
const files = fs.readdirSync("/img");
console.log(files[0]);