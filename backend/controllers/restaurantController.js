// backend/controllers/restaurantController.js
const Restaurant = require('../models/Restaurant');
const Category = require('../models/Category');
const Dish = require('../models/Dish');

// GET /api/restaurants - Get all restaurants
exports.getAllRestaurants = async (req, res) => {
  try {
    const { search } = req.query;
    let filter = {};

    if (search) {
      const regex = new RegExp(search, 'i');
      filter.$or = [
        { name: regex },
        { cuisines: { $in: [regex] } },
        { areaName: regex }
      ];
    }

    const restaurants = await Restaurant.find(filter).lean();
    
    // Format to match frontend expectations: { card: { card: { info: ... } } }
    const formatted = restaurants.map(r => ({
      card: {
        card: {
          info: {
            id: r._id.toString(),
            name: r.name,
            cloudinaryImageId: r.cloudinaryImageId,
            areaName: r.areaName,
            avgRating: r.avgRating,
            cuisines: r.cuisines,
            costForTwo: `₹${r.costForTwo} for two`
          }
        }
      }
    }));
    
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/restaurants/:id - Get restaurant menu
exports.getRestaurantMenu = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).lean();
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    
    // Get categories for this restaurant
    const categories = await Category.find({ restaurantId: req.params.id })
      .populate('items')
      .lean();
    
    // Format to match frontend expectations
    const formattedCategories = categories.map(cat => ({
      card: {
        card: {
          "@type": "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
          title: cat.title,
          itemCards: cat.items.map(item => ({
            card: {
              info: {
                id: item._id.toString(),
                name: item.name,
                price: item.price * 100, // Frontend expects paise
                description: item.description,
                imageId: item.imageId,
                isVeg: item.isVeg ? 1 : 0
              }
            }
          }))
        }
      }
    }));
    
    res.json({
      cards: [
        {
          card: {
            card: {
              "@type": "type.googleapis.com/swiggy.presentation.food.v2.Restaurant",
              info: {
                name: restaurant.name,
                cuisines: restaurant.cuisines,
                costForTwoMessage: restaurant.costForTwoMessage || `₹${restaurant.costForTwo} for two`,
                avgRating: restaurant.avgRating
              }
            }
          }
        },
        {
          groupedCard: {
            cardGroupMap: {
              REGULAR: {
                cards: formattedCategories
              }
            }
          }
        }
      ]
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};