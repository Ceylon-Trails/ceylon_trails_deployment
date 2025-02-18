/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";

const Province_Card = ({ provinceName, index, image ,user,openLoginModal}) => {
  const navigate = useNavigate();
  


  const handleActivityBtn = () => {
    navigate(`/activity/${provinceName}`);
  };

  console.log("User from province card", user);
  

  return (
    <div
      onClick={user? handleActivityBtn : openLoginModal}
      className="w-full h-full  bg-base-200 transform group hover:shadow-gray-500 cursor-pointer hover:scale-105 transition-transform duration-500 pb-2 sm:pb-10 rounded-2xl shadow-lg overflow-hidden"
    >
      
      <div className="relative overflow-hidden rounded-t-2xl">
     
        <div className="relative transform transition-transform duration-500 group-hover:scale-110">
          <img
            className="h-40 object-cover sm:h-48 md:h-50 lg:h-70 w-full"
            src={image}
            alt={provinceName}
          />

          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80"></div>
        </div>

        <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 text-white text-lg sm:text-xl font-bold">
          {provinceName}
        </div>
      </div>
    
      <div className="flex justify-center sm:justify-between items-center px-1 sm:px-2 mt-2 sm:mt-4 lg:mt-6">
        <button className="text-xs font-abhaya cursor-pointer sm:text-sm lg:text-lg font-semibold text-white rounded-lg bg-base-500/70 hover:bg-base-500 transition-colors duration-300 px-4 py-2 shadow-md">
          Explore
        </button>
        <div className="md:flex hidden items-center">
          <button
            id={index}
            className="flex items-center cursor-pointer justify-center text-white rounded-full bg-base-500/70 hover:bg-base-500 transition-colors duration-300 w-10 h-10 shadow-md"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Province_Card;
