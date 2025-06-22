import { useEffect, useState } from "react"
import type { ContentCardInterface } from "../ui/components/ContentCard"

export function useGetContent(){
    const [content,setContent] = useState([])
    useEffect(()=>{
        fetch("http://localhost:3000/api/v1/content",{
            method:"GET",
            credentials : "include",
            headers : {
                "Content-Type" : "application/json"
            }
        }).then(async(cont)=>{
            const json = await cont.json()
            setContent(json)
        }
        )
    },[])
    // console.log(content)
    return content as ContentCardInterface[]
}