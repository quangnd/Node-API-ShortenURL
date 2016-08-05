var express = require('express');
var nunjucks = require('nunjucks');
var app = express();

var port = process.env.PORT || 3000;

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

//We don't need use route here, but I created a new router for personal purpose.
var mainRouter = require('./routes/mainRoutes')();
app.use('/', mainRouter);

app.listen(port, function (err) {
    console.log('Server is running on port ' + port);
});


//--BASIC algorithm
//1. Create a MongoDB document with 3 field: originalURL, representNum, shortURL
//2. Get url parameter, generate a random number between 1000 and 9999, then generate shortURL
//3. Save to MongoDB document
//4. Find url by representNum and redirect to originalURL

//--ADVANCED (not done)
//Convert url string to integer and decode integer to original url
