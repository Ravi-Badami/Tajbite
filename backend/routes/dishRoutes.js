const express = require('express');
const router = express.Router();
const Dish = require('../models/Dish');

// @desc    Get all dishes
// @route   GET /api/dishes
router.get('/', async (req, res) => {
    try {
        const dishes = await Dish.find({});
        res.json(dishes);
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