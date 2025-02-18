/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion } from "framer-motion"; // Import motion
import Image from "../assets/loginImage.jpg";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const LoginRegister_page = ({ loginModal }) => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleLoginRegister = () => {
        setIsLogin(!isLogin);
    };

    return (
        <dialog id="my_modal_4" className="modal backdrop-blur-sm" ref={loginModal}>
            <div className="modal-box w-11/12 max-w-5xl h-[600px] overflow-hidden p-0 rounded-3xl relative bg-gray-500/20 bg-clip-padding backdrop-filter backdrop-blur-lg">
                <button
                    className="absolute hover:cursor-pointer top-4 right-4 text-white p-1 z-30 rounded-full"
                    onClick={() => loginModal.current.close()}
                >
                    &times;
                </button>
                <div className="modal-action h-full w-full mt-0 p-0 flex justify-center items-center">
                    <div className="grid grid-cols-1 md:grid-cols-7 h-full w-full m-0 p-0 relative">

                        {!isLogin && (
                            <motion.div
                                initial={{ x: -200, opacity: 0 }} 
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -200, opacity: 0 }} 
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className="hidden sm:col-span-3 md:col-span-4 sm:hidden md:inline h-full m-0 p-0 justify-center items-center"
                            >
                                <img className="relative object-cover h-full" src={Image} alt=""
                                    style={{ borderTopRightRadius: '150px', borderBottomRightRadius: '150px' }}
                                />
                            </motion.div>
                        )}

                        <div className="flex flex-col w-full h-full sm:col-span-4 md:col-span-3 py-2 md:py-10">
                            {isLogin ? <LoginForm loginModal={loginModal}/> : <RegisterForm loginModal={loginModal}/>}

                            <div className="flex mt-2 justify-center">
                                <label className="text-white text-md font-abhaya" htmlFor="">
                                    {isLogin ? "Are you new?" : "Already have an account?"}
                                    <span className="ml-2 text-md hover:underline font-abhaya cursor-pointer"
                                        onClick={toggleLoginRegister}>
                                        {isLogin ? "Create an account" : "Login"}
                                    </span>
                                </label>
                            </div>
                        </div>

       
                        {isLogin && (
                            <motion.div
                                initial={{ x: 200, opacity: 0 }} 
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 200, opacity: 0 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className="hidden sm:col-span-3 md:col-span-4 sm:hidden md:inline h-full m-0 p-0 justify-center items-center"
                            >
                                <img className="relative object-cover h-full" src={Image} alt=""
                                    style={{ borderTopLeftRadius: '150px', borderBottomLeftRadius: '150px' }}
                                />
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </dialog>
    );
};

export default LoginRegister_page;
