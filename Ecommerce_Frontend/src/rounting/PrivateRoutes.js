import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoutes = ({children}) => {
    const location = useLocation();
    const getTokenFromLocalStorage = localStorage.getItem("user");
    
    // console.log(location.pathname);
    
    return getTokenFromLocalStorage ? children : (<Navigate to="/login" replace state={{path: location.pathname}} />);
};