'use strict';
// var crypto = require('crypto');
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
    reviews: {
        type: String
    },
    stars: {
        type: Number
    },
    result: {
        type: String
    }
});

mongoose.model('Restaurant', schema);