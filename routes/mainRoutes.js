var express = require('express');
var mainRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var commonFuncs = require('../utilities/commons');

var router = function () {
    mainRouter.route('/')
        .get(function (req, res) {
            res.render('index.html', { url: req.protocol + '://' + req.get('host') });
        });

    mainRouter.route('/:url')
        .get(function (req, res) {
            var representNum = parseInt(req.params.url); //field type in MongoDB is integer
            //var dbUrl = 'mongodb://localhost:27017/shorturlAPI';
            var dbUrl = process.env.MONGOLAB_URI;
            mongodb.connect(dbUrl, function (err, db) {
                if (err) {
                    console.log('Cannot connect to db');
                }

                var collection = db.collection('websites');
                collection.findOne({ represent_num: representNum }, function (err, result) {
                    if (err) {
                        console.log(err);
                    }

                    if (result) {
                        res.redirect(result.original_url);
                    } else {
                        res.send({ error: 'Not found in database!' });
                    }

                    db.close();


                });
            });
        });

    mainRouter.route('/:url(*)')
        .get(function (req, res) {
            if (commonFuncs.isUrlValid(req.params.url)) {
                console.log(req.params.url);
                var originalURL = req.params.url;
                var representNum = commonFuncs.getRandomInt(1000, 9999);
                var shortURL = commonFuncs.buildUrl(req.protocol, req.get('host'), representNum);

                //var dbUrl = 'mongodb://localhost:27017/shorturlAPI';
                var dbUrl = process.env.MONGOLAB_URI;
                console.log(dbUrl);
                mongodb.connect(dbUrl, function (err, db) {
                    var collection = db.collection('websites');
                    var websiteData = {
                        original_url: originalURL,
                        represent_num: representNum,
                        short_url: shortURL
                    };
                    collection.insert(websiteData, function (err, result) {
                        if (err) {
                            return console.log(err);
                        }

                        res.send({
                            original_url: result.ops[0].original_url,
                            short_url: result.ops[0].short_url
                        });
                    });
                });

                //console.log('Original URL: ' + originalURL + ' - Represent Number: ' + representNum + ' - shortURL: ' + shortURL);
            } else {
                res.send({ error: 'Not valid url!!!' });
            }

        });

    return mainRouter;
};

module.exports = router;
