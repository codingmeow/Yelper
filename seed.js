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
            name: 'Dominique Ansel Bakery',
            url: 'http://www.yelp.com/biz/dominique-ansel-bakery-new-york',
            keyword: [ 'Cronut', 'DKA', 'croissant' ],
            stars: [ 4.0, 4.0, 3.0, 3.0, 3.0, 2.0, 4.0, 4.0, 5.0, 5.0, 5.0, 5.0, 3.0, 4.0, 4.0, 5.0, 4.0, 4.0, 5.0, 2.0, 4.0, 5.0, 5.0, 5.0, 4.0, 3.0, 3.0, 5.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 5.0, 3.0, 2.0, 4.0, 5.0, 4.0, 4.0, 1.0, 4.0, 3.0, 4.0, 4.5, 4.0, 4.0],
            result: 'TBD'
        },
        {
            name: 'Bahn Mi Cart',
            url: 'http://www.yelp.com/biz/banh-mi-cart-new-yor',
            keyword: [ 'financial district', 'Chinatown', 'FiDi' ],
            stars:   [ 3.5, 4.0, 3.0, 4.0, 3.0, 4.0, 3.0, 3.0, 4.0, 4.0, 5.0, 2.0, 3.0, 5.0, 5.0, 5.0, 5.0, 4.0, 4.0, 4.0, 4.0, 3.0, 3.0, 4.0, 3.0, 4.0, 4.0, 3.0, 4.0, 4.0, 3.0, 4.0, 3.0, 4.0, 4.0, 3.0, 3.0, 4.0, 1.0, 4.0, 4.0, 3.0, 4.0, 4.0, 4.0, 4.0, 3.5, 3.5, 4.0],
            result: 'TBD'
        },
        {
            name: 'Veronica\'s Kitchen',
            url: 'http://www.yelp.com/biz/veronicas-kitchen-new-york',
            keyword: [ 'Stew Chicken', 'Ox Tail', 'Boneless beef rib' ],
            stars: [ 4.0, 5.0, 4.0, 4.0, 4.0, 4.0, 5.0, 4.0, 4.0, 3.0, 4.0, 3.0, 4.0, 4.0, 4.0, 1.0, 4.0, 4.0, 2.0, 5.0, 2.0, 4.0, 4.0, 4.0, 4.0, 3.0, 4.0, 4.0, 4.0, 4.0, 4.0, 1.0, 4.0, 4.0, 4.0, 3.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 5.0, 4.0, 4.0, 3.5],
            result: 'TBD'
        },
        {
            name: 'Open Kitchen',
            url: 'http://www.yelp.com/biz/open-kitchen-new-york',
            keyword: [ 'carving station', 'salad bar', 'stir fry' ],
            stars: [ 3.0, 5.0, 3.0, 3.0, 5.0, 3.0, 5.0, 4.0, 3.0, 3.0, 1.0, 5.0, 4.0, 3.0, 3.0, 4.0, 2.0, 2.0, 4.0, 5.0, 4.0, 3.0, 4.0, 2.0, 4.0, 3.0, 1.0, 4.0, 4.0, 4.0, 5.0, 3.0, 3.0, 3.0, 4.0, 4.0, 3.0, 5.0, 3.0, 3.0, 3.0, 4.0, 3.5, 4.5],
            result: 'TBD'
        },
        {
            name: 'Sophie\'s Cuban Cuisine',
            url: 'http://www.yelp.com/biz/sophies-cuban-cuisine-new-york-8',
            keyword: [ 'green sauce', 'Financial District', 'pernil' ],
            stars: [ 4.0, 5.0, 4.0, 5.0, 4.0, 1.0, 4.0, 4.0, 5.0, 5.0, 3.0, 5.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 3.0, 5.0, 1.0, 5.0, 1.0, 4.0, 2.0, 4.0, 3.0, 4.0, 4.0, 4.0, 1.0, 4.0, 4.0, 4.0, 5.0, 2.0, 2.0, 5.0, 3.5, 4.0, 4.0],
            result: 'TBD'
        },
        {
            name: 'Dig Inn Seasonal Market',
            url: 'http://www.yelp.com/biz/dig-inn-seasonal-market-new-york',
            keyword: [ 'lemon chicken', 'sweet potatoes', 'braised beef' ],
            stars: [ 4.0, 5.0, 4.0, 3.0, 4.0, 4.0, 5.0, 5.0, 4.0, 4.0, 2.0, 3.0, 5.0, 4.0, 5.0, 4.0, 5.0, 5.0, 1.0, 1.0, 4.0, 4.0, 2.0, 5.0, 4.0, 1.0, 4.0, 5.0, 3.0, 4.0, 5.0, 4.0, 4.0, 5.0, 5.0, 5.0, 5.0, 4.0, 3.0, 4.0, 4.0, 3.0, 4.0, 4.0, 4.0, 5.0, 4.0, 2.0, 4.0, 3.0, 4.0],
            result: 'TBD'
        },
        {
            name: 'Nan Xiang Dumpling House',
            url: 'http://www.yelp.com/biz/nan-xiang-dumpling-house-flushing',
            keyword: [ 'scallion pancake', 'xiao long bao', 'Joe' ],
            stars: [ 4.0, 5.0, 4.0, 4.0, 4.0, 4.0, 4.0, 3.0, 5.0, 4.0, 2.0, 4.0, 5.0, 4.0, 4.0, 4.0, 4.0, 3.0, 4.0, 4.0, 4.0, 3.0, 5.0, 4.0, 4.0, 5.0, 4.0, 5.0, 3.0, 4.0, 5.0, 5.0, 4.0, 5.0, 4.0, 4.0, 2.0, 4.0, 5.0, 5.0, 2.0, 5.0, 4.0, 3.5, 4.0],
            result: [ { mixed: '1', score: '0.471858', type: 'positive' }, { mixed: '1', score: '-0.417377', type: 'negative' }, { mixed: '1', score: '0.63999', type: 'positive' }, { mixed: '1', score: '-0.20352', type: 'negative' }, { mixed: '1', score: '-0.140678', type: 'negative' }, { mixed: '1', score: '0.107166', type: 'positive' }, { mixed: '1', score: '-0.181921', type: 'negative' }, { mixed: '1', score: '0.436852', type: 'positive' }, { mixed: '1', score: '0.368385', type: 'positive' }, { mixed: '1', score: '-0.17827', type: 'negative' }, { mixed: '1', score: '0.32037', type: 'positive' }, { score: '0.876799', type: 'positive' }, { mixed: '1', score: '0.0709756', type: 'positive' }, { mixed: '1', score: '0.24764', type: 'positive' }, { mixed: '1', score: '0.451939', type: 'positive' }, { mixed: '1', score: '0.416288', type: 'positive' }, { mixed: '1', score: '0.0171464', type: 'positive' }, { mixed: '1', score: '0.17853', type: 'positive' }, { mixed: '1', score: '0.609906', type: 'positive' }, { mixed: '1', score: '-0.059949', type: 'negative' }, { mixed: '1', score: '-0.173958', type: 'negative' }, { mixed: '1', score: '0.0668999', type: 'positive' }, { mixed: '1', score: '0.31917', type: 'positive' }, { mixed: '1', score: '0.201726', type: 'positive' }, { score: '0.488017', type: 'positive' }, { mixed: '1', score: '0.279042', type: 'positive' }, { mixed: '1', score: '-0.0352682', type: 'negative' }, { mixed: '1', score: '-0.283221', type: 'negative' }, { mixed: '1', score: '0.445347', type: 'positive' }, { mixed: '1', score: '-0.0508703', type: 'negative' }, { mixed: '1', score: '0.29816', type: 'positive' }, { mixed: '1', score: '0.550381', type: 'positive' }, { mixed: '1', score: '-0.301316', type: 'negative' }, { mixed: '1', score: '-0.323244', type: 'negative' }, { mixed: '1', score: '-0.31562', type: 'negative' }, { mixed: '1', score: '-0.393946', type: 'negative' }, { mixed: '1', score: '0.482891', type: 'positive' }, { mixed: '1', score: '0.153394', type: 'positive' }, { mixed: '1', score: '0.181825', type: 'positive' }, { mixed: '1', score: '0.590995', type: 'positive' }]
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