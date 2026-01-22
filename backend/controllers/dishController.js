const Dish = require("../models/Dish");
const Restaurant = require("../models/Restaurant");

// GET /api/dishes
exports.getDishes = async (req, res) => {
  try {
    const { category, isVeg, search, sort, cuisine, page = 1 } = req.query;
    
    // Build filter object
    let filter = {};
    
    // Basic filters
    if (category) filter.category = category;
    if (isVeg !== undefined) filter.isVeg = isVeg === 'true';

    // Search filter (Dish Name OR Restaurant Name OR Restaurant Cuisines)
    if (search) {
      const regex = new RegExp(search, 'i');
      filter.$or = [
        { name: regex },
        { 'restaurant.info.name': regex },
        { 'restaurant.info.cuisines': { $in: [regex] } }
      ];
    }

    // Cuisine filter
    if (cuisine) {
      const cuisines = cuisine.split(',');
      filter['restaurant.info.cuisines'] = { $in: cuisines };
    }
    
    // Build sort object
    let sortObj = {};
    switch(sort) {
      case 'rating':
        sortObj = { 'restaurant.info.avgRating': -1 };
        break;
      case 'cost_low':
        sortObj = { 'price': 1 };
        break;
      case 'cost_high':
        sortObj = { 'price': -1 };
        break;
      default:
        sortObj = {};  // Relevance = natural order
    }
    
    const dishes = await Dish.find(filter)
      .sort(sortObj)
      .lean();
    
    // Transform to EXACT frontend format
    const formatted = dishes.map(d => ({
      card: {
        card: {
          info: {
            name: d.name,
            price: d.price,
            isVeg: d.isVeg,
            imageId: d.imageId,
            description: d.description,
            avgRating: d.restaurant?.info?.avgRating || 0,
            avgRatingString: (d.restaurant?.info?.avgRating || 0).toString(),
            costForTwo: `₹${d.price} for two`,
            cuisines: d.restaurant?.info?.cuisines || [],
            cloudinaryImageId: d.imageId,  // Frontend uses this for images
            areaName: d.restaurant?.info?.areaName || "",
            id: d._id.toString()
          },
          restaurant: {
            info: {
              id: d.restaurant?.info?.id || "",
              name: d.restaurant?.info?.name || "",
              areaName: d.restaurant?.info?.areaName || "",
              avgRating: d.restaurant?.info?.avgRating || 0,
              cloudinaryImageId: d.restaurant?.info?.cloudinaryImageId || "",
              cuisines: d.restaurant?.info?.cuisines || []
            }
          }
        }
      },
      ribbon: d.ribbon || {}
    }));
    
    res.json(formatted);  // ✅ Return ARRAY directly (not wrapped in object)
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Other methods remain the same
exports.getDishById = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id).lean();
    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }
    res.json(dish);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createDish = async (req, res) => {
  try {
    const dish = await Dish.create(req.body);
    res.status(201).json(dish);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateDish = async (req, res) => {
  try {
    const dish = await Dish.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }
    res.json(dish);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteDish = async (req, res) => {
  try {
    const dish = await Dish.findByIdAndDelete(req.params.id);
    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }
    res.json({ message: "Dish deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//GET /api/dishes/autocomplete?q=bir
exports.autocompleteDishes=async(req,res)=>{
  try{
    const{q}=req.query;
    if(!q||q.trim()==''){
      return res.json({search:{statusCode:0,data:{suggestions:[]}}});
    }

    // Parallel search in Dishes and Restaurants
    const [dishes, restaurants] = await Promise.all([
      Dish.find({name:{$regex:q,$options:'i'}}).limit(5).select('name imageId').lean(),
      Restaurant.find({name:{$regex:q,$options:'i'}}).limit(5).select('name cloudinaryImageId').lean()
    ]);

    const dishSuggestions = dishes.map(d=>({
      text:d.name,
      type:'DISH',
      cloudinaryId: d.imageId
    }));

    const restaurantSuggestions = restaurants.map(r=>({
      text:r.name,
      type:'RESTAURANT',
      cloudinaryId: r.cloudinaryImageId
    }));

    const suggestions = [...restaurantSuggestions, ...dishSuggestions];

    res.json({
      search:{
        statusCode:0,
        data:{suggestions}
      }
    });
  }catch(error){
    res.status(500).json({message:error.message});
  }
};

//GET /api/dishes/search?q=biryani
exports.searchDishes=async(req,res)=>{
  try{
const {q}=req.query;
if(!q||q.trim()===''){
  return res.json([]);  // return the array for empty search
}

//case-insensitive search on dish name
const dishes=await Dish.find({
  name:{$regex:q,$options:'i'}
})
.limit(10).lean(); 

    const formattedCards = dishes.map(d => ({
      card: {
        card: {
          info: {
            name: d.name,
            price: d.price,
            isVeg: d.isVeg,
            imageId: d.imageId,
            description: d.description,
            id: d._id.toString()
          },
          restaurant: {
            info: {
              id: d.restaurant?.info?.id || "",
              name: d.restaurant?.info?.name || "",
              areaName: d.restaurant?.info?.areaName || "",
              avgRating: d.restaurant?.info?.avgRating || 0
            }
          }
        }
      },
      ribbon: d.ribbon || {}
    }));

   res.json({
      data: {
        cards: [
          {},
          {
            groupedCard: {
              cardGroupMap: {
                DISH: {
                  cards: formattedCards
                }
              }
            }
          }
        ]
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
