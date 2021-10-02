var express = require('express');
var router = express.Router();
var review_controller = require('../controllers/reviewcontroller');

 
    
    router.get('/getreviews',review_controller.getreviews)
    router.get('/getpreviews/:id',review_controller.getpreviews)
    router.get('/review/:id',review_controller.review)
    router.get('/getrreviews/:placeid',review_controller.getrreviews)
    router.post('/deletereview',review_controller.deletereview)
    router.post('/additem',review_controller.addreview)
    router.post('/increaselikes',review_controller.increaselikes)
    router.post('/increasedislikes',review_controller.increasedislikes)
    router.post('/addcomment',review_controller.addcomment)    
           module.exports = router;
