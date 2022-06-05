const express = require('express');
const app = express();
const PORT = 80;
var https = require('https');
var fs = require('fs');


app.use(express.static('build'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});


var options = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    ca: fs.readFileSync('./ca.pem')
  };


https.createServer(options, app).listen(443);