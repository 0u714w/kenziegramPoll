const express = require("express");


const publicPath = "public/";
const port = 3000;


const app = express();


const path = './public/uploads';
fs.readdir(path, function(err, items) {
    console.log(items);
    res.send(`<h1>Welcome to Kenziegram!</h1>`);
});



app.listen(port);
console.log("I am running")