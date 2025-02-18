import { useRef, useEffect, useState } from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoginRegister_page from './LoginRegister_page';
import LogoutConfirmationModal from '../components/LogoutConfirmationModal';
import { useParams } from 'react-router-dom';
import ActivityCard from '../components/ActivityCard';
import { useDispatch, useSelector } from 'react-redux';
import { getProvinceDetails } from '../api/getProvinceDetails';
import Loading_page from './Loading_page';
import ActivityPageCarousel from '../components/carousals/ActivityPageCarousel';
import ActivityModal from '../components/ActivityModal';

const Activity_Page = () => {
    const navbarRef = useRef(null);
    const carouselRef = useRef(null);
    const loginRef = useRef(null);
    const logoutConfirmationModal = useRef(null);
    const { provinceName } = useParams();
    const [activityCategories, setActivityCategories] = useState([])
    const dispatch = useDispatch();
    const activityRef = useRef();
    const[selectedActivity, setSelectedActivity] = useState(null);

    const { provinceData, isLoading } = useSelector((state) => state.provinceDetail)


    useEffect(() => {
        dispatch(getProvinceDetails());

    }, [dispatch])

    console.log(provinceData);



    const selectedProvince = provinceData?.data?.find(item => item.province.name === provinceName);


    useEffect(() => {
        if (selectedProvince) {
            setActivityCategories(selectedProvince.province.activityCategory);
        }
    }, [selectedProvince, dispatch]);

    // console.log("Activity categories", activityCategories);

    const openLoginModal = () => {
        loginRef.current.showModal();
    };




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
    };

    if (isLoading) {
        return <Loading_page />;
    }

    const handleActitvityModal = (activity) => {
        setSelectedActivity(activity);
        activityRef.current.showModal();
    }

    

    return (
        <div className='bg-base-300 overflow-x-hidden'>
            <div ref={navbarRef} className="transition-opacity transition-visibility duration-700 ease-in-out">
                <Navbar openLoginModal={openLoginModal} openLogoutConfirmationModal={handleLogout} />
            </div>
            <div ref={carouselRef}>
                <ActivityPageCarousel provinceName={provinceName} />
            </div>
            <div>
                <label className="block text-4xl  md:text-5xl lg:text-6xl font-jomhuria text-center text-topic-200 mt-6 sm:mt-8 lg:mt-10 tracking-wide">
                    Activities You Can Do in {provinceName}
                </label>
            </div>


            <div className='grid grid-cols-2 mb-10 mt-8 md:mt-10   gap-4 sm:gap-4 sm:gap-y-8 lg:gap-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-2 sm:px-4 lg:px-10'>
                {
                    Array.isArray(activityCategories) && activityCategories.map((item, index) => (
                        <ActivityCard key={index}  activity={item.name} activityDescription={item.desc} image={item.img.img}  handleActivityModal={() => handleActitvityModal(item)} />
                    ))
                }
            </div>
            <div className='relative bottom-0'>
                <Footer />
            </div>
            <LoginRegister_page loginModal={loginRef} />
            <LogoutConfirmationModal logoutConfirmModal={logoutConfirmationModal} />
            <ActivityModal  activityRef={activityRef} selectedActivity={selectedActivity}/>
          
        </div>
    );
};

export default Activity_Page;
