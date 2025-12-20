import { useEffect, useState } from "react";
import {
  SEARCH_BY_CLICK,
  SEARCH_BY_CLICK_2,
  SEARCH_BY_ENTER,
  SEARCH_BY_ENTER_2,
  SEARCH_BY_ENTER_2_DISH,
  SEARCH_BY_ENTER_2_RESTAURANT,
} from "../constants";
import { useDispatch, useSelector } from "react-redux";
import {
  addDishData,
  addRestaurantData,
  updateCurrentButton,
  updateDisplayCategory,
  updateKeyboardCategory,
} from "../redux/searchSlice";
const useAfterSearchApi = (inputValue) => {
  const dispatch = useDispatch();
  const typeOfSearch = useSelector((store) => store.search.type);
  const card = useSelector((store) => store.search.showCard);
  const CTA = useSelector((store) => store.search.cta);
  const categoryCard = useSelector((store) => store.search.cardCategory);
  const keyboardCat = useSelector((store) => store.search.keyboardCategory);
  const currentBtn = useSelector((store) => store.search.currentButton);
  const searchRestaurantData = useSelector(
    (store) => store.search.restaurantData,
  );
  const searchDishData = useSelector((store) => store.search.dishData);
  const finalCta = (CTA || "").replace("swiggy://explore?query=", "");
  const searchParams = new URLSearchParams(finalCta.split("&")[1]);
  const metadata = searchParams.get("metadata");
  const [jsonData, setJsonData] = useState("");

  useEffect(() => {
    if (card) {
      if (typeOfSearch === "card") {
        fetchDataClick();
      }
      if (typeOfSearch === "keyboard") {
        fetchDataKeyboard();
      }
    }
  }, [typeOfSearch]);

  useEffect(() => {
    if (typeOfSearch === "keyboard") {
      fetchKeyboardSwitch();
    }
    if (typeOfSearch === "card") {
      fetchCardSwitch();
    }
  }, [currentBtn]);

  const fetchDataClick = async () => {
    // Mock search results data
    const mockJson = {
      data: {
        cards: [
          {},
          {
            groupedCard: {
              cardGroupMap: {
                DISH: {
                  cards: [
                    {
                      card: {
                        card: {
                          info: {
                            id: "1",
                            name: "Chicken Burger",
                            price: 15000,
                            imageId: "mock-image",
                          },
                          restaurant: {
                            info: {
                              areaName: "KFC",
                              avgRating: 4.1,
                              id: "235618",
                            },
                          },
                        },
                      },
                    },
                  ],
                },
                RESTAURANT: {
                  cards: [
                    {
                      card: {
                        card: {
                          info: {
                            id: "235618",
                            areaName: "KFC",
                            avgRating: 4.1,
                            cuisines: ["Burgers", "Biryani"],
                            cloudinaryImageId: "mock-image",
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        ],
      },
    };

    setJsonData(mockJson);

    if (mockJson?.data?.cards[1]?.groupedCard?.cardGroupMap.DISH) {
      dispatch(updateCurrentButton("Dish"));
      dispatch(updateDisplayCategory("Dish"));
      dispatch(
        addDishData(
          mockJson?.data?.cards[1]?.groupedCard?.cardGroupMap.DISH.cards,
        ),
      );
    } else if (mockJson?.data?.cards[1]?.groupedCard?.cardGroupMap.RESTAURANT) {
      dispatch(updateCurrentButton("Restaurant"));
      dispatch(updateDisplayCategory("Restaurant"));
      dispatch(
        addRestaurantData(
          mockJson?.data?.cards[1]?.groupedCard?.cardGroupMap.RESTAURANT,
        ),
      );
    }
  };
  const fetchCardSwitch = async () => {
    if (!searchRestaurantData) {
      if (categoryCard === "Dish" && currentBtn === "Restaurant") {
        // Mock data for restaurant search
        const mockJson = {
          data: {
            cards: [
              {
                groupedCard: {
                  cardGroupMap: {
                    RESTAURANT: {
                      cards: [
                        {
                          card: {
                            card: {
                              info: {
                                id: "235618",
                                areaName: "KFC",
                                avgRating: 4.1,
                                cuisines: ["Burgers", "Biryani"],
                                cloudinaryImageId: "mock-image",
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
            ],
          },
        };

        dispatch(
          addRestaurantData(
            mockJson?.data?.cards[0]?.groupedCard?.cardGroupMap.RESTAURANT,
          ),
        );
      }
    }

    //memoization
    if (!searchDishData) {
      if (categoryCard === "Restaurant" && currentBtn === "Dish") {
        // Mock data for dish search
        const mockJson = {
          data: {
            cards: [
              {
                groupedCard: {
                  cardGroupMap: {
                    DISH: {
                      cards: [
                        {
                          card: {
                            card: {
                              info: {
                                id: "1",
                                name: "Chicken Burger",
                                price: 15000,
                                imageId: "mock-image",
                              },
                              restaurant: {
                                info: {
                                  areaName: "KFC",
                                  avgRating: 4.1,
                                  id: "235618",
                                },
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
            ],
          },
        };
        dispatch(
          addDishData(
            mockJson?.data?.cards[0]?.groupedCard?.cardGroupMap.DISH.cards,
          ),
        );
      }
    }
  };

  const fetchDataKeyboard = async () => {
    // Mock search results data for keyboard input
    const mockJson = {
      data: {
        cards: [
          {},
          {
            groupedCard: {
              cardGroupMap: {
                DISH: {
                  cards: [
                    {
                      card: {
                        card: {
                          info: {
                            id: "1",
                            name: "Chicken Burger",
                            price: 15000,
                            imageId: "mock-image",
                          },
                          restaurant: {
                            info: {
                              areaName: "KFC",
                              avgRating: 4.1,
                              id: "235618",
                            },
                          },
                        },
                      },
                    },
                  ],
                },
                RESTAURANT: {
                  cards: [
                    {
                      card: {
                        card: {
                          info: {
                            id: "235618",
                            areaName: "KFC",
                            avgRating: 4.1,
                            cuisines: ["Burgers", "Biryani"],
                            cloudinaryImageId: "mock-image",
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        ],
      },
    };

    setJsonData(mockJson);

    if (mockJson?.data?.cards[1]?.groupedCard?.cardGroupMap.DISH) {
      dispatch(updateCurrentButton("Dish"));
      dispatch(updateKeyboardCategory("Dish"));
      dispatch(
        addDishData(
          mockJson?.data?.cards[1]?.groupedCard?.cardGroupMap.DISH.cards,
        ),
      );
    }
    if (mockJson?.data?.cards[1]?.groupedCard?.cardGroupMap.RESTAURANT) {
      dispatch(updateCurrentButton("Restaurant"));
      dispatch(updateKeyboardCategory("Restaurant"));
      dispatch(
        addRestaurantData(
          mockJson?.data?.cards[1]?.groupedCard?.cardGroupMap.RESTAURANT,
        ),
      );
    }
  };

  const fetchKeyboardSwitch = async () => {
    //memoization
    if (!searchRestaurantData) {
      if (keyboardCat === "Dish" && currentBtn === "Restaurant") {
        // Mock data for restaurant search
        const mockJson = {
          data: {
            cards: [
              {
                groupedCard: {
                  cardGroupMap: {
                    RESTAURANT: {
                      cards: [
                        {
                          card: {
                            card: {
                              info: {
                                id: "235618",
                                areaName: "KFC",
                                avgRating: 4.1,
                                cuisines: ["Burgers", "Biryani"],
                                cloudinaryImageId: "mock-image",
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
            ],
          },
        };
        dispatch(
          addRestaurantData(
            mockJson?.data?.cards[0]?.groupedCard?.cardGroupMap.RESTAURANT,
          ),
        );
      }
    }

    //memoization
    if (!searchDishData) {
      if (keyboardCat === "Restaurant" && currentBtn === "Dish") {
        // Mock data for dish search
        const mockJson = {
          data: {
            cards: [
              {
                groupedCard: {
                  cardGroupMap: {
                    DISH: {
                      cards: [
                        {
                          card: {
                            card: {
                              info: {
                                id: "1",
                                name: "Chicken Burger",
                                price: 15000,
                                imageId: "mock-image",
                              },
                              restaurant: {
                                info: {
                                  areaName: "KFC",
                                  avgRating: 4.1,
                                  id: "235618",
                                },
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
            ],
          },
        };
        const finalData =
          mockJson?.data?.cards[0]?.groupedCard?.cardGroupMap.DISH.cards;

        if (finalData) {
          dispatch(addDishData(finalData));
        }

        dispatch(addDishData(finalData));
      }
    }
  };

  return jsonData;
};

export default useAfterSearchApi;
