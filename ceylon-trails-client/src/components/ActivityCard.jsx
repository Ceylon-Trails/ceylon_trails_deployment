/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { FaArrowRight } from "react-icons/fa";
import ActivityMapModal from "./ActivityMapModal";
import { useRef } from "react";


const ActivityCard = ({activity,image , handleActivityModal }) => {

   

    return (
        <div onClick={handleActivityModal} className="group w-full h-full bg-shadow shadow-xl shadow-gray-500 hover:scale-105 transform transition-transform duration-500 cursor-pointer flex-col bg-topic-200 rounded-2xl overflow-hidden">
            <img className="h-40 sm:h-48 object-cover md:h-50 lg:h-70 w-full rounded-2xl transform transition-transform duration-500 hover:scale-110" src={image} alt="" />
            <label className="flex justify-center mt-3 text-white text-3xl sm:text-4xl font-jomhuria group-hover:cursor-pointer" htmlFor="">{activity}</label>
            <div className="hidden lg:flex justify-end mx-4  mb-2 sm:mb-3">
                <button className="btn btn-ghost hover:animate-bounce text-base-500 rounded-3xl bg-gray-500 opacity-55">
                    <FaArrowRight />
                </button>
            </div>
           
        </div>
    );
}

export default ActivityCard;
