// import useOnlineStatus from "../utils/useOnlineStatus";
import { useState } from "react";
import useRestaurantMenu from "../../utils/useRestaurantMenu";

import RestaurantCategory from "./RestaurantCategory";

import Shimmer from "../Shimmer";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {
  const [showList, setShowList] = useState(null);
  // console.log(setShowList);
  // if (showList !== null) {
  //   setShowList(null);
  // }
  const handleToggle = (index) => {
    setShowList(showList === index ? null : index);
  };

  //*extracts the resId from url
  const { resId } = useParams();

  //*get the data from the API (API call is made in the useRestaurantMenu file which is a custom hook) and resId is pass to it.
  const resMenu = useRestaurantMenu(resId);
  if (resMenu.resMenu === null) return <Shimmer />;

  const onlyData = resMenu.resMenu.cards.map((card) => {
    return card?.groupedCard?.cardGroupMap?.REGULAR?.cards || null;
  });

  /* 
  ? since onlyData returns [undefined,undefined,undefined,undefined,arr]
  ? filter.(Boolean) will only pick the true value which is arr
*/

  const final = onlyData.filter(Boolean);

  // console.log(final[0]);

  const categories = final[0].filter(
    (c) =>
      c.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
  );
  if (!categories) return;

  // console.log(categories);
  const ravi = resMenu?.resMenu;
  // console.log(ravi);

  const restaurantInfoCard = ravi.cards.find(
    (a) =>
      a?.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
  );
  
  if (!restaurantInfoCard) return <Shimmer />;

  const { name, cuisines, costForTwoMessage } = restaurantInfoCard.card.card.info;
  //*if resMenu is undefined than shimmer ui will be shown or else menu will be shown
  return (
    <div className=" mt-24  min-h-screen   scroll-smooth text-center ">
      <h1 className="select-none  font-extrabold">{name}</h1>
      <p className="select-none font-extrabold ">
        {cuisines.join(", ")} - {costForTwoMessage}
      </p>
      {/**show each catagory  */}
      {categories.map((category, index) => (
        <RestaurantCategory
          key={category.card.card.title}
          showList={index === showList ? true : false}
          data={category.card.card}
          setShowList={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
