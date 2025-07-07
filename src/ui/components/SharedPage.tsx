import { useEffect, useState } from 'react'
import { Sidebar } from './Sidebar'
import { ContentCard, type ContentCardInterface } from './ContentCard'
import { useParams, useSearchParams } from "react-router-dom";

export function SharedPage() {
  // const [openContent,setOpenContent] = useState(false)
  // const [openShare,setOpenShare] = useState(false)
  const [content,setContent] = useState<ContentCardInterface[]>([]) 
  const [filteredContent,setFilteredContent] = useState<ContentCardInterface[]>([]) 
  const {id} = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "all";


  useEffect(()=>{
    async function getContent(){

      const res = await fetch("http://localhost:3000/api/v1/brain/share/"+id,{
        method:"GET",
        credentials : "include",
        headers : {
          "Content-Type" : "application/json"
        }})
        const json = await res.json();
        setContent(json.content);

    
  }
  getContent();
  },[])
  useEffect(() => {
    if(!content) return
    if (type === "all") setFilteredContent(content);
    else if(type =="other") setFilteredContent(content?.filter((item) => !(["youtube","twitter","x"].includes(item.type))));
    else setFilteredContent(content?.filter((item) => item.type === type));
   
  }, [type, content]);
    // console.log(type)
  return<>
    <Sidebar ></Sidebar>
    
    <div className='bg-slate-100 pl-54 py-4 w-full z-1 fixed flex justify-between pr-3 items-center'> 
      <div className = "text-xl font-bold">
        All Notes
      </div> 
    </div>
    <div className = 'h-screen grid grid-cols-3 gap-y-4 gap-x-4 pr-4 pb-4 pl-52 pt-20 z-0 bg-slate-100' >
      {
        (!filteredContent || filteredContent.length == 0) ? (
          <div className ="col-span-3 place-self-center text-2xl text-neutral-600">
            There's no content... You need to think more
          </div>
        ) : 
        (filteredContent.map((e)=><ContentCard _id = {e._id} type = {e.type} tags = {e.tags.map((t)=>t.title)} date = {new Date(e.date)} content = {e.content} title = {e.title} onDelete = {()=>{}}/>))
      }
    </div>  
</>

} 