import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import Logo from "../../assets/Ceylon_trails_logo.png";
import { MdDashboardCustomize } from "react-icons/md";
import { MdReviews } from "react-icons/md";

const AdminDrawer = () => {
    const navigate = useNavigate();

    return (
        <div className="drawer">

            <input id="my-drawer" type="checkbox" className="drawer-toggle peer hidden" />

            <div className="drawer-content z-50">

                <label
                    htmlFor="my-drawer"
                    className="btn btn-circle  bg-blue-400 fixed left-0 top-[100px] z-50 shadow-lg rounded-0 border-0 transition-all peer-checked:hidden"
                >
                    <IoIosArrowForward className="text-3xl text-white font-semibold" />
                </label>
            </div>

            <div className="drawer-side z-40 pt-[60px] sm:pt-[80px] md:pt-[100px] ">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay "></label>
                <ul className="menu  flex text-lg text-white font-abhaya gap-y-5 font-semibold  min-h-full w-80 p-4 h-full bg-base-500/50 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
                    <div className="flex justify-center"><img className="w-30 sm:w-12 lg:w-36" src={Logo} alt="" /></div>
                    <div className="btn btn-ghost group ">
                        <MdDashboardCustomize className="text-3xl text-white group-hover:text-cyan-600"/>
                        <div className="w-full text-2xl" onClick={() => navigate("dashboard")}><a>Dashboard</a></div>
                    </div>
                    <div className="btn btn-ghost group ">
                        <MdReviews className="text-3xl text-white group-hover:text-cyan-600"/>
                        <div className="w-full text-2xl" onClick={() => navigate("dashboard")}><a>Reviews</a></div>
                    </div>
                    
                  
                    
                </ul>
            </div>
        </div>
    );
};

export default AdminDrawer;
