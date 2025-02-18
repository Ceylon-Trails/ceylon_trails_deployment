import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom"

export const CheckAuthRoute = ({ user, isAuthenticate, children }) => {
    const location = useLocation();

    const {role} = useSelector((state) => state.auth);

    console.log("User:", user);
    console.log("Roles:", user);
    console.log("Is Authenticated:", isAuthenticate);
    console.log("Current Path:", location.pathname);

    if (!isAuthenticate) {
        return <Navigate to="/" replace/>
    }

    if (role?.includes("admin") && location.pathname.startsWith("/admin")) {
        return <>{children}</>
    }

    if (!role?.includes("admin") && location.pathname.startsWith("/admin")) {
        return <Navigate to="/" replace/>
    }


    return <>{children}</>

}