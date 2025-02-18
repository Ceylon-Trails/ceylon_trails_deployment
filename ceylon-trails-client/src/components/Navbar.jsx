
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import logo from "../assets/Ceylon_trails_logo.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";



const Navbar = ({ openLoginModal ,openLogoutConfirmationModal}) => {

  const [user, setUser] = useState(false)
  const userEmail = useSelector((state) => state.auth.user)

  const {role} = useSelector((state) => state.auth);
  console.log("navbar role",role);
  
  const navigate = useNavigate();


  useEffect(() => {
    setUser(userEmail);
  }, [userEmail]);

  
  

  return (
    <div className="h-[60px] sm:h-[80px] md:h-[100px] backdrop-blur-3xl bg-base-500/50 fixed top-0 left-0 right-0 z-50 shadow-md opacity-80">
      <div className="container mx-auto flex items-center justify-between h-full px-5  ">

        <div className="flex items-center gap-1">
          <img className="w-14 sm:w-20 md:w-30" src={logo} alt="Ceylon Trails Logo" />
          <span className="text-white text-xl sm:text-xl font-bold font-jaini">
            Ceylon Trails
          </span>
        </div>

        <div className="hidden sm:flex items-center sm:gap-x-10">
          <label onClick={() => navigate("/")} className="text-white text-sm sm:text-lg font-jaini hover:cursor-pointer hover:text-cyan-400 transition-colors duration-300" htmlFor=""> Home</label>
          <label className="text-white text-sm sm:text-lg font-jaini hover:cursor-pointer hover:text-cyan-400 transition-colors duration-300" htmlFor=""> About us</label>
          <label className="text-white text-sm sm:text-lg font-jaini hover:cursor-pointer hover:text-cyan-400 transition-colors duration-300" htmlFor=""> Reviews</label>
          <label className="text-white text-sm sm:text-lg font-jaini hover:cursor-pointer hover:text-cyan-400 transition-colors duration-300" htmlFor=""> Gallery</label>
        </div>

        {user ? <div className="hidden dropdown dropdown-end sm:inline">
          <div tabIndex="0" role="button" className="btn  btn-ghost btn-circle avatar text-white text-sm sm:text-lg font-jaini hover:cursor-pointer hover:text-cyan-400 transition-colors duration-300">
            <FaUserCircle className="text-white text-4xl hover:text-cyan-400" />
          </div>
          <ul className="menu menu-sm dropdown-content backdrop-blur-3xl bg-base-500/50 text-white rounded-box z-[1] mt-3 w-52 p-2 shadow">
          
            <li className="text-left font-semibold"><button><a>{userEmail?.email || userEmail} </a></button></li>
            <li className="text-left text-white hover:text-red-500 font-semibold" ><button onClick={openLogoutConfirmationModal} ><a>Logout </a></button></li>
            {
              role === "admin" && <li className="text-left text-white hover:text-red-500 font-semibold" ><button onClick={() => navigate("/admin")} ><a>Admin Panel </a></button></li>
            }
          </ul>
          

        </div> :
          <div onClick={openLoginModal} className="hidden sm:inline text-white text-sm sm:text-lg font-jaini hover:cursor-pointer hover:text-cyan-400 transition-colors duration-300">
            Login or Register
          </div>
        }

        <div className="dropdown dropdown-end sm:hidden">
          <div tabIndex="0" role="button" className="btn btn-ghost btn-circle avatar ">
            <RxHamburgerMenu className="text-white text-2xl" />
          </div>
          <ul className="menu menu-sm dropdown-content backdrop-blur-3xl bg-base-500/50 text-white rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li className="text-left"><button><a>{user ? userEmail?.email ||userEmail : "Profile"}</a></button></li>
            <li className="text-left"><button onClick={() => navigate("/")}><a>Home</a></button></li>
            <li className="text-left"><button><a>About us</a></button></li>
            <li className="text-left"><button><a>Reviews</a></button></li>
            <li className="text-left"><button><a>Gallery</a></button></li>
            <li className="text-left" onClick={user ? openLogoutConfirmationModal : openLoginModal}><button><a>{user ? "Logout" : "Login or Register"}</a></button></li>
          </ul>

        </div>
      </div>
      
    </div>
  );
};

export default Navbar;
