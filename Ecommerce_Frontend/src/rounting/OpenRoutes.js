import { Navigate } from "react-router-dom";

export const OpenRoutes = ({children}) => {
    const getTokenFromLocalStorage = localStorage.getItem("user");
    
    return !getTokenFromLocalStorage ? children : <Navigate to="/" replace={true} />;
}