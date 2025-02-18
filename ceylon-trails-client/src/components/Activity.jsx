/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { img } from "framer-motion/client";
import { useRef, useState } from "react";
import { FaHeart } from "react-icons/fa";
import ActivityMapModal from "./ActivityMapModal";
const Activity = ({ image, desc, name  , handleActivityMapModal}) => {

  const [favorite, setFavorite] = useState(false);

  const handleFavorite = (e) => {
    e.stopPropagation();
    setFavorite(!favorite);
  }

  return (
    <div onClick={handleActivityMapModal} className="w-full relative h-50 sm:h-60 md:h-80 cursor-pointer  rounded-2xl hover:scale-105 transform transition-transform duration-500 ">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent rounded-2xl to-black opacity-80"></div>
      <FaHeart className={`${favorite ? "text-yellow-500" : "text-white"} z-50 absolute top-2 right-2 text-2xl sm:text-3xl`} onClick={handleFavorite} />
      <img className="w-full  h-full object-cover rounded-2xl" src={image} alt="" />
      <div className="absolute bottom-5 left-2 right-2 lg:left-4 lg:right-4 px-2 lg:px-4 text-white z-20">
        <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl  leading-tight">{name}</h2>
        <p className="mt-1 hidden  lg:block text-base sm:text-2xl md:text-3xl">{desc}</p>
      </div>
    </div>
  )
}

export default Activity