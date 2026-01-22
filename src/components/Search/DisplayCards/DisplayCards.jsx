import { useDispatch } from "react-redux";
import { SEARCH_ITEMS_IMAGE } from "../../../utils/constants";
import {
  updateCta,
  updateCurrentButton,
  updateDisplayCategory,
  updateSearchType,
  updateShowCard,
} from "../../../utils/redux/searchSlice";


const DisplayCards = ({ text, type, imgId, cta, subCategory }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div
        className="  flex   text-start  hover:bg-gray-200 md:p-4 "
        onClick={() => {
          dispatch(updateShowCard(true));
          dispatch(updateSearchType("card"));
          dispatch(updateCta(cta));
          dispatch(updateDisplayCategory(subCategory));
          dispatch(updateCurrentButton(subCategory));
        }}
      >
        <div className="  ">
          <img
            src={imgId || `https://source.unsplash.com/100x100/?${text},food`}
            alt={text}
            className="h-16 w-16 md:h-20 md:w-20 rounded-lg object-cover"
          />
        </div>
        <div className="p-2 md:p-4">
          <span className="text-base">{text}</span>
          <div className="">
            <span className="font-light text-gray-500">{type}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayCards;
