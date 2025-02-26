import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoutes = ({children}) => {
    const location = useLocation();
    const getTokenFromLocalStorage = localStorage.getItem("user");
    
    return getTokenFromLocalStorage ? children : (<Navigate to="/" replace state={{path: location.pathname}} />);
};