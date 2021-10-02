var express = require('express');
var router = express.Router();
var restaurant_controller = require('../controllers/restaurantcontroller');

 
    
    router.post('/restaurantexists',restaurant_controller.restaurantexists)
    router.get('/restaurant/:placeid',restaurant_controller.getRestaurant)
    router.get('/getSumRatings/:placeid/:usermail',restaurant_controller.getSumRatings)    
           module.exports = router;
