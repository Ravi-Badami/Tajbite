const express = require('express');
const router = express.Router();
const Dish = require('../models/Dish');
const {body,validationResult}=require("express-validator");
const {
getDishes,
getDishById,
createDish,
updateDish,
deleteDish,
autocompleteDishes,

}=require('../controllers/dishController');


router.get('/autocomplete',autocompleteDishes);

router.get('/',getDishes);
router.get('/:id',getDishById);
router.post('/',[
  body('name').notEmpty().withMessage('Name is required'),
  body('price').notEmpty().withMessage('Price must be a number'),
  body('category').notEmpty().withMessage("category is needed")
],(req,res,next)=>{
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  }
  next();
},createDish);
router.put('/:id',updateDish);
router.delete('/:id',deleteDish);



module.exports = router;