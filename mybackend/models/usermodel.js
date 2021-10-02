
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
 var user = new Schema({
    "firstname": String, 
    "lastname": String,
    "email":String, 
    "propic": String,
    "password":String,
    "DOB": String,
    "resetToken": String,
    "resetTokenExpiration": Date,
    "friends":[String],
    "sentRequests":[String],
    "recievedRequests":[String]
});
module.exports = mongoose.model('details', user);