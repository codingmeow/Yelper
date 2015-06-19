/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

Refer to the q documentation for why and how q.invoke is used.

*/

var mongoose = require('mongoose');
var connectToDb = require('./server/db');
var Restaurant = mongoose.model('Restaurant');
var q = require('q');
var chalk = require('chalk');

var getCurrentUserData = function () {
    return q.ninvoke(Restaurant, 'find', {});
};

var seedRestaurant = function () {

    var restaurant = [
        {
            name: 'test restaurant',
            url: 'http://www.yelp.com/biz/dominique-ansel-bakery-new-york',
            reviews: 'awsome bakery',
            stars: 5,
            result: 'TBD'
        },
        {
            name: 'Bahn Mi Cart',
            url: 'http://www.yelp.com/biz/banh-mi-cart-new-york',
            reviews: 'bahn mi cart reviews',
            stars: 5,
            result: 'TBD'
        },
        {
            name: 'Veronica\'s Kitchen',
            url: 'http://www.yelp.com/biz/veronicas-kitchen-new-york',
            reviews: 'Veronica\'s Kitchen reviews',
            stars: 5,
            result: 'TBD'
        },
        {
            name: 'Open Kitchen',
            url: 'http://www.yelp.com/biz/open-kitchen-new-york',
            reviews: 'Open Kitchen reviews',
            stars: 5,
            result: 'TBD'
        },
        {
            name: 'Sophie\'s Cuban Cuisine',
            url: 'http://www.yelp.com/biz/sophies-cuban-cuisine-new-york',
            reviews: 'Sophie\'s Cuban Cuisine',
            stars: 5,
            result: 'TBD'
        },
        {
            name: 'Dig Inn Seasonal Market',
            url: 'http://www.yelp.com/biz/dig-inn-seasonal-market-new-york',
            reviews: 'Dig Inn reviews',
            stars: 5,
            result: 'TBD'
        }
    ];

    return q.invoke(Restaurant, 'create', restaurant);

};

connectToDb.then(function () {
    getCurrentUserData().then(function (restaurant) {
        if (restaurant.length === 0) {
            return seedRestaurant();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});