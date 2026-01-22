/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { MENU_IMAGE } from "../../utils/constants";
import {
  addItems,
  deleteFromCart,
  deleteItem,
} from "../../utils/redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const ItemList = ({ data, cart }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector((store) => store.cart.items);
  const [count, setCount] = useState(0);
  const [cardId, setCardId] = useState();
  const [countMap, setCountMap] = useState({});

  useEffect(() => {
    setCount(count);
  }, [count, cartItem]);

  useEffect(() => {
    const newCountMap = {};
    cartItem.forEach((item) => {
      newCountMap[item.id] = item.count;
    });
    setCountMap(newCountMap);
  }, [cartItem]);

  useEffect(() => {
    setCardId(cardId);
  }, [cartItem]);

  const ravi = cartItem.filter((cards) => cards.id === cardId);
  // ravi[0] && console.log(ravi[0].count);

  const handleMinusOnClick = (id) => {
    console.log(typeof id);
    dispatch(deleteItem(id));
  };
  const handleAddOnClick = async (card) => {
    dispatch(
      addItems({
        id: card.card.info.id,
        card: card.card,
        count: 1,
        cart: cart,
      }),
    );

    setCardId(card.card.info.id);
  };

  const handleDeleteItemFromTheCart = (id) => {
    dispatch(deleteFromCart(id));
  };
  return (
    <>
      {data.map((e) => (
        <div
          data-testid="foodItems"
          key={e.card.info.id}
          className="m-2 flex flex-col overflow-x-clip border-b-2 border-black text-left text-[0.72rem] md:flex-row md:text-base"
        >
          <div className="md:w-8/12 md:p-4">
            <div className="mt-1 select-none text-[0.72rem] text-sm font-bold subpixel-antialiased md:text-base">
              {e.card.info.name}
            </div>
            <div className="mb-3 flex select-none items-center justify-start text-[0.72rem] text-sm font-medium md:text-base">
              <img
                src="https://www.svgrepo.com/show/502817/rupee-coin.svg"
                className="mr-1 h-4 select-none "
                alt=""
              />
              <div>
                {e.card.info.price / 100 || e.card.info.defaultPrice / 100}
              </div>
            </div>
            <div className="mb-4 w-72 select-none  text-sm font-light subpixel-antialiased md:h-auto md:text-sm">
              {e.card.info.description}
            </div>
          </div>

          <div className=" md:ml-10 md:flex md:w-4/12 md:flex-col md:items-center">
            <button
              className={` flex w-20 select-none items-center justify-around rounded-md bg-black p-1 text-xs font-extrabold text-white ${
                cart === "true" ? "ml-0" && "md:-ml-12" : "ml-0"
              } ${cart === "true" ? "md:mt-2" : "md:mt-5"}`}
            >
              <div
                className="text-xl"
                onClick={() => handleMinusOnClick(e.card.info.id)}
              >
                -
              </div>
              <div className="text-md">
                {countMap[e.card.info.id] !== undefined ? (
                  <span>{countMap[e.card.info.id]}</span>
                ) : (
                  <span className="text-lg">{0}</span>
                )}
              </div>
              <div className="text-xl" onClick={() => handleAddOnClick(e)}>
                +
              </div>
            </button>

            <div className="flex justify-between ">
              <img
                src={e.card.info.imageId}
                className="mb-4 h-24 w-24 select-none border md:h-24 md:w-24 object-cover rounded-lg"
                alt={e.card.info.name}
                onError="this.onerror=null"
              />
              {cart === "true" && (
                <div className="  flex h-20 w-32 items-center   justify-center  p-4 md:h-24 md:w-28 md:flex-col md:items-start md:justify-start ">
                  <p className="h-7 w-14">
                    {countMap[e.card.info.id] !== undefined ? (
                      <span className="text-2xl font-bold md:text-lg">
                        {(e.card.info.price / 100) * countMap[e.card.info.id]}
                      </span>
                    ) : (
                      <span className="text-lg">{0}</span>
                    )}
                  </p>
                  <div
                    onClick={() => handleDeleteItemFromTheCart(e.card.info.id)}
                    className=""
                  >
                    <img
                      src="https://www.svgrepo.com/show/436652/bin-xmark-fill.svg"
                      className="h-5 md:h-7"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default ItemList;
