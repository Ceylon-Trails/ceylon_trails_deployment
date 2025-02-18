/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

import central1 from "../../../src/assets/activityCarousalImages/CentralProvince/AluwihareRockCaveTemple.jpg";
import central2 from "../../../src/assets/activityCarousalImages/CentralProvince/BahirawakandaTemple.jpg";
import central3 from "../../../src/assets/activityCarousalImages/CentralProvince/GregoryLake.jpg";
import central4 from "../../../src/assets/activityCarousalImages/CentralProvince/HortonPlains.jpg";
import central5 from "../../../src/assets/activityCarousalImages/CentralProvince/PeradeniyaGardens.jpg";
import central6 from "../../../src/assets/activityCarousalImages/CentralProvince/UdawattaKAle.jpg";

import western1 from "../../../src/assets/activityCarousalImages/WesternProvince/DiyathaUyana.jpg"
import western2 from "../../../src/assets/activityCarousalImages/WesternProvince/GangaramayaTemple.jpg"
import western3 from "../../../src/assets/activityCarousalImages/WesternProvince/IndependanceSquare.jpg"
import western4 from "../../../src/assets/activityCarousalImages/WesternProvince/NationalMuseum.jpg"
import western5 from "../../../src/assets/activityCarousalImages/WesternProvince/PettahMarket.jpg"
import western6 from "../../../src/assets/activityCarousalImages/WesternProvince/ViharamahadeviPark.jpg"

import southern1 from "../../../src/assets/activityCarousalImages/SouthernProvince/GalleFort.jpg"
import southern2 from "../../../src/assets/activityCarousalImages/SouthernProvince/HadungodaTeaState.jpg"
import southern3 from "../../../src/assets/activityCarousalImages/SouthernProvince/MulkirigalaRockTemple.jpg"
import southern4 from "../../../src/assets/activityCarousalImages/SouthernProvince/HikkaduwaBeach.jpg"
import southern5 from "../../../src/assets/activityCarousalImages/SouthernProvince/MaduRiver.jpg"
import southern6 from "../../../src/assets/activityCarousalImages/SouthernProvince/MulkirigalaRockTemple.jpg"
import southern7 from "../../../src/assets/activityCarousalImages/SouthernProvince/YalaNationalPark.jpg"

import eastern1 from "../../../src/assets/activityCarousalImages/EasternProvince/ElephantRock.jpg"
import eastern2 from "../../../src/assets/activityCarousalImages/EasternProvince/Galoya.jpg"
import eastern3 from "../../../src/assets/activityCarousalImages/EasternProvince/Kumana.jpg"
import eastern4 from "../../../src/assets/activityCarousalImages/EasternProvince/PasikudaBeach.jpg"
import eastern5 from "../../../src/assets/activityCarousalImages/EasternProvince/PigeonIsland.jpg"

import northern1 from "../../../src/assets/activityCarousalImages/NorthernProvince/Delft.jpg"
import northern2 from "../../../src/assets/activityCarousalImages/NorthernProvince/JafnaLibrary.jpg"
import northern3 from "../../../src/assets/activityCarousalImages/NorthernProvince/MananrFort.jpg"
import northern4 from "../../../src/assets/activityCarousalImages/NorthernProvince/NagadeepaTemple.jpg"
import northern5 from "../../../src/assets/activityCarousalImages/NorthernProvince/NagapooshaniKovil.jpg"
import northern6 from "../../../src/assets/activityCarousalImages/NorthernProvince/PointPedro.jpg"

import northWest1 from "../../../src/assets/activityCarousalImages/NorthWesternProvince/Anawilundawa.jpg"
import northWest2 from "../../../src/assets/activityCarousalImages/NorthWesternProvince/Bathalagoda.jpg"
import northWest3 from "../../../src/assets/activityCarousalImages/NorthWesternProvince/Kalpitiya.jpg"
import northWest4 from "../../../src/assets/activityCarousalImages/NorthWesternProvince/Wilpattu.jpg"
import northWest5 from "../../../src/assets/activityCarousalImages/NorthWesternProvince/Yapahuwa.jpg"

import sabaragamuwa1 from "../../../src/assets/activityCarousalImages/SabaragamuwaProvince/Batadombalena.jpg"
import sabaragamuwa2 from "../../../src/assets/activityCarousalImages/SabaragamuwaProvince/BopathElla.jpg"
import sabaragamuwa3 from "../../../src/assets/activityCarousalImages/SabaragamuwaProvince/Kithulgala.jpg"
import sabaragamuwa4 from "../../../src/assets/activityCarousalImages/SabaragamuwaProvince/PothgulViharaya.jpg"
import sabaragamuwa5 from "../../../src/assets/activityCarousalImages/SabaragamuwaProvince/Sripadaya.jpg"
import sabaragamuwa6 from "../../../src/assets/activityCarousalImages/SabaragamuwaProvince/SurathaliElla.jpg"
import sabaragamuwa7 from "../../../src/assets/activityCarousalImages/SabaragamuwaProvince/Udawalawa.jpeg"

import uva1 from "../../../src/assets/activityCarousalImages/UvaProvince/Buduruwagala.jpg"
import uva2 from "../../../src/assets/activityCarousalImages/UvaProvince/EllaRock.jpg"
import uva3 from "../../../src/assets/activityCarousalImages/UvaProvince/HalpewattaTea.jpg"
import uva4 from "../../../src/assets/activityCarousalImages/UvaProvince/LittleAdamsPeak.jpg"
import uva5 from "../../../src/assets/activityCarousalImages/UvaProvince/NineArchBridge.jpg"
import uva6 from "../../../src/assets/activityCarousalImages/UvaProvince/RavanaFalls.jpg"

import northCentral1 from "../../../src/assets/activityCarousalImages/NorthCentralProvince/GalViharaya.jpg"
import northCentral2 from "../../../src/assets/activityCarousalImages/NorthCentralProvince/Kalawewa.jpg"
import northCentral3 from "../../../src/assets/activityCarousalImages/NorthCentralProvince/MihintaleRock.jpg"
import northCentral4 from "../../../src/assets/activityCarousalImages/NorthCentralProvince/Minneriya.jpg"
import northCentral5 from "../../../src/assets/activityCarousalImages/NorthCentralProvince/Ritigala.jpg"
import northCentral6 from "../../../src/assets/activityCarousalImages/NorthCentralProvince/Ruwanwelisaya.jpg"

// Store province images
const provinceSlides = {
  "Central Province": [
    { image: central1 },
    { image: central2 },
    { image: central3 },
    { image: central4 },
    { image: central5 },
    { image: central6 },
  ],
  "Western Province": [
    { image: western1 },
    { image: western2 },
    { image: western3 },
    { image: western4 },
    { image: western5 },
    { image: western6 },
  ],
  "Southern Province": [
    { image: southern1 },
    { image: southern2 },
    { image: southern3 },
    { image: southern4 },
    { image: southern5 },
    { image: southern6 },
    { image: southern7 }
  ],
  "Eastern Province": [
    { image: eastern1 },
    { image: eastern2 },
    { image: eastern3 },
    { image: eastern4 },
    { image: eastern5 },
  ],
  "Northern Province": [
    { image: northern1 },
    { image: northern2 },
    { image: northern3 },
    { image: northern4 },
    { image: northern5 },
    { image: northern6 },
  ],
  "North Western Province": [
    { image: northWest1 },
    { image: northWest2 },
    { image: northWest3 },
    { image: northWest4 },
    { image: northWest5 },
  ],
  "Sabaragamuwa Province": [
    { image: sabaragamuwa1 },
    { image: sabaragamuwa2 },
    { image: sabaragamuwa3 },
    { image: sabaragamuwa4 },
    { image: sabaragamuwa5 },
    { image: sabaragamuwa6 },
    { image: sabaragamuwa7 },
  ],
  "Uva Province": [
    { image: uva1 },
    { image: uva2 },
    { image: uva3 },
    { image: uva4 },
    { image: uva5 },
    { image: uva6 },
  ],
  "North Central Province": [
    { image: northCentral1 },
    { image: northCentral2 },
    { image: northCentral3 },
    { image: northCentral4 },
    { image: northCentral5 },
    { image: northCentral6 },
  ],
  
};

const ActivityPageCarousel = ({ provinceName }) => {
  const slides = provinceSlides[provinceName] 
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    setCurrentSlide(0); 
  }, [provinceName]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-96 sm:h-[600px] overflow-hidden rounded-lg shadow-lg">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          initial={{ x: direction * 100 + "%" }}
          animate={{ x: 0 }}
          exit={{ x: -direction * 100 + "%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute w-full h-full"
        >
          <img
            src={slides[currentSlide].image}
            alt={`Slide ${currentSlide}`}
            className="w-full h-full object-cover brightness-75"
          />
        </motion.div>
      </AnimatePresence>


      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>


      <div className="absolute bottom-10 left-2 sm:left-5 text-white drop-shadow-lg">
        <h2 className="text-2xl sm:text-5xl font-semibold tracking-wide">
          Welcome to {provinceName}
        </h2>
        <p className="text-md sm:text-xl mt-2 opacity-90">
          Discover breathtaking places & adventures
        </p>
      </div>


      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white scale-125" : "bg-gray-400"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ActivityPageCarousel;
