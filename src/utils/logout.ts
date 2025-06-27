import { useNavigate } from "react-router-dom"
import { useAuth } from "../ui/components/AuthProvider";

export function useLogout(){
    const nav = useNavigate();
    const {setIsAuth} = useAuth();
    // console.log("here from fe")
    async function logout(){

        const res = await fetch("http://localhost:3000/logout",{
            method:"GET",
            credentials:"include",
        })
        alert((await res.json()).message)
        if(res.status === 200){
            setIsAuth(false)
            nav("/signin")
        }
    }
    return logout
}