import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Ceylon_trails_logo.png";
import { RiAdminFill } from "react-icons/ri";

const AdminNavbar = ({openLogoutModal}) => {
    const navigate = useNavigate();
    return (
        <div className="h-[60px] sm:h-[80px] md:h-[100px] backdrop-blur-3xl bg-base-500 fixed top-0 left-0 right-0 z-50 shadow-md opacity-80 flex items-center px-6">
            <div className="absolute left-1/2 transform -translate-x-1/2">
                <img className="w-auto sm:w-20 md:w-30" src={Logo} alt="Ceylon Trails Logo" />
            </div>

            <div className="ml-auto">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div tabIndex="0" role="button" className="btn  btn-ghost btn-circle avatar text-white text-sm sm:text-lg font-jaini hover:cursor-pointer hover:text-cyan-400 transition-colors duration-300">
                            <RiAdminFill className="text-red-900 text-4xl hover:text-cyan-400" />
                        </div>
                    </div>
                    <ul className="menu menu-sm dropdown-content backdrop-blur-3xl bg-base-500/50 text-white rounded-box z-[1] mt-3 w-52 p-2 shadow">

                        <li className="text-left font-semibold"><button><a>Admin Email</a></button></li>
                        <li className="text-left text-white hover:text-red-500 font-semibold" ><button  onClick={openLogoutModal}><a>Logout </a></button></li>
                        <li className="text-left text-white hover:text-red-500 font-semibold" ><button onClick={() => navigate("/")} ><a>Landing Page </a></button></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminNavbar;