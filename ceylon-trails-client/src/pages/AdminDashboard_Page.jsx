
import { Outlet } from 'react-router-dom'
import AdminDrawer from '../components/AdminComponents/AdminDrawer'
import AdminNavbar from '../components/AdminComponents/AdminNavbar'
import { useRef } from 'react'
import LogoutConfirmationModal from '../components/LogoutConfirmationModal'

const AdminDashboard_page = () => {
    const logoutConfirmationModal = useRef();

    const hanleLogoutModal = () => {
        logoutConfirmationModal.current.showModal();
    }

    return (
        <div className='grid'>
            <div className=''>
            <AdminNavbar openLogoutModal={hanleLogoutModal}/>
            </div>
            <AdminDrawer/>
            <div className='flex h-screen bg-base-300 pt-[60px0] w-full sm:pt-[80px] md:pt-[100px]'>          
                <Outlet />
            </div>
            <LogoutConfirmationModal logoutConfirmModal={logoutConfirmationModal} />
        </div>
    )
}

export default AdminDashboard_page
