var mongoose = require('mongoose');

var Schema = mongoose.Schema;
 var notification = new Schema({
    "sentTo": {type: mongoose.Schema.Types.ObjectId,
        ref: 'details'}, 
    "id": String,
    "userid": {type: mongoose.Schema.Types.ObjectId,
        ref: 'details'},
    "type":String
});
module.exports = mongoose.model('notifications', notification);