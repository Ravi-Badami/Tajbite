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
    imageId: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400",
    description: "Authentic spicy biryani with tender chicken.",
    restaurant: {
      info: {
        id: "r1",
        name: "Paradise Hotel",
        areaName: "Secunderabad",
        avgRating: 4.2,
        cuisines: ["Biryani", "North Indian", "Mughlai"]
      }
    },
    ribbon: { text: "Bestseller" }
  },
  {
    name: "Paneer Butter Masala",
    category: "Curry",
    price: 280,
    isVeg: true,
    imageId: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400",
    description: "Soft paneer cubes in rich tomato gravy.",
    restaurant: {
      info: {
        id: "r2",
        name: "Mehfil",
        areaName: "Hitech City",
        avgRating: 4.0,
        cuisines: ["North Indian", "Punjabi"]
      }
    }
  },
  {
    name: "Butter Chicken",
    category: "Main Course",
    price: 420,
    isVeg: false,
    imageId: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400",
    description: "Creamy tomato-based curry with juicy chicken.",
    restaurant: {
      info: {
        id: "r3",
        name: "Punjabi Affair",
        areaName: "Gachibowli",
        avgRating: 4.5,
        cuisines: ["North Indian", "Punjabi"]
      }
    }
  },
  {
    name: "Chicken Tikka Masala",
    category: "Main Course",
    price: 400,
    isVeg: false,
    imageId: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400",
    description: "Grilled chicken cooked in spicy masala gravy.",
    restaurant: {
      info: {
        id: "r4",
        name: "Barbeque Nation",
        areaName: "Madhapur",
        avgRating: 4.4,
        cuisines: ["North Indian", "BBQ"]
      }
    }
  },
  {
    name: "Masala Dosa",
    category: "Breakfast",
    price: 180,
    isVeg: true,
    imageId: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400",
    description: "Crispy dosa stuffed with spiced potato filling.",
    restaurant: {
      info: {
        id: "r5",
        name: "Chutneys",
        areaName: "Kukatpally",
        avgRating: 4.3,
        cuisines: ["South Indian"]
      }
    }
  },
  {
    name: "Margherita Pizza",
    category: "Pizza",
    price: 320,
    isVeg: true,
    imageId: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
    description: "Classic cheese pizza with tomato base.",
    restaurant: {
      info: {
        id: "r6",
        name: "Pizza Factory",
        areaName: "Jubilee Hills",
        avgRating: 4.1,
        cuisines: ["Italian"]
      }
    }
  },
  {
    name: "Pasta Alfredo",
    category: "Pasta",
    price: 360,
    isVeg: true,
    imageId: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400",
    description: "Creamy Alfredo sauce with penne pasta.",
    restaurant: {
      info: {
        id: "r7",
        name: "Little Italy",
        areaName: "Banjara Hills",
        avgRating: 4.6,
        cuisines: ["Italian"]
      }
    }
  },
  {
    name: "Hakka Noodles",
    category: "Main Course",
    price: 240,
    isVeg: true,
    imageId: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400",
    description: "Stir-fried noodles with vegetables and sauces.",
    restaurant: {
      info: {
        id: "r8",
        name: "Mainland China",
        areaName: "Ameerpet",
        avgRating: 3.9,
        cuisines: ["Chinese", "Asian"]
      }
    }
  },
  {
    name: "Veg Manchurian",
    category: "Starter",
    price: 220,
    isVeg: true,
    imageId: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400",
    description: "Crispy veg balls tossed in spicy sauce.",
    restaurant: {
      info: {
        id: "r8",
        name: "Mainland China",
        areaName: "Ameerpet",
        avgRating: 4.0,
        cuisines: ["Chinese"]
      }
    }
  },
  {
    name: "Dal Makhani",
    category: "Curry",
    price: 260,
    isVeg: true,
    imageId: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400",
    description: "Slow-cooked black lentils in buttery gravy.",
    restaurant: {
      info: {
        id: "r9",
        name: "Delhi Zaika",
        areaName: "LB Nagar",
        avgRating: 4.2,
        cuisines: ["North Indian"]
      }
    }
  },
  {
    name: "Chicken Fried Rice",
    category: "Main Course",
    price: 290,
    isVeg: false,
    imageId: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400",
    description: "Classic fried rice with chicken and soy sauce.",
    restaurant: {
      info: {
        id: "r10",
        name: "Wok Republic",
        areaName: "Hitech City",
        avgRating: 3.8,
        cuisines: ["Chinese"]
      }
    }
  },
  {
    name: "Veg Biryani",
    category: "Main Course",
    price: 300,
    isVeg: true,
    imageId: "https://images.unsplash.com/photo-1642821373181-696a54913e93?w=400",
    description: "Aromatic basmati rice cooked with vegetables.",
    restaurant: {
      info: {
        id: "r1",
        name: "Paradise Hotel",
        areaName: "Secunderabad",
        avgRating: 4.1,
        cuisines: ["Biryani", "North Indian"]
      }
    }
  },
  {
    name: "Chicken Shawarma",
    category: "Wraps",
    price: 250,
    isVeg: false,
    imageId: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400",
    description: "Middle Eastern wrap with grilled chicken.",
    restaurant: {
      info: {
        id: "r11",
        name: "Al Arabian",
        areaName: "Tolichowki",
        avgRating: 4.7,
        cuisines: ["Middle Eastern", "Arabian"]
      }
    }
  },
  {
    name: "Falafel Wrap",
    category: "Wraps",
    price: 200,
    isVeg: true,
    imageId: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400",
    description: "Crispy falafel wrapped with hummus and veggies.",
    restaurant: {
      info: {
        id: "r11",
        name: "Al Arabian",
        areaName: "Tolichowki",
        avgRating: 4.4,
        cuisines: ["Middle Eastern"]
      }
    }
  }
];

const importData = async () => {
  try {
    await connectDB();
    await Dish.deleteMany();
    await Dish.insertMany(sampleDishes);
    console.log('✅ Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
