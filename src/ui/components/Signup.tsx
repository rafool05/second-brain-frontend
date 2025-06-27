import {  useRef } from "react";
import { Input } from "./Input";
import { Link} from "react-router-dom";
import { Button } from "./Buttons";
import brainImage from "../../assets/brain_2.png" 
export function Signup(){
    const userRef = useRef<HTMLInputElement>(null);
    const passRef= useRef<HTMLInputElement>(null);
    async function handleClick(){
        const res = await fetch("http://localhost:3000/api/v1/signup",{
            method : "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                username : userRef.current?.value,
                password : passRef.current?.value,
            }),
            credentials:"include"
        })
        const jsonRes = await res.json();
        alert(jsonRes.message)
    }
    return <div className = "select-none bg-violet-950 grid grid-cols-3 h-screen overflow-hidden justify-center">
        <div className = "col-span-2 self-start -mt-40 ">
            <img src={brainImage}/>
        </div>
        <div className="flex flex-col col-span-1 items-center h-screen justify-center">
            <div className=" shadow-md shadow-primary-700 bg-white w-80 px-8 py-8 flex flex-col gap-8 items-center ring-neutral-200 ring-2 rounded-xl">
                <p className = "font-bold text-xl">Sign-up</p>
                <div className = "flex flex-col gap-4 w-full">
                    <Input reference = {userRef} placeHolder="Username"></Input>
                    <Input reference = {passRef} placeHolder="Password" type = "password"></Input>
                </div>
                <div><Button variant = "primary" text = "Signup" size = "md" onClick={async()=>{await handleClick()}}></Button></div>
                <p className = "text-xs font-semibold" >Already a User? Login <Link  className = "text-primary-800" to = "/signin">Here</Link></p>
            </div>
        </div>
    </div>
}