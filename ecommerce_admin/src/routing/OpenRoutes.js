import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const OpenRoutes = ({children}) => {
    const getTokenFromLocalStorage = localStorage.getItem("user");
    const userState = useSelector(state => state?.auth?.user);
    
    
    return !getTokenFromLocalStorage && userState?.role !== "admin" ? children : <Navigate to="/admin" replace={true} />;
}