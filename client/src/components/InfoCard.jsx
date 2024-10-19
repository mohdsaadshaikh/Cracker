import { Link } from "react-router-dom";

const InfoCard = ({ title, value, detailsText, bgColor }) => {
  return (
    <div
      className={`flex flex-col justify-center gap-2 pl-8 text-white ${bgColor} w-full h-44 rounded-lg hover:bg-black select-none transition-all duration-300 ease-in-out`}
    >
      <h2 className="text-lg rubik-font">{title}</h2>
      <span className="font-bold text-4xl rubik-font">${value}</span>
      <Link to="/finances">
        <span className="cursor-pointer hover:underline">{detailsText}</span>
      </Link>
    </div>
  );
};

export default InfoCard;
