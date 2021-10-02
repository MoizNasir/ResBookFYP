var mongoose = require('mongoose');

var Schema = mongoose.Schema;
 var restaurant = new Schema({
    "name": String, 
    "address": String,
    "placeid":String, 
    "ratings":[String]
});
module.exports = mongoose.model('restaurants', restaurant);