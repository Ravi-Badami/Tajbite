const Dish = require('../models/Dish');

// GET /api/carousel - Get popular dish categories for homepage carousel
exports.getCarouselItems = async (req, res) => {
  try {
    // Get unique categories with sample images
    const categories = await Dish.aggregate([
      {
        $group: {
          _id: "$category",
          imageId: { $first: "$imageId" },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          id: "$_id",
          imageId: 1,
          _id: 0
        }
      },
      { $limit: 10 }
    ]);

    // Format for frontend carousel
    const formatted = {
      name: "What's on your mind?",
      foodItems: categories
    };

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
