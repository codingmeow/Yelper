'use strict';
var mongoose = require('mongoose');
var AlchemyAPI = require('alchemy-api')
var alchemy = new AlchemyAPI("80519a32da8d918f0e517dcdcc91f9b247db03be");
var router = require('express').Router();
module.exports = router;

// router.use('/tutorial', require('./tutorial'));
// router.use('/members', require('./members'));

// function text(req, res, output) {
// 	alchemy.text('url', demo_url, {}, function(response) {
// 		output['text'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response };
// 		// author(req, res, output);
// 	});
// }

router.get('/', function(req, res, next){
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
	alchemy.sentiment(req.query.link, {}, function(err, response){
		if (err) throw err;
		// res.text = {url: req.query.link, response:JSON.stringify(response, null, 4), results: response};
		var result = response;
		console.log('hit router', result);
		res.send(result);
	})
})

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});