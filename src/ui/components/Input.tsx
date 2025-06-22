import { useState, type Ref } from "react";
type InputType =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";
export function Input({reference, placeHolder,multiline = false,type = "text"} : {reference ?: (Ref<HTMLInputElement | HTMLTextAreaElement>), placeHolder ?: string, multiline ?: boolean, type ?: InputType} ){
    if(multiline){
        const [value,setValue] = useState("");

        return <div className = "text-primary-900 w-full rounded-md ring-neutral-200 ring-1">
            <textarea ref = {reference as Ref<HTMLTextAreaElement>} onChange={(e)=>{setValue(e.target.value)}} className = "outline-0 min-h-10 max-h-36 w-full px-2 py-2 rounded-md placeholder-neutral-400" 
                maxLength={400}
                placeholder={placeHolder}
                value = {value}> 
            </textarea>
            {value.length>250 && <p className="text-xs text-neutral-400">
                {value.length}/400
            </p>}
        </div>
    }
    else{

        return <div className = "rounded-md py-2 px-2 ring-neutral-200 ring-1 w-full text-primary-900">
            <input type = {type} ref = {reference as Ref<HTMLInputElement>} placeholder={placeHolder} className = "w-full cursor-hidden placeholder-neutral-400 outline-0 ">
        </input>
        </div>
    }
        
}
