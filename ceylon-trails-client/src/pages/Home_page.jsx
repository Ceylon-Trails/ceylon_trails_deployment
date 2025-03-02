/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useRef, useEffect, useState } from 'react';

import Navbar from "../components/Navbar";

import Map from '../components/Map';
import Province_Card from '../components/Province_Card';
import Footer from '../components/Footer';
import LoginRegister_page from './LoginRegister_page';
import LogoutConfirmationModal from '../components/LogoutConfirmationModal';
import Main_Carousel from '../components/carousals/Main_Carousel';
import Sub_Carousel from '../components/carousals/Sub_Carousel';
import { useDispatch, useSelector } from 'react-redux';
import { getProvinceDetails } from '../api/getProvinceDetails';


const Home_page = ({user}) => {
  const [selectedProvince, setSelectedProvince] = useState("Select Province");
  const navbarRef = useRef(null);
  const carouselRef = useRef(null);
  const loginRef = useRef(null);
  const logoutConfirmationModal = useRef(null);
  const dispatch = useDispatch();

  const {provinceData , isLoading} = useSelector((state)=>state.provinceDetail)


  const openLoginModal = () => {
    console.log("Open Login Modal");
    
    loginRef.current.showModal();
  }

  useEffect(()=>{
    dispatch(getProvinceDetails())
  },[dispatch])

  // console.log("Data from home page",provinceData);
    

  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current && navbarRef.current) {
        const carouselHeight = carouselRef.current.clientHeight + 10;
        const scrollY = window.scrollY;

        if (scrollY > carouselHeight) {
          navbarRef.current.style.opacity = '0';
          navbarRef.current.style.visibility = 'hidden';
        } else {
          navbarRef.current.style.opacity = '1';
          navbarRef.current.style.visibility = 'visible';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logoutConfirmationModal.current.showModal();
  }

  return (
    
    <div className='bg-base-300 overflow-x-hidden'>
      <div
        ref={navbarRef}
        className="transition-opacity transition-visibility duration-700 ease-in-out "
      >
        <Navbar openLoginModal={openLoginModal} openLogoutConfirmationModal={handleLogout}/>
      </div>
      <div ref={carouselRef}>
        <Main_Carousel />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-7 gap-4 p-4 sm:p-8">
        <div className="col-span-1 sm:col-span-4">
          <label className="text-3xl sm:text-5xl md:text-7xl font-jomhuria text-topic-200" htmlFor="">
            Craft memories that last a lifetime in the heart of paradise
          </label>
          <p className="font-abhaya text-base sm:text-xl text-justify mt-4">
            Every destination is filled with wonders waiting to be discovered. From stunning landscapes to rich cultures, each place offers unique experiences. Whether seeking adventure or relaxation, the world is full of beauty and hidden gems. Begin your exploration today and uncover the stories and memories that await.
          </p>
        </div>
        <div className="col-span-1 sm:col-span-3 flex justify-center items-center">
          <Sub_Carousel />
        </div>
      </div>
      <div className='flex justify-center p-4'>
        <label className='text-topic-200 text-3xl text-center sm:text-6xl font-jomhuria' htmlFor="">Embark on a Provincial Journey: Select Your Destination</label>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-7 gap-4 px-4">
        <div className="col-span-1 grid sm:col-span-4">
          <p className="font-abhaya text-justify hidden sm:block text-base sm:mt-10 sm:text-xl pl-4 m-0">
            Immerse yourself in a world of adventure and culture. Experience the thrill of discovering new landscapes, from pristine beaches to lush mountain ranges. Engage with vibrant local communities and uncover the rich history and traditions that define each destination. Whether you're seeking relaxation, excitement, or a deeper connection with nature, there’s something for everyone. Begin your unforgettable journey below.
          </p>
          <div className="bg-base-500 shadow-2xl ml-4 md:-mt-18 lg:-mt-10 font-jomhuria shadow-gray-800 text-white text-4xl md:text-5xl  lg:text-6xl flex justify-center items-center opacity-50 rounded-3xl mt-5 h-30 sm:h-30 lg:h-50 m-0 p-0">
            {selectedProvince}
          </div>
        </div>
        <div className="col-span-1 sm:col-span-3 flex justify-center items-center">
          <Map onProvinceClick={setSelectedProvince} />
        </div>
      </div>
      <div className='grid -mt-20 sm:-mt-15 grid-cols-2 gap-4 sm:gap-4 lg:gap-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-14 px-2 sm:px-4 lg:px-16'>
        {
          Array.isArray(provinceData?.data) && provinceData?.data?.map((item,index)=>(
            <Province_Card openLoginModal={openLoginModal} user={user} image={item.province.images[0].img} key={index} provinceName={item.province.name} index={index} />
          ))
        }
      </div>
      <div className='relative bottom-0'>
        <Footer />
      </div>
      <LoginRegister_page loginModal={loginRef} />
      <LogoutConfirmationModal logoutConfirmModal={logoutConfirmationModal}/>
    </div>
  );
};

export default Home_page;
