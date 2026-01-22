import { useSelector } from "react-redux";
import FoodItems from "./FoodItems";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselShimmer from "./CarouselShimmer";

const Carousel = () => {
  const heading = useSelector((store) => store.foodCatagory.name);
  const foodName = useSelector((store) => store.foodCatagory.foodItems);

  return !heading ? (
    <CarouselShimmer />
  ) : (
    <div>
      <div className="   px-4  md:p-8">
        <div className=" bg flex justify-between text-start md:mb-1">
          <div className="">
            <p className="select-none text-2xl font-extrabold tracking-tight md:text-4xl">
              {heading}
            </p>
          </div>
        </div>
        <div className="hide-scrollbar flex overflow-x-scroll">
          <div className="flex select-none">
            {Array.isArray(foodName) && foodName.map((card) => (
              <FoodItems key={card.id} image={card.imageId} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
