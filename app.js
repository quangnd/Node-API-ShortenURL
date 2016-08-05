var express = require('express');
var nunjucks = require('nunjucks');
var app = express();

var port = process.env.PORT || 3000;

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.get('/', function (req, res){
    res.render('index.html', {url: req.protocol + '://' + req.get('host')});
});

app.get('/:url(*)', function (req, res){
    var originalURL = req.params.url;
    var representNum = getRandomInt(1000,9999);
    var shortURL = buildUrl(req.protocol, req.get('host'), representNum);
    res.send(originalURL);
    console.log('Original URL: ' + originalURL + ' - Represent Number: ' + representNum + ' - shortURL: ' + shortURL);
});

app.listen(port, function (err) {
    console.log('Server is running on port ' + port);
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function buildUrl(protocol, host, urlNumber) {
    return protocol + '://' + host + '/' + urlNumber;

}
//Basic algorithm
//1. Create a MongoDB document with 3 field: originalURL, representNum, shortURL
//2. Get url parameter, generate a random number between 1000 and 9999, then generate shortURL
//3. Save to document
//4. Find url by representNum and redirect to originalURL
