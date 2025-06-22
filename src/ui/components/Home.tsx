import { useEffect, useState } from 'react'
import { ContentAdder } from './ContentAdder'
import { Sidebar } from './Sidebar'
import { ContentCard, type ContentCardInterface } from './ContentCard'
import { Button } from './Buttons'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { useAuth } from '../../utils/useAuth'
import { Navigate } from 'react-router-dom'
import { Logout } from '../icons/Logout'
import {  useLogout } from '../../utils/logout'
export function Home() {
  const [open,setOpen] = useState(false)
  const [content,setContent] = useState<ContentCardInterface[]>()
  const isAuth = useAuth();
  // if(isAuth == null || isAuth == undefined){
  //   return <div className = "h-screen bg-purple-100">Loading...</div>
  // }
  if(isAuth != null && isAuth == false) return <Navigate to = "/signin" replace/> 
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
  },[open])
  return<div>
    <ContentAdder open = {open} setOpen = {setOpen}></ContentAdder>
    <Sidebar ></Sidebar>
    <div className = "fixed z-4 bottom-2 right-4"><Button onClick = {useLogout()} startIcon = {<Logout size = 'md' variant = "primary"/>} variant = "primary" size = "md" text = "Logout"/></div>
    
    <div className='bg-slate-100 pl-54 py-4 w-full z-1 fixed flex justify-between pr-3 items-center'> 
      <div className = "text-xl font-bold">
        All Notes
      </div> 
      <div className='flex gap-4'>  
        <Button text = "Share Brain" startIcon={<ShareIcon size = 'md' variant='secondary'/>} onClick={()=>{}} variant = "secondary" size = "md"/>
        <Button text = "Add Content" startIcon={<PlusIcon size = 'md' variant='primary'/>} onClick={()=>setOpen(true)} variant = "primary" size = "md"/>
      </div>
    </div>
    <div className = 'min-h-screen grid grid-cols-3 gap-y-4 gap-x-4 pr-4 pb-4 pl-52 pt-20 z-0 bg-slate-100' >
      {
        (content?.length == 0) ? (
          <div className ="col-span-3 place-self-center text-2xl text-neutral-600">
            There's no content... You need to think more
          </div>
        ) : 
        (content?.map((e)=><ContentCard _id = {e._id} type = {e.type} tags = {e.tags.map((t)=>t.title)} date = {new Date(e.date)} content = {e.content} title = {e.title} onDelete = {async()=>{
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
</div>

} 