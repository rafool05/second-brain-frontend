import { Navigate } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";

export function Default(){
    const isAuth = useAuth()
    if(isAuth !== null && isAuth == true) return <Navigate to ='/home' replace></Navigate>
    else return <Navigate to ='/signin' replace></Navigate>
}