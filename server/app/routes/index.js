'use strict';
var mongoose = require('mongoose');
var Restaurant = mongoose.model('Restaurant');
var request = require('request');
var cheerio = require('cheerio');
var bluebird = require('bluebird');
var AlchemyAPI = require('alchemy-api')
var alchemy = new AlchemyAPI("80519a32da8d918f0e517dcdcc91f9b247db03be");
var router = require('express').Router();
module.exports = router;

router.use('/restaurants', require('./restaurants'));

function scraping(url, searchItem) {
    // console.log(typeof url, url);
    return new Promise(function(resolve, reject) {
        var info = [];
        request.get(url, function(err, response) {
            if (err) {
                console.log('this is scraping utility err', err);
                reject(err);
            } else {

                var $ = cheerio.load(response.body);
                var infos = $(searchItem);
                infos.each(function(index) {
                    // console.log($(this).text());
                    if (searchItem === '.star-img') {
                        // console.log('hit star-img')
                        info.push($(this).attr('title').slice(0, 3));
                    } else {
                        info.push($(this).text().trim());
                    }
                });
                resolve(info);
            }
        });
    })
}

function alchemyCalc(a) {
	return new Promise (function(resolve, reject){
		alchemy.sentiment(a, {}, function(err, response){
			if (err) reject(err);

			resolve(response.docSentiment);
		});
	});
};

function scrapeData (URL) {
	var newRest={}
	// var promiseArray = [];

	var p1 = scraping(URL, '.biz-page-title');
	//scraping restaurant name
	// .then(function(info){
	// 	newRest.name = info;
	// 			return info;

	// })

	var p2 = scraping(URL, '.ngram') //scraping keywords
	// .then(function(info){
	// 	newRest.ngram = info;
	// 			return info;

	// })

	var p3 = scraping(URL, '.star-img'); //scraping stars
	// .then(function(info){
	// 	newRest.stars = info;
	// 	return info;
	// })
	
	var p4 = scraping(URL, '.review-content > p') //scraping reviews
	.then(function(review){
		// return Promise.all(review.map(function (rev) {
			// var alch = alchemyCalc(rev);
			// console.log('THIS IS REV + ALCH', rev, alch);
			// return alch;

			// }))
		var reviews = review.join()
		return alchemyCalc(reviews);

		// .then(function(ans){
		// 	newRest.result = ans;
		// 	// console.log('this is new rest', newRest)
		// })
	})
	// console.log('this is newRest', newRest)
	// return newRest;
	return Promise.all([p1,p2,p3,p4]);
}

router.get('/', function(req, res, next){
	Restaurant.find({})
	.exec()
	.then(function(rest){
		res.send(rest);
	})
	.then(null,function (err) {
	  console.log("THIS IS ERROR ROOT", err);
	});

})

router.post('/', function (req, res, next){

	// console.log('hit router', req.body)

	// console.log(req.body);

	scrapeData(req.body)
	.then(function (newRest) {
		console.log('this is new rest', newRest)
		
		var newRestaurant = {
			name: newRest[0].join(),
			url: req.body.url,
			keyword: newRest[1],
			stars: newRest[2].map(parseFloat),
			result: newRest[3]
		}

		// console.log(newRestaurant)

		// console.log(req.body);
		return Restaurant.create(newRestaurant)
	})
	.then(function(created){
			console.log('created!')
			res.send(created);
	}, next)
	// .then(null, next);

});




router.use(function (req, res) {
    res.status(404).end();
});