/* eslint-disable react/prop-types */

import { RESTUARATANT_IMAGE } from "../../utils/constants";
const EachCard = ({ areaName, avgRating, image, cuisine }) => {
  //   const { loggedInUser } = useContext(UserContext);

  // eslint-disable-next-line react/prop-types

  // eslint-disable-next-line no-unsafe-optional-chaining

  return (
    <div
      data-testid="resCard"
      className=" mb-6 h-48 w-[9.625rem] cursor-pointer rounded-lg  border-2 shadow-md  shadow-gray-300 drop-shadow-xl transition-all hover:-translate-y-1 hover:bg-gray-100 md:mb-0 md:h-72 md:w-60  "
    >
      <img
        className="h-[60%] w-full rounded-lg object-cover"
        src={image}
        alt={areaName}
      />
      <div className="  px-2 py-2 md:py-5">
        <h3 className=" text-xs font-black md:text-base">
          <span className=" text-xs text-red-600 md:text-base">TAJ</span>BITE-
          {areaName}
        </h3>
        <h3 className=" text-xs font-semibold md:text-base">
          Cuisine - {cuisine[0]}
        </h3>

        <h4 className="text-xs md:text-base">{avgRating} stars</h4>
      </div>
    </div>
  );
};

export const PromotedCard = (EachCard) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    return (
      <div>
        <label className=" absolute -translate-x-4 rounded-sm border-2 border-black bg-black text-white">
          Open
        </label>
        <EachCard {...props} />
      </div>
    );
  };
};
export default EachCard;
