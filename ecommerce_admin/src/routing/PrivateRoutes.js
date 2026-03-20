import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoutes = ({children}) => {
    const location = useLocation();
    const userState = useSelector(state => state?.auth?.user);

    const getTokenFromLocalStorage = localStorage.getItem("user");

    return getTokenFromLocalStorage && userState?.role === "admin" ? children : (<Navigate to="/.." replace state={{path: location.pathname}} />);
};