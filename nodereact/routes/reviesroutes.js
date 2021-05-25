var express = require('express');
var router = express.Router();
var db = require('../test.js');
router.get('/getreviews', function(req,res){
    db.db.collection('reviews').find({}).toArray(function(err, reviews) {
      if (err) {
          console.log("Error mongo main hai")
          console.log(err);
      } else {
          res.json(reviews);
          console.log("Sent items to frontend", reviews)
      }
  });
  
  })
  function updatetotalposts(uemail){
    db.db.collection('details').findOne({"email": uemail}, function(err, creden) {
      console.log("updating user total posts",creden.tposts)
      var UD=creden.tposts
      
      const query = {"email": uemail}
  
      const update = {
        "$set": {
          "tposts": UD+1,
          
        }
      };
      db.collection('details').findOneAndUpdate(query,update)
  });
  
  }
  router.post('/additem', function (req, res) {
    var countValue = req.body;
    console.log("Review i recieved in nodejs (Backend)", countValue)
    db.db.collection('details').findOne({"email": countValue.user}, function(err, creden) {
      var userpropic=creden.userpropic
      var data = { 
        "user": countValue.user,
        "resname": countValue.resname, 
        "date": countValue.date,
        "rate": countValue.rate,
        "review":countValue.review,
        "userid":countValue.userid,
        "userpropic":userpropic
        
      } 
      db.collection('reviews').insertOne(data,function(err, collection){ 
        if (err) throw err; 
        console.log("Review inserted Successfully"); 
              
    });
    updatetotalposts(countValue.user)
      
  });
    
    
  });
  module.exports = router;