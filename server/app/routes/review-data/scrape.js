var request = require('request');
var cheerio = require('cheerio');

request.get('http://www.yelp.com/biz/romano-pizza-weehawken', function (err, response) {
		if (err) console.log(err);
    var $ = cheerio.load(response.body);
    var reviews = $('.review');
    var reviewTexts = [];

    reviews.each(function (index) {
        reviewTexts.push($(this).text());
    });

    var str = reviewTexts.join('');

    var arr = str.replace(/\n/g, '').split('Compliment');
    console.log(arr);
});