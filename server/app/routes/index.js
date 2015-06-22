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
       	console.log(err);
       	reject(err);
       }

       else {

         var $ = cheerio.load(response.body);
         var infos = $(searchItem);
         infos.each(function(index) {
           // console.log($(this).text());
            if(searchItem === '.star-img'){
            	// console.log('hit star-img')
             	info.push($(this).attr('title').slice(0,3));
	        } else{
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

// router.get('/', function(req, res, next){


// })

function scrapeData (URL) {

	var newRest={}

	scraping(URL, '.star-img') //scraping stars
	.then(function(info){
		newRest.stars = info;
	})
	.catch(function (err) {
	  console.log("THIS IS ERROR 1", err);
	});

	scraping(URL, '.ngram') //scraping keywords
	.then(function(info){
		newRest.ngram = info;
	})
	.catch(function (err) {
	  console.log("THIS IS ERROR 2", err);
	});

	scraping(URL, '.biz-page-title') //scraping restaurant name
	.then(function(info){
		newRest.name = info;
	})
	.catch(function (err) {
	  console.log("THIS IS ERROR 3", err);
	});

	scraping(URL, '.review-content > p') //scraping reviews
	.then(function(review){
		return Promise.all(review.map(function (rev) {
			// console.log('THIS IS REV', rev);
			return alchemyCalc(rev)

			}))
		.then(function(ans){
			newRest.result = ans;
			// console.log('this is new rest', newRest)
		})
	})
	.catch(function (err) {
	  console.log("THIS IS ERROR 4", err);
	});

	return newRest;

}

router.post('/', function (req, res, next){

	// console.log('hit router', req.body)

	console.log(req.body);

	scrapeData(req.body).then(function (newRest) {
		
		var newRestaurant = {
			name: newRest.name,
			url: req.body,
			stars: newRest.stars,
			result: newRest.result
		}

		// console.log(newRestaurant)

		// console.log(req.body);
		Restaurant.create(newRestaurant).then(function(created){
			res.send(created);
		}, next);

	})



});

router.use(function (req, res) {
    res.status(404).end();
});