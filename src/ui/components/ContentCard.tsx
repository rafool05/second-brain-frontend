import {type ReactNode } from "react"
import { DeleteIcon } from "../icons/DeleteIcon"
import { XIcon } from "../icons/XIcon"
import { YoutubeIcon } from "../icons/YoutubeIcon"
import { DocIcon } from "../icons/DocIcon"
import { TwitterTweetEmbed } from 'react-twitter-embed';

export function Tweet({ tweetId } : {tweetId : string}) {
  return <TwitterTweetEmbed options = {{width:270, cards : 'hidden'}}tweetId={tweetId} />;
}
export function Youtube({ YoutubeId } : {YoutubeId : string}) {
    return <iframe src={'https://www.youtube.com/embed/'+YoutubeId} title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" className = "w-full"></iframe>
}
export interface ContentCardInterface {
    title : string,
    tags : any[],
    date : Date,
    content : string,
    type : string,
    onDelete ?: ()=>void,
    _id : string
}
const TypeIcons : Record<string,ReactNode>= {
    twitter: <XIcon size = "md" variant = "title"></XIcon>,
    x: <XIcon size = "md" variant = "title"></XIcon>,
    youtube : <YoutubeIcon size = "md" variant = "title"></YoutubeIcon>,
}
export const ContentCard = (props : ContentCardInterface) =>{
    // console.log(props.tags)
    const startIcon : ReactNode = TypeIcons[props.type.toLowerCase()] ?? <DocIcon size = "md" variant = "title"/>
    const Header = () =>{
        return <div className = "flex ">
            <div className = "flex grow-2 gap-2 items-center">
                <div>{startIcon}</div>
                <p className="grow-2 font-bold text-lg" >{props.title}</p>   
            </div>
            <div className="flex gap-2 grow-1 items-center justify-end">
                {/* <div ><ShareIcon size = "sm" variant = "card-options"></ShareIcon></div> */}
                <div onClick={props.onDelete} className="cursor-pointer"><DeleteIcon size = "sm" variant = "card-options"></DeleteIcon ></div>
            </div>
        </div>
    }
    const Tags = () =>{
        return <div className = "flex gap-2 flex-wrap">{props.tags.map((tag) => (
            <span className = "bg-primary-700 text-primary-900 text-xs py-1 px-2 rounded-2xl">#{tag}</span>
        ))}</div>
    }
    const Date = () =>{
        const datePretty = props.date.getDate() + "/" +(props.date.getUTCMonth()+1)+"/"+props.date.getFullYear()
        return <div className = "text-neutral-400 text-xs font-medium">Added on {datePretty}</div>
    }
    const Content = () =>{ 
        const content = (props.type === "twitter" ? (
                    <Tweet tweetId={props.content}/>
                ) : props.type === "youtube" ? (
                    <Youtube YoutubeId={props.content}/>
                ) : (
                    props.content
                ))
        return (<div className = "overflow-y-auto pr-2 whitespace-pre-wrap">
            {content}
            </div>
        )
    }

    return <div className="bg-white w-82 h-92 flex justify-between flex-col gap-6 ring-1 ring-neutral-200 p-4 rounded-xl ">
        <Header></Header>
        <Content></Content>
        <Tags></Tags>   
        <Date></Date>
    </div>
}