import { useEffect, useState } from "react";
import { BASE_URL, USE_BACKEND } from "../config/api";
import menuData from "../components/mocks/itemsMock.json";

const useRestaurantMenu = (resId) => {
  const [resMenu, setResMenu] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, [resId]);

  const fetchMenu = async () => {
    if (!USE_BACKEND) {
      // Use mock data (development/offline mode)
      setResMenu(menuData?.data);
      return;
    }

    try {
      // Use real backend
      const response = await fetch(`${BASE_URL}/api/restaurants/${resId}`);
      
      if (!response.ok) {
        console.warn('Backend failed, falling back to mock data');
        setResMenu(menuData?.data);
        return;
      }
      
      const data = await response.json();
      setResMenu(data);
    } catch (error) {
      console.error('Error fetching restaurant menu:', error);
      // Fallback to mock data on error
      setResMenu(menuData?.data);
    }
  };

  return { resMenu };
};
export default useRestaurantMenu;

