require('dotenv').config();
const connectDB = require('./config/db');
const Restaurant = require('./models/Restaurant');
const Category = require('./models/Category');
const Dish = require('./models/Dish');

// Restaurants matching the ones in your dishes
const restaurants = [
  {

    name: "Paradise Hotel",
    cuisines: ["Biryani", "North Indian", "Mughlai"],
    areaName: "Secunderabad",
    avgRating: 4.2,
    costForTwo: 600,
    costForTwoMessage: "₹600 for two",
    cloudinaryImageId: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
    promoted: true
  },
  {
 
    name: "Mehfil",
    cuisines: ["North Indian", "Punjabi"],
    areaName: "Hitech City",
    avgRating: 4.0,
    costForTwo: 500,
    costForTwoMessage: "₹500 for two",
    cloudinaryImageId: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400"
  },
  {
  
    name: "Punjabi Affair",
    cuisines: ["North Indian", "Punjabi"],
    areaName: "Gachibowli",
    avgRating: 4.5,
    costForTwo: 550,
    costForTwoMessage: "₹550 for two",
    cloudinaryImageId: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400",
    promoted: true
  },
  {

    name: "Barbeque Nation",
    cuisines: ["North Indian", "BBQ"],
    areaName: "Madhapur",
    avgRating: 4.4,
    costForTwo: 700,
    costForTwoMessage: "₹700 for two",
    cloudinaryImageId: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400"
  },
  {
  
    name: "Chutneys",
    cuisines: ["South Indian"],
    areaName: "Kukatpally",
    avgRating: 4.3,
    costForTwo: 350,
    costForTwoMessage: "₹350 for two",
    cloudinaryImageId: "https://images.unsplash.com/photo-1592861956120-e524fc739696?w=400"
  },
  {
 
    name: "Pizza Factory",
    cuisines: ["Italian"],
    areaName: "Jubilee Hills",
    avgRating: 4.1,
    costForTwo: 400,
    costForTwoMessage: "₹400 for two",
    cloudinaryImageId: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400"
  },
  {
   
    name: "Little Italy",
    cuisines: ["Italian"],
    areaName: "Banjara Hills",
    avgRating: 4.6,
    costForTwo: 650,
    costForTwoMessage: "₹650 for two",
    cloudinaryImageId: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400",
    promoted: true
  },
  {
  
    name: "Mainland China",
    cuisines: ["Chinese", "Asian"],
    areaName: "Ameerpet",
    avgRating: 3.9,
    costForTwo: 450,
    costForTwoMessage: "₹450 for two",
    cloudinaryImageId: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=400"
  },
  {
   
    name: "Delhi Zaika",
    cuisines: ["North Indian"],
    areaName: "LB Nagar",
    avgRating: 4.2,
    costForTwo: 500,
    costForTwoMessage: "₹500 for two",
    cloudinaryImageId: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400"
  },
  {
  
    name: "Wok Republic",
    cuisines: ["Chinese"],
    areaName: "Hitech City",
    avgRating: 3.8,
    costForTwo: 380,
    costForTwoMessage: "₹380 for two",
    cloudinaryImageId: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400"
  },
  {
   
    name: "Al Arabian",
    cuisines: ["Middle Eastern", "Arabian"],
    areaName: "Tolichowki",
    avgRating: 4.7,
    costForTwo: 450,
    costForTwoMessage: "₹450 for two",
    cloudinaryImageId: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400"
  }
];

const seedRestaurants = async () => {
  try {
    await connectDB();
    
    console.log('Clearing old data...');
    await Category.deleteMany();
    await Restaurant.deleteMany();
    
    console.log('Seeding restaurants...');
    const createdRestaurants = await Restaurant.insertMany(restaurants);
    console.log(`✅ ${createdRestaurants.length} Restaurants seeded!`);
    
    console.log('Creating categories...');
    
    // Get all dishes from database
    const allDishes = await Dish.find({}).lean();

    // Create mapping: old ID ("r1") -> new MongoDB ObjectId
const oldIdToNewId = {};
createdRestaurants.forEach((restaurant, index) => {
  const oldId = `r${index + 1}`;  // "r1", "r2", etc.
  oldIdToNewId[oldId] = restaurant._id;
});
    
    // Group dishes by restaurant ID
    const dishesGroupedByRestaurant = {};
    allDishes.forEach(dish => {
       const oldResId = dish.restaurant?.info?.id;  // "r1", "r2", etc
  const newResId = oldIdToNewId[oldResId];  
       if (newResId) {
    if (!dishesGroupedByRestaurant[newResId]) {
      dishesGroupedByRestaurant[newResId] = [];
    }
    dishesGroupedByRestaurant[newResId].push(dish._id);
  }
    });
    
    // Create categories for each restaurant
    const categories = [];
    
    for (const [resId, dishIds] of Object.entries(dishesGroupedByRestaurant)) {
      if (dishIds.length > 0) {
        // Main category - all dishes
        categories.push({
          restaurantId: resId,
          title: "Recommended",
          items: dishIds
        });
        
        // If restaurant has multiple dishes, create a "Specials" category
        if (dishIds.length > 1) {
          categories.push({
            restaurantId: resId,
            title: "Chef's Special",
            items: [dishIds[0]] // First dish as special
          });
        }
      }
    }
    
    await Category.insertMany(categories);
    console.log(`✅ ${categories.length} Categories created!`);
    
    // Update dishes with restaurant cloudinaryImageId
    console.log('Updating dishes with restaurant images...');
    const restaurantsMap = new Map(createdRestaurants.map(r => [r.name, r]));
    let dishesUpdated = 0;
    
    for (const dish of allDishes) {
      const restaurantName = dish.restaurant?.info?.name;
      if (restaurantName) {
        const restaurant = restaurantsMap.get(restaurantName);
        if (restaurant) {
          await Dish.updateOne(
            { _id: dish._id },
            { 
              $set: { 
                'restaurant.info.cloudinaryImageId': restaurant.cloudinaryImageId
              } 
            }
          );
          dishesUpdated++;
        }
      }
    }
    console.log(`✅ ${dishesUpdated} Dishes updated with restaurant images!`);
    
    console.log('\n📊 Summary:');
    console.log(`   Restaurants: ${createdRestaurants.length}`);
    console.log(`   Categories: ${categories.length}`);
    console.log(`   Dishes linked: ${allDishes.length}`);
    
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

seedRestaurants();