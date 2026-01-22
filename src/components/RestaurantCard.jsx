/* eslint-disable react/prop-types */

import { useContext } from "react";
import UserContext from "../utils/UserContext";

const RestaurantCard = (props) => {
  const { loggedInUser } = useContext(UserContext);
  // console.log(props);
  // eslint-disable-next-line react/prop-types
  const { resData } = props;
  // eslint-disable-next-line no-unsafe-optional-chaining
  const { name, areaName, avgRating, cloudinaryImageId } = resData?.info;

  return (
    <div
      data-testid="resCard"
      className=" h-64 w-56 rounded-lg border-2 border-solid border-black"
    >
      <img src={cloudinaryImageId} alt={name} className="h-32 w-full object-cover rounded-t-lg" />
      <h3 className="mt-10 font-black">{name}</h3>
      <h4>{areaName}</h4>
      <h4>{avgRating} stars</h4>
      <h4>38 minutes</h4>
      <h4>{loggedInUser}</h4>
    </div>
  );
};

export const PromotedCard = (RestaurantCard) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    return (
      <div>
        <label className=" absolute -translate-x-4 rounded-sm border-2 border-black bg-black text-white">
          Open
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};
export default RestaurantCard;
