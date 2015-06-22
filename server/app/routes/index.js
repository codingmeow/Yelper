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
       var info = [];
       request.get(url, function(err, response) {
         if (err) reject(err)
         else {
           var $ = cheerio.load(response.body);
           var infos = $(searchItem);
           infos.each(function(index) {
             // console.log($(this).text());
	            if(searchItem === '.star-img'){
	            	// console.log('hit star-img')
	             	info.push($(this).attr('title').slice(0,3));
		        }else{
			        info.push($(this).text().trim());
		        }
		      });
           resolve(info);
			}
		});
    })
}

// bluebird.promisify(scraping);
// res.text = {url: req.query.link, response:JSON.stringify(response, null, 4), results: response};

function alchemyCalc(a) {
	// return new Promise (function(resolve, reject){
	alchemy.sentiment(a, {}, function(err, response){
		if (err) throw err;

	console.log('hit router alchemy', response.docSentiment);		
		return response.docSentiment;
	})	
	// resolve(info);
	// })
}

router.get('/', function(req, res, next){

	var newRest={}
	newRest.result = [];
	// scraping(req.query.link, '.star-img')
	// .then(function(info){
	// 	// console.log('hit router', info)
	// 	newRest.stars = info;
	// })
	// .catch(function (err) {
	//   console.log(err);
	// });

	// scraping(req.query.link, '.ngram')
	// .then(function(info){
	// 	newRest.ngram = info;
	// }, next);

	alchemy.sentiment(req.query.link, {}, function(err, response){
		if (err) throw err;
		// res.text = {url: req.query.link, response:JSON.stringify(response, null, 4), results: response};
		var result = response;
		console.log('hit router', result);
		// res.send(result); //<-- for some reason, this line breaks the code
	});


	scraping(req.query.link, '.review-content > p')
	.then(function(review){
		newRest.result.push(alchemyCalc(review))
		// review.forEach(function(rev){
		// 	newRest.result.push(alchemyCalc(rev));
		// })
		console.log('hit router review', newRest)
		// return newRest.result;
	})
	// .then(function(result){
	// 	newRest.result = result;
	// 	console.log('hit router review', newRest)
	// 	return newRest;
	// })
	.catch(function (err) {
	  console.log(err);
	});
	// .then(null, next);
	// alchemy.keywords()
	// console.log('hit router', req.query.link)
//Use mongoose if avail in database
	// Restaurant
	// .find({url:req.query.link})
	// .exec()
	// .then(function(rest){
	// 	console.log(rest)
	// 	res.send(rest);
	// }, next);
//use alchemy to scrape the website


	// alchemy.sentiment(req.query.link, {}, function(err, response){
	// 	if (err) throw err;
	// 	// res.text = {url: req.query.link, response:JSON.stringify(response, null, 4), results: response};
	// 	var result = response;
	// 	console.log('hit router', result);
	// 	res.send(result);
	// })

})

router.post('/', function (req, res, next){
	console.log('hit router', req.body)
	Restaurant.create(req.body).then(function(created){
		res.send(created);
	},next);
	// var restaurant = new Restaurant(req.body);
	// restaurant.save(function (err){
	// 	res.status(200).send(restaurant);
	// });
});

//reviews: $('.review-content > p')
//ngram: $('.ngram')
//stars: $('.star-img').attr('title') //newRest.stars.push($(this).text().slice(0,3));


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});