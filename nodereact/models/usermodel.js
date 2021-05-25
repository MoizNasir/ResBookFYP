var mongoose = require('mongoose');

var Schema = mongoose.Schema;
 var user = new Schema({
    "firstname": String, 
    "lastname": String,
    "email":String, 
    "propic":String, 
    "password":String,
    "DOB":String,
    "tposts":Number,
    "friends":[String],
    "sentRequests":[String],
    "recievedRequests":[String],
    "notifications":[String]
});
module.exports = mongoose.model('details', user);