const Dish = require("../models/Dish");

// GET /api/dishes?sort=rating&ratingMin=4.0&cuisine=Chinese,Italian&cursor=abc123&limit=20
exports.getAllDishes = async (req, res) => {
  try {
    const { sort, ratingMin, cuisine } = req.query;
    
    // Build filter object
    let filter = {};
    
    // Rating filter
    if (ratingMin) {
      filter['restaurant.info.avgRating'] = { $gte: parseFloat(ratingMin) };
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
              avgRating: d.restaurant?.info?.avgRating || 0
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
    const dish = await Dish.findById(req.params.id);
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
