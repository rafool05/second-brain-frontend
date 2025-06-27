import { useEffect, useState } from "react";
import { CopyIcon } from "../icons/CopyIcon";
import { CrossIcon } from "../icons/CrossIcon";
import { WhatsappIcon } from "../icons/WhatsappIcon";
import { MailIcon } from "../icons/MailIcon";
export const ShareModel = ({setOpen} : { setOpen : any} ) => {
    const [status,setStatus] = useState(false);
    const [link,setLink] = useState("");
    useEffect(()=>{
        async function getLink(){
            const res = await fetch("http://localhost:3000/api/v1/brain/share",{
                method : "POST",
                credentials : "include",
                body : JSON.stringify({
                    share : true
                })
            })
            console.log("hi")
            const data = await res.json()
            console.log(data)
            setLink("http://localhost:5173/share/"+data.hash)
            setStatus(data.status)
        }
        getLink()
    },[])
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

    return (<div className = "backdrop-blur-sm z-5 bg-primary-300/75 w-full h-screen fixed flex justify-center items-center">
            <div className = "h-content w-80 bg-white rounded-xl py-6 px-8 flex flex-col gap-12">
                <div className = "font-bold flex items-center justify-between text-lg">
                    <div>Share Link</div>
                    <div className = "cursor-pointer" onClick = {()=>{setOpen(false)}}><CrossIcon size = "sm" variant = "card-options"/></div>
                </div>
                <div className = "flex items-center justify-around">
                    <div className = "cursor-pointer" onClick={handleWhatsappClick}>
                        <WhatsappIcon size = "lg" variant = "secondary" />
                    </div>
                    <div className = "cursor-pointer" onClick = {handleMailClick}>
                        <MailIcon size = "lg" variant = "secondary"/>
                    </div>
                </div>
                <div className = "text-xs items-center bg-neutral-100 rounded-lg p-4 flex gap-6 justify-between" >
                    <div className = "text-primary-900 overflow-hidden">{link}</div>
                    <div className = "cursor-pointer" onClick={handleCopy}>{<CopyIcon variant = "secondary" size = "sm"/>}</div>
                </div>
            </div>
        <div>
            
        </div>
    </div>)
}