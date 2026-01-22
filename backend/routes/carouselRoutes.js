const express = require('express');
const router = express.Router();
const carouselController = require('../controllers/carouselController');

// GET /api/carousel
router.get('/', carouselController.getCarouselItems);

module.exports = router;
