const express = require("express");
const fs = require('fs');
const multer = require('multer');


const publicPath = "public/";
const port = 3000;


const app = express();
app.use(express.static('./public'));

const storage = multer.diskStorage({
    destination: './public/uploads',

});


const path = './public/uploads';



const upload = multer({
    storage: storage,

});

app.get('/', (req, res) => {

    fs.readdir('./public/uploads', function(err, items) {
        let html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>KenzieGram</title><style>h1{background-image: linear-gradient(to right, pink, lightblue); padding: 30px; color: white; border: 1px solid black; width: 50%; text-align: center; margin: auto;} section{ border: 1px solid black; padding: 10px;width: 50%; margin: auto; background-image: linear-gradient(to right, pink, lightblue);} img {border: 1px solid black; display: block; margin-left: auto; margin-right: auto; width: 50%;}</style></head><body><h1>KenzieGram</h1><br><section><form method="POST" action="uploads/" enctype="multipart/form-data"><div><input type="file" id="image-upload" name="myImage"></div><div> <button type="submit">Upload Image</button></div></form> </section> <br> </body></html>';

        items.splice(items.findIndex(item => item === '.DS_Store'), 1)
        items.forEach(item => html += `<img src="uploads/${item}" width=500>`);

        res.send(`${html}`);
    });

});

app.post('/uploads/', upload.single('myImage'), (req, res) => {
    res.send(`<a href="..">Back</a><img src="${req.file.filename}">`);
});



app.listen(port, function() { console.log("I am working") });