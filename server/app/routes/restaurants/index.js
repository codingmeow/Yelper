var router = require('express').Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Restaurant = mongoose.model('Restaurant');

module.exports = router;

router.get('/:restname', function (req, res, next){
	Restaurant.findOne({name: req.params.restname}).exec()
	.then(
		function (rest){
			res.json(rest);
		}, 
		next
	);
});

