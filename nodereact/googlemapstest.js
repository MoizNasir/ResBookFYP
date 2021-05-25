import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const axios = require('axios')

const express = require('express')
const app = express()
const port = 5000
const key = process.env.GOOGLE_API_KEY
process.env.GOOGLE_API_KEY='AIzaSyD2XSZc3WH7MdfoOz5JdBcyIjRRl4cjd_c'
import db from './config/dbconfig.js'

/*app.get('/checkduplicates', async (req, res, next) => {
  db.collection('restaurants').aggregate([
    {
      $group:
       {
         _id: { placeid: "$placeid" },
         count: { $sum:1 }
      }
    },
    {
      $match:
        {
          count: {"$gt": 1}
        }
    }
   ], function (err, results) {
    console.log(results)
     
  })
  

})*/
app.get('/restaurants', async (req, res, next) => {
  var token2;
 try {
  
   const neighborhood = 'chelsea'
   const borough = 'manhattan'
   const address = 'English+Tea+House+F-7/2+F+7/2+F-7,+Islamabad,+Islamabad+Capital+Territory,+Pakistan'
   const {data} = await axios.get(
   //https://maps.googleapis.com/maps/api/place/textsearch/json?query=${address}&type=restaurant&key=${'AIzaSyAyJqPTlSCuiGX5H10JVxrYEF5rVPRgzE4'}
   //https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=33.7195361,73.0529528&radius=200&type=restaurant&key=AIzaSyAyJqPTlSCuiGX5H10JVxrYEF5rVPRgzE4
`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=33.6973781,73.0103748&radius=400&type=restaurant&key=AIzaSyAyJqPTlSCuiGX5H10JVxrYEF5rVPRgzE4`
   )
   console.log(data.results.length)
   console.log(data.next_page_token)
   token2=data.next_page_token
   var i=1;
   data.results.forEach(element => {
    
    db.collection('restaurants').findOne({"placeid": element.place_id}, function(err, creden) {
      
      if(creden==null){
        console.log("No Restaurant by that id")
        console.log(element.name+' '+i)
        var data = { 
          "name": element.name,
          "address": element.vicinity,
          "placeid": element.place_id,
          "ratings":[]
          
          
        } 
        db.collection('restaurants').insertOne(data)
        console.log("Record Inserted")
      }else{
        console.log("Restaurant already exists"+i)
      }
      if(i==20){
        excutenextquery(token2)
      }
      i++

  
    })
    
   });
   console.log("Done With commands")
   console.log(token2)
   

   } 
 catch (err) {
  next(err)
}

})
async function  excutenextquery(token) {
  try {
    console.log("got token",token)
    const {data2} = await axios.get(
      
   `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=33.6973781,73.0103748&radius=400&type=restaurant&key=AIzaSyAyJqPTlSCuiGX5H10JVxrYEF5rVPRgzE4&pagetoken=${token}`
      )
      if(data2){
        console.log(data2.results.length)
      }else{
        console.log("Got no result")
      }
  
  }
  catch (err){
    next(err)
  }

}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })