var mongoose = require('mongoose');

var Schema = mongoose.Schema;
 var restaurant = new Schema({
    "user": {type: mongoose.Schema.Types.ObjectId,
        ref: 'details'}, 
    "review": {type: mongoose.Schema.Types.ObjectId,
        ref: 'reviews'},
    "text":String
});
module.exports = mongoose.model('comments', restaurant);