const Dish=require("../models/Dish");

//Get all dishes(with formatting)
exports.getAllDishes=async(req,res)=>{
  try{
    const dishes=await Dish.find({}).lean();
    const formatted=dishes.map(d=>({
      card:{
        card:{
          info:{
               name: d.name,
            price: d.price,
            isVeg: d.isVeg,
            imageId: d.imageId,
            description: d.description

          },
           restaurant: { info: d.restaurant?.info || {} }
        }
      },
       ribbon: d.ribbon
    }));
       res.json(formatted);
  }catch (error) {
    res.status(500).json({ message: error.message });
}};

//Get single dish by ID 
exports.getDishById=async(req,res)=>{
  try{
    const dish=await Dish.findById(req.params.id);
    if(!dish){
      return res.status(404).json({message:"Dish not found"});
    }
    res.json(dish);
  }catch(error){
    res.status(500).json({message:error.message});
  }
};

//Create Dish
exports.createDish=async(req,res)=>{
  try{
    const dish=await Dish.create(req.body);
    res.status(201).json(dish);
  }catch(error){
    res.status(400).json({message:error.message});
  }
};


//update dish
exports.updateDish=async(req,res)=>{
  try{
    const dish=await Dish.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true,runValidators:true}
    );
    if(!dish){
      return res.status(404).json({message:"Dish not found"});
    }
    res.json(dish);
  }catch(error){
    res.status(400).json({message:error.message});
  }
};

//delete dish
exports.deleteDish=async(req,res)=>{
  try{
    const dish=await Dish.findByIdAndDelete(req.params.id);
    if(!dish){
      return res.status(404).json({message:"Dish not found"});
    }
    res.json({message:"Dish deleted"});
  }catch(error){
    res.status(500).json({message:error.message});
  }
};