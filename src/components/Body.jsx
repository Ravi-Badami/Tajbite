import RestaurantCard, { PromotedCard } from "./RestaurantCard";
import { useEffect, useState } from "react";
import { API_DATA, API_DATA2, API_DATA_MOBILE } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";

import {
  addRestaurantData,
  addRestaurantFilterData,
} from "../utils/redux/restaurantSlice";
import Hero from "./Hero/Hero";
import HeroCards from "./Hero/HeroCards";
import AboutUs from "./About/AboutUs";
import Carousel from "./Carousel/Carousel";
import { addAllFoodTypes, addName } from "../utils/redux/foodCatagorySlice";
import Menu from "./Menu/Menu";

import useCuisineData from "../utils/Hooks/useCuisineData";
import ShimmerCards from "./Hero/Shimmer/ShimmerCards";
import ShimmerHero from "./Hero/Shimmer/ShimmerHero";
import AboutUsShimmer from "./About/Shimmer/AboutShimmer";
import CarouselShimmer from "./Carousel/CarouselShimmer";
import ShimmerMenu from "./Menu/Shimmer/ShimmerMenu";
import { updateShowCard } from "../utils/redux/searchSlice";
import CorsError from "./Error/CorsError";
import resMainData from "./mocks/resMainData.json";

/** This is the  main body of the project  */
const Body = () => {
  // useWhatsOnMind();
  const dispatch = useDispatch();
  const result = useSelector((store) => store.restaurant.restaurantData);
  const [mobileError, setMobileError] = useState(false);
  const [desktopError, setDesktopError] = useState(false);

  // Move dispatch to useEffect to avoid calling it during render
  useEffect(() => {
    dispatch(updateShowCard(false));
  }, [dispatch]);

  /**
   *  *This useState hook will call the function which is fetching the data from the API  */
  useEffect(() => {
    /** Memoization */
    !result && fetchData();
  }, [result]);

  const objectOfRestaurant = (card) => {
    if (card.card.card.id === "restaurant_grid_listing") {
      // console.log(card?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      dispatch(
        addRestaurantData(
          card?.card?.card?.gridElements?.infoWithStyle?.restaurants,
        ),
      );

      dispatch(
        addRestaurantFilterData(
          card?.card?.card?.gridElements?.infoWithStyle?.restaurants,
        ),
      );
    }

    if (card.card.card.id === "whats_on_your_mind") {
      dispatch(addName(card.card.card.header.title));
      dispatch(
        addAllFoodTypes(card?.card?.card?.gridElements?.infoWithStyle?.info),
      );
    }
  };
  /**
   * *This callback function will fetch the data from API */
  const fetchData = async () => {
    // Use local mock data instead of fetching from Swiggy API to avoid CORS errors
    resMainData.data.cards.map((card) => objectOfRestaurant(card));
  };

  /*
   * This hook is used to change the value of LoggedInUser which is in the UserContext file */
  // const { loggedInUser, setUserName } = useContext(UserContext);

  /**
   * * This is used to show a Promoted tag on top of the card */
  // const DisplayPromotedCard = PromotedCard(RestaurantCard);

  /*
   * This is used to show offline message when user get disconnected from the internet */
  // if (useOnlineStatus() === false)
  //   return <h1 className="onlineStatus">you are offline</h1>;

  // if (filterData === null) {
  //   return <Dish />;
  // }
  useCuisineData();

  if (mobileError && desktopError) {
    return (
      <div className="flex w-screen items-center justify-center">
        <CorsError />
      </div>
    );
  }

  /*
   * - This is the main return function which will be used to render the main body
   * - It will show the shimmer UI until the data is fetched from the API (length === 0) OR else it will render the body component after the call has been made
   * */
  return !result ? (
    /**Input box to take the data from user to search */
    <div className=" scroll-smooth  ">
      <ShimmerHero />
      <ShimmerCards />
      <AboutUsShimmer />
      <CarouselShimmer />

      <ShimmerMenu />
    </div>
  ) : (
    <div className=" scroll-smooth  text-center">
      <Hero />
      <HeroCards />
      <AboutUs />
      <Carousel />
      <Menu />
    </div>
  );
};
export default Body;
