var ObjectId = require('mongodb').ObjectID;

var userModel = require('../models/usermodel')
var reviewModel = require('../models/reviewsmodel')
var restaurantModel = require('../models/restaurantmodel')
var _ = require('lodash');
exports.restaurantexists =async function(req,res){ 
    var countValue = req.body;
  console.log("Restaurant i recieved in nodejs (Backend)", countValue)
  var ifexist =await restaurantModel.find({"placeid": countValue.placeid}).count()
  console.log(ifexist)
  var restaurant ={
    name:countValue.name,
    address:countValue.address,
    placeid:countValue.placeid,
    ratings:[]
  }
  if(ifexist<1){
    console.log("It doesn't exists")
    restaurantModel.create(restaurant,function(err, collection){ 
      if (err) throw err; 
      console.log("Review inserted Successfully"); 
            
  });

  }else{
    console.log("restaurant already exists")
  }
  return res.send({
    success:true
  })
      
}
exports.getRestaurant = function(req,res){ 
    let placeid = req.params.placeid;
  
    restaurantModel.findOne({"placeid": req.params.placeid}, function(err, resprofile) {
      console.log("restaurant profile Found",resprofile)
      res.json(resprofile)
  });

      
}
exports.getSumRatings = async function(req,res){ 
  let placeid = req.params.placeid;
  let useremail = req.params.usermail;
  console.log(placeid,useremail)
  var user=await userModel.findOne({email: useremail})
  const allresreviews=await reviewModel.find({"placeid": req.params.placeid}).populate('userid')
  console.log("All restaurant reviews",allresreviews)
    const average = _.meanBy(allresreviews, (p) => parseFloat(p.rate));
    console.log("Gen",average)
    if(user){
      console.log("Friends: ",user.friends)
      const friendsratings=allresreviews.filter(review=>user.friends.includes(review.userid.email))
      const average2 = _.meanBy(friendsratings, (p) => parseFloat(p.rate));
      console.log("Per",average2)
      var obj={
        generalizedrating:average,
        personalizedrating:average2
      }
    return res.send(obj)
  }else{

    var obj={
      generalizedrating:average
    }
    return res.send(obj)

  }

    
}