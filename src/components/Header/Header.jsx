import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SignUp from "./SignUp";
import { CLOSE_SVG, HAMBURGER, SHOPPING_CART } from "../../utils/svg/svg";
import { useState } from "react";
import { LOGO } from "../../utils/constants";
import SearchButton from "./SearchButton";

const Header = () => {
  const [display, setDisplay] = useState(true);
  const cartItems = useSelector((store) => store.cart.items);
  const ravi = cartItems.map((card) => card.count);

  const sum = ravi.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  const handleDisplay = () => {
    setDisplay(!display);
  };
  const handleClose = () => {
    setDisplay(!display);
  };

  return (
    <div className="fixed z-20   flex  w-full items-center justify-between gap-24 bg-white px-4  py-2 md:justify-center md:gap-x-48 ">
      {/**Logo */}
      <div className="ml-5 md:ml-0 ">
        <Link to="/">
          <button className="  h-20 w-20 text-center  md:mr-0">
            <img
              className=" h-14 rounded-full shadow-inner drop-shadow-xl  md:h-16 "
              src={LOGO}
              alt="logo"
            />
          </button>
        </Link>
      </div>

      {/** Navigation section */}
      <div
        className={`  ${
          display ? "hidden" : "block"
        }   absolute z-50 mt-[180%]  flex  h-screen w-[100%]  flex-col   items-center justify-center bg-white bg-opacity-95  p-5  md:relative md:ml-0 md:mt-0 md:flex md:h-auto md:w-4/12 md:flex-row md:justify-between md:gap-1 md:border-none md:bg-opacity-100`}
      >
        <div className="flex h-[70%] w-4/12 flex-col gap-10  md:relative md:ml-0 md:mt-0 md:flex md:h-auto md:flex-row md:justify-between  md:gap-20 md:border-none  ">
          <div
            className={`${
              display ? "hidden" : "block"
            } absolute right-20 top-10`}
          >
            <img
              src={CLOSE_SVG}
              alt=""
              className={`h-7 md:hidden `}
              onClick={handleClose}
            />
          </div>
          <div className="mt-2 py-1  hover:font-medium hover:text-red-500 md:mt-0">
            <Link to="/" onClick={handleClose}>
              Home
            </Link>
          </div>
          <div className="mt-2 py-1  hover:font-medium hover:text-red-500 md:mt-0">
            <Link to="/about" onClick={handleClose}>
              About
            </Link>
          </div>
          <div className="mt-2 py-1  hover:font-medium hover:text-red-500 md:mt-0">
            <Link to="/contact" onClick={handleClose}>
              Contact
            </Link>
          </div>
          <div className="mt-2 stroke-black hover:stroke-red-500 hover:font-medium hover:text-red-500 md:mt-0">
            <Link
              to="/search"
              onClick={handleClose}
              className="flex items-center gap-1 "
            >
              {/* <img
                className="mt-[0.10rem] h-4 "
                src="https://i.postimg.cc/m2yKWnMb/magnifier.png"
                alt=""
              /> */}
              <span className="-ml-6 md:ml-0">
                <SearchButton />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/**Right section */}
      <div className="md:first-letter borde  flex w-40 items-center  justify-between border-black md:w-36">
        <div className="">
          <h1 className="   mt-2 font-bold">
            <span className="absolute  -mt-2 ml-[0.6rem] cursor-pointer select-none text-sm md:-mt-3 md:ml-4 md:text-base ">
              {sum}
            </span>
            <Link to="/Cart" className="">
              <img className=" h-7 md:h-9 " src={SHOPPING_CART} alt="" />
            </Link>
          </h1>
        </div>

        <SignUp />
        <div className="-ml-2 p-2 md:hidden" onClick={handleDisplay}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
export default Header;
