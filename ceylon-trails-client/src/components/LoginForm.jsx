/* eslint-disable react/prop-types */

import Logo from "../assets/Ceylon_trails_logo.png"
import Google from "../assets/GoogleIcon.png"
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../api/login";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../store/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { googleAuth } from "../api/googleAuth";

const LoginForm = ({ loginModal }) => {

    const [visiblePassword, setVisiblePassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        "email": "",
        "password": ""
    })

    const setPasswordVisiblity = () => {
        setVisiblePassword(!visiblePassword);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const action = await dispatch(login(loginData));
        if (login.fulfilled.match(action)) {
            toast.success("Login Success");
            const token = action.payload?.token;
            const role = action.payload?.role
            console.log("Role from function", role);
            if (token) {
                const decodeToken = jwtDecode(token)
                const userEmail = decodeToken.email;
                dispatch(setUser({ user: userEmail, token: token , role : role}));
                if (loginModal.current) {
                    loginModal.current.close()
                }
            }else{
                console.warn("Token not found in response");
            }

            // if(role === "admin"){
            //    navigate("/admin")
            // }
            
        } else {
            if(loginModal.current) {
                loginModal.current.close()
            }
            toast.error(action.payload || action.error?.message);
            console.error(action.error?.message);
        }
    }


    return (

        <form onSubmit={handleLogin} className="flex w-full h-full flex-col px-7 sm:px-5  md:px-5 lg:px-14 items-center">
            <img className="w-60 md:w-40" src={Logo} alt="" />
            <label className="text-white font-jomhuria text-4xl md:text-4xl lg:text-5xl " htmlFor="">Access to your adventure</label>

            <div className="grid grid-cols-1 w-full gap-y-2 mt-2 md:mt-5 lg:mt-2">
                <label className="flex justify-items-start text-white" htmlFor="">Email address</label>
                <label className="input  focus-within:outline-none focus:ring-0 border-none border-white flex items-center gap-2">
                    <input type="text" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} className="grow" placeholder="Enter Email Address" />
                    <MdEmail className="text-lg text-gray-500" />
                </label>
            </div>
            <div className="grid grid-cols-1 w-full gap-y-2 mt-5  mx-16 ">
                <label className="flex justify-items-start text-white" htmlFor="">Password</label>
                <label className="input  focus-within:outline-none focus:ring-0 border-none border-white flex items-center gap-2">
                    <input type={visiblePassword ? "text" : "password"} value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} className="grow" placeholder="Enter Password" />
                    {visiblePassword ? <IoIosEye className="text-lg hover:cursor-pointer text-gray-500" onClick={setPasswordVisiblity} /> : <IoIosEyeOff className="text-lg hover:cursor-pointer text-gray-500" onClick={setPasswordVisiblity} />}
                </label>
            </div>
            <div className="flex w-full sm:mr-0 lg:mr-5 justify-end">
                <label className="text-white cursor-pointer text-[12px] hover:underline" htmlFor="">Forget password?</label>
            </div>
            <div className="w-full flex justify-center">
                <button className="btn btn-ghost shadow-2xl hover:shadow-gray-700 border-topic-200 shadow-gray-700 bg-topic-200 tetx-lg w-2/3 text-white  rounded-3xl mt-5">Login</button>
            </div>
            <div className="flex h-full w-full items-center justify-center px-20">
                <div className="h-[2px] mt-5 w-30 bg-white"></div>
                <label className="px-2 mt-5 text-white font-semibold" htmlFor="">OR</label>
                <div className="h-[2px] mt-5 w-30 bg-white"></div>
            </div>

            <button className="flex mt-2 gap-x-2 " onClick={googleAuth}>
                <img src={Google} alt="" className="size-5" />
                <label  className="text-white text-md font-abhaya " htmlFor="">Sign in with Google</label>
            </button>

        </form>


    )
}

export default LoginForm