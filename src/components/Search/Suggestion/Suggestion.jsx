import { Link } from "react-router-dom";
import DisplayCards from "../DisplayCards/DisplayCards";

const Suggestion = ({ data }) => {
  return (
    <div className="  -mt-5 h-screen px-4 md:-ml-[8%] md:w-2/3 md:px-0 ">
      {data &&
        data?.search.statusCode === 0 &&
        data?.search?.data?.suggestions.map((card) => (
          <Link key={card.text} to={`/search/` + card.text}>
            <DisplayCards
              text={card.text}
              type={card.type}
              imgId={card.cloudinaryId || card.imageId}
              cta={card?.cta?.link || ""}
              subCategory={card?.subCategory}
            />
          </Link>
        ))}
    </div>
  );
};

export default Suggestion;
