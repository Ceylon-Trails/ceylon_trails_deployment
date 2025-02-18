/* eslint-disable react/prop-types */

import Logo from "../assets/Ceylon_trails_logo.png"
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { register } from "../api/register";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../store/authSlice";
import { toast } from "react-toastify";


const RegisterForm = ({loginModal}) => {
    const [visiblePassword, setVisiblePassword] = useState(false);
    const dispatch = useDispatch();
    const [registerData, setRegisterData] = useState({
        "username": "",
        "email": "",
        "password": ""
    })

    const setPasswordVisiblity = () => {
        setVisiblePassword(!visiblePassword);
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        const action = await dispatch(register(registerData));

        if (register.fulfilled.match(action)) {
            toast.success("Registration Success");

            const token = action.payload?.token;
            if (token) {
                const decodedToken = jwtDecode(token);
                const userEmail = decodedToken.email;
                dispatch(setUser({ user: userEmail, token: token }))
                if(loginModal.current) {
                    loginModal.current.close()
                }
                
            } else {
                console.warn("Token not found in response");
            }
        } else {
            if(loginModal.current) {
                loginModal.current.close()
            }
            toast.error( action.payload || action.error?.message);
            console.error(action.error?.message);
        }
    };


    return (

        <form onSubmit={handleRegister} className="flex w-full h-full flex-col px-7 sm:px-5  md:px-5 lg:px-14 items-center">
            <img className="w-60 md:w-40" src={Logo} alt="" />
            <label className="text-white font-jomhuria text-4xl md:text-4xl lg:text-5xl " htmlFor="">Join the adventure !</label>

            <div className="grid grid-cols-1 w-full gap-y-2 mt-2 md:mt-5 lg:mt-2">
                <label className="flex justify-items-start text-white" htmlFor="">Email address</label>
                <label className="input  focus-within:outline-none focus:ring-0 border-none border-white flex items-center gap-2">
                    <input value={registerData.email} onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} type="text" className="grow" placeholder="Enter Email Address" />
                    <MdEmail className="text-lg text-gray-500" />
                </label>
            </div>
            <div className="grid grid-cols-1 w-full gap-y-2 mt-5 md:mt-5 ">
                <label className="flex justify-items-start text-white" htmlFor="">Username</label>
                <label className="input  focus-within:outline-none focus:ring-0 border-none border-white flex items-center gap-2">
                    <input value={registerData.username} onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })} type="text" className="grow" placeholder="Enter username" />
                    <FaUser className="text-lg text-gray-500" />
                </label>
            </div>
            <div className="grid grid-cols-1 w-full gap-y-2 mt-5  mx-16 ">
                <label className="flex justify-items-start text-white" htmlFor="">Password</label>
                <label className="input  focus-within:outline-none focus:ring-0 border-none border-white flex items-center gap-2">
                    <input value={registerData.password} onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} type={visiblePassword ? "text" : "password"} className="grow" placeholder="Enter Password" />
                    {visiblePassword ? <IoIosEye className="text-lg hover:cursor-pointer text-gray-500" onClick={setPasswordVisiblity} /> : <IoIosEyeOff className="text-lg hover:cursor-pointer text-gray-500" onClick={setPasswordVisiblity} />}
                </label>
            </div>

            <div className="w-full flex justify-center">
                <button className="btn btn-ghost shadow-2xl hover:shadow-gray-700 border-topic-200 shadow-gray-700 bg-topic-200 tetx-lg w-2/3 text-white  rounded-3xl mt-5">Register</button>
            </div>

        </form>


    )
}

export default RegisterForm