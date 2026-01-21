/* backend/seed.js */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Dish = require('./models/Dish');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const sampleDishes = [
  {
    name: "Hyderabadi Biryani",
    category: "Main Course",
    price: 350,
    isVeg: false,
    imageId: "biryani_01",
    description: "Authentic spicy biryani with tender chicken.",
    restaurant: {
      info: {
        id: "r1",
        name: "Paradise Hotel",
        areaName: "Secunderabad",
        avgRating: 4.2,  // ✅ Number
        cuisines: ["Biryani", "North Indian", "Mughlai"]  // ✅ Add this
      }
    },
    ribbon: { text: "Bestseller" }
  },
  {
    name: "Paneer Butter Masala",
    category: "Curry",
    price: 280,
    isVeg: true,
    imageId: "paneer_01",
    description: "Soft paneer cubes in rich tomato gravy.",
    restaurant: {
      info: {
        id: "r2",
        name: "Mehfil",
        areaName: "Hitech City",
        avgRating: 4.0,  // ✅ Number
        cuisines: ["North Indian", "Punjabi"]  // ✅ Add this
      }
    }
  }
];

const importData = async () => {
  try {
    await connectDB();
    await Dish.deleteMany(); // Clear existing data
    await Dish.insertMany(sampleDishes);
    console.log('✅ Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

importData();