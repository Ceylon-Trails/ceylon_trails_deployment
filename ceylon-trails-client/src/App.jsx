import {Route, Routes} from 'react-router-dom';
import './index.css';
import Home_page from './pages/Home_page';
import Activity_page from './pages/Activity_page';
import Loading_page from './pages/Loading_page';
import {useEffect, useState} from 'react';
import Splash_Page from './pages/Splash_Page';
import AdminDashboard_Page from "./pages/AdminDashboard_Page.jsx";
import AdminDashboard from "./components/AdminComponents/AdminDashboard.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './api/checkAuth.js';
import { CheckAuthRoute } from './common/CheckAuthRoute.jsx';


function App() {

    const [initialLoading, setInitialLoading] = useState(true);
    const dispatch = useDispatch();
    const{user,isAuthenticate} = useSelector((state)=>state.auth)



    useEffect(()=>{
        dispatch(checkAuth());
    },[])


    useEffect(() => {
        const timer = setTimeout(() => {
            setInitialLoading(false)
        }, 7000)
        return () => clearTimeout(timer)
    }, [])

    console.log("User", user, "isAuthenticate", isAuthenticate);
    
    if (initialLoading) return <Splash_Page/>


    return (
        <div>
            <Routes>
                <Route path="/" element={<Home_page user={user}/>}/>
                <Route path="/activity/:provinceName" element={<CheckAuthRoute user={user?.roles} isAuthenticate={isAuthenticate}><Activity_page/></CheckAuthRoute>}/>
                <Route path="*" element={<Loading_page/>}/>
                <Route path="/admin" element={<CheckAuthRoute user={user?.roles} isAuthenticate={isAuthenticate}><AdminDashboard_Page/></CheckAuthRoute>}>
                   <Route path="dashboard" element={<AdminDashboard/>}></Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
