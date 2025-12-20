import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSearchApi from "../../utils/useSearchApi";
import { BACK_BUTTON, CLOSE_SVG } from "../../utils/svg/svg";
import useAfterSearchApi from "../../utils/Hooks/useAfterSearchApi";
import { useNavigate, useParams } from "react-router-dom";
import Suggestion from "./Suggestion/Suggestion";
import {
  addDishData,
  addRestaurantData,
  updateSearchType,
  updateShowCard,
} from "../../utils/redux/searchSlice";
import SearchDisplayResults from "./DIshDisplay/SearchDisplayResults";

const Search = () => {
  const [inputValue, setInputValues] = useState("");
  const { dishId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const displayCard = useSelector((store) => store.search.showCard);
  const data = useSearchApi(inputValue);

  useAfterSearchApi();

  useEffect(() => {
    if (dishId) {
      setInputValues(dishId);
    }
  }, [dishId]);

  const handleClick = () => {
    setInputValues("");
    dispatch(updateShowCard(false));
    navigate("/search");
    dispatch(addRestaurantData(""));
    dispatch(addDishData(""));
  };

  const handleClick2 = () => {
    setInputValues("");
  };

  const onSubmitHandle = (e) => {
    e.preventDefault();
    dispatch(updateShowCard(true));
    dispatch(updateSearchType("keyboard"));
    navigate(`/search/${inputValue}`);
  };

  return (
    <div className="  text-center">
      <div className="fixed -mt-[5rem] w-full bg-white md:-mt-[5rem]">
        <div className="flex w-full items-center justify-center ">
          <div className="flex w-[98%] items-center justify-between border-2  px-4   md:w-[63.5%]">
            <div className="flex gap-3">
              {displayCard && (
                <button className=" " onClick={handleClick}>
                  <img src={BACK_BUTTON} className="h-4" alt="" />
                </button>
              )}
              <form action="" onSubmit={onSubmitHandle}>
                <input
                  /**This is the css using tailwind */
                  className="m-2 
                    rounded-sm border-none  border-black  focus:outline-none md:w-[250%]"
                  data-testid="searchInput"
                  placeholder=" What do want to eat"
                  /**This is used to display the data take from the input */
                  value={inputValue}
                  /** This is used to set the data inorder to display furthur */
                  onChange={(e) => {
                    setInputValues(e.target.value);
                    dispatch(updateShowCard(false));
                  }}
                ></input>
              </form>
            </div>
            {inputValue && (
              <button className="     " onClick={handleClick2}>
                <img src={CLOSE_SVG} className="h-5 " alt="" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="  mt-44 flex flex-col items-start  gap-7 md:items-center   ">
        {displayCard ? <SearchDisplayResults /> : <Suggestion data={data} />}
      </div>
    </div>
  );
};

export default Search;
