var mongoose = require('mongoose');

var Schema = mongoose.Schema;
 var review = new Schema({
    "user": String, 
    "resname": String,
    "date":String, 
    "rate":String, 
    "review":String,
    "userid":String,
    "userpropic":String,
    "likes":Number,
    "comments":Number
});
module.exports = mongoose.model('reviews', review);