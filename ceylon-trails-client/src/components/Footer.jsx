import Logo from "../assets/Ceylon_trails_logo.png"
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
const Footer = () => {
  return (
    <div className="h-full relative z-10  bg-base-500 opacity-50">
      <div className="absolute flex justify-center items-center inset-0  z-0">
        <img className="w-30 sm:w-50 lg:w-60 opacity-25" src={Logo} alt="" />
      </div>
      <div className="relative z-10 grid grid-cols-9 px-2 sm:px-10 lg:pt-5">
        <div className="col-span-4 grid text-white font-jomhuria  py-2">
          <label className= "text-lg  sm:text-4xl lg:text-4xl" htmlFor="">Contact with us</label>
          <label className="text:lg sm:text-2xl  lg:text-3xl ml-2 sm:ml-10" htmlFor="">Email : ceylontrails.lk</label>
          <label className="text:lg sm:text-2xl  lg:text-3xl ml-2 sm:ml-10" htmlFor="">Phone : 0123456789</label>
          <label className="text:lg sm:text-2xl  lg:text-3xl ml-2 sm:ml-10" htmlFor="">Address : No.2, Pannipitiya, Sri Lanka</label>
        </div>
        <div className="col-span-3 grid text-white font-jomhuria  py-2">
          <label className= "text-lg  sm:text-4xl lg:text-4xl" htmlFor="">Quick Links</label>
          <label className="text:lg sm:text-2xl  lg:text-3xl ml-2 sm:ml-10" htmlFor="">About us</label>
          <label className="text:lg sm:text-2xl  lg:text-3xl ml-2 sm:ml-10" htmlFor="">Privacy Policy</label>
          <label className="text:lg sm:text-2xl  lg:text-3xl ml-2 sm:ml-10" htmlFor="">FAQ</label>
  
        </div>
        <div className="col-span-2 grid text-white font-jomhuria  py-2">
          <label className= "text-lg  sm:text-4xl lg:text-4xl" htmlFor="">Follow us on</label>
          <div className="grid gap-y-2 justify-center  sm:flex sm:gap-x-5">
            <FaFacebook className="text-lg sm:text-2xl lg:text-3xl" />
            <FaInstagramSquare className="text-lg sm:text-2xl lg:text-3xl" />
            <AiFillTikTok className="text-lg sm:text-2xl lg:text-3xl" />
          </div>
        </div>


      </div>
    </div>
  )
}

export default Footer