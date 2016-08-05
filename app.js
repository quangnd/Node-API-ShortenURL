var express = require('express');
var nunjucks = require('nunjucks');
var app = express();

var port = process.env.PORT || 3000;

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

var mainRouter = require('./routes/mainRoutes')();
app.use('/', mainRouter);

app.listen(port, function (err) {
    console.log('Server is running on port ' + port);
});


//Basic algorithm
//1. Create a MongoDB document with 3 field: originalURL, representNum, shortURL
//2. Get url parameter, generate a random number between 1000 and 9999, then generate shortURL
//3. Save to document
//4. Find url by representNum and redirect to originalURL
