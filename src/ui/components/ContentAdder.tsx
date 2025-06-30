import { createRef, useRef, type RefObject, } from "react"
import { CrossIcon } from "../icons/CrossIcon"
import { Button } from "./Buttons"
import { Input } from "./Input";

export const ContentAdder = ({ setOpen} : any) =>{
    const inputFields = useRef(
        Array(4).fill(null).map(() => createRef<HTMLInputElement | HTMLTextAreaElement>())
    );
    return (<div className = "backdrop-blur-sm z-6 bg-primary-300/75 w-full h-screen fixed flex justify-center items-center">
    <div className = "w-120 rounded-xl ring-neutral-200 ring-2 relative py-8 px-12 rounded-2 bg-white flex flex-col justify-between">
        <div className = "flex justify-between items-center">
            <div className = "font-bold text-lg">Add your content</div>
            <div className = "cursor-pointer" onClick={()=>{setOpen(false)}}><CrossIcon size = "sm" variant = "title" ></CrossIcon></div>
        </div>
        
        <div className="flex flex-col gap-4 mt-6" >

            <Input placeHolder="Title" reference = {inputFields.current[0]}/>
            <Input placeHolder="Type" reference = {inputFields.current[1]}/>
            <Input placeHolder="Link/Content" multiline = {true}  reference = {inputFields.current[2]}/>
            <Input placeHolder="Tags" reference = {inputFields.current[3]}/>
            <Button variant = "primary" size='md' onClick = {async () => {
                    
                    const res = await handleClick(inputFields) ;
                    if(res==undefined) return;
                    const jsonres = await res.json();
                    alert(jsonres.message)
                    if(res.status ===200) setOpen(false)
                }
            } 
            text = "Submit"></Button>
        </div>
    </div>
</div>)
}
const handleClick = async (inputFields : RefObject<RefObject<HTMLInputElement|HTMLTextAreaElement|null>[]>) =>{

    const body = {
        title : inputFields.current[0].current?.value,
        type : inputFields.current[1].current?.value,
        content : inputFields.current[2].current?.value,
        tags: inputFields.current[3]?.current?.value.trim().split(' ').sort(),
    }
    if(Object.values(body).some(v=>v===undefined || v===null)) return;
    const res =  await fetch('http://localhost:3000/api/v1/content', {
        method : "POST",
        headers : {
            "Content-type" : "application/json"
        },
        credentials : "include",
        body : JSON.stringify(body),
    })
    return res
    
}