const express=require('express');
const router=express.Router();
const{
  getAllRestaurants,
  getRestaurantMenu
}=require('../controllers/restaurantController');

router.get('/',getAllRestaurants);
router.get('/:id',getRestaurantMenu);

module.exports=router;