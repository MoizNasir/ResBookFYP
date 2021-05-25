import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const express = require('express')
var request =require('request')
const app = express()

const bcrypt = require("bcrypt")

var bodyParser = require('body-parser')
const saltRounds = 10;
const port = 5000
const vari = "haris"
var cors = require('cors')
var url = "mongodb://localhost:27017/Reacttest";
app.use(cors())
/*const mongoose = require('mongoose'); 
 var hrscema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    
    

});
 mongoose.Promise = global.Promise;
 var mnn= mongoose.model('details', hrscema);
 mongoose.connect('mongodb://localhost:27017/Reacttest', function (err) {
 
    if (err) throw err;
  
    console.log('Successfully connected');
  
 });
 
 var db=mongoose.connection;*/
 // parse application/x-www-form-urlencoded?
 import db from './config/dbconfig.js'
app.use(bodyParser.urlencoded({ extended: false }))
const multer = require('multer')
 const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../myfrontend/public/content')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' +file.originalname)
  }
})

const upload = multer({ storage: storage }).single('file');
var ObjectId = require('mongodb').ObjectID;
// parse application/json
app.use(bodyParser.json())


app.get('/getreviews', function(req,res){
  db.collection('reviews').find({}).toArray(function(err, reviews) {
    if (err) {
        console.log("Error mongo main hai")
        console.log(err);
    } else {
        res.json(reviews.reverse());
        console.log("Sent items to frontend", reviews)
    }
});

})
app.post('/deletereview', function(req,res){
  console.log("we deleting")
  console.log(req.body.id)
  db.collection('reviews').findOneAndDelete({'_id': ObjectId(req.body.id)}, function(err, obj) {
    if (err) throw err;
    console.log("1 Review deleted");
  });
})
function removeSentRequest(Demail,Recieptemail) {
  db.collection('details').findOne({"email": Demail}, function(err, creden) {
    console.log("creden Found",creden.sentRequests)
    var UD=creden.sentRequests
    const index = UD.indexOf(Recieptemail);
    if (index > -1) {
      UD.splice(index, 1);
    }
    console.log("updated favs of "+UD)
    const query = {"email": Demail}

    const update = {
      "$set": {
        "sentRequests": UD,
        
      }
    };
    db.collection('details').findOneAndUpdate(query,update)
});
  
}
function removetofriend(Demail,Recieptemail) {
  db.collection('details').findOne({"email": Demail}, function(err, creden) {
    console.log("creden Found",creden.friends)
    var UD=creden.friends
    const index = UD.indexOf(Recieptemail);
    if (index > -1) {
      UD.splice(index, 1);
    }
    console.log("updated Friends of "+Demail+" to "+UD)
    const query = {"email": Demail}

    const update = {
      "$set": {
        "friends": UD,
        
      }
    };
    db.collection('details').findOneAndUpdate(query,update)
});
  
}
function addtofriend(Demail,Recieptemail) {
  db.collection('details').findOne({"email": Demail}, function(err, creden) {
    console.log("creden Found",creden.friends)
    var UD=creden.friends
    UD.push(Recieptemail)
    console.log("updated Friends of "+Demail+" to "+UD)
    const query = {"email": Demail}

    const update = {
      "$set": {
        "friends": UD,
        
      }
    };
    db.collection('details').findOneAndUpdate(query,update)
});
  
}
function addSentRequest(Demail,Recieptemail) {
  db.collection('details').findOne({"email": Demail}, function(err, creden) {
    console.log("creden Found",creden.sentRequests)
    var UD=creden.sentRequests
    UD.push(Recieptemail)
    console.log("updated favs of "+UD)
    const query = {"email": Demail}

    const update = {
      "$set": {
        "sentRequests": UD,
        
      }
    };
    db.collection('details').findOneAndUpdate(query,update)
});
  
}
function addRecieveRequest(Demail,Recieptemail) {
  db.collection('details').findOne({"email": Demail}, function(err, creden) {
    console.log("creden Found",creden.recievedRequests)
    var UD=creden.recievedRequests
    UD.push(Recieptemail)
    console.log("updated favs of "+UD)
    const query = {"email": Demail}

    const update = {
      "$set": {
        "recievedRequests": UD,
        
      }
    };
    db.collection('details').findOneAndUpdate(query,update)
});
  
}
function removeRecieveRequest(Demail,Recieptemail) {
  db.collection('details').findOne({"email": Demail}, function(err, creden) {
    console.log("creden Found",creden.recievedRequests)
    var UD=creden.recievedRequests
    const index = UD.indexOf(Recieptemail);
    if (index > -1) {
      UD.splice(index, 1);
    }
    console.log("updated favs of "+UD)
    const query = {"email": Demail}

    const update = {
      "$set": {
        "recievedRequests": UD,
        
      }
    };
    db.collection('details').findOneAndUpdate(query,update)
});
  
}
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
function updatetotalposts(uemail){
  db.collection('details').findOne({"email": uemail}, function(err, creden) {
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
app.post('/additem', async function (req, res) {
  var countValue = req.body;
  console.log("Review i recieved in nodejs (Backend)", countValue)
  

  db.collection('details').findOne({"email": countValue.user}, function(err, creden) {
    var propic=creden.propic
    console.log("Propic of review user:, ",propic)
    var data = { 
      "user": countValue.user,
      "resname": countValue.resname.name, 
      "placeid": countValue.resname.placeid, 
      "date": countValue.date,
      "rate": countValue.rate,
      "tag": countValue.tag,
      "review":countValue.review,
      "userid":creden._id,
      "userpropic":creden.propic,
      "likes":0,
      "dislikes":0,
      "comments":0
      
    } 
    db.collection('reviews').insertOne(data,function(err, collection){ 
      if (err) throw err; 
      console.log("Review inserted Successfully"); 
            
  });
  updatetotalposts(countValue.user)
  return res.send({
    success: true,
    message: 'Review Posted Successfully'
  });
    
});
  
  
});
app.get('/changeaccountsetting/:email', function(req,res){
  console.log(req.params.email)
  db.collection('details').findOne({"email": req.params.email}, function(err, details) {
    console.log("user details Found",details)
    res.json(details)
});

})

async function updateALLPropic(email,propic){
  const query = {"user": email}
  console.log("Updating profile pic", email, propic)

    const update = {
      "$set": {
        "userpropic": propic,
        }
    };
    const result = await db.collection('reviews').updateMany(query,update)
    console.log(result);

}
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
    "password":hash,
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
app.get('/:id', function(req,res){
  let id = req.params.id;
  db.collection('details').findOne({"_id": ObjectId(req.params.id)}, function(err, profile) {
    console.log("profile Found",profile)
    res.json(profile)
});

})


app.get('/restaurant/:placeid', function(req,res){
  let placeid = req.params.placeid;
  
  db.collection('restaurants').findOne({"placeid": req.params.placeid}, function(err, resprofile) {
    console.log("restaurant profile Found",resprofile)
    res.json(resprofile)
});

})
app.post('/getuserIDName', function(req,res){
  console.log("friend profile email: ", req.body.email)
  db.collection('details').findOne({"email": req.body.email}, function(err, profile) {
    console.log("profile Found",profile)
    res.json(profile)
});

})

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
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})