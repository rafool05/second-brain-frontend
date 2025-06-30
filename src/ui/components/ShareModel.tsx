import { useEffect, useState } from "react";
import { CopyIcon } from "../icons/CopyIcon";
import { CrossIcon } from "../icons/CrossIcon";
import { WhatsappIcon } from "../icons/WhatsappIcon";
import { MailIcon } from "../icons/MailIcon";
import classNames  from "classnames"
export const ShareModel = ({setOpen} : { setOpen : any} ) => {
    const [status,setStatus] = useState(true);
    const [link,setLink] = useState("");
    useEffect(()=>{
        async function getLink(){
            const res = await fetch("http://localhost:3000/api/v1/brain/share",{
                method : "POST",
                credentials : "include",
                body : JSON.stringify({
                    status 
                }),
                headers:{
                    "Content-type" : "application/json"
                }
            })
            const data = await res.json()
            setLink("http://localhost:5173/share/"+data.hash)
        }
        getLink()
    },[status])
    function handleWhatsappClick(){
        const text = encodeURI("I've got some interesting things stored\n"+link)
        window.open("https://wa.me/?text="+text, "_blank");
    }
    function handleMailClick() {
        const subject = "Have a Look at my Second Brain!";
        const body = "Hey, check this out:\n\n" + link;

        const mailtoLink =
                "mailto:?subject=" +
                encodeURIComponent(subject) +
                "&body=" +
                encodeURIComponent(body);

        window.open(mailtoLink);
    }
    function handleCopy(){
        navigator.clipboard.writeText(link)
        alert("Copied to clipboard")
    }

    return (<div className = "backdrop-blur-sm z-6 bg-primary-300/75 w-full h-screen fixed flex justify-center items-center transition-all transition-discrete">
            <div className = "select-none h-content w-80 bg-white rounded-xl py-6 px-8 flex flex-col gap-12">
                <div className = "font-bold flex items-center justify-between text-lg">
                    <div>Share Link</div>
                    <div className = "cursor-pointer" onClick = {()=>{setOpen(false)}}><CrossIcon size = "sm" variant = "card-options"/></div>
                </div>
                <div className = "flex items-center justify-around">
                    <div className = "cursor-pointer" onClick={handleWhatsappClick}>
                        <WhatsappIcon size = "xl" variant = "secondary" />
                    </div>
                    <div className = "cursor-pointer" onClick = {handleMailClick}>
                        <MailIcon size = "xl" variant = "secondary"/>
                    </div>
                </div>
                <div className = "text-xs items-center bg-neutral-100 rounded-lg p-4 flex gap-6 justify-between" >
                    <div className = "text-primary-900 overflow-hidden">{link}</div>
                    <div className = "cursor-pointer" onClick={handleCopy}>{<CopyIcon variant = "secondary" size = "sm"/>}</div>
                </div>
                <div className = "flex font-semibold text-md gap-4 items-end " >
                    <div >Manage Access</div>
                    <div onClick = {()=>setStatus((cur)=>!cur)} className = {classNames("cursor-pointer h-6 w-10 bg-neutral-200 rounded-full flex p-1 items-center transition-all transition-discrete duuration-5000", status && "justify-end bg-primary-900" )}>
                        <div className = "w-4 h-4 bg-white rounded-full"></div>
                    </div>

                </div>
            </div>
        <div>
            
        </div>
    </div>)
}