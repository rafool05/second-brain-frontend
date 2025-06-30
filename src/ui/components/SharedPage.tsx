import { useEffect, useState } from 'react'
import { ContentAdder } from './ContentAdder'
import { Sidebar } from './Sidebar'
import { ContentCard, type ContentCardInterface } from './ContentCard'
import { ShareModel } from './ShareModel'
import { useSearchParams } from "react-router-dom";

export function SharedPage() {
  const [openContent,setOpenContent] = useState(false)
  const [openShare,setOpenShare] = useState(false)
  const [content,setContent] = useState<ContentCardInterface[]>() 
  const [filteredContent,setFilteredContent] = useState<ContentCardInterface[]>() 

  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "all";


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
  },[openContent])
  useEffect(() => {
    if(!content) return
    if (type === "all") {
      setFilteredContent(content);
    } else {
      if(type =="other"){

        setFilteredContent(content?.filter((item) => !(item.type in["youtube","twitter","x"])));
      }
      else setFilteredContent(content?.filter((item) => item.type === type));
    }
  }, [type, content]);
    // console.log(type)
  return<>
    {openContent && <ContentAdder setOpen = {setOpenContent}></ContentAdder>}    
    {openShare && <ShareModel setOpen = {setOpenShare}></ShareModel>}
    <Sidebar ></Sidebar>
    {/* <div className = "fixed z-4 bottom-2 right-4"><Button onClick = {useLogout()} startIcon = {<Logout size = 'md' variant = "primary"/>} variant = "primary" size = "md" text = "Logout"/></div> */}
    
    <div className='bg-slate-100 pl-54 py-4 w-full z-1 fixed flex justify-between pr-3 items-center'> 
      <div className = "text-xl font-bold">
        All Notes
      </div> 
      {/* <div className='flex gap-4'>  
        <Button text = "Share Brain" startIcon={<ShareIcon size = 'md' variant='secondary'/>} onClick={()=>{setOpenShare(true)}} variant = "secondary" size = "md"/>
        <Button text = "Add Content" startIcon={<PlusIcon size = 'md' variant='primary'/>} onClick={()=>setOpenContent(true)} variant = "primary" size = "md"/>
      </div> */}
    </div>
    <div className = 'h-screen grid grid-cols-3 gap-y-4 gap-x-4 pr-4 pb-4 pl-52 pt-20 z-0 bg-slate-100' >
      {
        (filteredContent?.length == 0) ? (
          <div className ="col-span-3 place-self-center text-2xl text-neutral-600">
            There's no content... You need to think more
          </div>
        ) : 
        (filteredContent?.map((e)=><ContentCard _id = {e._id} type = {e.type} tags = {e.tags.map((t)=>t.title)} date = {new Date(e.date)} content = {e.content} title = {e.title} onDelete = {async()=>{
            const res = await fetch("http://localhost:3000/api/v1/content",{
              method: "DELETE",
              credentials : "include",
              headers:{
                "Content-Type" : "application/json",
              },
              body:JSON.stringify({
                _id:e._id
              })
            })
            if(res.status==200){
              alert((await res.json()).message)
              setContent((prev) => prev?.filter(cont=>cont._id != e._id))
            }
            
          }}/>))
      }
    </div>  
</>

} 