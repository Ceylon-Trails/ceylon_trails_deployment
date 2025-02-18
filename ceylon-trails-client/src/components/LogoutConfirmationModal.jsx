/* eslint-disable react/prop-types */
import { IoWarningOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { logOutUser } from "../store/authSlice";
import { persistor } from "../store/store";
import { toast } from "react-toastify";
import { logout } from "../api/logout";


const LogoutConfirmationModal = ({ logoutConfirmModal }) => {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await dispatch(logout()).then(() => {
                toast.success("Logout Success");
                dispatch(logOutUser());
                persistor.purge();
            });
            logoutConfirmModal.current.close();
           
        } catch (error) {
            //toast.error("Logout Failed");
        }
    };
    return (
        <dialog ref={logoutConfirmModal} id="my_modal_3" className="modal backdrop-blur-sm">
            <div className="modal-box  bg-red-400/40  bg-clip-padding backdrop-filter ">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 text-white top-2 hover:text-pink-200 transition duration-200">✕</button>
                </form>
                <div className="flex items-center mb-4 mt-1">
                    <IoWarningOutline className="text-white text-xl sm:text-4xl mr-4 animate-pulse" />
                    <h3 className="font-bold text-md sm:text-2xl text-white">Are you sure you want to logout ?</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5">
                    <div className="col-span-1 sm:col-span-2 flex justify-center items-center"></div>
                    <div className="flex col-span-1 sm:col-span-3 justify-between gap-x-5 sm:px-14">
                        <button onClick={handleLogout} className="btn btn-ghost bg-white text-black border-0 hover:text-white hover:bg-red-400 transition duration-200 shadow-md rounded-md">Yes</button>
                        <button onClick={() => logoutConfirmModal.current.close()} className="btn btn-ghost bg-white text-black  border-0 hover:text-white hover:bg-blue-400 transition duration-200 shadow-md rounded-md">Cancel</button>
                    </div>
                </div>
            </div>
        </dialog>

    )
}

export default LogoutConfirmationModal