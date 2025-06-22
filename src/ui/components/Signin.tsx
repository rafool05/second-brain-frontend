import { useRef } from "react";
import { Input } from "./Input";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {useAuth } from "../../utils/useAuth";
import { Button } from "./Buttons";
import brainImage from "../../assets/brain.jpg"
export function Signin(){
    const userRef = useRef<HTMLInputElement>(null);
    const passRef= useRef<HTMLInputElement>(null);
    const isAuth = useAuth();
    const nav = useNavigate();
    // if(isAuth ===null) 
    if(isAuth != null && isAuth) return <Navigate to = '/home' replace/>
    // console.log("at signin : " + isAuth)

    async function handleClick(){
        const res = await fetch("http://localhost:3000/api/v1/signin",{
            method : "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                username : userRef.current?.value,
                password : passRef.current?.value,
            }),
            credentials : "include"
        })
        const jsonRes = await res.json();
        alert(jsonRes.message)
        if(res.status ===200) nav('/home')
        // return <Navigate to = '/home'></Navigate>
    }
    return <div className = "select-none bg-purple-500 grid grid-cols-3 h-screen overflow-hidden justify-center">
        <div className = "col-span-2 self-start -mt-70 ">
            <img src={brainImage}/>
        </div>
        <div className="flex flex-col col-span-1 items-center h-screen justify-center">
            <div className="shadow-md shadow-primary-700 bg-white w-80 px-8 py-8 flex flex-col items-center justify-center gap-8 ring-neutral-200 ring-2 rounded-xl">
                <p className = "font-bold text-xl">Login</p>
                <div className = "flex flex-col gap-4 w-full">
                    <Input reference = {userRef} placeHolder="Username"></Input>
                    <Input reference = {passRef} placeHolder="Password" type = "password"></Input>
                </div>
                <div><Button variant = "primary" text = "Login" size = "md" onClick={handleClick}></Button></div>
                <p className = "text-xs font-semibold" >New User? Sign-up <Link  className = "text-primary-800" to = "/signup">Here</Link></p>
            </div>
        </div>
    </div>
}