import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoutes = ({children}) => {
    const userState = useSelector(state => state?.auth?.user);

    return userState ? children : (<Navigate to="/.." replace />);
};