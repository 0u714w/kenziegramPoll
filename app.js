const express = require("express");
const fs = require('fs');
const multer = require('multer');
const uploadsPath = './public/uploads';


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

app.set('view engine', 'pug');
app.get('/', (req, res) => {
    fs.readdir(uploadsPath, function(err, items) {
        const itemPaths = items.map(item => `uploads/${item}`);
        res.render('index', { title: 'KenzieGram', h1: 'Welcome to Kenziegram', images: itemPaths });
    });
});

app.post('/uploads/', upload.single('myImage'), (req, res) => {
    res.render('upload', { title: 'Upload', h1: 'file uploaded', imagePath: `uploads/${req.file.filename}` });
});


app.listen(port, function() { console.log("I am working") });