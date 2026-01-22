import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../config/api";
import {
  addDishData,
  addRestaurantData,
  updateCurrentButton,
  updateDisplayCategory,
  updateKeyboardCategory, // Keeping imports to prevent breaking searchSlice if these are required
} from "../redux/searchSlice";

const useAfterSearchApi = () => {
  const { dishId } = useParams(); // Get search term from URL
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const currentBtn = useSelector((store) => store.search.currentButton);
  const searchDishData = useSelector((store) => store.search.dishData);

  useEffect(() => {
    if (dishId) {
      fetchSearchResults();
    }
  }, [dishId]);

  const fetchSearchResults = async () => {
    try {
      setLoading(true);
      
      // Parallel fetch for dishes and restaurants
      const [dishResponse, restaurantResponse] = await Promise.all([
        fetch(`${BASE_URL}/api/dishes?search=${dishId}`),
        fetch(`${BASE_URL}/api/restaurants?search=${dishId}`)
      ]);

      if (!dishResponse.ok || !restaurantResponse.ok) throw new Error("Search failed");
      
      const dishData = await dishResponse.json();
      const restaurantData = await restaurantResponse.json();
      
      // Dispatch data to Redux with safety checks
      // DishesBody expects an Array
      dispatch(addDishData(Array.isArray(dishData) ? dishData : []));
      
      // RestaurantBody expects an Object with .cards
      const safeRestaurantData = (restaurantData && restaurantData.cards) 
        ? restaurantData 
        : { cards: [] };
        
      dispatch(addRestaurantData({ cards: safeRestaurantData.cards || [] })); 
      
      dispatch(updateCurrentButton("Dish"));
      dispatch(updateDisplayCategory("Dish"));

    } catch (error) {
      console.error("Search fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Tab Switch (Memoization logic if needed, but for now re-use same data)
  useEffect(() => {
      // If user switches tabs, ensure data is present.
      // Since we populated both above, it should be fine.
  }, [currentBtn]);

  return { loading }; // Return loading state if needed by component
};

export default useAfterSearchApi;
