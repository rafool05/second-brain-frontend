import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const ProtectedRoutes = ({
    children
} : {children : ReactNode}) => {
    const { isAuth } = useAuth();

    if (isAuth === null) {
        // console.log("Loading")
        return <div>Loading...</div>;
    }
    // console.log("Loading stopped")
    if (!isAuth) return <Navigate to="/signin" replace/>;
    return children;
}