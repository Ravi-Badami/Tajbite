import { CAROUSEL_IMAGE } from "../../utils/constants";

const FoodItems = ({ image }) => {
  return (
    <div>
      <div className="   flex flex-col  items-center p-3 md:p-8  ">
        {/* <div className="">{name}</div> */}
        <div className=" ">
          <div className="   flex h-20  w-20 items-center  justify-center md:h-36 md:w-36  ">
            <img src={image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200'} alt="food category" className="w-full h-full object-cover rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodItems;
