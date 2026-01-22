import { DISPLAY_RESULT_IMAGE } from "../../../../../../utils/constants";
import { STAR_BLACK } from "../../../../../../utils/svg/svg";

/* eslint-disable react/prop-types */
const CardOfRestaurant = ({ data }) => {
  if (!data || !data.info) return null;
  console.log(data);
  const { areaName, avgRating, cuisines, cloudinaryImageId } = data?.info;

  return (
    <>
      <div className=" flex min-w-full gap-3  rounded-xl border-t-4 border-red-500 p-4 shadow-lg shadow-gray-400 md:w-96">
        <div className="md:w-1/3">
          <img
            src={cloudinaryImageId}
            alt={areaName}
            className="h-24 w-24 rounded-lg object-cover"
          />
        </div>
        <div className="flex w-2/3 flex-col  gap-2   text-start ">
          <p className="text-md w-52 font-semibold">TAJBITE {areaName}</p>
          <p className="flex gap-1">
            <img src={STAR_BLACK} className="w-4" alt="" />
            <span>{avgRating}</span>
          </p>
          <div className="borde flex    flex-wrap gap-x-2  border-black text-sm md:h-10 md:w-64   ">
            {cuisines.map((card) => (
              <p key={card}>{card}</p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardOfRestaurant;
