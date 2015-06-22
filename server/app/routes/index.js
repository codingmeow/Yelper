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

function scrapeData (URL) {
	var newRest={}
	// var promiseArray = [];

	var p1 = scraping(URL, '.biz-page-title') //scraping restaurant name
	// .then(function(info){
	// 	newRest.name = info;
	// 			return info;

	// })
	// .catch(function (err) {
	//   console.log("THIS IS ERROR 3", err);
	// });

	var p2 = scraping(URL, '.ngram') //scraping keywords
	// .then(function(info){
	// 	newRest.ngram = info;
	// 			return info;

	// })
	// .catch(function (err) {
	//   console.log("THIS IS ERROR 2", err);
	// });

	var p3 = scraping(URL, '.star-img') //scraping stars
	// .then(function(info){
	// 	newRest.stars = info;
	// 	return info;
	// })
	// .catch(function (err) {
	//   console.log("THIS IS ERROR 1", err);
	// });

	scraping(URL, '.review-content > p') //scraping reviews
	.then(function(review){
		return var p4 = Promise.all(review.map(function (rev) {
			// console.log('THIS IS REV', rev);
			return alchemyCalc(rev)

			}))

		// .then(function(ans){
		// 	newRest.result = ans;
		// 	// console.log('this is new rest', newRest)
		// })
	})
	// .catch(function (err) {
	//   console.log("THIS IS ERROR 4", err);
	// });
	// console.log('this is newRest', newRest)
	// return newRest;
	return Promise.all([p1,p2,p3,p4])
}

router.get('/', function(req, res, next){
	Restaurant.find({})
	.exec()
	.then(function(rest){
		res.send(rest);
	})
	.catch(function (err) {
	  console.log("THIS IS ERROR ROOT", err);
	});

})

router.post('/', function (req, res, next){

	// console.log('hit router', req.body)

	// console.log(req.body);

	scrapeData(req.body).then(function (newRest) {
		console.log('this is new rest', newRest)
		
		var newRestaurant = {
			name: newRest[0].stringify(),
			url: req.body,
			keyword: newRest[1],
			stars: Number(newRest[2]),
			result: newRest[3]
		}

		// console.log(newRestaurant)

		// console.log(req.body);
		Restaurant.create(newRestaurant).then(function(created){
			console.log('created!')
			res.send(created);
		}, next);

	})
	.catch(function (err) {
	  console.log("THIS IS ERROR 4", err);
	});

});




router.use(function (req, res) {
    res.status(404).end();
});