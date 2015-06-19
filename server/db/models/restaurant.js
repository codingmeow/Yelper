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

// schema.virtual('part_url').get(function(){
//     var stop=this.url.length
//     for(var i=24; i<this.url.length; i++){
//         if(this.url[i] === '?' || this.url[i] ==='/'){
//             return stop = i;
//         }    
//     }
//     return this.url.slice(24,stop);
// })

mongoose.model('Restaurant', schema);