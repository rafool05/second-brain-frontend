import { useNavigate } from "react-router-dom"

export function useLogout(){
    const nav = useNavigate();
    // console.log("here from fe")
    async function logout(){

        const res = await fetch("http://localhost:3000/logout",{
            method:"GET",
            credentials:"include",
        })
        alert((await res.json()).message)
        nav("/")
    }
    return logout
}