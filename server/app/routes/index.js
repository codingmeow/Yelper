'use strict';
var mongoose = require('mongoose');
var rest = mongoose.model('Restaurant');
var request = require('request');
var cheerio = require('cheerio');
var bluebird = require('bluebird');
var AlchemyAPI = require('alchemy-api')
var alchemy = new AlchemyAPI("80519a32da8d918f0e517dcdcc91f9b247db03be");
var router = require('express').Router();
module.exports = router;

// router.use('/tutorial', require('./tutorial'));
// router.use('/members', require('./members'));
router.use('/restaurants', require('./restaurants'));

// function text(req, res, output) {
// 	alchemy.text('url', demo_url, {}, function(response) {
// 		output['text'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response };
// 		// author(req, res, output);
// 	});
// }
		// function scraping(url, searchItem){
		// 	    var reviewTexts = [];
		// 	    var i=0
		// 	return request.get(url, function (err, response) {
		// 	    var $ = cheerio.load(response.body);
		// 	    var reviews = $(searchItem);
		// 	    reviews.each(function (index) {
		// 	    	console.log($(this).text(), i++);
		// 	        reviewTexts.push($(this).text().trim());
		// 	    });
		// 	    return reviewTexts;
		// 	});
		// }

function scraping(url, searchItem) {
   return new Promise(function(resolve, reject) {
       var reviewTexts = [];
       request.get(url, function(err, response) {
         if (err) reject(err)
         else {
           var $ = cheerio.load(response.body);
           var reviews = $(searchItem);
           reviews.each(function(index) {
             // console.log($(this).text());
             reviewTexts.push($(this).text().trim());
           });
           resolve(reviewTexts);
         }
       });
     })
   }
// bluebird.promisify(scraping);

// alchemy.sentiment(req.query.link, {}, function(err, response){
// 	if (err) throw err;
// 	// res.text = {url: req.query.link, response:JSON.stringify(response, null, 4), results: response};
// 	var result = response;
// 	console.log('hit router', result);
// 	res.send(result);
// })

router.get('/', function(req, res, next){
	alchemy.sentiment(req.query.link, {}, function(err, response){
		if (err) throw err;
		// res.text = {url: req.query.link, response:JSON.stringify(response, null, 4), results: response};
		var result = response;
		console.log('hit router', result);
		// res.send(result); //<-- for some reason, this line breaks the code
	});

	scraping(req.query.link, '.ngram')
	.then(function(review){
		console.log('hit router  review', review)
		res.status(200).send('success')
	})
	// .then(null, next);
	// alchemy.keywords()
	// console.log('hit router', req.query.link)
//Use mongoose if avail in database
	// mongoose
	// .model('Restaurant')
	// .find({url:req.query.link})
	// .exec()
	// .then(function(rest){
	// 	console.log(rest)
	// 	res.send(rest);
	// }, next);
//use alchemy to scrape the website
})

//reviews: $('.review-content > p')


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});