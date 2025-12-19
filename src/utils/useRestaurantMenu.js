import { useEffect, useState } from "react";
import { MENU_API } from "../utils/constants";
import menuData from "../components/mocks/itemsMock.json";

const useRestaurantMenu = (resId) => {
  const [resMenu, setResMenu] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    // Use local mock data instead of fetching from Swiggy API
    setResMenu(menuData?.data);
  };

  return { resMenu };
};
export default useRestaurantMenu;
