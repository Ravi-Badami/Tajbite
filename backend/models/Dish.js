const mongoose = require('mongoose');

const dishSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  category:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  isVeg:{
    type:Boolean,
    default:true
  },
  imageId:{
    type:String,
    required:true
  },
  description:{
    type:String
  },
  restaurant:{
    info:{
      id:{type:String},
      name:{type:String},
      areaName:{type:String},
        avgRating: { type: Number },  // ✅ Number for sorting
      cuisines: [String]  // ✅ Add this
    },
  },
    ribbon:{text:{type:String}}
}
,{
  timestamps:true
}
);

const Dish=mongoose.model('Dish',dishSchema);
module.exports=Dish;