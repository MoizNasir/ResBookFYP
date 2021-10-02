
const express = require('express')
var request =require('request')
const app = express()
require('dotenv').config()


var bodyParser = require('body-parser')
const port = 5000
var cors = require('cors')
app.use(cors())

 const db = require('./config/dbconfig.js')
 exports.db
app.use(bodyParser.urlencoded({ extended: false }))


var ObjectId = require('mongodb').ObjectID;
// parse application/json
app.use(bodyParser.json())
var reviewroutes1 = require('./routes/reviewroutes');
var userroutes1 = require('./routes/userroutes');
var restaurantroutes1 = require('./routes/restaurantroutes');
app.use(reviewroutes1);
app.use(userroutes1);
app.use(restaurantroutes1)

/*
app.post('/restaurantexists', async function (req, res) {
  var countValue = req.body;
  console.log("Restaurant i recieved in nodejs (Backend)", countValue)
  var ifexist =await db.collection('restaurants').find({"placeid": countValue.placeid}).count()
  console.log(ifexist)
  var restaurant ={
    name:countValue.name,
    address:countValue.address,
    placeid:countValue.placeid,
    ratings:[]
  }
  if(ifexist<1){
    console.log("It doesn't exists")
    db.collection('restaurants').insertOne(restaurant,function(err, collection){ 
      if (err) throw err; 
      console.log("Review inserted Successfully"); 
            
  });

  }else{
    console.log("restaurant already exists")
  }
  return res.send({
    success:true
  })

})




app.get('/restaurant/:placeid', function(req,res){
  let placeid = req.params.placeid;
  
  db.collection('restaurants').findOne({"placeid": req.params.placeid}, function(err, resprofile) {
    console.log("restaurant profile Found",resprofile)
    res.json(resprofile)
});

})
app.post('/increasedislikes', async function (req, res) {
  console.log("POstID: ", req.body.postid)
  db.collection('reviews').findOne({'_id': ObjectId(req.body.postid)}, function(err, creden) {
    console.log("updating user total dislikes",creden.dislikes)
    var UD=creden.dislikes
    
    const query = {'_id': ObjectId(req.body.postid)}

    const update = {
      "$set": {
        "dislikes": UD+1,
        
      }
    };
    db.collection('reviews').findOneAndUpdate(query,update)
    return res.send({
      success:true
    })
});

})
app.post('/increaselikes', async function (req, res) {
  console.log("POstID: ", req.body.postid)
  db.collection('reviews').findOne({'_id': ObjectId(req.body.postid)}, function(err, creden) {
    console.log("updating user total likes",creden.likes)
    var UD=creden.likes
    
    const query = {'_id': ObjectId(req.body.postid)}

    const update = {
      "$set": {
        "likes": UD+1,
        
      }
    };
    db.collection('reviews').findOneAndUpdate(query,update)
    return res.send({
      success:true
    })
});

})
app.post('/handlefriendbutton', function(req,res){
  console.log(req.body)
  if(req.body.profilestatus==="Recieved Friend"){
    console.log("hey backend, you have remove "+req.body.Pemail+" id from "+req.body.LUemail2+" recievedRequests List")
    removeRecieveRequest(req.body.LUemail2,req.body.Pemail)
    console.log("hey backend, you have remove "+req.body.LUemail2+" id from "+req.body.Pemail+" sentRequests List")
    removeSentRequest(req.body.Pemail,req.body.LUemail2)
    console.log("hey backend, you have to add both to eachother friends")
    addtofriend(req.body.LUemail2,req.body.Pemail)
    addtofriend(req.body.Pemail,req.body.LUemail2)
  }
  if(req.body.profilestatus==="Sent Friend"){
    console.log("hey backend, you have remove "+req.body.Pemail+" id from "+req.body.LUemail2+" sentRequests List")
    removeSentRequest(req.body.LUemail2,req.body.Pemail)
    console.log("hey backend, you have remove "+req.body.LUemail2+" id from "+req.body.Pemail+" recievedRequests List")
    removeRecieveRequest(req.body.Pemail,req.body.LUemail2)
  }
  if(req.body.profilestatus==="Not Anything"){
    console.log("hey backend, you have add "+req.body.Pemail+" id to "+req.body.LUemail2+" sentRequests List")
    addSentRequest(req.body.LUemail2,req.body.Pemail)
    console.log("hey backend, you have add "+req.body.LUemail2+" id to "+req.body.Pemail+" recievedRequests List")
    addRecieveRequest(req.body.Pemail,req.body.LUemail2)
  }
  if(req.body.profilestatus==="Friend"){
    console.log("hey backend, you have remove "+req.body.Pemail+" id from "+req.body.LUemail2+" friends List vice versa")
    removetofriend(req.body.LUemail2,req.body.Pemail)
    removetofriend(req.body.Pemail,req.body.LUemail2)
  }

})
app.get('/changeaccountsetting/:email', function(req,res){
  console.log(req.params.email)
  db.collection('details').findOne({"email": req.params.email}, function(err, details) {
    console.log("user details Found",details)
    res.json(details)
});

})




app.get('/:id', function(req,res){
  let id = req.params.id;
  db.collection('details').findOne({"_id": ObjectId(req.params.id)}, function(err, profile) {
    console.log("profile Found",profile)
    res.json(profile)
});

})
app.post('/getuserIDName', function(req,res){
  console.log("friend profile email: ", req.body.email)
  db.collection('details').findOne({"email": req.body.email}, function(err, profile) {
    console.log("profile Found",profile)
    res.json(profile)
});

})
app.post('/updatesetting',upload, async function (req, res) {
  var updatedprofile = req.body;
  console.log(req.file.filename)
  console.log("UP for update i recieved in nodejs (Backend)", updatedprofile)
  bcrypt.hash(updatedprofile.password, saltRounds, (err, hash) => {
  var data = {$set:{
    "firstname":updatedprofile.firstname,
    "lastname":updatedprofile.lastname,
    "email":updatedprofile.email,
    "propic":req.file.filename,
    "password":hash
  }}
   db.collection('details').findOneAndUpdate({"email": updatedprofile.oemail},data, function(err, collection){ 
    if (err) throw err; 
    console.log("Profile updated Successfully"); 
    return res.send({
      message: 'Profile updated Successfully'
    });
          
});

});
console.log("ading new propic: ",req.file.filename)
updateALLPropic(updatedprofile.email,req.file.filename)
});
app.post('/sign-up',upload, function (req, res) {
  var countValue = req.body;
  console.log(req.file.filename)
  console.log("CountValue is", countValue.email, countValue.fname, countValue.lname);
  bcrypt.hash(req.body.pass, saltRounds, async (err, hash) => {
  var data = { 
    "firstname": countValue.fname, 
    "lastname": countValue.lname,
    "email":countValue.email, 
    "propic":req.file.filename,
    "password":hash, 
    "DOB": countValue.DOB,
    "tposts": 0,
    "friends":[],
    "sentRequests":[],
    "recievedRequests":[]
    



} 
console.log("HashedPwd: ", hash)
  db.collection('details').insertOne(data,function(err, collection){ 
    if (err) throw err; 
    console.log("Record inserted Successfully"); 
          
}); 
});
});
app.post('/sign-in', function (req, res) {
  var countValue = req.body;
  console.log("U are ", countValue.email);
  var data = { 
    "email":countValue.email 
    
    } 
db.collection('details').findOne({ email: countValue.email }, function(err, collection){
  if(err){
      console.log("Invalid User");
      return res.send({
        success: false,
        message: 'User not exists'
      });
  }else{
    
    if (collection!=null){
      console.log("User found");
      bcrypt.compare(countValue.pass, collection.password, function(err, resi) {
        console.log(resi)
      if (resi === true){
        console.log("Correct details found");
        console.log(collection.firstname)
        

        return res.send({
          success: true,
          message: 'Correct Details',
          fname: collection.firstname,
          lname: collection.lastname,
          email: collection.email,
          id:collection._id,
          propic: collection.propic
        });
      }else{
        return res.send({
          success: false,
          message: 'Error: Email and Pass Dont Match'
        });
       
      }
    });
      
    }else{
      console.log("User not found");
      return res.send({
        success: false,
        message: 'Error: Incorrect User, Recheck Your Email'
      });
    }
  }
   
});
})*/
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})