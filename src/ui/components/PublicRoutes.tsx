import type { ReactNode } from "react";
import { useAuth } from "./AuthProvider";
import { Navigate } from "react-router-dom";

export function PublicRoutes({children} : {children : ReactNode}){
    const {isAuth} = useAuth();
    if(isAuth === null) return <div>Loading...</div>
    if(isAuth){
        return <Navigate to = "/home"/>
    }
    return children
}
    