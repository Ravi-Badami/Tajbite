const express = require('express');
const router = express.Router();
const Dish = require('../models/Dish');

// @desc    Get all dishes
// @route   GET /api/dishes
router.get('/api/dishes', async (req, res) => {
    try {
        const dishes = await Dish.find({});
         // Transform each dish to match frontend structure
        const formattedDishes = dishes.map(dish => ({
            card: {
                card: {
                    info: {
                        name: dish.name,
                        price: dish.price,
                        isVeg: dish.isVeg,
                        imageId: dish.imageId,
                        description: dish.description
                    },
                    restaurant: {
                        info: dish.restaurant?.info || {}
                    }
                }
            },
            ribbon: dish.ribbon
        }));
        res.json(formattedDishes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Create a dish
// @route   POST /api/dishes
router.post('/', async (req, res) => {
    try {
        const dish = new Dish(req.body);
        const savedDish = await dish.save(); // Saves to MongoDB
        res.status(201).json(savedDish);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;